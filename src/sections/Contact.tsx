import { useState, FormEvent } from 'react'
import { Github, Linkedin, Mail, Send, Info } from 'lucide-react'
import { site } from '../config/site'
import SectionHeading from '../components/SectionHeading'

type Status = 'idle' | 'sending' | 'sent' | 'error' | 'emailClient'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState<Status>('idle')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (!site.contactFormEndpoint) {
      const subject = encodeURIComponent(`Portfolio enquiry from ${form.name}`)
      const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`)
      window.location.href = `mailto:${site.links.email}?subject=${subject}&body=${body}`
      setStatus('emailClient')
      return
    }

    setStatus('sending')
    try {
      const res = await fetch(site.contactFormEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      setStatus(res.ok ? 'sent' : 'error')
      if (res.ok) setForm({ name: '', email: '', message: '' })
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="section-shell scroll-mt-20">
      <SectionHeading
        eyebrow="09 / Contact"
        title="Contact"
        description="Send a message directly from the form, or use one of the contact links."
      />

      <div className="grid gap-8 lg:grid-cols-5">
        <form onSubmit={handleSubmit} className="glass-panel space-y-4 p-6 lg:col-span-3">
          <div>
            <label htmlFor="name" className="mb-1.5 block font-mono text-xs uppercase tracking-wide text-ink-500">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={form.name}
              onChange={handleChange}
              className="w-full rounded-lg border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-ink-100 outline-none transition-colors focus:border-signal-teal/50"
              placeholder="Your name"
            />
          </div>
          <div>
            <label htmlFor="email" className="mb-1.5 block font-mono text-xs uppercase tracking-wide text-ink-500">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={form.email}
              onChange={handleChange}
              className="w-full rounded-lg border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-ink-100 outline-none transition-colors focus:border-signal-teal/50"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label htmlFor="message" className="mb-1.5 block font-mono text-xs uppercase tracking-wide text-ink-500">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              value={form.message}
              onChange={handleChange}
              className="w-full resize-none rounded-lg border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-ink-100 outline-none transition-colors focus:border-signal-teal/50"
              placeholder="What would you like to say?"
            />
          </div>

          <button type="submit" disabled={status === 'sending'} className="btn-primary w-full sm:w-auto">
            <Send size={16} /> {status === 'sending' ? 'Sending…' : 'Send Message'}
          </button>

          {status === 'emailClient' && (
            <p className="flex items-start gap-2 text-xs leading-relaxed text-signal-amber">
              <Info size={14} className="mt-0.5 shrink-0" />
              Your email app has been opened with this message ready to send. If it did not open, email me directly at
              <a className="ml-1 underline" href={`mailto:${site.links.email}`}>{site.links.email}</a>.
            </p>
          )}
          {status === 'sent' && <p className="text-xs text-signal-teal">Message sent — thank you!</p>}
          {status === 'error' && <p className="text-xs text-signal-red">Something went wrong sending that. Please email me directly instead.</p>}
        </form>

        <div className="glass-panel space-y-5 p-6 lg:col-span-2">
          <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-signal-teal">Direct Links</h3>
          <a href={`mailto:${site.links.email}`} className="flex items-center gap-3 text-sm text-ink-100 hover:text-signal-teal">
            <Mail size={16} /> {site.links.email}
          </a>
          <a href={site.links.github} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-sm text-ink-100 hover:text-signal-teal">
            <Github size={16} /> GitHub
          </a>
          <a href={site.links.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-sm text-ink-100 hover:text-signal-teal">
            <Linkedin size={16} /> LinkedIn
          </a>
        </div>
      </div>
    </section>
  )
}
