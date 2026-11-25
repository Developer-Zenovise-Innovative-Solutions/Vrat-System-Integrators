import React, { useState } from "react";
import { FooterData } from "../../types";
import { useCMS } from "../../context/CMSContext";
import ImageUploader from "../../components/ImageUploader";
import logoIcon from "../../assets/logo/logo-icon.png";
import {
  Save,
  Loader2,
  ExternalLink,
  Phone,
  Mail,
  MapPin,
  ShieldCheck,
  Megaphone,
  CheckCircle2,
  Sliders,
  Image as ImageIcon
} from "lucide-react";

interface FooterBuilderProps {
  data: FooterData;
  onChange: (updated: FooterData) => void;
  onSave: () => Promise<void>;
  isSaving: boolean;
}

export default function FooterBuilder({
  data,
  onChange,
  onSave,
  isSaving,
}: FooterBuilderProps) {
  const { settings, updateSettings } = useCMS();
  const [activeTab, setActiveTab] = useState<"prefooter" | "company" | "newsletter" | "bottom">("prefooter");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSave();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 animate-fade-in text-xs">
      {/* Top Header Card */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/90 backdrop-blur-md p-6 rounded-3xl border border-slate-800 shadow-xl">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-400 uppercase tracking-wider mb-1">
            <span>Global Layout</span>
            <span>/</span>
            <span>Website Footer</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white">Website Footer Content & Pre-Banner Studio</h2>
          <p className="text-slate-400 text-xs mt-1">
            Customize the pre-footer callout bar, company narrative, contact information, newsletter text, and copyright notices.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="/#footer"
            target="_blank"
            rel="noreferrer"
            className="px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-300 font-semibold text-xs border border-slate-700 transition flex items-center gap-1.5"
          >
            <ExternalLink className="w-3.5 h-3.5 text-blue-400" /> View Footer
          </a>
          <button
            type="submit"
            disabled={isSaving}
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-bold rounded-xl shadow-lg shadow-blue-600/30 transition flex items-center gap-2 text-xs"
          >
            {isSaving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> Saving Changes...
              </>
            ) : (
              <>
                <Save className="w-4 h-4" /> Save Footer Settings
              </>
            )}
          </button>
        </div>
      </div>

      {/* Navigation Pills Bar */}
      <div className="flex items-center gap-2 p-1.5 bg-slate-900/90 rounded-2xl border border-slate-800 overflow-x-auto scrollbar-thin">
        <button
          type="button"
          onClick={() => setActiveTab("prefooter")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold transition whitespace-nowrap ${
            activeTab === "prefooter"
              ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
              : "text-slate-400 hover:text-white hover:bg-slate-800"
          }`}
        >
          <Phone className="w-4 h-4" /> 1. Pre-Footer Contact Bar
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("company")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold transition whitespace-nowrap ${
            activeTab === "company"
              ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
              : "text-slate-400 hover:text-white hover:bg-slate-800"
          }`}
        >
          <ShieldCheck className="w-4 h-4" /> 2. Logos, Narrative & Badges
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("newsletter")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold transition whitespace-nowrap ${
            activeTab === "newsletter"
              ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
              : "text-slate-400 hover:text-white hover:bg-slate-800"
          }`}
        >
          <Megaphone className="w-4 h-4" /> 3. Newsletter Subscription
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("bottom")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold transition whitespace-nowrap ${
            activeTab === "bottom"
              ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
              : "text-slate-400 hover:text-white hover:bg-slate-800"
          }`}
        >
          <Sliders className="w-4 h-4" /> 4. Bottom Copyright & Legal
        </button>
      </div>

      {/* TAB 1: PRE-FOOTER CALLOUT BAR */}
      {activeTab === "prefooter" && (
        <div className="bg-slate-950 p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-xl space-y-6">
          <div className="border-b border-slate-800 pb-3">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Phone className="w-4 h-4 text-blue-400" /> Pre-Footer 3-Column Quick Access Bar
            </h3>
            <p className="text-slate-400 text-xs mt-1">
              Displays across all pages directly above the main footer links for rapid customer care, enquiries, and office address.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Phone Box */}
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <div className="flex items-center gap-2 text-blue-400 font-bold text-xs uppercase">
                <Phone className="w-4 h-4" /> Box 1: Support Hotline
              </div>
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Top Label Text</label>
                <input
                  type="text"
                  value={data.preFooter.phoneLabel}
                  onChange={(e) =>
                    onChange({
                      ...data,
                      preFooter: { ...data.preFooter, phoneLabel: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Phone Number (Click opens WhatsApp)</label>
                <input
                  type="text"
                  value={data.preFooter.phoneNumber}
                  onChange={(e) =>
                    onChange({
                      ...data,
                      preFooter: { ...data.preFooter, phoneNumber: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:ring-2 focus:ring-blue-500 font-mono text-xs"
                />
              </div>
            </div>

            {/* Email Box */}
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase">
                <Mail className="w-4 h-4" /> Box 2: Sales Enquiry
              </div>
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Top Label Text</label>
                <input
                  type="text"
                  value={data.preFooter.emailLabel}
                  onChange={(e) =>
                    onChange({
                      ...data,
                      preFooter: { ...data.preFooter, emailLabel: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Sales Email Address</label>
                <input
                  type="email"
                  value={data.preFooter.emailAddress}
                  onChange={(e) =>
                    onChange({
                      ...data,
                      preFooter: { ...data.preFooter, emailAddress: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:ring-2 focus:ring-blue-500 font-mono text-xs"
                />
              </div>
            </div>

            {/* Address Box */}
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <div className="flex items-center gap-2 text-purple-400 font-bold text-xs uppercase">
                <MapPin className="w-4 h-4" /> Box 3: Head Office
              </div>
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Top Label Text</label>
                <input
                  type="text"
                  value={data.preFooter.addressLabel}
                  onChange={(e) =>
                    onChange({
                      ...data,
                      preFooter: { ...data.preFooter, addressLabel: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-slate-300 font-semibold mb-1">City / Region Display</label>
                <input
                  type="text"
                  value={data.preFooter.addressText}
                  onChange={(e) =>
                    onChange({
                      ...data,
                      preFooter: { ...data.preFooter, addressText: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: COMPANY NARRATIVE & CERTIFICATIONS */}
      {activeTab === "company" && (
        <div className="bg-slate-950 p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-xl space-y-6">
          <div className="border-b border-slate-800 pb-3">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" /> Company Identity & Narrative
            </h3>
            <p className="text-slate-400 text-xs mt-1">
              Appears in the first two columns of the main footer section.
            </p>
          </div>

          {/* Logo Customization Section */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-blue-400" /> Header & Footer Brand Logos
              </h4>
              <span className="text-[10px] text-slate-400">Syncs immediately across website navbar & footer</span>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              {/* Header Logo */}
              <div className="space-y-3">
                <ImageUploader
                  value={data.company.headerLogoUrl || settings.headerLogoUrl || settings.logoUrl || ""}
                  onChange={(url) => {
                    onChange({
                      ...data,
                      company: { ...data.company, headerLogoUrl: url },
                    });
                    if (updateSettings) {
                      updateSettings({ ...settings, headerLogoUrl: url });
                    }
                  }}
                  folder="branding"
                  label="1. Header (Navbar) Logo"
                  helperText="Primary logo shown in top header navbar across all pages"
                />

                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center gap-3">
                  <div className="w-12 h-12 bg-white rounded-lg p-1.5 flex items-center justify-center shadow-inner">
                    <img
                      src={data.company.headerLogoUrl || settings.headerLogoUrl || settings.logoUrl || logoIcon}
                      alt="Navbar Preview"
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                  <div className="text-[11px] text-slate-300">
                    <div className="font-semibold text-emerald-400">Header Preview (Light & Dark)</div>
                    <div className="text-[10px] text-slate-500">Rendered in fixed/scrolled navigation bar</div>
                  </div>
                </div>
              </div>

              {/* Footer Logo */}
              <div className="space-y-3">
                <ImageUploader
                  value={data.company.logoUrl || settings.footerLogoUrl || settings.logoUrl || ""}
                  onChange={(url) => {
                    onChange({
                      ...data,
                      company: { ...data.company, logoUrl: url },
                    });
                    if (updateSettings) {
                      updateSettings({ ...settings, footerLogoUrl: url });
                    }
                  }}
                  folder="branding"
                  label="2. Footer Main Brand Logo"
                  helperText="Official logo displayed in footer company narrative column"
                />

                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center gap-3">
                  <div className="w-12 h-12 bg-slate-900 rounded-lg p-1.5 flex items-center justify-center border border-slate-800">
                    <img
                      src={data.company.logoUrl || settings.footerLogoUrl || settings.logoUrl || logoIcon}
                      alt="Footer Preview"
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                  <div className="text-[11px] text-slate-300">
                    <div className="font-semibold text-blue-400">Footer Preview (Dark Theme)</div>
                    <div className="text-[10px] text-slate-500">Rendered alongside company narrative</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Brand Name Title</label>
              <input
                type="text"
                value={data.company.title}
                onChange={(e) =>
                  onChange({
                    ...data,
                    company: { ...data.company, title: e.target.value },
                  })
                }
                className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Brand Subtitle</label>
              <input
                type="text"
                value={data.company.subtitle}
                onChange={(e) =>
                  onChange({
                    ...data,
                    company: { ...data.company, subtitle: e.target.value },
                  })
                }
                className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-slate-300 font-semibold mb-1">Company Narrative & Bio</label>
              <textarea
                rows={3}
                value={data.company.description}
                onChange={(e) =>
                  onChange({
                    ...data,
                    company: { ...data.company, description: e.target.value },
                  })
                }
                className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white focus:ring-2 focus:ring-blue-500 leading-relaxed"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-slate-300 font-semibold mb-1">Certifications & Accreditations Badge</label>
              <input
                type="text"
                value={data.company.certificationsBadge}
                onChange={(e) =>
                  onChange({
                    ...data,
                    company: { ...data.company, certificationsBadge: e.target.value },
                  })
                }
                className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white focus:ring-2 focus:ring-blue-500 font-mono text-xs"
                placeholder="ISO 9001:2015 Certified | MSME Registered"
              />
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: NEWSLETTER SUBSCRIPTION */}
      {activeTab === "newsletter" && (
        <div className="bg-slate-950 p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-xl space-y-6">
          <div className="border-b border-slate-800 pb-3">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Megaphone className="w-4 h-4 text-cyan-400" /> Newsletter Subscription Box
            </h3>
            <p className="text-slate-400 text-xs mt-1">
              Encourages visitors to subscribe to monthly security insights and bulletins.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Newsletter Heading</label>
              <input
                type="text"
                value={data.newsletter.heading}
                onChange={(e) =>
                  onChange({
                    ...data,
                    newsletter: { ...data.newsletter, heading: e.target.value },
                  })
                }
                className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Button Text</label>
              <input
                type="text"
                value={data.newsletter.buttonText}
                onChange={(e) =>
                  onChange({
                    ...data,
                    newsletter: { ...data.newsletter, buttonText: e.target.value },
                  })
                }
                className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-slate-300 font-semibold mb-1">Newsletter Subtitle / Description</label>
              <input
                type="text"
                value={data.newsletter.subtitle}
                onChange={(e) =>
                  onChange({
                    ...data,
                    newsletter: { ...data.newsletter, subtitle: e.target.value },
                  })
                }
                className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-slate-300 font-semibold mb-1">Email Input Placeholder</label>
              <input
                type="text"
                value={data.newsletter.placeholder}
                onChange={(e) =>
                  onChange({
                    ...data,
                    newsletter: { ...data.newsletter, placeholder: e.target.value },
                  })
                }
                className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: BOTTOM COPYRIGHT & LEGAL */}
      {activeTab === "bottom" && (
        <div className="bg-slate-950 p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-xl space-y-6">
          <div className="border-b border-slate-800 pb-3">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Sliders className="w-4 h-4 text-amber-400" /> Bottom Copyright Bar & Policies
            </h3>
            <p className="text-slate-400 text-xs mt-1">
              Lowest bar on the website containing copyright credits and legal disclaimers.
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Copyright Notice Text</label>
              <input
                type="text"
                value={data.bottomBar.copyright}
                onChange={(e) =>
                  onChange({
                    ...data,
                    bottomBar: { ...data.bottomBar, copyright: e.target.value },
                  })
                }
                className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Secondary Tagline / Made In Badge</label>
              <input
                type="text"
                value={data.bottomBar.madeInText}
                onChange={(e) =>
                  onChange({
                    ...data,
                    bottomBar: { ...data.bottomBar, madeInText: e.target.value },
                  })
                }
                className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      )}
    </form>
  );
}

