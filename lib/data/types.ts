// ============================================
// Portfolio Data Types
// ============================================

export interface HeroData {
  name: string;
  title: string;
  subtitle: string;
  description: string;
  profileImage: string;
  buttons: {
    primary: { text: string; href: string };
    secondary: { text: string; href: string };
  };
}

export interface AboutData {
  biography: string;
  summary: string;
  personalStory: string;
  highlights: string[];
}

export interface ExperienceItem {
  id: string;
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string[];
  type: 'work' | 'internship' | 'training' | 'volunteer';
}

export interface SkillItem {
  id: string;
  name: string;
  level: number; // 0-100
  category: string;
}

export interface SkillCategory {
  id: string;
  name: string;
  icon: string;
  skills: SkillItem[];
}

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  impact: string;
  achievements: string[];
  image: string;
  link?: string;
  github?: string;
  type: 'technical' | 'academic' | 'social';
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  location: string;
  startDate: string;
  endDate: string;
  grade: string;
  coursework: string[];
  achievements: string[];
}

export interface CertificationItem {
  id: string;
  name: string;
  issuer: string;
  year: string;
  link?: string;
  category: string;
}

export interface AchievementItem {
  id: string;
  title: string;
  value: string;
  description: string;
  icon: string;
}

export interface ContactData {
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  github: string;
  socialLinks: { platform: string; url: string }[];
  resumeFile: string;
}

export interface ThemeSettings {
  mode: 'dark' | 'light';
  primaryColor: string;
  secondaryColor: string;
  backgroundColor: string;
  headingFont: string;
  bodyFont: string;
}

export interface SEOSettings {
  title: string;
  description: string;
  ogImage: string;
  keywords: string[];
}

export interface PortfolioData {
  hero: HeroData;
  about: AboutData;
  experience: ExperienceItem[];
  skillCategories: SkillCategory[];
  projects: ProjectItem[];
  education: EducationItem[];
  certifications: CertificationItem[];
  achievements: AchievementItem[];
  contact: ContactData;
  theme: ThemeSettings;
  seo: SEOSettings;
}
