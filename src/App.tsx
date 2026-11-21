import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { CMSProvider } from "./context/CMSContext";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Public Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import ServiceDetail from "./pages/ServiceDetail";
import Solutions from "./pages/Solutions";
import Products from "./pages/Products";
import Projects from "./pages/Projects";
import Gallery from "./pages/Gallery";
import Downloads from "./pages/Downloads";
import Blog from "./pages/Blog";
import Careers from "./pages/Careers";
import FAQ from "./pages/FAQ";
import Support from "./pages/Support";
import Contact from "./pages/Contact";

// Admin Panel Pages
import AdminLayout from "./admin/AdminLayout";
import AdminLogin from "./admin/AdminLogin";
import AdminDashboard from "./admin/AdminDashboard";
import AdminPagesBuilder from "./admin/AdminPagesBuilder";
import AdminServices from "./admin/AdminServices";
import AdminProducts from "./admin/AdminProducts";
import AdminSolutions from "./admin/AdminSolutions";
import AdminProjects from "./admin/AdminProjects";
import AdminBlog from "./admin/AdminBlog";
import AdminFAQs from "./admin/AdminFAQs";
import AdminTestimonials from "./admin/AdminTestimonials";
import AdminPartners from "./admin/AdminPartners";
import AdminDownloads from "./admin/AdminDownloads";
import AdminLeads from "./admin/AdminLeads";
import AdminCareers from "./admin/AdminCareers";
import AdminMedia from "./admin/AdminMedia";
import AdminSettings from "./admin/AdminSettings";
import AdminSEO from "./admin/AdminSEO";
import AdminUsers from "./admin/AdminUsers";
import AdminLogs from "./admin/AdminLogs";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);
  return null;
}

// Protected Route Guard for Admin Panel
function ProtectedAdminRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }
  return <>{children}</>;
}

function PublicLayout() {
  const { pathname } = useLocation();
  const isHome = pathname === "/";

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />
      <main className={`flex-1 ${isHome ? "" : "pt-18"}`}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:slug" element={<ServiceDetail />} />
          <Route path="/solutions" element={<Solutions />} />
          <Route path="/solutions/:slug" element={<Solutions />} />
          <Route path="/industries" element={<Solutions />} />
          <Route path="/products" element={<Products />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/downloads" element={<Downloads />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/support" element={<Support />} />
          <Route
            path="*"
            element={
              <div className="min-h-[70vh] flex items-center justify-center bg-slate-50 p-4">
                <div className="text-center max-w-md bg-white p-8 rounded-3xl border border-slate-200 shadow-xl">
                  <div className="text-5xl mb-4">🔍</div>
                  <h1 className="text-2xl font-bold text-slate-900 mb-2">Page Not Found</h1>
                  <p className="text-slate-600 text-xs mb-6">The page you requested does not exist or has moved.</p>
                  <a href="/" className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition">
                    Return to Homepage
                  </a>
                </div>
              </div>
            }
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <CMSProvider>
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            {/* Admin Login */}
            <Route path="/admin/login" element={<AdminLogin />} />

            {/* Protected Admin Routes */}
            <Route
              path="/admin"
              element={
                <ProtectedAdminRoute>
                  <AdminLayout />
                </ProtectedAdminRoute>
              }
            >
              <Route index element={<AdminDashboard />} />
              <Route path="pages" element={<AdminPagesBuilder />} />
              <Route path="services" element={<AdminServices />} />
              <Route path="products" element={<AdminProducts />} />
              <Route path="solutions" element={<AdminSolutions />} />
              <Route path="projects" element={<AdminProjects />} />
              <Route path="blog" element={<AdminBlog />} />
              <Route path="faqs" element={<AdminFAQs />} />
              <Route path="testimonials" element={<AdminTestimonials />} />
              <Route path="partners" element={<AdminPartners />} />
              <Route path="downloads" element={<AdminDownloads />} />
              <Route path="leads" element={<AdminLeads />} />
              <Route path="careers" element={<AdminCareers />} />
              <Route path="media" element={<AdminMedia />} />
              <Route path="settings" element={<AdminSettings />} />
              <Route path="seo" element={<AdminSEO />} />
              <Route path="users" element={<AdminUsers />} />
              <Route path="logs" element={<AdminLogs />} />
            </Route>

            {/* Public Layout */}
            <Route path="/*" element={<PublicLayout />} />
          </Routes>
        </BrowserRouter>
      </CMSProvider>
    </AuthProvider>
  );
}
