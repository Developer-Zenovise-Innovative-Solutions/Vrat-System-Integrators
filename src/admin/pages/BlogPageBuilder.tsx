import React, { useState } from "react";
import ImageUploader from "../../components/ImageUploader";
import { BlogPageData, BlogPageSectionId } from "../../types";
import {
  Sparkles,
  BookOpen,
  FileText,
  Mail,
  Megaphone,
  ArrowUp,
  ArrowDown,
  Eye,
  EyeOff,
  RotateCcw,
  Save,
  Loader2,
  Sliders,
  Edit3,
  ExternalLink
} from "lucide-react";

export const BLOG_SECTION_METADATA: Record<
  BlogPageSectionId,
  { title: string; desc: string; icon: any; color: string }
> = {
  hero: {
    title: "1. Hero Banner",
    desc: "Top introductory banner with main headline, CTA buttons, and background image.",
    icon: Sparkles,
    color: "text-blue-400 bg-blue-500/10 border-blue-500/20",
  },
  featured: {
    title: "2. Featured Articles Header",
    desc: "Headline for leading technical analysis and enterprise security guides.",
    icon: BookOpen,
    color: "text-amber-400 bg-amber-500/10 border-amber-500/20",
  },
  articles_grid: {
    title: "3. Articles & Insights Grid",
    desc: "Interactive article cards with read times, categories, tags, and search.",
    icon: FileText,
    color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
  },
  newsletter: {
    title: "4. Knowledge Digest Newsletter",
    desc: "Dedicated subscription card capturing subscriber leads.",
    icon: Mail,
    color: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
  },
  cta: {
    title: "5. Expert Consultation Call To Action",
    desc: "Bottom full-width banner inviting direct engineering consultation.",
    icon: Megaphone,
    color: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20",
  },
};

interface BlogPageBuilderProps {
  data: BlogPageData;
  onChange: (updated: BlogPageData) => void;
  onSave: () => Promise<void>;
  isSaving: boolean;
  onResetLayout: () => void;
}

