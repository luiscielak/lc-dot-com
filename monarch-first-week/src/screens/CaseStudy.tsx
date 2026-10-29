import { Link } from 'react-router-dom'
import { DraftCallout } from '../components/DraftCallout'
import { SiteHeader } from '../components/SiteHeader'
import { caseStudy } from '../content/case'
import {
  communityMethod,
  communityThemes,
  competitors,
  experiments,
  jtbd,
  pricingFinding,
  proposedMetrics,
} from '../content/research'
import '../styles/case.css'

function Beat({
  beat,
  flip,
}: {
  beat: (typeof caseStudy.beats)[number]
  flip: boolean
}) {
  return (
    <div className={flip ? 'beat flip' : 'beat'}>
      <div className="beat-copy">
        <p className="cs-kicker">{beat.day}</p>
        <h3>{beat.headline}</h3>
        <p>{beat.line}</p>
      </div>
      <figure className="phone-fig">
        <img src={beat.src} alt={beat.alt} />
        <figcaption>{beat.caption}</figcaption>
      </figure>
    </div>
  )
}

function MapApps({
  apps,
}: {
  apps: readonly { app: string; take: string }[]
}) {
  return (
    <>
      {apps.map((item) => (
        <span className="pos-app" key={item.app}>
          {item.app}
          <span className="pos-take">{item.take}</span>
        </span>
      ))}
    </>
  )
}

