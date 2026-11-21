import React, { useState } from "react";
import { useCMS } from "../context/CMSContext";
import { LeadItem } from "../types";
import {
  Inbox,
  Search,
  Filter,
  Download,
  Trash2,
  Edit2,
  X,
  Save,
  CheckCircle2,
  Phone,
  Mail,
  Building,
  MapPin,
  Calendar,
  Clock,
  UserCheck
} from "lucide-react";

export default function AdminLeads() {
  const { leads, updateLeadStatus, deleteLead, addLog } = useCMS();
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [activeLead, setActiveLead] = useState<LeadItem | null>(null);

  // Filter leads
  const filteredLeads = leads.filter((l) => {
    const matchesSearch =
      l.name.toLowerCase().includes(search.toLowerCase()) ||
      (l.company && l.company.toLowerCase().includes(search.toLowerCase())) ||
      l.email.toLowerCase().includes(search.toLowerCase()) ||
      l.message.toLowerCase().includes(search.toLowerCase());
    const matchesType = typeFilter === "All" || l.type === typeFilter;
    const matchesStatus = statusFilter === "All" || l.status === statusFilter;
    return matchesSearch && matchesType && matchesStatus;
  });

  const exportCSV = () => {
    const headers = ["ID", "Type", "Name", "Company", "Email", "Phone", "City", "Service/Product", "Status", "Date", "Notes"];
    const rows = filteredLeads.map((l) => [
      l.id,
      l.type,
      `"${l.name}"`,
      `"${l.company || ""}"`,
      l.email,
      `"${l.phone || ""}"`,
      `"${l.city || ""}"`,
      `"${l.serviceOrProduct || ""}"`,
      l.status,
      l.createdDate,
      `"${l.notes || ""}"`,
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `vrat_leads_export_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    addLog("Exported Leads", "Leads", `Exported ${filteredLeads.length} leads to CSV`);
  };

  const handleUpdateStatus = (leadId: string, status: LeadItem["status"], notes?: string, assignedTo?: string) => {
    updateLeadStatus(leadId, status, notes, assignedTo);
    if (activeLead && activeLead.id === leadId) {
      setActiveLead({ ...activeLead, status, notes: notes !== undefined ? notes : activeLead.notes, assignedTo: assignedTo !== undefined ? assignedTo : activeLead.assignedTo });
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 text-rose-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <Inbox className="w-3.5 h-3.5" />
            Inbound Leads & CRM
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Leads & Inquiries Management</h1>
          <p className="text-slate-400 text-xs mt-1">Manage contact inquiries, site survey bookings, product quote requests, and support tickets.</p>
        </div>

        <button
          onClick={exportCSV}
          className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold rounded-xl text-xs transition border border-slate-700 flex items-center gap-2"
        >
          <Download className="w-4 h-4 text-emerald-400" /> Export CSV ({filteredLeads.length})
        </button>
      </div>

      {/* Filter Controls */}
      <div className="grid sm:grid-cols-12 gap-3 bg-slate-950 p-4 rounded-2xl border border-slate-800">
        <div className="sm:col-span-6 relative">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by client name, email, company, city..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="sm:col-span-3">
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white"
          >
            <option value="All">All Inbound Types</option>
            <option value="Contact Inquiry">Contact Inquiries</option>
            <option value="Site Survey Request">Site Survey Requests</option>
            <option value="Product Quote">Product Quotations</option>
            <option value="Support Request">Support Tickets</option>
            <option value="Newsletter">Newsletter Signups</option>
          </select>
        </div>

        <div className="sm:col-span-3">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white"
          >
            <option value="All">All Statuses</option>
            <option value="New">🔴 New</option>
            <option value="Contacted">🟡 Contacted</option>
            <option value="Qualified">🔵 Qualified</option>
            <option value="Proposal Sent">🟣 Proposal Sent</option>
            <option value="Won">🟢 Won</option>
            <option value="Closed">⚪ Closed</option>
          </select>
        </div>
      </div>

      {/* Leads Table */}
      <div className="bg-slate-950 rounded-3xl border border-slate-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900 border-b border-slate-800 text-slate-400 font-bold uppercase tracking-wider">
              <tr>
                <th className="p-4">Lead / Client</th>
                <th className="p-4">Type</th>
                <th className="p-4">Requirement / Service</th>
                <th className="p-4">Date</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-850">
              {filteredLeads.map((l) => (
                <tr key={l.id} className="hover:bg-slate-900/50 transition">
                  <td className="p-4">
                    <div className="font-bold text-white text-sm">{l.name}</div>
                    <div className="text-slate-400 text-[11px]">{l.company || "Individual"} • {l.email}</div>
                    {l.phone && <div className="text-blue-400 text-[11px]">{l.phone}</div>}
                  </td>
                  <td className="p-4">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-slate-900 border border-slate-700 text-slate-200">
                      {l.type}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="font-semibold text-slate-200">{l.serviceOrProduct || "General Inquiry"}</div>
                    <div className="text-slate-500 text-[11px] line-clamp-1 max-w-xs">{l.message}</div>
                  </td>
                  <td className="p-4 text-slate-400 text-[11px] whitespace-nowrap">{l.createdDate}</td>
                  <td className="p-4">
                    <select
                      value={l.status}
                      onChange={(e) => handleUpdateStatus(l.id, e.target.value as any)}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-bold cursor-pointer border ${
                        l.status === "New"
                          ? "bg-rose-500/20 text-rose-300 border-rose-500/30"
                          : l.status === "Contacted"
                          ? "bg-amber-500/20 text-amber-300 border-amber-500/30"
                          : l.status === "Proposal Sent"
                          ? "bg-purple-500/20 text-purple-300 border-purple-500/30"
                          : "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
                      }`}
                    >
                      <option value="New" className="bg-slate-900 text-white">New</option>
                      <option value="Contacted" className="bg-slate-900 text-white">Contacted</option>
                      <option value="Qualified" className="bg-slate-900 text-white">Qualified</option>
                      <option value="Proposal Sent" className="bg-slate-900 text-white">Proposal Sent</option>
                      <option value="Won" className="bg-slate-900 text-white">Won</option>
                      <option value="Lost" className="bg-slate-900 text-white">Lost</option>
                      <option value="Closed" className="bg-slate-900 text-white">Closed</option>
                    </select>
                  </td>
                  <td className="p-4 text-right space-x-2">
                    <button
                      onClick={() => setActiveLead(l)}
                      className="p-1.5 rounded-lg bg-blue-600/20 hover:bg-blue-600 text-blue-300 hover:text-white transition"
                      title="View Details"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Delete lead record for "${l.name}"?`)) deleteLead(l.id);
                      }}
                      className="p-1.5 rounded-lg bg-rose-500/20 hover:bg-rose-500 text-rose-300 hover:text-white transition"
                      title="Delete"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Lead Detail & CRM Notes Modal */}
      {activeLead && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 rounded-3xl max-w-xl w-full border border-slate-800 shadow-2xl p-6 sm:p-8 animate-fade-in space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div>
                <span className="text-xs font-bold text-blue-400 uppercase">{activeLead.type}</span>
                <h3 className="text-xl font-bold text-white">{activeLead.name}</h3>
              </div>
              <button onClick={() => setActiveLead(null)} className="p-1 text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-850 space-y-2 text-xs">
              <div className="grid grid-cols-2 gap-2 text-slate-300">
                <div><span className="text-slate-500">Company:</span> {activeLead.company || "N/A"}</div>
                <div><span className="text-slate-500">City:</span> {activeLead.city || "N/A"}</div>
                <div><span className="text-slate-500">Email:</span> {activeLead.email}</div>
                <div><span className="text-slate-500">Phone:</span> {activeLead.phone || "N/A"}</div>
                <div><span className="text-slate-500">Service:</span> {activeLead.serviceOrProduct}</div>
                <div><span className="text-slate-500">Scale:</span> {activeLead.estimatedSize || "N/A"}</div>
              </div>
              {activeLead.preferredDate && (
                <div className="pt-2 border-t border-slate-800 text-blue-300">
                  📅 Requested Survey Date: {activeLead.preferredDate} ({activeLead.preferredTime})
                </div>
              )}
            </div>

            <div>
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Customer Message</h4>
              <p className="p-3 bg-slate-950 rounded-xl border border-slate-850 text-xs text-slate-200 leading-relaxed">
                "{activeLead.message}"
              </p>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                Internal Sales & Engineering Notes
              </label>
              <textarea
                rows={3}
                defaultValue={activeLead.notes || ""}
                onBlur={(e) => handleUpdateStatus(activeLead.id, activeLead.status, e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-600 focus:ring-2 focus:ring-blue-500"
                placeholder="Add notes about call discussions, quotation sent, site survey results..."
              />
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setActiveLead(null)}
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-xs"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
