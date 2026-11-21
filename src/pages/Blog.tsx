import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCMS } from "../context/CMSContext";
import { BlogPost } from "../types";
import {
  BookOpen,
  Search,
  Clock,
  User,
  Tag,
  ArrowRight,
  Sparkles,
  Share2,
  X,
  Mail,
  CheckCircle2
} from "lucide-react";

export default function Blog() {
  const { blogs, heroConfigs, submitLead } = useCMS();
  const hero = heroConfigs["blog"];

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedBlog, setSelectedBlog] = useState<BlogPost | null>(null);

  // Newsletter
  const [newsEmail, setNewsEmail] = useState("");
  const [newsName, setNewsName] = useState("");
  const [newsSuccess, setNewsSuccess] = useState(false);

  const categories = [
    "All",
    "AI Surveillance",
    "Fire Safety",
    "Networking",
    "Access Control",
    "Home Automation",
    "Smart Cities",
  ];

  const filteredBlogs = blogs.filter((b) => {
    const matchesSearch =
      b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCat = selectedCategory === "All" || b.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const featuredBlog = blogs.find((b) => b.isFeatured) || blogs[0];

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsEmail) return;

    submitLead({
      type: "Newsletter",
      name: newsName || "Newsletter Subscriber",
      email: newsEmail,
      message: "Subscribed to VRAT Tech & Security Insights Newsletter",
    });

    setNewsSuccess(true);
    setTimeout(() => {
      setNewsSuccess(false);
      setNewsEmail("");
      setNewsName("");
    }, 2500);
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
                <BookOpen className="w-3.5 h-3.5" />
                Industry Insights & Engineering Guides
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6 leading-tight">
                {hero.heading}
              </h1>
              <p className="text-lg text-slate-300 mb-8 leading-relaxed">
                {hero.subtitle}
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="#articles"
                  className="px-6 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition shadow-lg shadow-blue-600/30 flex items-center gap-2"
                >
                  Read Latest Articles
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="#newsletter"
                  className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white font-medium rounded-xl transition backdrop-blur-sm border border-white/10"
                >
                  Subscribe to Newsletter
                </a>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Featured Highlight Post */}
      {featuredBlog && selectedCategory === "All" && !searchQuery && (
        <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            onClick={() => setSelectedBlog(featuredBlog)}
            className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-md hover:shadow-2xl transition-all duration-300 grid lg:grid-cols-12 cursor-pointer group"
          >
            <div className="lg:col-span-7 relative h-72 lg:h-auto bg-slate-100 overflow-hidden">
              <img
                src={featuredBlog.featuredImage}
                alt={featuredBlog.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 rounded-full bg-blue-600 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-md">
                  <Sparkles className="w-3.5 h-3.5" /> Featured Guide
                </span>
              </div>
            </div>

            <div className="lg:col-span-5 p-8 lg:p-10 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 text-xs font-semibold text-slate-500 mb-3">
                  <span className="text-blue-600 font-bold uppercase">{featuredBlog.category}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {featuredBlog.readTime}</span>
                </div>
                <h2 className="text-2xl font-bold text-slate-900 mb-3 leading-snug group-hover:text-blue-600 transition-colors">
                  {featuredBlog.title}
                </h2>
                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                  {featuredBlog.excerpt}
                </p>
              </div>

              <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={featuredBlog.authorAvatar}
                    alt={featuredBlog.author}
                    className="w-10 h-10 rounded-full object-cover border border-slate-200"
                  />
                  <div>
                    <div className="font-bold text-slate-900 text-xs">{featuredBlog.author}</div>
                    <div className="text-slate-400 text-[11px]">{featuredBlog.publishDate}</div>
                  </div>
                </div>
                <span className="text-blue-600 font-bold text-xs flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Read Article →
                </span>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Main Articles Stream & Filter */}
      <section id="articles" className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search & Tabs */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm mb-8 space-y-4">
          <div className="relative">
            <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search articles by topic, technology, or keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setSelectedCategory(c)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
                  selectedCategory === c
                    ? "bg-slate-900 text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {filteredBlogs.map((b) => (
            <div
              key={b.id}
              onClick={() => setSelectedBlog(b)}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group cursor-pointer"
            >
              <div>
                <div className="relative h-48 bg-slate-100 overflow-hidden">
                  <img
                    src={b.featuredImage}
                    alt={b.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-md bg-slate-900/80 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-wider">
                      {b.category}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-2 text-[11px] text-slate-400 font-medium mb-2">
                    <span>{b.publishDate}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {b.readTime}</span>
                  </div>
                  <h3 className="font-bold text-slate-900 text-base mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors leading-snug">
                    {b.title}
                  </h3>
                  <p className="text-slate-500 text-xs line-clamp-3 mb-4 leading-relaxed">
                    {b.excerpt}
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-2 border-t border-slate-100 flex items-center justify-between">
                <div className="text-xs font-semibold text-slate-700">
                  By {b.author}
                </div>
                <span className="text-blue-600 font-bold text-xs flex items-center gap-1">
                  Read →
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Newsletter Subscription Strip */}
        <div id="newsletter" className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-2xl">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/20 text-blue-400 flex items-center justify-center mx-auto mb-2">
              <Mail className="w-6 h-6" />
            </div>
            <h2 className="text-3xl font-bold">Stay Updated with VRAT Security & Tech</h2>
            <p className="text-slate-300 text-sm leading-relaxed max-w-xl mx-auto">
              Subscribe to receive the latest updates on CCTV surveillance technologies, fire safety compliance, enterprise networking, and smart building automation directly in your inbox.
            </p>

            {newsSuccess ? (
              <div className="inline-flex items-center gap-2 bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 px-6 py-3 rounded-xl text-sm font-semibold">
                <CheckCircle2 className="w-5 h-5" /> Thank you for subscribing!
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto pt-4">
                <input
                  type="email"
                  required
                  placeholder="Enter your corporate email..."
                  value={newsEmail}
                  onChange={(e) => setNewsEmail(e.target.value)}
                  className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl text-sm transition shadow-md shadow-blue-600/30 whitespace-nowrap"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Article Reader Modal */}
      {selectedBlog && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-fade-in border border-slate-200">
            <div className="sticky top-0 bg-white/95 backdrop-blur-md px-6 py-4 border-b border-slate-200 flex items-center justify-between z-10">
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">{selectedBlog.category}</span>
              <button
                onClick={() => setSelectedBlog(null)}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 sm:p-10 space-y-6">
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 leading-tight">
                {selectedBlog.title}
              </h1>

              <div className="flex items-center gap-3 pb-6 border-b border-slate-100">
                <img
                  src={selectedBlog.authorAvatar}
                  alt={selectedBlog.author}
                  className="w-12 h-12 rounded-full object-cover border border-slate-200"
                />
                <div>
                  <div className="font-bold text-slate-900 text-sm">{selectedBlog.author}</div>
                  <div className="text-slate-500 text-xs">{selectedBlog.authorRole} • {selectedBlog.publishDate}</div>
                </div>
              </div>

              <div className="rounded-2xl overflow-hidden h-72 bg-slate-100">
                <img src={selectedBlog.featuredImage} alt={selectedBlog.title} className="w-full h-full object-cover" />
              </div>

              <div className="prose prose-slate max-w-none text-slate-700 text-sm sm:text-base leading-relaxed whitespace-pre-line">
                {selectedBlog.content}
              </div>

              {/* Tags */}
              <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold text-slate-400">TAGS:</span>
                {selectedBlog.tags.map((t, i) => (
                  <span key={i} className="px-3 py-1 rounded-lg bg-slate-100 text-slate-700 text-xs font-medium">
                    #{t}
                  </span>
                ))}
              </div>

              {/* CTA footer in article */}
              <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Need a Solution For Your Facility?</h4>
                  <p className="text-slate-600 text-xs">Our certified engineering team is ready to design a turnkey architecture.</p>
                </div>
                <Link
                  to="/contact"
                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl text-xs whitespace-nowrap"
                >
                  Contact Our Experts
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
