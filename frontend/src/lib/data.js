import {
  Gauge, MonitorCog, LineChart, UtensilsCrossed, Megaphone,
  Sparkles, Users, Building2, Leaf,
} from "lucide-react";

export const CONTACT = {
  email: "info@kencroftstrategy.in",
  phone: "+91 8909206368",
  phoneRaw: "918909206368",
};

export const IMG = {
  hero: "https://images.unsplash.com/photo-1767460189627-be43d57fe1c2?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA2MDV8MHwxfHNlYXJjaHwzfHxsdXh1cnklMjBob3RlbCUyMGV4dGVyaW9yJTIwbmlnaHR0aW1lfGVufDB8fHx8MTc4NjA3NTU1N3ww&ixlib=rb-4.1.0&q=85",
  about: "https://images.unsplash.com/photo-1684498017911-ffc0e7039752?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzNTl8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob3NwaXRhbGl0eSUyMGFyY2hpdGVjdHVyZXxlbnwwfHx8fDE3ODYwNzU1NTd8MA&ixlib=rb-4.1.0&q=85",
  about2: "https://images.pexels.com/photos/5778520/pexels-photo-5778520.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  process: "https://images.unsplash.com/photo-1779700210487-a01758a3c55a?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1NTN8MHwxfHNlYXJjaHwxfHxleGVjdXRpdmVzJTIwbWVldGluZyUyMHN0cmF0ZWd5JTIwbHV4dXJ5fGVufDB8fHx8MTc4NjA3NTU1Nnww&ixlib=rb-4.1.0&q=85",
  meeting: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxOTB8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGV4ZWN1dGl2ZXMlMjBtZWV0aW5nJTIwc3RyYXRlZ3l8ZW58MHx8fHwxNzg2MDc1NjI5fDA&ixlib=rb-4.1.0&q=85",
};

