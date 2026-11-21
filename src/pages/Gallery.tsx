import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCMS } from "../context/CMSContext";
import {
  Image,
  Video,
  Layers,
  Sparkles,
  ArrowRight,
  Sliders,
  CheckCircle2,
  Users,
  Play
} from "lucide-react";

interface GalleryItem {
  id: string;
  category: string;
  title: string;
  location: string;
  image: string;
  tags: string[];
}

const GALLERY_DATA: GalleryItem[] = [
  {
    id: "g-1",
    category: "Commercial",
    title: "Executive Corporate Command Center & Video Wall",
    location: "Gurugram, Haryana",
    image: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=800&h=600&fit=crop&auto=format",
    tags: ["Command Center", "CCTV", "Video Wall"]
  },
  {
    id: "g-2",
    category: "Commercial",
    title: "Touchless Face Recognition Turnstiles",
    location: "Ahmedabad, Gujarat",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop&auto=format",
    tags: ["Access Control", "Speed Gates"]
  },
  {
    id: "g-3",
    category: "Industrial",
    title: "45-Acre Heavy Industrial Perimeter Surveillance",
    location: "Sanand, Gujarat",
    image: "https://images.unsplash.com/photo-1565793079479-ef2f800fd2b5?w=800&h=600&fit=crop&auto=format",
    tags: ["Industrial", "Thermal CCTV"]
  },
  {
    id: "g-4",
    category: "Industrial",
    title: "Automated Weighbridge Boom Barrier & ANPR",
    location: "Pune, Maharashtra",
    image: "https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=800&h=600&fit=crop&auto=format",
    tags: ["Boom Barrier", "ANPR"]
  },
  {
    id: "g-5",
    category: "Education",
    title: "Interactive Smart Classroom & Digital Podium",
    location: "Bengaluru, Karnataka",
    image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&h=600&fit=crop&auto=format",
    tags: ["Smart Classroom", "Interactive Panel"]
  },
  {
    id: "g-6",
    category: "Healthcare",
    title: "Sterile Operation Theatre Biometric Access",
    location: "South Mumbai",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&h=600&fit=crop&auto=format",
    tags: ["Healthcare", "Clean Room"]
  },
  {
    id: "g-7",
    category: "Retail",
    title: "Retail POS Synchronized CCTV & Heat Mapping",
    location: "Delhi NCR",
    image: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=800&h=600&fit=crop&auto=format",
    tags: ["Retail", "AI Analytics"]
  },
  {
    id: "g-8",
    category: "Warehousing",
    title: "High-Bay High-Density Wi-Fi & Beam Fire Safety",
    location: "Bhiwandi, Maharashtra",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&h=600&fit=crop&auto=format",
    tags: ["Warehouse", "Wi-Fi 6"]
  },
  {
    id: "g-9",
    category: "Residential",
    title: "Luxury Smart Villa Lighting & Video Intercom",
    location: "Vadodara, Gujarat",
    image: "https://images.unsplash.com/photo-1558618047-3c8c9bb6cf44?w=800&h=600&fit=crop&auto=format",
    tags: ["Home Automation", "Video Intercom"]
  },
  {
    id: "g-10",
    category: "Installation Stages",
    title: "Certified Fiber Optic Splicing & OTDR Testing",
    location: "On-Site Deployment",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=600&fit=crop&auto=format",
    tags: ["Cabling", "Fluke Certified"]
  }
];

