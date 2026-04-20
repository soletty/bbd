import { motion } from 'framer-motion';
import { FadeIn } from './MemoryCard';

type Props = {
  title: string;
  letter: string;
};

export function Closing({ title, letter }: Props) {
  return (
    <div className="px-6 max-w-xl mx-auto text-center">
      <FadeIn>
        <motion.h2
          className="font-serif text-4xl sm:text-5xl md:text-6xl text-white leading-tight"
        >
          {title}
        </motion.h2>
      </FadeIn>

      <FadeIn delay={0.4}>
        <div className="mt-16 text-left">
          <p className="font-serif text-lg sm:text-xl text-white/80 leading-loose whitespace-pre-line">
            {letter}
          </p>
        </div>
      </FadeIn>
    </div>
  );
}
