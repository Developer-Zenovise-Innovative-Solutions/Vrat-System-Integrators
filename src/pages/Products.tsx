import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCMS } from "../context/CMSContext";
import { ProductItem } from "../types";
import {
  Search,
  SlidersHorizontal,
  FileText,
  Check,
  X,
  ArrowRight,
  ShieldCheck,
  Send,
  Layers,
  Scale,
  Sparkles,
  ExternalLink
} from "lucide-react";

export default function Products() {
  const { products, heroConfigs, submitLead } = useCMS();
  const hero = heroConfigs["products"];

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedBrand, setSelectedBrand] = useState("All");
  const [compareList, setCompareList] = useState<ProductItem[]>([]);
  const [showCompareModal, setShowCompareModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);

  // Quote form state
  const [quoteProduct, setQuoteProduct] = useState<ProductItem | null>(null);
  const [quoteForm, setQuoteForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    city: "",
    quantity: "1-5",
    message: "",
  });
  const [quoteSuccess, setQuoteSuccess] = useState(false);

  const categories = ["All", ...Array.from(new Set(products.map((p) => p.category)))];
  const brands = ["All", ...Array.from(new Set(products.map((p) => p.brand)))];

  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.features.some((f) => f.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCat = selectedCategory === "All" || p.category === selectedCategory;
    const matchesBrand = selectedBrand === "All" || p.brand === selectedBrand;
    return matchesSearch && matchesCat && matchesBrand;
  });

  const toggleCompare = (p: ProductItem) => {
    if (compareList.some((item) => item.id === p.id)) {
      setCompareList(compareList.filter((item) => item.id !== p.id));
    } else {
      if (compareList.length >= 4) {
        alert("You can compare up to 4 products at a time.");
        return;
      }
      setCompareList([...compareList, p]);
    }
  };

  const handleQuoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quoteForm.name || !quoteForm.email) return;

    submitLead({
      type: "Product Quote",
      name: quoteForm.name,
      company: quoteForm.company,
      email: quoteForm.email,
      phone: quoteForm.phone,
      city: quoteForm.city,
      serviceOrProduct: quoteProduct?.name || "General Product Inquiry",
      estimatedSize: `Qty: ${quoteForm.quantity}`,
      message: quoteForm.message || `Quote request for ${quoteProduct?.name || "products"}`,
    });

    setQuoteSuccess(true);
    setTimeout(() => {
      setQuoteSuccess(false);
      setQuoteProduct(null);
      setQuoteForm({
        name: "",
        company: "",
        email: "",
        phone: "",
        city: "",
        quantity: "1-5",
        message: "",
      });
    }, 2000);
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Hero Banner */}
      {hero?.showSection && (
        <section className="relative py-20 bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 text-white overflow-hidden">
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:24px_24px]"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold tracking-wide uppercase mb-6">
                <ShieldCheck className="w-3.5 h-3.5" />
                Enterprise Hardware Catalog
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6 leading-tight">
                {hero.heading}
              </h1>
              <p className="text-lg text-slate-300 mb-8 leading-relaxed">
                {hero.subtitle}
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="#catalog"
                  className="px-6 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition shadow-lg shadow-blue-600/30 flex items-center gap-2"
                >
                  Explore Products
                  <ArrowRight className="w-4 h-4" />
                </a>
                <Link
                  to="/downloads"
                  className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white font-medium rounded-xl transition backdrop-blur-sm border border-white/10"
                >
                  Download Full Catalog PDF
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Catalog & Filter Section */}
      <section id="catalog" className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Controls Bar */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm mb-8 space-y-4">
          <div className="grid md:grid-cols-12 gap-4 items-center">
            {/* Search */}
            <div className="md:col-span-6 relative">
              <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search products by model, keyword, or feature..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
              />
            </div>

            {/* Brand Dropdown */}
            <div className="md:col-span-3">
              <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="All">All Brands (OEMs)</option>
                {brands.filter((b) => b !== "All").map((b) => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
            </div>

            {/* Compare Bar Button */}
            <div className="md:col-span-3 flex justify-end">
              <button
                onClick={() => setShowCompareModal(true)}
                disabled={compareList.length === 0}
                className={`w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition ${
                  compareList.length > 0
                    ? "bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-600/20"
                    : "bg-slate-100 text-slate-400 cursor-not-allowed"
                }`}
              >
                <Scale className="w-4 h-4" />
                Compare ({compareList.length})
              </button>
            </div>
          </div>

          {/* Category Badges */}
          <div className="flex items-center gap-2 overflow-x-auto pt-2 pb-1 scrollbar-thin">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
                  selectedCategory === cat
                    ? "bg-slate-900 text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((p) => {
            const isCompared = compareList.some((item) => item.id === p.id);
            return (
              <div
                key={p.id}
                className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden group"
              >
                {/* Image & Badges */}
                <div className="relative h-48 bg-slate-100 overflow-hidden">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 flex flex-col gap-1">
                    <span className="px-2.5 py-1 rounded-md bg-slate-900/80 backdrop-blur-sm text-white text-[10px] font-bold tracking-wide uppercase">
                      {p.brand}
                    </span>
                    {p.isFeatured && (
                      <span className="px-2.5 py-0.5 rounded-md bg-amber-500 text-slate-900 text-[10px] font-extrabold tracking-wide uppercase flex items-center gap-1">
                        <Sparkles className="w-2.5 h-2.5" /> Featured
                      </span>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col">
                  <div className="text-[11px] font-semibold text-blue-600 uppercase tracking-wider mb-1">
                    {p.category}
                  </div>
                  <h3 className="font-bold text-slate-900 text-base mb-1.5 line-clamp-1 group-hover:text-blue-600 transition-colors">
                    {p.name}
                  </h3>
                  <p className="text-slate-500 text-xs line-clamp-2 mb-4 leading-relaxed">
                    {p.tagline}
                  </p>

                  {/* Quick Feature Tags */}
                  <div className="space-y-1.5 mb-4 flex-1">
                    {p.features.slice(0, 3).map((f, i) => (
                      <div key={i} className="flex items-center gap-1.5 text-xs text-slate-600">
                        <Check className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                        <span className="truncate">{f}</span>
                      </div>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
                    <button
                      onClick={() => setSelectedProduct(p)}
                      className="flex-1 py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg text-xs transition text-center"
                    >
                      Specifications
                    </button>
                    <button
                      onClick={() => setQuoteProduct(p)}
                      className="py-2 px-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg text-xs transition text-center"
                    >
                      Quote
                    </button>
                    <button
                      onClick={() => toggleCompare(p)}
                      title={isCompared ? "Remove from comparison" : "Add to comparison"}
                      className={`p-2 rounded-lg text-xs border transition ${
                        isCompared
                          ? "bg-blue-50 border-blue-300 text-blue-600"
                          : "border-slate-200 text-slate-400 hover:text-slate-600 hover:border-slate-300"
                      }`}
                    >
                      <Scale className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-200">
            <Search className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-900 mb-1">No products found</h3>
            <p className="text-slate-500 text-sm mb-4">Try adjusting your keyword or filter category.</p>
            <button
              onClick={() => { setSearchQuery(""); setSelectedCategory("All"); setSelectedBrand("All"); }}
              className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-xl text-xs hover:bg-blue-700 transition"
            >
              Reset Filters
            </button>
          </div>
        )}
      </section>

      {/* Product Spec Detail Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-fade-in border border-slate-200">
            <div className="sticky top-0 bg-white/95 backdrop-blur-md px-6 py-4 border-b border-slate-200 flex items-center justify-between z-10">
              <div>
                <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">{selectedProduct.brand} • {selectedProduct.category}</span>
                <h3 className="text-xl font-bold text-slate-900">{selectedProduct.name}</h3>
              </div>
              <button
                onClick={() => setSelectedProduct(null)}
                className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="rounded-xl overflow-hidden bg-slate-100 h-64">
                  <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm mb-2">Key Features</h4>
                  <ul className="space-y-2 mb-6">
                    {selectedProduct.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-slate-700">
                        <Check className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <h4 className="font-bold text-slate-900 text-sm mb-2">Recommended Applications</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedProduct.applications.map((app, i) => (
                      <span key={i} className="px-2.5 py-1 rounded-md bg-blue-50 text-blue-700 text-xs font-medium">
                        {app}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Technical Specifications Table */}
              <div>
                <h4 className="font-bold text-slate-900 text-base mb-3">Technical Specifications</h4>
                <div className="border border-slate-200 rounded-xl overflow-hidden divide-y divide-slate-200">
                  {Object.entries(selectedProduct.specs).map(([key, val]) => (
                    <div key={key} className="grid grid-cols-3 p-3 text-xs">
                      <span className="font-semibold text-slate-700">{key}</span>
                      <span className="col-span-2 text-slate-600">{val}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Modal CTA footer */}
              <div className="flex items-center gap-3 pt-4 border-t border-slate-200">
                <button
                  onClick={() => {
                    const prod = selectedProduct;
                    setSelectedProduct(null);
                    setQuoteProduct(prod);
                  }}
                  className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl text-sm transition"
                >
                  Request Official Quotation
                </button>
                <Link
                  to="/downloads"
                  className="py-3 px-5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-sm transition flex items-center gap-2"
                >
                  <FileText className="w-4 h-4 text-blue-600" />
                  Datasheet
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Product Comparison Modal */}
      {showCompareModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-fade-in border border-slate-200">
            <div className="sticky top-0 bg-white px-6 py-4 border-b border-slate-200 flex items-center justify-between z-10">
              <div className="flex items-center gap-2">
                <Scale className="w-5 h-5 text-blue-600" />
                <h3 className="text-lg font-bold text-slate-900">Product Specification Comparison</h3>
              </div>
              <button
                onClick={() => setShowCompareModal(false)}
                className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-left py-3 px-4 text-xs font-bold text-slate-500 uppercase w-48">Parameter</th>
                    {compareList.map((p) => (
                      <th key={p.id} className="text-left py-3 px-4 min-w-56">
                        <div className="relative group">
                          <img src={p.image} alt={p.name} className="w-full h-28 object-cover rounded-lg mb-2" />
                          <button
                            onClick={() => toggleCompare(p)}
                            className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                            title="Remove"
                          >
                            <X className="w-3 h-3" />
                          </button>
                          <div className="text-[10px] font-bold text-blue-600 uppercase">{p.brand}</div>
                          <div className="font-bold text-slate-900 text-xs">{p.name}</div>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs">
                  <tr>
                    <td className="py-3 px-4 font-semibold text-slate-700 bg-slate-50">Category</td>
                    {compareList.map((p) => (
                      <td key={p.id} className="py-3 px-4 text-slate-600">{p.category}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-semibold text-slate-700 bg-slate-50">Key Features</td>
                    {compareList.map((p) => (
                      <td key={p.id} className="py-3 px-4 text-slate-600">
                        <ul className="space-y-1">
                          {p.features.slice(0, 4).map((f, i) => (
                            <li key={i} className="flex items-center gap-1"><Check className="w-3 h-3 text-emerald-500" /> {f}</li>
                          ))}
                        </ul>
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-semibold text-slate-700 bg-slate-50">Applications</td>
                    {compareList.map((p) => (
                      <td key={p.id} className="py-3 px-4 text-slate-600">{p.applications.join(", ")}</td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Quote Request Modal */}
      {quoteProduct && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 animate-fade-in">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
              <div>
                <span className="text-xs font-bold text-blue-600 uppercase">Product Quotation</span>
                <h3 className="font-bold text-slate-900 text-lg">{quoteProduct.name}</h3>
              </div>
              <button
                onClick={() => setQuoteProduct(null)}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {quoteSuccess ? (
              <div className="py-8 text-center">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Check className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold text-slate-900 mb-1">Quote Request Received</h4>
                <p className="text-slate-600 text-xs">Our commercial team will contact you within 2 business hours.</p>
              </div>
            ) : (
              <form onSubmit={handleQuoteSubmit} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={quoteForm.name}
                    onChange={(e) => setQuoteForm({ ...quoteForm, name: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g. Rahul Sharma"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Email *</label>
                    <input
                      type="email"
                      required
                      value={quoteForm.email}
                      onChange={(e) => setQuoteForm({ ...quoteForm, email: e.target.value })}
                      className="w-full px-3.5 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="rahul@company.com"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Phone *</label>
                    <input
                      type="tel"
                      required
                      value={quoteForm.phone}
                      onChange={(e) => setQuoteForm({ ...quoteForm, phone: e.target.value })}
                      className="w-full px-3.5 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="+91 98250 00000"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Company / Org</label>
                    <input
                      type="text"
                      value={quoteForm.company}
                      onChange={(e) => setQuoteForm({ ...quoteForm, company: e.target.value })}
                      className="w-full px-3.5 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Company Name"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Estimated Quantity</label>
                    <select
                      value={quoteForm.quantity}
                      onChange={(e) => setQuoteForm({ ...quoteForm, quantity: e.target.value })}
                      className="w-full px-3.5 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="1-5">1 - 5 Units</option>
                      <option value="6-20">6 - 20 Units</option>
                      <option value="21-50">21 - 50 Units</option>
                      <option value="50+">50+ (Enterprise Bulk)</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Project Details / Requirements</label>
                  <textarea
                    rows={3}
                    value={quoteForm.message}
                    onChange={(e) => setQuoteForm({ ...quoteForm, message: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Provide details such as location, installation support required, or timeline..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl text-xs transition shadow-md shadow-blue-600/20 flex items-center justify-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" /> Submit Quote Request
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
