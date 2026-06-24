'use client';

import { usePortfolioData } from '@/lib/hooks/usePortfolioData';
import ThemeProvider from './components/portfolio/ThemeProvider';
import LoadingScreen from './components/portfolio/LoadingScreen';
import ParticleBackground from './components/portfolio/ParticleBackground';
import Navbar from './components/portfolio/Navbar';
import Hero from './components/portfolio/Hero';
import About from './components/portfolio/About';
import Experience from './components/portfolio/Experience';
import Skills from './components/portfolio/Skills';
import Projects from './components/portfolio/Projects';
import Education from './components/portfolio/Education';
import Certifications from './components/portfolio/Certifications';
import Stats from './components/portfolio/Stats';
import Contact from './components/portfolio/Contact';
import Footer from './components/portfolio/Footer';

export default function Home() {
  const { data, isLoaded } = usePortfolioData();

  if (!isLoaded) return null;

  return (
    <ThemeProvider theme={data.theme} seo={data.seo}>
      <LoadingScreen />
      <ParticleBackground />
      <Navbar />
      <main>
        <Hero data={data.hero} />
        <About data={data.about} />
        <Experience data={data.experience} />
        <Skills data={data.skillCategories} />
        <Projects data={data.projects} />
        <Education data={data.education} />
        <Certifications data={data.certifications} />
        <Stats data={data.achievements} />
        <Contact data={data.contact} />
      </main>
      <Footer />
    </ThemeProvider>
  );
}
