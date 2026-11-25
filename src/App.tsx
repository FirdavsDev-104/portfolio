import React, { useState } from 'react';
import { LanguageProvider } from './i18n/LanguageContext';
import { LoadingScreen } from './components/LoadingScreen';
import { AmbientParticles } from './components/AmbientParticles';
import { MouseSpotlight } from './components/MouseSpotlight';
import { Navbar } from './components/Navbar';
import { CaseDropSection } from './components/case-intro/CaseDropSection';
import { HeroSection } from './components/HeroSection';
import { IdCardSection } from './components/IdCardSection';
import { ProjectsSection } from './components/ProjectsSection';
import { SkillsSection } from './components/SkillsSection';
import { JourneySection } from './components/JourneySection';
import { ContactSection } from './components/ContactSection';
import { FireworksFinale } from './components/FireworksFinale';

const PortfolioApp: React.FC = () => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative min-h-screen bg-[#040508] text-[#f1f5f9]">
      {!loaded && <LoadingScreen onComplete={() => setLoaded(true)} />}

      <AmbientParticles />
      <MouseSpotlight />
      <Navbar />

      <main className="relative z-10">
        <CaseDropSection />
        <HeroSection />
        <IdCardSection />
        <ProjectsSection />
        <SkillsSection />
        <JourneySection />
        <ContactSection />
      </main>

      <FireworksFinale />
    </div>
  );
};

export function App() {
  return (
    <LanguageProvider>
      <PortfolioApp />
    </LanguageProvider>
  );
}

export default App;
