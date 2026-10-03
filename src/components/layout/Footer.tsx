import { Container } from './Container'
import { Button } from '../ui/Button'
import { siteContent } from '../../config/siteContent'

const { footer, meta } = siteContent

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface-alt">
      <Container className="py-16">
        <div className="flex flex-col items-start justify-between gap-6 rounded-xl border border-border bg-surface p-8 md:flex-row md:items-center">
          <div className="space-y-1">
            <h2 className="font-display text-2xl uppercase tracking-wide text-primary">{footer.callout.title}</h2>
            <p className="text-secondary">{footer.callout.subtitle}</p>
          </div>
          <Button to={footer.callout.cta.to} icon={footer.callout.cta.icon}>
            {footer.callout.cta.label}
          </Button>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-6 border-t border-border pt-8 md:flex-row md:items-center">
          <span className="font-display text-lg uppercase tracking-wide text-primary">{meta.logoName}</span>
          <ul className="flex flex-wrap gap-6">
            {footer.socials.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-secondary transition-colors hover:text-accent"
                >
                  {social.label} <span className="text-primary">{social.handle}</span>
                </a>
              </li>
            ))}
          </ul>
          <p className="text-xs text-secondary">{footer.copyright}</p>
        </div>
      </Container>
    </footer>
  )
}
