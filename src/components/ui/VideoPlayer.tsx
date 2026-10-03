import { useState } from 'react'

interface VideoPlayerProps {
  embedUrl: string
  poster: { src: string; alt: string }
  title: string
  playLabel: string
  durationLabel?: string
}

const FRAME = 'relative aspect-video overflow-hidden rounded-xl border border-border bg-surface shadow-card'

const PlayIcon = (
  <svg viewBox="0 0 24 24" width={28} height={28} fill="currentColor" aria-hidden="true" className="ml-1">
    <path d="M8 5v14l11-7z" />
  </svg>
)

function appendAutoplay(url: string): string {
  const separator = url.includes('?') ? '&' : '?'
  return `${url}${separator}autoplay=1&rel=0`
}

export function VideoPlayer({ embedUrl, poster, title, playLabel, durationLabel }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)

  if (isPlaying) {
    return (
      <div className={FRAME}>
        <iframe
          src={appendAutoplay(embedUrl)}
          title={title}
          className="absolute inset-0 h-full w-full"
          allow="autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
        />
      </div>
    )
  }

  return (
    <button
      type="button"
      onClick={() => setIsPlaying(true)}
      aria-label={playLabel}
      className={`group block w-full ${FRAME} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas`}
    >
      <img src={poster.src} alt={poster.alt} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
      <span aria-hidden="true" className="absolute inset-0 bg-black/25 transition-colors duration-200 group-hover:bg-black/35" />
      <span aria-hidden="true" className="absolute inset-0 flex items-center justify-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-card transition-transform duration-200 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100">
          {PlayIcon}
        </span>
      </span>
      {durationLabel && (
        <span className="absolute bottom-3 right-3 rounded-full border border-border bg-surface px-2.5 py-1 text-xs font-semibold text-primary">
          {durationLabel}
        </span>
      )}
    </button>
  )
}
