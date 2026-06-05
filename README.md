# Masjid Website

Next.js App Router app using Prisma with a Supabase PostgreSQL database.

## Render Deployment

Use these Render settings:

```sh
Build Command: npm install && npm run build
Start Command: npm start
```

Required environment variable:

```sh
DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DATABASE?sslmode=require
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_PUBLIC_KEY
```

Render provides `PORT`; the production server uses Next.js via `npm start`.

## Production Commands

```sh
npm run build
npm start
```

The build command runs `prisma generate` before `next build`, so Prisma Client is available when Render creates the production `.next` build.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
