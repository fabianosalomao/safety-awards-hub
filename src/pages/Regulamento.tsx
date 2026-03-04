import { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ChevronDown, ChevronUp, ChevronsUpDown, X, ArrowLeft } from 'lucide-react';
import { LanguageProvider, useLanguage } from '@/contexts/LanguageContext';
import { regulamentoSections, type Section, type ContentBlock } from '@/content/regulamento';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

// Highlight matching text
const HighlightText = ({ text, query }: { text: string; query: string }) => {
  if (!query.trim()) return <>{text}</>;
  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const parts = text.split(new RegExp(`(${escaped})`, 'gi'));
  return (
    <>
      {parts.map((part, i) =>
        part.toLowerCase() === query.toLowerCase() ? (
          <mark key={i} className="bg-accent/30 text-foreground rounded px-0.5">
            {part}
          </mark>
        ) : (
          part
        )
      )}
    </>
  );
};

// Render content blocks
const RenderBlocks = ({
  blocks,
  query,
}: {
  blocks: ContentBlock[];
  query: string;
}) => (
  <div className="space-y-3">
    {blocks.map((block, i) => {
      if (block.type === 'p' && block.text) {
        return (
          <p key={i} className="text-muted-foreground leading-relaxed">
            <HighlightText text={block.text} query={query} />
          </p>
        );
      }
      if ((block.type === 'ul' || block.type === 'ol') && block.items) {
        const Tag = block.type === 'ol' ? 'ol' : 'ul';
        return (
          <Tag
            key={i}
            className={`space-y-2 ml-5 ${
              block.type === 'ol' ? 'list-decimal' : 'list-disc'
            } text-muted-foreground`}
          >
            {block.items.map((item, j) => (
              <li key={j} className="leading-relaxed">
                <HighlightText text={item} query={query} />
              </li>
            ))}
          </Tag>
        );
      }
      return null;
    })}
  </div>
);

// Check if section/subsection matches search
const matchesSearch = (
  section: Section,
  query: string,
  lang: 'pt' | 'es'
): boolean => {
  if (!query.trim()) return true;
  const q = query.toLowerCase();

  const titleMatch = section.title[lang].toLowerCase().includes(q);
  if (titleMatch) return true;

  const blocksMatch = section.blocks?.[lang]?.some((block) => {
    if (block.text?.toLowerCase().includes(q)) return true;
    if (block.items?.some((item) => item.toLowerCase().includes(q))) return true;
    return false;
  });
  if (blocksMatch) return true;

  const subMatch = section.subsections?.some((sub) => {
    if (sub.title[lang].toLowerCase().includes(q)) return true;
    return sub.blocks[lang].some((block) => {
      if (block.text?.toLowerCase().includes(q)) return true;
      if (block.items?.some((item) => item.toLowerCase().includes(q))) return true;
      return false;
    });
  });

  return !!subMatch;
};

