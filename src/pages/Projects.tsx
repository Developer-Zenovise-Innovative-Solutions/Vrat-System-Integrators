import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCMS } from "../context/CMSContext";
import { CaseStudy } from "../types";
import {
  Briefcase,
  CheckCircle2,
  MapPin,
  Calendar,
  Building,
  ArrowRight,
  Sparkles,
  Quote,
  X,
  Sliders,
  Filter
} from "lucide-react";

export default function Projects() {
  const { caseStudies, heroConfigs } = useCMS();
  const hero = heroConfigs["projects"];

  const [selectedIndustry, setSelectedIndustry] = useState("All");
  const [selectedTech, setSelectedTech] = useState("All");
  const [selectedCase, setSelectedCase] = useState<CaseStudy | null>(null);

  const industries = ["All", "Commercial", "Industrial", "Education", "Healthcare", "Retail", "Warehouses & Logistics"];
  const technologies = ["All", "AI CCTV", "Face Recognition", "Fire Alarm", "Boom Barrier", "Enterprise Networking"];

  const filteredProjects = caseStudies.filter((c) => {
    const matchesInd = selectedIndustry === "All" || c.industry.toLowerCase().includes(selectedIndustry.toLowerCase());
    const matchesTech = selectedTech === "All" || c.technologyUsed.some((t) => t.toLowerCase().includes(selectedTech.toLowerCase()));
    return matchesInd && matchesTech;
  });

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Hero */}
      {hero?.showSection && (
        <section className="relative py-20 bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 text-white overflow-hidden">
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:24px_24px]"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold tracking-wide uppercase mb-6">
                <Briefcase className="w-3.5 h-3.5" />
                Proven Track Record
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6 leading-tight">
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
                  {hero.primaryCtaText || "Discuss Your Project"}
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/gallery"
                  className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white font-medium rounded-xl transition backdrop-blur-sm border border-white/10"
                >
                  View Multimedia Gallery
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Stats Bar */}
      <section className="bg-white border-b border-slate-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-extrabold text-blue-600 mb-1">500+</div>
              <div className="text-xs text-slate-500 font-semibold uppercase">Projects Delivered</div>
            </div>
            <div>
              <div className="text-3xl font-extrabold text-slate-900 mb-1">25,000+</div>
              <div className="text-xs text-slate-500 font-semibold uppercase">Cameras Installed</div>
            </div>
            <div>
              <div className="text-3xl font-extrabold text-blue-600 mb-1">75+</div>
              <div className="text-xs text-slate-500 font-semibold uppercase">Cities Covered</div>
            </div>
            <div>
              <div className="text-3xl font-extrabold text-slate-900 mb-1">98%</div>
              <div className="text-xs text-slate-500 font-semibold uppercase">Customer Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies Grid & Filters */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Filter Bar */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm mb-10 space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-700 uppercase">
              <Filter className="w-4 h-4 text-blue-600" /> Filter Case Studies by Sector:
            </div>
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
              {industries.map((ind) => (
                <button
                  key={ind}
                  onClick={() => setSelectedIndustry(ind)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
                    selectedIndustry === ind
                      ? "bg-blue-600 text-white shadow-sm"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {ind}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Case Study Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((c, idx) => (
            <div
              key={c.id}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-56 bg-slate-100 overflow-hidden">
                  <img
                    src={c.image}
                    alt={c.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-wider">
                      Case 0{idx + 1}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-blue-600 text-white text-[10px] font-bold uppercase tracking-wider">
                      {c.industry}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-4 text-[11px] text-slate-400 font-medium mb-2">
                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {c.location}</span>
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {c.year}</span>
                  </div>
                  <h3 className="font-bold text-slate-900 text-lg mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors leading-snug">
                    {c.title}
                  </h3>
                  <div className="text-blue-600 text-xs font-semibold mb-3">
                    Project Scale: {c.projectSize}
                  </div>
                  <p className="text-slate-600 text-xs line-clamp-3 mb-4 leading-relaxed">
                    {c.shortDesc}
                  </p>

                  <div className="space-y-1.5 mb-4">
                    {c.results.slice(0, 2).map((r, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mt-0.5 flex-shrink-0" />
                        <span className="truncate">{r}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0">
                <button
                  onClick={() => setSelectedCase(c)}
                  className="w-full py-2.5 px-4 bg-slate-100 hover:bg-blue-50 hover:text-blue-600 text-slate-700 font-semibold rounded-xl text-xs transition flex items-center justify-center gap-1.5"
                >
                  Read Detailed Case Study <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Case Study Detail Modal */}
      {selectedCase && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 animate-fade-in">
            <div className="sticky top-0 bg-white/95 backdrop-blur-md px-6 py-4 border-b border-slate-200 flex items-center justify-between z-10">
              <div>
                <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">{selectedCase.industry} • {selectedCase.location}</span>
                <h3 className="text-xl font-bold text-slate-900">{selectedCase.title}</h3>
              </div>
              <button
                onClick={() => setSelectedCase(null)}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 sm:p-8 space-y-6">
              <div className="rounded-2xl overflow-hidden h-64 bg-slate-100">
                <img src={selectedCase.image} alt={selectedCase.title} className="w-full h-full object-cover" />
              </div>

              <div className="grid sm:grid-cols-3 gap-4 bg-slate-50 p-4 rounded-xl text-xs border border-slate-100">
                <div>
                  <div className="text-slate-400 font-semibold uppercase">Client Category</div>
                  <div className="font-bold text-slate-900 mt-0.5">{selectedCase.clientType}</div>
                </div>
                <div>
                  <div className="text-slate-400 font-semibold uppercase">Deployment Size</div>
                  <div className="font-bold text-slate-900 mt-0.5">{selectedCase.projectSize}</div>
                </div>
                <div>
                  <div className="text-slate-400 font-semibold uppercase">Year Completed</div>
                  <div className="font-bold text-slate-900 mt-0.5">{selectedCase.year}</div>
                </div>
              </div>

              {/* Technologies Used */}
              <div>
                <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-2">Technologies Deployed</h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedCase.technologyUsed.map((t, i) => (
                    <span key={i} className="px-3 py-1 rounded-lg bg-blue-50 text-blue-700 text-xs font-semibold">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Challenge & Solution */}
              <div className="space-y-4">
                <div className="p-5 bg-rose-50/70 border border-rose-100 rounded-2xl">
                  <h4 className="font-bold text-rose-800 text-sm mb-1">The Operational Challenge</h4>
                  <p className="text-slate-700 text-xs sm:text-sm leading-relaxed">{selectedCase.challenge}</p>
                </div>
                <div className="p-5 bg-emerald-50/70 border border-emerald-100 rounded-2xl">
                  <h4 className="font-bold text-emerald-800 text-sm mb-1">VRAT Engineered Solution</h4>
                  <p className="text-slate-700 text-xs sm:text-sm leading-relaxed">{selectedCase.solution}</p>
                </div>
              </div>

              {/* Measurable Results */}
              <div>
                <h4 className="font-bold text-slate-900 text-sm mb-3">Key Results & Measurable Outcomes</h4>
                <div className="grid sm:grid-cols-2 gap-2.5">
                  {selectedCase.results.map((r, i) => (
                    <div key={i} className="flex items-start gap-2 bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                      <span>{r}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Client Testimonial */}
              {selectedCase.testimonial && (
                <div className="bg-slate-900 text-white p-6 rounded-2xl relative">
                  <Quote className="w-8 h-8 text-blue-500/30 absolute top-4 right-4" />
                  <p className="italic text-xs sm:text-sm text-slate-200 mb-2 leading-relaxed">
                    "{selectedCase.testimonial.quote}"
                  </p>
                  <div className="text-blue-400 font-bold text-xs">
                    — {selectedCase.testimonial.author}
                  </div>
                </div>
              )}

              <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                <Link
                  to="/contact"
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl text-xs transition"
                >
                  Request Similar Solution Architecture
                </Link>
                <button
                  onClick={() => setSelectedCase(null)}
                  className="px-5 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-xs"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
