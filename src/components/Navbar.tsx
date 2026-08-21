import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const SERVICES_NAV = [
  { label: "CCTV Surveillance", href: "/services/cctv" },
  { label: "Fire Alarm Systems", href: "/services/fire-alarm" },
  { label: "Access Control", href: "/services/access-control" },
  { label: "Time Attendance", href: "/services/time-attendance" },
  { label: "Public Address", href: "/services/public-address" },
  { label: "Video Door Phone", href: "/services/video-door-phone" },
  { label: "Boom Barrier", href: "/services/boom-barrier" },
  { label: "Networking Solutions", href: "/services/networking" },
  { label: "Home & Building Automation", href: "/services/automation" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setServicesOpen(false);
  }, [location]);

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/98 backdrop-blur-md shadow-lg shadow-blue-900/8"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center shadow-md">
              <span className="text-white font-bold text-lg tracking-tight">V</span>
            </div>
            <div className="leading-tight">
              <div className={`font-bold text-base tracking-wide transition-colors ${scrolled ? "text-slate-900" : "text-white"}`}>
                VRAT
              </div>
              <div className={`text-[10px] tracking-widest uppercase transition-colors ${scrolled ? "text-blue-600" : "text-blue-200"}`}>
                System Integrators
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {[
              { label: "Home", href: "/" },
              { label: "About", href: "/about" },
            ].map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  isActive(item.href)
                    ? scrolled
                      ? "text-blue-600 bg-blue-50"
                      : "text-white bg-white/15"
                    : scrolled
                    ? "text-slate-700 hover:text-blue-600 hover:bg-blue-50"
                    : "text-white/90 hover:text-white hover:bg-white/15"
                }`}
              >
                {item.label}
              </Link>
            ))}

            {/* Services Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <button
                className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  location.pathname.startsWith("/services")
                    ? scrolled
                      ? "text-blue-600 bg-blue-50"
                      : "text-white bg-white/15"
                    : scrolled
                    ? "text-slate-700 hover:text-blue-600 hover:bg-blue-50"
                    : "text-white/90 hover:text-white hover:bg-white/15"
                }`}
              >
                Services
                <svg className={`w-3.5 h-3.5 transition-transform ${servicesOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {servicesOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-64 bg-white rounded-xl shadow-2xl shadow-blue-900/15 border border-blue-50 py-2 z-50 animate-fade-in">
                  <Link
                    to="/services"
                    className="block px-4 py-2.5 text-sm font-semibold text-blue-700 hover:bg-blue-50 border-b border-slate-100 mb-1"
                  >
                    All Services →
                  </Link>
                  {SERVICES_NAV.map((s) => (
                    <Link
                      key={s.href}
                      to={s.href}
                      className="block px-4 py-2 text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                    >
                      {s.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {[
              { label: "Industries", href: "/industries" },
              { label: "Projects", href: "/projects" },
              { label: "Contact", href: "/contact" },
            ].map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  isActive(item.href)
                    ? scrolled
                      ? "text-blue-600 bg-blue-50"
                      : "text-white bg-white/15"
                    : scrolled
                    ? "text-slate-700 hover:text-blue-600 hover:bg-blue-50"
                    : "text-white/90 hover:text-white hover:bg-white/15"
                }`}
              >
                {item.label}
              </Link>
            ))}

            <Link
              to="/contact"
              className="ml-3 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg transition-all shadow-md shadow-blue-600/30 hover:shadow-blue-700/40"
            >
              Get a Quote
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            className={`lg:hidden p-2 rounded-lg transition-colors ${scrolled ? "text-slate-700 hover:bg-slate-100" : "text-white hover:bg-white/15"}`}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-slate-100 shadow-xl">
          <div className="px-4 py-4 space-y-1 max-h-[80vh] overflow-y-auto">
            {[
              { label: "Home", href: "/" },
              { label: "About", href: "/about" },
              { label: "Services", href: "/services" },
              ...SERVICES_NAV.map((s) => ({ label: `  ↳ ${s.label}`, href: s.href })),
              { label: "Industries", href: "/industries" },
              { label: "Projects", href: "/projects" },
              { label: "Contact", href: "/contact" },
            ].map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={`block px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive(item.href)
                    ? "text-blue-600 bg-blue-50"
                    : "text-slate-700 hover:text-blue-600 hover:bg-blue-50"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-2">
              <Link
                to="/contact"
                className="block w-full text-center px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg transition-colors"
              >
                Get a Free Quote
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
