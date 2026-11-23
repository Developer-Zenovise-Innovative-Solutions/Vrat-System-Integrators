import React, { useState } from "react";
import { useCMS } from "../context/CMSContext";
import { sendEmailNotification } from "../lib/emailService";
import { getWhatsAppUrl } from "../lib/whatsapp";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  Calendar,
  MessageSquare,
  AlertCircle,
  Building2,
  Users,
  Wrench,
  DollarSign,
  ExternalLink,
  ChevronRight,
  Shield,
  Loader2
} from "lucide-react";

export default function Contact() {
  const { settings, heroConfigs, submitLead } = useCMS();
  const hero = heroConfigs["contact"];

  // Form Mode Toggle (Requirement 2)
  const [activeFormTab, setActiveFormTab] = useState<"inquiry" | "survey">("inquiry");

  // Quick Inquiry Form State
  const [inquiryForm, setInquiryForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    city: "",
    inquiryType: "CCTV Surveillance",
    projectType: "Commercial Enterprise",
    estimatedSize: "Medium Enterprise",
    preferredMethod: "WhatsApp",
    message: "",
  });
  const [inquiryLoading, setInquiryLoading] = useState(false);
  const [inquirySuccess, setInquirySuccess] = useState(false);
  const [inquiryError, setInquiryError] = useState("");

  // Site Survey Booking Form State
  const [surveyForm, setSurveyForm] = useState({
    name: "",
    company: "",
    phone: "",
    email: "",
    siteAddress: "",
    preferredDate: "",
    preferredTime: "10:00 AM - 01:00 PM",
    requirement: "Complete Electronic Security & Cabling Audit",
  });
  const [surveyLoading, setSurveyLoading] = useState(false);
  const [surveySuccess, setSurveySuccess] = useState(false);
  const [surveyError, setSurveyError] = useState("");

  // ============================================================================
  // Handlers with SMTP Integration (delivers to nimeshpatel.vsi@gmail.com)
  // ============================================================================
  const handleInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryForm.name || !inquiryForm.email || !inquiryForm.phone) return;

    setInquiryLoading(true);
    setInquiryError("");

    try {
      // 1. Save to Supabase Leads database
      submitLead({
        type: "Contact Inquiry",
        name: inquiryForm.name,
        company: inquiryForm.company,
        email: inquiryForm.email,
        phone: inquiryForm.phone,
        city: inquiryForm.city,
        serviceOrProduct: inquiryForm.inquiryType,
        projectType: inquiryForm.projectType,
        estimatedSize: inquiryForm.estimatedSize,
        preferredContactMethod: inquiryForm.preferredMethod,
        message: inquiryForm.message || "General web inquiry",
      });

      // 2. Dispatch SMTP Email Notification to nimeshpatel.vsi@gmail.com
      await sendEmailNotification({
        formType: "Contact Inquiry & RFP",
        name: inquiryForm.name,
        email: inquiryForm.email,
        phone: inquiryForm.phone,
        company: inquiryForm.company,
        message: inquiryForm.message,
        subject: `[Website Inquiry] ${inquiryForm.inquiryType} - ${inquiryForm.name} (${inquiryForm.company || "Individual"})`,
        details: {
          "Inquiry Scope / System": inquiryForm.inquiryType,
          "Facility / Project Type": inquiryForm.projectType,
          "Scale / Estimated Size": inquiryForm.estimatedSize,
          "City / Location": inquiryForm.city || "Not specified",
          "Preferred Follow-up": inquiryForm.preferredMethod,
        },
      });

      setInquirySuccess(true);
      setTimeout(() => {
        setInquirySuccess(false);
        setInquiryForm({
          name: "",
          company: "",
          email: "",
          phone: "",
          city: "",
          inquiryType: "CCTV Surveillance",
          projectType: "Commercial Enterprise",
          estimatedSize: "Medium Enterprise",
          preferredMethod: "WhatsApp",
          message: "",
        });
      }, 4000);
    } catch (err: any) {
      setInquiryError(err?.message || "Failed to submit inquiry. Please try again or chat with us on WhatsApp.");
    } finally {
      setInquiryLoading(false);
    }
  };

  const handleSurveySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!surveyForm.name || !surveyForm.phone || !surveyForm.siteAddress) return;

    setSurveyLoading(true);
    setSurveyError("");

    try {
      // 1. Save to Supabase Leads database
      submitLead({
        type: "Site Survey Request",
        name: surveyForm.name,
        company: surveyForm.company,
        email: surveyForm.email || "not-provided@survey.com",
        phone: surveyForm.phone,
        city: surveyForm.siteAddress,
        serviceOrProduct: surveyForm.requirement,
        preferredDate: surveyForm.preferredDate,
        preferredTime: surveyForm.preferredTime,
        message: `Site Survey Requested at: ${surveyForm.siteAddress} on ${surveyForm.preferredDate} (${surveyForm.preferredTime})`,
      });

      // 2. Dispatch SMTP Email Notification to nimeshpatel.vsi@gmail.com
      await sendEmailNotification({
        formType: "Site Survey Assessment Request",
        name: surveyForm.name,
        email: surveyForm.email || "No email provided",
        phone: surveyForm.phone,
        company: surveyForm.company,
        message: `Site Survey requested at address: ${surveyForm.siteAddress}`,
        subject: `[Site Survey Request] ${surveyForm.name} - ${surveyForm.preferredDate}`,
        details: {
          "Site Address": surveyForm.siteAddress,
          "Preferred Date": surveyForm.preferredDate,
          "Preferred Time Slot": surveyForm.preferredTime,
          "Technical Audit Scope": surveyForm.requirement,
        },
      });

      setSurveySuccess(true);
      setTimeout(() => {
        setSurveySuccess(false);
        setSurveyForm({
          name: "",
          company: "",
          phone: "",
          email: "",
          siteAddress: "",
          preferredDate: "",
          preferredTime: "10:00 AM - 01:00 PM",
          requirement: "Complete Electronic Security & Cabling Audit",
        });
      }, 4000);
    } catch (err: any) {
      setSurveyError(err?.message || "Failed to book survey. Please try again or reach out on WhatsApp.");
    } finally {
      setSurveyLoading(false);
    }
  };

  // Active locations dynamically sourced from Admin Settings (Requirement 2 & 5)
  const activeLocations = (settings.locations && settings.locations.length > 0
    ? settings.locations
    : [
        {
          id: "loc-surat-hq",
          name: "Surat Head Office",
          type: "Head Office" as const,
          phone: "+91 95107 59646",
          whatsappNumber: "+91 95107 59646",
          address: "Ground Floor, Flat No. F-1 to F-4, Vighneshwar Estate, Near Gandhi Smruti Bhavan, Nanpura, Surat, Gujarat, India – 395001.",
          googleMapsUrl: "https://maps.google.com/?q=Vighneshwar+Estate+Nanpura+Surat+Gujarat+395001",
          email: "Nimesh.patel@vratsystem.co.in",
          active: true,
        },
        {
          id: "loc-ankleshwar-branch",
          name: "Ankleshwar Branch Office",
          type: "Branch Office" as const,
          phone: "+91 95107 59646",
          whatsappNumber: "+91 95107 59646",
          address: "F-29, Asian Trade Center, Beside Asian Paints, GIDC, Ankleshwar, Gujarat, India – 393002.",
          googleMapsUrl: "https://maps.google.com/?q=Asian+Trade+Center+GIDC+Ankleshwar+Gujarat+393002",
          email: "Service@vratsystem.co.in",
          active: true,
        },
      ]
  ).filter((loc) => loc.active !== false);

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Hero Banner */}
      {hero?.showSection && (
        <section className="relative py-20 bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 text-white overflow-hidden">
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:24px_24px]"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold tracking-wide uppercase mb-6">
                <Building2 className="w-3.5 h-3.5" />
                Connect With VRAT SYSTEM
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6 leading-tight">
                {hero.heading}
              </h1>
              <p className="text-lg text-slate-300 mb-8 leading-relaxed">
                {hero.subtitle}
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="#contact-forms-section"
                  onClick={() => setActiveFormTab("inquiry")}
                  className="px-6 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition shadow-lg shadow-blue-600/30"
                >
                  Send Inquiry Form
                </a>
                <a
                  href="#contact-forms-section"
                  onClick={() => setActiveFormTab("survey")}
                  className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white font-medium rounded-xl transition backdrop-blur-sm border border-white/10"
                >
                  Book Free Site Survey
                </a>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Department Quick Contact Strip */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Direct Routing</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">Connect With the Right Team</h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Business & Sales Enquiry */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
              <DollarSign className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-base mb-1">Business & Sales</h3>
            <p className="text-slate-500 text-xs mb-3">Quotations, product pricing & enterprise tenders.</p>
            <div className="space-y-1">
              <a href="mailto:Sales@vratsystem.co.in" className="text-blue-600 font-semibold text-xs hover:underline block truncate">
                Sales@vratsystem.co.in
              </a>
              <a href="mailto:Nimesh.patel@vratsystem.co.in" className="text-slate-600 font-medium text-xs hover:text-blue-600 hover:underline block truncate">
                Nimesh.patel@vratsystem.co.in
              </a>
              <a href="mailto:Nimeshpatel.VSI@gmail.com" className="text-slate-500 font-medium text-[11px] hover:text-blue-600 hover:underline block truncate">
                Nimeshpatel.VSI@gmail.com
              </a>
            </div>
          </div>

          {/* Customer Care & Support */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
              <Wrench className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-base mb-1">Customer Care</h3>
            <p className="text-slate-500 text-xs mb-3">Service requests, breakdown support & AMC tickets.</p>
            <div className="space-y-1">
              <a href="mailto:Service@vratsystem.co.in" className="text-emerald-600 font-semibold text-xs hover:underline block truncate">
                Service@vratsystem.co.in
              </a>
              <a
                href={getWhatsAppUrl("+91 95107 59646", "Hello VRAT Customer Care, I need support with:")}
                target="_blank"
                rel="noreferrer"
                className="text-slate-800 font-bold text-xs hover:text-emerald-600 flex items-center gap-1.5"
              >
                <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                +91 95107 59646
              </a>
            </div>
          </div>

          {/* Customer Care Hotline */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-4">
              <Building2 className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-base mb-1">Customer Care Hotline</h3>
            <p className="text-slate-500 text-xs mb-3">Immediate hotline for customer queries & support.</p>
            <a
              href={getWhatsAppUrl("+91 95107 59646", "Hello VRAT Support Hotline, I have an inquiry:")}
              target="_blank"
              rel="noreferrer"
              className="text-purple-600 font-bold text-sm hover:underline flex items-center gap-1.5"
            >
              <MessageSquare className="w-4 h-4 text-emerald-600" />
              +91 95107 59646
            </a>
            <div className="text-[11px] text-slate-400 mt-1">24×7 WhatsApp & Voice Hotline</div>
          </div>

          {/* General Inquiries */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-4">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-base mb-1">General Contact</h3>
            <p className="text-slate-500 text-xs mb-3">Management, partnerships, and executive contact.</p>
            <div className="space-y-1">
              <a href="mailto:Nimesh.patel@vratsystem.co.in" className="text-amber-600 font-semibold text-xs hover:underline block truncate">
                Nimesh.patel@vratsystem.co.in
              </a>
              <a href="mailto:Nimeshpatel.VSI@gmail.com" className="text-slate-600 font-medium text-xs hover:text-amber-600 hover:underline block truncate">
                Nimeshpatel.VSI@gmail.com
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Main Forms Section with Seamless Toggle Switch (Requirement 2) */}
      <section id="contact-forms-section" className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-xl space-y-6">
          {/* Form Switcher Toggle */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
            <div>
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Online Enquiries & Bookings</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
                {activeFormTab === "inquiry" ? "Send Us Your Requirement" : "Book a Free Site Survey"}
              </h2>
              <p className="text-slate-500 text-xs mt-1">
                All submissions are directly routed and delivered to our management desk via SMTP.
              </p>
            </div>

            {/* Toggle Switch */}
            <div className="inline-flex p-1.5 bg-slate-100 rounded-2xl border border-slate-200 self-start sm:self-auto">
              <button
                type="button"
                onClick={() => setActiveFormTab("inquiry")}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
                  activeFormTab === "inquiry"
                    ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <Send className="w-3.5 h-3.5" />
                General Enquiry / RFP
              </button>

              <button
                type="button"
                onClick={() => setActiveFormTab("survey")}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
                  activeFormTab === "survey"
                    ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <Calendar className="w-3.5 h-3.5" />
                Book Free Site Survey
              </button>
            </div>
          </div>

          {/* Form 1: General Enquiry */}
          {activeFormTab === "inquiry" && (
            <div>
              {inquirySuccess ? (
                <div className="py-12 text-center bg-emerald-50/50 rounded-2xl border border-emerald-200">
                  <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-1">Inquiry Sent Successfully!</h3>
                  <p className="text-slate-600 text-xs">
                    Your requirement has been delivered via email to our team. Our consultant will contact you within 2 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleInquirySubmit} className="space-y-4">
                  {inquiryError && (
                    <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 flex-shrink-0" />
                      <span>{inquiryError}</span>
                    </div>
                  )}

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name *</label>
                      <input
                        type="text"
                        required
                        value={inquiryForm.name}
                        onChange={(e) => setInquiryForm({ ...inquiryForm, name: e.target.value })}
                        className="w-full px-3 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="e.g. Rahul Sharma"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Company / Organization</label>
                      <input
                        type="text"
                        value={inquiryForm.company}
                        onChange={(e) => setInquiryForm({ ...inquiryForm, company: e.target.value })}
                        className="w-full px-3 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="e.g. Apex Industries Pvt Ltd"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address *</label>
                      <input
                        type="email"
                        required
                        value={inquiryForm.email}
                        onChange={(e) => setInquiryForm({ ...inquiryForm, email: e.target.value })}
                        className="w-full px-3 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="you@domain.com"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Phone / WhatsApp Number *</label>
                      <input
                        type="tel"
                        required
                        value={inquiryForm.phone}
                        onChange={(e) => setInquiryForm({ ...inquiryForm, phone: e.target.value })}
                        className="w-full px-3 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="+91 98250 12345"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">City / Location</label>
                      <input
                        type="text"
                        value={inquiryForm.city}
                        onChange={(e) => setInquiryForm({ ...inquiryForm, city: e.target.value })}
                        className="w-full px-3 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="e.g. Surat, Ankleshwar"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Solution of Interest</label>
                      <select
                        value={inquiryForm.inquiryType}
                        onChange={(e) => setInquiryForm({ ...inquiryForm, inquiryType: e.target.value })}
                        className="w-full px-3 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-900"
                      >
                        <option>CCTV Surveillance Systems</option>
                        <option>Fire Alarm Systems</option>
                        <option>Access Control & Biometrics</option>
                        <option>Time Attendance Systems</option>
                        <option>Public Address & Voice Evac</option>
                        <option>Video Door Phone Systems</option>
                        <option>Boom Barriers & Parking</option>
                        <option>Networking & Structured Cabling</option>
                        <option>Home & Building Automation</option>
                        <option>Annual Maintenance Contract (AMC)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Facility Type</label>
                      <select
                        value={inquiryForm.projectType}
                        onChange={(e) => setInquiryForm({ ...inquiryForm, projectType: e.target.value })}
                        className="w-full px-3 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-900"
                      >
                        <option>Commercial Tower / Office</option>
                        <option>Industrial Plant / Factory</option>
                        <option>Warehouse & Logistics</option>
                        <option>Residential Society / High-Rise</option>
                        <option>Hospital & Healthcare</option>
                        <option>School / University Campus</option>
                        <option>Hotel & Hospitality</option>
                        <option>Private Villa / Luxury Home</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Preferred Contact Mode</label>
                      <select
                        value={inquiryForm.preferredMethod}
                        onChange={(e) => setInquiryForm({ ...inquiryForm, preferredMethod: e.target.value })}
                        className="w-full px-3 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-900"
                      >
                        <option>WhatsApp Message</option>
                        <option>Direct Phone Call</option>
                        <option>Email Quotation</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Project Details / Requirements</label>
                    <textarea
                      rows={3}
                      value={inquiryForm.message}
                      onChange={(e) => setInquiryForm({ ...inquiryForm, message: e.target.value })}
                      className="w-full px-3 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-900 leading-relaxed"
                      placeholder="Please specify camera counts, square footage, existing issues, or project timeline..."
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={inquiryLoading}
                      className="w-full sm:w-auto px-8 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-xs transition shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2"
                    >
                      {inquiryLoading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Sending Inquiry via SMTP...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          Submit Project Inquiry
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

          {/* Form 2: Free Site Survey Booking */}
          {activeFormTab === "survey" && (
            <div className="bg-gradient-to-br from-slate-900 to-blue-950 text-white p-6 sm:p-8 rounded-2xl">
              <div className="flex items-center gap-2 text-blue-400 font-bold text-xs uppercase tracking-wider mb-2">
                <Calendar className="w-4 h-4" /> Certified Technical Site Survey
              </div>
              <h3 className="text-xl font-bold mb-1">Schedule a Physical Premises Inspection</h3>
              <p className="text-slate-300 text-xs mb-6">
                Our certified security engineers will visit your site, inspect cabling pathways, verify camera coverage angles, and provide an optimized blueprint.
              </p>

              {surveySuccess ? (
                <div className="bg-white/10 p-6 rounded-2xl text-center border border-emerald-400/30">
                  <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
                  <h4 className="font-bold text-sm">Site Visit Scheduled Successfully!</h4>
                  <p className="text-slate-300 text-xs mt-1">
                    Your request has been delivered to our engineering dispatch team. We will call you to confirm the time slot.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSurveySubmit} className="space-y-4">
                  {surveyError && (
                    <div className="p-3 bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs rounded-xl flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 flex-shrink-0" />
                      <span>{surveyError}</span>
                    </div>
                  )}

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-medium text-slate-300 mb-1">Contact Name *</label>
                      <input
                        type="text"
                        required
                        value={surveyForm.name}
                        onChange={(e) => setSurveyForm({ ...surveyForm, name: e.target.value })}
                        className="w-full px-3 py-2.5 text-xs bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-400"
                        placeholder="Your Full Name"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-medium text-slate-300 mb-1">Company / Society Name</label>
                      <input
                        type="text"
                        value={surveyForm.company}
                        onChange={(e) => setSurveyForm({ ...surveyForm, company: e.target.value })}
                        className="w-full px-3 py-2.5 text-xs bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-400"
                        placeholder="Building / Business Name"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-[11px] font-medium text-slate-300 mb-1">Phone Number (WhatsApp) *</label>
                      <input
                        type="tel"
                        required
                        value={surveyForm.phone}
                        onChange={(e) => setSurveyForm({ ...surveyForm, phone: e.target.value })}
                        className="w-full px-3 py-2.5 text-xs bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-400"
                        placeholder="+91 98250 12345"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-medium text-slate-300 mb-1">Preferred Date *</label>
                      <input
                        type="date"
                        required
                        value={surveyForm.preferredDate}
                        onChange={(e) => setSurveyForm({ ...surveyForm, preferredDate: e.target.value })}
                        className="w-full px-3 py-2.5 text-xs bg-white/10 border border-white/20 rounded-xl text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-medium text-slate-300 mb-1">Preferred Time Window</label>
                      <select
                        value={surveyForm.preferredTime}
                        onChange={(e) => setSurveyForm({ ...surveyForm, preferredTime: e.target.value })}
                        className="w-full px-3 py-2.5 text-xs bg-slate-900 border border-white/20 rounded-xl text-white"
                      >
                        <option>10:00 AM – 01:00 PM (Morning)</option>
                        <option>02:00 PM – 05:00 PM (Afternoon)</option>
                        <option>05:00 PM – 07:00 PM (Evening)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-slate-300 mb-1">Complete Site Address *</label>
                    <textarea
                      rows={2}
                      required
                      value={surveyForm.siteAddress}
                      onChange={(e) => setSurveyForm({ ...surveyForm, siteAddress: e.target.value })}
                      className="w-full px-3 py-2.5 text-xs bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-400"
                      placeholder="Plot No, Complex, Landmark, City & Pincode..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={surveyLoading}
                    className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-xs transition shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2"
                  >
                    {surveyLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Booking Site Survey...
                      </>
                    ) : (
                      <>
                        <Calendar className="w-4 h-4" />
                        Confirm Free Site Survey Request
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          )}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* DYNAMIC LOCATION CARDS SECTION (Requirement 2 & 5) */}
      {/* ========================================================================= */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Physical Presence</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">Our Business Offices & Locations</h2>
          <p className="text-slate-500 text-xs mt-2">
            Visit our state-of-the-art offices or reach out directly to the local engineering branch in your district.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeLocations.map((loc) => {
            const isHeadOffice = loc.type === "Head Office";
            const isRegisteredOffice = loc.type === "Registered Office";

            return (
              <div
                key={loc.id}
                className={`bg-white rounded-3xl p-7 border transition-all duration-300 shadow-sm hover:shadow-xl flex flex-col justify-between ${
                  isHeadOffice
                    ? "border-blue-500 ring-2 ring-blue-500/20 bg-gradient-to-b from-blue-50/40 to-white"
                    : isRegisteredOffice
                    ? "border-emerald-500 ring-2 ring-emerald-500/20 bg-gradient-to-b from-emerald-50/40 to-white"
                    : "border-slate-200 hover:border-blue-300"
                }`}
              >
                <div>
                  {/* Classification Badge */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        isHeadOffice
                          ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                          : isRegisteredOffice
                          ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/30"
                          : "bg-purple-100 text-purple-700 border border-purple-200"
                      }`}
                    >
                      {loc.type}
                    </span>
                    <span className="text-[11px] font-semibold text-emerald-600 flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                      Open for Consultation
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 mb-2">{loc.name}</h3>

                  {/* Address */}
                  <div className="flex items-start gap-2.5 text-xs text-slate-600 mb-4 leading-relaxed">
                    <MapPin className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>{loc.address}</span>
                  </div>

                  {/* Phone with WhatsApp Direct Click */}
                  <div className="space-y-2 text-xs mb-6">
                    <div className="flex items-center gap-2.5">
                      <Phone className="w-4 h-4 text-slate-500 flex-shrink-0" />
                      <a
                        href={`tel:${loc.phone}`}
                        className="font-bold text-slate-800 hover:text-blue-600 transition"
                      >
                        {loc.phone}
                      </a>
                    </div>

                    {loc.email && (
                      <div className="flex items-center gap-2.5 text-slate-600">
                        <Mail className="w-4 h-4 text-slate-500 flex-shrink-0" />
                        <a href={`mailto:${loc.email}`} className="hover:text-blue-600 hover:underline">
                          {loc.email}
                        </a>
                      </div>
                    )}
                  </div>
                </div>

                {/* Actions: WhatsApp & Google Maps */}
                <div className="pt-4 border-t border-slate-100 space-y-2">
                  <a
                    href={getWhatsAppUrl(loc.whatsappNumber || loc.phone, `Hello VRAT SYSTEM ${loc.name}, I would like to enquire about security solutions.`)}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs transition flex items-center justify-center gap-2 shadow-sm"
                  >
                    <MessageSquare className="w-4 h-4" />
                    Chat on WhatsApp
                  </a>

                  <a
                    href={loc.googleMapsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-xs transition flex items-center justify-center gap-1.5"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    Open in Google Maps
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
