'use client';

import { motion } from 'framer-motion';
import { education, certifications } from '@/content';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { SectionHeader, SpotlightCard } from '@/components/ExperienceSection';

// ── Education Cards ──────────────────────────────────────────────────────────
function EducationCards() {
  const { ref, isVisible } = useScrollReveal();
  return (
    <div ref={ref} className="flex flex-col gap-4">
      {education.map((edu, i) => (
        <motion.div
          key={edu.degree}
          initial={{ opacity: 0, y: 20, filter: 'blur(3px)' }}
          animate={isVisible ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
          transition={{ duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <SpotlightCard className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
            <div>
              <h4 className="font-body text-base font-700 mb-0.5" style={{ color: 'var(--text-primary)' }}>
                {edu.degree}
              </h4>
              <p className="font-body text-sm" style={{ color: 'var(--text-secondary)' }}>
                {edu.institution}
              </p>
              {edu.detail && (
                <p className="font-body text-xs mt-1.5 italic" style={{ color: 'var(--text-muted)' }}>
                  {edu.detail}
                </p>
              )}
            </div>
            <span
              className="font-mono text-xs px-2.5 py-1 rounded-lg whitespace-nowrap flex-shrink-0"
              style={{ background: 'var(--bg-border)', color: 'var(--text-muted)' }}
            >
              {edu.year}
            </span>
          </SpotlightCard>
        </motion.div>
      ))}
    </div>
  );
}

// ── Certifications ──────────────────────────────────────────────────────────
function CertificationCards() {
  const { ref, isVisible } = useScrollReveal();
  return (
    <div ref={ref} className="flex flex-col gap-4">
      {certifications.map((cert, i) => (
        <motion.div
          key={cert.title}
          initial={{ opacity: 0, y: 20, filter: 'blur(3px)' }}
          animate={isVisible ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
          transition={{ duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <SpotlightCard className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
            <div>
              <h4 className="font-body text-base font-700 mb-0.5" style={{ color: 'var(--text-primary)' }}>
                {cert.title}
              </h4>
              {cert.detail && (
                <p className="font-body text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>
                  {cert.detail}
                </p>
              )}
            </div>
            <span
              className="font-mono text-xs px-2.5 py-1 rounded-lg whitespace-nowrap flex-shrink-0"
              style={{ background: 'rgba(16,185,129,0.1)', color: '#10b981', border: '1px solid rgba(16,185,129,0.25)' }}
            >
              {cert.issuer}
            </span>
          </SpotlightCard>
        </motion.div>
      ))}
    </div>
  );
}

// ── Main Section ─────────────────────────────────────────────────────────────
export default function EducationSection() {
  return (
    <section id="education" className="relative z-10 py-24 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        <SectionHeader title="Education & More" subtitle="Degrees, certifications, and competition highlights" />

        {/* Education */}
        <div className="mb-10">
          <h3
            className="font-body text-sm font-700 uppercase tracking-wider mb-4"
            style={{ color: 'var(--accent)' }}
          >
            Education
          </h3>
          <EducationCards />
        </div>

        {/* Certifications */}
        <div className="mb-10">
          <h3
            className="font-body text-sm font-700 uppercase tracking-wider mb-4"
            style={{ color: '#10b981' }}
          >
            Certifications
          </h3>
          <CertificationCards />
        </div>
      </div>
    </section>
  );
}
