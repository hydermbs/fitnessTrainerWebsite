import { Philosophy } from '../components/sections/Philosophy'
import { usePageTitle } from '../hooks/usePageTitle'
import { siteContent } from '../config/siteContent'

export function PhilosophyPage() {
  usePageTitle(`${siteContent.philosophy.title} — ${siteContent.meta.logoName}`)
  return <Philosophy />
}
