import Hero from '@/components/Hero';
import CapabilitiesSection from '@/components/sections/CapabilitiesSection';
import ProcessSection from '@/components/sections/ProcessSection';
import AuthoritySection from '@/components/sections/AuthoritySection';
import WhySection from '@/components/sections/WhySection';
import OpenRolesSection from '@/components/sections/OpenRolesSection';
import EngageSection from '@/components/sections/EngageSection';

export default function Home() {
  return (
    <>
      <Hero />
      <CapabilitiesSection />
      <ProcessSection />
      <AuthoritySection />
      <WhySection />
      <OpenRolesSection />
      <EngageSection />
    </>
  );
}
