import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

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

const PROJECTS = [
  {
    title: "Campus-Wide Integrated Security",
    sector: "Education",
    scope: "Multi-building campus deployment covering all entry/exit points, corridors, classrooms, and administrative areas.",
    tech: ["HD CCTV", "Biometric Access Control", "Public Address System", "Attendance Management"],
    image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=700&h=450&fit=crop&auto=format",
    highlights: ["Comprehensive campus surveillance", "Integrated attendance system", "Emergency PA coverage"],
  },
  {
    title: "Manufacturing Plant Security",
    sector: "Manufacturing",
    scope: "Perimeter protection and internal monitoring for an industrial manufacturing facility with 24×7 production operations.",
    tech: ["Industrial CCTV", "Boom Barrier", "Fire Alarm Systems", "Perimeter Security"],
    image: "https://images.unsplash.com/photo-1565793079479-ef2f800fd2b5?w=700&h=450&fit=crop&auto=format",
    highlights: ["Perimeter surveillance", "Fire safety compliance", "Vehicle access management"],
  },
  {
    title: "Multi-Floor Corporate Office",
    sector: "Corporate",
    scope: "Complete security and networking infrastructure for a modern multi-story corporate headquarters.",
    tech: ["IP Camera Network", "Biometric Access", "Structured Cabling", "Visitor Management"],
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=700&h=450&fit=crop&auto=format",
    highlights: ["Enterprise networking", "Centralized access control", "Integrated visitor management"],
  },
  {
    title: "Hospital Security & Communication",
    sector: "Healthcare",
    scope: "Patient area surveillance, restricted zone access control, and emergency communication systems for a multi-specialty hospital.",
    tech: ["Healthcare CCTV", "Access Control", "Fire Alarm", "Emergency PA"],
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=700&h=450&fit=crop&auto=format",
    highlights: ["Patient safety monitoring", "Restricted access zones", "Emergency communication"],
  },
  {
    title: "Residential Complex Automation",
    sector: "Residential",
    scope: "Smart security and automation for a modern residential complex with multiple towers and a gated community.",
    tech: ["Video Door Phone", "CCTV", "Boom Barrier", "Home Automation"],
    image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=700&h=450&fit=crop&auto=format",
    highlights: ["Gated community security", "Intercom system", "Smart home features"],
  },
  {
    title: "Warehouse Perimeter Protection",
    sector: "Logistics",
    scope: "Comprehensive perimeter and inventory surveillance for a large logistics and warehousing facility.",
    tech: ["Thermal Cameras", "ANPR", "Boom Barrier", "Inventory CCTV"],
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=700&h=450&fit=crop&auto=format",
    highlights: ["Thermal perimeter detection", "Vehicle tracking with ANPR", "24×7 monitoring"],
  },
];

const CATEGORIES = ["All", "Education", "Manufacturing", "Corporate", "Healthcare", "Residential", "Logistics"];

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = activeCategory === "All"
    ? PROJECTS
    : PROJECTS.filter((p) => p.sector === activeCategory);

  return (
    <div className="overflow-x-hidden">
      {/* HERO */}
      <section className="relative py-32 gradient-navy overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920&h=600&fit=crop&auto=format"
            alt="Project delivery"
            className="w-full h-full object-cover opacity-15"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A1628]/95 to-[#162B56]/80" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-fade-up">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/15 border border-blue-400/25 mb-6">
              <span className="text-blue-300 text-sm font-medium">Project Portfolio</span>
            </div>
            <h1 className="font-serif text-5xl lg:text-6xl text-white leading-tight mb-6">
              Delivering Excellence{" "}
              <span className="text-blue-300">Across Industries</span>
            </h1>
            <p className="text-blue-100/80 text-xl leading-relaxed">
              Our portfolio includes successful implementations in educational campuses, manufacturing facilities, hospitals, residential complexes, commercial buildings, retail outlets, and government institutions.
            </p>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="bg-white py-12 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
            {[
              { value: "500+", label: "Projects Completed" },
              { value: "17+", label: "Years Experience" },
              { value: "10+", label: "Industry Sectors" },
              { value: "120+", label: "Happy Clients" },
            ].map((s) => (
              <div key={s.label}>
                <div className="text-3xl font-bold text-blue-700 font-serif">{s.value}</div>
                <div className="text-slate-500 text-sm mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FILTER + PROJECTS */}
      <section className="py-24 bg-slate-50 section-pattern">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === cat
                    ? "bg-blue-600 text-white shadow-md shadow-blue-600/25"
                    : "bg-white text-slate-600 border border-slate-200 hover:border-blue-300 hover:text-blue-600"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((project, i) => (
              <AnimSection key={i}>
                <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 card-hover h-full flex flex-col">
                  <div className="relative h-52">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute top-4 right-4 px-3 py-1 bg-blue-600 text-white text-xs font-semibold rounded-full">
                      {project.sector}
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent" />
                  </div>
                  <div className="p-7 flex flex-col flex-1">
                    <h3 className="font-bold text-slate-900 text-xl mb-3">{project.title}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed mb-5 flex-1">{project.scope}</p>

                    <div className="mb-4">
                      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Technologies Used</p>
                      <div className="flex flex-wrap gap-1.5">
                        {project.tech.map((t) => (
                          <span key={t} className="px-2 py-0.5 bg-blue-50 text-blue-700 text-xs rounded-md">{t}</span>
                        ))}
                      </div>
                    </div>

                    <div className="border-t border-slate-100 pt-4">
                      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Key Highlights</p>
                      <ul className="space-y-1">
                        {project.highlights.map((h) => (
                          <li key={h} className="flex items-center gap-2 text-xs text-slate-600">
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                            {h}
                          </li>
                        ))}
                      </ul>
                    </div>
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
            <h2 className="font-serif text-4xl text-white mb-5">Ready to Start Your Project?</h2>
            <p className="text-blue-100 text-lg mb-8">
              Join 120+ satisfied clients who trust VRAT System Integrators for their security infrastructure.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/contact" className="px-8 py-4 bg-white text-blue-700 font-bold rounded-xl hover:bg-blue-50 transition-all">
                Request a Site Survey
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
