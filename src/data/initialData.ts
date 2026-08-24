import {
  ServiceItem,
  ProductItem,
  IndustrySolution,
  CaseStudy,
  BlogPost,
  FAQItem,
  DownloadItem,
  JobOpening,
  LeadItem,
  TestimonialItem,
  PartnerBrand,
  MediaItem,
  PageHeroConfig,
  SEOMetadata,
  GlobalSettings,
  AdminUser,
} from "../types";

export const INITIAL_SETTINGS: GlobalSettings = {
  companyName: "VRAT System Integrators",
  tagline: "Building Smarter, Safer & More Secure Environments",
  primaryEmail: "info@vratsystem.com",
  salesEmail: "sales@vratsystem.com",
  supportEmail: "support@vratsystem.com",
  careersEmail: "careers@vratsystem.com",
  phone: "+91 98250 12345",
  emergencyHotline: "+91 98250 99999",
  whatsappNumber: "+91 98250 12345",
  address: "402-405, Apex Business Park, SG Highway",
  cityStateZip: "Ahmedabad, Gujarat 380054, India",
  businessHours: "Monday – Saturday: 09:30 AM – 06:30 PM (Sunday Closed)",
  googleMapsUrl: "https://maps.google.com/?q=Ahmedabad+Gujarat",
  socialLinks: {
    linkedin: "https://linkedin.com/company/vratsystem",
    facebook: "https://facebook.com/vratsystem",
    instagram: "https://instagram.com/vratsystem",
    youtube: "https://youtube.com/@vratsystem",
    twitter: "https://x.com/vratsystem",
  },
  maintenanceMode: false,
};

export const INITIAL_SERVICES: ServiceItem[] = [
  {
    id: "cctv",
    slug: "cctv-surveillance",
    title: "CCTV Surveillance Systems",
    shortDesc: "Protect your premises with intelligent surveillance solutions featuring HD cameras, IP cameras, AI analytics, PTZ cameras, ANPR, and centralized monitoring.",
    overview: "Monitor your premises 24×7 with advanced surveillance solutions featuring AI-enabled cameras, centralized monitoring, remote access, and intelligent video analytics.",
    icon: "Camera",
    image: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=800&h=500&fit=crop&auto=format",
    features: [
      "HD CCTV Cameras", "IP Cameras", "PTZ Cameras", "Dome Cameras",
      "Bullet Cameras", "ANPR Cameras", "Thermal Cameras",
      "AI Analytics", "Video Management Software", "Central Monitoring"
    ],
    benefits: [
      "Crime Prevention & Theft Deterrence",
      "Real-Time 24×7 Multi-Camera Monitoring",
      "Remote Mobile & Web Viewing Anywhere",
      "High-Resolution Evidence Recording",
      "AI Detection (Line Crossing, Intrusion, PPE, Faces)"
    ],
    applications: [
      "Commercial Buildings", "Manufacturing Plants", "Warehouses & Logistics",
      "Schools & Universities", "Hospitals", "Retail Stores", "Smart Cities", "Residential Projects"
    ],
    solutionTypes: [
      { title: "Analog HD CCTV", desc: "Cost-effective, reliable HD video recording for small offices, shops, and homes." },
      { title: "IP CCTV Systems", desc: "High-resolution PoE network cameras with smart recording and centralized enterprise VMS." },
      { title: "PTZ & Speed Domes", desc: "Motorized 360° pan-tilt-zoom cameras with optical zoom for large perimeter coverage." },
      { title: "Thermal & Night Vision", desc: "Zero-light heat signature detection for critical infrastructure and fire hotspot scanning." },
      { title: "ANPR Cameras", desc: "Automatic number plate recognition with whitelist/blacklist automatic gate triggers." }
    ],
    status: "Published",
    order: 1
  },
  {
    id: "fire-alarm",
    slug: "fire-alarm-systems",
    title: "Fire Alarm Systems",
    shortDesc: "Early detection and rapid response through advanced fire detection and alarm systems designed to comply with safety regulations.",
    overview: "Protect lives and assets through intelligent fire detection systems that provide early warnings, addressable sensor telemetry, and fast emergency response.",
    icon: "Flame",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&h=500&fit=crop&auto=format",
    features: [
      "Addressable Fire Alarm Panels", "Conventional Fire Alarm Systems",
      "Photoelectric Smoke Detectors", "Rate-of-Rise Heat Detectors",
      "Manual Call Points", "Electronic Sounders & Hooters",
      "Voice Evacuation Integration", "Beam Detectors for High Ceilings"
    ],
    benefits: [
      "Early Fire & Smoke Detection",
      "National Building Code (NBC) & IS Compliance",
      "Faster Emergency Evacuation & Audio Dispatch",
      "Direct Integration with Access Control & HVAC Dampers"
    ],
    applications: [
      "Corporate Offices", "Industrial Plants", "Hospitals & ICUs",
      "Schools & Hostels", "Shopping Malls", "Hotels", "Warehouses"
    ],
    solutionTypes: [
      { title: "Conventional Systems", desc: "Zone-based alert system ideal for small-to-medium offices and retail outlets." },
      { title: "Addressable Fire Systems", desc: "Pinpoint device-level detector reporting with real-time location mapping." },
      { title: "Wireless Fire Systems", desc: "Rapid non-invasive deployment for heritage properties and operational sites." }
    ],
    status: "Published",
    order: 2
  },
  {
    id: "access-control",
    slug: "access-control-systems",
    title: "Access Control Systems",
    shortDesc: "Secure entry management using biometric authentication, RFID cards, facial recognition, and centralized user administration.",
    overview: "Control who enters your premises, when they enter, and where they can go with flexible, auditable enterprise access control platforms.",
    icon: "Lock",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=500&fit=crop&auto=format",
    features: [
      "Biometric Terminals", "AI Facial Recognition", "RFID Card Readers",
      "Mobile NFC / Bluetooth Access", "Smart Multi-Door Controllers",
      "Electromagnetic & Bolt Locks", "Tripod & Flap Turnstiles", "Visitor Management System"
    ],
    benefits: [
      "Zero Unauthorized Access to Sensitive Zones",
      "Complete Real-Time Audit Trails & Logs",
      "Elimination of Physical Key Management",
      "Seamless Integration with CCTV & Fire Safety Emergency Unlocking"
    ],
    applications: [
      "Corporate Offices", "Data Centers & Server Rooms", "Laboratories",
      "Pharmaceutical Units", "Factories", "Gated Communities", "Government Facilities"
    ],
    solutionTypes: [
      { title: "Biometric & Face Access", desc: "Touchless AI-powered authentication with mask and anti-spoofing detection." },
      { title: "RFID Smart Card Entry", desc: "High-speed encrypted smart card and keyfob credentials for large workforces." },
      { title: "Mobile & QR Entry", desc: "Temporary dynamic QR code passes for contractors and visiting guests." }
    ],
    status: "Published",
    order: 3
  },
  {
    id: "time-attendance",
    slug: "time-attendance-management",
    title: "Time Attendance Systems",
    shortDesc: "Automate employee attendance tracking with biometric and cloud-based attendance solutions integrated with HR systems.",
    overview: "Streamline payroll, eliminate buddy punching, and monitor multi-shift schedules with automated biometric and mobile geo-fenced attendance platforms.",
    icon: "Clock",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=500&fit=crop&auto=format",
    features: [
      "High-Speed Fingerprint Matching", "Contactless Face Recognition",
      "Cloud-Based Central Dashboard", "Mobile GPS Geo-Fencing Check-in",
      "Multi-Shift & Overtime Automation", "Offline Data Storage & Sync",
      "Direct HRMS & Payroll Software API"
    ],
    benefits: [
      "100% Accurate Attendance Records",
      "Elimination of Time Theft & Proxy Check-ins",
      "Automated Leave & Overtime Calculations",
      "One Dashboard for Multiple Branches & Field Staff"
    ],
    applications: [
      "Corporate Offices", "Manufacturing Facilities", "Retail Chains",
      "Hospitals & Clinics", "Educational Campuses", "Logistics Hubs"
    ],
    status: "Published",
    order: 4
  },
  {
    id: "public-address",
    slug: "public-address-system",
    title: "Public Address & Voice Evacuation",
    shortDesc: "Deliver clear announcements and emergency notifications across educational institutions, hospitals, industries, and commercial spaces.",
    overview: "Professional audio communication and certified Voice Evacuation Systems (VES) ensuring crystal-clear announcements and prioritized emergency broadcasts.",
    icon: "Megaphone",
    image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=800&h=500&fit=crop&auto=format",
    features: [
      "Multi-Zone Paging Controllers", "IP-Based Network Audio",
      "Automated Voice Evacuation (VES)", "Scheduled Bell & Shift Chimes",
      "Ceiling, Wall, & Horn Speakers", "Priority Emergency Override",
      "Background Music System (BGM)"
    ],
    benefits: [
      "Crystal Clear Audio Over Long Distances",
      "Targeted Zone-Specific Messaging",
      "Instant Emergency Evacuation Override",
      "Centralized Multi-Building Audio Management"
    ],
    applications: [
      "Schools & Universities", "Hospitals", "Industrial Complexes",
      "Airports & Metro Stations", "Shopping Malls", "Hotels"
    ],
    status: "Published",
    order: 5
  },
  {
    id: "video-door-phone",
    slug: "video-door-phone-systems",
    title: "Video Door Phone Systems",
    shortDesc: "Enhance visitor management with high-definition audio and video communication for homes, apartments, and offices.",
    overview: "See, speak, and verify visitors before unlocking doors remotely through high-resolution video door stations and mobile app connectivity.",
    icon: "PhoneCall",
    image: "https://images.unsplash.com/photo-1558002038-1055907df827?w=800&h=500&fit=crop&auto=format",
    features: [
      "Full HD Camera Door Stations", "Indoor Touchscreen Monitors",
      "Two-Way Crystal Audio", "Remote Mobile Unlocking",
      "Infrared Night Vision", "Visitor Snapshot & Video Recording",
      "Multi-Apartment Intercom Protocol"
    ],
    benefits: [
      "Visual Confirmation Before Access",
      "Remote Door Control from Anywhere in the World",
      "Enhanced Family and Staff Safety",
      "Recorded History of All Doorbell Rings"
    ],
    applications: [
      "Luxury Villas & Bungalows", "Apartment Complexes", "Corporate Reception Desks",
      "Executive Suites", "Commercial Entrances"
    ],
    status: "Published",
    order: 6
  },
  {
    id: "boom-barrier",
    slug: "boom-barrier-parking-management",
    title: "Boom Barrier & Parking Management",
    shortDesc: "Automate vehicle entry and exit using intelligent boom barrier systems suitable for parking lots, industrial facilities, and residential communities.",
    overview: "High-performance motorized barriers integrated with RFID tags, ANPR cameras, and smart parking software for frictionless vehicle flow.",
    icon: "ShieldCheck",
    image: "https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=800&h=500&fit=crop&auto=format",
    features: [
      "High-Speed Automatic Boom Barriers", "Long-Range RFID Vehicle Tags",
      "ANPR License Plate Recognition", "Safety Infrared Sensors & Loops",
      "LED Illuminated Barrier Arms", "Parking Guidance & Space Counters",
      "Cashless / QR Parking Ticketing"
    ],
    benefits: [
      "Frictionless Automated Vehicle Access",
      "Elimination of Entry Congestion & Long Queues",
      "Strict Enforcement of Blacklists & Whitelists",
      "Accurate Parking Revenue and Occupancy Tracking"
    ],
    applications: [
      "Gated Communities & Townships", "Corporate Parks", "Logistics Warehouses",
      "Shopping Malls", "Toll Plazas", "Hospitals & Airports"
    ],
    status: "Published",
    order: 7
  },
  {
    id: "networking",
    slug: "networking-solutions",
    title: "Structured Cabling & Networking",
    shortDesc: "Structured cabling, LAN, Wi-Fi, fiber optics, server racks, switches, and enterprise-grade network infrastructure.",
    overview: "High-bandwidth, redundant networking backbones designed to support high-definition video, cloud systems, VoIP, and mission-critical enterprise applications.",
    icon: "Network",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=500&fit=crop&auto=format",
    features: [
      "Cat6 / Cat6A / Cat7 Structured Cabling", "Single & Multi-Mode Fiber Optics (OFC)",
      "Enterprise Managed Switches & PoE+", "High-Density Wi-Fi 6/7 Access Points",
      "Next-Gen Firewalls & VPN Gateways", "Server Rack Dressing & Cable Trays",
      "OTDR Cable Testing & Fluke Certification"
    ],
    benefits: [
      "High-Speed Gigabit Data Transmission",
      "Zero-Downtime Redundant Network Topology",
      "Structured, Neatly Labeled & Certified Racks",
      "Rock-Solid Foundation for All Security & IoT Devices"
    ],
    applications: [
      "Corporate Headquarters", "Data Centers", "Manufacturing Units",
      "Educational Campuses", "Hospitality Resorts", "Healthcare Facilities"
    ],
    status: "Published",
    order: 8
  },
  {
    id: "automation",
    slug: "home-building-automation",
    title: "Home & Building Automation",
    shortDesc: "Create intelligent spaces with integrated lighting, climate control, security, and energy management systems.",
    overview: "Transform commercial properties and luxury residences into smart connected ecosystems with centralized touch, mobile, and voice automation.",
    icon: "Cpu",
    image: "https://images.unsplash.com/photo-1558618047-3c8c9bb6cf44?w=800&h=500&fit=crop&auto=format",
    features: [
      "Smart Lighting & Dimming Scenes", "Smart HVAC & Climate Scheduling",
      "Motorized Curtain & Blind Controls", "Smart Door Locks & Keyless Entry",
      "Real-Time Energy Consumption Analytics", "Voice Assistant Integration (Alexa/Google/Siri)",
      "Building Management System (BMS) Integration"
    ],
    benefits: [
      "Up to 30% Energy Consumption Reduction",
      "One-Touch Scenario Controls (Away, Morning, Night)",
      "Unified Control of HVAC, Lighting, and Security",
      "Elevated Lifestyle and High Property Valuation"
    ],
    applications: [
      "Smart Villas & Luxury Homes", "Corporate Boardrooms", "Hotels & Resorts",
      "Commercial IT Towers", "Modern Healthcare Wards"
    ],
    status: "Published",
    order: 9
  }
];

