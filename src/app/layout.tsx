import type { ReactNode } from 'react';
import '@/globals.css';

export const metadata = {
  title: 'Sebastian Coteanu – Technical Team Lead & Senior Software Engineer',
  description:
    'Technical Team Lead and Senior Software Engineer based in Bucharest. ' +
    'Builds scalable, high-performance applications. 7+ years across cybersecurity SaaS, ' +
    'trading platforms, and micro-frontend architectures.',
  viewport: 'width=device-width, initial-scale=1',
};

// Inline script that runs BEFORE React hydration to prevent flash-of-light-theme
const darkModeScript = `
(function(){
  try {
    const stored = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (stored === 'dark' || (!stored && prefersDark)) {
      document.documentElement.classList.add('dark');
    }
  } catch(e) {}
})();
`;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* eslint-disable-next-line dangerouslySetInnerHTML */}
        <script dangerouslySetInnerHTML={{ __html: darkModeScript }} />
      </head>
      <body className="font-body">
        {children}
      </body>
    </html>
  );
}
