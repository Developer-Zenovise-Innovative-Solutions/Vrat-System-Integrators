import React, { useState, useEffect } from "react";
import { useCMS } from "../context/CMSContext";
import { useToast } from "../context/ToastContext";
import { checkSupabaseConnection } from "../lib/supabase";
import { BusinessLocation, LocationType } from "../types";
import ImageUploader from "../components/ImageUploader";
import { sendEmailNotification, PRIMARY_RECIPIENT } from "../lib/emailService";
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
  Building2,
  Plus,
  Trash2,
  Edit2,
  ExternalLink,
  MessageSquare,
  Check,
  X,
  Send,
  Loader2
} from "lucide-react";

export default function AdminSettings() {
  const { settings, updateSettings, addLog, resetToDefaults } = useCMS();
  const toast = useToast();
  const [formData, setFormData] = useState(settings);
  const [activeTab, setActiveTab] = useState<"general" | "locations" | "social" | "smtp" | "database">("general");
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // SMTP Testing State
  const [isTestingEmail, setIsTestingEmail] = useState(false);
  const [emailTestResult, setEmailTestResult] = useState<{ success?: boolean; message?: string } | null>(null);

  // Locations state & modal
  const [editingLocation, setEditingLocation] = useState<BusinessLocation | null>(null);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);

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

  // Sync state if settings change from cloud
  useEffect(() => {
    setFormData(settings);
  }, [settings]);

  const handleSave = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsSaving(true);
    try {
      await updateSettings(formData);
      setSaveSuccess(true);
      toast.success("Settings Saved!", "Global configurations, locations, and social links synced to cloud.");
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err: any) {
      toast.error("Save Failed", err?.message || "Failed to update global settings.");
    } finally {
      setIsSaving(false);
    }
  };

  // ============================================================================
  // Location Management Logic (Requirement 5)
  // ============================================================================
  const openNewLocationModal = () => {
    setEditingLocation({
      id: "loc-" + Date.now(),
      name: "",
      type: "Branch Office",
      phone: "+91 95107 59646",
      whatsappNumber: "+91 95107 59646",
      address: "",
      googleMapsUrl: "https://maps.google.com/?q=Surat+Gujarat",
      email: "Nimesh.patel@vratsystem.co.in",
      active: true,
    });
    setIsLocationModalOpen(true);
  };

  const openEditLocationModal = (loc: BusinessLocation) => {
    setEditingLocation({ ...loc });
    setIsLocationModalOpen(true);
  };

  const handleSaveLocation = (locToSave: BusinessLocation) => {
    if (!locToSave.name.trim() || !locToSave.address.trim()) {
      toast.error("Missing Information", "Please enter location name and full address.");
      return;
    }

    let updatedLocations = [...(formData.locations || [])];

    // Rule: Only one location can be designated as Head Office
    if (locToSave.type === "Head Office") {
      updatedLocations = updatedLocations.map((loc) =>
        loc.id !== locToSave.id && loc.type === "Head Office"
          ? { ...loc, type: "Branch Office" as LocationType }
          : loc
      );
    }

    // Rule: Only one location can be designated as Registered Office
    if (locToSave.type === "Registered Office") {
      updatedLocations = updatedLocations.map((loc) =>
        loc.id !== locToSave.id && loc.type === "Registered Office"
          ? { ...loc, type: "Branch Office" as LocationType }
          : loc
      );
    }

    const idx = updatedLocations.findIndex((l) => l.id === locToSave.id);
    if (idx >= 0) {
      updatedLocations[idx] = locToSave;
    } else {
      updatedLocations.push(locToSave);
    }

    const newFormData = { ...formData, locations: updatedLocations };
    setFormData(newFormData);
    setIsLocationModalOpen(false);
    setEditingLocation(null);

    // Save directly to cloud so it persists immediately
    updateSettings(newFormData);
    toast.success(
      "Location Updated!",
      `"${locToSave.name}" saved as ${locToSave.type}. Changes published to website.`
    );
  };

  const handleDeleteLocation = (id: string) => {
    const target = (formData.locations || []).find((l) => l.id === id);
    if (target?.type === "Head Office") {
      toast.error(
        "Cannot Delete Head Office",
        "Please designate another location as Head Office before deleting this location."
      );
      return;
    }

    if (!confirm(`Are you sure you want to delete "${target?.name || "this location"}"?`)) {
      return;
    }

    const updatedLocations = (formData.locations || []).filter((l) => l.id !== id);
    const newFormData = { ...formData, locations: updatedLocations };
    setFormData(newFormData);
    updateSettings(newFormData);
    toast.info("Location Removed", `"${target?.name}" has been permanently removed.`);
  };

  const handleToggleLocationStatus = (id: string) => {
    const updatedLocations = (formData.locations || []).map((l) =>
      l.id === id ? { ...l, active: !l.active } : l
    );
    const newFormData = { ...formData, locations: updatedLocations };
    setFormData(newFormData);
    updateSettings(newFormData);
    toast.success("Location Status Updated", "Active status changed successfully.");
  };

  return (
    <div className="space-y-8 animate-fade-in max-w-5xl">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <Settings className="w-3.5 h-3.5" />
            Global Configuration
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Global Settings & Locations</h1>
          <p className="text-slate-400 text-xs mt-1">
            Manage corporate details, multiple business locations, social media profiles, and cloud database.
          </p>
        </div>

        {saveSuccess && (
          <div className="inline-flex items-center gap-2 bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 px-4 py-2 rounded-xl text-xs font-bold animate-fade-in">
            <CheckCircle2 className="w-4 h-4" /> Settings Saved!
          </div>
        )}
      </div>

      {/* Tabs Navigation */}
      <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
        <button
          type="button"
          onClick={() => setActiveTab("general")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
            activeTab === "general"
              ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
              : "bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800"
          }`}
        >
          <Building2 className="w-4 h-4" />
          General & Identity
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("locations")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
            activeTab === "locations"
              ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
              : "bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800"
          }`}
        >
          <MapPin className="w-4 h-4" />
          Locations Management ({formData.locations?.length || 0})
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("social")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
            activeTab === "social"
              ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
              : "bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800"
          }`}
        >
          <Globe className="w-4 h-4" />
          Social Media Settings
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("smtp")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
            activeTab === "smtp"
              ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
              : "bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800"
          }`}
        >
          <Mail className="w-4 h-4" />
          Email & SMTP Gateway
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("database")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
            activeTab === "database"
              ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
              : "bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800"
          }`}
        >
          <Database className="w-4 h-4" />
          Database & Cloud
        </button>
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: GENERAL & CORPORATE IDENTITY */}
      {/* ========================================================================= */}
      {activeTab === "general" && (
        <form onSubmit={handleSave} className="bg-slate-950 p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-xl space-y-6 text-xs">
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 pb-2 border-b border-slate-800 flex items-center gap-2">
              <Shield className="w-4 h-4 text-blue-400" /> Company Legal Identity
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
                <label className="block text-slate-300 font-semibold mb-1">Brand Tagline</label>
                <input
                  type="text"
                  value={formData.tagline}
                  onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-slate-300 font-semibold mb-1">Official Website URL</label>
                <input
                  type="url"
                  value={formData.websiteUrl || "https://vratsystems.com/"}
                  onChange={(e) => setFormData({ ...formData, websiteUrl: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white focus:ring-2 focus:ring-blue-500 font-mono text-xs"
                  placeholder="https://vratsystems.com/"
                />
              </div>

              <div className="sm:col-span-2 grid sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
                <div>
                  <ImageUploader
                    value={formData.headerLogoUrl || formData.logoUrl || ""}
                    onChange={(url) => setFormData({ ...formData, headerLogoUrl: url, logoUrl: formData.logoUrl || url })}
                    folder="branding"
                    label="Header / Navbar Logo"
                    helperText="Appears on main navigation bar across all website pages"
                  />
                  {formData.headerLogoUrl && (
                    <div className="mt-2 p-2 bg-slate-950 rounded-xl border border-slate-800 flex items-center gap-3">
                      <div className="w-10 h-10 bg-slate-900 rounded-lg p-1 flex items-center justify-center border border-slate-800">
                        <img src={formData.headerLogoUrl} alt="Header Preview" className="max-h-full max-w-full object-contain" />
                      </div>
                      <div className="text-[11px] text-slate-400">
                        <span className="text-emerald-400 font-semibold">Active Header Logo</span>
                        <div className="text-slate-500 text-[10px]">Displayed on light & dark headers</div>
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <ImageUploader
                    value={formData.footerLogoUrl || formData.logoUrl || ""}
                    onChange={(url) => setFormData({ ...formData, footerLogoUrl: url, logoUrl: formData.logoUrl || url })}
                    folder="branding"
                    label="Footer Brand Logo"
                    helperText="Appears on website bottom footer section across all pages"
                  />
                  {formData.footerLogoUrl && (
                    <div className="mt-2 p-2 bg-slate-950 rounded-xl border border-slate-800 flex items-center gap-3">
                      <div className="w-10 h-10 bg-slate-900 rounded-lg p-1 flex items-center justify-center border border-slate-800">
                        <img src={formData.footerLogoUrl} alt="Footer Preview" className="max-h-full max-w-full object-contain" />
                      </div>
                      <div className="text-[11px] text-slate-400">
                        <span className="text-blue-400 font-semibold">Active Footer Logo</span>
                        <div className="text-slate-500 text-[10px]">Displayed on dark footer</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 pb-2 border-b border-slate-800 flex items-center gap-2">
              <Phone className="w-4 h-4 text-emerald-400" /> Contact Numbers & Corporate Hotlines
            </h3>
            <div className="grid sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Customer Care Phone</label>
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
                <label className="block text-slate-300 font-semibold mb-1">Corporate WhatsApp Number</label>
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
                <label className="block text-slate-300 font-semibold mb-1">Primary Enquiry Email</label>
                <input
                  type="email"
                  value={formData.primaryEmail}
                  onChange={(e) => setFormData({ ...formData, primaryEmail: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white"
                />
              </div>
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Secondary / Director Email</label>
                <input
                  type="email"
                  value={formData.secondaryEmail || "Nimeshpatel.VSI@gmail.com"}
                  onChange={(e) => setFormData({ ...formData, secondaryEmail: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white"
                />
              </div>
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Sales Dept Email</label>
                <input
                  type="email"
                  value={formData.salesEmail}
                  onChange={(e) => setFormData({ ...formData, salesEmail: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white"
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Support / Care Email</label>
                <input
                  type="email"
                  value={formData.supportEmail}
                  onChange={(e) => setFormData({ ...formData, supportEmail: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white"
                />
              </div>
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Business Hours Display</label>
                <input
                  type="text"
                  value={formData.businessHours}
                  onChange={(e) => setFormData({ ...formData, businessHours: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end pt-4 border-t border-slate-800">
            <button
              type="submit"
              disabled={isSaving}
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl flex items-center gap-2 shadow-lg shadow-blue-600/30"
            >
              <Save className="w-4 h-4" /> Save General Settings
            </button>
          </div>
        </form>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: LOCATIONS MANAGEMENT (Requirement 5) */}
      {/* ========================================================================= */}
      {activeTab === "locations" && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-950 p-6 rounded-3xl border border-slate-800 shadow-xl">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <MapPin className="w-5 h-5 text-blue-400" />
                Multiple Business Locations & Offices
              </h3>
              <p className="text-slate-400 text-xs mt-1">
                Configure Head Office, Registered Office, and Branch Offices. Active locations dynamically render on the Contact page.
              </p>
            </div>
            <button
              type="button"
              onClick={openNewLocationModal}
              className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-lg shadow-blue-600/30 self-start sm:self-auto"
            >
              <Plus className="w-4 h-4" /> Add New Location
            </button>
          </div>

          {/* Locations Grid */}
          <div className="grid md:grid-cols-2 gap-5">
            {((formData.locations && formData.locations.length > 0) ? formData.locations : (settings.locations || [])).map((loc) => (
              <div
                key={loc.id}
                className={`bg-slate-950 p-6 rounded-3xl border transition shadow-xl space-y-4 relative ${
                  loc.type === "Head Office"
                    ? "border-blue-500/50 bg-gradient-to-br from-blue-950/30 to-slate-950"
                    : loc.type === "Registered Office"
                    ? "border-emerald-500/50 bg-gradient-to-br from-emerald-950/20 to-slate-950"
                    : "border-slate-800"
                } ${!loc.active ? "opacity-60" : ""}`}
              >
                {/* Header Badge */}
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider mb-2 ${
                        loc.type === "Head Office"
                          ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                          : loc.type === "Registered Office"
                          ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                          : "bg-purple-500/20 text-purple-400 border border-purple-500/30"
                      }`}
                    >
                      {loc.type}
                    </span>
                    <h4 className="text-base font-bold text-white leading-tight">{loc.name}</h4>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => handleToggleLocationStatus(loc.id)}
                      className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition ${
                        loc.active
                          ? "bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30"
                          : "bg-slate-800 text-slate-400 hover:bg-slate-700"
                      }`}
                      title="Toggle Active / Inactive"
                    >
                      {loc.active ? "Active" : "Inactive"}
                    </button>
                    <button
                      type="button"
                      onClick={() => openEditLocationModal(loc)}
                      className="p-1.5 bg-slate-900 hover:bg-slate-800 text-slate-300 rounded-lg transition"
                      title="Edit Location"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    {loc.type !== "Head Office" && (
                      <button
                        type="button"
                        onClick={() => handleDeleteLocation(loc.id)}
                        className="p-1.5 bg-slate-900 hover:bg-rose-500/20 text-rose-400 rounded-lg transition"
                        title="Delete Location"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Details */}
                <div className="text-xs text-slate-300 space-y-2 pt-2 border-t border-slate-850">
                  <div className="flex items-start gap-2 text-slate-400">
                    <MapPin className="w-4 h-4 text-slate-500 mt-0.5 flex-shrink-0" />
                    <span className="leading-relaxed text-slate-300">{loc.address}</span>
                  </div>

                  <div className="flex items-center gap-2 text-slate-400">
                    <Phone className="w-4 h-4 text-slate-500 flex-shrink-0" />
                    <span className="font-semibold text-slate-200">{loc.phone}</span>
                  </div>

                  <div className="flex items-center gap-2 text-slate-400">
                    <MessageSquare className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span className="text-slate-300">WhatsApp: {loc.whatsappNumber}</span>
                  </div>

                  {loc.email && (
                    <div className="flex items-center gap-2 text-slate-400">
                      <Mail className="w-4 h-4 text-slate-500 flex-shrink-0" />
                      <span className="text-slate-300">{loc.email}</span>
                    </div>
                  )}
                </div>

                {/* Footer Link */}
                <div className="pt-3 border-t border-slate-850 flex items-center justify-between text-[11px]">
                  <a
                    href={loc.googleMapsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-400 hover:underline inline-flex items-center gap-1 font-medium"
                  >
                    Google Maps Link <ExternalLink className="w-3 h-3" />
                  </a>
                  <span className="text-slate-500 text-[10px]">
                    {!loc.active && "Hidden from public website"}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Modal for Adding / Editing Location */}
          {isLocationModalOpen && editingLocation && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
              <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl space-y-5 text-xs text-white max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <h3 className="text-base font-bold">
                    {editingLocation.name ? `Edit "${editingLocation.name}"` : "Add New Business Location"}
                  </h3>
                  <button
                    onClick={() => {
                      setIsLocationModalOpen(false);
                      setEditingLocation(null);
                    }}
                    className="text-slate-400 hover:text-white"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Location / Office Name *</label>
                    <input
                      type="text"
                      required
                      value={editingLocation.name}
                      onChange={(e) => setEditingLocation({ ...editingLocation, name: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white"
                      placeholder="e.g. Surat Head Office"
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">Location Classification *</label>
                      <select
                        value={editingLocation.type}
                        onChange={(e) =>
                          setEditingLocation({
                            ...editingLocation,
                            type: e.target.value as LocationType,
                          })
                        }
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white"
                      >
                        <option value="Head Office">Head Office (1 Primary)</option>
                        <option value="Registered Office">Registered Office</option>
                        <option value="Branch Office">Branch Office</option>
                      </select>
                      <div className="text-[10px] text-slate-400 mt-1">
                        * Assigning Head Office reassigns any existing Head Office to Branch.
                      </div>
                    </div>

                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">Status</label>
                      <select
                        value={editingLocation.active ? "active" : "inactive"}
                        onChange={(e) =>
                          setEditingLocation({
                            ...editingLocation,
                            active: e.target.value === "active",
                          })
                        }
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white"
                      >
                        <option value="active">Active (Visible on Site)</option>
                        <option value="inactive">Inactive (Hidden)</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">Contact Number *</label>
                      <input
                        type="text"
                        required
                        value={editingLocation.phone}
                        onChange={(e) => setEditingLocation({ ...editingLocation, phone: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white"
                        placeholder="+91 95107 59646"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">WhatsApp Number *</label>
                      <input
                        type="text"
                        required
                        value={editingLocation.whatsappNumber}
                        onChange={(e) =>
                          setEditingLocation({ ...editingLocation, whatsappNumber: e.target.value })
                        }
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white"
                        placeholder="+91 95107 59646"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Complete Physical Address *</label>
                    <textarea
                      rows={3}
                      required
                      value={editingLocation.address}
                      onChange={(e) => setEditingLocation({ ...editingLocation, address: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white leading-relaxed"
                      placeholder="Floor, Building, Road, City, State, PIN..."
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">Google Maps Link URL *</label>
                      <input
                        type="url"
                        required
                        value={editingLocation.googleMapsUrl}
                        onChange={(e) =>
                          setEditingLocation({ ...editingLocation, googleMapsUrl: e.target.value })
                        }
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white"
                        placeholder="https://maps.google.com/..."
                      />
                    </div>
                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">Location Email (Optional)</label>
                      <input
                        type="email"
                        value={editingLocation.email || ""}
                        onChange={(e) => setEditingLocation({ ...editingLocation, email: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white"
                        placeholder="branch@vratsystem.co.in"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
                  <button
                    type="button"
                    onClick={() => {
                      setIsLocationModalOpen(false);
                      setEditingLocation(null);
                    }}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSaveLocation(editingLocation)}
                    className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl shadow-md shadow-blue-600/30"
                  >
                    Save Location
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: SOCIAL MEDIA SETTINGS (Requirement 9) */}
      {/* ========================================================================= */}
      {activeTab === "social" && (
        <form onSubmit={handleSave} className="bg-slate-950 p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-xl space-y-6 text-xs">
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-2 pb-2 border-b border-slate-800 flex items-center gap-2">
              <Globe className="w-4 h-4 text-sky-400" />
              Social Media Accounts & Footer Icons
            </h3>
            <p className="text-slate-400 text-xs mb-5">
              Configure URLs for your official social media profiles. Icons automatically appear in the website footer. Platforms with empty links are automatically hidden from the footer.
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">LinkedIn Page URL</label>
                <input
                  type="url"
                  value={formData.socialLinks?.linkedin || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      socialLinks: { ...formData.socialLinks, linkedin: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white font-mono text-xs"
                  placeholder="https://linkedin.com/company/vratsystem"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Facebook Page URL</label>
                <input
                  type="url"
                  value={formData.socialLinks?.facebook || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      socialLinks: { ...formData.socialLinks, facebook: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white font-mono text-xs"
                  placeholder="https://facebook.com/vratsystem"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Instagram Profile URL</label>
                <input
                  type="url"
                  value={formData.socialLinks?.instagram || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      socialLinks: { ...formData.socialLinks, instagram: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white font-mono text-xs"
                  placeholder="https://instagram.com/vratsystem"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">YouTube Channel URL</label>
                <input
                  type="url"
                  value={formData.socialLinks?.youtube || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      socialLinks: { ...formData.socialLinks, youtube: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white font-mono text-xs"
                  placeholder="https://youtube.com/@vratsystem"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">X (Twitter) Profile URL</label>
                <input
                  type="url"
                  value={formData.socialLinks?.twitter || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      socialLinks: { ...formData.socialLinks, twitter: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white font-mono text-xs"
                  placeholder="https://x.com/vratsystem"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end pt-4 border-t border-slate-800">
            <button
              type="submit"
              disabled={isSaving}
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl flex items-center gap-2 shadow-lg shadow-blue-600/30"
            >
              <Save className="w-4 h-4" /> Save Social Media Settings
            </button>
          </div>
        </form>
      )}

      {/* ========================================================================= */}
      {/* TAB 4: EMAIL & SMTP GATEWAY INTEGRATION                                   */}
      {/* ========================================================================= */}
      {activeTab === "smtp" && (
        <div className="bg-slate-950 p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6 text-xs">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-white text-base">Website Email & SMTP Delivery Gateway</h3>
                <p className="text-slate-400 text-xs">
                  All website contact forms, site survey bookings, and quotation leads are routed here.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 font-bold text-[11px] flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" /> Multi-Tier Active
              </span>
            </div>
          </div>

          {/* Primary Recipient Card */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="text-[11px] font-bold text-blue-400 uppercase tracking-wider">Configured Target Recipient</div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-emerald-400" />
                <span className="text-white font-mono text-sm font-bold">{PRIMARY_RECIPIENT}</span>
              </div>
              <button
                type="button"
                disabled={isTestingEmail}
                onClick={async () => {
                  setIsTestingEmail(true);
                  setEmailTestResult(null);
                  try {
                    const result = await sendEmailNotification({
                      formType: "Admin Diagnostic Test",
                      name: "VRAT System Admin",
                      email: PRIMARY_RECIPIENT,
                      phone: "+91 95107 59646",
                      company: "VRAT System Integrators",
                      subject: `[Diagnostic Verification] VRAT System Web Gateway Test - ${new Date().toLocaleTimeString()}`,
                      message: "This is a direct diagnostic test from the Admin Panel verifying that email dispatch is operating correctly.",
                      details: {
                        "Triggered By": "Administrator",
                        "Delivery Engine": "Multi-Tier SMTP + Direct HTTP Relay",
                        "Target Email": PRIMARY_RECIPIENT,
                        "System Time": new Date().toLocaleString(),
                      },
                    });
                    setEmailTestResult(result);
                    if (result.success) {
                      toast.success("Test Dispatched!", `Email sent to ${PRIMARY_RECIPIENT} via ${result.deliveredBy || "relay"}.`);
                    } else {
                      toast.error("Dispatch Notice", result.message);
                    }
                  } catch (e: any) {
                    setEmailTestResult({ success: false, message: e.message || "Email test failed." });
                    toast.error("Test Error", e.message || "Failed to trigger email test.");
                  } finally {
                    setIsTestingEmail(false);
                  }
                }}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition flex items-center gap-2 shadow-lg shadow-blue-600/30"
              >
                {isTestingEmail ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" /> Dispatching Test...
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" /> Send Test Email Now
                  </>
                )}
              </button>
            </div>
            {emailTestResult && (
              <div
                className={`p-3 rounded-xl border text-xs flex items-center gap-2 ${
                  emailTestResult.success
                    ? "bg-emerald-950/40 border-emerald-800 text-emerald-300"
                    : "bg-rose-950/40 border-rose-800 text-rose-300"
                }`}
              >
                {emailTestResult.success ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0" />
                )}
                <span>{emailTestResult.message}</span>
              </div>
            )}
          </div>

          {/* Operational Delivery Status Details */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
              <div className="text-white font-bold text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Tier 1: SMTP / API Dispatch
              </div>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                Connects through <span className="font-mono text-slate-300">/api/send-email</span> endpoint using Node.js nodemailer.
              </p>
              <div className="text-[10px] text-slate-500 font-mono">
                Host: smtp.gmail.com | Port: 465 SSL | Recipient: {PRIMARY_RECIPIENT}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
              <div className="text-white font-bold text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-400" />
                Tier 2: FormSubmit Direct Relay
              </div>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                Direct HTTPS delivery to FormSubmit for instant mailbox delivery.
              </p>
              <div className="text-[10px] text-blue-400/90 font-medium bg-blue-950/40 p-2 rounded-lg border border-blue-900/40">
                💡 <span className="font-bold">Important One-Time Check:</span> If you haven't received emails yet, please check <span className="font-bold">{PRIMARY_RECIPIENT}</span>'s Spam or Promotions folder for a confirmation link titled <em>"Action Required: Confirm your email"</em> from FormSubmit to activate instant forwarding.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 5: DATABASE & BACKEND */}
      {/* ========================================================================= */}
      {activeTab === "database" && (
        <div className="bg-slate-950 p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-5 text-xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <Database className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-white text-base">Supabase PostgreSQL Cloud Backend</h3>
                <span
                  className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                    dbStatus.connected
                      ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                      : "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                  }`}
                >
                  {dbStatus.connected ? "CONNECTED (Active Cloud Sync)" : "CONNECTING / LOCAL"}
                </span>
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

          <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 text-xs flex items-center gap-2">
            {dbStatus.connected ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 text-amber-400 flex-shrink-0" />
            )}
            <span className="text-slate-300">{dbStatus.message}</span>
          </div>

          <div className="pt-4 border-t border-slate-850 flex items-center justify-between">
            <span className="text-slate-500 text-[11px]">Factory System Maintenance</span>
            <button
              type="button"
              onClick={() => {
                if (confirm("Reset local changes to defaults?")) resetToDefaults();
              }}
              className="px-4 py-2 bg-slate-900 text-slate-400 hover:text-white rounded-xl text-xs"
            >
              Restore Initial Defaults
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
