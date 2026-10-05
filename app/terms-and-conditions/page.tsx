"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  FileText, 
  Scale, 
  ShieldAlert, 
  CheckSquare, 
  CreditCard, 
  Clock, 
  Code2, 
  Sparkles, 
  HelpCircle, 
  AlertTriangle,
  ArrowLeft,
  ChevronRight,
  Mail,
  Phone,
  MapPin,
  CheckCircle2
} from "lucide-react";

export default function TermsAndConditionsPage() {
  const [activeSection, setActiveSection] = useState<string>("acceptance");

  const lastUpdated = "October 5, 2026";

  const sections = [
    { id: "acceptance", title: "1. Acceptance of Terms" },
    { id: "services", title: "2. Scope of Services" },
    { id: "proposals", title: "3. Project Estimates & SOW" },
    { id: "client-duties", title: "4. Client Obligations" },
    { id: "ip-rights", title: "5. Intellectual Property & Code" },
    { id: "payment", title: "6. Payment & Invoicing Terms" },
    { id: "revisions", title: "7. Revisions & Change Orders" },
    { id: "confidentiality", title: "8. Confidentiality & NDA" },
    { id: "warranties", title: "9. Warranties & Disclaimers" },
    { id: "liability", title: "10. Limitation of Liability" },
    { id: "termination", title: "11. Term & Termination" },
    { id: "governing-law", title: "12. Governing Law & Jurisdiction" },
    { id: "contact", title: "13. Contact & Support" },
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
      <div className="absolute top-20 left-1/4 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[450px] h-[450px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-20 left-1/3 w-[400px] h-[400px] bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Navigation Breadcrumb */}
        <div className="mb-8 flex items-center space-x-2 text-xs text-gray-400 font-medium">
          <Link href="/" className="hover:text-purple-400 transition-colors flex items-center space-x-1">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Home</span>
          </Link>
          <span>/</span>
          <span className="text-purple-400 font-semibold">Terms and Conditions</span>
        </div>

        {/* Hero Header */}
        <div className="max-w-4xl mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold tracking-wide">
            <Scale className="w-4 h-4" />
            <span>LEGAL CONTRACT & SERVICE TERMS</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight bg-gradient-to-r from-purple-400 via-blue-500 to-indigo-400 bg-clip-text text-transparent">
            Terms & Conditions
          </h1>

          <p className="text-gray-300 text-sm sm:text-base leading-relaxed max-w-2xl">
            These terms govern your use of ShootSide’s digital platforms, custom software engineering, media production, and IT consulting engagements.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-gray-400">
            <div className="flex items-center space-x-1.5 bg-white/[0.03] border border-white/10 px-3 py-1.5 rounded-lg">
              <Clock className="w-3.5 h-3.5 text-blue-400" />
              <span>Last Revised: <strong>{lastUpdated}</strong></span>
            </div>
            <div className="flex items-center space-x-1.5 bg-white/[0.03] border border-white/10 px-3 py-1.5 rounded-lg">
              <Code2 className="w-3.5 h-3.5 text-purple-400" />
              <span>Full IP Ownership upon Final Settlement</span>
            </div>
          </div>
        </div>

        {/* Highlight Summary Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
          <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-md flex items-start space-x-4">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 shrink-0">
              <CheckSquare className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Transparent Milestones</h3>
              <p className="text-xs text-gray-400 mt-1">Clear statement of work (SOW) with scheduled sprint deliverables and feedback phases.</p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-md flex items-start space-x-4">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Fair Invoicing</h3>
              <p className="text-xs text-gray-400 mt-1">Structured milestone payments with zero hidden fees and clear breakdown of scope.</p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-md flex items-start space-x-4 sm:col-span-2 lg:col-span-1">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 shrink-0">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Strict Confidentiality</h3>
              <p className="text-xs text-gray-400 mt-1">Every project is bound by mutual NDA terms safeguarding your business trade secrets.</p>
            </div>
          </div>
        </div>

        {/* Main Content Layout */}
        <div className="grid lg:grid-cols-12 gap-10">
          
          {/* Sticky Sidebar */}
          <aside className="lg:col-span-4">
            <div className="sticky top-28 rounded-2xl border border-white/5 bg-white/[0.02] p-6 backdrop-blur-md space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-widest text-blue-400">
                Terms Index
              </h3>
              <nav className="space-y-1">
                {sections.map((sec) => (
                  <button
                    key={sec.id}
                    onClick={() => scrollToSection(sec.id)}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold transition-all flex items-center justify-between cursor-pointer ${
                      activeSection === sec.id
                        ? "bg-gradient-to-r from-purple-600/20 to-blue-600/20 text-white border border-blue-500/30 font-bold"
                        : "text-gray-400 hover:text-white hover:bg-white/[0.02]"
                    }`}
                  >
                    <span>{sec.title}</span>
                    <ChevronRight className={`w-3.5 h-3.5 transition-transform ${activeSection === sec.id ? "rotate-90 text-blue-400" : "text-gray-600"}`} />
                  </button>
                ))}
              </nav>

              <div className="pt-4 border-t border-white/5">
                <div className="p-4 rounded-xl bg-blue-500/5 border border-blue-500/15 space-y-2">
                  <h4 className="text-xs font-bold text-white flex items-center space-x-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                    <span>Need Custom Master Agreement?</span>
                  </h4>
                  <p className="text-[11px] text-gray-400">
                    For enterprise accounts or bespoke SLAs, we provide tailored Master Service Agreements (MSA).
                  </p>
                  <a
                    href="mailto:connect.shootside@gmail.com"
                    className="inline-block text-xs font-bold text-blue-400 hover:text-blue-300 underline pt-1"
                  >
                    Request Enterprise SOW
                  </a>
                </div>
              </div>
            </div>
          </aside>

          {/* Terms Content Body */}
          <div className="lg:col-span-8 space-y-12 text-gray-300 leading-relaxed text-sm">

            {/* Section 1 */}
            <section id="acceptance" className="rounded-2xl border border-white/5 bg-white/[0.02] p-8 backdrop-blur-md space-y-4">
              <h2 className="text-xl font-bold text-white border-b border-white/5 pb-3 flex items-center space-x-2">
                <span className="text-blue-400">1.</span>
                <span>Acceptance of Terms</span>
              </h2>
              <p>
                By accessing our website (<strong>shootside.in</strong>), subscribing to our SaaS or Project Management tools, or executing a Statement of Work (SOW) with <strong>ShootSide</strong> ("we", "us", or "our"), you ("Client", "User", or "you") agree to be legally bound by these Terms and Conditions.
              </p>
              <p>
                If you are entering into these terms on behalf of a company, organization, or other legal entity, you represent that you possess full authority to bind that entity to these conditions.
              </p>
            </section>

            {/* Section 2 */}
            <section id="services" className="rounded-2xl border border-white/5 bg-white/[0.02] p-8 backdrop-blur-md space-y-4">
              <h2 className="text-xl font-bold text-white border-b border-white/5 pb-3 flex items-center space-x-2">
                <span className="text-blue-400">2.</span>
                <span>Scope of Services</span>
              </h2>
              <p>ShootSide delivers high-performance digital solutions across key verticals, including:</p>
              <ul className="space-y-2 text-xs sm:text-sm">
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                  <span><strong>Full-Stack Web & Mobile App Development:</strong> Next.js, React, Node.js, React Native, Flutter, Swift, and modern microservice architectures.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                  <span><strong>Digital Media Production:</strong> High-end 4K commercial cinematography, video editing, motion graphics, 3D animations, and sound engineering.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                  <span><strong>AI Solutions & Automations:</strong> Agentic workflows, custom LLM integrations, chatbot pipelines, and business intelligence dashboards.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                  <span><strong>Project Management Solutions:</strong> Real-time project collaboration, audit tracking, task merging, and milestone synchronization.</span>
                </li>
              </ul>
            </section>

            {/* Section 3 */}
            <section id="proposals" className="rounded-2xl border border-white/5 bg-white/[0.02] p-8 backdrop-blur-md space-y-4">
              <h2 className="text-xl font-bold text-white border-b border-white/5 pb-3 flex items-center space-x-2">
                <span className="text-blue-400">3.</span>
                <span>Project Estimates & Statement of Work (SOW)</span>
              </h2>
              <p>
                All engineering and creative projects are formally defined via a written Statement of Work (SOW), Project Proposal, or Service Agreement detailing project scope, technical specifications, timelines, milestone deliverables, and budget.
              </p>
              <p className="text-xs text-gray-400">
                Any features, designs, or technical requirements not explicitly written in the agreed SOW will be treated as an out-of-scope change request subject to additional time and cost estimates.
              </p>
            </section>

            {/* Section 4 */}
            <section id="client-duties" className="rounded-2xl border border-white/5 bg-white/[0.02] p-8 backdrop-blur-md space-y-4">
              <h2 className="text-xl font-bold text-white border-b border-white/5 pb-3 flex items-center space-x-2">
                <span className="text-blue-400">4.</span>
                <span>Client Obligations</span>
              </h2>
              <p>To ensure timely project execution, the Client agrees to:</p>
              <ul className="list-disc list-inside space-y-1.5 text-xs sm:text-sm text-gray-300">
                <li>Provide brand assets, copywriting, API keys, hosting credentials, and access permissions in a timely manner.</li>
                <li>Designate a primary point of contact for sprint sign-offs and feedback reviews.</li>
                <li>Ensure all content and media provided to ShootSide does not violate third-party copyrights, trademarks, or local laws.</li>
              </ul>
            </section>

            {/* Section 5 */}
            <section id="ip-rights" className="rounded-2xl border border-white/5 bg-white/[0.02] p-8 backdrop-blur-md space-y-4">
              <h2 className="text-xl font-bold text-white border-b border-white/5 pb-3 flex items-center space-x-2">
                <span className="text-blue-400">5.</span>
                <span>Intellectual Property & Ownership</span>
              </h2>
              <div className="space-y-3 text-xs sm:text-sm">
                <p>
                  <strong>Deliverable Ownership:</strong> Upon full and final settlement of all invoices for the designated project, all customized source code, database structures, UI/UX designs, and final media deliverables created specifically for the Client transfer entirely to the Client.
                </p>
                <p>
                  <strong>ShootSide Pre-existing Assets:</strong> ShootSide retains ownership of pre-existing software libraries, proprietary utility functions, reusable boilerplate templates, and developer toolkits. Client is granted an irrevocable, perpetual, royalty-free license to use such integrated components within the deliverable.
                </p>
                <p>
                  <strong>Portfolio Rights:</strong> Unless prohibited by a separate signed NDA, ShootSide reserves the customary right to showcase non-confidential project screenshots, demo reels, and case studies in its public portfolio.
                </p>
              </div>
            </section>

            {/* Section 6 */}
            <section id="payment" className="rounded-2xl border border-white/5 bg-white/[0.02] p-8 backdrop-blur-md space-y-4">
              <h2 className="text-xl font-bold text-white border-b border-white/5 pb-3 flex items-center space-x-2">
                <span className="text-blue-400">6.</span>
                <span>Payment & Invoicing Terms</span>
              </h2>
              <p>
                Payments are typically structured around project milestones (e.g., Initial Deposit, Sprint Approvals, Final Launch). Invoices are payable within the net terms specified on the invoice (standard Net 7 to Net 15).
              </p>
              <p className="text-xs text-gray-400">
                ShootSide reserves the right to pause active development or withhold production deployment if agreed milestone payments remain overdue beyond the grace period.
              </p>
            </section>

            {/* Section 7 */}
            <section id="revisions" className="rounded-2xl border border-white/5 bg-white/[0.02] p-8 backdrop-blur-md space-y-4">
              <h2 className="text-xl font-bold text-white border-b border-white/5 pb-3 flex items-center space-x-2">
                <span className="text-blue-400">7.</span>
                <span>Revisions & Change Orders</span>
              </h2>
              <p>
                Each project phase includes standard revision rounds (typically 2-3 iterations per milestone) to refine design compositions and user interactions within the approved scope.
              </p>
              <p className="text-xs text-gray-400">
                Major architectural pivots, new feature additions, or redesigns requested after milestone sign-off will be quoted as separate Change Orders.
              </p>
            </section>

            {/* Section 8 */}
            <section id="confidentiality" className="rounded-2xl border border-white/5 bg-white/[0.02] p-8 backdrop-blur-md space-y-4">
              <h2 className="text-xl font-bold text-white border-b border-white/5 pb-3 flex items-center space-x-2">
                <span className="text-blue-400">8.</span>
                <span>Confidentiality & Non-Disclosure</span>
              </h2>
              <p>
                Both parties agree to treat all non-public technical data, business strategies, customer lists, and financial figures as strictly confidential. Neither party will disclose such information to third parties without prior written consent.
              </p>
            </section>

            {/* Section 9 */}
            <section id="warranties" className="rounded-2xl border border-white/5 bg-white/[0.02] p-8 backdrop-blur-md space-y-4">
              <h2 className="text-xl font-bold text-white border-b border-white/5 pb-3 flex items-center space-x-2">
                <span className="text-blue-400">9.</span>
                <span>Warranties & Post-Launch Support</span>
              </h2>
              <p>
                ShootSide provides a complimentary <strong>30-day bug-fix warranty</strong> following final deployment to resolve any defects or code discrepancies not adhering to the original specifications.
              </p>
              <p className="text-xs text-gray-400">
                Warranty does not cover issues arising from third-party hosting failures, client modifications to source code, or subsequent updates to third-party APIs beyond ShootSide’s control. Ongoing maintenance packages (SLA) are available separately.
              </p>
            </section>

            {/* Section 10 */}
            <section id="liability" className="rounded-2xl border border-white/5 bg-white/[0.02] p-8 backdrop-blur-md space-y-4">
              <h2 className="text-xl font-bold text-white border-b border-white/5 pb-3 flex items-center space-x-2">
                <span className="text-blue-400">10.</span>
                <span>Limitation of Liability</span>
              </h2>
              <p className="text-xs sm:text-sm">
                To the maximum extent permitted by applicable law, ShootSide shall not be liable for any indirect, incidental, special, consequential, or punitive damages (including loss of profits, data, or business interruption). In no event shall ShootSide's aggregate liability exceed the total fees paid by the Client under the applicable SOW during the preceding 6 months.
              </p>
            </section>

            {/* Section 11 */}
            <section id="termination" className="rounded-2xl border border-white/5 bg-white/[0.02] p-8 backdrop-blur-md space-y-4">
              <h2 className="text-xl font-bold text-white border-b border-white/5 pb-3 flex items-center space-x-2">
                <span className="text-blue-400">11.</span>
                <span>Term & Termination</span>
              </h2>
              <p>
                Either party may terminate an active engagement for material breach if the breaching party fails to remedy such breach within 15 days of written notice. Upon termination, Client will pay ShootSide for all work completed up to the effective termination date.
              </p>
            </section>

            {/* Section 12 */}
            <section id="governing-law" className="rounded-2xl border border-white/5 bg-white/[0.02] p-8 backdrop-blur-md space-y-4">
              <h2 className="text-xl font-bold text-white border-b border-white/5 pb-3 flex items-center space-x-2">
                <span className="text-blue-400">12.</span>
                <span>Governing Law & Dispute Resolution</span>
              </h2>
              <p>
                These Terms shall be governed by and construed in accordance with the laws of India (State of Kerala) for Indian operations, or applicable UAE commercial arbitration frameworks for GCC contracts. Any disputes arising shall be subject to amicable mutual negotiation, failing which the courts of Calicut, Kerala shall have exclusive jurisdiction.
              </p>
            </section>

            {/* Section 13 */}
            <section id="contact" className="rounded-2xl border border-blue-500/20 bg-gradient-to-br from-blue-950/20 via-black to-purple-950/20 p-8 backdrop-blur-md space-y-6">
              <h2 className="text-xl font-bold text-white border-b border-white/10 pb-3 flex items-center space-x-2">
                <span className="text-blue-400">13.</span>
                <span>Legal & Contract Inquiries</span>
              </h2>
              <p className="text-xs sm:text-sm">
                For contract amendments, NDAs, or questions regarding these terms, please contact:
              </p>

              <div className="grid sm:grid-cols-2 gap-4 text-xs">
                <div className="flex items-center space-x-3 p-3.5 rounded-xl bg-white/[0.03] border border-white/10">
                  <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                  <div>
                    <span className="text-gray-400 block text-[10px] uppercase font-bold">Legal Email</span>
                    <a href="mailto:connect.shootside@gmail.com" className="text-white hover:text-blue-400 font-semibold">
                      connect.shootside@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-3.5 rounded-xl bg-white/[0.03] border border-white/10">
                  <Phone className="w-4 h-4 text-purple-400 shrink-0" />
                  <div>
                    <span className="text-gray-400 block text-[10px] uppercase font-bold">Direct Line</span>
                    <a href="tel:+917306166866" className="text-white hover:text-purple-400 font-semibold">
                      +91 73061 66866
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-3.5 rounded-xl bg-white/[0.03] border border-white/10 sm:col-span-2">
                  <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
                  <div>
                    <span className="text-gray-400 block text-[10px] uppercase font-bold">Headquarters</span>
                    <span className="text-white font-medium">Calicut Cyberpark, Kerala, India • Serving Clients Across India, UAE & GCC</span>
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
