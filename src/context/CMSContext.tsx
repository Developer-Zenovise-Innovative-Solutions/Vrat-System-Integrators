import React, { createContext, useContext, useState, useEffect } from "react";
import {
  ServiceItem,
  ProductItem,
  IndustrySolution,
  CaseStudy,
  BlogPost,
  FAQItem,
  DownloadItem,
  JobOpening,
  JobApplication,
  LeadItem,
  TestimonialItem,
  PartnerBrand,
  MediaItem,
  PageHeroConfig,
  SEOMetadata,
  GlobalSettings,
  ActivityLog,
} from "../types";
import {
  INITIAL_SETTINGS,
  INITIAL_SERVICES,
  INITIAL_SOLUTIONS,
  INITIAL_PRODUCTS,
  INITIAL_CASE_STUDIES,
  INITIAL_BLOG_POSTS,
  INITIAL_FAQS,
  INITIAL_DOWNLOADS,
  INITIAL_JOBS,
  INITIAL_LEADS,
  INITIAL_TESTIMONIALS,
  INITIAL_PARTNERS,
  INITIAL_HERO_CONFIGS,
  INITIAL_MEDIA_ITEMS,
} from "../data/initialData";

interface CMSContextType {
  settings: GlobalSettings;
  updateSettings: (settings: Partial<GlobalSettings>) => void;

  services: ServiceItem[];
  addService: (s: Omit<ServiceItem, "id">) => void;
  updateService: (id: string, s: Partial<ServiceItem>) => void;
  deleteService: (id: string) => void;

  products: ProductItem[];
  addProduct: (p: Omit<ProductItem, "id">) => void;
  updateProduct: (id: string, p: Partial<ProductItem>) => void;
  deleteProduct: (id: string) => void;

  solutions: IndustrySolution[];
  addSolution: (sol: Omit<IndustrySolution, "id">) => void;
  updateSolution: (id: string, sol: Partial<IndustrySolution>) => void;
  deleteSolution: (id: string) => void;

  caseStudies: CaseStudy[];
  addCaseStudy: (c: Omit<CaseStudy, "id">) => void;
  updateCaseStudy: (id: string, c: Partial<CaseStudy>) => void;
  deleteCaseStudy: (id: string) => void;

  blogs: BlogPost[];
  addBlog: (b: Omit<BlogPost, "id">) => void;
  updateBlog: (id: string, b: Partial<BlogPost>) => void;
  deleteBlog: (id: string) => void;

  faqs: FAQItem[];
  addFAQ: (f: Omit<FAQItem, "id">) => void;
  updateFAQ: (id: string, f: Partial<FAQItem>) => void;
  deleteFAQ: (id: string) => void;

  downloads: DownloadItem[];
  addDownload: (d: Omit<DownloadItem, "id">) => void;
  updateDownload: (id: string, d: Partial<DownloadItem>) => void;
  deleteDownload: (id: string) => void;
  incrementDownloadCount: (id: string) => void;

  jobs: JobOpening[];
  addJob: (j: Omit<JobOpening, "id">) => void;
  updateJob: (id: string, j: Partial<JobOpening>) => void;
  deleteJob: (id: string) => void;

  applications: JobApplication[];
  submitApplication: (app: Omit<JobApplication, "id" | "appliedDate" | "status">) => void;
  updateApplicationStatus: (id: string, status: JobApplication["status"], notes?: string) => void;

  leads: LeadItem[];
  submitLead: (lead: Omit<LeadItem, "id" | "createdDate" | "status">) => void;
  updateLeadStatus: (id: string, status: LeadItem["status"], notes?: string, assignedTo?: string) => void;
  deleteLead: (id: string) => void;

  testimonials: TestimonialItem[];
  addTestimonial: (t: Omit<TestimonialItem, "id">) => void;
  updateTestimonial: (id: string, t: Partial<TestimonialItem>) => void;
  deleteTestimonial: (id: string) => void;

  partners: PartnerBrand[];
  addPartner: (p: Omit<PartnerBrand, "id">) => void;
  updatePartner: (id: string, p: Partial<PartnerBrand>) => void;
  deletePartner: (id: string) => void;

