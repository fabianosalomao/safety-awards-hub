import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Trophy, Plane, Award, Star } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const Awards = () => {
  const { t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="awards" className="py-24 md:py-32 relative overflow-hidden">
      {/* Glow effect */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-accent/10 rounded-full blur-[150px]" />
      </div>

      <div className="section-container relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            {t('Premiação e', 'Premiación y')}{' '}
            <span className="text-gradient-gold">{t('Reconhecimento', 'Reconocimiento')}</span>
          </h2>
          <div className="section-divider mt-6" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Finalists card */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="card-elevated p-8 border-primary/30 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center">
                  <Award className="w-7 h-7 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">
                    {t('3 Finalistas', '3 Finalistas')}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {t('Divulgação no MSA Safety Summit 2026', 'Presentación en MSA Safety Summit 2026')}
                  </p>
                </div>
              </div>
              <ul className="space-y-3">
                {[
                  t('Homenagem ao vivo para o público', 'Homenaje en vivo para el público'),
                  t('Reconhecimento oficial da indústria', 'Reconocimiento de la industria a nivel Latinoamérica'),
                  t('Networking com líderes de segurança', 'Networking con líderes de seguridad'),
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-muted-foreground">
                    <Star className="w-4 h-4 text-primary flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Grand prize card */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="card-elevated p-8 border-accent/30 relative overflow-hidden glow-gold"
          >
            <div className="absolute top-0 right-0 w-40 h-40 bg-accent/20 rounded-full blur-3xl" />
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-xl bg-accent/20 flex items-center justify-center">
                  <Trophy className="w-7 h-7 text-accent" />
                </div>
                <h3 className="text-xl font-bold text-gradient-gold">
                  {t('Primeiro Lugar', 'Primer Lugar')}
                </h3>
              </div>
              <div className="p-4 rounded-lg bg-accent/10 border border-accent/20 mb-4">
                <div className="flex items-center gap-3">
                  <Plane className="w-6 h-6 text-accent" />
                  <span className="font-semibold">
                    {t(
                      'Visita às instalações corporativas da MSA Safety e acesso ao NSC Safety Congress & Expo.',
                      'Visita a las instalaciones de MSA Safety Corporativo y acceso al NSC Safety Congress & Expo.'
                    )}
                  </span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                {t(
                  'Uma visita guiada para conhecer de perto as inovações que estão definindo o futuro da segurança em nível mundial.',
                  'Un recorrido diseñado para conocer de primera mano las innovaciones que están definiendo el futuro de la seguridad a nivel mundial.'
                )}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Awards;
