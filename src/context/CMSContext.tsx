import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
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
  HomePageData,
  AboutPageData,
  ServicesPageData,
  FooterData,
  SolutionsPageData,
  ProductsPageData,
  ProjectsPageData,
  GalleryPageData,
  BlogPageData,
  ContactPageData,
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
  INITIAL_HOME_PAGE_DATA,
  INITIAL_ABOUT_PAGE_DATA,
  INITIAL_SERVICES_PAGE_DATA,
  INITIAL_FOOTER_DATA,
  INITIAL_SOLUTIONS_PAGE_DATA,
  INITIAL_PRODUCTS_PAGE_DATA,
  INITIAL_PROJECTS_PAGE_DATA,
  INITIAL_GALLERY_PAGE_DATA,
  INITIAL_BLOG_PAGE_DATA,
  INITIAL_CONTACT_PAGE_DATA,
} from "../data/initialData";
import { supabase, isSupabaseConfigured } from "../lib/supabase";

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

  homePageData: HomePageData;
  updateHomePageData: (data: Partial<HomePageData>) => Promise<void>;

  aboutPageData: AboutPageData;
  updateAboutPageData: (data: Partial<AboutPageData>) => Promise<void>;

  servicesPageData: ServicesPageData;
  updateServicesPageData: (data: Partial<ServicesPageData>) => Promise<void>;

  footerData: FooterData;
  updateFooterData: (data: Partial<FooterData>) => Promise<void>;

  solutionsPageData: SolutionsPageData;
  updateSolutionsPageData: (data: Partial<SolutionsPageData>) => Promise<void>;

  productsPageData: ProductsPageData;
  updateProductsPageData: (data: Partial<ProductsPageData>) => Promise<void>;

  projectsPageData: ProjectsPageData;
  updateProjectsPageData: (data: Partial<ProjectsPageData>) => Promise<void>;

  galleryPageData: GalleryPageData;
  updateGalleryPageData: (data: Partial<GalleryPageData>) => Promise<void>;

  blogPageData: BlogPageData;
  updateBlogPageData: (data: Partial<BlogPageData>) => Promise<void>;

  contactPageData: ContactPageData;
  updateContactPageData: (data: Partial<ContactPageData>) => Promise<void>;

  seoMetadata: Record<string, SEOMetadata>;
  updateSEOMetadata: (pageId: string, seo: Partial<SEOMetadata>) => void;

  logs: ActivityLog[];
  addLog: (action: string, module: string, details: string) => void;
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
  resetToDefaults: () => void;
}

const CMSContext = createContext<CMSContextType | undefined>(undefined);

function loadFromStorage<T>(key: string, defaultValue: T): T {
  try {
    const saved = localStorage.getItem(`vrat_cms_${key}`);
    if (key === "products" && saved) {
      const parsed = JSON.parse(saved);
      if (!Array.isArray(parsed) || parsed.length < 50) {
        localStorage.setItem(`vrat_cms_products`, JSON.stringify(defaultValue));
        return defaultValue;
      }
      return parsed as T;
    }
    return saved ? JSON.parse(saved) : defaultValue;
  } catch (e) {
    return defaultValue;
  }
}

// ============================================================================
// Database Converters (Snake Case DB Columns <-> CamelCase React Types)
// ============================================================================
const mapHeroFromDB = (row: any): PageHeroConfig => ({
  pageId: row.page_id,
  pageName: row.page_name || row.page_id,
  heading: row.heading || "",
  subtitle: row.subtitle || "",
  backgroundImage: row.background_image || "",
  primaryCtaText: row.primary_cta_text || "",
  primaryCtaLink: row.primary_cta_link || "",
  secondaryCtaText: row.secondary_cta_text || "",
  secondaryCtaLink: row.secondary_cta_link || "",
  showSection: row.show_section !== false,
  status: (row.status as "Published" | "Draft") || "Published",
});

const mapHeroToDB = (h: PageHeroConfig) => ({
  page_id: h.pageId,
  page_name: h.pageName,
  heading: h.heading,
  subtitle: h.subtitle,
  background_image: h.backgroundImage,
  primary_cta_text: h.primaryCtaText,
  primary_cta_link: h.primaryCtaLink,
  secondary_cta_text: h.secondaryCtaText,
  secondary_cta_link: h.secondaryCtaLink,
  show_section: h.showSection,
  status: h.status,
  updated_at: new Date().toISOString(),
});

const mapSettingsFromDB = (row: any, prev: GlobalSettings): GlobalSettings => {
  const jsonConfig = (typeof row.social_links === "object" && row.social_links) || {};
  return {
    companyName: row.company_name || prev.companyName,
    tagline: row.tagline || prev.tagline,
    websiteUrl: jsonConfig.website || prev.websiteUrl || "https://vratsystems.com/",
    logoUrl: jsonConfig.logo_url || prev.logoUrl || "",
    primaryEmail: row.primary_email || prev.primaryEmail,
    secondaryEmail: jsonConfig.secondary_email || prev.secondaryEmail || "Nimeshpatel.VSI@gmail.com",
    salesEmail: row.sales_email || prev.salesEmail,
    supportEmail: row.support_email || prev.supportEmail,
    careersEmail: row.careers_email || prev.careersEmail,
    phone: row.phone || prev.phone,
    emergencyHotline: row.emergency_hotline || prev.emergencyHotline,
    whatsappNumber: row.whatsapp_number || prev.whatsappNumber,
    address: row.address || prev.address,
    cityStateZip: row.city_state_zip || prev.cityStateZip,
    headOfficeAddress: jsonConfig.head_office_address || prev.headOfficeAddress,
    branchOfficeAddress: jsonConfig.branch_office_address || prev.branchOfficeAddress,
    locations: Array.isArray(jsonConfig.locations) && jsonConfig.locations.length > 0 
      ? jsonConfig.locations 
      : (prev.locations && prev.locations.length > 0 ? prev.locations : (INITIAL_SETTINGS.locations || [])),
    businessHours: row.business_hours || prev.businessHours,
    googleMapsUrl: row.google_maps_url || prev.googleMapsUrl,
    socialLinks: jsonConfig.social_profiles || {
      linkedin: jsonConfig.linkedin || prev.socialLinks?.linkedin || "https://linkedin.com/company/vratsystem",
      facebook: jsonConfig.facebook || prev.socialLinks?.facebook || "https://facebook.com/vratsystem",
      instagram: jsonConfig.instagram || prev.socialLinks?.instagram || "https://instagram.com/vratsystem",
      youtube: jsonConfig.youtube || prev.socialLinks?.youtube || "https://youtube.com/@vratsystem",
      twitter: jsonConfig.twitter || prev.socialLinks?.twitter || "https://x.com/vratsystem",
    },
    maintenanceMode: Boolean(row.maintenance_mode),
  };
};

const mapSettingsToDB = (s: GlobalSettings) => ({
  id: "global_config",
  company_name: s.companyName,
  tagline: s.tagline,
  primary_email: s.primaryEmail,
  sales_email: s.salesEmail,
  support_email: s.supportEmail,
  careers_email: s.careersEmail,
  phone: s.phone,
  emergency_hotline: s.emergencyHotline,
  whatsapp_number: s.whatsappNumber,
  address: s.address,
  city_state_zip: s.cityStateZip,
  business_hours: s.businessHours,
  google_maps_url: s.googleMapsUrl,
  social_links: {
    website: s.websiteUrl || "https://vratsystems.com/",
    logo_url: s.logoUrl || "",
    secondary_email: s.secondaryEmail,
    head_office_address: s.headOfficeAddress,
    branch_office_address: s.branchOfficeAddress,
    locations: s.locations || [],
    social_profiles: s.socialLinks,
    ...s.socialLinks,
  },
  maintenance_mode: s.maintenanceMode,
  updated_at: new Date().toISOString(),
});

const mapServiceFromDB = (row: any): ServiceItem => ({
  id: row.id,
  slug: row.slug,
  title: row.title,
  shortDesc: row.short_desc || "",
  overview: row.overview || "",
  icon: row.icon || "Camera",
  image: row.image || "",
  features: Array.isArray(row.features) ? row.features : [],
  benefits: Array.isArray(row.benefits) ? row.benefits : [],
  applications: Array.isArray(row.applications) ? row.applications : [],
  solutionTypes: Array.isArray(row.solution_types) ? row.solution_types : [],
  status: row.status || "Published",
  displayOrder: row.display_order || 0,
});

const mapServiceToDB = (s: ServiceItem) => ({
  id: s.id,
  slug: s.slug,
  title: s.title,
  short_desc: s.shortDesc,
  overview: s.overview,
  icon: s.icon,
  image: s.image,
  features: s.features,
  benefits: s.benefits,
  applications: s.applications,
  solution_types: s.solutionTypes,
  status: s.status,
  display_order: s.displayOrder,
  updated_at: new Date().toISOString(),
});

