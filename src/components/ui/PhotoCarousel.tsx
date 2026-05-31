import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PhotoCarouselProps {
  images: string[];
  alt: string;
  autoplayMs?: number;
  aspect?: string; // tailwind aspect class
  rounded?: string;
  priorityFirst?: boolean;
}

const PhotoCarousel = ({
  images,
  alt,
  autoplayMs = 4500,
  aspect = 'aspect-[4/3]',
  rounded = 'rounded-2xl',
  priorityFirst = false,
}: PhotoCarouselProps) => {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || images.length <= 1) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, autoplayMs);
    return () => clearInterval(id);
  }, [paused, images.length, autoplayMs]);

  const go = (dir: number) => {
    setIndex((i) => (i + dir + images.length) % images.length);
  };

  return (
    <div
      className={`relative overflow-hidden border border-border/60 bg-card/40 ${aspect} ${rounded}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {images.map((src, i) => (
        <img
          key={src}
          src={src}
          alt={`${alt} ${i + 1}`}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
            i === index ? 'opacity-100' : 'opacity-0'
          }`}
          loading={priorityFirst && i === 0 ? 'eager' : 'lazy'}
          fetchPriority={priorityFirst && i === 0 ? 'high' : 'auto'}
        />
      ))}

      {images.length > 1 && (
        <>
          <button
            onClick={() => go(-1)}
            aria-label="Anterior"
            className="absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-background/60 hover:bg-background/90 backdrop-blur text-foreground flex items-center justify-center transition"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => go(1)}
            aria-label="Próximo"
            className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-background/60 hover:bg-background/90 backdrop-blur text-foreground flex items-center justify-center transition"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                aria-label={`Foto ${i + 1}`}
                className={`h-1.5 rounded-full transition-all ${
                  i === index ? 'w-6 bg-accent' : 'w-1.5 bg-foreground/40 hover:bg-foreground/70'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default PhotoCarousel;
