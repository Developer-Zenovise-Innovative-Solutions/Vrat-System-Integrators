import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { TIMELINE, CORE_VALUES, PARTNERS, WHY_VRAT } from "../data";

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

const CERTIFICATIONS = [
  "ISO Certification", "MSME Registration", "GST Registration",
  "Authorized System Integrator Certifications", "OEM Partnership Certificates", "Safety Compliance Certificates",
];

const TEAM_ROLES = [
  "Project Managers", "System Architects", "Security Consultants",
  "Installation Engineers", "Network Specialists", "Fire Safety Experts",
  "Technical Support Engineers", "Customer Relationship Executives",
];

export default function About() {
  return (
    <div className="overflow-x-hidden">
      {/* HERO */}
      <section className="relative py-32 gradient-navy overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=1920&h=600&fit=crop&auto=format"
            alt="VRAT engineers working on security system installation"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A1628]/95 to-[#162B56]/80" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl animate-fade-up">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/15 border border-blue-400/25 mb-6">
              <span className="text-blue-300 text-sm font-medium">About VRAT System Integrators</span>
            </div>
            <h1 className="font-serif text-5xl lg:text-6xl text-white leading-tight mb-6">
              Empowering Secure Spaces Through{" "}
              <span className="text-blue-300">Innovation & Excellence</span>
            </h1>
            <p className="text-blue-100/80 text-xl leading-relaxed mb-8">
              For over 17 years, VRAT System Integrators has been delivering intelligent electronic security, surveillance, networking, and automation solutions that protect businesses, institutions, and communities across India.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/contact" className="px-7 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition-all">
                Meet Our Team
              </Link>
              <Link to="/contact" className="px-7 py-3.5 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl border border-white/25 transition-all">
                Contact Our Experts
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* COMPANY INTRODUCTION */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimSection>
              <span className="text-blue-600 text-sm font-semibold uppercase tracking-widest">Who We Are</span>
              <h2 className="font-serif text-4xl text-slate-900 mt-3 mb-6 leading-tight">
                A Leading Provider of Integrated Security Solutions
              </h2>
              <p className="text-slate-600 leading-relaxed mb-5">
                VRAT System Integrators is a leading provider of integrated electronic security and technology solutions. We specialize in the design, supply, installation, commissioning, and maintenance of advanced security systems tailored to meet the unique needs of businesses and organizations.
              </p>
              <p className="text-slate-600 leading-relaxed mb-5">
                Our expertise spans CCTV surveillance, fire alarm systems, access control, networking, public address systems, video door phones, home automation, and complete system integration. By combining innovative technology with experienced professionals, we deliver reliable solutions that improve security, operational efficiency, and business continuity.
              </p>
              <p className="text-slate-600 leading-relaxed">
                Whether serving corporate offices, educational institutions, healthcare facilities, industrial plants, or residential communities, our goal is to provide dependable solutions that exceed client expectations.
              </p>
            </AnimSection>

            <AnimSection>
              <div className="grid grid-cols-2 gap-4">
                <img
                  src="https://images.unsplash.com/photo-1551808525-51a94da548ce?w=400&h=300&fit=crop&auto=format"
                  alt="CCTV monitoring command center"
                  className="rounded-xl object-cover h-48 w-full"
                  loading="lazy"
                />
                <img
                  src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop&auto=format"
                  alt="Security system installation"
                  className="rounded-xl object-cover h-48 w-full mt-8"
                  loading="lazy"
                />
                <img
                  src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=400&h=300&fit=crop&auto=format"
                  alt="Engineering team at work"
                  className="rounded-xl object-cover h-48 w-full"
                  loading="lazy"
                />
                <img
                  src="https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=300&fit=crop&auto=format"
                  alt="Access control biometric system"
                  className="rounded-xl object-cover h-48 w-full mt-8"
                  loading="lazy"
                />
              </div>
            </AnimSection>
          </div>
        </div>
      </section>

      {/* OUR STORY */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimSection className="text-center">
            <span className="text-blue-200 text-sm font-semibold uppercase tracking-widest">Our Story</span>
            <h2 className="font-serif text-4xl text-white mt-3 mb-8">Founded on a Vision of Security Excellence</h2>
            <p className="text-blue-100 text-lg leading-relaxed mb-5">
              Founded with a vision to make modern security solutions accessible and reliable, VRAT System Integrators began as a small team of passionate professionals dedicated to delivering quality electronic security systems.
            </p>
            <p className="text-blue-100 text-lg leading-relaxed mb-5">
              Over the years, the company has evolved into a trusted system integration partner, successfully executing projects across multiple industries. Through continuous learning, technology adoption, and customer-focused service, we have expanded our capabilities while maintaining our commitment to quality and innovation.
            </p>
            <p className="text-blue-100 text-lg leading-relaxed">
              Today, VRAT System Integrators is recognized for delivering turnkey solutions backed by technical expertise, trusted partnerships, and exceptional after-sales support.
            </p>
          </AnimSection>
        </div>
      </section>

      {/* VISION & MISSION */}
      <section className="py-24 bg-slate-50 section-pattern">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8">
            <AnimSection>
              <div className="bg-white rounded-2xl p-10 shadow-sm border border-slate-100 h-full">
                <div className="w-14 h-14 rounded-xl bg-blue-600 flex items-center justify-center mb-6">
                  <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <h3 className="font-serif text-3xl text-slate-900 mb-4">Our Vision</h3>
                <p className="text-slate-600 leading-relaxed text-lg">
                  To become one of India's most trusted system integration companies by providing innovative, reliable, and sustainable electronic security and automation solutions that create safer environments for businesses and communities.
                </p>
              </div>
            </AnimSection>

            <AnimSection>
              <div className="bg-[#0A1628] rounded-2xl p-10 h-full">
                <div className="w-14 h-14 rounded-xl bg-blue-600 flex items-center justify-center mb-6">
                  <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="font-serif text-3xl text-white mb-4">Our Mission</h3>
                <p className="text-blue-100/80 leading-relaxed mb-5">Our mission is to deliver world-class security and technology solutions through:</p>
                <ul className="space-y-2.5">
                  {[
                    "Understanding customer requirements.",
                    "Implementing innovative technologies.",
                    "Ensuring quality workmanship.",
                    "Providing exceptional customer support.",
                    "Building long-term relationships based on trust and reliability.",
                  ].map((m, i) => (
                    <li key={i} className="flex items-start gap-3 text-blue-100/80 text-sm">
                      <svg className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {m}
                    </li>
                  ))}
                </ul>
              </div>
            </AnimSection>
          </div>
        </div>
      </section>

      {/* CORE VALUES */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimSection className="text-center mb-16">
            <span className="text-blue-600 text-sm font-semibold uppercase tracking-widest">Core Values</span>
            <h2 className="font-serif text-4xl text-slate-900 mt-3">The Principles That Guide Us</h2>
          </AnimSection>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {CORE_VALUES.map((v, i) => (
              <AnimSection key={i}>
                <div className="relative bg-white border border-slate-100 rounded-2xl p-7 shadow-sm card-hover overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full bg-blue-600 rounded-l-2xl" />
                  <div className="text-blue-600 font-bold text-4xl font-serif opacity-15 absolute top-4 right-4">{i + 1}</div>
                  <h3 className="font-bold text-slate-900 text-lg mb-3">{v.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{v.desc}</p>
                </div>
              </AnimSection>
            ))}
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="py-24 bg-[#0A1628]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimSection className="text-center mb-16">
            <span className="text-blue-300 text-sm font-semibold uppercase tracking-widest">Company Timeline</span>
            <h2 className="font-serif text-4xl text-white mt-3">Our Growth Journey</h2>
          </AnimSection>

          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-blue-900" />
            <div className="space-y-8">
              {TIMELINE.map((t, i) => (
                <AnimSection key={i}>
                  <div className="flex gap-8">
                    <div className="relative">
                      <div className="w-16 h-16 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold text-sm shrink-0">
                        {t.year}
                      </div>
                    </div>
                    <div className="bg-white/5 rounded-xl p-5 flex-1 border border-white/8">
                      <p className="text-blue-100/80 text-sm leading-relaxed">{t.event}</p>
                    </div>
                  </div>
                </AnimSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE VRAT */}
      <section className="py-24 bg-slate-50 section-pattern">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimSection className="text-center mb-16">
            <span className="text-blue-600 text-sm font-semibold uppercase tracking-widest">Why Choose VRAT</span>
            <h2 className="font-serif text-4xl text-slate-900 mt-3">Your Trusted Technology Partner</h2>
          </AnimSection>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Experienced Professionals", desc: "Our skilled engineers and certified technicians bring years of industry expertise to every project.", icon: "👥" },
              { title: "Customized Solutions", desc: "We understand that every organization has different security requirements and design accordingly.", icon: "⚙️" },
              { title: "Complete Project Management", desc: "From initial consultation to post-installation support, we handle every stage professionally.", icon: "📋" },
              { title: "Quality Assurance", desc: "Every installation undergoes rigorous testing and quality checks to ensure reliable performance.", icon: "✅" },
            ].map((item, i) => (
              <AnimSection key={i}>
                <div className="bg-white rounded-2xl p-7 shadow-sm border border-slate-100 card-hover text-center">
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h3 className="font-bold text-slate-900 mb-3">{item.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </AnimSection>
            ))}
          </div>
        </div>
      </section>

      {/* LEADERSHIP */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimSection className="text-center mb-12">
            <span className="text-blue-600 text-sm font-semibold uppercase tracking-widest">Leadership</span>
            <h2 className="font-serif text-4xl text-slate-900 mt-3 mb-5">Leadership That Inspires Confidence</h2>
            <p className="text-slate-600 max-w-2xl mx-auto leading-relaxed">
              At VRAT System Integrators, our leadership team brings together years of experience in technology, project management, and customer service. Their vision, strategic planning, and commitment to excellence have enabled the company to build lasting relationships with clients while continuously embracing innovation.
            </p>
          </AnimSection>
        </div>
      </section>

      {/* TEAM */}
      <section className="py-8 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimSection className="text-center mb-10">
            <h3 className="font-bold text-slate-900 text-2xl mb-3">Meet Our Experts</h3>
            <p className="text-slate-600 text-sm max-w-xl mx-auto">
              Together, they ensure every project is delivered on time, within budget, and to the highest quality standards.
            </p>
          </AnimSection>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            {TEAM_ROLES.map((role, i) => (
              <div key={i} className="bg-blue-50 rounded-xl p-4 text-center border border-blue-100">
                <div className="text-blue-700 text-xs font-semibold leading-snug">{role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CERTIFICATIONS */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimSection className="text-center mb-12">
            <span className="text-blue-600 text-sm font-semibold uppercase tracking-widest">Certifications & Compliance</span>
            <h2 className="font-serif text-4xl text-slate-900 mt-3 mb-4">Quality You Can Trust</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              VRAT System Integrators follows industry best practices and works with globally recognized technology partners.
            </p>
          </AnimSection>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {CERTIFICATIONS.map((c, i) => (
              <AnimSection key={i}>
                <div className="bg-white rounded-xl p-5 text-center shadow-sm border border-slate-100">
                  <div className="w-10 h-10 rounded-full bg-blue-600/10 flex items-center justify-center mx-auto mb-3">
                    <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                  </div>
                  <p className="text-slate-700 text-xs font-medium leading-snug">{c}</p>
                </div>
              </AnimSection>
            ))}
          </div>
        </div>
      </section>

      {/* TECHNOLOGY PARTNERS */}
      <section className="py-20 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimSection className="text-center mb-12">
            <span className="text-blue-600 text-sm font-semibold uppercase tracking-widest">Technology Partners</span>
            <h2 className="font-serif text-3xl text-slate-900 mt-3">Trusted Technology Brands</h2>
            <p className="text-slate-600 mt-3">We collaborate with industry-leading manufacturers to deliver dependable and future-ready solutions.</p>
          </AnimSection>
          <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-10 gap-4">
            {PARTNERS.map((p) => (
              <div key={p} className="flex items-center justify-center p-3 rounded-xl border border-slate-100 hover:border-blue-200 hover:shadow-md transition-all">
                <span className="text-slate-500 font-semibold text-xs text-center">{p}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SUSTAINABILITY */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <AnimSection>
              <span className="text-blue-600 text-sm font-semibold uppercase tracking-widest">Sustainability & Innovation</span>
              <h2 className="font-serif text-4xl text-slate-900 mt-3 mb-6">Building a Smarter Future</h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                We embrace modern technologies that improve operational efficiency while promoting sustainability. Our solutions include:
              </p>
              <ul className="space-y-3">
                {["Energy-efficient devices", "Smart automation systems", "Cloud-enabled monitoring", "AI-powered video analytics", "Remote management solutions", "Scalable infrastructure"].map((s, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-700 text-sm">
                    <div className="w-2 h-2 rounded-full bg-blue-600 shrink-0" />
                    {s}
                  </li>
                ))}
              </ul>
            </AnimSection>
            <AnimSection>
              <div className="rounded-2xl overflow-hidden shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=700&h=500&fit=crop&auto=format"
                  alt="Smart technology and innovation"
                  className="w-full h-[380px] object-cover"
                  loading="lazy"
                />
              </div>
            </AnimSection>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimSection>
            <h2 className="font-serif text-4xl text-white mb-5">Let's Build a Safer Tomorrow Together</h2>
            <p className="text-blue-100 text-lg mb-8">
              Whether you're planning a new facility or upgrading an existing security infrastructure, VRAT System Integrators is ready to deliver a solution tailored to your requirements.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/contact" className="px-8 py-4 bg-white text-blue-700 font-bold rounded-xl hover:bg-blue-50 transition-all">
                Schedule a Consultation
              </Link>
              <Link to="/contact" className="px-8 py-4 bg-blue-700 hover:bg-blue-800 text-white font-semibold rounded-xl border border-blue-500 transition-all">
                Request a Site Survey
              </Link>
            </div>
          </AnimSection>
        </div>
      </section>
    </div>
  );
}
