  "use client";
  import { LayoutTextFlip } from "@/components/ui/layout-text-flip";
  import { AuroraBackground } from "@/components/ui/aurora-background";
  import { HoverEffect } from "@/components/ui/card-hover-effect";
  import { motion } from "motion/react";
  // import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
  import Image from "next/image";
  import { FaWhatsapp, FaBars, FaTimes } from "react-icons/fa";
  import { useState, useEffect } from "react";
  import { supabase } from "@/lib/supabaseClient";

  export default function Home() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
      const handleScroll = () => {
        setScrolled(window.scrollY > 30);
      };
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const projects = [
  {
    title: "Branding Services",
    description:
      "Logo & Brand Identity, Print Design (Brochures, etc.), Social Media Kits, Stationery & Merchandise, Google Business Optimization",
    link: "#contact",
  },
  {
    title: "Mobile App Development",
    description:
      "iOS & Android App Development, UI/UX Design, App Store Deployment, Maintenance & Updates",
    link: "#m",
  },
  {
    title: "Marketing Services",
    description:
      "Social Media Marketing, Search Engine Optimization (SEO), Paid Ads (Google, Facebook, Instagram), Campaign Strategy & Analytics",
    link: "#contat",
  },
  {
    title: "Web Development",
    description:
      "Custom Websites, E-Commerce Solutions, CMS (WordPress, Shopify), Web App Development, Performance Optimization",
    link: "#web",
  },
  {
    title: "Content Creation",
    description:
      "Photography & Videography, social media content creation, event coverage, Creative Campaign Content",
    link: "#content",
  },
  {
    title: "IT Consulting & Support",
    description:
      "Technology Strategy, Cloud Solutions, Cybersecurity, Software Integration, Ongoing Technical Support",
    link: "#it",
  },
];


    
const [formData, setFormData] = useState({
  name: "",
  email: "",
  message: "",
});