export const INITIAL_SOLUTIONS: IndustrySolution[] = [
  {
    id: "commercial",
    slug: "commercial",
    title: "Commercial & Corporate Buildings",
    subtitle: "Enterprise Security & Smart Office Building Solutions",
    desc: "From corporate towers and IT business parks to co-working spaces and shopping complexes, we deliver end-to-end integrated technology infrastructure.",
    icon: "Building2",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=500&fit=crop&auto=format",
    heroImage: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1400&h=600&fit=crop&auto=format",
    challenges: [
      "Managing high daily visitor footfall and delivery personnel securely",
      "Multi-tenant access management and restricted server room security",
      "Network downtime affecting hundreds of employees and cloud workflows",
      "Energy wastage from unoccupied meeting rooms and after-hours lighting"
    ],
    solutionsProvided: [
      "AI CCTV with heat mapping and visitor tracking across lobbies and corridors",
      "Touchless facial recognition access control and speed gates for turnstiles",
      "Digital visitor management with instant host smartphone notifications",
      "Smart meeting room automation with occupancy-based lighting and climate control",
      "Enterprise structured cabling with 10G fiber backbone and seamless Wi-Fi"
    ],
    keyFeatures: [
      { title: "Smart Office Integration", desc: "Centralized dashboard connecting access control, meeting rooms, and HVAC." },
      { title: "Visitor ID Pass Printing", desc: "Instant badge generation with predefined area permissions and check-out tracking." },
      { title: "Energy Optimization", desc: "Smart sensors reducing electricity consumption in common zones by up to 28%." }
    ],
    architectureSteps: [
      "CCTV Surveillance ── Access Control ── Visitor Management",
      "Fire Alarm ── Voice Evacuation ── Public Address",
      "Boom Barrier ── Parking Guidance System",
      "Structured Cabling ── Unified BMS Software"
    ],
    successMetrics: [
      "70% reduction in visitor registration check-in time",
      "99.99% network uptime across corporate enterprise LAN",
      "Zero security incidents across server rooms and executive floors"
    ],
    testimonial: {
      quote: "VRAT delivered a state-of-the-art security and networking setup for our 5-floor corporate headquarters. The centralized platform simplified operations immensely.",
      client: "Facility Director",
      role: "Global FinTech Corporation"
    },
    caseStudyRef: "case-01",
    status: "Published"
  },
  {
    id: "industrial",
    slug: "industrial",
    title: "Industrial & Manufacturing Plants",
    subtitle: "Smart Factory Infrastructure for Safety, Security & Productivity",
    desc: "Robust technology solutions engineered to withstand demanding factory environments while ensuring continuous production, safety compliance, and asset protection.",
    icon: "Factory",
    image: "https://images.unsplash.com/photo-1565793079479-ef2f800fd2b5?w=800&h=500&fit=crop&auto=format",
    heroImage: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1400&h=600&fit=crop&auto=format",
    challenges: [
      "Theft and unauthorized access in raw material yards and finished goods storage",
      "Worker safety hazards and mandatory PPE / helmet compliance verification",
      "Tracking large contractor workforces across rotating day and night shifts",
      "Harsh environments with heavy dust, vibrations, and high temperatures"
    ],
    solutionsProvided: [
      "Explosion-proof and IP67 AI cameras monitoring perimeter and production bays",
      "AI video analytics automatically detecting missing helmets, vests, and line crossings",
      "Long-range RFID boom barriers managing raw material truck entry and weighing scales",
      "Industrial Ethernet, optical fiber backbone, and SCADA network integration",
      "Public address and emergency siren systems across large factory zones"
    ],
    keyFeatures: [
      { title: "Worker Safety Analytics", desc: "Proactive AI alerts when workers enter hazard zones without required gear." },
      { title: "Contractor Attendance", desc: "Biometric and RFID terminals syncing directly with factory ERP and payroll." },
      { title: "Central Control Room", desc: "Unified multi-screen video wall monitoring 18+ separate factory blocks." }
    ],
    architectureSteps: [
      "Perimeter Thermal CCTV ── Industrial Access Control ── Biometric Attendance",
      "Addressable Fire Alarms ── Hazardous Gas Detectors ── PA Emergency Sirens",
      "Heavy-Duty Boom Barrier ── Weighbridge ANPR Integration",
      "Industrial Fiber Network ── Central Control Room Video Wall"
    ],
    successMetrics: [
      "45% reduction in production floor safety violations within 60 days",
      "100% accurate contractor attendance and automated overtime tracking",
      "Zero perimeter breaches across 45-acre manufacturing campus"
    ],
    testimonial: {
      quote: "The AI surveillance and centralized monitoring solution gave our plant management unprecedented visibility and drastically reduced downtime.",
      client: "Plant Head",
      role: "Automotive Component Manufacturer"
    },
    caseStudyRef: "case-02",
    status: "Published"
  },
  {
    id: "residential",
    slug: "residential",
    title: "Residential Communities & Smart Villas",
    subtitle: "Connected Living and Complete Peace of Mind for Families",
    desc: "Integrated smart home automation and community security systems tailored for luxury villas, apartments, gated societies, and modern townships.",
    icon: "Home",
    image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&h=500&fit=crop&auto=format",
    challenges: [
      "Unverified visitors and delivery agents entering residential blocks",
      "Managing gate congestion during peak morning and evening hours",
      "High electricity consumption from unmonitored air conditioning and lighting",
      "Need for seamless mobile control of home security while traveling"
    ],
    solutionsProvided: [
      "Smart video door phones with smartphone app calling and remote unlock",
      "Biometric smart door locks with fingerprint, PIN, and digital access keys",
      "High-speed RFID boom barriers for instant resident vehicle access",
      "Whole-home lighting and climate automation with personalized scenes",
      "Perimeter CCTV surveillance with night vision for community boundaries"
    ],
    keyFeatures: [
      { title: "One Mobile App", desc: "Control lights, curtains, door locks, and CCTV from a unified interface." },
      { title: "Resident RFID Tags", desc: "Automatic boom barrier opening for registered society resident vehicles." },
      { title: "Smart Energy Modes", desc: "Automated Away and Vacation modes turning off all unnecessary loads." }
    ],
    architectureSteps: [
      "Smart Villa CCTV ── Video Door Phone ── Smart Locks",
      "Home Automation Hub ── Lighting & HVAC Controllers",
      "Gate Boom Barrier ── Society Visitor Management App",
      "High-Speed Mesh Wi-Fi ── Cloud Security Platform"
    ],
    successMetrics: [
      "Zero unauthorized entry across 200+ residential villa community",
      "25% average savings on monthly residential energy bills",
      "99% resident satisfaction with remote mobile intercom verification"
    ],
    status: "Published"
  },
  {
    id: "education",
    slug: "education",
    title: "Educational Campuses & Smart Schools",
    subtitle: "Empowering Next-Generation Digital Learning & Campus Safety",
    desc: "Comprehensive safety, smart classroom technology, and networking infrastructure for schools, colleges, universities, and coaching institutes.",
    icon: "GraduationCap",
    image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&h=500&fit=crop&auto=format",
    challenges: [
      "Protecting students across vast campus grounds, playgrounds, and hostels",
      "Time-consuming manual student and staff roll calls",
      "Poor Wi-Fi connectivity in smart classrooms and computer labs",
      "Urgent emergency communication requirements during campus alerts"
    ],
    solutionsProvided: [
      "High-definition CCTV coverage across entry gates, corridors, and labs",
      "Contactless facial recognition attendance terminals for faculty and students",
      "Interactive flat panels (IFP), digital podiums, and smart classroom audio",
      "Zone-based IP public address system with automated period bells",
      "High-capacity campus Wi-Fi supporting thousands of concurrent student devices"
    ],
    keyFeatures: [
      { title: "Automated School Bell", desc: "Configurable schedules for periods, assemblies, and exams with emergency override." },
      { title: "Interactive Displays", desc: "4K multi-touch flat panels and digital lecture capture for hybrid learning." },
      { title: "Hostel Access Control", desc: "Restricted entry permissions ensuring student safety around the clock." }
    ],
    architectureSteps: [
      "Campus CCTV ── AI Attendance Terminals ── Access Gates",
      "Interactive Classrooms ── Digital Podiums ── Learning Management System",
      "IP Public Address ── Automated Bell System ── Fire Safety",
      "Campus Fiber Backbone ── Enterprise Wi-Fi Network"
    ],
    successMetrics: [
      "95% reduction in time spent on daily attendance recording",
      "100% digital coverage across 35 smart classrooms and auditoriums",
      "Enhanced parent trust with verified student entry/exit logging"
    ],
    caseStudyRef: "case-03",
    status: "Published"
  },
  {
    id: "healthcare",
    slug: "healthcare",
    title: "Healthcare & Smart Hospitals",
    subtitle: "Mission-Critical Infrastructure for Patient Safety & Smooth Operations",
    desc: "Hospital-grade electronic security, nurse communication, restricted area access, and structured networking for hospitals, clinics, and medical colleges.",
    icon: "HeartPulse",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&h=500&fit=crop&auto=format",
    challenges: [
      "Restricting access to Operation Theatres, ICUs, NICUs, and Pharmacies",
      "Patient safety in emergency wards and sensitive critical care units",
      "Protecting expensive medical diagnostic equipment and medical records",
      "Coordinating emergency code announcements (Code Blue, Code Red)"
    ],
    solutionsProvided: [
      "Biometric and touchless card access control for surgical suites and pharmacies",
      "24×7 CCTV monitoring in emergency corridors, patient check-in, and parking",
      "Hospital-wide public address system for instant medical code broadcasts",
      "High-reliability networking supporting Electronic Medical Records (EMR) & PACS",
      "Addressable fire safety integrated with automatic emergency exit release"
    ],
    keyFeatures: [
      { title: "Sterile Room Access", desc: "Hands-free facial authentication preventing contamination in OT areas." },
      { title: "Emergency Code Paging", desc: "Instant prioritized broadcasts overriding background chimes across all wards." },
      { title: "Medical Device LAN", desc: "Isolated VLAN network architecture safeguarding sensitive telemetry." }
    ],
    architectureSteps: [
      "Hospital Surveillance ── OT & Pharmacy Access Control ── Visitor Passes",
      "Fire Alarm Panels ── Voice Evacuation ── Emergency Lighting",
      "HIS / EMR Network ── High-Speed Medical Fiber LAN",
      "Central Control Room ── 24×7 Technical Support Operations"
    ],
    successMetrics: [
      "Sub-second emergency response notification for cardiac and fire alarms",
      "Zero unauthorized access to pharmacy storage and blood banks",
      "100% compliance with healthcare regulatory safety standards"
    ],
    caseStudyRef: "case-04",
    status: "Published"
  },
  {
    id: "retail",
    slug: "retail",
    title: "Retail Stores & Shopping Malls",
    subtitle: "AI Video Analytics and Loss Prevention for Modern Retail",
    desc: "Smarter store security, heat mapping, queue management, and centralized multi-branch monitoring for retail chains, showrooms, and shopping malls.",
    icon: "ShoppingBag",
    image: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=800&h=500&fit=crop&auto=format",
    challenges: [
      "Shoplifting, shrinkage, and POS cash counter disputes",
      "Long checkout queues causing lost sales during peak weekend hours",
      "Lack of footfall insights and customer engagement heatmaps",
      "Managing consistent security standards across 40+ branch stores"
    ],
    solutionsProvided: [
      "AI CCTV cameras with POS counter overlay and cash drawer synchronization",
      "Automated people counting sensors and customer dwell-time heatmaps",
      "Smart queue management alerts notifying floor managers of checkout bottlenecks",
      "Centralized cloud monitoring platform viewing all stores on one dashboard",
      "Background music and in-store promotional public address announcement system"
    ],
    keyFeatures: [
      { title: "Customer Footfall Counting", desc: "Accurate hourly, daily, and weekly visitor flow analytics for marketing." },
      { title: "Queue Length Alerts", desc: "Instant manager alerts when checkout lines exceed 4 customers." },
      { title: "Multi-Store Cloud VMS", desc: "Stream and audit footage from 50+ stores simultaneously." }
    ],
    architectureSteps: [
      "AI CCTV Cameras ── People Counting Sensors ── Cash Counter Cams",
      "POS Integration ── Smart Queue Monitoring ── Store Alarm",
      "Retail In-Store Audio ── Promotional Public Address",
      "Central Cloud Dashboard ── Enterprise Retail Network"
    ],
    successMetrics: [
      "60% reduction in retail shrinkage and inventory loss",
      "35% decrease in customer checkout wait times with queue alerts",
      "Single-pane-of-glass management for 42 stores nationwide"
    ],
    caseStudyRef: "case-05",
    status: "Published"
  },
  {
    id: "warehouse-logistics",
    slug: "warehouse-logistics",
    title: "Warehouses & Logistics Centers",
    subtitle: "Intelligent Security for Faster, Safer & Smarter Supply Chains",
    desc: "End-to-end technology infrastructure protecting high-value inventory, streamlining loading bay vehicle movement, and automating warehouse operations.",
    icon: "Package",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&h=500&fit=crop&auto=format",
    challenges: [
      "Managing huge truck queues and dock turnaround times",
      "Perimeter breaches and blind spots across massive square-footage facilities",
      "Weak Wi-Fi signal causing barcode scanner delays and inventory sync failures",
      "Fire risks in pallet storage and high-value cargo rooms"
    ],
    solutionsProvided: [
      "Long-range ANPR cameras and RFID boom barriers automating dock dispatch",
      "High-mast 360° PTZ surveillance with thermal imaging for perimeter protection",
      "Industrial-grade enterprise Wi-Fi ensuring uninterrupted handheld scanner sync",
      "Aspirating and beam smoke detectors engineered for high-ceiling warehouses",
      "Access control on high-value cargo bays, server rooms, and dispatch offices"
    ],
    keyFeatures: [
      { title: "Automated Dock Management", desc: "Track truck entry, dock loading time, and exit history automatically." },
      { title: "High-Bay Wi-Fi 6", desc: "Zero dead spots for smart forklifts and handheld RF inventory scanners." },
      { title: "Beam Smoke Detection", desc: "Reliable early fire detection in 12-meter-high ceiling bays." }
    ],
    architectureSteps: [
      "Perimeter PTZ ── Loading Dock Cameras ── Storage Rack Cams",
      "ANPR Truck Gates ── Boom Barriers ── Visitor Gatehouse",
      "High-Density Industrial Wi-Fi ── WMS Handheld Barcode Network",
      "Beam Fire Detectors ── PA Shift Announcements ── Central Dashboard"
    ],
    successMetrics: [
      "40% faster truck turnaround time at loading and unloading bays",
      "100% wireless barcode coverage across 250,000 sq.ft facility",
      "Zero inventory theft incidents across audited distribution centers"
    ],
    caseStudyRef: "case-06",
    status: "Published"
  },
  {
    id: "smart-city",
    slug: "smart-city",
    title: "Smart Cities & Urban Infrastructure",
    subtitle: "Integrated Command Centers, AI Traffic & Public Safety",
    desc: "Scalable digital infrastructure for municipal corporations, urban development authorities, traffic police departments, and public utilities.",
    icon: "Landmark",
    image: "https://images.unsplash.com/photo-1569025743873-ea3a9ade89f9?w=800&h=500&fit=crop&auto=format",
    challenges: [
      "Heavy traffic congestion and red-light / speed violations across major junctions",
      "City-wide public safety monitoring and rapid emergency disaster dispatch",
      "Energy waste from traditional streetlights operating at full power all night",
      "Multiple disconnected civic departments lacking a common operational picture"
    ],
    solutionsProvided: [
      "Integrated Command & Control Center (ICCC) with unified video wall and GIS mapping",
      "AI traffic management with red-light violation, wrong-way, and speed detection",
      "Smart street lighting with automated dimming and remote energy metering",
      "Environmental IoT sensors tracking air quality, noise, and flood water levels",
      "City-wide optical fiber ring network with carrier-grade switching redundancy"
    ],
    keyFeatures: [
      { title: "ICCC Command Center", desc: "Unified multi-department platform integrating police, fire, traffic, and utilities." },
      { title: "Adaptive Traffic Signals", desc: "AI cameras dynamically adjusting green light durations based on vehicle queues." },
      { title: "Public Emergency Call Boxes", desc: "Instant two-way audio-video SOS connection to nearest response team." }
    ],
    architectureSteps: [
      "City-Wide AI CCTV ── Junction ANPR Cameras ── Radar Speed Sensors",
      "Smart Streetlights ── Air Quality IoT Sensors ── Public Wi-Fi",
      "City Fiber Optic Ring ── Redundant Core Network Racks",
      "Integrated Command & Control Center (ICCC) Video Wall & GIS"
    ],
    successMetrics: [
      "30% reduction in junction commute delays via adaptive traffic control",
      "42% electricity savings across 12,000 smart LED street lights",
      "Sub-2-minute emergency response coordination via centralized ICCC"
    ],
    status: "Published"
  }
];

