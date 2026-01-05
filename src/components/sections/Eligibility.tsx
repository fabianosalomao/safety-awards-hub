import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Building2, Users, Cog, Factory } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const Eligibility = () => {
  const { t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const profiles = [
    {
      icon: Building2,
      title: t('Empresas', 'Empresas'),
      description: t(
        'Organizações de qualquer porte que implementaram projetos inovadores de segurança.',
        'Organizaciones de cualquier tamaño que implementaron proyectos innovadores de seguridad.'
      ),
    },
    {
      icon: Users,
      title: t('Equipes de SST/EHS', 'Equipos de SST/EHS'),
      description: t(
        'Times de segurança que desenvolveram soluções criativas para desafios reais.',
        'Equipos de seguridad que desarrollaron soluciones creativas para desafíos reales.'
      ),
    },
    {
      icon: Cog,
      title: t('Profissionais', 'Profesionales'),
      description: t(
        'Especialistas que lideram iniciativas transformadoras em suas organizações.',
        'Especialistas que lideran iniciativas transformadoras en sus organizaciones.'
      ),
    },
    {
      icon: Factory,
      title: t('Indústrias Inovadoras', 'Industrias Innovadoras'),
      description: t(
        'Setores que valorizam segurança como diferencial estratégico e competitivo.',
        'Sectores que valoran la seguridad como diferencial estratégico y competitivo.'
      ),
    },
  ];

  return (
    <section id="eligibility" className="py-24 md:py-32 relative">
      <div className="section-container" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            {t('Quem pode', 'Quién puede')}{' '}
            <span className="text-gradient-gold">{t('participar', 'participar')}</span>
          </h2>
          <div className="section-divider mt-6" />
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mt-6">
            {t(
              'A submissão é livre para todos os perfis. Cada empresa pode ter no máximo 1 projeto finalista.',
              'La participación es libre para todos los perfiles. Cada empresa puede tener máximo 1 proyecto finalista.'
            )}
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {profiles.map((profile, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
              className="card-elevated p-6 hover-lift group text-center"
            >
              <div className="w-16 h-16 mx-auto mb-5 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <profile.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-bold mb-3">{profile.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {profile.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Eligibility;
