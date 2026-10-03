import { Transformations } from '../components/sections/Transformations'
import { usePageTitle } from '../hooks/usePageTitle'
import { siteContent } from '../config/siteContent'

export function TransformationsPage() {
  usePageTitle(`${siteContent.transformations.title} — ${siteContent.meta.logoName}`)
  return <Transformations />
}
