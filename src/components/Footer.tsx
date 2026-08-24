import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCMS } from "../context/CMSContext";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Shield,
  ArrowRight,
  CheckCircle2,
  Lock,
  ChevronRight
} from "lucide-react";

export default function Footer() {
  const { settings, services, solutions, submitLead } = useCMS();
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsSuccess, setNewsSuccess] = useState(false);

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    submitLead({
      type: "Newsletter",
      name: "Website Visitor",
      email: newsletterEmail,
      message: "Subscribed via Website Footer",
    });
    setNewsSuccess(true);
    setTimeout(() => {
      setNewsSuccess(false);
      setNewsletterEmail("");
    }, 2500);
  };

  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800 text-xs">
      {/* Top Pre-Footer Bar */}
      <div className="border-b border-slate-800/80 py-8 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-3 gap-6 items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center flex-shrink-0">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[11px] text-slate-400 uppercase font-semibold">24×7 Technical Hotline</div>
              <a href={`tel:${settings.emergencyHotline}`} className="text-white font-bold text-sm hover:text-blue-400 transition">
                {settings.phone}
              </a>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center flex-shrink-0">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[11px] text-slate-400 uppercase font-semibold">Sales & Proposals</div>
              <a href={`mailto:${settings.salesEmail}`} className="text-white font-bold text-sm hover:text-blue-400 transition">
                {settings.salesEmail}
              </a>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-600/20 text-purple-400 flex items-center justify-center flex-shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[11px] text-slate-400 uppercase font-semibold">Headquarters</div>
              <div className="text-white font-medium text-xs truncate max-w-xs">{settings.cityStateZip}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Company Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center shadow-md">
                <span className="text-white font-black text-lg">V</span>
              </div>
              <div>
                <div className="font-bold text-base text-white tracking-wide">VRAT</div>
                <div className="text-[10px] tracking-widest uppercase text-blue-400 font-semibold">System Integrators</div>
              </div>
            </Link>
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              Leading provider of integrated electronic security, CCTV surveillance, fire alarms, access control, enterprise networking, and smart building automation solutions across India for over 17 years.
            </p>
            <div className="pt-2">
              <div className="text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-2">Subscribe to Newsletter</div>
              {newsSuccess ? (
                <div className="inline-flex items-center gap-1.5 text-emerald-400 text-xs font-semibold">
                  <CheckCircle2 className="w-4 h-4" /> Thank you for subscribing!
                </div>
              ) : (
                <form onSubmit={handleNewsletter} className="flex gap-2 max-w-sm">
                  <input
                    type="email"
                    required
                    placeholder="Enter corporate email..."
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="flex-1 px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                  <button
                    type="submit"
                    className="px-3.5 py-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl text-xs transition"
                  >
                    Join
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Core Services */}
          <div>
            <h3 className="font-bold text-white text-xs uppercase tracking-wider mb-4">Core Services</h3>
            <ul className="space-y-2">
              {services.slice(0, 6).map((s) => (
                <li key={s.id}>
                  <Link to={`/services/${s.slug}`} className="hover:text-blue-400 transition flex items-center gap-1">
                    <ChevronRight className="w-3 h-3 text-slate-600" />
                    <span>{s.title.split(" ")[0]} {s.title.split(" ")[1]}</span>
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/services" className="text-blue-400 font-semibold hover:underline mt-1 block">
                  View All Services →
                </Link>
              </li>
            </ul>
          </div>

          {/* Industry Solutions */}
          <div>
            <h3 className="font-bold text-white text-xs uppercase tracking-wider mb-4">Solutions</h3>
            <ul className="space-y-2">
              {solutions.slice(0, 6).map((sol) => (
                <li key={sol.id}>
                  <Link to={`/solutions/${sol.slug}`} className="hover:text-blue-400 transition flex items-center gap-1">
                    <ChevronRight className="w-3 h-3 text-slate-600" />
                    <span>{sol.title.split("&")[0].trim()}</span>
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/solutions" className="text-blue-400 font-semibold hover:underline mt-1 block">
                  All 8 Sectors →
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-white text-xs uppercase tracking-wider mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="hover:text-blue-400 transition">About Company</Link></li>
              <li><Link to="/products" className="hover:text-blue-400 transition">Product Catalog</Link></li>
              <li><Link to="/projects" className="hover:text-blue-400 transition">Projects & Case Studies</Link></li>
              <li><Link to="/gallery" className="hover:text-blue-400 transition">Project Gallery</Link></li>
              <li><Link to="/downloads" className="hover:text-blue-400 transition">Download Center</Link></li>
              <li><Link to="/blog" className="hover:text-blue-400 transition">Blog & Insights</Link></li>
              <li><Link to="/careers" className="hover:text-blue-400 transition">Careers & Jobs</Link></li>
              <li><Link to="/faq" className="hover:text-blue-400 transition">FAQ Knowledge Base</Link></li>
              <li><Link to="/support" className="hover:text-blue-400 transition">Customer Support / AMC</Link></li>
              <li><Link to="/contact" className="hover:text-blue-400 transition">Contact Us</Link></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Copyright & Admin Entrance */}
      <div className="border-t border-slate-800/60 py-6 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            © {new Date().getFullYear()} VRAT System Integrators. All rights reserved. Registered MSME & ISO 9001:2015 Enterprise.
          </div>
          <div className="flex items-center gap-4">
            <Link to="/faq" className="hover:text-slate-300">Privacy Policy</Link>
            <span>•</span>
            <Link to="/faq" className="hover:text-slate-300">Terms of Service</Link>
            <span>•</span>
            <Link to="/admin" className="flex items-center gap-1 text-slate-400 hover:text-blue-400 transition font-semibold">
              <Lock className="w-3 h-3 text-blue-500" /> Admin CMS Login
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
