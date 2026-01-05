import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Megaphone, Calendar, Clock, Users, Trophy } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const Process = () => {
  const { t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const timeline = [
    {
      icon: Megaphone,
      date: '28/11/2025',
      title: t('Pré-lançamento', 'Pre-lanzamiento'),
      description: t(
        'Engajamento inicial e divulgação do prêmio.',
        'Compromiso inicial y divulgación del premio.'
      ),
    },
    {
      icon: Calendar,
      date: '12/01/2026',
      title: t('Abertura Oficial', 'Apertura Oficial'),
      description: t(
        'Início das inscrições e submissão de projetos.',
        'Inicio de las inscripciones y envío de proyectos.'
      ),
    },
    {
      icon: Clock,
      date: '13/03/2026',
      title: t('Encerramento', 'Cierre'),
      description: t(
        'Prazo final para submissão de projetos.',
        'Plazo final para envío de proyectos.'
      ),
    },
    {
      icon: Users,
      date: '16-27/03/2026',
      title: t('Avaliação do Comitê', 'Evaluación del Comité'),
      description: t(
        'Análise criteriosa por especialistas.',
        'Análisis criterioso por especialistas.'
      ),
    },
    {
      icon: Trophy,
      date: t('Abril/2026', 'Abril/2026'),
      title: t('MSA Safety Summit 2026', 'MSA Safety Summit 2026'),
      description: t(
        'Premiação dos finalistas durante o evento.',
        'Premiación de los finalistas durante el evento.'
      ),
    },
  ];

  return (
    <section id="process" className="py-24 md:py-32 relative">
      <div className="section-container" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            {t('Cronograma do', 'Cronograma del')}{' '}
            <span className="text-gradient-gold">{t('Prêmio', 'Premio')}</span>
          </h2>
          <div className="section-divider mt-6" />
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mt-6">
            {t(
              'Acompanhe as etapas do processo de submissão e avaliação.',
              'Siga las etapas del proceso de envío y evaluación.'
            )}
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          {/* Vertical line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent to-primary/20 -translate-x-1/2" />

          <div className="space-y-8 md:space-y-12">
            {timeline.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                className={`relative flex items-start gap-6 md:gap-0 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Timeline node */}
                <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-card border-2 border-accent flex items-center justify-center z-10">
                  <item.icon className="w-4 h-4 text-accent" />
                </div>

                {/* Content card */}
                <div className={`ml-14 md:ml-0 md:w-[calc(50%-2rem)] ${
                  index % 2 === 0 ? 'md:pr-8 md:text-right' : 'md:pl-8'
                }`}>
                  <div className="card-elevated p-5 hover-lift">
                    <span className="inline-block px-3 py-1 text-xs font-bold rounded-full bg-accent/20 text-accent mb-3">
                      {item.date}
                    </span>
                    <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;
