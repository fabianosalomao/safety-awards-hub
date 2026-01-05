import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { User, Clock, Users, Scale, ShieldCheck } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const Committee = () => {
  const { t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const placeholders = Array(4).fill(null);

  const features = [
    {
      icon: Users,
      title: t('7 a 11 membros', '7 a 11 miembros'),
      description: t(
        'Especialistas de mercado, academia, regulação e inovação.',
        'Especialistas de mercado, academia, regulación e innovación.'
      ),
    },
    {
      icon: Scale,
      title: t('Avaliação híbrida', 'Evaluación híbrida'),
      description: t(
        'Análise individual seguida de deliberação coletiva.',
        'Análisis individual seguido de deliberación colectiva.'
      ),
    },
    {
      icon: ShieldCheck,
      title: t('Imparcialidade', 'Imparcialidad'),
      description: t(
        'Garantia de diversidade e critérios objetivos.',
        'Garantía de diversidad y criterios objetivos.'
      ),
    },
  ];

  return (
    <section id="committee" className="py-24 md:py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/30 to-transparent" />
      
      <div className="section-container relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            {t('Comitê', 'Comité')}{' '}
            <span className="text-gradient-gold">{t('Avaliador', 'Evaluador')}</span>
          </h2>
          <div className="section-divider mt-6" />
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mt-6">
            {t(
              'Especialistas reconhecidos em segurança do trabalho e inovação.',
              'Especialistas reconocidos en seguridad laboral e innovación.'
            )}
          </p>
        </motion.div>

        {/* Committee features */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
              className="card-elevated p-6 text-center"
            >
              <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-primary/10 flex items-center justify-center">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-bold mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Placeholder members */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {placeholders.map((_, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              className="card-elevated p-6 text-center"
            >
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                <User className="w-10 h-10 text-muted-foreground" />
              </div>
              <div className="h-4 w-3/4 mx-auto bg-muted rounded mb-2" />
              <div className="h-3 w-1/2 mx-auto bg-muted rounded" />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex items-center justify-center gap-3 text-muted-foreground"
        >
          <Clock className="w-5 h-5 text-accent" />
          <span className="text-sm font-medium">
            {t('Comitê em formação — acompanhe novidades', 'Comité en formación — siga las novedades')}
          </span>
        </motion.div>
      </div>
    </section>
  );
};

export default Committee;
