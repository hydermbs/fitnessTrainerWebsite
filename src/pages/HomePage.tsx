import { Hero } from '../components/sections/Hero'
import { VideoShowcase } from '../components/sections/VideoShowcase'
import { Assessment } from '../components/sections/Assessment'
import { Pricing } from '../components/sections/Pricing'
import { usePageTitle } from '../hooks/usePageTitle'
import { siteContent } from '../config/siteContent'

export function HomePage() {
  usePageTitle(`${siteContent.meta.logoName} — ${siteContent.meta.logoBrandline}`)
  return (
    <>
      <Hero />
      <VideoShowcase />
      <Assessment />
      <Pricing />
    </>
  )
}
