// src/lib/email.ts
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)
const ADMIN = process.env.ADMIN_EMAIL!
const FROM  = 'PerfectPlane <noreply@perfectplane.com>'
// NOTE: replace noreply@perfectplane.com with a verified domain in Resend

export async function sendListingSubmitted(listing: {
  model: string; year: number; reg: string; price: number
  location: string; equip?: string; condition: string
  sellerName: string; sellerEmail: string; contactEmail: string
  id: string
}) {
  await resend.emails.send({
    from: FROM,
    to: ADMIN,
    subject: `[PerfectPlane] New listing pending: ${listing.year} ${listing.model}`,
    html: `
      <h2>New listing submitted</h2>
      <table>
        <tr><td><b>Aircraft</b></td><td>${listing.year} ${listing.model}</td></tr>
        <tr><td><b>Reg</b></td><td>${listing.reg}</td></tr>
        <tr><td><b>Price</b></td><td>$${listing.price.toLocaleString()}</td></tr>
        <tr><td><b>Location</b></td><td>${listing.location}</td></tr>
        <tr><td><b>Condition</b></td><td>${listing.condition}</td></tr>
        <tr><td><b>Equipment</b></td><td>${listing.equip || 'N/A'}</td></tr>
        <tr><td><b>Seller</b></td><td>${listing.sellerName} &lt;${listing.sellerEmail}&gt;</td></tr>
        <tr><td><b>Contact</b></td><td>${listing.contactEmail}</td></tr>
        <tr><td><b>Listing ID</b></td><td>${listing.id}</td></tr>
      </table>
      <p>Log in to the admin panel to approve or reject this listing.</p>
    `,
  })
}

export async function sendListingApproved(listing: {
  model: string; year: number; price: number; typeRating: boolean
  sellerName: string; sellerEmail: string
}) {
  await resend.emails.send({
    from: FROM,
    to: listing.sellerEmail,
    subject: `[PerfectPlane] Your listing is live!`,
    html: `
      <h2>Your listing has been approved</h2>
      <p>Hi ${listing.sellerName},</p>
      <p>Your <b>${listing.year} ${listing.model}</b> listing is now live on PerfectPlane.</p>
      <ul>
        <li>Price: $${listing.price.toLocaleString()}</li>
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
  await resend.emails.send({
    from: FROM,
    to: listing.sellerEmail,
    subject: `[PerfectPlane] Listing not approved`,
    html: `
      <h2>Listing not approved</h2>
      <p>Hi ${listing.sellerName},</p>
      <p>Your listing for the ${listing.year} ${listing.model} was not approved at this time.</p>
      <p>Please reply to this email for more information.</p>
      <p>— PerfectPlane Team</p>
    `,
  })
}

export async function sendBuyerInquiry(inquiry: {
  listingModel: string; listingYear: number; listingReg: string; listingPrice: number
  buyerName: string; buyerEmail: string; buyerPhone?: string; message?: string
}) {
  await resend.emails.send({
    from: FROM,
    to: ADMIN,
    replyTo: inquiry.buyerEmail,
    subject: `[PerfectPlane] Buyer inquiry: ${inquiry.listingYear} ${inquiry.listingModel} (${inquiry.listingReg})`,
    html: `
      <h2>A buyer is interested in this listing</h2>
      <h3>Aircraft</h3>
      <ul>
        <li>${inquiry.listingYear} ${inquiry.listingModel}</li>
        <li>Reg: ${inquiry.listingReg}</li>
        <li>Price: $${inquiry.listingPrice.toLocaleString()}</li>
      </ul>
      <h3>Buyer</h3>
      <ul>
        <li>Name: ${inquiry.buyerName}</li>
        <li>Email: ${inquiry.buyerEmail}</li>
        ${inquiry.buyerPhone ? `<li>Phone: ${inquiry.buyerPhone}</li>` : ''}
      </ul>
      <h3>Message</h3>
      <p>${inquiry.message || '(no message)'}</p>
      <p>Reply directly to this email to reach the buyer.</p>
    `,
  })
}
