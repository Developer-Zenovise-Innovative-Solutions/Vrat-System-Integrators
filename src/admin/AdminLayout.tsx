import React, { useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCMS } from "../context/CMSContext";
import {
  LayoutDashboard,
  FileText,
  Layers,
  ShoppingBag,
  Briefcase,
  BookOpen,
  HelpCircle,
  FolderDown,
  Inbox,
  Users,
  Image,
  Star,
  Handshake,
  Settings,
  Search,
  Sliders,
  Shield,
  LogOut,
  ExternalLink,
  ChevronDown,
  Menu,
  X,
  Bell,
  CheckCircle2,
  RefreshCw
} from "lucide-react";

export default function AdminLayout() {
  const { user, logout, switchRole } = useAuth();
  const { logs, resetToDefaults } = useCMS();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const isActive = (path: string) => {
    if (path === "/admin" && location.pathname === "/admin") return true;
    if (path !== "/admin" && location.pathname.startsWith(path)) return true;
    return false;
  };

  const navGroups = [
    {
      title: "OVERVIEW",
      items: [
        { label: "Dashboard", href: "/admin", icon: <LayoutDashboard className="w-4 h-4" /> },
      ],
    },
    {
      title: "PAGE BUILDER & CONTENT",
      items: [
        { label: "Page Builder (29 Pages)", href: "/admin/pages", icon: <Sliders className="w-4 h-4" /> },
        { label: "Services (9 Core)", href: "/admin/services", icon: <Layers className="w-4 h-4" /> },
        { label: "Products Catalog", href: "/admin/products", icon: <ShoppingBag className="w-4 h-4" /> },
        { label: "Industry Solutions", href: "/admin/solutions", icon: <FileText className="w-4 h-4" /> },
        { label: "Projects & Case Studies", href: "/admin/projects", icon: <Briefcase className="w-4 h-4" /> },
        { label: "Blog & Insights", href: "/admin/blog", icon: <BookOpen className="w-4 h-4" /> },
        { label: "FAQ Knowledge Base", href: "/admin/faqs", icon: <HelpCircle className="w-4 h-4" /> },
        { label: "Testimonials", href: "/admin/testimonials", icon: <Star className="w-4 h-4" /> },
        { label: "Technology Partners", href: "/admin/partners", icon: <Handshake className="w-4 h-4" /> },
      ],
    },
    {
      title: "MEDIA & DOWNLOADS",
      items: [
        { label: "Media Library", href: "/admin/media", icon: <Image className="w-4 h-4" /> },
        { label: "Downloads Center", href: "/admin/downloads", icon: <FolderDown className="w-4 h-4" /> },
      ],
    },
    {
      title: "LEADS & TALENT CRM",
      items: [
        { label: "Leads & Inquiries", href: "/admin/leads", icon: <Inbox className="w-4 h-4" /> },
        { label: "Careers & Applicants", href: "/admin/careers", icon: <Users className="w-4 h-4" /> },
      ],
    },
    {
      title: "SYSTEM & SEO",
      items: [
        { label: "Global Settings", href: "/admin/settings", icon: <Settings className="w-4 h-4" /> },
        { label: "SEO & Meta Manager", href: "/admin/seo", icon: <Search className="w-4 h-4" /> },
        { label: "Users & Roles", href: "/admin/users", icon: <Shield className="w-4 h-4" /> },
        { label: "Activity & Revision Logs", href: "/admin/logs", icon: <FileText className="w-4 h-4" /> },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex">
      {/* Sidebar Desktop */}
      <aside className="w-64 bg-slate-950 border-r border-slate-800 flex flex-col justify-between hidden lg:flex shrink-0">
        <div>
          {/* Brand Header */}
          <div className="p-5 border-b border-slate-800/80 flex items-center justify-between">
            <Link to="/admin" className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-md">
                <span className="text-white font-black text-lg">V</span>
              </div>
              <div>
                <div className="font-bold text-sm text-white tracking-wide">VRAT CMS</div>
                <div className="text-[10px] tracking-wider uppercase text-blue-400 font-semibold">Admin Panel</div>
              </div>
            </Link>
          </div>

          {/* Navigation Items */}
          <div className="p-3 space-y-6 overflow-y-auto max-h-[calc(100vh-140px)] scrollbar-thin">
            {navGroups.map((group, gIdx) => (
              <div key={gIdx} className="space-y-1">
                <div className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                  {group.title}
                </div>
                {group.items.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition ${
                      isActive(item.href)
                        ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                        : "text-slate-400 hover:text-slate-200 hover:bg-slate-900"
                    }`}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Live Site Link & Reset Footer */}
        <div className="p-3 border-t border-slate-800/80 space-y-2">
          <Link
            to="/"
            target="_blank"
            rel="noreferrer"
            className="w-full flex items-center justify-center gap-2 py-2 px-3 bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-semibold rounded-xl border border-slate-800 transition"
          >
            <ExternalLink className="w-3.5 h-3.5 text-blue-400" />
            <span>View Live Website</span>
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 bg-slate-900">
        {/* Admin Top Header */}
        <header className="h-16 bg-slate-950/90 backdrop-blur-md border-b border-slate-800 px-4 sm:px-8 flex items-center justify-between sticky top-0 z-40">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="hidden sm:flex items-center gap-2 text-xs text-slate-400">
              <span>VRAT System Integrators</span>
              <span>/</span>
              <span className="text-white font-medium capitalize">
                {location.pathname.replace("/admin", "").replace("/", "") || "Dashboard"}
              </span>
            </div>
          </div>

          {/* Right Header Items */}
          <div className="flex items-center gap-3">
            {/* Quick Live Preview */}
            <Link
              to="/"
              target="_blank"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-blue-600/20 text-blue-300 hover:bg-blue-600 hover:text-white text-xs font-semibold rounded-lg border border-blue-500/30 transition"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Live Site
            </Link>

            {/* Notifications Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 relative"
              >
                <Bell className="w-5 h-5" />
                <span className="w-2 h-2 rounded-full bg-blue-500 absolute top-1.5 right-1.5"></span>
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-slate-950 border border-slate-800 rounded-2xl shadow-2xl p-4 z-50 animate-fade-in">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <span className="text-xs font-bold text-white">Recent System Activity</span>
                    <span className="text-[10px] text-blue-400 font-semibold">{logs.length} events</span>
                  </div>
                  <div className="space-y-2.5 max-h-64 overflow-y-auto mt-3 scrollbar-thin">
                    {logs.slice(0, 5).map((log) => (
                      <div key={log.id} className="text-xs bg-slate-900/80 p-2.5 rounded-xl border border-slate-800">
                        <div className="font-semibold text-slate-200">{log.action}</div>
                        <div className="text-slate-400 text-[11px] truncate">{log.details}</div>
                        <div className="text-slate-400 text-[10px] mt-1">{log.timestamp}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Role / User Menu */}
            <div className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center gap-2.5 p-1.5 rounded-xl hover:bg-slate-800/80 transition"
              >
                <img
                  src={user?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&auto=format"}
                  alt={user?.name}
                  className="w-8 h-8 rounded-full object-cover border border-blue-500/50"
                />
                <div className="text-left hidden md:block leading-tight">
                  <div className="text-xs font-bold text-white">{user?.name}</div>
                  <div className="text-[10px] text-blue-400 font-semibold">{user?.role}</div>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden md:block" />
              </button>

              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-64 bg-slate-950 border border-slate-800 rounded-2xl shadow-2xl p-3 z-50 animate-fade-in space-y-2">
                  <div className="p-2 border-b border-slate-800">
                    <div className="text-xs font-bold text-white">{user?.name}</div>
                    <div className="text-[11px] text-slate-400">{user?.email}</div>
                    <div className="mt-1.5 inline-block px-2 py-0.5 rounded bg-blue-600/30 text-blue-300 text-[10px] font-bold">
                      {user?.role}
                    </div>
                  </div>

                  <div className="text-[10px] text-slate-400 font-bold px-2 uppercase tracking-wider">
                    Quick Role Switcher
                  </div>
                  <div className="grid grid-cols-2 gap-1 px-1">
                    {(["Super Admin", "Content Manager", "Sales Manager", "Support Manager"] as const).map((r) => (
                      <button
                        key={r}
                        onClick={() => { switchRole(r); setShowProfileMenu(false); }}
                        className={`text-left px-2 py-1.5 rounded text-[11px] font-semibold transition ${
                          user?.role === r ? "bg-blue-600 text-white" : "text-slate-400 hover:bg-slate-900"
                        }`}
                      >
                        {r.split(" ")[0]}
                      </button>
                    ))}
                  </div>

                  <div className="pt-2 border-t border-slate-800 space-y-1">
                    <button
                      onClick={() => {
                        if (confirm("Reset CMS data store to factory defaults?")) {
                          resetToDefaults();
                          setShowProfileMenu(false);
                        }
                      }}
                      className="w-full text-left px-3 py-2 rounded-lg text-xs text-amber-400 hover:bg-amber-500/10 flex items-center gap-2"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      Reset Demo Data
                    </button>
                    <button
                      onClick={() => { logout(); navigate("/admin/login"); }}
                      className="w-full text-left px-3 py-2 rounded-lg text-xs text-rose-400 hover:bg-rose-500/10 flex items-center gap-2"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Dynamic Page Outlet */}
        <main className="p-4 sm:p-8 flex-1 overflow-x-hidden">
          <Outlet />
        </main>
      </div>

      {/* Mobile Drawer */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm"
          />
          <aside className="relative w-72 bg-slate-950 border-r border-slate-800 flex flex-col justify-between p-4 z-10">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-white">V</div>
                  <span className="font-bold text-white text-sm">VRAT CMS</span>
                </div>
                <button onClick={() => setSidebarOpen(false)} className="p-1.5 text-slate-400">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="py-4 space-y-4 overflow-y-auto max-h-[calc(100vh-120px)]">
                {navGroups.map((group, gIdx) => (
                  <div key={gIdx} className="space-y-1">
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2">
                      {group.title}
                    </div>
                    {group.items.map((item) => (
                      <Link
                        key={item.href}
                        to={item.href}
                        onClick={() => setSidebarOpen(false)}
                        className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold transition ${
                          isActive(item.href)
                            ? "bg-blue-600 text-white"
                            : "text-slate-400 hover:bg-slate-900"
                        }`}
                      >
                        {item.icon}
                        <span>{item.label}</span>
                      </Link>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => { logout(); navigate("/admin/login"); }}
              className="w-full py-2 bg-rose-600/20 text-rose-300 font-semibold rounded-xl text-xs flex items-center justify-center gap-2"
            >
              <LogOut className="w-4 h-4" /> Sign Out
            </button>
          </aside>
        </div>
      )}
    </div>
  );
}
