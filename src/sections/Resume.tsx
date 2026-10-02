import { FileText, Download } from 'lucide-react'
import { site } from '../config/site'
import { appPath } from '../config/paths'
import SectionHeading from '../components/SectionHeading'

export default function Resume() {
  const hasResume = Boolean(site.resumePath)

  return (
    <section id="resume" className="section-shell scroll-mt-20">
      <SectionHeading eyebrow="08 / Resume" title="Resume" />

      <div className="glass-panel flex flex-col items-start gap-6 p-8 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03]">
            <FileText size={20} className="text-signal-teal" aria-hidden="true" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-ink-100">{site.name} — Resume</h3>
            <p className="mt-1 max-w-md text-sm text-ink-300">
              {hasResume
                ? 'Download the latest version of my resume.'
                : <>My resume will be available here soon. Add <code className="font-mono text-signal-teal">public/resume.pdf</code> and set its path in <code className="font-mono text-signal-teal">src/config/site.ts</code> to enable the download.</>}
            </p>
          </div>
        </div>

        {hasResume ? (
          <a href={appPath(site.resumePath)} download className="btn-primary shrink-0">
            <Download size={16} /> Download Resume
          </a>
        ) : (
          <span className="btn-secondary shrink-0 cursor-not-allowed opacity-50" aria-disabled="true">
            <Download size={16} /> Resume coming soon
          </span>
        )}
      </div>
    </section>
  )
}
