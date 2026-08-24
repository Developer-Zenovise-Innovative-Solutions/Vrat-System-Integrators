import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useCMS } from "../context/CMSContext";
import {
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  PhoneCall,
  Download,
  ChevronDown,
  ChevronUp,
  Layers,
  Sparkles,
  Award,
  Building2
} from "lucide-react";

export default function ServiceDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { services, faqs, partners, products } = useCMS();
  const [openFaq, setOpenFaq] = useState<string | null>(null);

  // Match by slug, id, or stripped slug
  const normalizedSlug = slug?.replace(/^\/services\//, "") || "";
  const service = services.find(
    (s) =>
      s.slug === normalizedSlug ||
      s.id === normalizedSlug ||
      s.slug === `services/${normalizedSlug}` ||
      s.slug.replace(/[^a-z0-9]/g, "") === normalizedSlug.replace(/[^a-z0-9]/g, "") ||
      s.id.replace(/[^a-z0-9]/g, "") === normalizedSlug.replace(/[^a-z0-9]/g, "")
  ) || services[0];

  const serviceFaqs = faqs.filter(
    (f) =>
      f.category.toLowerCase().includes(service.id.toLowerCase()) ||
      service.title.toLowerCase().includes(f.category.toLowerCase()) ||
      f.category === "General"
  );

  const relatedProducts = products.filter(
    (p) =>
      p.category.toLowerCase().includes(service.title.split(" ")[0].toLowerCase()) ||
      p.category.toLowerCase().includes(service.id.toLowerCase())
  ).slice(0, 3);

  const otherServices = services.filter((s) => s.id !== service.id).slice(0, 3);

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 text-white overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={service.image}
            alt={service.title}
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-900/90 to-blue-950/85" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex items-center gap-2 text-blue-300/80 text-xs font-semibold uppercase tracking-wider mb-6">
            <Link to="/" className="hover:text-white transition">Home</Link>
            <span>/</span>
            <Link to="/services" className="hover:text-white transition">Services</Link>
            <span>/</span>
            <span className="text-white">{service.title}</span>
          </div>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold tracking-wide uppercase mb-6">
              <ShieldCheck className="w-3.5 h-3.5" />
              Turnkey Engineering & Integration
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-tight">
              {service.title}
            </h1>
            <p className="text-lg text-slate-300 leading-relaxed mb-8">
              {service.overview}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/contact"
                className="px-7 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition shadow-lg shadow-blue-600/30 flex items-center gap-2"
              >
                Request a Free Site Survey
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/downloads"
                className="px-7 py-3.5 bg-white/10 hover:bg-white/20 text-white font-medium rounded-xl transition backdrop-blur-sm border border-white/15 flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Download Brochure
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Main Overview & Features */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* Left Content */}
          <div className="lg:col-span-8 space-y-12">
            {/* Overview Card */}
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Solution Capabilities</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1 mb-4">
                What We Offer in {service.title}
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed mb-8">
                {service.shortDesc}
              </p>

              <div className="grid sm:grid-cols-2 gap-3">
                {service.features.map((f, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2.5 p-3.5 bg-slate-50 rounded-xl border border-slate-100 text-xs font-semibold text-slate-800"
                  >
                    <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Solution Types (if present) */}
            {service.solutionTypes && service.solutionTypes.length > 0 && (
              <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
                <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <Layers className="w-5 h-5 text-blue-600" />
                  Configurations & System Options
                </h3>
                <div className="space-y-4">
                  {service.solutionTypes.map((st, i) => (
                    <div key={i} className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                      <h4 className="font-bold text-slate-900 text-sm mb-1">{st.title}</h4>
                      <p className="text-slate-600 text-xs leading-relaxed">{st.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Key Benefits */}
            <div className="bg-slate-900 text-white rounded-3xl p-8 shadow-xl">
              <div className="flex items-center gap-2.5 text-blue-400 font-bold text-xs uppercase tracking-wider mb-2">
                <Sparkles className="w-4 h-4" /> Operational Value
              </div>
              <h3 className="text-2xl font-bold mb-6">Key Business Benefits</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {service.benefits.map((b, i) => (
                  <div key={i} className="flex items-start gap-3 bg-slate-800/80 p-4 rounded-xl border border-slate-700/60">
                    <div className="w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs mt-0.5 flex-shrink-0">
                      ✓
                    </div>
                    <span className="text-xs sm:text-sm text-slate-200 font-medium">{b}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Applications List */}
            {service.applications && (
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-blue-600" />
                  Target Sectors & Applications
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {service.applications.map((app, i) => (
                    <div key={i} className="bg-white p-3.5 rounded-xl border border-slate-200 text-center text-xs font-semibold text-slate-700 shadow-sm">
                      {app}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Related Hardware & Products */}
            {relatedProducts.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-slate-900">Supported Hardware & Products</h3>
                  <Link to="/products" className="text-blue-600 text-xs font-bold hover:underline">
                    View Catalog →
                  </Link>
                </div>
                <div className="grid sm:grid-cols-3 gap-4">
                  {relatedProducts.map((p) => (
                    <Link
                      key={p.id}
                      to="/products"
                      className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition block group"
                    >
                      <img src={p.image} alt={p.name} className="w-full h-32 object-cover rounded-xl mb-3" />
                      <div className="text-[10px] font-bold text-blue-600 uppercase">{p.brand}</div>
                      <div className="font-bold text-slate-900 text-xs line-clamp-1 group-hover:text-blue-600 transition">{p.name}</div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Service FAQ Accordion */}
            {serviceFaqs.length > 0 && (
              <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
                <h3 className="text-xl font-bold text-slate-900 mb-6">Frequently Asked Questions</h3>
                <div className="space-y-3">
                  {serviceFaqs.map((f) => {
                    const isOpen = openFaq === f.id;
                    return (
                      <div key={f.id} className="border border-slate-200 rounded-xl overflow-hidden">
                        <button
                          onClick={() => setOpenFaq(isOpen ? null : f.id)}
                          className="w-full p-4 text-left flex items-center justify-between gap-3 hover:bg-slate-50 text-xs sm:text-sm font-bold text-slate-900"
                        >
                          <span>{f.question}</span>
                          {isOpen ? <ChevronUp className="w-4 h-4 text-blue-600" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                        </button>
                        {isOpen && (
                          <div className="p-4 pt-0 text-xs text-slate-600 leading-relaxed border-t border-slate-100">
                            {f.answer}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Right Sticky Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            {/* Action Box */}
            <div className="bg-white p-6 rounded-3xl border border-blue-100 shadow-lg shadow-blue-900/5 space-y-4">
              <h3 className="font-bold text-slate-900 text-lg">Need {service.title}?</h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                Our certified engineers handle complete turnkey delivery: site survey, BOQ estimation, installation, testing, and AMC.
              </p>
              <Link
                to="/contact"
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-center block text-xs transition shadow-md shadow-blue-600/20"
              >
                Schedule Site Assessment
              </Link>
              <Link
                to="/downloads"
                className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-center block text-xs transition"
              >
                Download Product Datasheets
              </Link>
            </div>

            {/* Other Services */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
              <h4 className="font-bold text-slate-900 text-sm mb-4">Other Core Services</h4>
              <div className="space-y-2">
                {otherServices.map((s) => (
                  <Link
                    key={s.id}
                    to={`/services/${s.slug}`}
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-blue-50 text-slate-700 hover:text-blue-700 text-xs font-semibold transition"
                  >
                    <span>{s.title}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                  </Link>
                ))}
              </div>
            </div>

            {/* OEM Technology Partners */}
            <div className="bg-slate-900 text-white p-6 rounded-3xl">
              <div className="text-xs uppercase tracking-wider text-blue-400 font-bold mb-3">
                Trusted Global Partners
              </div>
              <div className="flex flex-wrap gap-2">
                {partners.slice(0, 8).map((p) => (
                  <span key={p.id} className="px-2.5 py-1 rounded bg-slate-800 text-slate-200 text-[11px] font-semibold">
                    {p.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
