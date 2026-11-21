import React, { useState } from "react";
import { useCMS } from "../context/CMSContext";
import { BlogPost } from "../types";
import {
  BookOpen,
  Plus,
  Edit2,
  Trash2,
  CheckCircle2,
  X,
  Save,
  Search,
  Sparkles
} from "lucide-react";

export default function AdminBlog() {
  const { blogs, addBlog, updateBlog, deleteBlog } = useCMS();
  const [editingBlog, setEditingBlog] = useState<BlogPost | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [search, setSearch] = useState("");

  const filtered = blogs.filter((b) =>
    b.title.toLowerCase().includes(search.toLowerCase()) ||
    b.category.toLowerCase().includes(search.toLowerCase())
  );

  const handleCreateNew = () => {
    setEditingBlog({
      id: "",
      slug: "new-article-title",
      title: "",
      category: "AI Surveillance",
      author: "Rajesh Sharma",
      authorRole: "Managing Director",
      authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&auto=format",
      publishDate: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
      readTime: "5 min read",
      excerpt: "",
      content: "",
      featuredImage: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=900&h=500&fit=crop&auto=format",
      tags: ["Security", "AI", "Infrastructure"],
      isFeatured: false,
      status: "Published",
    });
    setIsNew(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingBlog || !editingBlog.title) return;

    if (isNew) {
      const { id, ...rest } = editingBlog;
      addBlog(rest);
    } else {
      updateBlog(editingBlog.id, editingBlog);
    }
    setEditingBlog(null);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <BookOpen className="w-3.5 h-3.5" />
            Editorial CMS
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Blog & Insights Articles</h1>
          <p className="text-slate-400 text-xs mt-1">Publish and manage security guides, buying tips, and case study articles.</p>
        </div>

        <button
          onClick={handleCreateNew}
          className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-xs transition shadow-lg shadow-blue-600/30 flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" /> Publish New Article
        </button>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Search articles by title, topic..."
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
                <th className="p-4">Article</th>
                <th className="p-4">Category</th>
                <th className="p-4">Author</th>
                <th className="p-4">Date</th>
                <th className="p-4">Featured</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-850">
              {filtered.map((b) => (
                <tr key={b.id} className="hover:bg-slate-900/50 transition">
                  <td className="p-4 flex items-center gap-3">
                    <img src={b.featuredImage} alt={b.title} className="w-12 h-10 object-cover rounded-lg" />
                    <div>
                      <div className="font-bold text-white text-sm line-clamp-1 max-w-sm">{b.title}</div>
                      <div className="text-slate-400 text-[11px] font-mono">/blog/{b.slug}</div>
                    </div>
                  </td>
                  <td className="p-4 text-blue-400 font-semibold">{b.category}</td>
                  <td className="p-4 text-slate-300">{b.author}</td>
                  <td className="p-4 text-slate-400 text-[11px] whitespace-nowrap">{b.publishDate}</td>
                  <td className="p-4">
                    {b.isFeatured ? (
                      <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[10px] font-bold">Featured</span>
                    ) : (
                      <span className="text-slate-600 text-[10px]">Standard</span>
                    )}
                  </td>
                  <td className="p-4 text-right space-x-2">
                    <button
                      onClick={() => { setEditingBlog(b); setIsNew(false); }}
                      className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Delete article "${b.title}"?`)) deleteBlog(b.id);
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
      {editingBlog && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-slate-800 shadow-2xl p-6 sm:p-8 animate-fade-in text-xs space-y-4">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <h2 className="text-xl font-bold text-white">
                {isNew ? "Write Article" : `Edit Article`}
              </h2>
              <button onClick={() => setEditingBlog(null)} className="p-1 text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Article Title *</label>
                <input
                  type="text"
                  required
                  value={editingBlog.title}
                  onChange={(e) => setEditingBlog({ ...editingBlog, title: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Category</label>
                  <input
                    type="text"
                    value={editingBlog.category}
                    onChange={(e) => setEditingBlog({ ...editingBlog, category: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Author Name</label>
                  <input
                    type="text"
                    value={editingBlog.author}
                    onChange={(e) => setEditingBlog({ ...editingBlog, author: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Short Summary / Excerpt</label>
                <textarea
                  rows={2}
                  value={editingBlog.excerpt}
                  onChange={(e) => setEditingBlog({ ...editingBlog, excerpt: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Featured Image URL</label>
                <input
                  type="url"
                  value={editingBlog.featuredImage}
                  onChange={(e) => setEditingBlog({ ...editingBlog, featuredImage: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Article Body Content (Markdown / Text)</label>
                <textarea
                  rows={6}
                  value={editingBlog.content}
                  onChange={(e) => setEditingBlog({ ...editingBlog, content: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono leading-relaxed"
                />
              </div>

              <div className="flex items-center gap-3">
                <label className="flex items-center gap-2 cursor-pointer text-slate-200 font-bold">
                  <input
                    type="checkbox"
                    checked={editingBlog.isFeatured}
                    onChange={(e) => setEditingBlog({ ...editingBlog, isFeatured: e.target.checked })}
                    className="w-4 h-4 rounded accent-blue-600"
                  />
                  <span>Feature Article on Blog Home</span>
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setEditingBlog(null)}
                  className="px-4 py-2 bg-slate-800 text-slate-300 font-semibold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl flex items-center gap-1.5 shadow-lg shadow-blue-600/30"
                >
                  <Save className="w-4 h-4" /> Save Article
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
