import React, { useState } from "react";
import { useCMS } from "../context/CMSContext";
import { ServiceItem } from "../types";
import {
  Layers,
  Plus,
  Edit2,
  Trash2,
  CheckCircle2,
  X,
  Save,
  Search,
  ExternalLink
} from "lucide-react";

export default function AdminServices() {
  const { services, addService, updateService, deleteService } = useCMS();
  const [editingService, setEditingService] = useState<ServiceItem | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [search, setSearch] = useState("");

  const filteredServices = services.filter((s) =>
    s.title.toLowerCase().includes(search.toLowerCase()) ||
    s.shortDesc.toLowerCase().includes(search.toLowerCase())
  );

  const handleEdit = (s: ServiceItem) => {
    setEditingService(s);
    setIsNew(false);
  };

  const handleCreateNew = () => {
    setEditingService({
      id: "",
      slug: "new-service",
      title: "",
      shortDesc: "",
      overview: "",
      icon: "ShieldCheck",
      image: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=800&h=500&fit=crop&auto=format",
      features: ["Enterprise Quality", "24x7 Monitoring", "Certified Installation"],
      benefits: ["High Reliability", "Cost Optimization"],
      applications: ["Commercial", "Industrial"],
      status: "Published",
      order: services.length + 1,
    });
    setIsNew(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingService || !editingService.title) return;

    if (isNew) {
      const { id, ...rest } = editingService;
      addService(rest);
    } else {
      updateService(editingService.id, editingService);
    }
    setEditingService(null);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <Layers className="w-3.5 h-3.5" />
            Services Management
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Core Services CMS</h1>
          <p className="text-slate-400 text-xs mt-1">Manage 9 core technology and electronic security services.</p>
        </div>

        <button
          onClick={handleCreateNew}
          className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-xs transition shadow-lg shadow-blue-600/30 flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" /> Add New Service
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-md">
        <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Search services by title or description..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Services Table */}
      <div className="bg-slate-950 rounded-3xl border border-slate-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900 border-b border-slate-800 text-slate-400 font-bold uppercase tracking-wider">
              <tr>
                <th className="p-4">Service</th>
                <th className="p-4">URL Slug</th>
                <th className="p-4">Features Count</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-850">
              {filteredServices.map((s) => (
                <tr key={s.id} className="hover:bg-slate-900/50 transition">
                  <td className="p-4 flex items-center gap-3">
                    <img src={s.image} alt={s.title} className="w-12 h-10 object-cover rounded-lg" />
                    <div>
                      <div className="font-bold text-white text-sm">{s.title}</div>
                      <div className="text-slate-400 text-[11px] line-clamp-1 max-w-xs">{s.shortDesc}</div>
                    </div>
                  </td>
                  <td className="p-4 font-mono text-slate-300">/services/{s.slug}</td>
                  <td className="p-4 text-slate-300">{s.features.length} Features</td>
                  <td className="p-4">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      {s.status}
                    </span>
                  </td>
                  <td className="p-4 text-right space-x-2">
                    <button
                      onClick={() => handleEdit(s)}
                      className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200"
                      title="Edit"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Delete service "${s.title}"?`)) deleteService(s.id);
                      }}
                      className="p-1.5 rounded-lg bg-rose-500/20 hover:bg-rose-500 text-rose-300 hover:text-white transition"
                      title="Delete"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit/Create Modal */}
      {editingService && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-slate-800 shadow-2xl p-6 sm:p-8 animate-fade-in">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
              <h2 className="text-xl font-bold text-white">
                {isNew ? "Create New Service" : `Edit Service: ${editingService.title}`}
              </h2>
              <button onClick={() => setEditingService(null)} className="p-1 text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Service Title *</label>
                  <input
                    type="text"
                    required
                    value={editingService.title}
                    onChange={(e) => setEditingService({ ...editingService, title: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">URL Slug *</label>
                  <input
                    type="text"
                    required
                    value={editingService.slug}
                    onChange={(e) => setEditingService({ ...editingService, slug: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Short Description (Cards)</label>
                <textarea
                  rows={2}
                  value={editingService.shortDesc}
                  onChange={(e) => setEditingService({ ...editingService, shortDesc: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Detailed Overview</label>
                <textarea
                  rows={3}
                  value={editingService.overview}
                  onChange={(e) => setEditingService({ ...editingService, overview: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Cover Image URL</label>
                <input
                  type="url"
                  value={editingService.image}
                  onChange={(e) => setEditingService({ ...editingService, image: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Key Features (Comma-separated)</label>
                <input
                  type="text"
                  value={editingService.features.join(", ")}
                  onChange={(e) =>
                    setEditingService({
                      ...editingService,
                      features: e.target.value.split(",").map((x) => x.trim()).filter(Boolean),
                    })
                  }
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Benefits (Comma-separated)</label>
                <input
                  type="text"
                  value={editingService.benefits.join(", ")}
                  onChange={(e) =>
                    setEditingService({
                      ...editingService,
                      benefits: e.target.value.split(",").map((x) => x.trim()).filter(Boolean),
                    })
                  }
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setEditingService(null)}
                  className="px-4 py-2 bg-slate-800 text-slate-300 font-semibold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl flex items-center gap-1.5 shadow-lg shadow-blue-600/30"
                >
                  <Save className="w-4 h-4" /> Save Service
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
