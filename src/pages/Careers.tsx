import React, { useState } from "react";
import { useCMS } from "../context/CMSContext";
import { JobOpening } from "../types";
import {
  Briefcase,
  GraduationCap,
  Award,
  Users,
  CheckCircle2,
  ArrowRight,
  MapPin,
  Clock,
  Sparkles,
  Send,
  X,
  UploadCloud,
  FileCheck
} from "lucide-react";

export default function Careers() {
  const { jobs, heroConfigs, submitApplication } = useCMS();
  const hero = heroConfigs["careers"];

  const [selectedJob, setSelectedJob] = useState<JobOpening | null>(null);
  const [selectedDept, setSelectedDept] = useState("All");

  // Application Modal Form
  const [applyJob, setApplyJob] = useState<JobOpening | null>(null);
  const [appForm, setAppForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    currentCity: "",
    experience: "1-3 Years",
    currentCompany: "",
    currentCTC: "",
    expectedCTC: "",
    noticePeriod: "Immediate / 15 Days",
    highestQualification: "B.E / B.Tech",
    resumeFileName: "",
    linkedinProfile: "",
    coverLetter: "",
  });
  const [appSuccess, setAppSuccess] = useState(false);

  const departments = ["All", ...Array.from(new Set(jobs.map((j) => j.department)))];

  const filteredJobs = jobs.filter((j) => {
    return selectedDept === "All" || j.department === selectedDept;
  });

  const handleApplicationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!appForm.fullName || !appForm.email || !appForm.phone) return;

    submitApplication({
      jobId: applyJob?.id || "general",
      jobTitle: applyJob?.title || "General Application",
      fullName: appForm.fullName,
      email: appForm.email,
      phone: appForm.phone,
      currentCity: appForm.currentCity,
      experience: appForm.experience,
      currentCompany: appForm.currentCompany,
      currentCTC: appForm.currentCTC,
      expectedCTC: appForm.expectedCTC,
      noticePeriod: appForm.noticePeriod,
      highestQualification: appForm.highestQualification,
      resumeFileName: appForm.resumeFileName || "candidate_resume.pdf",
      linkedinProfile: appForm.linkedinProfile,
      coverLetter: appForm.coverLetter,
    });

    setAppSuccess(true);
    setTimeout(() => {
      setAppSuccess(false);
      setApplyJob(null);
      setAppForm({
        fullName: "",
        email: "",
        phone: "",
        currentCity: "",
        experience: "1-3 Years",
        currentCompany: "",
        currentCTC: "",
        expectedCTC: "",
        noticePeriod: "Immediate / 15 Days",
        highestQualification: "B.E / B.Tech",
        resumeFileName: "",
        linkedinProfile: "",
        coverLetter: "",
      });
    }, 2500);
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
                <Briefcase className="w-3.5 h-3.5" />
                Join Our Engineering Team
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6 leading-tight">
                {hero.heading}
              </h1>
              <p className="text-lg text-slate-300 mb-8 leading-relaxed">
                {hero.subtitle}
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="#openings"
                  className="px-6 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition shadow-lg shadow-blue-600/30 flex items-center gap-2"
                >
                  View Open Positions ({jobs.length})
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="#why-join"
                  className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white font-medium rounded-xl transition backdrop-blur-sm border border-white/10"
                >
                  Life at VRAT
                </a>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Why Join VRAT & Culture */}
      <section id="why-join" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-blue-600 font-bold text-xs uppercase tracking-wider">Our Culture & Values</span>
          <h2 className="text-3xl font-bold text-slate-900 mt-2 mb-4">
            More Than a Job — Build a Meaningful Career
          </h2>
          <p className="text-slate-600 text-sm leading-relaxed">
            At VRAT System Integrators, we believe great technology starts with great people. We foster an environment of continuous learning, engineering rigor, and real-world impact.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-base mb-2">Innovative Projects</h3>
            <p className="text-slate-500 text-xs leading-relaxed">
              Work on AI surveillance, IoT sensors, fiber optics, smart cities, and next-generation building automation systems.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
              <GraduationCap className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-base mb-2">Learning & Certifications</h3>
            <p className="text-slate-500 text-xs leading-relaxed">
              We sponsor OEM technical certifications with Cisco, Hikvision, Honeywell, Schneider, and Bosch.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-4">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-base mb-2">Performance Incentives</h3>
            <p className="text-slate-500 text-xs leading-relaxed">
              Lucrative project delivery bonuses, annual appraisals, and transparent fast-track leadership promotions.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-4">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-base mb-2">Collaborative Culture</h3>
            <p className="text-slate-500 text-xs leading-relaxed">
              Work alongside veteran architects, project managers, and systems engineers who support your professional growth.
            </p>
          </div>
        </div>
      </section>

      {/* Current Job Openings */}
      <section id="openings" className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">Current Job Openings</h2>
            <p className="text-slate-500 text-xs mt-1">Explore open positions across engineering, project management, and customer support.</p>
          </div>

          {/* Department Filter */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
            {departments.map((dept) => (
              <button
                key={dept}
                onClick={() => setSelectedDept(dept)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
                  selectedDept === dept
                    ? "bg-blue-600 text-white"
                    : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
                }`}
              >
                {dept}
              </button>
            ))}
          </div>
        </div>

        {/* Job Cards */}
        <div className="space-y-4 mb-16">
          {filteredJobs.map((job) => (
            <div
              key={job.id}
              className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm hover:shadow-md transition"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-4">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="px-2.5 py-0.5 rounded-md bg-blue-50 text-blue-700 text-xs font-bold">
                      {job.department}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-md bg-emerald-50 text-emerald-700 text-xs font-semibold">
                      {job.type}
                    </span>
                    {job.salary && (
                      <span className="px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-700 text-xs font-medium">
                        💰 {job.salary}
                      </span>
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">{job.title}</h3>
                  <div className="flex items-center gap-4 text-xs text-slate-500 mt-1">
                    <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-slate-400" /> {job.location}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-slate-400" /> Exp: {job.experience}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setSelectedJob(selectedJob?.id === job.id ? null : job)}
                    className="py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-xs transition"
                  >
                    {selectedJob?.id === job.id ? "Hide Details" : "View Responsibilities"}
                  </button>
                  <button
                    onClick={() => setApplyJob(job)}
                    className="py-2.5 px-5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl text-xs transition shadow-sm shadow-blue-600/20"
                  >
                    Apply Now
                  </button>
                </div>
              </div>

              <p className="text-slate-600 text-xs leading-relaxed mb-4">{job.description}</p>

              {/* Accordion Detail */}
              {selectedJob?.id === job.id && (
                <div className="pt-4 border-t border-slate-100 grid md:grid-cols-2 gap-6 animate-fade-in text-xs">
                  <div>
                    <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-2">Key Responsibilities</h4>
                    <ul className="space-y-1.5">
                      {job.responsibilities.map((r, i) => (
                        <li key={i} className="flex items-start gap-2 text-slate-600">
                          <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 mt-0.5 flex-shrink-0" />
                          <span>{r}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-2">Candidate Requirements</h4>
                    <ul className="space-y-1.5">
                      {job.requirements.map((req, i) => (
                        <li key={i} className="flex items-start gap-2 text-slate-600">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mt-0.5 flex-shrink-0" />
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Graduate & Internship Banner */}
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-xl grid md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-8 space-y-3">
            <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">Campus & Fresh Graduates</span>
            <h3 className="text-2xl sm:text-3xl font-bold">Graduate Engineer Trainee & Internship Program</h3>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              Are you a recent B.E/B.Tech/Diploma graduate in Electronics, Electrical, or IT? Launch your engineering career with live on-site exposure to enterprise surveillance, fiber networks, and automation projects.
            </p>
          </div>
          <div className="md:col-span-4 flex md:justify-end">
            <button
              onClick={() => setApplyJob(jobs[jobs.length - 1] || null)}
              className="px-6 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl text-sm transition shadow-lg shadow-blue-600/30"
            >
              Apply for Internship
            </button>
          </div>
        </div>
      </section>

      {/* Online Application Modal */}
      {applyJob && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 animate-fade-in p-6 sm:p-8">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
              <div>
                <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Online Job Application</span>
                <h3 className="font-bold text-slate-900 text-xl">{applyJob.title}</h3>
              </div>
              <button
                onClick={() => setApplyJob(null)}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {appSuccess ? (
              <div className="py-12 text-center">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-bold text-slate-900 mb-1">Application Submitted Successfully!</h4>
                <p className="text-slate-600 text-xs">Our HR recruitment team will review your credentials and contact you for the initial interview round.</p>
              </div>
            ) : (
              <form onSubmit={handleApplicationSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={appForm.fullName}
                      onChange={(e) => setAppForm({ ...appForm, fullName: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g. Ankit Sharma"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={appForm.email}
                      onChange={(e) => setAppForm({ ...appForm, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="ankit@example.com"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      value={appForm.phone}
                      onChange={(e) => setAppForm({ ...appForm, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="+91 98250 12345"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Current City *</label>
                    <input
                      type="text"
                      required
                      value={appForm.currentCity}
                      onChange={(e) => setAppForm({ ...appForm, currentCity: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Ahmedabad / Mumbai / etc."
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Total Experience</label>
                    <select
                      value={appForm.experience}
                      onChange={(e) => setAppForm({ ...appForm, experience: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="Fresher">Fresher (0 Years)</option>
                      <option value="1-2 Years">1–2 Years</option>
                      <option value="3-5 Years">3–5 Years</option>
                      <option value="5+ Years">5+ Years</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Current Company</label>
                    <input
                      type="text"
                      value={appForm.currentCompany}
                      onChange={(e) => setAppForm({ ...appForm, currentCompany: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Present employer"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Notice Period</label>
                    <input
                      type="text"
                      value={appForm.noticePeriod}
                      onChange={(e) => setAppForm({ ...appForm, noticePeriod: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g. 15 Days / Immediate"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Highest Qualification *</label>
                    <input
                      type="text"
                      required
                      value={appForm.highestQualification}
                      onChange={(e) => setAppForm({ ...appForm, highestQualification: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="B.E Electronics / Diploma / BCA"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">LinkedIn / Portfolio URL</label>
                    <input
                      type="url"
                      value={appForm.linkedinProfile}
                      onChange={(e) => setAppForm({ ...appForm, linkedinProfile: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="https://linkedin.com/in/..."
                    />
                  </div>
                </div>

                {/* Simulated Resume Upload */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Resume / CV Attachment (PDF / DOC)</label>
                  <div className="border-2 border-dashed border-slate-200 rounded-2xl p-4 text-center hover:border-blue-400 transition bg-slate-50">
                    <UploadCloud className="w-8 h-8 text-slate-400 mx-auto mb-1" />
                    <p className="text-xs font-medium text-slate-700">
                      {appForm.resumeFileName ? (
                        <span className="text-blue-600 font-bold flex items-center justify-center gap-1">
                          <FileCheck className="w-4 h-4 text-emerald-500" /> {appForm.resumeFileName} (Attached)
                        </span>
                      ) : (
                        "Click to attach your Resume / CV (PDF or DOC)"
                      )}
                    </p>
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          setAppForm({ ...appForm, resumeFileName: e.target.files[0].name });
                        }
                      }}
                      className="opacity-0 absolute inset-0 cursor-pointer"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Brief Cover Note / Summary</label>
                  <textarea
                    rows={2}
                    value={appForm.coverLetter}
                    onChange={(e) => setAppForm({ ...appForm, coverLetter: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Tell us briefly why you're a great fit for VRAT System Integrators..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl text-xs transition shadow-md shadow-blue-600/20 flex items-center justify-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" /> Submit Job Application
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
