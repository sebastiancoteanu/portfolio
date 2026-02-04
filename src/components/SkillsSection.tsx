'use client';

import { motion } from 'framer-motion';
import { skills } from '@/content';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { SectionHeader } from '@/components/ExperienceSection';

// Colour palette for bucket accent dots — cycles through accent shades
const BUCKET_COLORS = [
  '#3b82f6', // blue
  '#8b5cf6', // purple
  '#06b6d4', // cyan
  '#10b981', // emerald
  '#f59e0b', // amber
  '#ec4899', // pink
];

function SkillBucketCard({ bucket, index }: { bucket: typeof skills[0]; index: number }) {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.15 });
  const accentColor = BUCKET_COLORS[index % BUCKET_COLORS.length];

  return (
    <div ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 24, filter: 'blur(4px)' }}
        animate={isVisible ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="glass-card gradient-border-card p-5"
      >
        <div className="spotlight" />

        {/* Bucket label */}
        <div className="flex items-center gap-2 mb-4">
          <div
            className="w-2.5 h-2.5 rounded-full"
            style={{ background: accentColor, boxShadow: `0 0 8px ${accentColor}60` }}
          />
          <h3
            className="font-body text-sm font-700 uppercase tracking-wider"
            style={{ color: accentColor }}
          >
            {bucket.label}
          </h3>
        </div>

        {/* Chips */}
        <div className="flex flex-wrap gap-2">
          {bucket.skills.map((skill, i) => (
            <motion.span
              key={skill}
              initial={{ opacity: 0, scale: 0.7, y: 8 }}
              animate={isVisible ? { opacity: 1, scale: 1, y: 0 } : {}}
              transition={{
                duration: 0.4,
                delay: i * 0.06,
                type: 'spring',
                stiffness: 280,
                damping: 22,
              }}
              className="font-mono text-xs px-3 py-1.5 rounded-full cursor-default select-none transition-all duration-200 hover:scale-105"
              style={{
                background: `${accentColor}12`,
                color: accentColor,
                border: `1px solid ${accentColor}30`,
              }}
            >
              {skill}
            </motion.span>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export default function SkillsSection() {
  return (
    <section id="skills" className="relative z-10 py-24 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <SectionHeader title="Skills" subtitle="Grouped by domain — built through real products" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {skills.map((bucket, i) => (
            <SkillBucketCard key={bucket.label} bucket={bucket} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
