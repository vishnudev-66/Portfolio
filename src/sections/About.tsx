import { useState } from 'react'
import { motion } from 'framer-motion'
import { site } from '../config/site'
import SectionHeading from '../components/SectionHeading'
import Badge from '../components/Badge'

export default function About() {
  const [imageFailed, setImageFailed] = useState(false)

  return (
    <section id="about" className="section-shell scroll-mt-20">
      <SectionHeading eyebrow="01 / About" title="About Me" />

      <div className="grid gap-12 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-5">
          {site.about.paragraphs.map((p, i) => (
            <motion.p
              key={i}
              initial={false}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="text-base leading-relaxed text-ink-300"
            >
              {p}
            </motion.p>
          ))}

          <div className="flex flex-wrap gap-2 pt-2">
            {site.about.learning.map((item) => (
              <Badge key={item} tone="neutral">{item}</Badge>
            ))}
          </div>
        </div>

        <div className="space-y-5">
          <aside className="glass-panel overflow-hidden p-2">
            {!imageFailed ? (
              <img
                src={site.profileImage}
                alt={`Portrait of ${site.name}`}
                onError={() => setImageFailed(true)}
                className="aspect-square w-full rounded-xl object-cover"
              />
            ) : (
              <div className="profile-photo-placeholder aspect-square rounded-xl">
                <span className="font-mono text-5xl font-bold text-signal-teal">{site.name.split(' ').map((name) => name[0]).join('')}</span>
                <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-300">Add public/profile.jpg</p>
              </div>
            )}
          </aside>
          <aside className="glass-panel h-fit p-6">
            <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-signal-teal">Current Focus</h3>
            <ul className="mt-4 space-y-3">
              {site.currentFocus.map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm text-ink-100">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-signal-teal" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </div>
    </section>
  )
}
