import { Award } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import PhotoCarousel from '@/components/ui/PhotoCarousel';

interface FinalistData {
  title: string;
  company: string;
  country: { pt: string; es: string };
  team: string[];
  images: string[];
  videoUrl: string;
}

const finalistsData: FinalistData[] = [
  {
    title: 'Gold Fields & Safetymind: IA proactiva para la erradicación de accidentes fatales',
    company: 'Gold Fields Perú',
    country: { pt: 'Peru', es: 'Perú' },
    team: ['Elizabeth Acuña', 'Luis Sanchez', 'Mario Villalobos'],
    images: ['/event/finalist-1/f1-1.webp', '/event/finalist-1/f1-2.webp', '/event/finalist-1/f1-3.webp'],
    videoUrl: 'https://www.youtube.com/embed/zVRwp0l-DHE?list=PLKUq16ZcXwRruWe2VL2zcdtZGo_sWBOTL',
  },
  {
    title: 'Implementación tecnológica de dron autónomo y robot cuadrúpedo para detección de peligros y riesgos',
    company: 'Techgen S.A. de C.V.',
    country: { pt: 'México', es: 'México' },
    team: ['Jose Antonio Torres Moreno', 'Alan Santiago Alanis Vargas', 'Mauricio Guerrero Marquez'],
    images: ['/event/finalist-2/f2-1.webp', '/event/finalist-2/f2-2.webp'],
    videoUrl: 'https://www.youtube.com/embed/AodOuzGReV0?list=PLKUq16ZcXwRruWe2VL2zcdtZGo_sWBOTL',
  },
];

const OtherFinalists = () => {
  const { t, language } = useLanguage();

  return (
    <section className="py-16 md:py-24 relative">
      <div className="absolute bottom-0 left-0 w-[500px] h-[400px] bg-accent/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="section-container relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-14">
          <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-accent mb-3 px-4 py-1.5 rounded-full border border-accent/30 bg-accent/10">
            <Award className="w-3.5 h-3.5" />
            {t('Top 3 · Finalistas homenageados', 'Top 3 · Finalistas homenajeados')}
          </span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3">
            {t(
              'Reconhecimento aos demais finalistas',
              'Reconocimiento a los demás finalistas'
            )}
          </h2>
          <p className="text-muted-foreground">
            {t(
              'Os outros dois projetos do Top 3 também subiram ao palco e receberam placa de homenagem pela excelência, pela iniciativa e pela presença no MSA Safety Summit 2026.',
              'Los otros dos proyectos del Top 3 también subieron al escenario y recibieron una placa de homenaje por la excelencia, la iniciativa y la presencia en el MSA Safety Summit 2026.'
            )}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {finalistsData.map((f) => (
            <article
              key={f.company}
              className="group rounded-2xl border border-border bg-card/60 backdrop-blur-sm hover:border-accent/40 transition-all duration-500 overflow-hidden flex flex-col"
            >
              <PhotoCarousel
                images={f.images}
                alt={f.company}
                aspect="aspect-video"
                rounded="rounded-none"
              />

              <div className="p-5 md:p-6 flex flex-col gap-4 flex-1">
                <div className="flex items-start justify-between gap-3">
                  <span className="text-xs font-semibold tracking-wide uppercase text-muted-foreground">
                    {f.company}
                  </span>
                  <span className="shrink-0 text-[11px] font-semibold px-2.5 py-1 rounded-md bg-accent/10 text-accent border border-accent/20">
                    {f.country[language === 'es' ? 'es' : 'pt']}
                  </span>
                </div>

                <h3 className="text-base md:text-lg font-semibold leading-snug">
                  {f.title}
                </h3>

                <div className="text-xs text-muted-foreground">
                  <span className="block uppercase tracking-[0.16em] text-accent/80 font-semibold mb-1">
                    {t('Equipe', 'Equipo')}
                  </span>
                  {f.team.join(' · ')}
                </div>

                <div className="aspect-video rounded-lg overflow-hidden border border-border/60 mt-1">
                  <iframe
                    className="w-full h-full"
                    src={f.videoUrl}
                    title={f.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    loading="lazy"
                  />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OtherFinalists;
