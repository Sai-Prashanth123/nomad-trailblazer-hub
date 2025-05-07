
import NavBar from '@/components/NavBar';
import HeroSection from '@/components/HeroSection';
import NomadConciergeSection from '@/components/NomadConciergeSection';
import FeatureSection from '@/components/FeatureSection';
import CommunitySection from '@/components/CommunitySection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <NavBar />
      <main>
        <HeroSection />
        <NomadConciergeSection />
        <FeatureSection />
        <CommunitySection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
