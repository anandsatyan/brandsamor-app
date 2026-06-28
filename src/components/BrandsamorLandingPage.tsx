import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ComingSoonLabel } from './ComingSoonLabel';
import { FaqSection } from './FaqSection';
import {
  FlatLayIllustration,
  HeroBottleIllustration,
  MarbleBottleIllustration,
  PackagingIllustration,
  ScentSamplesIllustration,
} from './Illustrations';
import { SectionLinkButton } from './SectionLinkButton';
import { SeoHead } from './SeoHead';
import { SiteFooter } from './SiteFooter';
import { SiteHeader } from './SiteHeader';
import { TrustStrip } from './TrustStrip';

const STEP_NUMBER_GRADIENT = 'radial-gradient(circle at 75% 115%, #f8b6d3 0%, #dc79e8 24%, transparent 48%), radial-gradient(circle at 82% 30%, #5d37ee 0%, #8958ec 28%, transparent 55%), linear-gradient(115deg, #f3a5a8 0%, #d88bd3 38%, #9365ef 68%, #6142dd 100%)';

const SectionCtaRow = ({ to, label }: { to: string; label: string }) => (
  <div className="mt-8 sm:mt-12 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-center">
    <ComingSoonLabel />
    <SectionLinkButton to={to}>{label}</SectionLinkButton>
  </div>
);

// ——— Audience ticker icons ———
const LipstickIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2D302B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="9" y="2" width="6" height="5" rx="1" />
    <path d="M9 7v3l-1 1v9a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-9l-1-1V7" />
    <line x1="9" y1="11" x2="15" y2="11" />
  </svg>;
const SparkleIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2D302B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
  </svg>;
const StorefrontIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2D302B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l1-5h16l1 5" />
    <path d="M3 9a2 2 0 0 0 4 0 2 2 0 0 0 4 0 2 2 0 0 0 4 0 2 2 0 0 0 4 0" />
    <path d="M5 9v11h14V9" />
    <rect x="9" y="13" width="6" height="7" rx="1" />
  </svg>;
const HotelIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2D302B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="15" rx="1" style={{
    paddingBottom: "0px",
    paddingTop: "50px"
  }} />
    <path d="M16 22V7a4 4 0 0 0-8 0v15" style={{
    display: "block",
    flexDirection: "column"
  }} />
    <line x1="2" y1="12" x2="22" y2="12" />
  </svg>;
const LeafIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2D302B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z" />
    <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
  </svg>;
const CandleIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2D302B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2c0 0-2 2-2 4s2 3 2 3 2-1 2-3-2-4-2-4z" />
    <rect x="8" y="9" width="8" height="13" rx="1" />
    <line x1="6" y1="22" x2="18" y2="22" />
  </svg>;
const GiftIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2D302B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="8" width="18" height="4" rx="1" />
    <rect x="5" y="12" width="14" height="9" rx="1" />
    <path d="M12 8V21" />
    <path d="M8 8c0 0-1-4 4-4s4 4 4 4" />
    <path d="M8 8c0 0 1-4-4-4" />
    <path d="M16 8c0 0-1-4 4-4" style={{
    height: "400px",
    width: "500px",
    maxWidth: "500px"
  }} />
  </svg>;
