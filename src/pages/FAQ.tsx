import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCMS } from "../context/CMSContext";
import {
  HelpCircle,
  Search,
  ChevronDown,
  ChevronUp,
  MessageSquare,
  Send,
  CheckCircle2,
  PhoneCall,
  ArrowRight
} from "lucide-react";

export default function FAQ() {
  const { faqs, heroConfigs, submitLead } = useCMS();
  const hero = heroConfigs["faq"];

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [openIds, setOpenIds] = useState<Record<string, boolean>>({ "faq-1": true, "faq-3": true });

  // Ask Question Form
  const [askForm, setAskForm] = useState({
    name: "",
    email: "",
    category: "CCTV",
    question: "",
  });
  const [askSuccess, setAskSuccess] = useState(false);

  const categories = [
    "All",
    "General",
    "CCTV",
    "Fire Alarm",
    "Access Control",
    "AMC & Support",
    "Automation",
  ];

  const filteredFaqs = faqs.filter((f) => {
    const matchesSearch =
      f.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCategory === "All" || f.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const toggleAccordion = (id: string) => {
    setOpenIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleAskSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!askForm.name || !askForm.email || !askForm.question) return;

    submitLead({
      type: "Contact Inquiry",
      name: askForm.name,
      email: askForm.email,
      serviceOrProduct: askForm.category,
      message: `FAQ Inquiry: ${askForm.question}`,
    });

    setAskSuccess(true);
    setTimeout(() => {
      setAskSuccess(false);
      setAskForm({ name: "", email: "", category: "CCTV", question: "" });
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
                <HelpCircle className="w-3.5 h-3.5" />
                Knowledge Base & Support FAQ
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6 leading-tight">
                {hero.heading}
              </h1>
              <p className="text-lg text-slate-300 mb-8 leading-relaxed">
                {hero.subtitle}
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/contact"
                  className="px-6 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition shadow-lg shadow-blue-600/30 flex items-center gap-2"
                >
                  Contact Our Technical Team
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href="#ask"
                  className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white font-medium rounded-xl transition backdrop-blur-sm border border-white/10"
                >
                  Ask a Question
                </a>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Main FAQ Content */}
      <section className="py-12 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search & Category Tabs */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm mb-8 space-y-4">
          <div className="relative">
            <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search for answers about CCTV, AMC, Fire Alarms, Turnkeys, Warranties..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setSelectedCategory(c)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
                  selectedCategory === c
                    ? "bg-blue-600 text-white shadow-sm"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* FAQs Accordion List */}
        <div className="space-y-4 mb-16">
          {filteredFaqs.map((faq) => {
            const isOpen = !!openIds[faq.id];
            return (
              <div
                key={faq.id}
                className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden transition"
              >
                <button
                  onClick={() => toggleAccordion(faq.id)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 hover:bg-slate-50 transition"
                >
                  <div className="flex items-center gap-3">
                    <span className="px-2.5 py-0.5 rounded-md bg-blue-50 text-blue-700 text-[10px] font-bold uppercase tracking-wider">
                      {faq.category}
                    </span>
                    <span className="font-bold text-slate-900 text-sm sm:text-base">
                      {faq.question}
                    </span>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 flex-shrink-0">
                    {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-5 text-slate-600 text-xs sm:text-sm leading-relaxed border-t border-slate-100 pt-3 animate-fade-in">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}

          {filteredFaqs.length === 0 && (
            <div className="text-center py-12 bg-white rounded-2xl border border-slate-200">
              <HelpCircle className="w-10 h-10 text-slate-300 mx-auto mb-2" />
              <h3 className="font-bold text-slate-900 text-base">No matching questions found</h3>
              <p className="text-slate-500 text-xs mt-1">Try a different search keyword or ask your question below.</p>
            </div>
          )}
        </div>

        {/* Ask Question Card */}
        <div id="ask" className="bg-gradient-to-br from-slate-900 to-blue-950 text-white rounded-3xl p-8 sm:p-10 shadow-xl">
          <div className="max-w-2xl mx-auto text-center space-y-3 mb-8">
            <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">Direct Assistance</span>
            <h3 className="text-2xl sm:text-3xl font-bold">Didn't Find Your Answer?</h3>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              Submit your technical inquiry directly to our engineering architects and receive a detailed response within 2 hours.
            </p>
          </div>

          {askSuccess ? (
            <div className="bg-white/10 p-8 rounded-2xl text-center max-w-md mx-auto border border-emerald-500/30">
              <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto mb-2" />
              <h4 className="font-bold text-white text-base">Question Submitted!</h4>
              <p className="text-slate-300 text-xs mt-1">Our support team will reply to your email shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleAskSubmit} className="max-w-xl mx-auto space-y-3.5 bg-white/5 p-6 rounded-2xl border border-white/10 backdrop-blur-sm">
              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={askForm.name}
                    onChange={(e) => setAskForm({ ...askForm, name: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-white/10 border border-white/20 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="e.g. Ramesh Patel"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={askForm.email}
                    onChange={(e) => setAskForm({ ...askForm, email: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-white/10 border border-white/20 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="ramesh@company.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Category</label>
                <select
                  value={askForm.category}
                  onChange={(e) => setAskForm({ ...askForm, category: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-slate-800 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <option value="CCTV">CCTV Surveillance</option>
                  <option value="Fire Alarm">Fire Alarm Systems</option>
                  <option value="Access Control">Access Control</option>
                  <option value="Networking">Networking Solutions</option>
                  <option value="AMC & Support">AMC & Maintenance</option>
                  <option value="General">General / Turnkey Projects</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Your Question / Inquiry *</label>
                <textarea
                  rows={3}
                  required
                  value={askForm.question}
                  onChange={(e) => setAskForm({ ...askForm, question: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-white/10 border border-white/20 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Type your question here in detail..."
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl text-xs transition shadow-md shadow-blue-600/30 flex items-center justify-center gap-2"
              >
                <Send className="w-3.5 h-3.5" /> Submit Question
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