export const SERVICES = [
  { id: "operations", icon: Gauge, title: "Operations & Audits", tagline: "Precision-engineered hotel operations",
    items: ["Operational Audits", "SOP Development", "Process Optimization", "Performance Benchmarking", "Quality Assurance"],
    image: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1OTV8MHwxfHNlYXJjaHwzfHxoaWdoJTIwZW5kJTIwcmVzb3J0JTIwbHV4dXJ5fGVufDB8fHx8MTc4NjA3NTU1N3ww&ixlib=rb-4.1.0&q=85" },
  { id: "pms", icon: MonitorCog, title: "PMS Consulting", tagline: "Technology that runs your property",
    items: ["PMS Selection", "PMS Implementation", "Technology Integration", "Workflow Optimization"],
    image: "https://images.unsplash.com/photo-1558959357-685f9c7ace7b?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1NTZ8MHwxfHNlYXJjaHwyfHxwcmVtaXVtJTIwaG90ZWwlMjBjb25jaWVyZ2UlMjBzZXJ2aWNlfGVufDB8fHx8MTc4NjA3NTU1N3ww&ixlib=rb-4.1.0&q=85" },
  { id: "revenue", icon: LineChart, title: "Revenue & Finance", tagline: "Maximise profitability per key",
    items: ["Revenue Management", "Pricing Strategy", "Income Audits", "Financial Analysis", "Profitability Improvement"],
    image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxOTB8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGV4ZWN1dGl2ZXMlMjBtZWV0aW5nJTIwc3RyYXRlZ3l8ZW58MHx8fHwxNzg2MDc1NjI5fDA&ixlib=rb-4.1.0&q=85" },
  { id: "fnb", icon: UtensilsCrossed, title: "Food & Beverage", tagline: "Outlets that delight and earn",
    items: ["Restaurant Strategy", "Kitchen Operations", "Cost Control", "Menu Engineering", "Outlet Optimization"],
    image: "https://images.unsplash.com/photo-1776993298576-dd8a9205926f?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxOTJ8MHwxfHNlYXJjaHwzfHxmaW5lJTIwZGluaW5nJTIwcmVzdGF1cmFudCUyMGVsZWdhbnQlMjBpbnRlcmlvcnxlbnwwfHx8fDE3ODYwNzU2Mjh8MA&ixlib=rb-4.1.0&q=85" },
  { id: "sales", icon: Megaphone, title: "Sales & Marketing", tagline: "Fill rooms with the right guests",
    items: ["Hotel Marketing Strategy", "Sales Planning", "Brand Positioning", "Business Development", "Digital Marketing Strategy"],
    image: "https://images.unsplash.com/photo-1581091877018-dac6a371d50f?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxOTB8MHwxfHNlYXJjaHwzfHxidXNpbmVzcyUyMGV4ZWN1dGl2ZXMlMjBtZWV0aW5nJTIwc3RyYXRlZ3l8ZW58MHx8fHwxNzg2MDc1NjI5fDA&ixlib=rb-4.1.0&q=85" },
  { id: "guest", icon: Sparkles, title: "Guest Experience", tagline: "Moments that create loyalty",
    items: ["Guest Journey Mapping", "Service Excellence", "Reputation Management", "Customer Experience Enhancement"],
    image: "https://images.unsplash.com/photo-1660557989725-f511e9fa6267?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxOTF8MHwxfHNlYXJjaHwyfHxib3V0aXF1ZSUyMGhvdGVsJTIwbG9iYnklMjBsdXh1cnl8ZW58MHx8fHwxNzg2MDc1NjI4fDA&ixlib=rb-4.1.0&q=85" },
  { id: "hr", icon: Users, title: "HR & Training", tagline: "Teams that deliver five stars",
    items: ["Staff Training", "Leadership Development", "SOP Training", "Organizational Development", "Performance Management"],
    image: "https://images.unsplash.com/photo-1624555130581-1d9cca783bc0?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxOTB8MHwxfHNlYXJjaHwyfHxidXNpbmVzcyUyMGV4ZWN1dGl2ZXMlMjBtZWV0aW5nJTIwc3RyYXRlZ3l8ZW58MHx8fHwxNzg2MDc1NjI5fDA&ixlib=rb-4.1.0&q=85" },
  { id: "preopening", icon: Building2, title: "Pre-Opening Consulting", tagline: "Launch flawlessly, on time",
    items: ["Hotel Pre-opening Planning", "Recruitment", "Vendor Coordination", "Operational Setup", "Launch Strategy"],
    image: "https://images.unsplash.com/photo-1780491250090-16aa696f83eb?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2OTV8MHwxfHNlYXJjaHwzfHxsdXh1cnklMjBob3RlbCUyMGV4dGVyaW9yJTIwYXJjaGl0ZWN0dXJlfGVufDB8fHx8MTc4NjA3NTYyOHww&ixlib=rb-4.1.0&q=85" },
  { id: "tech", icon: Leaf, title: "Technology & Sustainability", tagline: "Future-proof and responsible",
    items: ["Digital Transformation", "Hospitality Technology", "Automation", "Sustainability Consulting", "ESG Practices"],
    image: "https://images.unsplash.com/photo-1772903191730-fa9bc478c1de?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2OTV8MHwxfHNlYXJjaHw0fHxsdXh1cnklMjBob3RlbCUyMGV4dGVyaW9yJTIwYXJjaGl0ZWN0dXJlfGVufDB8fHx8MTc4NjA3NTYyOHww&ixlib=rb-4.1.0&q=85" },
];

export const INDUSTRIES = [
  { title: "Luxury Hotels", desc: "Five-star flagships and grand palaces.", image: "https://images.unsplash.com/photo-1780491250090-16aa696f83eb?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2OTV8MHwxfHNlYXJjaHwzfHxsdXh1cnklMjBob3RlbCUyMGV4dGVyaW9yJTIwYXJjaGl0ZWN0dXJlfGVufDB8fHx8MTc4NjA3NTYyOHww&ixlib=rb-4.1.0&q=85" },
  { title: "Resorts", desc: "Destination and leisure properties.", image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjY2NzV8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjByZXNvcnQlMjBwb29sJTIwb2NlYW58ZW58MHx8fHwxNzg2MDc1NjI4fDA&ixlib=rb-4.1.0&q=85" },
  { title: "Boutique Hotels", desc: "Distinctive, design-led stays.", image: "https://images.unsplash.com/photo-1692153142524-60285a93c249?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxOTF8MHwxfHNlYXJjaHw0fHxib3V0aXF1ZSUyMGhvdGVsJTIwbG9iYnklMjBsdXh1cnl8ZW58MHx8fHwxNzg2MDc1NjI4fDA&ixlib=rb-4.1.0&q=85" },
  { title: "Hotel Chains", desc: "Multi-property portfolios & brands.", image: "https://images.unsplash.com/photo-1772903191730-fa9bc478c1de?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2OTV8MHwxfHNlYXJjaHw0fHxsdXh1cnklMjBob3RlbCUyMGV4dGVyaW9yJTIwYXJjaGl0ZWN0dXJlfGVufDB8fHx8MTc4NjA3NTYyOHww&ixlib=rb-4.1.0&q=85" },
  { title: "Restaurants", desc: "Standalone & hotel F&B outlets.", image: "https://images.unsplash.com/photo-1776993298456-98c71c0e177e?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxOTJ8MHwxfHNlYXJjaHwyfHxmaW5lJTIwZGluaW5nJTIwcmVzdGF1cmFudCUyMGVsZWdhbnQlMjBpbnRlcmlvcnxlbnwwfHx8fDE3ODYwNzU2Mjh8MA&ixlib=rb-4.1.0&q=85" },
  { title: "Hospitality Investors", desc: "Owners, funds & asset managers.", image: "https://images.unsplash.com/photo-1624555130581-1d9cca783bc0?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxOTB8MHwxfHNlYXJjaHwyfHxidXNpbmVzcyUyMGV4ZWN1dGl2ZXMlMjBtZWV0aW5nJTIwc3RyYXRlZ3l8ZW58MHx8fHwxNzg2MDc1NjI5fDA&ixlib=rb-4.1.0&q=85" },
  { title: "New Hotel Projects", desc: "Ground-up developments & launches.", image: "https://images.unsplash.com/photo-1678913308053-316cee77afe9?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2OTV8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob3RlbCUyMGV4dGVyaW9yJTIwYXJjaGl0ZWN0dXJlfGVufDB8fHx8MTc4NjA3NTYyOHww&ixlib=rb-4.1.0&q=85" },
  { title: "Management Companies", desc: "Operators scaling with excellence.", image: "https://images.unsplash.com/photo-1660557989725-f511e9fa6267?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxOTF8MHwxfHNlYXJjaHwyfHxib3V0aXF1ZSUyMGhvdGVsJTIwbG9iYnklMjBsdXh1cnl8ZW58MHx8fHwxNzg2MDc1NjI4fDA&ixlib=rb-4.1.0&q=85" },
];

export const WHY = [
  { title: "Hospitality Specialists", desc: "We work exclusively in hospitality — nothing else." },
  { title: "Data-Driven Consulting", desc: "Every recommendation grounded in evidence and benchmarks." },
  { title: "Practical Implementation", desc: "We stay until strategy becomes measurable reality." },
  { title: "Sustainable Growth", desc: "Performance built to compound, not spike." },
  { title: "Tailored Strategies", desc: "No templates. Bespoke to your property and market." },
  { title: "Measurable Results", desc: "Defined KPIs, transparent reporting, real ROI." },
];

export const PROCESS = [
  { n: "01", title: "Discovery", desc: "We immerse ourselves in your property, market and ambitions to understand what truly drives your business." },
  { n: "02", title: "Assessment", desc: "A rigorous diagnostic of operations, finance, and guest experience, benchmarked against the best in class." },
  { n: "03", title: "Strategic Planning", desc: "A bespoke roadmap with prioritised initiatives, clear KPIs, and a defined return on investment." },
  { n: "04", title: "Implementation", desc: "Hands-on execution alongside your teams — SOPs, systems, training, and change management." },
  { n: "05", title: "Monitoring", desc: "Live performance tracking against targets with transparent, executive-level reporting." },
  { n: "06", title: "Continuous Improvement", desc: "We refine and optimise so results compound quarter after quarter." },
];

export const STATS = [
  { value: 320, suffix: "+", label: "Hotels Advised" },
  { value: 540, suffix: "+", label: "Projects Delivered" },
  { value: 1200, suffix: "+", label: "Operational Improvements" },
  { value: 27, suffix: "%", label: "Avg. Revenue Growth" },
  { value: 98, suffix: "%", label: "Client Satisfaction" },
];

export const TESTIMONIALS = [
  { quote: "Kencroft rebuilt our revenue strategy from the ground up. Within two quarters our RevPAR outperformed every competitor in our set.", name: "Aditya Menon", role: "Managing Director, Coastal Luxury Collection" },
  { quote: "The most rigorous operational audit we have ever commissioned. Practical, precise, and delivered with genuine hospitality expertise.", name: "Sofia Marchetti", role: "General Manager, Grand Meridian Palace" },
  { quote: "They didn't hand us a deck and leave. They stayed, trained our teams, and the results speak for themselves.", name: "Rajiv Kapoor", role: "Owner, Serenity Resorts Group" },
  { quote: "Our pre-opening was flawless because of Kencroft. On time, on budget, and fully operational from day one.", name: "Elena Vasquez", role: "VP Development, Aurelia Hotels" },
];

export const FAQS = [
  { q: "What types of hospitality businesses do you work with?", a: "We partner with luxury hotels, resorts, boutique properties, hotel chains, restaurants, hospitality investors, new hotel projects, and management companies across all stages of the lifecycle." },
  { q: "How is Kencroft different from a generic management consultancy?", a: "We work exclusively in hospitality. Our consultants come from operational hotel backgrounds, so our recommendations are grounded in the realities of running a property — not theory." },
  { q: "Do you only advise, or do you help with implementation?", a: "Both. Strategy without execution is worthless. We stay hands-on through implementation, training your teams and embedding SOPs until results are measurable." },
  { q: "How long does a typical engagement last?", a: "Engagements range from focused 4–6 week audits to multi-year transformation and pre-opening mandates. We scope every project to your specific objectives." },
  { q: "How do you measure success?", a: "Every engagement begins with defined KPIs — RevPAR, GOP margin, guest satisfaction, cost ratios — and transparent reporting against them throughout." },
  { q: "Do you work internationally?", a: "Yes. Our team advises properties and groups globally, adapting strategy to each market's dynamics and regulatory environment." },
];

export const POSTS = [
  { slug: "revenue-management-2026", category: "Revenue", title: "The New Rules of Hotel Revenue Management in 2026", excerpt: "Dynamic pricing has evolved beyond OTAs. Here is how leading properties are capturing demand across every channel.", image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjY2NzV8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjByZXNvcnQlMjBwb29sJTIwb2NlYW58ZW58MHx8fHwxNzg2MDc1NjI4fDA&ixlib=rb-4.1.0&q=85", date: "May 12, 2026", read: "6 min" },
  { slug: "guest-experience-loyalty", category: "Guest Experience", title: "Designing a Guest Journey That Builds Lifelong Loyalty", excerpt: "Loyalty is engineered, not accidental. A framework for mapping and elevating every touchpoint of the stay.", image: "https://images.unsplash.com/photo-1692153142524-60285a93c249?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxOTF8MHwxfHNlYXJjaHw0fHxib3V0aXF1ZSUyMGhvdGVsJTIwbG9iYnklMjBsdXh1cnl8ZW58MHx8fHwxNzg2MDc1NjI4fDA&ixlib=rb-4.1.0&q=85", date: "Apr 28, 2026", read: "5 min" },
  { slug: "fnb-profitability", category: "Food & Beverage", title: "Menu Engineering: Turning F&B From Cost Centre to Profit Engine", excerpt: "Most hotel restaurants leave margin on the table. A disciplined approach to menu design and cost control.", image: "https://images.unsplash.com/photo-1776993298576-dd8a9205926f?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxOTJ8MHwxfHNlYXJjaHwzfHxmaW5lJTIwZGluaW5nJTIwcmVzdGF1cmFudCUyMGVsZWdhbnQlMjBpbnRlcmlvcnxlbnwwfHx8fDE3ODYwNzU2Mjh8MA&ixlib=rb-4.1.0&q=85", date: "Apr 09, 2026", read: "7 min" },
  { slug: "pre-opening-playbook", category: "Pre-Opening", title: "The Pre-Opening Playbook: Launching a Hotel Without Chaos", excerpt: "The 18-month countdown that separates a smooth launch from an expensive scramble.", image: "https://images.unsplash.com/photo-1780491250090-16aa696f83eb?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2OTV8MHwxfHNlYXJjaHwzfHxsdXh1cnklMjBob3RlbCUyMGV4dGVyaW9yJTIwYXJjaGl0ZWN0dXJlfGVufDB8fHx8MTc4NjA3NTYyOHww&ixlib=rb-4.1.0&q=85", date: "Mar 22, 2026", read: "8 min" },
  { slug: "sustainability-esg", category: "Sustainability", title: "ESG in Hospitality: Beyond the Green Marketing", excerpt: "Guests and investors now demand credible sustainability. Building an ESG programme that actually performs.", image: "https://images.unsplash.com/photo-1772903191730-fa9bc478c1de?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2OTV8MHwxfHNlYXJjaHw0fHxsdXh1cnklMjBob3RlbCUyMGV4dGVyaW9yJTIwYXJjaGl0ZWN0dXJlfGVufDB8fHx8MTc4NjA3NTYyOHww&ixlib=rb-4.1.0&q=85", date: "Mar 05, 2026", read: "6 min" },
  { slug: "operational-audit-signs", category: "Operations", title: "Five Signs Your Hotel Needs an Operational Audit", excerpt: "Rising costs and slipping reviews are symptoms. Here is how to diagnose the underlying operational drift.", image: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1OTV8MHwxfHNlYXJjaHwzfHxoaWdoJTIwZW5kJTIwcmVzb3J0JTIwbHV4dXJ5fGVufDB8fHx8MTc4NjA3NTU1N3ww&ixlib=rb-4.1.0&q=85", date: "Feb 18, 2026", read: "5 min" },
];

export const PROPERTY_TYPES = ["Luxury Hotel", "Resort", "Boutique Hotel", "Hotel Chain", "Restaurant", "New Development", "Other"];
export const TIMELINES = ["Immediately", "1–3 months", "3–6 months", "6–12 months", "Just exploring"];
export const SERVICE_OPTIONS = SERVICES.map((s) => s.title);