const audienceItems = [{
  label: 'Beauty & Skincare Brands',
  desc: 'Extend your scent world into personal perfume.',
  Icon: LipstickIcon
}, {
  label: 'Creators & Influencers',
  desc: 'Launch a signature perfume your audience can buy, gift, and remember you by.',
  Icon: SparkleIcon
}, {
  label: 'Boutiques & Retail Stores',
  desc: 'Add a branded fragrance to your retail floor that sells itself.',
  Icon: StorefrontIcon
}, {
  label: 'Hotels & Spas',
  desc: 'Create a scent experience guests can take home.',
  Icon: HotelIcon
}, {
  label: 'Salons & Wellness Studios',
  desc: 'Give your clients a branded wellness product they love.',
  Icon: LeafIcon
}, {
  label: 'Candle & Home Fragrance Brands',
  desc: 'Move into personal fragrance with your existing scent expertise.',
  Icon: CandleIcon
}, {
  label: 'Corporate Gifting Companies',
  desc: 'Offer premium branded perfume sets for B2B gifting programs.',
  Icon: GiftIcon
}];
const howItWorksSteps = [{
  num: '01',
  title: 'Sample from our scent library',
  desc: 'Explore our scent library and use the online guide to choose samples that match your brand, customer, and use case.'
}, {
  num: '02',
  title: 'Pick your starting scents',
  desc: 'Choose one scent or a small set of scents to launch with, so you can test demand before growing the line.'
}, {
  num: '03',
  title: 'Choose your bottle & branding setup',
  desc: 'Select the bottle, cap, spray, label, color, printing, and packaging details that fit your brand style, price point, and launch quantity.'
}, {
  num: '04',
  title: 'Get ready-to-sell perfumes delivered',
  desc: 'Receive your first batch within weeks, finished and packed so you can start selling without managing production or quality checks.'
}];
const whySellCards = [{
  num: '01',
  title: 'Add a High-Margin Product',
  desc: 'Perfume can give your brand a premium product to sell without adding heavy inventory, equipment, or in-house production.'
}, {
  num: '02',
  title: 'Create a Product Customers Can Gift',
  desc: 'Perfume is easy to gift, easy to display, and gives your customers a personal way to share your brand with others.'
}, {
  num: '03',
  title: 'Build a Stronger Brand Experience',
  desc: 'Scent makes your brand more memorable by giving customers something they can wear, keep, and come back to.'
}, {
  num: '04',
  title: 'Create Repeat Sales',
  desc: 'A fragrance people love can bring customers back for refills, gifts, seasonal launches, and new scent drops.'
}, {
  num: '05',
  title: "Become Part of Your Customer's Daily Routine",
  desc: 'Perfume is used often and remembered personally, keeping your brand close to customers beyond the first purchase.'
}, {
  num: '06',
  title: 'Give Your Brand a Premium Extension',
  desc: 'Perfume lets your brand enter a premium product category without having to build the product from scratch.'
}];
const whyBrandsamorCards = [{
  title: 'No Factory Setup Needed',
  desc: 'Start with Brandsamor handling the sourcing, filling, packaging, and quality checks, instead of setting up your own production process.'
}, {
  title: 'Samples Before You Commit',
  desc: 'Order samples first, compare scent options, and choose what feels right before starting your first batch.'
}, {
  title: 'More Bottle and Branding Options',
  desc: 'Choose from more bottle, cap, spray, color, label, and printing options so your perfume does not look like a standard off-the-shelf product.'
}, {
  title: 'Ready to Sell in Weeks',
  desc: 'Move from scent selection to your first finished batch in weeks, so you can start selling sooner.'
}, {
  title: 'Quality Checks Handled for You',
  desc: 'Brandsamor checks the product details during filling, packing, and finishing so you do not have to manage quality control yourself.'
}, {
  title: 'Built to Help You Start Small',
  desc: 'Start with a focused first batch, learn what customers like, and grow your fragrance line step by step.'
}];
const complianceItems = [{
  title: 'FDA MoCRA Registration and Product Listing',
  desc: 'For fragrance products sold as cosmetics in the U.S., Brandsamor plans to support the required FDA MoCRA facility registration and cosmetic product listing process where applicable.'
}, {
  title: 'GMP-Compliant Production',
  desc: 'Your perfume will be filled and finished through facilities following Good Manufacturing Practice standards for cosmetic products.'
}, {
  title: 'Certificate of Analysis',
  desc: 'A Certificate of Analysis can be provided for your selected fragrance batch for your records and product documentation.'
}, {
  title: 'IFRA Certificate',
  desc: 'An IFRA certificate can be provided to support safe fragrance use according to applicable fragrance-use standards.'
}, {
  title: 'Allergen Information',
  desc: 'Allergen information can be provided to help with label planning, ingredient review, and market-specific documentation needs.'
}, {
  title: 'Batch Records',
  desc: 'Documentation support to keep product, batch, fragrance, and compliance records organized from the first launch.'
}];
const productOptions = [{
  num: '01',
  title: 'Bottle Options',
  desc: 'Choose from different bottle shapes, sizes, and styles so your fragrance feels aligned with your brand.'
}, {
  num: '02',
  title: 'Cap and Spray Choices',
  desc: 'Select the cap and spray combination that fits the look, price point, and feel of your perfume product.'
}, {
  num: '03',
  title: 'Labels, Printing and Color',
  desc: 'Add your logo, label design, screen printing, color direction, and finishing details to make the product your own.'
}, {
  num: '04',
  title: 'Retail-Ready Packaging',
  desc: 'Use boxes, inserts, gift packaging, and finishing details to make your perfume feel ready to sell or gift.'
}];
const testimonials = [{
  name: 'Christopher J.',
  quote: 'The bottles are heavy and feel high quality with an amazing atomizer. The boxes are of the same quality and look fantastic. Truly a fantastic package all around.'
}, {
  name: 'Erin S.',
  quote: 'We are loving the gorgeous upgrade we made by switching to Brandsamor. The quality of the bottles is really something else.'
}, {
  name: 'Monica M.',
  quote: 'My customers love the travel size and the heavy glass. The finished product feels premium and sells itself.'
}];
const packagingItems = [{
  num: '01',
  title: 'Perfume Bottles',
  desc: 'Brandsamor already helps fragrance brands source bottles in different shapes, capacities, and finishes.'
}, {
  num: '02',
  title: 'Caps and Sprays',
  desc: 'We understand how bottle, cap, and spray choices affect the final product look and feel.'
}, {
  num: '03',
  title: 'Packaging Details',
  desc: 'Labels, boxes, printing, and finishing details are part of how your perfume becomes brand-ready.'
}];

