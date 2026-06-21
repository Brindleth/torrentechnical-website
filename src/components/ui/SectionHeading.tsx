import Reveal from '@/components/ui/Reveal';

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
      <Reveal
        className={`mb-5 flex items-center gap-3 ${align === 'center' ? 'justify-center' : ''}`}
      >
        <span className="h-px w-8 bg-gold/70" />
        <span className="spec-label">{label}</span>
      </Reveal>
      <Reveal
        as="h2"
        delay={0.05}
        className={`font-display text-3xl font-semibold leading-[1.05] tracking-tight sm:text-4xl lg:text-5xl ${
          onDark ? 'text-white' : 'text-ink'
        }`}
      >
        {title}
      </Reveal>
      {description && (
        <Reveal
          as="p"
          delay={0.1}
          className={`mt-5 text-base leading-relaxed md:text-lg ${
            onDark ? 'text-white/65' : 'text-slate'
          } ${align === 'center' ? 'mx-auto' : ''}`}
        >
          {description}
        </Reveal>
      )}
    </div>
  );
}
