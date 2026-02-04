'use client';

import { useState, useEffect, lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import { hero } from '@/content';

// Lazy-load the heavy 3D canvas
const HeroBlob = lazy(() => import('@/components/HeroBlob'));

// ── Static fallback for reduced-motion or WebGL failure ─────────────────────
function StaticBlobFallback() {
  return (
    <div className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
      <svg width="280" height="280" viewBox="0 0 280 280" fill="none">
        <defs>
          <radialGradient id="blobGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.6" />
            <stop offset="60%" stopColor="#8b5cf6" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
          </radialGradient>
        </defs>
        <ellipse cx="140" cy="140" rx="115" ry="110" fill="url(#blobGrad)" />
        <circle cx="200" cy="80" r="22" fill="#8b5cf6" fillOpacity="0.35" />
        <circle cx="80"  cy="210" r="14" fill="#3b82f6" fillOpacity="0.4" />
        <circle cx="215" cy="200" r="10" fill="#f59e0b" fillOpacity="0.5" />
      </svg>
    </div>
  );
}

// ── Detect WebGL support ─────────────────────────────────────────────────────
function canWebGL(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const canvas = document.createElement('canvas');
    return !!(canvas.getContext('webgl2') || canvas.getContext('webgl'));
  } catch {
    return false;
  }
}

// ── CTA Button variants ─────────────────────────────────────────────────────
function CtaButton({ label, href, variant }: { label: string; href: string; variant: string }) {
  const isExternal = href.startsWith('http');
  const baseClass =
    'inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-body font-600 text-sm ' +
    'transition-all duration-300 ease-spring cursor-pointer select-none ' +
    'active:scale-95 focus-visible:ring-2 focus-visible:ring-offset-2';

  const styles: Record<string, string> = {
    primary:
      baseClass +
      ' text-white shadow-lg hover:shadow-xl hover:-translate-y-1',
    secondary:
      baseClass +
      ' hover:-translate-y-0.5',
    ghost:
      baseClass +
      ' hover:-translate-y-0.5',
  };

  const inlineStyles: Record<string, React.CSSProperties> = {
    primary: {
      background: 'linear-gradient(135deg, var(--accent), var(--accent-purple))',
      boxShadow: '0 4px 20px rgba(59,130,246,0.35)',
    },
    secondary: {
      background: 'var(--bg-border)',
      color: 'var(--text-primary)',
    },
    ghost: {
      background: 'transparent',
      color: 'var(--text-secondary)',
      border: '1px solid var(--bg-border)',
    },
  };

  return (
    <a
      href={href}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      className={styles[variant]}
      style={inlineStyles[variant]}
    >
      {label}
      {isExternal && (
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M13 3L3 13M13 3H6M13 3v7" />
        </svg>
      )}
    </a>
  );
}

// ── Main Hero ────────────────────────────────────────────────────────────────
export default function Hero() {
  const [use3D, setUse3D] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    if (!mq.matches && canWebGL()) {
      setUse3D(true);
    }
  }, []);

  // Stagger animation config
  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12 } },
  };
  const childVariants = reducedMotion
    ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 28, filter: 'blur(6px)' },
        visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
      };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 pt-14 overflow-hidden"
    >
      <div
        className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 w-[420px] h-[420px] sm:w-[480px] sm:h-[480px] -translate-x-1/4 opacity-60 sm:opacity-75"
        aria-hidden="true"
      >
        {use3D ? (
          <Suspense fallback={<StaticBlobFallback />}>
            <HeroBlob />
          </Suspense>
        ) : (
          <StaticBlobFallback />
        )}
      </div>

      {/* Text content */}
      <motion.div
        className="relative z-10 max-w-3xl w-full"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Location badge */}
        <motion.span
          variants={childVariants}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-body font-500 mb-5"
          style={{ background: 'var(--bg-border)', color: 'var(--text-muted)' }}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
            <circle cx="12" cy="9" r="2.5" />
          </svg>
          {hero.location}
        </motion.span>

        {/* Name */}
        <motion.h1
          variants={childVariants}
          className="font-display text-5xl sm:text-6xl lg:text-7xl font-900 leading-[1.05] tracking-[-0.03em] mb-3"
          style={{ color: 'var(--text-primary)' }}
        >
          {hero.name}
        </motion.h1>

        {/* Title with gradient accent */}
        <motion.h2
          variants={childVariants}
          className="font-display text-2xl sm:text-3xl font-700 italic mb-5 leading-tight"
        >
          <span className="gradient-text">{hero.title}</span>
        </motion.h2>

        {/* Summary */}
        <motion.p
          variants={childVariants}
          className="font-body text-base sm:text-lg leading-relaxed max-w-xl mb-8"
          style={{ color: 'var(--text-secondary)' }}
        >
          {hero.summary}
        </motion.p>

        {/* CTA buttons */}
        <motion.div variants={childVariants} className="flex flex-wrap gap-3">
          {hero.cta.map((btn) => (
            <CtaButton key={btn.label} {...btn} />
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        aria-hidden="true"
      >
        <span className="text-xs font-body" style={{ color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Scroll</span>
        <svg width="16" height="24" viewBox="0 0 16 24" fill="none" stroke="var(--text-muted)" strokeWidth="2">
          <rect x="1" y="1" width="14" height="22" rx="7" />
          <line x1="8" y1="6" x2="8" y2="10" strokeLinecap="round" />
        </svg>
      </motion.div>
    </section>
  );
}
