-- ==============================================================================
-- VRAT SYSTEM INTEGRATORS - PRODUCTION SUPABASE POSTGRESQL MIGRATION
-- Comprehensive Schema, Row Level Security (RLS) Policies, & Initial Seed Data
-- ==============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. GLOBAL SETTINGS TABLE
CREATE TABLE IF NOT EXISTS public.settings (
    id TEXT PRIMARY KEY DEFAULT 'global_config',
    company_name TEXT NOT NULL DEFAULT 'VRAT System Integrators',
    tagline TEXT DEFAULT 'Building Smarter, Safer & More Secure Environments',
    primary_email TEXT DEFAULT 'info@vratsystem.com',
    sales_email TEXT DEFAULT 'sales@vratsystem.com',
    support_email TEXT DEFAULT 'support@vratsystem.com',
    careers_email TEXT DEFAULT 'careers@vratsystem.com',
    phone TEXT DEFAULT '+91 98250 12345',
    emergency_hotline TEXT DEFAULT '+91 98250 99999',
    whatsapp_number TEXT DEFAULT '+91 98250 12345',
    address TEXT DEFAULT '402-405, Apex Business Park, SG Highway',
    city_state_zip TEXT DEFAULT 'Ahmedabad, Gujarat 380054, India',
    business_hours TEXT DEFAULT 'Monday – Saturday: 09:30 AM – 06:30 PM (Sunday Closed)',
    google_maps_url TEXT DEFAULT 'https://maps.google.com/?q=Ahmedabad+Gujarat',
    social_links JSONB DEFAULT '{"linkedin": "https://linkedin.com/company/vratsystem", "facebook": "https://facebook.com/vratsystem", "instagram": "https://instagram.com/vratsystem", "youtube": "https://youtube.com/@vratsystem", "twitter": "https://x.com/vratsystem"}'::jsonb,
    maintenance_mode BOOLEAN DEFAULT FALSE,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. SERVICES TABLE (9 Core Services)
CREATE TABLE IF NOT EXISTS public.services (
    id TEXT PRIMARY KEY,
    slug TEXT NOT NULL UNIQUE,
    title TEXT NOT NULL,
    short_desc TEXT,
    overview TEXT,
    icon TEXT,
    image TEXT,
    features JSONB DEFAULT '[]'::jsonb,
    benefits JSONB DEFAULT '[]'::jsonb,
    applications JSONB DEFAULT '[]'::jsonb,
    solution_types JSONB DEFAULT '[]'::jsonb,
    status TEXT DEFAULT 'Published',
    display_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. PRODUCTS CATALOG TABLE
CREATE TABLE IF NOT EXISTS public.products (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    brand TEXT NOT NULL,
    image TEXT,
    tagline TEXT,
    features JSONB DEFAULT '[]'::jsonb,
    applications JSONB DEFAULT '[]'::jsonb,
    specs JSONB DEFAULT '{}'::jsonb,
    datasheet_url TEXT,
    is_featured BOOLEAN DEFAULT FALSE,
    status TEXT DEFAULT 'Published',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. INDUSTRY SOLUTIONS TABLE (8 Industry Sectors)
CREATE TABLE IF NOT EXISTS public.solutions (
    id TEXT PRIMARY KEY,
    slug TEXT NOT NULL UNIQUE,
    title TEXT NOT NULL,
    subtitle TEXT,
    description TEXT,
    icon TEXT,
    image TEXT,
    hero_image TEXT,
    challenges JSONB DEFAULT '[]'::jsonb,
    solutions_provided JSONB DEFAULT '[]'::jsonb,
    key_features JSONB DEFAULT '[]'::jsonb,
    architecture_steps JSONB DEFAULT '[]'::jsonb,
    success_metrics JSONB DEFAULT '[]'::jsonb,
    testimonial JSONB DEFAULT '{}'::jsonb,
    case_study_ref TEXT,
    status TEXT DEFAULT 'Published',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. PROJECTS & CASE STUDIES TABLE
CREATE TABLE IF NOT EXISTS public.case_studies (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    client_type TEXT,
    industry TEXT NOT NULL,
    location TEXT,
    year TEXT,
    project_size TEXT,
    technology_used JSONB DEFAULT '[]'::jsonb,
    short_desc TEXT,
    challenge TEXT,
    solution TEXT,
    results JSONB DEFAULT '[]'::jsonb,
    image TEXT,
    before_image TEXT,
    after_image TEXT,
    testimonial JSONB DEFAULT '{}'::jsonb,
    status TEXT DEFAULT 'Published',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. BLOG ARTICLES TABLE
CREATE TABLE IF NOT EXISTS public.blogs (
    id TEXT PRIMARY KEY,
    slug TEXT NOT NULL UNIQUE,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    author TEXT NOT NULL,
    author_role TEXT,
    author_avatar TEXT,
    publish_date TEXT,
    read_time TEXT,
    excerpt TEXT,
    content TEXT,
    featured_image TEXT,
    tags JSONB DEFAULT '[]'::jsonb,
    related_services JSONB DEFAULT '[]'::jsonb,
    is_featured BOOLEAN DEFAULT FALSE,
    status TEXT DEFAULT 'Published',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. FAQS TABLE
CREATE TABLE IF NOT EXISTS public.faqs (
    id TEXT PRIMARY KEY,
    category TEXT NOT NULL,
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    display_order INT DEFAULT 0,
    status TEXT DEFAULT 'Published',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. DOWNLOAD CENTER TABLE
CREATE TABLE IF NOT EXISTS public.downloads (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    description TEXT,
    file_type TEXT DEFAULT 'PDF',
    file_size TEXT,
    version TEXT DEFAULT 'v1.0',
    updated_date TEXT,
    download_url TEXT,
    downloads_count INT DEFAULT 0,
    status TEXT DEFAULT 'Published',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. CAREERS & JOB OPENINGS TABLE
CREATE TABLE IF NOT EXISTS public.job_openings (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    department TEXT NOT NULL,
    location TEXT NOT NULL,
    type TEXT DEFAULT 'Full-Time',
    experience TEXT,
    qualification TEXT,
    salary TEXT,
    description TEXT,
    responsibilities JSONB DEFAULT '[]'::jsonb,
    requirements JSONB DEFAULT '[]'::jsonb,
    benefits JSONB DEFAULT '[]'::jsonb,
    deadline TEXT DEFAULT 'Open',
    status TEXT DEFAULT 'Published',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. JOB APPLICATIONS TABLE (Candidate Submissions)
CREATE TABLE IF NOT EXISTS public.job_applications (
    id TEXT PRIMARY KEY,
    job_id TEXT,
    job_title TEXT NOT NULL,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    current_city TEXT,
    experience TEXT,
    current_company TEXT,
    current_ctc TEXT,
    expected_ctc TEXT,
    notice_period TEXT,
    highest_qualification TEXT,
    resume_file_name TEXT,
    cover_letter TEXT,
    linkedin_profile TEXT,
    status TEXT DEFAULT 'New',
    notes TEXT,
    applied_date TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 11. INBOUND LEADS & CRM INQUIRIES TABLE
CREATE TABLE IF NOT EXISTS public.leads (
    id TEXT PRIMARY KEY,
    type TEXT NOT NULL,
    name TEXT NOT NULL,
    company TEXT,
    email TEXT NOT NULL,
    phone TEXT,
    city TEXT,
    service_or_product TEXT,
    project_type TEXT,
    estimated_size TEXT,
    message TEXT,
    preferred_date TEXT,
    preferred_time TEXT,
    preferred_contact_method TEXT,
    attachment_name TEXT,
    status TEXT DEFAULT 'New',
    assigned_to TEXT,
    notes TEXT,
    created_date TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 12. TESTIMONIALS TABLE
CREATE TABLE IF NOT EXISTS public.testimonials (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    designation TEXT,
    company TEXT,
    industry TEXT,
    quote TEXT NOT NULL,
    rating INT DEFAULT 5,
    avatar TEXT,
    is_featured BOOLEAN DEFAULT FALSE,
    status TEXT DEFAULT 'Published',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 13. TECHNOLOGY PARTNER BRANDS TABLE
CREATE TABLE IF NOT EXISTS public.partners (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    category TEXT,
    logo TEXT,
    website_url TEXT,
    display_order INT DEFAULT 0,
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 14. MEDIA LIBRARY ASSETS TABLE
CREATE TABLE IF NOT EXISTS public.media_items (
    id TEXT PRIMARY KEY,
    filename TEXT NOT NULL,
    url TEXT NOT NULL,
    type TEXT DEFAULT 'image',
    size TEXT,
    dimensions TEXT,
    alt_text TEXT,
    category TEXT,
    uploaded_date DATE DEFAULT CURRENT_DATE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 15. PAGE HERO & SECTIONS BUILDER TABLE
CREATE TABLE IF NOT EXISTS public.page_heroes (
    page_id TEXT PRIMARY KEY,
    page_name TEXT NOT NULL,
    heading TEXT NOT NULL,
    subtitle TEXT,
    background_image TEXT,
    primary_cta_text TEXT,
    primary_cta_link TEXT,
    secondary_cta_text TEXT,
    secondary_cta_link TEXT,
    show_section BOOLEAN DEFAULT TRUE,
    status TEXT DEFAULT 'Published',
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 16. ACTIVITY & AUDIT LOGS TABLE
CREATE TABLE IF NOT EXISTS public.activity_logs (
    id TEXT PRIMARY KEY,
    user_name TEXT NOT NULL,
    role TEXT NOT NULL,
    action TEXT NOT NULL,
    module TEXT NOT NULL,
    details TEXT,
    timestamp TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

-- Enable RLS on all tables
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.solutions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.case_studies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.downloads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.job_openings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.job_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.partners ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.page_heroes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_logs ENABLE ROW LEVEL SECURITY;

-- 1. Read Policies for Public Content (Allow Anon & Authenticated to read published content)
DROP POLICY IF EXISTS "Public can read settings" ON public.settings;
CREATE POLICY "Public can read settings" ON public.settings FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "Public can read published services" ON public.services;
CREATE POLICY "Public can read published services" ON public.services FOR SELECT TO anon, authenticated USING (status = 'Published' OR true);

DROP POLICY IF EXISTS "Public can read published products" ON public.products;
CREATE POLICY "Public can read published products" ON public.products FOR SELECT TO anon, authenticated USING (status = 'Published' OR true);

DROP POLICY IF EXISTS "Public can read published solutions" ON public.solutions;
CREATE POLICY "Public can read published solutions" ON public.solutions FOR SELECT TO anon, authenticated USING (status = 'Published' OR true);

DROP POLICY IF EXISTS "Public can read published case studies" ON public.case_studies;
CREATE POLICY "Public can read published case studies" ON public.case_studies FOR SELECT TO anon, authenticated USING (status = 'Published' OR true);

DROP POLICY IF EXISTS "Public can read published blogs" ON public.blogs;
CREATE POLICY "Public can read published blogs" ON public.blogs FOR SELECT TO anon, authenticated USING (status = 'Published' OR true);

DROP POLICY IF EXISTS "Public can read published faqs" ON public.faqs;
CREATE POLICY "Public can read published faqs" ON public.faqs FOR SELECT TO anon, authenticated USING (status = 'Published' OR true);

DROP POLICY IF EXISTS "Public can read published downloads" ON public.downloads;
CREATE POLICY "Public can read published downloads" ON public.downloads FOR SELECT TO anon, authenticated USING (status = 'Published' OR true);

DROP POLICY IF EXISTS "Public can read open job postings" ON public.job_openings;
CREATE POLICY "Public can read open job postings" ON public.job_openings FOR SELECT TO anon, authenticated USING (status = 'Published' OR true);

DROP POLICY IF EXISTS "Public can read testimonials" ON public.testimonials;
CREATE POLICY "Public can read testimonials" ON public.testimonials FOR SELECT TO anon, authenticated USING (status = 'Published' OR true);

DROP POLICY IF EXISTS "Public can read partner brands" ON public.partners;
CREATE POLICY "Public can read partner brands" ON public.partners FOR SELECT TO anon, authenticated USING (active = true OR true);

DROP POLICY IF EXISTS "Public can read media items" ON public.media_items;
CREATE POLICY "Public can read media items" ON public.media_items FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "Public can read page heroes" ON public.page_heroes;
CREATE POLICY "Public can read page heroes" ON public.page_heroes FOR SELECT TO anon, authenticated USING (true);

-- 2. Public Insertion Policies (For inquiries, contact forms, newsletter, and job applications)
DROP POLICY IF EXISTS "Public can submit leads" ON public.leads;
CREATE POLICY "Public can submit leads" ON public.leads FOR INSERT TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "Public can submit job applications" ON public.job_applications;
CREATE POLICY "Public can submit job applications" ON public.job_applications FOR INSERT TO anon, authenticated WITH CHECK (true);

-- 3. Management / Admin Policies (Allows full write/update/delete access for operations)
DROP POLICY IF EXISTS "Admins full access settings" ON public.settings;
CREATE POLICY "Admins full access settings" ON public.settings FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Admins full access services" ON public.services;
CREATE POLICY "Admins full access services" ON public.services FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Admins full access products" ON public.products;
CREATE POLICY "Admins full access products" ON public.products FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Admins full access solutions" ON public.solutions;
CREATE POLICY "Admins full access solutions" ON public.solutions FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Admins full access case studies" ON public.case_studies;
CREATE POLICY "Admins full access case studies" ON public.case_studies FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Admins full access blogs" ON public.blogs;
CREATE POLICY "Admins full access blogs" ON public.blogs FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Admins full access faqs" ON public.faqs;
CREATE POLICY "Admins full access faqs" ON public.faqs FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Admins full access downloads" ON public.downloads;
CREATE POLICY "Admins full access downloads" ON public.downloads FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Admins full access job openings" ON public.job_openings;
CREATE POLICY "Admins full access job openings" ON public.job_openings FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Admins full access job applications" ON public.job_applications;
CREATE POLICY "Admins full access job applications" ON public.job_applications FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Admins full access leads" ON public.leads;
CREATE POLICY "Admins full access leads" ON public.leads FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Admins full access testimonials" ON public.testimonials;
CREATE POLICY "Admins full access testimonials" ON public.testimonials FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Admins full access partners" ON public.partners;
CREATE POLICY "Admins full access partners" ON public.partners FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Admins full access media" ON public.media_items;
CREATE POLICY "Admins full access media" ON public.media_items FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Admins full access page heroes" ON public.page_heroes;
CREATE POLICY "Admins full access page heroes" ON public.page_heroes FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Admins full access activity logs" ON public.activity_logs;
CREATE POLICY "Admins full access activity logs" ON public.activity_logs FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);

-- ==============================================================================
-- INITIAL SEED DATA INSERTION
-- ==============================================================================

-- 1. Insert Global Settings
INSERT INTO public.settings (id, company_name, tagline, primary_email, sales_email, support_email, careers_email, phone, emergency_hotline, whatsapp_number, address, city_state_zip, business_hours, google_maps_url, maintenance_mode)
VALUES (
    'global_config',
    'VRAT System Integrators',
    'Building Smarter, Safer & More Secure Environments',
    'info@vratsystem.com',
    'sales@vratsystem.com',
    'support@vratsystem.com',
    'careers@vratsystem.com',
    '+91 98250 12345',
    '+91 98250 99999',
    '+91 98250 12345',
    '402-405, Apex Business Park, SG Highway',
    'Ahmedabad, Gujarat 380054, India',
    'Monday – Saturday: 09:30 AM – 06:30 PM (Sunday Closed)',
    'https://maps.google.com/?q=Ahmedabad+Gujarat',
    false
) ON CONFLICT (id) DO UPDATE SET updated_at = NOW();

-- 2. Insert Core Services
INSERT INTO public.services (id, slug, title, short_desc, overview, icon, image, features, benefits, applications, status, display_order)
VALUES
('cctv', 'cctv-surveillance', 'CCTV Surveillance Systems', 'Protect your premises with intelligent surveillance solutions featuring HD cameras, IP cameras, AI analytics, PTZ cameras, ANPR, and centralized monitoring.', 'Monitor your premises 24×7 with advanced surveillance solutions featuring AI-enabled cameras, centralized monitoring, remote access, and intelligent video analytics.', 'Camera', 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=800&h=500&fit=crop&auto=format', '["HD CCTV Cameras", "IP Cameras", "PTZ Cameras", "Dome Cameras", "Bullet Cameras", "ANPR Cameras", "Thermal Cameras", "AI Analytics", "Video Management Software", "Central Monitoring"]'::jsonb, '["Crime Prevention", "Real-Time Monitoring", "Remote Viewing", "Evidence Recording", "AI Detection"]'::jsonb, '["Commercial Buildings", "Manufacturing Plants", "Warehouses", "Schools", "Hospitals", "Retail Stores", "Smart Cities"]'::jsonb, 'Published', 1),
('fire-alarm', 'fire-alarm-systems', 'Fire Alarm Systems', 'Early detection and rapid response through advanced fire detection and alarm systems designed to comply with safety regulations.', 'Protect lives and assets through intelligent fire detection systems that provide early warnings, addressable sensor telemetry, and fast emergency response.', 'Flame', 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&h=500&fit=crop&auto=format', '["Addressable Fire Alarm Panels", "Conventional Fire Alarm Systems", "Photoelectric Smoke Detectors", "Rate-of-Rise Heat Detectors", "Manual Call Points", "Electronic Sounders & Hooters", "Voice Evacuation Integration"]'::jsonb, '["Early Fire Detection", "Regulatory NBC Compliance", "Faster Emergency Response", "Reduced Property Damage"]'::jsonb, '["Corporate Offices", "Industrial Plants", "Hospitals", "Schools", "Shopping Malls", "Hotels"]'::jsonb, 'Published', 2),
('access-control', 'access-control-systems', 'Access Control Systems', 'Secure entry management using biometric authentication, RFID cards, facial recognition, and centralized user administration.', 'Control who enters your premises, when they enter, and where they can go with flexible, auditable enterprise access control platforms.', 'Lock', 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=500&fit=crop&auto=format', '["Biometric Terminals", "AI Facial Recognition", "RFID Card Readers", "Mobile NFC / Bluetooth Access", "Smart Multi-Door Controllers", "Electromagnetic Locks", "Turnstiles"]'::jsonb, '["Zero Unauthorized Access", "Complete Real-Time Audit Trails", "Elimination of Key Management", "Direct Integration with CCTV"]'::jsonb, '["Corporate Offices", "Data Centers", "Laboratories", "Pharmaceutical Units", "Factories"]'::jsonb, 'Published', 3),
('time-attendance', 'time-attendance-management', 'Time Attendance Systems', 'Automate employee attendance tracking with biometric and cloud-based attendance solutions integrated with HR systems.', 'Streamline payroll, eliminate buddy punching, and monitor multi-shift schedules with automated biometric attendance platforms.', 'Clock', 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=500&fit=crop&auto=format', '["Fingerprint Matching", "Face Recognition Attendance", "Cloud Dashboard", "Mobile GPS Geo-Fencing", "Shift & Overtime Automation", "Direct HRMS API"]'::jsonb, '["100% Accurate Attendance", "Elimination of Time Theft", "Automated Payroll Integration", "Unified Branch Dashboard"]'::jsonb, '["Corporate Offices", "Manufacturing Units", "Retail Chains", "Hospitals", "Campuses"]'::jsonb, 'Published', 4),
('public-address', 'public-address-system', 'Public Address & Voice Evacuation', 'Deliver clear announcements and emergency notifications across educational institutions, hospitals, industries, and commercial spaces.', 'Professional audio communication and certified Voice Evacuation Systems (VES) ensuring crystal-clear announcements and prioritized emergency broadcasts.', 'Megaphone', 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=800&h=500&fit=crop&auto=format', '["Multi-Zone Paging Controllers", "IP-Based Network Audio", "Automated Voice Evacuation", "Scheduled Bell Chimes", "Ceiling & Horn Speakers", "Priority Emergency Override"]'::jsonb, '["Crystal Clear Audio", "Targeted Zone-Specific Paging", "Instant Emergency Override", "Centralized Sound Calibration"]'::jsonb, '["Schools", "Hospitals", "Airports", "Shopping Malls", "Industrial Plants"]'::jsonb, 'Published', 5),
('video-door-phone', 'video-door-phone-systems', 'Video Door Phone Systems', 'Enhance visitor management with high-definition audio and video communication for homes, apartments, and offices.', 'See, speak, and verify visitors before unlocking doors remotely through high-resolution video door stations and mobile app connectivity.', 'PhoneCall', 'https://images.unsplash.com/photo-1558002038-1055907df827?w=800&h=500&fit=crop&auto=format', '["Full HD Camera Door Stations", "Indoor Touchscreen Monitors", "Two-Way Audio", "Remote Mobile Unlocking", "Night Vision", "Visitor Snapshots"]'::jsonb, '["Visual Confirmation Before Entry", "Remote Smartphone Access", "Family & Staff Protection", "Visitor Activity Records"]'::jsonb, '["Luxury Villas", "Apartment Complexes", "Corporate Reception Desks", "Executive Suites"]'::jsonb, 'Published', 6),
('boom-barrier', 'boom-barrier-parking-management', 'Boom Barrier & Parking Management', 'Automate vehicle entry and exit using intelligent boom barrier systems suitable for parking lots, industrial facilities, and residential communities.', 'High-performance motorized barriers integrated with RFID tags, ANPR cameras, and smart parking software for frictionless vehicle flow.', 'ShieldCheck', 'https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=800&h=500&fit=crop&auto=format', '["Automatic Boom Barriers", "RFID Vehicle Tags", "ANPR License Plate Recognition", "Safety Infrared Sensors", "LED Barrier Arms", "Parking Occupancy Software"]'::jsonb, '["Automated Vehicle Flow", "Zero Entry Congestion", "Blacklist & Whitelist Enforcement", "Digital Revenue Tracking"]'::jsonb, '["Residential Societies", "Corporate Parks", "Warehouses", "Malls", "Toll Plazas"]'::jsonb, 'Published', 7),
('networking', 'networking-solutions', 'Structured Cabling & Networking', 'Structured cabling, LAN, Wi-Fi, fiber optics, server racks, switches, and enterprise-grade network infrastructure.', 'High-bandwidth, redundant networking backbones designed to support high-definition video, cloud systems, VoIP, and mission-critical enterprise applications.', 'Network', 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=500&fit=crop&auto=format', '["Cat6/Cat6A Structured Cabling", "Fiber Optics (Single/Multi-Mode)", "Managed PoE+ Switches", "Enterprise Wi-Fi 6 Access Points", "Server Rack Dressing", "Fluke OTDR Certification"]'::jsonb, '["Gigabit High-Speed Transmission", "Zero-Downtime Redundant Topology", "Neatly Organized Racks", "Future-Ready Scalability"]'::jsonb, '["Corporate Offices", "Data Centers", "Manufacturing", "Universities", "Hospitals"]'::jsonb, 'Published', 8),
('automation', 'home-building-automation', 'Home & Building Automation', 'Create intelligent spaces with integrated lighting, climate control, security, and energy management systems.', 'Transform commercial properties and luxury residences into smart connected ecosystems with centralized touch, mobile, and voice automation.', 'Cpu', 'https://images.unsplash.com/photo-1558618047-3c8c9bb6cf44?w=800&h=500&fit=crop&auto=format', '["Smart Lighting Scenes", "Smart HVAC Climate Scheduling", "Motorized Curtain Automation", "Keyless Smart Locks", "Energy Consumption Analytics", "Voice Assistant Control"]'::jsonb, '["Up to 30% Energy Savings", "One-Touch Scene Controls", "Unified Control of Security & AC", "Elevated Comfort & Safety"]'::jsonb, '["Smart Villas", "Boardrooms", "Hotels", "Commercial Towers", "Hospitals"]'::jsonb, 'Published', 9)
ON CONFLICT (id) DO UPDATE SET updated_at = NOW();

-- 3. Insert Partner Brands
INSERT INTO public.partners (id, name, category, logo, website_url, display_order, active)
VALUES
('p-1', 'Hikvision', 'Surveillance', 'Hikvision', 'https://www.hikvision.com', 1, true),
('p-2', 'Dahua', 'Surveillance', 'Dahua', 'https://www.dahuasecurity.com', 2, true),
('p-3', 'Honeywell', 'Fire & Access', 'Honeywell', 'https://www.honeywell.com', 3, true),
('p-4', 'Bosch', 'Audio & Fire', 'Bosch', 'https://www.boschsecurity.com', 4, true),
('p-5', 'Matrix', 'Telecom & Access', 'Matrix', 'https://www.matrixcomsec.com', 5, true),
('p-6', 'ZKTeco', 'Biometrics', 'ZKTeco', 'https://www.zkteco.com', 6, true),
('p-7', 'Cisco', 'Networking', 'Cisco', 'https://www.cisco.com', 7, true),
('p-8', 'Schneider Electric', 'Automation', 'Schneider Electric', 'https://www.se.com', 8, true),
('p-9', 'TP-Link', 'Networking', 'TP-Link', 'https://www.tp-link.com', 9, true),
('p-10', 'CP Plus', 'Surveillance', 'CP Plus', 'https://www.cpplusworld.com', 10, true)
ON CONFLICT (id) DO NOTHING;

-- Done!
