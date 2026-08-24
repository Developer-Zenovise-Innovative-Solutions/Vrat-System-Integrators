import React, { useState } from "react";
import { useCMS } from "../context/CMSContext";
import { ProductItem } from "../types";
import {
  ShoppingBag,
  Plus,
  Edit2,
  Trash2,
  CheckCircle2,
  X,
  Save,
  Search,
  Sparkles,
  Filter
} from "lucide-react";

export default function AdminProducts() {
  const { products, addProduct, updateProduct, deleteProduct } = useCMS();
  const [editingProduct, setEditingProduct] = useState<ProductItem | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [search, setSearch] = useState("");
  const [catFilter, setCatFilter] = useState("All");

  const categories = ["All", ...Array.from(new Set(products.map((p) => p.category)))];

  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.brand.toLowerCase().includes(search.toLowerCase());
    const matchesCat = catFilter === "All" || p.category === catFilter;
    return matchesSearch && matchesCat;
  });

  const handleCreateNew = () => {
    setEditingProduct({
      id: "",
      name: "",
      category: "CCTV Surveillance Systems",
      brand: "Hikvision",
      image: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=600&h=450&fit=crop&auto=format",
      tagline: "",
      features: ["4K Resolution", "AI Detection", "PoE Support"],
      applications: ["Commercial", "Industrial"],
      specs: {
        "Resolution": "8 Megapixels",
        "Power": "PoE / 12V DC",
        "Weatherproof": "IP67"
      },
      status: "Published",
      isFeatured: false,
    });
    setIsNew(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct || !editingProduct.name) return;

    if (isNew) {
      const { id, ...rest } = editingProduct;
      addProduct(rest);
    } else {
      updateProduct(editingProduct.id, editingProduct);
    }
    setEditingProduct(null);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <ShoppingBag className="w-3.5 h-3.5" />
            Hardware & Products CMS
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Product Catalog Management</h1>
          <p className="text-slate-400 text-xs mt-1">Manage enterprise hardware, specifications, datasheets, and brands.</p>
        </div>

        <button
          onClick={handleCreateNew}
          className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-xs transition shadow-lg shadow-blue-600/30 flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" /> Add New Product
        </button>
      </div>

      {/* Filter & Search */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative flex-1 max-w-md w-full">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search products by model, brand..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <select
          value={catFilter}
          onChange={(e) => setCatFilter(e.target.value)}
          className="px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
        >
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      {/* Products Table */}
      <div className="bg-slate-950 rounded-3xl border border-slate-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900 border-b border-slate-800 text-slate-400 font-bold uppercase tracking-wider">
              <tr>
                <th className="p-4">Product Details</th>
                <th className="p-4">Category</th>
                <th className="p-4">Brand</th>
                <th className="p-4">Featured</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-850">
              {filteredProducts.map((p) => (
                <tr key={p.id} className="hover:bg-slate-900/50 transition">
                  <td className="p-4 flex items-center gap-3">
                    <img src={p.image} alt={p.name} className="w-12 h-10 object-cover rounded-lg" />
                    <div>
                      <div className="font-bold text-white text-sm">{p.name}</div>
                      <div className="text-slate-400 text-[11px] line-clamp-1 max-w-xs">{p.tagline}</div>
                    </div>
                  </td>
                  <td className="p-4 text-slate-300">{p.category}</td>
                  <td className="p-4 font-bold text-blue-400">{p.brand}</td>
                  <td className="p-4">
                    {p.isFeatured ? (
                      <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[10px] font-bold">Featured</span>
                    ) : (
                      <span className="text-slate-600 text-[10px]">Standard</span>
                    )}
                  </td>
                  <td className="p-4">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      {p.status}
                    </span>
                  </td>
                  <td className="p-4 text-right space-x-2">
                    <button
                      onClick={() => { setEditingProduct(p); setIsNew(false); }}
                      className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200"
                      title="Edit"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Delete product "${p.name}"?`)) deleteProduct(p.id);
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

      {/* Edit Modal */}
      {editingProduct && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-slate-800 shadow-2xl p-6 sm:p-8 animate-fade-in">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
              <h2 className="text-xl font-bold text-white">
                {isNew ? "Add New Product" : `Edit: ${editingProduct.name}`}
              </h2>
              <button onClick={() => setEditingProduct(null)} className="p-1 text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Product Name *</label>
                  <input
                    type="text"
                    required
                    value={editingProduct.name}
                    onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Brand / OEM *</label>
                  <input
                    type="text"
                    required
                    value={editingProduct.brand}
                    onChange={(e) => setEditingProduct({ ...editingProduct, brand: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Category</label>
                  <input
                    type="text"
                    value={editingProduct.category}
                    onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex items-center gap-4 pt-6">
                  <label className="flex items-center gap-2 cursor-pointer text-slate-200 font-bold">
                    <input
                      type="checkbox"
                      checked={editingProduct.isFeatured}
                      onChange={(e) => setEditingProduct({ ...editingProduct, isFeatured: e.target.checked })}
                      className="w-4 h-4 rounded accent-blue-600"
                    />
                    <span>Feature on Homepage / Catalog</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Tagline / Short Summary</label>
                <textarea
                  rows={2}
                  value={editingProduct.tagline}
                  onChange={(e) => setEditingProduct({ ...editingProduct, tagline: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Image URL</label>
                <input
                  type="url"
                  value={editingProduct.image}
                  onChange={(e) => setEditingProduct({ ...editingProduct, image: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Features (Comma-separated)</label>
                <input
                  type="text"
                  value={editingProduct.features.join(", ")}
                  onChange={(e) =>
                    setEditingProduct({
                      ...editingProduct,
                      features: e.target.value.split(",").map((x) => x.trim()).filter(Boolean),
                    })
                  }
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Datasheet Download Link</label>
                <input
                  type="text"
                  value={editingProduct.datasheetUrl || ""}
                  onChange={(e) => setEditingProduct({ ...editingProduct, datasheetUrl: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:ring-2 focus:ring-blue-500"
                  placeholder="/downloads/datasheets/sample.pdf"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  className="px-4 py-2 bg-slate-800 text-slate-300 font-semibold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl flex items-center gap-1.5 shadow-lg shadow-blue-600/30"
                >
                  <Save className="w-4 h-4" /> Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
