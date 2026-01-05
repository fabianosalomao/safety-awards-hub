import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Linkedin, QrCode, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

const Integration = () => {
  const { t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="integration" className="py-24 md:py-32 relative">
      <div className="section-container" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            {t('Compartilhe e', 'Comparta y')}{' '}
            <span className="text-gradient-gold">{t('Divulgue', 'Difunda')}</span>
          </h2>
          <div className="section-divider mt-6" />
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mt-6">
            {t(
              'Ajude a espalhar a palavra sobre o Safety Innovation Awards.',
              'Ayude a difundir la palabra sobre el Safety Innovation Awards.'
            )}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="card-elevated p-8 text-center"
          >
            <div className="w-16 h-16 mx-auto mb-6 rounded-xl bg-[#0A66C2]/20 flex items-center justify-center">
              <Linkedin className="w-8 h-8 text-[#0A66C2]" />
            </div>
            <h3 className="text-xl font-bold mb-3">
              {t('Siga-nos no LinkedIn', 'Síganos en LinkedIn')}
            </h3>
            <p className="text-muted-foreground mb-6">
              {t(
                'Acompanhe novidades e atualizações sobre o prêmio.',
                'Siga las novedades y actualizaciones sobre el premio.'
              )}
            </p>
            <Button
              variant="outline"
              className="border-[#0A66C2]/50 text-[#0A66C2] hover:bg-[#0A66C2]/10"
              asChild
            >
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <Share2 className="w-4 h-4" />
                {t('Seguir no LinkedIn', 'Seguir en LinkedIn')}
              </a>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="card-elevated p-8 text-center"
          >
            <div className="w-16 h-16 mx-auto mb-6 rounded-xl bg-accent/20 flex items-center justify-center">
              <QrCode className="w-8 h-8 text-accent" />
            </div>
            <h3 className="text-xl font-bold mb-3">
              {t('QR Code para Divulgação', 'QR Code para Difusión')}
            </h3>
            <p className="text-muted-foreground mb-6">
              {t(
                'Use em materiais impressos e apresentações.',
                'Use en materiales impresos y presentaciones.'
              )}
            </p>
            <div className="w-32 h-32 mx-auto bg-white rounded-lg flex items-center justify-center">
              <QrCode className="w-24 h-24 text-background" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Integration;