export default function Gallery() {
  const { heroConfigs } = useCMS();
  const hero = heroConfigs["gallery"];

  const [activeCat, setActiveCat] = useState("All");
  const [sliderPos, setSliderPos] = useState(50);
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

  const categories = [
    "All",
    "Commercial",
    "Industrial",
    "Residential",
    "Education",
    "Healthcare",
    "Retail",
    "Warehousing",
    "Installation Stages"
  ];

  const filteredItems = GALLERY_DATA.filter(
    (item) => activeCat === "All" || item.category === activeCat
  );

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Hero Banner */}
      {hero?.showSection && (
        <section className="relative py-20 bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 text-white overflow-hidden">
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:24px_24px]"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold tracking-wide uppercase mb-6">
                <Image className="w-3.5 h-3.5" />
                Real Project Installations
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6 leading-tight">
                {hero.heading}
              </h1>
              <p className="text-lg text-slate-300 mb-8 leading-relaxed">
                {hero.subtitle}
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="#gallery-grid"
                  className="px-6 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition shadow-lg shadow-blue-600/30 flex items-center gap-2"
                >
                  View Installation Photos
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="#before-after"
                  className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white font-medium rounded-xl transition backdrop-blur-sm border border-white/10"
                >
                  Before & After Transformations
                </a>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Interactive Before & After Showcase */}
      <section id="before-after" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wider mb-3">
            <Sliders className="w-3.5 h-3.5" /> Infrastructure Transformation
          </div>
          <h2 className="text-3xl font-bold text-slate-900 mb-3">
            Before & After Showcase
          </h2>
          <p className="text-slate-600 text-sm">
            Drag the slider to experience the transformation from legacy cabling and outdated security to modern, certified enterprise infrastructure.
          </p>
        </div>

        <div className="max-w-4xl mx-auto bg-white p-4 sm:p-6 rounded-3xl border border-slate-200 shadow-xl">
          <div className="relative h-72 sm:h-96 rounded-2xl overflow-hidden select-none">
            {/* After Image (Full width background) */}
            <img
              src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&h=800&fit=crop&auto=format"
              alt="After - Structured Rack & AI Surveillance"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute top-4 right-4 bg-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md z-10">
              AFTER: VRAT Engineered
            </div>

            {/* Before Image (Clipped by slider width) */}
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${sliderPos}%` }}
            >
              <img
                src="https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=1200&h=800&fit=crop&auto=format"
                alt="Before - Legacy Infrastructure"
                className="absolute inset-0 w-full h-full object-cover"
                style={{ width: "100%", maxWidth: "none" }}
              />
              <div className="absolute top-4 left-4 bg-slate-900 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md z-10">
                BEFORE: Legacy Point-to-Point
              </div>
            </div>

            {/* Slider Divider Line */}
            <div
              className="absolute top-0 bottom-0 w-1 bg-white shadow-2xl z-20 cursor-ew-resize flex items-center justify-center"
              style={{ left: `${sliderPos}%` }}
            >
              <div className="w-8 h-8 rounded-full bg-blue-600 border-2 border-white shadow-lg flex items-center justify-center text-white text-xs font-bold">
                ⮂
              </div>
            </div>
          </div>

          <div className="mt-4 flex items-center gap-4">
            <span className="text-xs font-bold text-slate-500">Legacy System</span>
            <input
              type="range"
              min="0"
              max="100"
              value={sliderPos}
              onChange={(e) => setSliderPos(Number(e.target.value))}
              className="w-full accent-blue-600 cursor-pointer"
            />
            <span className="text-xs font-bold text-blue-600">VRAT Modernization</span>
          </div>
        </div>
      </section>

      {/* Gallery Grid Section */}
      <section id="gallery-grid" className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-thin">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setActiveCat(c)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
                activeCat === c
                  ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                  : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Image Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedImage(item)}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 group cursor-pointer"
            >
              <div className="relative h-60 bg-slate-100 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <span className="text-white text-xs font-semibold flex items-center gap-1">
                    Click to enlarge <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded-md bg-slate-900/80 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-wider">
                    {item.category}
                  </span>
                </div>
              </div>

              <div className="p-5">
                <div className="text-[11px] font-medium text-slate-500 mb-1">
                  📍 {item.location}
                </div>
                <h3 className="font-bold text-slate-900 text-sm mb-3 line-clamp-1 group-hover:text-blue-600 transition-colors">
                  {item.title}
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {item.tags.map((t, i) => (
                    <span key={i} className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 text-[10px] font-medium">
                      #{t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Engineering Team on Site */}
      <section className="py-16 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-10">
            <div className="inline-flex items-center gap-2 text-blue-600 font-bold text-xs uppercase tracking-wider mb-2">
              <Users className="w-4 h-4" /> Certified Field Engineers
            </div>
            <h2 className="text-3xl font-bold text-slate-900 mb-3">
              Behind Every Successful Deployment
            </h2>
            <p className="text-slate-600 text-sm">
              Our 40+ certified professionals bring rigor, precision, and OEM compliance to every project across India.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-6">
            <div className="bg-slate-50 rounded-2xl overflow-hidden border border-slate-200">
              <img src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=400&fit=crop&auto=format" alt="Engineers" className="w-full h-48 object-cover" />
              <div className="p-5">
                <h4 className="font-bold text-slate-900 text-sm mb-1">Site Survey & Feasibility</h4>
                <p className="text-slate-500 text-xs">Laser distance measurement, RF Wi-Fi mapping, and electrical layout audits.</p>
              </div>
            </div>
            <div className="bg-slate-50 rounded-2xl overflow-hidden border border-slate-200">
              <img src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&h=400&fit=crop&auto=format" alt="Installation" className="w-full h-48 object-cover" />
              <div className="p-5">
                <h4 className="font-bold text-slate-900 text-sm mb-1">Clean Cable Dressing</h4>
                <p className="text-slate-500 text-xs">Structured rack organization, color-coded patch cords, and permanent labeling.</p>
              </div>
            </div>
            <div className="bg-slate-50 rounded-2xl overflow-hidden border border-slate-200">
              <img src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=400&fit=crop&auto=format" alt="Testing" className="w-full h-48 object-cover" />
              <div className="p-5">
                <h4 className="font-bold text-slate-900 text-sm mb-1">UAT & Commissioning</h4>
                <p className="text-slate-500 text-xs">End-to-end load testing, camera focus calibration, and administrator handover.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modal View */}
      {selectedImage && (
        <div
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl max-w-4xl w-full overflow-hidden shadow-2xl animate-fade-in border border-slate-200"
          >
            <div className="relative max-h-[70vh] bg-slate-950 flex items-center justify-center">
              <img src={selectedImage.image} alt={selectedImage.title} className="max-h-[70vh] w-auto object-contain" />
            </div>
            <div className="p-6 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-blue-600 uppercase">{selectedImage.category} • {selectedImage.location}</span>
                <h3 className="text-lg font-bold text-slate-900">{selectedImage.title}</h3>
              </div>
              <button
                onClick={() => setSelectedImage(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-xs"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