export const INITIAL_PRODUCTS: ProductItem[] = [
  {
    id: "prod-1",
    name: "Hikvision 8MP Smart AI Bullet Camera",
    category: "CCTV Surveillance Systems",
    brand: "Hikvision",
    image: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=600&h=450&fit=crop&auto=format",
    tagline: "4K Ultra HD AI Surveillance with ColorVu 24/7 Color Night Vision",
    features: ["4K (3840×2160) Resolution", "ColorVu 24/7 Color Night Vision", "DeepinView AI Face & Vehicle Analytics", "IP67 Weatherproof & IK10 Vandal-Proof", "PoE (Power over Ethernet)", "H.265+ Compression"],
    applications: ["Commercial Towers", "Industrial Perimeters", "Residential Communities", "Warehouses"],
    specs: {
      "Resolution": "8 Megapixels (4K UHD)",
      "Lens": "2.8mm / 4mm Fixed Focal",
      "Night Vision": "Up to 40 meters ColorVu",
      "Ingress Protection": "IP67 Weatherproof",
      "Smart Analytics": "Human & Vehicle Classification, Line Crossing, Intrusion",
      "Power": "12V DC / PoE (802.3af)"
    },
    datasheetUrl: "/downloads/datasheets/hikvision-8mp-bullet.pdf",
    status: "Published",
    isFeatured: true
  },
  {
    id: "prod-2",
    name: "Dahua 32-Channel 4K AI Network Video Recorder (NVR)",
    category: "Network Video Recorders (NVR)",
    brand: "Dahua",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=450&fit=crop&auto=format",
    tagline: "High-Capacity Enterprise AI NVR with 4K HDMI Output & RAID Storage",
    features: ["32-Channel IP Camera Inputs", "Up to 12MP Resolution Recording", "4 SATA HDDs up to 40TB Total", "AI Facial Recognition & Search", "Dual Gigabit LAN Ports", "Smart H.265+ Codec"],
    applications: ["Corporate Headquarters", "Factories", "Educational Campuses", "Hospitals"],
    specs: {
      "Channels": "32 IP Channels",
      "Max Bandwidth": "384 Mbps Incoming",
      "Storage": "4 × SATA Ports (up to 10TB per HDD)",
      "Video Output": "1 × HDMI (4K), 1 × VGA",
      "RAID Support": "RAID 0/1/5/10",
      "Smart Search": "Quick Face & License Plate Retrieval"
    },
    datasheetUrl: "/downloads/datasheets/dahua-32ch-nvr.pdf",
    status: "Published",
    isFeatured: true
  },
  {
    id: "prod-3",
    name: "ZKTeco ProFace X Touchless Face & Palm Terminal",
    category: "Access Control Systems",
    brand: "ZKTeco",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&h=450&fit=crop&auto=format",
    tagline: "Ultra-High Speed AI Facial & Palm Recognition Terminal with Anti-Spoofing",
    features: ["<0.3 Second Recognition Speed", "Up to 50,000 Face Capacity", "Palm & Mask Detection", "Anti-Spoofing Print & Video Defense", "TCP/IP, Wiegand & Wi-Fi", "IP68 & IK04 Outdoor Ready"],
    applications: ["Corporate Offices", "Manufacturing Units", "Hospitals", "Data Centers"],
    specs: {
      "Face Capacity": "50,000 Faces",
      "Palm Capacity": "5,000 Palms",
      "Card Capacity": "50,000 RFID Cards",
      "Display": "8-inch IPS Touchscreen",
      "Operating Temp": "-30°C to 60°C",
      "Connectivity": "TCP/IP, Wiegand, RS485, USB"
    },
    datasheetUrl: "/downloads/datasheets/zkteco-proface-x.pdf",
    status: "Published",
    isFeatured: true
  },
  {
    id: "prod-4",
    name: "Honeywell Morley-IAS Intelligent Addressable Fire Panel",
    category: "Fire Alarm Systems",
    brand: "Honeywell",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&h=450&fit=crop&auto=format",
    tagline: "EN54 Certified Multi-Loop Addressable Fire Detection Control Panel",
    features: ["1 to 4 Loops (Up to 792 Devices)", "Backlit Graphic LCD Screen", "Cause & Effect Logic Programming", "Repeaters & Network Cards Support", "Battery Backup Included", "Meets NBC & IS Standards"],
    applications: ["Commercial Buildings", "Hospitals", "Hotels", "Shopping Malls", "Industrial Plants"],
    specs: {
      "Loop Capacity": "2 Loops (expandable to 4)",
      "Devices Per Loop": "198 Devices (99 detectors + 99 modules)",
      "Power Supply": "230V AC ± 15%, 50Hz",
      "Display": "240×64 Graphic Backlit LCD",
      "Certifications": "EN54-2, EN54-4, CE",
      "Event Log": "Up to 4,000 Event History"
    },
    datasheetUrl: "/downloads/datasheets/honeywell-morley-panel.pdf",
    status: "Published",
    isFeatured: true
  },
  {
    id: "prod-5",
    name: "Bosch Plena Matrix Digital Public Address System",
    category: "Public Address Systems",
    brand: "Bosch",
    image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=600&h=450&fit=crop&auto=format",
    tagline: "8-Zone Premium DSP Digital Audio Processor & Multi-Channel Amplifier",
    features: ["8 Audio Input / 8 Output Matrix", "High-End DSP Sound Calibration", "Zone Paging Microphone Stations", "Emergency Voice Override", "iOS/Android Mobile Volume Control", "Energy-Efficient Class-D Amps"],
    applications: ["Auditoriums", "Schools", "Airports", "Hospitals", "Corporate Towers"],
    specs: {
      "Output Zones": "8 Independent Zones",
      "Frequency Response": "20 Hz to 20 kHz",
      "DSP Functions": "5-band parametric EQ, Compression, Limiting, Delay",
      "Paging Stations": "Connect up to 8 Call Stations",
      "Amplifier Power": "4 × 125W / 2 × 250W Class-D"
    },
    datasheetUrl: "/downloads/datasheets/bosch-plena-matrix.pdf",
    status: "Published",
    isFeatured: true
  },
  {
    id: "prod-6",
    name: "Cisco Catalyst 24-Port Gigabit PoE+ Managed Switch",
    category: "Networking Products",
    brand: "Cisco",
    image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=600&h=450&fit=crop&auto=format",
    tagline: "Enterprise Layer 2+ Switch with 370W PoE Budget & 4× 10G SFP+ Uplinks",
    features: ["24 × 10/100/1000 Gigabit PoE+ Ports", "4 × 10G SFP+ Uplink Ports", "370W Total PoE Power Budget", "Advanced VLAN & QoS Management", "Cisco DNA Ready", "Redundant Power Capability"],
    applications: ["CCTV IP Backbones", "Enterprise Wi-Fi Networks", "Data Centers", "Smart Offices"],
    specs: {
      "Port Configuration": "24 Ports Gigabit Ethernet PoE+",
      "Uplinks": "4 × 10 Gigabit SFP+",
      "PoE Budget": "370 Watts",
      "Switching Capacity": "128 Gbps",
      "Security": "802.1X, MACsec, Port Security, ACLs",
      "Form Factor": "1U Rack Mountable"
    },
    datasheetUrl: "/downloads/datasheets/cisco-catalyst-24p.pdf",
    status: "Published",
    isFeatured: true
  },
  {
    id: "prod-7",
    name: "FAAC High-Speed Automatic Boom Barrier (6 Meter)",
    category: "Boom Barrier Systems",
    brand: "FAAC",
    image: "https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=600&h=450&fit=crop&auto=format",
    tagline: "Continuous Duty Hydraulic Automatic Barrier with Anti-Crush Safety",
    features: ["1.5 to 4.0s Opening Speed", "Heavy-Duty Hydraulic Motor (100% Duty Cycle)", "Integrated Dual Loop Detector", "LED Arm Illumination", "Manual Release Mechanism", "RFID & ANPR Compatible"],
    applications: ["Toll Plazas", "Commercial Tech Parks", "Gated Communities", "Logistics Hubs"],
    specs: {
      "Beam Length": "Up to 6.0 Meters",
      "Opening Time": "2.0 Seconds (adjustable)",
      "Duty Cycle": "100% Continuous Use",
      "Motor Voltage": "24V DC Hydraulic",
      "Protection": "IP54 Weatherproof Housing",
      "Control Unit": "Integrated Microprocessor Board"
    },
    datasheetUrl: "/downloads/datasheets/faac-highspeed-barrier.pdf",
    status: "Published",
    isFeatured: true
  },
  {
    id: "prod-8",
    name: "Schneider KNX Smart Home & Building Automation Controller",
    category: "Home Automation",
    brand: "Schneider Electric",
    image: "https://images.unsplash.com/photo-1558618047-3c8c9bb6cf44?w=600&h=450&fit=crop&auto=format",
    tagline: "Open Standard KNX Central Gateway for Lighting, HVAC & Energy Management",
    features: ["Worldwide KNX Standard Protocol", "Multi-Scene Lighting & Dimming Control", "HVAC Thermostat & VAV Integration", "Energy Consumption Telemetry", "Smartphone App & Voice Command Integration", "BACnet & Modbus Bridge"],
    applications: ["Luxury Villas", "Corporate Meeting Rooms", "Hotels", "Modern Hospitals"],
    specs: {
      "Protocol": "KNX Certified / IP Gateway",
      "Channels": "Up to 64 DALI / KNX Actuators",
      "Power Supply": "24V DC / KNX Bus Power",
      "Integration": "Amazon Alexa, Google Home, Apple HomeKit",
      "Mounting": "DIN Rail Modular 4SU"
    },
    datasheetUrl: "/downloads/datasheets/schneider-knx-gateway.pdf",
    status: "Published",
    isFeatured: true
  }
];

