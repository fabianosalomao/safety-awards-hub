import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { FileText, Wrench, BarChart3, BookOpen, RefreshCw, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const Prerequisites = () => {
  const { t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const requirements = [
    {
      icon: FileText,
      title: t('Cenário Atual', 'Escenario Actual'),
      description: t(
        'Descreva o contexto e os desafios de segurança que motivaram o projeto.',
        'Describa el contexto y los desafíos de seguridad que motivaron el proyecto.'
      ),
    },
    {
      icon: Wrench,
      title: t('Solução Implementada', 'Solución Implementada'),
      description: t(
        'Detalhe a inovação ou melhoria que foi desenvolvida e aplicada.',
        'Detalle la innovación o mejora que fue desarrollada y aplicada.'
      ),
    },
    {
      icon: BarChart3,
      title: t('Resultados Obtidos', 'Resultados Obtenidos'),
      description: t(
        'Apresente métricas, dados e evidências do impacto gerado.',
        'Presente métricas, datos y evidencias del impacto generado.'
      ),
    },
    {
      icon: BookOpen,
      title: t('Principal Aprendizado', 'Principal Aprendizaje'),
      description: t(
        'Compartilhe os insights e lições aprendidas durante o projeto.',
        'Comparta los insights y lecciones aprendidas durante el proyecto.'
      ),
    },
    {
      icon: RefreshCw,
      title: t('O que faria diferente', 'Qué haría diferente'),
      description: t(
        'Reflexão sobre oportunidades de melhoria identificadas.',
        'Reflexión sobre oportunidades de mejora identificadas.'
      ),
    },
  ];

  return (
    <section id="prerequisites" className="py-24 md:py-32 relative overflow-hidden">
      {/* Background emphasis */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-primary/5" />
      
      <div className="section-container relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/30 mb-6">
            <CheckCircle2 className="w-5 h-5 text-accent" />
            <span className="text-accent font-medium text-sm">
              {t('Critérios Essenciais', 'Criterios Esenciales')}
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            {t('Pré-requisitos do', 'Prerrequisitos del')}{' '}
            <span className="text-gradient-gold">{t('projeto', 'proyecto')}</span>
          </h2>
          <div className="section-divider mt-6" />
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mt-6">
            {t(
              'Seu projeto precisa abordar todos estes pontos para ser considerado.',
              'Su proyecto necesita abordar todos estos puntos para ser considerado.'
            )}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {requirements.map((req, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
              className={`p-6 rounded-xl border-2 border-dashed border-accent/30 bg-accent/5 hover:border-accent/50 hover:bg-accent/10 transition-all duration-300 ${
                index === 4 ? 'md:col-span-2 lg:col-span-1' : ''
              }`}
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center">
                  <req.icon className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-bold text-accent/80 uppercase tracking-wider">
                      {t('Item', 'Ítem')} {index + 1}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold mb-2">{req.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {req.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 text-center"
        >
          <p className="text-muted-foreground">
            {t(
              'Projetos incompletos ou sem resultados mensuráveis não serão avaliados.',
              'Proyectos incompletos o sin resultados medibles no serán evaluados.'
            )}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Prerequisites;
