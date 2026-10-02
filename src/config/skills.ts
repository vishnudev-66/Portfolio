export type SkillLevel = 'exploring' | 'learning' | 'practicing'

export interface Skill {
  name: string
  level: SkillLevel
}

export interface SkillCategory {
  id: string
  title: string
  description: string
  skills: Skill[]
}

// Level legend (kept honest — no false "expert" claims):
// exploring  -> just started / conceptual understanding
// learning   -> actively building projects with it
// practicing -> comfortable using it regularly

export const skillCategories: SkillCategory[] = [
  {
    id: 'programming',
    title: 'Programming',
    description: 'Core languages used across projects',
    skills: [
      { name: 'Python', level: 'practicing' },
      { name: 'C', level: 'learning' },
      { name: 'Java', level: 'learning' },
      { name: 'JavaScript', level: 'learning' },
    ],
  },
  {
    id: 'ai-ml',
    title: 'AI / ML',
    description: 'Applied machine learning & language models',
    skills: [
      { name: 'Machine Learning', level: 'learning' },
      { name: 'Scikit-learn', level: 'learning' },
      { name: 'NumPy', level: 'practicing' },
      { name: 'Pandas', level: 'practicing' },
      { name: 'Matplotlib', level: 'learning' },
      { name: 'NLP', level: 'exploring' },
      { name: 'Generative AI', level: 'exploring' },
      { name: 'LLM Concepts', level: 'learning' },
      { name: 'Prompt Engineering', level: 'practicing' },
    ],
  },
  {
    id: 'cybersecurity',
    title: 'Cybersecurity',
    description: 'Security fundamentals & lab practice',
    skills: [
      { name: 'Linux', level: 'practicing' },
      { name: 'Networking', level: 'learning' },
      { name: 'Wireshark', level: 'learning' },
      { name: 'Nmap', level: 'learning' },
      { name: 'Burp Suite', level: 'exploring' },
      { name: 'SOC Fundamentals', level: 'exploring' },
      { name: 'Web Security', level: 'learning' },
      { name: 'Ethical Hacking Fundamentals', level: 'exploring' },
    ],
  },
  {
    id: 'database',
    title: 'Database',
    description: 'Structured data storage & queries',
    skills: [
      { name: 'SQL', level: 'practicing' },
      { name: 'MySQL', level: 'learning' },
      { name: 'SQLite', level: 'practicing' },
    ],
  },
  {
    id: 'development',
    title: 'Development',
    description: 'Building and serving applications',
    skills: [
      { name: 'React', level: 'learning' },
      { name: 'Node.js', level: 'learning' },
      { name: 'Flask / FastAPI', level: 'learning' },
      { name: 'REST APIs', level: 'practicing' },
    ],
  },
  {
    id: 'tools',
    title: 'Tools',
    description: 'Daily engineering workflow',
    skills: [
      { name: 'Git', level: 'practicing' },
      { name: 'GitHub', level: 'practicing' },
      { name: 'VS Code', level: 'practicing' },
      { name: 'Linux', level: 'practicing' },
    ],
  },
]
