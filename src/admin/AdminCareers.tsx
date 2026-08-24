import React, { useState } from "react";
import { useCMS } from "../context/CMSContext";
import { JobOpening, JobApplication } from "../types";
import {
  Users,
  Briefcase,
  Plus,
  Edit2,
  Trash2,
  X,
  Save,
  CheckCircle2,
  FileText,
  Mail,
  Phone,
  Building,
  Clock
} from "lucide-react";

export default function AdminCareers() {
  const { jobs, addJob, updateJob, deleteJob, applications, updateApplicationStatus } = useCMS();
  const [activeTab, setActiveTab] = useState<"jobs" | "applications">("jobs");

  // Job Opening State
  const [editingJob, setEditingJob] = useState<JobOpening | null>(null);
  const [isNewJob, setIsNewJob] = useState(false);

  // Application Detail Modal
  const [activeApp, setActiveApp] = useState<JobApplication | null>(null);

  const handleCreateNewJob = () => {
    setEditingJob({
      id: "",
      title: "",
      department: "Engineering",
      location: "Ahmedabad, Gujarat",
      type: "Full-Time",
      experience: "2-4 Years",
      qualification: "B.E / B.Tech / Diploma",
      salary: "₹4,50,000 - ₹7,00,000 p.a.",
      description: "",
      responsibilities: ["Installation and site supervision", "Client configuration training"],
      requirements: ["Good communication", "Technical background"],
      benefits: ["Health insurance", "Annual bonuses"],
      status: "Published",
      deadline: "Open",
    });
    setIsNewJob(true);
  };

  const handleSaveJob = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingJob || !editingJob.title) return;

    if (isNewJob) {
      const { id, ...rest } = editingJob;
      addJob(rest);
    } else {
      updateJob(editingJob.id, editingJob);
    }
    setEditingJob(null);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/10 text-sky-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <Users className="w-3.5 h-3.5" />
            Human Resources CMS
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Careers & Candidate Pipeline</h1>
          <p className="text-slate-400 text-xs mt-1">Manage job postings and review incoming candidate applications.</p>
        </div>

        <div className="flex items-center gap-2">
          {activeTab === "jobs" && (
            <button
              onClick={handleCreateNewJob}
              className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-xs transition shadow-lg shadow-blue-600/30 flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" /> Post New Job
            </button>
          )}
        </div>
      </div>

      {/* Tabs Switcher */}
      <div className="flex items-center gap-3 border-b border-slate-800 pb-1">
        <button
          onClick={() => setActiveTab("jobs")}
          className={`pb-3 px-4 text-xs font-bold transition flex items-center gap-2 border-b-2 ${
            activeTab === "jobs"
              ? "border-blue-500 text-blue-400"
              : "border-transparent text-slate-400 hover:text-white"
          }`}
        >
          <Briefcase className="w-4 h-4" />
          Active Job Postings ({jobs.length})
        </button>
        <button
          onClick={() => setActiveTab("applications")}
          className={`pb-3 px-4 text-xs font-bold transition flex items-center gap-2 border-b-2 ${
            activeTab === "applications"
              ? "border-blue-500 text-blue-400"
              : "border-transparent text-slate-400 hover:text-white"
          }`}
        >
          <Users className="w-4 h-4" />
          Candidate Applications ({applications.length})
        </button>
      </div>

      {/* Tab 1: Job Postings */}
      {activeTab === "jobs" && (
        <div className="bg-slate-950 rounded-3xl border border-slate-800 overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-900 border-b border-slate-800 text-slate-400 font-bold uppercase tracking-wider">
                <tr>
                  <th className="p-4">Job Title</th>
                  <th className="p-4">Department</th>
                  <th className="p-4">Location</th>
                  <th className="p-4">Experience</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-850">
                {jobs.map((j) => (
                  <tr key={j.id} className="hover:bg-slate-900/50 transition">
                    <td className="p-4 font-bold text-white text-sm">{j.title}</td>
                    <td className="p-4 text-sky-400 font-semibold">{j.department}</td>
                    <td className="p-4 text-slate-300">{j.location}</td>
                    <td className="p-4 text-slate-300">{j.experience}</td>
                    <td className="p-4">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                        {j.status}
                      </span>
                    </td>
                    <td className="p-4 text-right space-x-2">
                      <button
                        onClick={() => { setEditingJob(j); setIsNewJob(false); }}
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Delete job opening "${j.title}"?`)) deleteJob(j.id);
                        }}
                        className="p-1.5 rounded-lg bg-rose-500/20 hover:bg-rose-500 text-rose-300 hover:text-white transition"
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
      )}

      {/* Tab 2: Candidate Applications */}
      {activeTab === "applications" && (
        <div className="bg-slate-950 rounded-3xl border border-slate-800 overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-900 border-b border-slate-800 text-slate-400 font-bold uppercase tracking-wider">
                <tr>
                  <th className="p-4">Candidate</th>
                  <th className="p-4">Applied Position</th>
                  <th className="p-4">Experience</th>
                  <th className="p-4">Applied Date</th>
                  <th className="p-4">Hiring Stage</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-850">
                {applications.map((app) => (
                  <tr key={app.id} className="hover:bg-slate-900/50 transition">
                    <td className="p-4">
                      <div className="font-bold text-white text-sm">{app.fullName}</div>
                      <div className="text-slate-400 text-[11px]">{app.email} • {app.phone}</div>
                    </td>
                    <td className="p-4 text-blue-400 font-semibold">{app.jobTitle}</td>
                    <td className="p-4 text-slate-300">{app.experience}</td>
                    <td className="p-4 text-slate-400 text-[11px] whitespace-nowrap">{app.appliedDate}</td>
                    <td className="p-4">
                      <select
                        value={app.status}
                        onChange={(e) => updateApplicationStatus(app.id, e.target.value as any)}
                        className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-700 text-[11px] font-bold text-white"
                      >
                        <option value="New">New</option>
                        <option value="Under Review">Under Review</option>
                        <option value="Shortlisted">Shortlisted</option>
                        <option value="Interviewed">Interviewed</option>
                        <option value="Hired">Hired</option>
                        <option value="Rejected">Rejected</option>
                      </select>
                    </td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => setActiveApp(app)}
                        className="px-3 py-1.5 rounded-lg bg-blue-600/20 text-blue-300 hover:bg-blue-600 hover:text-white transition font-semibold"
                      >
                        Review Profile
                      </button>
                    </td>
                  </tr>
                ))}
                {applications.length === 0 && (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-slate-500">
                      No candidate job applications received yet. Submissions from the website will appear here in real-time.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Edit Job Modal */}
      {editingJob && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-slate-800 shadow-2xl p-6 sm:p-8 animate-fade-in text-xs space-y-4">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <h2 className="text-xl font-bold text-white">{isNewJob ? "Post New Opening" : "Edit Job Opening"}</h2>
              <button onClick={() => setEditingJob(null)} className="p-1 text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveJob} className="space-y-4">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Job Title *</label>
                <input
                  type="text"
                  required
                  value={editingJob.title}
                  onChange={(e) => setEditingJob({ ...editingJob, title: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white"
                />
              </div>

              <div className="grid sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Department</label>
                  <input
                    type="text"
                    value={editingJob.department}
                    onChange={(e) => setEditingJob({ ...editingJob, department: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Location</label>
                  <input
                    type="text"
                    value={editingJob.location}
                    onChange={(e) => setEditingJob({ ...editingJob, location: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Experience</label>
                  <input
                    type="text"
                    value={editingJob.experience}
                    onChange={(e) => setEditingJob({ ...editingJob, experience: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Salary Range</label>
                <input
                  type="text"
                  value={editingJob.salary || ""}
                  onChange={(e) => setEditingJob({ ...editingJob, salary: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white"
                  placeholder="e.g. ₹6,00,000 - ₹9,50,000 p.a."
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Role Description</label>
                <textarea
                  rows={2}
                  value={editingJob.description}
                  onChange={(e) => setEditingJob({ ...editingJob, description: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setEditingJob(null)}
                  className="px-4 py-2 bg-slate-800 text-slate-300 font-semibold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl flex items-center gap-1.5 shadow-lg shadow-blue-600/30"
                >
                  <Save className="w-4 h-4" /> Save Posting
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Review Application Modal */}
      {activeApp && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 rounded-3xl max-w-lg w-full border border-slate-800 shadow-2xl p-6 sm:p-8 animate-fade-in text-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <span className="text-xs font-bold text-blue-400 uppercase">{activeApp.jobTitle}</span>
                <h3 className="text-lg font-bold text-white">{activeApp.fullName}</h3>
              </div>
              <button onClick={() => setActiveApp(null)} className="p-1 text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-850 space-y-2">
              <div className="flex justify-between"><span className="text-slate-500">Email:</span> <span className="text-white font-semibold">{activeApp.email}</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Phone:</span> <span className="text-white font-semibold">{activeApp.phone}</span></div>
              <div className="flex justify-between"><span className="text-slate-500">City:</span> <span className="text-white font-semibold">{activeApp.currentCity}</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Experience:</span> <span className="text-white font-semibold">{activeApp.experience}</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Highest Qualification:</span> <span className="text-white font-semibold">{activeApp.highestQualification}</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Attached Resume:</span> <span className="text-blue-400 font-bold">{activeApp.resumeFileName}</span></div>
            </div>

            {activeApp.coverLetter && (
              <div>
                <div className="font-bold text-slate-400 uppercase mb-1">Candidate Note:</div>
                <p className="p-3 bg-slate-950 rounded-xl border border-slate-850 text-slate-300 leading-relaxed">
                  "{activeApp.coverLetter}"
                </p>
              </div>
            )}

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setActiveApp(null)}
                className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl"
              >
                Close Review
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
