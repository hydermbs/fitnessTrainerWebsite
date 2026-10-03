import { FitnessTools } from '../components/sections/FitnessTools'       
import { usePageTitle } from '../hooks/usePageTitle'
import { siteContent } from '../config/siteContent'

export function ToolsPage() {
  usePageTitle(`${siteContent.tools.page.title} — ${siteContent.meta.logoName}`)
  return <FitnessTools />
}
