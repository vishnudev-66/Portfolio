import { motion } from 'framer-motion'
import { ArrowDown } from 'lucide-react'
import SectionHeading from '../components/SectionHeading'
import Badge from '../components/Badge'

const PIPELINE = [
  'Data', 'Data Cleaning', 'Feature Engineering', 'Model Training', 'Evaluation', 'Deployment', 'AI Application',
]

const TOPICS: { title: string; status: 'learning' | 'exploring'; note: string }[] = [
  { title: 'Machine Learning', status: 'learning', note: 'Supervised learning workflows, model evaluation, and scikit-learn pipelines.' },
  { title: 'Generative AI', status: 'exploring', note: 'Understanding how generative models are trained and applied.' },
  { title: 'LLMs', status: 'learning', note: 'How large language models represent and generate language.' },
  { title: 'Prompt Engineering', status: 'learning', note: 'Structuring prompts for reliable, controllable model output.' },
  { title: 'RAG', status: 'exploring', note: 'Combining retrieval systems with generative models for grounded answers.' },
  { title: 'AI Agents', status: 'exploring', note: 'Tool-using, multi-step agent architectures.' },
]

export default function AIML() {
  return (
    <section id="ai-ml" className="section-shell scroll-mt-20">
      <SectionHeading
        eyebrow="05 / AI &amp; ML"
        title="AI / ML"
        description="How I approach a machine learning problem, end to end — and what I'm still actively learning."
      />

      <div className="glass-panel flex flex-col items-center gap-1 p-8 sm:p-10">
        {PIPELINE.map((step, i) => (
          <div key={step} className="flex w-full max-w-xs flex-col items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.3, delay: i * 0.06 }}
              className="w-full rounded-lg border border-white/10 bg-white/[0.03] px-5 py-3 text-center font-mono text-sm text-ink-100"
            >
              {step}
            </motion.div>
            {i < PIPELINE.length - 1 && (
              <ArrowDown size={16} className="my-1 text-signal-teal/60" aria-hidden="true" />
            )}
          </div>
        ))}
      </div>

      <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {TOPICS.map((topic, i) => (
          <motion.div
            key={topic.title}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.35, delay: i * 0.05 }}
            className="glass-panel p-5"
          >
            <div className="mb-3 flex items-center justify-between gap-2">
              <h3 className="text-sm font-semibold text-ink-100">{topic.title}</h3>
              <Badge tone={topic.status === 'learning' ? 'amber' : 'neutral'}>{topic.status}</Badge>
            </div>
            <p className="text-sm leading-relaxed text-ink-300">{topic.note}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
