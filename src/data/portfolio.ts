export const personalInfo = {
  name: "Yogesh Mahawar",
  title: "Full-Stack Developer & AI Engineer",
  email: "myogesh729@gmail.com",
  phone: "8505072814",
  location: "Jaipur, Rajasthan, India",
  linkedin: "https://linkedin.com/in/yogesh-mahawar-831977272",
  github: "https://github.com/yogeshmahawar",
  bio: "Full-Stack Developer with 2+ years of experience building intelligent web applications. Currently specializing in AI-powered automation, WhatsApp Business API integrations, and scalable Laravel/React architectures at 99isolutions. Passionate about merging traditional web development with modern AI/LLM capabilities.",
  currentRole: "PHP Laravel Developer at 99isolutions",
  availability: "Open to freelance & collaborations",
};

export const skills = [
  {
    category: "Languages",
    icon: "Code2",
    color: "from-violet-500 to-purple-600",
    items: ["PHP", "JavaScript", "TypeScript", "SQL"],
  },
  {
    category: "Frameworks & Libraries",
    icon: "Layers",
    color: "from-blue-500 to-cyan-600",
    items: ["Laravel", "React", "Next.js", "Node.js", "Inertia.js", "Remix", "CakePHP", "jQuery"],
  },
  {
    category: "AI / GenAI",
    icon: "Brain",
    color: "from-pink-500 to-rose-600",
    items: ["LLM Integration", "GenAI", "AI Agent Development", "Prompt Engineering", "AI Answer Node", "OpenAI API"],
  },
  {
    category: "WhatsApp & Messaging",
    icon: "MessageCircle",
    color: "from-green-500 to-emerald-600",
    items: ["WhatsApp Business API", "AI Agent for WhatsApp", "AI Answer Node for WhatsApp", "Webhook Handling", "Message Templates"],
  },
  {
    category: "CMS & E-commerce",
    icon: "ShoppingBag",
    color: "from-orange-500 to-amber-600",
    items: ["Shopify App Development", "WordPress", "WooCommerce", "GraphQL", "REST API"],
  },
  {
    category: "Architecture & Design",
    icon: "GitBranch",
    color: "from-teal-500 to-green-600",
    items: ["System Design", "System Architecture", "Microservices", "Database Optimization", "Eloquent ORM"],
  },
  {
    category: "Frontend & Styling",
    icon: "Palette",
    color: "from-fuchsia-500 to-pink-600",
    items: ["HTML5", "CSS3", "Bootstrap", "TailwindCSS", "AJAX", "Responsive Design"],
  },
  {
    category: "Database & Tools",
    icon: "Database",
    color: "from-indigo-500 to-blue-600",
    items: ["MySQL", "SQL", "Git", "GitHub", "Postman", "VS Code"],
  },
];

export const experiences = [
  {
    role: "PHP Laravel Developer",
    company: "99isolutions",
    location: "Jaipur, Rajasthan",
    period: "05/2024 – Present",
    current: true,
    website: "https://99isolutions.com",
    color: "from-primary-500 to-accent-400",
    achievements: [
      "Built AI Agent for WhatsApp — automated intelligent customer support with NLP-powered responses",
      "Developed AI Answer Node for WhatsApp & website to handle dynamic query resolution",
      "Created Shopify App integrating WhatsApp Business API for real-time order notifications",
      "Built embeddable 99Pandit booking widget with WhatsApp OTP verification and dynamic dropdowns",
      "Maintained & enhanced getgabs.com, 99pandit.com, avislease.in, and thecandidhouse.com",
      "Built custom WordPress plugin for abandoned cart recovery with dynamic discount codes",
      "Integrated external platforms (GoTab) and worked on REST API + GraphQL services",
    ],
  },
  {
    role: "Jr. Software Developer",
    company: "SKYRED THAILAND",
    location: "Jaipur, Rajasthan",
    period: "05/2023 – 05/2024",
    current: false,
    website: "https://skyredthailand.com",
    color: "from-blue-500 to-cyan-500",
    achievements: [
      "Created websites and admin panels using HTML, PHP, and Laravel",
      "Designed and optimized MySQL databases for high-performance applications",
      "Implemented CRUD operations in multi-module admin systems",
      "Integrated Laravel Breeze for authentication and role-based authorization",
      "Collaborated with front-end teams using jQuery and AJAX for dynamic UIs",
    ],
  },
];

