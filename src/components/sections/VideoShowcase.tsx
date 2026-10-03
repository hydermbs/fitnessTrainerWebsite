import { motion } from 'framer-motion'
import { Section } from '../layout/Section'
import { SectionHeading } from './SectionHeading'
import { VideoPlayer } from '../ui/VideoPlayer'
import { fadeUp } from '../../lib/motion'
import { siteContent } from '../../config/siteContent'

const { video } = siteContent

export function VideoShowcase() {
  return (
    <Section id="video" alt>
      <SectionHeading align="center" badge={video.badge} title={video.title} subtitle={video.subtitle} />
      <motion.div variants={fadeUp} className="mx-auto mt-10 max-w-3xl">
        <VideoPlayer
          embedUrl={video.embedUrl}
          poster={video.poster}
          title={video.title}
          playLabel={video.playLabel}
          durationLabel={video.durationLabel}
        />
      </motion.div>
    </Section>
  )
}
