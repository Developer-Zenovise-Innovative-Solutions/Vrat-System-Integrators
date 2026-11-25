export type UserRole = 
  | "Super Admin" 
  | "Content Manager" 
  | "SEO Manager" 
  | "Sales Manager" 
  | "Support Manager" 
  | "HR Manager" 
  | "Editor";

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  lastLogin?: string;
  active: boolean;
  password?: string;
}

export interface ActivityLog {
  id: string;
  user: string;
  role: string;
  action: string;
  module: string;
  details: string;
  timestamp: string;
  read?: boolean;
}

export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  shortDesc: string;
  overview: string;
  icon: string;
  image: string;
  features: string[];
  benefits: string[];
  applications?: string[];
  solutionTypes?: { title: string; desc: string }[];
  status: "Published" | "Draft";
  order: number;
}

export interface ProductItem {
  id: string;
  name: string;
  category: string;
  brand: string;
  image: string;
  tagline: string;
  features: string[];
  applications: string[];
  specs: Record<string, string>;
  datasheetUrl?: string;
  status: "Published" | "Draft";
  isFeatured?: boolean;
}

export interface IndustrySolution {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  desc: string;
  icon: string;
  image: string;
  heroImage?: string;
  challenges: string[];
  solutionsProvided: string[];
  keyFeatures: { title: string; desc: string }[];
  architectureSteps: string[];
  successMetrics: string[];
  testimonial?: { quote: string; client: string; role: string };
  caseStudyRef?: string;
  status: "Published" | "Draft";
}

export interface CaseStudy {
  id: string;
  title: string;
  clientType: string;
  industry: string;
  location: string;
  year: string;
  projectSize: string;
  technologyUsed: string[];
  shortDesc: string;
  challenge: string;
  solution: string;
  results: string[];
  image: string;
  beforeImage?: string;
  afterImage?: string;
  testimonial?: { quote: string; author: string };
  status: "Published" | "Draft";
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  category: string;
  author: string;
  authorRole: string;
  authorAvatar: string;
  publishDate: string;
  readTime: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  tags: string[];
  relatedServices?: string[];
  isFeatured?: boolean;
  status: "Published" | "Draft";
}

export interface FAQItem {
  id: string;
  category: string;
  question: string;
  answer: string;
  order: number;
  status: "Published" | "Draft";
}

export interface DownloadItem {
  id: string;
  title: string;
  category: string;
  description: string;
  fileType: "PDF" | "DOC" | "ZIP" | "SOFTWARE";
  fileSize: string;
  version: string;
  updatedDate: string;
  downloadUrl: string;
  downloadsCount: number;
  status: "Published" | "Draft";
}

export interface JobOpening {
  id: string;
  title: string;
  department: string;
  location: string;
  type: "Full-Time" | "Part-Time" | "Internship";
  experience: string;
  qualification: string;
  salary?: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  benefits: string[];
  status: "Published" | "Closed";
  deadline: string;
}

export interface JobApplication {
  id: string;
  jobId: string;
  jobTitle: string;
  fullName: string;
  email: string;
  phone: string;
  currentCity: string;
  experience: string;
  currentCompany?: string;
  currentCTC?: string;
  expectedCTC?: string;
  noticePeriod?: string;
  highestQualification: string;
  resumeFileName: string;
  coverLetter?: string;
  linkedinProfile?: string;
  appliedDate: string;
  status: "New" | "Under Review" | "Shortlisted" | "Interviewed" | "Hired" | "Rejected";
  notes?: string;
}

export interface LeadItem {
  id: string;
  type: "Contact Inquiry" | "Site Survey Request" | "Product Quote" | "Support Request" | "Newsletter";
  name: string;
  company?: string;
  email: string;
  phone?: string;
  city?: string;
  serviceOrProduct?: string;
  projectType?: string;
  estimatedSize?: string;
  message: string;
  preferredDate?: string;
  preferredTime?: string;
  preferredContactMethod?: string;
  attachmentName?: string;
  createdDate: string;
  status: "New" | "Contacted" | "Qualified" | "Proposal Sent" | "Won" | "Lost" | "Closed";
  assignedTo?: string;
  notes?: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  designation: string;
  company: string;
  industry: string;
  quote: string;
  rating: number;
  avatar?: string;
  isFeatured: boolean;
  status: "Published" | "Draft";
}

