import React, { useState } from "react";
import ImageUploader from "../../components/ImageUploader";
import { ServicesPageData, ServicesPageSectionId } from "../../types";
import { INITIAL_SERVICES_PAGE_DATA } from "../../data/initialData";
import {
  Sparkles,
  ShieldCheck,
  LayoutGrid,
  CheckCircle2,
  Briefcase,
  Zap,
  Award,
  HelpCircle,
  Megaphone,
  ArrowUp,
  ArrowDown,
  Eye,
  EyeOff,
  RotateCcw,
  Plus,
  Trash2,
  Save,
  Loader2,
  Sliders,
  Edit3
} from "lucide-react";

export const SERVICES_SECTION_METADATA: Record<
  ServicesPageSectionId,
  { title: string; desc: string; icon: any; color: string }
> = {
  hero: {
    title: "1. Hero Banner",
    desc: "Top introductory banner with main headline, CTA buttons, and background image.",
    icon: Sparkles,
    color: "text-blue-400 bg-blue-500/10 border-blue-500/20",
  },
  intro: {
    title: "2. Introduction Narrative",
    desc: "Complete security solutions under one roof narrative with 2 descriptive paragraphs.",
    icon: ShieldCheck,
    color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
  },
  services_grid: {
    title: "3. 9 Core Services Grid",
    desc: "Grid showcasing all 9 core electronic security, networking, and automation services.",
    icon: LayoutGrid,
    color: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
  },
  why_choose: {
    title: "4. Why Choose Our Services",
    desc: "8 core value propositions and custom solution design commitments.",
    icon: CheckCircle2,
    color: "text-indigo-400 bg-indigo-500/10 border-indigo-500/20",
  },
  industries: {
    title: "5. Industries We Serve",
    desc: "8 industry sectors with custom descriptions (Offices, Healthcare, Education, etc.).",
    icon: Briefcase,
    color: "text-violet-400 bg-violet-500/10 border-violet-500/20",
  },
  process: {
    title: "6. Our Service Process (How We Work)",
    desc: "8 structured execution steps from requirement analysis to AMC and support.",
    icon: Zap,
    color: "text-sky-400 bg-sky-500/10 border-sky-500/20",
  },
  stats: {
    title: "7. Highlights & Statistics Banner",
    desc: "6 key enterprise achievement numbers (17+ Years, 500+ Projects, etc.).",
    icon: Award,
    color: "text-amber-400 bg-amber-500/10 border-amber-500/20",
  },
  faqs: {
    title: "8. FAQ Knowledge Base",
    desc: "Frequently asked questions with interactive accordion answers.",
    icon: HelpCircle,
    color: "text-pink-400 bg-pink-500/10 border-pink-500/20",
  },
  cta: {
    title: "9. Call To Action Banner",
    desc: "Full-width action banner driving site survey and consultation inquiries.",
    icon: Megaphone,
    color: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20",
  },
};

interface ServicesPageBuilderProps {
  data: ServicesPageData;
  onChange: (updated: ServicesPageData) => void;
  onSave: () => Promise<void>;
  isSaving: boolean;
  onResetLayout: () => void;
}

