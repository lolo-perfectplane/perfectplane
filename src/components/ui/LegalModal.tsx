'use client'

const TOS_CONTENT = `
**Last updated: July 2, 2026**

## 1. Acceptance of Terms

By accessing or using PerfectPlane ("the Platform", "we", "us", "our"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree, please do not use the Platform.

PerfectPlane is operated as an independent aviation marketplace and aircraft finder. We are not a licensed aircraft broker, dealer, or financial advisor.

## 2. Description of Service

PerfectPlane provides:
- An aircraft matching tool allowing users to filter aircraft by mission parameters (range, cost, passenger count, type)
- A community marketplace where private sellers and buyers can connect directly
- A pilot job listings aggregator
- A fleet management tool for aircraft owners

PerfectPlane acts solely as a **platform intermediary**. We do not sell aircraft, employ pilots, or facilitate financial transactions between buyers and sellers.

## 3. User Accounts

**3.1 Eligibility.** You must be at least 18 years old to create an account.

**3.2 Accuracy.** You agree to provide accurate, current, and complete information when registering and to keep your account information updated.

**3.3 Security.** You are responsible for maintaining the confidentiality of your login credentials and for all activity that occurs under your account.

**3.4 One account per user.** You may not create multiple accounts to circumvent suspensions or listing limits.

## 4. Listings & Marketplace

**4.1 Seller responsibilities.** If you list an aircraft for sale, you represent and warrant that:
- You are the legal owner of the aircraft or have authority to sell it
- All information provided (year, total time, registration, price, photos) is accurate and not misleading
- The aircraft is not subject to any undisclosed liens, encumbrances, or legal disputes

**4.2 Approval process.** All listings are reviewed by PerfectPlane administrators before being published. We reserve the right to reject any listing at our sole discretion without providing reasons.

**4.3 No transaction guarantee.** PerfectPlane does not guarantee that any listing will result in a sale, or that any buyer inquiry is genuine. We are not a party to any transaction between users.

**4.4 No brokerage.** PerfectPlane is not a licensed aircraft broker. Nothing on the Platform constitutes brokerage services, financial advice, or a solicitation to buy or sell.

**4.5 Pricing.** Listing an aircraft on PerfectPlane is currently free of charge. We reserve the right to introduce paid tiers in the future with prior notice.

## 5. User Conduct

You agree not to:
- Post false, misleading, or fraudulent listings
- Harass, threaten, or abuse other users
- Use the Platform to scrape, harvest, or collect data about other users without consent
- Attempt to bypass, disable, or interfere with security features of the Platform
- Use the Platform for any unlawful purpose or in violation of any applicable regulation

## 6. Intellectual Property

All content, branding, code, and design of PerfectPlane (excluding user-submitted content) is the property of PerfectPlane and protected by applicable intellectual property laws.

User-submitted content (listing photos, descriptions) remains the property of the submitting user. By submitting content, you grant PerfectPlane a non-exclusive, royalty-free, worldwide license to display, reproduce, and distribute that content on the Platform for the purpose of operating the service.

## 7. Disclaimer of Warranties

THE PLATFORM IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED. WE DO NOT WARRANT THAT:
- The Platform will be uninterrupted, error-free, or secure
- Any aircraft listing is accurate, complete, or up to date
- Any transaction facilitated through the Platform will be completed or satisfactory

Aircraft transactions involve significant financial and safety risk. Always conduct thorough due diligence, obtain a pre-purchase inspection from a licensed A&P mechanic, and consult qualified legal and financial advisors before purchasing any aircraft.

## 8. Limitation of Liability

To the maximum extent permitted by law, PerfectPlane shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the Platform, including but not limited to losses arising from aircraft transactions, reliance on listing information, or platform unavailability.

## 9. Termination

We reserve the right to suspend or terminate your account at any time for violations of these Terms, fraudulent activity, or at our sole discretion. You may delete your account at any time by contacting us.

## 10. Governing Law

These Terms are governed by the laws of France, without regard to conflict of law principles. Any disputes shall be resolved in the courts of competent jurisdiction in France.

## 11. Changes to Terms

We may update these Terms at any time. Continued use of the Platform after changes constitutes acceptance of the updated Terms. We will notify registered users of material changes by email.

## 12. Contact

For any questions regarding these Terms, contact us at: **legal@perfectplane.com**
`

