import { PrismaClient, ProspectStatus } from '@prisma/client'

const prisma = new PrismaClient()

function daysAgo(n: number) {
  return new Date(Date.now() - n * 24 * 60 * 60 * 1000)
}

function hoursAgo(n: number) {
  return new Date(Date.now() - n * 60 * 60 * 1000)
}

interface SeedProspect {
  businessName: string
  industry: string
  location: string
  website: string
  phone: string
  address: string
  status: ProspectStatus
  createdAt: Date
  updatedAt: Date
  opportunityScore?: number
  leadQuality?: string
  estimatedHoursSaved?: string
  estimatedProjectValue?: string
  estimatedMonthlyRevenue?: string
  recommendedBixSolution?: string
  executiveSummary?: string
  services?: string[]
  targetCustomers?: string[]
  customerJourney?: { step: string; description: string; friction?: string }[]
  detectedSoftware?: { found: string[]; missing: string[] }
  manualProcesses?: string[]
  painPoints?: string[]
  automationOpportunities?: {
    title: string
    description: string
    businessImpact?: string
    estimatedHoursSavedPerMonth?: string
    recommendedBixService?: string
  }[]
  businessImpact?: string[]
  recommendedBixSolutions?: {
    service: string
    whyItFits: string
    expectedImpact: string
    implementation: string
    estimatedPriceRange: string
  }[]
  coldEmailDraft?: string
  linkedinMessage?: string
  salesTalkingPoints?: string[]
  notes?: { id: string; author: string; timestamp: string; note: string }[]
  activities: { type: string; message: string; createdAt: Date }[]
}

