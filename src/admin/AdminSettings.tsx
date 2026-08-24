import React, { useState, useEffect } from "react";
import { useCMS } from "../context/CMSContext";
import { checkSupabaseConnection, isSupabaseConfigured } from "../lib/supabase";
import {
  Settings,
  Save,
  CheckCircle2,
  Database,
  RefreshCw,
  AlertCircle,
  Globe,
  Phone,
  Mail,
  MapPin,
  Clock,
  Shield,
  Layers
} from "lucide-react";

export default function AdminSettings() {
  const { settings, updateSettings, addLog, resetToDefaults } = useCMS();
  const [formData, setFormData] = useState(settings);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Supabase connection state
  const [dbStatus, setDbStatus] = useState<{ loading: boolean; connected: boolean; message: string }>({
    loading: true,
    connected: false,
    message: "Checking database status...",
  });

  const testConnection = async () => {
    setDbStatus({ loading: true, connected: false, message: "Testing Supabase connection..." });
    const res = await checkSupabaseConnection();
    setDbStatus({ loading: false, connected: res.connected, message: res.message });
  };

  useEffect(() => {
    testConnection();
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(formData);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  return (
    <div className="space-y-8 animate-fade-in max-w-5xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <Settings className="w-3.5 h-3.5" />
            Global Configuration
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Global Site & Backend Settings</h1>
          <p className="text-slate-400 text-xs mt-1">Manage corporate details, hotlines, addresses, social links, and Supabase backend status.</p>
        </div>

        {saveSuccess && (
          <div className="inline-flex items-center gap-2 bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 px-4 py-2 rounded-xl text-xs font-bold animate-fade-in">
            <CheckCircle2 className="w-4 h-4" /> Global Settings Saved!
          </div>
        )}
      </div>

      {/* Supabase Database Connection Card */}
      <div className="bg-slate-950 p-6 rounded-3xl border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-white text-base">Supabase PostgreSQL Backend</h3>
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                  dbStatus.connected
                    ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                    : "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                }`}>
                  {dbStatus.connected ? "CONNECTED (Active)" : "READY / LOCAL FALLBACK"}
                </span>
              </div>
              <p className="text-slate-400 text-xs mt-0.5">Project URL: <span className="text-slate-200 font-mono text-[11px]">https://emwsejodyxkfjgkpjoau.supabase.co</span></p>
            </div>
          </div>

          <button
            onClick={testConnection}
            disabled={dbStatus.loading}
            className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs font-semibold rounded-xl border border-slate-800 transition flex items-center gap-1.5"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${dbStatus.loading ? "animate-spin text-blue-400" : ""}`} />
            Test Connection
          </button>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-850 text-xs flex items-center gap-2">
          {dbStatus.connected ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 text-amber-400 flex-shrink-0" />
          )}
          <span className="text-slate-300">{dbStatus.message}</span>
        </div>
      </div>

      {/* Main Settings Form */}
      <form onSubmit={handleSave} className="bg-slate-950 p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-xl space-y-6 text-xs">
        {/* Company Identity */}
        <div>
          <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 pb-2 border-b border-slate-800 flex items-center gap-2">
            <Shield className="w-4 h-4 text-blue-400" /> Company Identity
          </h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Company Legal Name</label>
              <input
                type="text"
                required
                value={formData.companyName}
                onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Tagline</label>
              <input
                type="text"
                value={formData.tagline}
                onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Contact Emails & Hotlines */}
        <div>
          <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 pb-2 border-b border-slate-800 flex items-center gap-2">
            <Phone className="w-4 h-4 text-emerald-400" /> Communications & Hotlines
          </h3>
          <div className="grid sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Primary Phone</label>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-semibold mb-1">24×7 Emergency Hotline</label>
              <input
                type="text"
                value={formData.emergencyHotline}
                onChange={(e) => setFormData({ ...formData, emergencyHotline: e.target.value })}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-semibold mb-1">WhatsApp Number</label>
              <input
                type="text"
                value={formData.whatsappNumber}
                onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value })}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-3 gap-4 mt-4">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">General Info Email</label>
              <input
                type="email"
                value={formData.primaryEmail}
                onChange={(e) => setFormData({ ...formData, primaryEmail: e.target.value })}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Sales & Proposals Email</label>
              <input
                type="email"
                value={formData.salesEmail}
                onChange={(e) => setFormData({ ...formData, salesEmail: e.target.value })}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Customer Support Email</label>
              <input
                type="email"
                value={formData.supportEmail}
                onChange={(e) => setFormData({ ...formData, supportEmail: e.target.value })}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white"
              />
            </div>
          </div>
        </div>

        {/* Corporate Address & Hours */}
        <div>
          <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 pb-2 border-b border-slate-800 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-purple-400" /> Physical Location & Operating Hours
          </h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Office Street Address</label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-semibold mb-1">City, State & PIN</label>
              <input
                type="text"
                value={formData.cityStateZip}
                onChange={(e) => setFormData({ ...formData, cityStateZip: e.target.value })}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Business Hours</label>
              <input
                type="text"
                value={formData.businessHours}
                onChange={(e) => setFormData({ ...formData, businessHours: e.target.value })}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Google Maps Embed / Link URL</label>
              <input
                type="text"
                value={formData.googleMapsUrl}
                onChange={(e) => setFormData({ ...formData, googleMapsUrl: e.target.value })}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white"
              />
            </div>
          </div>
        </div>

        {/* Social Media Links */}
        <div>
          <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 pb-2 border-b border-slate-800 flex items-center gap-2">
            <Globe className="w-4 h-4 text-sky-400" /> Social Profiles
          </h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">LinkedIn Profile</label>
              <input
                type="url"
                value={formData.socialLinks.linkedin}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    socialLinks: { ...formData.socialLinks, linkedin: e.target.value },
                  })
                }
                className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Facebook Page</label>
              <input
                type="url"
                value={formData.socialLinks.facebook}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    socialLinks: { ...formData.socialLinks, facebook: e.target.value },
                  })
                }
                className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white"
              />
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-800">
          <button
            type="button"
            onClick={() => {
              if (confirm("Reset local changes to defaults?")) resetToDefaults();
            }}
            className="px-4 py-2 bg-slate-900 text-slate-400 hover:text-white rounded-xl"
          >
            Reset to Default
          </button>
          <button
            type="submit"
            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl flex items-center gap-2 shadow-lg shadow-blue-600/30"
          >
            <Save className="w-4 h-4" /> Save Global Settings
          </button>
        </div>
      </form>
    </div>
  );
}
