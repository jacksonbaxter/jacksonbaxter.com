# Jackson Baxter Portfolio

A clean, minimal portfolio website built with Next.js, Tailwind CSS, and Shadcn UI. Features an AI chatbot, email contact form, and blog.

## Live Demo

🌐 Check it out here: **[jacksonbaxter.com](https://jacksonbaxter.com)**

## Features

- Minimal design with Shadcn UI
- Light/dark mode toggle
- AI chatbot trained on portfolio content
- Contact form with email integration
- Responsive mobile design
- Blog section

## Tech Stack

- Next.js
- Tailwind CSS
- Shadcn UI
- OpenAI API (chatbot)
- Vercel (hosting)
- Resend (email)
- Postgres + pgvector (vector storage)
- Obsidian + LiveSync plugin (CMS)
- CouchDB (document storage)

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

### On-demand blog revalidation

This repo caches blog pages for performance. To see edits immediately after the FastAPI/CouchDB pipeline updates a post, set `REVALIDATE_SECRET` and call the revalidation endpoint from the backend:

```bash
# Revalidate blog index + a specific post page
curl -X POST 'http://localhost:3000/api/revalidate?secret=MY_SECRET' \
  -H 'content-type: application/json' \
  -d '{"slug":"my-post-slug"}'

# Revalidate only the blog index (no body)
curl -X POST 'http://localhost:3000/api/revalidate?secret=MY_SECRET'
```

## Customization

- Update personal info in `src/data/*.json`
- Replace projects in `src/data/projects.json`
- Replace blog posts in `content/` or remove it
- Replace your resume with `public/resume.pdf`
- Modify chatbot prompt in `src/app/api/chat/route.ts`

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

## License

MIT
