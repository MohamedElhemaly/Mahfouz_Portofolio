import { PortfolioData } from './types';

export const defaultPortfolioData: PortfolioData = {
  hero: {
    name: "Youssef Mahfouz",
    title: "Data-Driven Finance Professional",
    subtitle: "Financial Analyst • Data Analytics • Business Intelligence",
    description:
      "Transforming raw data into strategic business intelligence. CIB-trained finance graduate bridging accounting expertise with modern data analytics — Power BI, SQL, and AI — to drive smarter business decisions.",
    profileImage: "",
    buttons: {
      primary: { text: "Explore My Work", href: "#projects" },
      secondary: { text: "Download Resume", href: "/Youssef_Mahfouz_Resume.pdf" },
    },
  },

  about: {
    biography:
      "I'm a Commerce graduate specializing in Accounting & Finance from Damanhour University, with a deep passion for transforming financial data into actionable business insights. My journey bridges traditional finance with modern data analytics — I believe the future of finance lies at the intersection of accounting expertise, data visualization, and artificial intelligence.",
    summary:
      "CIB-trained financial analyst with hands-on experience in Power BI, SQL, and DAX. Proven track record of building business dashboards, leading teams to achieve 30%+ sales growth, and driving operational efficiency. Currently advancing data analytics skills through the Digital Egypt Pioneers Initiative (DEPI).",
    personalStory:
      "From managing customer relationships on the retail floor to analyzing sustainable finance strategies at Egypt's largest private bank, I've consistently sought opportunities to merge analytical thinking with real-world business impact. My experience spans from hands-on customer service leadership — where I drove measurable sales increases — to building sophisticated Power BI dashboards that surface critical business KPIs. I'm driven by the belief that every dataset tells a story, and my job is to make that story clear, compelling, and actionable.",
    highlights: [
      "CIB Egypt Summer Intern — Sustainable Finance",
      "DEPI-Certified Power BI Specialist",
      "30%+ Sales Revenue Increase as Supervisor",
      "9+ Professional Certifications",
      "Enactus Project Management Team Member",
      "Bilingual: Arabic (Native) & English (C1)",
    ],
  },

  experience: [
    {
      id: "exp-1",
      title: "Data Analytics — Power BI Specialist",
      company: "Digital Egypt Pioneers Initiative (DEPI)",
      location: "Egypt",
      startDate: "Nov 2025",
      endDate: "Present",
      description: [
        "Developing advanced SQL and Power BI proficiency through a structured data-analytics training track, transforming raw datasets into actionable business dashboards.",
        "Built multi-page Power BI dashboards (Home, Overview, Stores, Products) using DAX measures, Top-N filters, and treemap visualizations — enabling retail managers to identify top-performing products and monitor KPIs in real time.",
      ],
      type: "training",
    },
    {
      id: "exp-2",
      title: "Project Management Team Member",
      company: "Enactus, Damanhour University",
      location: "Damanhur, Egypt",
      startDate: "Oct 2025",
      endDate: "Present",
      description: [
        "Collaborate in a cross-functional student team to design and execute community-impact projects — from concept through pitch and delivery — competing at national Enactus Egypt level.",
      ],
      type: "volunteer",
    },
    {
      id: "exp-3",
      title: "Job Hunt Toolkit Bootcamp",
      company: "Creativa Innovation Hubs",
      location: "Egypt",
      startDate: "Sep 2025",
      endDate: "Oct 2025",
      description: [
        "Completed a 25-hour intensive career-readiness program covering problem-solving, time management, and professional communication through collaborative exercises.",
      ],
      type: "training",
    },
    {
      id: "exp-4",
      title: "Summer Intern — Sustainable Finance",
      company: "CIB Egypt",
      location: "Egypt",
      startDate: "Aug 2025",
      endDate: "Sep 2025",
      description: [
        "Selected for CIB's competitive summer program, gaining practical exposure to sustainable finance principles and strategic thinking frameworks at Egypt's largest private bank.",
      ],
      type: "internship",
    },
    {
      id: "exp-5",
      title: "Customer Service Supervisor",
      company: "GFM Co. for Trading",
      location: "Damanhur, Egypt",
      startDate: "Feb 2024",
      endDate: "Oct 2024",
      description: [
        "Supervised a customer-facing team during high-volume periods, delegating tasks and coaching colleagues on upselling techniques — contributing to a 30%+ increase in sales revenue over the supervision period.",
        "Streamlined escalation workflows, reducing average customer resolution time by ~20% and improving daily operational efficiency across the retail floor.",
      ],
      type: "work",
    },
    {
      id: "exp-6",
      title: "Customer Service Representative",
      company: "GFM Co. for Trading",
      location: "Damanhur, Egypt",
      startDate: "Oct 2022",
      endDate: "Feb 2024",
      description: [
        "Resolved customer inquiries with timely, accurate solutions over a 16-month tenure, consistently earning positive feedback and contributing to team targets.",
        "Managed purchase-order processing and coordinated with internal teams to improve stock replenishment accuracy.",
      ],
      type: "work",
    },
  ],

  skillCategories: [
    {
      id: "cat-1",
      name: "Data & Analytics",
      icon: "BarChart3",
      skills: [
        { id: "s1", name: "Power BI", level: 85, category: "Data & Analytics" },
        { id: "s2", name: "DAX", level: 80, category: "Data & Analytics" },
        { id: "s3", name: "SQL", level: 75, category: "Data & Analytics" },
        { id: "s4", name: "Data Visualization", level: 85, category: "Data & Analytics" },
        { id: "s5", name: "KPI Tracking", level: 80, category: "Data & Analytics" },
        { id: "s6", name: "Business Intelligence", level: 78, category: "Data & Analytics" },
      ],
    },
    {
      id: "cat-2",
      name: "Finance & Accounting",
      icon: "DollarSign",
      skills: [
        { id: "s7", name: "Financial Modeling", level: 75, category: "Finance & Accounting" },
        { id: "s8", name: "Financial Accounting", level: 85, category: "Finance & Accounting" },
        { id: "s9", name: "Cash Flow Analysis", level: 80, category: "Finance & Accounting" },
        { id: "s10", name: "Budgeting & Forecasting", level: 75, category: "Finance & Accounting" },
      ],
    },
    {
      id: "cat-3",
      name: "Tools & Platforms",
      icon: "Wrench",
      skills: [
        { id: "s11", name: "Excel (Advanced/VBA)", level: 90, category: "Tools & Platforms" },
        { id: "s12", name: "Microsoft Office", level: 92, category: "Tools & Platforms" },
        { id: "s13", name: "Power BI Desktop", level: 85, category: "Tools & Platforms" },
      ],
    },
    {
      id: "cat-4",
      name: "AI & Innovation",
      icon: "Brain",
      skills: [
        { id: "s14", name: "Generative AI", level: 70, category: "AI & Innovation" },
        { id: "s15", name: "Responsible AI", level: 68, category: "AI & Innovation" },
        { id: "s16", name: "AI Business Solutions", level: 72, category: "AI & Innovation" },
        { id: "s17", name: "Prompt Engineering", level: 75, category: "AI & Innovation" },
      ],
    },
    {
      id: "cat-5",
      name: "Leadership & Soft Skills",
      icon: "Users",
      skills: [
        { id: "s18", name: "Team Leadership", level: 85, category: "Leadership & Soft Skills" },
        { id: "s19", name: "Strategic Planning", level: 78, category: "Leadership & Soft Skills" },
        { id: "s20", name: "Stakeholder Communication", level: 82, category: "Leadership & Soft Skills" },
        { id: "s21", name: "Problem Solving", level: 88, category: "Leadership & Soft Skills" },
        { id: "s22", name: "Negotiation & Persuasion", level: 80, category: "Leadership & Soft Skills" },
        { id: "s23", name: "Time Management", level: 85, category: "Leadership & Soft Skills" },
      ],
    },
  ],

  projects: [
    {
      id: "proj-1",
      title: "Retail Sales Dashboard",
      description:
        "A comprehensive 4-page Power BI dashboard analyzing superstore sales data across Home, Overview, Stores, and Products views. Designed to empower retail managers with real-time insights into product performance, store-level KPIs, and sales trends.",
      technologies: ["Power BI", "DAX", "SQL", "Data Modeling"],
      impact: "Enabled real-time monitoring of retail KPIs across multiple store locations",
      achievements: [
        "Built 4 interconnected dashboard pages with dynamic filtering",
        "Implemented DAX measures for complex sales calculations",
        "Used Top-N filters and treemap visualizations for product ranking",
        "Surfaced top-performing products and store-level KPIs",
      ],
      image: "",
      type: "technical",
    },
    {
      id: "proj-2",
      title: "AgriLoop — Social Enterprise",
      description:
        "A social enterprise concept developed for the Enactus Egypt national competition, focused on converting agricultural waste from Beheira Governorate into biodegradable packaging solutions for local food businesses.",
      technologies: ["Project Management", "Business Planning", "Sustainability", "Market Research"],
      impact: "Submitted for Enactus Egypt national competition as a viable sustainability solution",
      achievements: [
        "Contributed to ideation and proposal development",
        "Designed a circular economy model for agricultural waste",
        "Targeted local food businesses in Beheira Governorate",
        "Presented at national-level Enactus competition",
      ],
      image: "",
      type: "social",
    },
    {
      id: "proj-3",
      title: "Big Data Analytics & Audit Research",
      description:
        "A research project examining how Big Data transforms the audit process — shifting from traditional sample-based methods to real-time full-population analysis. Included a comprehensive case study on Amazon covering fraud detection and risk assessment.",
      technologies: ["Research", "Big Data", "Audit Analytics", "Risk Assessment"],
      impact: "Demonstrated the paradigm shift in modern auditing practices",
      achievements: [
        "Led a research team as Team Leader",
        "Analyzed Big Data's impact on real-time auditing",
        "Developed Amazon case study for fraud detection",
        "Covered risk assessment methodologies",
      ],
      image: "",
      type: "academic",
    },
    {
      id: "proj-4",
      title: "Internal Control & Audit Process",
      description:
        "A research project analyzing how internal control strength directly impacts audit scope and substantive testing requirements, with a focus on risk-based auditing efficiency and practical implications for modern audit practices.",
      technologies: ["Research", "Internal Controls", "Risk-Based Auditing", "Compliance"],
      impact: "Provided framework for understanding audit scope optimization",
      achievements: [
        "Led a research team as Team Leader",
        "Analyzed internal control impact on audit scope",
        "Focused on risk-based auditing efficiency",
        "Evaluated substantive testing requirements",
      ],
      image: "",
      type: "academic",
    },
  ],

  education: [
    {
      id: "edu-1",
      degree: "Bachelor of Commerce (BCom) — Accounting and Finance",
      institution: "Damanhour University",
      location: "Damanhur, Egypt",
      startDate: "Sep 2022",
      endDate: "Jun 2026",
      grade: "Very Good",
      coursework: [
        "Financial Accounting",
        "Cash Flow Statements",
        "Business English",
        "Auditing",
        "Cost Accounting",
      ],
      achievements: [],
    },
  ],

  certifications: [
    {
      id: "cert-1",
      name: "Financial Literacy Programs (Adults, Youth, Children)",
      issuer: "Egyptian Banking Institute",
      year: "2025",
      category: "Finance",
    },
    {
      id: "cert-2",
      name: "Introductory Program on Credit in Banks",
      issuer: "Egyptian Banking Institute",
      year: "2025",
      category: "Finance",
    },
    {
      id: "cert-3",
      name: "Responsible Innovation and Trustworthy AI",
      issuer: "SAS",
      year: "2025",
      category: "AI",
    },
    {
      id: "cert-4",
      name: "One Million Prompters Initiative",
      issuer: "Dubai Future Foundation",
      year: "2025",
      category: "AI",
    },
    {
      id: "cert-5",
      name: "Implementing AI Solutions in Business",
      issuer: "DataCamp",
      year: "2025",
      category: "AI",
    },
    {
      id: "cert-6",
      name: "Generative AI for Business",
      issuer: "DataCamp",
      year: "2025",
      category: "AI",
    },
    {
      id: "cert-7",
      name: "English Assessment Certificate (C1)",
      issuer: "SmallTalk2Me",
      year: "2025",
      category: "Language",
    },
    {
      id: "cert-8",
      name: "Fundamentals of Digital Marketing (Maharat min Google)",
      issuer: "Banque Misr",
      year: "2025",
      category: "Marketing",
    },
    {
      id: "cert-9",
      name: "Accounting Excel",
      issuer: "Damanhour University",
      year: "2023",
      category: "Tools",
    },
  ],

  achievements: [
    {
      id: "ach-1",
      title: "Sales Growth",
      value: "30%+",
      description: "Revenue increase achieved during customer service supervision period",
      icon: "TrendingUp",
    },
    {
      id: "ach-2",
      title: "Certifications",
      value: "9+",
      description: "Professional certifications in Finance, AI, Analytics & Marketing",
      icon: "Award",
    },
    {
      id: "ach-3",
      title: "Experience",
      value: "2+",
      description: "Years of professional customer service and leadership experience",
      icon: "Briefcase",
    },
    {
      id: "ach-4",
      title: "Projects",
      value: "4",
      description: "Technical, research, and social impact projects completed",
      icon: "FolderOpen",
    },
  ],

  contact: {
    email: "youssefmahfouz777@gmail.com",
    phone: "+20 109 132 8985",
    location: "Al Buhayrah, Egypt (Willing to Relocate)",
    linkedin: "https://www.linkedin.com/in/youssef-mohamed-mahfouz",
    github: "",
    socialLinks: [],
    resumeFile: "/Youssef_Mahfouz_Resume.pdf",
  },

  theme: {
    mode: "dark",
    primaryColor: "#6366f1",
    secondaryColor: "#06b6d4",
    backgroundColor: "#030014",
    headingFont: "Inter",
    bodyFont: "Inter",
  },

  seo: {
    title: "Youssef Mahfouz — Data-Driven Finance Professional",
    description:
      "Portfolio of Youssef Mohamed Mahfouz — Financial Analyst, Power BI Specialist, and CIB-trained finance professional bridging data analytics with business intelligence.",
    ogImage: "",
    keywords: [
      "Financial Analyst",
      "Power BI",
      "Data Analytics",
      "Business Intelligence",
      "CIB",
      "Egypt",
    ],
  },
};