// Animated step number hook
const useActiveStep = (_count: number) => {
  const refs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    refs.current.forEach((el, idx) => {
      if (!el) return;
      const obs = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          setActiveIndex(idx);
        }
      }, {
        threshold: 0.5
      });
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach(o => o.disconnect());
  }, []);
  return {
    refs,
    activeIndex
  };
};

export const BrandsamorLandingPage = () => {
  const {
    refs: stepRefs,
    activeIndex: activeStepIndex
  } = useActiveStep(howItWorksSteps.length);
  return <div className="min-h-screen bg-[#f9f7f2] font-sans text-[#2D302B] overflow-x-hidden">
      <SeoHead />
      <SiteHeader />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 pb-16 sm:pb-24">
        {/* HERO */}
        <section id="overview" className="py-10 grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="space-y-6 sm:space-y-8">
            <span className="inline-block px-3 py-1 bg-[#E7DED2] text-[#2D302B] text-xs font-semibold uppercase tracking-wider rounded-full">PRIVATE LABEL</span>
            <h1 className="text-3xl sm:text-4xl md:text-6xl leading-tight text-[#2D302B]">The Easy Way to Start Your Own Perfume Line</h1>
            <p className="text-[#2D302B] text-base sm:text-lg max-w-lg leading-relaxed">
              Launch a ready-to-sell fragrance product quickly and easily, with Brandsamor handling the scent, bottle, packaging, filling, and quality checks for you.
            </p>
            <ComingSoonLabel />
          </div>
          <div className="relative rounded-xl overflow-hidden w-full max-w-lg mx-auto md:mx-0 h-64 sm:h-80 md:h-[400px]">
            <HeroBottleIllustration />
          </div>
        </section>

        <TrustStrip testimonials={testimonials} />

        {/* HOW IT WORKS */}
        <section id="how-it-works" className="py-12 sm:py-24 grid md:grid-cols-2 gap-10 md:gap-16">
          <div>
            <h4 className="text-[#A8BBBF] text-sm uppercase tracking-widest font-semibold mb-6 flex items-center gap-4">
              <span className="w-8 h-px bg-[#f1ece0]"></span> HOW IT WORKS
            </h4>
            <h2 className="text-3xl sm:text-4xl mb-6">
              Branded perfumes, <i className="font-normal not-italic font-sans">made simple</i>
            </h2>
            <p className="text-base sm:text-lg text-[#2D302B] mb-8 sm:mb-12">
              Start with samples, choose the scents you like, customize the look, and launch your first ready-to-sell perfume line in weeks — not months.
            </p>
            <div className="rounded-xl overflow-hidden w-full max-w-[250px] h-[200px] sm:h-[250px]">
              <MarbleBottleIllustration />
            </div>
          </div>
          <div className="space-y-8 sm:space-y-12">
            {howItWorksSteps.map((step, idx) => {
            const isActive = activeStepIndex === idx;
            const isPast = activeStepIndex > idx;
            return <div key={step.num} ref={el => {
              stepRefs.current[idx] = el;
            }} className="flex gap-4 sm:gap-8 group">
                  
                  <div className="text-4xl sm:text-5xl font-display transition-all duration-300 shrink-0 w-12 sm:w-16 select-none" style={{
                ...(isActive ? {
                  background: STEP_NUMBER_GRADIENT,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                } : {
                  color: '#E7DED2'
                })
              }}>
                    
                    {step.num}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg sm:text-xl font-bold mb-2 transition-colors duration-300" style={{
                  color: isActive || isPast ? '#2D302B' : '#B8B4AF'
                }}>
                      
                      {step.title}
                    </h3>
                    <p className="text-sm sm:text-base leading-relaxed transition-colors duration-300" style={{
                  color: isActive || isPast ? '#77736E' : '#C8C4BF'
                }}>
                      
                      {step.desc}
                    </p>
                  </div>
                </div>;
          })}
            <div className="pt-4">
              <SectionCtaRow to="/how-it-works" label="Learn more about our process" />
            </div>
          </div>
        </section>

        {/* FRAGRANCE PRODUCTS */}
        <section id="fragrance-products" className="py-12 sm:py-24 border-t border-[#f1ece0] grid md:grid-cols-2 gap-10 md:gap-16">
          <div>
            <h4 className="text-[#A8BBBF] text-sm uppercase tracking-widest font-semibold mb-6 flex items-center gap-4">
              <span className="w-8 h-px bg-[#f1ece0]"></span> FRAGRANCE PRODUCTS
            </h4>
            <h2 className="text-3xl sm:text-4xl mb-8 sm:mb-12">Bottle, Cap, Spray and Packaging Options That Look Like Your Brand</h2>
            <div className="rounded-xl overflow-hidden w-full max-w-md h-64 sm:h-80 md:h-[400px] mx-auto md:mx-0">
              <FlatLayIllustration />
            </div>
          </div>
          <div className="flex flex-col justify-center">
            <p className="text-base sm:text-lg text-[#2D302B] mb-8 sm:mb-12 border-b border-[#f1ece0] pb-8 sm:pb-12">
              Your perfume does not have to look like a standard private label product. Brandsamor gives you more ways to shape the bottle, cap, spray, color, label, printing, and packaging direction.
            </p>
            <div className="space-y-8 sm:space-y-10">
              {productOptions.map(item => <div key={item.num} className="flex gap-4 sm:gap-8 group">
                  <div className="text-3xl sm:text-4xl font-display text-[#A8BBBF] shrink-0">{item.num}</div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                    <p className="text-[#77736E]">{item.desc}</p>
                  </div>
                </div>)}
            </div>
            <SectionCtaRow to="/fragrance-products" label="Explore all product formats" />
          </div>
        </section>

        {/* FRAGRANCE SAMPLING */}
        <section id="fragrance-sampling" className="py-12 sm:py-24 border-t border-[#f1ece0] grid md:grid-cols-2 gap-10 md:gap-16 items-center">
          <div>
            <h4 className="text-[#A8BBBF] text-sm uppercase tracking-widest font-semibold mb-6 flex items-center gap-4">
              <span className="w-8 h-px bg-[#f1ece0]"></span> FRAGRANCE SAMPLING
            </h4>
            <h2 className="text-3xl sm:text-4xl mb-6">Sample scents before you commit to production</h2>
            <p className="text-base sm:text-lg text-[#2D302B] mb-8 leading-relaxed">
              Browse the Brandsamor scent library, order samples that fit your brand, and choose your launch fragrance with confidence before your first batch goes into production.
            </p>
            <SectionCtaRow to="/fragrance-sampling" label="Explore fragrance sampling" />
          </div>
          <div className="rounded-xl overflow-hidden w-full max-w-lg mx-auto md:mx-0">
            <ScentSamplesIllustration />
          </div>
        </section>

        {/* WHY LAUNCH PERFUME */}
        <section id="why-perfume" className="py-12 sm:py-24 border-t border-[#f1ece0]">
          <h4 className="text-[#A8BBBF] text-sm uppercase tracking-widest font-semibold mb-6 flex items-center gap-4">
            <span className="w-8 h-px bg-[#f1ece0]"></span> WHY LAUNCH PERFUME
          </h4>
          <div className="max-w-2xl mb-8 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl mb-6">Why Sell Perfume Under Your Own Brand?</h2>
            <p className="text-lg text-[#2D302B] mb-6">
              Perfume is a high-margin product that lets your brand create repeat sales, giftable products, and a stronger emotional connection with customers.
            </p>
            <div className="border-l-2 border-[#A8BBBF] pl-6 text-[#77736E] italic">
              For many businesses, fragrance is not the main business. It is a new product category that can extend the brand, increase revenue, and create a more memorable customer experience.
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {whySellCards.map(card => <div key={card.num} className="bg-[#FFFDFC] border border-[#f1ece0] rounded-[10px] p-6 sm:p-8 flex flex-col h-full min-h-[200px]">
                <div className="flex justify-between items-start mb-6">
                  <h3 className="font-bold text-lg leading-tight w-4/5">{card.title}</h3>
                  <span className="text-[#A8BBBF] text-sm font-medium">{card.num}</span>
                </div>
                <p className="text-[#77736E] text-sm mt-auto">{card.desc}</p>
              </div>)}
          </div>

          <SectionCtaRow to="/start-a-perfume-line" label="Start planning your line" />
        </section>
        <section id="why-brandsamor" className="py-12 sm:py-24 border-t border-[#f1ece0]">
          <h4 className="text-[#A8BBBF] text-sm uppercase tracking-widest font-semibold mb-6 flex items-center gap-4">
            <span className="w-8 h-px bg-[#f1ece0]"></span> WHY BRANDSAMOR
          </h4>
          <h2 className="text-3xl sm:text-4xl mb-8 sm:mb-12 max-w-sm">Why Start With Brandsamor Private Label?</h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {whyBrandsamorCards.map((card, idx) => <div key={card.title} className="bg-[#FFFDFC] border border-[#f1ece0] rounded-[10px] p-6 sm:p-8 relative overflow-hidden min-h-[200px] sm:min-h-[240px]">
                <div className="absolute -bottom-4 -right-4 text-[80px] sm:text-[120px] font-display text-[#f1ece0] opacity-50 leading-none pointer-events-none select-none">
                  {`0${idx + 1}`}
                </div>
                <h3 className="font-bold text-xl mb-4 relative z-10">{card.title}</h3>
                <p className="text-[#77736E] text-sm relative z-10">{card.desc}</p>
              </div>)}
          </div>

          <SectionCtaRow to="/why-brandsamor" label="Why choose Brandsamor" />
        </section>
        <section id="packaging" className="py-12 sm:py-24 grid md:grid-cols-2 gap-10 md:gap-16 border-t border-[#f1ece0]">
          <div>
            <h4 className="text-[#A8BBBF] text-sm uppercase tracking-widest font-semibold mb-6 flex items-center gap-4">
              <span className="w-8 h-px bg-[#f1ece0]"></span> PACKAGING & BRANDING
            </h4>
            <h2 className="text-3xl sm:text-4xl mb-6">
              Built on proven <span className="text-[#A8BBBF]">fragrance packaging</span> experience
            </h2>
            <p className="text-lg text-[#2D302B] mb-12">
              Brandsamor already works with brands that source perfume bottles, caps, sprays, and packaging. Private Label builds on that experience to help you launch a finished fragrance product more easily.
            </p>
            <div className="space-y-8">
              {packagingItems.map(item => <div key={item.num} className="flex gap-6">
                  <div className="text-xl text-[#A8BBBF] font-medium">{item.num}</div>
                  <div>
                    <h3 className="text-lg font-bold mb-1">{item.title}</h3>
                    <p className="text-[#77736E]">{item.desc}</p>
                  </div>
                </div>)}
            </div>
          </div>
          <div className="flex flex-col gap-6 relative">
            <div className="aspect-[4/3] rounded-xl overflow-hidden flex items-center justify-center" style={{
            background: '#F2EDE4'
          }}>
              <PackagingIllustration />
            </div>
            <div className="bg-[#FFFDFC] border border-[#f1ece0] rounded-[10px] p-6 sm:p-8 max-w-sm shadow-sm">
              <div className="text-4xl text-[#A8BBBF] font-display mb-4">"</div>
              <p className="text-lg font-medium mb-4">Packaging is where a perfume starts to feel like a real product.</p>
              <p className="text-xs text-[#77736E] uppercase tracking-wider font-semibold">— BRANDSAMOR PRIVATE LABEL</p>
            </div>
          </div>
        </section>
        <div className="border-t border-[#f1ece0] pb-4">
          <SectionCtaRow to="/packaging-branding" label="Explore packaging options" />
        </div>

        {/* WHO WE WORK WITH */}
        <section id="who-we-work-with" className="py-12 sm:py-24 border-t border-[#f1ece0]">
          <h4 className="text-[#A8BBBF] text-sm uppercase tracking-widest font-semibold mb-6 flex items-center gap-4">
            <span className="w-8 h-px bg-[#f1ece0]"></span> WHO WE WORK WITH
          </h4>
          <div className="flex flex-col md:flex-row justify-between items-start mb-8 sm:mb-12 gap-6 sm:gap-8">
            <h2 className="text-3xl sm:text-4xl max-w-md">Built for brands ready to launch fragrance</h2>
            <p className="text-[#77736E] max-w-md">From retail and e-commerce to events and gifting — if you have an audience and a brand, private label perfume can be your next product line.</p>
          </div>
          <div className="relative">
            <div className="overflow-hidden">
              <motion.div animate={{
          x: ['0%', '-50%']
        }} transition={{
          ease: 'linear',
          duration: 20,
          repeat: Infinity
        }} className="flex gap-4 sm:gap-6 pr-4 sm:pr-6">
            {audienceItems.map(item => <div key={item.label} className="bg-[#FFFDFC] border border-[#f1ece0] rounded-[10px] p-4 sm:p-6 flex flex-col justify-center min-w-[260px] sm:min-w-[280px] min-h-[140px] sm:min-h-[150px]">
                <div className="mb-3">{<item.Icon />}</div>
                <h3 className="font-medium text-base sm:text-lg mb-2 max-w-[220px]">{item.label}</h3>
                <p className="text-sm text-[#77736E] whitespace-normal">{item.desc}</p>
              </div>)}
            {audienceItems.map(item => <div key={`dup-${item.label}`} className="bg-[#FFFDFC] border border-[#f1ece0] rounded-[10px] p-4 sm:p-6 flex flex-col justify-center min-w-[260px] sm:min-w-[280px] min-h-[140px] sm:min-h-[150px]">
                <div className="mb-3">{<item.Icon />}</div>
                <h3 className="font-medium text-lg mb-2">{item.label}</h3>
                <p className="text-sm text-[#77736E] whitespace-normal">{item.desc}</p>
              </div>)}
          </motion.div>
            </div>
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 left-0 z-10 hidden md:block w-20 lg:w-36 bg-gradient-to-r from-[#f9f7f2] via-[#f9f7f2]/60 to-transparent"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 right-0 z-10 hidden md:block w-20 lg:w-36 bg-gradient-to-l from-[#f9f7f2] via-[#f9f7f2]/60 to-transparent"
            />
          </div>
          <SectionCtaRow to="/who-we-work-with" label="See who we work with" />
        </section>
        <section id="compliance" className="py-12 sm:py-24 border-t border-[#f1ece0] grid md:grid-cols-3 gap-8 sm:gap-12">
          <div className="md:col-span-1">
            <h4 className="text-[#A8BBBF] text-sm uppercase tracking-widest font-semibold mb-6 flex items-center gap-4">
              <span className="w-8 h-px bg-[#f1ece0]"></span> QUALITY & COMPLIANCE
            </h4>
            <h2 className="text-3xl sm:text-4xl mb-6">Compliance Support for Your Fragrance Line</h2>
            <p className="text-[#77736E]">
              Compliance needs can vary by product type, market, claims, formula, and selling channel. Brandsamor does not describe perfume products as FDA approved.
            </p>
          </div>
          <div className="md:col-span-2 grid sm:grid-cols-2 gap-6">
            {complianceItems.map(item => <div key={item.title} className="bg-[#FFFDFC] border border-[#f1ece0] rounded-[10px] p-6">
                <div className="text-[#A8BBBF] mb-4 text-lg">✦</div>
                <h3 className="font-bold text-base mb-2">{item.title}</h3>
                <p className="text-xs text-[#77736E] leading-relaxed">{item.desc}</p>
              </div>)}
          </div>
          <div className="md:col-span-3 mt-8 sm:mt-4">
            <SectionCtaRow to="/quality-compliance" label="Learn about quality and compliance" />
          </div>
        </section>

        <FaqSection />
      </main>

      {/* SECTION 12 - FINAL CTA (Dark Section) */}
      <section className="bg-[#2D302B] py-12 sm:py-24 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 grid md:grid-cols-2 gap-10 md:gap-16 items-center">
          <div>
            <h4 className="text-[#A8BBBF] text-sm uppercase tracking-widest font-semibold mb-6">READY TO LAUNCH?</h4>
            <h2 className="text-3xl sm:text-4xl md:text-5xl leading-tight mb-6">Ready to Start Your Own Perfume Line?</h2>
            <p className="text-base sm:text-lg text-white/80 mb-8 sm:mb-10 max-w-md">
              Answer a few questions about your brand, scent direction, quantity, and packaging needs. We'll use that to understand the right starting point for your first fragrance product.
            </p>
            <div className="mb-6">
              <ComingSoonLabel variant="dark" />
            </div>
            <p className="text-sm text-white/60">Start with your idea. The first step is simply telling us what you want to build.</p>
          </div>
          <div className="relative aspect-square max-w-md mx-auto w-full rounded-2xl bg-gradient-to-tr from-[#3a3d38] to-[#2D302B] border border-white/10 flex items-center justify-center p-8 sm:p-12">
            <div className="absolute top-1/4 left-4 sm:left-10 px-3 sm:px-4 py-2 rounded-full border border-[#A8BBBF] text-xs font-medium text-white/80">Samples first</div>
            <div className="absolute bottom-1/4 right-4 sm:right-10 px-3 sm:px-4 py-2 rounded-full border border-[#A8BBBF] text-xs font-medium text-white/80">Ready-to-sell batch</div>
            <div className="w-32 h-48 bg-[#FFFDFC]/10 backdrop-blur-sm rounded-[10px] border border-white/20 shadow-2xl flex flex-col items-center justify-end p-4">
              <div className="w-16 h-4 bg-white/20 rounded-sm mb-2"></div>
              <div className="w-12 h-2 bg-white/10 rounded-sm"></div>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>;
};