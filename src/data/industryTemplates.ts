import type {
  AutomationOpportunity,
  BixService,
  CustomerJourneyStep,
  DetectedSoftware,
  OpportunityTier,
  Prospect,
  ProspectDetail,
  RecommendedSolution,
} from '../types'

interface IndustryTemplate {
  businessOverview: (name: string, location: string) => string
  executiveSummary: (name: string, location: string) => string[]
  customerJourney: CustomerJourneyStep[]
  detectedSoftware: DetectedSoftware
  likelyManualProcesses: string[]
  painPoints: string[]
  automationOpportunities: AutomationOpportunity[]
  businessImpact: string[]
  recommendedSolutions: RecommendedSolution[]
  coldEmailBody: (name: string) => string
  linkedinMessage: (name: string) => string
  salesTalkingPoints: string[]
}

const medSpaTemplate: IndustryTemplate = {
  businessOverview: (name, location) =>
    `${name} offers aesthetic and wellness treatments to clients in ${location}. The business appears to run on appointment-based services with a mix of walk-in interest driven by social media and local search.`,
  executiveSummary: (name, location) => [
    `${name} has an active online presence in ${location} but relies on manual booking and follow-up for most client interactions.`,
    'Booking, reminders, and rebooking after treatments all appear to be handled manually, which caps how many clients staff can serve without adding headcount.',
    'Recommendation: close the booking gap first, then automate reminders and rebooking to reduce no-shows and drive repeat visits.',
  ],
  customerJourney: [
    { step: 'Discovery', description: 'Clients find the business via Instagram, Google search, or referral.' },
    { step: 'Initial Contact', description: 'Visitors are directed to call or DM to check availability.', friction: 'No visible real-time booking — clients must wait for a reply.' },
    { step: 'Booking', description: 'Appointments are scheduled by staff over phone or direct message.', friction: 'Staff time is consumed by back-and-forth scheduling instead of client care.' },
    { step: 'Reminders & Rebooking', description: 'Follow-up for reminders and next treatment appears manual or absent.', friction: 'Missed rebooking opportunities likely reduce client lifetime value.' },
  ],
  detectedSoftware: {
    found: ['Instagram / social booking links', 'Basic contact form'],
    missing: ['Online booking system', 'Automated appointment reminders', 'Client retention / rebooking automation'],
  },
  likelyManualProcesses: [
    'Staff manually confirm appointment slots via phone or DM',
    'Reminders sent individually rather than automatically',
    'Rebooking for follow-up treatments tracked informally',
  ],
  painPoints: [
    'No real-time online booking likely costs after-hours inquiries',
    'Staff time spent on scheduling instead of client-facing work',
    'No-shows likely elevated without automated reminders',
  ],
  automationOpportunities: [
    { title: 'Online self-scheduling', description: 'Let clients book treatments directly from the website and Instagram.', impactTag: 'Increase bookings' },
    { title: 'Automated reminders', description: 'Send SMS/email reminders ahead of each appointment.', impactTag: 'Reduce no-shows' },
    { title: 'Rebooking automation', description: 'Prompt clients to rebook their next treatment automatically.', impactTag: 'Increase repeat visits' },
  ],
  businessImpact: [
    'Online booking typically recovers bookings lost to after-hours inquiries',
    'Automated reminders reduce no-show rates meaningfully for appointment-based businesses',
    'Rebooking automation increases client lifetime value without added ad spend',
  ],
  recommendedSolutions: [
    { service: 'BIX Booking', why: 'No real-time booking exists today.', impact: 'Captures after-hours demand and frees up staff time.', implementation: 'Embedded booking widget synced to the existing calendar.', price: 'from $4,000' },
    { service: 'Workflow Automation', why: 'Reminders and rebooking are handled manually.', impact: 'Reduces no-shows and increases repeat visit rate.', implementation: 'Automated SMS/email reminder and rebooking sequences.', price: 'from $2,800 + $200/mo' },
  ],
  coldEmailBody: (name) => `Hi there,

I was looking at ${name}'s site and noticed there's no way to book an appointment online — everything routes through a call or DM. That likely means a few after-hours inquiries slip away each week, plus your team is spending time on scheduling that could run itself.

We help businesses like yours add online booking and automated reminders so clients can self-schedule and your team spends less time on the phone.

Worth a free 20-minute automation audit? I'll show you exactly where the time is going and what it'd take to fix it.

Best,
BIX Team`,
  linkedinMessage: (name) =>
    `Hi — I took a look at ${name}'s online booking experience and noticed clients can't self-schedule yet. We help businesses like yours close that gap. Open to a free 20-minute automation audit?`,
  salesTalkingPoints: [
    'Lead with the missing online booking — easy to demonstrate live on their own site.',
    'Frame the ask around staff time saved and reduced no-shows.',
    'Use the free automation audit as the low-friction next step.',
  ],
}

