'use client';

import { motion } from 'framer-motion';
import { repos } from '@/content';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { SectionHeader, SpotlightCard } from '@/components/ExperienceSection';

// Simple language → colour map
const LANG_COLORS: Record<string, string> = {
  'TypeScript':   '#3178c6',
  'JavaScript':   '#f7df1e',
  'Java':         '#b07219',
  'Python':       '#3572A5',
  'Rust':         '#dea520',
  'Go':           '#00ADD8',
  'C++':          '#f34b4d',
  'Ruby':         '#cc342d',
};

function getLangColor(lang: string): string {
  return LANG_COLORS[lang] || '#6b7280';
}

export default function WorkSection() {
  const { ref: gridRef, isVisible } = useScrollReveal({ threshold: 0.1 });

  return (
    <section id="work" className="relative z-10 py-24 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <SectionHeader title="Selected Work" subtitle="Open-source projects & experiments" />

        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {repos.map((repo, i) => (
            <motion.div
              key={repo.name}
              initial={{ opacity: 0, y: 28, filter: 'blur(4px)' }}
              animate={isVisible ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <a
                href={repo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block h-full"
                aria-label={`View ${repo.name} on GitHub`}
              >
                <SpotlightCard className="h-full flex flex-col group">
                  {/* Top row: repo icon + name */}
                  <div className="flex items-center gap-2.5 mb-3">
                    <svg
                      width="18" height="18" viewBox="0 0 24 24" fill="none"
                      stroke="var(--text-muted)" strokeWidth="2" strokeLinecap="round"
                      className="flex-shrink-0 group-hover:stroke-accent transition-colors"
                    >
                      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                    </svg>
                    <h3
                      className="font-body text-sm font-700 truncate"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      {repo.name}
                    </h3>
                  </div>

                  {/* Description */}
                  <p
                    className="font-body text-xs leading-relaxed flex-1 mb-4"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    {repo.description}
                  </p>

                  {/* Footer: language tag */}
                  <div className="flex items-center gap-1.5 mt-auto">
                    <span
                      className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                      style={{ background: getLangColor(repo.language) }}
                    />
                    <span
                      className="font-mono text-xs"
                      style={{ color: 'var(--text-muted)' }}
                    >
                      {repo.language}
                    </span>

                    {/* Arrow on hover */}
                    <svg
                      width="14" height="14" viewBox="0 0 16 16" fill="none"
                      stroke="var(--accent)" strokeWidth="2"
                      className="ml-auto opacity-0 group-hover:opacity-100 transition-all duration-200 group-hover:translate-x-0.5"
                    >
                      <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </SpotlightCard>
              </a>
            </motion.div>
          ))}
        </div>

        {/* "View all on GitHub" link */}
        <div className="mt-8 text-center">
          <a
            href="https://github.com/sebastiancoteanu"
            target="_blank"
            rel="noopener noreferrer"
            className="font-body text-sm font-500 inline-flex items-center gap-1.5 transition-colors duration-200 hover:gap-2.5"
            style={{ color: 'var(--accent)' }}
          >
            View all repositories on GitHub
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
