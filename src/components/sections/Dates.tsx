import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Calendar, AlertCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const Dates = () => {
  const { t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="dates" className="py-24 md:py-32 relative">
      <div className="section-container" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            {t('Prazo final para', 'Plazo final para')}{' '}
            <span className="text-gradient-gold">{t('submissão do projeto', 'envío del proyecto')}</span>
          </h2>
          <div className="section-divider mt-6" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-2xl mx-auto"
        >
          <div className="card-elevated p-8 md:p-10 border-destructive/30 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-destructive/10 via-transparent to-accent/10" />
            <div className="relative z-10 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-destructive/10 border border-destructive/30 mb-6">
                <AlertCircle className="w-5 h-5 text-destructive" />
                <span className="text-destructive font-medium text-sm">
                  {t('Prazo Final', 'Plazo Final')}
                </span>
              </div>
              <div className="flex items-center justify-center gap-4 mb-4">
                <Calendar className="w-10 h-10 text-accent" />
                <div className="text-left">
                  <p className="text-4xl md:text-5xl font-bold text-gradient-gold">
                    27 {t('de Março', 'de Marzo')}
                  </p>
                  <p className="text-muted-foreground">
                    {t('Último dia para submissão', 'Último día para envío')}
                  </p>
                </div>
              </div>
              <p className="text-muted-foreground mt-6">
                {t(
                  'Não perca a oportunidade de ter seu projeto reconhecido em toda América Latina.',
                  'No pierda la oportunidad de tener su proyecto reconocido en toda América Latina.'
                )}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Dates;
