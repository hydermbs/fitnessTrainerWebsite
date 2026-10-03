import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Container } from './Container'
import { ThemeToggle } from './ThemeToggle'
import { Button } from '../ui/Button'
import { siteContent } from '../../config/siteContent'
import { cx } from '../../lib/cx'

const { meta, nav, navCta } = siteContent

const MenuIcon = <path d="M4 7h16M4 12h16M4 17h16" />
const CloseIcon = <path d="M6 6l12 12M18 6L6 18" />

function navLinkClass({ isActive }: { isActive: boolean }): string {
  return cx(
    'text-sm font-medium transition-colors',
    isActive ? 'text-accent' : 'text-secondary hover:text-primary',
  )
}

function Logo() {
  return (
    <Link to="/" className="flex flex-col leading-none">
      <span className="font-display text-lg uppercase tracking-wide text-primary">{meta.logoName}</span>
      <span className="text-[11px] uppercase tracking-[0.2em] text-secondary">{meta.logoBrandline}</span>
    </Link>
  )
}

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => setIsOpen(false), [location.pathname])

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={cx(
        'sticky top-0 z-50 bg-canvas transition-colors',
        isScrolled ? 'border-b border-border' : 'border-b border-transparent',
      )}
    >
      <Container className="flex h-16 items-center justify-between">
        <Logo />

        <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
          {nav.map((link) => (
            <NavLink key={link.to} to={link.to} className={navLinkClass}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <ThemeToggle />
          <Button to={navCta.to} icon={navCta.icon}>
            {navCta.label}
          </Button>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setIsOpen((open) => !open)}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-border bg-surface text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <svg viewBox="0 0 24 24" width={22} height={22} fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" aria-hidden="true">
              {isOpen ? CloseIcon : MenuIcon}
            </svg>
          </button>
        </div>
      </Container>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden border-b border-border bg-surface md:hidden"
          >
            <nav aria-label="Mobile" className="flex flex-col gap-1 px-6 py-4">
              {nav.map((link) => (
                <NavLink key={link.to} to={link.to} className={navLinkClass}>
                  <span className="block py-2">{link.label}</span>
                </NavLink>
              ))}
              <Button to={navCta.to} icon={navCta.icon} className="mt-2 w-full">
                {navCta.label}
              </Button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
