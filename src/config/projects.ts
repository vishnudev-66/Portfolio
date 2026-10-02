export interface Project {
  id: string
  title: string
  description: string
  technologies: string[]
  status: 'shipped' | 'building'
  githubUrl?: string // leave undefined to show a disabled "Repo private" state
  demoUrl?: string
  accent: 'teal' | 'amber' | 'red'
}

// Replace the placeholder URLs below with your real repository / demo links.
// Leaving them as '#' will render clearly marked "Add link" placeholders instead
// of pretending a live link exists.

export const projects: Project[] = [
  {
    id: 'nids',
    title: 'Network Intrusion Detection System',
    description:
      'A machine-learning cybersecurity project that analyzes network traffic features, preprocesses data, and classifies normal and suspicious activity to support automated security monitoring.',
    technologies: ['Python', 'Pandas', 'NumPy', 'Scikit-learn', 'Machine Learning', 'Network Security', 'Streamlit / Flask'],
    status: 'shipped',
    githubUrl: undefined,
    demoUrl: undefined,
    accent: 'teal',
  },
  {
    id: 'diabetes-prediction',
    title: 'Diabetes Prediction System',
    description:
      'A healthcare prediction project that preprocesses patient health parameters, trains a supervised ML model, and provides an interface for generating diabetes risk predictions.',
    technologies: ['Python', 'Pandas', 'NumPy', 'Scikit-learn', 'Machine Learning', 'Data Analysis', 'Streamlit / Flask'],
    status: 'shipped',
    githubUrl: undefined,
    demoUrl: undefined,
    accent: 'amber',
  },
]
