import { motion } from 'framer-motion'
import { Award, ExternalLink } from 'lucide-react'
import { certifications } from '../config/certifications'
import SectionHeading from '../components/SectionHeading'

export default function Certifications() {
  return (
    <section id="certifications" className="section-shell scroll-mt-20">
      <SectionHeading
        eyebrow="06 / Certifications"
        title="Certifications"
        description="Add your earned credentials in src/config/certifications.ts — these are placeholders until then."
      />

      <div className="relative space-y-6 border-l border-white/10 pl-8">
        {certifications.map((cert, i) => (
          <motion.div
            key={cert.id}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.35, delay: i * 0.06 }}
            className="glass-panel relative p-5"
          >
            <span
              className="absolute -left-[calc(2rem+5px)] top-6 h-2.5 w-2.5 rounded-full border-2 border-base-900 bg-signal-teal"
              aria-hidden="true"
            />
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <Award size={18} className="mt-1 shrink-0 text-signal-amber" aria-hidden="true" />
                <div>
                  <h3 className="text-sm font-semibold text-ink-100">{cert.name}</h3>
                  <p className="mt-1 text-xs text-ink-500">{cert.issuer} &middot; {cert.date}</p>
                </div>
              </div>
              {cert.credentialUrl ? (
                <a
                  href={cert.credentialUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="shrink-0 text-ink-500 transition-colors hover:text-signal-teal"
                  aria-label={`View credential for ${cert.name}`}
                >
                  <ExternalLink size={16} />
                </a>
              ) : (
                <span className="shrink-0 font-mono text-[10px] uppercase tracking-wide text-ink-500">
                  no link yet
                </span>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
