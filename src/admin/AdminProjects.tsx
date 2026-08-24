import React, { useState } from "react";
import { useCMS } from "../context/CMSContext";
import { CaseStudy } from "../types";
import {
  Briefcase,
  Plus,
  Edit2,
  Trash2,
  CheckCircle2,
  X,
  Save,
  Search,
  ExternalLink
} from "lucide-react";

export default function AdminProjects() {
  const { caseStudies, addCaseStudy, updateCaseStudy, deleteCaseStudy } = useCMS();
  const [editingCase, setEditingCase] = useState<CaseStudy | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [search, setSearch] = useState("");

  const filtered = caseStudies.filter((c) =>
    c.title.toLowerCase().includes(search.toLowerCase()) ||
    c.industry.toLowerCase().includes(search.toLowerCase()) ||
    c.location.toLowerCase().includes(search.toLowerCase())
  );

  const handleCreateNew = () => {
    setEditingCase({
      id: "",
      title: "",
      clientType: "Corporate Office",
      industry: "Commercial",
      location: "Ahmedabad, Gujarat",
      year: "2026",
      projectSize: "3 Floors • 400 Staff",
      technologyUsed: ["AI CCTV", "Access Control"],
      shortDesc: "",
      challenge: "",
      solution: "",
      results: ["Zero security breaches", "100% attendance tracking"],
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=900&h=550&fit=crop&auto=format",
      status: "Published",
    });
    setIsNew(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCase || !editingCase.title) return;

    if (isNew) {
      const { id, ...rest } = editingCase;
      addCaseStudy(rest);
    } else {
      updateCaseStudy(editingCase.id, editingCase);
    }
    setEditingCase(null);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <Briefcase className="w-3.5 h-3.5" />
            Case Studies CMS
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Projects & Portfolio Management</h1>
          <p className="text-slate-400 text-xs mt-1">Manage real-world enterprise deployments, before/after showcases, and client success stories.</p>
        </div>

        <button
          onClick={handleCreateNew}
          className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-xs transition shadow-lg shadow-blue-600/30 flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" /> Add Case Study
        </button>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Search case studies by title, industry, city..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((c) => (
          <div
            key={c.id}
            className="bg-slate-950 rounded-3xl border border-slate-800 p-6 flex flex-col justify-between hover:border-slate-700 transition shadow-lg"
          >
            <div>
              <div className="h-44 rounded-2xl overflow-hidden mb-4 bg-slate-900">
                <img src={c.image} alt={c.title} className="w-full h-full object-cover" />
              </div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 text-[10px] font-bold uppercase">
                  {c.industry}
                </span>
                <span className="text-[11px] text-slate-500">{c.year} • {c.location}</span>
              </div>
              <h3 className="font-bold text-white text-base mb-2 line-clamp-2 leading-snug">{c.title}</h3>
              <p className="text-slate-400 text-xs line-clamp-2 leading-relaxed mb-4">{c.shortDesc}</p>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-850">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300">
                {c.status}
              </span>
              <div className="space-x-2">
                <button
                  onClick={() => { setEditingCase(c); setIsNew(false); }}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => {
                    if (confirm(`Delete case study "${c.title}"?`)) deleteCaseStudy(c.id);
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
      {editingCase && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-slate-800 shadow-2xl p-6 sm:p-8 animate-fade-in text-xs space-y-4">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <h2 className="text-xl font-bold text-white">
                {isNew ? "Create Case Study" : `Edit: ${editingCase.title}`}
              </h2>
              <button onClick={() => setEditingCase(null)} className="p-1 text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Project / Case Study Title *</label>
                <input
                  type="text"
                  required
                  value={editingCase.title}
                  onChange={(e) => setEditingCase({ ...editingCase, title: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white"
                />
              </div>

              <div className="grid sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Industry</label>
                  <input
                    type="text"
                    value={editingCase.industry}
                    onChange={(e) => setEditingCase({ ...editingCase, industry: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Location</label>
                  <input
                    type="text"
                    value={editingCase.location}
                    onChange={(e) => setEditingCase({ ...editingCase, location: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Year</label>
                  <input
                    type="text"
                    value={editingCase.year}
                    onChange={(e) => setEditingCase({ ...editingCase, year: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Project Scale / Size</label>
                <input
                  type="text"
                  value={editingCase.projectSize}
                  onChange={(e) => setEditingCase({ ...editingCase, projectSize: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white"
                  placeholder="e.g. 5 Floors • 800 Staff • 180 Cameras"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Cover Image URL</label>
                <input
                  type="url"
                  value={editingCase.image}
                  onChange={(e) => setEditingCase({ ...editingCase, image: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Operational Challenge Faced by Client</label>
                <textarea
                  rows={2}
                  value={editingCase.challenge}
                  onChange={(e) => setEditingCase({ ...editingCase, challenge: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">VRAT Engineered Solution</label>
                <textarea
                  rows={2}
                  value={editingCase.solution}
                  onChange={(e) => setEditingCase({ ...editingCase, solution: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Key Measurable Results (Comma-separated)</label>
                <input
                  type="text"
                  value={editingCase.results.join(", ")}
                  onChange={(e) =>
                    setEditingCase({
                      ...editingCase,
                      results: e.target.value.split(",").map((x) => x.trim()).filter(Boolean),
                    })
                  }
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setEditingCase(null)}
                  className="px-4 py-2 bg-slate-800 text-slate-300 font-semibold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl flex items-center gap-1.5 shadow-lg shadow-blue-600/30"
                >
                  <Save className="w-4 h-4" /> Save Case Study
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
