import { motion } from 'framer-motion';

type Props = {
  text: string;
  attribution?: string;
  side: 'left' | 'right' | 'center';
};

const sideClasses = {
  left: 'mr-auto ml-4 sm:ml-10 md:ml-20 text-left',
  right: 'ml-auto mr-4 sm:mr-10 md:mr-20 text-right',
  center: 'mx-auto text-center',
};

export function TextBeat({ text, attribution, side }: Props) {
  const isQuote = text.startsWith('"');

  return (
    <div className={`${text.length > 150 ? 'max-w-4xl' : 'max-w-2xl'} ${sideClasses[side]}`}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-5%' }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <p className={`font-serif leading-snug text-white ${
          isQuote
            ? 'text-4xl sm:text-5xl md:text-6xl italic font-medium'
            : 'text-3xl sm:text-4xl md:text-5xl'
        }`}>
          {text}
        </p>
        {attribution && (
          <p className="mt-4 text-lg sm:text-xl text-white/50 font-sans tracking-wide">
            — {attribution}
          </p>
        )}
      </motion.div>
    </div>
  );
}
