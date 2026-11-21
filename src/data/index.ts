export const STATS = [
  { value: "17+", label: "Years of Industry Experience" },
  { value: "500+", label: "Projects Successfully Completed" },
  { value: "120+", label: "Satisfied Clients" },
  { value: "40+", label: "Certified Professionals" },
  { value: "24×7", label: "Technical Support" },
  { value: "98%", label: "Customer Satisfaction" },
];

export const PARTNERS = [
  "Hikvision", "Dahua", "Honeywell", "Bosch", "Matrix",
  "ZKTeco", "Panasonic", "Cisco", "TP-Link", "CP Plus",
];

export const SERVICES = [
  {
    id: "cctv",
    title: "CCTV Surveillance Systems",
    shortDesc: "Protect your premises with intelligent surveillance solutions featuring HD cameras, IP cameras, AI analytics, PTZ cameras, ANPR, and centralized monitoring.",
    overview: "Monitor your premises 24×7 with advanced surveillance solutions featuring AI-enabled cameras, centralized monitoring, remote access, and intelligent video analytics.",
    icon: "🎥",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=500&fit=crop&auto=format",
    features: [
      "HD CCTV Cameras", "IP Cameras", "PTZ Cameras", "Dome Cameras",
      "Bullet Cameras", "ANPR Cameras", "Thermal Cameras",
      "AI Analytics", "Video Management Software", "Central Monitoring",
    ],
    benefits: ["Crime Prevention", "Real-Time Monitoring", "Remote Viewing", "Evidence Recording", "AI Detection"],
    slug: "/services/cctv",
  },
  {
    id: "fire-alarm",
    title: "Fire Alarm Systems",
    shortDesc: "Early detection and rapid response through advanced fire detection and alarm systems designed to comply with safety regulations.",
    overview: "Protect lives and assets through intelligent fire detection systems that provide early warnings and fast emergency response.",
    icon: "🔥",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&h=500&fit=crop&auto=format",
    features: [
      "Addressable Fire Alarm", "Conventional Fire Alarm", "Smoke Detectors",
      "Heat Detectors", "Manual Call Points", "Fire Alarm Panels", "Hooters & Sirens",
    ],
    benefits: ["Early Fire Detection", "Regulatory Compliance", "Faster Emergency Response", "Reduced Property Damage"],
    slug: "/services/fire-alarm",
  },
  {
    id: "access-control",
    title: "Access Control Systems",
    shortDesc: "Secure entry management using biometric authentication, RFID cards, facial recognition, and centralized user administration.",
    overview: "Control who enters your premises using secure authentication technologies and centralized management.",
    icon: "🔐",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=500&fit=crop&auto=format",
    features: [
      "Biometric Systems", "RFID Access", "Facial Recognition",
      "Mobile Access", "Smart Card Access", "Visitor Management", "Door Controllers",
    ],
    benefits: ["Increased Security", "Employee Tracking", "Visitor Monitoring", "Centralized Management"],
    slug: "/services/access-control",
  },
  {
    id: "time-attendance",
    title: "Time Attendance Systems",
    shortDesc: "Automate employee attendance tracking with biometric and cloud-based attendance solutions integrated with HR systems.",
    overview: "Automate employee attendance with intelligent biometric and cloud-based attendance solutions integrated with payroll and HR systems.",
    icon: "⏱",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=500&fit=crop&auto=format",
    features: [
      "Fingerprint", "Face Recognition", "RFID",
      "Cloud Attendance", "Mobile Attendance", "Shift Management",
    ],
    benefits: ["Accurate Attendance", "HR Integration", "Payroll Automation", "Productivity Reports"],
    slug: "/services/time-attendance",
  },
  {
    id: "public-address",
    title: "Public Address Systems",
    shortDesc: "Deliver clear announcements and emergency notifications across educational institutions, hospitals, industries, and commercial spaces.",
    overview: "Deliver clear voice communication for routine announcements and emergency situations across campuses, offices, factories, and public spaces.",
    icon: "📢",
    image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=800&h=500&fit=crop&auto=format",
    features: ["Zone Paging", "Emergency Broadcast", "Background Music", "Voice Evacuation"],
    benefits: ["Clear Communication", "Emergency Response", "Zone Management", "Energy Efficient"],
    applications: ["Schools", "Hospitals", "Industries", "Airports", "Shopping Malls", "Offices"],
    slug: "/services/public-address",
  },
  {
    id: "video-door-phone",
    title: "Video Door Phone Systems",
    shortDesc: "Enhance visitor management with high-definition audio and video communication for homes, apartments, and offices.",
    overview: "Enhance visitor communication and access control through advanced video intercom systems.",
    icon: "📱",
    image: "https://images.unsplash.com/photo-1558002038-1055907df827?w=800&h=500&fit=crop&auto=format",
    features: ["HD Video Calling", "Two-Way Audio", "Mobile App Integration", "Remote Unlock", "Night Vision", "Recording"],
    benefits: ["Enhanced Security", "Visitor Control", "Remote Access", "Easy Integration"],
    applications: ["Apartments", "Villas", "Corporate Offices", "Commercial Buildings"],
    slug: "/services/video-door-phone",
  },
  {
    id: "boom-barrier",
    title: "Boom Barrier Systems",
    shortDesc: "Automate vehicle entry and exit with intelligent boom barrier systems for parking lots, industrial facilities, and residential communities.",
    overview: "Automate vehicle entry and exit using intelligent boom barrier systems suitable for parking lots, industrial facilities, and residential communities.",
    icon: "🚧",
    image: "https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=800&h=500&fit=crop&auto=format",
    features: ["RFID Integration", "ANPR Integration", "Fast Opening", "Heavy Duty Design", "Remote Operation"],
    benefits: ["Traffic Control", "Improved Security", "Reduced Manual Operation"],
    slug: "/services/boom-barrier",
  },
  {
    id: "networking",
    title: "Structured Networking Solutions",
    shortDesc: "Structured cabling, LAN, Wi-Fi, fiber optics, server racks, switches, and enterprise-grade network infrastructure.",
    overview: "Build reliable communication infrastructure with enterprise-grade networking solutions.",
    icon: "🌐",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=500&fit=crop&auto=format",
    features: ["LAN", "WAN", "Fiber Optic Cabling", "Wi-Fi Infrastructure", "Server Rack Installation", "Network Security", "Structured Cabling", "Switch Configuration"],
    benefits: ["High-Speed Connectivity", "Stable Network", "Future Scalability"],
    slug: "/services/networking",
  },
  {
    id: "automation",
    title: "Home & Building Automation",
    shortDesc: "Create intelligent spaces with integrated lighting, climate control, security, and energy management systems.",
    overview: "Transform traditional buildings into intelligent environments using integrated automation technologies.",
    icon: "🏠",
    image: "https://images.unsplash.com/photo-1558618047-3c8c9bb6cf44?w=800&h=500&fit=crop&auto=format",
    features: ["Smart Lighting", "Smart Locks", "Climate Control", "Curtain Automation", "Energy Monitoring", "Mobile Control"],
    benefits: ["Convenience", "Energy Efficiency", "Enhanced Security", "Remote Management"],
    slug: "/services/automation",
  },
];

