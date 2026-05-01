import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Calendar, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

const SUMMIT_LINKS = {
  pt: 'https://br.msasafety.com/safety-summit',
  es: 'https://mx.msasafety.com/safety-summit',
};

const SafetySummit = () => {
  const { t, language } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setIsVisible(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="safety-summit" ref={sectionRef} className="py-20 md:py-28 relative">
      <div className="section-container relative z-10">
        <div
          className="relative max-w-5xl mx-auto rounded-2xl border border-accent/30 overflow-hidden transition-all duration-700"
          style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(30px)' }}
        >
          {/* Background layers */}
          <div className="absolute inset-0 bg-gradient-to-br from-card via-card/90 to-background" />
          <div className="absolute -top-32 -right-32 w-[400px] h-[400px] bg-accent/15 rounded-full blur-[120px]" />
          <div className="absolute -bottom-32 -left-32 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[120px]" />

          <div className="relative p-8 md:p-14 text-center">
            <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-accent mb-5 px-4 py-1.5 rounded-full border border-accent/30 bg-accent/10">
              {t('Próximo momento', 'Próximo momento')}
            </span>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight max-w-3xl mx-auto">
              {t(
                'Acompanhe a revelação do vencedor no MSA Safety Summit',
                'Acompañe la revelación del ganador en el MSA Safety Summit'
              )}
            </h2>

            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
              {t(
                'Nos dias 06 e 07/05, acompanhe online e gratuitamente a programação do MSA Safety Summit, o maior evento de EHS da América Latina, com foco em líderes e inovação. A revelação do projeto vencedor do Safety Innovation Awards 2026 acontecerá durante essa experiência.',
                'Los días 06 y 07/05, acompañe de forma online y gratuita la programación del MSA Safety Summit, el mayor evento de EHS de América Latina, enfocado en líderes e innovación. La revelación del proyecto ganador del Safety Innovation Awards 2026 se realizará durante esta experiencia.'
              )}
            </p>

            {/* Info chips */}
            <div className="flex flex-wrap justify-center gap-3 mb-9">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border bg-background/40 text-sm text-foreground/90">
                <Calendar className="w-4 h-4 text-accent" />
                06 & 07/05
              </span>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border bg-background/40 text-sm text-foreground/90">
                <Globe className="w-4 h-4 text-accent" />
                {t('Online · Gratuito', 'Online · Gratuito')}
              </span>
            </div>

            <Button
              size="lg"
              asChild
              className="group bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-base md:text-lg font-semibold glow-green transition-transform hover:scale-105"
            >
              <a
                href={SUMMIT_LINKS[language]}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="flex items-center gap-2">
                  {t('Inscreva-se antecipadamente', 'Regístrese con anticipación')}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SafetySummit;
