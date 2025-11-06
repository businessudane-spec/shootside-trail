# ShootSide

A Next.js project with Supabase integration.

## Setup

1. Clone the repository
2. Install dependencies: `npm install`
3. Copy `.env.example` to `.env.local` and fill in your Supabase credentials
4. Run the development server: `npm run dev`

## Environment Variables

Required environment variables:
- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_ANON_KEY

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.



<!-- <section
  id="works"
  className="py-20 bg-black text-white relative overflow-hidden"
>
  <div className="max-w-7xl mx-auto px-6 text-center">
    {/* Title */}
    <motion.h2
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="text-4xl md:text-5xl font-extrabold mb-8"
    >
      Our Works
    </motion.h2>
    <p className="text-gray-400 max-w-2xl mx-auto text-sm mb-12">
      A glimpse into the creative journeys we’ve crafted — from brand stories
      to digital experiences that inspire and engage.
    </p>

    {/* Grid of Works */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
      {[
        { src: "/works/work1.png", title: "Toni & Guy Campaign" },
        { src: "/works/work1.png", title: "Naturals Rebranding" },
        { src: "/works/work1.png", title: "MYG Electronics Ad" },
        { src: "/works/work1.png", title: "Slash Fitness Socials" },
        { src: "/works/work1.png", title: "Evana Jewelry Film" },
        { src: "/works/work1.png", title: "VFS Digital Campaign" },
      ].map((work, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: idx * 0.1 }}
          viewport={{ once: true }}
          className="relative group overflow-hidden rounded-2xl border border-white/10 shadow-lg"
        >
          <Image
            src={work.src}
            alt={work.title}
            width={600}
            height={400}
            className="w-full h-90 object-cover rounded-2xl transform group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition duration-500 flex items-center justify-center">
            <h3 className="text-lg md:text-xl font-semibold">{work.title}</h3>
          </div>
        </motion.div>
      ))}
    </div>
  </div>

  {/* Background Glow */}
  <div className="absolute -bottom-32 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-purple-600/20 blur-[120px] rounded-full pointer-events-none"></div>
</section> -->