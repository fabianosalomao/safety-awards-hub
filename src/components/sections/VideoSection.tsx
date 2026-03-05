import { useRef, useEffect, useState } from 'react';
import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

const VideoSection = () => {
  const { t } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setIsVisible(true); observer.disconnect(); } },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const scrollToSubmit = () => {
    document.getElementById('submit')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-24 md:py-32">
      <div className="section-container" ref={ref}>
        <div
          className="max-w-4xl mx-auto text-center transition-all duration-700"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
          }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            {t('Assista e entenda o', 'Mira y entiende el')}{' '}
            <span className="text-gradient-gold">Safety Innovation Awards</span>
          </h2>
          <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
            {t(
              'Em poucos minutos, veja como funciona o programa, critérios e como submeter seu case.',
              'En pocos minutos, conoce cómo funciona el programa, los criterios y cómo postular tu caso.'
            )}
          </p>

          <div className="aspect-video rounded-xl border border-border shadow-lg overflow-hidden mb-10">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/Mh2Geg9P7vc"
              title="Safety Innovation Awards"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy"
            />
          </div>

          <Button
            size="lg"
            className="group relative overflow-hidden bg-primary hover:bg-primary/90 text-primary-foreground px-10 py-7 text-xl font-bold glow-green"
            onClick={scrollToSubmit}
          >
            <span className="flex items-center gap-3">
              <Send className="w-5 h-5" />
              {t('Submeter Projeto', 'Postular Proyecto')}
            </span>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
