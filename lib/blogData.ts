export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  readTime: string;
  image: string;
  content: string;
  instagramEmbed?: string;
  tags: string[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: "ai-vfx-car-van-replacement-breakdown",
    title: "AI Breakdown: From a Single Prompt to a Seamless Transformation",
    excerpt: "Here's how we used AI to replace a moving car with a van—making the impossible look completely natural. A visual breakdown of our VFX and AI workflow.",
    date: "July 18, 2026",
    category: "AI & VFX",
    readTime: "3 min read",
    image: "/solutions_bg.png",
    instagramEmbed: "https://www.instagram.com/reel/Da0TXHsJE8Y/",
    tags: ["AI", "Artificial Intelligence", "AI Editing", "VFX", "Visual Effects", "Car Replacement", "AI Filmmaking"],
    content: `
# AI Breakdown: Replacing Objects in Motion

Technology meets creativity. Replacing a moving object in a video used to take visual effects teams days of manual tracking, masking, rotoscoping, and 3D modeling. With modern generative AI workflows, we can achieve seamless object replacement in hours.

In our latest project, we replaced a moving car with a van—making the dynamic transition look completely natural. Here's a breakdown of the planning, workflow, and technology that brought this vision to life.

## The Planning & Scoping
Before editing, we analyze the footage to track:
1. **Camera Motion**: Handheld shakes, panning speed, and focal lengths.
2. **Lighting & Shadows**: The replacement van must catch the sun reflections and cast ground shadows matching the original environment.
3. **Occlusions**: Objects passing in front of or behind the vehicle.

## The AI VFX Workflow
We used a hybrid pipeline combining traditional tracking with generative image-to-image and depth-aware video networks:
- **Masking & Rotoscoping**: Segmenting the original car using depth-aware selection models.
- **Inpainting & Generation**: Promoting a van design matching the perspective angle using a single text prompt.
- **Color Grading**: Matching the grain, shadows, and light reflections to blend the generated van into the scene.

Watch the breakdown reel below to see the before-and-after workflow in action!
    `
  },
  {
    slug: "headless-nextjs-vs-wordpress-architectures",
    title: "Next.js vs WordPress: Why Modern Brands are Moving to Headless",
    excerpt: "Understand the core performance, security, and editing differences between legacy WordPress themes and headless Next.js architectures.",
    date: "July 15, 2026",
    category: "Web Development",
    readTime: "5 min read",
    image: "/public/solutions_bg.png", // fallback or default
    tags: ["Next.js", "WordPress", "Headless CMS", "Web Performance", "React"],
    content: `
# Next.js vs WordPress: Headless Architectures

Many corporate brands are moving away from legacy monolith WordPress setups in favor of headless configurations using Next.js. Why?

## 1. Page Load Speeds
Legacy WordPress sites load database pages dynamically on request, which adds milliseconds to every load. Next.js sites pre-compile pages to flat static files served from CDN edge networks, delivering sub-second loads.

## 2. Robust Security
WordPress websites are common targets for database injections, theme vulnerabilities, and plugin exploits. Decoupling the frontend (Next.js) from the backend database means hackers have no server-side files or directory roots to target.

## 3. Better Developer Control
Using React components allows developers to deploy premium customized layouts, animations, and micro-interactions that are hard to achieve with standard page builders.
    `
  },
  {
    slug: "microsoft-365-email-routing-spam-fixes",
    title: "How to Setup Microsoft 365 Domain Routing Without Going to Spam",
    excerpt: "A guide on fixing MX record errors, domain authentication keys, SPF, DKIM, and DMARC settings to guarantee email deliverability.",
    date: "July 12, 2026",
    category: "Cloud Advisory",
    readTime: "4 min read",
    image: "/digital_bg.png",
    tags: ["Microsoft 365", "Email Deliverability", "SPF", "DKIM", "DNS"],
    content: `
# Fix Your Corporate Email Deliverability

Unexpectedly landing in your client's spam folder can hurt business operations. When migrating to Microsoft 365, DNS routing must be configured correctly.

## Essential DNS Authentication Checks:
- **SPF (Sender Policy Framework)**: A TXT record listing all server IPs authorized to send mail from your domain.
- **DKIM (DomainKeys Identified Mail)**: Digital signatures added to email headers, verifying the mail hasn't been altered in transit.
- **DMARC (Domain-based Message Authentication)**: Rules telling receiving servers how to handle emails that fail SPF/DKIM checks.
    `
  }
];
