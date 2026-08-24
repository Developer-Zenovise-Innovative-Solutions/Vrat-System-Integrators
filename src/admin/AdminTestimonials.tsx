import React, { useState } from "react";
import { useCMS } from "../context/CMSContext";
import { TestimonialItem } from "../types";
import {
  Star,
  Plus,
  Edit2,
  Trash2,
  X,
  Save,
  Quote
} from "lucide-react";

export default function AdminTestimonials() {
  const { testimonials, addTestimonial, updateTestimonial, deleteTestimonial } = useCMS();
  const [editingItem, setEditingItem] = useState<TestimonialItem | null>(null);
  const [isNew, setIsNew] = useState(false);

  const handleCreateNew = () => {
    setEditingItem({
      id: "",
      name: "",
      designation: "Facility Director",
      company: "",
      industry: "Commercial",
      quote: "",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&auto=format",
      isFeatured: true,
      status: "Published",
    });
    setIsNew(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem || !editingItem.name || !editingItem.quote) return;

    if (isNew) {
      const { id, ...rest } = editingItem;
      addTestimonial(rest);
    } else {
      updateTestimonial(editingItem.id, editingItem);
    }
    setEditingItem(null);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <Star className="w-3.5 h-3.5" />
            Social Proof & Trust
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Client Testimonials CMS</h1>
          <p className="text-slate-400 text-xs mt-1">Manage verified client reviews and ratings across sectors.</p>
        </div>

        <button
          onClick={handleCreateNew}
          className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-xs transition shadow-lg shadow-blue-600/30 flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" /> Add Testimonial
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((t) => (
          <div
            key={t.id}
            className="bg-slate-950 rounded-3xl border border-slate-800 p-6 flex flex-col justify-between hover:border-slate-700 transition shadow-lg relative"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex text-amber-400">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                  ))}
                </div>
                {t.isFeatured && (
                  <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[10px] font-bold">Featured</span>
                )}
              </div>

              <p className="italic text-slate-300 text-xs leading-relaxed mb-4">
                "{t.quote}"
              </p>

              <div className="flex items-center gap-3 pt-3 border-t border-slate-850">
                <img src={t.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&auto=format"} alt={t.name} className="w-9 h-9 rounded-full object-cover border border-slate-800" />
                <div>
                  <div className="font-bold text-white text-xs">{t.name}</div>
                  <div className="text-slate-500 text-[10px]">{t.designation}, {t.company}</div>
                  <div className="text-blue-400 text-[10px]">{t.industry}</div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-850 mt-4">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300">
                {t.status}
              </span>
              <div className="space-x-2">
                <button
                  onClick={() => { setEditingItem(t); setIsNew(false); }}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => {
                    if (confirm(`Delete review from "${t.name}"?`)) deleteTestimonial(t.id);
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
      {editingItem && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 rounded-3xl max-w-md w-full border border-slate-800 shadow-2xl p-6 sm:p-8 animate-fade-in text-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h2 className="text-lg font-bold text-white">{isNew ? "Add Testimonial" : "Edit Testimonial"}</h2>
              <button onClick={() => setEditingItem(null)} className="p-1 text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-3.5">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Client Name *</label>
                <input
                  type="text"
                  required
                  value={editingItem.name}
                  onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Designation</label>
                  <input
                    type="text"
                    value={editingItem.designation}
                    onChange={(e) => setEditingItem({ ...editingItem, designation: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Company</label>
                  <input
                    type="text"
                    value={editingItem.company}
                    onChange={(e) => setEditingItem({ ...editingItem, company: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Client Quote *</label>
                <textarea
                  rows={3}
                  required
                  value={editingItem.quote}
                  onChange={(e) => setEditingItem({ ...editingItem, quote: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white leading-relaxed"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Industry Sector</label>
                <input
                  type="text"
                  value={editingItem.industry}
                  onChange={(e) => setEditingItem({ ...editingItem, industry: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="px-4 py-2 bg-slate-800 text-slate-300 font-semibold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl"
                >
                  Save Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
