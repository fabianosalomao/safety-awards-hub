import { useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const images = Array.from({ length: 21 }, (_, i) => `/event/all/a-${i + 1}.webp`);

const EventGallery = () => {
  const { t } = useLanguage();
  const [open, setOpen] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.05 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(null);
    };
    if (open !== null) window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open]);

  return (
    <section ref={sectionRef} className="py-16 md:py-24 relative">
      <div className="section-container">
        <div
          className="text-center max-w-3xl mx-auto mb-10 md:mb-14 transition-all duration-700"
          style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(20px)' }}
        >
          <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-accent mb-3 px-4 py-1.5 rounded-full border border-accent/30 bg-accent/10">
            {t('O dia da premiação', 'El día de la premiación')}
          </span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3">
            {t('Registros do MSA Safety Summit 2026', 'Registros del MSA Safety Summit 2026')}
          </h2>
          <p className="text-muted-foreground">
            {t(
              'Momentos do dia em que reconhecemos os finalistas e o projeto vencedor, em São Paulo.',
              'Momentos del día en que reconocimos a los finalistas y al proyecto ganador, en São Paulo.'
            )}
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2.5 md:gap-3">
          {images.map((src, i) => (
            <button
              key={src}
              onClick={() => setOpen(i)}
              className="group relative overflow-hidden rounded-lg border border-border/60 bg-card/30 aspect-square focus:outline-none focus:ring-2 focus:ring-accent"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(15px)',
                transition: 'opacity 600ms ease, transform 600ms ease',
                transitionDelay: `${(i % 10) * 40}ms`,
              }}
              aria-label={t(`Ampliar foto ${i + 1}`, `Ampliar foto ${i + 1}`)}
            >
              <img
                src={src}
                alt={t(`Registro do evento ${i + 1}`, `Registro del evento ${i + 1}`)}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </button>
          ))}
        </div>
      </div>

      {open !== null && (
        <div
          className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setOpen(null)}
          role="dialog"
          aria-modal="true"
        >
          <button
            onClick={() => setOpen(null)}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-card/80 hover:bg-card flex items-center justify-center"
            aria-label={t('Fechar', 'Cerrar')}
          >
            <X className="w-5 h-5" />
          </button>
          <img
            src={images[open]}
            alt={t(`Registro do evento ${open + 1}`, `Registro del evento ${open + 1}`)}
            className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
};

export default EventGallery;
