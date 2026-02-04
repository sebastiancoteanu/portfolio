'use client';

import Navbar            from '@/components/Navbar';
import BackgroundBlobs   from '@/components/BackgroundBlobs';
import Hero              from '@/components/Hero';
import ExperienceSection from '@/components/ExperienceSection';
import HighlightsSection from '@/components/HighlightsSection';
import SkillsSection     from '@/components/SkillsSection';
import WorkSection       from '@/components/WorkSection';
import EducationSection  from '@/components/EducationSection';
import ContactSection    from '@/components/ContactSection';
import Footer            from '@/components/Footer';

export default function Home() {
  return (
    <>
      {/* Fixed animated gradient blobs (z-0) */}
      <BackgroundBlobs />

      {/* Sticky navigation (z-50) */}
      <Navbar />

      {/* Page sections */}
      <main>
        <Hero />
        <ExperienceSection />
        <HighlightsSection />
        <SkillsSection />
        <WorkSection />
        <EducationSection />
        <ContactSection />
      </main>

      <Footer />
    </>
  );
}