const medicalPracticeTemplate: IndustryTemplate = {
  businessOverview: (name, location) =>
    `${name} is a specialty medical practice serving patients in ${location}. The practice appears to operate a single location with a small front-desk team handling scheduling and patient communication.`,
  executiveSummary: (name, location) => [
    `${name} has a solid local reputation in ${location} but its booking and patient communication workflows still rely heavily on phone calls.`,
    'Scheduling, reminders, and intake all appear to route through front-desk staff manually, which limits capacity without adding headcount.',
    'Recommendation: introduce online booking and automated reminders to reduce no-shows and free up staff time.',
  ],
  customerJourney: [
    { step: 'Discovery', description: 'Patients find the practice via Google search and Maps listings.' },
    { step: 'Initial Contact', description: 'Website visitors are directed to call the office directly.', friction: 'No visible way to see availability or book online.' },
    { step: 'Booking', description: 'Appointments are scheduled entirely by phone during business hours.', friction: 'After-hours inquiries go unanswered until the next business day.' },
    { step: 'Reminders', description: 'No automated confirmation or reminder system was detected.', friction: 'Manual reminder calls are time-intensive and inconsistent.' },
  ],
  detectedSoftware: {
    found: ['Google Business Profile', 'Basic contact form'],
    missing: ['Online booking / scheduling system', 'Automated appointment reminders', 'Patient intake automation'],
  },
  likelyManualProcesses: [
    'Front-desk staff manually schedule every appointment by phone',
    'Reminder calls placed individually before each appointment',
    'New patient intake handled on paper in-office',
  ],
  painPoints: [
    'No online booking likely costs after-hours bookings',
    'Front-desk time consumed by routine scheduling and reminders',
    'No-show rate likely elevated without automated reminders',
  ],
  automationOpportunities: [
    { title: 'Online self-scheduling', description: 'Add real-time booking so patients can self-schedule.', impactTag: 'Increase bookings' },
    { title: 'Automated reminders', description: 'Send confirmation and reminder sequences automatically.', impactTag: 'Reduce no-shows' },
    { title: 'Digital intake forms', description: 'Move new-patient intake online before arrival.', impactTag: 'Save staff hours' },
  ],
  businessImpact: [
    'Closing the booking gap typically recovers several missed bookings per month',
    'Automated reminders reduce no-show rates 20–30% for practices of this size',
    'Digital intake reduces front-desk data entry and speeds up check-in',
  ],
  recommendedSolutions: [
    { service: 'BIX Booking', why: 'No online scheduling exists today.', impact: 'Captures after-hours demand, reduces phone volume.', implementation: 'Embedded booking widget synced to existing calendar.', price: 'from $4,500' },
    { service: 'Workflow Automation', why: 'Manual reminders and intake consume staff time.', impact: 'Cuts no-shows and reclaims staff hours.', implementation: 'Automated reminders and digital intake routing.', price: 'from $3,000 + $250/mo' },
  ],
  coldEmailBody: (name) => `Hi there,

I was looking at ${name}'s site and noticed patients can't book an appointment online — everything routes through a phone call. That likely means a few after-hours bookings slip away each month, plus your front desk is spending time on scheduling and reminders that could run themselves.

We help practices like yours add online booking and automated reminders so patients can self-schedule and your team spends less time on the phone.

Worth a free 20-minute automation audit? I'll show you exactly where the time and bookings are leaking.

Best,
BIX Team`,
  linkedinMessage: (name) =>
    `Hi — I noticed ${name}'s website doesn't offer online booking yet, which is likely costing after-hours bookings and adding phone work for your front desk. Open to a free 20-minute automation audit?`,
  salesTalkingPoints: [
    'Lead with the missing online booking — the clearest, most visible gap.',
    'Quantify the ask in staff hours and missed after-hours bookings.',
    'Position Workflow Automation as the natural next step after booking.',
  ],
}