export interface PartnerBrand {
  id: string;
  name: string;
  category: string;
  logo: string;
  websiteUrl: string;
  order: number;
  active: boolean;
}

export interface MediaItem {
  id: string;
  filename: string;
  url: string;
  type: "image" | "video" | "document";
  size: string;
  dimensions?: string;
  altText: string;
  uploadedDate: string;
  category: string;
}

export interface PageHeroConfig {
  pageId: string;
  pageName: string;
  heading: string;
  subtitle: string;
  backgroundImage: string;
  primaryCtaText: string;
  primaryCtaLink: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
  showSection: boolean;
  status: "Published" | "Draft";
}

export interface SEOMetadata {
  pageId: string;
  pagePath: string;
  metaTitle: string;
  metaDescription: string;
  canonicalUrl: string;
  ogImage: string;
  keywords: string[];
  indexPage: boolean;
}

export type LocationType = "Head Office" | "Registered Office" | "Branch Office";

export interface BusinessLocation {
  id: string;
  name: string;
  type: LocationType;
  phone: string;
  whatsappNumber: string;
  address: string;
  googleMapsUrl: string;
  email?: string;
  active: boolean;
}

export interface GlobalSettings {
  companyName: string;
  tagline: string;
  websiteUrl?: string;
  logoUrl?: string;
  headerLogoUrl?: string;
  footerLogoUrl?: string;
  primaryEmail: string;
  secondaryEmail?: string;
  salesEmail: string;
  supportEmail: string;
  careersEmail: string;
  phone: string;
  emergencyHotline: string;
  whatsappNumber: string;
  address: string;
  cityStateZip: string;
  headOfficeAddress?: string;
  branchOfficeAddress?: string;
  locations?: BusinessLocation[];
  businessHours: string;
  googleMapsUrl: string;
  socialLinks: {
    linkedin: string;
    facebook: string;
    instagram: string;
    youtube: string;
    twitter: string;
  };
  maintenanceMode: boolean;
}

export type HomePageSectionId =
  | "hero"
  | "trust_stats"
  | "about"
  | "why_choose"
  | "services"
  | "industries"
  | "process"
  | "projects"
  | "partners"
  | "stats"
  | "testimonials"
  | "cta"
  | "newsletter";

export interface HomePageData {
  sectionOrder: HomePageSectionId[];
  sectionVisibility: Record<HomePageSectionId, boolean>;
  hero: {
    badge: string;
    heading: string;
    subtitle: string;
    backgroundImage: string;
    primaryCtaText: string;
    primaryCtaLink: string;
    secondaryCtaText: string;
    secondaryCtaLink: string;
  };
  trustStats: {
    label: string;
    items: { value: string; label: string }[];
  };
  about: {
    badge: string;
    heading: string;
    p1: string;
    p2: string;
    p3: string;
    buttonText: string;
    buttonLink: string;
    image: string;
    statValue: string;
    statLabel: string;
  };
  whyChoose: {
    badge: string;
    heading: string;
    description: string;
    items: { title: string; desc: string }[];
  };
  services: {
    badge: string;
    heading: string;
    subtitle: string;
    buttonText: string;
    buttonLink: string;
  };
  industries: {
    badge: string;
    heading: string;
    subtitle: string;
    items: { id: string; title: string; image: string; icon?: string }[];
  };
  process: {
    badge: string;
    heading: string;
    steps: { step: string; title: string; desc: string }[];
  };
  projects: {
    badge: string;
    heading: string;
    subtitle: string;
    buttonText: string;
    buttonLink: string;
    items?: { title: string; sector: string; desc: string; image: string; services: string[] }[];
  };
  partners: {
    badge: string;
    heading: string;
  };
  stats: {
    heading: string;
    items: { value: string; label: string }[];
  };
  testimonials: {
    badge: string;
    heading: string;
  };
  cta: {
    heading: string;
    description: string;
    primaryBtnText: string;
    primaryBtnLink: string;
    secondaryBtnText: string;
    secondaryBtnLink: string;
  };
  newsletter: {
    heading: string;
    description: string;
    buttonText: string;
  };
}

