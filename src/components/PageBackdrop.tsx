type Variant = 'about' | 'skills' | 'projects' | 'contact'

export default function PageBackdrop({ variant }: { variant: Variant }) {
  return (
    <div className={`page-backdrop page-backdrop-${variant}`} aria-hidden="true">
      {variant === 'about' && (
        <div className="circuit-board">
          <span className="circuit-chip" />
          <i className="circuit-line circuit-line-a" />
          <i className="circuit-line circuit-line-b" />
          <i className="circuit-line circuit-line-c" />
          <b className="circuit-node circuit-node-a" />
          <b className="circuit-node circuit-node-b" />
          <b className="circuit-node circuit-node-c" />
        </div>
      )}
      {variant === 'skills' && (
        <div className="skill-cubes">
          <span className="skill-cube skill-cube-one" />
          <span className="skill-cube skill-cube-two" />
          <span className="skill-cube skill-cube-three" />
        </div>
      )}
      {variant === 'projects' && (
        <div className="project-terminal">
          <span className="terminal-panel terminal-panel-back" />
          <span className="terminal-panel terminal-panel-mid" />
          <span className="terminal-panel terminal-panel-front" />
          <i className="terminal-code terminal-code-a" />
          <i className="terminal-code terminal-code-b" />
          <i className="terminal-code terminal-code-c" />
        </div>
      )}
      {variant === 'contact' && (
        <div className="contact-orb">
          <span className="contact-orb-core" />
          <i className="contact-orb-ring contact-orb-ring-one" />
          <i className="contact-orb-ring contact-orb-ring-two" />
          <b className="contact-orb-dot contact-orb-dot-one" />
          <b className="contact-orb-dot contact-orb-dot-two" />
        </div>
      )}
    </div>
  )
}
