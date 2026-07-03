// src/app/api/jobs/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase-server'
import { checkRateLimit, getClientIp } from '@/lib/rateLimit'

export async function GET() {
  const supabase = createServerClient()
  const { data, error } = await supabase
    .from('jobs')
    .select('id,title,company,location,job_type,function_title,region,description,requirements,salary_range,min_hours_total,min_hours_cs25,min_hours_cs23,min_hours_pic,logo_url,poster_name,approved_at')
    .eq('status', 'approved')
    // Defensive filter in case the hourly cleanup cron hasn't run yet —
    // the cron job is the source of truth for actual deletion.
    .or(`expires_at.is.null,expires_at.gt.${new Date().toISOString()}`)
    .order('approved_at', { ascending: false })

  if (error) return NextResponse.json({ error: 'Failed to fetch jobs' }, { status: 500 })
  return NextResponse.json({ jobs: data })
}

const MAX_EXPIRY_DAYS = 365

export async function POST(req: NextRequest) {
  try {
    if (!(await checkRateLimit(`jobs-post:${getClientIp(req)}`, 10, 3600))) {
      return NextResponse.json({ error: 'Too many requests — please try again later.' }, { status: 429 })
    }

    const body = await req.json()
    const { title, company, location, jobType, functionTitle, region, description, requirements, salaryRange, contactEmail, posterId, posterName, minHoursTotal, minHoursCs25, minHoursCs23, minHoursPic, expiresInDays, logoUrl } = body

    if (!title || !company || !location || !description || !contactEmail || !posterId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Clamp to [1, 365] days — no expiration (null) if not provided
    let expiresAt: string | null = null
    if (expiresInDays) {
      const days = Math.min(MAX_EXPIRY_DAYS, Math.max(1, Number(expiresInDays)))
      expiresAt = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toISOString()
    }

    const supabase = createServerClient()
    const { data, error } = await supabase
      .from('jobs')
      .insert({
        title, company, location,
        job_type:        jobType        || 'Full-time',
        function_title:  functionTitle  || null,
        region:          region         || null,
        description,
        requirements:    requirements   || null,
        salary_range:    salaryRange    || null,
        contact_email:   contactEmail,
        poster_id:       posterId,
        poster_name:     posterName,
        min_hours_total: minHoursTotal  ? +minHoursTotal : null,
        min_hours_cs25:  minHoursCs25   ? +minHoursCs25  : null,
        min_hours_cs23:  minHoursCs23   ? +minHoursCs23  : null,
        min_hours_pic:   minHoursPic    ? +minHoursPic   : null,
        logo_url:        logoUrl        || null,
        expires_at:      expiresAt,
        status: 'pending',
      })
      .select()
      .single()

    if (error) throw error
    return NextResponse.json({ job: data })
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Unknown error'
    console.error('[jobs POST]', err)
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}

// PATCH /api/jobs — owner edits their own job posting (any status)
export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json()
    const { userId, jobId, edits } = body
    if (!userId || !jobId || !edits) return NextResponse.json({ error: 'Missing fields' }, { status: 400 })

    const supabase = createServerClient()
    const { data: existing } = await supabase.from('jobs').select('poster_id').eq('id', jobId).single()
    if (!existing || existing.poster_id !== userId) {
      return NextResponse.json({ error: 'Not authorized' }, { status: 403 })
    }

    const updates: Record<string, unknown> = {
      title:           edits.title,
      company:         edits.company,
      location:        edits.location,
      job_type:        edits.job_type,
      function_title:  edits.function_title  || null,
      region:          edits.region          || null,
      description:     edits.description,
      requirements:    edits.requirements    || null,
      salary_range:    edits.salary_range    || null,
      contact_email:   edits.contact_email,
      min_hours_total: edits.min_hours_total ? +edits.min_hours_total : null,
      min_hours_cs25:  edits.min_hours_cs25  ? +edits.min_hours_cs25  : null,
      min_hours_cs23:  edits.min_hours_cs23  ? +edits.min_hours_cs23  : null,
      min_hours_pic:   edits.min_hours_pic   ? +edits.min_hours_pic   : null,
    }
    // Optional re-set of expiration — clamp to [1, 365] days from now
    if (edits.expiresInDays) {
      const days = Math.min(MAX_EXPIRY_DAYS, Math.max(1, Number(edits.expiresInDays)))
      updates.expires_at = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toISOString()
    } else if (edits.expiresInDays === null) {
      updates.expires_at = null
    }

    const { error } = await supabase.from('jobs').update(updates).eq('id', jobId)

    if (error) throw error
    return NextResponse.json({ ok: true })
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Unknown error'
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}

// DELETE /api/jobs — owner deletes their own job posting
export async function DELETE(req: NextRequest) {
  try {
    const body = await req.json()
    const { userId, jobId } = body
    if (!userId || !jobId) return NextResponse.json({ error: 'Missing fields' }, { status: 400 })

    const supabase = createServerClient()
    const { data: existing } = await supabase.from('jobs').select('poster_id').eq('id', jobId).single()
    if (!existing || existing.poster_id !== userId) {
      return NextResponse.json({ error: 'Not authorized' }, { status: 403 })
    }

    const { error } = await supabase.from('jobs').delete().eq('id', jobId)
    if (error) throw error
    return NextResponse.json({ ok: true })
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Unknown error'
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
