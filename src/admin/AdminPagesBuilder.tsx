import React, { useState } from "react";
import { useCMS } from "../context/CMSContext";
import {
  Sliders,
  Save,
  Eye,
  CheckCircle2,
  Image,
  Link as LinkIcon,
  Layers,
  ArrowRight,
  Sparkles,
  ExternalLink
} from "lucide-react";

export default function AdminPagesBuilder() {
  const { heroConfigs, updateHeroConfig, addLog } = useCMS();

  const [selectedPageId, setSelectedPageId] = useState("home");
  const [saveSuccess, setSaveSuccess] = useState(false);

  const activeConfig = heroConfigs[selectedPageId] || {
    pageId: selectedPageId,
    pageName: selectedPageId,
    heading: "",
    subtitle: "",
    backgroundImage: "",
    primaryCtaText: "",
    primaryCtaLink: "",
    secondaryCtaText: "",
    secondaryCtaLink: "",
    showSection: true,
    status: "Published",
  };

  const [formData, setFormData] = useState(activeConfig);

  const handleSelectPage = (pageId: string) => {
    setSelectedPageId(pageId);
    setFormData(
      heroConfigs[pageId] || {
        pageId: pageId,
        pageName: pageId.toUpperCase(),
        heading: "",
        subtitle: "",
        backgroundImage: "",
        primaryCtaText: "Request Consultation",
        primaryCtaLink: "/contact",
        secondaryCtaText: "Learn More",
        secondaryCtaLink: "/services",
        showSection: true,
        status: "Published",
      }
    );
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateHeroConfig(selectedPageId, formData);
    addLog(
      "Updated Page Hero",
      "Page Builder",
      `Saved changes to page "${formData.pageName}" (Hero Heading: ${formData.heading.slice(0, 30)}...)`
    );
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  const pageList = [
    { id: "home", name: "1. Home Page (/)", path: "/" },
    { id: "about", name: "2. About Us (/about)", path: "/about" },
    { id: "services", name: "3. Services Overview (/services)", path: "/services" },
    { id: "products", name: "4. Products Catalog (/products)", path: "/products" },
    { id: "solutions", name: "5. Industry Solutions (/solutions)", path: "/solutions" },
    { id: "projects", name: "6. Projects & Case Studies (/projects)", path: "/projects" },
    { id: "gallery", name: "7. Multimedia Gallery (/gallery)", path: "/gallery" },
    { id: "downloads", name: "8. Download Center (/downloads)", path: "/downloads" },
    { id: "blog", name: "9. Blog & Insights (/blog)", path: "/blog" },
    { id: "careers", name: "10. Careers (/careers)", path: "/careers" },
    { id: "contact", name: "11. Contact Us (/contact)", path: "/contact" },
    { id: "faq", name: "12. FAQ Knowledge Base (/faq)", path: "/faq" },
    { id: "support", name: "13. Customer Support (/support)", path: "/support" },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <Sliders className="w-3.5 h-3.5" />
            Dynamic Visual Page Builder
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">
            Page & Section Manager
          </h1>
          <p className="text-slate-400 text-xs mt-1">
            Customize hero headings, banners, CTA buttons, background images, and section visibility for all pages.
          </p>
        </div>

        {saveSuccess && (
          <div className="inline-flex items-center gap-2 bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 px-4 py-2 rounded-xl text-xs font-bold animate-fade-in">
            <CheckCircle2 className="w-4 h-4" /> Live Website Updated!
          </div>
        )}
      </div>

      <div className="grid lg:grid-cols-12 gap-8 items-start">
        {/* Left: Page Selector */}
        <div className="lg:col-span-4 bg-slate-950 p-5 rounded-3xl border border-slate-800 space-y-2">
          <div className="px-2 pb-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
            Select Website Page to Edit:
          </div>
          <div className="space-y-1 max-h-[600px] overflow-y-auto scrollbar-thin">
            {pageList.map((p) => (
              <button
                key={p.id}
                onClick={() => handleSelectPage(p.id)}
                className={`w-full text-left px-3.5 py-3 rounded-2xl text-xs font-semibold transition flex items-center justify-between ${
                  selectedPageId === p.id
                    ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                    : "text-slate-300 hover:bg-slate-900 hover:text-white"
                }`}
              >
                <span>{p.name}</span>
                <span className="text-[10px] opacity-75 font-mono">EDIT</span>
              </button>
            ))}
          </div>
        </div>

        {/* Right: Section & Hero Editor */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-slate-950 p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-xl">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
              <div>
                <span className="text-xs font-bold text-blue-400 uppercase">Editing Page</span>
                <h2 className="text-xl font-bold text-white">{formData.pageName}</h2>
              </div>
              <a
                href={pageList.find((p) => p.id === selectedPageId)?.path || "/"}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 hover:bg-slate-850 text-slate-300 text-xs font-semibold rounded-xl border border-slate-800 transition"
              >
                <Eye className="w-3.5 h-3.5 text-blue-400" /> Preview Page
              </a>
            </div>

            <form onSubmit={handleSave} className="space-y-5">
              {/* Visibility & Status */}
              <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-slate-900 rounded-2xl border border-slate-850">
                <label className="flex items-center gap-2 text-xs font-bold text-slate-200 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.showSection}
                    onChange={(e) => setFormData({ ...formData, showSection: e.target.checked })}
                    className="w-4 h-4 rounded accent-blue-600 cursor-pointer"
                  />
                  <span>Show Hero Banner Section on Live Page</span>
                </label>

                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400">Publication Status:</span>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                    className="px-3 py-1 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white"
                  >
                    <option value="Published">Published (Live)</option>
                    <option value="Draft">Draft (Hidden)</option>
                  </select>
                </div>
              </div>

              {/* Main Heading */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Hero Main Heading
                </label>
                <input
                  type="text"
                  required
                  value={formData.heading}
                  onChange={(e) => setFormData({ ...formData, heading: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Hero Heading Text..."
                />
              </div>

              {/* Subheading */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Hero Subtitle / Description
                </label>
                <textarea
                  rows={3}
                  value={formData.subtitle}
                  onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 leading-relaxed"
                  placeholder="Hero subtitle description..."
                />
              </div>

              {/* Background Image */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Hero Background Image URL
                </label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    value={formData.backgroundImage}
                    onChange={(e) => setFormData({ ...formData, backgroundImage: e.target.value })}
                    className="flex-1 px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="https://images.unsplash.com/..."
                  />
                </div>
                {formData.backgroundImage && (
                  <div className="mt-2 rounded-xl overflow-hidden h-28 bg-slate-900 border border-slate-800">
                    <img src={formData.backgroundImage} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>

              {/* CTA Buttons */}
              <div className="grid sm:grid-cols-2 gap-4 p-4 bg-slate-900 rounded-2xl border border-slate-850">
                <div className="space-y-3">
                  <div className="text-xs font-bold text-blue-400">Primary CTA Button</div>
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">Button Text</label>
                    <input
                      type="text"
                      value={formData.primaryCtaText}
                      onChange={(e) => setFormData({ ...formData, primaryCtaText: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white"
                      placeholder="e.g. Request a Free Site Survey"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">Button Link URL</label>
                    <input
                      type="text"
                      value={formData.primaryCtaLink}
                      onChange={(e) => setFormData({ ...formData, primaryCtaLink: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white"
                      placeholder="/contact"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="text-xs font-bold text-slate-300">Secondary CTA Button</div>
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">Button Text</label>
                    <input
                      type="text"
                      value={formData.secondaryCtaText || ""}
                      onChange={(e) => setFormData({ ...formData, secondaryCtaText: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white"
                      placeholder="e.g. Explore Solutions"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">Button Link URL</label>
                    <input
                      type="text"
                      value={formData.secondaryCtaLink || ""}
                      onChange={(e) => setFormData({ ...formData, secondaryCtaLink: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white"
                      placeholder="/services"
                    />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="submit"
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-xs transition shadow-lg shadow-blue-600/30 flex items-center gap-2"
                >
                  <Save className="w-4 h-4" /> Save & Publish to Live Website
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