const prospects: SeedProspect[] = [
  // ---------- AUDIT BOOKED (needs attention, high score) ----------
  {
    businessName: 'Glow & Grace Med Spa',
    industry: 'Med Spa',
    location: 'Scottsdale, AZ',
    website: 'https://glowandgracemedspa.com',
    phone: '(480) 555-0142',
    address: '7150 E Camelback Rd, Scottsdale, AZ 85251',
    status: 'audit_booked',
    createdAt: daysAgo(11),
    updatedAt: hoursAgo(6),
    opportunityScore: 92,
    leadQuality: 'Excellent',
    estimatedHoursSaved: '18 hrs/month',
    estimatedProjectValue: '$9,500 – $14,000',
    estimatedMonthlyRevenue: '$450 – $900/mo',
    recommendedBixSolution: 'BIX Booking + Workflow Automation',
    executiveSummary:
      'Glow & Grace is a high-end med spa offering Botox, laser hair removal, and HydraFacial treatments across two locations. Their site drives strong organic traffic but funnels every visitor to a static "Call to Book" phone number with no online scheduling, forcing front-desk staff to manually juggle a paper appointment book and a separate intake-form PDF. Consultation intake is done over email, creating multi-day delays between inquiry and first appointment.',
    services: ['Botox & Dysport', 'Laser Hair Removal', 'HydraFacial', 'Chemical Peels', 'Med Spa Memberships'],
    targetCustomers: ['Women 30-55 seeking anti-aging treatments', 'Local professionals', 'Membership subscribers'],
    customerJourney: [
      { step: 'Discovery', description: 'Finds business via Google/Instagram ads' },
      { step: 'Contact', description: 'Calls front desk or emails for consultation', friction: 'No online booking widget on site' },
      { step: 'Intake', description: 'Front desk emails a PDF intake form to fill out manually', friction: 'PDF must be printed, signed, scanned back' },
      { step: 'Booking', description: 'Staff manually finds a slot in a physical appointment book', friction: 'Double-booking risk, no automated reminders' },
      { step: 'Follow-up', description: 'No automated post-visit or rebooking reminder' },
    ],
    detectedSoftware: { found: ['Instagram Business', 'Mailchimp (basic newsletter)'], missing: ['Online booking system', 'CRM', 'Automated reminders', 'Digital intake forms'] },
    manualProcesses: ['Phone/email-only booking', 'Paper appointment book', 'PDF intake forms sent manually', 'Manual appointment reminders via text'],
    painPoints: [
      'Front desk spends 2-3 hours daily on phone scheduling',
      'No-show rate is high due to manual, inconsistent reminders',
      'Consultation-to-booking lag of 3-5 days loses warm leads',
      'No membership or package renewal automation',
    ],
    automationOpportunities: [
      { title: 'Online booking widget', description: 'Add real-time booking with deposit collection directly on the website.', businessImpact: 'Reduces phone volume and captures after-hours bookings', estimatedHoursSavedPerMonth: '10 hrs', recommendedBixService: 'BIX Booking' },
      { title: 'Automated intake + reminders', description: 'Digital intake forms triggered on booking, plus SMS/email reminders 48h and 2h before appointment.', businessImpact: 'Cuts no-shows significantly', estimatedHoursSavedPerMonth: '6 hrs', recommendedBixService: 'Workflow Automation' },
      { title: 'Membership renewal workflow', description: 'Automated renewal reminders and upsell sequences for membership clients.', businessImpact: 'Improves membership retention revenue', estimatedHoursSavedPerMonth: '2 hrs', recommendedBixService: 'Workflow Automation' },
    ],
    businessImpact: ['Recover ~$3-5k/mo in lost bookings from after-hours inquiries', 'Lower no-show rate frees up 10+ appointment slots weekly', 'Frees front desk to focus on in-person client experience'],
    recommendedBixSolutions: [
      { service: 'BIX Booking', whyItFits: 'No online scheduling exists today; high call volume', expectedImpact: 'Capture 24/7 bookings, reduce no-shows', implementation: '2-3 week build with deposit + intake integration', estimatedPriceRange: '$6,000 – $9,000' },
      { service: 'Workflow Automation', whyItFits: 'Manual reminders and renewals eat staff time', expectedImpact: 'Save ~18 hrs/month of admin work', implementation: 'Automated SMS/email sequences', estimatedPriceRange: '$3,500 – $5,000' },
    ],
    coldEmailDraft:
      'Subject: Quick idea for Glow & Grace\n\nHi there,\n\nI came across Glow & Grace while looking at med spas in Scottsdale — love the HydraFacial + membership combo.\n\nI noticed booking still runs through phone calls, which likely means missed appointments after hours. We help med spas like yours add online booking with automated reminders, usually saving 15-20 hours a month in front-desk time and recovering after-hours bookings you\'re currently losing.\n\nWould you be open to a free automation audit? I can walk through exactly where the time and revenue are leaking in under 20 minutes.\n\nBest,\nBIX Team',
    linkedinMessage:
      'Hi! I help med spas automate booking and intake so front-desk teams stop chasing phone calls. Noticed Glow & Grace doesn\'t have online scheduling yet — would love to share a quick free audit if useful.',
    salesTalkingPoints: [
      'Lead with after-hours booking loss — quantify with local search volume',
      'Mention membership renewal automation as a revenue-retention angle',
      'They already invest in Instagram ads, so ROI framing on ad-to-booking conversion will land well',
    ],
    notes: [
      { id: 'n1', author: 'Sheneska', timestamp: hoursAgo(4).toISOString(), note: 'Audit call booked for Thursday 2pm. Owner (Maria) sounded very interested in the booking automation piece specifically.' },
    ],
    activities: [
      { type: 'system', message: 'Prospect created from Google Places search', createdAt: daysAgo(11) },
      { type: 'ai', message: 'Website analysis completed — opportunity score 92', createdAt: daysAgo(9) },
      { type: 'user', message: 'Marked as analyzed', createdAt: daysAgo(9) },
      { type: 'user', message: 'Cold email sent to maria@glowandgracemedspa.com', createdAt: daysAgo(7) },
      { type: 'user', message: 'Status changed to contacted', createdAt: daysAgo(7) },
      { type: 'user', message: 'Maria replied — interested in a call', createdAt: daysAgo(2) },
      { type: 'user', message: 'Audit call booked for Thursday 2:00 PM', createdAt: hoursAgo(6) },
    ],
  },

  // ---------- REPLIED ----------
  {
    businessName: 'Redwood Property Management',
    industry: 'Property Management',
    location: 'Portland, OR',
    website: 'https://redwoodpm.com',
    phone: '(503) 555-0198',
    address: '2200 NW Northrup St, Portland, OR 97210',
    status: 'replied',
    createdAt: daysAgo(14),
    updatedAt: hoursAgo(14),
    opportunityScore: 87,
    leadQuality: 'Excellent',
    estimatedHoursSaved: '24 hrs/month',
    estimatedProjectValue: '$12,000 – $18,000',
    estimatedMonthlyRevenue: '$600 – $1,200/mo',
    recommendedBixSolution: 'BIX Client Portal + Workflow Automation',
    executiveSummary:
      'Redwood manages roughly 340 residential units across the Portland metro. Maintenance requests currently come through a shared inbox and phone tree, with tenants having no self-service way to check request status. Rent collection is handled via mailed checks and a third-party payment link with no unified portal.',
    services: ['Residential Property Management', 'Tenant Placement', 'Maintenance Coordination', 'Rent Collection'],
    targetCustomers: ['Landlords with 5-50 unit portfolios', 'Tenants in managed properties'],
    customerJourney: [
      { step: 'Tenant issue arises', description: 'Tenant emails or calls the office', friction: 'No ticketing system, easy to lose requests' },
      { step: 'Triage', description: 'Staff manually assigns to a vendor via phone/text' },
      { step: 'Resolution', description: 'No status visibility for tenant', friction: 'Tenants call repeatedly for updates' },
      { step: 'Payment', description: 'Rent paid via mailed check or generic payment link', friction: 'No portal, no auto-reconciliation' },
    ],
    detectedSoftware: { found: ['QuickBooks (accounting)', 'Generic payment link (Stripe)'], missing: ['Tenant portal', 'Maintenance ticketing system', 'Automated rent reminders'] },
    manualProcesses: ['Maintenance requests via shared inbox', 'Manual vendor dispatch by phone', 'Rent reminders sent manually', 'No centralized tenant communication log'],
    painPoints: [
      'Maintenance requests get lost between email and phone',
      'Staff fields 15+ "status update" calls per week',
      'Late rent follow-ups are inconsistent',
      'No visibility into vendor response times',
    ],
    automationOpportunities: [
      { title: 'Tenant self-service portal', description: 'Give tenants a portal to submit and track maintenance requests and pay rent.', businessImpact: 'Cuts status-check calls dramatically', estimatedHoursSavedPerMonth: '14 hrs', recommendedBixService: 'BIX Client Portal' },
      { title: 'Automated maintenance dispatch', description: 'Auto-route requests to the right vendor based on category and send status updates.', businessImpact: 'Faster resolution, fewer escalations', estimatedHoursSavedPerMonth: '8 hrs', recommendedBixService: 'Workflow Automation' },
      { title: 'Automated rent reminders', description: 'SMS/email reminders before due date and automatic late notices.', businessImpact: 'Improves on-time payment rate', estimatedHoursSavedPerMonth: '2 hrs', recommendedBixService: 'Workflow Automation' },
    ],
    businessImpact: ['Reduce inbound call volume by an estimated 60%', 'Improve tenant satisfaction and retention', 'Faster maintenance turnaround improves unit ratings'],
    recommendedBixSolutions: [
      { service: 'BIX Client Portal', whyItFits: 'No self-service exists for 340+ tenants today', expectedImpact: 'Major reduction in support overhead', implementation: '4-5 week build with rent + maintenance modules', estimatedPriceRange: '$9,000 – $13,000' },
      { service: 'Workflow Automation', whyItFits: 'Vendor dispatch and reminders are fully manual', expectedImpact: 'Save ~24 hrs/month across staff', implementation: 'Automated routing + notification sequences', estimatedPriceRange: '$3,000 – $5,000' },
    ],
    coldEmailDraft:
      'Subject: Quick idea for Redwood Property Management\n\nHi,\n\nManaging 300+ units means maintenance requests and rent questions can bury a small team fast. Noticed Redwood doesn\'t have a tenant portal yet — that\'s usually where we see the biggest time savings for property managers your size.\n\nWe build tenant portals that handle maintenance requests, status updates, and rent payments in one place, typically cutting phone volume by more than half.\n\nOpen to a free automation audit to see where the biggest wins would be for your team?\n\nBest,\nBIX Team',
    linkedinMessage: 'Hi! We help property management companies cut down on maintenance-status calls with self-service tenant portals. Would a quick free audit be useful for Redwood?',
    salesTalkingPoints: ['They already use QuickBooks — portal should sync payment data', 'Emphasize tenant retention angle, not just staff time savings', 'Ask about current vendor network for maintenance module scope'],
    notes: [{ id: 'n1', author: 'Sheneska', timestamp: hoursAgo(14).toISOString(), note: 'They replied asking for pricing ranges before committing to a call. Sent estimated project value doc.' }],
    activities: [
      { type: 'system', message: 'Prospect created from Google Places search', createdAt: daysAgo(14) },
      { type: 'ai', message: 'Website analysis completed — opportunity score 87', createdAt: daysAgo(12) },
      { type: 'user', message: 'Cold email sent', createdAt: daysAgo(10) },
      { type: 'user', message: 'Status changed to contacted', createdAt: daysAgo(10) },
      { type: 'user', message: 'Reply received — asked for pricing details', createdAt: hoursAgo(14) },
    ],
  },

  // ---------- PROPOSAL SENT ----------
  {
    businessName: 'Coastal Vision Eye Care',
    industry: 'Specialty Medical',
    location: 'Charleston, SC',
    website: 'https://coastalvisioneyecare.com',
    phone: '(843) 555-0117',
    address: '18 Broad St, Charleston, SC 29401',
    status: 'proposal_sent',
    createdAt: daysAgo(20),
    updatedAt: daysAgo(4),
    opportunityScore: 78,
    leadQuality: 'Good',
    estimatedHoursSaved: '12 hrs/month',
    estimatedProjectValue: '$7,500 – $11,000',
    estimatedMonthlyRevenue: '$300 – $600/mo',
    recommendedBixSolution: 'Website Redesign + BIX Booking',
    executiveSummary:
      'Coastal Vision is a two-optometrist practice with a dated Wix website that loads slowly on mobile and lacks any appointment booking. Patients must call during business hours only; insurance verification is handled manually by front desk staff before every visit.',
    services: ['Eye Exams', 'Contact Lens Fittings', 'Glasses & Frames', 'LASIK Referrals'],
    targetCustomers: ['Local families', 'Insurance-covered patients', 'Referral patients from LASIK partners'],
    customerJourney: [
      { step: 'Search', description: 'Patient finds practice via insurance directory or Google' },
      { step: 'Site visit', description: 'Slow-loading mobile site, no booking CTA', friction: 'High bounce rate on mobile' },
      { step: 'Booking', description: 'Must call during business hours', friction: 'Loses after-hours leads' },
      { step: 'Insurance check', description: 'Manually verified by front desk before appointment', friction: 'Time-consuming, error-prone' },
    ],
    detectedSoftware: { found: ['Wix website builder', 'Basic email newsletter'], missing: ['Online booking', 'Insurance verification tool', 'Mobile-optimized site'] },
    manualProcesses: ['Phone-only scheduling', 'Manual insurance verification', 'No automated appointment reminders'],
    painPoints: ['Slow, dated website hurts mobile conversion', 'No online booking loses after-hours leads', 'Front desk spends significant time on insurance calls'],
    automationOpportunities: [
      { title: 'Modern responsive website', description: 'Rebuild site with fast mobile performance and clear booking CTAs.', businessImpact: 'Improves conversion from search traffic', estimatedHoursSavedPerMonth: '3 hrs', recommendedBixService: 'Website Redesign' },
      { title: 'Online appointment booking', description: 'Real-time scheduling synced to practice management software.', businessImpact: 'Captures after-hours bookings', estimatedHoursSavedPerMonth: '6 hrs', recommendedBixService: 'BIX Booking' },
      { title: 'Automated insurance pre-check', description: 'Collect insurance info at booking and flag verification needs automatically.', businessImpact: 'Reduces day-of delays', estimatedHoursSavedPerMonth: '3 hrs', recommendedBixService: 'Workflow Automation' },
    ],
    businessImpact: ['Recover mobile traffic currently bouncing off slow site', 'Capture after-hours booking demand', 'Reduce front-desk insurance-verification workload'],
    recommendedBixSolutions: [
      { service: 'Website Redesign', whyItFits: 'Current Wix site is slow and dated', expectedImpact: 'Higher conversion from organic/insurance-directory traffic', implementation: '3 week rebuild', estimatedPriceRange: '$4,500 – $6,500' },
      { service: 'BIX Booking', whyItFits: 'No online scheduling exists', expectedImpact: 'Capture after-hours bookings', implementation: '2 week integration', estimatedPriceRange: '$3,000 – $4,500' },
    ],
    coldEmailDraft:
      'Subject: Quick idea for Coastal Vision Eye Care\n\nHi,\n\nNoticed your website takes a while to load on mobile and doesn\'t have online booking — that combination usually costs practices a good chunk of after-hours appointment requests.\n\nWe rebuild sites for specialty practices with fast mobile pages and built-in scheduling, so patients can book anytime instead of waiting for a call-back window.\n\nWould a free automation audit be useful to see what it\'d take?\n\nBest,\nBIX Team',
    linkedinMessage: 'Hi! We help specialty practices modernize their website and add online booking. Happy to share a free audit for Coastal Vision if useful.',
    salesTalkingPoints: ['Proposal sent covers both website + booking bundle', 'Emphasize mobile bounce-rate data point in follow-up', 'Two-doctor practice — decision likely needs both partners to sign off'],
    notes: [{ id: 'n1', author: 'Sheneska', timestamp: daysAgo(4).toISOString(), note: 'Sent bundled proposal (website + booking) at $9,800. Following up early next week if no response.' }],
    activities: [
      { type: 'system', message: 'Prospect created from Google Places search', createdAt: daysAgo(20) },
      { type: 'ai', message: 'Website analysis completed — opportunity score 78', createdAt: daysAgo(17) },
      { type: 'user', message: 'Cold email sent', createdAt: daysAgo(15) },
      { type: 'user', message: 'Reply received — requested proposal', createdAt: daysAgo(9) },
      { type: 'user', message: 'Proposal sent ($9,800 bundle)', createdAt: daysAgo(4) },
    ],
  },

  // ---------- CONTACTED (stale, needs follow-up) ----------
  {
    businessName: 'Ironclad Insurance Group',
    industry: 'Insurance Agency',
    location: 'Columbus, OH',
    website: 'https://ironcladinsurancegroup.com',
    phone: '(614) 555-0163',
    address: '88 E Broad St, Columbus, OH 43215',
    status: 'contacted',
    createdAt: daysAgo(16),
    updatedAt: daysAgo(6),
    opportunityScore: 71,
    leadQuality: 'Good',
    estimatedHoursSaved: '10 hrs/month',
    estimatedProjectValue: '$6,000 – $9,000',
    recommendedBixSolution: 'Workflow Automation',
    executiveSummary:
      'Ironclad is an independent insurance agency handling auto, home, and small commercial policies. Quote requests come through a generic contact form that dumps into a shared inbox with no routing logic, and policy renewal reminders are tracked in a spreadsheet.',
    services: ['Auto Insurance', 'Home Insurance', 'Small Commercial Policies', 'Life Insurance'],
    targetCustomers: ['Local homeowners', 'Small business owners', 'Auto policy shoppers'],
    customerJourney: [
      { step: 'Quote request', description: 'Generic contact form submission', friction: 'No routing to right agent by policy type' },
      { step: 'Follow-up', description: 'Agent manually emails back within 1-2 days', friction: 'Slow response loses price-comparison shoppers' },
      { step: 'Renewal', description: 'Tracked in a spreadsheet', friction: 'Renewals occasionally missed' },
    ],
    detectedSoftware: { found: ['WordPress site', 'Generic contact form plugin'], missing: ['CRM', 'Automated quote routing', 'Renewal reminder automation'] },
    manualProcesses: ['Manual quote-request routing', 'Spreadsheet-tracked renewals', 'No automated follow-up sequence'],
    painPoints: ['Slow quote response loses comparison shoppers', 'Renewal tracking in spreadsheet risks missed renewals', 'No lead routing by policy type'],
    automationOpportunities: [
      { title: 'Smart quote routing', description: 'Route incoming quote requests to the right agent automatically based on policy type.', businessImpact: 'Faster response time, higher close rate', estimatedHoursSavedPerMonth: '5 hrs', recommendedBixService: 'Workflow Automation' },
      { title: 'Automated renewal reminders', description: 'Replace spreadsheet tracking with automated reminder sequences.', businessImpact: 'Reduces missed renewals', estimatedHoursSavedPerMonth: '5 hrs', recommendedBixService: 'Workflow Automation' },
    ],
    businessImpact: ['Faster quote turnaround improves close rate on price-sensitive shoppers', 'Eliminates renewal tracking risk'],
    recommendedBixSolutions: [
      { service: 'Workflow Automation', whyItFits: 'Both quoting and renewals are fully manual/spreadsheet-based', expectedImpact: 'Save ~10 hrs/month, reduce missed renewals', implementation: '2-3 week automation build', estimatedPriceRange: '$6,000 – $9,000' },
    ],
    coldEmailDraft:
      'Subject: Quick idea for Ironclad Insurance Group\n\nHi,\n\nQuote requests that sit in a shared inbox usually mean slower response times — and in insurance, the fastest quote often wins the policy.\n\nWe help agencies automatically route quote requests to the right agent and replace spreadsheet renewal tracking with automated reminders.\n\nWorth a free automation audit to see where you\'re leaving business on the table?\n\nBest,\nBIX Team',
    linkedinMessage: 'Hi! We help insurance agencies speed up quote response time and automate renewal tracking. Free audit available if useful for Ironclad.',
    salesTalkingPoints: ['No reply yet after initial outreach — try a shorter follow-up focused on renewal risk', 'Mention faster-quote-wins-the-policy angle'],
    activities: [
      { type: 'system', message: 'Prospect created from Google Places search', createdAt: daysAgo(16) },
      { type: 'ai', message: 'Website analysis completed — opportunity score 71', createdAt: daysAgo(13) },
      { type: 'user', message: 'Cold email sent', createdAt: daysAgo(6) },
      { type: 'user', message: 'Status changed to contacted', createdAt: daysAgo(6) },
    ],
  },

  // ---------- ANALYZED (ready for outreach) ----------
  {
    businessName: 'Ledger & Lane Accounting',
    industry: 'Accounting Firm',
    location: 'Austin, TX',
    website: 'https://ledgerandlane.com',
    phone: '(512) 555-0129',
    address: '600 Congress Ave, Austin, TX 78701',
    status: 'analyzed',
    createdAt: daysAgo(5),
    updatedAt: daysAgo(2),
    opportunityScore: 84,
    leadQuality: 'Excellent',
    estimatedHoursSaved: '20 hrs/month',
    estimatedProjectValue: '$8,000 – $12,000',
    estimatedMonthlyRevenue: '$400 – $800/mo',
    recommendedBixSolution: 'Workflow Automation + BIX Client Portal',
    executiveSummary:
      'Ledger & Lane is a boutique accounting firm serving ~120 small business clients for bookkeeping and tax prep. Document collection during tax season happens via email attachments, creating version-control chaos and security concerns. Client status updates require a phone call.',
    services: ['Bookkeeping', 'Tax Preparation', 'Payroll Processing', 'CFO Advisory'],
    targetCustomers: ['Small business owners', 'Solo entrepreneurs', 'Growing startups needing CFO advisory'],
    customerJourney: [
      { step: 'Onboarding', description: 'New client fills a PDF intake form emailed back and forth' },
      { step: 'Document collection', description: 'Clients email tax documents as attachments', friction: 'Version control chaos, security risk' },
      { step: 'Status check', description: 'Client calls to check return/bookkeeping status', friction: 'No self-service visibility' },
    ],
    detectedSoftware: { found: ['QuickBooks Online', 'Basic email'], missing: ['Secure client portal', 'Automated document collection', 'Status tracking dashboard'] },
    manualProcesses: ['Email-based document collection', 'Manual status updates via phone', 'PDF intake forms'],
    painPoints: ['Document collection via email is insecure and disorganized', 'Staff fields frequent "where\'s my return" calls', 'Onboarding new clients takes multiple email round-trips'],
    automationOpportunities: [
      { title: 'Secure client portal', description: 'Give clients a portal for document upload and status tracking.', businessImpact: 'Eliminates insecure email attachments', estimatedHoursSavedPerMonth: '12 hrs', recommendedBixService: 'BIX Client Portal' },
      { title: 'Automated onboarding workflow', description: 'Digital intake forms triggered automatically for new clients.', businessImpact: 'Faster onboarding, fewer errors', estimatedHoursSavedPerMonth: '8 hrs', recommendedBixService: 'Workflow Automation' },
    ],
    businessImpact: ['Improves document security and compliance posture', 'Reduces status-check call volume significantly', 'Speeds up new client onboarding during peak season'],
    recommendedBixSolutions: [
      { service: 'BIX Client Portal', whyItFits: 'All 120 clients currently share documents over email', expectedImpact: 'Major security and efficiency improvement', implementation: '4 week build integrated with QuickBooks', estimatedPriceRange: '$6,000 – $8,500' },
      { service: 'Workflow Automation', whyItFits: 'Onboarding is fully manual today', expectedImpact: 'Save ~20 hrs/month during tax season', implementation: 'Automated intake sequences', estimatedPriceRange: '$2,500 – $3,500' },
    ],
    coldEmailDraft:
      'Subject: Quick idea for Ledger & Lane\n\nHi,\n\nWith ~120 clients, collecting tax documents over email attachments each season probably creates more version-control headaches than it\'s worth — and it\'s a security risk too.\n\nWe build secure client portals for accounting firms so clients upload documents and check status without a phone call, and automate new client onboarding end to end.\n\nWould a free automation audit be useful to see where the time savings are biggest for your team?\n\nBest,\nBIX Team',
    linkedinMessage: 'Hi! We help accounting firms replace email-based document collection with secure client portals. Free audit available if it\'d be useful for Ledger & Lane.',
    salesTalkingPoints: ['Timing matters — pitch before next tax season ramp-up', 'Security/compliance angle will resonate with an accounting audience', 'They already use QuickBooks Online — portal integration is a natural extension'],
    activities: [
      { type: 'system', message: 'Prospect created from Google Places search', createdAt: daysAgo(5) },
      { type: 'ai', message: 'Website analysis completed — opportunity score 84', createdAt: daysAgo(2) },
      { type: 'user', message: 'Marked as analyzed, ready for outreach', createdAt: daysAgo(2) },
    ],
  },

  // ---------- EMAIL DRAFTED ----------
  {
    businessName: 'Sunridge Family Dental',
    industry: 'Specialty Medical',
    location: 'Denver, CO',
    website: 'https://sunridgefamilydental.com',
    phone: '(303) 555-0187',
    address: '4500 Cherry Creek Dr S, Denver, CO 80246',
    status: 'email_drafted',
    createdAt: daysAgo(4),
    updatedAt: daysAgo(1),
    opportunityScore: 68,
    leadQuality: 'Good',
    estimatedHoursSaved: '8 hrs/month',
    estimatedProjectValue: '$5,000 – $7,500',
    recommendedBixSolution: 'BIX Booking',
    executiveSummary:
      'Sunridge Family Dental is a general dentistry practice with three chairs. They use a booking widget from their EHR vendor, but it\'s clunky, buried three clicks deep, and not mobile-friendly, so most patients still call.',
    services: ['General Dentistry', 'Teeth Cleaning', 'Cosmetic Dentistry', 'Emergency Dental Care'],
    targetCustomers: ['Local families', 'Walk-in emergency patients'],
    customerJourney: [
      { step: 'Search', description: 'Patient searches "dentist near me"' },
      { step: 'Booking attempt', description: 'Existing booking widget buried in navigation, not mobile-friendly', friction: 'Most give up and call instead' },
    ],
    detectedSoftware: { found: ['EHR-integrated booking widget (underused)', 'Basic website'], missing: ['Mobile-optimized booking flow', 'Automated reminders'] },
    manualProcesses: ['Most bookings still handled by phone despite having a widget', 'Manual reminder calls'],
    painPoints: ['Existing booking tool is underused due to poor placement/UX', 'High reliance on phone bookings despite having tooling'],
    automationOpportunities: [
      { title: 'Redesigned booking flow', description: 'Surface booking prominently and streamline to fewer clicks, mobile-first.', businessImpact: 'Increases self-service booking adoption', estimatedHoursSavedPerMonth: '8 hrs', recommendedBixService: 'BIX Booking' },
    ],
    businessImpact: ['Higher adoption of existing booking tool reduces phone load', 'Better mobile conversion from search traffic'],
    recommendedBixSolutions: [
      { service: 'BIX Booking', whyItFits: 'Tool exists but is poorly surfaced and not mobile-optimized', expectedImpact: 'Higher self-service adoption', implementation: '1-2 week UX overhaul + integration', estimatedPriceRange: '$5,000 – $7,500' },
    ],
    coldEmailDraft:
      'Subject: Quick idea for Sunridge Family Dental\n\nHi,\n\nNoticed your site has a booking widget, but it\'s a few clicks deep and not very mobile-friendly — which usually means most patients give up and call instead.\n\nWe help dental practices bring booking front-and-center with a mobile-first flow, so the tool you already pay for actually gets used.\n\nOpen to a free automation audit to see the quick wins here?\n\nBest,\nBIX Team',
    linkedinMessage: 'Hi! Noticed your online booking widget is a bit buried — we help practices fix that so patients actually use it. Free audit if useful?',
    salesTalkingPoints: ['Frame as a quick win, not a rebuild — lower price point may close faster', 'They already pay for an EHR booking tool, so this is optimization not new spend'],
    activities: [
      { type: 'system', message: 'Prospect created from Google Places search', createdAt: daysAgo(4) },
      { type: 'ai', message: 'Website analysis completed — opportunity score 68', createdAt: daysAgo(2) },
      { type: 'ai', message: 'Cold email draft generated', createdAt: daysAgo(1) },
    ],
  },

  // ---------- WON ----------
  {
    businessName: 'Harborview Physical Therapy',
    industry: 'Specialty Medical',
    location: 'Seattle, WA',
    website: 'https://harborviewpt.com',
    phone: '(206) 555-0155',
    address: '1201 Alaskan Way, Seattle, WA 98101',
    status: 'won',
    createdAt: daysAgo(45),
    updatedAt: daysAgo(3),
    opportunityScore: 89,
    leadQuality: 'Excellent',
    estimatedHoursSaved: '16 hrs/month',
    estimatedProjectValue: '$11,000',
    estimatedMonthlyRevenue: '$500/mo',
    recommendedBixSolution: 'BIX Booking + Workflow Automation',
    executiveSummary: 'Harborview PT signed a full booking + automated intake package after a 30-day sales cycle.',
    services: ['Physical Therapy', 'Sports Rehab', 'Post-Surgical Recovery'],
    coldEmailDraft: 'Subject: Quick idea for Harborview PT\n\nHi,\n\nWe helped Harborview streamline booking and intake — details in past thread.\n\nBest,\nBIX Team',
    salesTalkingPoints: ['Deal closed at $11,000 for booking + automation bundle', 'Great reference customer for future PT-clinic outreach'],
    notes: [{ id: 'n1', author: 'Sheneska', timestamp: daysAgo(3).toISOString(), note: 'Signed! Kickoff call scheduled for next week. Great case study for future physical therapy outreach.' }],
    activities: [
      { type: 'system', message: 'Prospect created from Google Places search', createdAt: daysAgo(45) },
      { type: 'ai', message: 'Website analysis completed — opportunity score 89', createdAt: daysAgo(42) },
      { type: 'user', message: 'Cold email sent', createdAt: daysAgo(38) },
      { type: 'user', message: 'Audit call completed', createdAt: daysAgo(20) },
      { type: 'user', message: 'Proposal sent', createdAt: daysAgo(15) },
      { type: 'user', message: 'Deal won — contract signed', createdAt: daysAgo(3) },
    ],
  },

  // ---------- LOST ----------
  {
    businessName: 'Metro Fitness Studio',
    industry: 'Service-Based Business',
    location: 'Chicago, IL',
    website: 'https://metrofitnesschi.com',
    phone: '(312) 555-0174',
    address: '900 W Randolph St, Chicago, IL 60607',
    status: 'lost',
    createdAt: daysAgo(30),
    updatedAt: daysAgo(10),
    opportunityScore: 55,
    leadQuality: 'Moderate',
    estimatedHoursSaved: '6 hrs/month',
    estimatedProjectValue: '$4,000',
    recommendedBixSolution: 'Workflow Automation',
    executiveSummary: 'Small studio evaluated automation but decided to wait until after their lease renewal decision.',
    services: ['Group Fitness Classes', 'Personal Training'],
    coldEmailDraft: 'Subject: Quick idea for Metro Fitness Studio\n\nHi,\n\nWanted to share a quick idea on automating class booking reminders.\n\nBest,\nBIX Team',
    salesTalkingPoints: ['Lost — budget frozen pending lease renewal decision', 'Revisit in Q1 next year'],
    notes: [{ id: 'n1', author: 'Sheneska', timestamp: daysAgo(10).toISOString(), note: 'Owner said budget is frozen until they decide on lease renewal. Follow up again in ~3 months.' }],
    activities: [
      { type: 'system', message: 'Prospect created from Google Places search', createdAt: daysAgo(30) },
      { type: 'ai', message: 'Website analysis completed — opportunity score 55', createdAt: daysAgo(27) },
      { type: 'user', message: 'Cold email sent', createdAt: daysAgo(22) },
      { type: 'user', message: 'Reply received — not right now', createdAt: daysAgo(12) },
      { type: 'user', message: 'Marked as lost', createdAt: daysAgo(10) },
    ],
  },

  // ---------- NEW (unanalyzed, several to fill queue/pipeline) ----------
  {
    businessName: 'Bluebonnet Insurance Partners',
    industry: 'Insurance Agency',
    location: 'San Antonio, TX',
    website: 'https://bluebonnetinsurance.com',
    phone: '(210) 555-0133',
    address: '112 Broadway St, San Antonio, TX 78205',
    status: 'new',
    createdAt: hoursAgo(20),
    updatedAt: hoursAgo(20),
    activities: [{ type: 'system', message: 'Prospect created from Google Places search', createdAt: hoursAgo(20) }],
  },
  {
    businessName: 'Willowbrook Property Group',
    industry: 'Property Management',
    location: 'Nashville, TN',
    website: 'https://willowbrookpg.com',
    phone: '(615) 555-0146',
    address: '150 3rd Ave S, Nashville, TN 37201',
    status: 'new',
    createdAt: hoursAgo(15),
    updatedAt: hoursAgo(15),
    activities: [{ type: 'system', message: 'Prospect created from Google Places search', createdAt: hoursAgo(15) }],
  },
  {
    businessName: 'Radiance Aesthetics & Wellness',
    industry: 'Med Spa',
    location: 'Miami, FL',
    website: 'https://radianceaesthetics.com',
    phone: '(305) 555-0192',
    address: '1200 Brickell Ave, Miami, FL 33131',
    status: 'new',
    createdAt: hoursAgo(9),
    updatedAt: hoursAgo(9),
    activities: [{ type: 'system', message: 'Prospect created from Google Places search', createdAt: hoursAgo(9) }],
  },
  {
    businessName: 'Prairie State Accounting Co.',
    industry: 'Accounting Firm',
    location: 'Kansas City, MO',
    website: 'https://prairiestateaccounting.com',
    phone: '(816) 555-0121',
    address: '1200 Main St, Kansas City, MO 64105',
    status: 'new',
    createdAt: hoursAgo(4),
    updatedAt: hoursAgo(4),
    activities: [{ type: 'system', message: 'Prospect created from Google Places search', createdAt: hoursAgo(4) }],
  },
  {
    businessName: 'Cascade Dermatology Associates',
    industry: 'Specialty Medical',
    location: 'Boise, ID',
    website: 'https://cascadederm.com',
    phone: '(208) 555-0158',
    address: '800 W Idaho St, Boise, ID 83702',
    status: 'new',
    createdAt: hoursAgo(2),
    updatedAt: hoursAgo(2),
    activities: [{ type: 'system', message: 'Prospect created from Google Places search', createdAt: hoursAgo(2) }],
  },
  {
    businessName: 'Summit Ridge Property Management',
    industry: 'Property Management',
    location: 'Salt Lake City, UT',
    website: 'https://summitridgepm.com',
    phone: '(801) 555-0139',
    address: '175 S Main St, Salt Lake City, UT 84111',
    status: 'new',
    createdAt: hoursAgo(1),
    updatedAt: hoursAgo(1),
    activities: [{ type: 'system', message: 'Prospect created from Google Places search', createdAt: hoursAgo(1) }],
  },
]

