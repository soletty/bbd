import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

type Props = {
  photo: { src: string };
  friendName: string;
  story: string;
  quote?: string;
};

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-5%' },
  transition: { duration: 0.7, delay, ease: 'easeOut' as const },
});

export function Highlight({ photo, friendName, story, quote }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const photoScale = useTransform(scrollYProgress, [0, 0.3], [1, 1.05]);

  return (
    <div ref={containerRef} className="relative z-20" style={{ height: '200vh' }}>
      <div className="sticky top-0 flex flex-col items-center pt-10 px-4 bg-black">
        <motion.div
          className="overflow-hidden rounded-xl w-full max-w-4xl"
          style={{ scale: photoScale }}
        >
          <img
            src={photo.src}
            alt=""
            className="w-full h-auto"
            onError={(e) => {
              e.currentTarget.parentElement!.classList.add('bg-neutral-800');
            }}
          />
        </motion.div>

        <div className="w-full max-w-3xl mx-auto mt-14 sm:mt-16 pb-20 text-center relative z-10">
          <motion.p
            className="text-2xl sm:text-3xl text-white font-sans font-bold tracking-widest uppercase"
            {...fadeUp(0)}
          >
            {friendName}
          </motion.p>

          <motion.p
            className="mt-8 sm:mt-10 font-serif text-2xl sm:text-3xl md:text-4xl text-white/90 leading-relaxed"
            {...fadeUp(0.2)}
          >
            {story}
          </motion.p>

          {quote && (
            <motion.p
              className="mt-6 font-serif text-xl sm:text-2xl md:text-3xl text-white/70 italic"
              {...fadeUp(0.35)}
            >
              &ldquo;{quote}&rdquo;
            </motion.p>
          )}
        </div>
      </div>
    </div>
  );
}
