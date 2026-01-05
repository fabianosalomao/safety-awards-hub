import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Shield, Lightbulb, Users, TrendingUp, Cpu } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

const EvaluationCriteria = () => {
  const { t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const criteria = [
    {
      icon: Shield,
      weight: 30,
      title: t('Impacto na Segurança', 'Impacto en Seguridad'),
      description: t(
        'Redução de riscos, incidentes ou acidentes. Melhoria mensurável em indicadores de segurança.',
        'Reducción de riesgos, incidentes o accidentes. Mejora medible en indicadores de seguridad.'
      ),
      color: 'hsl(var(--primary))',
    },
    {
      icon: Lightbulb,
      weight: 20,
      title: t('Inovação Técnica', 'Innovación Técnica'),
      description: t(
        'Originalidade da solução. Uso criativo de tecnologias, processos ou metodologias.',
        'Originalidad de la solución. Uso creativo de tecnologías, procesos o metodologías.'
      ),
      color: 'hsl(var(--accent))',
    },
    {
      icon: Users,
      weight: 20,
      title: t('Impacto Cultural', 'Impacto Cultural'),
      description: t(
        'Transformação na cultura de segurança. Engajamento de colaboradores e lideranças.',
        'Transformación en la cultura de seguridad. Compromiso de colaboradores y líderes.'
      ),
      color: 'hsl(147 80% 40%)',
    },
    {
      icon: TrendingUp,
      weight: 15,
      title: t('Sustentabilidade Econômica', 'Sostenibilidad Económica'),
      description: t(
        'Viabilidade de manutenção a longo prazo. Retorno sobre investimento demonstrado.',
        'Viabilidad de mantenimiento a largo plazo. Retorno sobre inversión demostrado.'
      ),
      color: 'hsl(200 80% 50%)',
    },
    {
      icon: Cpu,
      weight: 15,
      title: t('Diferencial Tecnológico', 'Diferencial Tecnológico'),
      description: t(
        'Uso de tecnologias emergentes. Potencial de escalabilidade e replicação.',
        'Uso de tecnologías emergentes. Potencial de escalabilidad y replicación.'
      ),
      color: 'hsl(280 70% 55%)',
    },
  ];

  return (
    <section id="criteria" className="py-24 md:py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/20 to-transparent" />
      
      <div className="section-container relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            {t('Critérios de', 'Criterios de')}{' '}
            <span className="text-gradient-gold">{t('Avaliação', 'Evaluación')}</span>
          </h2>
          <div className="section-divider mt-6" />
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mt-6">
            {t(
              'Os projetos serão avaliados com base em cinco pilares estratégicos.',
              'Los proyectos serán evaluados con base en cinco pilares estratégicos.'
            )}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {criteria.map((item, index) => (
            <Tooltip key={index}>
              <TooltipTrigger asChild>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
                  className={`card-elevated p-6 cursor-pointer hover-lift ${
                    index === 0 ? 'lg:col-span-2' : ''
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: `${item.color}20` }}
                    >
                      <item.icon className="w-7 h-7" style={{ color: item.color }} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-bold">{item.title}</h3>
                        <span
                          className="text-sm font-bold px-2 py-0.5 rounded"
                          style={{
                            backgroundColor: `${item.color}20`,
                            color: item.color,
                          }}
                        >
                          {item.weight}%
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {item.description}
                      </p>
                      {/* Progress bar */}
                      <div className="mt-4 h-2 bg-muted rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={isInView ? { width: `${item.weight}%` } : {}}
                          transition={{ duration: 0.8, delay: 0.3 + index * 0.1 }}
                          className="h-full rounded-full"
                          style={{ backgroundColor: item.color }}
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              </TooltipTrigger>
              <TooltipContent side="top" className="max-w-xs">
                <p className="text-sm">{item.description}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EvaluationCriteria;
