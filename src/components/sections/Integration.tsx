import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Linkedin, QrCode, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import qrCodeImage from '@/assets/qrcode.png';
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
            {t('Compartilhe e', 'Pasa la')}{' '}
            <span className="text-gradient-gold">{t('Divulgue', 'voz')}</span>
          </h2>
          <div className="section-divider mt-6" />
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mt-6">
            {t(
              'Ajude a espalhar sobre o Safety Innovation Awards.',
              'Ayúdanos a compartir para conocer más iniciativas que han ayudado a crecer la cultura de seguridad y poder reconocerlas.'
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
              {t('Siga-nos no LinkedIn', 'Síguenos en LinkedIn')}
            </h3>
            <Button
              variant="outline"
              className="border-[#0A66C2]/50 text-[#0A66C2] hover:bg-[#0A66C2]/10"
              asChild
            >
              <a
                href="https://www.linkedin.com/company/msa-the-safety-company/"
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
              {t('QR Code para Divulgação', 'Código QR para compartir')}
            </h3>
            <div className="w-32 h-32 mx-auto bg-white rounded-lg flex items-center justify-center p-2">
              <img src={qrCodeImage} alt="QR Code Safety Innovation Awards" className="w-full h-full object-contain" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Integration;
