import { Pricing } from '../components/sections/Pricing'
import { usePageTitle } from '../hooks/usePageTitle'
import { siteContent } from '../config/siteContent'

export function CoachingPage() {
  usePageTitle(`${siteContent.pricing.title} — ${siteContent.meta.logoName}`)
  return <Pricing as="h1" />
}