const mapProductFromDB = (row: any): ProductItem => ({
  id: row.id,
  name: row.name,
  category: row.category,
  brand: row.brand,
  image: row.image || "",
  tagline: row.tagline || "",
  features: Array.isArray(row.features) ? row.features : [],
  applications: Array.isArray(row.applications) ? row.applications : [],
  specs: typeof row.specs === "object" && row.specs ? row.specs : {},
  datasheetUrl: row.datasheet_url,
  isFeatured: Boolean(row.is_featured),
  status: row.status || "Published",
});

const mapProductToDB = (p: ProductItem) => ({
  id: p.id,
  name: p.name,
  category: p.category,
  brand: p.brand,
  image: p.image,
  tagline: p.tagline,
  features: p.features,
  applications: p.applications,
  specs: p.specs,
  datasheet_url: p.datasheetUrl,
  is_featured: p.isFeatured,
  status: p.status,
  updated_at: new Date().toISOString(),
});

const mapSolutionFromDB = (row: any): IndustrySolution => ({
  id: row.id,
  slug: row.slug,
  title: row.title,
  subtitle: row.subtitle || "",
  description: row.description || "",
  icon: row.icon || "Building2",
  image: row.image || "",
  heroImage: row.hero_image,
  challenges: Array.isArray(row.challenges) ? row.challenges : [],
  solutionsProvided: Array.isArray(row.solutions_provided) ? row.solutions_provided : [],
  keyFeatures: Array.isArray(row.key_features) ? row.key_features : [],
  architectureSteps: Array.isArray(row.architecture_steps) ? row.architecture_steps : [],
  successMetrics: Array.isArray(row.success_metrics) ? row.success_metrics : [],
  testimonial: row.testimonial,
  caseStudyRef: row.case_study_ref,
  status: row.status || "Published",
});

const mapSolutionToDB = (s: IndustrySolution) => ({
  id: s.id,
  slug: s.slug,
  title: s.title,
  subtitle: s.subtitle,
  description: s.description,
  icon: s.icon,
  image: s.image,
  hero_image: s.heroImage,
  challenges: s.challenges,
  solutions_provided: s.solutionsProvided,
  key_features: s.keyFeatures,
  architecture_steps: s.architectureSteps,
  success_metrics: s.successMetrics,
  testimonial: s.testimonial,
  case_study_ref: s.caseStudyRef,
  status: s.status,
  updated_at: new Date().toISOString(),
});

const mapCaseFromDB = (row: any): CaseStudy => ({
  id: row.id,
  title: row.title,
  clientType: row.client_type,
  industry: row.industry,
  location: row.location,
  year: row.year,
  projectSize: row.project_size,
  technologyUsed: Array.isArray(row.technology_used) ? row.technology_used : [],
  shortDesc: row.short_desc || "",
  challenge: row.challenge || "",
  solution: row.solution || "",
  results: Array.isArray(row.results) ? row.results : [],
  image: row.image || "",
  beforeImage: row.before_image,
  afterImage: row.after_image,
  testimonial: row.testimonial,
  status: row.status || "Published",
});

const mapCaseToDB = (c: CaseStudy) => ({
  id: c.id,
  title: c.title,
  client_type: c.clientType,
  industry: c.industry,
  location: c.location,
  year: c.year,
  project_size: c.projectSize,
  technology_used: c.technologyUsed,
  short_desc: c.shortDesc,
  challenge: c.challenge,
  solution: c.solution,
  results: c.results,
  image: c.image,
  before_image: c.beforeImage,
  after_image: c.afterImage,
  testimonial: c.testimonial,
  status: c.status,
  updated_at: new Date().toISOString(),
});

const mapBlogFromDB = (row: any): BlogPost => ({
  id: row.id,
  slug: row.slug,
  title: row.title,
  category: row.category,
  author: row.author,
  authorRole: row.author_role || "",
  authorAvatar: row.author_avatar || "",
  publishDate: row.publish_date || "",
  readTime: row.read_time || "5 min read",
  excerpt: row.excerpt || "",
  content: row.content || "",
  featuredImage: row.featured_image || "",
  tags: Array.isArray(row.tags) ? row.tags : [],
  relatedServices: Array.isArray(row.related_services) ? row.related_services : [],
  isFeatured: Boolean(row.is_featured),
  status: row.status || "Published",
});

const mapBlogToDB = (b: BlogPost) => ({
  id: b.id,
  slug: b.slug,
  title: b.title,
  category: b.category,
  author: b.author,
  author_role: b.authorRole,
  author_avatar: b.authorAvatar,
  publish_date: b.publishDate,
  read_time: b.readTime,
  excerpt: b.excerpt,
  content: b.content,
  featured_image: b.featuredImage,
  tags: b.tags,
  related_services: b.relatedServices,
  is_featured: b.isFeatured,
  status: b.status,
  updated_at: new Date().toISOString(),
});

const mapFaqFromDB = (row: any): FAQItem => ({
  id: row.id,
  category: row.category,
  question: row.question,
  answer: row.answer,
  displayOrder: row.display_order || 0,
  status: row.status || "Published",
});

const mapFaqToDB = (f: FAQItem) => ({
  id: f.id,
  category: f.category,
  question: f.question,
  answer: f.answer,
  display_order: f.displayOrder,
  status: f.status,
  updated_at: new Date().toISOString(),
});

const mapDownloadFromDB = (row: any): DownloadItem => ({
  id: row.id,
  title: row.title,
  category: row.category,
  description: row.description || "",
  fileType: row.file_type || "PDF",
  fileSize: row.file_size || "",
  version: row.version || "v1.0",
  updatedDate: row.updated_date || "",
  downloadUrl: row.download_url || "",
  downloadsCount: row.downloads_count || 0,
  status: row.status || "Published",
});

const mapDownloadToDB = (d: DownloadItem) => ({
  id: d.id,
  title: d.title,
  category: d.category,
  description: d.description,
  file_type: d.fileType,
  file_size: d.fileSize,
  version: d.version,
  updated_date: d.updatedDate,
  download_url: d.downloadUrl,
  downloads_count: d.downloadsCount,
  status: d.status,
  updated_at: new Date().toISOString(),
});

const mapJobFromDB = (row: any): JobOpening => ({
  id: row.id,
  title: row.title,
  department: row.department,
  location: row.location,
  type: row.type || "Full-Time",
  experience: row.experience || "",
  qualification: row.qualification || "",
  salary: row.salary || "",
  description: row.description || "",
  responsibilities: Array.isArray(row.responsibilities) ? row.responsibilities : [],
  requirements: Array.isArray(row.requirements) ? row.requirements : [],
  benefits: Array.isArray(row.benefits) ? row.benefits : [],
  deadline: row.deadline || "Open",
  status: row.status || "Published",
});

const mapJobToDB = (j: JobOpening) => ({
  id: j.id,
  title: j.title,
  department: j.department,
  location: j.location,
  type: j.type,
  experience: j.experience,
  qualification: j.qualification,
  salary: j.salary,
  description: j.description,
  responsibilities: j.responsibilities,
  requirements: j.requirements,
  benefits: j.benefits,
  deadline: j.deadline,
  status: j.status,
  updated_at: new Date().toISOString(),
});

const safeToISO = (val?: string) => {
  if (!val) return new Date().toISOString();
  if (val.includes("T") && (val.endsWith("Z") || val.includes("+"))) return val;
  const parsed = Date.parse(val);
  if (!isNaN(parsed)) return new Date(parsed).toISOString();
  const d = new Date(val.replace(" ", "T"));
  if (!isNaN(d.getTime())) return d.toISOString();
  return new Date().toISOString();
};

const mapLeadFromDB = (row: any): LeadItem => ({
  id: row.id,
  type: row.type || "Inquiry",
  name: row.name,
  company: row.company,
  email: row.email,
  phone: row.phone,
  city: row.city,
  serviceOrProduct: row.service_or_product,
  projectType: row.project_type,
  estimatedSize: row.estimated_size,
  message: row.message || "",
  preferredDate: row.preferred_date,
  preferredTime: row.preferred_time,
  preferredContactMethod: row.preferred_contact_method,
  attachmentName: row.attachment_name,
  status: row.status || "New",
  assignedTo: row.assigned_to,
  notes: row.notes,
  createdDate: row.created_date ? new Date(row.created_date).toLocaleString("en-IN") : new Date().toLocaleString("en-IN"),
});