export const INITIAL_CASE_STUDIES: CaseStudy[] = [
  {
    id: "case-01",
    title: "Enterprise Corporate Office Security & Smart Infrastructure",
    clientType: "Corporate Headquarters",
    industry: "Commercial",
    location: "Cyber City, Gurugram",
    year: "2025",
    projectSize: "5 Floors • 800 Employees",
    technologyUsed: ["AI CCTV", "Face Recognition Access", "Visitor Management", "Enterprise Networking", "Fire Alarm", "Public Address"],
    shortDesc: "Complete turnkey security, touchless access control, and structured 10G fiber networking for a premier multinational corporate headquarters.",
    challenge: "The client was moving into a new 5-floor corporate facility and required strict access controls for R&D labs and server rooms, frictionless visitor registration at the main reception, and robust surveillance without any blind spots across 85,000 sq.ft of office floor space.",
    solution: "VRAT engineers designed and installed an integrated solution comprising 180 Hikvision 4K AI cameras, 65 ZKTeco touchless facial recognition doors, an iPad-based digital visitor check-in system, a Honeywell addressable fire detection network, and a Cisco Catalyst 10G structured cabling backbone.",
    results: [
      "100% touchless access for 800+ employees with zero proxy logging",
      "Visitor check-in time reduced from 6 minutes to under 45 seconds",
      "Zero security breaches across server rooms and executive floors",
      "Single-pane-of-glass facility monitoring from security control room"
    ],
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=900&h=550&fit=crop&auto=format",
    beforeImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=400&fit=crop&auto=format",
    afterImage: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop&auto=format",
    testimonial: {
      quote: "VRAT completed our office security project ahead of schedule with exceptional professionalism. The integrated system has significantly improved our security and operational efficiency.",
      author: "Facility Director, Corporate Enterprise"
    },
    status: "Published"
  },
  {
    id: "case-02",
    title: "Smart Manufacturing Plant Security & Worker Safety",
    clientType: "Heavy Manufacturing Facility",
    industry: "Industrial",
    location: "Sanand Industrial Estate, Gujarat",
    year: "2024",
    projectSize: "18 Buildings • 45 Acres Campus",
    technologyUsed: ["Perimeter AI Surveillance", "Boom Barrier", "Contractor Attendance", "Fire Alarm", "PA System", "Industrial Wi-Fi"],
    shortDesc: "Comprehensive industrial surveillance, automated truck boom barriers, and AI worker PPE safety detection across a 45-acre heavy machinery facility.",
    challenge: "The plant struggled with unauthorized personnel entering hazardous machinery zones, long truck lines at weighbridges causing logistics delays, and harsh ambient dust affecting standard optical camera lenses.",
    solution: "Deployed 320 rugged IP67 AI surveillance cameras with automated helmet/vest PPE detection, 4 FAAC heavy-duty boom barriers linked to RFID weighbridges, a campus-wide Bosch emergency paging network, and optical fiber ring topology across 18 factory buildings.",
    results: [
      "52% drop in factory floor safety non-compliance violations",
      "Truck weighbridge turnaround time reduced from 25 min to 8 min",
      "Real-time visibility across all 18 buildings in central command center",
      "Zero equipment downtime during the entire 6-month deployment"
    ],
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=900&h=550&fit=crop&auto=format",
    testimonial: {
      quote: "The AI surveillance and centralized monitoring solution provided excellent visibility across our manufacturing facility and improved worker safety dramatically.",
      author: "Plant Operations Head, Manufacturing Co."
    },
    status: "Published"
  },
  {
    id: "case-03",
    title: "Smart School Campus & Interactive Classrooms",
    clientType: "K-12 International School",
    industry: "Education",
    location: "Whitefield, Bengaluru",
    year: "2025",
    projectSize: "35 Smart Classrooms • 2,400 Students",
    technologyUsed: ["180 IP CCTV Cameras", "35 Interactive Flat Panels", "Face Recognition Attendance", "Campus Wi-Fi", "Fire Alarm", "Automated Bell PA"],
    shortDesc: "Complete digital transformation featuring 4K interactive touch panels, campus-wide student surveillance, and automated period bell broadcasts.",
    challenge: "Manual student roll call consumed 15 minutes of every first period, classroom projectors were aging with low brightness, and parents demanded verified security logging at school bus gates.",
    solution: "Installed 35 75-inch 4K Interactive Flat Panels with lecture capture, AI facial recognition attendance at all building entrances, 180 indoor/outdoor security cameras, and an IP public address system with programmed class bells.",
    results: [
      "95% reduction in morning attendance administrative time",
      "Interactive digital teaching adopted across 100% of classrooms",
      "Parents receive automated SMS notifications on student bus arrival",
      "Enhanced campus security with full perimeter coverage"
    ],
    image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=900&h=550&fit=crop&auto=format",
    testimonial: {
      quote: "Our campus is now much safer and easier to manage. The smart classroom and surveillance solutions have transformed our institution.",
      author: "Principal, International School"
    },
    status: "Published"
  },
  {
    id: "case-04",
    title: "Multi-Specialty Hospital Critical Infrastructure Upgrade",
    clientType: "400-Bed Super Specialty Hospital",
    industry: "Healthcare",
    location: "South Mumbai",
    year: "2024",
    projectSize: "400 Beds • 12 Operation Theatres",
    technologyUsed: ["250+ AI CCTV", "Sterile OT Access Control", "Addressable Fire Alarm", "Hospital-wide PA", "Medical LAN"],
    shortDesc: "Hospital-grade electronic security, touchless surgical theatre access, prioritized Code Blue paging, and high-speed medical records network.",
    challenge: "Strict medical hygiene regulations required touchless entry into surgical suites, pharmacy stockrooms needed continuous access audit logs, and emergency medical codes needed instant facility-wide broadcast without disturbing patient wards.",
    solution: "Implemented hands-free facial recognition at all 12 OTs, 250 AI cameras across waiting halls and pharmacy stores, an addressable Honeywell fire panel integrated with auto-unlock emergency exits, and a Bosch Plena Matrix zoned audio system.",
    results: [
      "Sub-2-second Code Blue emergency response broadcast",
      "Zero unauthorized access incidents into drug storage and ICUs",
      "Full compliance with NABH healthcare safety protocols",
      "Seamless integration with Hospital Information System (HIS)"
    ],
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=900&h=550&fit=crop&auto=format",
    testimonial: {
      quote: "VRAT's engineers understand the strict demands of healthcare facilities. The installation was executed with zero disruption to patient care.",
      author: "Medical Superintendent, Super Specialty Hospital"
    },
    status: "Published"
  },
  {
    id: "case-05",
    title: "National Retail Chain 42-Store Central Surveillance",
    clientType: "Lifestyle Fashion & Electronics Chain",
    industry: "Retail",
    location: "42 Stores Across 14 Cities",
    year: "2025",
    projectSize: "42 Stores • 520+ AI Cameras",
    technologyUsed: ["AI CCTV", "POS Integration", "Queue Analytics", "Store Access Control", "Central Cloud VMS"],
    shortDesc: "Centralized cloud video surveillance, customer heat mapping, queue alerts, and inventory shrinkage prevention for 42 retail stores.",
    challenge: "The brand suffered from 2.8% retail shrinkage across outlets, had no unified visibility into store traffic, and suffered from long customer lines during sale weekends.",
    solution: "Equipped all 42 stores with 520 AI dome cameras synchronized with point-of-sale registers, customer footfall sensors, heat mapping analytics, and a central cloud command portal for headquarters executives.",
    results: [
      "Retail inventory shrinkage slashed from 2.8% down to 0.6%",
      "Store managers receive instant mobile alerts when checkout queues exceed 4 shoppers",
      "HQ leadership can audit any store register transaction video in 3 clicks",
      "Standardized security protocols across all nationwide locations"
    ],
    image: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=900&h=550&fit=crop&auto=format",
    testimonial: {
      quote: "Managing multiple stores has become significantly easier, and we've improved both security and customer operational visibility.",
      author: "Head of Retail Operations, National Retail Brand"
    },
    status: "Published"
  },
  {
    id: "case-06",
    title: "National Logistics Distribution Center & Automated Docks",
    clientType: "3PL E-Commerce Logistics Hub",
    industry: "Warehouses & Logistics",
    location: "Bhiwandi Logistics Hub, Maharashtra",
    year: "2024",
    projectSize: "250,000 sq.ft • 48 Loading Docks",
    technologyUsed: ["180+ AI CCTV", "ANPR Truck Barriers", "High-Bay Wi-Fi 6", "Beam Smoke Detectors", "Central Command Room"],
    shortDesc: "Automated vehicle dispatch, beam fire detection, and robust industrial Wi-Fi for a high-volume 250,000 sq.ft e-commerce fulfillment warehouse.",
    challenge: "Managing 300+ truck movements daily, blind spots between 10-meter-high pallet storage aisles, and RF barcode scanners disconnecting due to metal shelving interference.",
    solution: "Engineered a high-density Cisco Wi-Fi 6 wireless network with directional antennas, 180 AI surveillance cameras covering all 48 dock doors and high-value cages, ANPR gate barriers, and high-sensitivity beam smoke detectors.",
    results: [
      "Zero scanner dropouts across entire 250,000 sq.ft warehouse floor",
      "Truck loading dock processing time improved by 40%",
      "Complete visual chain-of-custody recorded for every shipped pallet",
      "Preventive maintenance AMC ensuring 99.98% system availability"
    ],
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=900&h=550&fit=crop&auto=format",
    testimonial: {
      quote: "Vehicle movement is now much faster, inventory protection is top notch, and reporting is 100% automated.",
      author: "Regional Logistics Manager, 3PL Distribution Hub"
    },
    status: "Published"
  }
];

