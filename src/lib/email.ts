// src/lib/email.ts
import { Resend } from 'resend'
import { fmtPriceFull } from './currency'

const resend = new Resend(process.env.RESEND_API_KEY)
const ADMIN = process.env.ADMIN_EMAIL!
const FROM  = 'PerfectPlane <noreply@perfectplane.eu>'

// resend.emails.send() does NOT throw on API-level failures (unverified
// sending domain, invalid key, etc.) — it resolves with { data: null, error }.
// Without this check, a rejected send looks identical to a successful one to
// every caller, which is why "Contact seller" could report success while no
// email ever actually went out.
async function send(params: Parameters<typeof resend.emails.send>[0]) {
  const { error } = await resend.emails.send(params)
  if (error) throw new Error(`Resend: ${error.message || error.name || 'send failed'}`)
}

// Escape user-supplied strings before interpolating into HTML to prevent injection
function esc(s: string | undefined | null): string {
  if (!s) return ''
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
}

// Validate email format for replyTo header to prevent header injection
function safeEmail(email: string): string | undefined {
  return /^[^\s@,;<>]+@[^\s@,;<>]+\.[^\s@,;<>]+$/.test(email) ? email : undefined
}

export async function sendListingSubmitted(listing: {
  model: string; year: number; reg: string; price: number; currency?: string | null
  location: string; equip?: string; condition: string
  sellerName: string; sellerEmail: string; contactEmail: string
  id: string
}) {
  await send({
    from: FROM,
    to: ADMIN,
    subject: `[PerfectPlane] New listing pending: ${listing.year} ${esc(listing.model)}`,
    html: `
      <h2>New listing submitted</h2>
      <table>
        <tr><td><b>Aircraft</b></td><td>${esc(String(listing.year))} ${esc(listing.model)}</td></tr>
        <tr><td><b>Reg</b></td><td>${esc(listing.reg)}</td></tr>
        <tr><td><b>Price</b></td><td>${fmtPriceFull(listing.price, listing.currency)}</td></tr>
        <tr><td><b>Location</b></td><td>${esc(listing.location)}</td></tr>
        <tr><td><b>Condition</b></td><td>${esc(listing.condition)}</td></tr>
        <tr><td><b>Equipment</b></td><td>${esc(listing.equip) || 'N/A'}</td></tr>
        <tr><td><b>Seller</b></td><td>${esc(listing.sellerName)} &lt;${esc(listing.sellerEmail)}&gt;</td></tr>
        <tr><td><b>Contact</b></td><td>${esc(listing.contactEmail)}</td></tr>
        <tr><td><b>Listing ID</b></td><td>${esc(listing.id)}</td></tr>
      </table>
      <p>Log in to the admin panel to approve or reject this listing.</p>
    `,
  })
}

export async function sendListingApproved(listing: {
  model: string; year: number; price: number; currency?: string | null; typeRating: boolean
  sellerName: string; sellerEmail: string
}) {
  await send({
    from: FROM,
    to: listing.sellerEmail,
    subject: `[PerfectPlane] Your listing is live!`,
    html: `
      <h2>Your listing has been approved</h2>
      <p>Hi ${esc(listing.sellerName)},</p>
      <p>Your <b>${esc(String(listing.year))} ${esc(listing.model)}</b> listing is now live on PerfectPlane.</p>
      <ul>
        <li>Price: ${fmtPriceFull(listing.price, listing.currency)}</li>
        <li>Type rating: ${listing.typeRating ? 'Required' : 'Not required'}</li>
      </ul>
      <p>Interested buyers can now contact you through the platform.</p>
      <p>— PerfectPlane Team</p>
    `,
  })
}

export async function sendListingRejected(listing: {
  model: string; year: number; sellerName: string; sellerEmail: string
}) {
  await send({
    from: FROM,
    to: listing.sellerEmail,
    subject: `[PerfectPlane] Listing not approved`,
    html: `
      <h2>Listing not approved</h2>
      <p>Hi ${esc(listing.sellerName)},</p>
      <p>Your listing for the ${esc(String(listing.year))} ${esc(listing.model)} was not approved at this time.</p>
      <p>Please reply to this email for more information.</p>
      <p>— PerfectPlane Team</p>
    `,
  })
}

export async function sendJobApplication(application: {
  jobTitle: string; company: string; contactEmail: string
  applicantName: string; applicantEmail: string
  coverLetter: string; cvUrl?: string | null
}) {
  await send({
    from: FROM,
    to: application.contactEmail,
    replyTo: safeEmail(application.applicantEmail),
    subject: `[PerfectPlane] New application: ${esc(application.jobTitle)}`,
    html: `
      <h2>New application for ${esc(application.jobTitle)}</h2>
      <p>A candidate applied through PerfectPlane for the position at <b>${esc(application.company)}</b>.</p>
      <h3>Applicant</h3>
      <ul>
        <li>Name: ${esc(application.applicantName)}</li>
        <li>Email: ${esc(application.applicantEmail)}</li>
        ${application.cvUrl ? `<li>CV: <a href="${esc(application.cvUrl)}">${esc(application.cvUrl)}</a></li>` : ''}
      </ul>
      <h3>Cover letter</h3>
      <p>${esc(application.coverLetter).replace(/\n/g, '<br>')}</p>
      <p>Reply directly to this email to reach the candidate.</p>
    `,
  })
}

export async function sendBuyerInquiry(inquiry: {
  listingModel: string; listingYear: number; listingReg: string; listingPrice: number; currency?: string | null
  sellerEmail?: string | null; sellerName?: string | null
  buyerName: string; buyerEmail: string; buyerPhone?: string; message?: string
}) {
  // Send to the seller's contact email (what "Contact seller" promises the buyer).
  // Fall back to admin only if the listing somehow has no contact email on file,
  // so the inquiry is never silently dropped.
  const to = inquiry.sellerEmail || ADMIN
  await send({
    from: FROM,
    to,
    replyTo: safeEmail(inquiry.buyerEmail),
    subject: `[PerfectPlane] Buyer inquiry: ${inquiry.listingYear} ${esc(inquiry.listingModel)} (${esc(inquiry.listingReg)})`,
    html: `
      <h2>A buyer is interested in your listing</h2>
      ${inquiry.sellerName ? `<p>Hi ${esc(inquiry.sellerName)},</p>` : ''}
      <h3>Aircraft</h3>
      <ul>
        <li>${esc(String(inquiry.listingYear))} ${esc(inquiry.listingModel)}</li>
        <li>Reg: ${esc(inquiry.listingReg)}</li>
        <li>Price: ${fmtPriceFull(inquiry.listingPrice, inquiry.currency)}</li>
      </ul>
      <h3>Buyer</h3>
      <ul>
        <li>Name: ${esc(inquiry.buyerName)}</li>
        <li>Email: ${esc(inquiry.buyerEmail)}</li>
        ${inquiry.buyerPhone ? `<li>Phone: ${esc(inquiry.buyerPhone)}</li>` : ''}
      </ul>
      <h3>Message</h3>
      <p>${esc(inquiry.message) || '(no message)'}</p>
      <p>Reply directly to this email to reach the buyer.</p>
    `,
  })
}