export type AboutPageSectionId =
  | "hero"
  | "who_we_are"
  | "story"
  | "vision_mission"
  | "core_values"
  | "timeline"
  | "why_choose"
  | "leadership"
  | "certifications"
  | "partners"
  | "sustainability"
  | "cta";

export interface TeamExpert {
  id: string;
  name: string;
  designation: string;
  image: string;
  bio?: string;
}

export interface AboutPageData {
  sectionOrder: AboutPageSectionId[];
  sectionVisibility: Record<AboutPageSectionId, boolean>;
  hero: {
    badge: string;
    heading: string;
    subtitle: string;
    backgroundImage: string;
    primaryCtaText: string;
    primaryCtaLink: string;
    secondaryCtaText: string;
    secondaryCtaLink: string;
  };
  whoWeAre: {
    badge: string;
    heading: string;
    p1: string;
    p2: string;
    p3: string;
    images: [string, string, string, string];
  };
  story: {
    badge: string;
    heading: string;
    p1: string;
    p2: string;
    p3: string;
  };
  visionMission: {
    visionTitle: string;
    visionDesc: string;
    missionTitle: string;
    missionSubtitle: string;
    missionPoints: string[];
  };
  coreValues: {
    badge: string;
    heading: string;
    items: { title: string; desc: string }[];
  };
  timeline: {
    badge: string;
    heading: string;
    items: { year: string; event: string }[];
  };
  whyChoose: {
    badge: string;
    heading: string;
    items: { title: string; desc: string; icon?: string }[];
  };
  leadership: {
    badge: string;
    heading: string;
    description: string;
    teamHeading: string;
    teamSubtitle: string;
    roles?: string[];
    experts?: TeamExpert[];
  };
  certifications: {
    badge: string;
    heading: string;
    subtitle: string;
    items: string[];
  };
  partners: {
    badge: string;
    heading: string;
    subtitle: string;
  };
  sustainability: {
    badge: string;
    heading: string;
    subtitle: string;
    items: string[];
    image: string;
  };
  cta: {
    heading: string;
    subtitle: string;
    primaryBtnText: string;
    primaryBtnLink: string;
    secondaryBtnText: string;
    secondaryBtnLink: string;
  };
}

/* ========================================================================= */
/* 14. WEBSITE FOOTER CONTENT TYPES                                          */
/* ========================================================================= */
export interface FooterData {
  preFooter: {
    phoneLabel: string;
    phoneNumber: string;
    emailLabel: string;
    emailAddress: string;
    addressLabel: string;
    addressText: string;
  };
  company: {
    title: string;
    subtitle: string;
    description: string;
    certificationsBadge: string;
    logoUrl?: string;
    headerLogoUrl?: string;
  };
  newsletter: {
    heading: string;
    subtitle: string;
    placeholder: string;
    buttonText: string;
  };
  bottomBar: {
    copyright: string;
    madeInText: string;
    showPolicies: boolean;
  };
}

/* ========================================================================= */
/* SOLUTIONS PAGE BUILDER TYPES                                              */
/* ========================================================================= */
export type SolutionsPageSectionId =
  | "hero"
  | "industries_tabs"
  | "architecture"
  | "why_choose"
  | "outcomes"
  | "cta";

export interface SolutionsPageData {
  sectionOrder: SolutionsPageSectionId[];
  sectionVisibility: Record<SolutionsPageSectionId, boolean>;
  hero: {
    badge: string;
    heading: string;
    subtitle: string;
    backgroundImage: string;
    primaryCtaText: string;
    primaryCtaLink: string;
    secondaryCtaText: string;
    secondaryCtaLink: string;
  };
  architecture: {
    badge: string;
    heading: string;
    subtitle: string;
    steps: { number: string; title: string; desc: string }[];
  };
  whyChoose: {
    badge: string;
    heading: string;
    subtitle: string;
    items: { title: string; desc: string }[];
  };
  outcomes: {
    badge: string;
    heading: string;
    metrics: { stat: string; label: string; desc: string }[];
  };
  cta: {
    heading: string;
    subtitle: string;
    primaryBtnText: string;
    primaryBtnLink: string;
    secondaryBtnText: string;
    secondaryBtnLink: string;
  };
}

