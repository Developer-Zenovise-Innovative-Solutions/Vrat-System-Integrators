import React, { useState } from "react";
import { useCMS } from "../context/CMSContext";
import { IndustrySolution } from "../types";
import {
  FileText,
  Plus,
  Edit2,
  Trash2,
  CheckCircle2,
  X,
  Save,
  Search,
  Building2
} from "lucide-react";

export default function AdminSolutions() {
  const { solutions, addSolution, updateSolution, deleteSolution } = useCMS();
  const [editingSol, setEditingSol] = useState<IndustrySolution | null>(null);
  const [isNew, setIsNew] = useState(false);

  const handleCreateNew = () => {
    setEditingSol({
      id: "",
      slug: "new-industry",
      title: "",
      subtitle: "",
      desc: "",
      icon: "Building2",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=500&fit=crop&auto=format",
      challenges: ["Unmonitored entries", "High downtime"],
      solutionsProvided: ["Integrated CCTV", "Biometric Access Control"],
      keyFeatures: [{ title: "High Security", desc: "Enterprise protection" }],
      architectureSteps: ["Surveillance ── Access Control ── Central Server"],
      successMetrics: ["50% reduction in incidents"],
      status: "Published",
    });
    setIsNew(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSol || !editingSol.title) return;

    if (isNew) {
      const { id, ...rest } = editingSol;
      addSolution(rest);
    } else {
      updateSolution(editingSol.id, editingSol);
    }
    setEditingSol(null);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <Building2 className="w-3.5 h-3.5" />
            Industry Solutions CMS
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">8 Industry Sectors Management</h1>
          <p className="text-slate-400 text-xs mt-1">Manage Commercial, Industrial, Residential, Education, Healthcare, Retail, Warehouse, and Smart City solutions.</p>
        </div>

        <button
          onClick={handleCreateNew}
          className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-xs transition shadow-lg shadow-blue-600/30 flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" /> Add Industry Solution
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {solutions.map((sol) => (
          <div
            key={sol.id}
            className="bg-slate-950 rounded-3xl border border-slate-800 p-6 flex flex-col justify-between hover:border-slate-700 transition shadow-lg"
          >
            <div>
              <div className="h-40 rounded-2xl overflow-hidden mb-4 bg-slate-900">
                <img src={sol.image} alt={sol.title} className="w-full h-full object-cover" />
              </div>
              <span className="text-[10px] font-bold text-purple-400 uppercase tracking-wider">/solutions/{sol.slug}</span>
              <h3 className="font-bold text-white text-base mt-1 mb-1">{sol.title}</h3>
              <p className="text-slate-400 text-xs line-clamp-2 leading-relaxed mb-4">{sol.subtitle}</p>

              <div className="space-y-1.5 text-xs text-slate-300 mb-4">
                <div><span className="text-slate-500">Challenges:</span> {sol.challenges.length} defined</div>
                <div><span className="text-slate-500">Key Features:</span> {sol.keyFeatures.length} configured</div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-850">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300">
                {sol.status}
              </span>
              <div className="space-x-2">
                <button
                  onClick={() => { setEditingSol(sol); setIsNew(false); }}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => {
                    if (confirm(`Delete industry solution "${sol.title}"?`)) deleteSolution(sol.id);
                  }}
                  className="p-1.5 rounded-lg bg-rose-500/20 hover:bg-rose-500 text-rose-300 hover:text-white transition"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {editingSol && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-slate-800 shadow-2xl p-6 sm:p-8 animate-fade-in text-xs space-y-4">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <h2 className="text-xl font-bold text-white">
                {isNew ? "Create Industry Solution" : `Edit Solution: ${editingSol.title}`}
              </h2>
              <button onClick={() => setEditingSol(null)} className="p-1 text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Industry Title *</label>
                  <input
                    type="text"
                    required
                    value={editingSol.title}
                    onChange={(e) => setEditingSol({ ...editingSol, title: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">URL Slug *</label>
                  <input
                    type="text"
                    required
                    value={editingSol.slug}
                    onChange={(e) => setEditingSol({ ...editingSol, slug: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Subtitle / Tagline</label>
                <input
                  type="text"
                  value={editingSol.subtitle}
                  onChange={(e) => setEditingSol({ ...editingSol, subtitle: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Detailed Description</label>
                <textarea
                  rows={3}
                  value={editingSol.desc}
                  onChange={(e) => setEditingSol({ ...editingSol, desc: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Image URL</label>
                <input
                  type="url"
                  value={editingSol.image}
                  onChange={(e) => setEditingSol({ ...editingSol, image: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Industry Challenges (Comma-separated)</label>
                <textarea
                  rows={2}
                  value={editingSol.challenges.join(", ")}
                  onChange={(e) =>
                    setEditingSol({
                      ...editingSol,
                      challenges: e.target.value.split(",").map((x) => x.trim()).filter(Boolean),
                    })
                  }
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setEditingSol(null)}
                  className="px-4 py-2 bg-slate-800 text-slate-300 font-semibold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl flex items-center gap-1.5 shadow-lg shadow-blue-600/30"
                >
                  <Save className="w-4 h-4" /> Save Solution
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
