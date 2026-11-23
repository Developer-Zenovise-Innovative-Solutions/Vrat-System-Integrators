import React, { useState } from "react";
import { Link } from "react-router-dom";
import logoIcon from "../assets/logo/logo-icon.png";
import { useCMS } from "../context/CMSContext";
import { getWhatsAppUrl } from "../lib/whatsapp";
import { sendEmailNotification } from "../lib/emailService";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Shield,
  ArrowRight,
  CheckCircle2,
  Lock,
  ChevronRight,
  AlertCircle
} from "lucide-react";

// Crisp SVG Icons for Social Media Platforms
function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95C18.05 21.45 22 17.19 22 12z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.13-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

function YouTubeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

function XTwitterIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

export default function Footer() {
  const { settings, services, solutions, submitLead, leads } = useCMS();
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsSuccess, setNewsSuccess] = useState(false);
  const [newsError, setNewsError] = useState("");
  const [newsSubmitting, setNewsSubmitting] = useState(false);

  const handleNewsletter = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;

    const emailTrimmed = newsletterEmail.trim().toLowerCase();

    // Prevent duplicate email subscriptions
    const isDuplicate = leads.some(
      (l) => l.type === "Newsletter" && l.email?.trim().toLowerCase() === emailTrimmed
    );

    if (isDuplicate) {
      setNewsError("This email address is already subscribed to our newsletter!");
      setTimeout(() => setNewsError(""), 3500);
      return;
    }

    setNewsSubmitting(true);
    setNewsError("");

    try {
      // 1. Save in database
      submitLead({
        type: "Newsletter",
        name: "Website Visitor",
        email: emailTrimmed,
        message: "Subscribed via Website Footer",
      });

      // 2. Dispatch via SMTP to nimeshpatel.vsi@gmail.com
      await sendEmailNotification({
        formType: "Newsletter Subscription",
        name: "Website Visitor",
        email: emailTrimmed,
        subject: `[New Newsletter Subscription] ${emailTrimmed}`,
        message: `A new corporate subscriber signed up for VRAT updates.`,
        details: {
          "Source Location": "Website Footer",
          "Subscriber Email": emailTrimmed,
          "Subscription Time": new Date().toLocaleString(),
        },
      });

      setNewsSuccess(true);
      setNewsletterEmail("");
      setTimeout(() => {
        setNewsSuccess(false);
      }, 3500);
    } catch (err: any) {
      setNewsError(err.message || "Subscription failed. Please try again.");
    } finally {
      setNewsSubmitting(false);
    }
  };

  const socialLinks = settings.socialLinks || {
    linkedin: "",
    facebook: "",
    instagram: "",
    youtube: "",
    twitter: "",
  };

  const hasAnySocial =
    Boolean(socialLinks.linkedin) ||
    Boolean(socialLinks.facebook) ||
    Boolean(socialLinks.instagram) ||
    Boolean(socialLinks.youtube) ||
    Boolean(socialLinks.twitter);

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
              <div className="text-[11px] text-slate-400 uppercase font-semibold">Customer Care & Support (Click for WhatsApp)</div>
              <a
                href={getWhatsAppUrl(settings.phone, "Hello VRAT System, I would like to inquire about customer care & support.")}
                target="_blank"
                rel="noreferrer"
                className="text-white font-bold text-sm hover:text-blue-400 transition flex items-center gap-1.5"
              >
                {settings.phone}
              </a>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center flex-shrink-0">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[11px] text-slate-400 uppercase font-semibold">Business Enquiry & Sales</div>
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
              <div className="text-[11px] text-slate-400 uppercase font-semibold">Head Office (Surat)</div>
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
            <Link to="/" className="flex items-center gap-3 group">
              <img
                src={logoIcon}
                alt="VRAT System Integrators Logo"
                className="w-10 h-10 object-contain drop-shadow group-hover:scale-105 transition-transform"
              />
              <div>
                <div className="font-bold text-base text-white tracking-wide">VRAT</div>
                <div className="text-[10px] tracking-widest uppercase text-blue-400 font-semibold">System Integrators</div>
              </div>
            </Link>
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              Leading provider of integrated electronic security, CCTV surveillance, fire alarms, access control, enterprise networking, and smart building automation solutions across India for over 17 years.
            </p>
            <div className="text-[11px] text-slate-400 space-y-1 pt-2 border-t border-slate-800/60 max-w-sm">
              <div><span className="text-slate-200 font-semibold">Head Office:</span> Nanpura, Surat, Gujarat – 395001</div>
              <div><span className="text-slate-200 font-semibold">Branch Office:</span> GIDC, Ankleshwar, Gujarat – 393002</div>
              <div>
                <span className="text-slate-200 font-semibold">Customer Care:</span>{" "}
                <a
                  href={getWhatsAppUrl("+91 95107 59646", "Hello VRAT Customer Care, I need support.")}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-blue-400 text-white font-semibold"
                >
                  +91 95107 59646
                </a>{" "}
                |{" "}
                <a href="mailto:Service@vratsystem.co.in" className="hover:underline text-blue-400">
                  Service@vratsystem.co.in
                </a>
              </div>
            </div>

            {/* Social Media Links (Centrally managed from Admin Panel - Requirement 9) */}
            {hasAnySocial && (
              <div className="pt-2">
                <div className="text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-2.5">
                  Follow VRAT System
                </div>
                <div className="flex items-center gap-2.5">
                  {socialLinks.linkedin && (
                    <a
                      href={socialLinks.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 hover:border-blue-500/50 hover:bg-blue-600/20 text-slate-400 hover:text-blue-400 transition-all flex items-center justify-center"
                      title="LinkedIn"
                    >
                      <LinkedInIcon className="w-4 h-4" />
                    </a>
                  )}
                  {socialLinks.facebook && (
                    <a
                      href={socialLinks.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 hover:border-blue-600/50 hover:bg-blue-600/20 text-slate-400 hover:text-blue-500 transition-all flex items-center justify-center"
                      title="Facebook"
                    >
                      <FacebookIcon className="w-4 h-4" />
                    </a>
                  )}
                  {socialLinks.instagram && (
                    <a
                      href={socialLinks.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 hover:border-pink-500/50 hover:bg-pink-600/20 text-slate-400 hover:text-pink-400 transition-all flex items-center justify-center"
                      title="Instagram"
                    >
                      <InstagramIcon className="w-4 h-4" />
                    </a>
                  )}
                  {socialLinks.youtube && (
                    <a
                      href={socialLinks.youtube}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 hover:border-rose-500/50 hover:bg-rose-600/20 text-slate-400 hover:text-rose-400 transition-all flex items-center justify-center"
                      title="YouTube"
                    >
                      <YouTubeIcon className="w-4 h-4" />
                    </a>
                  )}
                  {socialLinks.twitter && (
                    <a
                      href={socialLinks.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 hover:border-white/50 hover:bg-white/10 text-slate-400 hover:text-white transition-all flex items-center justify-center"
                      title="X (Twitter)"
                    >
                      <XTwitterIcon className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            )}

            {/* Newsletter Subscription (Requirement 11) */}
            <div className="pt-2">
              <div className="text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-2">Subscribe to Newsletter</div>
              {newsSuccess ? (
                <div className="inline-flex items-center gap-1.5 text-emerald-400 text-xs font-semibold">
                  <CheckCircle2 className="w-4 h-4" /> Thank you for subscribing!
                </div>
              ) : (
                <form onSubmit={handleNewsletter} className="flex flex-col gap-2 max-w-sm">
                  <div className="flex gap-2">
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
                      disabled={newsSubmitting}
                      className="px-3.5 py-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-60 text-white font-semibold rounded-xl text-xs transition"
                    >
                      {newsSubmitting ? "..." : "Join"}
                    </button>
                  </div>
                  {newsError && (
                    <div className="inline-flex items-center gap-1.5 text-rose-400 text-[11px]">
                      <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                      <span>{newsError}</span>
                    </div>
                  )}
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
            © {new Date().getFullYear()} VRAT SYSTEM. All rights reserved. | Official Website: <a href="https://vratsystems.com/" className="text-slate-400 hover:text-blue-400 font-medium">vratsystems.com</a>
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
