import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import logoDark from '@/assets/logo-dark-bg.png';

const Header = () => {
  const { language, setLanguage, t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { id: 'hero', labelPT: 'Início', labelES: 'Inicio' },
    { id: 'about', labelPT: 'O Prêmio', labelES: 'El Premio' },
    { id: 'eligibility', labelPT: 'Participar', labelES: 'Participar' },
    { id: 'criteria', labelPT: 'Critérios', labelES: 'Criterios' },
    { id: 'committee', labelPT: 'Comitê', labelES: 'Comité' },
    { id: 'awards', labelPT: 'Premiação', labelES: 'Premiación' },
    { id: 'contact', labelPT: 'Contato', labelES: 'Contacto' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setIsOpen(false);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleLanguage = () => {
    setLanguage(language === 'pt' ? 'es' : 'pt');
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-background/90 backdrop-blur-md border-b border-border/50'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <button
            onClick={scrollToTop}
            className="flex items-center hover:opacity-80 transition-opacity"
          >
            <img
              src={logoDark}
              alt="Safety Innovation Awards"
              className="h-8 md:h-10 w-auto object-contain"
            />
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                {language === 'pt' ? link.labelPT : link.labelES}
              </button>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-4">
            <button
              onClick={toggleLanguage}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-2 py-1 rounded border border-border/50 hover:border-border"
            >
              {language === 'pt' ? 'ES' : 'PT'}
            </button>
            <Button
              onClick={() => scrollToSection('submit')}
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              {t('Submeter Projeto', 'Enviar Proyecto')}
            </Button>
          </div>

          {/* Mobile Menu */}
          <div className="lg:hidden flex items-center gap-3">
            <button
              onClick={toggleLanguage}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-2 py-1 rounded border border-border/50"
            >
              {language === 'pt' ? 'ES' : 'PT'}
            </button>
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-foreground">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-72 bg-background border-border">
                <nav className="flex flex-col gap-6 mt-8">
                  {navLinks.map((link) => (
                    <button
                      key={link.id}
                      onClick={() => scrollToSection(link.id)}
                      className="text-lg font-medium text-foreground hover:text-primary transition-colors text-left"
                    >
                      {language === 'pt' ? link.labelPT : link.labelES}
                    </button>
                  ))}
                  <Button
                    onClick={() => scrollToSection('submit')}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground mt-4"
                  >
                    {t('Submeter Projeto', 'Enviar Proyecto')}
                  </Button>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