/* ========================================================================= */
/* PRODUCTS PAGE BUILDER TYPES                                               */
/* ========================================================================= */
export type ProductsPageSectionId =
  | "hero"
  | "categories_bar"
  | "catalog_grid"
  | "quote_banner"
  | "brands"
  | "cta";

export interface ProductsPageData {
  sectionOrder: ProductsPageSectionId[];
  sectionVisibility: Record<ProductsPageSectionId, boolean>;
  hero: {
    badge: string;
    heading: string;
    subtitle: string;
    backgroundImage: string;
    primaryCtaText: string;
    primaryCtaLink: string;
    secondaryCtaText: string;
    secondaryCtaLink: string;
  };
  quoteBanner: {
    heading: string;
    subtitle: string;
    buttonText: string;
  };
  brands: {
    badge: string;
    heading: string;
    subtitle: string;
  };
  cta: {
    heading: string;
    subtitle: string;
    primaryBtnText: string;
    primaryBtnLink: string;
  };
}

/* ========================================================================= */
/* PROJECTS PAGE BUILDER TYPES                                               */
/* ========================================================================= */
export type ProjectsPageSectionId =
  | "hero"
  | "stats"
  | "case_studies"
  | "testimonial"
  | "cta";

export interface ProjectsPageData {
  sectionOrder: ProjectsPageSectionId[];
  sectionVisibility: Record<ProjectsPageSectionId, boolean>;
  hero: {
    badge: string;
    heading: string;
    subtitle: string;
    backgroundImage: string;
    primaryCtaText: string;
    primaryCtaLink: string;
    secondaryCtaText: string;
    secondaryCtaLink: string;
  };
  stats: {
    items: { number: string; label: string }[];
  };
  testimonial: {
    quote: string;
    author: string;
    role: string;
    company: string;
  };
  cta: {
    heading: string;
    subtitle: string;
    primaryBtnText: string;
    primaryBtnLink: string;
  };
}

/* ========================================================================= */
/* GALLERY PAGE BUILDER TYPES                                                */
/* ========================================================================= */
export type GalleryPageSectionId =
  | "hero"
  | "categories_filter"
  | "media_grid"
  | "virtual_tour"
  | "cta";

export interface GalleryPageData {
  sectionOrder: GalleryPageSectionId[];
  sectionVisibility: Record<GalleryPageSectionId, boolean>;
  hero: {
    badge: string;
    heading: string;
    subtitle: string;
    backgroundImage: string;
    primaryCtaText: string;
    primaryCtaLink: string;
  };
  virtualTour: {
    heading: string;
    subtitle: string;
    buttonText: string;
    buttonLink: string;
  };
  cta: {
    heading: string;
    subtitle: string;
    primaryBtnText: string;
    primaryBtnLink: string;
  };
}

/* ========================================================================= */
/* BLOG PAGE BUILDER TYPES                                                   */
/* ========================================================================= */
export type BlogPageSectionId =
  | "hero"
  | "featured"
  | "articles_grid"
  | "newsletter"
  | "cta";

export interface BlogPageData {
  sectionOrder: BlogPageSectionId[];
  sectionVisibility: Record<BlogPageSectionId, boolean>;
  hero: {
    badge: string;
    heading: string;
    subtitle: string;
    backgroundImage: string;
    primaryCtaText: string;
    primaryCtaLink: string;
  };
  featured: {
    badge: string;
    heading: string;
  };
  newsletter: {
    heading: string;
    subtitle: string;
    buttonText: string;
  };
  cta: {
    heading: string;
    subtitle: string;
    primaryBtnText: string;
    primaryBtnLink: string;
  };
}

/* ========================================================================= */
/* CONTACT PAGE BUILDER TYPES                                                */
/* ========================================================================= */
export type ContactPageSectionId =
  | "hero"
  | "form_mode"
  | "locations_cards"
  | "emergency_support"
  | "faq_callout";

