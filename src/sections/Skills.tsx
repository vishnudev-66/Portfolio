import { useState } from 'react'
import { motion } from 'framer-motion'
import { skillCategories, type SkillLevel } from '../config/skills'
import SectionHeading from '../components/SectionHeading'

const LEVEL_META: Record<SkillLevel, { label: string; dot: string }> = {
  exploring: { label: 'Exploring', dot: 'bg-ink-500' },
  learning: { label: 'Learning', dot: 'bg-signal-amber' },
  practicing: { label: 'Practicing', dot: 'bg-signal-teal' },
}

export default function Skills() {
  const [active, setActive] = useState(skillCategories[0].id)
  const category = skillCategories.find((c) => c.id === active) ?? skillCategories[0]

  return (
    <section id="skills" className="section-shell scroll-mt-20">
      <SectionHeading
        eyebrow="02 / Skills"
        title="Skills"
        description="Grouped honestly by how much hands-on practice I've put in — not inflated to sound impressive."
      />

      <div className="flex flex-wrap gap-2 mb-8" role="tablist" aria-label="Skill categories">
        {skillCategories.map((c) => (
          <button
            key={c.id}
            role="tab"
            aria-selected={active === c.id}
            onClick={() => setActive(c.id)}
            className={`rounded-full border px-4 py-2 font-mono text-xs uppercase tracking-wide transition-colors ${
              active === c.id
                ? 'border-signal-teal/50 bg-signal-teal/10 text-signal-teal'
                : 'border-white/10 text-ink-300 hover:border-white/25'
            }`}
          >
            {c.title}
          </button>
        ))}
      </div>

      <p className="mb-6 text-sm text-ink-500">{category.description}</p>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {category.skills.map((skill, i) => (
          <motion.div
            key={skill.name}
            initial={false}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.35, delay: i * 0.04 }}
            className="glass-panel flex flex-col gap-3 p-4"
          >
            <span className="text-sm font-semibold text-ink-100">{skill.name}</span>
            <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-wide text-ink-500">
              <span className={`h-1.5 w-1.5 rounded-full ${LEVEL_META[skill.level].dot}`} aria-hidden="true" />
              {LEVEL_META[skill.level].label}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
