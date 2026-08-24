import React, { useState } from "react";
import { useCMS } from "../context/CMSContext";
import { MediaItem } from "../types";
import {
  Image as ImageIcon,
  Upload,
  Copy,
  Trash2,
  Check,
  Search,
  Plus,
  X,
  CheckCircle2
} from "lucide-react";

export default function AdminMedia() {
  const { mediaItems, addMediaItem, deleteMediaItem, updateMediaAltText } = useCMS();
  const [search, setSearch] = useState("");
  const [selectedCat, setSelectedCat] = useState("All");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Upload Modal
  const [showUpload, setShowUpload] = useState(false);
  const [newMedia, setNewMedia] = useState({
    filename: "",
    url: "",
    category: "Surveillance",
    altText: "",
    size: "350 KB",
    dimensions: "1920x1080",
    type: "image" as const,
  });

  const categories = ["All", "Surveillance", "Fire Safety", "Access Control", "Networking", "Automation", "General"];

  const filteredMedia = mediaItems.filter((m) => {
    const matchesSearch =
      m.filename.toLowerCase().includes(search.toLowerCase()) ||
      m.altText.toLowerCase().includes(search.toLowerCase());
    const matchesCat = selectedCat === "All" || m.category === selectedCat;
    return matchesSearch && matchesCat;
  });

  const handleCopyUrl = (id: string, url: string) => {
    navigator.clipboard?.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMedia.url || !newMedia.filename) return;

    addMediaItem(newMedia);
    setShowUpload(false);
    setNewMedia({
      filename: "",
      url: "",
      category: "Surveillance",
      altText: "",
      size: "350 KB",
      dimensions: "1920x1080",
      type: "image",
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/10 text-teal-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <ImageIcon className="w-3.5 h-3.5" />
            Media Assets CMS
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Media Library & File Assets</h1>
          <p className="text-slate-400 text-xs mt-1">Upload images, copy asset URLs for page heroes, and optimize SEO alt text tags.</p>
        </div>

        <button
          onClick={() => setShowUpload(true)}
          className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-xs transition shadow-lg shadow-blue-600/30 flex items-center gap-1.5"
        >
          <Upload className="w-4 h-4" /> Upload / Add Media URL
        </button>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative flex-1 max-w-md w-full">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search media by filename or alt text..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setSelectedCat(c)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
                selectedCat === c
                  ? "bg-blue-600 text-white"
                  : "bg-slate-950 text-slate-400 hover:bg-slate-900"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Media Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {filteredMedia.map((m) => (
          <div
            key={m.id}
            className="bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden group shadow-md hover:shadow-xl transition"
          >
            <div className="relative h-36 bg-slate-900 overflow-hidden">
              <img src={m.url} alt={m.altText} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
              <div className="absolute top-2 left-2">
                <span className="px-2 py-0.5 rounded bg-slate-950/80 text-[10px] font-bold text-white uppercase">
                  {m.category}
                </span>
              </div>
            </div>

            <div className="p-3 space-y-2 text-xs">
              <div className="font-bold text-white truncate">{m.filename}</div>
              <div className="text-[11px] text-slate-400 truncate">{m.altText || "No Alt text defined"}</div>
              <div className="text-[10px] text-slate-500 flex items-center justify-between">
                <span>{m.size}</span>
                <span>{m.dimensions}</span>
              </div>

              <div className="pt-2 border-t border-slate-850 flex items-center justify-between gap-1">
                <button
                  onClick={() => handleCopyUrl(m.id, m.url)}
                  className="flex-1 py-1.5 px-2 bg-slate-900 hover:bg-slate-800 text-slate-200 rounded-lg text-[11px] font-semibold flex items-center justify-center gap-1 transition"
                >
                  {copiedId === m.id ? (
                    <><Check className="w-3 h-3 text-emerald-400" /> Copied</>
                  ) : (
                    <><Copy className="w-3 h-3 text-blue-400" /> Copy URL</>
                  )}
                </button>
                <button
                  onClick={() => {
                    if (confirm(`Delete media "${m.filename}"?`)) deleteMediaItem(m.id);
                  }}
                  className="p-1.5 rounded-lg bg-rose-500/20 hover:bg-rose-500 text-rose-300 hover:text-white transition"
                  title="Delete"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Upload Modal */}
      {showUpload && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 rounded-3xl max-w-md w-full border border-slate-800 shadow-2xl p-6 sm:p-8 animate-fade-in text-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h2 className="text-lg font-bold text-white">Add New Media Asset</h2>
              <button onClick={() => setShowUpload(false)} className="p-1 text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUploadSubmit} className="space-y-3.5">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Image / Asset URL *</label>
                <input
                  type="url"
                  required
                  value={newMedia.url}
                  onChange={(e) => setNewMedia({ ...newMedia, url: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white"
                  placeholder="https://images.unsplash.com/..."
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Filename *</label>
                <input
                  type="text"
                  required
                  value={newMedia.filename}
                  onChange={(e) => setNewMedia({ ...newMedia, filename: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white"
                  placeholder="e.g. cctv-surveillance-hub.webp"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Category</label>
                  <select
                    value={newMedia.category}
                    onChange={(e) => setNewMedia({ ...newMedia, category: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white"
                  >
                    <option value="Surveillance">Surveillance</option>
                    <option value="Fire Safety">Fire Safety</option>
                    <option value="Access Control">Access Control</option>
                    <option value="Networking">Networking</option>
                    <option value="Automation">Automation</option>
                    <option value="General">General</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">File Size</label>
                  <input
                    type="text"
                    value={newMedia.size}
                    onChange={(e) => setNewMedia({ ...newMedia, size: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">SEO Alt Text Description</label>
                <input
                  type="text"
                  value={newMedia.altText}
                  onChange={(e) => setNewMedia({ ...newMedia, altText: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white"
                  placeholder="Describe image contents for SEO and accessibility..."
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowUpload(false)}
                  className="px-4 py-2 bg-slate-800 text-slate-300 font-semibold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl"
                >
                  Save Asset
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
