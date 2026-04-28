# Cinematic Next.js Portfolio

This project now includes a rebuilt cinematic portfolio experience for:

- Arabic: `أمين سمير أمين اليوسفي`
- English: `Ameen Sameer Ameen Al-Yosofi`

## Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- Three.js
- React Three Fiber
- Drei
- GSAP
- Framer Motion
- Lenis

## Key Files

- `app/page.tsx`
- `app/layout.tsx`
- `src/components/portfolio-experience.tsx`
- `src/components/three/hero-scene.tsx`
- `src/data/site-content.ts`
- `public/ameen-cutout.png`
- `public/ameen-cinematic.png`
- `public/resume-ameen-al-yosofi.pdf`

## Run

Use:

```bash
npm.cmd install --cache .npm-cache
npm.cmd run dev
```

Then open:

```text
http://127.0.0.1:3000
```

## Notes

- The local Codex sandbox blocks part of Next.js worker spawning in this session, so runtime verification here is incomplete.
- The codebase and TypeScript structure are in place and the cinematic app files are ready for a normal local Next.js environment.