export const projects = [
  {
    title: "AI WhatsApp Agent",
    description:
      "Intelligent AI-powered agent that handles customer support on WhatsApp automatically. Uses LLM to understand queries, route conversations, and provide human-like responses 24/7.",
    tech: ["Node.js", "Laravel", "WhatsApp Cloud API", "LLM", "GenAI"],
    color: "from-green-500 to-emerald-600",
    icon: "Bot",
    highlights: ["NLP-powered responses", "Auto-routing conversations", "24/7 automation"],
  },
  {
    title: "Shopify WhatsApp Integration",
    description:
      "Custom Shopify app that sends real-time order notifications via WhatsApp Business API. Includes webhook handling, message templates, and authentication flow.",
    tech: ["Laravel", "Shopify API", "WhatsApp Cloud API", "GraphQL"],
    color: "from-violet-500 to-purple-600",
    icon: "ShoppingCart",
    highlights: ["Real-time notifications", "Webhook handling", "Message templates"],
  },
  {
    title: "99Pandit Booking Widget",
    description:
      "Embeddable booking form widget that integrates with Laravel backend. Features dynamic city/state dropdowns, WhatsApp OTP verification, and seamless lead capture for third-party websites.",
    tech: ["Laravel", "JavaScript", "AJAX", "WhatsApp API"],
    color: "from-orange-500 to-amber-600",
    icon: "Calendar",
    highlights: ["OTP verification", "Embeddable widget", "Dynamic dropdowns"],
  },
  {
    title: "WordPress Abandoned Cart Plugin",
    description:
      "Custom WooCommerce plugin that tracks abandoned carts and sends automated recovery messages via email or WhatsApp with dynamic discount codes to bring customers back.",
    tech: ["PHP", "WordPress", "WooCommerce", "WhatsApp API"],
    color: "from-blue-500 to-cyan-600",
    icon: "ShoppingBag",
    highlights: ["Cart tracking", "Dynamic discounts", "Multi-channel outreach"],
  },
  {
    title: "AI Answer Node for Website",
    description:
      "Intelligent answer node system that can be embedded in any website to provide AI-powered responses to user queries. Supports multiple knowledge bases and fallback to human agents.",
    tech: ["Node.js", "React", "LLM", "GenAI", "REST API"],
    color: "from-pink-500 to-rose-600",
    icon: "Cpu",
    highlights: ["Multi-knowledge base", "Human fallback", "Embeddable"],
  },
  {
    title: "Web Admin Panel Suite",
    description:
      "Multiple enterprise admin panels with full CRUD functionality, role-based access control, database optimization using Eloquent ORM, and real-time data using AJAX.",
    tech: ["PHP", "Laravel", "MySQL", "jQuery", "AJAX", "Bootstrap"],
    color: "from-teal-500 to-green-600",
    icon: "LayoutDashboard",
    highlights: ["Role-based access", "Eloquent ORM", "Real-time data"],
  },
];

export const education = [
  {
    degree: "B.C.A. (3rd Year Ongoing)",
    institution: "University of Technology",
    period: "06/2023 – Present",
    location: "Jaipur, Rajasthan",
  },
  {
    degree: "Full Stack Development Certification",
    institution: "Matrix Computers",
    period: "01/2022 – 10/2022",
    location: "Mansarovar, Jaipur",
  },
  {
    degree: "B.A. (Bachelor of Arts)",
    institution: "Kota University",
    period: "06/2018 – 07/2021",
    location: "Kota, Rajasthan",
  },
];

export const stats = [
  { label: "Years Experience", value: "2+" },
  { label: "Projects Delivered", value: "15+" },
  { label: "AI Integrations", value: "5+" },
  { label: "Happy Clients", value: "10+" },
];
