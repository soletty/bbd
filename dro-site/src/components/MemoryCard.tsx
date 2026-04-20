import { motion } from 'framer-motion';

type Props = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
};

export function FadeIn({ children, className = '', delay = 0 }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10%' }}
      transition={{ duration: 0.8, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
