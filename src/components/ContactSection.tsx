'use client';

import { motion } from 'framer-motion';
import { contact } from '@/content';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { SectionHeader } from '@/components/ExperienceSection';

const SOCIAL_LINKS = [
  {
    label: 'Email',
    href: `mailto:${contact.email}`,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="M22 7l-10 6L2 7" />
      </svg>
    ),
    value: contact.email,
  },
  {
    label: 'GitHub',
    href: contact.github,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
      </svg>
    ),
    value: '@sebastiancoteanu',
  },
  {
    label: 'LinkedIn',
    href: contact.linkedin,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
    value: 'coteanu-sebastian',
  },
];

export default function ContactSection() {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.1 });

  return (
    <section id="contact" className="relative z-10 py-24 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto">
        <SectionHeader title="Get in Touch" subtitle="Always open to interesting conversations" />

        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 28, filter: 'blur(4px)' }}
          animate={isVisible ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="glass-card gradient-border-card p-8 sm:p-10 text-center"
        >
          <div className="spotlight" />

          {/* Headline */}
          <h3
            className="font-display text-2xl sm:text-3xl font-700 mb-3"
            style={{ color: 'var(--text-primary)' }}
          >
            Let's build something great
          </h3>
          <p
            className="font-body text-sm leading-relaxed mb-8 max-w-md mx-auto"
            style={{ color: 'var(--text-secondary)' }}
          >
            Whether it's a new product, a technical challenge, or just a chat about engineering — I'd love to hear from you.
          </p>

          {/* Primary CTA */}
          <a
            href={`mailto:${contact.email}`}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-body font-600 text-sm text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 active:scale-95"
            style={{
              background: 'linear-gradient(135deg, var(--accent), var(--accent-purple))',
              boxShadow: '0 4px 24px rgba(59,130,246,0.4)',
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="M22 7l-10 6L2 7" />
            </svg>
            Send me an email
          </a>

          {/* Social links row */}
          <div className="flex flex-wrap justify-center gap-4 mt-10 pt-8" style={{ borderTop: '1px solid var(--bg-border)' }}>
            {SOCIAL_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith('mailto') ? undefined : '_blank'}
                rel={link.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                className="group flex items-center gap-2 transition-all duration-200 hover:gap-2.5"
                style={{ color: 'var(--text-muted)' }}
                aria-label={`${link.label}: ${link.value}`}
              >
                <span className="group-hover:text-accent transition-colors" style={{ color: 'inherit' }}>
                  {link.icon}
                </span>
                <span
                  className="font-body text-sm group-hover:text-accent transition-colors"
                  style={{ color: 'inherit' }}
                >
                  {link.value}
                </span>
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
