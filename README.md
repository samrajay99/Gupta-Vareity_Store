# Gupta Variety Store

TypeScript Next.js storefront with Tailwind CSS, GSAP animation, and a server-side feedback API.

## Run locally

1. Install Node.js 18 or newer.
2. Run `npm install`.
3. Copy `.env.example` to `.env`.
4. Set `SMTP_USER` and `SMTP_PASSWORD` to a sending Gmail account and Gmail App Password.
5. Keep `MAIL_TO=gsamraj178@gmail.com`.
6. Run `npm run dev` and open `http://localhost:3000`.

Generate an admin delete token in PowerShell:

```powershell
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Copy the generated value into `.env` as `ADMIN_DELETE_TOKEN=...`. Do not use the placeholder from `.env.example`, and never share the token publicly.

The forms send to `POST /api/feedback`. Gmail requires an App Password when two-step verification is enabled; never commit `.env`. Deploy on Vercel, Render, Railway, or another Node.js-compatible host for real email delivery.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- GSAP + ScrollTrigger
- Nodemailer email API

## Customer reviews and photos

Reviews are stored in `data/reviews.json` and uploaded images are stored in `data/reviews/images`. They remain available after restarts until the owner deletes them. The deployment must provide a persistent disk or volume; ephemeral serverless storage will not preserve local files.

To delete a review, set `ADMIN_DELETE_TOKEN` in `.env`, then send:

```powershell
Invoke-WebRequest -Uri "https://your-domain.com/api/reviews?id=REVIEW_ID" -Method Delete -Headers @{ 'x-admin-token' = $env:ADMIN_DELETE_TOKEN }
```

The review ID is returned by the API and is also present in the browser network response after a successful submission.
