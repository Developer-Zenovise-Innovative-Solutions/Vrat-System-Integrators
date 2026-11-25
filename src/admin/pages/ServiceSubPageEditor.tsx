import React, { useState, useEffect } from "react";
import ImageUploader from "../../components/ImageUploader";
import { ServiceItem } from "../../types";
import {
  ShieldCheck,
  Save,
  Loader2,
  ExternalLink,
  Plus,
  Trash2,
  CheckCircle2,
  Sparkles,
  Layers,
  Building2,
  Eye,
  EyeOff,
  Tag
} from "lucide-react";

interface ServiceSubPageEditorProps {
  service: ServiceItem;
  onSave: (updated: Partial<ServiceItem>) => Promise<void>;
  isSaving: boolean;
}

export default function ServiceSubPageEditor({
  service,
  onSave,
  isSaving,
}: ServiceSubPageEditorProps) {
  const [formData, setFormData] = useState<ServiceItem>(service);
  const [newFeature, setNewFeature] = useState("");
  const [newBenefit, setNewBenefit] = useState("");
  const [newApplication, setNewApplication] = useState("");

  useEffect(() => {
    setFormData(service);
  }, [service]);

  const handleAddFeature = () => {
    if (!newFeature.trim()) return;
    setFormData((prev) => ({
      ...prev,
      features: [...prev.features, newFeature.trim()],
    }));
    setNewFeature("");
  };

  const handleRemoveFeature = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index),
    }));
  };

  const handleAddBenefit = () => {
    if (!newBenefit.trim()) return;
    setFormData((prev) => ({
      ...prev,
      benefits: [...prev.benefits, newBenefit.trim()],
    }));
    setNewBenefit("");
  };

  const handleRemoveBenefit = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      benefits: prev.benefits.filter((_, i) => i !== index),
    }));
  };

  const handleAddApplication = () => {
    if (!newApplication.trim()) return;
    setFormData((prev) => ({
      ...prev,
      applications: [...(prev.applications || []), newApplication.trim()],
    }));
    setNewApplication("");
  };

  const handleRemoveApplication = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      applications: (prev.applications || []).filter((_, i) => i !== index),
    }));
  };

  const handleAddSolutionType = () => {
    setFormData((prev) => ({
      ...prev,
      solutionTypes: [
        ...(prev.solutionTypes || []),
        { title: "New System Configuration", desc: "Detailed configuration description." },
      ],
    }));
  };

  const handleRemoveSolutionType = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      solutionTypes: (prev.solutionTypes || []).filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const liveUrl = `/services/${formData.slug.replace(/^\/?services\//, "")}`;

  return (
    <form onSubmit={handleSubmit} className="space-y-8 animate-fade-in">
      {/* HEADER & ACTIONS */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/90 backdrop-blur-md p-4 sm:p-6 rounded-3xl border border-slate-800 shadow-xl">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-400 uppercase tracking-wider mb-1">
            <span>Services</span>
            <span>/</span>
            <span>Sub-Page Studio</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
            <span className="text-2xl">{formData.icon}</span>
            {formData.title}
          </h2>
          <div className="flex items-center gap-2 text-xs text-slate-400 mt-1">
            <span>Live URL:</span>
            <span className="text-blue-300 font-mono bg-slate-800/80 px-2 py-0.5 rounded">
              {liveUrl}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <a
            href={liveUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 px-4 py-2.5 bg-slate-800 hover:bg-slate-750 text-slate-300 text-xs font-semibold rounded-xl border border-slate-700 transition"
          >
            <Eye className="w-3.5 h-3.5 text-blue-400" />
            Live Preview
            <ExternalLink className="w-3 h-3 text-slate-400" />
          </a>

          <button
            type="submit"
            disabled={isSaving}
            className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 disabled:opacity-50 text-white text-xs font-bold rounded-xl transition shadow-lg shadow-blue-600/30"
          >
            {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            {isSaving ? "Publishing Changes..." : "Save & Publish to Live Website"}
          </button>
        </div>
      </div>

      {/* CORE DETAILS CARD */}
      <div className="bg-slate-950 p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-xl space-y-6">
        <div className="pb-4 border-b border-slate-800">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-blue-400" />
            General Sub-Page Details
          </h3>
          <p className="text-slate-400 text-xs mt-1">
            Configure sub-page headlines, publication status, navigation slug, and overview.
          </p>
        </div>

        <div className="grid sm:grid-cols-12 gap-5">
          <div className="sm:col-span-6">
            <label className="block text-xs font-semibold text-slate-300 mb-2">
              Service Sub-Page Title
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl text-white text-xs font-bold focus:border-blue-500 focus:outline-none"
              placeholder="e.g. CCTV Surveillance Systems"
            />
          </div>

          <div className="sm:col-span-3">
            <label className="block text-xs font-semibold text-slate-300 mb-2">
              URL Slug (Route Path)
            </label>
            <input
              type="text"
              required
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl text-white text-xs font-mono focus:border-blue-500 focus:outline-none"
              placeholder="e.g. cctv"
            />
          </div>

          <div className="sm:col-span-3">
            <label className="block text-xs font-semibold text-slate-300 mb-2">
              Publication Status
            </label>
            <select
              value={formData.status || "Published"}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  status: e.target.value as "Published" | "Draft",
                })
              }
              className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl text-white text-xs font-semibold focus:border-blue-500 focus:outline-none"
            >
              <option value="Published">Published (Live)</option>
              <option value="Draft">Draft (Hidden)</option>
            </select>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2">
              Short Description / Card Summary
            </label>
            <textarea
              rows={3}
              value={formData.shortDesc}
              onChange={(e) => setFormData({ ...formData, shortDesc: e.target.value })}
              className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl text-white text-xs focus:border-blue-500 focus:outline-none leading-relaxed"
              placeholder="Brief 1-2 sentence description..."
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2">
              Full Solution Overview Narrative
            </label>
            <textarea
              rows={3}
              value={formData.overview}
              onChange={(e) => setFormData({ ...formData, overview: e.target.value })}
              className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl text-white text-xs focus:border-blue-500 focus:outline-none leading-relaxed"
              placeholder="Detailed hero overview text..."
            />
          </div>
        </div>

        {/* COVER & HERO IMAGE UPLOADER */}
        <div>
          <ImageUploader
            label="Service Hero & Showcase Cover Image"
            value={formData.image}
            onChange={(url) => setFormData({ ...formData, image: url })}
          />
        </div>
      </div>

      {/* WHAT WE OFFER / CAPABILITIES */}
      <div className="bg-slate-950 p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              What We Offer (Capabilities & Features)
            </h3>
            <p className="text-slate-400 text-xs mt-1">
              Highlighted features and capabilities displayed on the sub-page grid.
            </p>
          </div>
          <span className="text-xs text-slate-400 font-mono">
            {formData.features.length} Items Total
          </span>
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            value={newFeature}
            onChange={(e) => setNewFeature(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleAddFeature();
              }
            }}
            placeholder="Type a new capability / feature and press Add..."
            className="flex-1 px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white text-xs focus:border-blue-500 focus:outline-none"
          />
          <button
            type="button"
            onClick={handleAddFeature}
            className="flex items-center gap-1.5 px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl transition"
          >
            <Plus className="w-3.5 h-3.5" /> Add
          </button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {formData.features.map((feat, fIdx) => (
            <div
              key={fIdx}
              className="flex items-center justify-between p-3 bg-slate-900 border border-slate-800 rounded-xl gap-2"
            >
              <div className="flex items-center gap-2 min-w-0">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <input
                  type="text"
                  value={feat}
                  onChange={(e) => {
                    const newF = [...formData.features];
                    newF[fIdx] = e.target.value;
                    setFormData({ ...formData, features: newF });
                  }}
                  className="bg-transparent text-white text-xs focus:outline-none w-full"
                />
              </div>
              <button
                type="button"
                onClick={() => handleRemoveFeature(fIdx)}
                className="text-slate-500 hover:text-rose-400 transition shrink-0"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* KEY BUSINESS BENEFITS */}
      <div className="bg-slate-950 p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-400" />
              Key Business Benefits
            </h3>
            <p className="text-slate-400 text-xs mt-1">
              Highlighted operational, security, and financial benefits for clients.
            </p>
          </div>
          <span className="text-xs text-slate-400 font-mono">
            {formData.benefits.length} Items Total
          </span>
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            value={newBenefit}
            onChange={(e) => setNewBenefit(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleAddBenefit();
              }
            }}
            placeholder="Type a new business benefit and press Add..."
            className="flex-1 px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white text-xs focus:border-blue-500 focus:outline-none"
          />
          <button
            type="button"
            onClick={handleAddBenefit}
            className="flex items-center gap-1.5 px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl transition"
          >
            <Plus className="w-3.5 h-3.5" /> Add
          </button>
        </div>

        <div className="grid sm:grid-cols-2 gap-3">
          {formData.benefits.map((ben, bIdx) => (
            <div
              key={bIdx}
              className="flex items-center justify-between p-3 bg-slate-900 border border-slate-800 rounded-xl gap-2"
            >
              <div className="flex items-center gap-2 min-w-0">
                <span className="w-5 h-5 rounded-full bg-blue-600/30 text-blue-400 text-xs font-bold flex items-center justify-center shrink-0">
                  ✓
                </span>
                <input
                  type="text"
                  value={ben}
                  onChange={(e) => {
                    const newB = [...formData.benefits];
                    newB[bIdx] = e.target.value;
                    setFormData({ ...formData, benefits: newB });
                  }}
                  className="bg-transparent text-white text-xs focus:outline-none w-full"
                />
              </div>
              <button
                type="button"
                onClick={() => handleRemoveBenefit(bIdx)}
                className="text-slate-500 hover:text-rose-400 transition shrink-0"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* SYSTEM CONFIGURATIONS & SOLUTION TYPES */}
      <div className="bg-slate-950 p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-cyan-400" />
              System Configurations & Sub-Types
            </h3>
            <p className="text-slate-400 text-xs mt-1">
              Optional architectural configurations (e.g. IP vs Analog, Addressable vs Conventional).
            </p>
          </div>
          <button
            type="button"
            onClick={handleAddSolutionType}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-blue-600/20 text-blue-400 hover:bg-blue-600/30 transition border border-blue-500/30 self-start sm:self-auto"
          >
            <Plus className="w-3.5 h-3.5" /> Add Configuration Option
          </button>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          {(formData.solutionTypes || []).map((st, stIdx) => (
            <div
              key={stIdx}
              className="p-4 bg-slate-900 border border-slate-800 rounded-2xl space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold text-cyan-400">
                  OPTION #{stIdx + 1}
                </span>
                <button
                  type="button"
                  onClick={() => handleRemoveSolutionType(stIdx)}
                  className="text-slate-500 hover:text-rose-400 transition"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
              <input
                type="text"
                value={st.title}
                onChange={(e) => {
                  const newTypes = [...(formData.solutionTypes || [])];
                  newTypes[stIdx] = { ...newTypes[stIdx], title: e.target.value };
                  setFormData({ ...formData, solutionTypes: newTypes });
                }}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs font-bold focus:border-blue-500 focus:outline-none"
                placeholder="Option Title"
              />
              <textarea
                rows={2}
                value={st.desc}
                onChange={(e) => {
                  const newTypes = [...(formData.solutionTypes || [])];
                  newTypes[stIdx] = { ...newTypes[stIdx], desc: e.target.value };
                  setFormData({ ...formData, solutionTypes: newTypes });
                }}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-slate-300 text-xs focus:border-blue-500 focus:outline-none"
                placeholder="Option description..."
              />
            </div>
          ))}
        </div>
      </div>

      {/* TARGET SECTORS & APPLICATIONS */}
      <div className="bg-slate-950 p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Building2 className="w-5 h-5 text-violet-400" />
              Target Sectors & Applications
            </h3>
            <p className="text-slate-400 text-xs mt-1">
              Recommended sectors for this service (e.g. Commercial, Industrial, Healthcare).
            </p>
          </div>
          <span className="text-xs text-slate-400 font-mono">
            {(formData.applications || []).length} Sectors
          </span>
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            value={newApplication}
            onChange={(e) => setNewApplication(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleAddApplication();
              }
            }}
            placeholder="Type a sector name and press Add..."
            className="flex-1 px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white text-xs focus:border-blue-500 focus:outline-none"
          />
          <button
            type="button"
            onClick={handleAddApplication}
            className="flex items-center gap-1.5 px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl transition"
          >
            <Plus className="w-3.5 h-3.5" /> Add Sector
          </button>
        </div>

        <div className="flex flex-wrap gap-2">
          {(formData.applications || []).map((app, aIdx) => (
            <span
              key={aIdx}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-medium text-slate-200"
            >
              <Tag className="w-3 h-3 text-violet-400" />
              <span>{app}</span>
              <button
                type="button"
                onClick={() => handleRemoveApplication(aIdx)}
                className="text-slate-500 hover:text-rose-400 transition ml-1"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* BOTTOM SAVE BAR */}
      <div className="flex justify-end pt-4">
        <button
          type="submit"
          disabled={isSaving}
          className="flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 disabled:opacity-50 text-white text-sm font-bold rounded-2xl transition shadow-xl shadow-blue-600/30"
        >
          {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          {isSaving ? "Publishing Changes..." : "Save & Publish to Live Website"}
        </button>
      </div>
    </form>
  );
}

