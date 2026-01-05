import { motion } from 'framer-motion';
import { Linkedin, Mail, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import logoDark from '@/assets/logo-dark-bg.png';

const Footer = () => {
  const { language, setLanguage, t } = useLanguage();

  return (
    <footer className="border-t border-border bg-surface-overlay py-12">
      <div className="section-container">
        <div className="grid md:grid-cols-3 gap-8 items-center">
          {/* Logo and tagline */}
          <div className="text-center md:text-left">
            <img
              src={logoDark}
              alt="Safety Innovation Awards"
              className="h-10 mb-4 mx-auto md:mx-0"
            />
            <p className="text-sm text-muted-foreground">
              {t(
                'Uma iniciativa integrada ao MSA Safety Summit 2026',
                'Una iniciativa integrada al MSA Safety Summit 2026'
              )}
            </p>
          </div>

          {/* Contact and social */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-4 mb-4">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-accent/20 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="mailto:contato@safetyinnovationawards.com"
                className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-accent/20 transition-colors"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
            <p className="text-sm text-muted-foreground">
              contato@safetyinnovationawards.com
            </p>
          </div>

          {/* Language switcher */}
          <div className="text-center md:text-right">
            <div className="inline-flex items-center gap-2 p-1 bg-muted rounded-lg">
              <Button
                variant={language === 'pt' ? 'secondary' : 'ghost'}
                size="sm"
                onClick={() => setLanguage('pt')}
                className={language === 'pt' ? 'bg-primary text-primary-foreground' : ''}
              >
                <Globe className="w-4 h-4 mr-1" />
                PT
              </Button>
              <Button
                variant={language === 'es' ? 'secondary' : 'ghost'}
                size="sm"
                onClick={() => setLanguage('es')}
                className={language === 'es' ? 'bg-primary text-primary-foreground' : ''}
              >
                <Globe className="w-4 h-4 mr-1" />
                ES
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Safety Innovation Awards.{' '}
            {t('Todos os direitos reservados.', 'Todos los derechos reservados.')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
