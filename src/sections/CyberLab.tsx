import { motion } from 'framer-motion'
import {
  Network, Terminal, ShieldAlert, Search, FileSearch, ShieldCheck, FileText, ShieldOff,
} from 'lucide-react'
import SectionHeading from '../components/SectionHeading'

const DOMAINS = [
  { title: 'Network Security', icon: Network },
  { title: 'Linux Security', icon: Terminal },
  { title: 'SOC Analysis', icon: ShieldAlert },
  { title: 'Threat Detection', icon: Search },
  { title: 'Web Security', icon: ShieldCheck },
  { title: 'Ethical Hacking', icon: ShieldOff },
  { title: 'Incident Response', icon: FileText },
]

const PIPELINE = [
  'Reconnaissance', 'Enumeration', 'Detection', 'Analysis', 'Investigation', 'Response', 'Reporting',
]

export default function CyberLab() {
  return (
    <section id="cyber-lab" className="section-shell scroll-mt-20">
      <SectionHeading
        eyebrow="04 / Cyber Lab"
        title="Cybersecurity Lab"
        description="A running record of the security domains I'm actively practicing, from reconnaissance through reporting."
      />

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {DOMAINS.map(({ title, icon: Icon }, i) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.35, delay: i * 0.05 }}
            className="glass-panel flex flex-col items-start gap-3 p-5"
          >
            <Icon size={20} className="text-signal-teal" aria-hidden="true" />
            <span className="text-sm font-semibold text-ink-100">{title}</span>
          </motion.div>
        ))}
      </div>

      {/* pipeline */}
      <div className="mt-14">
        <h3 className="mb-6 font-mono text-xs uppercase tracking-[0.2em] text-ink-500">Investigation Pipeline</h3>
        <div className="glass-panel overflow-x-auto p-6">
          <div className="flex min-w-[720px] items-center justify-between gap-2">
            {PIPELINE.map((step, i) => (
              <div key={step} className="flex items-center gap-2">
                <div className="flex flex-col items-center gap-2 text-center">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full border border-signal-teal/30 bg-signal-teal/10 font-mono text-xs text-signal-teal">
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <span className="w-20 text-[11px] font-medium text-ink-300">{step}</span>
                </div>
                {i < PIPELINE.length - 1 && (
                  <div className="h-px w-8 shrink-0 bg-gradient-to-r from-signal-teal/40 to-signal-teal/5" aria-hidden="true" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8 flex items-start gap-3 rounded-xl border border-signal-amber/25 bg-signal-amber/[0.06] p-5">
        <FileSearch size={18} className="mt-0.5 shrink-0 text-signal-amber" aria-hidden="true" />
        <p className="text-sm leading-relaxed text-ink-300">
          <span className="font-semibold text-signal-amber">Disclaimer:</span> All security testing and
          experimentation is performed only in authorized environments, personal labs, or systems where
          permission has been granted.
        </p>
      </div>
    </section>
  )
}
