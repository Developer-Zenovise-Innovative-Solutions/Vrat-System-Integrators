import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCMS } from "../context/CMSContext";
import {
  Menu,
  X,
  ChevronDown,
  Phone,
  Shield,
  Layers,
  Camera,
  Cpu,
  Flame,
  Lock,
  Clock,
  Megaphone,
  PhoneCall,
  Network,
  LogOut,
  UserCheck
} from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const location = useLocation();
  const { user, isAuthenticated } = useAuth();
  const { services, solutions, settings } = useCMS();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setServicesOpen(false);
    setSolutionsOpen(false);
  }, [location]);

  const isActive = (path: string) => location.pathname === path;

  // Don't render public navbar if inside admin routes (admin layout has its own header)
  if (location.pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      {/* Top Notification / Contact Bar */}
      <div className="bg-slate-950 text-slate-300 text-[11px] py-1 px-4 sm:px-8 border-b border-slate-800/80 hidden sm:flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1 text-slate-400">
            <Phone className="w-3 h-3 text-blue-400" />
            24×7 Hotline: <a href={`tel:${settings.emergencyHotline}`} className="text-white hover:text-blue-400 transition font-semibold">{settings.phone}</a>
          </span>
          <span className="text-slate-600">|</span>
          <span className="text-slate-400">
            ISO 9001:2015 Certified • PAN India Operations
          </span>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/support" className="hover:text-white transition">Customer Support</Link>
          <Link to="/downloads" className="hover:text-white transition">Download Center</Link>
          <Link to="/careers" className="hover:text-white transition">Careers</Link>
          <Link
            to="/admin"
            className="flex items-center gap-1 px-2 py-0.5 rounded bg-blue-600/30 text-blue-300 hover:bg-blue-600 hover:text-white transition font-bold"
          >
            <Shield className="w-3 h-3" />
            {isAuthenticated ? `Admin (${user?.role})` : "Admin Portal"}
          </Link>
        </div>
      </div>

      {/* Main Navbar */}
      <nav
        className={`transition-all duration-300 ${
          scrolled
            ? "bg-white/98 backdrop-blur-md shadow-lg shadow-blue-900/8 border-b border-slate-200/80"
            : "bg-slate-900/90 backdrop-blur-md border-b border-white/10"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-18">
            {/* Brand Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
                <span className="text-white font-black text-xl tracking-tight">V</span>
              </div>
              <div className="leading-tight">
                <div className={`font-bold text-base tracking-wide transition-colors ${scrolled ? "text-slate-900" : "text-white"}`}>
                  VRAT
                </div>
                <div className={`text-[10px] tracking-widest uppercase font-semibold transition-colors ${scrolled ? "text-blue-600" : "text-blue-400"}`}>
                  System Integrators
                </div>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden xl:flex items-center gap-1">
              <Link
                to="/"
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition ${
                  isActive("/")
                    ? scrolled ? "text-blue-600 bg-blue-50" : "text-white bg-white/15"
                    : scrolled ? "text-slate-700 hover:text-blue-600 hover:bg-blue-50" : "text-slate-200 hover:text-white hover:bg-white/10"
                }`}
              >
                Home
              </Link>
              <Link
                to="/about"
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition ${
                  isActive("/about")
                    ? scrolled ? "text-blue-600 bg-blue-50" : "text-white bg-white/15"
                    : scrolled ? "text-slate-700 hover:text-blue-600 hover:bg-blue-50" : "text-slate-200 hover:text-white hover:bg-white/10"
                }`}
              >
                About Us
              </Link>

              {/* Services Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
              >
                <Link
                  to="/services"
                  className={`flex items-center gap-1 px-3.5 py-2 rounded-xl text-xs font-semibold transition ${
                    location.pathname.startsWith("/services")
                      ? scrolled ? "text-blue-600 bg-blue-50" : "text-white bg-white/15"
                      : scrolled ? "text-slate-700 hover:text-blue-600 hover:bg-blue-50" : "text-slate-200 hover:text-white hover:bg-white/10"
                  }`}
                >
                  Services
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform ${servicesOpen ? "rotate-180" : ""}`} />
                </Link>

                {servicesOpen && (
                  <div className="absolute top-full left-0 w-80 bg-white rounded-2xl shadow-2xl shadow-slate-900/20 border border-slate-200 py-3 z-50 animate-fade-in">
                    <Link
                      to="/services"
                      className="block px-5 py-2 text-xs font-bold text-blue-600 hover:bg-blue-50 border-b border-slate-100 mb-1"
                    >
                      All 9 Core Services Overview →
                    </Link>
                    <div className="max-h-96 overflow-y-auto">
                      {services.map((s) => (
                        <Link
                          key={s.id}
                          to={`/services/${s.slug}`}
                          className="block px-5 py-2 text-xs text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition"
                        >
                          {s.title}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Solutions Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setSolutionsOpen(true)}
                onMouseLeave={() => setSolutionsOpen(false)}
              >
                <Link
                  to="/solutions"
                  className={`flex items-center gap-1 px-3.5 py-2 rounded-xl text-xs font-semibold transition ${
                    location.pathname.startsWith("/solutions") || location.pathname.startsWith("/industries")
                      ? scrolled ? "text-blue-600 bg-blue-50" : "text-white bg-white/15"
                      : scrolled ? "text-slate-700 hover:text-blue-600 hover:bg-blue-50" : "text-slate-200 hover:text-white hover:bg-white/10"
                  }`}
                >
                  Solutions
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform ${solutionsOpen ? "rotate-180" : ""}`} />
                </Link>

                {solutionsOpen && (
                  <div className="absolute top-full left-0 w-72 bg-white rounded-2xl shadow-2xl shadow-slate-900/20 border border-slate-200 py-3 z-50 animate-fade-in">
                    <Link
                      to="/solutions"
                      className="block px-5 py-2 text-xs font-bold text-blue-600 hover:bg-blue-50 border-b border-slate-100 mb-1"
                    >
                      All Industry Sectors →
                    </Link>
                    <div className="max-h-96 overflow-y-auto">
                      {solutions.map((sol) => (
                        <Link
                          key={sol.id}
                          to={`/solutions/${sol.slug}`}
                          className="block px-5 py-2 text-xs text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition"
                        >
                          {sol.title}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <Link
                to="/products"
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition ${
                  isActive("/products")
                    ? scrolled ? "text-blue-600 bg-blue-50" : "text-white bg-white/15"
                    : scrolled ? "text-slate-700 hover:text-blue-600 hover:bg-blue-50" : "text-slate-200 hover:text-white hover:bg-white/10"
                }`}
              >
                Products
              </Link>
              <Link
                to="/projects"
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition ${
                  isActive("/projects")
                    ? scrolled ? "text-blue-600 bg-blue-50" : "text-white bg-white/15"
                    : scrolled ? "text-slate-700 hover:text-blue-600 hover:bg-blue-50" : "text-slate-200 hover:text-white hover:bg-white/10"
                }`}
              >
                Projects
              </Link>
              <Link
                to="/gallery"
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition ${
                  isActive("/gallery")
                    ? scrolled ? "text-blue-600 bg-blue-50" : "text-white bg-white/15"
                    : scrolled ? "text-slate-700 hover:text-blue-600 hover:bg-blue-50" : "text-slate-200 hover:text-white hover:bg-white/10"
                }`}
              >
                Gallery
              </Link>
              <Link
                to="/blog"
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition ${
                  isActive("/blog")
                    ? scrolled ? "text-blue-600 bg-blue-50" : "text-white bg-white/15"
                    : scrolled ? "text-slate-700 hover:text-blue-600 hover:bg-blue-50" : "text-slate-200 hover:text-white hover:bg-white/10"
                }`}
              >
                Blog
              </Link>
              <Link
                to="/contact"
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition ${
                  isActive("/contact")
                    ? scrolled ? "text-blue-600 bg-blue-50" : "text-white bg-white/15"
                    : scrolled ? "text-slate-700 hover:text-blue-600 hover:bg-blue-50" : "text-slate-200 hover:text-white hover:bg-white/10"
                }`}
              >
                Contact
              </Link>
            </div>

            {/* Right Action Button */}
            <div className="hidden lg:flex items-center gap-3">
              <Link
                to="/contact"
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition shadow-md shadow-blue-600/30 hover:scale-105 transform duration-200"
              >
                Request Free Survey
              </Link>
            </div>

            {/* Mobile Menu Hamburger */}
            <div className="flex items-center gap-2 xl:hidden">
              <Link
                to="/admin"
                className="px-3 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-bold flex items-center gap-1"
              >
                <Shield className="w-3 h-3" /> Admin
              </Link>
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className={`p-2 rounded-xl transition ${
                  scrolled ? "text-slate-700 hover:bg-slate-100" : "text-white hover:bg-white/10"
                }`}
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileOpen && (
          <div className="xl:hidden bg-white border-t border-slate-200 shadow-2xl max-h-[85vh] overflow-y-auto">
            <div className="p-4 space-y-1">
              <Link to="/" className="block px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-800 hover:bg-blue-50 hover:text-blue-600">Home</Link>
              <Link to="/about" className="block px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-800 hover:bg-blue-50 hover:text-blue-600">About Us</Link>
              <Link to="/services" className="block px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-800 hover:bg-blue-50 hover:text-blue-600">All Services</Link>
              <Link to="/solutions" className="block px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-800 hover:bg-blue-50 hover:text-blue-600">Industry Solutions</Link>
              <Link to="/products" className="block px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-800 hover:bg-blue-50 hover:text-blue-600">Products Catalog</Link>
              <Link to="/projects" className="block px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-800 hover:bg-blue-50 hover:text-blue-600">Projects & Case Studies</Link>
              <Link to="/gallery" className="block px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-800 hover:bg-blue-50 hover:text-blue-600">Project Gallery</Link>
              <Link to="/downloads" className="block px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-800 hover:bg-blue-50 hover:text-blue-600">Download Center</Link>
              <Link to="/blog" className="block px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-800 hover:bg-blue-50 hover:text-blue-600">Blog & Insights</Link>
              <Link to="/careers" className="block px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-800 hover:bg-blue-50 hover:text-blue-600">Careers</Link>
              <Link to="/faq" className="block px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-800 hover:bg-blue-50 hover:text-blue-600">FAQ & Knowledge Base</Link>
              <Link to="/support" className="block px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-800 hover:bg-blue-50 hover:text-blue-600">Customer Support</Link>
              <Link to="/contact" className="block px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-800 hover:bg-blue-50 hover:text-blue-600">Contact Us</Link>
              
              <div className="pt-4 space-y-2">
                <Link
                  to="/contact"
                  className="block w-full py-3 bg-blue-600 text-white text-center font-bold text-sm rounded-xl shadow-md"
                >
                  Request a Free Site Survey
                </Link>
                <Link
                  to="/admin"
                  className="block w-full py-2.5 bg-slate-900 text-white text-center font-semibold text-xs rounded-xl"
                >
                  Go to Admin Panel & CMS
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