export interface ContactPageData {
  sectionOrder: ContactPageSectionId[];
  sectionVisibility: Record<ContactPageSectionId, boolean>;
  hero: {
    badge: string;
    heading: string;
    subtitle: string;
    backgroundImage: string;
    primaryCtaText: string;
    primaryCtaLink: string;
  };
  formMode: {
    inquiryTabLabel: string;
    surveyTabLabel: string;
    inquiryHeading: string;
    surveyHeading: string;
  };
  emergencySupport: {
    badge: string;
    title: string;
    desc: string;
    phone: string;
    hours: string;
  };
  faqCallout: {
    title: string;
    desc: string;
    btnText: string;
    btnLink: string;
  };
}

export type ServicesPageSectionId =
  | "hero"
  | "intro"
  | "services_grid"
  | "why_choose"
  | "industries"
  | "process"
  | "stats"
  | "faqs"
  | "cta";

export interface ServicesPageData {
  sectionOrder: ServicesPageSectionId[];
  sectionVisibility: Record<ServicesPageSectionId, boolean>;
  hero: {
    badge: string;
    heading: string;
    subtitle: string;
    backgroundImage: string;
    primaryCtaText: string;
    primaryCtaLink: string;
    secondaryCtaText: string;
    secondaryCtaLink: string;
  };
  intro: {
    heading: string;
    p1: string;
    p2: string;
  };
  servicesGrid: {
    badge: string;
  };
  whyChoose: {
    badge: string;
    heading: string;
    subtitle: string;
    items: string[];
  };
  industries: {
    badge: string;
    heading: string;
    items: { name: string; desc: string }[];
  };
  process: {
    badge: string;
    heading: string;
    steps: { step: string; title: string; desc: string }[];
  };
  stats: {
    items: string[];
  };
  faqs: {
    badge: string;
    heading: string;
    items: { q: string; a: string }[];
  };
  cta: {
    heading: string;
    subtitle: string;
    primaryBtnText: string;
    primaryBtnLink: string;
    secondaryBtnText: string;
    secondaryBtnLink: string;
  };
}

/* ========================================================================= */
/* 14. WEBSITE FOOTER CONTENT TYPES                                          */
/* ========================================================================= */
export interface FooterData {
  preFooter: {
    phoneLabel: string;
    phoneNumber: string;
    emailLabel: string;
    emailAddress: string;
    addressLabel: string;
    addressText: string;
  };
  company: {
    title: string;
    subtitle: string;
    description: string;
    certificationsBadge: string;
    logoUrl?: string;
    headerLogoUrl?: string;
  };
  newsletter: {
    heading: string;
    subtitle: string;
    placeholder: string;
    buttonText: string;
  };
  bottomBar: {
    copyright: string;
    madeInText: string;
    showPolicies: boolean;
  };
}

/* ========================================================================= */
/* SOLUTIONS PAGE BUILDER TYPES                                              */
/* ========================================================================= */
export type SolutionsPageSectionId =
  | "hero"
  | "industries_tabs"
  | "architecture"
  | "why_choose"
  | "outcomes"
  | "cta";

export interface SolutionsPageData {
  sectionOrder: SolutionsPageSectionId[];
  sectionVisibility: Record<SolutionsPageSectionId, boolean>;
  hero: {
    badge: string;
    heading: string;
    subtitle: string;
    backgroundImage: string;
    primaryCtaText: string;
    primaryCtaLink: string;
    secondaryCtaText: string;
    secondaryCtaLink: string;
  };
  architecture: {
    badge: string;
    heading: string;
    subtitle: string;
    steps: { number: string; title: string; desc: string }[];
  };
  whyChoose: {
    badge: string;
    heading: string;
    subtitle: string;
    items: { title: string; desc: string }[];
  };
  outcomes: {
    badge: string;
    heading: string;
    metrics: { stat: string; label: string; desc: string }[];
  };
  cta: {
    heading: string;
    subtitle: string;
    primaryBtnText: string;
    primaryBtnLink: string;
    secondaryBtnText: string;
    secondaryBtnLink: string;
  };
}

/* ========================================================================= */
/* PRODUCTS PAGE BUILDER TYPES                                               */
/* ========================================================================= */
export type ProductsPageSectionId =
  | "hero"
  | "categories_bar"
  | "catalog_grid"
  | "quote_banner"
  | "brands"
  | "cta";