const PRIVACY_CONTENT = `
**Last updated: July 2, 2026**

PerfectPlane ("we", "us", "our") is committed to protecting your personal data. This Privacy Policy explains how we collect, use, store, and protect your information when you use the Platform.

## 1. Data Controller

PerfectPlane
Contact: **privacy@perfectplane.com**

## 2. Data We Collect

**2.1 Account data.** When you register, we collect:
- Name
- Email address
- Password (stored in hashed form — never readable by us)
- Role (user / admin)

**2.2 Listing data.** When you submit an aircraft listing, we collect:
- Aircraft details (model, year, registration, hours, price, location, equipment)
- Contact email for the listing
- Photos you upload

**2.3 Usage data.** We may collect:
- Pages visited and features used
- Browser type and device information
- Approximate location (country/region) via IP address
- Time and date of access

**2.4 Communications.** When you use the contact form to reach a seller, we collect the message content and your contact details to facilitate delivery.

## 3. How We Use Your Data

We use your data to:
- Operate and maintain your account
- Display and manage aircraft listings
- Facilitate communication between buyers and sellers
- Moderate and approve listings
- Send transactional emails (account confirmation, listing approval notifications)
- Improve and secure the Platform
- Comply with legal obligations

We do **not** sell your personal data to third parties. We do **not** use your data for automated profiling or AI-based decision-making that produces legal effects.

## 4. Legal Basis for Processing (GDPR)

For users in the European Economic Area (EEA), we process your personal data on the following legal bases:
- **Contract performance** — processing necessary to provide you with the service you requested (account management, listings)
- **Legitimate interests** — Platform security, fraud prevention, and service improvement
- **Legal obligation** — where required by applicable law
- **Consent** — for any optional communications (e.g. marketing emails), where we will ask for your explicit consent

## 5. Data Sharing

We share your data only with:

**Supabase** — our database and authentication provider (servers located in the EU). Your account data, listing data, and uploaded photos are stored on Supabase infrastructure. Supabase is GDPR compliant.

**Vercel** — our hosting provider. Web requests pass through Vercel's infrastructure. Vercel is GDPR compliant.

**Resend** — our email delivery provider, used for transactional emails. Only your email address and relevant message content are shared for delivery purposes.

**Mapbox** — provides the interactive globe/map feature. Approximate location data (based on map interaction) may be processed by Mapbox.

We do not share your data with advertisers, data brokers, or any other third parties.

## 6. Data Retention

- **Account data**: retained for as long as your account is active. Deleted within 30 days of account deletion request.
- **Listing data**: retained for as long as the listing is active. Removed upon your request or account deletion.
- **Uploaded photos**: stored in Supabase Storage. Deleted upon listing removal or account deletion.
- **Usage logs**: retained for a maximum of 90 days for security purposes.

## 7. Your Rights (GDPR)

If you are in the EEA or UK, you have the right to:
- **Access** — request a copy of the personal data we hold about you
- **Rectification** — request correction of inaccurate data
- **Erasure** — request deletion of your data ("right to be forgotten")
- **Portability** — receive your data in a structured, machine-readable format
- **Restriction** — request that we limit how we process your data
- **Objection** — object to processing based on legitimate interests
- **Withdraw consent** — at any time, for processing based on consent

To exercise any of these rights, contact us at **privacy@perfectplane.com**. We will respond within 30 days.

You also have the right to lodge a complaint with your national data protection authority (e.g. CNIL in France, ICO in the UK).

## 8. Cookies

PerfectPlane uses two categories of cookies:

- **Essential cookies** — required for authentication and session management (via Supabase Auth). These are always active and cannot be disabled, as the app cannot function without them.
- **Analytics cookies** — via Google Tag Manager and Google Analytics, used to understand how the app is used and to improve it (page views, feature usage). We do not use advertising cookies or third-party ad tracking.

Analytics cookies are only loaded after you give consent, which we ask for at the end of the onboarding tour. You can accept or decline at that point, and your choice is remembered on this device. Declining does not affect access to any feature of the app.

## 9. Data Security

We implement appropriate technical and organisational measures to protect your data, including:
- Encrypted connections (HTTPS/TLS) for all data in transit
- Hashed password storage (never stored in plain text)
- Row-level security policies on our database (Supabase RLS)
- Access controls limiting who can view user data

No system is 100% secure. In the event of a data breach affecting your rights and freedoms, we will notify you and the relevant supervisory authority as required by law.

## 10. International Transfers

Your data is primarily stored and processed within the EU (Supabase EU region). Where any transfer outside the EEA occurs (e.g. Vercel edge network), we ensure appropriate safeguards are in place (Standard Contractual Clauses or equivalent).

## 11. Children's Privacy

PerfectPlane is not directed at children under 16. We do not knowingly collect personal data from children. If you believe a child has provided us with personal data, contact us and we will delete it promptly.

## 12. Changes to This Policy

We may update this Privacy Policy from time to time. We will notify registered users of material changes by email and update the "Last updated" date above.

## 13. Contact

For any privacy-related questions or requests: **privacy@perfectplane.com**

For urgent matters related to data breaches or legal requests: **legal@perfectplane.com**
`

