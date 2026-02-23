import { useRef, useEffect, useState } from 'react';
import { Award, Globe, Users } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const About = () => {
  const { t } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  // Use native IntersectionObserver instead of framer-motion
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect(); // Once triggered, stop observing
        }
      },
      { rootMargin: '-100px' }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  const features = [
    {
      icon: Award,
      title: t('Reconhecimento', 'Reconocimiento'),
      description: t(
        'Premiamos inovações implementadas que demonstraram resultados tangíveis em segurança.',
        'Premiamos soluciones implementadas que han mostrado resultados tangibles en seguridad.'
      ),
    },
    {
      icon: Globe,
      title: t('Alcance Latino-Americano', 'Alcance Latinoamericano'),
      description: t(
        'Conectamos inovações de segurança do trabalho da América Latina em uma comunidade de excelência.',
        'Los mejores proyectos de seguridad laboral de la región conectando con nuestra comunidad.'
      ),
    },
    {
      icon: Users,
      title: t('Integrado ao MSA Safety Summit 2026', 'Integrado al MSA Safety Summit 2026'),
      description: t(
        'Os finalistas serão homenageados durante o maior summit de segurança do trabalho da América Latina.',
        'Los finalistas serán reconocidos durante el evento de seguridad más importante de Latinoamérica.'
      ),
    },
  ];

  return (
    <section id="about" className="py-24 md:py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      
      <div className="section-container relative z-10" ref={ref}>
        <div
          className={`text-center mb-16 transition-all duration-600 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            {t('O que é o ', '¿Qué son los ')}
            <span className="text-gradient-gold">Safety Innovation Awards</span>
            {t('', '?')}
          </h2>
          <div className="section-divider mt-6" />
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div
            className={`space-y-6 transition-all duration-600 delay-200 ${
              isInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
            }`}
          >
            <p className="text-lg text-muted-foreground leading-relaxed">
              {t(
                'O Safety Innovation Awards é a premiação que reconhece e celebra projetos que estão transformando a segurança no trabalho na América Latina.',
                'Los Safety Innovation Awards es la manera en la que reconocemos y celebramos los proyectos que están transformando la seguridad laboral en Latinoamérica.'
              )}
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {t(
                'Mais do que um prêmio, é um movimento para destacar profissionais e empresas que colocam a vida das pessoas em primeiro lugar, usando tecnologia e inovação como ferramentas de proteção.',
                'Más que un premio, es la manera en la que reconocemos a las empresas y profesionales que priorizan la seguridad, usando la tecnología y la innovación para proteger a las personas.'
              )}
            </p>
            <p className="text-xl md:text-2xl font-semibold text-foreground">
              {t(
                'Porque inovações que salvam vidas merecem reconhecimento.',
                'Porque las innovaciones que salvan vidas merecen reconocimiento.'
              )}
            </p>
          </div>

          <div
            className={`grid gap-6 transition-all duration-600 delay-400 ${
              isInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
            }`}
          >
            {features.map((feature, index) => (
              <div
                key={index}
                className="card-elevated p-6 hover-lift flex items-start gap-4"
              >
                <div className="p-3 rounded-lg bg-primary/10 text-primary">
                  <feature.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
