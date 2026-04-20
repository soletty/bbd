import { motion } from 'framer-motion';

type Props = {
  src: string;
  side: 'left' | 'right' | 'center';
  size: 'md' | 'lg' | 'xl';
  rotate?: number;
};

const sizeClasses = {
  md: 'w-[70%] sm:w-[44%] md:w-[40%]',
  lg: 'w-[75%] sm:w-[48%] md:w-[44%]',
  xl: 'w-[80%] sm:w-[55%] md:w-[48%]',
};

const sideClasses = {
  left: 'mr-auto ml-2 sm:ml-8 md:ml-16',
  right: 'ml-auto mr-2 sm:mr-8 md:mr-16',
  center: 'mx-auto',
};

export function ScatteredPhoto({ src, side, size, rotate = 0 }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, rotate: rotate - 2 }}
      whileInView={{ opacity: 1, y: 0, rotate }}
      viewport={{ once: true, margin: '-5%' }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className={`${sideClasses[side]} ${sizeClasses[size]}`}
    >
      <div className="rounded-lg overflow-hidden shadow-2xl shadow-black/50">
        <img
          src={src}
          alt=""
          className="w-full h-auto"
          onError={(e) => {
            e.currentTarget.parentElement!.classList.add('bg-neutral-800');
          }}
        />
      </div>
    </motion.div>
  );
}
