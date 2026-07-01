import type { ProspectDetail } from '../types'

export const northwindDentalDetail: ProspectDetail = {
  id: 'northwind-dental',
  businessName: 'Northwind Dental',
  industry: 'Specialty Medical Practice',
  location: 'Portland, OR',
  website: 'northwinddental.com',
  phone: '(503) 555-0148',
  address: '2140 NW Vaughn St, Portland, OR 97210',
  source: 'Google Places',
  status: 'analyzed',
  opportunityScore: 88,
  createdAt: '2026-06-27T14:12:00Z',
  updatedAt: '2026-06-30T15:40:00Z',
  surfaceReason: 'Highest opportunity score this week — booking flow has no online scheduling',
  primaryAction: 'Generate Outreach',
  estimatedValueRange: '$9,500 – $16,000',
  opportunity: {
    rating: 5,
    score: 88,
    tier: 'Excellent',
    hoursSavedPerMonth: 26,
    projectValueEstimate: '$9,500 – $16,000',
    recommendedService: 'BIX Booking',
  },
  executiveSummary: [
    'Northwind Dental is a well-established general and cosmetic dental practice in Northwest Portland with strong local reviews and a steady patient base, but its digital front door has not kept pace with its clinical reputation.',
    'The website relies on a static contact form and a phone-only scheduling line, which pushes routine booking, rescheduling, and reminder work onto front-desk staff that could be handled automatically. This is the single biggest lever available to the practice right now.',
    'We estimate the practice is losing several bookings a month to after-hours visitors who leave without an easy way to self-schedule, and staff are likely spending real time each week on manual reminder calls and reschedule coordination.',
    'Recommendation: lead with BIX Booking to close the scheduling gap, paired with Workflow Automation for reminders and intake — a fast, high-confidence engagement given the clear gap and practice size.',
  ],
  businessOverview:
    'Northwind Dental is a general and cosmetic dentistry practice serving the Northwest Portland area, offering routine care, whitening, Invisalign, and minor restorative work. The practice appears to be a single location with 3–5 providers and a small front-desk team. Reviews consistently praise the clinical experience but occasionally mention difficulty reaching the office by phone during peak hours.',
  customerJourney: [
    {
      step: 'Discovery',
      description: 'Patients find the practice primarily through Google search and Google Maps listings, plus word-of-mouth referrals.',
    },
    {
      step: 'Initial Contact',
      description: 'Website visitors are directed to call the office directly or fill out a generic "Contact Us" form.',
      friction: 'No visible way to see availability or book a specific time — visitors must wait for a callback.',
    },
    {
      step: 'Booking',
      description: 'Appointments are scheduled entirely over the phone by front-desk staff during business hours.',
      friction: 'After-hours inquiries go unanswered until the next business day, a common drop-off point.',
    },
    {
      step: 'Reminders & Confirmation',
      description: 'No automated confirmation or reminder system was detected; reminders are likely handled by manual phone calls.',
      friction: 'Manual reminder calls are time-intensive and inconsistent, contributing to avoidable no-shows.',
    },
    {
      step: 'Follow-up',
      description: 'No evidence of automated recall or post-visit follow-up (e.g., 6-month cleaning reminders).',
      friction: 'Recall revenue is likely left on the table without a systematic reminder cadence.',
    },
  ],
  detectedSoftware: {
    found: ['Google Business Profile', 'Basic contact form (Gravity Forms)', 'Google Analytics'],
    missing: ['Online booking / scheduling system', 'Automated appointment reminders (SMS/email)', 'Patient intake automation', 'CRM or patient communication platform'],
  },
  likelyManualProcesses: [
    'Front-desk staff manually schedule every appointment by phone',
    'Reminder calls placed individually 1–2 days before each appointment',
    'New patient intake forms filled out on paper in-office',
    'Recall/re-engagement for overdue cleanings tracked informally or not at all',
  ],
  painPoints: [
    'No online booking means after-hours website visitors have no way to self-schedule and likely go elsewhere',
    'Front-desk time is consumed by routine scheduling and reminder calls instead of patient care',
    'No-show rate is likely elevated without automated, multi-channel reminders',
    'Paper intake slows down check-in and creates manual data entry work',
  ],
  automationOpportunities: [
    {
      title: 'Online self-scheduling',
      description: 'Add real-time booking to the website and Google Business Profile so patients can book without calling.',
      impactTag: 'Increase bookings',
    },
    {
      title: 'Automated SMS & email reminders',
      description: 'Send confirmation and reminder sequences automatically 48h and 2h before each appointment.',
      impactTag: 'Reduce no-shows',
    },
    {
      title: 'Digital intake forms',
      description: 'Move new-patient intake online, pre-filled and completed before arrival.',
      impactTag: 'Save 8 hrs/mo',
    },
    {
      title: 'Automated recall campaigns',
      description: 'Trigger 6-month cleaning reminders automatically based on last visit date.',
      impactTag: 'Recover lost recall revenue',
    },
    {
      title: 'Centralized patient communication',
      description: 'Consolidate calls, texts, and form submissions into one inbox for the front desk.',
      impactTag: 'Save 12 hrs/mo',
    },
  ],
  businessImpact: [
    'Closing the online booking gap alone is likely to recover several missed bookings per month from after-hours visitors',
    'Automated reminders typically reduce no-show rates by 20–30% for practices of this size',
    'Front-desk staff could reclaim an estimated 26 hours per month currently spent on manual scheduling and reminders',
    'A recall automation sequence could re-activate a meaningful share of overdue patients without additional ad spend',
  ],
  recommendedSolutions: [
    {
      service: 'BIX Booking',
      why: 'The practice has no online scheduling today, which is the clearest, highest-leverage gap on the site.',
      impact: 'Captures after-hours demand and reduces phone volume at the front desk.',
      implementation: 'Embedded booking widget on the website + Google profile, synced to existing calendar.',
      price: 'from $4,500',
    },
    {
      service: 'Workflow Automation',
      why: 'Manual reminder calls and recall tracking are consuming meaningful front-desk time every week.',
      impact: 'Cuts no-shows and reclaims staff hours for patient-facing work.',
      implementation: 'Automated SMS/email reminders, recall sequences, and intake form routing.',
      price: 'from $3,200 + $250/mo',
    },
    {
      service: 'Website Redesign',
      why: 'The current site does not showcase services or reviews as effectively as it could to convert visitors.',
      impact: 'Improves conversion of existing traffic into booked appointments.',
      implementation: 'Refreshed marketing site with integrated booking and clearer service pages.',
      price: 'from $6,000',
    },
  ],
  estimatedProjectValue: {
    oneTime: '$9,500 – $16,000',
    recurring: '$250 – $400 /mo',
  },
  coldEmail: {
    subject: 'Quick idea for Northwind Dental\'s online booking',
    body: `Hi there,

I was looking at Northwind Dental's site and noticed patients can't book an appointment online — everything routes through a phone call during office hours. That likely means you're losing a few bookings a month from people browsing after-hours, plus your front desk is spending real time on scheduling and reminder calls that could run themselves.

We help practices like yours add online booking and automated reminders so patients can self-schedule and your team spends less time on the phone. It usually pays for itself within the first few recovered bookings.

Worth a free 20-minute automation audit? I'll show you exactly where the time and bookings are leaking and what it'd take to fix it — no pressure either way.

Best,
BIX Team`,
  },
  linkedinMessage:
    "Hi — I took a look at Northwind Dental's website and noticed there's no online booking option for patients, which is probably costing you after-hours bookings and adding phone work for your front desk. We help dental practices close that gap with self-scheduling and automated reminders. Open to a free 20-minute automation audit to see if it's a fit?",
  salesTalkingPoints: [
    'Lead with the missing online booking — it is the clearest, most visible gap and easy to demonstrate live on their own site.',
    'Quantify the ask: ~26 hours/month of front-desk time and several missed after-hours bookings are on the table.',
    'Anchor on BIX Booking as the entry point, then position Workflow Automation as the natural next step once booking is live.',
    'Use the free automation audit as the low-friction next step — no commitment, just a walkthrough of the findings in this report.',
    'If they push back on price, emphasize the recurring cost of manual reminder calls versus a fixed one-time build.',
  ],
  internalNotes: [
    {
      id: 'note-1',
      author: 'Shenesk',
      timestamp: '2026-06-30T15:42:00Z',
      note: 'Front desk answered on the 2nd ring when I called to check hours — friendly, but confirmed no online booking exists. Good sign they care about service quality.',
    },
  ],
  activityTimeline: [
    { id: 'evt-1', label: 'Prospect discovered via Google Places search "dentist Portland OR"', timestamp: '2026-06-27T14:12:00Z', type: 'system' },
    { id: 'evt-2', label: 'Website analysis started', timestamp: '2026-06-30T15:10:00Z', type: 'ai' },
    { id: 'evt-3', label: 'Detected missing booking system and reminder automation', timestamp: '2026-06-30T15:22:00Z', type: 'ai' },
    { id: 'evt-4', label: 'Opportunity report generated — score 88 (Excellent)', timestamp: '2026-06-30T15:38:00Z', type: 'ai' },
    { id: 'evt-5', label: 'Cold email and LinkedIn message drafted', timestamp: '2026-06-30T15:40:00Z', type: 'ai' },
  ],
}