const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  setFormData({ ...formData, [e.target.name]: e.target.value });
};

   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  // Insert into Supabase
  const { data, error } = await supabase
    .from("contacts") // your table name
    .insert([
      {
        name: formData.name,
        email: formData.email,
        message: formData.message,
      },
    ])
    .select(); // optional: returns the inserted row

  if (error) {
    console.error("Supabase insert error:", error);
    alert("Something went wrong. Please try again later.");
    return;
  }

  console.log("Form submitted:", data);
  alert("Thank you! Your message has been sent.");

  // Clear the form
  setFormData({ name: "", email: "", message: "" });
};


    return (
      <main className="relative min-h-screen bg-black text-white overflow-x-hidden">
        {/* Floating Glass Header */}
        <header
          className={`fixed top-4 left-1/2 -translate-x-1/2 w-[90%] max-w-5xl z-50 rounded-2xl px-6 py-3 flex items-center justify-between backdrop-blur-md border border-white/10 shadow-lg transition-all duration-300 ${
            scrolled ? "bg-white/10" : "bg-white/5"
          }`}
        >
          <h1 className="text-2xl font-bold tracking-wide">SHOOTSIDE</h1>

          {/* Desktop nav */}
          <nav className="hidden md:flex gap-8 text-sm font-medium">
            <a href="#features" className="hover:text-purple-400 transition">
              Features
            </a>
            <a href="#about" className="hover:text-purple-400 transition">
              About
            </a>
            <a href="#contact" className="hover:text-purple-400 transition">
              Contact
            </a>
          </nav>

          {/* Contact Us button for desktop */}
          <a
            href="tel:+917306166866"
            className="hidden md:inline-block px-4 py-2 rounded-lg hover:bg-purple-600 transition text-sm font-semibold text-white"
          >
            Contact Us
          </a>

          {/* Hamburger button for mobile */}
          <button
            className="md:hidden text-white text-xl"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>

          {/* Mobile menu */}
          {menuOpen && (
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[90%] bg-black/90 rounded-xl shadow-lg flex flex-col items-center py-4 gap-4 md:hidden">
              <a href="#features" className="hover:text-purple-400 transition" onClick={() => setMenuOpen(false)}>
                Features
              </a>
              <a href="#about" className="hover:text-purple-400 transition" onClick={() => setMenuOpen(false)}>
                About
              </a>
              <a href="#contact" className="hover:text-purple-400 transition" onClick={() => setMenuOpen(false)}>
                Contact
              </a>
              <a
                href="#contact"
                className="px-4 py-2 rounded-lg bg-purple-500 hover:bg-purple-600 transition text-white font-semibold w-full text-center"
                onClick={() => setMenuOpen(false)}
              >
                Contact Us
              </a>
            </div>
          )}
        </header>
        
  <section id="hero" className="relative">
    <AuroraBackground className="h-[650px] md:h-[800px]">
      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="absolute left-8 md:left-16 top-1/2 transform -translate-y-1/2 flex flex-col gap-6 max-w-md md:max-w-lg"
      >
        {/* Main Heading */}
        <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-extrabold tracking-tight text-white leading-tight">
          SHOOTSIDE
        </h1>

        {/* Subheading / Rotating Words */}
        <div className="mt-4">
          <LayoutTextFlip
            text="We are a"
            words={["Media Agency", "Video Production", "Web Development", "Branding"]}
          />
        </div>

        {/* CTA Button */}
        <div className="mt-6">
          <a
            href="tel:+917306166866"
            className="inline-block px-4 py-3 text-white font-bold text-lg rounded-xl border border-purple-500 
                      hover:bg-purple-500 hover:text-black transition-all duration-300 ease-in-out"
          >
            Contact Us
          </a>
        </div>
      </motion.div>

      {/* Decorative Background Shapes */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-16 -left-16 w-72 h-72 bg-purple-600 rounded-full opacity-30 blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-16 -right-16 w-96 h-96 bg-purple-500 rounded-full opacity-20 blur-3xl animate-pulse"></div>
      </div>
    </AuroraBackground>
  </section>

        {/* next */}
        
        {/* Trusted by Clients Section */}
        <section id="trusted" className="py-16 bg-black text-white overflow-hidden relative">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <h2 className="text-2xl md:text-4xl font-bold mb-8">
              Trusted by Clients Worldwide
            </h2>

            {/* Stronger Gradient Overlays (shades on each side) */}
            <div className="absolute left-0 top-0 h-full w-12 bg-gradient-to-r from-black via-black/30 to-transparent pointer-events-none z-10"></div>
            <div className="absolute right-0 top-0 h-full w-12 bg-gradient-to-l from-black via-black/30 to-transparent pointer-events-none z-10"></div>

            {/* Infinite Scroll Carousel */}
        <div className="relative w-full overflow-hidden">
    <motion.div
      className="flex gap-12 min-w-max items-center"
      animate={{ x: ["0%", "-50%"] }}
      transition={{
        repeat: Infinity,
        duration: 40,
        ease: "linear",
      }}
    >
      {[...Array(2)].flatMap((_, loopIdx) =>
        [
          "/toni&guy.png",
          "/naturals.png",
          "/wattlecorp.png",
          "/vfs.png",
          "/original.jpg",
          "/myg.png",
          "/slash.png",
          "/frank.png",
          "/evana.png",
          "/la.png",
        ].map((src, idx) => (
          <div
            key={`${loopIdx}-${src}-${idx}`}
            className="h-20 w-32 flex items-center justify-center" // ✅ uniform box
          >
            <Image
    src={src}
    alt={`Client ${idx + 1}`}
    width={128}
    height={80}
    className="h-full w-full object-contain opacity-80 hover:opacity-100 grayscale hover:grayscale-0 transition"
  />
          </div>
        ))
      )}
    </motion.div>
  </div>

          </div>
        </section>

  {/*  */}

  {/* WHO WE ARE SECTION */}
 
 <div className="relative py-20 bg-black text-white overflow-hidden">
  {/* Background - behind everything */}
  {/* <BackgroundBeamsWithCollision className="absolute inset-0 w-full h-full -z-10" /> */}

  {/* Content */}
  <div className="relative max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

    {/* Left Side */}
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="flex justify-center md:justify-start w-full"
    >
      <div className="text-center md:text-left space-y-4">
        <h2 className="text-purple-500 font-semibold text-lg sm:text-xl tracking-wide">
          Who We Are
        </h2>
        <h1 className="text-white font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight break-words">
          Crafting Experiences <br /> That Inspire
        </h1>
      </div>
    </motion.div>

    {/* Right Side */}
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      viewport={{ once: true }}
      className="w-full text-center md:text-left mt-10 md:mt-0 space-y-6"
    >
      <p className="text-gray-300 text-base sm:text-lg leading-relaxed max-w-full md:max-w-lg">
        We are <span className="text-purple-500 font-semibold">ShootSide</span>, a creative collective dedicated to transforming ideas into memorable visual experiences. Our passion lies in combining strategy, storytelling, and design to help brands connect meaningfully with their audiences.
      </p>

      <p className="text-gray-300 text-base sm:text-lg leading-relaxed max-w-full md:max-w-lg">
        From concept to execution, we focus on innovation, creativity, and purpose in every project. We believe in crafting content that doesn’t just look good—but makes an impact.
      </p>
    </motion.div>

  </div>
</div>
<section id="services" className="py-20 bg-gray-200 text-gray-900">
  <div className="max-w-7xl mx-auto px-6 sm:px-12">
    {/* Title */}
    <div className="text-center mb-12">
      <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-purple-700">
        Our Services
      </h1>
      <p className="mt-4 text-2xl  md:text-sm text-gray-600 max-w-2xl mx-auto">
        We provide a wide range of services designed to bring value, innovation, and growth to your business.
      </p>
    </div>

    {/* Cards */}
    <div className="max-w-6xl mx-auto">
      <HoverEffect items={projects} />
    </div>

    {/* Footer note */}
    <p className="mt-10 text-center text-base md:text-lg text-gray-500">
      Click on a card to learn more about each service.
    </p>
  </div>
</section>





{/* TESTIMONIALS SECTION */}
<section className="bg-purple-900 text-white rounded 3xl  py-16 mt-3">
  <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    <h2 className="text-3xl md:text-4xl font-bold mb-12">What Our Clients Say</h2>

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
      {/* Testimonial Card */}
      <div className="bg-white/10 border border-white/20 rounded-2xl p-6 flex flex-col items-center text-center">
        <p className="text-sm text-white/80 mb-4">
          “ShootSide brought our vision to life in ways we never imagined.
          Their creativity and professionalism are unmatched.”
        </p>
        <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-lg font-bold mb-2">
          A
        </div>
        <h4 className="text-sm font-semibold">Arjun R</h4>
        <span className="text-xs text-white/60">Startup Founder</span>
      </div>

      <div className="bg-white/10 border border-white/20 rounded-2xl p-6 flex flex-col items-center text-center">
        <p className="text-sm text-white/80 mb-4">
          “Their team is highly skilled, communicative, and easy to work with.
          We loved every step of the journey.”
        </p>
        <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-lg font-bold mb-2">
          S
        </div>
        <h4 className="text-sm font-semibold">Sneha M</h4>
        <span className="text-xs text-white/60">Creative Director</span>
      </div>

      <div className="bg-white/10 border border-white/20 rounded-2xl p-6 flex flex-col items-center text-center">
        <p className="text-sm text-white/80 mb-4">
          “They don’t just deliver content, they craft experiences. Truly the
          best partner for our brand storytelling.”
        </p>
        <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-lg font-bold mb-2">
          R
        </div>
        <h4 className="text-sm font-semibold">Rahul P</h4>
        <span className="text-xs text-white/60">Marketing Head</span>
      </div>
    </div>
  </div>
</section>

  
  <section className="relative bg-black py-24 px-6">
    {/* Heading */}
    <div className="max-w-5xl mx-auto text-center mb-16">
      <h2 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-700 mb-4 animate-gradient-x">
        Let's Collaborate
      </h2>
  <p className="text-white/70 text-base md:text-base max-w-2xl mx-auto">
    Got a project or idea? We'd love to hear from you. Fill out the form below and let's create something amazing together!
  </p>

    </div>

    {/* Form */}
    <form
      onSubmit={handleSubmit}
      className="max-w-3xl mx-auto bg-purple-900/30 backdrop-blur-md border border-purple-700/40 rounded-3xl p-10 shadow-2xl hover:shadow-purple-700/50 transition-shadow duration-500"
    >
      <div className="grid gap-6 md:grid-cols-2">
        {/* Floating Label Input */}
        <div className="relative">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="peer p-5 rounded-xl bg-purple-800/50 text-white placeholder-transparent border border-purple-600/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 w-full transition"
          />
          <label className="absolute left-5 top-5 text-purple-200/70 text-sm md:text-base transition-all duration-300 peer-placeholder-shown:top-5 peer-placeholder-shown:text-purple-400/50 peer-placeholder-shown:text-base peer-focus:-top-2 peer-focus:text-purple-300 peer-focus:text-sm">
            Your Name
          </label>
        </div>

        <div className="relative">
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="peer p-5 rounded-xl bg-purple-800/50 text-white placeholder-transparent border border-purple-600/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 w-full transition"
          />
          <label className="absolute left-5 top-5 text-purple-200/70 text-sm md:text-base transition-all duration-300 peer-placeholder-shown:top-5 peer-placeholder-shown:text-purple-400/50 peer-placeholder-shown:text-base peer-focus:-top-2 peer-focus:text-purple-300 peer-focus:text-sm">
            Your Email
          </label>
        </div>
      </div>

      {/* Textarea with Floating Label */}
      <div className="relative mt-6">
        <textarea
          name="message"
          placeholder="Your Message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={6}
          className="peer w-full p-5 rounded-2xl bg-purple-800/50 text-white placeholder-transparent border border-purple-600/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition"
        />
        <label className="absolute left-5 top-5 text-purple-200/70 text-sm md:text-base transition-all duration-300 peer-placeholder-shown:top-5 peer-placeholder-shown:text-purple-400/50 peer-placeholder-shown:text-base peer-focus:-top-2 peer-focus:text-purple-300 peer-focus:text-sm">
          Your Message
        </label>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="mt-8 w-full bg-gradient-to-r from-purple-500 to-purple-700 text-white font-semibold py-4 rounded-xl hover:scale-105 transform transition-all duration-300 shadow-lg hover:shadow-purple-600/50"
      >
        Send Message
      </button>
    </form>

    {/* Subtle Purple Background Glows */}
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute bottom-0 right-1/3 w-[600px] h-[600px] bg-purple-500/20 rounded-full filter blur-2xl animate-pulse-slow"></div>
    </div>
  </section>



        {/* Footer */}

    <footer className="bg-purple-800 text-white rounded-3xl py-12 mt-16">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-8">
          {/* Left Section */}
          <div>
            <h2 className="text-3xl font-bold mb-4">Drop us a line</h2>
            <form className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Your email"
                className="px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white placeholder-white/60 text-sm focus:outline-none focus:ring-1 focus:ring-white/40 w-full sm:w-auto flex-1"
              />
              <button
                type="submit"
                className="px-6 py-2 rounded-full bg-white/20 hover:bg-white/30 transition text-sm font-medium"
              >
                Contact
              </button>
            </form>
          </div>

          {/* Right Section */}
          <div className="flex flex-col text-right justify-between">
            <p className="text-sm text-white/80 mb-4">
              Book a meeting or leave a request. We’re ready to 
              embark on this journey with you. Are you?
            </p>
            <div className="flex flex-wrap gap-4 text-xs justify-end">
              <a href="#" className="hover:text-purple-200">[ INSTAGRAM ]</a>
              <a href="#" className="hover:text-purple-200">[ FACEBOOK ]</a>
              <a href="#" className="hover:text-purple-200">[ LINKEDIN ]</a>
              <a href="#" className="hover:text-purple-200">[ BEHANCE ]</a>
            </div>
          </div>
        </div>

        {/* Bottom Brand Section */}
      <div className="mt-16 text-center">
    <h1 className="text-[12rem] md:text-[16rem] font-extrabold text-white opacity-30 leading-none">
      SHOOTSIDE
    </h1>
  </div>


        {/* Footer Bottom */}
        <div className="mt-8 border-t border-white/20 flex flex-col sm:flex-row justify-between items-center px-6 text-xs text-white/70">
          <p>© 2024. All rights reserved</p>
          <div className="flex gap-6 mt-2 sm:mt-0">
            <a href="#" className="hover:text-purple-200">Terms of Service</a>
            <a href="#" className="hover:text-purple-200">Privacy Policy</a>
          </div>
        </div>
      </footer>

          

  {/* Floating WhatsApp Button */}
  <a
    href="https://wa.me/917306166866" // Replace with your WhatsApp number including country code
    target="_blank"
    rel="noopener noreferrer"
    className="fixed bottom-6 right-6 w-16 h-16 bg-purple-500 hover:bg-green-600 rounded-full flex items-center justify-center shadow-lg z-50 transition transform hover:scale-110"
  >
    <FaWhatsapp className="w-8 h-8 text-white" />
  </a>



    </main>


    );
  }