const mapLeadToDB = (l: LeadItem) => ({
  id: l.id,
  type: l.type,
  name: l.name,
  company: l.company,
  email: l.email,
  phone: l.phone,
  city: l.city,
  service_or_product: l.serviceOrProduct,
  project_type: l.projectType,
  estimated_size: l.estimatedSize,
  message: l.message,
  preferred_date: l.preferredDate,
  preferred_time: l.preferredTime,
  preferred_contact_method: l.preferredContactMethod,
  attachment_name: l.attachmentName,
  status: l.status,
  assigned_to: l.assignedTo,
  notes: l.notes,
  created_date: safeToISO(l.createdDate),
});

const mapTestimonialFromDB = (row: any): TestimonialItem => ({
  id: row.id,
  name: row.name,
  designation: row.designation || "",
  company: row.company || "",
  industry: row.industry || "",
  quote: row.quote,
  rating: row.rating || 5,
  avatar: row.avatar || "",
  isFeatured: Boolean(row.is_featured),
  status: row.status || "Published",
});

const mapTestimonialToDB = (t: TestimonialItem) => ({
  id: t.id,
  name: t.name,
  designation: t.designation,
  company: t.company,
  industry: t.industry,
  quote: t.quote,
  rating: t.rating,
  avatar: t.avatar,
  is_featured: t.isFeatured,
  status: t.status,
  updated_at: new Date().toISOString(),
});

const mapPartnerFromDB = (row: any): PartnerBrand => ({
  id: row.id,
  name: row.name,
  category: row.category || "",
  logo: row.logo || "",
  websiteUrl: row.website_url || "",
  order: row.display_order || 0,
  active: row.active !== false,
});

const mapPartnerToDB = (p: PartnerBrand) => ({
  id: p.id,
  name: p.name,
  category: p.category,
  logo: p.logo,
  website_url: p.websiteUrl,
  display_order: p.order,
  active: p.active,
});

const mapMediaFromDB = (row: any): MediaItem => ({
  id: row.id,
  filename: row.filename,
  url: row.url,
  type: row.type || "image",
  size: row.size || "",
  dimensions: row.dimensions || "",
  altText: row.alt_text || "",
  category: row.category || "General",
  uploadedDate: row.uploaded_date || "",
});

