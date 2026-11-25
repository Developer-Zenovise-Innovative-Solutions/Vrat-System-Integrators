import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useCMS } from "../context/CMSContext";
import { sendEmailNotification } from "../lib/emailService";
import { INITIAL_HOME_PAGE_DATA } from "../data/initialData";
import { HomePageSectionId } from "../types";

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setInView(true);
      },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function AnimSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const { ref, inView } = useInView();
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${className}`}
    >
      {children}
    </div>
  );
}

export default function Home() {
  const {
    homePageData,
    heroConfigs,
    partners,
    submitLead,
    leads,
    services,
    testimonials,
    settings,
  } = useCMS();

  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [newsError, setNewsError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Active home page data merging with default fallback
  const activeData = homePageData || INITIAL_HOME_PAGE_DATA;
  const sectionOrder = activeData.sectionOrder || INITIAL_HOME_PAGE_DATA.sectionOrder;
  const sectionVisibility = activeData.sectionVisibility || INITIAL_HOME_PAGE_DATA.sectionVisibility;

  // Prioritize home hero from heroConfigs if specifically edited there, else homePageData.hero
  const homeHero = {
    badge: activeData.hero?.badge || "Trusted Security Solutions Across India",
    heading: heroConfigs["home"]?.heading || activeData.hero?.heading || INITIAL_HOME_PAGE_DATA.hero.heading,
    subtitle: heroConfigs["home"]?.subtitle || activeData.hero?.subtitle || INITIAL_HOME_PAGE_DATA.hero.subtitle,
    backgroundImage: heroConfigs["home"]?.backgroundImage || activeData.hero?.backgroundImage || INITIAL_HOME_PAGE_DATA.hero.backgroundImage,
    primaryCtaText: heroConfigs["home"]?.primaryCtaText || activeData.hero?.primaryCtaText || "Request a Free Site Survey",
    primaryCtaLink: heroConfigs["home"]?.primaryCtaLink || activeData.hero?.primaryCtaLink || "/contact",
    secondaryCtaText: heroConfigs["home"]?.secondaryCtaText || activeData.hero?.secondaryCtaText || "Explore Our Solutions",
    secondaryCtaLink: heroConfigs["home"]?.secondaryCtaLink || activeData.hero?.secondaryCtaLink || "/services",
  };

  const displayServices = services && services.length > 0
    ? services.filter((s) => s.status !== "Draft").slice(0, 6)
    : [];

  const displayTestimonials = testimonials && testimonials.length > 0
    ? testimonials.filter((t) => t.status !== "Draft")
    : [];

  useEffect(() => {
    if (displayTestimonials.length <= 1) return;
    const t = setInterval(() => setActiveTestimonial((p) => (p + 1) % displayTestimonials.length), 5000);
    return () => clearInterval(t);
  }, [displayTestimonials.length]);

  const handleHomeNewsletter = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    const trimmed = email.trim().toLowerCase();
    const isDuplicate = leads.some(
      (l) => l.type === "Newsletter" && l.email?.trim().toLowerCase() === trimmed
    );

    if (isDuplicate) {
      setNewsError("You are already subscribed to our newsletter!");
      setTimeout(() => setNewsError(""), 3500);
      return;
    }

    setSubmitting(true);
    setNewsError("");

    try {
      submitLead({
        type: "Newsletter",
        name: "Website Visitor",
        email: trimmed,
        message: "Subscribed via Home Page Newsletter",
      });

      await sendEmailNotification({
        formType: "Newsletter Subscription",
        name: "Website Visitor",
        email: trimmed,
        subject: `[New Newsletter Subscriber] ${trimmed}`,
        message: `A new visitor subscribed to the VRAT newsletter from the Home Page.`,
        details: {
          Source: "Home Page Banner",
          "Subscriber Email": trimmed,
          "Subscription Time": new Date().toLocaleString(),
        },
      });

      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 4000);
    } catch (err: any) {
      setNewsError(err.message || "Failed to subscribe. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const renderSection = (sectionId: HomePageSectionId) => {
    switch (sectionId) {
      case "hero":
        return (
          <section key="hero" className="relative min-h-screen flex items-center gradient-navy overflow-hidden">
            <div className="absolute inset-0">
              <img
                src={homeHero.backgroundImage || INITIAL_HOME_PAGE_DATA.hero.backgroundImage}
                alt="Security command center with CCTV monitoring"
                className="w-full h-full object-cover opacity-20"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0A1628]/95 via-[#0A1628]/80 to-[#162B56]/70" />
            </div>

            {/* Subtle grid pattern */}
            <div
              className="absolute inset-0 opacity-5"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(96,165,250,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(96,165,250,0.5) 1px, transparent 1px)",
                backgroundSize: "48px 48px",
              }}
            />

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
              <div className="max-w-3xl">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/15 border border-blue-400/25 mb-8 animate-fade-up">
                  <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                  <span className="text-blue-200 text-sm font-medium tracking-wide">
                    {homeHero.badge}
                  </span>
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
        );

      case "trust_stats":
        return (
          <section key="trust_stats" className="bg-white border-b border-slate-100 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <p className="text-center text-slate-400 text-xs font-semibold tracking-widest uppercase mb-6">
                {activeData.trustStats?.label || "Trusted by Businesses Across India"}
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 text-center">
                {(activeData.trustStats?.items || INITIAL_HOME_PAGE_DATA.trustStats.items).map((s, idx) => (
                  <div key={idx} className="flex flex-col items-center gap-1">
                    <span className="text-2xl font-bold text-blue-700 font-serif">{s.value}</span>
                    <span className="text-xs text-slate-500 font-medium">{s.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );

      case "about":
        return (
          <section key="about" className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                <AnimSection>
                  <span className="text-blue-600 text-sm font-semibold uppercase tracking-widest">
                    {activeData.about?.badge || "Who We Are"}
                  </span>
                  <h2 className="font-serif text-4xl lg:text-5xl text-slate-900 mt-3 mb-6 leading-tight">
                    {activeData.about?.heading || "India's Trusted System Integration Partner"}
                  </h2>
                  <p className="text-slate-600 leading-relaxed mb-5">
                    {activeData.about?.p1 || INITIAL_HOME_PAGE_DATA.about.p1}
                  </p>
                  <p className="text-slate-600 leading-relaxed mb-5">
                    {activeData.about?.p2 || INITIAL_HOME_PAGE_DATA.about.p2}
                  </p>
                  <p className="text-slate-600 leading-relaxed mb-8">
                    {activeData.about?.p3 || INITIAL_HOME_PAGE_DATA.about.p3}
                  </p>
                  <Link
                    to={activeData.about?.buttonLink || "/about"}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all"
                  >
                    {activeData.about?.buttonText || "Learn More About Us"}
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </AnimSection>

                <AnimSection className="relative">
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-blue-900/20">
                    <img
                      src={activeData.about?.image || INITIAL_HOME_PAGE_DATA.about.image}
                      alt="VRAT System Integrators team"
                      className="w-full h-[420px] object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-900/50 to-transparent" />
                  </div>
                  {/* Floating stat card */}
                  <div className="absolute -bottom-6 -left-6 bg-white rounded-xl p-5 shadow-xl shadow-blue-900/15 border border-blue-50">
                    <div className="text-3xl font-bold text-blue-700 font-serif">
                      {activeData.about?.statValue || "98%"}
                    </div>
                    <div className="text-sm text-slate-500 mt-1">
                      {activeData.about?.statLabel || "Customer Satisfaction Rate"}
                    </div>
                  </div>
                </AnimSection>
              </div>
            </div>
          </section>
        );

      case "why_choose":
        return (
          <section key="why_choose" className="py-24 bg-slate-50 section-pattern">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <AnimSection className="text-center mb-16">
                <span className="text-blue-600 text-sm font-semibold uppercase tracking-widest">
                  {activeData.whyChoose?.badge || "Why Choose Us"}
                </span>
                <h2 className="font-serif text-4xl lg:text-5xl text-slate-900 mt-3 mb-5">
                  {activeData.whyChoose?.heading || "Why Organizations Choose VRAT"}
                </h2>
                <p className="text-slate-600 text-lg max-w-2xl mx-auto">
                  {activeData.whyChoose?.description || INITIAL_HOME_PAGE_DATA.whyChoose.description}
                </p>
              </AnimSection>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {(activeData.whyChoose?.items || INITIAL_HOME_PAGE_DATA.whyChoose.items).map((item, i) => (
                  <AnimSection key={i} className={`delay-${(i % 3) * 100 + 100}`}>
                    <div className="bg-white rounded-2xl p-7 shadow-sm border border-slate-100 card-hover h-full">
                      <div className="w-12 h-12 rounded-xl bg-blue-600/10 flex items-center justify-center mb-5">
                        <span className="text-blue-600 text-xl font-bold">✓</span>
                      </div>
                      <h3 className="text-lg font-bold text-slate-900 mb-3">{item.title}</h3>
                      <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </AnimSection>
                ))}
              </div>
            </div>
          </section>
        );

      case "services":
        return (
          <section key="services" className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <AnimSection className="text-center mb-16">
                <span className="text-blue-600 text-sm font-semibold uppercase tracking-widest">
                  {activeData.services?.badge || "Our Services"}
                </span>
                <h2 className="font-serif text-4xl lg:text-5xl text-slate-900 mt-3 mb-5">
                  {activeData.services?.heading || "Comprehensive Security & Technology Solutions"}
                </h2>
                <p className="text-slate-600 text-lg max-w-2xl mx-auto">
                  {activeData.services?.subtitle || "We provide integrated solutions that enhance safety, communication, automation, and operational efficiency."}
                </p>
              </AnimSection>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayServices.map((service) => (
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
                      </div>
                      <div className="p-6 flex flex-col flex-1">
                        <h3 className="font-bold text-slate-900 text-lg mb-2">{service.title}</h3>
                        <p className="text-slate-600 text-sm leading-relaxed flex-1 mb-4">{service.shortDesc}</p>
                        <Link
                          to={service.slug.startsWith("/") ? service.slug : `/services/${service.slug}`}
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
                  to={activeData.services?.buttonLink || "/services"}
                  className="inline-flex items-center gap-2 px-8 py-4 border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-semibold rounded-xl transition-all"
                >
                  {activeData.services?.buttonText || "View All Services"}
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </AnimSection>
            </div>
          </section>
        );

      case "industries":
        return (
          <section key="industries" className="py-24 bg-[#0A1628]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <AnimSection className="text-center mb-16">
                <span className="text-blue-300 text-sm font-semibold uppercase tracking-widest">
                  {activeData.industries?.badge || "Industries We Serve"}
                </span>
                <h2 className="font-serif text-4xl lg:text-5xl text-white mt-3 mb-5">
                  {activeData.industries?.heading || "Serving Diverse Industries"}
                </h2>
                <p className="text-blue-100/70 text-lg max-w-2xl mx-auto">
                  {activeData.industries?.subtitle || "Our expertise spans multiple industries, delivering customized security and automation solutions."}
                </p>
              </AnimSection>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                {(activeData.industries?.items || INITIAL_HOME_PAGE_DATA.industries.items).map((ind) => (
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
                        {ind.icon && <div className="text-lg mb-1">{ind.icon}</div>}
                        <div className="text-white text-xs font-semibold leading-tight">{ind.title}</div>
                      </div>
                    </Link>
                  </AnimSection>
                ))}
              </div>
            </div>
          </section>
        );

      case "process":
        return (
          <section key="process" className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <AnimSection className="text-center mb-16">
                <span className="text-blue-600 text-sm font-semibold uppercase tracking-widest">
                  {activeData.process?.badge || "Our Process"}
                </span>
                <h2 className="font-serif text-4xl lg:text-5xl text-slate-900 mt-3 mb-5">
                  {activeData.process?.heading || "How We Deliver Success"}
                </h2>
              </AnimSection>

              <div className="relative">
                <div
                  className="hidden lg:block absolute top-8 left-0 right-0 h-0.5 bg-blue-100 z-0"
                  style={{ marginLeft: "8.33%", marginRight: "8.33%" }}
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-8 relative z-10">
                  {(activeData.process?.steps || INITIAL_HOME_PAGE_DATA.process.steps).map((step, i) => (
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
        );

      case "projects":
        return (
          <section key="projects" className="py-24 bg-slate-50 section-pattern">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <AnimSection className="text-center mb-16">
                <span className="text-blue-600 text-sm font-semibold uppercase tracking-widest">
                  {activeData.projects?.badge || "Featured Projects"}
                </span>
                <h2 className="font-serif text-4xl lg:text-5xl text-slate-900 mt-3 mb-5">
                  {activeData.projects?.heading || "Delivering Excellence Across Industries"}
                </h2>
                <p className="text-slate-600 text-lg max-w-2xl mx-auto">
                  {activeData.projects?.subtitle || INITIAL_HOME_PAGE_DATA.projects.subtitle}
                </p>
              </AnimSection>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {(activeData.projects?.items || INITIAL_HOME_PAGE_DATA.projects.items || []).map((p, i) => (
                  <AnimSection key={i}>
                    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 card-hover h-full flex flex-col">
                      <div className="relative h-48">
                        <img src={p.image} alt={p.title} className="w-full h-full object-cover" loading="lazy" />
                        <div className="absolute top-4 right-4 px-3 py-1 bg-blue-600 text-white text-xs font-semibold rounded-full">
                          {p.sector}
                        </div>
                      </div>
                      <div className="p-6 flex flex-col flex-1">
                        <h3 className="font-bold text-slate-900 text-lg mb-2">{p.title}</h3>
                        <p className="text-slate-600 text-sm mb-4 flex-1">{p.desc}</p>
                        <div className="flex flex-wrap gap-2">
                          {p.services.map((s) => (
                            <span key={s} className="px-2.5 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-lg">
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </AnimSection>
                ))}
              </div>

              <AnimSection className="text-center mt-12">
                <Link
                  to={activeData.projects?.buttonLink || "/projects"}
                  className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all"
                >
                  {activeData.projects?.buttonText || "View All Projects"}
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </AnimSection>
            </div>
          </section>
        );

      case "partners":
        return (
          <section key="partners" className="py-20 bg-white border-y border-slate-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <AnimSection className="text-center mb-12">
                <span className="text-blue-600 text-sm font-semibold uppercase tracking-widest">
                  {activeData.partners?.badge || "Technology Partners"}
                </span>
                <h2 className="font-serif text-3xl text-slate-900 mt-3">
                  {activeData.partners?.heading || "Technology Partners We Trust"}
                </h2>
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
                    <span className="text-slate-800 font-bold text-sm text-center leading-tight group-hover:text-blue-600 transition">
                      {p.name}
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium mt-1">{p.category}</span>
                  </a>
                ))}
              </div>
            </div>
          </section>
        );

      case "stats":
        return (
          <section key="stats" className="py-24 gradient-navy">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <AnimSection className="text-center mb-16">
                <h2 className="font-serif text-4xl lg:text-5xl text-white mb-4">
                  {activeData.stats?.heading || "Our Numbers Speak for Themselves"}
                </h2>
              </AnimSection>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8">
                {(activeData.stats?.items || INITIAL_HOME_PAGE_DATA.stats.items).map((s, i) => (
                  <AnimSection key={i} className="text-center">
                    <div className="text-4xl font-bold text-blue-300 font-serif mb-2">{s.value}</div>
                    <div className="text-blue-100/70 text-sm">{s.label}</div>
                  </AnimSection>
                ))}
              </div>
            </div>
          </section>
        );

      case "testimonials":
        return (
          <section key="testimonials" className="py-24 bg-white">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              <AnimSection className="text-center mb-16">
                <span className="text-blue-600 text-sm font-semibold uppercase tracking-widest">
                  {activeData.testimonials?.badge || "Testimonials"}
                </span>
                <h2 className="font-serif text-4xl lg:text-5xl text-slate-900 mt-3">
                  {activeData.testimonials?.heading || "What Our Clients Say"}
                </h2>
              </AnimSection>

              <div className="relative bg-gradient-to-br from-blue-50 to-white rounded-3xl p-10 shadow-lg border border-blue-100">
                <svg className="w-12 h-12 text-blue-200 mb-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
                {displayTestimonials.length > 0 && (
                  <>
                    <p className="text-slate-700 text-xl leading-relaxed mb-8 font-medium italic">
                      "{displayTestimonials[activeTestimonial % displayTestimonials.length].quote}"
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {displayTestimonials[activeTestimonial % displayTestimonials.length].avatar && (
                          <img
                            src={displayTestimonials[activeTestimonial % displayTestimonials.length].avatar}
                            alt="Client"
                            className="w-10 h-10 rounded-full object-cover border border-blue-200"
                          />
                        )}
                        <div>
                          <div className="font-bold text-slate-900">
                            {displayTestimonials[activeTestimonial % displayTestimonials.length].name ||
                              (displayTestimonials[activeTestimonial % displayTestimonials.length] as any).client}
                          </div>
                          <div className="text-blue-600 text-sm">
                            {displayTestimonials[activeTestimonial % displayTestimonials.length].company ||
                              (displayTestimonials[activeTestimonial % displayTestimonials.length] as any).sector}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        {displayTestimonials.map((_, i) => (
                          <button
                            key={i}
                            onClick={() => setActiveTestimonial(i)}
                            className={`w-2.5 h-2.5 rounded-full transition-all ${
                              i === activeTestimonial % displayTestimonials.length ? "bg-blue-600 w-6" : "bg-blue-200"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </section>
        );

      case "cta":
        return (
          <section key="cta" className="py-24 bg-blue-600">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <AnimSection>
                <h2 className="font-serif text-4xl lg:text-5xl text-white mb-5">
                  {activeData.cta?.heading || "Ready to Strengthen Your Security Infrastructure?"}
                </h2>
                <p className="text-blue-100 text-lg mb-10 max-w-2xl mx-auto">
                  {activeData.cta?.description ||
                    "Protect your organization with intelligent, reliable, and scalable security solutions tailored to your needs."}
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Link
                    to={activeData.cta?.primaryBtnLink || "/contact"}
                    className="px-8 py-4 bg-white text-blue-700 font-bold rounded-xl hover:bg-blue-50 transition-all shadow-lg"
                  >
                    {activeData.cta?.primaryBtnText || "Schedule a Consultation"}
                  </Link>
                  <Link
                    to={activeData.cta?.secondaryBtnLink || "/contact"}
                    className="px-8 py-4 bg-blue-700 hover:bg-blue-800 text-white font-semibold rounded-xl border border-blue-500 transition-all"
                  >
                    {activeData.cta?.secondaryBtnText || "Request a Site Survey"}
                  </Link>
                </div>
              </AnimSection>
            </div>
          </section>
        );

      case "newsletter":
        return (
          <section key="newsletter" className="py-16 bg-slate-900">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h3 className="text-white font-bold text-2xl mb-3">
                {activeData.newsletter?.heading || "Stay Updated"}
              </h3>
              <p className="text-slate-400 text-sm mb-6">
                {activeData.newsletter?.description ||
                  "Subscribe to receive the latest updates on security technologies, industry trends, and company news."}
              </p>

              {subscribed ? (
                <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400 text-sm font-semibold max-w-md mx-auto">
                  ✓ Thank you for subscribing! Check your inbox for confirmation.
                </div>
              ) : (
                <form onSubmit={handleHomeNewsletter} className="flex flex-col gap-2 max-w-md mx-auto">
                  <div className="flex gap-3">
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
                      disabled={submitting}
                      className="px-6 py-3 bg-blue-600 hover:bg-blue-500 disabled:opacity-60 text-white font-semibold rounded-xl text-sm transition-colors whitespace-nowrap"
                    >
                      {submitting
                        ? "Subscribing..."
                        : activeData.newsletter?.buttonText || "Subscribe"}
                    </button>
                  </div>
                  {newsError && <div className="text-rose-400 text-xs text-left">{newsError}</div>}
                </form>
              )}
            </div>
          </section>
        );

      default:
        return null;
    }
  };

  return (
    <div className="overflow-x-hidden">
      {sectionOrder.map((sectionId) => {
        if (sectionVisibility[sectionId] === false) return null;
        return <React.Fragment key={sectionId}>{renderSection(sectionId)}</React.Fragment>;
      })}
    </div>
  );
}
