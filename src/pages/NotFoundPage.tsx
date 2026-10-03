import { Container } from '../components/layout/Container'
import { Button } from '../components/ui/Button'
import { usePageTitle } from '../hooks/usePageTitle'
import { siteContent } from '../config/siteContent'

export function NotFoundPage() {
  usePageTitle(`Page not found — ${siteContent.meta.logoName}`)
  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center gap-6 py-24 text-center">
      <p className="font-display text-6xl uppercase tracking-tight text-primary">404</p>
      <p className="max-w-sm text-secondary">That page moved or never existed. Let's get you back on track.</p>
      <Button to="/">Back to home</Button>
    </Container>
  )
}
