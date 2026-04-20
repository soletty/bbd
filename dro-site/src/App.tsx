import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Trail } from './components/Trail';
import { ScatteredPhoto } from './components/ScatteredPhoto';
import { LocationMarker } from './components/LocationMarker';
import { Highlight } from './components/Highlight';
import { TextBeat } from './components/TextBeat';
import { Closing } from './components/Closing';
import { FadeIn } from './components/MemoryCard';
import { intro, timeline, closing } from './content/memories';

function Intro() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, delay: 0.3 }}
        className="font-serif text-4xl sm:text-5xl md:text-7xl text-white leading-tight max-w-2xl"
      >
        {intro.title}
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="mt-6 text-sm text-white/50 font-sans tracking-wide"
      >
        {intro.subtitle}
      </motion.p>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3, y: [0, 8, 0] }}
        transition={{ duration: 2, delay: 2, repeat: Infinity, repeatType: 'loop' }}
        className="mt-20"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </motion.div>
    </div>
  );
}

const sides: Array<'left' | 'right' | 'center'> = ['left', 'right', 'center', 'right', 'left'];
const sizes: Array<'md' | 'lg' | 'xl'> = ['xl', 'lg', 'xl', 'lg', 'xl', 'lg', 'xl'];
const rotations = [-3, 2, -1, 3, -2, 1, -3, 2];

export default function App() {
  const trailRef = useRef<HTMLDivElement>(null);
  const [trailHeight, setTrailHeight] = useState(10000);

  useEffect(() => {
    const el = trailRef.current;
    if (!el) return;

    const update = () => setTrailHeight(el.scrollHeight);
    update();

    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  let photoIndex = 0;
  let textIndex = 0;

  return (
    <div className="pb-40">
      <Intro />

      <div ref={trailRef} className="relative mt-20">
        <Trail height={trailHeight} />

        <div className="relative z-10 space-y-16 sm:space-y-20 py-20">
          {timeline.map((moment, i) => {
            switch (moment.type) {
              case 'location':
                return <LocationMarker key={i} label={moment.label} />;
              case 'photos': {
                return moment.photos.map((photo, j) => {
                  const idx = photoIndex++;
                  return (
                    <ScatteredPhoto
                      key={`${i}-${j}`}
                      src={photo.src}
                      side={sides[idx % sides.length]}
                      size={sizes[idx % sizes.length]}
                      rotate={rotations[idx % rotations.length]}
                    />
                  );
                });
              }
              case 'highlight':
                return (
                  <Highlight
                    key={i}
                    photo={moment.photo}
                    friendName={moment.friendName}
                    story={moment.story}
                    quote={moment.quote}
                  />
                );
              case 'text': {
                const textSide = sides[textIndex++ % sides.length];
                return <TextBeat key={i} text={moment.text} attribution={moment.attribution} side={textSide} />;
              }
              default:
                return null;
            }
          })}
        </div>
      </div>

      <div className="mt-40 sm:mt-56 mb-20">
        <FadeIn>
          <div className="w-12 mx-auto border-t border-white/20 mb-32" />
        </FadeIn>
        <Closing title={closing.title} letter={closing.letter} />
      </div>
    </div>
  );
}
