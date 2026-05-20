import { Helmet } from 'react-helmet-async';
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
      <Helmet>
        <title>Expeons | Precision Process Engineering & Aspen HYSYS Simulation</title>
        <meta name="description" content="Expeons provides high-precision process engineering, Aspen HYSYS simulation services, and EPC-ready documentation delivery for industrial projects." />
        <link rel="canonical" href="https://expeons.com" />
      </Helmet>
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
