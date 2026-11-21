import React, { useState } from "react";
import { useCMS } from "../context/CMSContext";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  Calendar,
  MessageSquare,
  AlertTriangle,
  UploadCloud,
  FileCheck,
  Building2,
  Users,
  Wrench,
  DollarSign
} from "lucide-react";

export default function Contact() {
  const { settings, heroConfigs, submitLead } = useCMS();
  const hero = heroConfigs["contact"];

  // Quick Inquiry Form
  const [inquiryForm, setInquiryForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    city: "",
    inquiryType: "CCTV Solution",
    projectType: "Commercial",
    estimatedSize: "Medium Business",
    preferredMethod: "Phone",
    message: "",
    attachmentName: "",
  });
  const [inquirySuccess, setInquirySuccess] = useState(false);

  // Site Survey Booking Form
  const [surveyForm, setSurveyForm] = useState({
    name: "",
    company: "",
    phone: "",
    email: "",
    siteAddress: "",
    preferredDate: "",
    preferredTime: "10:00 AM - 01:00 PM",
    requirement: "Full Security & Cabling Audit",
  });
  const [surveySuccess, setSurveySuccess] = useState(false);

  // Meeting Booking Form
  const [meetingForm, setMeetingForm] = useState({
    name: "",
    company: "",
    date: "",
    time: "11:00 AM",
    meetingType: "Google Meet",
    topic: "System Architecture Consultation",
  });
  const [meetingSuccess, setMeetingSuccess] = useState(false);

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryForm.name || !inquiryForm.email || !inquiryForm.phone) return;

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
      attachmentName: inquiryForm.attachmentName,
      message: inquiryForm.message || "General web inquiry",
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
        inquiryType: "CCTV Solution",
        projectType: "Commercial",
        estimatedSize: "Medium Business",
        preferredMethod: "Phone",
        message: "",
        attachmentName: "",
      });
    }, 3000);
  };

  const handleSurveySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!surveyForm.name || !surveyForm.phone || !surveyForm.siteAddress) return;

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
      message: `Site Survey Requested at: ${surveyForm.siteAddress}`,
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
        requirement: "Full Security & Cabling Audit",
      });
    }, 3000);
  };

  const handleMeetingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!meetingForm.name || !meetingForm.date) return;

    submitLead({
      type: "Contact Inquiry",
      name: meetingForm.name,
      company: meetingForm.company,
      email: "meeting-booking@vratsystem.com",
      message: `Scheduled Consultation: ${meetingForm.meetingType} on ${meetingForm.date} at ${meetingForm.time} regarding ${meetingForm.topic}`,
    });

    setMeetingSuccess(true);
    setTimeout(() => {
      setMeetingSuccess(false);
      setMeetingForm({
        name: "",
        company: "",
        date: "",
        time: "11:00 AM",
        meetingType: "Google Meet",
        topic: "System Architecture Consultation",
      });
    }, 3000);
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
                <Building2 className="w-3.5 h-3.5" />
                Connect With VRAT System Integrators
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6 leading-tight">
                {hero.heading}
              </h1>
              <p className="text-lg text-slate-300 mb-8 leading-relaxed">
                {hero.subtitle}
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="#inquiry-form"
                  className="px-6 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition shadow-lg shadow-blue-600/30"
                >
                  Send Inquiry Form
                </a>
                <a
                  href="#survey-form"
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
          {/* Sales */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
              <DollarSign className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-base mb-1">Sales Department</h3>
            <p className="text-slate-500 text-xs mb-3">Quotations, product pricing & enterprise tenders.</p>
            <a href={`mailto:${settings.salesEmail}`} className="text-blue-600 font-semibold text-xs hover:underline block">
              {settings.salesEmail}
            </a>
          </div>

          {/* Support */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
              <Wrench className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-base mb-1">Technical Support & AMC</h3>
            <p className="text-slate-500 text-xs mb-3">Warranty assistance, breakdown service & AMC.</p>
            <a href={`mailto:${settings.supportEmail}`} className="text-emerald-600 font-semibold text-xs hover:underline block">
              {settings.supportEmail}
            </a>
          </div>

          {/* Projects */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-4">
              <Building2 className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-base mb-1">Projects & Site Survey</h3>
            <p className="text-slate-500 text-xs mb-3">On-site technical surveys, BOQs & installation.</p>
            <a href={`tel:${settings.phone}`} className="text-purple-600 font-semibold text-xs hover:underline block">
              {settings.phone}
            </a>
          </div>

          {/* HR */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-4">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-base mb-1">Human Resources</h3>
            <p className="text-slate-500 text-xs mb-3">Careers, internships, and vendor registration.</p>
            <a href={`mailto:${settings.careersEmail}`} className="text-amber-600 font-semibold text-xs hover:underline block">
              {settings.careersEmail}
            </a>
          </div>
        </div>
      </section>

      {/* Main Forms Section */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-10">
          {/* Quick Contact Form */}
          <div id="inquiry-form" className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-xl">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Direct Inquiry</span>
            <h2 className="text-2xl font-bold text-slate-900 mt-1 mb-2">Send Us Your Requirement</h2>
            <p className="text-slate-500 text-xs mb-6">Fill out the project details below and our technical team will contact you within 2 hours.</p>

            {inquirySuccess ? (
              <div className="py-12 text-center">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-1">Inquiry Sent Successfully!</h3>
                <p className="text-slate-600 text-xs">Our engineering consultant has received your details and will get in touch shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleInquirySubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={inquiryForm.name}
                      onChange={(e) => setInquiryForm({ ...inquiryForm, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Rahul Sharma"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Company / Organization</label>
                    <input
                      type="text"
                      value={inquiryForm.company}
                      onChange={(e) => setInquiryForm({ ...inquiryForm, company: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Company Name"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={inquiryForm.email}
                      onChange={(e) => setInquiryForm({ ...inquiryForm, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="rahul@company.com"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Mobile Number *</label>
                    <input
                      type="tel"
                      required
                      value={inquiryForm.phone}
                      onChange={(e) => setInquiryForm({ ...inquiryForm, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="+91 98250 12345"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Inquiry Type</label>
                    <select
                      value={inquiryForm.inquiryType}
                      onChange={(e) => setInquiryForm({ ...inquiryForm, inquiryType: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="CCTV Solution">CCTV Surveillance</option>
                      <option value="Fire Alarm System">Fire Alarm System</option>
                      <option value="Access Control">Access Control</option>
                      <option value="Attendance System">Time Attendance</option>
                      <option value="Networking">Networking Solutions</option>
                      <option value="Home Automation">Home Automation</option>
                      <option value="Boom Barrier">Boom Barrier & Parking</option>
                      <option value="Smart City">Smart City Project</option>
                      <option value="AMC Support">AMC & Maintenance</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Project Sector</label>
                    <select
                      value={inquiryForm.projectType}
                      onChange={(e) => setInquiryForm({ ...inquiryForm, projectType: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="Commercial">Commercial Office</option>
                      <option value="Industrial">Manufacturing / Factory</option>
                      <option value="Residential">Residential Villa/Society</option>
                      <option value="Education">School / University</option>
                      <option value="Healthcare">Hospital / Clinic</option>
                      <option value="Retail">Retail Chain / Mall</option>
                      <option value="Warehouse">Warehouse / Logistics</option>
                      <option value="Government">Government Project</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Estimated Scale</label>
                    <select
                      value={inquiryForm.estimatedSize}
                      onChange={(e) => setInquiryForm({ ...inquiryForm, estimatedSize: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="Small Office">Small Office (&lt;10 Cams)</option>
                      <option value="Medium Business">Medium Business</option>
                      <option value="Enterprise">Enterprise Multi-Floor</option>
                      <option value="Multi-Location">Multi-Location Nationwide</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">City / Location *</label>
                  <input
                    type="text"
                    required
                    value={inquiryForm.city}
                    onChange={(e) => setInquiryForm({ ...inquiryForm, city: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g. Ahmedabad, Gujarat"
                  />
                </div>

                {/* Simulated BOQ Upload */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Attach BOQ / Layout Drawings (Optional)</label>
                  <div className="border border-dashed border-slate-200 rounded-xl p-3 text-center bg-slate-50">
                    <p className="text-xs text-slate-500">
                      {inquiryForm.attachmentName ? (
                        <span className="text-blue-600 font-semibold flex items-center justify-center gap-1">
                          <FileCheck className="w-4 h-4 text-emerald-500" /> {inquiryForm.attachmentName}
                        </span>
                      ) : (
                        "Upload BOQ, Floor Plans, or Tender specs (.pdf, .dwg, .doc)"
                      )}
                    </p>
                    <input
                      type="file"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          setInquiryForm({ ...inquiryForm, attachmentName: e.target.files[0].name });
                        }
                      }}
                      className="opacity-0 absolute inset-0 cursor-pointer"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Project Description & Requirements</label>
                  <textarea
                    rows={3}
                    value={inquiryForm.message}
                    onChange={(e) => setInquiryForm({ ...inquiryForm, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Describe your security requirements, timeline, or number of cameras..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs transition shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" /> Submit Inquiry
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Site Survey Booking & Office Info */}
          <div className="lg:col-span-5 space-y-8">
            {/* Site Survey Booking */}
            <div id="survey-form" className="bg-gradient-to-br from-slate-900 to-blue-950 text-white p-8 rounded-3xl shadow-xl">
              <div className="flex items-center gap-2 text-blue-400 font-bold text-xs uppercase tracking-wider mb-2">
                <Calendar className="w-4 h-4" /> Free Technical Assessment
              </div>
              <h3 className="text-xl font-bold mb-2">Book a Site Survey</h3>
              <p className="text-slate-300 text-xs mb-6">
                Our certified security engineers will visit your premises, assess cabling routes, and provide an optimized design.
              </p>

              {surveySuccess ? (
                <div className="bg-white/10 p-6 rounded-2xl text-center border border-emerald-400/30">
                  <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
                  <h4 className="font-bold text-sm">Site Visit Scheduled!</h4>
                  <p className="text-slate-300 text-xs mt-1">Our engineering team will call you to confirm the time slot.</p>
                </div>
              ) : (
                <form onSubmit={handleSurveySubmit} className="space-y-3">
                  <div>
                    <label className="block text-[11px] font-medium text-slate-300 mb-1">Your Name *</label>
                    <input
                      type="text"
                      required
                      value={surveyForm.name}
                      onChange={(e) => setSurveyForm({ ...surveyForm, name: e.target.value })}
                      className="w-full px-3 py-2 text-xs bg-white/10 border border-white/20 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
                      placeholder="Contact Name"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[11px] font-medium text-slate-300 mb-1">Phone Number *</label>
                      <input
                        type="tel"
                        required
                        value={surveyForm.phone}
                        onChange={(e) => setSurveyForm({ ...surveyForm, phone: e.target.value })}
                        className="w-full px-3 py-2 text-xs bg-white/10 border border-white/20 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="+91 98250..."
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-medium text-slate-300 mb-1">Preferred Date *</label>
                      <input
                        type="date"
                        required
                        value={surveyForm.preferredDate}
                        onChange={(e) => setSurveyForm({ ...surveyForm, preferredDate: e.target.value })}
                        className="w-full px-3 py-2 text-xs bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-slate-300 mb-1">Site Address *</label>
                    <input
                      type="text"
                      required
                      value={surveyForm.siteAddress}
                      onChange={(e) => setSurveyForm({ ...surveyForm, siteAddress: e.target.value })}
                      className="w-full px-3 py-2 text-xs bg-white/10 border border-white/20 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
                      placeholder="Facility / Office Address"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-xs transition shadow-md"
                  >
                    Confirm Site Survey Request
                  </button>
                </form>
              )}
            </div>

            {/* Corporate Address & WhatsApp Box */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 space-y-4 shadow-sm">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Corporate Headquarters</h4>
                  <p className="text-slate-600 text-xs mt-0.5">{settings.address}</p>
                  <p className="text-slate-600 text-xs">{settings.cityStateZip}</p>
                  <div className="text-slate-400 text-[11px] mt-1 flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {settings.businessHours}
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <a
                  href={`https://wa.me/${settings.whatsappNumber.replace(/[^0-9]/g, "")}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl text-xs transition flex items-center gap-1.5 shadow-sm"
                >
                  <MessageSquare className="w-3.5 h-3.5" /> Chat on WhatsApp
                </a>
                <a
                  href={settings.googleMapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-xs transition"
                >
                  Get Directions →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
