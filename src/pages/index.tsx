import Head from 'next/head';
import Hero from '../components/Hero';
import LargeEarthSection from '../components/LargeEarthSection';
import About from '../components/About';
import Projects from '../components/Projects';
import Skills from '../components/Skills';
import Certifications from '../components/Certifications';
import CertificatesShowcase from '../components/CertificatesShowcase';
import Contact from '../components/Contact';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ThemeToggle from '../components/ThemeToggle';
import AdminPanel from '../components/AdminPanel';
import { useTheme } from '../contexts/ThemeContext';

export default function Home() {
  const { isDark, isLoading } = useTheme();
  
  // Show loading screen while theme is being determined
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-950">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
          <div className="absolute inset-0 w-16 h-16 border-4 border-purple-400 border-b-transparent rounded-full animate-spin animation-delay-2000"></div>
        </div>
      </div>
    );
  }
  
  return (
    <div className={`min-h-screen transition-colors duration-500 ${
      isDark 
        ? 'bg-gray-950 text-white' 
        : 'bg-gray-50 text-gray-900'
    }`}>
      <Head>
        <title>Rajeev Ranjan Pratap Singh | AI & ML Developer Portfolio</title>
        <meta name="description" content="Crafting intelligent solutions with AI & ML. Explore my projects, skills, and achievements in artificial intelligence and machine learning." />
        <meta name="keywords" content="AI, ML, Machine Learning, Deep Learning, Computer Vision, NLP, Portfolio, Developer" />
        <meta name="author" content="Rajeev Ranjan Pratap Singh" />
        <meta property="og:title" content="Rajeev Ranjan Pratap Singh | AI & ML Developer" />
        <meta property="og:description" content="Crafting intelligent solutions with AI & ML" />
        <meta property="og:type" content="website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ThemeToggle />
      <AdminPanel />
      <Navbar />
      <main className="overflow-hidden">
        <LargeEarthSection />
        <About />
        <Projects />
        <Skills />
        <Certifications />
        <Contact />
        <CertificatesShowcase />
      </main>
      <Footer />
    </div>
  );
}
