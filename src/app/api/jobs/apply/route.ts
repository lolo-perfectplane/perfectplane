// src/app/api/jobs/apply/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase-server'
import { sendJobApplication } from '@/lib/email'
import { checkRateLimit, getClientIp } from '@/lib/rateLimit'

export async function POST(req: NextRequest) {
  try {
    if (!(await checkRateLimit(`jobs-apply:${getClientIp(req)}`, 8, 3600))) {
      return NextResponse.json({ error: 'Too many requests — please try again later.' }, { status: 429 })
    }

    const body = await req.json()
    const { jobId, applicantName, applicantEmail, coverLetter, cvUrl } = body

    if (!jobId || !applicantName || !applicantEmail || !coverLetter) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const supabase = createServerClient()

    // Verify the job exists and is approved — contact_email is only read
    // server-side here, never exposed to the client via the public GET route.
    const { data: job } = await supabase
      .from('jobs')
      .select('id, title, company, contact_email')
      .eq('id', jobId)
      .eq('status', 'approved')
      .single()

    if (!job) return NextResponse.json({ error: 'Job not found' }, { status: 404 })

    const { error } = await supabase
      .from('job_applications')
      .insert({ job_id: jobId, applicant_name: applicantName, applicant_email: applicantEmail, cover_letter: coverLetter, cv_url: cvUrl || null })

    if (error) throw error

    // Notify the poster's company — non-blocking: email failure must not fail the application
    sendJobApplication({
      jobTitle: job.title, company: job.company, contactEmail: job.contact_email,
      applicantName, applicantEmail, coverLetter, cvUrl,
    }).catch(e => console.error('[email] sendJobApplication failed:', e))

    return NextResponse.json({ ok: true })
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Unknown error'
    console.error('[jobs/apply POST]', err)
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
