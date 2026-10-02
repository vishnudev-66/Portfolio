interface Props {
  eyebrow: string
  title: string
  description?: string
}

export default function SectionHeading({ eyebrow, title, description }: Props) {
  return (
    <div className="mb-14 max-w-2xl">
      <span className="eyebrow">
        <span aria-hidden="true">&gt;</span> {eyebrow}
      </span>
      <h2 className="mt-3 text-3xl font-bold text-ink-100 sm:text-4xl">{title}</h2>
      {description && <p className="mt-4 text-base leading-relaxed text-ink-300">{description}</p>}
    </div>
  )
}
