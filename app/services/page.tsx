"use client";

import { motion } from "framer-motion";
import {
  Globe, Code, ShoppingCart, Settings, ShieldAlert, Cpu, Bot, Database, Search, Palette, 
  Video, Film, Tv, Play, Image, Sparkles, Cloud, Mail, Share2, Target, BarChart3, LineChart, 
  ShieldCheck, HelpCircle, HardHat, FileText, CheckCircle2, ChevronRight, HelpCircle as HelpIcon
} from "lucide-react";
import Link from "next/link";

export default function ServicesPage() {
  const serviceCategories = [
    {
      title: "Web & E-Commerce Development",
      description: "Custom web development and tailored digital shops built for speed, security, and conversion.",
      services: [
        { name: "Custom Web Application Development", icon: Code, desc: "Bespoke web applications built with Next.js, React, and robust node backends." },
        { name: "WordPress Custom Theme Design", icon: Settings, desc: "Exclusive, lightweight WordPress theme creation to represent your corporate brand." },
        { name: "WooCommerce & Shopify Stores", icon: ShoppingCart, desc: "High-conversion online stores with integrated local payment gateways." },
        { name: "Corporate Website Portals", icon: Globe, desc: "Multilingual and highly secure portals for enterprise business scaling." },
        { name: "API & Backend Integrations", icon: Cpu, desc: "Connect ERPs, CRM workflows, and third-party data platforms seamlessly." },
        { name: "Critical Bug Remediation", icon: ShieldAlert, desc: "Rapid fix response for server faults, broken databases, and theme crashes." }
      ]
    },
    {
      title: "AI & Machine Learning Automation",
      description: "Leverage intelligent automation, conversational interfaces, and custom model deployments.",
      services: [
        { name: "Custom Conversational AI Assistants", icon: Bot, desc: "Context-aware chatbots for leads generation and automatic support ticketing." },
        { name: "Workflow Automation & Scripting", icon: Settings, desc: "Connect webhooks and automate internal business processes." },
        { name: "Predictive Analytics Models", icon: LineChart, desc: "Utilize historical data to project target margins and user trends." },
        { name: "Document Parser & Data Extractors", icon: Database, desc: "AI-driven scanners to parse invoice details and upload to ERPs." },
        { name: "Natural Language Processing (NLP)", icon: Sparkles, desc: "Sentiment analysis and text summaries designed to speed up operations." },
        { name: "Custom LLM Integrations", icon: Cpu, desc: "Deploy private instances of OpenAI or LLaMA trained on internal training files." }
      ]
    },
    {
      title: "Video Products & AI Generation",
      description: "Stunning cinematic output and automated video generation engines designed to captivate.",
      services: [
        { name: "AI Video Generation Pipelines", icon: Sparkles, desc: "Generate scalable promotional material using advanced text-to-video tools." },
        { name: "Corporate Video Production", icon: Video, desc: "Premium quality video content capturing corporate achievements and reviews." },
        { name: "Cinematic Motion Graphics", icon: Film, desc: "Rich 3D typography, transitions, and logo animations to captivate audiences." },
        { name: "Social Media Reel Creation", icon: Play, desc: "Highly engaging short-form video products customized for TikTok and Instagram." },
        { name: "AI Avatar Creation", icon: Tv, desc: "Deploy digital brand ambassadors to present tutorials and marketing updates." },
        { name: "Commercial Post-Production", icon: Image, desc: "High-grade color correction, sound design, and automated video edits." }
      ]
    },
    {
      title: "Cloud Infrastructure & Microsoft 365",
      description: "Establish secure corporate environments and scalable cloud storage solutions.",
      services: [
        { name: "Microsoft 365 Enterprise Deployments", icon: Cloud, desc: "Setup secure business emails, Teams collaboration spaces, and licenses." },
        { name: "AWS & Google Cloud Migrations", icon: Database, desc: "Zero-downtime transfers from local setups to high-availability cloud servers." },
        { name: "Corporate Email Routing & Spam Filters", icon: Mail, desc: "Optimize MX records, SPF, DKIM, and secure mail firewalls." },
        { name: "Cloud Backup & Recovery Routines", icon: ShieldCheck, desc: "Automated, redundant hourly backups ensuring absolute business continuity." },
        { name: "Server Optimization & Caching", icon: Settings, desc: "Fine-tune Nginx, Redis, and database buffers to maximize speeds." },
        { name: "Containerized App Deployment", icon: Cpu, desc: "Setup Docker and Kubernetes environments for scalable SaaS deployments." }
      ]
    },
    {
      title: "A-Z Marketing & Social Management",
      description: "Digital presence strategies and growth marketing frameworks to acquire customers.",
      services: [
        { name: "Full-Funnel Digital Marketing", icon: Target, desc: "End-to-end user acquisition campaigns across search and social channels." },
        { name: "Social Media Account Management", icon: Share2, desc: "Content calendar scheduling, copywriting, and daily audience interactions." },
        { name: "Search Engine Optimization (SEO)", icon: Search, desc: "High-intent keyword planning, local map indexing, and technical page fixes." },
        { name: "Lead Generation Architectures", icon: BarChart3, desc: "Design and build dedicated landing pages that optimize conversion ratios." },
        { name: "Content Creation & Copywriting", icon: FileText, desc: "SEO-friendly blog articles, newsletter campaigns, and sales copy." },
        { name: "Performance Marketing Metrics", icon: LineChart, desc: "ROI dashboard configuration tracking CAC, LTV, and conversion ratios." }
      ]
    },
    {
      title: "Business IT Support & Advisory",
      description: "Strategic guidance, security audits, and continuous maintenance agreements.",
      services: [
        { name: "Digital Transformation Advisory", icon: LineChart, desc: "Consulting to identify manual bottlenecks and implement modern software." },
        { name: "Vulnerability & Security Audits", icon: ShieldCheck, desc: "Comprehensive scans for malware, outdated scripts, and server leakages." },
        { name: "Website Maintenance Contracts", icon: Settings, desc: "Monthly checks on plugins, security headers, and hosting operations." },
        { name: "Remote Support Service Center", icon: HelpIcon, desc: "Rapid helpdesk support for emails, office tools, and web panels." },
        { name: "Database Maintenance & Cleanups", icon: Database, desc: "Optimize index tables, query layouts, and speed up storage queries." },
        { name: "Software License Procurement", icon: Globe, desc: "Manage bulk configurations of cloud tools, domain portfolios, and SSLs." }
      ]
    }
  ];

  return (
    <main className="min-h-screen bg-[#030303] text-white pt-32 pb-24 relative overflow-hidden">
      {/* Glow backgrounds */}
      <div className="absolute top-1/3 left-10 w-[300px] h-[300px] bg-purple-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-10 w-[350px] h-[350px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Intro */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-xs font-bold uppercase tracking-wider text-purple-400">Our Catalog</span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black uppercase mt-3 mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
            A to Z Digital Services
          </h1>
          <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
            From coding applications and optimizing cloud security to advanced AI automation, digital marketing, and commercial video production—we serve as your comprehensive IT department.
          </p>
        </div>

        {/* Categories Loop */}
        <div className="space-y-20">
          {serviceCategories.map((cat, categoryIndex) => (
            <div key={categoryIndex} id={cat.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")} className="space-y-8 pt-16 -mt-16">
              <div className="border-l-4 border-purple-500 pl-4">
                <h2 className="text-2xl font-black uppercase text-white tracking-wide">{cat.title}</h2>
                <p className="text-gray-400 text-sm mt-1">{cat.description}</p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {cat.services.map((svc, serviceIndex) => {
                  const Icon = svc.icon;
                  return (
                    <div
                      key={serviceIndex}
                      className="group relative rounded-xl border border-white/5 bg-[#090909] hover:bg-[#0d0d0d] p-6 transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
                    >
                      <div>
                        <div className="w-10 h-10 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 group-hover:text-white group-hover:scale-105 transition-all mb-4">
                          <Icon className="w-5 h-5" />
                        </div>
                        <h3 className="font-bold text-white mb-2 group-hover:text-purple-300 transition-colors duration-300">
                          {svc.name}
                        </h3>
                        <p className="text-gray-400 text-xs sm:text-sm leading-relaxed mb-4">
                          {svc.desc}
                        </p>
                      </div>
                      
                      <div className="flex items-center text-xs font-semibold text-purple-400/80 group-hover:text-purple-300 transition-colors mt-2">
                        <span>Learn More</span>
                        <ChevronRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-0.5" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-24 text-center rounded-3xl border border-white/5 bg-gradient-to-br from-white/5 to-white/0 p-8 md:p-14 backdrop-blur-md max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-extrabold mb-4">Need a Customized Service Plan?</h2>
          <p className="text-gray-400 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto mb-8">
            Tell us about your infrastructure goals. We design custom remote SLA support contracts and dedicated team packages.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-sm uppercase tracking-wider hover:from-blue-500 hover:to-purple-500 transition-all duration-300 active:scale-95 shadow-xl shadow-purple-500/25"
          >
            Request Consultation
          </Link>
        </div>

      </div>
    </main>
  );
}
