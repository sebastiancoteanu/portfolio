'use client';

import { contact } from '@/content';

export default function Footer() {
  return (
    <footer className="relative z-10 py-8 px-4 sm:px-6" style={{ borderTop: '1px solid var(--bg-border)' }}>
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="font-body text-xs" style={{ color: 'var(--text-muted)' }}>
          © {new Date().getFullYear()} Sebastian Coteanu. All rights reserved.
        </p>
        <div className="flex items-center gap-5">
          <a
            href={contact.github}
            target="_blank"
            rel="noopener noreferrer"
            className="font-body text-xs transition-colors duration-200 hover:text-accent"
            style={{ color: 'var(--text-muted)' }}
          >
            GitHub
          </a>
          <a
            href={contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="font-body text-xs transition-colors duration-200 hover:text-accent"
            style={{ color: 'var(--text-muted)' }}
          >
            LinkedIn
          </a>
          <a
            href={`mailto:${contact.email}`}
            className="font-body text-xs transition-colors duration-200 hover:text-accent"
            style={{ color: 'var(--text-muted)' }}
          >
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}
