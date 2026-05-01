import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { finalists, countryNames } from '@/data/finalists';

// Títulos exatos dos 3 finalistas da Fase 3 (ordem alfabética)
const TOP3_TITLES = [
  'Centro de operações remotas (COR) para apoio à descaracterização de barragens',
  'Gold Fields & Safetymind: IA proactiva para la erradicación de accidentes fatales',
  'Implementación tecnológica de dron autónomo y robot cuadrúpedo para detección de peligros y riesgos',
];

const Fase3Finalists = () => {
  const { t, language } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setIsVisible(true); obs.disconnect(); } },
      { threshold: 0.05 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const top3 = TOP3_TITLES
    .map((title) => finalists.find((f) => f.title === title))
    .filter((f): f is NonNullable<typeof f> => Boolean(f))
    .sort((a, b) => a.title.localeCompare(b.title, language === 'es' ? 'es' : 'pt'));

  return (
    <section id="fase3-finalistas" ref={sectionRef} className="py-20 md:py-28 relative">
      {/* Subtle top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-accent/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="section-container relative z-10">
        {/* Header */}
        <div
          className="text-center mb-12 md:mb-16 transition-all duration-700"
          style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(30px)' }}
        >
          <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-accent mb-4 px-4 py-1.5 rounded-full border border-accent/30 bg-accent/10">
            {t('Fase 3', 'Fase 3')}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            3 {t('projetos finalistas', 'proyectos finalistas')}
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            {t(
              'Entre os projetos que avançaram na etapa anterior, três iniciativas seguem agora para a fase final do Safety Innovation Awards 2026.',
              'Entre los proyectos que avanzaron en la etapa anterior, tres iniciativas continúan ahora hacia la fase final del Safety Innovation Awards 2026.'
            )}
          </p>
        </div>

        {/* Imparcialidade */}
        <div
          className="max-w-3xl mx-auto mb-10 md:mb-14 px-5 py-4 rounded-xl border border-accent/20 bg-accent/5 backdrop-blur-sm transition-all duration-700 delay-100"
          style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(20px)' }}
        >
          <p className="text-sm text-muted-foreground leading-relaxed text-center">
            {t(
              'Os projetos abaixo estão apresentados em ordem alfabética. O anúncio oficial do projeto vencedor será realizado em momento posterior.',
              'Los proyectos a continuación se presentan en orden alfabético. El anuncio oficial del proyecto ganador se realizará posteriormente.'
            )}
          </p>
        </div>

        {/* 3 Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 max-w-6xl mx-auto">
          {top3.map((f, i) => {
            const countryLabel = countryNames[f.country][language === 'es' ? 'es' : 'pt'];
            return (
              <div
                key={f.title}
                className="group relative rounded-xl border border-border bg-card/70 backdrop-blur-sm hover:border-accent/40 transition-all duration-500 hover:shadow-[0_0_40px_-10px_hsl(43_42%_52%/0.25)] flex flex-col p-6 md:p-7"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                  transitionDelay: `${i * 120 + 200}ms`,
                  transitionDuration: '700ms',
                  transitionProperty: 'opacity, transform, border-color, box-shadow',
                }}
              >
                {/* Top row */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <span className="text-xs font-medium text-muted-foreground tracking-wide uppercase">
                    {f.company}
                  </span>
                  <span className="shrink-0 text-[11px] font-semibold px-2.5 py-1 rounded-md bg-accent/10 text-accent border border-accent/20">
                    {countryLabel}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-lg md:text-xl font-semibold text-foreground leading-snug">
                  {f.title}
                </h3>

                {/* Decorative line */}
                <div className="mt-6 pt-5 border-t border-border/50">
                  <span className="text-xs uppercase tracking-[0.18em] text-accent/80 font-medium">
                    {t('Finalista · Fase 3', 'Finalista · Fase 3')}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Texto institucional */}
        <div
          className="max-w-3xl mx-auto mt-14 md:mt-16 text-center transition-all duration-700 delay-500"
          style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(20px)' }}
        >
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed italic">
            {t(
              'A qualidade das iniciativas apresentadas nesta edição reforça a relevância do Safety Innovation Awards como plataforma de reconhecimento da inovação em segurança na América Latina. A chegada à Fase 3 evidencia a excelência dos projetos selecionados e o alto nível das contribuições recebidas ao longo do processo.',
              'La calidad de las iniciativas presentadas en esta edición refuerza la relevancia del Safety Innovation Awards como plataforma de reconocimiento de la innovación en seguridad en América Latina. La llegada a la Fase 3 evidencia la excelencia de los proyectos seleccionados y el alto nivel de las contribuciones recibidas a lo largo del proceso.'
            )}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Fase3Finalists;