export default function ServicesPageBuilder({
  data,
  onChange,
  onSave,
  isSaving,
  onResetLayout,
}: ServicesPageBuilderProps) {
  const [activeTab, setActiveTab] = useState<"reorder" | "content">("reorder");
  const [selectedSection, setSelectedSection] = useState<ServicesPageSectionId>("hero");

  // Reordering handlers
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
    newOrder[index] = temp;
    onChange({ ...data, sectionOrder: newOrder });
  };

  const handleToggleVisibility = (secId: ServicesPageSectionId) => {
    onChange({
      ...data,
      sectionVisibility: {
        ...data.sectionVisibility,
        [secId]: !data.sectionVisibility[secId],
      },
    });
  };

  const handleEditSection = (secId: ServicesPageSectionId) => {
    setSelectedSection(secId);
    setActiveTab("content");
  };

  // Section index helper
  const sectionKeys = data.sectionOrder;
  const currentIdx = sectionKeys.indexOf(selectedSection);

  const goToPrev = () => {
    if (currentIdx > 0) setSelectedSection(sectionKeys[currentIdx - 1]);
  };
  const goToNext = () => {
    if (currentIdx < sectionKeys.length - 1) setSelectedSection(sectionKeys[currentIdx + 1]);
  };

  return (
    <div className="space-y-6">
      {/* TOP TAB SWITCHER: ORDERING VS CONTENT */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-900/90 backdrop-blur-md p-2 rounded-2xl border border-slate-800">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveTab("reorder")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition ${
              activeTab === "reorder"
                ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                : "text-slate-400 hover:text-white hover:bg-slate-800"
            }`}
          >
            <Sliders className="w-4 h-4" />
            1. Section Placement & Reordering
            <span className="px-2 py-0.5 rounded-full bg-black/30 text-[10px] font-mono">
              {data.sectionOrder.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("content")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition ${
              activeTab === "content"
                ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                : "text-slate-400 hover:text-white hover:bg-slate-800"
            }`}
          >
            <Edit3 className="w-4 h-4" />
            2. Edit Section Content
          </button>
        </div>

        <button
          type="button"
          onClick={onSave}
          disabled={isSaving}
          className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 disabled:opacity-50 text-white text-xs font-bold rounded-xl transition shadow-lg shadow-blue-600/30"
        >
          {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          {isSaving ? "Publishing Changes..." : "Save & Publish to Live Website"}
        </button>
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: SECTION PLACEMENT & REORDERING                                      */}
      {/* ========================================================================= */}
      {activeTab === "reorder" && (
        <div className="bg-slate-950 p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-xl space-y-6 animate-fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-800">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-wider mb-1">
                <Sliders className="w-3.5 h-3.5" />
                Live Page Layout Architecture
              </div>
              <h2 className="text-xl font-bold text-white">Services Overview Section Placement</h2>
              <p className="text-slate-400 text-xs mt-1">
                Use <span className="text-blue-400 font-semibold">Move Up</span> and{" "}
                <span className="text-blue-400 font-semibold">Move Down</span> arrows to rearrange placement on the live website. Click Eye icon to hide/show sections.
              </p>
            </div>

            <button
              type="button"
              onClick={onResetLayout}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-xl transition border border-transparent hover:border-rose-500/20 self-start sm:self-auto"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset Default Order
            </button>
          </div>

          <div className="space-y-3">
            {data.sectionOrder.map((secId, index) => {
              const meta = SERVICES_SECTION_METADATA[secId];
              const isVisible = data.sectionVisibility[secId] !== false;
              const IconComp = meta?.icon || LayoutGrid;

              return (
                <div
                  key={secId}
                  className={`flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-2xl border transition gap-4 ${
                    isVisible
                      ? "bg-slate-900/80 border-slate-800 hover:border-slate-700"
                      : "bg-slate-950/40 border-slate-900 opacity-60"
                  }`}
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="w-8 h-8 rounded-xl bg-blue-600/20 border border-blue-500/30 text-blue-400 font-bold font-mono text-xs flex items-center justify-center shrink-0">
                      {index + 1}
                    </div>

                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center border shrink-0 ${meta?.color || "text-slate-400 bg-slate-800"}`}>
                      <IconComp className="w-4 h-4" />
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-white truncate">
                          {meta?.title || secId}
                        </span>
                        {!isVisible && (
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-rose-500/15 border border-rose-500/30 text-rose-400 font-mono">
                            HIDDEN
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">{meta?.desc}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
                    <button
                      type="button"
                      disabled={index === 0}
                      onClick={() => handleMoveUp(index)}
                      title="Move Up"
                      className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-25 disabled:cursor-not-allowed text-slate-200 transition"
                    >
                      <ArrowUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      disabled={index === data.sectionOrder.length - 1}
                      onClick={() => handleMoveDown(index)}
                      title="Move Down"
                      className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-25 disabled:cursor-not-allowed text-slate-200 transition"
                    >
                      <ArrowDown className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleToggleVisibility(secId)}
                      title={isVisible ? "Hide Section" : "Show Section"}
                      className={`p-2.5 rounded-xl transition ${
                        isVisible
                          ? "bg-blue-600/20 text-blue-400 hover:bg-blue-600/30"
                          : "bg-slate-800 text-slate-500 hover:bg-slate-700 hover:text-slate-300"
                      }`}
                    >
                      {isVisible ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                    </button>
                    <button
                      type="button"
                      onClick={() => handleEditSection(secId)}
                      className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white transition shadow-sm"
                    >
                      <Edit3 className="w-3 h-3" />
                      Edit Content
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: EDIT SECTION CONTENT (ONE SECTION AT A TIME WITH SPACIOUS UI)       */}
      {/* ========================================================================= */}
      {activeTab === "content" && (
        <div className="space-y-6 animate-fade-in">
          {/* HORIZONTAL SECTION SELECTOR PILL BAR */}
          <div className="bg-slate-950 p-4 rounded-3xl border border-slate-800 shadow-md">
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2.5 px-1">
              Select Section To Customize:
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
              {data.sectionOrder.map((secId, idx) => {
                const meta = SERVICES_SECTION_METADATA[secId];
                const isSelected = selectedSection === secId;
                const isVisible = data.sectionVisibility[secId] !== false;

                return (
                  <button
                    key={secId}
                    type="button"
                    onClick={() => setSelectedSection(secId)}
                    className={`p-3 rounded-2xl text-left border transition flex flex-col justify-between ${
                      isSelected
                        ? "bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-600/30"
                        : "bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-850"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-black/30">
                        0{idx + 1}
                      </span>
                      {!isVisible && (
                        <span className="text-[9px] px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-300 font-mono">
                          HIDDEN
                        </span>
                      )}
                    </div>
                    <div className="text-xs font-bold truncate">
                      {meta?.title.replace(/^\d+\.\s*/, "") || secId}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ACTIVE SECTION EDITOR CONTAINER WITH MAXIMUM BREATHING ROOM */}
          <div className="bg-slate-950 p-6 sm:p-10 rounded-3xl border border-slate-800 shadow-xl space-y-8">
            {/* Header of Active Section */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-wider mb-2">
                  Editing Section: {SERVICES_SECTION_METADATA[selectedSection]?.title}
                </div>
                <h3 className="text-2xl font-bold text-white">
                  {SERVICES_SECTION_METADATA[selectedSection]?.title}
                </h3>
                <p className="text-slate-400 text-xs mt-1">
                  {SERVICES_SECTION_METADATA[selectedSection]?.desc}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleToggleVisibility(selectedSection)}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold border transition ${
                    data.sectionVisibility[selectedSection] !== false
                      ? "bg-blue-600/10 border-blue-500/30 text-blue-400"
                      : "bg-slate-800 border-slate-700 text-slate-400"
                  }`}
                >
                  {data.sectionVisibility[selectedSection] !== false ? (
                    <>
                      <Eye className="w-3.5 h-3.5" /> Visible on Live Site
                    </>
                  ) : (
                    <>
                      <EyeOff className="w-3.5 h-3.5" /> Hidden from Live Site
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* SECTION-SPECIFIC FORM CONTENT */}

            {/* 1. HERO SECTION */}
            {selectedSection === "hero" && (
              <div className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-2">
                      Top Badge Text
                    </label>
                    <input
                      type="text"
                      value={data.hero.badge}
                      onChange={(e) =>
                        onChange({ ...data, hero: { ...data.hero, badge: e.target.value } })
                      }
                      className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl text-white text-xs focus:border-blue-500 focus:outline-none"
                      placeholder="e.g. Services Overview"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-2">
                      Main Heading / Headline
                    </label>
                    <input
                      type="text"
                      value={data.hero.heading}
                      onChange={(e) =>
                        onChange({ ...data, hero: { ...data.hero, heading: e.target.value } })
                      }
                      className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl text-white text-xs focus:border-blue-500 focus:outline-none"
                      placeholder="Enter hero main heading"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-2">
                    Hero Subtitle / Description
                  </label>
                  <textarea
                    rows={3}
                    value={data.hero.subtitle}
                    onChange={(e) =>
                      onChange({ ...data, hero: { ...data.hero, subtitle: e.target.value } })
                    }
                    className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl text-white text-xs focus:border-blue-500 focus:outline-none leading-relaxed"
                    placeholder="Enter hero description..."
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="space-y-3">
                    <label className="block text-xs font-semibold text-slate-300">
                      Primary CTA Button
                    </label>
                    <input
                      type="text"
                      value={data.hero.primaryCtaText}
                      onChange={(e) =>
                        onChange({
                          ...data,
                          hero: { ...data.hero, primaryCtaText: e.target.value },
                        })
                      }
                      className="w-full px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white text-xs mb-2 focus:border-blue-500 focus:outline-none"
                      placeholder="Button Label (e.g. Request a Free Consultation)"
                    />
                    <input
                      type="text"
                      value={data.hero.primaryCtaLink}
                      onChange={(e) =>
                        onChange({
                          ...data,
                          hero: { ...data.hero, primaryCtaLink: e.target.value },
                        })
                      }
                      className="w-full px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white text-xs focus:border-blue-500 focus:outline-none font-mono"
                      placeholder="Target Link (e.g. /contact)"
                    />
                  </div>

                  <div className="space-y-3">
                    <label className="block text-xs font-semibold text-slate-300">
                      Secondary CTA Button
                    </label>
                    <input
                      type="text"
                      value={data.hero.secondaryCtaText}
                      onChange={(e) =>
                        onChange({
                          ...data,
                          hero: { ...data.hero, secondaryCtaText: e.target.value },
                        })
                      }
                      className="w-full px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white text-xs mb-2 focus:border-blue-500 focus:outline-none"
                      placeholder="Button Label (e.g. Download Company Profile)"
                    />
                    <input
                      type="text"
                      value={data.hero.secondaryCtaLink}
                      onChange={(e) =>
                        onChange({
                          ...data,
                          hero: { ...data.hero, secondaryCtaLink: e.target.value },
                        })
                      }
                      className="w-full px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white text-xs focus:border-blue-500 focus:outline-none font-mono"
                      placeholder="Target Link (e.g. /downloads)"
                    />
                  </div>
                </div>

                <div>
                  <ImageUploader
                    label="Hero Background Cover Image"
                    value={data.hero.backgroundImage}
                    onChange={(url) =>
                      onChange({ ...data, hero: { ...data.hero, backgroundImage: url } })
                    }
                  />
                </div>
              </div>
            )}

            {/* 2. INTRO NARRATIVE */}
            {selectedSection === "intro" && (
              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-2">
                    Section Headline
                  </label>
                  <input
                    type="text"
                    value={data.intro.heading}
                    onChange={(e) =>
                      onChange({ ...data, intro: { ...data.intro, heading: e.target.value } })
                    }
                    className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl text-white text-xs focus:border-blue-500 focus:outline-none"
                    placeholder="e.g. Complete Security Solutions Under One Roof"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-2">
                    Paragraph 1 (Primary Narrative)
                  </label>
                  <textarea
                    rows={4}
                    value={data.intro.p1}
                    onChange={(e) =>
                      onChange({ ...data, intro: { ...data.intro, p1: e.target.value } })
                    }
                    className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl text-white text-xs focus:border-blue-500 focus:outline-none leading-relaxed"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-2">
                    Paragraph 2 (Secondary Evaluation Narrative)
                  </label>
                  <textarea
                    rows={3}
                    value={data.intro.p2}
                    onChange={(e) =>
                      onChange({ ...data, intro: { ...data.intro, p2: e.target.value } })
                    }
                    className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl text-white text-xs focus:border-blue-500 focus:outline-none leading-relaxed"
                  />
                </div>
              </div>
            )}

            {/* 3. 9 CORE SERVICES GRID */}
            {selectedSection === "services_grid" && (
              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-2">
                    Services Grid Section Badge
                  </label>
                  <input
                    type="text"
                    value={data.servicesGrid.badge}
                    onChange={(e) =>
                      onChange({
                        ...data,
                        servicesGrid: { ...data.servicesGrid, badge: e.target.value },
                      })
                    }
                    className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl text-white text-xs focus:border-blue-500 focus:outline-none"
                    placeholder="e.g. Security, Networking & Automation Solutions"
                  />
                </div>

                <div className="p-6 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-300 space-y-2">
                  <div className="flex items-center gap-2 font-bold text-sm text-white">
                    <ShieldCheck className="w-5 h-5 text-blue-400" />
                    Dynamic 9 Core Services
                  </div>
                  <p className="text-xs text-blue-200/80 leading-relaxed">
                    This section automatically loads and displays all active services configured in your system (CCTV, Fire Alarm, Access Control, Time Attendance, Public Address, Video Door Phone, Boom Barrier, Networking, and Automation).
                  </p>
                  <p className="text-xs text-blue-200/80">
                    To edit individual service cover images, features tags, benefits, and descriptions, select the specific sub-page from the left sidebar tree under <span className="font-semibold text-white">Services Overview</span>.
                  </p>
                </div>
              </div>
            )}

            {/* 4. WHY CHOOSE OUR SERVICES */}
            {selectedSection === "why_choose" && (
              <div className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-2">
                      Section Badge
                    </label>
                    <input
                      type="text"
                      value={data.whyChoose.badge}
                      onChange={(e) =>
                        onChange({
                          ...data,
                          whyChoose: { ...data.whyChoose, badge: e.target.value },
                        })
                      }
                      className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl text-white text-xs focus:border-blue-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-2">
                      Main Heading
                    </label>
                    <input
                      type="text"
                      value={data.whyChoose.heading}
                      onChange={(e) =>
                        onChange({
                          ...data,
                          whyChoose: { ...data.whyChoose, heading: e.target.value },
                        })
                      }
                      className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl text-white text-xs focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-2">
                    Subtitle Description
                  </label>
                  <textarea
                    rows={2}
                    value={data.whyChoose.subtitle}
                    onChange={(e) =>
                      onChange({
                        ...data,
                        whyChoose: { ...data.whyChoose, subtitle: e.target.value },
                      })
                    }
                    className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl text-white text-xs focus:border-blue-500 focus:outline-none leading-relaxed"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-xs font-semibold text-slate-300">
                      Why Choose Value Pillars ({data.whyChoose.items.length})
                    </label>
                    <button
                      type="button"
                      onClick={() =>
                        onChange({
                          ...data,
                          whyChoose: {
                            ...data.whyChoose,
                            items: [...data.whyChoose.items, "New Enterprise Benefit"],
                          },
                        })
                      }
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-blue-600/20 text-blue-400 hover:bg-blue-600/30 transition border border-blue-500/30"
                    >
                      <Plus className="w-3.5 h-3.5" /> Add Pillar
                    </button>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-3">
                    {data.whyChoose.items.map((point, pIdx) => (
                      <div
                        key={pIdx}
                        className="flex items-center gap-2 p-2.5 bg-slate-900 border border-slate-800 rounded-xl"
                      >
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        <input
                          type="text"
                          value={point}
                          onChange={(e) => {
                            const newItems = [...data.whyChoose.items];
                            newItems[pIdx] = e.target.value;
                            onChange({
                              ...data,
                              whyChoose: { ...data.whyChoose, items: newItems },
                            });
                          }}
                          className="w-full bg-transparent text-white text-xs focus:outline-none"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const newItems = data.whyChoose.items.filter((_, i) => i !== pIdx);
                            onChange({
                              ...data,
                              whyChoose: { ...data.whyChoose, items: newItems },
                            });
                          }}
                          className="p-1 text-slate-500 hover:text-rose-400 transition"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* 5. INDUSTRIES WE SERVE */}
            {selectedSection === "industries" && (
              <div className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-2">
                      Badge Text
                    </label>
                    <input
                      type="text"
                      value={data.industries.badge}
                      onChange={(e) =>
                        onChange({
                          ...data,
                          industries: { ...data.industries, badge: e.target.value },
                        })
                      }
                      className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl text-white text-xs focus:border-blue-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-2">
                      Heading
                    </label>
                    <input
                      type="text"
                      value={data.industries.heading}
                      onChange={(e) =>
                        onChange({
                          ...data,
                          industries: { ...data.industries, heading: e.target.value },
                        })
                      }
                      className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl text-white text-xs focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-xs font-semibold text-slate-300">
                      Sectors & Industries ({data.industries.items.length})
                    </label>
                    <button
                      type="button"
                      onClick={() =>
                        onChange({
                          ...data,
                          industries: {
                            ...data.industries,
                            items: [
                              ...data.industries.items,
                              { name: "New Sector", desc: "Security and integration description." },
                            ],
                          },
                        })
                      }
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-blue-600/20 text-blue-400 hover:bg-blue-600/30 transition border border-blue-500/30"
                    >
                      <Plus className="w-3.5 h-3.5" /> Add Industry
                    </button>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    {data.industries.items.map((ind, iIdx) => (
                      <div
                        key={iIdx}
                        className="p-4 bg-slate-900 border border-slate-800 rounded-2xl space-y-3"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-mono font-bold text-blue-400">
                            SECTOR 0{iIdx + 1}
                          </span>
                          <button
                            type="button"
                            onClick={() => {
                              const newItems = data.industries.items.filter((_, i) => i !== iIdx);
                              onChange({
                                ...data,
                                industries: { ...data.industries, items: newItems },
                              });
                            }}
                            className="text-slate-500 hover:text-rose-400 transition"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <input
                          type="text"
                          value={ind.name}
                          onChange={(e) => {
                            const newItems = [...data.industries.items];
                            newItems[iIdx] = { ...newItems[iIdx], name: e.target.value };
                            onChange({
                              ...data,
                              industries: { ...data.industries, items: newItems },
                            });
                          }}
                          className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs font-bold focus:border-blue-500 focus:outline-none"
                          placeholder="Industry Name"
                        />
                        <textarea
                          rows={2}
                          value={ind.desc}
                          onChange={(e) => {
                            const newItems = [...data.industries.items];
                            newItems[iIdx] = { ...newItems[iIdx], desc: e.target.value };
                            onChange({
                              ...data,
                              industries: { ...data.industries, items: newItems },
                            });
                          }}
                          className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-slate-300 text-xs focus:border-blue-500 focus:outline-none"
                          placeholder="Industry scope / security solutions description"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* 6. OUR SERVICE PROCESS */}
            {selectedSection === "process" && (
              <div className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-2">
                      Badge Text
                    </label>
                    <input
                      type="text"
                      value={data.process.badge}
                      onChange={(e) =>
                        onChange({ ...data, process: { ...data.process, badge: e.target.value } })
                      }
                      className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl text-white text-xs focus:border-blue-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-2">
                      Section Heading
                    </label>
                    <input
                      type="text"
                      value={data.process.heading}
                      onChange={(e) =>
                        onChange({ ...data, process: { ...data.process, heading: e.target.value } })
                      }
                      className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl text-white text-xs focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-xs font-semibold text-slate-300">
                      Process Steps ({data.process.steps.length})
                    </label>
                    <button
                      type="button"
                      onClick={() => {
                        const stepNum = String(data.process.steps.length + 1).padStart(2, "0");
                        onChange({
                          ...data,
                          process: {
                            ...data.process,
                            steps: [
                              ...data.process.steps,
                              { step: stepNum, title: "New Step", desc: "Step description." },
                            ],
                          },
                        });
                      }}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-blue-600/20 text-blue-400 hover:bg-blue-600/30 transition border border-blue-500/30"
                    >
                      <Plus className="w-3.5 h-3.5" /> Add Step
                    </button>
                  </div>

                  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {data.process.steps.map((st, sIdx) => (
                      <div
                        key={sIdx}
                        className="p-4 bg-slate-900 border border-slate-800 rounded-2xl space-y-3"
                      >
                        <div className="flex items-center justify-between">
                          <input
                            type="text"
                            value={st.step}
                            onChange={(e) => {
                              const newSteps = [...data.process.steps];
                              newSteps[sIdx] = { ...newSteps[sIdx], step: e.target.value };
                              onChange({
                                ...data,
                                process: { ...data.process, steps: newSteps },
                              });
                            }}
                            className="w-12 px-2 py-1 bg-blue-500/20 text-blue-400 font-mono font-bold text-xs rounded border border-blue-500/30 text-center"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              const newSteps = data.process.steps.filter((_, i) => i !== sIdx);
                              onChange({
                                ...data,
                                process: { ...data.process, steps: newSteps },
                              });
                            }}
                            className="text-slate-500 hover:text-rose-400 transition"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <input
                          type="text"
                          value={st.title}
                          onChange={(e) => {
                            const newSteps = [...data.process.steps];
                            newSteps[sIdx] = { ...newSteps[sIdx], title: e.target.value };
                            onChange({
                              ...data,
                              process: { ...data.process, steps: newSteps },
                            });
                          }}
                          className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs font-bold focus:border-blue-500 focus:outline-none"
                          placeholder="Step Title"
                        />
                        <textarea
                          rows={2}
                          value={st.desc}
                          onChange={(e) => {
                            const newSteps = [...data.process.steps];
                            newSteps[sIdx] = { ...newSteps[sIdx], desc: e.target.value };
                            onChange({
                              ...data,
                              process: { ...data.process, steps: newSteps },
                            });
                          }}
                          className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-slate-300 text-xs focus:border-blue-500 focus:outline-none"
                          placeholder="Step description"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* 7. STATS BANNER */}
            {selectedSection === "stats" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between mb-3">
                  <label className="text-xs font-semibold text-slate-300">
                    Service Metric Highlights ({data.stats.items.length})
                  </label>
                  <button
                    type="button"
                    onClick={() =>
                      onChange({
                        ...data,
                        stats: {
                          ...data.stats,
                          items: [...data.stats.items, "New Enterprise Highlight"],
                        },
                      })
                    }
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-blue-600/20 text-blue-400 hover:bg-blue-600/30 transition border border-blue-500/30"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Stat
                  </button>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {data.stats.items.map((stat, statIdx) => (
                    <div
                      key={statIdx}
                      className="flex items-center gap-2 p-3 bg-slate-900 border border-slate-800 rounded-xl"
                    >
                      <Award className="w-4 h-4 text-amber-400 shrink-0" />
                      <input
                        type="text"
                        value={stat}
                        onChange={(e) => {
                          const newStats = [...data.stats.items];
                          newStats[statIdx] = e.target.value;
                          onChange({ ...data, stats: { ...data.stats, items: newStats } });
                        }}
                        className="w-full bg-transparent text-white text-xs font-semibold focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const newStats = data.stats.items.filter((_, i) => i !== statIdx);
                          onChange({ ...data, stats: { ...data.stats, items: newStats } });
                        }}
                        className="p-1 text-slate-500 hover:text-rose-400 transition"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 8. FAQS */}
            {selectedSection === "faqs" && (
              <div className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-2">
                      Badge Text
                    </label>
                    <input
                      type="text"
                      value={data.faqs.badge}
                      onChange={(e) =>
                        onChange({ ...data, faqs: { ...data.faqs, badge: e.target.value } })
                      }
                      className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl text-white text-xs focus:border-blue-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-2">
                      Heading
                    </label>
                    <input
                      type="text"
                      value={data.faqs.heading}
                      onChange={(e) =>
                        onChange({ ...data, faqs: { ...data.faqs, heading: e.target.value } })
                      }
                      className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl text-white text-xs focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-xs font-semibold text-slate-300">
                      Questions & Answers ({data.faqs.items.length})
                    </label>
                    <button
                      type="button"
                      onClick={() =>
                        onChange({
                          ...data,
                          faqs: {
                            ...data.faqs,
                            items: [
                              ...data.faqs.items,
                              { q: "New Question?", a: "Detailed answer explaining the solution." },
                            ],
                          },
                        })
                      }
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-blue-600/20 text-blue-400 hover:bg-blue-600/30 transition border border-blue-500/30"
                    >
                      <Plus className="w-3.5 h-3.5" /> Add FAQ Item
                    </button>
                  </div>

                  <div className="space-y-4">
                    {data.faqs.items.map((faq, fIdx) => (
                      <div
                        key={fIdx}
                        className="p-5 bg-slate-900 border border-slate-800 rounded-2xl space-y-3"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-mono font-bold text-pink-400">
                            FAQ #{fIdx + 1}
                          </span>
                          <button
                            type="button"
                            onClick={() => {
                              const newFaqs = data.faqs.items.filter((_, i) => i !== fIdx);
                              onChange({ ...data, faqs: { ...data.faqs, items: newFaqs } });
                            }}
                            className="text-slate-500 hover:text-rose-400 transition"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <input
                          type="text"
                          value={faq.q}
                          onChange={(e) => {
                            const newFaqs = [...data.faqs.items];
                            newFaqs[fIdx] = { ...newFaqs[fIdx], q: e.target.value };
                            onChange({ ...data, faqs: { ...data.faqs, items: newFaqs } });
                          }}
                          className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs font-bold focus:border-blue-500 focus:outline-none"
                          placeholder="Question"
                        />
                        <textarea
                          rows={3}
                          value={faq.a}
                          onChange={(e) => {
                            const newFaqs = [...data.faqs.items];
                            newFaqs[fIdx] = { ...newFaqs[fIdx], a: e.target.value };
                            onChange({ ...data, faqs: { ...data.faqs, items: newFaqs } });
                          }}
                          className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-300 text-xs focus:border-blue-500 focus:outline-none leading-relaxed"
                          placeholder="Answer description..."
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* 9. CTA */}
            {selectedSection === "cta" && (
              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-2">
                    Action Headline
                  </label>
                  <input
                    type="text"
                    value={data.cta.heading}
                    onChange={(e) =>
                      onChange({ ...data, cta: { ...data.cta, heading: e.target.value } })
                    }
                    className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl text-white text-xs focus:border-blue-500 focus:outline-none"
                    placeholder="e.g. Ready to Secure Your Business?"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-2">
                    Subtitle Description
                  </label>
                  <textarea
                    rows={3}
                    value={data.cta.subtitle}
                    onChange={(e) =>
                      onChange({ ...data, cta: { ...data.cta, subtitle: e.target.value } })
                    }
                    className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl text-white text-xs focus:border-blue-500 focus:outline-none leading-relaxed"
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="space-y-3">
                    <label className="block text-xs font-semibold text-slate-300">
                      Primary Action Button
                    </label>
                    <input
                      type="text"
                      value={data.cta.primaryBtnText}
                      onChange={(e) =>
                        onChange({
                          ...data,
                          cta: { ...data.cta, primaryBtnText: e.target.value },
                        })
                      }
                      className="w-full px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white text-xs mb-2 focus:border-blue-500 focus:outline-none"
                      placeholder="Button Label (e.g. Request a Site Survey)"
                    />
                    <input
                      type="text"
                      value={data.cta.primaryBtnLink}
                      onChange={(e) =>
                        onChange({
                          ...data,
                          cta: { ...data.cta, primaryBtnLink: e.target.value },
                        })
                      }
                      className="w-full px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white text-xs focus:border-blue-500 focus:outline-none font-mono"
                      placeholder="Target Link (e.g. /contact)"
                    />
                  </div>

                  <div className="space-y-3">
                    <label className="block text-xs font-semibold text-slate-300">
                      Secondary Action Button
                    </label>
                    <input
                      type="text"
                      value={data.cta.secondaryBtnText}
                      onChange={(e) =>
                        onChange({
                          ...data,
                          cta: { ...data.cta, secondaryBtnText: e.target.value },
                        })
                      }
                      className="w-full px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white text-xs mb-2 focus:border-blue-500 focus:outline-none"
                      placeholder="Button Label (e.g. Talk to an Expert)"
                    />
                    <input
                      type="text"
                      value={data.cta.secondaryBtnLink}
                      onChange={(e) =>
                        onChange({
                          ...data,
                          cta: { ...data.cta, secondaryBtnLink: e.target.value },
                        })
                      }
                      className="w-full px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white text-xs focus:border-blue-500 focus:outline-none font-mono"
                      placeholder="Target Link (e.g. /contact)"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Bottom Section Navigation & Quick Save */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-slate-800">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  disabled={currentIdx === 0}
                  onClick={goToPrev}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-900 hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed text-slate-300 border border-slate-800 transition"
                >
                  ← Previous Section
                </button>
                <button
                  type="button"
                  disabled={currentIdx === sectionKeys.length - 1}
                  onClick={goToNext}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-900 hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed text-slate-300 border border-slate-800 transition"
                >
                  Next Section →
                </button>
              </div>

              <button
                type="button"
                onClick={onSave}
                disabled={isSaving}
                className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white text-xs font-bold rounded-xl transition shadow-lg shadow-blue-600/30"
              >
                {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                {isSaving ? "Saving..." : "Save & Publish Changes"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

