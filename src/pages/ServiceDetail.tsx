import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { SERVICES, PARTNERS, FAQS } from "../data";

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

export default function ServiceDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const service = SERVICES.find((s) => s.slug === `/services/${slug}`);

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-slate-900 mb-4">Service Not Found</h1>
          <Link to="/services" className="text-blue-600 hover:underline">View All Services</Link>
        </div>
      </div>
    );
  }

  const otherServices = SERVICES.filter((s) => s.id !== service.id).slice(0, 3);

  return (
    <div className="overflow-x-hidden">
      {/* HERO */}
      <section className="relative py-32 gradient-navy overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={service.image}
            alt={service.title}
            className="w-full h-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A1628]/95 to-[#162B56]/80" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-blue-300/70 text-sm mb-6">
            <Link to="/" className="hover:text-blue-200">Home</Link>
            <span>/</span>
            <Link to="/services" className="hover:text-blue-200">Services</Link>
            <span>/</span>
            <span className="text-blue-200">{service.title}</span>
          </div>
          <div className="max-w-3xl animate-fade-up">
            <span className="text-5xl mb-4 block">{service.icon}</span>
            <h1 className="font-serif text-5xl lg:text-6xl text-white leading-tight mb-6">
              {service.title}
            </h1>
            <p className="text-blue-100/80 text-xl leading-relaxed mb-8">{service.overview}</p>
            <div className="flex flex-wrap gap-4">
              <Link to="/contact" className="px-7 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition-all">
                Get a Free Quote
              </Link>
              <Link to="/contact" className="px-7 py-3.5 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl border border-white/25 transition-all">
                Schedule a Consultation
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* OVERVIEW + FEATURES */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <AnimSection>
              <span className="text-blue-600 text-sm font-semibold uppercase tracking-widest">What We Offer</span>
              <h2 className="font-serif text-4xl text-slate-900 mt-3 mb-6">
                Comprehensive {service.title}
              </h2>
              <p className="text-slate-600 leading-relaxed mb-8 text-lg">{service.overview}</p>
              <div className="grid grid-cols-2 gap-3">
                {service.features.map((f) => (
                  <div key={f} className="flex items-center gap-2.5 p-3 bg-blue-50 rounded-xl border border-blue-100">
                    <svg className="w-4 h-4 text-blue-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-blue-900 text-sm font-medium">{f}</span>
                  </div>
                ))}
              </div>
            </AnimSection>

            <AnimSection>
              <div className="rounded-2xl overflow-hidden shadow-2xl shadow-blue-900/15 mb-8">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-80 object-cover"
                  loading="lazy"
                />
              </div>
              <div className="bg-[#0A1628] rounded-2xl p-7">
                <h3 className="font-bold text-white mb-5">Key Benefits</h3>
                <ul className="space-y-3">
                  {service.benefits.map((b) => (
                    <li key={b} className="flex items-center gap-3 text-blue-100/80 text-sm">
                      <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center shrink-0">
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </AnimSection>
          </div>
        </div>
      </section>

      {/* APPLICATIONS (if exists) */}
      {"applications" in service && Array.isArray((service as any).applications) && (
        <section className="py-20 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimSection className="text-center mb-10">
              <span className="text-blue-600 text-sm font-semibold uppercase tracking-widest">Applications</span>
              <h2 className="font-serif text-3xl text-slate-900 mt-3">Where We Deploy {service.title}</h2>
            </AnimSection>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {((service as any).applications as string[]).map((app: string) => (
                <div key={app} className="bg-white rounded-xl p-4 text-center shadow-sm border border-slate-100">
                  <span className="text-slate-700 font-medium text-sm">{app}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* INSTALLATION PROCESS */}
      <section className="py-24 bg-[#0A1628]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimSection className="text-center mb-12">
            <span className="text-blue-300 text-sm font-semibold uppercase tracking-widest">Our Process</span>
            <h2 className="font-serif text-4xl text-white mt-3">How We Deliver Your {service.title}</h2>
          </AnimSection>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { step: "01", title: "Consultation", desc: "We begin with understanding your specific requirements, site conditions, and operational goals." },
              { step: "02", title: "System Design", desc: "Our engineers create a detailed solution architecture tailored to your infrastructure." },
              { step: "03", title: "Professional Installation", desc: "Certified engineers deploy the system with precision and minimal disruption." },
              { step: "04", title: "Testing & Commissioning", desc: "Every component is rigorously tested to ensure optimal, reliable performance." },
              { step: "05", title: "User Training", desc: "We train your staff to confidently operate and manage the installed system." },
              { step: "06", title: "AMC & Support", desc: "Ongoing maintenance and 24×7 technical support to ensure system longevity." },
            ].map((s, i) => (
              <AnimSection key={i}>
                <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                  <div className="text-blue-400 font-bold text-2xl font-serif mb-3">{s.step}</div>
                  <h4 className="text-white font-bold mb-2">{s.title}</h4>
                  <p className="text-blue-100/60 text-sm leading-relaxed">{s.desc}</p>
                </div>
              </AnimSection>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE VRAT FOR THIS */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimSection>
              <span className="text-blue-600 text-sm font-semibold uppercase tracking-widest">Why Choose VRAT</span>
              <h2 className="font-serif text-4xl text-slate-900 mt-3 mb-6">
                The Right Partner for Your {service.title.split(" ")[0]} Needs
              </h2>
              <div className="space-y-4">
                {[
                  "17+ years of field experience across multiple industries",
                  "Certified engineers with specialized technical expertise",
                  "Globally trusted technology brands and products",
                  "End-to-end project management from design to commissioning",
                  "24×7 technical support and Annual Maintenance Contracts",
                  "Customized solutions designed to your budget and requirements",
                ].map((point, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center shrink-0 mt-0.5">
                      <svg className="w-3.5 h-3.5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-slate-700 text-sm">{point}</span>
                  </div>
                ))}
              </div>
            </AnimSection>
            <AnimSection>
              <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100">
                <h3 className="font-bold text-slate-900 text-xl mb-6">Technology Partners We Use</h3>
                <div className="grid grid-cols-2 gap-3">
                  {PARTNERS.slice(0, 8).map((p) => (
                    <div key={p} className="flex items-center justify-center p-3 bg-white rounded-xl border border-slate-100 text-slate-600 text-sm font-semibold">
                      {p}
                    </div>
                  ))}
                </div>
              </div>
            </AnimSection>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimSection className="text-center mb-12">
            <span className="text-blue-600 text-sm font-semibold uppercase tracking-widest">FAQ</span>
            <h2 className="font-serif text-4xl text-slate-900 mt-3">Common Questions about {service.title}</h2>
          </AnimSection>
          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <AnimSection key={i}>
                <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between p-5 text-left hover:bg-slate-50 transition-colors"
                  >
                    <span className="font-semibold text-slate-900 pr-4">{faq.q}</span>
                    <svg className={`w-5 h-5 text-blue-600 shrink-0 transition-transform ${openFaq === i ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {openFaq === i && (
                    <div className="px-5 pb-5 text-slate-600 text-sm leading-relaxed border-t border-slate-100 pt-4">{faq.a}</div>
                  )}
                </div>
              </AnimSection>
            ))}
          </div>
        </div>
      </section>

      {/* RELATED SERVICES */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimSection className="text-center mb-12">
            <h2 className="font-serif text-3xl text-slate-900">Related Services</h2>
          </AnimSection>
          <div className="grid sm:grid-cols-3 gap-6">
            {otherServices.map((s) => (
              <Link key={s.id} to={s.slug} className="group bg-white border border-slate-100 rounded-xl overflow-hidden shadow-sm card-hover block">
                <div className="h-36 overflow-hidden">
                  <img src={s.image} alt={s.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-400" loading="lazy" />
                </div>
                <div className="p-5">
                  <span className="text-2xl block mb-2">{s.icon}</span>
                  <h3 className="font-bold text-slate-900 mb-2">{s.title}</h3>
                  <p className="text-slate-600 text-xs leading-relaxed">{s.shortDesc.slice(0, 80)}...</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimSection>
            <h2 className="font-serif text-4xl text-white mb-5">
              Ready to Implement {service.title}?
            </h2>
            <p className="text-blue-100 text-lg mb-8">
              Get a customized solution designed for your infrastructure. Our experts are ready to help.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/contact" className="px-8 py-4 bg-white text-blue-700 font-bold rounded-xl hover:bg-blue-50 transition-all">
                Get a Free Quote
              </Link>
              <Link to="/contact" className="px-8 py-4 bg-blue-700 hover:bg-blue-800 text-white font-semibold rounded-xl border border-blue-500 transition-all">
                Talk to an Expert
              </Link>
            </div>
          </AnimSection>
        </div>
      </section>
    </div>
  );
}
