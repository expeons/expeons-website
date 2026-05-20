import { Hero } from '../components/home/Hero';
import { StatsStrip } from '../components/home/StatsStrip';
import { Services } from '../components/home/Services';
import { WhyExpeons } from '../components/home/WhyExpeons';
import { Packages } from '../components/home/Packages';
import { HowItWorks } from '../components/home/HowItWorks';
import { InsightsPreview } from '../components/home/InsightsPreview';
import { CTABand } from '../components/home/CTABand';

export function Home() {
  return (
    <>
      <Hero />
      <StatsStrip />
      <Services />
      <WhyExpeons />
      <Packages />
      <HowItWorks />
      <InsightsPreview />
      <CTABand />
    </>
  );
}
