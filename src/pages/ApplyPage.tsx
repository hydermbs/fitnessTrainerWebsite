import { Booking } from '../components/sections/Booking'
import { usePageTitle } from '../hooks/usePageTitle'
import { siteContent } from '../config/siteContent'

export function ApplyPage() {
  usePageTitle(`${siteContent.booking.title} — ${siteContent.meta.logoName}`)
  return <Booking />
}
