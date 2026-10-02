import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Github, Star, GitFork, ExternalLink } from 'lucide-react'
import { site } from '../config/site'
import { projects } from '../config/projects'
import SectionHeading from '../components/SectionHeading'
import Badge from '../components/Badge'

interface Repo {
  id: number
  name: string
  html_url: string
  description: string | null
  language: string | null
  stargazers_count: number
  forks_count: number
}

type LoadState = 'idle' | 'loading' | 'success' | 'error'

export default function GitHubSection() {
  const [repos, setRepos] = useState<Repo[]>([])
  const [state, setState] = useState<LoadState>('idle')

  useEffect(() => {
    if (!site.githubUsername) {
      setState('error')
      return
    }

    let cancelled = false
    setState('loading')

    fetch(`https://api.github.com/users/${site.githubUsername}/repos?sort=updated&per_page=6`)
      .then((res) => {
        if (!res.ok) throw new Error('GitHub API request failed')
        return res.json()
      })
      .then((data: Repo[]) => {
        if (!cancelled) {
          setRepos(data)
          setState('success')
        }
      })
      .catch(() => {
        if (!cancelled) setState('error')
      })

    return () => {
      cancelled = true
    }
  }, [])

  const showFallback = state === 'error' || (state === 'success' && repos.length === 0)

  return (
    <section id="github" className="section-shell scroll-mt-20">
      <SectionHeading
        eyebrow="07 / GitHub"
        title="GitHub"
        description="Live repository data when the GitHub username is configured — otherwise a static fallback keeps this section useful."
      />

      <div className="mb-8">
        <a href={site.links.github} target="_blank" rel="noreferrer" className="btn-primary">
          <Github size={16} /> View GitHub Profile
        </a>
      </div>

      {state === 'loading' && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="glass-panel h-40 animate-pulse p-5" />
          ))}
        </div>
      )}

      {state === 'success' && repos.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {repos.map((repo, i) => (
            <motion.a
              key={repo.id}
              href={repo.html_url}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.35, delay: i * 0.05 }}
              className="glass-panel flex flex-col gap-3 p-5 transition-colors hover:border-signal-teal/30"
            >
              <div className="flex items-center justify-between gap-2">
                <h3 className="truncate font-mono text-sm font-semibold text-ink-100">{repo.name}</h3>
                <ExternalLink size={14} className="shrink-0 text-ink-500" />
              </div>
              <p className="line-clamp-2 text-sm text-ink-300">{repo.description ?? 'No description provided.'}</p>
              <div className="mt-auto flex items-center gap-4 pt-2 font-mono text-xs text-ink-500">
                {repo.language && <Badge>{repo.language}</Badge>}
                <span className="flex items-center gap-1"><Star size={12} /> {repo.stargazers_count}</span>
                <span className="flex items-center gap-1"><GitFork size={12} /> {repo.forks_count}</span>
              </div>
            </motion.a>
          ))}
        </div>
      )}

      {showFallback && (
        <>
          <p className="mb-6 font-mono text-xs text-ink-500">
            {state === 'error'
              ? 'Live GitHub data isn\u2019t configured yet — showing static project cards instead.'
              : 'No public repositories found — showing static project cards instead.'}
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <div key={project.id} className="glass-panel flex flex-col gap-3 p-5">
                <h3 className="font-mono text-sm font-semibold text-ink-100">{project.title}</h3>
                <p className="line-clamp-2 text-sm text-ink-300">{project.description}</p>
                <div className="mt-auto flex flex-wrap gap-1.5 pt-2">
                  {project.technologies.slice(0, 3).map((t) => (
                    <Badge key={t}>{t}</Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </section>
  )
}
