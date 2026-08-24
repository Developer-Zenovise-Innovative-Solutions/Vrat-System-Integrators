import React, { useState } from "react";
import { useCMS } from "../context/CMSContext";
import { PartnerBrand } from "../types";
import {
  Handshake,
  Plus,
  Edit2,
  Trash2,
  X,
  Save,
  ExternalLink,
  CheckCircle2
} from "lucide-react";

export default function AdminPartners() {
  const { partners, addPartner, updatePartner, deletePartner } = useCMS();
  const [editingPartner, setEditingPartner] = useState<PartnerBrand | null>(null);
  const [isNew, setIsNew] = useState(false);

  const handleCreateNew = () => {
    setEditingPartner({
      id: "",
      name: "",
      category: "Surveillance",
      logo: "",
      websiteUrl: "https://",
      order: partners.length + 1,
      active: true,
    });
    setIsNew(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPartner || !editingPartner.name) return;

    if (isNew) {
      const { id, ...rest } = editingPartner;
      addPartner({ ...rest, logo: rest.name });
    } else {
      updatePartner(editingPartner.id, editingPartner);
    }
    setEditingPartner(null);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <Handshake className="w-3.5 h-3.5" />
            OEM & Technology Alliances
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Technology Partners CMS</h1>
          <p className="text-slate-400 text-xs mt-1">Manage global hardware and technology partner brand logos displayed across all website pages.</p>
        </div>

        <button
          onClick={handleCreateNew}
          className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-xs transition shadow-lg shadow-blue-600/30 flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" /> Add Partner Brand
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {partners.map((p) => (
          <div
            key={p.id}
            className="bg-slate-950 p-5 rounded-2xl border border-slate-800 flex flex-col justify-between hover:border-slate-700 transition"
          >
            <div>
              <div className="h-16 rounded-xl bg-slate-900 flex items-center justify-center font-bold text-base text-white mb-3">
                {p.name}
              </div>
              <div className="text-[11px] text-blue-400 font-semibold">{p.category}</div>
              <a
                href={p.websiteUrl}
                target="_blank"
                rel="noreferrer"
                className="text-[10px] text-slate-500 hover:text-slate-300 truncate block mt-0.5"
              >
                {p.websiteUrl}
              </a>
            </div>

            <div className="pt-3 border-t border-slate-850 flex items-center justify-between mt-3">
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${p.active ? "bg-emerald-500/20 text-emerald-300" : "bg-slate-800 text-slate-500"}`}>
                {p.active ? "Active" : "Hidden"}
              </span>
              <div className="space-x-1">
                <button
                  onClick={() => { setEditingPartner(p); setIsNew(false); }}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200"
                >
                  <Edit2 className="w-3 h-3" />
                </button>
                <button
                  onClick={() => {
                    if (confirm(`Delete partner "${p.name}"?`)) deletePartner(p.id);
                  }}
                  className="p-1.5 rounded-lg bg-rose-500/20 hover:bg-rose-500 text-rose-300 hover:text-white transition"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {editingPartner && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 rounded-3xl max-w-md w-full border border-slate-800 shadow-2xl p-6 sm:p-8 animate-fade-in text-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h2 className="text-lg font-bold text-white">{isNew ? "Add Brand" : "Edit Partner"}</h2>
              <button onClick={() => setEditingPartner(null)} className="p-1 text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-3.5">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Partner Brand Name *</label>
                <input
                  type="text"
                  required
                  value={editingPartner.name}
                  onChange={(e) => setEditingPartner({ ...editingPartner, name: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white"
                  placeholder="e.g. Hikvision, Cisco, Honeywell"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Technology Category</label>
                <input
                  type="text"
                  value={editingPartner.category}
                  onChange={(e) => setEditingPartner({ ...editingPartner, category: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white"
                  placeholder="e.g. Surveillance, Fire Safety, Networking"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Website URL</label>
                <input
                  type="url"
                  value={editingPartner.websiteUrl}
                  onChange={(e) => setEditingPartner({ ...editingPartner, websiteUrl: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white"
                  placeholder="https://www.example.com"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <label className="flex items-center gap-2 cursor-pointer text-slate-200 font-bold">
                  <input
                    type="checkbox"
                    checked={editingPartner.active}
                    onChange={(e) => setEditingPartner({ ...editingPartner, active: e.target.checked })}
                    className="w-4 h-4 rounded accent-blue-600"
                  />
                  <span>Active & Display on Website</span>
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setEditingPartner(null)}
                  className="px-4 py-2 bg-slate-800 text-slate-300 font-semibold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl"
                >
                  Save Partner
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