// Single accordion section
const AccordionSection = ({
  section,
  isOpen,
  onToggle,
  query,
  lang,
}: {
  section: Section;
  isOpen: boolean;
  onToggle: () => void;
  query: string;
  lang: 'pt' | 'es';
}) => {
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <div className="border border-border rounded-lg overflow-hidden" id={`section-${section.id}`}>
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 md:p-5 text-left hover:bg-muted/50 transition-colors"
        aria-expanded={isOpen}
        aria-controls={`content-${section.id}`}
      >
        <h2 className="text-lg md:text-xl font-semibold text-foreground pr-4">
          <HighlightText text={section.title[lang]} query={query} />
        </h2>
        <ChevronDown
          className={`w-5 h-5 text-muted-foreground flex-shrink-0 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      <div
        id={`content-${section.id}`}
        ref={contentRef}
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? 'max-h-[5000px] opacity-100' : 'max-h-0 opacity-0'
        }`}
        role="region"
        aria-labelledby={`section-${section.id}`}
      >
        <div className="px-4 md:px-5 pb-5 space-y-4">
          {section.blocks && (
            <RenderBlocks blocks={section.blocks[lang]} query={query} />
          )}

          {section.subsections?.map((sub) => (
            <div key={sub.id} className="ml-2 md:ml-4 border-l-2 border-accent/30 pl-4 py-2">
              <h3 className="text-base md:text-lg font-medium text-foreground mb-2">
                <HighlightText text={sub.title[lang]} query={query} />
              </h3>
              <RenderBlocks blocks={sub.blocks[lang]} query={query} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const RegulamentoContent = () => {
  const { language, t } = useLanguage();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [openSections, setOpenSections] = useState<Set<string>>(new Set());

  const filteredSections = useMemo(
    () => regulamentoSections.filter((s) => matchesSearch(s, searchQuery, language)),
    [searchQuery, language]
  );

  // Auto-expand all when searching
  useEffect(() => {
    if (searchQuery.trim()) {
      setOpenSections(new Set(filteredSections.map((s) => s.id)));
    }
  }, [searchQuery, filteredSections]);

  const toggleSection = useCallback((id: string) => {
    setOpenSections((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const expandAll = useCallback(() => {
    setOpenSections(new Set(regulamentoSections.map((s) => s.id)));
  }, []);

  const collapseAll = useCallback(() => {
    setOpenSections(new Set());
  }, []);

  const clearSearch = useCallback(() => {
    setSearchQuery('');
  }, []);

  const scrollToSection = useCallback((sectionId: string) => {
    setOpenSections((prev) => new Set(prev).add(sectionId));
    setTimeout(() => {
      document.getElementById(`section-${sectionId}`)?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }, 100);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-20 md:pt-24 pb-16">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl">
          {/* Back button */}
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6 mt-4"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">{t('Voltar ao início', 'Volver al inicio')}</span>
          </button>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2">
            {t('Regulamento', 'Reglamento')}
          </h1>
          <p className="text-muted-foreground mb-8">
            Safety Innovation Awards 2026
          </p>

          {/* Search + Controls */}
          <div className="sticky top-16 md:top-20 z-30 bg-background/95 backdrop-blur-md pb-4 pt-2 -mx-4 px-4 md:-mx-8 md:px-8 border-b border-border/50 mb-6">
            <div className="max-w-4xl mx-auto space-y-3">
              {/* Search bar */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder={t('Buscar no regulamento…', 'Buscar en el reglamento…')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-10"
                />
                {searchQuery && (
                  <button
                    onClick={clearSearch}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    aria-label={t('Limpar', 'Limpiar')}
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {/* Expand/Collapse */}
                <Button variant="outline" size="sm" onClick={expandAll} className="text-xs gap-1">
                  <ChevronsUpDown className="w-3 h-3" />
                  {t('Expandir tudo', 'Expandir todo')}
                </Button>
                <Button variant="outline" size="sm" onClick={collapseAll} className="text-xs gap-1">
                  <ChevronUp className="w-3 h-3" />
                  {t('Recolher tudo', 'Contraer todo')}
                </Button>

                {/* Mobile: jump to section */}
                <div className="ml-auto md:hidden">
                  <Select onValueChange={scrollToSection}>
                    <SelectTrigger className="w-[180px] text-xs h-8">
                      <SelectValue placeholder={t('Ir para seção', 'Ir a la sección')} />
                    </SelectTrigger>
                    <SelectContent>
                      {regulamentoSections.map((s) => (
                        <SelectItem key={s.id} value={s.id} className="text-xs">
                          {s.title[language]}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>

          {/* Results info */}
          {searchQuery && (
            <p className="text-sm text-muted-foreground mb-4">
              {filteredSections.length === 0
                ? t('Nenhum resultado encontrado.', 'Sin resultados.')
                : `${filteredSections.length} ${t(
                    filteredSections.length === 1 ? 'seção encontrada' : 'seções encontradas',
                    filteredSections.length === 1 ? 'sección encontrada' : 'secciones encontradas'
                  )}`}
            </p>
          )}

          {/* Sections */}
          <div className="space-y-3">
            {filteredSections.map((section) => (
              <AccordionSection
                key={section.id}
                section={section}
                isOpen={openSections.has(section.id)}
                onToggle={() => toggleSection(section.id)}
                query={searchQuery}
                lang={language}
              />
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

const Regulamento = () => (
  <LanguageProvider>
    <RegulamentoContent />
  </LanguageProvider>
);

export default Regulamento;
