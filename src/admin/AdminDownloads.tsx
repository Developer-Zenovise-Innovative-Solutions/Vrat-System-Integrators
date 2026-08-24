import React, { useState } from "react";
import { useCMS } from "../context/CMSContext";
import { DownloadItem } from "../types";
import {
  FolderDown,
  Plus,
  Edit2,
  Trash2,
  X,
  Save,
  Search,
  Download
} from "lucide-react";

export default function AdminDownloads() {
  const { downloads, addDownload, updateDownload, deleteDownload } = useCMS();
  const [editingDoc, setEditingDoc] = useState<DownloadItem | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [search, setSearch] = useState("");

  const filtered = downloads.filter((d) =>
    d.title.toLowerCase().includes(search.toLowerCase()) ||
    d.category.toLowerCase().includes(search.toLowerCase())
  );

  const handleCreateNew = () => {
    setEditingDoc({
      id: "",
      title: "",
      category: "Product Catalogues",
      description: "",
      fileType: "PDF",
      fileSize: "2.5 MB",
      version: "v1.0",
      updatedDate: new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" }),
      downloadUrl: "#file",
      downloadsCount: 0,
      status: "Published",
    });
    setIsNew(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingDoc || !editingDoc.title) return;

    if (isNew) {
      const { id, ...rest } = editingDoc;
      addDownload(rest);
    } else {
      updateDownload(editingDoc.id, editingDoc);
    }
    setEditingDoc(null);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <FolderDown className="w-3.5 h-3.5" />
            Downloads & Documents CMS
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Download Center Files</h1>
          <p className="text-slate-400 text-xs mt-1">Manage technical datasheets, brochures, tender BOQs, and manuals.</p>
        </div>

        <button
          onClick={handleCreateNew}
          className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-xs transition shadow-lg shadow-blue-600/30 flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" /> Add Document File
        </button>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Search documents by title, category..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Table */}
      <div className="bg-slate-950 rounded-3xl border border-slate-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900 border-b border-slate-800 text-slate-400 font-bold uppercase tracking-wider">
              <tr>
                <th className="p-4">Document Title</th>
                <th className="p-4">Category</th>
                <th className="p-4">Type / Size</th>
                <th className="p-4">Downloads</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-850">
              {filtered.map((d) => (
                <tr key={d.id} className="hover:bg-slate-900/50 transition">
                  <td className="p-4">
                    <div className="font-bold text-white text-sm">{d.title}</div>
                    <div className="text-slate-400 text-xs line-clamp-1 max-w-sm">{d.description}</div>
                  </td>
                  <td className="p-4 text-indigo-400 font-semibold">{d.category}</td>
                  <td className="p-4 text-slate-300">{d.fileType} • {d.fileSize}</td>
                  <td className="p-4 text-slate-200 font-bold">{d.downloadsCount.toLocaleString()}</td>
                  <td className="p-4">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300">
                      {d.status}
                    </span>
                  </td>
                  <td className="p-4 text-right space-x-2">
                    <button
                      onClick={() => { setEditingDoc(d); setIsNew(false); }}
                      className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Delete document "${d.title}"?`)) deleteDownload(d.id);
                      }}
                      className="p-1.5 rounded-lg bg-rose-500/20 hover:bg-rose-500 text-rose-300 hover:text-white transition"
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

      {/* Edit Modal */}
      {editingDoc && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 rounded-3xl max-w-lg w-full border border-slate-800 shadow-2xl p-6 sm:p-8 animate-fade-in text-xs space-y-4">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <h2 className="text-xl font-bold text-white">
                {isNew ? "Add New Document" : "Edit Document"}
              </h2>
              <button onClick={() => setEditingDoc(null)} className="p-1 text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Document Title *</label>
                <input
                  type="text"
                  required
                  value={editingDoc.title}
                  onChange={(e) => setEditingDoc({ ...editingDoc, title: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Category</label>
                  <select
                    value={editingDoc.category}
                    onChange={(e) => setEditingDoc({ ...editingDoc, category: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white"
                  >
                    <option value="Company Documents">Company Documents</option>
                    <option value="Product Catalogues">Product Catalogues</option>
                    <option value="Product Datasheets">Product Datasheets</option>
                    <option value="Technical Manuals">Technical Manuals</option>
                    <option value="Whitepapers">Whitepapers</option>
                    <option value="Tender Documents">Tender Documents</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">File Format</label>
                  <select
                    value={editingDoc.fileType}
                    onChange={(e) => setEditingDoc({ ...editingDoc, fileType: e.target.value as any })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white"
                  >
                    <option value="PDF">PDF Document</option>
                    <option value="DOC">DOC / DOCX</option>
                    <option value="ZIP">ZIP Archive</option>
                    <option value="SOFTWARE">Software Utility</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Description</label>
                <textarea
                  rows={2}
                  value={editingDoc.description}
                  onChange={(e) => setEditingDoc({ ...editingDoc, description: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">File Size</label>
                  <input
                    type="text"
                    value={editingDoc.fileSize}
                    onChange={(e) => setEditingDoc({ ...editingDoc, fileSize: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white"
                    placeholder="e.g. 4.2 MB"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Version</label>
                  <input
                    type="text"
                    value={editingDoc.version}
                    onChange={(e) => setEditingDoc({ ...editingDoc, version: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white"
                    placeholder="e.g. 2026.1"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setEditingDoc(null)}
                  className="px-4 py-2 bg-slate-800 text-slate-300 font-semibold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl flex items-center gap-1.5 shadow-lg shadow-blue-600/30"
                >
                  <Save className="w-4 h-4" /> Save Document
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
