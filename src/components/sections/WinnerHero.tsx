import { ArrowRight, PlayCircle, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import PhotoCarousel from '@/components/ui/PhotoCarousel';

const winnerImages = Array.from({ length: 8 }, (_, i) => `/event/winner/w-${i + 1}.webp`);

const WinnerHero = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [logoLoaded, setLogoLoaded] = useState(false);

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section id="hero" className="relative pt-28 md:pt-32 pb-16 md:pb-24 overflow-hidden">
      {/* Background glows */}
      <div className="absolute inset-0 bg-background" />
      <div className="absolute top-0 left-1/3 w-[700px] h-[700px] bg-primary/15 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-accent/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="section-container relative z-10">
        {/* Logo */}
        <div className="flex justify-center mb-8 animate-fade-up">
          <img
            src="/logo-2026.png"
            alt="Safety Innovation Awards 2026"
            className={`h-16 md:h-20 w-auto object-contain transition-opacity duration-500 ${
              logoLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setLogoLoaded(true)}
            loading="eager"
            fetchPriority="high"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          {/* Text column */}
          <div className="text-center lg:text-left">
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/40 bg-primary/10 text-primary text-xs font-semibold tracking-[0.18em] uppercase mb-5 animate-fade-up"
              style={{ animationDelay: '80ms' }}
            >
              <Trophy className="w-3.5 h-3.5" />
              {t('Safety Innovation Awards 2026 · Vencedor', 'Safety Innovation Awards 2026 · Ganador')}
            </div>

            <h1
              className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-5 animate-fade-up"
              style={{ animationDelay: '150ms' }}
            >
              <span className="text-gradient-gold">
                {t(
                  'Centro de operações remotas (COR) para apoio à descaracterização de barragens',
                  'Centro de operações remotas (COR) para apoio à descaracterização de barragens'
                )}
              </span>
            </h1>

            <div
              className="flex flex-wrap items-center justify-center lg:justify-start gap-x-3 gap-y-2 text-sm md:text-base mb-5 animate-fade-up"
              style={{ animationDelay: '220ms' }}
            >
              <span className="font-semibold text-foreground">Vale</span>
              <span className="text-muted-foreground">·</span>
              <span className="text-muted-foreground">{t('Brasil', 'Brasil')}</span>
            </div>

            <p
              className="text-muted-foreground leading-relaxed mb-5 animate-fade-up"
              style={{ animationDelay: '280ms' }}
            >
              {t(
                'Projeto vencedor reconhecido no MSA Safety Summit 2026, em São Paulo, pela contribuição à inovação e à cultura de segurança na América Latina.',
                'Proyecto ganador reconocido en el MSA Safety Summit 2026, en São Paulo, por su contribución a la innovación y la cultura de seguridad en América Latina.'
              )}
            </p>

            <div
              className="text-sm text-muted-foreground/90 mb-8 animate-fade-up"
              style={{ animationDelay: '340ms' }}
            >
              <span className="uppercase tracking-[0.16em] text-accent/80 text-xs font-semibold block mb-1.5">
                {t('Equipe', 'Equipo')}
              </span>
              Larissa Rezende · Rômulo Diniz · Fabiana Souza Ferreira
            </div>

            <div
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start animate-fade-up"
              style={{ animationDelay: '420ms' }}
            >
              <Button
                size="lg"
                className="group bg-primary hover:bg-primary/90 text-primary-foreground px-7 py-6 text-base font-semibold glow-green"
                onClick={() => scrollTo('apresentacao-vencedor')}
              >
                <PlayCircle className="w-5 h-5 mr-2" />
                {t('Assistir à apresentação', 'Ver la presentación')}
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-accent/50 text-accent hover:bg-accent/10 hover:border-accent px-7 py-6 text-base"
                onClick={() => navigate('/finalistas-fase-2')}
              >
                {t('Ver os 20 finalistas', 'Ver los 20 finalistas')}
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>

          {/* Carousel column */}
          <div
            className="relative animate-fade-up"
            style={{ animationDelay: '300ms' }}
          >
            <div className="absolute -inset-3 bg-gradient-to-tr from-primary/30 to-accent/30 rounded-3xl blur-2xl opacity-60 pointer-events-none" />
            <div className="relative">
              <PhotoCarousel
                images={winnerImages}
                alt={t('Vencedor SIA 2026 - Vale', 'Ganador SIA 2026 - Vale')}
                aspect="aspect-[4/3]"
                rounded="rounded-2xl"
                priorityFirst
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WinnerHero;
