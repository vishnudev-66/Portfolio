import Navbar from './components/Navbar'
import Footer from './components/Footer'
import PageBackdrop from './components/PageBackdrop'
import Hero from './sections/Hero'
import About from './sections/About'
import Skills from './sections/Skills'
import Projects from './sections/Projects'
import Contact from './sections/Contact'
import { currentAppPath } from './config/paths'

const PAGES = {
  '/': Hero,
  '/about': About,
  '/skills': Skills,
  '/projects': Projects,
  '/contact': Contact,
} as const

const BACKDROPS = {
  '/about': 'about',
  '/skills': 'skills',
  '/projects': 'projects',
  '/contact': 'contact',
} as const

export default function App() {
  const path = currentAppPath()
  const Page = PAGES[path as keyof typeof PAGES] ?? Hero
  const backdrop = BACKDROPS[path as keyof typeof BACKDROPS]

  return (
    <div className="min-h-screen bg-base-900">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-signal-teal focus:px-4 focus:py-2 focus:text-base-950"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main-content" className={backdrop ? 'page-shell' : undefined}>
        {backdrop && <PageBackdrop variant={backdrop} />}
        <div className={backdrop ? 'relative z-10' : undefined}>
          <Page />
        </div>
      </main>
      <Footer />
    </div>
  )
}