export const INITIAL_BLOG_POSTS: BlogPost[] = [
  {
    id: "blog-1",
    slug: "ai-powered-cctv-future-of-smart-surveillance",
    title: "AI-Powered CCTV: The Future of Smart Surveillance in 2026",
    category: "AI Surveillance",
    author: "Rajesh Sharma",
    authorRole: "Managing Director & Solutions Architect",
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&auto=format",
    publishDate: "August 18, 2026",
    readTime: "8 min read",
    excerpt: "Discover how Artificial Intelligence is transforming traditional video surveillance with facial recognition, people counting, intrusion detection, vehicle analytics, and real-time alerts.",
    content: `Video surveillance has evolved dramatically from passive video recording into intelligent, proactive real-time threat detection. In 2026, enterprise security teams no longer have the bandwidth to watch dozens of video feeds simultaneously.

### The Shift to Edge AI Analytics
Modern AI cameras process video streams directly at the hardware edge. Using deep learning neural networks, cameras can differentiate between a human, an animal, a swaying tree branch, and a motor vehicle with 99%+ accuracy.

### Key Capabilities of AI Surveillance:
1. **Intrusion & Line Crossing Detection**: Virtual perimeters alert security guards the millisecond an unauthorized person crosses a boundary after hours.
2. **Automatic Number Plate Recognition (ANPR)**: Automatic gate opening for whitelisted vehicles and instant alarm triggers for blacklisted vehicles.
3. **PPE Safety Compliance**: Manufacturing plants use AI cameras to ensure all personnel in hazardous zones wear hard hats, high-visibility vests, and protective goggles.
4. **Customer Heat Mapping & Footfall**: Retail chains analyze shopper traffic density to optimize shelf displays and staff scheduling.

Choosing an enterprise system integrator ensures proper camera placement, calibrated lighting, and seamless integration with your existing security ecosystem.`,
    featuredImage: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=900&h=500&fit=crop&auto=format",
    tags: ["AI", "CCTV", "Surveillance", "Smart City", "Security"],
    relatedServices: ["cctv-surveillance", "networking-solutions"],
    isFeatured: true,
    status: "Published"
  },
  {
    id: "blog-2",
    slug: "choosing-right-fire-alarm-system-conventional-vs-addressable",
    title: "Choosing the Right Fire Alarm System: Conventional vs Addressable",
    category: "Fire Safety",
    author: "Vikram Malhotra",
    authorRole: "Head of Fire Engineering",
    authorAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&auto=format",
    publishDate: "August 10, 2026",
    readTime: "10 min read",
    excerpt: "Understand the key differences between conventional and addressable fire alarm systems and learn how to select the best, code-compliant solution for your facility.",
    content: `When designing a life safety strategy for a building, selecting the right fire detection system is one of the most critical decisions an architect or facility manager makes.

### Conventional Fire Alarm Systems
Conventional systems divide a building into broad 'zones' (such as Floor 1, Floor 2, Warehouse). When a smoke detector activates, the panel alerts the fire department that a fire exists in that zone, but cannot pinpoint the exact detector.
- **Best For**: Small retail shops, single-floor offices, standalone clinics, and residential apartments.
- **Advantage**: Lower initial equipment cost and straightforward installation.

### Addressable Fire Alarm Systems
Addressable systems assign a unique digital address to every individual smoke detector, heat sensor, and manual call point on the loop.
- **Best For**: Multi-story corporate offices, hospitals, educational campuses, hotels, and large industrial facilities.
- **Key Advantages**:
  - Exact room-level fire localization (e.g. "Room 402, North Wing Smoke Detector").
  - Faster emergency dispatch and targeted evacuation.
  - Ability to program complex Cause & Effect actions (e.g. unlock emergency doors, shut off HVAC fans, recall elevators).`,
    featuredImage: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=900&h=500&fit=crop&auto=format",
    tags: ["Fire Alarm", "Safety", "NBC Compliance", "Addressable", "Smart Building"],
    relatedServices: ["fire-alarm-systems", "public-address-system"],
    isFeatured: true,
    status: "Published"
  },
  {
    id: "blog-3",
    slug: "why-every-business-needs-enterprise-structured-cabling",
    title: "Why Every Modern Facility Needs Enterprise Structured Cabling",
    category: "Networking",
    author: "Amit Patel",
    authorRole: "Senior Network Specialist",
    authorAvatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop&auto=format",
    publishDate: "August 02, 2026",
    readTime: "7 min read",
    excerpt: "Learn why reliable structured cabling and optical fiber backbones form the essential foundation for CCTV, Wi-Fi 6, Access Control, and Cloud ERP operations.",
    content: `Network cabling is often out of sight above ceiling tiles and inside server racks, yet it accounts for the backbone of your organization's digital operations.

### The Pitfalls of Unstructured 'Point-to-Point' Cabling
Without structured cabling, networks become chaotic 'spaghetti wiring', leading to:
- Excessive crosstalk and signal attenuation
- Difficult maintenance and delayed troubleshooting during network outages
- Safety and fire hazards from overcrowded cable trays

### Benefits of Certified Structured Cabling:
1. **Support for High-Bandwidth Applications**: Cat6A and Cat7 cabling effortlessly transmit 10 Gbps speeds required for 4K security streams and cloud backups.
2. **Power over Ethernet (PoE+)**: Deliver up to 90W of power directly to PTZ cameras, access control door strikes, and Wi-Fi access points over a single Ethernet cable.
3. **Fluke Tested & Certified**: Every cable run is tested and certified with OTDR and Fluke meters to guarantee 20+ years of dependable service.`,
    featuredImage: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=900&h=500&fit=crop&auto=format",
    tags: ["Networking", "Structured Cabling", "Fiber Optics", "Enterprise Wi-Fi"],
    relatedServices: ["networking-solutions", "cctv-surveillance"],
    isFeatured: false,
    status: "Published"
  }
];

