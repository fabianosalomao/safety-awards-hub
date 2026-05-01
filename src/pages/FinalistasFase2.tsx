import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { LanguageProvider, useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Finalists from '@/components/sections/Finalists';
import { Button } from '@/components/ui/button';
import { useEffect } from 'react';

const PageContent = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  const goBackToFase3 = () => {
    navigate('/');
    setTimeout(() => {
      document.getElementById('fase3-finalistas')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 200);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Page hero */}
        <section className="pt-28 md:pt-36 pb-6 md:pb-10 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-accent/5 rounded-full blur-[140px] pointer-events-none" />
          <div className="section-container relative z-10">
            <Button
              variant="ghost"
              onClick={goBackToFase3}
              className="mb-8 text-muted-foreground hover:text-accent group"
            >
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              {t('Voltar para a Fase 3', 'Volver a la Fase 3')}
            </Button>

            <div className="text-center max-w-3xl mx-auto">
              <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-accent mb-4 px-4 py-1.5 rounded-full border border-accent/20 bg-accent/5">
                {t('Fase 2', 'Fase 2')}
              </span>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-5 leading-tight">
                {t('20 projetos finalistas da Fase 2', '20 proyectos finalistas de la Fase 2')}
              </h1>
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
                {t(
                  'A seguir, consulte os projetos que avançaram para a Fase 2 do Safety Innovation Awards 2026. Esta seleção reflete a diversidade, a qualidade e o impacto das iniciativas apresentadas nesta edição.',
                  'A continuación, consulte los proyectos que avanzaron a la Fase 2 del Safety Innovation Awards 2026. Esta selección refleja la diversidad, la calidad y el impacto de las iniciativas presentadas en esta edición.'
                )}
              </p>
            </div>
          </div>
        </section>

        {/* Reuse existing finalists section */}
        <Finalists />

        {/* Bottom back button */}
        <section className="pb-20">
          <div className="section-container text-center">
            <Button
              size="lg"
              onClick={goBackToFase3}
              className="bg-primary hover:bg-primary/90 text-primary-foreground group"
            >
              <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
              {t('Voltar para a Fase 3', 'Volver a la Fase 3')}
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

const FinalistasFase2 = () => (
  <LanguageProvider>
    <PageContent />
  </LanguageProvider>
);

export default FinalistasFase2;
