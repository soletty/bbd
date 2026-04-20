import { FadeIn } from './MemoryCard';

type Props = {
  photos: { src: string }[];
};

export function PhotoCluster({ photos }: Props) {
  const single = photos.length === 1;

  return (
    <div className="px-4 sm:px-6 max-w-3xl mx-auto">
      <div className={single ? '' : 'grid grid-cols-2 gap-3 sm:gap-4'}>
        {photos.map((photo, i) => (
          <FadeIn
            key={i}
            delay={i * 0.15}
            className={single ? '' : i === 0 && photos.length === 3 ? 'col-span-2' : ''}
          >
            <div className="overflow-hidden rounded-lg">
              <img
                src={photo.src}
                alt=""
                className="w-full h-auto"
                onError={(e) => {
                  e.currentTarget.parentElement!.classList.add('bg-neutral-800');
                }}
              />
            </div>
            {(photo.location || photo.date || photo.caption) && (
              <div className="mt-2 flex items-baseline gap-2 flex-wrap">
                {photo.location && (
                  <span className="text-xs uppercase tracking-widest text-white/40 font-sans">
                    {photo.location}
                  </span>
                )}
                {photo.date && (
                  <span className="text-xs text-white/30 font-sans">{photo.date}</span>
                )}
                {photo.caption && (
                  <p className="w-full text-sm text-white/60 font-serif italic mt-1">{photo.caption}</p>
                )}
              </div>
            )}
          </FadeIn>
        ))}
      </div>
    </div>
  );
}
