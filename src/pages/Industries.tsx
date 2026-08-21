import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { INDUSTRIES } from "../data";

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function AnimSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const { ref, inView } = useInView();
  return (
    <div ref={ref} className={`transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${className}`}>
      {children}
    </div>
  );
}

const INDUSTRY_DETAILS = [
  {
    ...INDUSTRIES[0],
    solutions: ["Enterprise CCTV Surveillance", "Biometric Access Control", "Visitor Management", "Structured Networking", "PA Systems"],
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=500&fit=crop&auto=format",
  },
  {
    ...INDUSTRIES[1],
    solutions: ["Industrial CCTV", "Perimeter Security", "Fire Alarm Systems", "Boom Barriers", "PA Systems"],
    image: "https://images.unsplash.com/photo-1565793079479-ef2f800fd2b5?w=800&h=500&fit=crop&auto=format",
  },
  {
    ...INDUSTRIES[2],
    solutions: ["Campus-wide CCTV", "Time Attendance", "Public Address", "Access Control", "Networking"],
    image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&h=500&fit=crop&auto=format",
  },
  {
    ...INDUSTRIES[3],
    solutions: ["Patient Area Surveillance", "Access Control", "Fire Alarm", "Emergency PA", "Nursing Call"],
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&h=500&fit=crop&auto=format",
  },
  {
    ...INDUSTRIES[4],
    solutions: ["Guest Safety CCTV", "Access Control", "Video Door Phone", "Fire Alarm", "Building Automation"],
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=500&fit=crop&auto=format",
  },
  {
    ...INDUSTRIES[5],
    solutions: ["Perimeter CCTV", "Vehicle Monitoring", "Boom Barriers", "Fire Safety", "Networking"],
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&h=500&fit=crop&auto=format",
  },
  {
    ...INDUSTRIES[6],
    solutions: ["Loss Prevention CCTV", "Customer Analytics", "Access Control", "PA Systems", "Networking"],
    image: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=800&h=500&fit=crop&auto=format",
  },
  {
    ...INDUSTRIES[7],
    solutions: ["Video Door Phone", "CCTV", "Home Automation", "Access Control", "Intercom"],
    image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&h=500&fit=crop&auto=format",
  },
  {
    ...INDUSTRIES[8],
    solutions: ["Command Center CCTV", "Integrated Surveillance", "Access Control", "Fire Safety", "Networking"],
    image: "https://images.unsplash.com/photo-1569025743873-ea3a9ade89f9?w=800&h=500&fit=crop&auto=format",
  },
  {
    ...INDUSTRIES[9],
    solutions: ["High-Security CCTV", "Vault Protection", "Access Control", "Fire Alarm", "PA Systems"],
    image: "https://images.unsplash.com/photo-1601597111158-2fceff292cdc?w=800&h=500&fit=crop&auto=format",
  },
];

export default function Industries() {
  return (
    <div className="overflow-x-hidden">
      {/* HERO */}
      <section className="relative py-32 gradient-navy overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&h=600&fit=crop&auto=format"
            alt="Industries we serve"
            className="w-full h-full object-cover opacity-15"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A1628]/95 to-[#162B56]/80" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-fade-up">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/15 border border-blue-400/25 mb-6">
            <span className="text-blue-300 text-sm font-medium">Industries We Serve</span>
          </div>
          <h1 className="font-serif text-5xl lg:text-6xl text-white leading-tight mb-6 max-w-3xl">
            Tailored Security Solutions for{" "}
            <span className="text-blue-300">Every Industry</span>
          </h1>
          <p className="text-blue-100/80 text-xl max-w-2xl leading-relaxed">
            Our expertise spans multiple industries, delivering customized security and automation solutions to protect people, assets, and operations across India.
          </p>
        </div>
      </section>

      {/* INDUSTRIES GRID */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimSection className="text-center mb-16">
            <span className="text-blue-600 text-sm font-semibold uppercase tracking-widest">Our Expertise</span>
            <h2 className="font-serif text-4xl text-slate-900 mt-3">Industries We Serve</h2>
          </AnimSection>

          <div className="space-y-16">
            {INDUSTRY_DETAILS.map((ind, i) => (
              <AnimSection key={ind.id}>
                <div className={`grid lg:grid-cols-2 gap-12 items-center ${i % 2 === 1 ? "lg:[direction:rtl]" : ""}`}>
                  <div className="lg:[direction:ltr]">
                    <div className="rounded-2xl overflow-hidden shadow-xl shadow-blue-900/10">
                      <img
                        src={ind.image}
                        alt={ind.title}
                        className="w-full h-72 object-cover"
                        loading="lazy"
                      />
                    </div>
                  </div>
                  <div className="lg:[direction:ltr]">
                    <div className="text-4xl mb-4">{ind.icon}</div>
                    <h3 className="font-serif text-3xl text-slate-900 mb-3">{ind.title}</h3>
                    <p className="text-slate-600 leading-relaxed mb-6">{ind.desc}</p>
                    <div>
                      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Our Solutions</p>
                      <div className="flex flex-wrap gap-2">
                        {ind.solutions.map((s) => (
                          <span key={s} className="px-3 py-1.5 bg-blue-50 text-blue-700 text-xs font-medium rounded-lg border border-blue-100">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                    <Link
                      to="/contact"
                      className="mt-6 inline-flex items-center gap-2 text-blue-600 font-semibold text-sm hover:gap-3 transition-all"
                    >
                      Get a Custom Solution
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </AnimSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimSection>
            <h2 className="font-serif text-4xl text-white mb-5">Don't See Your Industry?</h2>
            <p className="text-blue-100 text-lg mb-8">
              We work with all types of organizations. Contact us to discuss your specific security requirements.
            </p>
            <Link to="/contact" className="px-8 py-4 bg-white text-blue-700 font-bold rounded-xl hover:bg-blue-50 transition-all">
              Contact Us Today
            </Link>
          </AnimSection>
        </div>
      </section>
    </div>
  );
}
