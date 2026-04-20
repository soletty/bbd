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
          </FadeIn>
        ))}
      </div>
    </div>
  );
}
