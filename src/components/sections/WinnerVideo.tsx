import { useLanguage } from '@/contexts/LanguageContext';

const WinnerVideo = () => {
  const { t } = useLanguage();
  return (
    <section id="apresentacao-vencedor" className="py-16 md:py-24 relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-primary/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="section-container relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-8 md:mb-10">
          <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-3 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10">
            {t('Apresentação do vencedor', 'Presentación del ganador')}
          </span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3">
            {t(
              'Veja a apresentação do projeto vencedor',
              'Mira la presentación del proyecto ganador'
            )}
          </h2>
          <p className="text-muted-foreground">
            {t(
              'Apresentação realizada pela equipe da Vale durante o MSA Safety Summit 2026, em São Paulo.',
              'Presentación realizada por el equipo de Vale durante el MSA Safety Summit 2026, en São Paulo.'
            )}
          </p>
        </div>

        <div className="max-w-5xl mx-auto aspect-video rounded-2xl border border-border shadow-lg overflow-hidden">
          <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/t13T4zBeRt8?list=PLKUq16ZcXwRruWe2VL2zcdtZGo_sWBOTL"
            title="Apresentação do projeto vencedor - SIA 2026"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
};

export default WinnerVideo;
