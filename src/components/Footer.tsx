import { Github, Linkedin, Mail } from 'lucide-react'
import { site } from '../config/site'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-white/[0.06] bg-base-950">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-6 py-10 text-center sm:flex-row sm:justify-between sm:text-left">
        <p className="font-mono text-xs text-ink-500">
          © {year} {site.name}. Built with React, Three.js &amp; Tailwind CSS.
        </p>
        <div className="flex items-center gap-4">
          <a
            href={site.links.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub profile"
            className="text-ink-500 transition-colors hover:text-signal-teal"
          >
            <Github size={18} />
          </a>
          <a
            href={site.links.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn profile"
            className="text-ink-500 transition-colors hover:text-signal-teal"
          >
            <Linkedin size={18} />
          </a>
          <a
            href={`mailto:${site.links.email}`}
            aria-label="Send an email"
            className="text-ink-500 transition-colors hover:text-signal-teal"
          >
            <Mail size={18} />
          </a>
        </div>
      </div>
    </footer>
  )
}
