import { lazy, Suspense } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Github, Download } from 'lucide-react'
import { site } from '../config/site'
import { useInView } from '../hooks/useInView'
import { appPath } from '../config/paths'

const ThreeBackground = lazy(() => import('../components/ThreeBackground'))

export default function Hero() {
  const { ref, inView } = useInView<HTMLDivElement>(0.15)
  const hasResume = Boolean(site.resumePath)

  const goToProjects = () => { window.location.href = appPath('/projects') }

  return (
    <section id="home" ref={ref} className="relative flex min-h-[92vh] items-center overflow-hidden">
      {/* grid backdrop */}
      <div className="pointer-events-none absolute inset-0 bg-grid-fade" aria-hidden="true" />

      {/* Visible fallback for browsers where WebGL is unavailable. */}
      <div className="hero-3d-fallback" aria-hidden="true">
        <div className="hero-orbit hero-orbit-one" />
        <div className="hero-orbit hero-orbit-two" />
        <div className="hero-orbit hero-orbit-three" />
        <div className="hero-core">
          <span className="hero-core-highlight" />
        </div>
        <span className="hero-satellite hero-satellite-teal" />
        <span className="hero-satellite hero-satellite-amber" />
        <span className="hero-satellite hero-satellite-red" />
      </div>

      {/* 3D scene, lazy-loaded and paused off-screen */}
      <div className="pointer-events-none absolute inset-0 opacity-80">
        <Suspense fallback={null}>
          <ThreeBackground inView={inView} />
        </Suspense>
      </div>

      <div className="section-shell relative z-10 py-16">
        <motion.div
          // Keep the landing content visible even when animation frames are paused
          // (for example, during browser startup or on constrained devices).
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <span className="eyebrow">
            <span className="h-1.5 w-1.5 rounded-full bg-signal-teal" aria-hidden="true" />
            available for opportunities
          </span>

          <h1 className="mt-5 text-4xl font-extrabold leading-[1.05] text-ink-100 sm:text-5xl lg:text-6xl">
            {site.name}
          </h1>

          <p className="mt-4 font-mono text-sm text-signal-teal sm:text-base">
            {site.roles.join('  •  ')}
          </p>

          <h2 className="mt-6 max-w-2xl text-xl font-semibold text-ink-100 sm:text-2xl">
            {site.headline}
          </h2>

          <p className="mt-4 max-w-xl text-base leading-relaxed text-ink-300">
            {site.subhead}
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <button onClick={goToProjects} className="btn-primary">
              View Projects <ArrowRight size={16} />
            </button>
            <a href={site.links.github} target="_blank" rel="noreferrer" className="btn-secondary">
              <Github size={16} /> GitHub
            </a>
            {hasResume ? (
              <a href={appPath(site.resumePath)} download className="btn-secondary">
                <Download size={16} /> Download Resume
              </a>
            ) : (
              <span className="btn-secondary cursor-not-allowed opacity-50" aria-disabled="true">
                <Download size={16} /> Resume coming soon
              </span>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