export function CaseStudy() {
  const field = caseStudy.field

  return (
    <div className="case-page">
      <SiteHeader compact />
      <article>
        <header className="cs-header wrap">
          <p className="cs-kicker">{caseStudy.kicker}</p>
          <h1>{caseStudy.title}</h1>
          <p className="cs-sub">{caseStudy.subtitle}</p>
          <p className="note">{caseStudy.unofficialNote}</p>
          <dl className="meta-row">
            <div>
              <dt>Company</dt>
              <dd>{caseStudy.company}</dd>
            </div>
            <div>
              <dt>Role</dt>
              <dd>{caseStudy.role}</dd>
            </div>
            <div>
              <dt>Platforms</dt>
              <dd>{caseStudy.platforms}</dd>
            </div>
          </dl>
          <div className="hero-phones">
            {caseStudy.heroPhones.map((phone) => (
              <figure className="phone-fig" key={phone.src}>
                <img src={phone.src} alt={phone.alt} />
                <figcaption>{phone.caption}</figcaption>
              </figure>
            ))}
          </div>
        </header>

        <section className="cs-section wrap" id="moment">
          <p className="cs-kicker">{caseStudy.moment.kicker}</p>
          <h2>{caseStudy.moment.headline}</h2>
          <p>{caseStudy.moment.body}</p>
        </section>

        <section className="cs-section wrap" id="tension">
          <p className="cs-kicker">{caseStudy.tension.kicker}</p>
          <h2>{caseStudy.tension.headline}</h2>
          <p>{caseStudy.tension.body}</p>
          <DraftCallout>{caseStudy.placeholders.household}</DraftCallout>
          <DraftCallout>{caseStudy.placeholders.examples}</DraftCallout>
          <div className="challenges">
            {caseStudy.tension.problems.map((item) => (
              <article className="challenge" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
          <div className="metrics">
            {caseStudy.tension.stats.map((item) => (
              <div className="metric" key={item.label}>
                <span className="value">{item.value}</span>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
          <p className="cs-caption">{caseStudy.tension.method}</p>
          {caseStudy.quotes.map((item) => (
            <blockquote className="cs-quote" key={item.cite}>
              <p>{item.text}</p>
              <cite>{item.cite}</cite>
            </blockquote>
          ))}
        </section>

        <section className="cs-section wrap insight-block" id="insight">
          <p className="cs-kicker">{caseStudy.insight.kicker}</p>
          <h2>{caseStudy.insight.headline}</h2>
        </section>

        <section className="cs-section wrap" id="field">
          <p className="cs-kicker">{field.kicker}</p>
          <h2>{field.headline}</h2>
          <p>{field.fit}</p>
          <figure className="pos-map">
            <div className="pos-grid">
              <div className="pos-corner" aria-hidden="true" />
              <div className="pos-x">{field.axes.xLeft}</div>
              <div className="pos-x">{field.axes.xRight}</div>
              <div className="pos-y">{field.axes.yTop}</div>
              <div className="pos-cell">
                <MapApps apps={field.cells.longFree} />
              </div>
              <div className="pos-cell">
                <MapApps apps={field.cells.longCard} />
              </div>
              <div className="pos-y">{field.axes.yBottom}</div>
              <div className="pos-cell">
                <MapApps apps={field.cells.shortFree} />
              </div>
              <div className="pos-cell is-here">
                <MapApps apps={field.cells.shortCard} />
              </div>
            </div>
            <figcaption className="cs-caption">{field.aside}</figcaption>
          </figure>
        </section>

        <section className="cs-section wrap" id="pricing">
          <p className="cs-kicker">{caseStudy.pricing.kicker}</p>
          <h2>{caseStudy.pricing.headline}</h2>
          <p>{caseStudy.pricing.body}</p>
          <p className="cs-kicker price-kicker">Plus</p>
          <div className="price-line" role="list">
            {caseStudy.pricing.steps.map((step, index) => (
              <div key={step.when} className="price-step-wrap">
                {index > 0 ? (
                  <span className="price-arrow" aria-hidden="true">
                    →
                  </span>
                ) : null}
                <div role="listitem">
                  <b>
                    {step.price}
                    <sup className="fn">{step.fn}</sup>
                  </b>
                  <span>{step.when}</span>
                  <span>{step.note}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="price-chips">
            {caseStudy.pricing.chips.map((chip) => (
              <p key={chip.label}>
                <b>{chip.label}.</b> {chip.text}
                <sup className="fn">{chip.fn}</sup>
              </p>
            ))}
          </div>
          <p className="cs-caption">
            Sources below. Prototype uses Core $99.99/yr or $14.99/mo from
            monarch.com/pricing, Oct 29, 2026.
          </p>
        </section>

        <section className="cs-section wrap" id="bet">
          <p className="cs-kicker">{caseStudy.bet.kicker}</p>
          <h2>{caseStudy.bet.headline}</h2>
          <p>{caseStudy.bet.body}</p>
          <p>
            <Link className="text-link" to="/prototype">
              Open the prototype
            </Link>
          </p>
        </section>

        <section className="cs-section wrap" id="walk">
          <p className="cs-kicker">{caseStudy.walk.kicker}</p>
          <h2>{caseStudy.walk.headline}</h2>
          {caseStudy.beats.map((beat, index) => (
            <Beat key={beat.day} beat={beat} flip={index % 2 === 1} />
          ))}
        </section>

        <section className="cs-section wrap" id="proof">
          <p className="cs-kicker">{caseStudy.proof.kicker}</p>
          <h2>{caseStudy.proof.headline}</h2>
          <p>{caseStudy.proof.body}</p>
          <ul className="test-list">
            {caseStudy.proof.tests.map((item) => (
              <li key={item.name}>
                <b>{item.name}</b>
                <span>{item.primary}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="cs-section wrap" id="reflection">
          <p className="cs-kicker">{caseStudy.reflection.kicker}</p>
          <h2>{caseStudy.reflection.headline}</h2>
          <p>{caseStudy.reflection.body}</p>
          <DraftCallout>{caseStudy.placeholders.reflection}</DraftCallout>
        </section>

        <section className="cs-section wrap" id="appendix">
          <details className="appendix">
            <summary>Research appendix</summary>
            <div className="appendix-body">
              <p className="cs-caption">{communityMethod.store}</p>
              <p className="cs-caption">
                {communityMethod.reddit} {communityMethod.x}
              </p>
              <h3>Low-star themes</h3>
              <ul className="appendix-list">
                {communityThemes.map((row) => (
                  <li key={row.theme}>
                    {row.theme}: {row.low} of 183 · {row.all} of 500
                  </li>
                ))}
              </ul>
              <h3>Pricing sources</h3>
              <ol className="appendix-list">
                {caseStudy.pricing.footnotes.map((row) => (
                  <li key={row.n}>
                    {row.n}. {row.text}{' '}
                    <a href={row.href} rel="noreferrer">
                      {row.source}
                    </a>
                  </li>
                ))}
                {pricingFinding.rows
                  .filter(
                    (row) =>
                      !caseStudy.pricing.footnotes.some((note) => note.href === row.href),
                  )
                  .map((row) => (
                    <li key={`${row.topic}-${row.href}`}>
                      {row.topic}. {row.says}{' '}
                      <a href={row.href} rel="noreferrer">
                        {row.source}
                      </a>
                    </li>
                  ))}
              </ol>
              <h3>Eight apps, as checked</h3>
              <ul className="appendix-list">
                {competitors.map((app) => (
                  <li key={app.app}>
                    {app.app}. {app.price}. Trial: {app.trial}. Card: {app.card}.
                  </li>
                ))}
              </ul>
              <h3>Jobs to be done (hypotheses)</h3>
              <ul className="appendix-list">
                {jtbd.map((job) => (
                  <li key={job.when}>
                    When {job.when}, I want to {job.want}, so I can {job.so}.
                  </li>
                ))}
              </ul>
              <h3>Proposed metrics</h3>
              <ul className="appendix-list">
                {proposedMetrics.map((item) => (
                  <li key={item.metric}>
                    {item.metric}. {item.definition}
                  </li>
                ))}
              </ul>
              <h3>A/B tests</h3>
              <ul className="appendix-list">
                {experiments.map((item) => (
                  <li key={item.name}>
                    {item.name}. {item.hypothesis} Primary: {item.primary}
                  </li>
                ))}
              </ul>
            </div>
          </details>
        </section>
      </article>

      <footer className="site-foot wrap">
        <p>{caseStudy.unofficialNote}</p>
        <p>
          <Link to="/">Back</Link>
          {' · '}
          <Link to="/prototype">Prototype</Link>
        </p>
      </footer>
    </div>
  )
}
