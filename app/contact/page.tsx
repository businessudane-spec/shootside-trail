"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Globe, CheckCircle2, ArrowRight } from "lucide-react";

export default function ContactPage() {
  const [formSubmitted, setFormSubmitted] = useState(false);
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

  return (
    <main className="min-h-screen bg-[#030303] text-white pt-32 pb-24 relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-purple-400">Get in Touch</span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black uppercase mt-3 mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
            Contact Shootside
          </h1>
          <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
            Let's connect to power your business with custom digital products, video creation, and robust AI automation.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12">
          {/* Address & Remote Support Details */}
          <div className="lg:col-span-5 space-y-8">
            <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-8 md:p-10 backdrop-blur-md">
              <h2 className="text-2xl font-bold mb-6 text-white border-b border-white/5 pb-4">Our Locations</h2>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-gray-300 uppercase tracking-widest">India Office</h3>
                    <p className="text-sm text-white mt-1">Calicut Cyberpark (High Business Park)</p>
                    <p className="text-xs text-gray-400">Kerala, India</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-gray-300 uppercase tracking-widest">GCC Region</h3>
                    <p className="text-sm text-white mt-1">Business IT & Digital Support Hub</p>
                    <p className="text-xs text-gray-400">Serving clients across UAE, Saudi Arabia & Oman</p>
                  </div>
                </div>

                <div className="flex gap-4 border-t border-white/5 pt-6">
                  <div className="w-10 h-10 rounded-lg bg-green-500/10 border border-green-500/20 flex items-center justify-center text-green-400 shrink-0">
                    <Globe className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-gray-300 uppercase tracking-widest">Global Support</h3>
                    <p className="text-sm text-white mt-1">Remote Technical Support Account</p>
                    <p className="text-xs text-gray-500">We proudly serve and manage IT infrastructure for clients across 5+ countries globally.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-8 md:p-10 backdrop-blur-md space-y-6">
              <h2 className="text-xl font-bold text-white">Direct Contacts</h2>
              <div className="space-y-4">
                <a href="mailto:connect.shootside@gmail.com" className="flex items-center gap-4 text-gray-300 hover:text-white transition-colors">
                  <Mail className="w-4 h-4 text-purple-400" />
                  <span className="text-sm font-semibold">connect.shootside@gmail.com</span>
                </a>
                <a href="tel:+917306166866" className="flex items-center gap-4 text-gray-300 hover:text-white transition-colors">
                  <Phone className="w-4 h-4 text-purple-400" />
                  <span className="text-sm font-semibold">+91 73061 66866</span>
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-8 md:p-10 backdrop-blur-md">
              <h2 className="text-2xl font-bold mb-6 text-white">Send Us a Message</h2>
              
              {formSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-8 rounded-xl bg-purple-500/10 border border-purple-500/20 text-center"
                >
                  <CheckCircle2 className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-white mb-2">Thank you!</h3>
                  <p className="text-gray-400 text-sm">We have received your message and will get back to you shortly.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">Your Name</label>
                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-[#090909] border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-purple-500 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-[#090909] border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-purple-500 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">Phone Number</label>
                      <input
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleInputChange}
                        className="w-full bg-[#090909] border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-purple-500 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">Service of Interest</label>
                      <select
                        name="service"
                        value={form.service}
                        onChange={handleInputChange}
                        className="w-full bg-[#090909] border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-purple-500 transition-colors text-gray-300"
                      >
                        <option>Web Development</option>
                        <option>AI Video Generation</option>
                        <option>Cinematic Video Production</option>
                        <option>AI Automation & Chatbots</option>
                        <option>Digital Marketing & Advisory</option>
                        <option>Microsoft 365 / Cloud Support</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">Your Message</label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleInputChange}
                      required
                      rows={5}
                      className="w-full bg-[#090909] border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-purple-500 transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-sm uppercase tracking-wider hover:from-blue-500 hover:to-purple-500 transition-all duration-300 hover:scale-[1.01] active:scale-95 cursor-pointer"
                  >
                    Send Message <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
