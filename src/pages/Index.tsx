import { LanguageProvider } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Manifesto from '@/components/sections/Manifesto';
import Eligibility from '@/components/sections/Eligibility';
import Prerequisites from '@/components/sections/Prerequisites';
import EvaluationCriteria from '@/components/sections/EvaluationCriteria';
import Process from '@/components/sections/Process';
import Committee from '@/components/sections/Committee';
import Awards from '@/components/sections/Awards';
import Dates from '@/components/sections/Dates';
import Submit from '@/components/sections/Submit';
import Integration from '@/components/sections/Integration';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-background">
        <Header />
        <main>
          <Hero />
          <About />
          <Manifesto />
          <Eligibility />
          <Prerequisites />
          <EvaluationCriteria />
          <Process />
          <Committee />
          <Awards />
          <Dates />
          <Submit />
          <Integration />
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
};

export default Index;