const mapMediaToDB = (m: MediaItem) => ({
  id: m.id,
  filename: m.filename,
  url: m.url,
  type: m.type,
  size: m.size,
  dimensions: m.dimensions,
  alt_text: m.altText,
  category: m.category,
  uploaded_date: m.uploadedDate,
});

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
  const [homePageData, setHomePageData] = useState<HomePageData>(() => loadFromStorage("home_page_data", INITIAL_HOME_PAGE_DATA));
  const [aboutPageData, setAboutPageData] = useState<AboutPageData>(() => loadFromStorage("about_page_data", INITIAL_ABOUT_PAGE_DATA));
  const [servicesPageData, setServicesPageData] = useState<ServicesPageData>(() => loadFromStorage("services_page_data", INITIAL_SERVICES_PAGE_DATA));
  const [footerData, setFooterData] = useState<FooterData>(() => loadFromStorage("footer_data", INITIAL_FOOTER_DATA));
  const [solutionsPageData, setSolutionsPageData] = useState<SolutionsPageData>(() => loadFromStorage("solutions_page_data", INITIAL_SOLUTIONS_PAGE_DATA));
  const [productsPageData, setProductsPageData] = useState<ProductsPageData>(() => loadFromStorage("products_page_data", INITIAL_PRODUCTS_PAGE_DATA));
  const [projectsPageData, setProjectsPageData] = useState<ProjectsPageData>(() => loadFromStorage("projects_page_data", INITIAL_PROJECTS_PAGE_DATA));
  const [galleryPageData, setGalleryPageData] = useState<GalleryPageData>(() => loadFromStorage("gallery_page_data", INITIAL_GALLERY_PAGE_DATA));
  const [blogPageData, setBlogPageData] = useState<BlogPageData>(() => loadFromStorage("blog_page_data", INITIAL_BLOG_PAGE_DATA));
  const [contactPageData, setContactPageData] = useState<ContactPageData>(() => loadFromStorage("contact_page_data", INITIAL_CONTACT_PAGE_DATA));
  const [seoMetadata, setSeoMetadata] = useState<Record<string, SEOMetadata>>(() => loadFromStorage("seo", {}));
  const [logs, setLogs] = useState<ActivityLog[]>(() => loadFromStorage("logs", [
    { id: "log-1", user: "Nimesh Patel", role: "Super Admin", action: "System Initialized", module: "System", details: "All 29 website content modules and CMS tables initialized.", timestamp: "2026-08-24 09:00", read: true }
  ]));

  // Auto-sync state changes to localStorage as reliable cache
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
  useEffect(() => { localStorage.setItem("vrat_cms_home_page_data", JSON.stringify(homePageData)); }, [homePageData]);
  useEffect(() => { localStorage.setItem("vrat_cms_about_page_data", JSON.stringify(aboutPageData)); }, [aboutPageData]);
  useEffect(() => { localStorage.setItem("vrat_cms_services_page_data", JSON.stringify(servicesPageData)); }, [servicesPageData]);
  useEffect(() => { localStorage.setItem("vrat_cms_footer_data", JSON.stringify(footerData)); }, [footerData]);
  useEffect(() => { localStorage.setItem("vrat_cms_solutions_page_data", JSON.stringify(solutionsPageData)); }, [solutionsPageData]);
  useEffect(() => { localStorage.setItem("vrat_cms_products_page_data", JSON.stringify(productsPageData)); }, [productsPageData]);
  useEffect(() => { localStorage.setItem("vrat_cms_projects_page_data", JSON.stringify(projectsPageData)); }, [projectsPageData]);
  useEffect(() => { localStorage.setItem("vrat_cms_gallery_page_data", JSON.stringify(galleryPageData)); }, [galleryPageData]);
  useEffect(() => { localStorage.setItem("vrat_cms_blog_page_data", JSON.stringify(blogPageData)); }, [blogPageData]);
  useEffect(() => { localStorage.setItem("vrat_cms_contact_page_data", JSON.stringify(contactPageData)); }, [contactPageData]);
  useEffect(() => { localStorage.setItem("vrat_cms_seo", JSON.stringify(seoMetadata)); }, [seoMetadata]);
  useEffect(() => { localStorage.setItem("vrat_cms_logs", JSON.stringify(logs)); }, [logs]);

  // ============================================================================
  // Central Cloud Synchronization via Supabase (Cross-Device Live Persistence)
  // ============================================================================
  const syncAllFromSupabase = useCallback(async () => {
    if (!isSupabaseConfigured) return;
    try {
      // 1. Page Heroes (Hero sections for all 13+ pages)
      const { data: dbHeroes } = await supabase.from("page_heroes").select("*");
      if (dbHeroes && dbHeroes.length > 0) {
        const heroMap: Record<string, PageHeroConfig> = {};
        dbHeroes.forEach((h: any) => {
          heroMap[h.page_id] = mapHeroFromDB(h);
        });
        setHeroConfigs((prev) => ({ ...prev, ...heroMap }));
      }

      // 2. Global Settings & Official Info
      const { data: dbSettings } = await supabase.from("settings").select("*").eq("id", "global_config").maybeSingle();
      if (dbSettings) {
        setSettings((prev) => mapSettingsFromDB(dbSettings, prev));
        const jsonCfg = (typeof dbSettings.social_links === "object" && dbSettings.social_links) || {};
        if (jsonCfg.home_page_data) {
          setHomePageData((prev) => ({
            ...prev,
            ...jsonCfg.home_page_data,
            sectionOrder: jsonCfg.home_page_data.sectionOrder || prev.sectionOrder,
            sectionVisibility: { ...prev.sectionVisibility, ...jsonCfg.home_page_data.sectionVisibility },
          }));
        }
        if (jsonCfg.about_page_data) {
          setAboutPageData((prev) => ({
            ...prev,
            ...jsonCfg.about_page_data,
            sectionOrder: jsonCfg.about_page_data.sectionOrder || prev.sectionOrder,
            sectionVisibility: { ...prev.sectionVisibility, ...jsonCfg.about_page_data.sectionVisibility },
          }));
        }
        if (jsonCfg.services_page_data) {
          setServicesPageData((prev) => ({
            ...prev,
            ...jsonCfg.services_page_data,
            sectionOrder: jsonCfg.services_page_data.sectionOrder || prev.sectionOrder,
            sectionVisibility: { ...prev.sectionVisibility, ...jsonCfg.services_page_data.sectionVisibility },
          }));
        }
        if (jsonCfg.footer_data) {
          setFooterData((prev) => ({ ...prev, ...jsonCfg.footer_data }));
        }
        if (jsonCfg.solutions_page_data) {
          setSolutionsPageData((prev) => ({
            ...prev,
            ...jsonCfg.solutions_page_data,
            sectionOrder: jsonCfg.solutions_page_data.sectionOrder || prev.sectionOrder,
            sectionVisibility: { ...prev.sectionVisibility, ...jsonCfg.solutions_page_data.sectionVisibility },
          }));
        }
        if (jsonCfg.products_page_data) {
          setProductsPageData((prev) => ({
            ...prev,
            ...jsonCfg.products_page_data,
            sectionOrder: jsonCfg.products_page_data.sectionOrder || prev.sectionOrder,
            sectionVisibility: { ...prev.sectionVisibility, ...jsonCfg.products_page_data.sectionVisibility },
          }));
        }
        if (jsonCfg.projects_page_data) {
          setProjectsPageData((prev) => ({
            ...prev,
            ...jsonCfg.projects_page_data,
            sectionOrder: jsonCfg.projects_page_data.sectionOrder || prev.sectionOrder,
            sectionVisibility: { ...prev.sectionVisibility, ...jsonCfg.projects_page_data.sectionVisibility },
          }));
        }
        if (jsonCfg.gallery_page_data) {
          setGalleryPageData((prev) => ({
            ...prev,
            ...jsonCfg.gallery_page_data,
            sectionOrder: jsonCfg.gallery_page_data.sectionOrder || prev.sectionOrder,
            sectionVisibility: { ...prev.sectionVisibility, ...jsonCfg.gallery_page_data.sectionVisibility },
          }));
        }
        if (jsonCfg.blog_page_data) {
          setBlogPageData((prev) => ({
            ...prev,
            ...jsonCfg.blog_page_data,
            sectionOrder: jsonCfg.blog_page_data.sectionOrder || prev.sectionOrder,
            sectionVisibility: { ...prev.sectionVisibility, ...jsonCfg.blog_page_data.sectionVisibility },
          }));
        }
        if (jsonCfg.contact_page_data) {
          setContactPageData((prev) => ({
            ...prev,
            ...jsonCfg.contact_page_data,
            sectionOrder: jsonCfg.contact_page_data.sectionOrder || prev.sectionOrder,
            sectionVisibility: { ...prev.sectionVisibility, ...jsonCfg.contact_page_data.sectionVisibility },
          }));
        }
      }

      // 3. Services
      const { data: dbServices } = await supabase.from("services").select("*").order("display_order", { ascending: true });
      if (dbServices && dbServices.length > 0) {
        setServices(dbServices.map(mapServiceFromDB));
      }

      // 4. Products
      const { data: dbProducts } = await supabase.from("products").select("*");
      if (dbProducts && dbProducts.length >= 50) {
        setProducts(dbProducts.map(mapProductFromDB));
      } else {
        // Auto-seed cloud if empty or old mock products
        setProducts(INITIAL_PRODUCTS);
        for (const p of INITIAL_PRODUCTS) {
          await supabase.from("products").upsert(mapProductToDB(p));
        }
      }

      // 5. Industry Solutions
      const { data: dbSolutions } = await supabase.from("solutions").select("*");
      if (dbSolutions && dbSolutions.length > 0) {
        setSolutions(dbSolutions.map(mapSolutionFromDB));
      } else {
        for (const sol of INITIAL_SOLUTIONS) {
          await supabase.from("solutions").upsert(mapSolutionToDB(sol));
        }
      }

      // 6. Case Studies / Projects
      const { data: dbCases } = await supabase.from("case_studies").select("*");
      if (dbCases && dbCases.length > 0) {
        setCaseStudies(dbCases.map(mapCaseFromDB));
      } else {
        for (const c of INITIAL_CASE_STUDIES) {
          await supabase.from("case_studies").upsert(mapCaseToDB(c));
        }
      }

      // 7. Blog Posts
      const { data: dbBlogs } = await supabase.from("blogs").select("*");
      if (dbBlogs && dbBlogs.length > 0) {
        setBlogs(dbBlogs.map(mapBlogFromDB));
      } else {
        for (const b of INITIAL_BLOG_POSTS) {
          await supabase.from("blogs").upsert(mapBlogToDB(b));
        }
      }

      // 8. FAQs
      const { data: dbFaqs } = await supabase.from("faqs").select("*").order("display_order", { ascending: true });
      if (dbFaqs && dbFaqs.length > 0) {
        setFaqs(dbFaqs.map(mapFaqFromDB));
      } else {
        for (const f of INITIAL_FAQS) {
          await supabase.from("faqs").upsert(mapFaqToDB(f));
        }
      }

      // 9. Downloads
      const { data: dbDownloads } = await supabase.from("downloads").select("*");
      if (dbDownloads && dbDownloads.length > 0) {
        setDownloads(dbDownloads.map(mapDownloadFromDB));
      } else {
        for (const d of INITIAL_DOWNLOADS) {
          await supabase.from("downloads").upsert(mapDownloadToDB(d));
        }
      }

      // 10. Careers & Jobs
      const { data: dbJobs } = await supabase.from("job_openings").select("*");
      if (dbJobs && dbJobs.length > 0) {
        setJobs(dbJobs.map(mapJobFromDB));
      } else {
        for (const j of INITIAL_JOBS) {
          await supabase.from("job_openings").upsert(mapJobToDB(j));
        }
      }

      // 11. Leads & Inquiries
      const { data: dbLeads } = await supabase.from("leads").select("*").order("created_date", { ascending: false });
      if (dbLeads && dbLeads.length > 0) {
        setLeads((prevLeads) => {
          const fromDB = dbLeads.map(mapLeadFromDB);
          const dbIds = new Set(fromDB.map((l) => l.id));
          const localOnly = prevLeads.filter((l) => !dbIds.has(l.id));
          return [...localOnly, ...fromDB];
        });
      }

      // 12. Testimonials
      const { data: dbTestimonials } = await supabase.from("testimonials").select("*");
      if (dbTestimonials && dbTestimonials.length > 0) {
        setTestimonials(dbTestimonials.map(mapTestimonialFromDB));
      } else {
        for (const t of INITIAL_TESTIMONIALS) {
          await supabase.from("testimonials").upsert(mapTestimonialToDB(t));
        }
      }

      // 13. Technology Partners
      const { data: dbPartners } = await supabase.from("partners").select("*").order("display_order", { ascending: true });
      if (dbPartners && dbPartners.length > 0) {
        setPartners(dbPartners.map(mapPartnerFromDB));
      }

      // 14. Media Library
      const { data: dbMedia } = await supabase.from("media_items").select("*");
      if (dbMedia && dbMedia.length > 0) {
        setMediaItems(dbMedia.map(mapMediaFromDB));
      } else {
        for (const m of INITIAL_MEDIA_ITEMS) {
          await supabase.from("media_items").upsert(mapMediaToDB(m));
        }
      }
    } catch (err) {
      console.warn("Supabase initial sync error:", err);
    }
  }, []);

  // Initial cloud fetch + Realtime subscription across all devices
  useEffect(() => {
    syncAllFromSupabase();

    if (isSupabaseConfigured) {
      const channel = supabase
        .channel("vrat_cms_live_sync")
        .on("postgres_changes", { event: "*", schema: "public" }, () => {
          syncAllFromSupabase();
        })
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    }
  }, [syncAllFromSupabase]);

  // Activity logger
  const addLog = async (action: string, module: string, details: string) => {
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

    if (isSupabaseConfigured) {
      try {
        await supabase.from("activity_logs").insert({
          id: newLog.id,
          user_name: newLog.user,
          role: newLog.role,
          action: newLog.action,
          module: newLog.module,
          details: newLog.details,
          timestamp: new Date().toISOString(),
        });
      } catch (e) {
        // silent fallback
      }
    }
  };

  const markNotificationAsRead = (id: string) => {
    setLogs((prev) =>
      prev.map((log) => (log.id === id ? { ...log, read: true } : log))
    );
  };

  const markAllNotificationsAsRead = () => {
    setLogs((prev) => prev.map((log) => ({ ...log, read: true })));
  };

  // 1. Settings
  const updateSettings = async (newSettings: Partial<GlobalSettings>) => {
    const updated = { ...settings, ...newSettings };
    setSettings(updated);
    addLog("Updated Settings", "Settings", "Global company info or official website URL updated");

    if (isSupabaseConfigured) {
      try {
        await supabase.from("settings").upsert(mapSettingsToDB(updated));
      } catch (e) {
        console.warn("Supabase settings save:", e);
      }
    }
  };

  // 2. Services CRUD
  const addService = async (s: Omit<ServiceItem, "id">) => {
    const newItem: ServiceItem = { ...s, id: "srv-" + Date.now() };
    setServices((prev) => [...prev, newItem]);
    addLog("Added Service", "Services", `Created service "${s.title}"`);

    if (isSupabaseConfigured) {
      try {
        await supabase.from("services").insert(mapServiceToDB(newItem));
      } catch (e) { console.warn(e); }
    }
  };
  const updateService = async (id: string, s: Partial<ServiceItem>) => {
    let fullItem: ServiceItem | undefined;
    setServices((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          fullItem = { ...item, ...s };
          return fullItem;
        }
        return item;
      })
    );
    addLog("Updated Service", "Services", `Updated service ID: ${id}`);

    if (isSupabaseConfigured && fullItem) {
      try {
        await supabase.from("services").upsert(mapServiceToDB(fullItem));
      } catch (e) { console.warn(e); }
    }
  };
  const deleteService = async (id: string) => {
    setServices((prev) => prev.filter((item) => item.id !== id));
    addLog("Deleted Service", "Services", `Deleted service ID: ${id}`);

    if (isSupabaseConfigured) {
      try {
        await supabase.from("services").delete().eq("id", id);
      } catch (e) { console.warn(e); }
    }
  };

  // 3. Products CRUD
  const addProduct = async (p: Omit<ProductItem, "id">) => {
    const newItem: ProductItem = { ...p, id: "prod-" + Date.now() };
    setProducts((prev) => [newItem, ...prev]);
    addLog("Added Product", "Products", `Added product "${p.name}"`);

    if (isSupabaseConfigured) {
      try {
        await supabase.from("products").insert(mapProductToDB(newItem));
      } catch (e) { console.warn(e); }
    }
  };
  const updateProduct = async (id: string, p: Partial<ProductItem>) => {
    let fullItem: ProductItem | undefined;
    setProducts((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          fullItem = { ...item, ...p };
          return fullItem;
        }
        return item;
      })
    );
    addLog("Updated Product", "Products", `Updated product ID: ${id}`);

    if (isSupabaseConfigured && fullItem) {
      try {
        await supabase.from("products").upsert(mapProductToDB(fullItem));
      } catch (e) { console.warn(e); }
    }
  };
  const deleteProduct = async (id: string) => {
    setProducts((prev) => prev.filter((item) => item.id !== id));
    addLog("Deleted Product", "Products", `Deleted product ID: ${id}`);

    if (isSupabaseConfigured) {
      try {
        await supabase.from("products").delete().eq("id", id);
      } catch (e) { console.warn(e); }
    }
  };

  // 4. Solutions CRUD
  const addSolution = async (sol: Omit<IndustrySolution, "id">) => {
    const newItem: IndustrySolution = { ...sol, id: "sol-" + Date.now() };
    setSolutions((prev) => [...prev, newItem]);
    addLog("Added Industry Solution", "Solutions", `Added solution "${sol.title}"`);

    if (isSupabaseConfigured) {
      try {
        await supabase.from("solutions").insert(mapSolutionToDB(newItem));
      } catch (e) { console.warn(e); }
    }
  };
  const updateSolution = async (id: string, sol: Partial<IndustrySolution>) => {
    let fullItem: IndustrySolution | undefined;
    setSolutions((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          fullItem = { ...item, ...sol };
          return fullItem;
        }
        return item;
      })
    );
    addLog("Updated Industry Solution", "Solutions", `Updated solution ID: ${id}`);

    if (isSupabaseConfigured && fullItem) {
      try {
        await supabase.from("solutions").upsert(mapSolutionToDB(fullItem));
      } catch (e) { console.warn(e); }
    }
  };
  const deleteSolution = async (id: string) => {
    setSolutions((prev) => prev.filter((item) => item.id !== id));
    addLog("Deleted Industry Solution", "Solutions", `Deleted solution ID: ${id}`);

    if (isSupabaseConfigured) {
      try {
        await supabase.from("solutions").delete().eq("id", id);
      } catch (e) { console.warn(e); }
    }
  };

  // 5. Case Studies CRUD
  const addCaseStudy = async (c: Omit<CaseStudy, "id">) => {
    const newItem: CaseStudy = { ...c, id: "case-" + Date.now() };
    setCaseStudies((prev) => [newItem, ...prev]);
    addLog("Added Case Study", "Projects", `Added case study "${c.title}"`);

    if (isSupabaseConfigured) {
      try {
        await supabase.from("case_studies").insert(mapCaseToDB(newItem));
      } catch (e) { console.warn(e); }
    }
  };
  const updateCaseStudy = async (id: string, c: Partial<CaseStudy>) => {
    let fullItem: CaseStudy | undefined;
    setCaseStudies((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          fullItem = { ...item, ...c };
          return fullItem;
        }
        return item;
      })
    );
    addLog("Updated Case Study", "Projects", `Updated case study ID: ${id}`);

    if (isSupabaseConfigured && fullItem) {
      try {
        await supabase.from("case_studies").upsert(mapCaseToDB(fullItem));
      } catch (e) { console.warn(e); }
    }
  };
  const deleteCaseStudy = async (id: string) => {
    setCaseStudies((prev) => prev.filter((item) => item.id !== id));
    addLog("Deleted Case Study", "Projects", `Deleted case study ID: ${id}`);

    if (isSupabaseConfigured) {
      try {
        await supabase.from("case_studies").delete().eq("id", id);
      } catch (e) { console.warn(e); }
    }
  };

  // 6. Blog Posts CRUD
  const addBlog = async (b: Omit<BlogPost, "id">) => {
    const newItem: BlogPost = { ...b, id: "blog-" + Date.now() };
    setBlogs((prev) => [newItem, ...prev]);
    addLog("Added Blog Post", "Blog", `Published blog "${b.title}"`);

    if (isSupabaseConfigured) {
      try {
        await supabase.from("blogs").insert(mapBlogToDB(newItem));
      } catch (e) { console.warn(e); }
    }
  };
  const updateBlog = async (id: string, b: Partial<BlogPost>) => {
    let fullItem: BlogPost | undefined;
    setBlogs((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          fullItem = { ...item, ...b };
          return fullItem;
        }
        return item;
      })
    );
    addLog("Updated Blog Post", "Blog", `Updated blog post ID: ${id}`);

    if (isSupabaseConfigured && fullItem) {
      try {
        await supabase.from("blogs").upsert(mapBlogToDB(fullItem));
      } catch (e) { console.warn(e); }
    }
  };
  const deleteBlog = async (id: string) => {
    setBlogs((prev) => prev.filter((item) => item.id !== id));
    addLog("Deleted Blog Post", "Blog", `Deleted blog post ID: ${id}`);

    if (isSupabaseConfigured) {
      try {
        await supabase.from("blogs").delete().eq("id", id);
      } catch (e) { console.warn(e); }
    }
  };

  // 7. FAQs CRUD
  const addFAQ = async (f: Omit<FAQItem, "id">) => {
    const newItem: FAQItem = { ...f, id: "faq-" + Date.now() };
    setFaqs((prev) => [...prev, newItem]);
    addLog("Added FAQ", "FAQs", `Added FAQ: "${f.question.slice(0, 30)}..."`);

    if (isSupabaseConfigured) {
      try {
        await supabase.from("faqs").insert(mapFaqToDB(newItem));
      } catch (e) { console.warn(e); }
    }
  };
  const updateFAQ = async (id: string, f: Partial<FAQItem>) => {
    let fullItem: FAQItem | undefined;
    setFaqs((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          fullItem = { ...item, ...f };
          return fullItem;
        }
        return item;
      })
    );
    addLog("Updated FAQ", "FAQs", `Updated FAQ ID: ${id}`);

    if (isSupabaseConfigured && fullItem) {
      try {
        await supabase.from("faqs").upsert(mapFaqToDB(fullItem));
      } catch (e) { console.warn(e); }
    }
  };
  const deleteFAQ = async (id: string) => {
    setFaqs((prev) => prev.filter((item) => item.id !== id));
    addLog("Deleted FAQ", "FAQs", `Deleted FAQ ID: ${id}`);

    if (isSupabaseConfigured) {
      try {
        await supabase.from("faqs").delete().eq("id", id);
      } catch (e) { console.warn(e); }
    }
  };

  // 8. Downloads CRUD
  const addDownload = async (d: Omit<DownloadItem, "id">) => {
    const newItem: DownloadItem = { ...d, id: "dl-" + Date.now() };
    setDownloads((prev) => [newItem, ...prev]);
    addLog("Added Download Document", "Downloads", `Uploaded file "${d.title}"`);

    if (isSupabaseConfigured) {
      try {
        await supabase.from("downloads").insert(mapDownloadToDB(newItem));
      } catch (e) { console.warn(e); }
    }
  };
  const updateDownload = async (id: string, d: Partial<DownloadItem>) => {
    let fullItem: DownloadItem | undefined;
    setDownloads((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          fullItem = { ...item, ...d };
          return fullItem;
        }
        return item;
      })
    );
    addLog("Updated Download Document", "Downloads", `Updated download ID: ${id}`);

    if (isSupabaseConfigured && fullItem) {
      try {
        await supabase.from("downloads").upsert(mapDownloadToDB(fullItem));
      } catch (e) { console.warn(e); }
    }
  };
  const deleteDownload = async (id: string) => {
    setDownloads((prev) => prev.filter((item) => item.id !== id));
    addLog("Deleted Download Document", "Downloads", `Deleted download ID: ${id}`);

    if (isSupabaseConfigured) {
      try {
        await supabase.from("downloads").delete().eq("id", id);
      } catch (e) { console.warn(e); }
    }
  };
  const incrementDownloadCount = async (id: string) => {
    let count = 0;
    setDownloads((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          count = (item.downloadsCount || 0) + 1;
          return { ...item, downloadsCount: count };
        }
        return item;
      })
    );

    if (isSupabaseConfigured && count > 0) {
      try {
        await supabase.from("downloads").update({ downloads_count: count }).eq("id", id);
      } catch (e) { console.warn(e); }
    }
  };

  // 9. Careers / Jobs CRUD
  const addJob = async (j: Omit<JobOpening, "id">) => {
    const newItem: JobOpening = { ...j, id: "job-" + Date.now() };
    setJobs((prev) => [newItem, ...prev]);
    addLog("Created Job Opening", "Careers", `Posted job "${j.title}"`);

    if (isSupabaseConfigured) {
      try {
        await supabase.from("job_openings").insert(mapJobToDB(newItem));
      } catch (e) { console.warn(e); }
    }
  };
  const updateJob = async (id: string, j: Partial<JobOpening>) => {
    let fullItem: JobOpening | undefined;
    setJobs((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          fullItem = { ...item, ...j };
          return fullItem;
        }
        return item;
      })
    );
    addLog("Updated Job Opening", "Careers", `Updated job ID: ${id}`);

    if (isSupabaseConfigured && fullItem) {
      try {
        await supabase.from("job_openings").upsert(mapJobToDB(fullItem));
      } catch (e) { console.warn(e); }
    }
  };
  const deleteJob = async (id: string) => {
    setJobs((prev) => prev.filter((item) => item.id !== id));
    addLog("Deleted Job Opening", "Careers", `Deleted job ID: ${id}`);

    if (isSupabaseConfigured) {
      try {
        await supabase.from("job_openings").delete().eq("id", id);
      } catch (e) { console.warn(e); }
    }
  };
  const submitApplication = async (app: Omit<JobApplication, "id" | "appliedDate" | "status">) => {
    const newApp: JobApplication = {
      ...app,
      id: "app-" + Date.now(),
      appliedDate: new Date().toLocaleString("en-IN"),
      status: "New",
    };
    setApplications((prev) => {
      const updated = [newApp, ...prev];
      try {
        localStorage.setItem("vrat_cms_applications", JSON.stringify(updated));
      } catch (err) {
        console.warn("Storage sync failed:", err);
      }
      return updated;
    });
    addLog("New Job Application", "Careers", `Candidate ${app.fullName} applied for ${app.jobTitle}`);

    if (isSupabaseConfigured) {
      try {
        await supabase.from("job_applications").insert({
          id: newApp.id,
          job_id: newApp.jobId,
          job_title: newApp.jobTitle,
          full_name: newApp.fullName,
          email: newApp.email,
          phone: newApp.phone,
          current_city: newApp.currentCity,
          experience: newApp.experience,
          current_company: newApp.currentCompany,
          current_ctc: (newApp as any).currentCTC || (newApp as any).currentCtc,
          expected_ctc: (newApp as any).expectedCTC || (newApp as any).expectedCtc,
          notice_period: newApp.noticePeriod,
          highest_qualification: newApp.highestQualification,
          resume_file_name: newApp.resumeFileName,
          cover_letter: newApp.coverLetter,
          linkedin_profile: newApp.linkedinProfile,
          status: newApp.status,
          notes: newApp.notes,
          applied_date: new Date().toISOString(),
        });
      } catch (e) { console.warn(e); }
    }
  };
  const updateApplicationStatus = async (id: string, status: JobApplication["status"], notes?: string) => {
    setApplications((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status, notes: notes || item.notes } : item))
    );
    addLog("Application Status Changed", "Careers", `Application ${id} marked as ${status}`);

    if (isSupabaseConfigured) {
      try {
        await supabase.from("job_applications").update({ status, notes }).eq("id", id);
      } catch (e) { console.warn(e); }
    }
  };

  // 10. Inbound Leads CRM
  const submitLead = async (lead: Omit<LeadItem, "id" | "createdDate" | "status">) => {
    const newLead: LeadItem = {
      ...lead,
      id: "lead-" + Date.now(),
      createdDate: new Date().toLocaleString("en-IN"),
      status: "New",
    };
    setLeads((prev) => {
      const updated = [newLead, ...prev];
      try {
        localStorage.setItem("vrat_cms_leads", JSON.stringify(updated));
      } catch (err) {
        console.warn("Storage sync failed:", err);
      }
      return updated;
    });
    addLog("New Inbound Lead", "Leads", `${lead.type} from ${lead.name} (${lead.company || "Individual"})`);

    if (isSupabaseConfigured) {
      try {
        const payload = mapLeadToDB(newLead);
        const { error } = await supabase.from("leads").insert(payload);
        if (error) {
          console.warn("Supabase submit lead error:", error);
        }
      } catch (e) { console.warn("Supabase submit lead:", e); }
    }
  };
  const updateLeadStatus = async (id: string, status: LeadItem["status"], notes?: string, assignedTo?: string) => {
    let fullItem: LeadItem | undefined;
    setLeads((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          fullItem = {
            ...item,
            status,
            notes: notes !== undefined ? notes : item.notes,
            assignedTo: assignedTo !== undefined ? assignedTo : item.assignedTo,
          };
          return fullItem;
        }
        return item;
      })
    );
    addLog("Lead Status Updated", "Leads", `Lead ${id} updated to ${status}`);

    if (isSupabaseConfigured && fullItem) {
      try {
        await supabase.from("leads").upsert(mapLeadToDB(fullItem));
      } catch (e) { console.warn(e); }
    }
  };
  const deleteLead = async (id: string) => {
    setLeads((prev) => prev.filter((item) => item.id !== id));
    addLog("Deleted Lead", "Leads", `Deleted lead record ${id}`);

    if (isSupabaseConfigured) {
      try {
        await supabase.from("leads").delete().eq("id", id);
      } catch (e) { console.warn(e); }
    }
  };

  // 11. Testimonials CRUD
  const addTestimonial = async (t: Omit<TestimonialItem, "id">) => {
    const newItem: TestimonialItem = { ...t, id: "t-" + Date.now() };
    setTestimonials((prev) => [newItem, ...prev]);
    addLog("Added Testimonial", "Testimonials", `Added testimonial from ${t.name}`);

    if (isSupabaseConfigured) {
      try {
        await supabase.from("testimonials").insert(mapTestimonialToDB(newItem));
      } catch (e) { console.warn(e); }
    }
  };
  const updateTestimonial = async (id: string, t: Partial<TestimonialItem>) => {
    let fullItem: TestimonialItem | undefined;
    setTestimonials((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          fullItem = { ...item, ...t };
          return fullItem;
        }
        return item;
      })
    );
    addLog("Updated Testimonial", "Testimonials", `Updated testimonial ${id}`);

    if (isSupabaseConfigured && fullItem) {
      try {
        await supabase.from("testimonials").upsert(mapTestimonialToDB(fullItem));
      } catch (e) { console.warn(e); }
    }
  };
  const deleteTestimonial = async (id: string) => {
    setTestimonials((prev) => prev.filter((item) => item.id !== id));
    addLog("Deleted Testimonial", "Testimonials", `Deleted testimonial ${id}`);

    if (isSupabaseConfigured) {
      try {
        await supabase.from("testimonials").delete().eq("id", id);
      } catch (e) { console.warn(e); }
    }
  };

  // 12. Partner Brands CRUD
  const addPartner = async (p: Omit<PartnerBrand, "id">) => {
    const newItem: PartnerBrand = { ...p, id: "p-" + Date.now() };
    setPartners((prev) => [...prev, newItem]);
    addLog("Added Partner Brand", "Partners", `Added partner ${p.name}`);

    if (isSupabaseConfigured) {
      try {
        await supabase.from("partners").insert(mapPartnerToDB(newItem));
      } catch (e) { console.warn(e); }
    }
  };
  const updatePartner = async (id: string, p: Partial<PartnerBrand>) => {
    let fullItem: PartnerBrand | undefined;
    setPartners((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          fullItem = { ...item, ...p };
          return fullItem;
        }
        return item;
      })
    );
    addLog("Updated Partner Brand", "Partners", `Updated partner ${id}`);

    if (isSupabaseConfigured && fullItem) {
      try {
        await supabase.from("partners").upsert(mapPartnerToDB(fullItem));
      } catch (e) { console.warn(e); }
    }
  };
  const deletePartner = async (id: string) => {
    setPartners((prev) => prev.filter((item) => item.id !== id));
    addLog("Deleted Partner Brand", "Partners", `Deleted partner ${id}`);

    if (isSupabaseConfigured) {
      try {
        await supabase.from("partners").delete().eq("id", id);
      } catch (e) { console.warn(e); }
    }
  };

  // 13. Media Library CRUD
  const addMediaItem = async (m: Omit<MediaItem, "id" | "uploadedDate">) => {
    const newItem: MediaItem = {
      ...m,
      id: "media-" + Date.now(),
      uploadedDate: new Date().toISOString().split("T")[0],
    };
    setMediaItems((prev) => [newItem, ...prev]);
    addLog("Uploaded Media", "Media", `Added media file ${m.filename}`);

    if (isSupabaseConfigured) {
      try {
        await supabase.from("media_items").insert(mapMediaToDB(newItem));
      } catch (e) { console.warn(e); }
    }
  };
  const deleteMediaItem = async (id: string) => {
    setMediaItems((prev) => prev.filter((item) => item.id !== id));
    addLog("Deleted Media", "Media", `Removed media item ${id}`);

    if (isSupabaseConfigured) {
      try {
        await supabase.from("media_items").delete().eq("id", id);
      } catch (e) { console.warn(e); }
    }
  };
  const updateMediaAltText = async (id: string, altText: string) => {
    setMediaItems((prev) => prev.map((item) => (item.id === id ? { ...item, altText } : item)));
    addLog("Updated Media Alt Text", "Media", `Updated SEO alt text for ${id}`);

    if (isSupabaseConfigured) {
      try {
        await supabase.from("media_items").update({ alt_text: altText }).eq("id", id);
      } catch (e) { console.warn(e); }
    }
  };

  // 14. Dynamic Page Hero Builder (Crucial for Page & Section Manager cross-device persistence)
  const updateHeroConfig = async (pageId: string, config: Partial<PageHeroConfig>) => {
    const current = heroConfigs[pageId] || INITIAL_HERO_CONFIGS[pageId] || {
      pageId,
      pageName: pageId,
      heading: "",
      subtitle: "",
      backgroundImage: "",
      primaryCtaText: "",
      primaryCtaLink: "",
      secondaryCtaText: "",
      secondaryCtaLink: "",
      showSection: true,
      status: "Published",
    };
    const updated: PageHeroConfig = { ...current, ...config };

    setHeroConfigs((prev) => ({
      ...prev,
      [pageId]: updated,
    }));
    addLog("Updated Page Hero", "Page Builder", `Modified Hero Section on page: ${pageId}`);

    if (isSupabaseConfigured) {
      try {
        await supabase.from("page_heroes").upsert(mapHeroToDB(updated));
      } catch (err) {
        console.warn("Supabase hero save error:", err);
      }
    }
  };

  // 14b. Dynamic Home Page Full Content & Reordering Manager (Cross-Device Cloud Sync)
  const updateHomePageData = async (data: Partial<HomePageData>) => {
    const mergedData: HomePageData = {
      ...homePageData,
      ...data,
      sectionOrder: data.sectionOrder || homePageData.sectionOrder,
      sectionVisibility: { ...homePageData.sectionVisibility, ...(data.sectionVisibility || {}) },
    };

    setHomePageData(mergedData);
    localStorage.setItem("vrat_cms_home_page_data", JSON.stringify(mergedData));
    addLog("Updated Home Page Layout", "Page Builder", "Saved custom section order, visibility, and content for Home Page");

    if (isSupabaseConfigured) {
      try {
        const { data: currentSettings } = await supabase
          .from("settings")
          .select("*")
          .eq("id", "global_config")
          .maybeSingle();

        const currentSocial =
          (currentSettings && typeof currentSettings.social_links === "object" && currentSettings.social_links) || {};
        const updatedSocial = {
          ...currentSocial,
          home_page_data: mergedData,
        };

        await supabase.from("settings").upsert({
          id: "global_config",
          social_links: updatedSocial,
          updated_at: new Date().toISOString(),
        });
      } catch (err) {
        console.warn("Failed to persist homePageData to Supabase settings:", err);
      }
    }
  };

  // 14c. Dynamic About Us Page Full Content & Reordering Manager (Cross-Device Cloud Sync)
  const updateAboutPageData = async (data: Partial<AboutPageData>) => {
    const mergedData: AboutPageData = {
      ...aboutPageData,
      ...data,
      sectionOrder: data.sectionOrder || aboutPageData.sectionOrder,
      sectionVisibility: { ...aboutPageData.sectionVisibility, ...(data.sectionVisibility || {}) },
    };

    setAboutPageData(mergedData);
    localStorage.setItem("vrat_cms_about_page_data", JSON.stringify(mergedData));
    addLog("Updated About Us Page Layout", "Page Builder", "Saved custom section order, visibility, and content for About Us Page");

    if (isSupabaseConfigured) {
      try {
        const { data: currentSettings } = await supabase
          .from("settings")
          .select("*")
          .eq("id", "global_config")
          .maybeSingle();

        const currentSocial =
          (currentSettings && typeof currentSettings.social_links === "object" && currentSettings.social_links) || {};
        const updatedSocial = {
          ...currentSocial,
          about_page_data: mergedData,
        };

        await supabase.from("settings").upsert({
          id: "global_config",
          social_links: updatedSocial,
          updated_at: new Date().toISOString(),
        });
      } catch (err) {
        console.warn("Failed to persist aboutPageData to Supabase settings:", err);
      }
    }
  };

  // 14d. Dynamic Services Page Full Content & Reordering Manager (Cross-Device Cloud Sync)
  const updateServicesPageData = async (data: Partial<ServicesPageData>) => {
    const mergedData: ServicesPageData = {
      ...servicesPageData,
      ...data,
      sectionOrder: data.sectionOrder || servicesPageData.sectionOrder,
      sectionVisibility: { ...servicesPageData.sectionVisibility, ...(data.sectionVisibility || {}) },
    };

    setServicesPageData(mergedData);
    localStorage.setItem("vrat_cms_services_page_data", JSON.stringify(mergedData));
    addLog("Updated Services Page Layout", "Page Builder", "Saved custom section order, visibility, and content for Services Page");

    if (isSupabaseConfigured) {
      try {
        const { data: currentSettings } = await supabase
          .from("settings")
          .select("*")
          .eq("id", "global_config")
          .maybeSingle();

        const currentSocial =
          (currentSettings && typeof currentSettings.social_links === "object" && currentSettings.social_links) || {};
        const updatedSocial = {
          ...currentSocial,
          services_page_data: mergedData,
        };

        await supabase.from("settings").upsert({
          id: "global_config",
          social_links: updatedSocial,
          updated_at: new Date().toISOString(),
        });
      } catch (err) {
        console.warn("Failed to persist servicesPageData to Supabase settings:", err);
      }
    }
  };

  // 14e. Footer Content Manager
  const updateFooterData = async (data: Partial<FooterData>) => {
    const mergedData: FooterData = {
      ...footerData,
      ...data,
      preFooter: { ...footerData.preFooter, ...(data.preFooter || {}) },
      company: { ...footerData.company, ...(data.company || {}) },
      newsletter: { ...footerData.newsletter, ...(data.newsletter || {}) },
      bottomBar: { ...footerData.bottomBar, ...(data.bottomBar || {}) },
    };
    setFooterData(mergedData);
    localStorage.setItem("vrat_cms_footer_data", JSON.stringify(mergedData));
    addLog("Updated Website Footer", "Page Builder", "Saved custom footer pre-banner, narrative, and copyright settings");

    if (isSupabaseConfigured) {
      try {
        const { data: currentSettings } = await supabase.from("settings").select("*").eq("id", "global_config").maybeSingle();
        const currentSocial = (currentSettings && typeof currentSettings.social_links === "object" && currentSettings.social_links) || {};
        await supabase.from("settings").upsert({
          id: "global_config",
          social_links: { ...currentSocial, footer_data: mergedData },
          updated_at: new Date().toISOString(),
        });
      } catch (err) {
        console.warn("Failed to persist footerData to Supabase:", err);
      }
    }
  };

  // 14f. Solutions Page Manager
  const updateSolutionsPageData = async (data: Partial<SolutionsPageData>) => {
    const mergedData: SolutionsPageData = {
      ...solutionsPageData,
      ...data,
      sectionOrder: data.sectionOrder || solutionsPageData.sectionOrder,
      sectionVisibility: { ...solutionsPageData.sectionVisibility, ...(data.sectionVisibility || {}) },
    };
    setSolutionsPageData(mergedData);
    localStorage.setItem("vrat_cms_solutions_page_data", JSON.stringify(mergedData));
    addLog("Updated Solutions Page Layout", "Page Builder", "Saved custom section order and content for Solutions Page");

    if (isSupabaseConfigured) {
      try {
        const { data: currentSettings } = await supabase.from("settings").select("*").eq("id", "global_config").maybeSingle();
        const currentSocial = (currentSettings && typeof currentSettings.social_links === "object" && currentSettings.social_links) || {};
        await supabase.from("settings").upsert({
          id: "global_config",
          social_links: { ...currentSocial, solutions_page_data: mergedData },
          updated_at: new Date().toISOString(),
        });
      } catch (err) {
        console.warn("Failed to persist solutionsPageData to Supabase:", err);
      }
    }
  };

  // 14g. Products Page Manager
  const updateProductsPageData = async (data: Partial<ProductsPageData>) => {
    const mergedData: ProductsPageData = {
      ...productsPageData,
      ...data,
      sectionOrder: data.sectionOrder || productsPageData.sectionOrder,
      sectionVisibility: { ...productsPageData.sectionVisibility, ...(data.sectionVisibility || {}) },
    };
    setProductsPageData(mergedData);
    localStorage.setItem("vrat_cms_products_page_data", JSON.stringify(mergedData));
    addLog("Updated Products Page Layout", "Page Builder", "Saved custom section order and content for Products Page");

    if (isSupabaseConfigured) {
      try {
        const { data: currentSettings } = await supabase.from("settings").select("*").eq("id", "global_config").maybeSingle();
        const currentSocial = (currentSettings && typeof currentSettings.social_links === "object" && currentSettings.social_links) || {};
        await supabase.from("settings").upsert({
          id: "global_config",
          social_links: { ...currentSocial, products_page_data: mergedData },
          updated_at: new Date().toISOString(),
        });
      } catch (err) {
        console.warn("Failed to persist productsPageData to Supabase:", err);
      }
    }
  };

  // 14h. Projects Page Manager
  const updateProjectsPageData = async (data: Partial<ProjectsPageData>) => {
    const mergedData: ProjectsPageData = {
      ...projectsPageData,
      ...data,
      sectionOrder: data.sectionOrder || projectsPageData.sectionOrder,
      sectionVisibility: { ...projectsPageData.sectionVisibility, ...(data.sectionVisibility || {}) },
    };
    setProjectsPageData(mergedData);
    localStorage.setItem("vrat_cms_projects_page_data", JSON.stringify(mergedData));
    addLog("Updated Projects Page Layout", "Page Builder", "Saved custom section order and content for Projects Page");

    if (isSupabaseConfigured) {
      try {
        const { data: currentSettings } = await supabase.from("settings").select("*").eq("id", "global_config").maybeSingle();
        const currentSocial = (currentSettings && typeof currentSettings.social_links === "object" && currentSettings.social_links) || {};
        await supabase.from("settings").upsert({
          id: "global_config",
          social_links: { ...currentSocial, projects_page_data: mergedData },
          updated_at: new Date().toISOString(),
        });
      } catch (err) {
        console.warn("Failed to persist projectsPageData to Supabase:", err);
      }
    }
  };

  // 14i. Gallery Page Manager
  const updateGalleryPageData = async (data: Partial<GalleryPageData>) => {
    const mergedData: GalleryPageData = {
      ...galleryPageData,
      ...data,
      sectionOrder: data.sectionOrder || galleryPageData.sectionOrder,
      sectionVisibility: { ...galleryPageData.sectionVisibility, ...(data.sectionVisibility || {}) },
    };
    setGalleryPageData(mergedData);
    localStorage.setItem("vrat_cms_gallery_page_data", JSON.stringify(mergedData));
    addLog("Updated Gallery Page Layout", "Page Builder", "Saved custom section order and content for Gallery Page");

    if (isSupabaseConfigured) {
      try {
        const { data: currentSettings } = await supabase.from("settings").select("*").eq("id", "global_config").maybeSingle();
        const currentSocial = (currentSettings && typeof currentSettings.social_links === "object" && currentSettings.social_links) || {};
        await supabase.from("settings").upsert({
          id: "global_config",
          social_links: { ...currentSocial, gallery_page_data: mergedData },
          updated_at: new Date().toISOString(),
        });
      } catch (err) {
        console.warn("Failed to persist galleryPageData to Supabase:", err);
      }
    }
  };

  // 14j. Blog Page Manager
  const updateBlogPageData = async (data: Partial<BlogPageData>) => {
    const mergedData: BlogPageData = {
      ...blogPageData,
      ...data,
      sectionOrder: data.sectionOrder || blogPageData.sectionOrder,
      sectionVisibility: { ...blogPageData.sectionVisibility, ...(data.sectionVisibility || {}) },
    };
    setBlogPageData(mergedData);
    localStorage.setItem("vrat_cms_blog_page_data", JSON.stringify(mergedData));
    addLog("Updated Blog Page Layout", "Page Builder", "Saved custom section order and content for Blog Page");

    if (isSupabaseConfigured) {
      try {
        const { data: currentSettings } = await supabase.from("settings").select("*").eq("id", "global_config").maybeSingle();
        const currentSocial = (currentSettings && typeof currentSettings.social_links === "object" && currentSettings.social_links) || {};
        await supabase.from("settings").upsert({
          id: "global_config",
          social_links: { ...currentSocial, blog_page_data: mergedData },
          updated_at: new Date().toISOString(),
        });
      } catch (err) {
        console.warn("Failed to persist blogPageData to Supabase:", err);
      }
    }
  };

  // 14k. Contact Page Manager
  const updateContactPageData = async (data: Partial<ContactPageData>) => {
    const mergedData: ContactPageData = {
      ...contactPageData,
      ...data,
      sectionOrder: data.sectionOrder || contactPageData.sectionOrder,
      sectionVisibility: { ...contactPageData.sectionVisibility, ...(data.sectionVisibility || {}) },
    };
    setContactPageData(mergedData);
    localStorage.setItem("vrat_cms_contact_page_data", JSON.stringify(mergedData));
    addLog("Updated Contact Page Layout", "Page Builder", "Saved custom section order and content for Contact Page");

    if (isSupabaseConfigured) {
      try {
        const { data: currentSettings } = await supabase.from("settings").select("*").eq("id", "global_config").maybeSingle();
        const currentSocial = (currentSettings && typeof currentSettings.social_links === "object" && currentSettings.social_links) || {};
        await supabase.from("settings").upsert({
          id: "global_config",
          social_links: { ...currentSocial, contact_page_data: mergedData },
          updated_at: new Date().toISOString(),
        });
      } catch (err) {
        console.warn("Failed to persist contactPageData to Supabase:", err);
      }
    }
  };

  // 15. SEO Metadata
  const updateSEOMetadata = (pageId: string, seo: Partial<SEOMetadata>) => {
    setSeoMetadata((prev) => ({
      ...prev,
      [pageId]: { ...prev[pageId], ...seo },
    }));
    addLog("Updated SEO Metadata", "SEO", `Modified SEO settings for: ${pageId}`);
  };

  // Reset demo / storage
  const resetToDefaults = async () => {
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

    // Resync cloud if needed
    if (isSupabaseConfigured) {
      try {
        for (const [pId, h] of Object.entries(INITIAL_HERO_CONFIGS)) {
          await supabase.from("page_heroes").upsert(mapHeroToDB(h));
        }
        await supabase.from("settings").upsert(mapSettingsToDB(INITIAL_SETTINGS));
      } catch (e) {
        console.warn(e);
      }
    }
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
        homePageData,
        updateHomePageData,
        aboutPageData,
        updateAboutPageData,
        servicesPageData,
        updateServicesPageData,
        footerData,
        updateFooterData,
        solutionsPageData,
        updateSolutionsPageData,
        productsPageData,
        updateProductsPageData,
        projectsPageData,
        updateProjectsPageData,
        galleryPageData,
        updateGalleryPageData,
        blogPageData,
        updateBlogPageData,
        contactPageData,
        updateContactPageData,
        seoMetadata,
        updateSEOMetadata,
        logs,
        addLog,
        markNotificationAsRead,
        markAllNotificationsAsRead,
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
