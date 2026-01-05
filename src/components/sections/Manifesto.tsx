import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Heart, Shield, Lightbulb } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const Manifesto = () => {
  const { t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const values = [
    {
      icon: Heart,
      phrase: t('Pessoas no centro', 'Personas en el centro'),
      description: t(
        'Cada inovação que premiamos coloca a vida humana como prioridade absoluta.',
        'Cada innovación que premiamos pone la vida humana como prioridad absoluta.'
      ),
    },
    {
      icon: Shield,
      phrase: t('Segurança como valor estratégico', 'Seguridad como valor estratégico'),
      description: t(
        'Empresas líderes entendem que segurança é investimento, não custo.',
        'Las empresas líderes entienden que la seguridad es inversión, no costo.'
      ),
    },
    {
      icon: Lightbulb,
      phrase: t('Inovações que salvam vidas', 'Innovaciones que salvan vidas'),
      description: t(
        'Soluções criativas e tecnológicas que fazem a diferença no dia a dia.',
        'Soluciones creativas y tecnológicas que hacen la diferencia en el día a día.'
      ),
    },
  ];

  return (
    <section id="manifesto" className="py-24 md:py-32 relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-accent/5 rounded-full blur-[150px]" />
      </div>

      <div className="section-container relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            {t('Por que este prêmio', 'Por qué este premio')}{' '}
            <span className="text-gradient-gold">{t('existe', 'existe')}</span>
          </h2>
          <div className="section-divider mt-6" />
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mt-6">
            {t(
              'Acreditamos que reconhecer a excelência em segurança inspira toda uma indústria a evoluir.',
              'Creemos que reconocer la excelencia en seguridad inspira a toda una industria a evolucionar.'
            )}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.15 }}
              className="text-center group"
            >
              <div className="relative mb-6 inline-flex">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-accent/20 to-accent/5 border border-accent/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <value.icon className="w-10 h-10 text-accent" />
                </div>
                <div className="absolute inset-0 bg-accent/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gradient-gold">
                {value.phrase}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {value.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 p-8 md:p-12 card-elevated border-accent/20 text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-primary/10" />
          <blockquote className="relative z-10">
            <p className="text-2xl md:text-3xl font-light italic text-foreground leading-relaxed">
              "{t(
                'Quando inovamos em segurança, não protegemos apenas trabalhadores — protegemos famílias, comunidades e o futuro.',
                'Cuando innovamos en seguridad, no protegemos solo trabajadores — protegemos familias, comunidades y el futuro.'
              )}"
            </p>
          </blockquote>
        </motion.div>
      </div>
    </section>
  );
};

export default Manifesto;
