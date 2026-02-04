// =============================================================================
// src/content.ts — Single source of truth for all site content.
// Edit this file to update any text, dates, links, or data on the site.
// =============================================================================

// -----------------------------------------------------------------------------
// RECONCILIATION NOTES (internal — not rendered):
//
// 1. LinkedIn profile PDF now available. All data reconciled below.
//
// 2. Hero title set to "Senior Software Engineer" — matches current Cresta
//    role. The "Go x React" specialisation from the LinkedIn headline is kept
//    in the Cresta card tags rather than the hero, to avoid clutter.
//
// 3. Cresta role added at the top. LinkedIn says "Jul 2025 – Present" with
//    the note "Building AI agents". Bullets are minimal because the role is
//    very recent — expand as you ship more.
//
// 4. Qualitest is no longer current. LinkedIn end-date: Jul 2025. Dates and
//    isCurrentRole updated accordingly.
//
// 5. Luxoft title corrected to "Senior Software Developer / React Lead"
//    per LinkedIn (was "Lead Front End Developer" in the old CV).
//
// 6. Arnia end-date corrected to Nov 2021 per LinkedIn. Title simplified
//    to "Frontend Developer" matching LinkedIn (old CV said "Full Stack").
//
// 7. Mindit: LinkedIn splits into intern (Jul–Sep 2017) + full role
//    (Oct 2017–Mar 2019). Merged into one card with the internship noted
//    in the period string to keep the timeline clean.
//
// 8. New skills added: Go, ClickHouse, Amazon S3, Software Design (all from
//    LinkedIn "key skills"). Languages bucket added: English, French.
//
// 9. New certs added: Product Architecture Design, ECDL Profile Certificate,
//    HackerRank Javascript (Basic) — all from LinkedIn.
//
// 10. High-school entry added to education per LinkedIn.
//
// 11. New highlight card for AI agents work at Cresta.
// -----------------------------------------------------------------------------

// ── Types ────────────────────────────────────────────────────────────────────

export interface HeroData {
  name: string;
  title: string;
  location: string;
  summary: string;
  cta: { label: string; href: string; variant: 'primary' | 'secondary' | 'ghost' }[];
}

export interface ExperienceRole {
  company: string;
  role: string;
  period: string; // human-readable
  startYear: number; // for timeline math
  endYear: number; // current year if ongoing
  isCurrentRole: boolean;
  bullets: string[];
  tags: string[]; // tech tags shown on card
}

export interface Highlight {
  icon: string; // emoji or icon key
  title: string;
  description: string;
}

export interface SkillBucket {
  label: string;
  skills: string[];
}

export interface Repo {
  name: string;
  description: string;
  language: string;
  url: string;
}

export interface EducationEntry {
  degree: string;
  institution: string;
  year: number;
  detail?: string; // e.g. dissertation topic
}

export interface Certification {
  title: string;
  issuer: string;
  detail?: string;
}

export interface HackathonEntry {
  name: string;
  year: string;
  result: string;
  detail?: string;
}

export interface ContactData {
  email: string;
  github: string;
  linkedin: string;
  phone?: string; // optional — remove if you don't want it public
}

// ── Hero ─────────────────────────────────────────────────────────────────────

