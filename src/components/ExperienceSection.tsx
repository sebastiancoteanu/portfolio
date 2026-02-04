'use client';

import { useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { experience } from '@/content';
import { useScrollReveal } from '@/hooks/useScrollReveal';

// ── Spotlight-tracking card ─────────────────────────────────────────────────
function SpotlightCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    card.style.setProperty('--spotlight-x', `${x}%`);
    card.style.setProperty('--spotlight-y', `${y}%`);
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className={`glass-card gradient-border-card p-6 ${className}`}
    >
      <div className="spotlight" />
      {children}
    </div>
  );
}

// ── Section Header (reusable) ────────────────────────────────────────────────
function SectionHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  const { ref, isVisible } = useScrollReveal();
  return (
    <div ref={ref} className="mb-14 text-center">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="font-display text-3xl sm:text-4xl font-700 mb-2"
        style={{ color: 'var(--text-primary)' }}
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="font-body text-sm"
          style={{ color: 'var(--text-muted)' }}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}

// ── Single Role Card ─────────────────────────────────────────────────────────
function RoleCard({ role, index }: { role: typeof experience[0]; index: number }) {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.12 });

  return (
    <div ref={ref} className="relative pl-8 sm:pl-10">
      {/* Timeline dot */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={isVisible ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 0.4, delay: 0.1, type: 'spring', stiffness: 260 }}
        className="absolute left-0 top-5 w-4 h-4 rounded-full border-2 flex items-center justify-center"
        style={{ borderColor: 'var(--accent)', background: 'var(--bg-base)' }}
      >
        <div className="w-2 h-2 rounded-full" style={{ background: 'var(--accent)' }} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 24, filter: 'blur(4px)' }}
        animate={isVisible ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
        transition={{ duration: 0.65, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      >
        <SpotlightCard>
          {/* Header row */}
          <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
            <div>
              <h3 className="font-body text-lg font-700" style={{ color: 'var(--text-primary)' }}>
                {role.role}
              </h3>
              <span className="font-body text-sm font-500" style={{ color: 'var(--accent)' }}>
                {role.company}
              </span>
            </div>
            <span
              className="font-mono text-xs px-2.5 py-1 rounded-lg whitespace-nowrap"
              style={{ background: 'var(--bg-border)', color: 'var(--text-muted)' }}
            >
              {role.period}
            </span>
          </div>

          {/* Bullets */}
          <ul className="space-y-1.5 mb-4">
            {role.bullets.map((bullet, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: 'var(--accent-glow)' }} />
                <span className="font-body text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {bullet}
                </span>
              </li>
            ))}
          </ul>

          {/* Tech tags */}
          <div className="flex flex-wrap gap-1.5">
            {role.tags.map((tag) => (
              <span
                key={tag}
                className="font-mono text-xs px-2 py-0.5 rounded-md"
                style={{ background: 'rgba(59,130,246,0.1)', color: 'var(--accent-glow)', border: '1px solid rgba(59,130,246,0.2)' }}
              >
                {tag}
              </span>
            ))}
          </div>
        </SpotlightCard>
      </motion.div>
    </div>
  );
}

// ── Main Section ─────────────────────────────────────────────────────────────
export default function ExperienceSection() {
  return (
    <section id="experience" className="relative z-10 py-24 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        <SectionHeader title="Experience" subtitle="A journey through scalable products and engineering leadership" />

        {/* Vertical timeline line */}
        <div className="relative">
          <div
            className="absolute left-[7px] top-0 bottom-0 w-px"
            style={{ background: 'linear-gradient(to bottom, var(--accent), var(--accent-purple), transparent)' }}
            aria-hidden="true"
          />

          <div className="flex flex-col gap-8">
            {experience.map((role, i) => (
              <RoleCard key={role.company} role={role} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export { SectionHeader, SpotlightCard };
