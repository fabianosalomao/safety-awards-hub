import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Users, Scale, ShieldCheck } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

// Import committee member photos
import cristianeLage from '@/assets/committee/Cristiane_Lage.jpg';
import ettoreRossi from '@/assets/committee/Ettore_Rossi.jpg';
import ivanRigolleto from '@/assets/committee/Ivan_Rigolleto.jpg';
import annaCristina from '@/assets/committee/Anna_Cristina_Baptista_Pereira.jpg';
import patriciaMantovani from '@/assets/committee/Patricia_Mantovani.jpg';
import patriciaFonseca from '@/assets/committee/Patricia_Fonseca.jpg';
import leonidasSantos from '@/assets/committee/Leonidas_dos_Santos.jpg';
import carlosCarlim from '@/assets/committee/Carlos_Carlim.jpg';
import antonioPinho from '@/assets/committee/Antonio_Pinho.jpg';
import mariaCandida from '@/assets/committee/Maria_Candida_Pedroza_Amado.jpg';
import jorgeThirige from '@/assets/committee/Jorge_Thirige.jpg';

interface CommitteeMember {
  id: number;
  name: string;
  role: string;
  image: string;
}

const Committee = () => {
  const { t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const committeeMembers: CommitteeMember[] = [
    {
      id: 1,
      name: 'Cristiane Lage',
      role: t('Consultora na Insight Fatores Humanos', 'Consultora en Insight Fatores Humanos'),
      image: cristianeLage,
    },
    {
      id: 2,
      name: 'Ettore Rossi',
      role: t('Diretor HSE LATAM na Bayer', 'Director HSE LATAM en Bayer'),
      image: ettoreRossi,
    },
    {
      id: 3,
      name: 'Ivan Rigolleto',
      role: t('Consultor e Instrutor na Safety Wise', 'Consultor e Instructor en Safety Wise'),
      image: ivanRigolleto,
    },
    {
      id: 4,
      name: 'Anna Cristina Baptista Pereira',
      role: t('Professora Coordenadora na FEI, SENAC', 'Profesora Coordinadora en FEI, SENAC'),
      image: annaCristina,
    },
    {
      id: 5,
      name: 'Patricia Mantovani',
      role: t('Gerente Executiva de QSSMA na Movecta', 'Gerente Ejecutiva de QSSMA en Movecta'),
      image: patriciaMantovani,
    },
    {
      id: 6,
      name: 'Patricia Fonseca',
      role: 'Global HSE Governance and Data Intelligence',
      image: patriciaFonseca,
    },
    {
      id: 7,
      name: 'Leonidas dos Santos',
      role: t('Gerente Centro de Excelência - SSMA', 'Gerente Centro de Excelencia - SSMA'),
      image: leonidasSantos,
    },
    {
      id: 8,
      name: 'Carlos Carlim',
      role: t('Senior AI and DATA na Deloitte', 'Senior AI and DATA en Deloitte'),
      image: carlosCarlim,
    },
    {
      id: 9,
      name: 'Antonio Pinho',
      role: t('LATAM Director, HSE & Wellbeing na CHEP', 'Director LATAM, HSE & Wellbeing en CHEP'),
      image: antonioPinho,
    },
    {
      id: 10,
      name: 'Maria Candida Pedroza Amado',
      role: t('Gerente Senior de HSE na Klabin', 'Gerente Senior de HSE en Klabin'),
      image: mariaCandida,
    },
    {
      id: 11,
      name: 'Jorge Thirige',
      role: t('Digital Solutions Manager na Petrobras', 'Digital Solutions Manager en Petrobras'),
      image: jorgeThirige,
    },
  ];

  const features = [
    {
      icon: Users,
      title: t('11 membros', '11 miembros'),
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
              <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-primary/10 flex items-center justify-center">
                <feature.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg md:text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Committee members grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {committeeMembers.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.08 }}
              className="card-elevated p-6 text-center group hover:scale-105 transition-transform duration-300"
            >
              <div className="w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden ring-2 ring-primary/20 group-hover:ring-primary/50 transition-all duration-300">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h4 className="font-bold text-sm mb-1 leading-tight">{member.name}</h4>
              <p className="text-xs text-muted-foreground leading-tight">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Committee;
