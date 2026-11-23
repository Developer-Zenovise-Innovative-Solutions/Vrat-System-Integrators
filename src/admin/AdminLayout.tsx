import React, { useState, useRef, useEffect } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import logoIcon from "../assets/logo/logo-icon.png";
import { useAuth } from "../context/AuthContext";
import { useCMS } from "../context/CMSContext";
import ImageUploader from "../components/ImageUploader";
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
  KeyRound,
  Camera,
  Check,
  Eye,
  EyeOff
} from "lucide-react";

export default function AdminLayout() {
  const { user, logout, changePassword, updateAvatar } = useAuth();
  const { logs, markNotificationAsRead, markAllNotificationsAsRead } = useCMS();
  const location = useLocation();
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  // Global Search state (Requirement 13)
  const [searchQuery, setSearchQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Password & Profile Photo Modals (Requirement 1 & 8B)
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showOldPass, setShowOldPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [passError, setPassError] = useState("");
  const [passSuccess, setPassSuccess] = useState("");

  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(user?.avatar || "");
  const [avatarSuccess, setAvatarSuccess] = useState("");

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

  // Flattened searchable list of all admin modules & quick actions
  const allSearchable = [
    { name: "Dashboard", category: "Overview", href: "/admin" },
    { name: "Page Builder & Sections", category: "Pages", href: "/admin/pages" },
    { name: "Core Services (CCTV, Fire Alarm, Networking)", category: "Content", href: "/admin/services" },
    { name: "Enterprise Products Catalog", category: "Products", href: "/admin/products" },
    { name: "Industry Solutions (Commercial, Industrial)", category: "Solutions", href: "/admin/solutions" },
    { name: "Projects & Case Studies", category: "Projects", href: "/admin/projects" },
    { name: "Blog Posts & Articles", category: "Content", href: "/admin/blog" },
    { name: "FAQ Knowledge Base", category: "Support", href: "/admin/faqs" },
    { name: "Client Testimonials & Ratings", category: "Marketing", href: "/admin/testimonials" },
    { name: "Technology Partners & OEM Brands", category: "Brands", href: "/admin/partners" },
    { name: "Media Assets Library", category: "Media", href: "/admin/media" },
    { name: "Downloads & Technical Catalogues", category: "Downloads", href: "/admin/downloads" },
    { name: "Inbound Leads & RFPs CRM", category: "CRM", href: "/admin/leads" },
    { name: "Job Openings & Job Applicants", category: "HR", href: "/admin/careers" },
    { name: "Global Settings (Contact & Info)", category: "Settings", href: "/admin/settings" },
    { name: "Business Locations Management", category: "Settings", href: "/admin/settings" },
    { name: "Social Media Settings", category: "Settings", href: "/admin/settings" },
    { name: "SEO & Meta Manager", category: "SEO", href: "/admin/seo" },
    { name: "System Users & Roles", category: "Access Control", href: "/admin/users" },
    { name: "Activity Logs & Audits", category: "System", href: "/admin/logs" },
  ];

  const searchResults = searchQuery.trim()
    ? allSearchable.filter(
        (item) =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  // Close search dropdown on click outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const unreadCount = logs.filter((l) => !l.read).length;

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPassError("");
    setPassSuccess("");

    if (newPassword !== confirmPassword) {
      setPassError("New password and confirmation do not match.");
      return;
    }

    const res = changePassword(oldPassword, newPassword);
    if (res.success) {
      setPassSuccess(res.message);
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setTimeout(() => {
        setShowPasswordModal(false);
        setPassSuccess("");
      }, 2000);
    } else {
      setPassError(res.message);
    }
  };

  const handleAvatarSave = () => {
    updateAvatar(avatarUrl);
    setAvatarSuccess("Profile photo updated successfully!");
    setTimeout(() => {
      setShowAvatarModal(false);
      setAvatarSuccess("");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex">
      {/* Sidebar Desktop */}
      <aside className="w-64 bg-slate-950 border-r border-slate-800 flex flex-col hidden lg:flex shrink-0 h-screen sticky top-0 z-30 select-none">
        {/* Brand Header */}
        <div className="p-5 border-b border-slate-800/80 flex items-center justify-between shrink-0">
          <Link to="/admin" className="flex items-center gap-3 group">
            <img
              src={logoIcon}
              alt="VRAT CMS Logo"
              className="w-9 h-9 object-contain drop-shadow group-hover:scale-105 transition-transform"
            />
            <div>
              <div className="font-bold text-sm text-white tracking-wide">VRAT CMS</div>
              <div className="text-[10px] tracking-wider uppercase text-blue-400 font-semibold">Admin Panel</div>
            </div>
          </Link>
        </div>

        {/* Navigation Items (Scrollable Middle Area with Custom Scrollbar) */}
        <div className="flex-1 p-3 space-y-6 overflow-y-auto custom-sidebar-scrollbar min-h-0">
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

        {/* Live Site Link */}
        <div className="p-3 border-t border-slate-800/80 space-y-2 shrink-0 bg-slate-950">
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
        <header className="h-16 bg-slate-950/90 backdrop-blur-md border-b border-slate-800 px-4 sm:px-8 flex items-center justify-between sticky top-0 z-40 gap-4">
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

          {/* Global Search Bar (Requirement 13) */}
          <div ref={searchRef} className="relative flex-1 max-w-md hidden md:block">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onFocus={() => setSearchOpen(true)}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setSearchOpen(true);
                }}
                placeholder="Search admin sections, pages, settings, products..."
                className="w-full pl-9 pr-4 py-1.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Live Search Suggestions Dropdown */}
            {searchOpen && searchQuery.trim() && (
              <div className="absolute left-0 right-0 mt-2 bg-slate-950 border border-slate-800 rounded-2xl shadow-2xl p-2 z-50 animate-fade-in max-h-80 overflow-y-auto">
                <div className="px-3 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Quick Navigation ({searchResults.length} results)
                </div>
                {searchResults.length > 0 ? (
                  searchResults.map((item, idx) => (
                    <Link
                      key={idx}
                      to={item.href}
                      onClick={() => {
                        setSearchOpen(false);
                        setSearchQuery("");
                      }}
                      className="flex items-center justify-between px-3 py-2 rounded-xl text-xs hover:bg-slate-900 transition text-slate-200 hover:text-white"
                    >
                      <span className="font-medium">{item.name}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20 font-semibold">
                        {item.category}
                      </span>
                    </Link>
                  ))
                ) : (
                  <div className="p-4 text-center text-xs text-slate-500">
                    No admin section matches "{searchQuery}"
                  </div>
                )}
              </div>
            )}
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

            {/* Notifications Dropdown (Requirement 6) */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 relative transition"
                title="Notifications"
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-500 absolute top-1.5 right-1.5 ring-2 ring-slate-950 animate-pulse"></span>
                )}
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-slate-950 border border-slate-800 rounded-2xl shadow-2xl p-4 z-50 animate-fade-in">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <div>
                      <span className="text-xs font-bold text-white">System Notifications</span>
                      {unreadCount > 0 && (
                        <span className="ml-2 px-1.5 py-0.5 rounded text-[10px] font-bold bg-blue-500/20 text-blue-300 border border-blue-500/30">
                          {unreadCount} unread
                        </span>
                      )}
                    </div>
                    {unreadCount > 0 && (
                      <button
                        onClick={markAllNotificationsAsRead}
                        className="text-[11px] text-blue-400 hover:text-blue-300 font-semibold transition"
                      >
                        Mark All as Read
                      </button>
                    )}
                  </div>

                  <div className="space-y-2 max-h-72 overflow-y-auto mt-3 scrollbar-thin">
                    {logs.length > 0 ? (
                      logs.slice(0, 10).map((log) => (
                        <div
                          key={log.id}
                          onClick={() => markNotificationAsRead(log.id)}
                          className={`text-xs p-3 rounded-xl border transition cursor-pointer ${
                            log.read
                              ? "bg-slate-900/40 border-slate-850 text-slate-400"
                              : "bg-blue-950/20 border-blue-500/30 text-slate-200"
                          }`}
                        >
                          <div className="flex items-center justify-between gap-2 mb-1">
                            <span className="font-semibold text-white flex items-center gap-1.5">
                              {!log.read && (
                                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0"></span>
                              )}
                              {log.action}
                            </span>
                            <span className="text-[10px] text-slate-500 font-mono">{log.timestamp}</span>
                          </div>
                          <div className="text-[11px] text-slate-400 leading-snug">{log.details}</div>
                        </div>
                      ))
                    ) : (
                      <div className="py-6 text-center text-xs text-slate-500">
                        No activity notifications recorded yet.
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Profile Dropdown (Requirement 1 & 7) */}
            <div className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center gap-2.5 p-1.5 rounded-xl hover:bg-slate-800/80 transition"
              >
                {/* Initials Avatar fallback when profile photo is empty */}
                {user?.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-8 h-8 rounded-full object-cover border border-blue-500/50"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-bold flex items-center justify-center text-xs border border-blue-400/40 shadow-sm">
                    {user?.name
                      ? user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .slice(0, 2)
                          .toUpperCase()
                      : "NP"}
                  </div>
                )}
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
                    <div className="text-[11px] text-slate-400 truncate">{user?.email}</div>
                    <div className="mt-1.5 inline-block px-2 py-0.5 rounded bg-blue-600/30 text-blue-300 text-[10px] font-bold">
                      {user?.role}
                    </div>
                  </div>

                  {/* Actions: Change Photo & Change Password (Reset Demo Data removed as per Requirement 7) */}
                  <div className="space-y-1">
                    <button
                      onClick={() => {
                        setShowAvatarModal(true);
                        setShowProfileMenu(false);
                      }}
                      className="w-full text-left px-3 py-2 rounded-lg text-xs text-slate-300 hover:text-white hover:bg-slate-900 flex items-center gap-2 transition"
                    >
                      <Camera className="w-3.5 h-3.5 text-blue-400" />
                      Update Profile Photo
                    </button>
                    <button
                      onClick={() => {
                        setShowPasswordModal(true);
                        setShowProfileMenu(false);
                      }}
                      className="w-full text-left px-3 py-2 rounded-lg text-xs text-slate-300 hover:text-white hover:bg-slate-900 flex items-center gap-2 transition"
                    >
                      <KeyRound className="w-3.5 h-3.5 text-emerald-400" />
                      Change Password
                    </button>
                  </div>

                  <div className="pt-2 border-t border-slate-800">
                    <button
                      onClick={() => {
                        logout();
                        navigate("/admin/login");
                      }}
                      className="w-full text-left px-3 py-2 rounded-lg text-xs text-rose-400 hover:bg-rose-500/10 flex items-center gap-2 transition"
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
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          ></div>
          <div className="relative w-72 bg-slate-950 border-r border-slate-800 flex flex-col justify-between z-10 h-full">
            <div className="p-4 border-b border-slate-800 flex items-center justify-between shrink-0">
              <Link to="/admin" className="flex items-center gap-2">
                <img src={logoIcon} alt="VRAT Logo" className="w-8 h-8 object-contain" />
                <div className="font-bold text-white text-sm">VRAT CMS</div>
              </Link>
              <button
                onClick={() => setSidebarOpen(false)}
                className="p-1 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 p-4 space-y-4 overflow-y-auto custom-sidebar-scrollbar min-h-0">
              {navGroups.map((group, gIdx) => (
                <div key={gIdx} className="space-y-1">
                  <div className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                    {group.title}
                  </div>
                  {group.items.map((item) => (
                    <Link
                      key={item.href}
                      to={item.href}
                      onClick={() => setSidebarOpen(false)}
                      className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold ${
                        isActive(item.href) ? "bg-blue-600 text-white" : "text-slate-400"
                      }`}
                    >
                      {item.icon}
                      <span>{item.label}</span>
                    </Link>
                  ))}
                </div>
              ))}
            </div>

            <div className="p-4 border-t border-slate-800 shrink-0">
              <button
                onClick={() => {
                  logout();
                  navigate("/admin/login");
                }}
                className="w-full py-2 bg-rose-600/20 text-rose-300 text-xs font-semibold rounded-xl"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Change Password Modal (Requirement 8B) */}
      {showPasswordModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 rounded-3xl max-w-md w-full border border-slate-800 shadow-2xl p-6 sm:p-8 animate-fade-in text-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <KeyRound className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-base">Change Admin Password</h3>
                  <p className="text-[10px] text-slate-400">Secure credential update synced across devices</p>
                </div>
              </div>
              <button
                onClick={() => setShowPasswordModal(false)}
                className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {passSuccess && (
              <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>{passSuccess}</span>
              </div>
            )}

            {passError && (
              <div className="p-3 rounded-xl bg-rose-500/20 border border-rose-500/30 text-rose-300 text-xs">
                {passError}
              </div>
            )}

            <form onSubmit={handlePasswordSubmit} className="space-y-3.5">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Current Password *</label>
                <div className="relative">
                  <input
                    type={showOldPass ? "text" : "password"}
                    required
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    placeholder="Enter current password..."
                    className="w-full pl-3 pr-10 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowOldPass(!showOldPass)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                  >
                    {showOldPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">New Password (Min 6 chars) *</label>
                <div className="relative">
                  <input
                    type={showNewPass ? "text" : "password"}
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter new password..."
                    className="w-full pl-3 pr-10 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPass(!showNewPass)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                  >
                    {showNewPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Confirm New Password *</label>
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter new password..."
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowPasswordModal(false)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-lg shadow-emerald-600/30"
                >
                  Update Password
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Update Avatar Modal (Requirement 1) */}
      {showAvatarModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 rounded-3xl max-w-md w-full border border-slate-800 shadow-2xl p-6 sm:p-8 animate-fade-in text-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center">
                  <Camera className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-base">Update Profile Photo</h3>
                  <p className="text-[10px] text-slate-400">Upload or replace your administrator avatar</p>
                </div>
              </div>
              <button
                onClick={() => setShowAvatarModal(false)}
                className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {avatarSuccess && (
              <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>{avatarSuccess}</span>
              </div>
            )}

            <ImageUploader
              value={avatarUrl}
              onChange={(url) => setAvatarUrl(url)}
              folder="avatars"
              label="Administrator Avatar"
              helperText="Upload JPG or PNG square portrait"
            />

            <div className="flex justify-end gap-3 pt-3 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setShowAvatarModal(false)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold rounded-xl"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleAvatarSave}
                className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl shadow-lg shadow-blue-600/30"
              >
                Save Photo
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