  mediaItems: MediaItem[];
  addMediaItem: (m: Omit<MediaItem, "id" | "uploadedDate">) => void;
  deleteMediaItem: (id: string) => void;
  updateMediaAltText: (id: string, altText: string) => void;

  heroConfigs: Record<string, PageHeroConfig>;
  updateHeroConfig: (pageId: string, config: Partial<PageHeroConfig>) => void;

  seoMetadata: Record<string, SEOMetadata>;
  updateSEOMetadata: (pageId: string, seo: Partial<SEOMetadata>) => void;

  logs: ActivityLog[];
  addLog: (action: string, module: string, details: string) => void;
  resetToDefaults: () => void;
}

const CMSContext = createContext<CMSContextType | undefined>(undefined);

function loadFromStorage<T>(key: string, defaultValue: T): T {
  try {
    const saved = localStorage.getItem(`vrat_cms_${key}`);
    return saved ? JSON.parse(saved) : defaultValue;
  } catch (e) {
    return defaultValue;
  }
}

export function CMSProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<GlobalSettings>(() => loadFromStorage("settings", INITIAL_SETTINGS));
  const [services, setServices] = useState<ServiceItem[]>(() => loadFromStorage("services", INITIAL_SERVICES));
  const [products, setProducts] = useState<ProductItem[]>(() => loadFromStorage("products", INITIAL_PRODUCTS));
  const [solutions, setSolutions] = useState<IndustrySolution[]>(() => loadFromStorage("solutions", INITIAL_SOLUTIONS));
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>(() => loadFromStorage("case_studies", INITIAL_CASE_STUDIES));
  const [blogs, setBlogs] = useState<BlogPost[]>(() => loadFromStorage("blogs", INITIAL_BLOG_POSTS));
  const [faqs, setFaqs] = useState<FAQItem[]>(() => loadFromStorage("faqs", INITIAL_FAQS));
  const [downloads, setDownloads] = useState<DownloadItem[]>(() => loadFromStorage("downloads", INITIAL_DOWNLOADS));
  const [jobs, setJobs] = useState<JobOpening[]>(() => loadFromStorage("jobs", INITIAL_JOBS));
  const [applications, setApplications] = useState<JobApplication[]>(() => loadFromStorage("applications", []));
  const [leads, setLeads] = useState<LeadItem[]>(() => loadFromStorage("leads", INITIAL_LEADS));
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>(() => loadFromStorage("testimonials", INITIAL_TESTIMONIALS));
  const [partners, setPartners] = useState<PartnerBrand[]>(() => loadFromStorage("partners", INITIAL_PARTNERS));
  const [mediaItems, setMediaItems] = useState<MediaItem[]>(() => loadFromStorage("media", INITIAL_MEDIA_ITEMS));
  const [heroConfigs, setHeroConfigs] = useState<Record<string, PageHeroConfig>>(() => loadFromStorage("heroes", INITIAL_HERO_CONFIGS));
  const [seoMetadata, setSeoMetadata] = useState<Record<string, SEOMetadata>>(() => loadFromStorage("seo", {}));
  const [logs, setLogs] = useState<ActivityLog[]>(() => loadFromStorage("logs", [
    { id: "log-1", user: "Rajesh Sharma", role: "Super Admin", action: "System Initialized", module: "System", details: "All 29 website content modules and CMS tables initialized.", timestamp: "2026-08-24 09:00" }
  ]));

  // Auto-sync state changes to localStorage
  useEffect(() => { localStorage.setItem("vrat_cms_settings", JSON.stringify(settings)); }, [settings]);
  useEffect(() => { localStorage.setItem("vrat_cms_services", JSON.stringify(services)); }, [services]);
  useEffect(() => { localStorage.setItem("vrat_cms_products", JSON.stringify(products)); }, [products]);
  useEffect(() => { localStorage.setItem("vrat_cms_solutions", JSON.stringify(solutions)); }, [solutions]);
  useEffect(() => { localStorage.setItem("vrat_cms_case_studies", JSON.stringify(caseStudies)); }, [caseStudies]);
  useEffect(() => { localStorage.setItem("vrat_cms_blogs", JSON.stringify(blogs)); }, [blogs]);
  useEffect(() => { localStorage.setItem("vrat_cms_faqs", JSON.stringify(faqs)); }, [faqs]);
  useEffect(() => { localStorage.setItem("vrat_cms_downloads", JSON.stringify(downloads)); }, [downloads]);
  useEffect(() => { localStorage.setItem("vrat_cms_jobs", JSON.stringify(jobs)); }, [jobs]);
  useEffect(() => { localStorage.setItem("vrat_cms_applications", JSON.stringify(applications)); }, [applications]);
  useEffect(() => { localStorage.setItem("vrat_cms_leads", JSON.stringify(leads)); }, [leads]);
  useEffect(() => { localStorage.setItem("vrat_cms_testimonials", JSON.stringify(testimonials)); }, [testimonials]);
  useEffect(() => { localStorage.setItem("vrat_cms_partners", JSON.stringify(partners)); }, [partners]);
  useEffect(() => { localStorage.setItem("vrat_cms_media", JSON.stringify(mediaItems)); }, [mediaItems]);
  useEffect(() => { localStorage.setItem("vrat_cms_heroes", JSON.stringify(heroConfigs)); }, [heroConfigs]);
  useEffect(() => { localStorage.setItem("vrat_cms_seo", JSON.stringify(seoMetadata)); }, [seoMetadata]);
  useEffect(() => { localStorage.setItem("vrat_cms_logs", JSON.stringify(logs)); }, [logs]);

  const addLog = (action: string, module: string, details: string) => {
    const newLog: ActivityLog = {
      id: "log-" + Date.now(),
      user: "Admin",
      role: "Super Admin",
      action,
      module,
      details,
      timestamp: new Date().toLocaleString(),
    };
    setLogs((prev) => [newLog, ...prev.slice(0, 49)]);
  };

  const updateSettings = (newSettings: Partial<GlobalSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
    addLog("Updated Settings", "Settings", "Global company info or social links updated");
  };

  // Service CRUD
  const addService = (s: Omit<ServiceItem, "id">) => {
    const newItem: ServiceItem = { ...s, id: "srv-" + Date.now() };
    setServices((prev) => [...prev, newItem]);
    addLog("Added Service", "Services", `Created service "${s.title}"`);
  };
  const updateService = (id: string, s: Partial<ServiceItem>) => {
    setServices((prev) => prev.map((item) => (item.id === id ? { ...item, ...s } : item)));
    addLog("Updated Service", "Services", `Updated service ID: ${id}`);
  };
  const deleteService = (id: string) => {
    setServices((prev) => prev.filter((item) => item.id !== id));
    addLog("Deleted Service", "Services", `Deleted service ID: ${id}`);
  };

  // Product CRUD
  const addProduct = (p: Omit<ProductItem, "id">) => {
    const newItem: ProductItem = { ...p, id: "prod-" + Date.now() };
    setProducts((prev) => [newItem, ...prev]);
    addLog("Added Product", "Products", `Added product "${p.name}"`);
  };
  const updateProduct = (id: string, p: Partial<ProductItem>) => {
    setProducts((prev) => prev.map((item) => (item.id === id ? { ...item, ...p } : item)));
    addLog("Updated Product", "Products", `Updated product ID: ${id}`);
  };
  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((item) => item.id !== id));
    addLog("Deleted Product", "Products", `Deleted product ID: ${id}`);
  };

  // Solutions CRUD
  const addSolution = (sol: Omit<IndustrySolution, "id">) => {
    const newItem: IndustrySolution = { ...sol, id: "sol-" + Date.now() };
    setSolutions((prev) => [...prev, newItem]);
    addLog("Added Industry Solution", "Solutions", `Added solution "${sol.title}"`);
  };
  const updateSolution = (id: string, sol: Partial<IndustrySolution>) => {
    setSolutions((prev) => prev.map((item) => (item.id === id ? { ...item, ...sol } : item)));
    addLog("Updated Industry Solution", "Solutions", `Updated solution ID: ${id}`);
  };
  const deleteSolution = (id: string) => {
    setSolutions((prev) => prev.filter((item) => item.id !== id));
    addLog("Deleted Industry Solution", "Solutions", `Deleted solution ID: ${id}`);
  };

  // Case Studies CRUD
  const addCaseStudy = (c: Omit<CaseStudy, "id">) => {
    const newItem: CaseStudy = { ...c, id: "case-" + Date.now() };
    setCaseStudies((prev) => [newItem, ...prev]);
    addLog("Added Case Study", "Projects", `Added case study "${c.title}"`);
  };
  const updateCaseStudy = (id: string, c: Partial<CaseStudy>) => {
    setCaseStudies((prev) => prev.map((item) => (item.id === id ? { ...item, ...c } : item)));
    addLog("Updated Case Study", "Projects", `Updated case study ID: ${id}`);
  };
  const deleteCaseStudy = (id: string) => {
    setCaseStudies((prev) => prev.filter((item) => item.id !== id));
    addLog("Deleted Case Study", "Projects", `Deleted case study ID: ${id}`);
  };

  // Blog CRUD
  const addBlog = (b: Omit<BlogPost, "id">) => {
    const newItem: BlogPost = { ...b, id: "blog-" + Date.now() };
    setBlogs((prev) => [newItem, ...prev]);
    addLog("Added Blog Post", "Blog", `Published blog "${b.title}"`);
  };
  const updateBlog = (id: string, b: Partial<BlogPost>) => {
    setBlogs((prev) => prev.map((item) => (item.id === id ? { ...item, ...b } : item)));
    addLog("Updated Blog Post", "Blog", `Updated blog post ID: ${id}`);
  };
  const deleteBlog = (id: string) => {
    setBlogs((prev) => prev.filter((item) => item.id !== id));
    addLog("Deleted Blog Post", "Blog", `Deleted blog post ID: ${id}`);
  };

  // FAQ CRUD
  const addFAQ = (f: Omit<FAQItem, "id">) => {
    const newItem: FAQItem = { ...f, id: "faq-" + Date.now() };
    setFaqs((prev) => [...prev, newItem]);
    addLog("Added FAQ", "FAQs", `Added FAQ: "${f.question.slice(0, 30)}..."`);
  };
  const updateFAQ = (id: string, f: Partial<FAQItem>) => {
    setFaqs((prev) => prev.map((item) => (item.id === id ? { ...item, ...f } : item)));
    addLog("Updated FAQ", "FAQs", `Updated FAQ ID: ${id}`);
  };
  const deleteFAQ = (id: string) => {
    setFaqs((prev) => prev.filter((item) => item.id !== id));
    addLog("Deleted FAQ", "FAQs", `Deleted FAQ ID: ${id}`);
  };

  // Downloads CRUD
  const addDownload = (d: Omit<DownloadItem, "id">) => {
    const newItem: DownloadItem = { ...d, id: "dl-" + Date.now() };
    setDownloads((prev) => [newItem, ...prev]);
    addLog("Added Download Document", "Downloads", `Uploaded file "${d.title}"`);
  };
  const updateDownload = (id: string, d: Partial<DownloadItem>) => {
    setDownloads((prev) => prev.map((item) => (item.id === id ? { ...item, ...d } : item)));
    addLog("Updated Download Document", "Downloads", `Updated download ID: ${id}`);
  };
  const deleteDownload = (id: string) => {
    setDownloads((prev) => prev.filter((item) => item.id !== id));
    addLog("Deleted Download Document", "Downloads", `Deleted download ID: ${id}`);
  };
  const incrementDownloadCount = (id: string) => {
    setDownloads((prev) =>
      prev.map((item) => (item.id === id ? { ...item, downloadsCount: (item.downloadsCount || 0) + 1 } : item))
    );
  };

  // Careers CRUD
  const addJob = (j: Omit<JobOpening, "id">) => {
    const newItem: JobOpening = { ...j, id: "job-" + Date.now() };
    setJobs((prev) => [newItem, ...prev]);
    addLog("Created Job Opening", "Careers", `Posted job "${j.title}"`);
  };
  const updateJob = (id: string, j: Partial<JobOpening>) => {
    setJobs((prev) => prev.map((item) => (item.id === id ? { ...item, ...j } : item)));
    addLog("Updated Job Opening", "Careers", `Updated job ID: ${id}`);
  };
  const deleteJob = (id: string) => {
    setJobs((prev) => prev.filter((item) => item.id !== id));
    addLog("Deleted Job Opening", "Careers", `Deleted job ID: ${id}`);
  };
  const submitApplication = (app: Omit<JobApplication, "id" | "appliedDate" | "status">) => {
    const newApp: JobApplication = {
      ...app,
      id: "app-" + Date.now(),
      appliedDate: new Date().toLocaleString(),
      status: "New",
    };
    setApplications((prev) => [newApp, ...prev]);
    addLog("New Job Application", "Careers", `Candidate ${app.fullName} applied for ${app.jobTitle}`);
  };
  const updateApplicationStatus = (id: string, status: JobApplication["status"], notes?: string) => {
    setApplications((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status, notes: notes || item.notes } : item))
    );
    addLog("Application Status Changed", "Careers", `Application ${id} marked as ${status}`);
  };

  // Leads CRM
  const submitLead = (lead: Omit<LeadItem, "id" | "createdDate" | "status">) => {
    const newLead: LeadItem = {
      ...lead,
      id: "lead-" + Date.now(),
      createdDate: new Date().toLocaleString(),
      status: "New",
    };
    setLeads((prev) => [newLead, ...prev]);
    addLog("New Inbound Lead", "Leads", `${lead.type} from ${lead.name} (${lead.company || "Individual"})`);
  };
  const updateLeadStatus = (id: string, status: LeadItem["status"], notes?: string, assignedTo?: string) => {
    setLeads((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              status,
              notes: notes !== undefined ? notes : item.notes,
              assignedTo: assignedTo !== undefined ? assignedTo : item.assignedTo,
            }
          : item
      )
    );
    addLog("Lead Status Updated", "Leads", `Lead ${id} updated to ${status}`);
  };
  const deleteLead = (id: string) => {
    setLeads((prev) => prev.filter((item) => item.id !== id));
    addLog("Deleted Lead", "Leads", `Deleted lead record ${id}`);
  };

  // Testimonials CRUD
  const addTestimonial = (t: Omit<TestimonialItem, "id">) => {
    const newItem: TestimonialItem = { ...t, id: "t-" + Date.now() };
    setTestimonials((prev) => [newItem, ...prev]);
    addLog("Added Testimonial", "Testimonials", `Added testimonial from ${t.name}`);
  };
  const updateTestimonial = (id: string, t: Partial<TestimonialItem>) => {
    setTestimonials((prev) => prev.map((item) => (item.id === id ? { ...item, ...t } : item)));
    addLog("Updated Testimonial", "Testimonials", `Updated testimonial ${id}`);
  };
  const deleteTestimonial = (id: string) => {
    setTestimonials((prev) => prev.filter((item) => item.id !== id));
    addLog("Deleted Testimonial", "Testimonials", `Deleted testimonial ${id}`);
  };

  // Partners CRUD
  const addPartner = (p: Omit<PartnerBrand, "id">) => {
    const newItem: PartnerBrand = { ...p, id: "p-" + Date.now() };
    setPartners((prev) => [...prev, newItem]);
    addLog("Added Partner Brand", "Partners", `Added partner ${p.name}`);
  };
  const updatePartner = (id: string, p: Partial<PartnerBrand>) => {
    setPartners((prev) => prev.map((item) => (item.id === id ? { ...item, ...p } : item)));
    addLog("Updated Partner Brand", "Partners", `Updated partner ${id}`);
  };
  const deletePartner = (id: string) => {
    setPartners((prev) => prev.filter((item) => item.id !== id));
    addLog("Deleted Partner Brand", "Partners", `Deleted partner ${id}`);
  };

  // Media CRUD
  const addMediaItem = (m: Omit<MediaItem, "id" | "uploadedDate">) => {
    const newItem: MediaItem = {
      ...m,
      id: "media-" + Date.now(),
      uploadedDate: new Date().toISOString().split("T")[0],
    };
    setMediaItems((prev) => [newItem, ...prev]);
    addLog("Uploaded Media", "Media", `Added media file ${m.filename}`);
  };
  const deleteMediaItem = (id: string) => {
    setMediaItems((prev) => prev.filter((item) => item.id !== id));
    addLog("Deleted Media", "Media", `Removed media item ${id}`);
  };
  const updateMediaAltText = (id: string, altText: string) => {
    setMediaItems((prev) => prev.map((item) => (item.id === id ? { ...item, altText } : item)));
    addLog("Updated Media Alt Text", "Media", `Updated SEO alt text for ${id}`);
  };

  // Page Hero Builder
  const updateHeroConfig = (pageId: string, config: Partial<PageHeroConfig>) => {
    setHeroConfigs((prev) => ({
      ...prev,
      [pageId]: { ...prev[pageId], ...config },
    }));
    addLog("Updated Page Hero", "Page Builder", `Modified Hero Section on page: ${pageId}`);
  };

  // SEO
  const updateSEOMetadata = (pageId: string, seo: Partial<SEOMetadata>) => {
    setSeoMetadata((prev) => ({
      ...prev,
      [pageId]: { ...prev[pageId], ...seo },
    }));
    addLog("Updated SEO Metadata", "SEO", `Modified SEO settings for: ${pageId}`);
  };

  const resetToDefaults = () => {
    localStorage.clear();
    setSettings(INITIAL_SETTINGS);
    setServices(INITIAL_SERVICES);
    setProducts(INITIAL_PRODUCTS);
    setSolutions(INITIAL_SOLUTIONS);
    setCaseStudies(INITIAL_CASE_STUDIES);
    setBlogs(INITIAL_BLOG_POSTS);
    setFaqs(INITIAL_FAQS);
    setDownloads(INITIAL_DOWNLOADS);
    setJobs(INITIAL_JOBS);
    setApplications([]);
    setLeads(INITIAL_LEADS);
    setTestimonials(INITIAL_TESTIMONIALS);
    setPartners(INITIAL_PARTNERS);
    setMediaItems(INITIAL_MEDIA_ITEMS);
    setHeroConfigs(INITIAL_HERO_CONFIGS);
    setSeoMetadata({});
    addLog("System Reset", "System", "Restored all database tables to factory defaults.");
  };

  return (
    <CMSContext.Provider
      value={{
        settings,
        updateSettings,
        services,
        addService,
        updateService,
        deleteService,
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        solutions,
        addSolution,
        updateSolution,
        deleteSolution,
        caseStudies,
        addCaseStudy,
        updateCaseStudy,
        deleteCaseStudy,
        blogs,
        addBlog,
        updateBlog,
        deleteBlog,
        faqs,
        addFAQ,
        updateFAQ,
        deleteFAQ,
        downloads,
        addDownload,
        updateDownload,
        deleteDownload,
        incrementDownloadCount,
        jobs,
        addJob,
        updateJob,
        deleteJob,
        applications,
        submitApplication,
        updateApplicationStatus,
        leads,
        submitLead,
        updateLeadStatus,
        deleteLead,
        testimonials,
        addTestimonial,
        updateTestimonial,
        deleteTestimonial,
        partners,
        addPartner,
        updatePartner,
        deletePartner,
        mediaItems,
        addMediaItem,
        deleteMediaItem,
        updateMediaAltText,
        heroConfigs,
        updateHeroConfig,
        seoMetadata,
        updateSEOMetadata,
        logs,
        addLog,
        resetToDefaults,
      }}
    >
      {children}
    </CMSContext.Provider>
  );
}

export function useCMS() {
  const context = useContext(CMSContext);
  if (!context) {
    throw new Error("useCMS must be used within a CMSProvider");
  }
  return context;
}