export const INITIAL_FAQS: FAQItem[] = [
  {
    id: "faq-1",
    category: "General",
    question: "What services does VRAT System Integrators provide?",
    answer: "We provide end-to-end electronic security and infrastructure solutions including CCTV surveillance, fire alarm systems, access control, time attendance, networking, home and building automation, public address systems, video door phones, boom barriers, and complete system integration services.",
    order: 1,
    status: "Published"
  },
  {
    id: "faq-2",
    category: "General",
    question: "Do you execute turnkey projects across India?",
    answer: "Yes. VRAT System Integrators operates PAN-India through our certified engineering network, delivering complete project lifecycles from site survey and architecture design to supply, installation, testing, commissioning, and long-term AMC support.",
    order: 2,
    status: "Published"
  },
  {
    id: "faq-3",
    category: "CCTV",
    question: "Which CCTV camera is best for my business or facility?",
    answer: "The ideal camera setup depends on coverage area, lighting, indoor/outdoor exposure, and analytical requirements. Our engineers conduct a thorough site survey to recommend the right mix of 4K IP bullets, vandal-proof domes, optical zoom PTZs, or ANPR cameras.",
    order: 3,
    status: "Published"
  },
  {
    id: "faq-4",
    category: "CCTV",
    question: "Can I monitor surveillance cameras remotely on my mobile phone?",
    answer: "Yes. All our modern IP and HD CCTV systems include secure encrypted mobile apps (iOS & Android) and web browser portals, allowing authorized managers to view live video and playback recordings anywhere in the world.",
    order: 4,
    status: "Published"
  },
  {
    id: "faq-5",
    category: "Fire Alarm",
    question: "What is the difference between conventional and addressable fire alarms?",
    answer: "A conventional system alerts you to a general zone in the building, whereas an addressable system identifies the exact detector or manual call point that triggered the alert, enabling much faster fault localization and emergency response.",
    order: 5,
    status: "Published"
  },
  {
    id: "faq-6",
    category: "Access Control",
    question: "Can access control integrate with time attendance and payroll software?",
    answer: "Yes. Our access control and biometric terminals integrate directly with major HRMS, ERP, and payroll applications, automatically synchronizing employee punch-in records, leaves, shifts, and overtime calculations.",
    order: 6,
    status: "Published"
  },
  {
    id: "faq-7",
    category: "AMC & Support",
    question: "Do you provide Annual Maintenance Contracts (AMC) after warranty?",
    answer: "Yes. We offer comprehensive and non-comprehensive AMC packages that include scheduled preventive maintenance inspections, system health checks, firmware upgrades, priority emergency breakdown response, and spare parts replacements.",
    order: 7,
    status: "Published"
  },
  {
    id: "faq-8",
    category: "Automation",
    question: "Can home automation be installed in existing homes without rewiring?",
    answer: "Yes. We offer both wired (KNX/BACnet) solutions for greenfield construction and wireless smart automation modules (Zigbee/Wi-Fi) that fit behind existing wall switch plates with zero structural disruption.",
    order: 8,
    status: "Published"
  }
];

export const INITIAL_DOWNLOADS: DownloadItem[] = [
  {
    id: "dl-1",
    title: "VRAT System Integrators Corporate Profile & Capability Statement",
    category: "Company Documents",
    description: "Overview of company history, 17+ years journey, technical certifications, turnkey execution capabilities, and project portfolio.",
    fileType: "PDF",
    fileSize: "4.2 MB",
    version: "2026.1",
    updatedDate: "August 2026",
    downloadUrl: "#corporate-profile",
    downloadsCount: 1420,
    status: "Published"
  },
  {
    id: "dl-2",
    title: "Complete Electronic Security & CCTV Product Catalogue",
    category: "Product Catalogues",
    description: "Detailed catalog covering 4K AI bullet cameras, IP domes, speed PTZs, thermal cameras, NVRs, and Video Management Software.",
    fileType: "PDF",
    fileSize: "8.6 MB",
    version: "v4.2",
    updatedDate: "July 2026",
    downloadUrl: "#cctv-catalogue",
    downloadsCount: 980,
    status: "Published"
  },
  {
    id: "dl-3",
    title: "Commercial & Industrial Fire Safety Planning Guide",
    category: "Whitepapers",
    description: "Comprehensive engineering guide on National Building Code (NBC) compliance, addressable loop architecture, and detector placement.",
    fileType: "PDF",
    fileSize: "3.1 MB",
    version: "Rev 2",
    updatedDate: "August 2026",
    downloadUrl: "#fire-guide",
    downloadsCount: 750,
    status: "Published"
  },
  {
    id: "dl-4",
    title: "Structured Cabling & Enterprise Network BOQ Template",
    category: "Tender Documents",
    description: "Standard Bill of Quantities (BOQ) template, technical specifications, and rack layout guidelines for consultants and architects.",
    fileType: "DOC",
    fileSize: "1.8 MB",
    version: "v3.0",
    updatedDate: "June 2026",
    downloadUrl: "#boq-template",
    downloadsCount: 610,
    status: "Published"
  },
  {
    id: "dl-5",
    title: "Biometric Access Control & Attendance Configuration Manual",
    category: "Technical Manuals",
    description: "Step-by-step administrator guide for configuring facial recognition terminals, door scheduling, shift planning, and payroll sync.",
    fileType: "PDF",
    fileSize: "5.4 MB",
    version: "v5.1",
    updatedDate: "May 2026",
    downloadUrl: "#access-manual",
    downloadsCount: 890,
    status: "Published"
  }
];

