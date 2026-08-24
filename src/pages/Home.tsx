import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useCMS } from "../context/CMSContext";
import { STATS, SERVICES, INDUSTRIES, TESTIMONIALS, PROCESS_STEPS, WHY_VRAT } from "../data";

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

export default function Home() {
  const { heroConfigs, partners, submitLead } = useCMS();
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const homeHero = heroConfigs["home"] || {
    heading: "Building Smarter, Safer & More Secure Environments",
    subtitle: "VRAT System Integrators is a leading provider of integrated electronic security, surveillance, networking, and automation solutions across India.",
    backgroundImage: "https://images.unsplash.com/photo-1551808525-51a94da548ce?w=1920&h=1080&fit=crop&auto=format",
    primaryCtaText: "Request a Free Site Survey",
    primaryCtaLink: "/contact",
    secondaryCtaText: "Explore Our Solutions",
    secondaryCtaLink: "/services",
    showSection: true,
  };

  useEffect(() => {
    const t = setInterval(() => setActiveTestimonial((p) => (p + 1) % TESTIMONIALS.length), 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="overflow-x-hidden">
      {/* HERO */}
      {homeHero.showSection && (
        <section className="relative min-h-screen flex items-center gradient-navy overflow-hidden">
          <div className="absolute inset-0">
            <img
              src={homeHero.backgroundImage || "https://images.unsplash.com/photo-1551808525-51a94da548ce?w=1920&h=1080&fit=crop&auto=format"}
              alt="Security command center with CCTV monitoring"
              className="w-full h-full object-cover opacity-20"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0A1628]/95 via-[#0A1628]/80 to-[#162B56]/70" />
          </div>

          {/* Subtle grid pattern */}
          <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "linear-gradient(rgba(96,165,250,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(96,165,250,0.5) 1px, transparent 1px)", backgroundSize: "48px 48px" }} />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/15 border border-blue-400/25 mb-8 animate-fade-up">
                <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                <span className="text-blue-200 text-sm font-medium tracking-wide">Trusted Security Solutions Across India</span>
              </div>

              <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl text-white leading-tight mb-6 animate-fade-up delay-100">
                {homeHero.heading}
              </h1>

              <p className="text-blue-100/80 text-lg sm:text-xl leading-relaxed mb-10 max-w-2xl animate-fade-up delay-200">
                {homeHero.subtitle}
              </p>

              <div className="flex flex-wrap gap-4 animate-fade-up delay-300">
                <Link
                  to={homeHero.primaryCtaLink || "/contact"}
                  className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition-all shadow-lg shadow-blue-600/30 hover:shadow-blue-500/40 hover:-translate-y-0.5"
                >
                  {homeHero.primaryCtaText || "Request a Free Site Survey"}
                </Link>
                {homeHero.secondaryCtaText && (
                  <Link
                    to={homeHero.secondaryCtaLink || "/services"}
                    className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl border border-white/25 transition-all hover:-translate-y-0.5"
                  >
                    {homeHero.secondaryCtaText}
                  </Link>
                )}
              </div>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40 animate-bounce">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </section>
      )}

      {/* TRUST BAR */}
      <section className="bg-white border-b border-slate-100 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-slate-400 text-xs font-semibold tracking-widest uppercase mb-6">Trusted by Businesses Across India</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 text-center">
            {[
              { value: "17+", label: "Years Experience" },
              { value: "500+", label: "Projects Delivered" },
              { value: "120+", label: "Happy Clients" },
              { value: "24×7", label: "Technical Support" },
              { value: "40+", label: "Certified Engineers" },
            ].map((s) => (
              <div key={s.label} className="flex flex-col items-center gap-1">
                <span className="text-2xl font-bold text-blue-700 font-serif">{s.value}</span>
                <span className="text-xs text-slate-500 font-medium">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMPANY OVERVIEW */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimSection>
              <span className="text-blue-600 text-sm font-semibold uppercase tracking-widest">Who We Are</span>
              <h2 className="font-serif text-4xl lg:text-5xl text-slate-900 mt-3 mb-6 leading-tight">
                India's Trusted System Integration Partner
              </h2>
              <p className="text-slate-600 leading-relaxed mb-5">
                VRAT System Integrators specializes in designing, supplying, installing, and maintaining comprehensive electronic security and automation solutions tailored to the unique needs of businesses and institutions.
              </p>
              <p className="text-slate-600 leading-relaxed mb-5">
                From CCTV surveillance systems and access control to fire alarm systems, networking infrastructure, public address systems, and smart building automation, we provide end-to-end solutions backed by technical expertise, premium products, and exceptional customer support.
              </p>
              <p className="text-slate-600 leading-relaxed mb-8">
                With a customer-centric approach and commitment to quality, we ensure every project is delivered with precision, reliability, and long-term value.
              </p>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all"
              >
                Learn More About Us
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </AnimSection>

            <AnimSection className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-blue-900/20">
                <img
                  src="https://images.unsplash.com/photo-1553877522-43269d4ea984?w=700&h=500&fit=crop&auto=format"
                  alt="VRAT System Integrators team working on security systems"
                  className="w-full h-[420px] object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/50 to-transparent" />
              </div>
              {/* Floating stat card */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-xl p-5 shadow-xl shadow-blue-900/15 border border-blue-50">
                <div className="text-3xl font-bold text-blue-700 font-serif">98%</div>
                <div className="text-sm text-slate-500 mt-1">Customer Satisfaction Rate</div>
              </div>
            </AnimSection>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE VRAT */}
      <section className="py-24 bg-slate-50 section-pattern">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimSection className="text-center mb-16">
            <span className="text-blue-600 text-sm font-semibold uppercase tracking-widest">Why Choose Us</span>
            <h2 className="font-serif text-4xl lg:text-5xl text-slate-900 mt-3 mb-5">Why Organizations Choose VRAT</h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">
              Choosing the right security partner is crucial for protecting your people, property, and operations. At VRAT System Integrators, we combine technical expertise, trusted technology, and dedicated support to deliver security solutions that stand the test of time.
            </p>
          </AnimSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {WHY_VRAT.map((item, i) => (
              <AnimSection key={i} className={`delay-${(i % 3) * 100 + 100}`}>
                <div className="bg-white rounded-2xl p-7 shadow-sm border border-slate-100 card-hover h-full">
                  <div className="w-12 h-12 rounded-xl bg-blue-600/10 flex items-center justify-center mb-5">
                    <span className="text-blue-600 text-xl">✓</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-3">{item.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </AnimSection>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimSection className="text-center mb-16">
            <span className="text-blue-600 text-sm font-semibold uppercase tracking-widest">Our Services</span>
            <h2 className="font-serif text-4xl lg:text-5xl text-slate-900 mt-3 mb-5">Comprehensive Security & Technology Solutions</h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">
              We provide integrated solutions that enhance safety, communication, automation, and operational efficiency.
            </p>
          </AnimSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((service, i) => (
              <AnimSection key={service.id}>
                <div className="group bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm card-hover h-full flex flex-col">
                  <div className="relative h-44 overflow-hidden bg-blue-50">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent" />
                    <span className="absolute top-4 left-4 text-2xl">{service.icon}</span>
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="font-bold text-slate-900 text-lg mb-2">{service.title}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed flex-1 mb-4">{service.shortDesc}</p>
                    <Link
                      to={service.slug}
                      className="inline-flex items-center gap-1.5 text-blue-600 font-semibold text-sm hover:gap-2.5 transition-all group"
                    >
                      Learn More
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </AnimSection>
            ))}
          </div>

          <AnimSection className="text-center mt-12">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 px-8 py-4 border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-semibold rounded-xl transition-all"
            >
              View All Services
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </AnimSection>
        </div>
      </section>

      {/* INDUSTRIES */}
      <section className="py-24 bg-[#0A1628]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimSection className="text-center mb-16">
            <span className="text-blue-300 text-sm font-semibold uppercase tracking-widest">Industries We Serve</span>
            <h2 className="font-serif text-4xl lg:text-5xl text-white mt-3 mb-5">Serving Diverse Industries</h2>
            <p className="text-blue-100/70 text-lg max-w-2xl mx-auto">
              Our expertise spans multiple industries, delivering customized security and automation solutions.
            </p>
          </AnimSection>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {INDUSTRIES.map((ind, i) => (
              <AnimSection key={ind.id}>
                <Link to="/industries" className="group relative rounded-xl overflow-hidden block aspect-square bg-navy-800">
                  <img
                    src={ind.image}
                    alt={ind.title}
                    className="w-full h-full object-cover opacity-50 group-hover:opacity-70 group-hover:scale-105 transition-all duration-400"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628]/90 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <div className="text-lg mb-1">{ind.icon}</div>
                    <div className="text-white text-xs font-semibold leading-tight">{ind.title}</div>
                  </div>
                </Link>
              </AnimSection>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimSection className="text-center mb-16">
            <span className="text-blue-600 text-sm font-semibold uppercase tracking-widest">Our Process</span>
            <h2 className="font-serif text-4xl lg:text-5xl text-slate-900 mt-3 mb-5">How We Deliver Success</h2>
          </AnimSection>

          <div className="relative">
            <div className="hidden lg:block absolute top-8 left-0 right-0 h-0.5 bg-blue-100 z-0" style={{ marginLeft: "8.33%", marginRight: "8.33%" }} />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-8 relative z-10">
              {PROCESS_STEPS.map((step, i) => (
                <AnimSection key={i} className={`text-center delay-${i * 100}`}>
                  <div className="w-16 h-16 rounded-full bg-blue-600 text-white font-bold text-lg flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-600/30">
                    {step.step}
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm mb-2">{step.title}</h3>
                  <p className="text-slate-500 text-xs leading-relaxed">{step.desc}</p>
                </AnimSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED PROJECTS */}
      <section className="py-24 bg-slate-50 section-pattern">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimSection className="text-center mb-16">
            <span className="text-blue-600 text-sm font-semibold uppercase tracking-widest">Featured Projects</span>
            <h2 className="font-serif text-4xl lg:text-5xl text-slate-900 mt-3 mb-5">Delivering Excellence Across Industries</h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">
              Our portfolio includes successful implementations in educational campuses, manufacturing facilities, hospitals, residential complexes, commercial buildings, retail outlets, and government institutions.
            </p>
          </AnimSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Campus-Wide Surveillance",
                sector: "Education",
                desc: "Comprehensive CCTV and access control deployment across an educational institution campus.",
                image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600&h=400&fit=crop&auto=format",
                services: ["CCTV", "Access Control", "Public Address"],
              },
              {
                title: "Industrial Security System",
                sector: "Manufacturing",
                desc: "Integrated surveillance, fire alarm, and perimeter security for a manufacturing facility.",
                image: "https://images.unsplash.com/photo-1565793079479-ef2f800fd2b5?w=600&h=400&fit=crop&auto=format",
                services: ["CCTV", "Fire Alarm", "Boom Barrier"],
              },
              {
                title: "Corporate Office Integration",
                sector: "Corporate",
                desc: "End-to-end security and networking solution for a multi-floor corporate office building.",
                image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=400&fit=crop&auto=format",
                services: ["Access Control", "Networking", "CCTV"],
              },
            ].map((p, i) => (
              <AnimSection key={i}>
                <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 card-hover">
                  <div className="relative h-48">
                    <img src={p.image} alt={p.title} className="w-full h-full object-cover" loading="lazy" />
                    <div className="absolute top-4 right-4 px-3 py-1 bg-blue-600 text-white text-xs font-semibold rounded-full">
                      {p.sector}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold text-slate-900 text-lg mb-2">{p.title}</h3>
                    <p className="text-slate-600 text-sm mb-4">{p.desc}</p>
                    <div className="flex flex-wrap gap-2">
                      {p.services.map((s) => (
                        <span key={s} className="px-2.5 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-lg">{s}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </AnimSection>
            ))}
          </div>

          <AnimSection className="text-center mt-12">
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all"
            >
              View All Projects
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </AnimSection>
        </div>
      </section>

      {/* TECHNOLOGY PARTNERS */}
      <section className="py-20 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimSection className="text-center mb-12">
            <span className="text-blue-600 text-sm font-semibold uppercase tracking-widest">Technology Partners</span>
            <h2 className="font-serif text-3xl text-slate-900 mt-3">Technology Partners We Trust</h2>
          </AnimSection>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-4">
            {partners.filter((p) => p.active !== false).map((p) => (
              <a
                key={p.id}
                href={p.websiteUrl || "#"}
                target={p.websiteUrl && p.websiteUrl.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                className="flex flex-col items-center justify-center p-4 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:border-blue-200 hover:shadow-md transition-all group"
              >
                <span className="text-slate-800 font-bold text-sm text-center leading-tight group-hover:text-blue-600 transition">{p.name}</span>
                <span className="text-[10px] text-slate-400 font-medium mt-1">{p.category}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* STATISTICS */}
      <section className="py-24 gradient-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimSection className="text-center mb-16">
            <h2 className="font-serif text-4xl lg:text-5xl text-white mb-4">Our Numbers Speak for Themselves</h2>
          </AnimSection>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8">
            {STATS.map((s, i) => (
              <AnimSection key={i} className="text-center">
                <div className="text-4xl font-bold text-blue-300 font-serif mb-2">{s.value}</div>
                <div className="text-blue-100/70 text-sm">{s.label}</div>
              </AnimSection>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimSection className="text-center mb-16">
            <span className="text-blue-600 text-sm font-semibold uppercase tracking-widest">Testimonials</span>
            <h2 className="font-serif text-4xl lg:text-5xl text-slate-900 mt-3">What Our Clients Say</h2>
          </AnimSection>

          <div className="relative bg-gradient-to-br from-blue-50 to-white rounded-3xl p-10 shadow-lg border border-blue-100">
            <svg className="w-12 h-12 text-blue-200 mb-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
            <p className="text-slate-700 text-xl leading-relaxed mb-8 font-medium italic">
              "{TESTIMONIALS[activeTestimonial].quote}"
            </p>
            <div className="flex items-center justify-between">
              <div>
                <div className="font-bold text-slate-900">{TESTIMONIALS[activeTestimonial].client}</div>
                <div className="text-blue-600 text-sm">{TESTIMONIALS[activeTestimonial].sector}</div>
              </div>
              <div className="flex gap-2">
                {TESTIMONIALS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveTestimonial(i)}
                    className={`w-2.5 h-2.5 rounded-full transition-all ${i === activeTestimonial ? "bg-blue-600 w-6" : "bg-blue-200"}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-24 bg-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimSection>
            <h2 className="font-serif text-4xl lg:text-5xl text-white mb-5">
              Ready to Strengthen Your Security Infrastructure?
            </h2>
            <p className="text-blue-100 text-lg mb-10 max-w-2xl mx-auto">
              Protect your organization with intelligent, reliable, and scalable security solutions tailored to your needs.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/contact"
                className="px-8 py-4 bg-white text-blue-700 font-bold rounded-xl hover:bg-blue-50 transition-all shadow-lg"
              >
                Schedule a Consultation
              </Link>
              <Link
                to="/contact"
                className="px-8 py-4 bg-blue-700 hover:bg-blue-800 text-white font-semibold rounded-xl border border-blue-500 transition-all"
              >
                Request a Site Survey
              </Link>
            </div>
          </AnimSection>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="py-16 bg-slate-900">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-white font-bold text-2xl mb-3">Stay Updated</h3>
          <p className="text-slate-400 text-sm mb-6">
            Subscribe to receive the latest updates on security technologies, industry trends, and company news.
          </p>
          <form
            onSubmit={(e) => { e.preventDefault(); setEmail(""); }}
            className="flex gap-3 max-w-md mx-auto"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              required
              className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/15 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-blue-400"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl text-sm transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
