import { useState, useRef, useEffect, useMemo } from 'react';
import { Search, X, ChevronDown, ChevronUp, Users, Award, MapPin, Building2 } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { finalists, countryNames, type CountryCode } from '@/data/finalists';

const allCountries: CountryCode[] = ["BR", "CL", "PE", "MX", "EQ", "AR"];

// Remove accents for search
const normalize = (s: string) =>
  s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

const Finalists = () => {
  const { t, language } = useLanguage();
  const [search, setSearch] = useState('');
  const [countryFilter, setCountryFilter] = useState<CountryCode | null>(null);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setIsVisible(true); obs.disconnect(); } },
      { threshold: 0.05 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const filtered = useMemo(() => {
    const q = normalize(search);
    return finalists.filter((f) => {
      if (countryFilter && f.country !== countryFilter) return false;
      if (!q) return true;
      const countryName = normalize(countryNames[f.country][language === 'es' ? 'es' : 'pt']);
      const haystack = [
        f.title, f.company, ...f.team, f.incentivador ?? '', countryName,
      ].map(normalize).join(' ');
      return haystack.includes(q);
    });
  }, [search, countryFilter, language]);

  const uniqueCompanies = new Set(finalists.map(f => f.company)).size;

  const stats = [
    { value: '20', label: t('projetos', 'proyectos') },
    { value: '6', label: t('países', 'países') },
    { value: String(uniqueCompanies), label: t('empresas', 'empresas') },
  ];

  const clearFilters = () => { setSearch(''); setCountryFilter(null); };

  return (
    <section id="finalistas" ref={sectionRef} className="py-20 md:py-28 relative">
      {/* Subtle top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="section-container relative z-10">
        {/* Header */}
        <div
          className="text-center mb-12 md:mb-16 transition-all duration-700"
          style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(30px)' }}
        >
          <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-accent mb-4 px-4 py-1.5 rounded-full border border-accent/20 bg-accent/5">
            {t('Fase 2', 'Fase 2')}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            20 {t('projetos finalistas', 'proyectos finalistas')}
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            {t(
              'Conheça as iniciativas selecionadas para a 2ª fase do Safety Innovation Awards 2026. Busque por projeto, empresa, integrante, incentivador ou país.',
              'Conozca las iniciativas seleccionadas para la segunda fase del Safety Innovation Awards 2026. Busque por proyecto, empresa, integrante, impulsor o país.'
            )}
          </p>
        </div>

        {/* Stats */}
        <div
          className="flex justify-center gap-4 md:gap-8 mb-10 md:mb-14 transition-all duration-700 delay-100"
          style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(20px)' }}
        >
          {stats.map((s) => (
            <div
              key={s.label}
              className="flex flex-col items-center px-5 py-4 md:px-8 md:py-5 rounded-xl border border-border bg-card/60 backdrop-blur-sm min-w-[100px]"
            >
              <span className="text-2xl md:text-3xl font-bold text-accent">{s.value}</span>
              <span className="text-xs md:text-sm text-muted-foreground mt-1">{s.label}</span>
            </div>
          ))}
        </div>

        {/* Search bar */}
        <div
          className="max-w-2xl mx-auto mb-6 transition-all duration-700 delay-200"
          style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(20px)' }}
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t(
                'Buscar por projeto, empresa, integrante, incentivador ou país',
                'Buscar por proyecto, empresa, integrante, impulsor o país'
              )}
              className="w-full h-12 md:h-14 pl-12 pr-12 rounded-xl border border-border bg-card/80 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent/50 transition-all text-sm md:text-base"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Country filters */}
        <div
          className="flex flex-wrap justify-center gap-2 mb-4 transition-all duration-700 delay-300"
          style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(20px)' }}
        >
          <button
            onClick={() => setCountryFilter(null)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all border ${
              !countryFilter
                ? 'bg-accent/15 border-accent/40 text-accent'
                : 'bg-card/60 border-border text-muted-foreground hover:text-foreground hover:border-border/80'
            }`}
          >
            {t('Todos', 'Todos')}
          </button>
          {allCountries.map((code) => (
            <button
              key={code}
              onClick={() => setCountryFilter(countryFilter === code ? null : code)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all border ${
                countryFilter === code
                  ? 'bg-accent/15 border-accent/40 text-accent'
                  : 'bg-card/60 border-border text-muted-foreground hover:text-foreground hover:border-border/80'
              }`}
            >
              {countryNames[code][language === 'es' ? 'es' : 'pt']}
            </button>
          ))}
        </div>

        {/* Institutional notice */}
        <div
          className="max-w-3xl mx-auto mb-8 px-5 py-4 rounded-xl border border-border/60 bg-card/40 backdrop-blur-sm transition-all duration-700 delay-300"
          style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(20px)' }}
        >
          <p className="text-sm text-muted-foreground leading-relaxed text-center">
            {language === 'es' ? (
              <>
                Los proyectos finalistas se presentan en orden alfabético. En la segunda fase, la evaluación es realizada por el Comité Evaluador del Safety Innovation Awards, integrado por especialistas reconocidos en seguridad laboral e innovación, sin participación de MSA en este proceso.{' '}
                <a
                  href="#committee"
                  onClick={(e) => { e.preventDefault(); document.getElementById('committee')?.scrollIntoView({ behavior: 'smooth' }); }}
                  className="text-accent hover:text-accent/80 underline underline-offset-2 transition-colors font-medium"
                >
                  Conozca al Comité Evaluador
                </a>
                .
              </>
            ) : (
              <>
                Os projetos finalistas estão apresentados em ordem alfabética. Na segunda fase, a avaliação é realizada pelo Comitê Avaliador do Safety Innovation Awards, formado por especialistas reconhecidos em segurança do trabalho e inovação, sem participação da MSA nesse processo.{' '}
                <a
                  href="#comite"
                  onClick={(e) => { e.preventDefault(); document.getElementById('comite')?.scrollIntoView({ behavior: 'smooth' }); }}
                  className="text-accent hover:text-accent/80 underline underline-offset-2 transition-colors font-medium"
                >
                  Conheça o Comitê Avaliador
                </a>
                .
              </>
            )}
          </p>
        </div>

        {/* Results count + clear */}
        <div className="flex justify-center items-center gap-3 mb-8 text-sm text-muted-foreground">
          <span>
            {filtered.length} {filtered.length === 1 ? t('resultado', 'resultado') : t('resultados', 'resultados')}
          </span>
          {(search || countryFilter) && (
            <button
              onClick={clearFilters}
              className="text-accent hover:text-accent/80 underline underline-offset-2 transition-colors text-xs"
            >
              {t('Limpar filtros', 'Limpiar filtros')}
            </button>
          )}
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg">
              {t(
                'Nenhum finalista encontrado com esses critérios.',
                'No se encontraron finalistas con esos criterios.'
              )}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {filtered.map((f, i) => {
              const isExpanded = expandedIndex === i;
              const countryLabel = countryNames[f.country][language === 'es' ? 'es' : 'pt'];
              const teamCount = f.team.length;

              return (
                <div
                  key={`${f.company}-${f.title}`}
                  className="group rounded-xl border border-border bg-card/70 backdrop-blur-sm hover:border-accent/30 transition-all duration-300 hover:shadow-[0_0_30px_-10px_hsl(43_42%_52%/0.15)] flex flex-col"
                  style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                    transitionDelay: `${Math.min(i * 60, 600) + 400}ms`,
                    transitionDuration: '600ms',
                    transitionProperty: 'opacity, transform',
                  }}
                >
                  {/* Card top */}
                  <div className="p-5 pb-0 flex items-start justify-between gap-3">
                    <span className="text-xs font-medium text-muted-foreground tracking-wide uppercase">
                      {f.company}
                    </span>
                    <span className="shrink-0 text-[11px] font-semibold px-2.5 py-1 rounded-md bg-accent/10 text-accent border border-accent/20">
                      {countryLabel}
                    </span>
                  </div>

                  {/* Card body */}
                  <div className="p-5 pt-3 flex-1 flex flex-col">
                    <h3 className="text-base font-semibold text-foreground leading-snug line-clamp-3 mb-4">
                      {f.title}
                    </h3>

                    {/* Footer summary */}
                    <div className="mt-auto flex items-center gap-3 text-xs text-muted-foreground mb-4">
                      <span className="flex items-center gap-1">
                        <Users className="w-3.5 h-3.5" />
                        {teamCount} {teamCount === 1 ? t('integrante', 'integrante') : t('integrantes', 'integrantes')}
                      </span>
                      {f.incentivador && (
                        <span className="flex items-center gap-1 text-accent/70">
                          <Award className="w-3.5 h-3.5" />
                          {t('Com incentivador', 'Con impulsor')}
                        </span>
                      )}
                    </div>

                    {/* Toggle button */}
                    <button
                      onClick={() => setExpandedIndex(isExpanded ? null : i)}
                      className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg border border-border text-sm font-medium text-muted-foreground hover:text-accent hover:border-accent/30 transition-all"
                      aria-expanded={isExpanded}
                    >
                      {isExpanded ? (
                        <>
                          {t('Ocultar detalhes', 'Ocultar detalles')}
                          <ChevronUp className="w-4 h-4" />
                        </>
                      ) : (
                        <>
                          {t('Ver detalhes', 'Ver detalles')}
                          <ChevronDown className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>

                  {/* Expandable details */}
                  <div
                    className="overflow-hidden transition-all duration-300"
                    style={{ maxHeight: isExpanded ? '400px' : '0' }}
                  >
                    <div className="px-5 pb-5 pt-2 border-t border-border/50 space-y-3">
                      <DetailRow
                        icon={<Building2 className="w-4 h-4" />}
                        label={t('Empresa', 'Empresa')}
                        value={f.company}
                      />
                      <DetailRow
                        icon={<MapPin className="w-4 h-4" />}
                        label={t('País', 'País')}
                        value={countryLabel}
                      />
                      <div>
                        <span className="flex items-center gap-2 text-xs text-muted-foreground mb-1.5">
                          <Users className="w-4 h-4" />
                          {t('Equipe', 'Equipo')}
                        </span>
                        <ul className="space-y-1 pl-6">
                          {f.team.map((name) => (
                            <li key={name} className="text-sm text-foreground/90">{name}</li>
                          ))}
                        </ul>
                      </div>
                      {f.incentivador && (
                        <DetailRow
                          icon={<Award className="w-4 h-4" />}
                          label={t('Incentivador', 'Impulsor')}
                          value={f.incentivador}
                        />
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

const DetailRow = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) => (
  <div>
    <span className="flex items-center gap-2 text-xs text-muted-foreground mb-0.5">
      {icon} {label}
    </span>
    <p className="text-sm text-foreground/90 pl-6">{value}</p>
  </div>
);

export default Finalists;
