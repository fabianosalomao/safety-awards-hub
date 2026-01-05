import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import SubmissionFormModal from '@/components/forms/SubmissionFormModal';

const Submit = () => {
  const { t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [formOpen, setFormOpen] = useState(false);

  return (
    <>
      <section id="submit" className="py-24 md:py-32 relative overflow-hidden">
        {/* Dramatic background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-primary/5 to-transparent" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-primary/20 rounded-full blur-[200px]" />
        </div>

        <div className="section-container relative z-10" ref={ref}>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              {t('Pronto para submeter seu', 'Listo para enviar su')}{' '}
              <span className="text-gradient-gold">{t('projeto', 'proyecto')}</span>?
            </h2>
            <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
              {t(
                'Compartilhe sua inovação em segurança e concorra ao reconhecimento que ela merece.',
                'Comparta su innovación en seguridad y compita por el reconocimiento que merece.'
              )}
            </p>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Button
                size="lg"
                className="group relative overflow-hidden bg-primary hover:bg-primary/90 text-primary-foreground px-10 py-7 text-xl font-bold glow-green"
                onClick={() => setFormOpen(true)}
              >
                <span className="flex items-center gap-3">
                  {t('Submeter Projeto', 'Enviar Proyecto')}
                  <Send className="w-5 h-5" />
                </span>
              </Button>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="text-sm text-muted-foreground mt-6"
            >
              {t(
                'O formulário leva aproximadamente 15-20 minutos para ser preenchido.',
                'El formulario toma aproximadamente 15-20 minutos para completarse.'
              )}
            </motion.p>
          </motion.div>
        </div>
      </section>

      <SubmissionFormModal open={formOpen} onOpenChange={setFormOpen} />
    </>
  );
};

export default Submit;
