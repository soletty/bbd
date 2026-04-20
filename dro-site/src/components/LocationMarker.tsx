import { motion } from 'framer-motion';

type Props = {
  label: string;
};

export function LocationMarker({ label }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-5%' }}
      transition={{ duration: 0.6 }}
      className="flex justify-center py-20 sm:py-28 md:py-36"
    >
      <div className="relative inline-flex items-center">
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 200 50"
          preserveAspectRatio="none"
          fill="none"
        >
          <polygon
            points="12,0 176,0 200,25 176,50 12,50 0,25"
            stroke="white"
            strokeWidth="2.5"
            fill="none"
          />
        </svg>
        <span className="relative px-14 py-5 sm:px-16 sm:py-6 font-sans text-xl sm:text-3xl md:text-4xl font-semibold tracking-widest uppercase text-white">
          {label}
        </span>
      </div>
    </motion.div>
  );
}
