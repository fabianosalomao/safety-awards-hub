import { lazy, Suspense } from 'react';
import { LanguageProvider } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Footer from '@/components/Footer';

// Lazy load components below the fold for faster initial paint
const Manifesto = lazy(() => import('@/components/sections/Manifesto'));
const Eligibility = lazy(() => import('@/components/sections/Eligibility'));
const Prerequisites = lazy(() => import('@/components/sections/Prerequisites'));
const EvaluationCriteria = lazy(() => import('@/components/sections/EvaluationCriteria'));
const Process = lazy(() => import('@/components/sections/Process'));
const Committee = lazy(() => import('@/components/sections/Committee'));
const Awards = lazy(() => import('@/components/sections/Awards'));
const Dates = lazy(() => import('@/components/sections/Dates'));
const Submit = lazy(() => import('@/components/sections/Submit'));
const Integration = lazy(() => import('@/components/sections/Integration'));

// Minimal loading fallback
const SectionFallback = () => (
  <div className="py-24 flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
  </div>
);

const Index = () => {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-background">
        <Header />
        <main>
          {/* Critical above-the-fold content - loads immediately */}
          <Hero />
          <About />
          
          {/* Below-the-fold content - lazy loaded */}
          <Suspense fallback={<SectionFallback />}>
            <Manifesto />
          </Suspense>
          <Suspense fallback={<SectionFallback />}>
            <Eligibility />
          </Suspense>
          <Suspense fallback={<SectionFallback />}>
            <Prerequisites />
          </Suspense>
          <Suspense fallback={<SectionFallback />}>
            <EvaluationCriteria />
          </Suspense>
          <Suspense fallback={<SectionFallback />}>
            <Process />
          </Suspense>
          <Suspense fallback={<SectionFallback />}>
            <Committee />
          </Suspense>
          <Suspense fallback={<SectionFallback />}>
            <Awards />
          </Suspense>
          <Suspense fallback={<SectionFallback />}>
            <Dates />
          </Suspense>
          <Suspense fallback={<SectionFallback />}>
            <Submit />
          </Suspense>
          <Suspense fallback={<SectionFallback />}>
            <Integration />
          </Suspense>
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
};

export default Index;