export default function BlogPageBuilder({
  data,
  onChange,
  onSave,
  isSaving,
  onResetLayout,
}: BlogPageBuilderProps) {
  const [activeTab, setActiveTab] = useState<"reorder" | "content">("reorder");
  const [selectedSection, setSelectedSection] = useState<BlogPageSectionId>("hero");

  const handleMoveUp = (index: number) => {
    if (index === 0) return;
    const newOrder = [...data.sectionOrder];
    const temp = newOrder[index - 1];
    newOrder[index - 1] = newOrder[index];
    newOrder[index] = temp;
    onChange({ ...data, sectionOrder: newOrder });
  };

  const handleMoveDown = (index: number) => {
    if (index === data.sectionOrder.length - 1) return;
    const newOrder = [...data.sectionOrder];
    const temp = newOrder[index + 1];
    newOrder[index + 1] = newOrder[index];
    newOrder[index + 1] = temp;
    onChange({ ...data, sectionOrder: newOrder });
  };

  const handleToggleVisibility = (secId: BlogPageSectionId) => {
    onChange({
      ...data,
      sectionVisibility: {
        ...data.sectionVisibility,
        [secId]: data.sectionVisibility[secId] === false ? true : false,
      },
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSave();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 animate-fade-in text-xs">
      {/* HEADER & MAIN ACTIONS */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/90 backdrop-blur-md p-6 rounded-3xl border border-slate-800 shadow-xl">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-400 uppercase tracking-wider mb-1">
            <span>Page Builder</span>
            <span>/</span>
            <span>Blog & Insights</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white">
            Blog & Insights Page Studio (/blog)
          </h2>
          <p className="text-slate-400 text-xs mt-1">
            Reorder page sections, toggle visibility, and update newsletter lead magnets and copy.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="/blog"
            target="_blank"
            rel="noreferrer"
            className="px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-300 font-semibold text-xs border border-slate-700 transition flex items-center gap-1.5"
          >
            <ExternalLink className="w-3.5 h-3.5 text-blue-400" /> Preview Live Page
          </a>
          <button
            type="submit"
            disabled={isSaving}
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-bold rounded-xl shadow-lg shadow-blue-600/30 transition flex items-center gap-2 text-xs"
          >
            {isSaving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> Saving Changes...
              </>
            ) : (
              <>
                <Save className="w-4 h-4" /> Save Page Layout & Content
              </>
            )}
          </button>
        </div>
      </div>

      {/* 2-TAB SWITCHER */}
      <div className="grid grid-cols-2 gap-3 p-1.5 bg-slate-900/90 rounded-2xl border border-slate-800">
        <button
          type="button"
          onClick={() => setActiveTab("reorder")}
          className={`py-3 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition ${
            activeTab === "reorder"
              ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
              : "text-slate-400 hover:text-white hover:bg-slate-800"
          }`}
        >
          <Sliders className="w-4 h-4" />
          <span>1. Section Placement & Reordering</span>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/20 text-white font-mono">
            {data.sectionOrder.length}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("content")}
          className={`py-3 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition ${
            activeTab === "content"
              ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
              : "text-slate-400 hover:text-white hover:bg-slate-800"
          }`}
        >
          <Edit3 className="w-4 h-4" />
          <span>2. Edit Section Content</span>
        </button>
      </div>

      {/* TAB 1: SECTION REORDERING */}
      {activeTab === "reorder" && (
        <div className="bg-slate-950 p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-xl space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-2">
            <div>
              <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">
                Live Page Structure
              </span>
              <h3 className="text-base font-bold text-white">Blog Page Section Placement</h3>
              <p className="text-slate-400 text-xs mt-0.5">
                Use Move Up and Move Down to reorder sections. Toggle the eye icon to show or hide sections.
              </p>
            </div>
            <button
              type="button"
              onClick={onResetLayout}
              className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-850 text-slate-300 font-semibold text-xs border border-slate-800 transition flex items-center gap-1.5 w-fit"
            >
              <RotateCcw className="w-3.5 h-3.5 text-blue-400" /> Reset Default Order
            </button>
          </div>

          <div className="space-y-3">
            {data.sectionOrder.map((secId, idx) => {
              const meta = BLOG_SECTION_METADATA[secId];
              const isVisible = data.sectionVisibility[secId] !== false;
              const Icon = meta.icon;

              return (
                <div
                  key={secId}
                  className={`p-4 rounded-2xl border transition flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                    isVisible
                      ? "bg-slate-900/80 border-slate-800 shadow-sm"
                      : "bg-slate-950/60 border-slate-850 opacity-60"
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <span className="w-7 h-7 rounded-xl bg-slate-800 border border-slate-700 text-slate-300 font-mono text-xs flex items-center justify-center font-bold flex-shrink-0">
                      {idx + 1}
                    </span>
                    <div className={`w-10 h-10 rounded-xl border flex items-center justify-center flex-shrink-0 ${meta.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white flex items-center gap-2">
                        <span>{meta.title}</span>
                        {!isVisible && (
                          <span className="px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 text-[10px] font-bold">
                            Hidden on Live Page
                          </span>
                        )}
                      </div>
                      <p className="text-slate-400 text-xs leading-relaxed max-w-xl">{meta.desc}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-center">
                    <button
                      type="button"
                      disabled={idx === 0}
                      onClick={() => handleMoveUp(idx)}
                      className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:hover:bg-slate-800 text-slate-200 transition"
                      title="Move Up"
                    >
                      <ArrowUp className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      disabled={idx === data.sectionOrder.length - 1}
                      onClick={() => handleMoveDown(idx)}
                      className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:hover:bg-slate-800 text-slate-200 transition"
                      title="Move Down"
                    >
                      <ArrowDown className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleToggleVisibility(secId)}
                      className={`p-2 rounded-xl border transition ${
                        isVisible
                          ? "bg-blue-600/20 border-blue-500/30 text-blue-400 hover:bg-blue-600/30"
                          : "bg-slate-800 border-slate-700 text-slate-400 hover:text-white"
                      }`}
                      title={isVisible ? "Hide Section" : "Show Section"}
                    >
                      {isVisible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedSection(secId);
                        setActiveTab("content");
                      }}
                      className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition flex items-center gap-1.5"
                    >
                      <Edit3 className="w-3.5 h-3.5 text-blue-400" /> Edit Fields
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: EDIT SECTION CONTENT */}
      {activeTab === "content" && (
        <div className="space-y-6">
          {/* Section Selector Pills */}
          <div className="p-3 bg-slate-900/90 rounded-2xl border border-slate-800 overflow-x-auto scrollbar-thin flex items-center gap-2">
            {data.sectionOrder.map((secId) => {
              const meta = BLOG_SECTION_METADATA[secId];
              const isSelected = selectedSection === secId;
              const Icon = meta.icon;

              return (
                <button
                  key={secId}
                  type="button"
                  onClick={() => setSelectedSection(secId)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl font-bold text-xs transition whitespace-nowrap ${
                    isSelected
                      ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                      : "text-slate-400 hover:text-white hover:bg-slate-800"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{meta.title}</span>
                </button>
              );
            })}
          </div>

          {/* SECTION 1: HERO */}
          {selectedSection === "hero" && (
            <div className="bg-slate-950 p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-xl space-y-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider pb-2 border-b border-slate-800 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-blue-400" /> Blog Hero Banner
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-slate-300 font-semibold mb-1">Badge Text</label>
                  <input
                    type="text"
                    value={data.hero.badge}
                    onChange={(e) =>
                      onChange({ ...data, hero: { ...data.hero, badge: e.target.value } })
                    }
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-slate-300 font-semibold mb-1">Main Heading</label>
                  <input
                    type="text"
                    value={data.hero.heading}
                    onChange={(e) =>
                      onChange({ ...data, hero: { ...data.hero, heading: e.target.value } })
                    }
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white focus:ring-2 focus:ring-blue-500 font-bold"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-slate-300 font-semibold mb-1">Subtitle / Narrative</label>
                  <textarea
                    rows={3}
                    value={data.hero.subtitle}
                    onChange={(e) =>
                      onChange({ ...data, hero: { ...data.hero, subtitle: e.target.value } })
                    }
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white focus:ring-2 focus:ring-blue-500 leading-relaxed"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">CTA Button Text</label>
                  <input
                    type="text"
                    value={data.hero.primaryCtaText}
                    onChange={(e) =>
                      onChange({ ...data, hero: { ...data.hero, primaryCtaText: e.target.value } })
                    }
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">CTA Button Link</label>
                  <input
                    type="text"
                    value={data.hero.primaryCtaLink}
                    onChange={(e) =>
                      onChange({ ...data, hero: { ...data.hero, primaryCtaLink: e.target.value } })
                    }
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white focus:ring-2 focus:ring-blue-500 font-mono text-xs"
                  />
                </div>
                <div className="sm:col-span-2">
                  <ImageUploader
                    value={data.hero.backgroundImage}
                    onChange={(url) =>
                      onChange({ ...data, hero: { ...data.hero, backgroundImage: url } })
                    }
                    folder="blog"
                    label="Hero Background Image Asset"
                  />
                </div>
              </div>
            </div>
          )}

          {/* SECTION 2: FEATURED */}
          {selectedSection === "featured" && (
            <div className="bg-slate-950 p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-xl space-y-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider pb-2 border-b border-slate-800 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-amber-400" /> Featured Insights Header
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Badge Text</label>
                  <input
                    type="text"
                    value={data.featured.badge}
                    onChange={(e) =>
                      onChange({ ...data, featured: { ...data.featured, badge: e.target.value } })
                    }
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Section Heading</label>
                  <input
                    type="text"
                    value={data.featured.heading}
                    onChange={(e) =>
                      onChange({ ...data, featured: { ...data.featured, heading: e.target.value } })
                    }
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white focus:ring-2 focus:ring-blue-500 font-bold"
                  />
                </div>
              </div>
            </div>
          )}

          {/* SECTION 3: ARTICLES GRID */}
          {selectedSection === "articles_grid" && (
            <div className="bg-slate-950 p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-xl space-y-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider pb-2 border-b border-slate-800 flex items-center gap-2">
                <FileText className="w-4 h-4 text-emerald-400" /> Articles & Publications Repository
              </h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                Full-length articles, featured images, and technical blogs are created and published through the <strong>Blog & Insights</strong> CMS module in the sidebar.
              </p>
            </div>
          )}

          {/* SECTION 4: NEWSLETTER */}
          {selectedSection === "newsletter" && (
            <div className="bg-slate-950 p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-xl space-y-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider pb-2 border-b border-slate-800 flex items-center gap-2">
                <Mail className="w-4 h-4 text-cyan-400" /> Knowledge Digest Newsletter
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-slate-300 font-semibold mb-1">Newsletter Title</label>
                  <input
                    type="text"
                    value={data.newsletter.heading}
                    onChange={(e) =>
                      onChange({
                        ...data,
                        newsletter: { ...data.newsletter, heading: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white focus:ring-2 focus:ring-blue-500 font-bold"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-slate-300 font-semibold mb-1">Newsletter Subtitle</label>
                  <input
                    type="text"
                    value={data.newsletter.subtitle}
                    onChange={(e) =>
                      onChange({
                        ...data,
                        newsletter: { ...data.newsletter, subtitle: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Button Label</label>
                  <input
                    type="text"
                    value={data.newsletter.buttonText}
                    onChange={(e) =>
                      onChange({
                        ...data,
                        newsletter: { ...data.newsletter, buttonText: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* SECTION 5: CTA */}
          {selectedSection === "cta" && (
            <div className="bg-slate-950 p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-xl space-y-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider pb-2 border-b border-slate-800 flex items-center gap-2">
                <Megaphone className="w-4 h-4 text-yellow-400" /> Expert Consultation CTA
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-slate-300 font-semibold mb-1">Headline</label>
                  <input
                    type="text"
                    value={data.cta.heading}
                    onChange={(e) =>
                      onChange({ ...data, cta: { ...data.cta, heading: e.target.value } })
                    }
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white focus:ring-2 focus:ring-blue-500 font-bold"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-slate-300 font-semibold mb-1">Subtitle</label>
                  <input
                    type="text"
                    value={data.cta.subtitle}
                    onChange={(e) =>
                      onChange({ ...data, cta: { ...data.cta, subtitle: e.target.value } })
                    }
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Button Text</label>
                  <input
                    type="text"
                    value={data.cta.primaryBtnText}
                    onChange={(e) =>
                      onChange({ ...data, cta: { ...data.cta, primaryBtnText: e.target.value } })
                    }
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Button Link</label>
                  <input
                    type="text"
                    value={data.cta.primaryBtnLink}
                    onChange={(e) =>
                      onChange({ ...data, cta: { ...data.cta, primaryBtnLink: e.target.value } })
                    }
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white focus:ring-2 focus:ring-blue-500 font-mono text-xs"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </form>
  );
}

