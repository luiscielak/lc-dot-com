import { Link } from 'react-router-dom'
import { DraftCallout } from '../components/DraftCallout'
import { SiteHeader } from '../components/SiteHeader'
import { landing } from '../content/landing'

export function Landing() {
  return (
    <div className="landing">
      <SiteHeader />
      <main>
        <section className="landing-hero wrap" id="top">
          <div className="landing-hero-copy">
            <p className="eyebrow">{landing.hero.eyebrow}</p>
            <h1>{landing.hero.title}</h1>
            <p className="landing-pitch">
              {landing.hero.pitchLead} <em>{landing.hero.pitchEm}</em> {landing.hero.pitchRest}
            </p>
            <div className="landing-hero-actions">
              <Link className="btn" to={landing.hero.cta.to}>
                {landing.hero.cta.label}
              </Link>
              <Link className="btn btn-secondary" to={landing.hero.secondary.to}>
                {landing.hero.secondary.label}
              </Link>
            </div>
          </div>
          <div className="landing-device-wrap">
            <div className="landing-device">
              <iframe title="Your First Week prototype" src="/prototype" width={390} height={844} />
            </div>
            <p className="muted landing-device-note">
              Live prototype in the same phone frame.{' '}
              <Link to="/prototype">Open full screen</Link>
            </p>
          </div>
        </section>

        <section className="landing-section wrap" id={landing.hello.id}>
          <p className="kicker">{landing.hello.kicker}</p>
          <h2>{landing.hello.title}</h2>
          {landing.hello.paragraphs.map((paragraph) =>
            'mark' in paragraph && paragraph.mark === 'Luis to write' ? (
              <DraftCallout key={paragraph.text}>{paragraph.text}</DraftCallout>
            ) : (
              <p key={paragraph.text}>{paragraph.text}</p>
            ),
          )}
        </section>

        <section className="landing-section wrap" id={landing.why.id}>
          <p className="kicker">{landing.why.kicker}</p>
          <h2>{landing.why.title}</h2>
          {landing.why.paragraphs.map((paragraph) =>
            paragraph.mark === 'Luis to write' ? (
              <DraftCallout key={paragraph.text}>{paragraph.text}</DraftCallout>
            ) : (
              <p key={paragraph.text}>
                {paragraph.text}
                {paragraph.mark === 'draft' ? <span className="draft-mark"> [draft]</span> : null}
              </p>
            ),
          )}
        </section>

        <section className="landing-section wrap" id="case">
          <p className="kicker">{landing.study.kicker}</p>
          <h2>{landing.study.title}</h2>
          <p className="landing-lede">{landing.study.lede}</p>
          <p>{landing.study.teaser}</p>
          <p>
            <Link className="text-link" to="/case">
              Read the full case
            </Link>
          </p>
        </section>

        <section className="landing-cta wrap" id={landing.cta.id}>
          <p className="kicker">{landing.cta.kicker}</p>
          <h2>{landing.cta.title}</h2>
          <p>{landing.cta.body}</p>
          <Link className="btn" to={landing.cta.to}>
            {landing.cta.label}
          </Link>
        </section>

        <section className="landing-section wrap" id={landing.contact.id}>
          <p className="kicker">{landing.contact.kicker}</p>
          <h2>{landing.contact.title}</h2>
          <ul className="landing-links">
            {landing.contact.links.map((link) => (
              <li key={link.href}>
                <a href={link.href} rel={link.href.startsWith('http') ? 'noreferrer' : undefined}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </section>
      </main>

      <footer className="landing-footer wrap">
        <p>{landing.footer.note}</p>
        <p className="muted">{landing.footer.aside}</p>
      </footer>
    </div>
  )
}