const propertyManagementTemplate: IndustryTemplate = {
  businessOverview: (name, location) =>
    `${name} manages residential and/or commercial properties in ${location}. Tenant communication, maintenance requests, and leasing inquiries appear to be handled through a mix of phone, email, and manual coordination.`,
  executiveSummary: (name, location) => [
    `${name} serves property owners and tenants across ${location}, but tenant-facing workflows still rely on manual phone and email coordination.`,
    'Maintenance requests and tenant communication in particular appear to lack a centralized, automated system, creating avoidable back-and-forth for staff.',
    'Recommendation: a client portal paired with workflow automation would consolidate requests and cut response time significantly.',
  ],
  customerJourney: [
    { step: 'Discovery', description: 'Prospective tenants and owners find listings via the website and listing sites.' },
    { step: 'Inquiry', description: 'Inquiries route through a contact form or phone call.', friction: 'No self-service way to check unit availability or request a tour.' },
    { step: 'Maintenance Requests', description: 'Tenants report issues by phone or email to the office.', friction: 'Requests are tracked manually, risking delays and lost details.' },
    { step: 'Tenant Communication', description: 'Updates on requests and notices are communicated ad hoc.', friction: 'Inconsistent communication likely drives tenant dissatisfaction.' },
  ],
  detectedSoftware: {
    found: ['Listing site integrations', 'Basic contact form'],
    missing: ['Tenant/client portal', 'Automated maintenance request routing', 'Automated tenant communication'],
  },
  likelyManualProcesses: [
    'Maintenance requests logged manually from phone/email',
    'Tenant status updates communicated individually',
    'Lease renewal reminders tracked informally',
  ],
  painPoints: [
    'No centralized system for maintenance requests risks dropped or delayed issues',
    'Staff time consumed by manual tenant communication',
    'Lease renewal follow-up likely inconsistent without automated reminders',
  ],
  automationOpportunities: [
    { title: 'Tenant self-service portal', description: 'Give tenants a portal to submit and track maintenance requests.', impactTag: 'Reduce response time' },
    { title: 'Automated request routing', description: 'Route maintenance requests to the right vendor automatically.', impactTag: 'Save staff hours' },
    { title: 'Lease renewal reminders', description: 'Automate renewal and notice reminders for tenants and owners.', impactTag: 'Reduce vacancy gaps' },
  ],
  businessImpact: [
    'A tenant portal typically cuts maintenance response time and staff back-and-forth substantially',
    'Automated routing reduces the manual coordination burden on office staff',
    'Consistent renewal reminders help reduce avoidable vacancy periods',
  ],
  recommendedSolutions: [
    { service: 'BIX Client Portal', why: 'Tenants have no self-service way to submit or track requests.', impact: 'Reduces phone/email volume and speeds up resolution.', implementation: 'Branded tenant portal with request tracking.', price: 'from $6,500' },
    { service: 'Workflow Automation', why: 'Maintenance routing and renewal reminders are manual today.', impact: 'Cuts staff time on coordination and follow-up.', implementation: 'Automated routing and reminder sequences.', price: 'from $3,500 + $300/mo' },
  ],
  coldEmailBody: (name) => `Hi there,

I was looking at ${name}'s website and noticed maintenance requests and tenant communication seem to run through phone and email rather than a self-service system. That likely means your team spends real time each week coordinating requests manually.

We help property managers add a tenant portal and automated request routing so issues get tracked and resolved faster, with less manual back-and-forth.

Worth a free 20-minute automation audit? I'll show you exactly where the time is going.

Best,
BIX Team`,
  linkedinMessage: (name) =>
    `Hi — I noticed ${name} handles maintenance requests and tenant communication manually today. We help property managers automate that with a self-service portal. Open to a free 20-minute automation audit?`,
  salesTalkingPoints: [
    'Lead with maintenance request friction — it is the most tangible daily pain point.',
    'Frame the client portal as reducing both tenant frustration and staff workload.',
    'Use renewal reminder automation as a secondary hook for owner-facing value.',
  ],
}

