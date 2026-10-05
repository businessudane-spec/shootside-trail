"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  ShieldCheck, 
  Lock, 
  Eye, 
  FileText, 
  UserCheck, 
  Database, 
  Server, 
  Globe, 
  Mail, 
  Phone, 
  MapPin, 
  ArrowLeft,
  ChevronRight,
  Sparkles,
  CheckCircle2,
  Clock
} from "lucide-react";

export default function PrivacyPolicyPage() {
  const [activeSection, setActiveSection] = useState<string>("intro");

  const lastUpdated = "October 5, 2026";

  const sections = [
    { id: "intro", title: "1. Introduction & Overview" },
    { id: "collection", title: "2. Information We Collect" },
    { id: "usage", title: "3. How We Use Your Data" },
    { id: "storage", title: "4. Data Security & Storage" },
    { id: "sharing", title: "5. Sharing & Disclosures" },
    { id: "cookies", title: "6. Cookies & Tracking" },
    { id: "rights", title: "7. Your Rights & Choices" },
    { id: "retention", title: "8. Data Retention" },
    { id: "updates", title: "9. Policy Updates" },
    { id: "contact", title: "10. Contact Information" },
  ];

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <main className="min-h-screen bg-[#030303] text-white pt-28 md:pt-36 pb-24 relative overflow-hidden">
      {/* Background glow highlights */}
      <div className="absolute top-20 left-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[450px] h-[450px] bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-20 left-1/3 w-[400px] h-[400px] bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Navigation Breadcrumb */}
        <div className="mb-8 flex items-center space-x-2 text-xs text-gray-400 font-medium">
          <Link href="/" className="hover:text-purple-400 transition-colors flex items-center space-x-1">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Home</span>
          </Link>
          <span>/</span>
          <span className="text-purple-400 font-semibold">Privacy Policy</span>
        </div>

        {/* Hero Header */}
        <div className="max-w-4xl mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-bold tracking-wide">
            <ShieldCheck className="w-4 h-4" />
            <span>DATA PRIVACY & PROTECTION POLICY</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight bg-gradient-to-r from-blue-400 via-purple-500 to-indigo-400 bg-clip-text text-transparent">
            Privacy Policy
          </h1>

          <p className="text-gray-300 text-sm sm:text-base leading-relaxed max-w-2xl">
            At ShootSide, we respect your privacy and are committed to safeguarding your personal data and proprietary project materials with enterprise-grade security standards.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-gray-400">
            <div className="flex items-center space-x-1.5 bg-white/[0.03] border border-white/10 px-3 py-1.5 rounded-lg">
              <Clock className="w-3.5 h-3.5 text-purple-400" />
              <span>Effective Date: <strong>{lastUpdated}</strong></span>
            </div>
            <div className="flex items-center space-x-1.5 bg-white/[0.03] border border-white/10 px-3 py-1.5 rounded-lg">
              <Lock className="w-3.5 h-3.5 text-emerald-400" />
              <span>GDPR & ISO Compliant Practices</span>
            </div>
          </div>
        </div>

        {/* Highlight Stats Banner */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
          <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-md flex items-start space-x-4">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">End-to-End Encryption</h3>
              <p className="text-xs text-gray-400 mt-1">Client files and communications are protected with industry-standard TLS & AES-256 encryption.</p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-md flex items-start space-x-4">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 shrink-0">
              <UserCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Zero Data Resale</h3>
              <p className="text-xs text-gray-400 mt-1">We never sell, rent, or trade your personal or project data to any advertising third parties.</p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-md flex items-start space-x-4 sm:col-span-2 lg:col-span-1">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Strict Access Control</h3>
              <p className="text-xs text-gray-400 mt-1">Only authorized team members working on your deliverables can access your project files.</p>
            </div>
          </div>
        </div>

        {/* Content Layout */}
        <div className="grid lg:grid-cols-12 gap-10">
          
          {/* Sticky Sidebar Navigation */}
          <aside className="lg:col-span-4">
            <div className="sticky top-28 rounded-2xl border border-white/5 bg-white/[0.02] p-6 backdrop-blur-md space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-widest text-purple-400">
                Policy Sections
              </h3>
              <nav className="space-y-1">
                {sections.map((sec) => (
                  <button
                    key={sec.id}
                    onClick={() => scrollToSection(sec.id)}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold transition-all flex items-center justify-between cursor-pointer ${
                      activeSection === sec.id
                        ? "bg-gradient-to-r from-blue-600/20 to-purple-600/20 text-white border border-purple-500/30 font-bold"
                        : "text-gray-400 hover:text-white hover:bg-white/[0.02]"
                    }`}
                  >
                    <span>{sec.title}</span>
                    <ChevronRight className={`w-3.5 h-3.5 transition-transform ${activeSection === sec.id ? "rotate-90 text-purple-400" : "text-gray-600"}`} />
                  </button>
                ))}
              </nav>

              <div className="pt-4 border-t border-white/5">
                <div className="p-4 rounded-xl bg-purple-500/5 border border-purple-500/15 space-y-2">
                  <h4 className="text-xs font-bold text-white flex items-center space-x-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                    <span>Have a privacy query?</span>
                  </h4>
                  <p className="text-[11px] text-gray-400">
                    Reach our dedicated Data Privacy Team directly for data export or removal requests.
                  </p>
                  <a
                    href="mailto:connect.shootside@gmail.com"
                    className="inline-block text-xs font-bold text-purple-400 hover:text-purple-300 underline pt-1"
                  >
                    connect.shootside@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Policy Body */}
          <div className="lg:col-span-8 space-y-12 text-gray-300 leading-relaxed text-sm">

            {/* Section 1 */}
            <section id="intro" className="rounded-2xl border border-white/5 bg-white/[0.02] p-8 backdrop-blur-md space-y-4">
              <h2 className="text-xl font-bold text-white border-b border-white/5 pb-3 flex items-center space-x-2">
                <span className="text-purple-400">1.</span>
                <span>Introduction & Overview</span>
              </h2>
              <p>
                ShootSide (referred to as <strong>"ShootSide"</strong>, <strong>"we"</strong>, <strong>"us"</strong>, or <strong>"our"</strong>) provides software development, mobile application engineering, digital media production, brand identity, AI automation, and cloud management services across India, the GCC region, and global markets.
              </p>
              <p>
                This Privacy Policy outlines our transparent policies regarding the collection, use, disclosure, storage, and protection of information when you visit our website (<strong>shootside.in</strong>), interact with our web applications, utilize our project management platform, or engage our creative and engineering services.
              </p>
              <p>
                By accessing our website or using our services, you acknowledge that you have read, understood, and agreed to the practices described in this Privacy Policy.
              </p>
            </section>

            {/* Section 2 */}
            <section id="collection" className="rounded-2xl border border-white/5 bg-white/[0.02] p-8 backdrop-blur-md space-y-4">
              <h2 className="text-xl font-bold text-white border-b border-white/5 pb-3 flex items-center space-x-2">
                <span className="text-purple-400">2.</span>
                <span>Information We Collect</span>
              </h2>
              <p>We collect information in the following categories to provide high-quality services and seamless collaboration:</p>
              
              <div className="space-y-4 pt-2">
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                  <h3 className="font-bold text-white text-xs uppercase tracking-wider text-purple-400">A. Personal Identification Data</h3>
                  <p className="text-xs text-gray-400 mt-1">
                    When you fill out our contact form, request a project quote, or subscribe to updates, we may collect your full name, email address, phone number, company name, location, and project requirements.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                  <h3 className="font-bold text-white text-xs uppercase tracking-wider text-blue-400">B. Client Deliverables & Project Assets</h3>
                  <p className="text-xs text-gray-400 mt-1">
                    For active client engagements, you may share design briefs, brand assets, code repositories, media footage, API keys, credentials, or proprietary business logic necessary to execute your project.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                  <h3 className="font-bold text-white text-xs uppercase tracking-wider text-emerald-400">C. Automated Technical & Usage Data</h3>
                  <p className="text-xs text-gray-400 mt-1">
                    When visiting our website, we automatically log information such as IP address, browser type, operating system, referral URLs, device identifiers, and website interaction metrics to optimize performance.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 3 */}
            <section id="usage" className="rounded-2xl border border-white/5 bg-white/[0.02] p-8 backdrop-blur-md space-y-4">
              <h2 className="text-xl font-bold text-white border-b border-white/5 pb-3 flex items-center space-x-2">
                <span className="text-purple-400">3.</span>
                <span>How We Use Your Data</span>
              </h2>
              <p>We process your data strictly for legitimate operational and business purposes, including:</p>
              <ul className="space-y-2 text-xs sm:text-sm">
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Service Delivery:</strong> Designing, developing, testing, deploying, and maintaining digital software, media assets, and marketing campaigns.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Communication & Project Tracking:</strong> Sending project milestone updates, bug resolution notifications, sprint reviews, invoices, and scheduling strategy calls.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Platform Improvements:</strong> Analyzing site traffic, optimizing rendering speeds, and enhancing user interface responsiveness.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Legal & Security Compliance:</strong> Preventing fraudulent activity, ensuring data integrity, and adhering to applicable corporate regulations.</span>
                </li>
              </ul>
            </section>

            {/* Section 4 */}
            <section id="storage" className="rounded-2xl border border-white/5 bg-white/[0.02] p-8 backdrop-blur-md space-y-4">
              <h2 className="text-xl font-bold text-white border-b border-white/5 pb-3 flex items-center space-x-2">
                <span className="text-purple-400">4.</span>
                <span>Data Security & Storage</span>
              </h2>
              <p>
                We implement industry-standard administrative, physical, and technical safeguards to prevent unauthorized access, accidental destruction, alteration, or disclosure of your data.
              </p>
              <div className="grid sm:grid-cols-2 gap-3 pt-2 text-xs">
                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5">
                  <h4 className="font-bold text-white">TLS / SSL Encryption</h4>
                  <p className="text-gray-400 mt-1">All in-transit data between your browser and our servers is secured via 256-bit encryption.</p>
                </div>
                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5">
                  <h4 className="font-bold text-white">Role-Based Permissions</h4>
                  <p className="text-gray-400 mt-1">Access to client credentials and files is strictly limited to team members assigned to that deliverable.</p>
                </div>
                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5">
                  <h4 className="font-bold text-white">Regular Security Audits</h4>
                  <p className="text-gray-400 mt-1">We conduct periodic code vulnerability assessments and dependency updates.</p>
                </div>
                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5">
                  <h4 className="font-bold text-white">Automated Backups</h4>
                  <p className="text-gray-400 mt-1">Continuous secure snapshots with disaster recovery protocols in place.</p>
                </div>
              </div>
            </section>

            {/* Section 5 */}
            <section id="sharing" className="rounded-2xl border border-white/5 bg-white/[0.02] p-8 backdrop-blur-md space-y-4">
              <h2 className="text-xl font-bold text-white border-b border-white/5 pb-3 flex items-center space-x-2">
                <span className="text-purple-400">5.</span>
                <span>Sharing & Third-Party Disclosures</span>
              </h2>
              <p>
                ShootSide <strong>never sells, rents, or commercializes</strong> your personal details or project information. We only share data under strict confidentiality obligations in the following circumstances:
              </p>
              <ul className="list-disc list-inside space-y-1.5 text-xs sm:text-sm text-gray-300">
                <li><strong>Verified Cloud & Infrastructure Providers:</strong> Highly reputable platforms (e.g., AWS, Vercel, Supabase, Cloudflare) that host our server infrastructure under strict security SLAs.</li>
                <li><strong>Payment Processors:</strong> PCI-DSS certified gateways to process transaction records securely.</li>
                <li><strong>Legal Requirements:</strong> If compelled by lawful court order, regulatory mandate, or government authority compliance.</li>
              </ul>
            </section>

            {/* Section 6 */}
            <section id="cookies" className="rounded-2xl border border-white/5 bg-white/[0.02] p-8 backdrop-blur-md space-y-4">
              <h2 className="text-xl font-bold text-white border-b border-white/5 pb-3 flex items-center space-x-2">
                <span className="text-purple-400">6.</span>
                <span>Cookies & Tracking Technologies</span>
              </h2>
              <p>
                We use cookies and similar browser storage mechanisms to enhance user experience, remember your preferences, and track aggregate analytics through Google Tag Manager & Google Analytics.
              </p>
              <p className="text-xs text-gray-400">
                You can manage or disable cookies via your individual browser settings. Please note that disabling essential cookies may impact certain interactive animations or project tracking dashboard features.
              </p>
            </section>

            {/* Section 7 */}
            <section id="rights" className="rounded-2xl border border-white/5 bg-white/[0.02] p-8 backdrop-blur-md space-y-4">
              <h2 className="text-xl font-bold text-white border-b border-white/5 pb-3 flex items-center space-x-2">
                <span className="text-purple-400">7.</span>
                <span>Your Rights & Choices</span>
              </h2>
              <p>Depending on your jurisdiction, you have the following rights regarding your personal information:</p>
              <div className="grid sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5">
                  <strong className="text-white block">Right to Access</strong>
                  <span className="text-gray-400">Request a copy of the personal data we hold about you.</span>
                </div>
                <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5">
                  <strong className="text-white block">Right to Rectification</strong>
                  <span className="text-gray-400">Request correction of inaccurate or incomplete records.</span>
                </div>
                <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5">
                  <strong className="text-white block">Right to Erasure</strong>
                  <span className="text-gray-400">Request permanent deletion of your records (subject to legal obligations).</span>
                </div>
                <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5">
                  <strong className="text-white block">Right to Opt-Out</strong>
                  <span className="text-gray-400">Unsubscribe from any marketing or non-essential communications anytime.</span>
                </div>
              </div>
            </section>

            {/* Section 8 */}
            <section id="retention" className="rounded-2xl border border-white/5 bg-white/[0.02] p-8 backdrop-blur-md space-y-4">
              <h2 className="text-xl font-bold text-white border-b border-white/5 pb-3 flex items-center space-x-2">
                <span className="text-purple-400">8.</span>
                <span>Data Retention Policy</span>
              </h2>
              <p>
                We retain personal data and project records only for as long as necessary to fulfill the purposes for which they were collected, including satisfying any legal, accounting, tax, or contractual warranty requirements.
              </p>
              <p className="text-xs text-gray-400">
                Upon project completion and warranty expiration, confidential development credentials and staging files are securely purged upon client request.
              </p>
            </section>

            {/* Section 9 */}
            <section id="updates" className="rounded-2xl border border-white/5 bg-white/[0.02] p-8 backdrop-blur-md space-y-4">
              <h2 className="text-xl font-bold text-white border-b border-white/5 pb-3 flex items-center space-x-2">
                <span className="text-purple-400">9.</span>
                <span>Updates to this Privacy Policy</span>
              </h2>
              <p>
                ShootSide reserves the right to update or modify this Privacy Policy at any time to reflect changing legal standards, technological enhancements, or service expansions. The updated version will be marked with a new "Effective Date" at the top of this page.
              </p>
            </section>

            {/* Section 10 */}
            <section id="contact" className="rounded-2xl border border-purple-500/20 bg-gradient-to-br from-purple-950/20 via-black to-blue-950/20 p-8 backdrop-blur-md space-y-6">
              <h2 className="text-xl font-bold text-white border-b border-white/10 pb-3 flex items-center space-x-2">
                <span className="text-purple-400">10.</span>
                <span>Contact Our Privacy Office</span>
              </h2>
              <p className="text-xs sm:text-sm">
                If you have questions, feedback, or wish to exercise your data rights, please contact our Data Protection Team:
              </p>

              <div className="grid sm:grid-cols-2 gap-4 text-xs">
                <div className="flex items-center space-x-3 p-3.5 rounded-xl bg-white/[0.03] border border-white/10">
                  <Mail className="w-4 h-4 text-purple-400 shrink-0" />
                  <div>
                    <span className="text-gray-400 block text-[10px] uppercase font-bold">Email Us</span>
                    <a href="mailto:connect.shootside@gmail.com" className="text-white hover:text-purple-400 font-semibold">
                      connect.shootside@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-3.5 rounded-xl bg-white/[0.03] border border-white/10">
                  <Phone className="w-4 h-4 text-blue-400 shrink-0" />
                  <div>
                    <span className="text-gray-400 block text-[10px] uppercase font-bold">Call / WhatsApp</span>
                    <a href="tel:+917306166866" className="text-white hover:text-blue-400 font-semibold">
                      +91 73061 66866
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-3.5 rounded-xl bg-white/[0.03] border border-white/10 sm:col-span-2">
                  <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
                  <div>
                    <span className="text-gray-400 block text-[10px] uppercase font-bold">Corporate Office</span>
                    <span className="text-white font-medium">Calicut Cyberpark, Kerala, India • Serving Clients Across GCC & Global Hubs</span>
                  </div>
                </div>
              </div>
            </section>

          </div>
        </div>

      </div>
    </main>
  );
}
