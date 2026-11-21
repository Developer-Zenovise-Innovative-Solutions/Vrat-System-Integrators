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
}

export interface ActivityLog {
  id: string;
  user: string;
  role: string;
  action: string;
  module: string;
  details: string;
  timestamp: string;
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

export interface GlobalSettings {
  companyName: string;
  tagline: string;
  primaryEmail: string;
  salesEmail: string;
  supportEmail: string;
  careersEmail: string;
  phone: string;
  emergencyHotline: string;
  whatsappNumber: string;
  address: string;
  cityStateZip: string;
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