export interface ProductsPageData {
  sectionOrder: ProductsPageSectionId[];
  sectionVisibility: Record<ProductsPageSectionId, boolean>;
  hero: {
    badge: string;
    heading: string;
    subtitle: string;
    backgroundImage: string;
    primaryCtaText: string;
    primaryCtaLink: string;
    secondaryCtaText: string;
    secondaryCtaLink: string;
  };
  quoteBanner: {
    heading: string;
    subtitle: string;
    buttonText: string;
  };
  brands: {
    badge: string;
    heading: string;
    subtitle: string;
  };
  cta: {
    heading: string;
    subtitle: string;
    primaryBtnText: string;
    primaryBtnLink: string;
  };
}

/* ========================================================================= */
/* PROJECTS PAGE BUILDER TYPES                                               */
/* ========================================================================= */
export type ProjectsPageSectionId =
  | "hero"
  | "stats"
  | "case_studies"
  | "testimonial"
  | "cta";

export interface ProjectsPageData {
  sectionOrder: ProjectsPageSectionId[];
  sectionVisibility: Record<ProjectsPageSectionId, boolean>;
  hero: {
    badge: string;
    heading: string;
    subtitle: string;
    backgroundImage: string;
    primaryCtaText: string;
    primaryCtaLink: string;
    secondaryCtaText: string;
    secondaryCtaLink: string;
  };
  stats: {
    items: { number: string; label: string }[];
  };
  testimonial: {
    quote: string;
    author: string;
    role: string;
    company: string;
  };
  cta: {
    heading: string;
    subtitle: string;
    primaryBtnText: string;
    primaryBtnLink: string;
  };
}

/* ========================================================================= */
/* GALLERY PAGE BUILDER TYPES                                                */
/* ========================================================================= */
export type GalleryPageSectionId =
  | "hero"
  | "categories_filter"
  | "media_grid"
  | "virtual_tour"
  | "cta";

export interface GalleryPageData {
  sectionOrder: GalleryPageSectionId[];
  sectionVisibility: Record<GalleryPageSectionId, boolean>;
  hero: {
    badge: string;
    heading: string;
    subtitle: string;
    backgroundImage: string;
    primaryCtaText: string;
    primaryCtaLink: string;
  };
  virtualTour: {
    heading: string;
    subtitle: string;
    buttonText: string;
    buttonLink: string;
  };
  cta: {
    heading: string;
    subtitle: string;
    primaryBtnText: string;
    primaryBtnLink: string;
  };
}

/* ========================================================================= */
/* BLOG PAGE BUILDER TYPES                                                   */
/* ========================================================================= */
export type BlogPageSectionId =
  | "hero"
  | "featured"
  | "articles_grid"
  | "newsletter"
  | "cta";

export interface BlogPageData {
  sectionOrder: BlogPageSectionId[];
  sectionVisibility: Record<BlogPageSectionId, boolean>;
  hero: {
    badge: string;
    heading: string;
    subtitle: string;
    backgroundImage: string;
    primaryCtaText: string;
    primaryCtaLink: string;
  };
  featured: {
    badge: string;
    heading: string;
  };
  newsletter: {
    heading: string;
    subtitle: string;
    buttonText: string;
  };
  cta: {
    heading: string;
    subtitle: string;
    primaryBtnText: string;
    primaryBtnLink: string;
  };
}

/* ========================================================================= */
/* CONTACT PAGE BUILDER TYPES                                                */
/* ========================================================================= */
export type ContactPageSectionId =
  | "hero"
  | "form_mode"
  | "locations_cards"
  | "emergency_support"
  | "faq_callout";

export interface ContactPageData {
  sectionOrder: ContactPageSectionId[];
  sectionVisibility: Record<ContactPageSectionId, boolean>;
  hero: {
    badge: string;
    heading: string;
    subtitle: string;
    backgroundImage: string;
    primaryCtaText: string;
    primaryCtaLink: string;
  };
  formMode: {
    inquiryTabLabel: string;
    surveyTabLabel: string;
    inquiryHeading: string;
    surveyHeading: string;
  };
  emergencySupport: {
    badge: string;
    title: string;
    desc: string;
    phone: string;
    hours: string;
  };
  faqCallout: {
    title: string;
    desc: string;
    btnText: string;
    btnLink: string;
  };
}
