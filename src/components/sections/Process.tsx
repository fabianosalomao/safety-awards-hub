import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Send, Search, Users, Presentation } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const Process = () => {
  const { t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const steps = [
    {
      icon: Send,
      step: '01',
      title: t('Submissão', 'Envío'),
      description: t(
        'Preencha o formulário com os detalhes do seu projeto até o prazo final.',
        'Complete el formulario con los detalles de su proyecto hasta el plazo final.'
      ),
    },
    {
      icon: Search,
      step: '02',
      title: t('Triagem Inicial', 'Evaluación Inicial'),
      description: t(
        'Nossa equipe verifica se o projeto atende aos pré-requisitos estabelecidos.',
        'Nuestro equipo verifica si el proyecto cumple con los prerrequisitos establecidos.'
      ),
    },
    {
      icon: Users,
      step: '03',
      title: t('Avaliação do Comitê', 'Evaluación del Comité'),
      description: t(
        'Especialistas avaliam os projetos qualificados com base em critérios técnicos.',
        'Especialistas evalúan los proyectos calificados con base en criterios técnicos.'
      ),
    },
    {
      icon: Presentation,
      step: '04',
      title: t('Apresentação ao Vivo', 'Presentación en Vivo'),
      description: t(
        'Os 3 finalistas apresentam seus projetos durante o Safety Summit.',
        'Los 3 finalistas presentan sus proyectos durante el Safety Summit.'
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
            {t('Processo de', 'Proceso de')}{' '}
            <span className="text-gradient-gold">{t('seleção', 'selección')}</span>
          </h2>
          <div className="section-divider mt-6" />
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mt-6">
            {t(
              'Um processo transparente e criterioso para identificar os melhores projetos.',
              'Un proceso transparente y criterioso para identificar los mejores proyectos.'
            )}
          </p>
        </motion.div>

        <div className="relative">
          {/* Connection line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-accent/30 to-transparent -translate-y-1/2" />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.15 }}
                className="relative"
              >
                <div className="card-elevated p-6 text-center relative z-10 h-full">
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-accent text-accent-foreground flex items-center justify-center text-sm font-bold">
                    {step.step}
                  </div>
                  <div className="w-16 h-16 mx-auto mt-4 mb-5 rounded-xl bg-primary/10 flex items-center justify-center">
                    <step.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold mb-3">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
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
