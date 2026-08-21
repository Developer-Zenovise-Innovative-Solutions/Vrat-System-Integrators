import { useEffect, useRef, useState } from "react";

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function AnimSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const { ref, inView } = useInView();
  return (
    <div ref={ref} className={`transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${className}`}>
      {children}
    </div>
  );
}

const SERVICES_LIST = [
  "CCTV Surveillance Systems", "Fire Alarm Systems", "Access Control Systems",
  "Time Attendance Systems", "Public Address Systems", "Video Door Phone Systems",
  "Boom Barrier Systems", "Structured Networking", "Home & Building Automation",
  "Annual Maintenance Contract (AMC)", "Site Survey", "General Inquiry",
];

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", company: "", service: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const update = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));

  return (
    <div className="overflow-x-hidden">
      {/* HERO */}
      <section className="relative py-32 gradient-navy overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1423513839306-e99ef55a2e85?w=1920&h=600&fit=crop&auto=format"
            alt="Contact VRAT System Integrators"
            className="w-full h-full object-cover opacity-15"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A1628]/95 to-[#162B56]/80" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-fade-up">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/15 border border-blue-400/25 mb-6">
            <span className="text-blue-300 text-sm font-medium">Get in Touch</span>
          </div>
          <h1 className="font-serif text-5xl lg:text-6xl text-white leading-tight mb-6">
            Let's Discuss Your{" "}
            <span className="text-blue-300">Security Requirements</span>
          </h1>
          <p className="text-blue-100/80 text-xl max-w-2xl mx-auto leading-relaxed">
            Whether you need a site survey, consultation, or more information, our experts are ready to help you build the right security solution.
          </p>
        </div>
      </section>

      {/* CONTACT STRIP */}
      <section className="bg-blue-600 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center text-white">
            {[
              { icon: "📞", label: "Phone", value: "Contact us for details" },
              { icon: "✉️", label: "Email", value: "Contact us for email" },
              { icon: "📍", label: "Location", value: "Across India" },
              { icon: "🕐", label: "Business Hours", value: "Mon–Sat: 9AM–6PM" },
            ].map((c) => (
              <div key={c.label} className="flex flex-col items-center gap-2">
                <span className="text-2xl">{c.icon}</span>
                <div>
                  <div className="text-blue-200 text-xs font-semibold uppercase tracking-wide">{c.label}</div>
                  <div className="text-white text-sm font-medium mt-0.5">{c.value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FORM + INFO */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-16">
            {/* FORM */}
            <div className="lg:col-span-3">
              <AnimSection>
                <h2 className="font-serif text-3xl text-slate-900 mb-2">Send Us a Message</h2>
                <p className="text-slate-600 mb-8">Fill in the form below and our team will get back to you within 24 hours.</p>

                {submitted ? (
                  <div className="bg-green-50 border border-green-200 rounded-2xl p-10 text-center">
                    <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-5">
                      <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="font-bold text-slate-900 text-xl mb-2">Message Sent!</h3>
                    <p className="text-slate-600">Thank you for contacting VRAT System Integrators. Our team will reach out to you shortly.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1.5">Full Name *</label>
                        <input
                          type="text"
                          required
                          value={form.name}
                          onChange={update("name")}
                          placeholder="Your full name"
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-sm transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1.5">Email Address *</label>
                        <input
                          type="email"
                          required
                          value={form.email}
                          onChange={update("email")}
                          placeholder="your@email.com"
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-sm transition-all"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1.5">Phone Number</label>
                        <input
                          type="tel"
                          value={form.phone}
                          onChange={update("phone")}
                          placeholder="Your phone number"
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-sm transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1.5">Company / Organization</label>
                        <input
                          type="text"
                          value={form.company}
                          onChange={update("company")}
                          placeholder="Company name"
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-sm transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">Service Interested In</label>
                      <select
                        value={form.service}
                        onChange={update("service")}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-sm transition-all bg-white"
                      >
                        <option value="">Select a service...</option>
                        {SERVICES_LIST.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">Message *</label>
                      <textarea
                        required
                        rows={5}
                        value={form.message}
                        onChange={update("message")}
                        placeholder="Tell us about your project requirements, site details, or any questions..."
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-sm transition-all resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-600/25 hover:shadow-blue-700/35"
                    >
                      Send Message
                    </button>
                  </form>
                )}
              </AnimSection>
            </div>

            {/* INFO */}
            <div className="lg:col-span-2 space-y-6">
              <AnimSection>
                <div className="bg-[#0A1628] rounded-2xl p-8 text-white">
                  <h3 className="font-bold text-xl mb-6">Why Contact VRAT?</h3>
                  <ul className="space-y-4">
                    {[
                      "Free site survey and consultation",
                      "Customized solution proposals",
                      "Competitive, transparent pricing",
                      "Expert advice from certified engineers",
                      "Fast response within 24 hours",
                      "24×7 ongoing technical support",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-blue-100/80 text-sm">
                        <svg className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimSection>

              <AnimSection>
                <div className="bg-blue-50 rounded-2xl p-8 border border-blue-100">
                  <h3 className="font-bold text-slate-900 text-lg mb-4">Request a Site Survey</h3>
                  <p className="text-slate-600 text-sm mb-5 leading-relaxed">
                    Our engineers will visit your premises to assess your security requirements and provide a detailed proposal at no cost.
                  </p>
                  <div className="space-y-3">
                    {["Assessment of your premises", "Infrastructure evaluation", "Detailed solution proposal", "Competitive quotation"].map((s, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-slate-700">
                        <div className="w-2 h-2 rounded-full bg-blue-600 shrink-0" />
                        {s}
                      </div>
                    ))}
                  </div>
                </div>
              </AnimSection>

              <AnimSection>
                <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm">
                  <h3 className="font-bold text-slate-900 text-lg mb-4">Business Hours</h3>
                  <div className="space-y-2.5 text-sm">
                    <div className="flex justify-between text-slate-600">
                      <span>Monday – Friday</span>
                      <span className="font-medium text-slate-900">9:00 AM – 6:00 PM</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>Saturday</span>
                      <span className="font-medium text-slate-900">9:00 AM – 4:00 PM</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>Sunday</span>
                      <span className="font-medium text-slate-500">Closed</span>
                    </div>
                    <div className="mt-4 pt-4 border-t border-slate-100 flex items-center gap-2 text-blue-600">
                      <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                      <span className="font-semibold text-sm">24×7 Emergency Support Available</span>
                    </div>
                  </div>
                </div>
              </AnimSection>
            </div>
          </div>
        </div>
      </section>

      {/* WHATSAPP CTA */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimSection>
            <div className="bg-white rounded-2xl p-10 shadow-sm border border-slate-100">
              <h3 className="font-serif text-3xl text-slate-900 mb-4">Prefer to Chat?</h3>
              <p className="text-slate-600 mb-6">
                Reach us on WhatsApp for a quick response. Our team is ready to answer your questions.
              </p>
              <a
                href="#"
                className="inline-flex items-center gap-3 px-8 py-4 bg-green-500 hover:bg-green-600 text-white font-bold rounded-xl transition-all shadow-lg shadow-green-500/25"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Chat on WhatsApp
              </a>
            </div>
          </AnimSection>
        </div>
      </section>
    </div>
  );
}