const accountingTemplate: IndustryTemplate = {
  businessOverview: (name, location) =>
    `${name} provides accounting and tax services to individuals and small businesses in ${location}. Client intake and document collection appear to rely on manual, ad hoc processes.`,
  executiveSummary: (name, location) => [
    `${name} operates a client-service practice in ${location} that likely sees a seasonal surge in manual document collection and client intake work.`,
    'Client onboarding and document requests appear to run through email and phone rather than a structured intake system.',
    'Recommendation: workflow automation for intake and document collection would meaningfully reduce administrative load, especially during tax season.',
  ],
  customerJourney: [
    { step: 'Discovery', description: 'Clients find the firm via referral or local search.' },
    { step: 'Initial Contact', description: 'Prospective clients are directed to call or email the office.', friction: 'No visible way to schedule a consultation online.' },
    { step: 'Client Intake', description: 'New client onboarding and document collection appear manual.', friction: 'Chasing documents by email likely consumes significant staff time.' },
    { step: 'Ongoing Communication', description: 'Status updates and requests are handled ad hoc.', friction: 'Clients may feel out of the loop during busy season.' },
  ],
  detectedSoftware: {
    found: ['Basic contact form', 'Email-based communication'],
    missing: ['Online scheduling', 'Automated client intake', 'Secure document collection portal'],
  },
  likelyManualProcesses: [
    'New client intake and document collection handled via email',
    'Consultation scheduling done by phone or email back-and-forth',
    'Status updates communicated individually per client',
  ],
  painPoints: [
    'No online scheduling likely adds friction for new client inquiries',
    'Manual document chasing consumes significant staff time, especially seasonally',
    'Inconsistent status updates may hurt client satisfaction during peak season',
  ],
  automationOpportunities: [
    { title: 'Online consultation booking', description: 'Let prospective clients book a consultation directly.', impactTag: 'Increase new clients' },
    { title: 'Automated intake & document collection', description: 'Collect client information and documents through a structured, automated flow.', impactTag: 'Save staff hours' },
    { title: 'Status update automation', description: 'Automatically notify clients of document status and next steps.', impactTag: 'Improve client experience' },
  ],
  businessImpact: [
    'Online booking typically increases new client consultations booked',
    'Automated intake and document collection meaningfully reduces administrative hours, especially during tax season',
    'Consistent status updates improve client retention and referrals',
  ],
  recommendedSolutions: [
    { service: 'Workflow Automation', why: 'Client intake and document collection are handled manually via email.', impact: 'Cuts administrative time, especially during peak season.', implementation: 'Automated intake forms and secure document requests.', price: 'from $3,800 + $250/mo' },
    { service: 'BIX Booking', why: 'No online scheduling exists for consultations.', impact: 'Reduces friction for new client inquiries.', implementation: 'Embedded consultation booking widget.', price: 'from $3,200' },
  ],
  coldEmailBody: (name) => `Hi there,

I was looking at ${name}'s site and noticed new clients have to call or email to get started, and document collection looks like it runs through email back-and-forth. That likely adds up to real administrative time, especially during tax season.

We help firms like yours automate client intake and document collection, and add online scheduling for consultations, so your team spends less time chasing paperwork.

Worth a free 20-minute automation audit? I'll show you exactly where the time is going.

Best,
BIX Team`,
  linkedinMessage: (name) =>
    `Hi — I noticed ${name}'s client intake and document collection look like they run through email today. We help firms automate that. Open to a free 20-minute automation audit?`,
  salesTalkingPoints: [
    'Lead with the seasonal pain of manual document collection — highly relatable for accounting firms.',
    'Quantify the ask in hours saved per client engagement.',
    'Position online booking as a quick win alongside the bigger intake automation.',
  ],
}