export const hero: HeroData = {
  name: 'Sebastian Coteanu',
  // Current role at Cresta. See reconciliation note #2 above.
  title: 'Senior Software Engineer',
  location: 'Bucharest, Romania',
  summary:
    'Currently building AI agents at Cresta. 9+ years of shipping scalable, ' +
    'high-performance software — from real-time cybersecurity dashboards to full-stack ' +
    'trading platforms. I lead teams toward cleaner architectures and code that lasts.',
  cta: [
    { label: 'Contact Me', href: '#contact', variant: 'primary' },
    { label: 'GitHub', href: 'https://github.com/sebastiancoteanu', variant: 'secondary' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/coteanu-sebastian/', variant: 'ghost' },
  ],
};

// ── Experience ───────────────────────────────────────────────────────────────

export const experience: ExperienceRole[] = [
  {
    company: 'Cresta',
    role: 'Senior Software Engineer',
    period: 'Jul 2025 – Present',
    startYear: 2025,
    endYear: 2026, // current
    isCurrentRole: true,
    bullets: [
      'Designed the integration architecture for third-party workforce management APIs, defining clear data flows for ingesting scheduling and resource-pool data into analytics pipelines.',
      'Improved the data export system with time-range filtering and server-to-server gRPC optimizations for large, distributed dataset processing.',
      'Designed the ClickHouse analytics schema and built a Postgres → ClickHouse replication pipeline for high-volume analytical workloads.',
      'Built Go backend services for CSV data parsing and transformation, with job orchestration handled via Temporal.',
      'Implemented frontend features in React and TypeScript, including data import flows with real-time preview and validation.',
    ],
    tags: [
      'Go',
      'React',
      'TypeScript',
      'gRPC',
      'Protocol Buffers',
      'Postgres',
      'ClickHouse',
      'Temporal',
      'AWS S3',
      'Distributed Systems',
    ],
  },
  {
    company: 'Qualitest',
    role: 'Technical Team Lead',
    period: 'Aug 2022 – Jul 2025',
    startYear: 2022,
    endYear: 2025,
    isCurrentRole: false,
    bullets: [
      'Led end-to-end development of a monorepo cybersecurity SaaS application using Yarn workspaces.',
      'Established coding standards, clean-code principles, and ran knowledge-sharing sessions to raise team quality.',
      'Drove full WCAG 2.2 AAA compliance — audited and remediated accessibility across the product.',
      'Architected the integration of Jest + Cypress into the CI/CD pipeline, improving test coverage and release confidence.',
      'Built ArcGIS map features including antenna beam triangulation, data clustering, and real-time data streaming.',
    ],
    tags: ['React', 'TypeScript', 'Jest', 'Cypress', 'ArcGIS', 'Yarn Workspaces', 'CI/CD'],
  },
  {
    company: 'Luxoft',
    role: 'Senior Software Developer / React Lead',
    period: 'Dec 2021 – Aug 2022',
    startYear: 2021,
    endYear: 2022,
    isCurrentRole: false,
    bullets: [
      'Integrated new components into a React + Redux Toolkit micro-frontend architecture for internal platforms.',
      'Defined coding standards and shaped architectural decisions for scalable frontend systems.',
      'Built data-visualization features with Victory Charts including animated charts and custom Google Maps clustering.',
      'Led library selection process — balancing performance, bundle size, and long-term maintainability.',
    ],
    tags: ['React', 'Redux Toolkit', 'Victory Charts', 'Google Maps', 'Micro-frontends'],
  },
  {
    company: 'Arnia Software',
    role: 'Frontend Developer',
    period: 'Mar 2019 – Nov 2021',
    startYear: 2019,
    endYear: 2021,
    isCurrentRole: false,
    bullets: [
      'Built an isomorphic oil-trading platform with Next.js, GraphQL (Apollo), MongoDB, and Stripe payment flows.',
      'Developed a site builder with drag-and-drop (React DnD), versioning, and Socket.IO real-time messaging.',
      'Delivered a Vue.js proof-of-concept independently — from requirements through to production deployment.',
      'Shipped a fully responsive mobile social platform with optimised GraphQL caching and Redux Saga async flows.',
    ],
    tags: [
      'Next.js',
      'GraphQL',
      'Apollo',
      'MongoDB',
      'Stripe',
      'Vue.js',
      'Redux Saga',
      'Socket.IO',
    ],
  },
  {
    company: 'Mindit Software',
    role: 'Frontend Developer',
    // LinkedIn splits this into an intern stint (Jul–Sep 2017) followed by the
    // full role (Oct 2017–Mar 2019). Merged into one card for timeline clarity.
    period: 'Jul 2017 – Mar 2019',
    startYear: 2017,
    endYear: 2019,
    isCurrentRole: false,
    bullets: [
      'Started as an intern: built a CRUD Angular 2 web app integrated with Java Spring and MySQL; designed graphic mockups for an internal project.',
      'Built a product-information management system with AngularJS, Material UI, and SCSS.',
      'Delivered supplier-facing reporting features for real-time product-performance tracking.',
    ],
    tags: ['AngularJS', 'Angular 2', 'Material UI', 'SCSS', 'Java Spring', 'MySQL'],
  },
];

// ── Highlights ───────────────────────────────────────────────────────────────
// Pick the most impactful, non-redundant moments across the whole career.

export const highlights: Highlight[] = [
  {
    icon: '🤖',
    title: 'AI Agent Development',
    description:
      'Joining Cresta as a Senior Software Engineer to build AI agents — working at the intersection of Go, React, and machine-learning-powered product intelligence.',
  },
  {
    icon: '🛡️',
    title: 'WCAG 2.2 AAA Compliance',
    description:
      'Audited and brought an entire cybersecurity SaaS product into full WCAG 2.2 AAA conformance — one of the strictest accessibility standards in the industry.',
  },
  {
    icon: '📦',
    title: 'Monorepo Architecture at Scale',
    description:
      'Designed and maintained a Yarn-workspaces monorepo serving a production cybersecurity application, with shared tooling and consistent CI/CD across packages.',
  },
  {
    icon: '🗺️',
    title: 'Real-Time GIS Mapping',
    description:
      'Engineered ArcGIS map features — antenna beam triangulation, geospatial data clustering, and live data feeds — for a security-critical dashboard.',
  },
  {
    icon: '💳',
    title: 'End-to-End Payment Platform',
    description:
      'Built an isomorphic trading platform with Stripe integration (payments + refunds) using Next.js server-side rendering and GraphQL.',
  },
  {
    icon: '⚙️',
    title: 'CI/CD & Testing Culture',
    description:
      'Championed the adoption of Jest unit tests and Cypress end-to-end tests, fully integrated into the CI/CD pipeline to shift quality left.',
  },
];

// ── Skills ───────────────────────────────────────────────────────────────────
// Grouped into logical buckets. Each skill appears exactly once.

export const skills: SkillBucket[] = [
  {
    label: 'Frontend',
    skills: ['React', 'Next.js', 'Vue.js', 'AngularJS', 'TypeScript', 'Vanilla JavaScript', 'SCSS'],
  },
  {
    label: 'State & Data',
    skills: ['Redux', 'Redux Toolkit', 'Redux Saga', 'GraphQL', 'Apollo Client'],
  },
  {
    label: 'Backend & APIs',
    skills: [
      'Go',
      'Node.js',
      'NestJS',
      'Express.js',
      'MongoDB',
      'Mongoose',
      'PostgreSQL',
      'ClickHouse',
      'Amazon S3',
      'Socket.IO',
      'Stripe',
    ],
  },
  {
    label: 'Testing & CI/CD',
    skills: ['Jest', 'Cypress', 'Mocha', 'Chai', 'CI/CD Pipelines'],
  },
  {
    label: 'Architecture & Tools',
    skills: [
      'Monorepo (Yarn Workspaces)',
      'Micro-frontends',
      'Software Design',
      'AI / Agents',
      'ArcGIS',
      'Google Maps',
      'React DnD',
    ],
  },
  {
    label: 'Blockchain',
    skills: ['Solidity', 'Web3 / dApps'],
  },
  {
    label: 'Languages',
    skills: ['English (Native)', 'French (Professional)'],
  },
];

// ── GitHub Repos (pinned) ────────────────────────────────────────────────────
// Sourced from public GitHub profile. Descriptions marked [placeholder] can be
// replaced with your own once you verify repo contents.

export const repos: Repo[] = [
  {
    name: 'staking-app',
    description:
      'A blockchain staking application built with TypeScript. [placeholder – update with your own description]',
    language: 'TypeScript',
    url: 'https://github.com/sebastiancoteanu/staking-app',
  },
  {
    name: 'wizard_web_ai',
    description: 'Dissertation project — an AI-powered web wizard interface.',
    language: 'TypeScript',
    url: 'https://github.com/sebastiancoteanu/wizard_web_ai',
  },
  {
    name: 'Birdieee',
    description: 'Web Techniques course project.',
    language: 'JavaScript',
    url: 'https://github.com/sebastiancoteanu/Birdieee',
  },
  {
    name: 'GroupExpenseTrackerMobile',
    description: 'Mobile UI for a group expense-tracker application.',
    language: 'Java',
    url: 'https://github.com/sebastiancoteanu/GroupExpenseTrackerMobile',
  },
  {
    name: 'currency-exchange',
    description: 'Currency exchange rate tracker. [placeholder – update with your own description]',
    language: 'TypeScript',
    url: 'https://github.com/sebastiancoteanu/currency-exchange',
  },
];

// ── Education ────────────────────────────────────────────────────────────────

export const education: EducationEntry[] = [
  {
    degree: 'Master of Science – Software Engineering',
    institution: 'University of Bucharest, Faculty of Mathematics and Computer Science',
    year: 2021,
    detail: 'Dissertation: Site Builder — React, Redux, Spring',
  },
  {
    degree: 'Bachelor of Science – Computer Science',
    institution: 'University of Bucharest, Faculty of Mathematics and Computer Science',
    year: 2019,
  },
  {
    degree: 'High School – Mathematics and Computer Science',
    institution: 'Gheorghe Vranceanu National College, Bacău',
    year: 2016,
  },
];

// ── Certifications ──────────────────────────────────────────────────────────

export const certifications: Certification[] = [
  {
    title: 'Product Architecture Design',
    issuer: 'EducativeIo',
  },
  {
    title: 'Decentralised Apps (DAPP) – Solidity & React',
    issuer: 'Udemy',
    detail: 'Blockchain development with Solidity smart contracts and React frontends.',
  },
  {
    title: 'JavaScript – Intermediate',
    issuer: 'HackerRank',
  },
];

// ── Contact ──────────────────────────────────────────────────────────────────

export const contact: ContactData = {
  email: 'sebastiancoteanu@gmail.com',
  github: 'https://github.com/sebastiancoteanu',
  linkedin: 'https://www.linkedin.com/in/coteanu-sebastian/',
};
