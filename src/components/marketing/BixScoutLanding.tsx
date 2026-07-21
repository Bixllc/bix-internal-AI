'use client'

import '@fontsource/geist-sans/400.css'
import '@fontsource/geist-sans/500.css'
import '@fontsource/geist-sans/600.css'
import '@fontsource/geist-sans/700.css'
import '@fontsource/geist-sans/800.css'
import '@fontsource/geist-sans/900.css'
import '@fontsource/geist-mono/400.css'
import '@fontsource/geist-mono/500.css'
import '@fontsource/geist-mono/600.css'

import { useState, type CSSProperties } from 'react'

type Vars = CSSProperties & Record<`--${string}`, string>

interface BixScoutLandingProps {
  accentColor?: string
  appUrl?: string
}

const SANS = "'Geist Sans', system-ui, sans-serif"
const MONO = "'Geist Mono', ui-monospace, monospace"

function scoreColorVar(score: number): string {
  if (score >= 80) return 'var(--sig)'
  if (score >= 65) return 'var(--acc)'
  return 'var(--warn)'
}

const tickerItems = [
  { name: 'Elite Med Spa', score: 96 },
  { name: 'Northwind Dental', score: 87 },
  { name: 'Miami Property Group', score: 91 },
  { name: 'Cedar & Co. Roofing', score: 72 },
  { name: 'Patio Theory', score: 64 },
  { name: 'Harbor Vet Clinic', score: 83 },
  { name: 'Sunset Auto Detail', score: 78 },
  { name: 'Brightline Legal', score: 69 },
  { name: 'Coastal HVAC', score: 88 },
  { name: 'The Grooming Room', score: 74 },
  { name: 'Peak Fitness Co.', score: 81 },
  { name: 'Verde Landscaping', score: 66 },
]

const previewRows = [
  { tag: 'T-01', name: 'Elite Med Spa', reason: 'No online scheduling detected', score: 96 },
  { tag: 'T-02', name: 'Northwind Dental', reason: 'Phone-only booking', score: 87 },
  { tag: 'T-03', name: 'Cedar & Co. Roofing', reason: 'Slow inquiry response', score: 72 },
]

const radarBlips = [
  { left: 30, top: 34 },
  { left: 66, top: 28 },
  { left: 58, top: 64 },
  { left: 36, top: 70 },
  { left: 74, top: 52 },
]

const galleryShots = [
  {
    index: '01',
    label: 'Dashboard',
    slug: 'dashboard',
    src: '/shot-dashboard.png',
    caption:
      'Every morning, Scout hands you a prioritized queue — who replied, who booked, and who is ready for outreach right now.',
  },
  {
    index: '02',
    label: 'Find Leads',
    slug: 'find-leads',
    src: '/shot-find-leads.png',
    caption: 'Name an industry and a city. Scout searches, dedupes, and enriches every matching business automatically.',
  },
  {
    index: '03',
    label: 'Pipeline',
    slug: 'pipeline',
    src: '/shot-pipeline.png',
    caption:
      'Drag prospects from New to Won on a kanban built for automation sales — statuses stay in sync with the AI.',
  },
  {
    index: '04',
    label: 'Prospect Detail',
    slug: 'prospect',
    src: '/shot-prospect.png',
    caption:
      'A full AI dossier per prospect: executive summary, opportunity score, estimated value, and a recommended BIX solution.',
  },
]

const howSteps = [
  {
    num: '01',
    title: 'Sweep a market',
    chip: 'Market pull',
    body: 'Pick an industry and location. Scout pulls every matching local business and reads their sites end to end.',
  },
  {
    num: '02',
    title: 'Lock the targets',
    chip: 'AI scoring',
    body: 'It detects manual workflows, missing software, and buying signals — then ranks every prospect by opportunity.',
  },
  {
    num: '03',
    title: 'Fire the first message',
    chip: 'Auto-outreach',
    body: 'Personalized email and LinkedIn drafts arrive ready to send, grounded in what each business actually needs.',
  },
]

const opportunityFactors = [
  'Review & reputation signals',
  'Booking & software gaps',
  'Manual, phone-only workflows',
  'Competitor momentum',
]

const opportunityCards = [
  { score: 96, name: 'Elite Med Spa', detail: 'No online scheduling', tag: 'High intent' },
  { score: 87, name: 'Northwind Dental', detail: 'Phone-only booking', tag: 'Strong fit' },
  { score: 64, name: 'Patio Theory', detail: 'Dated site, low reviews', tag: 'Nurture' },
]

