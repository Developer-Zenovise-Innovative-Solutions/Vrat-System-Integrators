import React, { useState, useEffect } from "react";
import { useCMS } from "../context/CMSContext";
import { useToast } from "../context/ToastContext";
import ImageUploader from "../components/ImageUploader";
import ServicesPageBuilder from "./pages/ServicesPageBuilder";
import ServiceSubPageEditor from "./pages/ServiceSubPageEditor";
import SolutionsPageBuilder from "./pages/SolutionsPageBuilder";
import SolutionSubPageEditor from "./pages/SolutionSubPageEditor";
import ProductsPageBuilder from "./pages/ProductsPageBuilder";
import ProjectsPageBuilder from "./pages/ProjectsPageBuilder";
import GalleryPageBuilder from "./pages/GalleryPageBuilder";
import BlogPageBuilder from "./pages/BlogPageBuilder";
import ContactPageBuilder from "./pages/ContactPageBuilder";
import FooterBuilder from "./pages/FooterBuilder";
import {
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
import {
  HomePageData,
  HomePageSectionId,
  AboutPageData,
  AboutPageSectionId,
  ServicesPageData,
  ServiceItem,
  FooterData,
  SolutionsPageData,
  ProductsPageData,
  ProjectsPageData,
  GalleryPageData,
  BlogPageData,
  ContactPageData,
  IndustrySolution,
} from "../types";
import {
  Sliders,
  Save,
  Eye,
  EyeOff,
  CheckCircle2,
  ArrowUp,
  ArrowDown,
  RotateCcw,
  ChevronDown,
  ChevronUp,
  ChevronRight,
  LayoutGrid,
  FileText,
  Image as ImageIcon,
  Sparkles,
  ExternalLink,
  Loader2,
  AlertCircle,
  ShieldCheck,
  Award,
  Users,
  Briefcase,
  HelpCircle,
  Megaphone,
  Mail,
  Zap,
  Target,
  Edit3,
  Layers,
  FolderTree,
  Plus,
  Trash2,
} from "lucide-react";

const HOME_SECTION_METADATA: Record<
  HomePageSectionId,
  { title: string; desc: string; icon: any; color: string }
> = {
  hero: {
    title: "1. Hero Banner",
    desc: "Top introductory banner with main headline, CTA buttons, and background image.",
    icon: Sparkles,
    color: "text-blue-400 bg-blue-500/10 border-blue-500/20",
  },
  trust_stats: {
    title: "2. Trust Stats Bar",
    desc: "Key credential numbers under the hero (e.g. 17+ Years, 500+ Projects).",
    icon: Award,
    color: "text-amber-400 bg-amber-500/10 border-amber-500/20",
  },
  about: {
    title: "3. Who We Are (About VRAT)",
    desc: "Company overview narrative, side image, customer satisfaction badge, and CTA.",
    icon: ShieldCheck,
    color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
  },
  why_choose: {
    title: "4. Why Choose Us",
    desc: "6 core value propositions highlighting team experience, end-to-end solutions, and 24x7 support.",
    icon: CheckCircle2,
    color: "text-indigo-400 bg-indigo-500/10 border-indigo-500/20",
  },
  services: {
    title: "5. Our Services Grid",
    desc: "Services section heading, intro subtitle, and link to complete services catalog.",
    icon: LayoutGrid,
    color: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
  },
  industries: {
    title: "6. Industries We Serve",
    desc: "10 industry sectors with custom cover images and category labels.",
    icon: Briefcase,
    color: "text-violet-400 bg-violet-500/10 border-violet-500/20",
  },
  process: {
    title: "7. Our Process (How We Deliver Success)",
    desc: "6 structured execution steps from consultation to training and maintenance.",
    icon: Zap,
    color: "text-sky-400 bg-sky-500/10 border-sky-500/20",
  },
  projects: {
    title: "8. Featured Projects",
    desc: "Selected flagship case studies across industrial, educational, and corporate sectors.",
    icon: FileText,
    color: "text-orange-400 bg-orange-500/10 border-orange-500/20",
  },
  partners: {
    title: "9. Technology Partners",
    desc: "Global brand credentials and technology partnership certifications.",
    icon: Users,
    color: "text-teal-400 bg-teal-500/10 border-teal-500/20",
  },
  stats: {
    title: "10. Statistics Banner",
    desc: "High-contrast dark statistics banner with 6 enterprise achievement metrics.",
    icon: Award,
    color: "text-blue-400 bg-blue-500/10 border-blue-500/20",
  },
  testimonials: {
    title: "11. Client Testimonials",
    desc: "Real feedback, client quotes, and carousel reviews.",
    icon: HelpCircle,
    color: "text-pink-400 bg-pink-500/10 border-pink-500/20",
  },
  cta: {
    title: "12. Call To Action Banner",
    desc: "Full-width blue action banner driving inquiries and site survey requests.",
    icon: Megaphone,
    color: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20",
  },
  newsletter: {
    title: "13. Newsletter Subscription",
    desc: "Bottom email newsletter capture connected to CRM leads.",
    icon: Mail,
    color: "text-slate-400 bg-slate-500/10 border-slate-500/20",
  },
};

const ABOUT_SECTION_METADATA: Record<
  AboutPageSectionId,
  { title: string; desc: string; icon: any; color: string }
> = {
  hero: {
    title: "1. Hero Banner",
    desc: "Top introductory banner with main headline, CTA buttons, and background image.",
    icon: Sparkles,
    color: "text-blue-400 bg-blue-500/10 border-blue-500/20",
  },
  who_we_are: {
    title: "2. Who We Are (Overview & 4-Image Grid)",
    desc: "Company intro narrative, 3 paragraphs, and 4 collage showcase images.",
    icon: ShieldCheck,
    color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
  },
  story: {
    title: "3. Our Story (Blue Banner)",
    desc: "Full-width blue narrative on the founding and growth of VRAT System Integrators.",
    icon: FileText,
    color: "text-blue-400 bg-blue-500/10 border-blue-500/20",
  },
  vision_mission: {
    title: "4. Vision & Mission",
    desc: "Side-by-side cards highlighting company vision and 5 core mission execution points.",
    icon: Target,
    color: "text-indigo-400 bg-indigo-500/10 border-indigo-500/20",
  },
  core_values: {
    title: "5. Core Values",
    desc: "6 guiding principles: Integrity, Customer First, Innovation, Quality, Excellence, Teamwork.",
    icon: CheckCircle2,
    color: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
  },
  timeline: {
    title: "6. Company Timeline (Growth Journey)",
    desc: "Chronological milestone timeline from 2007 establishment to 2026 AI solutions.",
    icon: Award,
    color: "text-amber-400 bg-amber-500/10 border-amber-500/20",
  },
  why_choose: {
    title: "7. Why Choose VRAT",
    desc: "4 enterprise trust pillars with custom icons, titles, and descriptions.",
    icon: LayoutGrid,
    color: "text-violet-400 bg-violet-500/10 border-violet-500/20",
  },
  leadership: {
    title: "8. Leadership & Meet Our Experts",
    desc: "Leadership overview narrative, team heading, and 8 certified expert roles.",
    icon: Users,
    color: "text-teal-400 bg-teal-500/10 border-teal-500/20",
  },
  certifications: {
    title: "9. Certifications & Compliance",
    desc: "6 industry standards and compliance badges (GST, Vendor, OEM, Safety).",
    icon: ShieldCheck,
    color: "text-sky-400 bg-sky-500/10 border-sky-500/20",
  },
  partners: {
    title: "10. Technology Partners",
    desc: "Technology brands header and credentials section.",
    icon: Briefcase,
    color: "text-pink-400 bg-pink-500/10 border-pink-500/20",
  },
  sustainability: {
    title: "11. Sustainability & Innovation",
    desc: "Smart green infrastructure, 6 sustainability bullet points, and showcase image asset.",
    icon: Sparkles,
    color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
  },
  cta: {
    title: "12. Call To Action Banner",
    desc: "Full-width blue action banner with Consultation and Site Survey buttons.",
    icon: Megaphone,
    color: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20",
  },
};

export default function AdminPagesBuilder() {
  const {
    heroConfigs,
    updateHeroConfig,
    homePageData,
    updateHomePageData,
    aboutPageData,
    updateAboutPageData,
    servicesPageData,
    updateServicesPageData,
    services,
    updateService,
    solutions,
    updateSolution,
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
    addLog,
  } = useCMS();
  const toast = useToast();

  const [selectedPageId, setSelectedPageId] = useState("home");
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Navigation sidebar collapse states
  const [servicesExpanded, setServicesExpanded] = useState(false);
  const [solutionsExpanded, setSolutionsExpanded] = useState(false);

  // Home Page State & Tabs
  const [homeActiveTab, setHomeActiveTab] = useState<"reorder" | "content">("reorder");
  const [homeData, setHomeData] = useState<HomePageData>(() => homePageData || INITIAL_HOME_PAGE_DATA);
  const [expandedSection, setExpandedSection] = useState<HomePageSectionId | null>("hero");

  // About Page State & Tabs
  const [aboutActiveTab, setAboutActiveTab] = useState<"reorder" | "content">("reorder");
  const [aboutData, setAboutData] = useState<AboutPageData>(() => aboutPageData || INITIAL_ABOUT_PAGE_DATA);
  const [aboutExpandedSection, setAboutExpandedSection] = useState<AboutPageSectionId | null>("hero");

  // Services Page State
  const [servicesData, setServicesData] = useState<ServicesPageData>(
    () => servicesPageData || INITIAL_SERVICES_PAGE_DATA
  );

  // Solutions Page State
  const [solutionsData, setSolutionsData] = useState<SolutionsPageData>(
    () => solutionsPageData || INITIAL_SOLUTIONS_PAGE_DATA
  );

  // Products Page State
  const [productsData, setProductsData] = useState<ProductsPageData>(
    () => productsPageData || INITIAL_PRODUCTS_PAGE_DATA
  );

  // Projects Page State
  const [projectsData, setProjectsData] = useState<ProjectsPageData>(
    () => projectsPageData || INITIAL_PROJECTS_PAGE_DATA
  );

  // Gallery Page State
  const [galleryData, setGalleryData] = useState<GalleryPageData>(
    () => galleryPageData || INITIAL_GALLERY_PAGE_DATA
  );

  // Blog Page State
  const [blogData, setBlogData] = useState<BlogPageData>(
    () => blogPageData || INITIAL_BLOG_PAGE_DATA
  );

  // Contact Page State
  const [contactData, setContactData] = useState<ContactPageData>(
    () => contactPageData || INITIAL_CONTACT_PAGE_DATA
  );

  // Footer Data State
  const [footerDataState, setFooterDataState] = useState<FooterData>(
    () => footerData || INITIAL_FOOTER_DATA
  );

  // Other pages hero state
  const activeHeroConfig = heroConfigs[selectedPageId] || {
    pageId: selectedPageId,
    pageName: selectedPageId,
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
  const [heroFormData, setHeroFormData] = useState(activeHeroConfig);

  useEffect(() => {
    if (homePageData) setHomeData(homePageData);
  }, [homePageData]);

  useEffect(() => {
    if (aboutPageData) setAboutData(aboutPageData);
  }, [aboutPageData]);

  useEffect(() => {
    if (servicesPageData) setServicesData(servicesPageData);
  }, [servicesPageData]);

  useEffect(() => {
    if (solutionsPageData) setSolutionsData(solutionsPageData);
  }, [solutionsPageData]);

  useEffect(() => {
    if (productsPageData) setProductsData(productsPageData);
  }, [productsPageData]);

  useEffect(() => {
    if (projectsPageData) setProjectsData(projectsPageData);
  }, [projectsPageData]);

  useEffect(() => {
    if (galleryPageData) setGalleryData(galleryPageData);
  }, [galleryPageData]);

  useEffect(() => {
    if (blogPageData) setBlogData(blogPageData);
  }, [blogPageData]);

  useEffect(() => {
    if (contactPageData) setContactData(contactPageData);
  }, [contactPageData]);

  useEffect(() => {
    if (footerData) setFooterDataState(footerData);
  }, [footerData]);

  useEffect(() => {
    if (heroConfigs[selectedPageId]) {
      setHeroFormData(heroConfigs[selectedPageId]);
    }
  }, [heroConfigs, selectedPageId]);

  const handleSelectPage = (pageId: string) => {
    setSelectedPageId(pageId);
    setSaveSuccess(false);
    setErrorMessage("");
    if (pageId.startsWith("service_") || pageId === "services") {
      setServicesExpanded(true);
    }
    if (pageId !== "home" && pageId !== "about" && pageId !== "services" && !pageId.startsWith("service_")) {
      setHeroFormData(
        heroConfigs[pageId] || {
          pageId,
          pageName: pageId.toUpperCase(),
          heading: "",
          subtitle: "",
          backgroundImage: "",
          primaryCtaText: "Request Consultation",
          primaryCtaLink: "/contact",
          secondaryCtaText: "Learn More",
          secondaryCtaLink: "/services",
          showSection: true,
          status: "Published",
        }
      );
    }
  };

  // Home Page Section Placement Handlers
  const handleHomeMoveUp = (index: number) => {
    if (index === 0) return;
    const newOrder = [...homeData.sectionOrder];
    const temp = newOrder[index - 1];
    newOrder[index - 1] = newOrder[index];
    newOrder[index] = temp;
    setHomeData((prev) => ({ ...prev, sectionOrder: newOrder }));
  };

  const handleHomeMoveDown = (index: number) => {
    if (index === homeData.sectionOrder.length - 1) return;
    const newOrder = [...homeData.sectionOrder];
    const temp = newOrder[index + 1];
    newOrder[index + 1] = newOrder[index];
    newOrder[index] = temp;
    setHomeData((prev) => ({ ...prev, sectionOrder: newOrder }));
  };

  const handleHomeToggleVisibility = (secId: HomePageSectionId) => {
    setHomeData((prev) => ({
      ...prev,
      sectionVisibility: {
        ...prev.sectionVisibility,
        [secId]: prev.sectionVisibility[secId] === false ? true : false,
      },
    }));
  };

  const handleResetHomeLayout = () => {
    if (window.confirm("Reset Home Page sections to original layout and order?")) {
      setHomeData(INITIAL_HOME_PAGE_DATA);
      toast.info("Layout Reset", "Restored original Home Page section order.");
    }
  };

  // About Page Section Placement Handlers
  const handleAboutMoveUp = (index: number) => {
    if (index === 0) return;
    const newOrder = [...aboutData.sectionOrder];
    const temp = newOrder[index - 1];
    newOrder[index - 1] = newOrder[index];
    newOrder[index] = temp;
    setAboutData((prev) => ({ ...prev, sectionOrder: newOrder }));
  };

  const handleAboutMoveDown = (index: number) => {
    if (index === aboutData.sectionOrder.length - 1) return;
    const newOrder = [...aboutData.sectionOrder];
    const temp = newOrder[index + 1];
    newOrder[index + 1] = newOrder[index];
    newOrder[index] = temp;
    setAboutData((prev) => ({ ...prev, sectionOrder: newOrder }));
  };

  const handleAboutToggleVisibility = (secId: AboutPageSectionId) => {
    setAboutData((prev) => ({
      ...prev,
      sectionVisibility: {
        ...prev.sectionVisibility,
        [secId]: prev.sectionVisibility[secId] === false ? true : false,
      },
    }));
  };

  const handleResetAboutLayout = () => {
    if (window.confirm("Reset About Us Page sections to original layout and order?")) {
      setAboutData(INITIAL_ABOUT_PAGE_DATA);
      toast.info("Layout Reset", "Restored original About Us Page section order.");
    }
  };

  // Save Handlers
  const handleSaveHome = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setErrorMessage("");
    setSaveSuccess(false);

    try {
      await updateHomePageData(homeData);

      await updateHeroConfig("home", {
        heading: homeData.hero.heading,
        subtitle: homeData.hero.subtitle,
        backgroundImage: homeData.hero.backgroundImage,
        primaryCtaText: homeData.hero.primaryCtaText,
        primaryCtaLink: homeData.hero.primaryCtaLink,
        secondaryCtaText: homeData.hero.secondaryCtaText,
        secondaryCtaLink: homeData.hero.secondaryCtaLink,
        showSection: homeData.sectionVisibility.hero !== false,
      });

      addLog("Updated Home Page", "Page Builder", "Saved all Home Page sections order, visibility, and details.");
      setSaveSuccess(true);
      toast.success(
        "Home Page Published!",
        "All changes & section order are now live and synced across all devices."
      );
      setTimeout(() => setSaveSuccess(false), 4500);
    } catch (err: any) {
      const msg = err?.message || "Failed to save Home Page. Please try again.";
      setErrorMessage(msg);
      toast.error("Save Failed", msg);
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveAbout = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setErrorMessage("");
    setSaveSuccess(false);

    try {
      await updateAboutPageData(aboutData);

      await updateHeroConfig("about", {
        heading: aboutData.hero.heading,
        subtitle: aboutData.hero.subtitle,
        backgroundImage: aboutData.hero.backgroundImage,
        primaryCtaText: aboutData.hero.primaryCtaText,
        primaryCtaLink: aboutData.hero.primaryCtaLink,
        secondaryCtaText: aboutData.hero.secondaryCtaText,
        secondaryCtaLink: aboutData.hero.secondaryCtaLink,
        showSection: aboutData.sectionVisibility.hero !== false,
      });

      addLog("Updated About Us Page", "Page Builder", "Saved all About Us Page sections order, visibility, and details.");
      setSaveSuccess(true);
      toast.success(
        "About Us Page Published!",
        "All changes & section order are now live and synced across all devices."
      );
      setTimeout(() => setSaveSuccess(false), 4500);
    } catch (err: any) {
      const msg = err?.message || "Failed to save About Us Page. Please try again.";
      setErrorMessage(msg);
      toast.error("Save Failed", msg);
    } finally {
      setIsSaving(false);
    }
  };

  const handleResetServicesLayout = () => {
    if (window.confirm("Reset Services Overview sections to original layout and order?")) {
      setServicesData(INITIAL_SERVICES_PAGE_DATA);
      toast.info("Layout Reset", "Restored original Services Overview section order.");
    }
  };

  const handleSaveServices = async () => {
    setIsSaving(true);
    setErrorMessage("");
    setSaveSuccess(false);

    try {
      await updateServicesPageData(servicesData);
      setSaveSuccess(true);
      toast.success(
        "Services Overview Published!",
        "All 9 sections and custom order have been updated and synced to the live website."
      );
      setTimeout(() => setSaveSuccess(false), 4500);
    } catch (err: any) {
      const msg = err?.message || "Failed to save Services Overview. Please try again.";
      setErrorMessage(msg);
      toast.error("Save Failed", msg);
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveSubPage = async (updatedService: Partial<ServiceItem>) => {
    setIsSaving(true);
    setErrorMessage("");
    setSaveSuccess(false);

    try {
      if (updatedService.id) {
        updateService(updatedService.id, updatedService);
        setSaveSuccess(true);
        toast.success(
          "Service Sub-Page Published!",
          `"${updatedService.title}" sub-page content, images, and features are now live.`
        );
        setTimeout(() => setSaveSuccess(false), 4500);
      }
    } catch (err: any) {
      const msg = err?.message || "Failed to update service sub-page.";
      setErrorMessage(msg);
      toast.error("Save Failed", msg);
    } finally {
      setIsSaving(false);
    }
  };

  const SERVICE_SUB_PAGES = [
    { id: "service_cctv", slug: "cctv", name: "CCTV Surveillance Systems", icon: "📹" },
    { id: "service_fire-alarm", slug: "fire-alarm", name: "Fire Alarm Systems", icon: "🔥" },
    { id: "service_access-control", slug: "access-control", name: "Access Control Systems", icon: "🔐" },
    { id: "service_time-attendance", slug: "time-attendance", name: "Time Attendance Systems", icon: "⏱️" },
    { id: "service_public-address", slug: "public-address", name: "Public Address & Evacuation", icon: "📢" },
    { id: "service_video-door-phone", slug: "video-door-phone", name: "Video Door Phone Systems", icon: "📱" },
    { id: "service_boom-barrier", slug: "boom-barrier", name: "Boom Barrier & Parking", icon: "🚧" },
    { id: "service_networking", slug: "networking", name: "Structured Cabling & Networking", icon: "🌐" },
    { id: "service_automation", slug: "automation", name: "Home & Building Automation", icon: "🏠" },
  ];

  const SOLUTION_SUB_PAGES = [
    { id: "solution_commercial", slug: "commercial", name: "Commercial & Corporate Buildings", icon: "🏢" },
    { id: "solution_industrial", slug: "industrial", name: "Industrial & Manufacturing Plants", icon: "🏭" },
    { id: "solution_residential", slug: "residential", name: "Residential Communities & Smart Villas", icon: "🏡" },
    { id: "solution_education", slug: "education", name: "Educational Campuses & Smart Schools", icon: "🎓" },
    { id: "solution_healthcare", slug: "healthcare", name: "Healthcare & Smart Hospitals", icon: "🏥" },
    { id: "solution_retail", slug: "retail", name: "Retail Stores & Shopping Malls", icon: "🛍️" },
    { id: "solution_warehouses", slug: "warehouses", name: "Warehouses & Logistics Centers", icon: "📦" },
    { id: "solution_smart-cities", slug: "smart-cities", name: "Smart Cities & Urban Infrastructure", icon: "🏙️" },
  ];

  const handleSaveSolutions = async () => {
    setIsSaving(true);
    setErrorMessage("");
    setSaveSuccess(false);
    try {
      await updateSolutionsPageData(solutionsData);
      setSaveSuccess(true);
      toast.success("Solutions Page Published!", "Custom section order, architecture steps, and CTAs saved.");
      setTimeout(() => setSaveSuccess(false), 4500);
    } catch (err: any) {
      const msg = err?.message || "Failed to update solutions page.";
      setErrorMessage(msg);
      toast.error("Save Failed", msg);
    } finally {
      setIsSaving(false);
    }
  };

  const handleResetSolutionsLayout = () => {
    if (window.confirm("Reset Industry Solutions Page to default layout?")) {
      setSolutionsData(INITIAL_SOLUTIONS_PAGE_DATA);
      updateSolutionsPageData(INITIAL_SOLUTIONS_PAGE_DATA);
      toast.info("Layout Reset", "Solutions page sections restored to default layout.");
    }
  };

  const handleSaveSolutionSubPage = async (updatedSolution: Partial<IndustrySolution>) => {
    setIsSaving(true);
    setErrorMessage("");
    setSaveSuccess(false);
    try {
      if (updatedSolution.id) {
        updateSolution(updatedSolution.id, updatedSolution);
        setSaveSuccess(true);
        toast.success("Industry Sub-Page Published!", `"${updatedSolution.title}" sector details and challenges updated.`);
        setTimeout(() => setSaveSuccess(false), 4500);
      }
    } catch (err: any) {
      const msg = err?.message || "Failed to update industry sub-page.";
      setErrorMessage(msg);
      toast.error("Save Failed", msg);
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveProducts = async () => {
    setIsSaving(true);
    setErrorMessage("");
    setSaveSuccess(false);
    try {
      await updateProductsPageData(productsData);
      setSaveSuccess(true);
      toast.success("Products Catalog Page Published!", "Custom section order and quote banner saved.");
      setTimeout(() => setSaveSuccess(false), 4500);
    } catch (err: any) {
      const msg = err?.message || "Failed to update products page.";
      setErrorMessage(msg);
      toast.error("Save Failed", msg);
    } finally {
      setIsSaving(false);
    }
  };

  const handleResetProductsLayout = () => {
    if (window.confirm("Reset Products Page layout to default?")) {
      setProductsData(INITIAL_PRODUCTS_PAGE_DATA);
      updateProductsPageData(INITIAL_PRODUCTS_PAGE_DATA);
      toast.info("Layout Reset", "Products page sections restored to defaults.");
    }
  };

  const handleSaveProjects = async () => {
    setIsSaving(true);
    setErrorMessage("");
    setSaveSuccess(false);
    try {
      await updateProjectsPageData(projectsData);
      setSaveSuccess(true);
      toast.success("Projects Page Published!", "Statistics bar, testimonial, and section order saved.");
      setTimeout(() => setSaveSuccess(false), 4500);
    } catch (err: any) {
      const msg = err?.message || "Failed to update projects page.";
      setErrorMessage(msg);
      toast.error("Save Failed", msg);
    } finally {
      setIsSaving(false);
    }
  };

  const handleResetProjectsLayout = () => {
    if (window.confirm("Reset Projects Page layout to default?")) {
      setProjectsData(INITIAL_PROJECTS_PAGE_DATA);
      updateProjectsPageData(INITIAL_PROJECTS_PAGE_DATA);
      toast.info("Layout Reset", "Projects page sections restored to defaults.");
    }
  };

  const handleSaveGallery = async () => {
    setIsSaving(true);
    setErrorMessage("");
    setSaveSuccess(false);
    try {
      await updateGalleryPageData(galleryData);
      setSaveSuccess(true);
      toast.success("Gallery Page Published!", "Virtual tour banner, section order, and content saved.");
      setTimeout(() => setSaveSuccess(false), 4500);
    } catch (err: any) {
      const msg = err?.message || "Failed to update gallery page.";
      setErrorMessage(msg);
      toast.error("Save Failed", msg);
    } finally {
      setIsSaving(false);
    }
  };

  const handleResetGalleryLayout = () => {
    if (window.confirm("Reset Gallery Page layout to default?")) {
      setGalleryData(INITIAL_GALLERY_PAGE_DATA);
      updateGalleryPageData(INITIAL_GALLERY_PAGE_DATA);
      toast.info("Layout Reset", "Gallery page sections restored to defaults.");
    }
  };

  const handleSaveBlog = async () => {
    setIsSaving(true);
    setErrorMessage("");
    setSaveSuccess(false);
    try {
      await updateBlogPageData(blogData);
      setSaveSuccess(true);
      toast.success("Blog & Insights Page Published!", "Newsletter card, section order, and content saved.");
      setTimeout(() => setSaveSuccess(false), 4500);
    } catch (err: any) {
      const msg = err?.message || "Failed to update blog page.";
      setErrorMessage(msg);
      toast.error("Save Failed", msg);
    } finally {
      setIsSaving(false);
    }
  };

  const handleResetBlogLayout = () => {
    if (window.confirm("Reset Blog Page layout to default?")) {
      setBlogData(INITIAL_BLOG_PAGE_DATA);
      updateBlogPageData(INITIAL_BLOG_PAGE_DATA);
      toast.info("Layout Reset", "Blog page sections restored to defaults.");
    }
  };

  const handleSaveContact = async () => {
    setIsSaving(true);
    setErrorMessage("");
    setSaveSuccess(false);
    try {
      await updateContactPageData(contactData);
      setSaveSuccess(true);
      toast.success("Contact Page Published!", "Dual form switcher, emergency support bar, and FAQ callout saved.");
      setTimeout(() => setSaveSuccess(false), 4500);
    } catch (err: any) {
      const msg = err?.message || "Failed to update contact page.";
      setErrorMessage(msg);
      toast.error("Save Failed", msg);
    } finally {
      setIsSaving(false);
    }
  };

  const handleResetContactLayout = () => {
    if (window.confirm("Reset Contact Page layout to default?")) {
      setContactData(INITIAL_CONTACT_PAGE_DATA);
      updateContactPageData(INITIAL_CONTACT_PAGE_DATA);
      toast.info("Layout Reset", "Contact page sections restored to defaults.");
    }
  };

  const handleSaveFooter = async () => {
    setIsSaving(true);
    setErrorMessage("");
    setSaveSuccess(false);
    try {
      await updateFooterData(footerDataState);
      setSaveSuccess(true);
      toast.success("Footer Content Saved!", "Pre-footer contact bar, company narrative, and legal notices updated.");
      setTimeout(() => setSaveSuccess(false), 4500);
    } catch (err: any) {
      const msg = err?.message || "Failed to save footer content.";
      setErrorMessage(msg);
      toast.error("Save Failed", msg);
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveHero = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setErrorMessage("");
    setSaveSuccess(false);

    try {
      await updateHeroConfig(selectedPageId, heroFormData);
      addLog(
        "Updated Page Hero",
        "Page Builder",
        `Saved changes to page "${heroFormData.pageName}"`
      );

      setSaveSuccess(true);
      toast.success(
        "Changes Saved & Published!",
        `Hero banner for "${heroFormData.pageName}" is now live and synced across all devices.`
      );
      setTimeout(() => setSaveSuccess(false), 4000);
    } catch (err: any) {
      const msg = err?.message || "Failed to update page hero. Please check your network connection.";
      setErrorMessage(msg);
      toast.error("Save Failed", msg);
    } finally {
      setIsSaving(false);
    }
  };

  const pageList = [
    { id: "home", name: "1. Home Page (/)", path: "/" },
    { id: "about", name: "2. About Us (/about)", path: "/about" },
    { id: "services", name: "3. Services Overview (/services)", path: "/services" },
    { id: "products", name: "4. Products Catalog (/products)", path: "/products" },
    { id: "solutions", name: "5. Industry Solutions (/solutions)", path: "/solutions" },
    { id: "projects", name: "6. Projects & Case Studies (/projects)", path: "/projects" },
    { id: "gallery", name: "7. Multimedia Gallery (/gallery)", path: "/gallery" },
    { id: "downloads", name: "8. Download Center (/downloads)", path: "/downloads" },
    { id: "blog", name: "9. Blog & Insights (/blog)", path: "/blog" },
    { id: "careers", name: "10. Careers (/careers)", path: "/careers" },
    { id: "contact", name: "11. Contact Us (/contact)", path: "/contact" },
    { id: "faq", name: "12. FAQ Knowledge Base (/faq)", path: "/faq" },
    { id: "support", name: "13. Customer Support (/support)", path: "/support" },
  ];

  return (
    <div className="space-y-8 animate-fade-in pb-16">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <Sliders className="w-3.5 h-3.5" />
            Dynamic Visual Page Builder & Section Manager
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">
            Page & Section Manager
          </h1>
          <p className="text-slate-400 text-xs mt-1">
            Complete control over section order, placement, visibility, text, images, and CTA buttons. Everything reflects across all devices in real-time.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {saveSuccess && (
            <div className="inline-flex items-center gap-2 bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 px-4 py-2 rounded-xl text-xs font-bold animate-fade-in shadow-md">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Live Website Updated!
            </div>
          )}
          <a
            href={
              selectedPageId === "home"
                ? "/"
                : selectedPageId === "about"
                ? "/about"
                : selectedPageId === "services"
                ? "/services"
                : selectedPageId.startsWith("service_")
                ? `/services/${selectedPageId.replace("service_", "")}`
                : pageList.find((p) => p.id === selectedPageId)?.path || "/"
            }
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 px-4 py-2 bg-slate-900 hover:bg-slate-850 text-slate-300 text-xs font-semibold rounded-xl border border-slate-800 transition shadow-sm"
          >
            <Eye className="w-3.5 h-3.5 text-blue-400" /> Preview Live Site
            <ExternalLink className="w-3 h-3 text-slate-500" />
          </a>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 items-start">
        {/* Left: Page Selector */}
        <div className="lg:col-span-3 bg-slate-950 p-5 rounded-3xl border border-slate-800 space-y-4 sticky top-6">
          <div className="px-2 pb-1 text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between">
            <span>Website Pages</span>
            <span className="text-[10px] text-blue-400 font-mono">22 Total</span>
          </div>

          <div className="space-y-4 max-h-[720px] overflow-y-auto scrollbar-thin pr-1">
            {/* GROUP 1: CORE WEBSITE PAGES */}
            <div>
              <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider px-2 py-1">
                Core Website Pages
              </div>
              <div className="space-y-1 mt-1">
                {/* 1. Home Page */}
                <button
                  type="button"
                  onClick={() => handleSelectPage("home")}
                  className={`w-full text-left px-3.5 py-2.5 rounded-2xl text-xs font-semibold transition flex items-center justify-between ${
                    selectedPageId === "home"
                      ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                      : "text-slate-300 hover:bg-slate-900 hover:text-white"
                  }`}
                >
                  <span className="truncate">1. Home Page (/)</span>
                  {selectedPageId === "home" && (
                    <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full font-mono">ACTIVE</span>
                  )}
                </button>

                {/* 2. About Us */}
                <button
                  type="button"
                  onClick={() => handleSelectPage("about")}
                  className={`w-full text-left px-3.5 py-2.5 rounded-2xl text-xs font-semibold transition flex items-center justify-between ${
                    selectedPageId === "about"
                      ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                      : "text-slate-300 hover:bg-slate-900 hover:text-white"
                  }`}
                >
                  <span className="truncate">2. About Us (/about)</span>
                  {selectedPageId === "about" && (
                    <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full font-mono">ACTIVE</span>
                  )}
                </button>

                {/* 3. Services Overview with Expandable Sub-Pages */}
                <div className="space-y-1">
                  <div
                    className={`w-full rounded-2xl text-xs font-semibold transition flex items-center justify-between pr-2 ${
                      selectedPageId === "services"
                        ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                        : selectedPageId.startsWith("service_")
                        ? "bg-slate-900 text-blue-300 border border-blue-500/30"
                        : "text-slate-300 hover:bg-slate-900 hover:text-white"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => handleSelectPage("services")}
                      className="flex-1 text-left px-3.5 py-2.5 truncate"
                    >
                      3. Services Overview (/services)
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setServicesExpanded(!servicesExpanded);
                      }}
                      className="p-1.5 rounded-lg hover:bg-white/10 text-slate-300"
                      title={servicesExpanded ? "Collapse Sub-Pages" : "Expand 9 Sub-Pages"}
                    >
                      {servicesExpanded ? (
                        <ChevronDown className="w-4 h-4" />
                      ) : (
                        <ChevronRight className="w-4 h-4" />
                      )}
                    </button>
                  </div>

                  {/* 9 Services Sub-Pages Tree */}
                  {servicesExpanded && (
                    <div className="ml-3 pl-3 border-l-2 border-slate-800 space-y-1 pt-1 pb-1">
                      <div className="text-[9px] font-bold uppercase tracking-wider text-blue-400 px-2 py-0.5">
                        9 Core Service Sub-Pages:
                      </div>
                      {SERVICE_SUB_PAGES.map((sub) => {
                        const isSubSelected = selectedPageId === sub.id;
                        return (
                          <button
                            key={sub.id}
                            type="button"
                            onClick={() => handleSelectPage(sub.id)}
                            className={`w-full text-left px-2.5 py-2 rounded-xl text-[11px] font-medium transition flex items-center justify-between gap-1.5 ${
                              isSubSelected
                                ? "bg-blue-600/30 border border-blue-500/50 text-blue-200 font-bold"
                                : "text-slate-400 hover:text-white hover:bg-slate-900"
                            }`}
                          >
                            <span className="truncate flex items-center gap-1.5">
                              <span>{sub.icon}</span>
                              <span className="truncate">{sub.name}</span>
                            </span>
                            {isSubSelected && (
                              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* GROUP 2: CATALOG & SOLUTIONS */}
            <div>
              <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider px-2 py-1">
                Catalogs & Solutions
              </div>
              <div className="space-y-1 mt-1">
                {/* 4. Products Catalog */}
                <button
                  type="button"
                  onClick={() => handleSelectPage("products")}
                  className={`w-full text-left px-3.5 py-2.5 rounded-2xl text-xs font-semibold transition flex items-center justify-between ${
                    selectedPageId === "products"
                      ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                      : "text-slate-300 hover:bg-slate-900 hover:text-white"
                  }`}
                >
                  <span className="truncate">4. Products Catalog (/products)</span>
                  {selectedPageId === "products" && (
                    <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full font-mono">ACTIVE</span>
                  )}
                </button>

                {/* 5. Industry Solutions with Expandable 8 Sub-Pages */}
                <div className="space-y-1">
                  <div
                    className={`w-full rounded-2xl text-xs font-semibold transition flex items-center justify-between pr-2 ${
                      selectedPageId === "solutions"
                        ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                        : selectedPageId.startsWith("solution_")
                        ? "bg-slate-900 text-blue-300 border border-blue-500/30"
                        : "text-slate-300 hover:bg-slate-900 hover:text-white"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => handleSelectPage("solutions")}
                      className="flex-1 text-left px-3.5 py-2.5 truncate"
                    >
                      5. Industry Solutions (/solutions)
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSolutionsExpanded(!solutionsExpanded);
                      }}
                      className="p-1.5 rounded-lg hover:bg-white/10 text-slate-300"
                      title={solutionsExpanded ? "Collapse Sectors" : "Expand 8 Industry Sectors"}
                    >
                      {solutionsExpanded ? (
                        <ChevronDown className="w-4 h-4" />
                      ) : (
                        <ChevronRight className="w-4 h-4" />
                      )}
                    </button>
                  </div>

                  {solutionsExpanded && (
                    <div className="ml-3 pl-3 border-l-2 border-slate-800 space-y-1 pt-1 pb-1">
                      <div className="text-[9px] font-bold uppercase tracking-wider text-blue-400 px-2 py-0.5">
                        8 Industry Sector Sub-Pages:
                      </div>
                      {SOLUTION_SUB_PAGES.map((sub) => {
                        const isSubSelected = selectedPageId === sub.id;
                        return (
                          <button
                            key={sub.id}
                            type="button"
                            onClick={() => handleSelectPage(sub.id)}
                            className={`w-full text-left px-2.5 py-2 rounded-xl text-[11px] font-medium transition flex items-center justify-between gap-1.5 ${
                              isSubSelected
                                ? "bg-blue-600/30 border border-blue-500/50 text-blue-200 font-bold"
                                : "text-slate-400 hover:text-white hover:bg-slate-900"
                            }`}
                          >
                            <span className="truncate flex items-center gap-1.5">
                              <span>{sub.icon}</span>
                              <span className="truncate">{sub.name}</span>
                            </span>
                            {isSubSelected && (
                              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Projects, Gallery, Downloads */}
                {[
                  { id: "projects", name: "6. Projects & Case Studies (/projects)" },
                  { id: "gallery", name: "7. Multimedia Gallery (/gallery)" },
                  { id: "downloads", name: "8. Download Center (/downloads)" },
                ].map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => handleSelectPage(p.id)}
                    className={`w-full text-left px-3.5 py-2.5 rounded-2xl text-xs font-semibold transition flex items-center justify-between ${
                      selectedPageId === p.id
                        ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                        : "text-slate-300 hover:bg-slate-900 hover:text-white"
                    }`}
                  >
                    <span className="truncate">{p.name}</span>
                    {selectedPageId === p.id && (
                      <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full font-mono">ACTIVE</span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* GROUP 3: COMPANY & SUPPORT */}
            <div>
              <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider px-2 py-1">
                Company & Support
              </div>
              <div className="space-y-1 mt-1">
                {[
                  { id: "blog", name: "9. Blog & Insights (/blog)" },
                  { id: "careers", name: "10. Careers (/careers)" },
                  { id: "contact", name: "11. Contact Us (/contact)" },
                  { id: "faq", name: "12. FAQ Knowledge Base (/faq)" },
                  { id: "support", name: "13. Customer Support (/support)" },
                ].map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => handleSelectPage(p.id)}
                    className={`w-full text-left px-3.5 py-2.5 rounded-2xl text-xs font-semibold transition flex items-center justify-between ${
                      selectedPageId === p.id
                        ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                        : "text-slate-300 hover:bg-slate-900 hover:text-white"
                    }`}
                  >
                    <span className="truncate">{p.name}</span>
                    {selectedPageId === p.id && (
                      <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full font-mono">ACTIVE</span>
                    )}
                  </button>
                ))}

                {/* 14. Website Footer Content */}
                <button
                  type="button"
                  onClick={() => handleSelectPage("footer")}
                  className={`w-full text-left px-3.5 py-2.5 rounded-2xl text-xs font-semibold transition flex items-center justify-between ${
                    selectedPageId === "footer"
                      ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                      : "text-blue-300/90 hover:bg-slate-900 hover:text-white border border-blue-500/20"
                  }`}
                >
                  <span className="truncate font-bold">14. Website Footer Studio</span>
                  {selectedPageId === "footer" && (
                    <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full font-mono">ACTIVE</span>
                  )}
                </button>
              </div>
            </div>
          </div>

          {selectedPageId === "home" && (
            <div className="pt-4 border-t border-slate-800">
              <button
                type="button"
                onClick={handleResetHomeLayout}
                className="w-full flex items-center justify-center gap-2 px-3 py-2 text-xs text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-xl transition border border-transparent hover:border-rose-500/20"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reset Default Layout
              </button>
            </div>
          )}

          {selectedPageId === "about" && (
            <div className="pt-4 border-t border-slate-800">
              <button
                type="button"
                onClick={handleResetAboutLayout}
                className="w-full flex items-center justify-center gap-2 px-3 py-2 text-xs text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-xl transition border border-transparent hover:border-rose-500/20"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reset Default Layout
              </button>
            </div>
          )}

          {selectedPageId === "services" && (
            <div className="pt-4 border-t border-slate-800">
              <button
                type="button"
                onClick={handleResetServicesLayout}
                className="w-full flex items-center justify-center gap-2 px-3 py-2 text-xs text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-xl transition border border-transparent hover:border-rose-500/20"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reset Default Layout
              </button>
            </div>
          )}
        </div>

        {/* Right: Selected Page Editor */}
        <div className="lg:col-span-9 space-y-6">
          {selectedPageId === "home" ? (
            /* ========================================================================= */
            /* FULL HOME PAGE BUILDER: SECTION ORDERING & FULL DETAIL EDITORS           */
            /* ========================================================================= */
            <form onSubmit={handleSaveHome} className="space-y-6">
              {/* TOP TAB SWITCHER: ORDERING VS CONTENT */}
              <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-900/90 backdrop-blur-md p-2 rounded-2xl border border-slate-800">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setHomeActiveTab("reorder")}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition ${
                      homeActiveTab === "reorder"
                        ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                        : "text-slate-400 hover:text-white hover:bg-slate-800"
                    }`}
                  >
                    <Sliders className="w-4 h-4" />
                    1. Section Placement & Reordering
                    <span className="px-2 py-0.5 rounded-full bg-black/30 text-[10px] font-mono">
                      {homeData.sectionOrder.length}
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setHomeActiveTab("content")}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition ${
                      homeActiveTab === "content"
                        ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                        : "text-slate-400 hover:text-white hover:bg-slate-800"
                    }`}
                  >
                    <Edit3 className="w-4 h-4" />
                    2. Edit Section Content
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={isSaving}
                  className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 disabled:opacity-50 text-white text-xs font-bold rounded-xl transition shadow-lg shadow-blue-600/30"
                >
                  {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  {isSaving ? "Publishing Changes..." : "Save & Publish to Live Website"}
                </button>
              </div>

              {/* SECTION PLACEMENT & REORDERING MANAGER */}
              {homeActiveTab === "reorder" && (
                <div className="bg-slate-950 p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-xl space-y-5 animate-fade-in">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
                    <div>
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-wider mb-1">
                        <LayoutGrid className="w-3.5 h-3.5" />
                        Section Placement & Reordering
                      </div>
                      <h2 className="text-xl font-bold text-white">
                        Home Page Section Order & Visibility
                      </h2>
                      <p className="text-slate-400 text-xs mt-1">
                        Use <span className="text-blue-400 font-semibold">Move Up</span> and{" "}
                        <span className="text-blue-400 font-semibold">Move Down</span> arrows to rearrange section placement on the live website. Click the Eye icon to hide/show sections.
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-400 font-mono">
                        {homeData.sectionOrder.length} Sections
                      </span>
                    </div>
                  </div>

                  {/* Section List with Move Up / Move Down & Visibility */}
                  <div className="space-y-2.5">
                    {homeData.sectionOrder.map((secId, index) => {
                      const meta = HOME_SECTION_METADATA[secId];
                      const isVisible = homeData.sectionVisibility[secId] !== false;

                      return (
                        <div
                          key={secId}
                          className={`flex items-center justify-between p-3.5 rounded-2xl border transition ${
                            isVisible
                              ? "bg-slate-900 border-slate-800 hover:border-slate-700"
                              : "bg-slate-950/60 border-slate-850 opacity-60"
                          }`}
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <div className="w-7 h-7 rounded-lg bg-blue-600/20 border border-blue-500/30 text-blue-400 font-bold font-mono text-xs flex items-center justify-center shrink-0">
                              {index + 1}
                            </div>

                            <div className="min-w-0">
                              <div className="flex items-center gap-2">
                                <span className="text-xs font-bold text-white truncate">
                                  {meta?.title || secId}
                                </span>
                                {!isVisible && (
                                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 font-mono">
                                    HIDDEN
                                  </span>
                                )}
                              </div>
                              <div className="text-[11px] text-slate-400 truncate">
                                {meta?.desc}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-1.5 shrink-0 ml-4">
                            <button
                              type="button"
                              disabled={index === 0}
                              onClick={() => handleHomeMoveUp(index)}
                              title="Move Up"
                              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed text-slate-200 transition"
                            >
                              <ArrowUp className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              disabled={index === homeData.sectionOrder.length - 1}
                              onClick={() => handleHomeMoveDown(index)}
                              title="Move Down"
                              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed text-slate-200 transition"
                            >
                              <ArrowDown className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleHomeToggleVisibility(secId)}
                              title={isVisible ? "Hide Section" : "Show Section"}
                              className={`p-2 rounded-xl transition ${
                                isVisible
                                  ? "bg-blue-600/20 text-blue-400 hover:bg-blue-600/30"
                                  : "bg-slate-800 text-slate-500 hover:bg-slate-700 hover:text-slate-300"
                              }`}
                            >
                              {isVisible ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                setExpandedSection(secId);
                                setHomeActiveTab("content");
                              }}
                              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white transition shadow-sm"
                            >
                              <Edit3 className="w-3 h-3" />
                              Edit Content
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* HOME SECTION CONTENT EDITORS */}
              {homeActiveTab === "content" && (
                <div className="space-y-6 animate-fade-in">
                  {/* HORIZONTAL SECTION SELECTOR PILL BAR */}
                  <div className="bg-slate-950 p-4 rounded-3xl border border-slate-800 shadow-md">
                    <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2.5 px-1">
                      Select Section To Customize:
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
                      {homeData.sectionOrder.map((secId, idx) => {
                        const meta = HOME_SECTION_METADATA[secId];
                        const isSelected = expandedSection === secId;
                        const isVisible = homeData.sectionVisibility[secId] !== false;

                        return (
                          <button
                            key={secId}
                            type="button"
                            onClick={() => setExpandedSection(secId)}
                            className={`p-3 rounded-2xl text-left border transition flex flex-col justify-between ${
                              isSelected
                                ? "bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-600/30"
                                : "bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-850"
                            }`}
                          >
                            <div className="flex items-center justify-between gap-1 mb-1">
                              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-black/30">
                                0{idx + 1}
                              </span>
                              {!isVisible && (
                                <span className="text-[9px] px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-300 font-mono">
                                  HIDDEN
                                </span>
                              )}
                            </div>
                            <div className="text-xs font-bold truncate">
                              {meta?.title.replace(/^\d+\.\s*/, "") || secId}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="space-y-4">
                <div className="flex items-center justify-between px-2">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Sliders className="w-4 h-4 text-blue-400" />
                    Section Content & Details Editors
                  </h3>
                  <span className="text-xs text-slate-400">
                    Click any section below to edit its text, images, or buttons
                  </span>
                </div>

                {/* 1. HERO BANNER */}
                <div className="bg-slate-950 rounded-3xl border border-slate-800 overflow-hidden shadow-lg">
                  <button
                    type="button"
                    onClick={() => setExpandedSection(expandedSection === "hero" ? null : "hero")}
                    className="w-full flex items-center justify-between p-5 text-left bg-slate-900/60 hover:bg-slate-900 transition"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-xs">
                        1
                      </div>
                      <div>
                        <div className="text-sm font-bold text-white">Hero Banner Section</div>
                        <div className="text-xs text-slate-400">Headlines, badge, background image, and CTA buttons</div>
                      </div>
                    </div>
                    {expandedSection === "hero" ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                  </button>

                  {expandedSection === "hero" && (
                    <div className="p-6 space-y-4 border-t border-slate-800 bg-slate-950">
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1.5">Top Badge Pill Text</label>
                        <input
                          type="text"
                          value={homeData.hero.badge}
                          onChange={(e) => setHomeData({ ...homeData, hero: { ...homeData.hero, badge: e.target.value } })}
                          className="w-full px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white"
                          placeholder="Trusted Security Solutions Across India"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1.5">Main Headline</label>
                        <input
                          type="text"
                          value={homeData.hero.heading}
                          onChange={(e) => setHomeData({ ...homeData, hero: { ...homeData.hero, heading: e.target.value } })}
                          className="w-full px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1.5">Subtitle / Description</label>
                        <textarea
                          rows={3}
                          value={homeData.hero.subtitle}
                          onChange={(e) => setHomeData({ ...homeData, hero: { ...homeData.hero, subtitle: e.target.value } })}
                          className="w-full px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white"
                        />
                      </div>
                      <div>
                        <ImageUploader
                          value={homeData.hero.backgroundImage}
                          onChange={(url) => setHomeData({ ...homeData, hero: { ...homeData.hero, backgroundImage: url } })}
                          folder="heroes"
                          label="Hero Background Image Asset"
                          helperText="Upload HD banner image for Home Page Hero"
                        />
                      </div>
                      <div className="grid sm:grid-cols-2 gap-4 p-4 bg-slate-900 rounded-2xl border border-slate-850">
                        <div className="space-y-2">
                          <span className="text-xs font-bold text-blue-400">Primary CTA Button</span>
                          <input
                            type="text"
                            value={homeData.hero.primaryCtaText}
                            onChange={(e) => setHomeData({ ...homeData, hero: { ...homeData.hero, primaryCtaText: e.target.value } })}
                            className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white"
                            placeholder="Button Text"
                          />
                          <input
                            type="text"
                            value={homeData.hero.primaryCtaLink}
                            onChange={(e) => setHomeData({ ...homeData, hero: { ...homeData.hero, primaryCtaLink: e.target.value } })}
                            className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white"
                            placeholder="Link URL"
                          />
                        </div>
                        <div className="space-y-2">
                          <span className="text-xs font-bold text-slate-300">Secondary CTA Button</span>
                          <input
                            type="text"
                            value={homeData.hero.secondaryCtaText}
                            onChange={(e) => setHomeData({ ...homeData, hero: { ...homeData.hero, secondaryCtaText: e.target.value } })}
                            className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white"
                            placeholder="Button Text"
                          />
                          <input
                            type="text"
                            value={homeData.hero.secondaryCtaLink}
                            onChange={(e) => setHomeData({ ...homeData, hero: { ...homeData.hero, secondaryCtaLink: e.target.value } })}
                            className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white"
                            placeholder="Link URL"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* 2. TRUST STATS BAR */}
                <div className="bg-slate-950 rounded-3xl border border-slate-800 overflow-hidden shadow-lg">
                  <button
                    type="button"
                    onClick={() => setExpandedSection(expandedSection === "trust_stats" ? null : "trust_stats")}
                    className="w-full flex items-center justify-between p-5 text-left bg-slate-900/60 hover:bg-slate-900 transition"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-xs">
                        2
                      </div>
                      <div>
                        <div className="text-sm font-bold text-white">Trust Stats Bar</div>
                        <div className="text-xs text-slate-400">5 key statistics displayed right below the hero banner</div>
                      </div>
                    </div>
                    {expandedSection === "trust_stats" ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                  </button>

                  {expandedSection === "trust_stats" && (
                    <div className="p-6 space-y-4 border-t border-slate-800 bg-slate-950">
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1.5">Trust Bar Label</label>
                        <input
                          type="text"
                          value={homeData.trustStats.label}
                          onChange={(e) => setHomeData({ ...homeData, trustStats: { ...homeData.trustStats, label: e.target.value } })}
                          className="w-full px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white"
                        />
                      </div>
                      <div className="grid sm:grid-cols-5 gap-3">
                        {homeData.trustStats.items.map((stat, i) => (
                          <div key={i} className="p-3 bg-slate-900 rounded-xl border border-slate-850 space-y-2">
                            <span className="text-[10px] text-slate-500 uppercase font-bold">Stat #{i + 1}</span>
                            <input
                              type="text"
                              value={stat.value}
                              onChange={(e) => {
                                const newItems = [...homeData.trustStats.items];
                                newItems[i] = { ...newItems[i], value: e.target.value };
                                setHomeData({ ...homeData, trustStats: { ...homeData.trustStats, items: newItems } });
                              }}
                              placeholder="e.g. 17+"
                              className="w-full px-2.5 py-1.5 bg-slate-950 border border-slate-800 rounded text-xs text-blue-400 font-bold"
                            />
                            <input
                              type="text"
                              value={stat.label}
                              onChange={(e) => {
                                const newItems = [...homeData.trustStats.items];
                                newItems[i] = { ...newItems[i], label: e.target.value };
                                setHomeData({ ...homeData, trustStats: { ...homeData.trustStats, items: newItems } });
                              }}
                              placeholder="Label"
                              className="w-full px-2.5 py-1.5 bg-slate-950 border border-slate-800 rounded text-[11px] text-slate-300"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* 3. WHO WE ARE (ABOUT) */}
                <div className="bg-slate-950 rounded-3xl border border-slate-800 overflow-hidden shadow-lg">
                  <button
                    type="button"
                    onClick={() => setExpandedSection(expandedSection === "about" ? null : "about")}
                    className="w-full flex items-center justify-between p-5 text-left bg-slate-900/60 hover:bg-slate-900 transition"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs">
                        3
                      </div>
                      <div>
                        <div className="text-sm font-bold text-white">Who We Are (Company Overview)</div>
                        <div className="text-xs text-slate-400">Headings, 3 overview paragraphs, side image, and satisfaction stat badge</div>
                      </div>
                    </div>
                    {expandedSection === "about" ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                  </button>

                  {expandedSection === "about" && (
                    <div className="p-6 space-y-4 border-t border-slate-800 bg-slate-950">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-slate-300 mb-1.5">Section Badge</label>
                          <input
                            type="text"
                            value={homeData.about.badge}
                            onChange={(e) => setHomeData({ ...homeData, about: { ...homeData.about, badge: e.target.value } })}
                            className="w-full px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-300 mb-1.5">Main Heading</label>
                          <input
                            type="text"
                            value={homeData.about.heading}
                            onChange={(e) => setHomeData({ ...homeData, about: { ...homeData.about, heading: e.target.value } })}
                            className="w-full px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1.5">Paragraph 1</label>
                        <textarea
                          rows={2}
                          value={homeData.about.p1}
                          onChange={(e) => setHomeData({ ...homeData, about: { ...homeData.about, p1: e.target.value } })}
                          className="w-full px-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1.5">Paragraph 2</label>
                        <textarea
                          rows={2}
                          value={homeData.about.p2}
                          onChange={(e) => setHomeData({ ...homeData, about: { ...homeData.about, p2: e.target.value } })}
                          className="w-full px-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1.5">Paragraph 3</label>
                        <textarea
                          rows={2}
                          value={homeData.about.p3}
                          onChange={(e) => setHomeData({ ...homeData, about: { ...homeData.about, p3: e.target.value } })}
                          className="w-full px-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white"
                        />
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-slate-300 mb-1.5">Button Text</label>
                          <input
                            type="text"
                            value={homeData.about.buttonText}
                            onChange={(e) => setHomeData({ ...homeData, about: { ...homeData.about, buttonText: e.target.value } })}
                            className="w-full px-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-300 mb-1.5">Button Link</label>
                          <input
                            type="text"
                            value={homeData.about.buttonLink}
                            onChange={(e) => setHomeData({ ...homeData, about: { ...homeData.about, buttonLink: e.target.value } })}
                            className="w-full px-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white"
                          />
                        </div>
                      </div>

                      <div>
                        <ImageUploader
                          value={homeData.about.image}
                          onChange={(url) => setHomeData({ ...homeData, about: { ...homeData.about, image: url } })}
                          folder="about"
                          label="About Section Side Feature Image"
                        />
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4 p-4 bg-slate-900 rounded-2xl border border-slate-850">
                        <div>
                          <label className="block text-[11px] text-slate-400 mb-1">Floating Stat Value</label>
                          <input
                            type="text"
                            value={homeData.about.statValue}
                            onChange={(e) => setHomeData({ ...homeData, about: { ...homeData.about, statValue: e.target.value } })}
                            className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white"
                            placeholder="e.g. 98%"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] text-slate-400 mb-1">Floating Stat Label</label>
                          <input
                            type="text"
                            value={homeData.about.statLabel}
                            onChange={(e) => setHomeData({ ...homeData, about: { ...homeData.about, statLabel: e.target.value } })}
                            className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white"
                            placeholder="e.g. Customer Satisfaction Rate"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* 4. WHY CHOOSE US */}
                <div className="bg-slate-950 rounded-3xl border border-slate-800 overflow-hidden shadow-lg">
                  <button
                    type="button"
                    onClick={() => setExpandedSection(expandedSection === "why_choose" ? null : "why_choose")}
                    className="w-full flex items-center justify-between p-5 text-left bg-slate-900/60 hover:bg-slate-900 transition"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-xs">
                        4
                      </div>
                      <div>
                        <div className="text-sm font-bold text-white">Why Choose Us Section</div>
                        <div className="text-xs text-slate-400">Headings and 6 core value cards with editable titles and descriptions</div>
                      </div>
                    </div>
                    {expandedSection === "why_choose" ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                  </button>

                  {expandedSection === "why_choose" && (
                    <div className="p-6 space-y-4 border-t border-slate-800 bg-slate-950">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-slate-300 mb-1.5">Section Badge</label>
                          <input
                            type="text"
                            value={homeData.whyChoose.badge}
                            onChange={(e) => setHomeData({ ...homeData, whyChoose: { ...homeData.whyChoose, badge: e.target.value } })}
                            className="w-full px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-300 mb-1.5">Main Heading</label>
                          <input
                            type="text"
                            value={homeData.whyChoose.heading}
                            onChange={(e) => setHomeData({ ...homeData, whyChoose: { ...homeData.whyChoose, heading: e.target.value } })}
                            className="w-full px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1.5">Section Subtitle / Description</label>
                        <textarea
                          rows={2}
                          value={homeData.whyChoose.description}
                          onChange={(e) => setHomeData({ ...homeData, whyChoose: { ...homeData.whyChoose, description: e.target.value } })}
                          className="w-full px-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white"
                        />
                      </div>

                      <div className="grid sm:grid-cols-2 gap-3 pt-2">
                        {homeData.whyChoose.items.map((card, i) => (
                          <div key={i} className="p-4 bg-slate-900 rounded-2xl border border-slate-850 space-y-2">
                            <span className="text-[10px] text-blue-400 font-bold uppercase">Card #{i + 1}</span>
                            <input
                              type="text"
                              value={card.title}
                              onChange={(e) => {
                                const newItems = [...homeData.whyChoose.items];
                                newItems[i] = { ...newItems[i], title: e.target.value };
                                setHomeData({ ...homeData, whyChoose: { ...homeData.whyChoose, items: newItems } });
                              }}
                              className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white font-semibold"
                            />
                            <textarea
                              rows={2}
                              value={card.desc}
                              onChange={(e) => {
                                const newItems = [...homeData.whyChoose.items];
                                newItems[i] = { ...newItems[i], desc: e.target.value };
                                setHomeData({ ...homeData, whyChoose: { ...homeData.whyChoose, items: newItems } });
                              }}
                              className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-300"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* 5. SERVICES GRID */}
                <div className="bg-slate-950 rounded-3xl border border-slate-800 overflow-hidden shadow-lg">
                  <button
                    type="button"
                    onClick={() => setExpandedSection(expandedSection === "services" ? null : "services")}
                    className="w-full flex items-center justify-between p-5 text-left bg-slate-900/60 hover:bg-slate-900 transition"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold text-xs">
                        5
                      </div>
                      <div>
                        <div className="text-sm font-bold text-white">Our Services Section</div>
                        <div className="text-xs text-slate-400">Headings, subtitle, and CTA button (Service cards auto-load from Services Manager)</div>
                      </div>
                    </div>
                    {expandedSection === "services" ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                  </button>

                  {expandedSection === "services" && (
                    <div className="p-6 space-y-4 border-t border-slate-800 bg-slate-950">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-slate-300 mb-1.5">Section Badge</label>
                          <input
                            type="text"
                            value={homeData.services.badge}
                            onChange={(e) => setHomeData({ ...homeData, services: { ...homeData.services, badge: e.target.value } })}
                            className="w-full px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-300 mb-1.5">Main Heading</label>
                          <input
                            type="text"
                            value={homeData.services.heading}
                            onChange={(e) => setHomeData({ ...homeData, services: { ...homeData.services, heading: e.target.value } })}
                            className="w-full px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1.5">Subtitle</label>
                        <textarea
                          rows={2}
                          value={homeData.services.subtitle}
                          onChange={(e) => setHomeData({ ...homeData, services: { ...homeData.services, subtitle: e.target.value } })}
                          className="w-full px-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white"
                        />
                      </div>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-slate-300 mb-1.5">Button Text</label>
                          <input
                            type="text"
                            value={homeData.services.buttonText}
                            onChange={(e) => setHomeData({ ...homeData, services: { ...homeData.services, buttonText: e.target.value } })}
                            className="w-full px-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-300 mb-1.5">Button Link</label>
                          <input
                            type="text"
                            value={homeData.services.buttonLink}
                            onChange={(e) => setHomeData({ ...homeData, services: { ...homeData.services, buttonLink: e.target.value } })}
                            className="w-full px-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* 6. INDUSTRIES WE SERVE */}
                <div className="bg-slate-950 rounded-3xl border border-slate-800 overflow-hidden shadow-lg">
                  <button
                    type="button"
                    onClick={() => setExpandedSection(expandedSection === "industries" ? null : "industries")}
                    className="w-full flex items-center justify-between p-5 text-left bg-slate-900/60 hover:bg-slate-900 transition"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-violet-500/10 border border-violet-500/20 text-violet-400 flex items-center justify-center font-bold text-xs">
                        6
                      </div>
                      <div>
                        <div className="text-sm font-bold text-white">Industries We Serve</div>
                        <div className="text-xs text-slate-400">Section heading, description, and 10 industry cards with uploadable images</div>
                      </div>
                    </div>
                    {expandedSection === "industries" ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                  </button>

                  {expandedSection === "industries" && (
                    <div className="p-6 space-y-4 border-t border-slate-800 bg-slate-950">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-slate-300 mb-1.5">Section Badge</label>
                          <input
                            type="text"
                            value={homeData.industries.badge}
                            onChange={(e) => setHomeData({ ...homeData, industries: { ...homeData.industries, badge: e.target.value } })}
                            className="w-full px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-300 mb-1.5">Main Heading</label>
                          <input
                            type="text"
                            value={homeData.industries.heading}
                            onChange={(e) => setHomeData({ ...homeData, industries: { ...homeData.industries, heading: e.target.value } })}
                            className="w-full px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1.5">Subtitle</label>
                        <textarea
                          rows={2}
                          value={homeData.industries.subtitle}
                          onChange={(e) => setHomeData({ ...homeData, industries: { ...homeData.industries, subtitle: e.target.value } })}
                          className="w-full px-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white"
                        />
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4 pt-2">
                        {homeData.industries.items.map((ind, i) => (
                          <div key={ind.id} className="p-4 bg-slate-900 rounded-2xl border border-slate-850 space-y-3">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-bold text-white">{ind.title}</span>
                              <span className="text-base">{ind.icon}</span>
                            </div>
                            <input
                              type="text"
                              value={ind.title}
                              onChange={(e) => {
                                const newItems = [...homeData.industries.items];
                                newItems[i] = { ...newItems[i], title: e.target.value };
                                setHomeData({ ...homeData, industries: { ...homeData.industries, items: newItems } });
                              }}
                              className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white"
                            />
                            <ImageUploader
                              value={ind.image}
                              onChange={(url) => {
                                const newItems = [...homeData.industries.items];
                                newItems[i] = { ...newItems[i], image: url };
                                setHomeData({ ...homeData, industries: { ...homeData.industries, items: newItems } });
                              }}
                              folder="industries"
                              label="Industry Cover Image"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* 7. OUR PROCESS */}
                <div className="bg-slate-950 rounded-3xl border border-slate-800 overflow-hidden shadow-lg">
                  <button
                    type="button"
                    onClick={() => setExpandedSection(expandedSection === "process" ? null : "process")}
                    className="w-full flex items-center justify-between p-5 text-left bg-slate-900/60 hover:bg-slate-900 transition"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-400 flex items-center justify-center font-bold text-xs">
                        7
                      </div>
                      <div>
                        <div className="text-sm font-bold text-white">Our Process (6 Delivery Steps)</div>
                        <div className="text-xs text-slate-400">Execution process steps from site survey to maintenance AMC</div>
                      </div>
                    </div>
                    {expandedSection === "process" ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                  </button>

                  {expandedSection === "process" && (
                    <div className="p-6 space-y-4 border-t border-slate-800 bg-slate-950">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-slate-300 mb-1.5">Section Badge</label>
                          <input
                            type="text"
                            value={homeData.process.badge}
                            onChange={(e) => setHomeData({ ...homeData, process: { ...homeData.process, badge: e.target.value } })}
                            className="w-full px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-300 mb-1.5">Main Heading</label>
                          <input
                            type="text"
                            value={homeData.process.heading}
                            onChange={(e) => setHomeData({ ...homeData, process: { ...homeData.process, heading: e.target.value } })}
                            className="w-full px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white"
                          />
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-2">
                        {homeData.process.steps.map((st, i) => (
                          <div key={i} className="p-4 bg-slate-900 rounded-2xl border border-slate-850 space-y-2">
                            <div className="flex items-center gap-2">
                              <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center">
                                {st.step}
                              </span>
                              <input
                                type="text"
                                value={st.step}
                                onChange={(e) => {
                                  const newSteps = [...homeData.process.steps];
                                  newSteps[i] = { ...newSteps[i], step: e.target.value };
                                  setHomeData({ ...homeData, process: { ...homeData.process, steps: newSteps } });
                                }}
                                className="w-16 px-2 py-1 bg-slate-950 border border-slate-800 rounded text-xs text-white font-mono"
                              />
                            </div>
                            <input
                              type="text"
                              value={st.title}
                              onChange={(e) => {
                                const newSteps = [...homeData.process.steps];
                                newSteps[i] = { ...newSteps[i], title: e.target.value };
                                setHomeData({ ...homeData, process: { ...homeData.process, steps: newSteps } });
                              }}
                              className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white font-semibold"
                            />
                            <textarea
                              rows={2}
                              value={st.desc}
                              onChange={(e) => {
                                const newSteps = [...homeData.process.steps];
                                newSteps[i] = { ...newSteps[i], desc: e.target.value };
                                setHomeData({ ...homeData, process: { ...homeData.process, steps: newSteps } });
                              }}
                              className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-300"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* 8. FEATURED PROJECTS */}
                <div className="bg-slate-950 rounded-3xl border border-slate-800 overflow-hidden shadow-lg">
                  <button
                    type="button"
                    onClick={() => setExpandedSection(expandedSection === "projects" ? null : "projects")}
                    className="w-full flex items-center justify-between p-5 text-left bg-slate-900/60 hover:bg-slate-900 transition"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-400 flex items-center justify-center font-bold text-xs">
                        8
                      </div>
                      <div>
                        <div className="text-sm font-bold text-white">Featured Projects Section</div>
                        <div className="text-xs text-slate-400">Headings, 3 flagship project cards with uploadable cover images</div>
                      </div>
                    </div>
                    {expandedSection === "projects" ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                  </button>

                  {expandedSection === "projects" && (
                    <div className="p-6 space-y-4 border-t border-slate-800 bg-slate-950">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-slate-300 mb-1.5">Section Badge</label>
                          <input
                            type="text"
                            value={homeData.projects.badge}
                            onChange={(e) => setHomeData({ ...homeData, projects: { ...homeData.projects, badge: e.target.value } })}
                            className="w-full px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-300 mb-1.5">Main Heading</label>
                          <input
                            type="text"
                            value={homeData.projects.heading}
                            onChange={(e) => setHomeData({ ...homeData, projects: { ...homeData.projects, heading: e.target.value } })}
                            className="w-full px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1.5">Subtitle</label>
                        <textarea
                          rows={2}
                          value={homeData.projects.subtitle}
                          onChange={(e) => setHomeData({ ...homeData, projects: { ...homeData.projects, subtitle: e.target.value } })}
                          className="w-full px-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white"
                        />
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-slate-300 mb-1.5">Button Text</label>
                          <input
                            type="text"
                            value={homeData.projects.buttonText}
                            onChange={(e) => setHomeData({ ...homeData, projects: { ...homeData.projects, buttonText: e.target.value } })}
                            className="w-full px-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-300 mb-1.5">Button Link</label>
                          <input
                            type="text"
                            value={homeData.projects.buttonLink}
                            onChange={(e) => setHomeData({ ...homeData, projects: { ...homeData.projects, buttonLink: e.target.value } })}
                            className="w-full px-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white"
                          />
                        </div>
                      </div>

                      <div className="space-y-4 pt-2">
                        {(homeData.projects.items || INITIAL_HOME_PAGE_DATA.projects.items || []).map((p, i) => (
                          <div key={i} className="p-4 bg-slate-900 rounded-2xl border border-slate-850 space-y-3">
                            <span className="text-xs font-bold text-blue-400">Featured Project Card #{i + 1}</span>
                            <div className="grid sm:grid-cols-2 gap-3">
                              <input
                                type="text"
                                value={p.title}
                                onChange={(e) => {
                                  const newItems = [...(homeData.projects.items || INITIAL_HOME_PAGE_DATA.projects.items || [])];
                                  newItems[i] = { ...newItems[i], title: e.target.value };
                                  setHomeData({ ...homeData, projects: { ...homeData.projects, items: newItems } });
                                }}
                                placeholder="Project Title"
                                className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white font-semibold"
                              />
                              <input
                                type="text"
                                value={p.sector}
                                onChange={(e) => {
                                  const newItems = [...(homeData.projects.items || INITIAL_HOME_PAGE_DATA.projects.items || [])];
                                  newItems[i] = { ...newItems[i], sector: e.target.value };
                                  setHomeData({ ...homeData, projects: { ...homeData.projects, items: newItems } });
                                }}
                                placeholder="Sector (e.g. Education, Manufacturing)"
                                className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white"
                              />
                            </div>
                            <textarea
                              rows={2}
                              value={p.desc}
                              onChange={(e) => {
                                const newItems = [...(homeData.projects.items || INITIAL_HOME_PAGE_DATA.projects.items || [])];
                                newItems[i] = { ...newItems[i], desc: e.target.value };
                                setHomeData({ ...homeData, projects: { ...homeData.projects, items: newItems } });
                              }}
                              placeholder="Project Description"
                              className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-300"
                            />
                            <ImageUploader
                              value={p.image}
                              onChange={(url) => {
                                const newItems = [...(homeData.projects.items || INITIAL_HOME_PAGE_DATA.projects.items || [])];
                                newItems[i] = { ...newItems[i], image: url };
                                setHomeData({ ...homeData, projects: { ...homeData.projects, items: newItems } });
                              }}
                              folder="projects"
                              label="Project Cover Image"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* 9. TECHNOLOGY PARTNERS */}
                <div className="bg-slate-950 rounded-3xl border border-slate-800 overflow-hidden shadow-lg">
                  <button
                    type="button"
                    onClick={() => setExpandedSection(expandedSection === "partners" ? null : "partners")}
                    className="w-full flex items-center justify-between p-5 text-left bg-slate-900/60 hover:bg-slate-900 transition"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-teal-500/10 border border-teal-500/20 text-teal-400 flex items-center justify-center font-bold text-xs">
                        9
                      </div>
                      <div>
                        <div className="text-sm font-bold text-white">Technology Partners Section</div>
                        <div className="text-xs text-slate-400">Headings (Partner logos are managed from the Technology Partners tab)</div>
                      </div>
                    </div>
                    {expandedSection === "partners" ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                  </button>

                  {expandedSection === "partners" && (
                    <div className="p-6 space-y-4 border-t border-slate-800 bg-slate-950">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-slate-300 mb-1.5">Section Badge</label>
                          <input
                            type="text"
                            value={homeData.partners.badge}
                            onChange={(e) => setHomeData({ ...homeData, partners: { ...homeData.partners, badge: e.target.value } })}
                            className="w-full px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-300 mb-1.5">Main Heading</label>
                          <input
                            type="text"
                            value={homeData.partners.heading}
                            onChange={(e) => setHomeData({ ...homeData, partners: { ...homeData.partners, heading: e.target.value } })}
                            className="w-full px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* 10. STATISTICS BANNER */}
                <div className="bg-slate-950 rounded-3xl border border-slate-800 overflow-hidden shadow-lg">
                  <button
                    type="button"
                    onClick={() => setExpandedSection(expandedSection === "stats" ? null : "stats")}
                    className="w-full flex items-center justify-between p-5 text-left bg-slate-900/60 hover:bg-slate-900 transition"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-xs">
                        10
                      </div>
                      <div>
                        <div className="text-sm font-bold text-white">Statistics Banner (Dark Banner)</div>
                        <div className="text-xs text-slate-400">Heading and 6 enterprise performance metrics</div>
                      </div>
                    </div>
                    {expandedSection === "stats" ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                  </button>

                  {expandedSection === "stats" && (
                    <div className="p-6 space-y-4 border-t border-slate-800 bg-slate-950">
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1.5">Banner Heading</label>
                        <input
                          type="text"
                          value={homeData.stats.heading}
                          onChange={(e) => setHomeData({ ...homeData, stats: { ...homeData.stats, heading: e.target.value } })}
                          className="w-full px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white"
                        />
                      </div>
                      <div className="grid sm:grid-cols-3 lg:grid-cols-6 gap-3">
                        {homeData.stats.items.map((st, i) => (
                          <div key={i} className="p-3 bg-slate-900 rounded-xl border border-slate-850 space-y-2">
                            <span className="text-[10px] text-slate-500 font-bold uppercase">Metric #{i + 1}</span>
                            <input
                              type="text"
                              value={st.value}
                              onChange={(e) => {
                                const newItems = [...homeData.stats.items];
                                newItems[i] = { ...newItems[i], value: e.target.value };
                                setHomeData({ ...homeData, stats: { ...homeData.stats, items: newItems } });
                              }}
                              className="w-full px-2.5 py-1.5 bg-slate-950 border border-slate-800 rounded text-xs text-blue-400 font-bold"
                            />
                            <input
                              type="text"
                              value={st.label}
                              onChange={(e) => {
                                const newItems = [...homeData.stats.items];
                                newItems[i] = { ...newItems[i], label: e.target.value };
                                setHomeData({ ...homeData, stats: { ...homeData.stats, items: newItems } });
                              }}
                              className="w-full px-2.5 py-1.5 bg-slate-950 border border-slate-800 rounded text-[11px] text-slate-300"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* 11. TESTIMONIALS */}
                <div className="bg-slate-950 rounded-3xl border border-slate-800 overflow-hidden shadow-lg">
                  <button
                    type="button"
                    onClick={() => setExpandedSection(expandedSection === "testimonials" ? null : "testimonials")}
                    className="w-full flex items-center justify-between p-5 text-left bg-slate-900/60 hover:bg-slate-900 transition"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-pink-500/10 border border-pink-500/20 text-pink-400 flex items-center justify-center font-bold text-xs">
                        11
                      </div>
                      <div>
                        <div className="text-sm font-bold text-white">Client Testimonials Section</div>
                        <div className="text-xs text-slate-400">Headings (Client reviews are managed from the Testimonials tab)</div>
                      </div>
                    </div>
                    {expandedSection === "testimonials" ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                  </button>

                  {expandedSection === "testimonials" && (
                    <div className="p-6 space-y-4 border-t border-slate-800 bg-slate-950">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-slate-300 mb-1.5">Section Badge</label>
                          <input
                            type="text"
                            value={homeData.testimonials.badge}
                            onChange={(e) => setHomeData({ ...homeData, testimonials: { ...homeData.testimonials, badge: e.target.value } })}
                            className="w-full px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-300 mb-1.5">Main Heading</label>
                          <input
                            type="text"
                            value={homeData.testimonials.heading}
                            onChange={(e) => setHomeData({ ...homeData, testimonials: { ...homeData.testimonials, heading: e.target.value } })}
                            className="w-full px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* 12. CALL TO ACTION */}
                <div className="bg-slate-950 rounded-3xl border border-slate-800 overflow-hidden shadow-lg">
                  <button
                    type="button"
                    onClick={() => setExpandedSection(expandedSection === "cta" ? null : "cta")}
                    className="w-full flex items-center justify-between p-5 text-left bg-slate-900/60 hover:bg-slate-900 transition"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 flex items-center justify-center font-bold text-xs">
                        12
                      </div>
                      <div>
                        <div className="text-sm font-bold text-white">Call To Action Banner</div>
                        <div className="text-xs text-slate-400">Full-width blue action banner driving consultations and site survey requests</div>
                      </div>
                    </div>
                    {expandedSection === "cta" ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                  </button>

                  {expandedSection === "cta" && (
                    <div className="p-6 space-y-4 border-t border-slate-800 bg-slate-950">
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1.5">Main Heading</label>
                        <input
                          type="text"
                          value={homeData.cta.heading}
                          onChange={(e) => setHomeData({ ...homeData, cta: { ...homeData.cta, heading: e.target.value } })}
                          className="w-full px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1.5">Description</label>
                        <textarea
                          rows={2}
                          value={homeData.cta.description}
                          onChange={(e) => setHomeData({ ...homeData, cta: { ...homeData.cta, description: e.target.value } })}
                          className="w-full px-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white"
                        />
                      </div>
                      <div className="grid sm:grid-cols-2 gap-4 p-4 bg-slate-900 rounded-2xl border border-slate-850">
                        <div className="space-y-2">
                          <span className="text-xs font-bold text-blue-400">Primary Button</span>
                          <input
                            type="text"
                            value={homeData.cta.primaryBtnText}
                            onChange={(e) => setHomeData({ ...homeData, cta: { ...homeData.cta, primaryBtnText: e.target.value } })}
                            className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white"
                            placeholder="e.g. Schedule a Consultation"
                          />
                          <input
                            type="text"
                            value={homeData.cta.primaryBtnLink}
                            onChange={(e) => setHomeData({ ...homeData, cta: { ...homeData.cta, primaryBtnLink: e.target.value } })}
                            className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white"
                            placeholder="/contact"
                          />
                        </div>
                        <div className="space-y-2">
                          <span className="text-xs font-bold text-slate-300">Secondary Button</span>
                          <input
                            type="text"
                            value={homeData.cta.secondaryBtnText}
                            onChange={(e) => setHomeData({ ...homeData, cta: { ...homeData.cta, secondaryBtnText: e.target.value } })}
                            className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white"
                            placeholder="e.g. Request a Site Survey"
                          />
                          <input
                            type="text"
                            value={homeData.cta.secondaryBtnLink}
                            onChange={(e) => setHomeData({ ...homeData, cta: { ...homeData.cta, secondaryBtnLink: e.target.value } })}
                            className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white"
                            placeholder="/contact"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* 13. NEWSLETTER */}
                <div className="bg-slate-950 rounded-3xl border border-slate-800 overflow-hidden shadow-lg">
                  <button
                    type="button"
                    onClick={() => setExpandedSection(expandedSection === "newsletter" ? null : "newsletter")}
                    className="w-full flex items-center justify-between p-5 text-left bg-slate-900/60 hover:bg-slate-900 transition"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-slate-500/10 border border-slate-500/20 text-slate-400 flex items-center justify-center font-bold text-xs">
                        13
                      </div>
                      <div>
                        <div className="text-sm font-bold text-white">Newsletter Subscription</div>
                        <div className="text-xs text-slate-400">Bottom newsletter lead capture headline, description, and button text</div>
                      </div>
                    </div>
                    {expandedSection === "newsletter" ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                  </button>

                  {expandedSection === "newsletter" && (
                    <div className="p-6 space-y-4 border-t border-slate-800 bg-slate-950">
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1.5">Heading</label>
                        <input
                          type="text"
                          value={homeData.newsletter.heading}
                          onChange={(e) => setHomeData({ ...homeData, newsletter: { ...homeData.newsletter, heading: e.target.value } })}
                          className="w-full px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1.5">Description</label>
                        <textarea
                          rows={2}
                          value={homeData.newsletter.description}
                          onChange={(e) => setHomeData({ ...homeData, newsletter: { ...homeData.newsletter, description: e.target.value } })}
                          className="w-full px-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1.5">Button Text</label>
                        <input
                          type="text"
                          value={homeData.newsletter.buttonText}
                          onChange={(e) => setHomeData({ ...homeData, newsletter: { ...homeData.newsletter, buttonText: e.target.value } })}
                          className="w-full px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white"
                        />
                      </div>
                    </div>
                  )}
                </div>
                  {/* Previous / Next Section Navigation in Content Mode */}
                  <div className="flex items-center justify-between p-4 bg-slate-900/60 rounded-2xl border border-slate-800">
                    <button
                      type="button"
                      disabled={homeData.sectionOrder.indexOf(expandedSection || "hero") === 0}
                      onClick={() => {
                        const idx = homeData.sectionOrder.indexOf(expandedSection || "hero");
                        if (idx > 0) setExpandedSection(homeData.sectionOrder[idx - 1]);
                      }}
                      className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed text-slate-300 border border-slate-700 transition"
                    >
                      ← Previous Section
                    </button>
                    <button
                      type="button"
                      disabled={homeData.sectionOrder.indexOf(expandedSection || "hero") === homeData.sectionOrder.length - 1}
                      onClick={() => {
                        const idx = homeData.sectionOrder.indexOf(expandedSection || "hero");
                        if (idx < homeData.sectionOrder.length - 1) setExpandedSection(homeData.sectionOrder[idx + 1]);
                      }}
                      className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed text-slate-300 border border-slate-700 transition"
                    >
                      Next Section →
                    </button>
                  </div>
                </div>
              </div>
            )}

              {/* STICKY SAVE FOOTER BAR */}
              <div className="p-5 bg-slate-900/90 backdrop-blur-md rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 sticky bottom-4 shadow-2xl z-20">
                <div className="flex items-center gap-2">
                  {saveSuccess && (
                    <div className="inline-flex items-center gap-2 text-emerald-400 text-xs font-bold">
                      <CheckCircle2 className="w-4 h-4" />
                      Home Page updated & synced across all devices!
                    </div>
                  )}
                  {errorMessage && (
                    <div className="inline-flex items-center gap-2 text-rose-400 text-xs font-semibold">
                      <AlertCircle className="w-4 h-4" />
                      {errorMessage}
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSaving}
                  className={`px-8 py-3.5 font-bold rounded-xl text-xs transition shadow-lg flex items-center justify-center gap-2 ${
                    isSaving
                      ? "bg-blue-700 text-blue-200 cursor-not-allowed opacity-80"
                      : "bg-blue-600 hover:bg-blue-500 text-white shadow-blue-600/30 active:scale-[0.98]"
                  }`}
                >
                  {isSaving ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Publishing to Live Website...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      Save & Publish Home Page to Live Website
                    </>
                  )}
                </button>
              </div>
            </form>
          ) : selectedPageId === "about" ? (
            /* ========================================================================= */
            /* FULL ABOUT US PAGE BUILDER: 12 SECTIONS REORDERING & EDITORS             */
            /* ========================================================================= */
            <form onSubmit={handleSaveAbout} className="space-y-6">
              {/* TOP TAB SWITCHER: ORDERING VS CONTENT */}
              <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-900/90 backdrop-blur-md p-2 rounded-2xl border border-slate-800">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setAboutActiveTab("reorder")}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition ${
                      aboutActiveTab === "reorder"
                        ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                        : "text-slate-400 hover:text-white hover:bg-slate-800"
                    }`}
                  >
                    <Sliders className="w-4 h-4" />
                    1. Section Placement & Reordering
                    <span className="px-2 py-0.5 rounded-full bg-black/30 text-[10px] font-mono">
                      {aboutData.sectionOrder.length}
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setAboutActiveTab("content")}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition ${
                      aboutActiveTab === "content"
                        ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                        : "text-slate-400 hover:text-white hover:bg-slate-800"
                    }`}
                  >
                    <Edit3 className="w-4 h-4" />
                    2. Edit Section Content
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={isSaving}
                  className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 disabled:opacity-50 text-white text-xs font-bold rounded-xl transition shadow-lg shadow-blue-600/30"
                >
                  {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  {isSaving ? "Publishing Changes..." : "Save & Publish to Live Website"}
                </button>
              </div>

              {/* ABOUT SECTION PLACEMENT & REORDERING MANAGER */}
              {aboutActiveTab === "reorder" && (
                <div className="bg-slate-950 p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-xl space-y-5 animate-fade-in">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
                    <div>
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-wider mb-1">
                        <LayoutGrid className="w-3.5 h-3.5" />
                        Section Placement & Reordering
                      </div>
                      <h2 className="text-xl font-bold text-white">
                        About Us Section Order & Visibility
                      </h2>
                      <p className="text-slate-400 text-xs mt-1">
                        Use <span className="text-blue-400 font-semibold">Move Up</span> and{" "}
                        <span className="text-blue-400 font-semibold">Move Down</span> arrows to rearrange section placement on the live website. Click the Eye icon to hide/show sections.
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-400 font-mono">
                        {aboutData.sectionOrder.length} Sections
                      </span>
                    </div>
                  </div>

                  {/* About Section List with Move Up / Move Down & Visibility */}
                  <div className="space-y-2.5">
                    {aboutData.sectionOrder.map((secId, index) => {
                      const meta = ABOUT_SECTION_METADATA[secId];
                      const isVisible = aboutData.sectionVisibility[secId] !== false;

                      return (
                        <div
                          key={secId}
                          className={`flex items-center justify-between p-3.5 rounded-2xl border transition ${
                            isVisible
                              ? "bg-slate-900 border-slate-800 hover:border-slate-700"
                              : "bg-slate-950/60 border-slate-850 opacity-60"
                          }`}
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <div className="w-7 h-7 rounded-lg bg-blue-600/20 border border-blue-500/30 text-blue-400 font-bold font-mono text-xs flex items-center justify-center shrink-0">
                              {index + 1}
                            </div>

                            <div className="min-w-0">
                              <div className="flex items-center gap-2">
                                <span className="text-xs font-bold text-white truncate">
                                  {meta?.title || secId}
                                </span>
                                {!isVisible && (
                                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 font-mono">
                                    HIDDEN
                                  </span>
                                )}
                              </div>
                              <div className="text-[11px] text-slate-400 truncate">
                                {meta?.desc}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-1.5 shrink-0 ml-4">
                            <button
                              type="button"
                              disabled={index === 0}
                              onClick={() => handleAboutMoveUp(index)}
                              title="Move Up"
                              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed text-slate-200 transition"
                            >
                              <ArrowUp className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              disabled={index === aboutData.sectionOrder.length - 1}
                              onClick={() => handleAboutMoveDown(index)}
                              title="Move Down"
                              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed text-slate-200 transition"
                            >
                              <ArrowDown className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleAboutToggleVisibility(secId)}
                              title={isVisible ? "Hide Section" : "Show Section"}
                              className={`p-2 rounded-xl transition ${
                                isVisible
                                  ? "bg-blue-600/20 text-blue-400 hover:bg-blue-600/30"
                                  : "bg-slate-800 text-slate-500 hover:bg-slate-700 hover:text-slate-300"
                              }`}
                            >
                              {isVisible ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                setAboutExpandedSection(secId);
                                setAboutActiveTab("content");
                              }}
                              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white transition shadow-sm"
                            >
                              <Edit3 className="w-3 h-3" />
                              Edit Content
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* ABOUT SECTION CONTENT EDITORS */}
              {aboutActiveTab === "content" && (
                <div className="space-y-6 animate-fade-in">
                  {/* HORIZONTAL SECTION SELECTOR PILL BAR */}
                  <div className="bg-slate-950 p-4 rounded-3xl border border-slate-800 shadow-md">
                    <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2.5 px-1">
                      Select Section To Customize:
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
                      {aboutData.sectionOrder.map((secId, idx) => {
                        const meta = ABOUT_SECTION_METADATA[secId];
                        const isSelected = aboutExpandedSection === secId;
                        const isVisible = aboutData.sectionVisibility[secId] !== false;

                        return (
                          <button
                            key={secId}
                            type="button"
                            onClick={() => setAboutExpandedSection(secId)}
                            className={`p-3 rounded-2xl text-left border transition flex flex-col justify-between ${
                              isSelected
                                ? "bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-600/30"
                                : "bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-850"
                            }`}
                          >
                            <div className="flex items-center justify-between gap-1 mb-1">
                              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-black/30">
                                0{idx + 1}
                              </span>
                              {!isVisible && (
                                <span className="text-[9px] px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-300 font-mono">
                                  HIDDEN
                                </span>
                              )}
                            </div>
                            <div className="text-xs font-bold truncate">
                              {meta?.title.replace(/^\d+\.\s*/, "") || secId}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="space-y-4">
                <div className="flex items-center justify-between px-2">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Sliders className="w-4 h-4 text-blue-400" />
                    About Us Section Content & Details Editors
                  </h3>
                  <span className="text-xs text-slate-400">
                    Click any section below to edit its text, images, or buttons
                  </span>
                </div>

                {/* 1. HERO BANNER */}
                <div className="bg-slate-950 rounded-3xl border border-slate-800 overflow-hidden shadow-lg">
                  <button
                    type="button"
                    onClick={() => setAboutExpandedSection(aboutExpandedSection === "hero" ? null : "hero")}
                    className="w-full flex items-center justify-between p-5 text-left bg-slate-900/60 hover:bg-slate-900 transition"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-xs">
                        1
                      </div>
                      <div>
                        <div className="text-sm font-bold text-white">Hero Banner Section</div>
                        <div className="text-xs text-slate-400">Headlines, badge, background image, and CTA buttons</div>
                      </div>
                    </div>
                    {aboutExpandedSection === "hero" ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                  </button>

                  {aboutExpandedSection === "hero" && (
                    <div className="p-6 space-y-4 border-t border-slate-800 bg-slate-950">
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1.5">Top Badge Pill Text</label>
                        <input
                          type="text"
                          value={aboutData.hero.badge}
                          onChange={(e) => setAboutData({ ...aboutData, hero: { ...aboutData.hero, badge: e.target.value } })}
                          className="w-full px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white"
                          placeholder="About VRAT System"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1.5">Main Headline</label>
                        <input
                          type="text"
                          value={aboutData.hero.heading}
                          onChange={(e) => setAboutData({ ...aboutData, hero: { ...aboutData.hero, heading: e.target.value } })}
                          className="w-full px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1.5">Subtitle / Description</label>
                        <textarea
                          rows={3}
                          value={aboutData.hero.subtitle}
                          onChange={(e) => setAboutData({ ...aboutData, hero: { ...aboutData.hero, subtitle: e.target.value } })}
                          className="w-full px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white"
                        />
                      </div>
                      <div>
                        <ImageUploader
                          value={aboutData.hero.backgroundImage}
                          onChange={(url) => setAboutData({ ...aboutData, hero: { ...aboutData.hero, backgroundImage: url } })}
                          folder="heroes"
                          label="Hero Background Image Asset"
                          helperText="Upload HD banner image for About Us Hero"
                        />
                      </div>
                      <div className="grid sm:grid-cols-2 gap-4 p-4 bg-slate-900 rounded-2xl border border-slate-850">
                        <div className="space-y-2">
                          <span className="text-xs font-bold text-blue-400">Primary CTA Button</span>
                          <input
                            type="text"
                            value={aboutData.hero.primaryCtaText}
                            onChange={(e) => setAboutData({ ...aboutData, hero: { ...aboutData.hero, primaryCtaText: e.target.value } })}
                            className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white"
                            placeholder="Button Text"
                          />
                          <input
                            type="text"
                            value={aboutData.hero.primaryCtaLink}
                            onChange={(e) => setAboutData({ ...aboutData, hero: { ...aboutData.hero, primaryCtaLink: e.target.value } })}
                            className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white"
                            placeholder="#team"
                          />
                        </div>
                        <div className="space-y-2">
                          <span className="text-xs font-bold text-slate-300">Secondary CTA Button</span>
                          <input
                            type="text"
                            value={aboutData.hero.secondaryCtaText}
                            onChange={(e) => setAboutData({ ...aboutData, hero: { ...aboutData.hero, secondaryCtaText: e.target.value } })}
                            className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white"
                            placeholder="Button Text"
                          />
                          <input
                            type="text"
                            value={aboutData.hero.secondaryCtaLink}
                            onChange={(e) => setAboutData({ ...aboutData, hero: { ...aboutData.hero, secondaryCtaLink: e.target.value } })}
                            className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white"
                            placeholder="/contact"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* 2. WHO WE ARE & 4-IMAGE GRID */}
                <div className="bg-slate-950 rounded-3xl border border-slate-800 overflow-hidden shadow-lg">
                  <button
                    type="button"
                    onClick={() => setAboutExpandedSection(aboutExpandedSection === "who_we_are" ? null : "who_we_are")}
                    className="w-full flex items-center justify-between p-5 text-left bg-slate-900/60 hover:bg-slate-900 transition"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs">
                        2
                      </div>
                      <div>
                        <div className="text-sm font-bold text-white">Who We Are (Narrative & 4 Collage Images)</div>
                        <div className="text-xs text-slate-400">Headings, 3 company paragraphs, and 4 uploadable collage photos</div>
                      </div>
                    </div>
                    {aboutExpandedSection === "who_we_are" ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                  </button>

                  {aboutExpandedSection === "who_we_are" && (
                    <div className="p-6 space-y-4 border-t border-slate-800 bg-slate-950">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-slate-300 mb-1.5">Section Badge</label>
                          <input
                            type="text"
                            value={aboutData.whoWeAre.badge}
                            onChange={(e) => setAboutData({ ...aboutData, whoWeAre: { ...aboutData.whoWeAre, badge: e.target.value } })}
                            className="w-full px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-300 mb-1.5">Main Heading</label>
                          <input
                            type="text"
                            value={aboutData.whoWeAre.heading}
                            onChange={(e) => setAboutData({ ...aboutData, whoWeAre: { ...aboutData.whoWeAre, heading: e.target.value } })}
                            className="w-full px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1.5">Paragraph 1</label>
                        <textarea
                          rows={2}
                          value={aboutData.whoWeAre.p1}
                          onChange={(e) => setAboutData({ ...aboutData, whoWeAre: { ...aboutData.whoWeAre, p1: e.target.value } })}
                          className="w-full px-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1.5">Paragraph 2</label>
                        <textarea
                          rows={2}
                          value={aboutData.whoWeAre.p2}
                          onChange={(e) => setAboutData({ ...aboutData, whoWeAre: { ...aboutData.whoWeAre, p2: e.target.value } })}
                          className="w-full px-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1.5">Paragraph 3</label>
                        <textarea
                          rows={2}
                          value={aboutData.whoWeAre.p3}
                          onChange={(e) => setAboutData({ ...aboutData, whoWeAre: { ...aboutData.whoWeAre, p3: e.target.value } })}
                          className="w-full px-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white"
                        />
                      </div>

                      <div className="pt-2">
                        <label className="block text-xs font-semibold text-slate-300 mb-3">
                          Collage Grid Images (4 Photos)
                        </label>
                        <div className="grid sm:grid-cols-2 gap-4">
                          {[0, 1, 2, 3].map((imgIdx) => (
                            <ImageUploader
                              key={imgIdx}
                              value={aboutData.whoWeAre.images[imgIdx]}
                              onChange={(url) => {
                                const newImages = [...aboutData.whoWeAre.images] as [string, string, string, string];
                                newImages[imgIdx] = url;
                                setAboutData({ ...aboutData, whoWeAre: { ...aboutData.whoWeAre, images: newImages } });
                              }}
                              folder="about"
                              label={`Collage Image #${imgIdx + 1}`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* 3. OUR STORY */}
                <div className="bg-slate-950 rounded-3xl border border-slate-800 overflow-hidden shadow-lg">
                  <button
                    type="button"
                    onClick={() => setAboutExpandedSection(aboutExpandedSection === "story" ? null : "story")}
                    className="w-full flex items-center justify-between p-5 text-left bg-slate-900/60 hover:bg-slate-900 transition"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-xs">
                        3
                      </div>
                      <div>
                        <div className="text-sm font-bold text-white">Our Story (Blue Banner)</div>
                        <div className="text-xs text-slate-400">Headings and 3 paragraphs on founding and evolution</div>
                      </div>
                    </div>
                    {aboutExpandedSection === "story" ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                  </button>

                  {aboutExpandedSection === "story" && (
                    <div className="p-6 space-y-4 border-t border-slate-800 bg-slate-950">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-slate-300 mb-1.5">Section Badge</label>
                          <input
                            type="text"
                            value={aboutData.story.badge}
                            onChange={(e) => setAboutData({ ...aboutData, story: { ...aboutData.story, badge: e.target.value } })}
                            className="w-full px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-300 mb-1.5">Main Heading</label>
                          <input
                            type="text"
                            value={aboutData.story.heading}
                            onChange={(e) => setAboutData({ ...aboutData, story: { ...aboutData.story, heading: e.target.value } })}
                            className="w-full px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1.5">Story Paragraph 1</label>
                        <textarea
                          rows={2}
                          value={aboutData.story.p1}
                          onChange={(e) => setAboutData({ ...aboutData, story: { ...aboutData.story, p1: e.target.value } })}
                          className="w-full px-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1.5">Story Paragraph 2</label>
                        <textarea
                          rows={2}
                          value={aboutData.story.p2}
                          onChange={(e) => setAboutData({ ...aboutData, story: { ...aboutData.story, p2: e.target.value } })}
                          className="w-full px-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1.5">Story Paragraph 3</label>
                        <textarea
                          rows={2}
                          value={aboutData.story.p3}
                          onChange={(e) => setAboutData({ ...aboutData, story: { ...aboutData.story, p3: e.target.value } })}
                          className="w-full px-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* 4. VISION & MISSION */}
                <div className="bg-slate-950 rounded-3xl border border-slate-800 overflow-hidden shadow-lg">
                  <button
                    type="button"
                    onClick={() => setAboutExpandedSection(aboutExpandedSection === "vision_mission" ? null : "vision_mission")}
                    className="w-full flex items-center justify-between p-5 text-left bg-slate-900/60 hover:bg-slate-900 transition"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-xs">
                        4
                      </div>
                      <div>
                        <div className="text-sm font-bold text-white">Vision & Mission Cards</div>
                        <div className="text-xs text-slate-400">Our Vision description, Our Mission title, subtitle, and 5 execution points</div>
                      </div>
                    </div>
                    {aboutExpandedSection === "vision_mission" ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                  </button>

                  {aboutExpandedSection === "vision_mission" && (
                    <div className="p-6 space-y-5 border-t border-slate-800 bg-slate-950">
                      {/* Vision */}
                      <div className="p-4 bg-slate-900 rounded-2xl border border-slate-850 space-y-3">
                        <span className="text-xs font-bold text-blue-400">Our Vision Card</span>
                        <div>
                          <label className="block text-[11px] text-slate-400 mb-1">Vision Card Title</label>
                          <input
                            type="text"
                            value={aboutData.visionMission.visionTitle}
                            onChange={(e) => setAboutData({ ...aboutData, visionMission: { ...aboutData.visionMission, visionTitle: e.target.value } })}
                            className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] text-slate-400 mb-1">Vision Description</label>
                          <textarea
                            rows={3}
                            value={aboutData.visionMission.visionDesc}
                            onChange={(e) => setAboutData({ ...aboutData, visionMission: { ...aboutData.visionMission, visionDesc: e.target.value } })}
                            className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white"
                          />
                        </div>
                      </div>

                      {/* Mission */}
                      <div className="p-4 bg-slate-900 rounded-2xl border border-slate-850 space-y-3">
                        <span className="text-xs font-bold text-indigo-400">Our Mission Card</span>
                        <div className="grid sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[11px] text-slate-400 mb-1">Mission Card Title</label>
                            <input
                              type="text"
                              value={aboutData.visionMission.missionTitle}
                              onChange={(e) => setAboutData({ ...aboutData, visionMission: { ...aboutData.visionMission, missionTitle: e.target.value } })}
                              className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] text-slate-400 mb-1">Mission Subtitle</label>
                            <input
                              type="text"
                              value={aboutData.visionMission.missionSubtitle}
                              onChange={(e) => setAboutData({ ...aboutData, visionMission: { ...aboutData.visionMission, missionSubtitle: e.target.value } })}
                              className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-[11px] text-slate-400 mb-2">5 Mission Bullet Points</label>
                          <div className="space-y-2">
                            {aboutData.visionMission.missionPoints.map((pt, i) => (
                              <div key={i} className="flex items-center gap-2">
                                <span className="text-xs text-blue-400 font-mono font-bold shrink-0">{i + 1}.</span>
                                <input
                                  type="text"
                                  value={pt}
                                  onChange={(e) => {
                                    const newPoints = [...aboutData.visionMission.missionPoints];
                                    newPoints[i] = e.target.value;
                                    setAboutData({
                                      ...aboutData,
                                      visionMission: { ...aboutData.visionMission, missionPoints: newPoints },
                                    });
                                  }}
                                  className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white"
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* 5. CORE VALUES */}
                <div className="bg-slate-950 rounded-3xl border border-slate-800 overflow-hidden shadow-lg">
                  <button
                    type="button"
                    onClick={() => setAboutExpandedSection(aboutExpandedSection === "core_values" ? null : "core_values")}
                    className="w-full flex items-center justify-between p-5 text-left bg-slate-900/60 hover:bg-slate-900 transition"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold text-xs">
                        5
                      </div>
                      <div>
                        <div className="text-sm font-bold text-white">Core Values (6 Principles)</div>
                        <div className="text-xs text-slate-400">Section heading and 6 guiding principle cards</div>
                      </div>
                    </div>
                    {aboutExpandedSection === "core_values" ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                  </button>

                  {aboutExpandedSection === "core_values" && (
                    <div className="p-6 space-y-4 border-t border-slate-800 bg-slate-950">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-slate-300 mb-1.5">Section Badge</label>
                          <input
                            type="text"
                            value={aboutData.coreValues.badge}
                            onChange={(e) => setAboutData({ ...aboutData, coreValues: { ...aboutData.coreValues, badge: e.target.value } })}
                            className="w-full px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-300 mb-1.5">Main Heading</label>
                          <input
                            type="text"
                            value={aboutData.coreValues.heading}
                            onChange={(e) => setAboutData({ ...aboutData, coreValues: { ...aboutData.coreValues, heading: e.target.value } })}
                            className="w-full px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white"
                          />
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-2">
                        {aboutData.coreValues.items.map((val, i) => (
                          <div key={i} className="p-4 bg-slate-900 rounded-2xl border border-slate-850 space-y-2">
                            <span className="text-[10px] text-cyan-400 font-bold uppercase">Principle #{i + 1}</span>
                            <input
                              type="text"
                              value={val.title}
                              onChange={(e) => {
                                const newItems = [...aboutData.coreValues.items];
                                newItems[i] = { ...newItems[i], title: e.target.value };
                                setAboutData({ ...aboutData, coreValues: { ...aboutData.coreValues, items: newItems } });
                              }}
                              className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white font-semibold"
                            />
                            <textarea
                              rows={2}
                              value={val.desc}
                              onChange={(e) => {
                                const newItems = [...aboutData.coreValues.items];
                                newItems[i] = { ...newItems[i], desc: e.target.value };
                                setAboutData({ ...aboutData, coreValues: { ...aboutData.coreValues, items: newItems } });
                              }}
                              className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-300"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* 6. TIMELINE */}
                <div className="bg-slate-950 rounded-3xl border border-slate-800 overflow-hidden shadow-lg">
                  <button
                    type="button"
                    onClick={() => setAboutExpandedSection(aboutExpandedSection === "timeline" ? null : "timeline")}
                    className="w-full flex items-center justify-between p-5 text-left bg-slate-900/60 hover:bg-slate-900 transition"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-xs">
                        6
                      </div>
                      <div>
                        <div className="text-sm font-bold text-white">Company Timeline (Growth Journey)</div>
                        <div className="text-xs text-slate-400">Milestone timeline entries with Year and Event descriptions</div>
                      </div>
                    </div>
                    {aboutExpandedSection === "timeline" ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                  </button>

                  {aboutExpandedSection === "timeline" && (
                    <div className="p-6 space-y-4 border-t border-slate-800 bg-slate-950">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-slate-300 mb-1.5">Section Badge</label>
                          <input
                            type="text"
                            value={aboutData.timeline.badge}
                            onChange={(e) => setAboutData({ ...aboutData, timeline: { ...aboutData.timeline, badge: e.target.value } })}
                            className="w-full px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-300 mb-1.5">Main Heading</label>
                          <input
                            type="text"
                            value={aboutData.timeline.heading}
                            onChange={(e) => setAboutData({ ...aboutData, timeline: { ...aboutData.timeline, heading: e.target.value } })}
                            className="w-full px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white"
                          />
                        </div>
                      </div>

                      <div className="space-y-3 pt-2">
                        {aboutData.timeline.items.map((milestone, i) => (
                          <div key={i} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 p-3.5 bg-slate-900 rounded-2xl border border-slate-850">
                            <input
                              type="text"
                              value={milestone.year}
                              onChange={(e) => {
                                const newItems = [...aboutData.timeline.items];
                                newItems[i] = { ...newItems[i], year: e.target.value };
                                setAboutData({ ...aboutData, timeline: { ...aboutData.timeline, items: newItems } });
                              }}
                              placeholder="Year (e.g. 2007)"
                              className="w-24 px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-blue-400 font-bold font-mono"
                            />
                            <input
                              type="text"
                              value={milestone.event}
                              onChange={(e) => {
                                const newItems = [...aboutData.timeline.items];
                                newItems[i] = { ...newItems[i], event: e.target.value };
                                setAboutData({ ...aboutData, timeline: { ...aboutData.timeline, items: newItems } });
                              }}
                              placeholder="Event description"
                              className="flex-1 px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* 7. WHY CHOOSE VRAT */}
                <div className="bg-slate-950 rounded-3xl border border-slate-800 overflow-hidden shadow-lg">
                  <button
                    type="button"
                    onClick={() => setAboutExpandedSection(aboutExpandedSection === "why_choose" ? null : "why_choose")}
                    className="w-full flex items-center justify-between p-5 text-left bg-slate-900/60 hover:bg-slate-900 transition"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-violet-500/10 border border-violet-500/20 text-violet-400 flex items-center justify-center font-bold text-xs">
                        7
                      </div>
                      <div>
                        <div className="text-sm font-bold text-white">Why Choose VRAT (4 Pillar Cards)</div>
                        <div className="text-xs text-slate-400">Headings and 4 key value cards with icons and descriptions</div>
                      </div>
                    </div>
                    {aboutExpandedSection === "why_choose" ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                  </button>

                  {aboutExpandedSection === "why_choose" && (
                    <div className="p-6 space-y-4 border-t border-slate-800 bg-slate-950">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-slate-300 mb-1.5">Section Badge</label>
                          <input
                            type="text"
                            value={aboutData.whyChoose.badge}
                            onChange={(e) => setAboutData({ ...aboutData, whyChoose: { ...aboutData.whyChoose, badge: e.target.value } })}
                            className="w-full px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-300 mb-1.5">Main Heading</label>
                          <input
                            type="text"
                            value={aboutData.whyChoose.heading}
                            onChange={(e) => setAboutData({ ...aboutData, whyChoose: { ...aboutData.whyChoose, heading: e.target.value } })}
                            className="w-full px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white"
                          />
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-3 pt-2">
                        {aboutData.whyChoose.items.map((card, i) => (
                          <div key={i} className="p-4 bg-slate-900 rounded-2xl border border-slate-850 space-y-2">
                            <div className="flex items-center gap-2">
                              <input
                                type="text"
                                value={card.icon || "✓"}
                                onChange={(e) => {
                                  const newItems = [...aboutData.whyChoose.items];
                                  newItems[i] = { ...newItems[i], icon: e.target.value };
                                  setAboutData({ ...aboutData, whyChoose: { ...aboutData.whyChoose, items: newItems } });
                                }}
                                className="w-12 px-2 py-1 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white text-center"
                                placeholder="Icon"
                              />
                              <input
                                type="text"
                                value={card.title}
                                onChange={(e) => {
                                  const newItems = [...aboutData.whyChoose.items];
                                  newItems[i] = { ...newItems[i], title: e.target.value };
                                  setAboutData({ ...aboutData, whyChoose: { ...aboutData.whyChoose, items: newItems } });
                                }}
                                className="flex-1 px-3 py-1 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white font-semibold"
                                placeholder="Card Title"
                              />
                            </div>
                            <textarea
                              rows={2}
                              value={card.desc}
                              onChange={(e) => {
                                const newItems = [...aboutData.whyChoose.items];
                                newItems[i] = { ...newItems[i], desc: e.target.value };
                                setAboutData({ ...aboutData, whyChoose: { ...aboutData.whyChoose, items: newItems } });
                              }}
                              className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-300"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* 8. LEADERSHIP & MEET OUR EXPERTS */}
                <div className="bg-slate-950 rounded-3xl border border-slate-800 overflow-hidden shadow-lg">
                  <button
                    type="button"
                    onClick={() => setAboutExpandedSection(aboutExpandedSection === "leadership" ? null : "leadership")}
                    className="w-full flex items-center justify-between p-5 text-left bg-slate-900/60 hover:bg-slate-900 transition"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-teal-500/10 border border-teal-500/20 text-teal-400 flex items-center justify-center font-bold text-xs">
                        8
                      </div>
                      <div>
                        <div className="text-sm font-bold text-white">Leadership & Meet Our Experts</div>
                        <div className="text-xs text-slate-400">Leadership narrative, team subtitle, and 8 certified expert roles</div>
                      </div>
                    </div>
                    {aboutExpandedSection === "leadership" ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                  </button>

                  {aboutExpandedSection === "leadership" && (
                    <div className="p-6 space-y-4 border-t border-slate-800 bg-slate-950">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-slate-300 mb-1.5">Section Badge</label>
                          <input
                            type="text"
                            value={aboutData.leadership.badge}
                            onChange={(e) => setAboutData({ ...aboutData, leadership: { ...aboutData.leadership, badge: e.target.value } })}
                            className="w-full px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-300 mb-1.5">Main Heading</label>
                          <input
                            type="text"
                            value={aboutData.leadership.heading}
                            onChange={(e) => setAboutData({ ...aboutData, leadership: { ...aboutData.leadership, heading: e.target.value } })}
                            className="w-full px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1.5">Leadership Description</label>
                        <textarea
                          rows={3}
                          value={aboutData.leadership.description}
                          onChange={(e) => setAboutData({ ...aboutData, leadership: { ...aboutData.leadership, description: e.target.value } })}
                          className="w-full px-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white"
                        />
                      </div>

                      <div className="p-4 bg-slate-900 rounded-2xl border border-slate-850 space-y-3">
                        <div className="grid sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[11px] text-slate-400 mb-1">Team Sub-Heading</label>
                            <input
                              type="text"
                              value={aboutData.leadership.teamHeading}
                              onChange={(e) => setAboutData({ ...aboutData, leadership: { ...aboutData.leadership, teamHeading: e.target.value } })}
                              className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] text-slate-400 mb-1">Team Subtitle</label>
                            <input
                              type="text"
                              value={aboutData.leadership.teamSubtitle}
                              onChange={(e) => setAboutData({ ...aboutData, leadership: { ...aboutData.leadership, teamSubtitle: e.target.value } })}
                              className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white"
                            />
                          </div>
                        </div>

                        {/* Dynamic Team Experts Manager */}
                        <div className="pt-2 border-t border-slate-800">
                          <div className="flex items-center justify-between mb-3">
                            <div>
                              <label className="block text-xs font-bold text-white">Team Experts & Leaders</label>
                              <span className="text-[11px] text-slate-400">Add, edit, or remove company experts (Photo, Name, Designation)</span>
                            </div>
                            <button
                              type="button"
                              onClick={() => {
                                const currentExperts = aboutData.leadership.experts || INITIAL_ABOUT_PAGE_DATA.leadership.experts || [];
                                const newExpert = {
                                  id: "exp-" + Date.now(),
                                  name: "New Expert Name",
                                  designation: "Security Systems Engineer",
                                  image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&h=500&fit=crop&crop=face&auto=format",
                                  bio: "Experienced system integrator specializing in enterprise physical security and communications.",
                                };
                                setAboutData({
                                  ...aboutData,
                                  leadership: {
                                    ...aboutData.leadership,
                                    experts: [...currentExperts, newExpert],
                                  },
                                });
                              }}
                              className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition shadow-sm"
                            >
                              <Plus className="w-3.5 h-3.5" /> Add Expert
                            </button>
                          </div>

                          <div className="space-y-3">
                            {((aboutData.leadership.experts && aboutData.leadership.experts.length > 0)
                              ? aboutData.leadership.experts
                              : (INITIAL_ABOUT_PAGE_DATA.leadership.experts || [])
                            ).map((expert, idx) => (
                              <div key={expert.id || idx} className="p-3.5 bg-slate-950 border border-slate-800 rounded-xl space-y-3">
                                <div className="flex items-center gap-3">
                                  <img
                                    src={expert.image || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face&auto=format"}
                                    alt={expert.name}
                                    className="w-12 h-12 rounded-xl object-cover border border-slate-700 bg-slate-800 flex-shrink-0"
                                  />
                                  <div className="grid sm:grid-cols-2 gap-2.5 flex-1">
                                    <div>
                                      <label className="block text-[10px] text-slate-400 uppercase font-semibold mb-0.5">Person Name *</label>
                                      <input
                                        type="text"
                                        value={expert.name}
                                        onChange={(e) => {
                                          const list = [...((aboutData.leadership.experts && aboutData.leadership.experts.length > 0) ? aboutData.leadership.experts : (INITIAL_ABOUT_PAGE_DATA.leadership.experts || []))];
                                          list[idx] = { ...list[idx], name: e.target.value };
                                          setAboutData({ ...aboutData, leadership: { ...aboutData.leadership, experts: list } });
                                        }}
                                        placeholder="e.g. Nimesh Patel"
                                        className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white font-semibold"
                                      />
                                    </div>
                                    <div>
                                      <label className="block text-[10px] text-slate-400 uppercase font-semibold mb-0.5">Designation / Role *</label>
                                      <input
                                        type="text"
                                        value={expert.designation}
                                        onChange={(e) => {
                                          const list = [...((aboutData.leadership.experts && aboutData.leadership.experts.length > 0) ? aboutData.leadership.experts : (INITIAL_ABOUT_PAGE_DATA.leadership.experts || []))];
                                          list[idx] = { ...list[idx], designation: e.target.value };
                                          setAboutData({ ...aboutData, leadership: { ...aboutData.leadership, experts: list } });
                                        }}
                                        placeholder="e.g. Managing Director & Principal Consultant"
                                        className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-xs text-blue-400 font-medium"
                                      />
                                    </div>
                                  </div>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      const list = [...((aboutData.leadership.experts && aboutData.leadership.experts.length > 0) ? aboutData.leadership.experts : (INITIAL_ABOUT_PAGE_DATA.leadership.experts || []))];
                                      list.splice(idx, 1);
                                      setAboutData({ ...aboutData, leadership: { ...aboutData.leadership, experts: list } });
                                    }}
                                    className="p-2 text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded-lg transition"
                                    title="Delete Person"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>

                                <div className="grid sm:grid-cols-2 gap-2.5">
                                  <div>
                                    <label className="block text-[10px] text-slate-400 uppercase font-semibold mb-0.5">Photo Image URL</label>
                                    <input
                                      type="text"
                                      value={expert.image}
                                      onChange={(e) => {
                                        const list = [...((aboutData.leadership.experts && aboutData.leadership.experts.length > 0) ? aboutData.leadership.experts : (INITIAL_ABOUT_PAGE_DATA.leadership.experts || []))];
                                        list[idx] = { ...list[idx], image: e.target.value };
                                        setAboutData({ ...aboutData, leadership: { ...aboutData.leadership, experts: list } });
                                      }}
                                      placeholder="https://images.unsplash.com/..."
                                      className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-[11px] text-slate-300 font-mono"
                                    />
                                  </div>
                                  <div>
                                    <label className="block text-[10px] text-slate-400 uppercase font-semibold mb-0.5">Brief Bio / Credentials</label>
                                    <input
                                      type="text"
                                      value={expert.bio || ""}
                                      onChange={(e) => {
                                        const list = [...((aboutData.leadership.experts && aboutData.leadership.experts.length > 0) ? aboutData.leadership.experts : (INITIAL_ABOUT_PAGE_DATA.leadership.experts || []))];
                                        list[idx] = { ...list[idx], bio: e.target.value };
                                        setAboutData({ ...aboutData, leadership: { ...aboutData.leadership, experts: list } });
                                      }}
                                      placeholder="Brief background..."
                                      className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-[11px] text-slate-300"
                                    />
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {aboutData.leadership.roles && (
                          <div className="pt-2 border-t border-slate-800">
                            <label className="block text-[11px] text-slate-400 mb-2">Engineering Division Tags</label>
                            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-2">
                              {aboutData.leadership.roles.map((r, i) => (
                                <input
                                  key={i}
                                  type="text"
                                  value={r}
                                  onChange={(e) => {
                                    const newRoles = [...aboutData.leadership.roles!];
                                    newRoles[i] = e.target.value;
                                    setAboutData({ ...aboutData, leadership: { ...aboutData.leadership, roles: newRoles } });
                                  }}
                                  className="px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-blue-400 font-semibold"
                                />
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* 9. CERTIFICATIONS & COMPLIANCE */}
                <div className="bg-slate-950 rounded-3xl border border-slate-800 overflow-hidden shadow-lg">
                  <button
                    type="button"
                    onClick={() => setAboutExpandedSection(aboutExpandedSection === "certifications" ? null : "certifications")}
                    className="w-full flex items-center justify-between p-5 text-left bg-slate-900/60 hover:bg-slate-900 transition"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-400 flex items-center justify-center font-bold text-xs">
                        9
                      </div>
                      <div>
                        <div className="text-sm font-bold text-white">Certifications & Compliance (6 Badges)</div>
                        <div className="text-xs text-slate-400">Headings and 6 compliance certification titles</div>
                      </div>
                    </div>
                    {aboutExpandedSection === "certifications" ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                  </button>

                  {aboutExpandedSection === "certifications" && (
                    <div className="p-6 space-y-4 border-t border-slate-800 bg-slate-950">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-slate-300 mb-1.5">Section Badge</label>
                          <input
                            type="text"
                            value={aboutData.certifications.badge}
                            onChange={(e) => setAboutData({ ...aboutData, certifications: { ...aboutData.certifications, badge: e.target.value } })}
                            className="w-full px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-300 mb-1.5">Main Heading</label>
                          <input
                            type="text"
                            value={aboutData.certifications.heading}
                            onChange={(e) => setAboutData({ ...aboutData, certifications: { ...aboutData.certifications, heading: e.target.value } })}
                            className="w-full px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1.5">Subtitle</label>
                        <textarea
                          rows={2}
                          value={aboutData.certifications.subtitle}
                          onChange={(e) => setAboutData({ ...aboutData, certifications: { ...aboutData.certifications, subtitle: e.target.value } })}
                          className="w-full px-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white"
                        />
                      </div>

                      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2.5 pt-2">
                        {aboutData.certifications.items.map((cert, i) => (
                          <div key={i} className="flex items-center gap-2 p-2.5 bg-slate-900 rounded-xl border border-slate-850">
                            <ShieldCheck className="w-4 h-4 text-blue-400 shrink-0" />
                            <input
                              type="text"
                              value={cert}
                              onChange={(e) => {
                                const newItems = [...aboutData.certifications.items];
                                newItems[i] = e.target.value;
                                setAboutData({ ...aboutData, certifications: { ...aboutData.certifications, items: newItems } });
                              }}
                              className="w-full bg-transparent border-0 text-xs text-white font-medium focus:outline-none"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* 10. TECHNOLOGY PARTNERS */}
                <div className="bg-slate-950 rounded-3xl border border-slate-800 overflow-hidden shadow-lg">
                  <button
                    type="button"
                    onClick={() => setAboutExpandedSection(aboutExpandedSection === "partners" ? null : "partners")}
                    className="w-full flex items-center justify-between p-5 text-left bg-slate-900/60 hover:bg-slate-900 transition"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-pink-500/10 border border-pink-500/20 text-pink-400 flex items-center justify-center font-bold text-xs">
                        10
                      </div>
                      <div>
                        <div className="text-sm font-bold text-white">Technology Partners Section</div>
                        <div className="text-xs text-slate-400">Headings & subtitle (Partner brands managed from Technology Partners tab)</div>
                      </div>
                    </div>
                    {aboutExpandedSection === "partners" ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                  </button>

                  {aboutExpandedSection === "partners" && (
                    <div className="p-6 space-y-4 border-t border-slate-800 bg-slate-950">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-slate-300 mb-1.5">Section Badge</label>
                          <input
                            type="text"
                            value={aboutData.partners.badge}
                            onChange={(e) => setAboutData({ ...aboutData, partners: { ...aboutData.partners, badge: e.target.value } })}
                            className="w-full px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-300 mb-1.5">Main Heading</label>
                          <input
                            type="text"
                            value={aboutData.partners.heading}
                            onChange={(e) => setAboutData({ ...aboutData, partners: { ...aboutData.partners, heading: e.target.value } })}
                            className="w-full px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1.5">Subtitle</label>
                        <input
                          type="text"
                          value={aboutData.partners.subtitle}
                          onChange={(e) => setAboutData({ ...aboutData, partners: { ...aboutData.partners, subtitle: e.target.value } })}
                          className="w-full px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* 11. SUSTAINABILITY & INNOVATION */}
                <div className="bg-slate-950 rounded-3xl border border-slate-800 overflow-hidden shadow-lg">
                  <button
                    type="button"
                    onClick={() => setAboutExpandedSection(aboutExpandedSection === "sustainability" ? null : "sustainability")}
                    className="w-full flex items-center justify-between p-5 text-left bg-slate-900/60 hover:bg-slate-900 transition"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs">
                        11
                      </div>
                      <div>
                        <div className="text-sm font-bold text-white">Sustainability & Innovation</div>
                        <div className="text-xs text-slate-400">Headings, 6 feature points, and side showcase image</div>
                      </div>
                    </div>
                    {aboutExpandedSection === "sustainability" ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                  </button>

                  {aboutExpandedSection === "sustainability" && (
                    <div className="p-6 space-y-4 border-t border-slate-800 bg-slate-950">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-slate-300 mb-1.5">Section Badge</label>
                          <input
                            type="text"
                            value={aboutData.sustainability.badge}
                            onChange={(e) => setAboutData({ ...aboutData, sustainability: { ...aboutData.sustainability, badge: e.target.value } })}
                            className="w-full px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-300 mb-1.5">Main Heading</label>
                          <input
                            type="text"
                            value={aboutData.sustainability.heading}
                            onChange={(e) => setAboutData({ ...aboutData, sustainability: { ...aboutData.sustainability, heading: e.target.value } })}
                            className="w-full px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1.5">Subtitle</label>
                        <textarea
                          rows={2}
                          value={aboutData.sustainability.subtitle}
                          onChange={(e) => setAboutData({ ...aboutData, sustainability: { ...aboutData.sustainability, subtitle: e.target.value } })}
                          className="w-full px-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-2">6 Sustainability Points</label>
                        <div className="grid sm:grid-cols-2 gap-2">
                          {aboutData.sustainability.items.map((pt, i) => (
                            <input
                              key={i}
                              type="text"
                              value={pt}
                              onChange={(e) => {
                                const newItems = [...aboutData.sustainability.items];
                                newItems[i] = e.target.value;
                                setAboutData({ ...aboutData, sustainability: { ...aboutData.sustainability, items: newItems } });
                              }}
                              className="px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white"
                            />
                          ))}
                        </div>
                      </div>

                      <div>
                        <ImageUploader
                          value={aboutData.sustainability.image}
                          onChange={(url) => setAboutData({ ...aboutData, sustainability: { ...aboutData.sustainability, image: url } })}
                          folder="about"
                          label="Sustainability Showcase Image"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* 12. CALL TO ACTION BANNER */}
                <div className="bg-slate-950 rounded-3xl border border-slate-800 overflow-hidden shadow-lg">
                  <button
                    type="button"
                    onClick={() => setAboutExpandedSection(aboutExpandedSection === "cta" ? null : "cta")}
                    className="w-full flex items-center justify-between p-5 text-left bg-slate-900/60 hover:bg-slate-900 transition"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 flex items-center justify-center font-bold text-xs">
                        12
                      </div>
                      <div>
                        <div className="text-sm font-bold text-white">Call To Action Banner</div>
                        <div className="text-xs text-slate-400">Bottom blue CTA banner with 2 action buttons</div>
                      </div>
                    </div>
                    {aboutExpandedSection === "cta" ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                  </button>

                  {aboutExpandedSection === "cta" && (
                    <div className="p-6 space-y-4 border-t border-slate-800 bg-slate-950">
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1.5">Main Heading</label>
                        <input
                          type="text"
                          value={aboutData.cta.heading}
                          onChange={(e) => setAboutData({ ...aboutData, cta: { ...aboutData.cta, heading: e.target.value } })}
                          className="w-full px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1.5">Subtitle / Description</label>
                        <textarea
                          rows={2}
                          value={aboutData.cta.subtitle}
                          onChange={(e) => setAboutData({ ...aboutData, cta: { ...aboutData.cta, subtitle: e.target.value } })}
                          className="w-full px-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white"
                        />
                      </div>
                      <div className="grid sm:grid-cols-2 gap-4 p-4 bg-slate-900 rounded-2xl border border-slate-850">
                        <div className="space-y-2">
                          <span className="text-xs font-bold text-blue-400">Primary Button</span>
                          <input
                            type="text"
                            value={aboutData.cta.primaryBtnText}
                            onChange={(e) => setAboutData({ ...aboutData, cta: { ...aboutData.cta, primaryBtnText: e.target.value } })}
                            className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white"
                            placeholder="Button Text"
                          />
                          <input
                            type="text"
                            value={aboutData.cta.primaryBtnLink}
                            onChange={(e) => setAboutData({ ...aboutData, cta: { ...aboutData.cta, primaryBtnLink: e.target.value } })}
                            className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white"
                            placeholder="/contact"
                          />
                        </div>
                        <div className="space-y-2">
                          <span className="text-xs font-bold text-slate-300">Secondary Button</span>
                          <input
                            type="text"
                            value={aboutData.cta.secondaryBtnText}
                            onChange={(e) => setAboutData({ ...aboutData, cta: { ...aboutData.cta, secondaryBtnText: e.target.value } })}
                            className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white"
                            placeholder="Button Text"
                          />
                          <input
                            type="text"
                            value={aboutData.cta.secondaryBtnLink}
                            onChange={(e) => setAboutData({ ...aboutData, cta: { ...aboutData.cta, secondaryBtnLink: e.target.value } })}
                            className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white"
                            placeholder="/contact"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                  {/* Previous / Next Section Navigation in Content Mode */}
                  <div className="flex items-center justify-between p-4 bg-slate-900/60 rounded-2xl border border-slate-800">
                    <button
                      type="button"
                      disabled={aboutData.sectionOrder.indexOf(aboutExpandedSection || "hero") === 0}
                      onClick={() => {
                        const idx = aboutData.sectionOrder.indexOf(aboutExpandedSection || "hero");
                        if (idx > 0) setAboutExpandedSection(aboutData.sectionOrder[idx - 1]);
                      }}
                      className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed text-slate-300 border border-slate-700 transition"
                    >
                      ← Previous Section
                    </button>
                    <button
                      type="button"
                      disabled={aboutData.sectionOrder.indexOf(aboutExpandedSection || "hero") === aboutData.sectionOrder.length - 1}
                      onClick={() => {
                        const idx = aboutData.sectionOrder.indexOf(aboutExpandedSection || "hero");
                        if (idx < aboutData.sectionOrder.length - 1) setAboutExpandedSection(aboutData.sectionOrder[idx + 1]);
                      }}
                      className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed text-slate-300 border border-slate-700 transition"
                    >
                      Next Section →
                    </button>
                  </div>
                </div>
              </div>
            )}

              {/* STICKY SAVE FOOTER BAR */}
              <div className="p-5 bg-slate-900/90 backdrop-blur-md rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 sticky bottom-4 shadow-2xl z-20">
                <div className="flex items-center gap-2">
                  {saveSuccess && (
                    <div className="inline-flex items-center gap-2 text-emerald-400 text-xs font-bold">
                      <CheckCircle2 className="w-4 h-4" />
                      About Us Page updated & synced across all devices!
                    </div>
                  )}
                  {errorMessage && (
                    <div className="inline-flex items-center gap-2 text-rose-400 text-xs font-semibold">
                      <AlertCircle className="w-4 h-4" />
                      {errorMessage}
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSaving}
                  className={`px-8 py-3.5 font-bold rounded-xl text-xs transition shadow-lg flex items-center justify-center gap-2 ${
                    isSaving
                      ? "bg-blue-700 text-blue-200 cursor-not-allowed opacity-80"
                      : "bg-blue-600 hover:bg-blue-500 text-white shadow-blue-600/30 active:scale-[0.98]"
                  }`}
                >
                  {isSaving ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Publishing to Live Website...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      Save & Publish About Us Page to Live Website
                    </>
                  )}
                </button>
              </div>
            </form>
          ) : selectedPageId === "services" ? (
            /* ========================================================================= */
            /* FULL SERVICES OVERVIEW PAGE BUILDER: 9 SECTIONS REORDERING & EDITORS     */
            /* ========================================================================= */
            <ServicesPageBuilder
              data={servicesData}
              onChange={setServicesData}
              onSave={handleSaveServices}
              isSaving={isSaving}
              onResetLayout={handleResetServicesLayout}
            />
          ) : selectedPageId.startsWith("service_") ? (
            /* ========================================================================= */
            /* DEDICATED SERVICE SUB-PAGE CONTENT & CAPABILITIES STUDIO                 */
            /* ========================================================================= */
            <ServiceSubPageEditor
              service={
                services.find(
                  (s) =>
                    s.slug === selectedPageId.replace("service_", "") ||
                    s.id === selectedPageId.replace("service_", "")
                ) || {
                  id: selectedPageId.replace("service_", ""),
                  slug: selectedPageId.replace("service_", ""),
                  title:
                    SERVICE_SUB_PAGES.find((sp) => sp.id === selectedPageId)?.name ||
                    "Service Sub-Page",
                  shortDesc: "Complete enterprise security and integration solution.",
                  overview: "Comprehensive solution architecture and implementation.",
                  icon:
                    SERVICE_SUB_PAGES.find((sp) => sp.id === selectedPageId)?.icon || "📹",
                  image:
                    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=500&fit=crop&auto=format",
                  features: ["Enterprise Quality", "Certified Engineers", "24x7 Monitoring"],
                  benefits: ["High Reliability", "Cost Optimization", "Peace of Mind"],
                  applications: ["Commercial", "Industrial", "Residential"],
                  status: "Published",
                }
              }
              onSave={handleSaveSubPage}
              isSaving={isSaving}
            />
          ) : selectedPageId === "solutions" ? (
            /* ========================================================================= */
            /* FULL SOLUTIONS PAGE BUILDER: 6 SECTIONS REORDERING & EDITORS              */
            /* ========================================================================= */
            <SolutionsPageBuilder
              data={solutionsData}
              onChange={setSolutionsData}
              onSave={handleSaveSolutions}
              isSaving={isSaving}
              onResetLayout={handleResetSolutionsLayout}
            />
          ) : selectedPageId.startsWith("solution_") ? (
            /* ========================================================================= */
            /* DEDICATED INDUSTRY SECTOR SUB-PAGE CONTENT STUDIO                        */
            /* ========================================================================= */
            <SolutionSubPageEditor
              solution={
                solutions.find(
                  (s) =>
                    s.slug === selectedPageId.replace("solution_", "") ||
                    s.id === selectedPageId.replace("solution_", "")
                ) || {
                  id: selectedPageId.replace("solution_", ""),
                  slug: selectedPageId.replace("solution_", ""),
                  title:
                    SOLUTION_SUB_PAGES.find((sp) => sp.id === selectedPageId)?.name ||
                    "Industry Sector Sub-Page",
                  subtitle: "Engineered Security & Automation Architecture",
                  desc: "Comprehensive sector-specific electronic security, surveillance, and automation solutions.",
                  icon: "Building2",
                  image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop&auto=format",
                  challenges: ["Perimeter security compliance", "Access vulnerability", "Legacy siloed hardware"],
                  solutionsProvided: ["AI-powered surveillance", "Touchless biometric access", "24x7 AMC & monitoring"],
                  architectureSteps: ["Vulnerability Assessment", "System Architecture", "Precision Deployment", "Certification & Handover"],
                  keyFeatures: [{ title: "AI Analytics", desc: "Automated real-time anomaly detection." }],
                  successMetrics: ["99.8% System Uptime", "40% Incident Reduction"],
                  testimonial: { quote: "VRAT delivered exceptional precision.", client: "Facility Director", role: "Infrastructure Head" },
                  status: "Published",
                }
              }
              onSave={handleSaveSolutionSubPage}
              isSaving={isSaving}
            />
          ) : selectedPageId === "products" ? (
            /* ========================================================================= */
            /* PRODUCTS CATALOG PAGE BUILDER                                             */
            /* ========================================================================= */
            <ProductsPageBuilder
              data={productsData}
              onChange={setProductsData}
              onSave={handleSaveProducts}
              isSaving={isSaving}
              onResetLayout={handleResetProductsLayout}
            />
          ) : selectedPageId === "projects" ? (
            /* ========================================================================= */
            /* PROJECTS & CASE STUDIES PAGE BUILDER                                     */
            /* ========================================================================= */
            <ProjectsPageBuilder
              data={projectsData}
              onChange={setProjectsData}
              onSave={handleSaveProjects}
              isSaving={isSaving}
              onResetLayout={handleResetProjectsLayout}
            />
          ) : selectedPageId === "gallery" ? (
            /* ========================================================================= */
            /* MULTIMEDIA GALLERY PAGE BUILDER                                          */
            /* ========================================================================= */
            <GalleryPageBuilder
              data={galleryData}
              onChange={setGalleryData}
              onSave={handleSaveGallery}
              isSaving={isSaving}
              onResetLayout={handleResetGalleryLayout}
            />
          ) : selectedPageId === "blog" ? (
            /* ========================================================================= */
            /* BLOG & INSIGHTS PAGE BUILDER                                             */
            /* ========================================================================= */
            <BlogPageBuilder
              data={blogData}
              onChange={setBlogData}
              onSave={handleSaveBlog}
              isSaving={isSaving}
              onResetLayout={handleResetBlogLayout}
            />
          ) : selectedPageId === "contact" ? (
            /* ========================================================================= */
            /* CONTACT US PAGE BUILDER                                                  */
            /* ========================================================================= */
            <ContactPageBuilder
              data={contactData}
              onChange={setContactData}
              onSave={handleSaveContact}
              isSaving={isSaving}
              onResetLayout={handleResetContactLayout}
            />
          ) : selectedPageId === "footer" ? (
            /* ========================================================================= */
            /* WEBSITE FOOTER STUDIO                                                    */
            /* ========================================================================= */
            <FooterBuilder
              data={footerDataState}
              onChange={setFooterDataState}
              onSave={handleSaveFooter}
              isSaving={isSaving}
            />
          ) : (
            /* ========================================================================= */
            /* STANDARD HERO SECTION BUILDER FOR OTHER PAGES                            */
            /* ========================================================================= */
            <div className="bg-slate-950 p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-xl">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
                <div>
                  <span className="text-xs font-bold text-blue-400 uppercase">Editing Page Hero</span>
                  <h2 className="text-xl font-bold text-white">{heroFormData.pageName}</h2>
                </div>
                <a
                  href={pageList.find((p) => p.id === selectedPageId)?.path || "/"}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 hover:bg-slate-850 text-slate-300 text-xs font-semibold rounded-xl border border-slate-800 transition"
                >
                  <Eye className="w-3.5 h-3.5 text-blue-400" /> Preview Page
                </a>
              </div>

              <form onSubmit={handleSaveHero} className="space-y-5">
                {/* Visibility & Status */}
                <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-slate-900 rounded-2xl border border-slate-850">
                  <label className="flex items-center gap-2 text-xs font-bold text-slate-200 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={heroFormData.showSection}
                      onChange={(e) => setHeroFormData({ ...heroFormData, showSection: e.target.checked })}
                      className="w-4 h-4 rounded accent-blue-600 cursor-pointer"
                    />
                    <span>Show Hero Banner Section on Live Page</span>
                  </label>

                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-400">Publication Status:</span>
                    <select
                      value={heroFormData.status}
                      onChange={(e) => setHeroFormData({ ...heroFormData, status: e.target.value as any })}
                      className="px-3 py-1 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white"
                    >
                      <option value="Published">Published (Live)</option>
                      <option value="Draft">Draft (Hidden)</option>
                    </select>
                  </div>
                </div>

                {/* Main Heading */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Hero Main Heading
                  </label>
                  <input
                    type="text"
                    required
                    value={heroFormData.heading}
                    onChange={(e) => setHeroFormData({ ...heroFormData, heading: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Hero Heading Text..."
                  />
                </div>

                {/* Subheading */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Hero Subtitle / Description
                  </label>
                  <textarea
                    rows={3}
                    value={heroFormData.subtitle}
                    onChange={(e) => setHeroFormData({ ...heroFormData, subtitle: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 leading-relaxed"
                    placeholder="Hero subtitle description..."
                  />
                </div>

                {/* Background Image Upload System */}
                <div>
                  <ImageUploader
                    value={heroFormData.backgroundImage}
                    onChange={(url) => setHeroFormData({ ...heroFormData, backgroundImage: url })}
                    folder="heroes"
                    label="Hero Background Image Asset"
                    helperText="Upload HD banner image (JPG, PNG, WEBP) to cloud storage"
                  />
                </div>

                {/* CTA Buttons */}
                <div className="grid sm:grid-cols-2 gap-4 p-4 bg-slate-900 rounded-2xl border border-slate-850">
                  <div className="space-y-3">
                    <div className="text-xs font-bold text-blue-400">Primary CTA Button</div>
                    <div>
                      <label className="block text-[11px] text-slate-400 mb-1">Button Text</label>
                      <input
                        type="text"
                        value={heroFormData.primaryCtaText}
                        onChange={(e) => setHeroFormData({ ...heroFormData, primaryCtaText: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white"
                        placeholder="e.g. Request a Free Site Survey"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-slate-400 mb-1">Button Link URL</label>
                      <input
                        type="text"
                        value={heroFormData.primaryCtaLink}
                        onChange={(e) => setHeroFormData({ ...heroFormData, primaryCtaLink: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white"
                        placeholder="/contact"
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="text-xs font-bold text-slate-300">Secondary CTA Button</div>
                    <div>
                      <label className="block text-[11px] text-slate-400 mb-1">Button Text</label>
                      <input
                        type="text"
                        value={heroFormData.secondaryCtaText || ""}
                        onChange={(e) => setHeroFormData({ ...heroFormData, secondaryCtaText: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white"
                        placeholder="e.g. Explore Solutions"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-slate-400 mb-1">Button Link URL</label>
                      <input
                        type="text"
                        value={heroFormData.secondaryCtaLink || ""}
                        onChange={(e) => setHeroFormData({ ...heroFormData, secondaryCtaLink: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white"
                        placeholder="/services"
                      />
                    </div>
                  </div>
                </div>

                {/* Action Buttons & Status */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-4 border-t border-slate-800">
                  <div className="flex items-center gap-2">
                    {saveSuccess && (
                      <div className="inline-flex items-center gap-2 bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 px-3 py-1.5 rounded-xl text-xs font-semibold animate-fade-in">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        Saved & published live to all devices!
                      </div>
                    )}
                    {errorMessage && (
                      <div className="inline-flex items-center gap-2 bg-rose-500/20 border border-rose-500/40 text-rose-300 px-3 py-1.5 rounded-xl text-xs font-semibold animate-fade-in">
                        <AlertCircle className="w-4 h-4 text-rose-400" />
                        {errorMessage}
                      </div>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSaving}
                    className={`px-6 py-3 font-bold rounded-xl text-xs transition shadow-lg flex items-center justify-center gap-2 ${
                      isSaving
                        ? "bg-blue-700 text-blue-200 cursor-not-allowed opacity-80"
                        : "bg-blue-600 hover:bg-blue-500 text-white shadow-blue-600/30 active:scale-[0.98]"
                    }`}
                  >
                    {isSaving ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Saving & Publishing to Live Website...
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4" />
                        Save & Publish to Live Website
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
