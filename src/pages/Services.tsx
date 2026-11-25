import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useCMS } from "../context/CMSContext";
import { SERVICES as DEFAULT_SERVICES } from "../data";
import { INITIAL_SERVICES_PAGE_DATA } from "../data/initialData";
import { ServicesPageSectionId } from "../types";

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

export default function Services() {
  const { services, servicesPageData } = useCMS();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const pageData = servicesPageData || INITIAL_SERVICES_PAGE_DATA;
  const {
    sectionOrder = INITIAL_SERVICES_PAGE_DATA.sectionOrder,
    sectionVisibility = INITIAL_SERVICES_PAGE_DATA.sectionVisibility,
    hero = INITIAL_SERVICES_PAGE_DATA.hero,
    intro = INITIAL_SERVICES_PAGE_DATA.intro,
    servicesGrid = INITIAL_SERVICES_PAGE_DATA.servicesGrid,
    whyChoose = INITIAL_SERVICES_PAGE_DATA.whyChoose,
    industries = INITIAL_SERVICES_PAGE_DATA.industries,
    process = INITIAL_SERVICES_PAGE_DATA.process,
    stats = INITIAL_SERVICES_PAGE_DATA.stats,
    faqs = INITIAL_SERVICES_PAGE_DATA.faqs,
    cta = INITIAL_SERVICES_PAGE_DATA.cta,
  } = pageData;

  const activeServices = services && services.length > 0
    ? services.filter((s) => s.status !== "Draft")
    : DEFAULT_SERVICES;

  // 1. HERO SECTION
  const renderHero = () => (
    <section key="hero" className="relative py-32 gradient-navy overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={hero.backgroundImage || "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&h=600&fit=crop&auto=format"}
          alt="Electronic security systems command center"
          className="w-full h-full object-cover opacity-15"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A1628]/95 to-[#162B56]/80" />
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl animate-fade-up">
          {hero.badge && (
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/15 border border-blue-400/25 mb-6">
              <span className="text-blue-300 text-sm font-medium">{hero.badge}</span>
            </div>
          )}
          <h1 className="font-serif text-5xl lg:text-6xl text-white leading-tight mb-6">
            {hero.heading}
          </h1>
          <p className="text-blue-100/80 text-xl leading-relaxed mb-8">
            {hero.subtitle}
          </p>
          <div className="flex flex-wrap gap-4">
            {hero.primaryCtaText && (
              <Link
                to={hero.primaryCtaLink || "/contact"}
                className="px-7 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition-all shadow-lg shadow-blue-600/30"
              >
                {hero.primaryCtaText}
              </Link>
            )}
            {hero.secondaryCtaText && (
              <Link
                to={hero.secondaryCtaLink || "/downloads"}
                className="px-7 py-3.5 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl border border-white/25 transition-all"
              >
                {hero.secondaryCtaText}
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );

  // 2. INTRO SECTION
  const renderIntro = () => (
    <section key="intro" className="py-20 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <AnimSection>
          <h2 className="font-serif text-4xl text-slate-900 mb-6">{intro.heading}</h2>
          {intro.p1 && (
            <p className="text-slate-600 text-lg leading-relaxed mb-5">
              {intro.p1}
            </p>
          )}
          {intro.p2 && (
            <p className="text-slate-600 text-lg leading-relaxed">
              {intro.p2}
            </p>
          )}
        </AnimSection>
      </div>
    </section>
  );

  // 3. SERVICES GRID
  const renderServicesGrid = () => (
    <section key="services_grid" className="py-10 pb-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {servicesGrid.badge && (
          <AnimSection className="text-center mb-12">
            <span className="text-blue-600 text-sm font-semibold uppercase tracking-widest">
              {servicesGrid.badge}
            </span>
          </AnimSection>
        )}

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {activeServices.map((service) => (
            <AnimSection key={service.id}>
              <div className="group bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm card-hover h-full flex flex-col">
                <div className="relative h-52 overflow-hidden bg-blue-50">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                  <span className="absolute top-4 left-4 text-3xl">{service.icon}</span>
                </div>
                <div className="p-7 flex flex-col flex-1">
                  <h3 className="font-bold text-slate-900 text-xl mb-3">{service.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-4 flex-1">{service.overview || service.shortDesc}</p>

                  {/* Features */}
                  {service.features && service.features.length > 0 && (
                    <div className="mb-5">
                      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">What We Offer</p>
                      <div className="flex flex-wrap gap-1.5">
                        {service.features.slice(0, 5).map((f) => (
                          <span key={f} className="px-2 py-0.5 bg-blue-50 text-blue-700 text-xs rounded-md">{f}</span>
                        ))}
                        {service.features.length > 5 && (
                          <span className="px-2 py-0.5 bg-slate-100 text-slate-500 text-xs rounded-md">+{service.features.length - 5} more</span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Benefits */}
                  {service.benefits && service.benefits.length > 0 && (
                    <div className="border-t border-slate-100 pt-4 mb-5">
                      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Key Benefits</p>
                      <ul className="space-y-1">
                        {service.benefits.slice(0, 3).map((b) => (
                          <li key={b} className="flex items-center gap-2 text-xs text-slate-600">
                            <svg className="w-3.5 h-3.5 text-green-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                            </svg>
                            {b}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <Link
                    to={service.slug.startsWith("/") ? service.slug : `/services/${service.slug}`}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl transition-all shadow-md shadow-blue-600/20"
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
      </div>
    </section>
  );

  // 4. WHY CHOOSE OUR SERVICES
  const renderWhyChoose = () => (
    <section key="why_choose" className="py-24 bg-slate-50 section-pattern">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimSection className="text-center mb-12">
          {whyChoose.badge && (
            <span className="text-blue-600 text-sm font-semibold uppercase tracking-widest">
              {whyChoose.badge}
            </span>
          )}
          <h2 className="font-serif text-4xl text-slate-900 mt-3 mb-4">{whyChoose.heading}</h2>
          {whyChoose.subtitle && (
            <p className="text-slate-600 max-w-2xl mx-auto">
              {whyChoose.subtitle}
            </p>
          )}
        </AnimSection>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {whyChoose.items.map((b, i) => (
            <AnimSection key={i}>
              <div className="bg-white rounded-xl p-5 flex items-center gap-3 shadow-sm border border-slate-100">
                <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center shrink-0">
                  <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-slate-700 text-sm font-medium">{b}</span>
              </div>
            </AnimSection>
          ))}
        </div>
      </div>
    </section>
  );

  // 5. INDUSTRIES WE SERVE
  const renderIndustries = () => (
    <section key="industries" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimSection className="text-center mb-12">
          {industries.badge && (
            <span className="text-blue-600 text-sm font-semibold uppercase tracking-widest">
              {industries.badge}
            </span>
          )}
          <h2 className="font-serif text-4xl text-slate-900 mt-3">{industries.heading}</h2>
        </AnimSection>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {industries.items.map((ind, i) => (
            <AnimSection key={i}>
              <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
                <h4 className="font-bold text-blue-900 mb-2">{ind.name}</h4>
                <p className="text-blue-700/80 text-sm">{ind.desc}</p>
              </div>
            </AnimSection>
          ))}
        </div>
      </div>
    </section>
  );

  // 6. SERVICE PROCESS
  const renderProcess = () => (
    <section key="process" className="py-24 bg-[#0A1628]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimSection className="text-center mb-16">
          {process.badge && (
            <span className="text-blue-300 text-sm font-semibold uppercase tracking-widest">
              {process.badge}
            </span>
          )}
          <h2 className="font-serif text-4xl text-white mt-3">{process.heading}</h2>
        </AnimSection>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {process.steps.map((s, i) => (
            <AnimSection key={i}>
              <div className="bg-white/5 rounded-xl p-5 border border-white/10 hover:border-blue-500/30 transition-colors">
                <div className="text-blue-400 font-bold text-2xl font-serif mb-3">{s.step}</div>
                <h4 className="text-white font-bold mb-2">{s.title}</h4>
                <p className="text-blue-100/60 text-sm">{s.desc}</p>
              </div>
            </AnimSection>
          ))}
        </div>
      </div>
    </section>
  );

  // 7. STATS / HIGHLIGHTS
  const renderStats = () => (
    <section key="stats" className="py-16 bg-blue-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 text-center text-white">
          {stats.items.map((h, i) => (
            <div key={i} className="font-bold text-sm">{h}</div>
          ))}
        </div>
      </div>
    </section>
  );

  // 8. FAQS
  const renderFaqs = () => (
    <section key="faqs" className="py-24 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimSection className="text-center mb-12">
          {faqs.badge && (
            <span className="text-blue-600 text-sm font-semibold uppercase tracking-widest">
              {faqs.badge}
            </span>
          )}
          <h2 className="font-serif text-4xl text-slate-900 mt-3">{faqs.heading}</h2>
        </AnimSection>
        <div className="space-y-3">
          {faqs.items.map((faq, i) => (
            <AnimSection key={i}>
              <div className="border border-slate-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-slate-50 transition-colors"
                >
                  <span className="font-semibold text-slate-900 pr-4">{faq.q}</span>
                  <svg
                    className={`w-5 h-5 text-blue-600 shrink-0 transition-transform ${openFaq === i ? "rotate-180" : ""}`}
                    fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5 text-slate-600 text-sm leading-relaxed border-t border-slate-100 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            </AnimSection>
          ))}
        </div>
      </div>
    </section>
  );

  // 9. CTA
  const renderCta = () => (
    <section key="cta" className="py-24 bg-slate-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <AnimSection>
          <h2 className="font-serif text-4xl text-slate-900 mb-5">{cta.heading}</h2>
          <p className="text-slate-600 text-lg mb-8">
            {cta.subtitle}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {cta.primaryBtnText && (
              <Link
                to={cta.primaryBtnLink || "/contact"}
                className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-600/25"
              >
                {cta.primaryBtnText}
              </Link>
            )}
            {cta.secondaryBtnText && (
              <Link
                to={cta.secondaryBtnLink || "/contact"}
                className="px-8 py-4 border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-semibold rounded-xl transition-all"
              >
                {cta.secondaryBtnText}
              </Link>
            )}
          </div>
        </AnimSection>
      </div>
    </section>
  );

  return (
    <div className="overflow-x-hidden">
      {sectionOrder.map((sectionId: ServicesPageSectionId) => {
        if (sectionVisibility && sectionVisibility[sectionId] === false) {
          return null;
        }
        switch (sectionId) {
          case "hero":
            return renderHero();
          case "intro":
            return renderIntro();
          case "services_grid":
            return renderServicesGrid();
          case "why_choose":
            return renderWhyChoose();
          case "industries":
            return renderIndustries();
          case "process":
            return renderProcess();
          case "stats":
            return renderStats();
          case "faqs":
            return renderFaqs();
          case "cta":
            return renderCta();
          default:
            return null;
        }
      })}
    </div>
  );
}