const insuranceTemplate: IndustryTemplate = {
  businessOverview: (name, location) =>
    `${name} provides insurance products and advisory services to clients in ${location}. Quote requests and policy servicing appear to rely on manual phone and email coordination.`,
  executiveSummary: (name, location) => [
    `${name} serves clients across ${location} but quote requests and policy servicing still route through manual phone and email coordination.`,
    'There is no clear self-service option for prospective clients to request a quote or for existing clients to manage policy details.',
    'Recommendation: workflow automation for quote intake and renewal reminders would reduce manual coordination and improve client retention.',
  ],
  customerJourney: [
    { step: 'Discovery', description: 'Prospective clients find the agency via local search or referral.' },
    { step: 'Quote Request', description: 'Visitors are directed to call or fill out a generic contact form.', friction: 'No structured way to request a quote or specify coverage needs online.' },
    { step: 'Policy Servicing', description: 'Existing clients call or email for policy changes and questions.', friction: 'Manual coordination likely slows response time.' },
    { step: 'Renewals', description: 'Renewal reminders appear to be handled informally or not at all.', friction: 'Missed renewals risk client churn.' },
  ],
  detectedSoftware: {
    found: ['Basic contact form', 'Email-based communication'],
    missing: ['Structured quote request system', 'Automated renewal reminders', 'Client self-service portal'],
  },
  likelyManualProcesses: [
    'Quote requests handled via phone or generic contact form',
    'Policy servicing questions routed through email',
    'Renewal reminders tracked informally',
  ],
  painPoints: [
    'No structured quote request flow likely loses prospects who want a fast answer',
    'Manual servicing consumes staff time that could be automated',
    'Inconsistent renewal reminders risk client churn',
  ],
  automationOpportunities: [
    { title: 'Structured quote intake', description: 'Capture coverage needs through a guided online form.', impactTag: 'Increase quote requests' },
    { title: 'Automated renewal reminders', description: 'Notify clients ahead of policy renewal automatically.', impactTag: 'Reduce churn' },
    { title: 'Client self-service portal', description: 'Let clients view policy details and request changes online.', impactTag: 'Save staff hours' },
  ],
  businessImpact: [
    'A structured quote intake typically increases completed quote requests',
    'Automated renewal reminders reduce policy churn at renewal time',
    'A self-service portal reduces routine servicing calls and emails',
  ],
  recommendedSolutions: [
    { service: 'Workflow Automation', why: 'Quote intake and renewal reminders are handled manually today.', impact: 'Increases quote completion and reduces churn.', implementation: 'Guided quote intake form and automated renewal sequences.', price: 'from $3,500 + $250/mo' },
    { service: 'BIX Client Portal', why: 'Clients have no self-service way to manage policy details.', impact: 'Reduces routine servicing calls and emails.', implementation: 'Branded client portal for policy management.', price: 'from $6,000' },
  ],
  coldEmailBody: (name) => `Hi there,

I was looking at ${name}'s site and noticed quote requests route through a generic contact form rather than a structured intake, and renewal reminders don't look automated. That likely means some prospects drop off before getting a quote, and a few renewals slip through the cracks each year.

We help agencies like yours add a guided quote intake and automated renewal reminders so fewer opportunities get lost.

Worth a free 20-minute automation audit? I'll show you exactly where the gaps are.

Best,
BIX Team`,
  linkedinMessage: (name) =>
    `Hi — I noticed ${name}'s quote requests route through a generic contact form today rather than a guided intake. We help agencies automate that along with renewal reminders. Open to a free 20-minute automation audit?`,
  salesTalkingPoints: [
    'Lead with the quote intake gap — easy to show live on their own site.',
    'Frame renewal reminder automation around reducing client churn.',
    'Position the client portal as a differentiator versus competing agencies.',
  ],
}

const genericTemplate: IndustryTemplate = {
  businessOverview: (name, location) =>
    `${name} is a service-based business operating in ${location}. Customer intake and scheduling appear to rely on manual coordination rather than automated systems.`,
  executiveSummary: (name, location) => [
    `${name} has an established presence in ${location}, but key customer-facing workflows still rely on manual coordination.`,
    'Scheduling and follow-up in particular appear to be handled ad hoc, creating avoidable work for staff.',
    'Recommendation: automate scheduling and follow-up to free up staff time and capture more opportunities.',
  ],
  customerJourney: [
    { step: 'Discovery', description: 'Customers find the business via local search or referral.' },
    { step: 'Initial Contact', description: 'Visitors are directed to call or fill out a generic contact form.', friction: 'No visible way to self-serve scheduling or requests.' },
    { step: 'Scheduling', description: 'Appointments or service requests are coordinated manually.', friction: 'Staff time is consumed by back-and-forth coordination.' },
    { step: 'Follow-up', description: 'Follow-up communication appears ad hoc or absent.', friction: 'Missed follow-up likely leaves revenue on the table.' },
  ],
  detectedSoftware: {
    found: ['Basic contact form', 'Google Business Profile'],
    missing: ['Online scheduling system', 'Automated reminders and follow-up', 'Centralized customer communication'],
  },
  likelyManualProcesses: [
    'Scheduling coordinated manually by phone or email',
    'Follow-up communication handled ad hoc',
  ],
  painPoints: [
    'No online scheduling likely costs after-hours inquiries',
    'Staff time consumed by manual coordination',
    'Inconsistent follow-up likely leaves opportunities on the table',
  ],
  automationOpportunities: [
    { title: 'Online self-scheduling', description: 'Let customers book or request service online.', impactTag: 'Increase bookings' },
    { title: 'Automated reminders & follow-up', description: 'Send confirmations, reminders, and follow-up automatically.', impactTag: 'Save staff hours' },
  ],
  businessImpact: [
    'Online scheduling typically recovers after-hours demand',
    'Automated follow-up increases repeat business without added staff time',
  ],
  recommendedSolutions: [
    { service: 'BIX Booking', why: 'No online scheduling exists today.', impact: 'Captures after-hours demand and reduces manual coordination.', implementation: 'Embedded booking widget synced to existing calendar.', price: 'from $4,000' },
    { service: 'Workflow Automation', why: 'Follow-up and reminders are handled manually.', impact: 'Frees up staff time and increases repeat business.', implementation: 'Automated reminder and follow-up sequences.', price: 'from $2,800 + $200/mo' },
  ],
  coldEmailBody: (name) => `Hi there,

I was looking at ${name}'s site and noticed there's no way to book or request service online — everything routes through a call or contact form. That likely means a few inquiries slip away, plus your team is spending time on coordination that could run itself.

We help businesses like yours automate scheduling and follow-up so you capture more opportunities with less manual work.

Worth a free 20-minute automation audit?

Best,
BIX Team`,
  linkedinMessage: (name) =>
    `Hi — I noticed ${name} doesn't have online scheduling yet, which likely means some inquiries slip away. We help businesses close that gap. Open to a free 20-minute automation audit?`,
  salesTalkingPoints: [
    'Lead with the missing online scheduling — the clearest, most visible gap.',
    'Frame the ask around staff time saved and opportunities recovered.',
    'Use the free automation audit as the low-friction next step.',
  ],
}

