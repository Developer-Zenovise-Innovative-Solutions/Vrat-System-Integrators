import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCMS } from "../context/CMSContext";
import {
  Headphones,
  ShieldCheck,
  Wrench,
  Activity,
  PhoneCall,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Send,
  MessageCircle,
  FileCheck,
  ArrowRight
} from "lucide-react";

export default function Support() {
  const { heroConfigs, settings, submitLead } = useCMS();
  const hero = heroConfigs["support"];

  const [ticketForm, setTicketForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    serviceOrSystem: "CCTV Failure",
    priority: "High",
    siteAddress: "",
    description: "",
  });
  const [ticketSuccess, setTicketSuccess] = useState(false);

  const handleTicketSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketForm.name || !ticketForm.email || !ticketForm.phone) return;

    submitLead({
      type: "Support Request",
      name: ticketForm.name,
      company: ticketForm.company,
      email: ticketForm.email,
      phone: ticketForm.phone,
      serviceOrProduct: `${ticketForm.serviceOrSystem} [Priority: ${ticketForm.priority}]`,
      message: `Support Ticket Description: ${ticketForm.description}. Site: ${ticketForm.siteAddress}`,
    });

    setTicketSuccess(true);
    setTimeout(() => {
      setTicketSuccess(false);
      setTicketForm({
        name: "",
        company: "",
        email: "",
        phone: "",
        serviceOrSystem: "CCTV Failure",
        priority: "High",
        siteAddress: "",
        description: "",
      });
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
                <Headphones className="w-3.5 h-3.5" />
                24×7 Technical Support & AMC Services
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6 leading-tight">
                {hero.heading}
              </h1>
              <p className="text-lg text-slate-300 mb-8 leading-relaxed">
                {hero.subtitle}
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="#service-form"
                  className="px-6 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition shadow-lg shadow-blue-600/30 flex items-center gap-2"
                >
                  Raise Support Ticket
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href={`tel:${settings.emergencyHotline}`}
                  className="px-6 py-3.5 bg-rose-600 hover:bg-rose-500 text-white font-semibold rounded-xl transition shadow-lg shadow-rose-600/30 flex items-center gap-2"
                >
                  <AlertTriangle className="w-4 h-4" />
                  Emergency Hotline
                </a>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Support Pillars Section */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
              <Activity className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-base mb-2">Preventive AMC</h3>
            <p className="text-slate-500 text-xs leading-relaxed">
              Scheduled camera cleaning, cable checks, power supply audits, and firmware patches before failures occur.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center mb-4">
              <Wrench className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-base mb-2">Corrective Repair</h3>
            <p className="text-slate-500 text-xs leading-relaxed">
              Fast hardware replacement, sensor recalibration, controller repairs, and backup restoration.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-base mb-2">Warranty Assistance</h3>
            <p className="text-slate-500 text-xs leading-relaxed">
              Complete OEM coordination, Return Merchandise Authorization (RMA), and direct manufacturer replacement parts.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-4">
              <Clock className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-base mb-2">Remote Diagnostics</h3>
            <p className="text-slate-500 text-xs leading-relaxed">
              Secure remote network access for instantaneous software troubleshooting and user permission updates.
            </p>
          </div>
        </div>

        {/* Raise a Support Ticket Form + SLA Table */}
        <div className="grid lg:grid-cols-12 gap-10 items-start">
          {/* Form */}
          <div id="service-form" className="lg:col-span-7 bg-white p-8 rounded-3xl border border-slate-200 shadow-lg">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <FileCheck className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Service Desk</span>
                <h2 className="text-2xl font-bold text-slate-900">Raise a Support Ticket</h2>
              </div>
            </div>

            {ticketSuccess ? (
              <div className="py-12 text-center">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-1">Support Ticket Created!</h3>
                <p className="text-slate-600 text-xs">
                  Your ticket has been logged into our CRM. An on-duty support engineer will contact you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleTicketSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Contact Name *</label>
                    <input
                      type="text"
                      required
                      value={ticketForm.name}
                      onChange={(e) => setTicketForm({ ...ticketForm, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g. Vikram Mehta"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Company / Facility</label>
                    <input
                      type="text"
                      value={ticketForm.company}
                      onChange={(e) => setTicketForm({ ...ticketForm, company: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Organization Name"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={ticketForm.email}
                      onChange={(e) => setTicketForm({ ...ticketForm, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="vikram@company.com"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      value={ticketForm.phone}
                      onChange={(e) => setTicketForm({ ...ticketForm, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="+91 98250 00000"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">System Affected *</label>
                    <select
                      value={ticketForm.serviceOrSystem}
                      onChange={(e) => setTicketForm({ ...ticketForm, serviceOrSystem: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="CCTV Failure">CCTV Video / Camera Outage</option>
                      <option value="Fire Alarm Fault">Fire Alarm System Warning/Fault</option>
                      <option value="Access Control Lock Issue">Access Control / Door Lock Issue</option>
                      <option value="Biometric Attendance Sync">Time Attendance / Sync Error</option>
                      <option value="Boom Barrier Breakdown">Boom Barrier / Gate Failure</option>
                      <option value="Network / Switch Outage">Switch / Wi-Fi Network Outage</option>
                      <option value="Automation Glitch">Home/Building Automation Issue</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Severity / Priority</label>
                    <select
                      value={ticketForm.priority}
                      onChange={(e) => setTicketForm({ ...ticketForm, priority: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="Critical">🔴 Critical (Complete System Outage)</option>
                      <option value="High">🟠 High (Major Feature Unavailable)</option>
                      <option value="Medium">🟡 Medium (Partial Functionality Issue)</option>
                      <option value="Low">🟢 Low (General Maintenance / Inquiry)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Site / Branch Location</label>
                  <input
                    type="text"
                    value={ticketForm.siteAddress}
                    onChange={(e) => setTicketForm({ ...ticketForm, siteAddress: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g. Unit 4B, Sanand Industrial Area"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Fault Description & Error Codes</label>
                  <textarea
                    rows={3}
                    value={ticketForm.description}
                    onChange={(e) => setTicketForm({ ...ticketForm, description: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Provide details on the error, when it occurred, or device models..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl text-xs transition shadow-md shadow-blue-600/20 flex items-center justify-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" /> Submit Support Ticket
                </button>
              </form>
            )}
          </div>

          {/* SLA Commitments & Contact Box */}
          <div className="lg:col-span-5 space-y-6">
            {/* SLA Table */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
              <h3 className="font-bold text-slate-900 text-base mb-2">Our SLA Response Standards</h3>
              <p className="text-slate-500 text-xs mb-4">Guaranteed response times based on issue priority under active AMC agreements.</p>
              
              <div className="divide-y divide-slate-100 text-xs">
                <div className="py-2.5 flex justify-between items-center">
                  <span className="font-semibold text-rose-600 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-rose-500"></span> Critical Outage
                  </span>
                  <span className="font-bold text-slate-900">&lt; 2 Hours (24×7)</span>
                </div>
                <div className="py-2.5 flex justify-between items-center">
                  <span className="font-semibold text-amber-600 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-amber-500"></span> Major Feature
                  </span>
                  <span className="font-bold text-slate-900">&lt; 4 Hours</span>
                </div>
                <div className="py-2.5 flex justify-between items-center">
                  <span className="font-semibold text-blue-600 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-blue-500"></span> Partial Issue
                  </span>
                  <span className="font-bold text-slate-900">&lt; 8 Hours</span>
                </div>
                <div className="py-2.5 flex justify-between items-center">
                  <span className="font-semibold text-emerald-600 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span> General Routine
                  </span>
                  <span className="font-bold text-slate-900">&lt; 24 Hours</span>
                </div>
              </div>
            </div>

            {/* Direct Support Channels */}
            <div className="bg-slate-900 text-white p-6 rounded-3xl space-y-4">
              <div className="text-xs uppercase tracking-wider text-blue-400 font-bold">
                Direct Support Channels
              </div>
              <div className="space-y-3 text-xs">
                <div className="flex items-center gap-3">
                  <PhoneCall className="w-4 h-4 text-blue-400" />
                  <div>
                    <div className="text-slate-400">Emergency 24×7 Hotline</div>
                    <a href={`tel:${settings.emergencyHotline}`} className="text-white font-bold hover:text-blue-300 transition">
                      {settings.emergencyHotline}
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MessageCircle className="w-4 h-4 text-emerald-400" />
                  <div>
                    <div className="text-slate-400">WhatsApp Support Chat</div>
                    <a href={`https://wa.me/${settings.whatsappNumber.replace(/[^0-9]/g, "")}`} target="_blank" rel="noreferrer" className="text-white font-bold hover:text-emerald-300 transition">
                      {settings.whatsappNumber}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
