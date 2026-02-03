import { ArrowRight, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { useState } from 'react';

const Hero = () => {
  const { t } = useLanguage();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [logoLoaded, setLogoLoaded] = useState(false);

  const scrollToSection = () => {
    const element = document.getElementById('about');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative min-h-[100svh] md:min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background placeholder while image loads */}
      <div className="absolute inset-0 bg-background" />
      
      {/* Parallax Background Image with progressive loading */}
      <div 
        className={`absolute inset-0 bg-cover bg-center bg-fixed max-md:bg-scroll max-md:bg-top transition-opacity duration-700 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
        style={{ backgroundImage: `url(/thomas-edison.jpg)` }}
      />
      
      {/* Preload image for progressive loading */}
      <img 
        src="/thomas-edison.jpg" 
        alt="" 
        className="hidden"
        onLoad={() => setImageLoaded(true)}
        loading="eager"
        fetchPriority="high"
      />
      
      {/* Ambient glow effect - CSS only */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[150px] opacity-60" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/10 rounded-full blur-[100px] opacity-40" />
      </div>

      <div className="section-container relative z-10 text-center py-24 md:py-20">
        {/* Logo with CSS animation */}
        <div className="mb-8 animate-fade-up" style={{ animationDelay: '0ms' }}>
          {/* Logo placeholder */}
          <div className={`h-20 md:h-28 lg:h-32 mx-auto transition-opacity duration-500 ${logoLoaded ? 'opacity-0 absolute' : 'opacity-100'}`}>
            <div className="h-full w-48 md:w-64 lg:w-72 mx-auto bg-muted/20 rounded-lg animate-pulse" />
          </div>
          <img
            src="/logo-2026.png"
            alt="Safety Innovation Awards"
            className={`h-20 md:h-28 lg:h-32 w-auto object-contain mx-auto transition-opacity duration-500 ${logoLoaded ? 'opacity-100' : 'opacity-0'}`}
            onLoad={() => setLogoLoaded(true)}
            loading="eager"
            fetchPriority="high"
          />
        </div>

        {/* Title with CSS animation */}
        <h1
          className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight animate-fade-up"
          style={{ animationDelay: '150ms' }}
        >
          {t(
            'Reconhecendo inovações que',
            'Reconociendo innovaciones que'
          )}
          <br />
          <span className="text-gradient-gold">
            {t('salvam vidas', 'salvan vidas')}
          </span>
        </h1>

        {/* Subtitle with CSS animation */}
        <p
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-up"
          style={{ animationDelay: '300ms' }}
        >
          {t(
            'Tecnologia que protege vidas. Projetos que inspiram o futuro da segurança na América Latina.',
            'Innovación con propósito. Seguridad que transforma el futuro de América Latina.'
          )}
        </p>

        {/* CTA Buttons with CSS animation */}
        <div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-up"
          style={{ animationDelay: '450ms' }}
        >
          <Button
            size="lg"
            className="group relative overflow-hidden bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg font-semibold glow-green transition-transform hover:scale-105"
            asChild
          >
            <a href="#submit" className="flex items-center gap-2">
              {t('Submeter Projeto', 'Enviar Proyecto')}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="border-accent/50 text-accent hover:bg-accent/10 hover:border-accent px-8 py-6 text-lg transition-all hover:scale-105"
            asChild
          >
            <a href="#about">
              {t('Saiba Mais', 'Conocer Más')}
            </a>
          </Button>
        </div>

        {/* Photo credit with CSS animation */}
        <p
          className="text-xs text-muted-foreground/70 mt-8 italic animate-fade-in"
          style={{ animationDelay: '600ms' }}
        >
          {t(
            '*(foto) Thomas Edison - Inspirados por Edison, reconhecemos hoje os inovadores da segurança.',
            '*(foto) Thomas Edison - Inspirados por Edison, reconocemos hoy a los innovadores de la seguridad.'
          )}
        </p>

        {/* Scroll indicator with CSS animation */}
        <button
          onClick={scrollToSection}
          className="absolute bottom-4 md:bottom-10 left-1/2 -translate-x-1/2 text-muted-foreground hover:text-foreground transition-colors animate-fade-in"
          style={{ animationDelay: '900ms' }}
          aria-label="Scroll to content"
        >
          <ChevronDown className="w-8 h-8 animate-bounce" />
        </button>
      </div>
    </section>
  );
};

export default Hero;