export const INDUSTRIES = [
  {
    id: "corporate",
    title: "Corporate Offices",
    desc: "Enterprise surveillance, access control, networking, visitor management.",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=400&fit=crop&auto=format",
    icon: "🏢",
  },
  {
    id: "manufacturing",
    title: "Manufacturing Plants",
    desc: "Industrial surveillance, fire safety, perimeter security.",
    image: "https://images.unsplash.com/photo-1565793079479-ef2f800fd2b5?w=600&h=400&fit=crop&auto=format",
    icon: "🏭",
  },
  {
    id: "education",
    title: "Educational Institutions",
    desc: "Campus surveillance, attendance, public address systems.",
    image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600&h=400&fit=crop&auto=format",
    icon: "🎓",
  },
  {
    id: "healthcare",
    title: "Hospitals & Healthcare",
    desc: "Patient safety, access control, emergency communication.",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&h=400&fit=crop&auto=format",
    icon: "🏥",
  },
  {
    id: "hotels",
    title: "Hotels & Hospitality",
    desc: "Guest safety, perimeter monitoring, integrated security systems.",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&h=400&fit=crop&auto=format",
    icon: "🏨",
  },
  {
    id: "warehouses",
    title: "Warehouses & Logistics",
    desc: "Perimeter protection, vehicle monitoring, inventory surveillance.",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&h=400&fit=crop&auto=format",
    icon: "📦",
  },
  {
    id: "retail",
    title: "Retail Stores",
    desc: "Loss prevention, customer analytics, inventory monitoring.",
    image: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=600&h=400&fit=crop&auto=format",
    icon: "🛍",
  },
  {
    id: "residential",
    title: "Residential Communities",
    desc: "Video door phones, CCTV, home automation.",
    image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=600&h=400&fit=crop&auto=format",
    icon: "🏘",
  },
  {
    id: "government",
    title: "Government Organizations",
    desc: "Integrated surveillance and command center solutions.",
    image: "https://images.unsplash.com/photo-1569025743873-ea3a9ade89f9?w=600&h=400&fit=crop&auto=format",
    icon: "🏛",
  },
  {
    id: "banking",
    title: "Banking & Financial",
    desc: "High-security surveillance, vault protection, access control.",
    image: "https://images.unsplash.com/photo-1601597111158-2fceff292cdc?w=600&h=400&fit=crop&auto=format",
    icon: "🏦",
  },
];