const features = [
  {
    index: '01',
    glyph: '⌕',
    title: 'Market search',
    body: 'Find every business in a vertical and geography, deduplicated and enriched automatically.',
  },
  {
    index: '02',
    glyph: '✦',
    title: 'Website analysis',
    body: 'AI reads each site to map the customer journey and surface where demand leaks out.',
  },
  {
    index: '03',
    glyph: '◎',
    title: 'Opportunity scoring',
    body: 'A single 0–100 score tells your team exactly who to work first, every morning.',
  },
  {
    index: '04',
    glyph: '✎',
    title: 'Outreach generation',
    body: "Tailored cold email and LinkedIn drafts, written from each prospect's real gaps.",
  },
  {
    index: '05',
    glyph: '▦',
    title: 'Pipeline tracking',
    body: 'Move prospects from analyzed to won on a kanban built for automation sales.',
  },
  {
    index: '06',
    glyph: '⌘',
    title: 'Command bar',
    body: 'Ask Scout in plain language — "find 50 med spas in Miami" — and it runs the workflow.',
  },
]

export default function BixScoutLanding({
  accentColor = '#5B50E8',
  appUrl = 'BIX Scout.dc.html',
}: BixScoutLandingProps) {
  const [activeShot, setActiveShot] = useState(0)

  const rootVars: Vars = {
    '--acc': accentColor,
    '--sig': '#1f9d63',
    '--warn': '#c78a2a',
  }

  return (
    <div style={{ ...styles.root, ...rootVars }}>
      <style dangerouslySetInnerHTML={{ __html: css }} />

      <div style={styles.gridLayer} />
      <div style={styles.glowLayer} />

      <div style={styles.contentLayer}>
        {/* ---------------- HEADER ---------------- */}
        <header style={styles.header}>
          <div style={styles.headerInner} className="bxl-wrap">
            <div style={styles.brand}>
              <img src="/bix-logo.png" alt="BIX Scout" style={{ width: 28, height: 28, borderRadius: 7 }} />
              <span style={styles.brandName}>BIX Scout</span>
              <span style={styles.betaPill}>Beta</span>
            </div>

            <nav style={styles.nav} className="bxl-nav">
              <a href="#product" className="bxl-navlink">
                PRODUCT
              </a>
              <a href="#how" className="bxl-navlink">
                HOW IT WORKS
              </a>
              <a href="#features" className="bxl-navlink">
                FEATURES
              </a>
            </nav>

            <div style={{ flex: 1 }} />

            <a href={appUrl} className="bxl-navlink bxl-signin" style={{ marginRight: 18 }}>
              Sign in
            </a>
            <a href={appUrl} style={styles.btnPrimarySmall}>
              Enter Scout →
            </a>
          </div>
        </header>

        {/* ---------------- HERO ---------------- */}
        <section style={styles.heroSection} className="bxl-wrap">
          <div style={styles.heroGrid} className="bxl-hero-grid">
            <div>
              <div style={styles.eyebrow}>
                <span className="bxl-flick-dot" />
                SCANNING LOCAL MARKETS
              </div>

              <h1 style={styles.h1}>
                Hunt down your
                <br />
                next clients
                <br />
                <span style={{ color: 'var(--acc)' }}>on autopilot.</span>
              </h1>

              <p style={styles.heroParagraph}>
                Scout sweeps thousands of local business sites, flags the manual workflows bleeding them customers,
                and hands you ranked targets with outreach already written. Days of prospecting, compressed into
                minutes.
              </p>

              <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
                <a href={appUrl} style={styles.btnPrimaryLarge}>
                  Enter Scout →
                </a>
                <a href="#how" style={styles.btnSecondaryLarge}>
                  See the recon flow
                </a>
              </div>

              <div style={styles.statsRow}>
                <div style={styles.statItem}>
                  <div style={styles.statValue}>2,400+</div>
                  <div style={styles.statLabel}>sites / hour</div>
                </div>
                <div style={styles.statItem}>
                  <div style={styles.statValue}>0–100</div>
                  <div style={styles.statLabel}>target score</div>
                </div>
                <div style={{ ...styles.statItem, borderRight: 'none' }}>
                  <div style={styles.statValue}>3 min</div>
                  <div style={styles.statLabel}>search → outreach</div>
                </div>
              </div>
            </div>

            {/* ---------------- RECON PANEL ---------------- */}
            <div style={{ position: 'relative' }}>
              <div style={styles.reconCard}>
                <div className="bxl-scanline" style={styles.scanBand} />

                <div style={styles.reconHeaderRow}>
                  <span style={styles.reconHeaderLabel}>Live Sweep</span>
                  <span style={styles.aiRankedPill}>AI-RANKED</span>
                  <div style={{ flex: 1 }} />
                  <div style={styles.onlineWrap}>
                    <span className="bxl-livepulse-dot" />
                    <span style={styles.onlineText}>ONLINE</span>
                  </div>
                </div>

                <div style={styles.radarWrap}>
                  <div style={styles.radar}>
                    <div style={{ ...styles.radarRing, inset: 26 }} />
                    <div style={{ ...styles.radarRing, inset: 60 }} />
                    <div style={styles.crosshairV} />
                    <div style={styles.crosshairH} />
                    <div className="bxl-sweep" style={styles.radarSweep} />
                    {radarBlips.map((b, i) => (
                      <span
                        key={i}
                        className="bxl-blip"
                        style={{
                          left: `${b.left}%`,
                          top: `${b.top}%`,
                          animationDelay: `${i * 0.4}s`,
                        }}
                      />
                    ))}
                    <span style={styles.radarCenterDot} />
                  </div>
                </div>

                <div style={styles.previewRows}>
                  {previewRows.map((row) => (
                    <div key={row.tag} style={styles.previewRow}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 3, minWidth: 0 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <span style={styles.previewTag}>{row.tag}</span>
                          <span style={styles.previewName}>{row.name}</span>
                        </div>
                        <span style={styles.previewReason}>{row.reason}</span>
                      </div>
                      <span style={{ ...styles.previewScore, color: scoreColorVar(row.score) }}>{row.score}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bxl-floaty" style={styles.floatBadge}>
                <div style={styles.floatTile}>✦</div>
                <div>
                  <div style={styles.floatTitle}>14 drafts armed</div>
                  <div style={styles.floatSub}>READY TO SEND</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ---------------- SIGNAL TICKER ---------------- */}
        <div style={styles.tickerBand}>
          <div className="bxl-marquee" style={styles.tickerRow}>
            {[...tickerItems, ...tickerItems].map((item, i) => (
              <span key={i} style={styles.tickerItem}>
                <span style={{ color: 'var(--sig)' }}>▸</span> {item.name} ·{' '}
                <span style={{ color: scoreColorVar(item.score) }}>{item.score}</span>
              </span>
            ))}
          </div>
        </div>

        {/* ---------------- PRODUCT GALLERY ---------------- */}
        <section id="product" style={styles.section} className="bxl-wrap">
          <div style={styles.sectionHeaderRow}>
            <h2 style={styles.h2}>Look inside the cockpit.</h2>
            <span style={styles.sectionTag}>// live product</span>
          </div>

          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 20 }}>
            {galleryShots.map((shot, i) => {
              const active = activeShot === i
              return (
                <button
                  key={shot.slug}
                  onClick={() => setActiveShot(i)}
                  style={active ? styles.tabActive : styles.tabInactive}
                >
                  <span style={{ fontFamily: MONO, opacity: 0.7, marginRight: 6 }}>{shot.index}</span>
                  {shot.label}
                </button>
              )
            })}
          </div>

          <div style={styles.galleryFrame}>
            <div style={styles.browserBar}>
              <span style={{ ...styles.trafficDot, background: '#e2645b' }} />
              <span style={{ ...styles.trafficDot, background: '#e6b34a' }} />
              <span style={{ ...styles.trafficDot, background: '#5cb27e' }} />
              <span style={styles.browserUrl}>
                app.bixscout.ai/{galleryShots[activeShot].slug}
              </span>
              <div style={{ flex: 1 }} />
              <span style={styles.browserActiveLabel}>{galleryShots[activeShot].label}</span>
            </div>
            <div style={{ position: 'relative' }}>
              {galleryShots.map((shot, i) => (
                <img
                  key={shot.slug}
                  src={shot.src}
                  alt={shot.label}
                  style={{
                    width: '100%',
                    height: 'auto',
                    display: activeShot === i ? 'block' : 'none',
                  }}
                />
              ))}
            </div>
          </div>

          <p style={styles.caption}>{galleryShots[activeShot].caption}</p>
        </section>

        {/* ---------------- HOW IT WORKS ---------------- */}
        <section id="how" style={styles.section} className="bxl-wrap">
          <div style={styles.sectionHeaderRow}>
            <h2 style={styles.h2}>Three moves from cold market to warm reply.</h2>
            <span style={styles.sectionTag}>// how it works</span>
          </div>

          <div>
            {howSteps.map((step) => (
              <div key={step.num} className="bxl-how-row" style={styles.howRow}>
                <div style={styles.howNumber}>{step.num}</div>
                <div style={styles.howRight}>
                  <div>
                    <div style={styles.howTitle}>{step.title}</div>
                    <p style={styles.howBody}>{step.body}</p>
                  </div>
                  <span style={styles.howChip}>{step.chip}</span>
                </div>
              </div>
            ))}
            <div style={styles.howRowClose} />
          </div>
        </section>

        {/* ---------------- OPPORTUNITY SCORE ---------------- */}
        <section style={styles.section} className="bxl-wrap">
          <div style={styles.oppCard}>
            <div style={styles.oppGrid} className="bxl-opp-grid">
              <div style={styles.oppLeft}>
                <span style={styles.oppEyebrow}>Opportunity Score</span>
                <h2 style={styles.oppH2}>One number tells you who to hit first.</h2>
                <p style={styles.oppParagraph}>
                  Scout fuses review signals, software gaps, manual workflows, and buying intent into a single
                  0–100 target score — recomputed every sweep.
                </p>
                <div style={styles.factorGrid}>
                  {opportunityFactors.map((factor) => (
                    <div key={factor} style={styles.factorItem}>
                      <span style={styles.factorCheck}>✓</span>
                      <span style={styles.factorText}>{factor}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div style={styles.oppRight}>
                {opportunityCards.map((card) => {
                  const color = scoreColorVar(card.score)
                  const deg = (card.score / 100) * 360
                  return (
                    <div key={card.name} style={styles.oppMiniCard}>
                      <div
                        style={{
                          width: 52,
                          height: 52,
                          borderRadius: '50%',
                          position: 'relative',
                          flexShrink: 0,
                          background: `conic-gradient(${color} ${deg}deg, rgba(0,0,0,.08) 0)`,
                        }}
                      >
                        <div style={styles.oppDialHole}>
                          <span style={{ fontFamily: MONO, fontWeight: 600, fontSize: 13, color }}>
                            {card.score}
                          </span>
                        </div>
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={styles.oppCompany}>{card.name}</div>
                        <div style={styles.oppDetail}>{card.detail}</div>
                      </div>
                      <span
                        style={{
                          ...styles.oppTag,
                          borderColor: `color-mix(in srgb, ${color} 34%, transparent)`,
                          color,
                        }}
                      >
                        {card.tag}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </section>

        {/* ---------------- FEATURES ---------------- */}
        <section id="features" style={styles.section} className="bxl-wrap">
          <div style={styles.sectionHeaderRow}>
            <h2 style={styles.h2}>A full recon rig, running while you sleep.</h2>
            <span style={styles.sectionTag}>// 06 modules</span>
          </div>

          <div style={styles.featuresGrid} className="bxl-features-grid">
            {features.map((f) => (
              <div key={f.index} className="bxl-feature-cell" style={styles.featureCell}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                  <div style={styles.featureIconTile}>{f.glyph}</div>
                  <div style={{ flex: 1 }} />
                  <span style={styles.featureIndex}>{f.index}</span>
                </div>
                <div style={styles.featureTitle}>{f.title}</div>
                <p style={styles.featureBody}>{f.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ---------------- CTA ---------------- */}
        <section style={{ ...styles.section, paddingBottom: 0 }} className="bxl-wrap">
          <div style={styles.ctaBanner}>
            <div style={styles.ctaGridOverlay} />
            <img src="/bix-logo.png" alt="" style={styles.ctaWatermark} />
            <div style={{ position: 'relative', zIndex: 1 }}>
              <span style={styles.ctaEyebrow}>// target acquired</span>
              <h2 style={styles.ctaH2}>Your next ten clients are already on the map.</h2>
              <p style={styles.ctaParagraph}>
                Let Scout find them, score them, and write the first message. You just show up to the conversation.
              </p>
              <a href={appUrl} style={styles.ctaButton}>
                Enter Scout →
              </a>
            </div>
          </div>
        </section>

        {/* ---------------- FOOTER ---------------- */}
        <footer style={styles.footer} className="bxl-wrap">
          <img src="/bix-logo.png" alt="BIX Scout" style={{ width: 24, height: 24, borderRadius: 6 }} />
          <span style={styles.footerName}>BIX Scout</span>
          <span style={styles.footerTag}>AI PROSPECTING</span>
          <div style={{ flex: 1 }} />
          <span style={styles.footerCopy}>© 2026 BIX · ALL RIGHTS RESERVED</span>
        </footer>
      </div>
    </div>
  )
}

const styles: Record<string, CSSProperties> = {
  root: {
    position: 'relative',
    minHeight: '100vh',
    overflowX: 'hidden',
    background: '#fbfbfb',
    fontFamily: SANS,
    color: '#15151a',
    WebkitFontSmoothing: 'antialiased',
  },
  gridLayer: {
    position: 'absolute',
    inset: 0,
    backgroundImage:
      'linear-gradient(rgba(0,0,0,0.028) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.028) 1px, transparent 1px)',
    backgroundSize: '64px 64px',
    pointerEvents: 'none',
  },
  glowLayer: {
    position: 'absolute',
    inset: 0,
    backgroundImage:
      'radial-gradient(900px 560px at 82% -6%, color-mix(in srgb, var(--acc) 14%, transparent), transparent 62%), radial-gradient(700px 500px at 6% 22%, color-mix(in srgb, var(--sig) 7%, transparent), transparent 60%)',
    pointerEvents: 'none',
  },
  contentLayer: {
    position: 'relative',
  },

  // header
  header: {
    position: 'sticky',
    top: 0,
    zIndex: 30,
    height: 64,
    borderBottom: '1px solid rgba(0,0,0,.07)',
    background: 'rgba(251,251,251,.78)',
    backdropFilter: 'blur(14px)',
  },
  headerInner: {
    height: 64,
    display: 'flex',
    alignItems: 'center',
  },
  brand: {
    display: 'flex',
    alignItems: 'center',
    gap: 9,
  },
  brandName: {
    fontSize: 15,
    fontWeight: 700,
  },
  betaPill: {
    fontFamily: MONO,
    fontSize: 9.5,
    color: 'var(--sig)',
    border: '1px solid color-mix(in srgb, var(--sig) 34%, transparent)',
    padding: '2px 6px',
    borderRadius: 5,
  },
  nav: {
    display: 'flex',
    alignItems: 'center',
    gap: 22,
    marginLeft: 30,
  },

  btnPrimarySmall: {
    height: 36,
    borderRadius: 9,
    background: 'var(--acc)',
    color: '#fff',
    fontSize: 13,
    fontWeight: 700,
    display: 'inline-flex',
    alignItems: 'center',
    padding: '0 16px',
    textDecoration: 'none',
  },

  // hero
  heroSection: {
    padding: 'clamp(44px,6vw,84px) 0 30px',
  },
  heroGrid: {
    display: 'grid',
    gridTemplateColumns: '1.08fr 0.92fr',
    gap: 'clamp(28px,4vw,56px)',
    alignItems: 'center',
  },
  eyebrow: {
    display: 'flex',
    alignItems: 'center',
    gap: 9,
    fontFamily: MONO,
    fontSize: 11,
    textTransform: 'uppercase',
    letterSpacing: '0.12em',
    color: '#6a6b73',
    marginBottom: 22,
  },
  h1: {
    fontSize: 'clamp(40px,6.4vw,82px)',
    fontWeight: 800,
    letterSpacing: '-0.04em',
    lineHeight: 0.96,
    margin: 0,
  },
  heroParagraph: {
    fontSize: 'clamp(15px,1.4vw,18px)',
    color: '#55565f',
    maxWidth: 500,
    marginTop: 22,
    marginBottom: 34,
    lineHeight: 1.55,
  },
  btnPrimaryLarge: {
    height: 50,
    borderRadius: 11,
    background: 'var(--acc)',
    color: '#fff',
    fontSize: 15.5,
    fontWeight: 700,
    display: 'inline-flex',
    alignItems: 'center',
    padding: '0 24px',
    textDecoration: 'none',
    boxShadow: '0 12px 34px color-mix(in srgb, var(--acc) 34%, transparent)',
  },
  btnSecondaryLarge: {
    height: 50,
    borderRadius: 11,
    background: '#fff',
    border: '1px solid rgba(0,0,0,.12)',
    color: '#2c2d33',
    fontSize: 15.5,
    fontWeight: 700,
    display: 'inline-flex',
    alignItems: 'center',
    padding: '0 24px',
    textDecoration: 'none',
  },
  statsRow: {
    display: 'flex',
    marginTop: 38,
    paddingTop: 24,
    borderTop: '1px solid rgba(0,0,0,.09)',
  },
  statItem: {
    paddingRight: 26,
    marginRight: 26,
    borderRight: '1px solid rgba(0,0,0,.09)',
  },
  statValue: {
    fontSize: 26,
    fontWeight: 800,
  },
  statLabel: {
    fontFamily: MONO,
    fontSize: 10.5,
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    color: '#8a8b92',
    marginTop: 4,
  },

  // recon panel
  reconCard: {
    position: 'relative',
    background: '#fff',
    border: '1px solid rgba(0,0,0,.09)',
    borderRadius: 18,
    boxShadow: '0 30px 80px rgba(28,28,40,.14)',
    overflow: 'hidden',
  },
  scanBand: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '22%',
    background: 'linear-gradient(180deg, color-mix(in srgb, var(--sig) 20%, transparent), transparent)',
    opacity: 0.55,
    pointerEvents: 'none',
    zIndex: 2,
  },
  reconHeaderRow: {
    position: 'relative',
    zIndex: 3,
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    padding: '14px 16px',
    borderBottom: '1px solid rgba(0,0,0,.08)',
  },
  reconHeaderLabel: {
    fontFamily: MONO,
    fontSize: 11,
    fontWeight: 600,
    textTransform: 'uppercase',
    color: '#3a3b42',
  },
  aiRankedPill: {
    fontFamily: MONO,
    fontSize: 9.5,
    color: 'var(--acc)',
    border: '1px solid color-mix(in srgb, var(--acc) 40%, transparent)',
    padding: '2px 7px',
    borderRadius: 5,
  },
  onlineWrap: {
    display: 'flex',
    alignItems: 'center',
    gap: 7,
  },
  onlineText: {
    fontFamily: MONO,
    fontSize: 10.5,
    fontWeight: 600,
    color: 'var(--sig)',
  },

  radarWrap: {
    position: 'relative',
    zIndex: 1,
    display: 'flex',
    justifyContent: 'center',
    padding: '26px 0 20px',
  },
  radar: {
    position: 'relative',
    width: 200,
    height: 200,
    borderRadius: '50%',
    background: 'radial-gradient(circle, color-mix(in srgb, var(--sig) 20%, transparent) 0%, transparent 68%)',
    border: '1px solid rgba(0,0,0,.1)',
    overflow: 'hidden',
  },
  radarRing: {
    position: 'absolute',
    borderRadius: '50%',
    border: '1px solid rgba(0,0,0,.07)',
  },
  crosshairV: {
    position: 'absolute',
    left: '50%',
    top: 0,
    bottom: 0,
    width: 1,
    background: 'rgba(0,0,0,.05)',
  },
  crosshairH: {
    position: 'absolute',
    top: '50%',
    left: 0,
    right: 0,
    height: 1,
    background: 'rgba(0,0,0,.05)',
  },
  radarSweep: {
    position: 'absolute',
    inset: 0,
    borderRadius: '50%',
    background: 'conic-gradient(from 0deg, color-mix(in srgb, var(--sig) 34%, transparent), transparent 32%)',
  },
  radarCenterDot: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    width: 9,
    height: 9,
    borderRadius: '50%',
    background: 'var(--acc)',
    boxShadow: '0 0 0 6px color-mix(in srgb, var(--acc) 22%, transparent)',
    transform: 'translate(-50%,-50%)',
  },

  previewRows: {
    position: 'relative',
    zIndex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    padding: '4px 16px 18px',
  },
  previewRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
    border: '1px solid rgba(0,0,0,.08)',
    borderRadius: 10,
    background: '#fcfcfd',
    padding: '10px 12px',
  },
  previewTag: {
    fontFamily: MONO,
    fontSize: 10.5,
    color: '#9a9ba2',
  },
  previewName: {
    fontSize: 12.5,
    fontWeight: 600,
  },
  previewReason: {
    fontSize: 10.5,
    color: '#8a8b92',
  },
  previewScore: {
    fontFamily: MONO,
    fontSize: 13,
    fontWeight: 600,
  },

  floatBadge: {
    position: 'absolute',
    bottom: -20,
    left: -24,
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    background: '#fff',
    border: '1px solid rgba(0,0,0,.09)',
    borderRadius: 14,
    boxShadow: '0 20px 50px rgba(28,28,40,.16)',
    padding: '12px 16px',
    zIndex: 4,
  },
  floatTile: {
    width: 32,
    height: 32,
    borderRadius: 9,
    background: 'color-mix(in srgb, var(--sig) 16%, transparent)',
    color: 'var(--sig)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 15,
  },
  floatTitle: {
    fontSize: 15,
    fontWeight: 700,
  },
  floatSub: {
    fontFamily: MONO,
    fontSize: 10,
    color: '#8a8b92',
    marginTop: 2,
  },

  // ticker
  tickerBand: {
    borderTop: '1px solid rgba(0,0,0,.08)',
    borderBottom: '1px solid rgba(0,0,0,.08)',
    background: 'rgba(0,0,0,.015)',
    padding: '15px 0',
    overflow: 'hidden',
  },
  tickerRow: {
    display: 'flex',
    width: 'max-content',
    gap: 40,
  },
  tickerItem: {
    fontFamily: MONO,
    fontSize: 12,
    color: '#6a6b73',
    whiteSpace: 'nowrap',
  },

  // sections
  section: {
    padding: 'clamp(50px,7vw,96px) 0',
  },
  sectionHeaderRow: {
    display: 'flex',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    gap: 20,
    marginBottom: 30,
    flexWrap: 'wrap',
  },
  h2: {
    fontSize: 'clamp(28px,3.8vw,46px)',
    fontWeight: 800,
    margin: 0,
    letterSpacing: '-0.02em',
  },
  sectionTag: {
    fontFamily: MONO,
    fontSize: 12,
    color: '#9a9ba2',
  },

  // gallery
  tabActive: {
    height: 38,
    borderRadius: 9,
    fontSize: 13,
    fontWeight: 600,
    background: 'var(--acc)',
    color: '#fff',
    border: '1px solid var(--acc)',
    boxShadow: '0 4px 14px color-mix(in srgb, var(--acc) 30%, transparent)',
    padding: '0 16px',
    cursor: 'pointer',
  },
  tabInactive: {
    height: 38,
    borderRadius: 9,
    fontSize: 13,
    fontWeight: 600,
    background: '#fff',
    color: '#3a3b42',
    border: '1px solid rgba(0,0,0,.12)',
    padding: '0 16px',
    cursor: 'pointer',
  },
  galleryFrame: {
    background: '#fff',
    border: '1px solid rgba(0,0,0,.09)',
    borderRadius: 16,
    overflow: 'hidden',
    boxShadow: '0 24px 70px rgba(28,28,40,.12)',
  },
  browserBar: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    padding: '11px 15px',
    borderBottom: '1px solid rgba(0,0,0,.08)',
    background: '#fafafa',
  },
  trafficDot: {
    width: 9,
    height: 9,
    borderRadius: '50%',
  },
  browserUrl: {
    fontFamily: MONO,
    fontSize: 11.5,
    color: '#8a8b92',
    marginLeft: 8,
  },
  browserActiveLabel: {
    fontFamily: MONO,
    fontSize: 10.5,
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    color: 'var(--acc)',
    fontWeight: 600,
  },
  caption: {
    fontSize: 14,
    color: '#55565f',
    maxWidth: 640,
    marginTop: 18,
    lineHeight: 1.6,
  },

  // how it works
  howRow: {
    display: 'grid',
    gridTemplateColumns: '120px 1fr',
    gap: 'clamp(20px,4vw,56px)',
    borderTop: '1px solid rgba(0,0,0,.09)',
    padding: '30px 0',
  },
  howNumber: {
    fontSize: 'clamp(46px,6vw,78px)',
    fontWeight: 800,
    color: 'transparent',
    WebkitTextStroke: '1.5px rgba(0,0,0,.18)',
    lineHeight: 1,
  },
  howRight: {
    display: 'grid',
    gridTemplateColumns: '1fr auto',
    gap: 20,
    alignItems: 'center',
  },
  howTitle: {
    fontSize: 'clamp(20px,2.4vw,28px)',
    fontWeight: 700,
    marginBottom: 8,
  },
  howBody: {
    fontSize: 15,
    color: '#55565f',
    margin: 0,
    maxWidth: 560,
    lineHeight: 1.6,
  },
  howChip: {
    fontFamily: MONO,
    fontSize: 11,
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    color: 'var(--sig)',
    border: '1px solid color-mix(in srgb, var(--sig) 40%, transparent)',
    borderRadius: 999,
    padding: '5px 12px',
    whiteSpace: 'nowrap',
  },
  howRowClose: {
    borderTop: '1px solid rgba(0,0,0,.09)',
  },

  // opportunity score
  oppCard: {
    background: '#fff',
    border: '1px solid rgba(0,0,0,.09)',
    borderRadius: 22,
    boxShadow: '0 20px 60px rgba(28,28,40,.08)',
    overflow: 'hidden',
  },
  oppGrid: {
    display: 'grid',
    gridTemplateColumns: '1.05fr 0.95fr',
  },
  oppLeft: {
    padding: 'clamp(28px,4vw,52px)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  oppEyebrow: {
    fontFamily: MONO,
    fontSize: 11,
    textTransform: 'uppercase',
    letterSpacing: '0.12em',
    color: 'var(--acc)',
    marginBottom: 14,
  },
  oppH2: {
    fontSize: 'clamp(26px,3.2vw,38px)',
    fontWeight: 800,
    margin: 0,
    letterSpacing: '-0.02em',
    lineHeight: 1.1,
  },
  oppParagraph: {
    fontSize: 15.5,
    color: '#55565f',
    maxWidth: 440,
    marginTop: 16,
    marginBottom: 26,
    lineHeight: 1.6,
  },
  factorGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '14px 20px',
  },
  factorItem: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
  },
  factorCheck: {
    width: 16,
    height: 16,
    borderRadius: 4,
    background: 'color-mix(in srgb, var(--sig) 16%, transparent)',
    color: 'var(--sig)',
    fontSize: 10,
    fontWeight: 700,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  factorText: {
    fontSize: 13.5,
    color: '#33343a',
  },
  oppRight: {
    borderLeft: '1px solid rgba(0,0,0,.09)',
    padding: 'clamp(26px,4vw,44px)',
    background: 'linear-gradient(160deg, color-mix(in srgb, var(--acc) 5%, #fff), #fafafa)',
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
    justifyContent: 'center',
  },
  oppMiniCard: {
    display: 'flex',
    alignItems: 'center',
    gap: 15,
    background: '#fff',
    border: '1px solid rgba(0,0,0,.08)',
    borderRadius: 13,
    boxShadow: '0 10px 30px rgba(28,28,40,.06)',
    padding: '14px 16px',
  },
  oppDialHole: {
    position: 'absolute',
    inset: 5,
    borderRadius: '50%',
    background: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  oppCompany: {
    fontSize: 14.5,
    fontWeight: 600,
  },
  oppDetail: {
    fontFamily: MONO,
    fontSize: 11,
    color: '#8a8b92',
    marginTop: 2,
  },
  oppTag: {
    fontFamily: MONO,
    fontSize: 10,
    textTransform: 'uppercase',
    letterSpacing: '0.06em',
    border: '1px solid',
    borderRadius: 999,
    padding: '4px 9px',
    whiteSpace: 'nowrap',
    flexShrink: 0,
  },

  // features
  featuresGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit,minmax(290px,1fr))',
    gap: 1,
    background: 'rgba(0,0,0,.08)',
    border: '1px solid rgba(0,0,0,.08)',
    borderRadius: 16,
    overflow: 'hidden',
  },
  featureCell: {
    background: '#fff',
    padding: '26px 24px',
  },
  featureIconTile: {
    width: 38,
    height: 38,
    borderRadius: 10,
    background: 'color-mix(in srgb, var(--acc) 12%, transparent)',
    color: 'var(--acc)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 17,
  },
  featureIndex: {
    fontFamily: MONO,
    fontSize: 11,
    color: '#b4b5bc',
  },
  featureTitle: {
    fontSize: 16.5,
    fontWeight: 700,
    marginBottom: 8,
  },
  featureBody: {
    fontSize: 13.5,
    color: '#6a6b73',
    margin: 0,
    lineHeight: 1.6,
  },

  // cta
  ctaBanner: {
    position: 'relative',
    borderRadius: 24,
    background: 'linear-gradient(135deg, var(--acc), color-mix(in srgb, var(--acc) 60%, #2a1e6e))',
    padding: 'clamp(44px,6vw,80px)',
    textAlign: 'center',
    boxShadow: '0 30px 80px color-mix(in srgb, var(--acc) 30%, transparent)',
    overflow: 'hidden',
  },
  ctaGridOverlay: {
    position: 'absolute',
    inset: 0,
    backgroundImage:
      'linear-gradient(rgba(255,255,255,.14) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.14) 1px, transparent 1px)',
    backgroundSize: '40px 40px',
    WebkitMaskImage: 'radial-gradient(circle at 50% 0, #000, transparent 72%)',
    maskImage: 'radial-gradient(circle at 50% 0, #000, transparent 72%)',
    pointerEvents: 'none',
  },
  ctaWatermark: {
    position: 'absolute',
    right: -46,
    bottom: -46,
    width: 270,
    opacity: 0.12,
    pointerEvents: 'none',
  },
  ctaEyebrow: {
    fontFamily: MONO,
    fontSize: 12,
    color: 'rgba(255,255,255,.72)',
    display: 'block',
    marginBottom: 18,
  },
  ctaH2: {
    fontSize: 'clamp(30px,4.4vw,52px)',
    fontWeight: 800,
    color: '#fff',
    margin: '0 auto',
    maxWidth: 720,
    letterSpacing: '-0.02em',
    lineHeight: 1.08,
  },
  ctaParagraph: {
    fontSize: 16,
    color: 'rgba(255,255,255,.86)',
    maxWidth: 500,
    margin: '18px auto 32px',
    lineHeight: 1.6,
  },
  ctaButton: {
    height: 52,
    borderRadius: 12,
    background: '#fff',
    color: 'var(--acc)',
    fontSize: 16,
    fontWeight: 700,
    display: 'inline-flex',
    alignItems: 'center',
    padding: '0 28px',
    textDecoration: 'none',
  },

  // footer
  footer: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    borderTop: '1px solid rgba(0,0,0,.08)',
    padding: '28px 0',
  },
  footerName: {
    fontSize: 14,
    fontWeight: 700,
  },
  footerTag: {
    fontFamily: MONO,
    fontSize: 11,
    color: '#9a9ba2',
    marginLeft: 4,
  },
  footerCopy: {
    fontFamily: MONO,
    fontSize: 11,
    color: '#9a9ba2',
  },
}

const css = `
.bxl-wrap {
  max-width: 1280px;
  margin: 0 auto;
  padding-left: clamp(18px,4vw,44px);
  padding-right: clamp(18px,4vw,44px);
}

::selection {
  background: var(--acc);
  color: #fff;
}

.bxl-navlink {
  font-family: ${MONO};
  font-size: 11.5px;
  font-weight: 500;
  color: #6a6b73;
  text-decoration: none;
  transition: color 0.15s ease;
}
.bxl-navlink:hover {
  color: #15151a;
}

@keyframes sweep {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
@keyframes blip {
  0%, 100% { opacity: 0.25; transform: translate(-50%,-50%) scale(0.8); }
  50% { opacity: 1; transform: translate(-50%,-50%) scale(1.15); }
}
@keyframes scanline {
  from { transform: translateY(-100%); }
  to { transform: translateY(1100%); }
}
@keyframes livepulse {
  0% { box-shadow: 0 0 0 0 rgba(31,157,99,0.5); }
  70% { box-shadow: 0 0 0 8px rgba(31,157,99,0); }
  100% { box-shadow: 0 0 0 0 rgba(31,157,99,0); }
}
@keyframes marquee {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}
@keyframes floaty {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}
@keyframes flick {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.35; }
}

.bxl-flick-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--sig);
  display: inline-block;
  animation: flick 1.2s steps(1) infinite;
}

.bxl-livepulse-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--sig);
  display: inline-block;
  animation: livepulse 1.8s ease-out infinite;
}

.bxl-scanline {
  animation: scanline 3.6s linear infinite;
}

.bxl-sweep {
  animation: sweep 3.2s linear infinite;
}

.bxl-blip {
  position: absolute;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--sig);
  box-shadow: 0 0 0 5px color-mix(in srgb, var(--sig) 25%, transparent);
  transform: translate(-50%,-50%);
  animation: blip 2.4s ease-in-out infinite;
}

.bxl-floaty {
  animation: floaty 4s ease-in-out infinite;
}

.bxl-marquee {
  animation: marquee 34s linear infinite;
}

.bxl-how-row:hover {
  background: linear-gradient(90deg, color-mix(in srgb, var(--acc) 5%, transparent), transparent 60%);
}

.bxl-feature-cell:hover {
  background: #fafaff;
}

@media (max-width: 800px) {
  .bxl-hero-grid {
    grid-template-columns: 1fr !important;
  }
  .bxl-opp-grid {
    grid-template-columns: 1fr !important;
  }
  .bxl-opp-grid > div:last-child {
    border-left: none !important;
    border-top: 1px solid rgba(0,0,0,.09);
  }
}

@media (min-width: 950px) {
  .bxl-features-grid {
    grid-template-columns: repeat(3, 1fr) !important;
  }
}

@media (max-width: 700px) {
  .bxl-nav, .bxl-signin {
    display: none !important;
  }
}
`
