# Vishnudev G — Portfolio

A 3D personal portfolio built with **React + Vite + TypeScript + Tailwind CSS + React Three Fiber + Framer Motion**.

---

## 1. Project structure

```
src/
├── components/     # Reusable UI: Navbar, Footer, cards, 3D background
├── sections/       # One file per page section (Hero, About, Skills, ...)
├── config/         # ← EDIT THESE to change all personal info
│   ├── site.ts             (name, bio, links, resume path, focus areas)
│   ├── skills.ts            (skill categories + honesty levels)
│   ├── projects.ts          (project cards)
│   └── certifications.ts    (certification cards)
├── hooks/          # useReducedMotion, useInView
├── App.tsx
├── main.tsx
└── index.css
public/
├── favicon.svg
├── og-cover.svg
└── resume.pdf      # ← add your real resume here
```

Nothing is hardcoded across multiple components — every editable value lives in `src/config/`.

---

## 2. Run it locally

```bash
npm install
npm run dev
```

Open the printed local URL (typically `http://localhost:5173`).

### Build for production

```bash
npm run build
npm run preview   # serve the production build locally to double-check it
```

---

## 3. Changing your personal information

Open **`src/config/site.ts`** and edit:

```ts
export const site = {
  name: 'Your Name',
  roles: ['AI/ML Engineer', 'Prompt Engineer', 'Cybersecurity Learner'],
  headline: '...',
  subhead: '...',
  githubUsername: 'your-github-username',
  links: {
    github: 'https://github.com/your-username',
    linkedin: 'https://linkedin.com/in/your-username',
    email: 'you@example.com',
  },
  resumePath: '/resume.pdf',
  currentFocus: ['AI/ML', 'Cybersecurity', 'Python', 'Intelligent Automation'],
  about: { paragraphs: [...], learning: [...] },
  contactFormEndpoint: '', // see section 7
}
```

Everything on the site (hero, footer, contact, resume button, GitHub button) reads from this one file.

---

## 4. Adding your GitHub data

1. Set `githubUsername` in `src/config/site.ts` to your real GitHub username.
2. The **GitHub** section fetches your latest public repositories live from the GitHub REST API (`api.github.com/users/<username>/repos`) — no key required for public read access.
3. If the username is left as a placeholder, or the API call fails, the section **gracefully falls back** to static cards generated from `src/config/projects.ts` — it never shows broken or fake data.
4. Also update `links.github` in the same file so the "View GitHub Profile" button points to the right profile.

---

## 5. Adding your resume

1. Export your resume as a PDF.
2. Name it `resume.pdf`.
3. Place it in the `public/` folder, replacing the placeholder note (`public/RESUME_PLACEHOLDER.txt` can be deleted).
4. The "Download Resume" buttons in the Hero and Resume sections already point to `/resume.pdf` via `site.resumePath` — no code changes needed.

---

## 6. Adding or editing projects

Open **`src/config/projects.ts`** and add an entry to the `projects` array:

```ts
{
  id: 'unique-id',
  title: 'Project Name',
  description: 'One or two sentence summary.',
  technologies: ['Python', 'Flask'],
  status: 'shipped', // or 'building'
  githubUrl: 'https://github.com/you/repo', // omit/undefined to show a placeholder
  demoUrl: 'https://your-demo-url.com',      // omit/undefined to show a placeholder
  accent: 'teal', // 'teal' | 'amber' | 'red'
}
```

Cards are generated automatically — no changes needed in `src/sections/Projects.tsx`. Leaving `githubUrl`/`demoUrl` unset renders a clearly marked "add link" placeholder instead of a fake link.

---

## 7. Connecting the contact form

The contact form does **not** pretend to send messages until you configure a real backend, to avoid misleading visitors.

To enable it:

1. Create a free form endpoint with a service like [Formspree](https://formspree.io) or [EmailJS](https://www.emailjs.com/).
2. Paste the endpoint URL into `contactFormEndpoint` in `src/config/site.ts`.
3. The form will `POST` `{ name, email, message }` as JSON to that endpoint.

Until configured, submitting the form shows an honest notice and a direct `mailto:` link instead.

---

## 8. Editing skills & certifications

- **Skills:** edit `src/config/skills.ts`. Each skill has a `level` of `'exploring' | 'learning' | 'practicing'` — keep these honest; don't mark something `'practicing'` if you've only just started it.
- **Certifications:** edit `src/config/certifications.ts`. Only add certifications you have actually earned. Each entry supports a name, issuer, date, credential URL, and image.

---

## 9. The 3D hero background

`src/components/NeuralNetworkScene.tsx` renders a lightweight neural-network-style particle field (nodes + connections + a few wireframe polyhedra) using React Three Fiber. It:

- is **lazy-loaded** (code-split into its own chunk, only downloaded when the hero mounts)
- **pauses rendering** when the hero scrolls out of view (`IntersectionObserver` via `useInView`)
- **respects `prefers-reduced-motion`** (stops animating, renders a single static frame)
- uses low particle/line counts and `powerPreference: 'low-power'` to stay cheap on mobile GPUs

To adjust density, edit `NODE_COUNT` and `CONNECT_DISTANCE` at the top of that file.

---

## 10. Deployment (free options)

### Vercel
```bash
npm install -g vercel
vercel
```
Framework preset: **Vite**. Build command `npm run build`, output directory `dist`.

### Netlify
```bash
npm install -g netlify-cli
npm run build
netlify deploy --prod --dir=dist
```

### GitHub Pages
1. `npm install -D gh-pages`
2. Add to `package.json`: `"deploy": "gh-pages -d dist"`
3. Set `base: '/<your-repo-name>/'` in `vite.config.ts`.
4. `npm run build && npm run deploy`

Any static host works — the output of `npm run build` is a plain static `dist/` folder.

---

## 11. Notes on honesty in the content

Per the original brief, this site is written to avoid:
- inventing work experience, certifications, or projects
- overstating skill level (see the "level" legend in `src/config/skills.ts`)
- fake statistics, testimonials, or logos
- a contact form that silently pretends to work with no backend

Update the placeholder values as your real experience grows — the structure is already in place.