export const INITIAL_JOBS: JobOpening[] = [
  {
    id: "job-1",
    title: "Senior Security Systems Engineer",
    department: "Engineering & Operations",
    location: "Ahmedabad / Mumbai (On-Site)",
    type: "Full-Time",
    experience: "3–6 Years",
    qualification: "B.E / B.Tech in Electronics, Electrical, or IT",
    salary: "₹6,00,000 - ₹9,50,000 p.a.",
    description: "Lead on-site design, deployment, and commissioning of enterprise CCTV, access control, and fire detection systems for high-profile clients.",
    responsibilities: [
      "Conduct technical site surveys and prepare camera layouts and BOQ",
      "Supervise installation of IP cameras, NVRs, turnstiles, and fire panels",
      "Perform system testing, network configuration, and client handover training",
      "Coordinate with project managers and client facility representatives"
    ],
    requirements: [
      "Proven experience with Hikvision, Dahua, Honeywell, or Bosch hardware",
      "In-depth knowledge of IP networking, PoE, and video management platforms",
      "Strong troubleshooting and problem-solving skills"
    ],
    benefits: [
      "Competitive compensation & project performance bonuses",
      "OEM partner technical certification sponsorships",
      "Health insurance and travel allowances"
    ],
    status: "Published",
    deadline: "September 30, 2026"
  },
  {
    id: "job-2",
    title: "Enterprise Network Engineer",
    department: "Network Infrastructure",
    location: "Ahmedabad / Bengaluru",
    type: "Full-Time",
    experience: "2–5 Years",
    qualification: "B.E / B.Tech / BCA / MCA (CCNA Preferred)",
    salary: "₹5,00,000 - ₹8,00,000 p.a.",
    description: "Design and implement structured cabling, fiber optic splicing, Cisco/Aruba managed switches, and high-density enterprise Wi-Fi.",
    responsibilities: [
      "Install and configure L2/L3 managed switches, VLANs, and next-gen firewalls",
      "Oversee structured copper and optical fiber cabling installations",
      "Conduct wireless site surveys and Wi-Fi heat map optimization",
      "Perform cable certification testing using Fluke meters and OTDR"
    ],
    requirements: [
      "Hands-on experience with Cisco, Aruba, or TP-Link Omada hardware",
      "Knowledge of network routing protocols, VPNs, and QoS management",
      "CCNA or equivalent networking certification is a major plus"
    ],
    benefits: [
      "Advanced networking lab access and continuous training",
      "Annual performance increments and paid leave",
      "Opportunity to work on large smart city and data center projects"
    ],
    status: "Published",
    deadline: "October 15, 2026"
  },
  {
    id: "job-3",
    title: "Technical Support & AMC Engineer",
    department: "Customer Support",
    location: "Multiple Locations across Gujarat",
    type: "Full-Time",
    experience: "1–4 Years",
    qualification: "Diploma / Degree in Electronics or Computer Science",
    salary: "₹3,50,000 - ₹5,50,000 p.a.",
    description: "Provide proactive preventive maintenance and rapid emergency troubleshooting for client security and automation systems under AMC.",
    responsibilities: [
      "Perform periodic preventive maintenance visits and system health checks",
      "Troubleshoot camera outages, biometric reader sync errors, and network issues",
      "Assist clients with remote diagnostic support and configuration guidance",
      "Maintain detailed service records and obtain customer sign-off reports"
    ],
    requirements: [
      "Prior field experience with CCTV, access control, or fire alarms",
      "Customer-centric mindset with good communication skills",
      "Valid two-wheeler license for local client site visits"
    ],
    benefits: [
      "Daily field allowances and mobile reimbursement",
      "Quarterly customer satisfaction incentives",
      "Fast-track career growth into Project Management"
    ],
    status: "Published",
    deadline: "Open"
  },
  {
    id: "job-4",
    title: "Graduate Engineering Trainee (GET) / Intern",
    department: "System Integration",
    location: "Ahmedabad (Head Office)",
    type: "Internship",
    experience: "Freshers / 2025-2026 Batch",
    qualification: "Diploma / B.E / B.Tech / BSc IT",
    salary: "₹18,000 - ₹25,000 / month stipend",
    description: "Comprehensive 6-month hands-on training program in CCTV surveillance, smart home automation, structured cabling, and technical project estimation.",
    responsibilities: [
      "Shadow senior project engineers during site surveys and installations",
      "Learn configuration of AI cameras, biometric controllers, and smart switches",
      "Assist in CAD layout drawings and Bill of Quantities (BOQ) preparation",
      "Participate in product demos and OEM certification workshops"
    ],
    requirements: [
      "Strong enthusiasm for electronics, networking, and security technologies",
      "Basic understanding of IP networks and electrical circuits",
      "Eager to learn and work in dynamic on-site environments"
    ],
    benefits: [
      "Certificate of completion upon internship conclusion",
      "Direct pathway to full-time permanent engineer role based on performance",
      "Mentorship from veteran industry architects"
    ],
    status: "Published",
    deadline: "Open"
  }
];

export const INITIAL_LEADS: LeadItem[] = [
  {
    id: "lead-101",
    type: "Contact Inquiry",
    name: "Sanjay Singhania",
    company: "Apex Infotech Ltd",
    email: "sanjay.s@apexinfo.com",
    phone: "+91 98980 11223",
    city: "Ahmedabad",
    serviceOrProduct: "CCTV Surveillance Systems",
    projectType: "Commercial",
    estimatedSize: "Enterprise",
    message: "We need an integrated AI surveillance system and facial recognition access control for our new 40,000 sq.ft office building.",
    createdDate: "2026-08-24 14:30",
    status: "New",
    assignedTo: "Vikram Malhotra"
  },
  {
    id: "lead-102",
    type: "Site Survey Request",
    name: "Mehul Patel",
    company: "Maruti Polyplast Industries",
    email: "m.patel@marutipoly.in",
    phone: "+91 97234 55667",
    city: "Sanand",
    serviceOrProduct: "Fire Alarm Systems",
    projectType: "Industrial",
    estimatedSize: "Medium Business",
    message: "Require a site inspection for fire safety compliance assessment and addressable smoke detector installation across 3 warehouse blocks.",
    preferredDate: "2026-08-28",
    preferredTime: "11:00 AM",
    preferredContactMethod: "Phone",
    createdDate: "2026-08-23 16:15",
    status: "Contacted",
    assignedTo: "Suresh Nair"
  },
  {
    id: "lead-103",
    type: "Product Quote",
    name: "Dr. Arvind Joshi",
    company: "Lifeline Multi-Specialty Hospital",
    email: "admin@lifelinehospital.org",
    phone: "+91 98240 99887",
    city: "Vadodara",
    serviceOrProduct: "Access Control Systems",
    projectType: "Healthcare",
    estimatedSize: "Enterprise",
    message: "Please share quotation for 18 touchless facial recognition terminals with fever screening and battery backup for OT entrances.",
    createdDate: "2026-08-22 10:45",
    status: "Proposal Sent",
    assignedTo: "Rajesh Sharma"
  },
  {
    id: "lead-104",
    type: "Support Request",
    name: "Deepak Mehta",
    company: "Sterling Heights Society",
    email: "secretary@sterlingheights.com",
    phone: "+91 98790 33445",
    city: "Ahmedabad",
    serviceOrProduct: "Boom Barrier Systems",
    projectType: "Residential",
    message: "Boom barrier at Gate 2 requires sensor calibration and RFID tag re-sync after rain.",
    createdDate: "2026-08-21 18:20",
    status: "Won",
    notes: "Engineer visited on Aug 22. Sensor recalibrated and tested successfully."
  }
];

export const INITIAL_TESTIMONIALS: TestimonialItem[] = [
  {
    id: "t-1",
    name: "Vikramaditya Rao",
    designation: "Head of Infrastructure & Security",
    company: "Adani Enterprise Logistics Hub",
    industry: "Industrial & Logistics",
    quote: "VRAT System Integrators transformed our warehouse security with AI-enabled CCTV and automated ANPR boom barriers. Vehicle dispatch is now 40% faster and security reporting is completely seamless.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&auto=format",
    isFeatured: true,
    status: "Published"
  },
  {
    id: "t-2",
    name: "Dr. Sunita Deshmukh",
    designation: "Chief Operating Officer",
    company: "Carewell Multi-Specialty Hospitals",
    industry: "Healthcare",
    quote: "Whenever we need technical assistance, VRAT's certified engineers respond within minutes. Their addressable fire safety system and touchless access control have given our staff complete peace of mind.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&auto=format",
    isFeatured: true,
    status: "Published"
  },
  {
    id: "t-3",
    name: "Prof. K. N. Banerjee",
    designation: "Dean of Campus Administration",
    company: "National Institute of Design & Tech",
    industry: "Educational Institutions",
    quote: "The smart classrooms, high-density campus Wi-Fi, and automated bell public address system installed by VRAT have elevated our learning environment to international standards.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&auto=format",
    isFeatured: true,
    status: "Published"
  },
  {
    id: "t-4",
    name: "Pooja Kothari",
    designation: "Luxury Villa Owner",
    company: "The Green Acres Township",
    industry: "Residential",
    quote: "VRAT converted our villa into a truly intelligent smart home. We control lighting, curtains, climate, and video door access effortlessly from our phones anywhere we travel.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&auto=format",
    isFeatured: false,
    status: "Published"
  }
];

