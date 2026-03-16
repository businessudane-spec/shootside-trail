"use client";

export default function MentoringSection() {

  const sections = [
    {
      title: "ONE-ON-ONE MENTORING WITH EXPERT",
      text: "Industry professionals guide talents to build strong portfolios.",
      bg: "bg-black",
      textColor: "text-white"
    },
    {
      title: "PORTFOLIO REVIEW",
      text: "Experts review portfolios and provide real studio feedback.",
      bg: "bg-white",
      textColor: "text-black"
    },
    {
      title: "CAREER GUIDANCE",
      text: "Mentors help artists understand career paths in creative industries.",
      bg: "bg-black",
      textColor: "text-white"
    },
    {
      title: "INDUSTRY CONNECTIONS",
      text: "Connect with studios and creative leaders worldwide.",
      bg: "bg-[#ad46ff]",
      textColor: "text-white"
    },
    {
      title: "PROJECT COLLABORATION",
      text: "Work on collaborative projects guided by professionals.",
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