function renderContent(text: string) {
  const lines = text.trim().split('\n')
  const elements: React.ReactNode[] = []
  let key = 0

  const renderInline = (line: string) => {
    const parts = line.split(/(\*\*[^*]+\*\*)/)
    return parts.map((p, i) =>
      p.startsWith('**') && p.endsWith('**')
        ? <strong key={i}>{p.slice(2, -2)}</strong>
        : p
    )
  }

  for (const line of lines) {
    if (line.startsWith('## ')) {
      elements.push(<h3 key={key++} style={{ fontSize: 13, fontWeight: 700, color: '#1d1d1f', margin: '20px 0 6px', letterSpacing: '-0.01em' }}>{line.slice(3)}</h3>)
    } else if (line.startsWith('- ')) {
      elements.push(<li key={key++} style={{ fontSize: 13, color: '#3a3a3c', lineHeight: 1.6, marginLeft: 16, marginBottom: 3 }}>{renderInline(line.slice(2))}</li>)
    } else if (line.trim() === '') {
      elements.push(<div key={key++} style={{ height: 4 }} />)
    } else {
      elements.push(<p key={key++} style={{ fontSize: 13, color: '#3a3a3c', lineHeight: 1.7, margin: '0 0 6px' }}>{renderInline(line)}</p>)
    }
  }
  return elements
}

type Props = {
  doc: 'tos' | 'privacy'
  onClose: () => void
}

export default function LegalModal({ doc, onClose }: Props) {
  const title  = doc === 'tos' ? 'Terms of Service' : 'Privacy Policy'
  const content = doc === 'tos' ? TOS_CONTENT : PRIVACY_CONTENT

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 500,
        background: 'rgba(0,0,0,0.45)',
        backdropFilter: 'blur(6px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 16,
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          width: '100%', maxWidth: 560,
          maxHeight: '82vh',
          background: '#fff',
          borderRadius: 20,
          boxShadow: '0 24px 64px rgba(0,0,0,0.22)',
          display: 'flex', flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 20px 14px', borderBottom: '0.5px solid rgba(0,0,0,0.08)', flexShrink: 0 }}>
          <span style={{ fontSize: 16, fontWeight: 700, color: '#1d1d1f', letterSpacing: '-0.02em' }}>{title}</span>
          <button onClick={onClose} style={{ width: 28, height: 28, borderRadius: '50%', border: 'none', background: 'rgba(0,0,0,0.06)', color: '#86868b', fontSize: 16, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'inherit' }}>✕</button>
        </div>

        {/* Scrollable body */}
        <div style={{ overflowY: 'auto', padding: '16px 20px 24px', flex: 1 }}>
          {renderContent(content)}
        </div>
      </div>
    </div>
  )
}