export const INITIAL_PARTNERS: PartnerBrand[] = [
  { id: "p-1", name: "Hikvision", category: "Surveillance", logo: "Hikvision", websiteUrl: "https://www.hikvision.com", order: 1, active: true },
  { id: "p-2", name: "Dahua", category: "Surveillance", logo: "Dahua", websiteUrl: "https://www.dahuasecurity.com", order: 2, active: true },
  { id: "p-3", name: "Honeywell", category: "Fire & Access", logo: "Honeywell", websiteUrl: "https://www.honeywell.com", order: 3, active: true },
  { id: "p-4", name: "Bosch", category: "Public Address & Fire", logo: "Bosch", websiteUrl: "https://www.boschsecurity.com", order: 4, active: true },
  { id: "p-5", name: "Matrix", category: "Access Control & Telecom", logo: "Matrix", websiteUrl: "https://www.matrixcomsec.com", order: 5, active: true },
  { id: "p-6", name: "ZKTeco", category: "Biometrics & Time Attendance", logo: "ZKTeco", websiteUrl: "https://www.zkteco.com", order: 6, active: true },
  { id: "p-7", name: "Cisco", category: "Enterprise Networking", logo: "Cisco", websiteUrl: "https://www.cisco.com", order: 7, active: true },
  { id: "p-8", name: "Schneider Electric", category: "Building Automation", logo: "Schneider Electric", websiteUrl: "https://www.se.com", order: 8, active: true },
  { id: "p-9", name: "TP-Link", category: "Networking & Wi-Fi", logo: "TP-Link", websiteUrl: "https://www.tp-link.com", order: 9, active: true },
  { id: "p-10", name: "CP Plus", category: "Surveillance", logo: "CP Plus", websiteUrl: "https://www.cpplusworld.com", order: 10, active: true }
];

export const INITIAL_HERO_CONFIGS: Record<string, PageHeroConfig> = {
  home: {
    pageId: "home",
    pageName: "Home Page",
    heading: "Building Smarter, Safer & More Secure Environments",
    subtitle: "VRAT System Integrators is a leading provider of integrated electronic security, surveillance, networking, and automation solutions across India.",
    backgroundImage: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=1600&h=900&fit=crop&auto=format",
    primaryCtaText: "Request a Free Site Survey",
    primaryCtaLink: "/contact",
    secondaryCtaText: "Explore Our Solutions",
    secondaryCtaLink: "/services",
    showSection: true,
    status: "Published"
  },
  about: {
    pageId: "about",
    pageName: "About Us",
    heading: "Empowering Secure Spaces Through Innovation & Excellence",
    subtitle: "For over 17 years, VRAT System Integrators has been delivering intelligent electronic security, surveillance, networking, and automation solutions across India.",
    backgroundImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&h=900&fit=crop&auto=format",
    primaryCtaText: "Meet Our Team",
    primaryCtaLink: "#team",
    secondaryCtaText: "Contact Our Experts",
    secondaryCtaLink: "/contact",
    showSection: true,
    status: "Published"
  },
  services: {
    pageId: "services",
    pageName: "Services Overview",
    heading: "Comprehensive Electronic Security & System Integration",
    subtitle: "From AI surveillance and fire safety to networking and smart building automation, we deliver end-to-end technology solutions tailored to your business.",
    backgroundImage: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1600&h=900&fit=crop&auto=format",
    primaryCtaText: "Request a Free Consultation",
    primaryCtaLink: "/contact",
    secondaryCtaText: "Download Company Profile",
    secondaryCtaLink: "/downloads",
    showSection: true,
    status: "Published"
  },
  solutions: {
    pageId: "solutions",
    pageName: "Industry Solutions",
    heading: "Tailored Technology Infrastructure for Every Sector",
    subtitle: "Discover customized security, communication, and automation architectures engineered specifically for your industry requirements.",
    backgroundImage: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1600&h=900&fit=crop&auto=format",
    primaryCtaText: "Schedule Site Assessment",
    primaryCtaLink: "/contact",
    secondaryCtaText: "Explore Industries",
    secondaryCtaLink: "#industries-grid",
    showSection: true,
    status: "Published"
  },
  products: {
    pageId: "products",
    pageName: "Product Catalog",
    heading: "Enterprise Security & Smart Infrastructure Products",
    subtitle: "Discover a comprehensive range of world-class security, surveillance, networking, automation, communication, and safety products from globally trusted brands.",
    backgroundImage: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1600&h=900&fit=crop&auto=format",
    primaryCtaText: "Request Product Consultation",
    primaryCtaLink: "#inquiry",
    secondaryCtaText: "Download Product Catalogue",
    secondaryCtaLink: "/downloads",
    showSection: true,
    status: "Published"
  },
  projects: {
    pageId: "projects",
    pageName: "Projects & Case Studies",
    heading: "Delivering Intelligent Infrastructure Across Industries",
    subtitle: "From corporate towers and manufacturing plants to hospitals, schools, and smart cities—our 500+ projects reflect our commitment to excellence.",
    backgroundImage: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&h=900&fit=crop&auto=format",
    primaryCtaText: "Discuss Your Project",
    primaryCtaLink: "/contact",
    secondaryCtaText: "Download Case Studies",
    secondaryCtaLink: "/downloads",
    showSection: true,
    status: "Published"
  },
  gallery: {
    pageId: "gallery",
    pageName: "Multimedia Gallery",
    heading: "Explore Our Work in Action",
    subtitle: "Discover our successful installations, completed projects, technology deployments, and engineering excellence across all major sectors.",
    backgroundImage: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1600&h=900&fit=crop&auto=format",
    primaryCtaText: "View Project Gallery",
    primaryCtaLink: "#gallery-grid",
    secondaryCtaText: "Contact Our Team",
    secondaryCtaLink: "/contact",
    showSection: true,
    status: "Published"
  },
  downloads: {
    pageId: "downloads",
    pageName: "Download Center",
    heading: "Everything You Need, All in One Place",
    subtitle: "Access corporate brochures, product catalogues, technical datasheets, certifications, installation manuals, and BOQ templates.",
    backgroundImage: "https://images.unsplash.com/photo-1558618047-3c8c9bb6cf44?w=1600&h=900&fit=crop&auto=format",
    primaryCtaText: "Download Company Profile",
    primaryCtaLink: "#company-profile",
    secondaryCtaText: "Request Custom Document",
    secondaryCtaLink: "#request-doc",
    showSection: true,
    status: "Published"
  },
  blog: {
    pageId: "blog",
    pageName: "Blog & Insights",
    heading: "Insights That Keep You Ahead",
    subtitle: "Stay informed with the latest trends, expert advice, technology updates, buying guides, and best practices in electronic security and IoT.",
    backgroundImage: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=1600&h=900&fit=crop&auto=format",
    primaryCtaText: "Explore Articles",
    primaryCtaLink: "#articles",
    secondaryCtaText: "Subscribe to Newsletter",
    secondaryCtaLink: "#newsletter",
    showSection: true,
    status: "Published"
  },
  careers: {
    pageId: "careers",
    pageName: "Careers",
    heading: "Build Your Future with VRAT System Integrators",
    subtitle: "Join a passionate team shaping the future of security, surveillance, networking, automation, and smart infrastructure across India.",
    backgroundImage: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&h=900&fit=crop&auto=format",
    primaryCtaText: "Explore Open Positions",
    primaryCtaLink: "#openings",
    secondaryCtaText: "Submit Your Resume",
    secondaryCtaLink: "#apply",
    showSection: true,
    status: "Published"
  },
  contact: {
    pageId: "contact",
    pageName: "Contact Us",
    heading: "Let's Build Secure & Smarter Infrastructure Together",
    subtitle: "Whether you're planning a new facility, upgrading existing systems, or looking for expert guidance, our engineers are ready to assist.",
    backgroundImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&h=900&fit=crop&auto=format",
    primaryCtaText: "Schedule a Site Survey",
    primaryCtaLink: "#survey-form",
    secondaryCtaText: "Emergency Support",
    secondaryCtaLink: "#emergency",
    showSection: true,
    status: "Published"
  },
  faq: {
    pageId: "faq",
    pageName: "Frequently Asked Questions",
    heading: "Frequently Asked Questions",
    subtitle: "Find fast answers to common questions about products, installations, support, warranties, maintenance AMC, and turnkey project execution.",
    backgroundImage: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1600&h=900&fit=crop&auto=format",
    primaryCtaText: "Contact Our Experts",
    primaryCtaLink: "/contact",
    secondaryCtaText: "Raise a Support Ticket",
    secondaryCtaLink: "#ask",
    showSection: true,
    status: "Published"
  },
  support: {
    pageId: "support",
    pageName: "Customer Support",
    heading: "We're With You Long After Installation",
    subtitle: "Reliable 24×7 support, proactive maintenance, rapid emergency dispatch, and expert technical assistance to keep your systems running at peak performance.",
    backgroundImage: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1600&h=900&fit=crop&auto=format",
    primaryCtaText: "Raise a Service Request",
    primaryCtaLink: "#service-form",
    secondaryCtaText: "AMC Maintenance Plans",
    secondaryCtaLink: "#amc",
    showSection: true,
    status: "Published"
  }
};

export const INITIAL_MEDIA_ITEMS: MediaItem[] = [
  { id: "m-1", filename: "cctv-command-center.webp", url: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=800&h=500&fit=crop&auto=format", type: "image", size: "320 KB", dimensions: "1920x1080", altText: "Modern CCTV Command Center Monitoring Wall", uploadedDate: "2026-08-20", category: "Surveillance" },
  { id: "m-2", filename: "fire-alarm-panel.webp", url: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&h=500&fit=crop&auto=format", type: "image", size: "410 KB", dimensions: "1920x1080", altText: "Addressable Fire Alarm Control Panel Inspection", uploadedDate: "2026-08-20", category: "Fire Safety" },
  { id: "m-3", filename: "biometric-turnstile.webp", url: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=500&fit=crop&auto=format", type: "image", size: "280 KB", dimensions: "1920x1080", altText: "Speed Gate Turnstile with Facial Recognition", uploadedDate: "2026-08-20", category: "Access Control" },
  { id: "m-4", filename: "server-rack-cabling.webp", url: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=500&fit=crop&auto=format", type: "image", size: "520 KB", dimensions: "1920x1080", altText: "Organized Server Rack with Structured Fiber Cabling", uploadedDate: "2026-08-20", category: "Networking" },
  { id: "m-5", filename: "smart-home-living.webp", url: "https://images.unsplash.com/photo-1558618047-3c8c9bb6cf44?w=800&h=500&fit=crop&auto=format", type: "image", size: "380 KB", dimensions: "1920x1080", altText: "Smart Home Automation Living Room Scene", uploadedDate: "2026-08-20", category: "Automation" }
];
