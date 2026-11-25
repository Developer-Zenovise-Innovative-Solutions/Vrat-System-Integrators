import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useCMS } from "../context/CMSContext";
import { INITIAL_ABOUT_PAGE_DATA } from "../data/initialData";
import { AboutPageSectionId } from "../types";

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

export default function About() {
  const { aboutPageData, heroConfigs, settings, partners } = useCMS();

  const activeData = aboutPageData || INITIAL_ABOUT_PAGE_DATA;
  const sectionOrder = activeData.sectionOrder || INITIAL_ABOUT_PAGE_DATA.sectionOrder;
  const sectionVisibility = activeData.sectionVisibility || INITIAL_ABOUT_PAGE_DATA.sectionVisibility;

  const aboutHero = {
    badge: activeData.hero?.badge || "About VRAT System",
    heading: heroConfigs["about"]?.heading || activeData.hero?.heading || INITIAL_ABOUT_PAGE_DATA.hero.heading,
    subtitle: heroConfigs["about"]?.subtitle || activeData.hero?.subtitle || INITIAL_ABOUT_PAGE_DATA.hero.subtitle,
    backgroundImage: heroConfigs["about"]?.backgroundImage || activeData.hero?.backgroundImage || INITIAL_ABOUT_PAGE_DATA.hero.backgroundImage,
    primaryCtaText: heroConfigs["about"]?.primaryCtaText || activeData.hero?.primaryCtaText || "Meet Our Team",
    primaryCtaLink: heroConfigs["about"]?.primaryCtaLink || activeData.hero?.primaryCtaLink || "#team",
    secondaryCtaText: heroConfigs["about"]?.secondaryCtaText || activeData.hero?.secondaryCtaText || "Contact Our Experts",
    secondaryCtaLink: heroConfigs["about"]?.secondaryCtaLink || activeData.hero?.secondaryCtaLink || "/contact",
  };

  const renderSection = (sectionId: AboutPageSectionId) => {
    switch (sectionId) {
      case "hero":
        return (
          <section key="hero" className="relative py-32 gradient-navy overflow-hidden">
            <div className="absolute inset-0">
              <img
                src={aboutHero.backgroundImage || INITIAL_ABOUT_PAGE_DATA.hero.backgroundImage}
                alt="VRAT engineers working on security system installation"
                className="w-full h-full object-cover opacity-20"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0A1628]/95 to-[#162B56]/80" />
            </div>
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-3xl animate-fade-up">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/15 border border-blue-400/25 mb-6">
                  <span className="text-blue-300 text-sm font-medium">
                    {aboutHero.badge || `About ${settings.companyName || "VRAT System Integrators"}`}
                  </span>
                </div>
                <h1 className="font-serif text-5xl lg:text-6xl text-white leading-tight mb-6">
                  {aboutHero.heading}
                </h1>
                <p className="text-blue-100/80 text-xl leading-relaxed mb-8">
                  {aboutHero.subtitle}
                </p>
                <div className="flex flex-wrap gap-4">
                  {aboutHero.primaryCtaText && (
                    <a
                      href={aboutHero.primaryCtaLink || "#team"}
                      className="px-7 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition-all shadow-lg shadow-blue-600/30"
                    >
                      {aboutHero.primaryCtaText}
                    </a>
                  )}
                  {aboutHero.secondaryCtaText && (
                    <Link
                      to={aboutHero.secondaryCtaLink || "/contact"}
                      className="px-7 py-3.5 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl border border-white/25 transition-all"
                    >
                      {aboutHero.secondaryCtaText}
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </section>
        );

      case "who_we_are":
        return (
          <section key="who_we_are" className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                <AnimSection>
                  <span className="text-blue-600 text-sm font-semibold uppercase tracking-widest">
                    {activeData.whoWeAre?.badge || "Who We Are"}
                  </span>
                  <h2 className="font-serif text-4xl text-slate-900 mt-3 mb-6 leading-tight">
                    {activeData.whoWeAre?.heading || "A Leading Provider of Integrated Security Solutions"}
                  </h2>
                  <p className="text-slate-600 leading-relaxed mb-5">
                    {activeData.whoWeAre?.p1 || INITIAL_ABOUT_PAGE_DATA.whoWeAre.p1}
                  </p>
                  <p className="text-slate-600 leading-relaxed mb-5">
                    {activeData.whoWeAre?.p2 || INITIAL_ABOUT_PAGE_DATA.whoWeAre.p2}
                  </p>
                  <p className="text-slate-600 leading-relaxed">
                    {activeData.whoWeAre?.p3 || INITIAL_ABOUT_PAGE_DATA.whoWeAre.p3}
                  </p>
                </AnimSection>

                <AnimSection>
                  <div className="grid grid-cols-2 gap-4">
                    <img
                      src={activeData.whoWeAre?.images?.[0] || INITIAL_ABOUT_PAGE_DATA.whoWeAre.images[0]}
                      alt="CCTV monitoring command center"
                      className="rounded-xl object-cover h-48 w-full shadow-md"
                      loading="lazy"
                    />
                    <img
                      src={activeData.whoWeAre?.images?.[1] || INITIAL_ABOUT_PAGE_DATA.whoWeAre.images[1]}
                      alt="Security system installation"
                      className="rounded-xl object-cover h-48 w-full mt-8 shadow-md"
                      loading="lazy"
                    />
                    <img
                      src={activeData.whoWeAre?.images?.[2] || INITIAL_ABOUT_PAGE_DATA.whoWeAre.images[2]}
                      alt="Engineering team at work"
                      className="rounded-xl object-cover h-48 w-full shadow-md"
                      loading="lazy"
                    />
                    <img
                      src={activeData.whoWeAre?.images?.[3] || INITIAL_ABOUT_PAGE_DATA.whoWeAre.images[3]}
                      alt="Access control biometric system"
                      className="rounded-xl object-cover h-48 w-full mt-8 shadow-md"
                      loading="lazy"
                    />
                  </div>
                </AnimSection>
              </div>
            </div>
          </section>
        );

      case "story":
        return (
          <section key="story" className="py-20 bg-blue-600">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              <AnimSection className="text-center">
                <span className="text-blue-200 text-sm font-semibold uppercase tracking-widest">
                  {activeData.story?.badge || "Our Story"}
                </span>
                <h2 className="font-serif text-4xl text-white mt-3 mb-8">
                  {activeData.story?.heading || "Founded on a Vision of Security Excellence"}
                </h2>
                <p className="text-blue-100 text-lg leading-relaxed mb-5">
                  {activeData.story?.p1 || INITIAL_ABOUT_PAGE_DATA.story.p1}
                </p>
                <p className="text-blue-100 text-lg leading-relaxed mb-5">
                  {activeData.story?.p2 || INITIAL_ABOUT_PAGE_DATA.story.p2}
                </p>
                <p className="text-blue-100 text-lg leading-relaxed">
                  {activeData.story?.p3 || INITIAL_ABOUT_PAGE_DATA.story.p3}
                </p>
              </AnimSection>
            </div>
          </section>
        );

      case "vision_mission":
        return (
          <section key="vision_mission" className="py-24 bg-slate-50 section-pattern">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid lg:grid-cols-2 gap-8">
                <AnimSection>
                  <div className="bg-white rounded-2xl p-10 shadow-sm border border-slate-100 h-full">
                    <div className="w-14 h-14 rounded-xl bg-blue-600 flex items-center justify-center mb-6 shadow-md shadow-blue-600/30">
                      <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </div>
                    <h3 className="font-serif text-3xl text-slate-900 mb-4">
                      {activeData.visionMission?.visionTitle || "Our Vision"}
                    </h3>
                    <p className="text-slate-600 leading-relaxed text-lg">
                      {activeData.visionMission?.visionDesc || INITIAL_ABOUT_PAGE_DATA.visionMission.visionDesc}
                    </p>
                  </div>
                </AnimSection>

                <AnimSection>
                  <div className="bg-[#0A1628] rounded-2xl p-10 h-full shadow-xl">
                    <div className="w-14 h-14 rounded-xl bg-blue-600 flex items-center justify-center mb-6 shadow-md shadow-blue-600/30">
                      <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <h3 className="font-serif text-3xl text-white mb-4">
                      {activeData.visionMission?.missionTitle || "Our Mission"}
                    </h3>
                    <p className="text-blue-100/80 leading-relaxed mb-5">
                      {activeData.visionMission?.missionSubtitle || "Our mission is to deliver world-class security and technology solutions through:"}
                    </p>
                    <ul className="space-y-2.5">
                      {(activeData.visionMission?.missionPoints || INITIAL_ABOUT_PAGE_DATA.visionMission.missionPoints).map((m, i) => (
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
        );

      case "core_values":
        return (
          <section key="core_values" className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <AnimSection className="text-center mb-16">
                <span className="text-blue-600 text-sm font-semibold uppercase tracking-widest">
                  {activeData.coreValues?.badge || "Core Values"}
                </span>
                <h2 className="font-serif text-4xl text-slate-900 mt-3">
                  {activeData.coreValues?.heading || "The Principles That Guide Us"}
                </h2>
              </AnimSection>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {(activeData.coreValues?.items || INITIAL_ABOUT_PAGE_DATA.coreValues.items).map((v, i) => (
                  <AnimSection key={i}>
                    <div className="relative bg-white border border-slate-100 rounded-2xl p-7 shadow-sm card-hover overflow-hidden h-full flex flex-col">
                      <div className="absolute top-0 left-0 w-1.5 h-full bg-blue-600 rounded-l-2xl" />
                      <div className="text-blue-600 font-bold text-4xl font-serif opacity-15 absolute top-4 right-4">
                        {i + 1}
                      </div>
                      <h3 className="font-bold text-slate-900 text-lg mb-3">{v.title}</h3>
                      <p className="text-slate-600 text-sm leading-relaxed flex-1">{v.desc}</p>
                    </div>
                  </AnimSection>
                ))}
              </div>
            </div>
          </section>
        );

      case "timeline":
        return (
          <section key="timeline" className="py-24 bg-[#0A1628]">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <AnimSection className="text-center mb-16">
                <span className="text-blue-300 text-sm font-semibold uppercase tracking-widest">
                  {activeData.timeline?.badge || "Company Timeline"}
                </span>
                <h2 className="font-serif text-4xl text-white mt-3">
                  {activeData.timeline?.heading || "Our Growth Journey"}
                </h2>
              </AnimSection>

              <div className="relative">
                <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-blue-900" />
                <div className="space-y-8">
                  {(activeData.timeline?.items || INITIAL_ABOUT_PAGE_DATA.timeline.items).map((t, i) => (
                    <AnimSection key={i}>
                      <div className="flex gap-8 items-center">
                        <div className="relative">
                          <div className="w-16 h-16 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold text-sm shrink-0 shadow-lg shadow-blue-600/40">
                            {t.year}
                          </div>
                        </div>
                        <div className="bg-white/5 rounded-xl p-5 flex-1 border border-white/10 hover:border-blue-500/30 transition">
                          <p className="text-blue-100/90 text-sm leading-relaxed">{t.event}</p>
                        </div>
                      </div>
                    </AnimSection>
                  ))}
                </div>
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
                  {activeData.whyChoose?.badge || "Why Choose VRAT"}
                </span>
                <h2 className="font-serif text-4xl text-slate-900 mt-3">
                  {activeData.whyChoose?.heading || "Your Trusted Technology Partner"}
                </h2>
              </AnimSection>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {(activeData.whyChoose?.items || INITIAL_ABOUT_PAGE_DATA.whyChoose.items).map((item, i) => (
                  <AnimSection key={i}>
                    <div className="bg-white rounded-2xl p-7 shadow-sm border border-slate-100 card-hover text-center h-full flex flex-col items-center">
                      <div className="text-4xl mb-4">{item.icon || "✓"}</div>
                      <h3 className="font-bold text-slate-900 mb-3">{item.title}</h3>
                      <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </AnimSection>
                ))}
              </div>
            </div>
          </section>
        );

      case "leadership":
        return (
          <div key="leadership">
            <section className="py-24 bg-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <AnimSection className="text-center mb-12">
                  <span className="text-blue-600 text-sm font-semibold uppercase tracking-widest">
                    {activeData.leadership?.badge || "Leadership"}
                  </span>
                  <h2 className="font-serif text-4xl text-slate-900 mt-3 mb-5">
                    {activeData.leadership?.heading || "Leadership That Inspires Confidence"}
                  </h2>
                  <p className="text-slate-600 max-w-2xl mx-auto leading-relaxed">
                    {activeData.leadership?.description || INITIAL_ABOUT_PAGE_DATA.leadership.description}
                  </p>
                </AnimSection>
              </div>
            </section>

            <section id="team" className="py-12 bg-white border-t border-slate-100">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <AnimSection className="text-center mb-10">
                  <h3 className="font-bold text-slate-900 text-2xl mb-3">
                    {activeData.leadership?.teamHeading || "Meet Our Experts"}
                  </h3>
                  <p className="text-slate-600 text-sm max-w-xl mx-auto">
                    {activeData.leadership?.teamSubtitle || "Together, they ensure every project is delivered on time, within budget, and to the highest quality standards."}
                  </p>
                </AnimSection>
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
                  {(activeData.leadership?.roles || INITIAL_ABOUT_PAGE_DATA.leadership.roles).map((role, i) => (
                    <div key={i} className="bg-blue-50/80 rounded-xl p-4 text-center border border-blue-100 shadow-sm hover:border-blue-300 transition">
                      <div className="text-blue-700 text-xs font-semibold leading-snug">{role}</div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        );

      case "certifications":
        return (
          <section key="certifications" className="py-24 bg-slate-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <AnimSection className="text-center mb-12">
                <span className="text-blue-600 text-sm font-semibold uppercase tracking-widest">
                  {activeData.certifications?.badge || "Certifications & Compliance"}
                </span>
                <h2 className="font-serif text-4xl text-slate-900 mt-3 mb-4">
                  {activeData.certifications?.heading || "Quality You Can Trust"}
                </h2>
                <p className="text-slate-600 max-w-2xl mx-auto">
                  {activeData.certifications?.subtitle || "VRAT System Integrators follows industry best practices and works with globally recognized technology partners."}
                </p>
              </AnimSection>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                {(activeData.certifications?.items || INITIAL_ABOUT_PAGE_DATA.certifications.items).map((c, i) => (
                  <AnimSection key={i}>
                    <div className="bg-white rounded-xl p-5 text-center shadow-sm border border-slate-100 h-full flex flex-col items-center justify-center">
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
                  {activeData.partners?.heading || "Trusted Technology Brands"}
                </h2>
                <p className="text-slate-600 mt-3">
                  {activeData.partners?.subtitle || "We collaborate with industry-leading manufacturers to deliver dependable and future-ready solutions."}
                </p>
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

      case "sustainability":
        return (
          <section key="sustainability" className="py-24 bg-slate-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <AnimSection>
                  <span className="text-blue-600 text-sm font-semibold uppercase tracking-widest">
                    {activeData.sustainability?.badge || "Sustainability & Innovation"}
                  </span>
                  <h2 className="font-serif text-4xl text-slate-900 mt-3 mb-6">
                    {activeData.sustainability?.heading || "Building a Smarter Future"}
                  </h2>
                  <p className="text-slate-600 leading-relaxed mb-6">
                    {activeData.sustainability?.subtitle || "We embrace modern technologies that improve operational efficiency while promoting sustainability. Our solutions include:"}
                  </p>
                  <ul className="space-y-3">
                    {(activeData.sustainability?.items || INITIAL_ABOUT_PAGE_DATA.sustainability.items).map((s, i) => (
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
                      src={activeData.sustainability?.image || INITIAL_ABOUT_PAGE_DATA.sustainability.image}
                      alt="Smart technology and innovation"
                      className="w-full h-[380px] object-cover"
                      loading="lazy"
                    />
                  </div>
                </AnimSection>
              </div>
            </div>
          </section>
        );

      case "cta":
        return (
          <section key="cta" className="py-24 bg-blue-600">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <AnimSection>
                <h2 className="font-serif text-4xl text-white mb-5">
                  {activeData.cta?.heading || "Let's Build a Safer Tomorrow Together"}
                </h2>
                <p className="text-blue-100 text-lg mb-8">
                  {activeData.cta?.subtitle || "Whether you're planning a new facility or upgrading an existing security infrastructure, VRAT System Integrators is ready to deliver a solution tailored to your requirements."}
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
