import React, { useState } from "react";
import { useCMS } from "../context/CMSContext";
import {
  FileText,
  Search,
  Clock,
  User,
  Shield,
  Trash2,
  RefreshCw,
  CheckCircle2
} from "lucide-react";

export default function AdminLogs() {
  const { logs } = useCMS();
  const [search, setSearch] = useState("");

  const filteredLogs = logs.filter((l) =>
    l.action.toLowerCase().includes(search.toLowerCase()) ||
    l.module.toLowerCase().includes(search.toLowerCase()) ||
    l.details.toLowerCase().includes(search.toLowerCase()) ||
    l.user.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in max-w-5xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <Clock className="w-3.5 h-3.5" />
            Audit & Compliance
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Activity & Revision Logs</h1>
          <p className="text-slate-400 text-xs mt-1">Immutable audit trail of all content updates, hero changes, lead status transitions, and user actions.</p>
        </div>

        <div className="text-xs text-slate-400 font-semibold bg-slate-950 px-4 py-2 rounded-xl border border-slate-800">
          Total Recorded Actions: <span className="text-blue-400 font-bold">{logs.length}</span>
        </div>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Filter logs by action, module, or user..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Log Feed */}
      <div className="bg-slate-950 rounded-3xl border border-slate-800 overflow-hidden shadow-xl">
        <div className="divide-y divide-slate-850 text-xs">
          {filteredLogs.map((log) => (
            <div key={log.id} className="p-4 sm:p-5 hover:bg-slate-900/50 transition flex items-start justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2.5">
                  <span className="font-bold text-white text-sm">{log.action}</span>
                  <span className="px-2 py-0.5 rounded bg-blue-600/20 text-blue-300 font-mono text-[10px] font-bold">
                    {log.module}
                  </span>
                </div>
                <p className="text-slate-300 text-xs leading-relaxed">{log.details}</p>
                <div className="flex items-center gap-3 text-[11px] text-slate-500 pt-1">
                  <span className="flex items-center gap-1"><User className="w-3 h-3 text-slate-400" /> {log.user}</span>
                  <span>•</span>
                  <span className="text-blue-400 font-medium">{log.role}</span>
                </div>
              </div>

              <div className="text-[11px] text-slate-400 font-mono whitespace-nowrap">
                {log.timestamp}
              </div>
            </div>
          ))}

          {filteredLogs.length === 0 && (
            <div className="p-12 text-center text-slate-500">
              No matching activity logs found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
