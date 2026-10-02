/**
 * ============================================================
 *  CENTRAL SITE CONFIGURATION
 * ============================================================
 *  Edit THIS file to update your name, bio, links, and resume.
 *  Nothing else in the codebase should hardcode this info.
 * ============================================================
 */

export const site = {
  name: 'Vishnudev G',
  roles: ['AI/ML Engineer', 'Prompt Engineer', 'Cybersecurity Learner'],
  headline: 'Building Intelligent Systems & Security-Focused AI Solutions',
  subhead:
    'I build practical AI/ML applications, automation tools, and cybersecurity projects while continuously learning how intelligent systems can solve real-world problems.',

  // Set to your real GitHub username to enable live repo/contribution data.
  // Leave as-is to use the static fallback data in src/config/projects.ts
  githubUsername: 'vishnudev-66',

  links: {
    github: 'https://github.com/vishnudev-66',
    linkedin: 'https://www.linkedin.com/in/vishnudev-g-59b075333',
    email: 'vishnudevgunasekaran@gmail.com',
  },

  // Path is resolved from /public.
  resumePath: '/resume.pdf',

  // Add your photo as public/profile.jpg (or change this path to your image).
  profileImage: '/profile.jpg',

  currentFocus: ['AI/ML', 'Cybersecurity', 'Python', 'Intelligent Automation'],

  about: {
    paragraphs: [
      "I'm currently developing my skills as an AI/ML engineer with a strong interest in applied cybersecurity. My work is grounded in hands-on practice — building models, writing automation scripts, and experimenting with how large language models can be directed reliably through prompt engineering.",
      "I'm not claiming years of professional experience — I'm claiming consistent, deliberate practice: reading source documentation, breaking things in a lab environment, and rebuilding them until I understand why they work.",
      'My goal is to specialize at the intersection of practical AI and security — building systems that are not only intelligent, but also safe, explainable, and resilient against misuse.',
    ],
    learning: [
      'Python',
      'Machine Learning',
      'Artificial Intelligence',
      'Prompt Engineering',
      'SQL',
      'Linux',
      'Git / GitHub',
      'Cybersecurity',
      'Network Security',
    ],
  },

  contactFormEndpoint: '', // e.g. a Formspree/EmailJS endpoint. Empty = form runs in demo mode.
} as const

export type Site = typeof site
