import React, { useState, useEffect } from "react";
import ImageUploader from "../../components/ImageUploader";
import { IndustrySolution } from "../../types";
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
  Quote,
  Award,
  ShieldAlert
} from "lucide-react";

interface SolutionSubPageEditorProps {
  solution: IndustrySolution;
  onSave: (updated: Partial<IndustrySolution>) => Promise<void>;
  isSaving: boolean;
}

export default function SolutionSubPageEditor({
  solution,
  onSave,
  isSaving,
}: SolutionSubPageEditorProps) {
  const [formData, setFormData] = useState<IndustrySolution>(solution);
  const [newChallenge, setNewChallenge] = useState("");
  const [newSolution, setNewSolution] = useState("");
  const [newStep, setNewStep] = useState("");
  const [newMetric, setNewMetric] = useState("");

  useEffect(() => {
    setFormData(solution);
  }, [solution]);

  const handleAddChallenge = () => {
    if (!newChallenge.trim()) return;
    setFormData((prev) => ({
      ...prev,
      challenges: [...prev.challenges, newChallenge.trim()],
    }));
    setNewChallenge("");
  };

  const handleRemoveChallenge = (idx: number) => {
    setFormData((prev) => ({
      ...prev,
      challenges: prev.challenges.filter((_, i) => i !== idx),
    }));
  };

  const handleAddSolution = () => {
    if (!newSolution.trim()) return;
    setFormData((prev) => ({
      ...prev,
      solutionsProvided: [...prev.solutionsProvided, newSolution.trim()],
    }));
    setNewSolution("");
  };

  const handleRemoveSolution = (idx: number) => {
    setFormData((prev) => ({
      ...prev,
      solutionsProvided: prev.solutionsProvided.filter((_, i) => i !== idx),
    }));
  };

  const handleAddStep = () => {
    if (!newStep.trim()) return;
    setFormData((prev) => ({
      ...prev,
      architectureSteps: [...prev.architectureSteps, newStep.trim()],
    }));
    setNewStep("");
  };

  const handleRemoveStep = (idx: number) => {
    setFormData((prev) => ({
      ...prev,
      architectureSteps: prev.architectureSteps.filter((_, i) => i !== idx),
    }));
  };

  const handleAddFeature = () => {
    setFormData((prev) => ({
      ...prev,
      keyFeatures: [
        ...prev.keyFeatures,
        { title: "New Specialized Feature", desc: "Detailed technical feature narrative." },
      ],
    }));
  };

  const handleRemoveFeature = (idx: number) => {
    setFormData((prev) => ({
      ...prev,
      keyFeatures: prev.keyFeatures.filter((_, i) => i !== idx),
    }));
  };

  const handleAddMetric = () => {
    if (!newMetric.trim()) return;
    setFormData((prev) => ({
      ...prev,
      successMetrics: [...prev.successMetrics, newMetric.trim()],
    }));
    setNewMetric("");
  };

  const handleRemoveMetric = (idx: number) => {
    setFormData((prev) => ({
      ...prev,
      successMetrics: prev.successMetrics.filter((_, i) => i !== idx),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const liveUrl = `/solutions/${formData.slug.replace(/^\/?solutions\//, "")}`;

  return (
    <form onSubmit={handleSubmit} className="space-y-6 animate-fade-in text-xs">
      {/* HEADER & ACTIONS */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/90 backdrop-blur-md p-6 rounded-3xl border border-slate-800 shadow-xl">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-400 uppercase tracking-wider mb-1">
            <span>Industry Solutions</span>
            <span>/</span>
            <span>Sector Studio</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-3">
            <span>{formData.title}</span>
            <span
              className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                formData.status === "Published"
                  ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                  : "bg-amber-500/20 text-amber-300 border border-amber-500/30"
              }`}
            >
              {formData.status}
            </span>
          </h2>
          <p className="text-slate-400 text-xs mt-1">
            Edit specific industry challenges, VRAT solutions, architecture diagrams, and client testimonials.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <a
            href={liveUrl}
            target="_blank"
            rel="noreferrer"
            className="px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-300 font-semibold text-xs border border-slate-700 transition flex items-center gap-1.5"
          >
            <ExternalLink className="w-3.5 h-3.5 text-blue-400" /> Preview Live Sector
          </a>
          <button
            type="submit"
            disabled={isSaving}
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-bold rounded-xl shadow-lg shadow-blue-600/30 transition flex items-center gap-2 text-xs"
          >
            {isSaving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> Saving...
              </>
            ) : (
              <>
                <Save className="w-4 h-4" /> Save Sub-Page
              </>
            )}
          </button>
        </div>
      </div>

      {/* BASIC IDENTITY */}
      <div className="bg-slate-950 p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-xl space-y-4">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider pb-2 border-b border-slate-800 flex items-center gap-2">
          <Building2 className="w-4 h-4 text-blue-400" /> Sector Overview & Metadata
        </h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-slate-300 font-semibold mb-1">Sector Title</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white focus:ring-2 focus:ring-blue-500 font-bold"
            />
          </div>
          <div>
            <label className="block text-slate-300 font-semibold mb-1">Publication Status</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
              className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white focus:ring-2 focus:ring-blue-500"
            >
              <option value="Published">Published (Live on Website)</option>
              <option value="Draft">Draft (Hidden)</option>
            </select>
          </div>
          <div className="sm:col-span-2">
            <label className="block text-slate-300 font-semibold mb-1">Sector Subtitle / Catchphrase</label>
            <input
              type="text"
              value={formData.subtitle}
              onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
              className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-slate-300 font-semibold mb-1">Detailed Narrative</label>
            <textarea
              rows={3}
              value={formData.desc}
              onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
              className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white focus:ring-2 focus:ring-blue-500 leading-relaxed"
            />
          </div>
          <div className="sm:col-span-2">
            <ImageUploader
              value={formData.image || formData.heroImage || ""}
              onChange={(url) => setFormData({ ...formData, image: url, heroImage: url })}
              folder="solutions"
              label="Sector Showcase Image Asset"
            />
          </div>
        </div>
      </div>

      {/* CHALLENGES VS SOLUTIONS BREAKDOWN */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Challenges Card */}
        <div className="bg-slate-950 p-6 rounded-3xl border border-slate-800 shadow-xl space-y-4">
          <div className="flex items-center gap-2 text-rose-400 font-bold text-sm uppercase">
            <ShieldAlert className="w-4 h-4" /> Key Industry Challenges
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Add challenge point..."
              value={newChallenge}
              onChange={(e) => setNewChallenge(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleAddChallenge();
                }
              }}
              className="flex-1 px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white"
            />
            <button
              type="button"
              onClick={handleAddChallenge}
              className="px-3 py-2 bg-rose-600/30 hover:bg-rose-600/50 text-rose-300 rounded-xl font-bold flex items-center gap-1"
            >
              <Plus className="w-4 h-4" /> Add
            </button>
          </div>
          <ul className="space-y-2">
            {formData.challenges.map((ch, idx) => (
              <li
                key={idx}
                className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900 border border-slate-850 gap-2"
              >
                <span className="text-slate-300">{ch}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveChallenge(idx)}
                  className="text-slate-500 hover:text-rose-400"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Solutions Provided Card */}
        <div className="bg-slate-950 p-6 rounded-3xl border border-slate-800 shadow-xl space-y-4">
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm uppercase">
            <CheckCircle2 className="w-4 h-4" /> Engineered VRAT Solutions
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Add engineered solution..."
              value={newSolution}
              onChange={(e) => setNewSolution(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleAddSolution();
                }
              }}
              className="flex-1 px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white"
            />
            <button
              type="button"
              onClick={handleAddSolution}
              className="px-3 py-2 bg-emerald-600/30 hover:bg-emerald-600/50 text-emerald-300 rounded-xl font-bold flex items-center gap-1"
            >
              <Plus className="w-4 h-4" /> Add
            </button>
          </div>
          <ul className="space-y-2">
            {formData.solutionsProvided.map((sol, idx) => (
              <li
                key={idx}
                className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900 border border-slate-850 gap-2"
              >
                <span className="text-slate-300">{sol}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveSolution(idx)}
                  className="text-slate-500 hover:text-rose-400"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ARCHITECTURE STEPS */}
      <div className="bg-slate-950 p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-xl space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
          <div className="flex items-center gap-2 text-blue-400 font-bold text-sm uppercase">
            <Layers className="w-4 h-4" /> Integrated Architecture Steps
          </div>
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Add architecture step (e.g. AI Perimeter Video Analytics)..."
            value={newStep}
            onChange={(e) => setNewStep(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleAddStep();
              }
            }}
            className="flex-1 px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white"
          />
          <button
            type="button"
            onClick={handleAddStep}
            className="px-3.5 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold flex items-center gap-1"
          >
            <Plus className="w-4 h-4" /> Add Step
          </button>
        </div>
        <div className="grid sm:grid-cols-2 gap-3">
          {formData.architectureSteps.map((step, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-slate-850 gap-2"
            >
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-blue-600/30 text-blue-400 font-mono text-xs flex items-center justify-center font-bold">
                  {idx + 1}
                </span>
                <span className="text-slate-200">{step}</span>
              </div>
              <button
                type="button"
                onClick={() => handleRemoveStep(idx)}
                className="text-slate-500 hover:text-rose-400"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* SPECIALIZED FEATURES */}
      <div className="bg-slate-950 p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-xl space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
          <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm uppercase">
            <Sparkles className="w-4 h-4" /> Specialized Industry Features
          </div>
          <button
            type="button"
            onClick={handleAddFeature}
            className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-850 text-blue-400 font-semibold border border-slate-800 transition flex items-center gap-1 text-xs"
          >
            <Plus className="w-3.5 h-3.5" /> Add Feature Card
          </button>
        </div>
        <div className="grid sm:grid-cols-3 gap-4">
          {formData.keyFeatures.map((feat, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2 relative">
              <button
                type="button"
                onClick={() => handleRemoveFeature(idx)}
                className="absolute top-3 right-3 text-slate-500 hover:text-rose-400"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
              <input
                type="text"
                value={feat.title}
                onChange={(e) => {
                  const newF = [...formData.keyFeatures];
                  newF[idx] = { ...feat, title: e.target.value };
                  setFormData({ ...formData, keyFeatures: newF });
                }}
                className="w-full pr-6 px-2.5 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-white font-bold"
              />
              <textarea
                rows={3}
                value={feat.desc}
                onChange={(e) => {
                  const newF = [...formData.keyFeatures];
                  newF[idx] = { ...feat, desc: e.target.value };
                  setFormData({ ...formData, keyFeatures: newF });
                }}
                className="w-full px-2.5 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-slate-300 text-xs"
              />
            </div>
          ))}
        </div>
      </div>

      {/* SUCCESS METRICS & TESTIMONIAL */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Metrics Card */}
        <div className="bg-slate-950 p-6 rounded-3xl border border-slate-800 shadow-xl space-y-4">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-sm uppercase">
            <Award className="w-4 h-4" /> Measurable Success Metrics
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="e.g. 35% Reduction in Unauthorized Entries..."
              value={newMetric}
              onChange={(e) => setNewMetric(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleAddMetric();
                }
              }}
              className="flex-1 px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white"
            />
            <button
              type="button"
              onClick={handleAddMetric}
              className="px-3 py-2 bg-amber-600/30 hover:bg-amber-600/50 text-amber-300 rounded-xl font-bold flex items-center gap-1"
            >
              <Plus className="w-4 h-4" /> Add
            </button>
          </div>
          <ul className="space-y-2">
            {formData.successMetrics.map((met, idx) => (
              <li
                key={idx}
                className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900 border border-slate-850 gap-2"
              >
                <span className="text-slate-300">{met}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveMetric(idx)}
                  className="text-slate-500 hover:text-rose-400"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Testimonial Card */}
        <div className="bg-slate-950 p-6 rounded-3xl border border-slate-800 shadow-xl space-y-3">
          <div className="flex items-center gap-2 text-violet-400 font-bold text-sm uppercase">
            <Quote className="w-4 h-4" /> Client Testimonial / Endorsement
          </div>
          <div>
            <label className="block text-slate-300 font-semibold mb-1">Client Quote</label>
            <textarea
              rows={2}
              value={formData.testimonial?.quote || ""}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  testimonial: {
                    ...(formData.testimonial || { client: "", role: "" }),
                    quote: e.target.value,
                  },
                })
              }
              className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-800 rounded-xl text-white italic"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Client Name / Org</label>
              <input
                type="text"
                value={formData.testimonial?.client || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    testimonial: {
                      ...(formData.testimonial || { quote: "", role: "" }),
                      client: e.target.value,
                    },
                  })
                }
                className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-800 rounded-xl text-white font-bold"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Client Title / Role</label>
              <input
                type="text"
                value={formData.testimonial?.role || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    testimonial: {
                      ...(formData.testimonial || { quote: "", client: "" }),
                      role: e.target.value,
                    },
                  })
                }
                className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-800 rounded-xl text-white"
              />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

