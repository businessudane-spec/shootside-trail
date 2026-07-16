"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import {
  Globe,
  Settings,
  ShoppingBag,
  Wrench,
  AlertOctagon,
  Cloud,
  Layers,
  Cpu,
  TrendingUp,
  Palette,
  Zap,
  Users,
  Shield,
  Map,
  Clock,
  Heart,
  HardHat,
  Briefcase,
  GraduationCap,
  Building,
  Rocket,
  Mail,
  Phone,
  MessageSquare,
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Video,
  PlayCircle,
  Coffee,
  Hammer
} from "lucide-react";

import Orb from "@/components/ui/orb";
import QuoteSection from "@/components/QuoteSection";

export default function Home() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [works, setWorks] = useState(0);
  const [clients, setClients] = useState(0);
  const statsRef = useRef(null);
  const [startCount, setStartCount] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    service: "Web Development"
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setForm({ name: "", email: "", phone: "", message: "", service: "Web Development" });
    }, 4000);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStartCount(true);
        }
      },
      { threshold: 0.4 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!startCount) return;

    let workInterval = setInterval(() => {
      setWorks((prev) => {
        if (prev >= 120) {
          clearInterval(workInterval);
          return 120;
        }
        return prev + 2;
      });
    }, 20);

    let clientInterval = setInterval(() => {
      setClients((prev) => {
        if (prev >= 45) {
          clearInterval(clientInterval);
          return 45;
        }
        return prev + 1;
      });
    }, 40);

    return () => {
      clearInterval(workInterval);
      clearInterval(clientInterval);
    };
  }, [startCount]);

  // Exactly 6 Core Services for the Home Page
  const homeServices = [
    {
      title: "Website Development & E-Commerce",
      icon: Globe,
      description: "Premium corporate websites and custom online stores. Engineered for extreme speeds, local payment setups, and optimized SEO."
    },
    {
      title: "AI Video Generation & Production",
      icon: Video,
      description: "Harness AI generators, post-production engines, and cinematic editing pipelines to deploy commercial-grade video assets at scale."
    },
    {
      title: "AI Automation & Smart Chatbots",
      icon: Cpu,
      description: "Integrate LLM conversational virtual assistants, document parsers, and custom API webhooks to automate enterprise tasks."
    },
    {
      title: "Cloud Services & Microsoft 365",
      icon: Cloud,
      description: "Corporate Office 365 licensing, custom domain email routing, anti-spam filters, and secure database architecture hosting."
    },
    {
      title: "Critical Website Maintenance & Recovery",
      icon: AlertOctagon,
      description: "Instant response agreements to restore crashed sites, eliminate malware, patch critical database faults, and apply security fixes."
    },
    {
      title: "A-Z Digital Marketing & Strategy",
      icon: TrendingUp,
      description: "Comprehensive marketing strategy, SEO technical ranking updates, and social account growth plans to scale businesses."
    }
  ];

  const features = [
    {
      title: "Fast Response",
      icon: Clock,
      description: "Dedicated support turnarounds and prompt communications when your business operations are on the line."
    },
    {
      title: "Experienced Team",
      icon: Users,
      description: "A seasoned roster of systems engineers, full-stack developers, cloud architects, and video content specialists."
    },
    {
      title: "Affordable Solutions",
      icon: Zap,
      description: "High-end corporate IT structures, cloud configurations, and professional design packages priced fairly for growth."
    },
    {
      title: "Secure & Reliable",
      icon: Shield,
      description: "Top-tier database encryptions, daily secure automated backups, SSL configs, and reliable servers for complete safety."
    },
    {
      title: "India & GCC Support",
      icon: Map,
      description: "Physical presence and specialized digital compliance alignments serving clients in India and Middle East hubs."
    },
    {
      title: "End-to-End IT Services",
      icon: Layers,
      description: "From setting up corporate emails to managing massive cloud instances and building custom LLM models."
    }
  ];

  const emergencyRef = useRef(null);
  const { scrollYProgress: emergencyScroll } = useScroll({
    target: emergencyRef,
    offset: ["start start", "end end"]
  });

  const diagnosticSlides = [
    {
      badge: "Urgent Support",
      badgeColor: "border-red-500/20 bg-red-500/10 text-red-400",
      accentColor: "border-red-500/20",
      glowColor: "bg-red-600/10",
      title: "Is Your Website Down?",
      description: "Don't lose customers to unexpected outages or hack attempts. We offer emergency diagnostic support and code remediation to bring you back online in hours.",
      points: [
        "WordPress Critical Errors",
        "500 Server Errors",
        "Malware Removal",
        "Website Recovery",
        "Hosting Issues",
        "SSL Problems"
      ],
      ctaText: "Get Immediate Support",
      ctaLink: "https://wa.me/917306166866"
    },
    {
      badge: "Marketing Audit",
      badgeColor: "border-orange-500/20 bg-orange-500/10 text-orange-400",
      accentColor: "border-orange-500/20",
      glowColor: "bg-orange-600/10",
      title: "Is Your Social Media Lacking Reach?",
      description: "Stop spending budget on posts no one sees. We design high-reach organic campaigns, short-form reels, and targeted ad funnels that drive real conversions.",
      points: [
        "Low Engagement Ratios",
        "Slow Audience Growth",
        "Content Calendar Gaps",
        "Poor Ad Conversions",
        "No Video Products",
        "Lead Funnel Bottlenecks"
      ],
      ctaText: "Boost Your Reach",
      ctaLink: "/contact"
    },
    {
      badge: "Email Security",
      badgeColor: "border-blue-500/20 bg-blue-500/10 text-blue-400",
      accentColor: "border-blue-500/20",
      glowColor: "bg-blue-600/10",
      title: "Is Your Email Going to Spam?",
      description: "Ensure your corporate emails reach client inboxes every time. We fix domain routing errors, setup SPF/DKIM keys, and clear spam blocklists.",
      points: [
        "Spam Box Deliverability",
        "MX Routing Errors",
        "SPF / DKIM Failures",
        "Anti-Spam Filter Configs",
        "Microsoft 365 Errors",
        "Domain Authentication"
      ],
      ctaText: "Fix Email Deliverability",
      ctaLink: "/contact"
    },
    {
      badge: "AI Automation",
      badgeColor: "border-purple-500/20 bg-purple-500/10 text-purple-400",
      accentColor: "border-purple-500/20",
      glowColor: "bg-purple-600/10",
      title: "Is Your Team Wasting Hours on Manual Tasks?",
      description: "Stop doing copy-paste workflows. We build custom API connectors, AI virtual assistants, and document scanners that operate 24/7.",
      points: [
        "No Automated Workflows",
        "Copy-Paste Errors",
        "Disconnected Tool Stacks",
        "No Virtual Chatbots",
        "Slow Inquiry Responses",
        "Manual Data Entry"
      ],
      ctaText: "Automate Your Work",
      ctaLink: "/contact"
    },
    {
      badge: "Cloud Advisory",
      badgeColor: "border-cyan-500/20 bg-cyan-500/10 text-cyan-400",
      accentColor: "border-cyan-500/20",
      glowColor: "bg-cyan-600/10",
      title: "Is Your Cloud Infrastructure Slow or Insecure?",
      description: "Optimize your infrastructure. We perform cloud security sweeps, set up redundant automated backups, and cut bloated hosting bills.",
      points: [
        "AWS / Azure Overhead",
        "Unoptimized Cloud Buffers",
        "Outdated Server Scripts",
        "No Recovery Routines",
        "Slow Web Applications",
        "Security Vulnerabilities"
      ],
      ctaText: "Secure Your Cloud",
      ctaLink: "/contact"
    }
  ];

  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    return emergencyScroll.on("change", (latest) => {
      const index = Math.min(
        Math.floor(latest * diagnosticSlides.length),
        diagnosticSlides.length - 1
      );
      setActiveSlide(index);
    });
  }, [emergencyScroll]);

  const industries = [
    { name: "Healthcare", icon: Heart },
    { name: "Construction", icon: HardHat },
    { name: "Retail", icon: ShoppingBag },
    { name: "Finance", icon: Briefcase },
    { name: "Education", icon: GraduationCap },
    { name: "Manufacturing", icon: Building },
    { name: "Hospitality", icon: Coffee },
    { name: "Real Estate", icon: Hammer },
    { name: "Startups", icon: Rocket }
  ];

  return (
    <main className="bg-[#030303] text-white min-h-screen selection:bg-purple-600/30 selection:text-purple-200">
      
      {/* 1. HERO SECTION (Dark theme background) */}
      <section className="relative w-full min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        {/* Background Orb */}
        <div className="absolute inset-0 z-0">
          <Orb
            hoverIntensity={2.5}
            rotateOnHover
            hue={270}
            forceHoverState={false}
            backgroundColor="#030303"
          />
          {/* Bottom Gradient overlay */}
          <div className="absolute bottom-0 left-0 w-full h-[30%] bg-gradient-to-t from-[#030303] to-transparent pointer-events-none" />
        </div>

        {/* Hero Overlay Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center pt-12 md:pt-24 pb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-xs font-semibold uppercase tracking-wider text-purple-400"
          >
            <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
            AI Video & IT Solutions for India & GCC
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6"
          >
            <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
              Technology That Powers
            </span>{" "}
            <br />
            Your Business
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-10"
          >
            Helping businesses across India and the GCC with Website Development, AI Video Generation, AI Automation, Cloud Services, Microsoft 365, Website Maintenance, and Business IT Support.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="flex flex-col sm:flex-row justify-center gap-4 px-4"
          >
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-sm uppercase tracking-wider hover:from-blue-500 hover:to-purple-500 transition-all duration-300 shadow-xl shadow-purple-500/20 hover:scale-[1.02] active:scale-95 cursor-pointer"
            >
              Get a Free Consultation
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center justify-center px-8 py-4 rounded-full border border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/10 text-white font-bold text-sm uppercase tracking-wider transition-all duration-300 hover:scale-[1.02] active:scale-95"
            >
              Learn About Us
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 2. TRUSTED BRANDS (Dark theme background) */}
      <section className="bg-black/40 border-y border-white/5 py-10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-10">
          {/* LEFT TEXT */}
          <div className="text-gray-400 text-sm md:text-base font-semibold w-[220px]">
            Trusted brands that <br /> We have helped
          </div>

          {/* RIGHT LOGO SLIDER */}
          <div className="flex-1 overflow-hidden">
            <div className="flex items-center gap-16 animate-brand-slide w-max">
              {/* logos */}
              <img src="/Wattle-White-Text-Logo.svg" className="h-[30px] opacity-60 hover:opacity-100 transition-opacity duration-300" />
              <img src="/CRIZPO.png" className="h-[30px] opacity-60 hover:opacity-100 transition-opacity duration-300" />
              <img src="/zenato.png" className="h-[35px] opacity-60 hover:opacity-100 transition-opacity duration-300" />
              <img src="https://www.myg.in/images/logos/1/site-Logo.png" className="h-[15px] opacity-60 hover:opacity-100 transition-opacity duration-300" />
              <img src="https://www.hyundai.com/content/dam/hyundai/ww/en/images/main/new/common/logo-wh.png" className="h-[15px] opacity-60 hover:opacity-100 transition-opacity duration-300" />
              <img src="/alf-removebg-preview.png" className="h-[35px] opacity-60 hover:opacity-100 transition-opacity duration-300" />
              <img src="/creamount-removebg-preview.png" className="h-[35px] opacity-60 hover:opacity-100 transition-opacity duration-300" />
              <img src="/qn.png" className="h-[35px] opacity-60 hover:opacity-100 transition-opacity duration-300" />

              {/* duplicate once */}
              <img src="/Wattle-White-Text-Logo.svg" className="h-[30px] opacity-60" />
              <img src="/CRIZPO.png" className="h-[30px] opacity-60" />
              <img src="/zenato.png" className="h-[35px] opacity-60" />
              <img src="https://www.myg.in/images/logos/1/site-Logo.png" className="h-[15px] opacity-60" />
              <img src="https://www.hyundai.com/content/dam/hyundai/ww/en/images/main/new/common/logo-wh.png" className="h-[15px] opacity-60" />
            </div>
          </div>
        </div>
      </section>

      {/* 3. ABOUT SECTION (Dark theme background) */}
      <section id="about" className="py-24 relative overflow-hidden bg-[#050505] border-b border-white/5">
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[350px] h-[350px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-1/3 right-0 w-[350px] h-[350px] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-purple-400 mb-3">Who We Are</div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase mb-6 leading-tight">
                About Shootside
              </h2>
              <div className="w-12 h-1.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded mb-8" />
              <p className="text-gray-300 text-base sm:text-lg leading-relaxed mb-6">
                Shootside is a technology solutions company helping businesses establish, maintain, and grow their digital presence. We specialize in website development, AI automation, cloud technologies, Microsoft 365, website maintenance, and digital transformation.
              </p>
              <p className="text-gray-300 text-base sm:text-lg leading-relaxed font-light italic">
                "Our mission is to deliver reliable, secure, and scalable technology solutions that empower businesses to succeed."
              </p>
            </div>
            
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-br from-white/5 to-white/0 p-1 backdrop-blur">
                <div className="w-full h-full bg-neutral-900/60 rounded-[14px] flex flex-col justify-center items-center p-8 text-center">
                  <div className="w-16 h-16 rounded-full bg-purple-500/10 border border-purple-500/30 flex items-center justify-center mb-6">
                    <CheckCircle2 className="w-8 h-8 text-purple-400" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-white">Trust & Reliable Quality</h3>
                  <p className="text-gray-400 text-sm max-w-sm">
                    We serve enterprises, SMEs, and startups across multiple hubs in India and the Middle East, offering active remote support for accounts in 5+ countries.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CORE SERVICES SECTION (Light theme background) */}
      <section id="services" className="py-24 relative bg-white border-b border-slate-200/45">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-600">Our Core Focus</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase mt-3 mb-6 text-slate-900">
              Featured Tech & Media Solutions
            </h2>
            <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
              We design web applications, generate commercial-grade AI video products, configure secure cloud workspaces, and automate business processes.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {homeServices.map((svc, i) => {
              const Icon = svc.icon;
              return (
                <div
                  key={i}
                  className="group relative rounded-2xl border border-slate-200/60 bg-slate-50 hover:bg-slate-100/80 p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-purple-500/5 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-purple-500/0 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  
                  <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-600 group-hover:scale-110 transition-all duration-300 mb-6">
                    <Icon className="w-6 h-6" />
                  </div>
                  
                  <h3 className="text-lg font-bold text-slate-900 mb-3 group-hover:text-purple-600 transition-colors">
                    {svc.title}
                  </h3>
                  
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {svc.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* EXPLORE ALL SERVICES BUTTON */}
          <div className="text-center mt-12">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-purple-500/30 hover:border-purple-500 bg-purple-500/5 hover:bg-purple-500/10 text-purple-600 hover:text-purple-700 font-bold text-sm uppercase tracking-wider transition-all duration-300 hover:scale-[1.02] active:scale-95 cursor-pointer"
            >
              Explore All 36 Services <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 5. WHY CHOOSE US (Dark theme background) */}
      <section id="why-choose-us" className="py-24 bg-[#050505] border-t border-white/5 relative">
        <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] bg-purple-500/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-400">Core Benefits</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase mt-3 mb-6 text-white">
              Why Choose Shootside
            </h2>
            <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
              We focus on delivering measurable business impact, reliable response times, and tailored technology services.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feat, i) => {
              const Icon = feat.icon;
              return (
                <div
                  key={i}
                  className="group relative rounded-xl border border-white/5 bg-[#090909] hover:bg-[#0c0c0c] p-6 transition-all duration-300 flex gap-5"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white mb-2">{feat.title}</h3>
                    <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">{feat.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. STATS SECTION (Light theme background) */}
      <section className="py-20 bg-white border-t border-slate-200/40">
        <div className="max-w-6xl mx-auto px-6">
          <div ref={statsRef} className="flex flex-col md:flex-row md:items-center justify-between gap-10 bg-slate-50 border border-slate-200/60 rounded-3xl p-10 md:p-14">
            <h3 className="text-4xl md:text-6xl font-black uppercase leading-none tracking-tight text-slate-900 max-w-xs">
              OUR NUMBERS
            </h3>
            <div className="flex flex-col sm:flex-row gap-10 md:gap-20">
              <div className="flex flex-col items-center md:items-start">
                <span className="text-4xl md:text-6xl font-black text-purple-600">
                  {works}+
                </span>
                <span className="text-slate-500 uppercase tracking-wider text-xs md:text-sm mt-2">
                  Projects Completed
                </span>
              </div>

              <div className="flex flex-col items-center md:items-start">
                <span className="text-4xl md:text-6xl font-black text-blue-600">
                  {clients}+
                </span>
                <span className="text-slate-500 uppercase tracking-wider text-xs md:text-sm mt-2">
                  Active Global Clients
                </span>
              </div>

              <div className="flex flex-col items-center md:items-start">
                <span className="text-4xl md:text-6xl font-black text-green-600">
                  5+
                </span>
                <span className="text-slate-500 uppercase tracking-wider text-xs md:text-sm mt-2">
                  Supported Countries
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. STICKY EMERGENCY DIAGNOSTIC SLIDER (Dark theme background) */}
      <section id="emergency" ref={emergencyRef} className="relative h-[300vh] w-full">
        <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden bg-[#030303]">
          
          {/* Diagnostic dynamic background glow */}
          <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] rounded-full blur-[140px] pointer-events-none transition-colors duration-1000 ${
            diagnosticSlides[activeSlide]?.glowColor || "bg-red-600/10"
          }`} />

          <div className="max-w-5xl mx-auto px-6 w-full relative z-10">
            <div className={`border rounded-3xl p-8 md:p-14 shadow-2xl transition-all duration-1000 bg-[#0c0c0c]/85 backdrop-blur-md ${
              diagnosticSlides[activeSlide]?.accentColor || "border-red-500/20"
            }`}>
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSlide}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.35 }}
                  className="grid md:grid-cols-12 gap-8 items-center"
                >
                  <div className="md:col-span-7">
                    <div className={`inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full border text-xs font-bold ${
                      diagnosticSlides[activeSlide]?.badgeColor
                    }`}>
                      <AlertTriangle className="w-3.5 h-3.5" /> {diagnosticSlides[activeSlide]?.badge}
                    </div>
                    
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
                      {diagnosticSlides[activeSlide]?.title}
                    </h2>
                    
                    <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-6">
                      {diagnosticSlides[activeSlide]?.description}
                    </p>
                    
                    <Link
                      href={diagnosticSlides[activeSlide]?.ctaLink || "/contact"}
                      className={`inline-flex items-center justify-center px-6 py-3.5 rounded-full text-white font-bold text-sm uppercase tracking-wider transition-all duration-300 active:scale-95 shadow-lg ${
                        activeSlide === 0 ? "bg-[#ff4a4a] hover:bg-[#ff3333] shadow-red-500/25" :
                        activeSlide === 1 ? "bg-orange-600 hover:bg-orange-500 shadow-orange-500/25" :
                        activeSlide === 2 ? "bg-blue-600 hover:bg-blue-500 shadow-blue-500/25" :
                        activeSlide === 3 ? "bg-purple-600 hover:bg-purple-500 shadow-purple-500/25" :
                        "bg-cyan-600 hover:bg-cyan-500 shadow-cyan-500/25"
                      }`}
                    >
                      {diagnosticSlides[activeSlide]?.ctaText}
                    </Link>
                  </div>

                  <div className="md:col-span-5 border-t md:border-t-0 md:border-l border-white/10 pt-6 md:pt-0 md:pl-8">
                    <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Key Diagnostics:</h3>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-3">
                      {diagnosticSlides[activeSlide]?.points.map((item, i) => (
                        <li key={i} className="flex items-center gap-2.5 text-gray-300 text-xs sm:text-sm">
                          <span className={`w-1.5 h-1.5 rounded-full ${
                            activeSlide === 0 ? "bg-red-500" :
                            activeSlide === 1 ? "bg-orange-500" :
                            activeSlide === 2 ? "bg-blue-500" :
                            activeSlide === 3 ? "bg-purple-500" :
                            "bg-cyan-500"
                          }`} />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Progress Indicator Dots */}
              <div className="flex gap-2.5 mt-8 justify-center md:justify-start border-t border-white/5 pt-6">
                {diagnosticSlides.map((_, idx) => (
                  <div
                    key={idx}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      idx === activeSlide ? "w-8 bg-purple-500" : "w-2.5 bg-white/10"
                    }`}
                  />
                ))}
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* 8. INDUSTRIES WE SERVE (Light theme background) */}
      <section className="py-24 bg-white border-t border-slate-200/40 relative">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-600">Target Verticals</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase mt-3 mb-6 text-slate-900">
              Industries We Serve
            </h2>
            <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
              We design specialized enterprise systems, security layers, and marketing platforms for businesses across key sectors.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-9 gap-4">
            {industries.map((ind, i) => {
              const Icon = ind.icon;
              return (
                <div
                  key={i}
                  className="group flex flex-col items-center justify-center p-5 rounded-xl border border-slate-200/60 bg-slate-50 hover:bg-slate-100 transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-600 group-hover:scale-110 transition-transform mb-3">
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-semibold text-slate-800 text-center tracking-wide group-hover:text-slate-950">
                    {ind.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 9. TESTIMONIALS (Dark theme background) */}
      <QuoteSection />

      {/* 10. CONTACT SECTION (Light theme background) */}
      <section id="contact" className="py-24 bg-slate-50 border-t border-slate-200/65 relative overflow-hidden">
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[350px] h-[350px] bg-purple-500/5 rounded-full blur-[130px] pointer-events-none" />
        
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12">
            
            <div className="lg:col-span-5 flex flex-col justify-center">
              <span className="text-xs font-bold uppercase tracking-wider text-purple-600 mb-3">Connect</span>
              <h2 className="text-3xl sm:text-5xl font-black uppercase mb-6 leading-tight text-slate-900">
                Let's Build <br /> Something Great Together
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-8">
                Ready to optimize your infrastructure, build a website, or create marketing videos? Message our Calicut / GCC consulting teams.
              </p>

              <div className="space-y-6">
                <a
                  href="mailto:connect.shootside@gmail.com"
                  className="flex items-center gap-4 p-4 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 transition-all max-w-sm"
                >
                  <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-600">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-500 uppercase tracking-widest">Email Us</p>
                    <p className="text-sm font-bold text-slate-800">connect.shootside@gmail.com</p>
                  </div>
                </a>

                <a
                  href="tel:+917306166866"
                  className="flex items-center gap-4 p-4 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 transition-all max-w-sm"
                >
                  <div className="w-10 h-10 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-600">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-500 uppercase tracking-widest">Call Us</p>
                    <p className="text-sm font-bold text-slate-800">+91 73061 66866</p>
                  </div>
                </a>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="rounded-2xl border border-slate-200 bg-white p-8 md:p-10 shadow-lg">
                <h3 className="text-xl font-bold mb-6 text-slate-900">Request Consultation</h3>
                
                {formSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-8 rounded-xl bg-purple-500/10 border border-purple-500/20 text-center"
                  >
                    <CheckCircle2 className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                    <h4 className="text-lg font-bold text-slate-900 mb-2">Message Sent Successfully!</h4>
                    <p className="text-slate-500 text-sm">We will review your inquiry and reach out within 24 hours.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="space-y-5 text-slate-900">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-2">Your Name</label>
                        <input
                          type="text"
                          name="name"
                          value={form.name}
                          onChange={handleInputChange}
                          required
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-purple-600 transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-2">Email Address</label>
                        <input
                          type="email"
                          name="email"
                          value={form.email}
                          onChange={handleInputChange}
                          required
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-purple-600 transition-colors"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-2">Phone Number</label>
                        <input
                          type="tel"
                          name="phone"
                          value={form.phone}
                          onChange={handleInputChange}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-purple-600 transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-2">Requested Service</label>
                        <select
                          name="service"
                          value={form.service}
                          onChange={handleInputChange}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-purple-600 transition-colors text-slate-700"
                        >
                          <option>Web Development</option>
                          <option>AI Video Generation</option>
                          <option>AI Automation & Chatbots</option>
                          <option>Microsoft 365 Solutions</option>
                          <option>Cloud Infrastructure</option>
                          <option>Growth Marketing</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-2">Your Message</label>
                      <textarea
                        name="message"
                        value={form.message}
                        onChange={handleInputChange}
                        required
                        rows={4}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-purple-600 transition-colors resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-sm uppercase tracking-wider hover:from-blue-500 hover:to-purple-500 transition-all duration-300 hover:scale-[1.01] active:scale-95 cursor-pointer"
                    >
                      Submit Inquiry <ArrowRight className="w-4 h-4" />
                    </button>
                  </form>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>

    </main>
  );
}
