'use client';

import { motion } from 'framer-motion';
import { highlights } from '@/content';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { SectionHeader, SpotlightCard } from '@/components/ExperienceSection';

export default function HighlightsSection() {
  const { ref: gridRef, isVisible } = useScrollReveal({ threshold: 0.1 });

  return (
    <section id="highlights" className="relative z-10 py-24 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <SectionHeader title="Highlights" subtitle="Standout moments across the career" />

        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {highlights.map((h, i) => (
            <motion.div
              key={h.title}
              initial={{ opacity: 0, y: 28, filter: 'blur(4px)' }}
              animate={isVisible ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
              transition={{
                duration: 0.6,
                delay: i * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <SpotlightCard className="h-full flex flex-col">
                {/* Icon */}
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center text-xl mb-4 flex-shrink-0"
                  style={{ background: 'rgba(59,130,246,0.1)' }}
                >
                  {h.icon}
                </div>

                {/* Title */}
                <h3
                  className="font-body text-base font-700 mb-2"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {h.title}
                </h3>

                {/* Description */}
                <p
                  className="font-body text-sm leading-relaxed flex-1"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {h.description}
                </p>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
