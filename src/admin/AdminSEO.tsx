import React, { useState } from "react";
import { useCMS } from "../context/CMSContext";
import { SEOMetadata } from "../types";
import {
  Search,
  Save,
  CheckCircle2,
  Globe,
  Share2,
  FileCode,
  ShieldCheck
} from "lucide-react";

export default function AdminSEO() {
  const { seoMetadata, updateSEOMetadata, addLog } = useCMS();
  const [selectedPage, setSelectedPage] = useState("home");
  const [saveSuccess, setSaveSuccess] = useState(false);

  const defaultSEO: SEOMetadata = {
    pageId: selectedPage,
    pagePath: selectedPage === "home" ? "/" : `/${selectedPage}`,
    metaTitle: "VRAT System Integrators | Electronic Security & Automation Solutions",
    metaDescription: "VRAT System Integrators provides CCTV surveillance, fire alarm systems, access control, networking, home automation, and integrated electronic security solutions across India.",
    canonicalUrl: `https://vratsystem.com${selectedPage === "home" ? "" : `/${selectedPage}`}`,
    ogImage: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=1200&h=630&fit=crop&auto=format",
    keywords: ["CCTV", "Security System", "Fire Alarm", "Access Control", "Networking", "System Integrators"],
    indexPage: true,
  };

  const [formData, setFormData] = useState<SEOMetadata>(seoMetadata[selectedPage] || defaultSEO);

  const pages = [
    { id: "home", label: "Home Page (/)" },
    { id: "about", label: "About Us (/about)" },
    { id: "services", label: "Services Overview (/services)" },
    { id: "products", label: "Products Catalog (/products)" },
    { id: "solutions", label: "Industry Solutions (/solutions)" },
    { id: "projects", label: "Projects & Case Studies (/projects)" },
    { id: "gallery", label: "Multimedia Gallery (/gallery)" },
    { id: "downloads", label: "Download Center (/downloads)" },
    { id: "blog", label: "Blog & Insights (/blog)" },
    { id: "careers", label: "Careers Portal (/careers)" },
    { id: "contact", label: "Contact Us (/contact)" },
    { id: "faq", label: "FAQ Knowledge Base (/faq)" },
    { id: "support", label: "Customer Support (/support)" },
  ];

  const handleSelectPage = (id: string) => {
    setSelectedPage(id);
    setFormData(
      seoMetadata[id] || {
        ...defaultSEO,
        pageId: id,
        pagePath: id === "home" ? "/" : `/${id}`,
        canonicalUrl: `https://vratsystem.com${id === "home" ? "" : `/${id}`}`,
      }
    );
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSEOMetadata(selectedPage, formData);
    addLog("Updated SEO", "SEO", `Saved meta tags and OpenGraph configuration for page: ${selectedPage}`);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-5xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <Search className="w-3.5 h-3.5" />
            Search Engine Optimization
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">SEO & Meta Tags Manager</h1>
          <p className="text-slate-400 text-xs mt-1">Configure title tags, meta descriptions, OpenGraph social previews, and canonical indexing for all 29 pages.</p>
        </div>

        {saveSuccess && (
          <div className="inline-flex items-center gap-2 bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 px-4 py-2 rounded-xl text-xs font-bold animate-fade-in">
            <CheckCircle2 className="w-4 h-4" /> SEO Metadata Saved!
          </div>
        )}
      </div>

      <div className="grid lg:grid-cols-12 gap-8 items-start">
        {/* Page List */}
        <div className="lg:col-span-4 bg-slate-950 p-4 rounded-3xl border border-slate-800 space-y-1 max-h-[500px] overflow-y-auto scrollbar-thin">
          <div className="px-2 py-1 text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Select Page:</div>
          {pages.map((p) => (
            <button
              key={p.id}
              onClick={() => handleSelectPage(p.id)}
              className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-semibold transition ${
                selectedPage === p.id
                  ? "bg-blue-600 text-white"
                  : "text-slate-400 hover:bg-slate-900 hover:text-white"
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>

        {/* SEO Form */}
        <div className="lg:col-span-8 bg-slate-950 p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-xl space-y-5 text-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="font-bold text-white text-base">Meta Configuration for {formData.pagePath}</h3>
            <span className="text-blue-400 font-mono text-[11px]">{formData.canonicalUrl}</span>
          </div>

          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">SEO Title Tag (&lt;title&gt;) *</label>
              <input
                type="text"
                required
                value={formData.metaTitle}
                onChange={(e) => setFormData({ ...formData, metaTitle: e.target.value })}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white focus:ring-2 focus:ring-blue-500"
              />
              <div className="text-[10px] text-slate-500 mt-1">{formData.metaTitle.length} / 60 recommended characters</div>
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Meta Description *</label>
              <textarea
                rows={3}
                required
                value={formData.metaDescription}
                onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white leading-relaxed focus:ring-2 focus:ring-blue-500"
              />
              <div className="text-[10px] text-slate-500 mt-1">{formData.metaDescription.length} / 160 recommended characters</div>
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Social OpenGraph Image URL (1200x630)</label>
              <input
                type="url"
                value={formData.ogImage}
                onChange={(e) => setFormData({ ...formData, ogImage: e.target.value })}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">SEO Keywords (Comma-separated)</label>
              <input
                type="text"
                value={formData.keywords.join(", ")}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    keywords: e.target.value.split(",").map((x) => x.trim()).filter(Boolean),
                  })
                }
                className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white"
              />
            </div>

            <div className="flex items-center gap-4 pt-2">
              <label className="flex items-center gap-2 cursor-pointer text-slate-200 font-bold">
                <input
                  type="checkbox"
                  checked={formData.indexPage}
                  onChange={(e) => setFormData({ ...formData, indexPage: e.target.checked })}
                  className="w-4 h-4 rounded accent-blue-600"
                />
                <span>Allow Google to Index & Follow Page (robots.txt index, follow)</span>
              </label>
            </div>

            {/* Google Search Engine Result Preview */}
            <div className="bg-slate-900 p-4 rounded-2xl border border-slate-850 space-y-1 mt-4">
              <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Google SERP Snippet Preview:</div>
              <div className="text-blue-400 font-semibold text-sm hover:underline cursor-pointer truncate">
                {formData.metaTitle}
              </div>
              <div className="text-emerald-400 font-mono text-[11px] truncate">
                {formData.canonicalUrl}
              </div>
              <div className="text-slate-400 text-xs line-clamp-2 leading-relaxed">
                {formData.metaDescription}
              </div>
            </div>

            <div className="flex justify-end pt-3 border-t border-slate-800">
              <button
                type="submit"
                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl flex items-center gap-2 shadow-lg shadow-blue-600/30"
              >
                <Save className="w-4 h-4" /> Save SEO Settings
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
