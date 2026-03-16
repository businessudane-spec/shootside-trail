"use client";

export default function MentoringSection() {

  const sections = [
  {
    title: "AI VIDEO PRODUCTION",
    text: "We create cinematic AI-powered videos that combine storytelling, visual effects and modern generative tools.",
    bg: "bg-black",
    textColor: "text-white"
  },
  {
    title: "CONTENT CREATION",
    text: "From social media reels to branded campaigns, we craft content that captures attention and drives engagement.",
    bg: "bg-white",
    textColor: "text-black"
  },
  {
    title: "WEB & APP DEVELOPMENT",
    text: "We design and develop modern websites and applications built for performance, scalability and great user experience.",
    bg: "bg-black",
    textColor: "text-white"
  },
  {
    title: "AI AUTOMATION",
    text: "Automate workflows, content pipelines and marketing processes using powerful AI-driven systems.",
    bg: "bg-[#ad46ff]",
    textColor: "text-white"
  },
  {
    title: "CREATIVE COLLABORATION",
    text: "We collaborate with brands, creators and businesses to bring bold ideas to life through technology and design.",
    bg: "bg-black",
    textColor: "text-white"
  }
];

  return (

    <section className="relative">

      <div className="h-[500vh]">

        {sections.map((item, index) => (

          <div
            key={index}
            className={`sticky top-0 h-screen flex items-center justify-center ${item.bg}`}
            style={{ zIndex: index + 1 }}
          >

            <div className={`max-w-4xl px-12 text-center ${item.textColor}`}>

              <h2 className="text-5xl font-bold mb-8">
                {item.title}
              </h2>

              <div className="w-full h-[1px] bg-current opacity-40 mb-8"></div>

              <p className="text-lg leading-relaxed">
                {item.text}
              </p>

            </div>

          </div>

        ))}

      </div>

    </section>

  );
}