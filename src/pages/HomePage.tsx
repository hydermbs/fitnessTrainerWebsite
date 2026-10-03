import { Hero } from '../components/sections/Hero'
import { Assessment } from '../components/sections/Assessment'
import { BmiTool } from '../components/sections/BmiTool'
import { usePageTitle } from '../hooks/usePageTitle'
import { siteContent } from '../config/siteContent'

export function HomePage() {
  usePageTitle(`${siteContent.meta.logoName} — ${siteContent.meta.logoBrandline}`)
  return (
    <>
      <Hero />
      <Assessment />
      <BmiTool />
    </>
  )
}
