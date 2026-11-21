import React, { useState } from "react";
import { useCMS } from "../context/CMSContext";
import { DownloadItem } from "../types";
import {
  Download,
  Search,
  FileText,
  CheckCircle2,
  FolderDown,
  X,
  Share2,
  Send,
  Eye,
  FileCode,
  ShieldCheck
} from "lucide-react";

export default function Downloads() {
  const { downloads, heroConfigs, incrementDownloadCount, submitLead } = useCMS();
  const hero = heroConfigs["downloads"];

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCat, setSelectedCat] = useState("All");
  const [previewDoc, setPreviewDoc] = useState<DownloadItem | null>(null);
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  // Request Document Form
  const [reqForm, setReqForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    documentName: "",
    category: "CCTV",
    notes: "",
  });
  const [reqSubmitted, setReqSubmitted] = useState(false);

  const categories = [
    "All",
    "Company Documents",
    "Product Catalogues",
    "Product Datasheets",
    "Technical Manuals",
    "Whitepapers",
    "Tender Documents",
  ];

  const filteredDocs = downloads.filter((d) => {
    const matchesSearch =
      d.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCat === "All" || d.category === selectedCat;
    return matchesSearch && matchesCat;
  });

  const handleDownload = (doc: DownloadItem) => {
    incrementDownloadCount(doc.id);
    setDownloadSuccess(doc.title);
    setTimeout(() => setDownloadSuccess(null), 3000);
  };

  const handleReqSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reqForm.name || !reqForm.email) return;

    submitLead({
      type: "Contact Inquiry",
      name: reqForm.name,
      company: reqForm.company,
      email: reqForm.email,
      phone: reqForm.phone,
      serviceOrProduct: reqForm.category,
      message: `Document Request for "${reqForm.documentName}". Notes: ${reqForm.notes}`,
    });

    setReqSubmitted(true);
    setTimeout(() => {
      setReqSubmitted(false);
      setReqForm({
        name: "",
        company: "",
        email: "",
        phone: "",
        documentName: "",
        category: "CCTV",
        notes: "",
      });
    }, 2500);
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Hero */}
      {hero?.showSection && (
        <section className="relative py-20 bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 text-white overflow-hidden">
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:24px_24px]"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold tracking-wide uppercase mb-6">
                <FolderDown className="w-3.5 h-3.5" />
                Technical Resource Center
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6 leading-tight">
                {hero.heading}
              </h1>
              <p className="text-lg text-slate-300 mb-8 leading-relaxed">
                {hero.subtitle}
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="#resources"
                  className="px-6 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition shadow-lg shadow-blue-600/30 flex items-center gap-2"
                >
                  Browse Documents
                </a>
                <a
                  href="#request-doc"
                  className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white font-medium rounded-xl transition backdrop-blur-sm border border-white/10"
                >
                  Request Specific File
                </a>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Download Alert Toast */}
      {downloadSuccess && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-blue-500/30 flex items-center gap-3 animate-fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <div className="text-xs">
            <div className="font-bold">Downloading started</div>
            <div className="text-slate-300 truncate max-w-xs">{downloadSuccess}</div>
          </div>
        </div>
      )}

      {/* Main Resource Search & Grid */}
      <section id="resources" className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search & Tabs */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm mb-8 space-y-4">
          <div className="relative">
            <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search for brochures, datasheets, installation manuals, BOQ templates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCat(cat)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
                  selectedCat === cat
                    ? "bg-blue-600 text-white shadow-sm"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Documents Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {filteredDocs.map((doc) => (
            <div
              key={doc.id}
              className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="px-2.5 py-1 rounded-md bg-blue-50 text-blue-700 text-[11px] font-bold uppercase tracking-wider">
                    {doc.category}
                  </span>
                  <span className="text-[11px] font-semibold text-slate-400">
                    {doc.fileSize} • {doc.fileType}
                  </span>
                </div>
                <h3 className="font-bold text-slate-900 text-base mb-2 leading-snug">
                  {doc.title}
                </h3>
                <p className="text-slate-500 text-xs line-clamp-3 mb-4 leading-relaxed">
                  {doc.description}
                </p>
              </div>

              <div>
                <div className="text-[11px] text-slate-400 mb-3 flex items-center justify-between">
                  <span>Version: {doc.version}</span>
                  <span>{doc.downloadsCount.toLocaleString()} downloads</span>
                </div>
                <div className="flex items-center gap-2 pt-3 border-t border-slate-100">
                  <button
                    onClick={() => setPreviewDoc(doc)}
                    className="flex-1 py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg text-xs transition flex items-center justify-center gap-1.5"
                  >
                    <Eye className="w-3.5 h-3.5" /> Preview
                  </button>
                  <button
                    onClick={() => handleDownload(doc)}
                    className="flex-1 py-2 px-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg text-xs transition flex items-center justify-center gap-1.5 shadow-sm"
                  >
                    <Download className="w-3.5 h-3.5" /> Download
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Can't Find What You're Looking For Form */}
        <div id="request-doc" className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-2xl">
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 space-y-4">
              <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">Custom Documentation</span>
              <h2 className="text-3xl font-bold text-white">
                Can't Find the Document You Need?
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed">
                If you require project-specific CAD layout drawings, compliance certificates, tender BOQ specifications, or customized product datasheets, our engineering team will provide them within 24 hours.
              </p>
              <div className="space-y-2 pt-2">
                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>CAD & Visio single-line wiring diagrams</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>OEM Manufacturer Authorization Letters (MAL)</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Standard technical bid submission checklists</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 bg-white text-slate-900 p-6 sm:p-8 rounded-2xl shadow-xl">
              {reqSubmitted ? (
                <div className="py-10 text-center">
                  <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-bold text-slate-900 mb-1">Document Request Sent</h4>
                  <p className="text-slate-500 text-xs">Our engineering team has received your request and will email the files shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleReqSubmit} className="space-y-3.5">
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Your Name *</label>
                      <input
                        type="text"
                        required
                        value={reqForm.name}
                        onChange={(e) => setReqForm({ ...reqForm, name: e.target.value })}
                        className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Company / Firm</label>
                      <input
                        type="text"
                        value={reqForm.company}
                        onChange={(e) => setReqForm({ ...reqForm, company: e.target.value })}
                        className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Architecture / Tech Firm"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address *</label>
                      <input
                        type="email"
                        required
                        value={reqForm.email}
                        onChange={(e) => setReqForm({ ...reqForm, email: e.target.value })}
                        className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="john@example.com"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Phone Number</label>
                      <input
                        type="tel"
                        value={reqForm.phone}
                        onChange={(e) => setReqForm({ ...reqForm, phone: e.target.value })}
                        className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="+91 98250 00000"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Required Document Name *</label>
                      <input
                        type="text"
                        required
                        value={reqForm.documentName}
                        onChange={(e) => setReqForm({ ...reqForm, documentName: e.target.value })}
                        className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="e.g. 64-Ch NVR Specification Sheet"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Technology Category</label>
                      <select
                        value={reqForm.category}
                        onChange={(e) => setReqForm({ ...reqForm, category: e.target.value })}
                        className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="CCTV">CCTV Surveillance</option>
                        <option value="Fire Alarm">Fire Alarm Systems</option>
                        <option value="Access Control">Access Control</option>
                        <option value="Networking">Networking Infrastructure</option>
                        <option value="Automation">Building Automation</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Additional Project Specifications</label>
                    <textarea
                      rows={2}
                      value={reqForm.notes}
                      onChange={(e) => setReqForm({ ...reqForm, notes: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Mention any specific standards, tender number, or model numbers..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl text-xs transition shadow-md shadow-blue-600/20 flex items-center justify-center gap-2"
                  >
                    <Send className="w-3.5 h-3.5" /> Submit Request
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Document Preview Modal */}
      {previewDoc && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 animate-fade-in">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-600" />
                <h3 className="font-bold text-slate-900 text-base">Document Preview</h3>
              </div>
              <button
                onClick={() => setPreviewDoc(null)}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <span className="text-[11px] font-bold text-blue-600 uppercase tracking-wider">{previewDoc.category}</span>
                <h4 className="font-bold text-slate-900 text-lg">{previewDoc.title}</h4>
                <p className="text-slate-600 text-xs mt-1 leading-relaxed">{previewDoc.description}</p>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl space-y-2 text-xs border border-slate-100">
                <div className="flex justify-between text-slate-600">
                  <span>File Format:</span>
                  <span className="font-bold text-slate-900">{previewDoc.fileType} Document</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>File Size:</span>
                  <span className="font-bold text-slate-900">{previewDoc.fileSize}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Version / Release:</span>
                  <span className="font-bold text-slate-900">{previewDoc.version}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Last Updated:</span>
                  <span className="font-bold text-slate-900">{previewDoc.updatedDate}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Language:</span>
                  <span className="font-bold text-slate-900">English (India / Global)</span>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={() => {
                    handleDownload(previewDoc);
                    setPreviewDoc(null);
                  }}
                  className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl text-xs transition flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4" /> Download Now
                </button>
                <button
                  onClick={() => {
                    navigator.clipboard?.writeText(window.location.href);
                    alert("Document link copied to clipboard!");
                  }}
                  className="p-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition"
                  title="Share"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
