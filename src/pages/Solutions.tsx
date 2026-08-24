import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useCMS } from "../context/CMSContext";
import {
  Building2,
  Factory,
  Home,
  GraduationCap,
  HeartPulse,
  ShoppingBag,
  Package,
  Landmark,
  CheckCircle2,
  ArrowRight,
  ShieldAlert,
  Layers,
  Sparkles,
  Award,
  ChevronRight,
  Quote
} from "lucide-react";

const ICON_MAP: Record<string, React.ReactNode> = {
  Building2: <Building2 className="w-6 h-6" />,
  Factory: <Factory className="w-6 h-6" />,
  Home: <Home className="w-6 h-6" />,
  GraduationCap: <GraduationCap className="w-6 h-6" />,
  HeartPulse: <HeartPulse className="w-6 h-6" />,
  ShoppingBag: <ShoppingBag className="w-6 h-6" />,
  Package: <Package className="w-6 h-6" />,
  Landmark: <Landmark className="w-6 h-6" />,
};

export default function Solutions() {
  const { slug } = useParams<{ slug?: string }>();
  const { solutions, heroConfigs } = useCMS();
  const hero = heroConfigs["solutions"];

  const [activeSlug, setActiveSlug] = useState<string>(slug || "commercial");

  useEffect(() => {
    if (slug) {
      setActiveSlug(slug);
    }
  }, [slug]);

  const activeSolution = solutions.find((s) => s.slug === activeSlug) || solutions[0];

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Hero Section */}
      {hero?.showSection && (
        <section className="relative py-24 bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 text-white overflow-hidden">
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:24px_24px]"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold tracking-wide uppercase mb-6">
                <Layers className="w-3.5 h-3.5" />
                Industry Specific Solutions
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-tight">
                {hero.heading}
              </h1>
              <p className="text-lg text-slate-300 mb-8 leading-relaxed">
                {hero.subtitle}
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to={hero.primaryCtaLink || "/contact"}
                  className="px-6 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition shadow-lg shadow-blue-600/30 flex items-center gap-2"
                >
                  {hero.primaryCtaText || "Schedule Site Assessment"}
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href="#industries-selector"
                  className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white font-medium rounded-xl transition backdrop-blur-sm border border-white/10"
                >
                  {hero.secondaryCtaText || "Browse All Industries"}
                </a>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Industry Tabs Selector */}
      <section id="industries-selector" className="py-8 bg-white border-b border-slate-200 sticky top-18 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
            {solutions.map((sol) => (
              <button
                key={sol.id}
                onClick={() => setActiveSlug(sol.slug)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap transition-all ${
                  activeSlug === sol.slug
                    ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {ICON_MAP[sol.icon] || <Building2 className="w-4 h-4" />}
                {sol.title.split("&")[0].trim()}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Solution Detail */}
      {activeSolution && (
        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            {/* Left Main Content */}
            <div className="lg:col-span-8 space-y-12">
              {/* Header Title Card */}
              <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                    {ICON_MAP[activeSolution.icon] || <Building2 className="w-6 h-6" />}
                  </div>
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
                      {activeSolution.title}
                    </h2>
                    <p className="text-blue-600 font-medium text-sm">
                      {activeSolution.subtitle}
                    </p>
                  </div>
                </div>
                <p className="text-slate-600 text-base leading-relaxed mb-6">
                  {activeSolution.desc}
                </p>
                <div className="rounded-xl overflow-hidden shadow-md max-h-96">
                  <img
                    src={activeSolution.heroImage || activeSolution.image}
                    alt={activeSolution.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Challenges vs Solutions Breakdown */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Challenges Card */}
                <div className="bg-rose-50/70 border border-rose-100 rounded-2xl p-6">
                  <div className="flex items-center gap-2.5 text-rose-700 font-bold text-lg mb-4">
                    <ShieldAlert className="w-5 h-5 text-rose-600" />
                    Key Industry Challenges
                  </div>
                  <ul className="space-y-3">
                    {activeSolution.challenges.map((ch, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-slate-700 text-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-2 flex-shrink-0"></span>
                        <span>{ch}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Solutions Provided Card */}
                <div className="bg-emerald-50/70 border border-emerald-100 rounded-2xl p-6">
                  <div className="flex items-center gap-2.5 text-emerald-800 font-bold text-lg mb-4">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    Engineered VRAT Solutions
                  </div>
                  <ul className="space-y-3">
                    {activeSolution.solutionsProvided.map((sol, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-slate-700 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                        <span>{sol}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Integrated Solution Architecture */}
              <div className="bg-slate-900 text-white rounded-2xl p-8 shadow-xl">
                <div className="flex items-center gap-3 mb-6">
                  <Layers className="w-6 h-6 text-blue-400" />
                  <h3 className="text-xl font-bold">
                    Integrated Solution Architecture
                  </h3>
                </div>
                <p className="text-slate-300 text-sm mb-6">
                  Our synchronized ecosystem eliminates siloed systems, connecting surveillance, access control, fire safety, and automation into one centralized monitoring command center.
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                  {activeSolution.architectureSteps.map((step, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-slate-800/80 border border-slate-700/60 flex items-center gap-3"
                    >
                      <div className="w-7 h-7 rounded-lg bg-blue-600/30 text-blue-400 font-mono text-xs flex items-center justify-center font-bold flex-shrink-0">
                        0{idx + 1}
                      </div>
                      <div className="text-xs sm:text-sm font-medium text-slate-200">
                        {step}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Solution Features */}
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-blue-600" />
                  Specialized Industry Features
                </h3>
                <div className="grid sm:grid-cols-3 gap-6">
                  {activeSolution.keyFeatures.map((feat, idx) => (
                    <div
                      key={idx}
                      className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition"
                    >
                      <h4 className="font-bold text-slate-900 text-base mb-2">
                        {feat.title}
                      </h4>
                      <p className="text-slate-600 text-xs leading-relaxed">
                        {feat.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Measurable Success Metrics */}
              <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white rounded-2xl p-8">
                <div className="flex items-center gap-2.5 mb-6">
                  <Award className="w-6 h-6 text-amber-400" />
                  <h3 className="text-xl font-bold">Measurable Business Outcomes</h3>
                </div>
                <div className="grid sm:grid-cols-3 gap-6">
                  {activeSolution.successMetrics.map((met, idx) => (
                    <div key={idx} className="bg-white/10 p-5 rounded-xl border border-white/10 backdrop-blur-sm">
                      <div className="text-amber-400 font-bold text-sm mb-1">Impact {idx + 1}</div>
                      <div className="text-sm text-slate-100 font-medium">{met}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Client Testimonial */}
              {activeSolution.testimonial && (
                <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm relative">
                  <Quote className="w-10 h-10 text-blue-100 absolute top-6 right-6" />
                  <p className="italic text-slate-700 text-base mb-4 relative z-10 leading-relaxed">
                    "{activeSolution.testimonial.quote}"
                  </p>
                  <div className="font-bold text-slate-900 text-sm">
                    {activeSolution.testimonial.client}
                  </div>
                  <div className="text-blue-600 text-xs font-medium">
                    {activeSolution.testimonial.role}
                  </div>
                </div>
              )}
            </div>

            {/* Right Sticky Sidebar */}
            <div className="lg:col-span-4 space-y-6">
              {/* Consultation Quick Card */}
              <div className="bg-white p-6 rounded-2xl border border-blue-100 shadow-md shadow-blue-900/5">
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  Request a Solution Design
                </h3>
                <p className="text-slate-600 text-xs mb-6">
                  Get a comprehensive site assessment and customized architecture diagram for your facility.
                </p>
                <Link
                  to="/contact"
                  className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl text-center block text-sm transition shadow-md shadow-blue-600/20"
                >
                  Book Free Site Survey
                </Link>
                <Link
                  to="/downloads"
                  className="w-full mt-3 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-center block text-sm transition"
                >
                  Download Solution Guide
                </Link>
              </div>

              {/* Other Industries List */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <h3 className="text-base font-bold text-slate-900 mb-4">
                  Explore Other Sectors
                </h3>
                <div className="space-y-2">
                  {solutions.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => setActiveSlug(s.slug)}
                      className={`w-full flex items-center justify-between p-3 rounded-xl text-xs font-semibold transition ${
                        activeSlug === s.slug
                          ? "bg-blue-50 text-blue-700 border border-blue-200"
                          : "text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        {ICON_MAP[s.icon] || <Building2 className="w-4 h-4" />}
                        <span>{s.title}</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-400" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Emergency Support Strip */}
              <div className="bg-slate-900 text-white p-6 rounded-2xl">
                <div className="text-xs uppercase tracking-wider text-blue-400 font-bold mb-2">
                  24×7 Technical Assistance
                </div>
                <h4 className="font-bold text-base mb-2">Need Immediate Consultation?</h4>
                <p className="text-slate-400 text-xs mb-4">
                  Speak directly with an enterprise solutions architect.
                </p>
                <a
                  href="tel:+919825012345"
                  className="inline-flex items-center gap-2 text-white font-bold text-sm bg-blue-600 px-4 py-2.5 rounded-lg hover:bg-blue-500 transition"
                >
                  Call +91 98250 12345
                </a>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
