import { useState } from 'react'
import { motion } from 'framer-motion'
import { Github, ExternalLink, ChevronDown, CircleDot } from 'lucide-react'
import { projects, type Project } from '../config/projects'
import SectionHeading from '../components/SectionHeading'
import Badge from '../components/Badge'

const ACCENT_TEXT: Record<Project['accent'], string> = {
  teal: 'text-signal-teal',
  amber: 'text-signal-amber',
  red: 'text-signal-red',
}

const ACCENT_BORDER: Record<Project['accent'], string> = {
  teal: 'from-signal-teal/25',
  amber: 'from-signal-amber/25',
  red: 'from-signal-red/25',
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <motion.article
      initial={false}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.45, delay: index * 0.06 }}
      className="glass-panel relative flex flex-col overflow-hidden p-6"
    >
      {/* project visual */}
      <div
        className={`relative mb-5 flex h-36 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br ${ACCENT_BORDER[project.accent]} to-transparent border border-white/[0.06]`}
        aria-hidden="true"
      >
        <div className="bg-grid absolute inset-0 opacity-40 [background-size:18px_18px]" />
        <span className={`relative font-mono text-4xl font-bold opacity-70 ${ACCENT_TEXT[project.accent]}`}>
          {project.title.split(' ').map((w) => w[0]).join('').slice(0, 3)}
        </span>
      </div>

      <div className="mb-2 flex items-center justify-between gap-3">
        <h3 className="text-lg font-semibold text-ink-100">{project.title}</h3>
        {project.status === 'building' && (
          <Badge tone="amber">
            <CircleDot size={11} className="mr-1 inline" /> Building
          </Badge>
        )}
      </div>

      <p className="text-sm leading-relaxed text-ink-300">{project.description}</p>

      <button
        onClick={() => setExpanded((v) => !v)}
        className="mt-3 flex items-center gap-1 self-start font-mono text-xs uppercase tracking-wide text-signal-teal"
        aria-expanded={expanded}
      >
        View Details
        <ChevronDown size={14} className={`transition-transform ${expanded ? 'rotate-180' : ''}`} />
      </button>

      {expanded && (
        <div className="mt-3 rounded-lg border border-white/[0.06] bg-white/[0.02] p-4 text-sm text-ink-300">
          <p>
            Status: <span className="text-ink-100">{project.status === 'building' ? 'In active development' : 'Working build available'}</span>
          </p>
          <p className="mt-2">
            This project's code and documentation live in its GitHub repository once published. Links below are
            configured centrally in <code className="font-mono text-signal-teal">src/config/projects.ts</code>.
          </p>
        </div>
      )}

      <div className="mt-5 flex flex-wrap gap-2">
        {project.technologies.map((t) => (
          <Badge key={t}>{t}</Badge>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap gap-2 border-t border-white/[0.06] pt-5">
        {project.githubUrl ? (
          <a href={project.githubUrl} target="_blank" rel="noreferrer" className="btn-secondary !px-4 !py-2 text-xs">
            <Github size={14} /> Repo
          </a>
        ) : (
          <span className="inline-flex cursor-not-allowed items-center gap-2 rounded-lg border border-dashed border-white/10 px-4 py-2 font-mono text-xs text-ink-500">
            <Github size={14} /> Repo — add link
          </span>
        )}
        {project.demoUrl ? (
          <a href={project.demoUrl} target="_blank" rel="noreferrer" className="btn-secondary !px-4 !py-2 text-xs">
            <ExternalLink size={14} /> Live Demo
          </a>
        ) : (
          <span className="inline-flex cursor-not-allowed items-center gap-2 rounded-lg border border-dashed border-white/10 px-4 py-2 font-mono text-xs text-ink-500">
            <ExternalLink size={14} /> Demo — add link
          </span>
        )}
      </div>
    </motion.article>
  )
}

export default function Projects() {
  return (
    <section id="projects" className="section-shell scroll-mt-20">
      <SectionHeading
        eyebrow="03 / Projects"
        title="Projects"
        description="A working project showcase — GitHub and demo links populate automatically once added to the config."
      />
      <div className="grid gap-6 sm:grid-cols-2">
        {projects.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} />
        ))}
      </div>
    </section>
  )
}
