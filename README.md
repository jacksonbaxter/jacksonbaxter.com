# Jackson Baxter Portfolio

A clean, minimal portfolio website built with Next.js, Tailwind CSS, and Shadcn UI. Features a streamlined email contact form, privacy policy, and lightweight site analytics.

## Live Demo

🌐 Check it out here: **[jacksonbaxter.com](https://jacksonbaxter.com)**

## Features

- Minimal design with Shadcn UI
- Light/dark mode toggle
- Streamlined contact form with email integration
- Privacy policy with lightweight analytics disclosure
- Progressive enhancement for homepage interactivity
- Responsive mobile design

## Tech Stack

- Next.js
- Tailwind CSS
- Shadcn UI
- Vercel (hosting, analytics, speed insights)
- Resend (email)

## Getting Started

```bash
git clone https://github.com/jacksonbaxter/jacksonbaxter.com
cd jacksonbaxter.com
bun install
cp .env.example .env.local
# add your API keys to .env.local
bun run dev
```

## Environment Variables

See .env.example

## Customization

- Update personal info in `src/data/*.json`
- Replace projects in `src/data/projects.json`
- Replace your resume with `public/resume.pdf`

## Deployment

Deploy to Vercel:

```bash
bunx vercel login
bunx vercel deploy --prod
```

Or use the Vercel dashboard:

1. Push to GitHub
2. Connect repo to Vercel
3. Add environment variables
4. Deploy 🎉
