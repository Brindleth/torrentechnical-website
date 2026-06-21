'use client';

import { motion } from 'framer-motion';

export default function SectionHeading({
  label,
  title,
  description,
  align = 'left',
  onDark = true,
}: {
  label: string;
  title: React.ReactNode;
  description?: string;
  align?: 'left' | 'center';
  onDark?: boolean;
}) {
  return (
    <div className={align === 'center' ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'}>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6 }}
        className={`mb-5 flex items-center gap-3 ${
          align === 'center' ? 'justify-center' : ''
        }`}
      >
        <span className="h-px w-8 bg-gold/70" />
        <span className="spec-label">{label}</span>
      </motion.div>
      <motion.h2
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className={`font-display text-3xl font-semibold leading-[1.05] tracking-tight sm:text-4xl lg:text-5xl ${
          onDark ? 'text-white' : 'text-ink'
        }`}
      >
        {title}
      </motion.h2>
      {description && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className={`mt-5 text-base leading-relaxed md:text-lg ${
            onDark ? 'text-white/65' : 'text-slate'
          } ${align === 'center' ? 'mx-auto' : ''}`}
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}
