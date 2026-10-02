import { useEffect, useState } from 'react'
import { Menu, X, TerminalSquare, Moon, Sun } from 'lucide-react'
import { site } from '../config/site'
import { appPath, currentAppPath } from '../config/paths'

const NAV_ITEMS = [
  { path: '/about', label: 'About' },
  { path: '/skills', label: 'Skills' },
  { path: '/projects', label: 'Projects' },
  { path: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [lightTheme, setLightTheme] = useState(() => window.localStorage.getItem('theme') === 'light')
  const currentPath = currentAppPath()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle('theme-light', lightTheme)
    window.localStorage.setItem('theme', lightTheme ? 'light' : 'dark')
  }, [lightTheme])

  const closeMenu = () => {
    setOpen(false)
  }

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        scrolled ? 'border-b border-white/[0.06] bg-base-900/85 backdrop-blur-md' : 'border-b border-transparent bg-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 sm:px-8 lg:px-10" aria-label="Primary">
        <a
          href={appPath('/')}
          onClick={closeMenu}
          className="flex items-center gap-2 font-mono text-sm font-semibold text-ink-100"
        >
          <TerminalSquare size={18} className="text-signal-teal" aria-hidden="true" />
          <span>{site.name.toLowerCase().replace(/\s+/g, '_')}</span>
          <span className="text-signal-teal animate-blink">_</span>
        </a>

        <div className="flex items-center gap-2">
          <ul className="hidden items-center gap-1 lg:flex">
          {NAV_ITEMS.map((item) => (
            <li key={item.path}>
              <a
                href={appPath(item.path)}
                className="rounded-md px-3 py-2 font-mono text-xs uppercase tracking-wide text-ink-300 transition-colors hover:text-signal-teal"
                aria-current={currentPath === item.path ? 'page' : undefined}
              >
                {item.label}
              </a>
            </li>
          ))}
          </ul>

          <button
            type="button"
            onClick={() => setLightTheme((current) => !current)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-ink-300 transition-colors hover:border-signal-teal/50 hover:text-signal-teal"
            aria-label={lightTheme ? 'Switch to dark theme' : 'Switch to light theme'}
            title={lightTheme ? 'Switch to dark theme' : 'Switch to light theme'}
          >
            {lightTheme ? <Moon size={17} /> : <Sun size={17} />}
          </button>

          <button
            className="lg:hidden text-ink-100"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {open && (
        <div id="mobile-menu" className="border-t border-white/[0.06] bg-base-900/95 backdrop-blur-md lg:hidden">
          <ul className="flex flex-col gap-1 px-6 py-4">
            {NAV_ITEMS.map((item) => (
              <li key={item.path}>
                <a
                  href={appPath(item.path)}
                  onClick={closeMenu}
                  className="w-full rounded-md px-3 py-3 text-left font-mono text-sm text-ink-300 transition-colors hover:text-signal-teal"
                  aria-current={currentPath === item.path ? 'page' : undefined}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  )
}
