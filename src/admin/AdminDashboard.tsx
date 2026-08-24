import React from "react";
import { Link } from "react-router-dom";
import { useCMS } from "../context/CMSContext";
import { useAuth } from "../context/AuthContext";
import {
  FileText,
  ShoppingBag,
  Layers,
  Briefcase,
  BookOpen,
  HelpCircle,
  FolderDown,
  Inbox,
  Users,
  Image,
  Star,
  Handshake,
  TrendingUp,
  ArrowUpRight,
  Plus,
  Sliders,
  CheckCircle2,
  Clock,
  ExternalLink,
  ShieldCheck
} from "lucide-react";

export default function AdminDashboard() {
  const { user } = useAuth();
  const {
    services,
    products,
    solutions,
    caseStudies,
    blogs,
    faqs,
    downloads,
    leads,
    jobs,
    applications,
    mediaItems,
    logs,
    heroConfigs,
  } = useCMS();

  const totalPages = 29;
  const publishedPages = 29;
  const newLeadsCount = leads.filter((l) => l.status === "New").length;
  const newAppsCount = applications.filter((a) => a.status === "New").length;

  const kpis = [
    { title: "Active Services", count: services.length, link: "/admin/services", icon: <Layers className="w-5 h-5 text-blue-400" />, change: "+9 Configured" },
    { title: "Enterprise Products", count: products.length, link: "/admin/products", icon: <ShoppingBag className="w-5 h-5 text-emerald-400" />, change: "12 Categories" },
    { title: "Industry Solutions", count: solutions.length, link: "/admin/solutions", icon: <FileText className="w-5 h-5 text-purple-400" />, change: "8 Sectors" },
    { title: "Case Studies", count: caseStudies.length, link: "/admin/projects", icon: <Briefcase className="w-5 h-5 text-amber-400" />, change: "500+ Projects" },
    { title: "Total Inbound Leads", count: leads.length, link: "/admin/leads", icon: <Inbox className="w-5 h-5 text-rose-400" />, change: `${newLeadsCount} New Today` },
    { title: "Job Applicants", count: applications.length, link: "/admin/careers", icon: <Users className="w-5 h-5 text-sky-400" />, change: `${jobs.length} Open Roles` },
    { title: "Technical Downloads", count: downloads.length, link: "/admin/downloads", icon: <FolderDown className="w-5 h-5 text-indigo-400" />, change: "4,600+ Downloads" },
    { title: "Media Library Files", count: mediaItems.length, link: "/admin/media", icon: <Image className="w-5 h-5 text-teal-400" />, change: "Optimized Assets" },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-950 p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-2xl relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold">
            <ShieldCheck className="w-3.5 h-3.5" />
            System Live & Operating Normally
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">
            Welcome back, {user?.name}
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm">
            You are logged in as <span className="font-bold text-blue-300">{user?.role}</span>. You have full control over all 29 website pages, hero sections, products, and customer lead workflows.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-2.5">
          <Link
            to="/admin/pages"
            className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl text-xs transition shadow-lg shadow-blue-600/30 flex items-center gap-1.5"
          >
            <Sliders className="w-4 h-4" />
            Page Builder
          </Link>
          <Link
            to="/admin/leads"
            className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold rounded-xl text-xs transition border border-slate-700 flex items-center gap-1.5"
          >
            <Inbox className="w-4 h-4 text-rose-400" />
            CRM Leads ({leads.length})
          </Link>
          <Link
            to="/"
            target="_blank"
            className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl text-xs transition border border-white/10 flex items-center gap-1.5"
          >
            <ExternalLink className="w-4 h-4" />
            Live Preview
          </Link>
        </div>
      </div>

      {/* KPI Metric Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {kpis.map((kpi, idx) => (
          <Link
            key={idx}
            to={kpi.link}
            className="bg-slate-950 p-5 rounded-2xl border border-slate-800 hover:border-slate-700 transition shadow-sm hover:shadow-xl group"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-9 h-9 rounded-xl bg-slate-900 flex items-center justify-center">
                {kpi.icon}
              </div>
              <ArrowUpRight className="w-4 h-4 text-slate-600 group-hover:text-blue-400 transition" />
            </div>
            <div className="text-2xl font-black text-white mb-0.5">{kpi.count}</div>
            <div className="text-xs font-bold text-slate-300">{kpi.title}</div>
            <div className="text-[10px] text-slate-500 mt-1">{kpi.change}</div>
          </Link>
        ))}
      </div>

      {/* Two Column Layout: Recent Leads CRM & System Activity */}
      <div className="grid lg:grid-cols-12 gap-8">
        {/* Recent Inbound Leads Table */}
        <div className="lg:col-span-7 bg-slate-950 p-6 rounded-3xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <h3 className="font-bold text-white text-base">Recent Inbound Leads & Requests</h3>
              <p className="text-slate-400 text-xs">Real-time submissions from contact forms, surveys, and quote requests.</p>
            </div>
            <Link to="/admin/leads" className="text-blue-400 text-xs font-semibold hover:underline">
              View All →
            </Link>
          </div>

          <div className="space-y-3">
            {leads.slice(0, 5).map((lead) => (
              <div
                key={lead.id}
                className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800/80 flex items-start justify-between gap-4"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-xs">{lead.name}</span>
                    {lead.company && (
                      <span className="text-[11px] text-slate-400">• {lead.company}</span>
                    )}
                  </div>
                  <div className="text-xs text-blue-400 font-medium mt-0.5">
                    {lead.type}: <span className="text-slate-300">{lead.serviceOrProduct}</span>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1 line-clamp-1">
                    "{lead.message}"
                  </div>
                  <div className="text-[10px] text-slate-400 mt-1">{lead.createdDate}</div>
                </div>

                <span
                  className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    lead.status === "New"
                      ? "bg-rose-500/20 text-rose-300 border border-rose-500/30"
                      : lead.status === "Contacted"
                      ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                      : lead.status === "Proposal Sent"
                      ? "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                      : "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                  }`}
                >
                  {lead.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* System Activity Feed & Quick Actions */}
        <div className="lg:col-span-5 space-y-6">
          {/* Quick Page Editor Links */}
          <div className="bg-slate-950 p-6 rounded-3xl border border-slate-800 space-y-3">
            <h3 className="font-bold text-white text-sm">Quick Content Editors</h3>
            <div className="grid grid-cols-2 gap-2">
              <Link
                to="/admin/pages"
                className="p-3 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-800 text-xs font-semibold text-slate-200 flex items-center justify-between transition"
              >
                <span>Edit Home Hero</span>
                <Sliders className="w-3.5 h-3.5 text-blue-400" />
              </Link>
              <Link
                to="/admin/products"
                className="p-3 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-800 text-xs font-semibold text-slate-200 flex items-center justify-between transition"
              >
                <span>Add New Product</span>
                <Plus className="w-3.5 h-3.5 text-emerald-400" />
              </Link>
              <Link
                to="/admin/blog"
                className="p-3 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-800 text-xs font-semibold text-slate-200 flex items-center justify-between transition"
              >
                <span>Publish Article</span>
                <Plus className="w-3.5 h-3.5 text-purple-400" />
              </Link>
              <Link
                to="/admin/careers"
                className="p-3 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-800 text-xs font-semibold text-slate-200 flex items-center justify-between transition"
              >
                <span>Post Job Opening</span>
                <Plus className="w-3.5 h-3.5 text-amber-400" />
              </Link>
            </div>
          </div>

          {/* Activity Log Feed */}
          <div className="bg-slate-950 p-6 rounded-3xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <h3 className="font-bold text-white text-sm">Audit & Activity Log</h3>
              <Link to="/admin/logs" className="text-blue-400 text-xs font-semibold hover:underline">
                View All
              </Link>
            </div>
            <div className="space-y-2 max-h-64 overflow-y-auto scrollbar-thin">
              {logs.slice(0, 6).map((log) => (
                <div key={log.id} className="p-2.5 rounded-xl bg-slate-900 border border-slate-850 text-xs">
                  <div className="flex items-center justify-between text-slate-300">
                    <span className="font-bold text-white">{log.action}</span>
                    <span className="text-[10px] text-slate-500">{log.timestamp}</span>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5 truncate">{log.details}</div>
                  <div className="text-[10px] text-blue-400 mt-1 font-semibold">{log.user} ({log.role})</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
