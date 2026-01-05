import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import logoDark from '@/assets/logo-dark-bg.png';
import thomasEdison from '@/assets/thomas-edison.jpg';

const Hero = () => {
  const { t } = useLanguage();

  const scrollToSection = () => {
    const element = document.getElementById('about');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Parallax Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{ backgroundImage: `url(${thomasEdison})` }}
      />
      
      {/* Dark Overlay for readability */}
      <div className="absolute inset-0 bg-black/70" />
      
      {/* Ambient glow effect */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[150px] opacity-60" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/10 rounded-full blur-[100px] opacity-40" />
      </div>

      <div className="section-container relative z-10 text-center py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="mb-8"
        >
          <img
            src={logoDark}
            alt="Safety Innovation Awards"
            className="h-20 md:h-28 lg:h-32 mx-auto"
          />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
        >
          {t(
            'Reconhecendo inovações que',
            'Reconociendo innovaciones que'
          )}
          <br />
          <span className="text-gradient-gold">
            {t('salvam vidas', 'salvan vidas')}
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          {t(
            'Tecnologia que protege vidas. Projetos que inspiram o futuro da segurança na América Latina.',
            'Innovación con propósito. Seguridad que transforma el futuro de América Latina.'
          )}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Button
            size="lg"
            className="group relative overflow-hidden bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg font-semibold glow-green"
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
            className="border-accent/50 text-accent hover:bg-accent/10 hover:border-accent px-8 py-6 text-lg"
            asChild
          >
            <a href="#about">
              {t('Saiba Mais', 'Conocer Más')}
            </a>
          </Button>
        </motion.div>

        {/* Photo credit */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="text-xs text-muted-foreground/70 mt-8 italic"
        >
          {t(
            '*(foto) Thomas Edison - Inspirados por Edison, reconhecemos hoje os inovadores da segurança.',
            '*(foto) Thomas Edison - Inspirados por Edison, reconocemos hoy a los innovadores de la seguridad.'
          )}
        </motion.p>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          onClick={scrollToSection}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Scroll to content"
        >
          <ChevronDown className="w-8 h-8 animate-bounce" />
        </motion.button>
      </div>
    </section>
  );
};

export default Hero;