async function main() {
  console.log('Clearing existing data...')
  await prisma.prospectActivity.deleteMany()
  await prisma.aIAnalysisJob.deleteMany()
  await prisma.prospect.deleteMany()

  console.log(`Seeding ${prospects.length} prospects...`)

  const created: { id: string; status: string }[] = []

  for (const p of prospects) {
    const { activities, ...rest } = p
    const record = await prisma.prospect.create({
      data: {
        businessName: rest.businessName,
        industry: rest.industry,
        location: rest.location,
        website: rest.website,
        phone: rest.phone,
        address: rest.address,
        source: 'google_places',
        status: rest.status,
        createdAt: rest.createdAt,
        updatedAt: rest.updatedAt,
        opportunityScore: rest.opportunityScore,
        leadQuality: rest.leadQuality,
        estimatedHoursSaved: rest.estimatedHoursSaved,
        estimatedProjectValue: rest.estimatedProjectValue,
        estimatedMonthlyRevenue: rest.estimatedMonthlyRevenue,
        recommendedBixSolution: rest.recommendedBixSolution,
        executiveSummary: rest.executiveSummary,
        services: rest.services ?? undefined,
        targetCustomers: rest.targetCustomers ?? undefined,
        customerJourney: rest.customerJourney ?? undefined,
        detectedSoftware: rest.detectedSoftware ?? undefined,
        manualProcesses: rest.manualProcesses ?? undefined,
        painPoints: rest.painPoints ?? undefined,
        automationOpportunities: rest.automationOpportunities ?? undefined,
        businessImpact: rest.businessImpact ?? undefined,
        recommendedBixSolutions: rest.recommendedBixSolutions ?? undefined,
        coldEmailDraft: rest.coldEmailDraft,
        linkedinMessage: rest.linkedinMessage,
        salesTalkingPoints: rest.salesTalkingPoints ?? undefined,
        notes: rest.notes ?? undefined,
      },
    })
    created.push({ id: record.id, status: record.status })

    for (const activity of activities) {
      await prisma.prospectActivity.create({
        data: {
          prospectId: record.id,
          type: activity.type,
          message: activity.message,
          createdAt: activity.createdAt,
        },
      })
    }

    if (rest.executiveSummary) {
      await prisma.aIAnalysisJob.create({
        data: {
          prospectId: record.id,
          status: 'completed',
          startedAt: activities[activities.length - 1]?.createdAt ?? rest.createdAt,
          completedAt: activities[activities.length - 1]?.createdAt ?? rest.createdAt,
        },
      })
    }
  }

  // Add a running job + a queued job so the dashboard shows live activity
  const newProspects = created.filter((c) => c.status === 'new')
  if (newProspects[0]) {
    await prisma.aIAnalysisJob.create({
      data: {
        prospectId: newProspects[0].id,
        status: 'running',
        startedAt: new Date(Date.now() - 25 * 1000),
      },
    })
  }
  if (newProspects[1]) {
    await prisma.aIAnalysisJob.create({
      data: { prospectId: newProspects[1].id, status: 'queued' },
    })
  }
  if (newProspects[2]) {
    await prisma.aIAnalysisJob.create({
      data: { prospectId: newProspects[2].id, status: 'queued' },
    })
  }

  console.log(`Done. Created ${created.length} prospects.`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
