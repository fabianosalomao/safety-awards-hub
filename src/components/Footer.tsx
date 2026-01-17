import { motion } from 'framer-motion';
import { Linkedin, Mail, Globe, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'react-router-dom';
import logoDark from '@/assets/logo-dark-bg.png';
import logo4x4 from '@/assets/4x4-propaganda.png';

const Footer = () => {
  const { language, setLanguage, t } = useLanguage();

  return (
    <footer id="contact" className="border-t border-border bg-surface-overlay py-12">
      <div className="section-container">
        <div className="grid md:grid-cols-3 gap-8 items-center">
          {/* Logo and tagline */}
          <div className="text-center md:text-left">
            <img
              src={logoDark}
              alt="Safety Innovation Awards"
              className="h-10 w-auto object-contain mb-4 mx-auto md:mx-0"
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
                href="https://www.linkedin.com/company/msa-the-safety-company/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-accent/20 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="mailto:BRSP.MarketingApprentice3@MSASafety.com"
                className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-accent/20 transition-colors"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
            <p className="text-sm text-muted-foreground">
              BRSP.MarketingApprentice3@MSASafety.com
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

        <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Safety Innovation Awards.{' '}
            {t('Todos os direitos reservados.', 'Todos los derechos reservados.')}
          </p>
          
          {/* Crédito da Agência */}
          <div className="flex items-center gap-4">
            <a
              href="https://www.4x4propaganda.com.br"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-1 opacity-60 hover:opacity-100 transition-opacity"
            >
              <img
                src={logo4x4}
                alt="4x4 Propaganda"
                className="h-5 w-auto object-contain"
              />
              <span className="text-[10px] text-muted-foreground">Tecnologia</span>
            </a>
            
            <Link 
              to="/admin/login" 
              className="text-muted-foreground/50 hover:text-muted-foreground transition-colors"
              title={t('Área Restrita', 'Área Restringida')}
            >
              <Lock className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