export const TESTIMONIALS = [
  {
    quote: "VRAT System Integrators delivered a highly reliable surveillance solution for our corporate office. Their professionalism and after-sales support have been exceptional.",
    client: "Corporate Client",
    sector: "Corporate Office",
  },
  {
    quote: "The installation was completed on time, and the integrated security solution has significantly improved campus safety.",
    client: "Educational Institution",
    sector: "Education",
  },
  {
    quote: "Their technical expertise and commitment to quality made them the ideal partner for our manufacturing facility.",
    client: "Industrial Client",
    sector: "Manufacturing",
  },
];

export const PROCESS_STEPS = [
  { step: "01", title: "Consultation & Site Survey", desc: "Understanding your infrastructure and security requirements." },
  { step: "02", title: "System Design", desc: "Preparing customized solution architecture and project planning." },
  { step: "03", title: "Installation", desc: "Professional installation by certified engineers." },
  { step: "04", title: "Testing & Commissioning", desc: "Comprehensive testing to ensure optimal performance." },
  { step: "05", title: "Training", desc: "User training for efficient system operation." },
  { step: "06", title: "Maintenance & Support", desc: "Regular maintenance and prompt technical support." },
];

export const WHY_VRAT = [
  { title: "Experienced Team", desc: "Our certified professionals possess years of expertise in planning, installing, and maintaining integrated security solutions across multiple industries." },
  { title: "End-to-End Solutions", desc: "From consultation and system design to installation, training, and ongoing maintenance, we manage the complete project lifecycle." },
  { title: "Quality Products", desc: "We partner with globally recognized technology brands to deliver reliable, durable, and future-ready solutions." },
  { title: "24×7 Technical Support", desc: "Our dedicated support team ensures prompt assistance, preventive maintenance, and rapid issue resolution whenever required." },
  { title: "Customized Solutions", desc: "Every project is designed according to the customer's infrastructure, operational requirements, and budget." },
  { title: "Proven Track Record", desc: "Successfully delivering projects across commercial, industrial, educational, healthcare, and residential sectors." },
];

export const TIMELINE = [
  { year: "2007", event: "Company established with a vision to provide electronic security solutions." },
  { year: "2010", event: "Expanded services to include CCTV surveillance and access control systems." },
  { year: "2013", event: "Entered industrial and commercial infrastructure projects." },
  { year: "2016", event: "Introduced fire alarm systems and public address solutions." },
  { year: "2019", event: "Successfully completed large-scale projects across educational institutions and healthcare facilities." },
  { year: "2022", event: "Expanded into smart building automation and integrated networking solutions." },
  { year: "2026", event: "Delivering AI-enabled surveillance, cloud monitoring, and advanced integrated security solutions across multiple industries." },
];

export const CORE_VALUES = [
  { title: "Integrity", desc: "We conduct every project with honesty, transparency, and professionalism." },
  { title: "Customer First", desc: "Every solution is designed with our customer's requirements and long-term success in mind." },
  { title: "Innovation", desc: "We continuously adopt emerging technologies to provide smarter, more efficient solutions." },
  { title: "Quality", desc: "We never compromise on the quality of products, installation, or service." },
  { title: "Excellence", desc: "We strive to exceed expectations through precision, reliability, and continuous improvement." },
  { title: "Teamwork", desc: "Collaboration among our engineers, technicians, and support staff enables us to deliver exceptional results." },
];

export const FAQS = [
  {
    q: "How long does installation take?",
    a: "Project timelines depend on the project size and complexity. Small installations may take a few days, while larger integrated projects may require several weeks.",
  },
  {
    q: "Do you provide Annual Maintenance Contracts?",
    a: "Yes, we offer preventive and corrective maintenance through flexible AMC plans.",
  },
  {
    q: "Can your systems integrate with existing infrastructure?",
    a: "Yes. Our engineers assess your current setup and recommend the best integration approach.",
  },
  {
    q: "Do you provide training after installation?",
    a: "Absolutely. We train your staff to operate and manage the installed systems effectively.",
  },
];