const templatesByIndustry: Record<string, IndustryTemplate> = {
  'Med Spa': medSpaTemplate,
  'Specialty Medical Practice': medicalPracticeTemplate,
  'Property Management': propertyManagementTemplate,
  'Accounting Firm': accountingTemplate,
  'Insurance Agency': insuranceTemplate,
}

function tierForScore(score: number): OpportunityTier {
  if (score >= 80) return 'Excellent'
  if (score >= 60) return 'Good'
  return 'Moderate'
}

function ratingForScore(score: number): number {
  if (score >= 85) return 5
  if (score >= 70) return 4
  if (score >= 55) return 3
  if (score >= 40) return 2
  return 1
}

function projectValueForScore(score: number): { oneTime: string; recurring: string } {
  if (score >= 80) return { oneTime: '$8,000 – $14,000', recurring: '$200 – $350 /mo' }
  if (score >= 60) return { oneTime: '$5,000 – $9,000', recurring: '$150 – $250 /mo' }
  return { oneTime: '$3,000 – $6,000', recurring: '$100 – $200 /mo' }
}

function recommendedServiceFor(template: IndustryTemplate): BixService {
  return template.recommendedSolutions[0].service
}

export function buildDetailFromProspect(prospect: Prospect): ProspectDetail {
  const template = templatesByIndustry[prospect.industry] ?? genericTemplate
  const tier = tierForScore(prospect.opportunityScore)
  const projectValue = projectValueForScore(prospect.opportunityScore)
  const hoursSavedPerMonth = Math.round(prospect.opportunityScore / 4) + 4

  return {
    ...prospect,
    estimatedValueRange: projectValue.oneTime,
    opportunity: {
      rating: ratingForScore(prospect.opportunityScore),
      score: prospect.opportunityScore,
      tier,
      hoursSavedPerMonth,
      projectValueEstimate: projectValue.oneTime,
      recommendedService: recommendedServiceFor(template),
    },
    executiveSummary: template.executiveSummary(prospect.businessName, prospect.location),
    businessOverview: template.businessOverview(prospect.businessName, prospect.location),
    customerJourney: template.customerJourney,
    detectedSoftware: template.detectedSoftware,
    likelyManualProcesses: template.likelyManualProcesses,
    painPoints: template.painPoints,
    automationOpportunities: template.automationOpportunities,
    businessImpact: template.businessImpact,
    recommendedSolutions: template.recommendedSolutions,
    estimatedProjectValue: projectValue,
    coldEmail: {
      subject: `Quick idea for ${prospect.businessName}'s booking & follow-up`,
      body: template.coldEmailBody(prospect.businessName),
    },
    linkedinMessage: template.linkedinMessage(prospect.businessName),
    salesTalkingPoints: template.salesTalkingPoints,
    internalNotes: [],
    activityTimeline: [
      { id: 'evt-1', label: `Prospect discovered via ${prospect.source}`, timestamp: prospect.createdAt, type: 'system' },
      { id: 'evt-2', label: 'Website analysis completed', timestamp: prospect.updatedAt, type: 'ai' },
      { id: 'evt-3', label: `Opportunity report generated — score ${prospect.opportunityScore} (${tier})`, timestamp: prospect.updatedAt, type: 'ai' },
    ],
  }
}
