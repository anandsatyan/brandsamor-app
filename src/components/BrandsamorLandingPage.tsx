import { useEffect, useRef, useState } from 'react';
import { Check, Star } from 'lucide-react';
import { motion } from 'framer-motion';

const STEP_NUMBER_GRADIENT = 'radial-gradient(circle at 75% 115%, #f8b6d3 0%, #dc79e8 24%, transparent 48%), radial-gradient(circle at 82% 30%, #5d37ee 0%, #8958ec 28%, transparent 55%), linear-gradient(115deg, #f3a5a8 0%, #d88bd3 38%, #9365ef 68%, #6142dd 100%)';

const ComingSoonLabel = ({ className = '', variant = 'light' }: { className?: string; variant?: 'light' | 'dark' }) => (
  <span
    className={`inline-flex items-center px-5 py-3 text-sm font-semibold uppercase tracking-wider rounded-lg ${
      variant === 'dark'
        ? 'bg-white/10 text-white/90 border border-white/20'
        : 'bg-[#E7DED2] text-[#2D302B]'
    } ${className}`}
  >
    Coming soon
  </span>
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
const growSmartSteps = [{
  num: '01',
  title: 'Start With Samples',
  desc: 'Begin with scent samples so you can compare options before committing to a full launch.'
}, {
  num: '02',
  title: 'Launch a Focused First Batch',
  desc: 'Start with one scent or a small set of scents instead of trying to build a large collection on day one.'
}, {
  num: '03',
  title: 'Learn From Customers',
  desc: 'Use early customer feedback, sales, gifting response, and repeat interest to understand what works.'
}, {
  num: '04',
  title: 'Add More Scents',
  desc: 'Expand only after you know which scent direction, product format, and packaging style customers respond to.'
}, {
  num: '05',
  title: 'Start With Samples Again',
  desc: 'Keep the cycle going by sampling new scent ideas before each new drop, seasonal launch, or product extension.'
}];
const fitCheckWorks = ['You already have a brand, store, audience, customer base, event, or sales channel.', 'You want to use perfume as a product, gift, retail add-on, merchandise item, event giveaway, or brand extension.', 'You want to start with samples, choose a scent, customize the look, and receive a ready-to-sell or ready-to-gift first batch.'];
const fitCheckHelps = ['A clear idea of who the perfume is for.', 'A rough quantity range for your first batch.', 'A preferred product type, such as a full-size perfume, travel spray, rollerball, gift set, or event fragrance.', 'Any logo, brand colors, label idea, bottle preference, or packaging direction you already have.'];
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

// Scandinavian editorial hero image — SVG line composition
const HeroBottleIllustration = () => <div className="w-full h-full flex items-center justify-center bg-[#F2EDE4] min-h-[250px] sm:min-h-[320px] md:min-h-[400px]">
  
    <svg viewBox="0 0 400 440" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[80%] max-w-[340px] h-auto mx-auto">
    
      {/* YOUR BRAND label text */}
      <text x="200" y="32" textAnchor="middle" fontFamily="Funnel Display, sans-serif" fontSize="11" letterSpacing="4" fill="#A8BBBF" fontWeight="600" style={{
      height: "125px"
    }}>YOUR BRAND</text>
      {/* Tall bottle */}
      <rect x="60" y="60" width="80" height="220" rx="8" stroke="#2D302B" strokeWidth="1.2" fill="none" />
      <rect x="88" y="46" width="24" height="18" rx="3" stroke="#2D302B" strokeWidth="1.2" fill="none" style={{
      width: "300px",
      maxWidth: "300px",
      height: "45px"
    }} />
      <rect x="94" y="38" width="12" height="12" rx="2" stroke="#2D302B" strokeWidth="1.2" fill="none" />
      <line x1="60" y1="120" x2="140" y2="120" stroke="#2D302B" strokeWidth="0.7" strokeDasharray="3 3" />
      <rect x="75" y="155" width="50" height="30" rx="2" stroke="#A8BBBF" strokeWidth="0.8" fill="none" />
      <text x="100" y="173" textAnchor="middle" fontFamily="Funnel Display, sans-serif" fontSize="7" fill="#A8BBBF" letterSpacing="2">BRANDSAMOR</text>
      {/* Rounded bottle */}
      <ellipse cx="230" cy="260" rx="50" ry="70" stroke="#2D302B" strokeWidth="1.2" fill="none" />
      <rect x="218" y="182" width="24" height="14" rx="3" stroke="#2D302B" strokeWidth="1.2" fill="none" />
      <rect x="224" y="172" width="12" height="14" rx="2" stroke="#2D302B" strokeWidth="1.2" fill="none" />
      <rect x="202" y="238" width="56" height="28" rx="2" stroke="#A8BBBF" strokeWidth="0.8" fill="none" />
      <text x="230" y="255" textAnchor="middle" fontFamily="Funnel Display, sans-serif" fontSize="7" fill="#A8BBBF" letterSpacing="2">BRANDSAMOR</text>
      {/* Travel spray */}
      <rect x="300" y="300" width="44" height="110" rx="6" stroke="#2D302B" strokeWidth="1.2" fill="none" />
      <rect x="312" y="288" width="20" height="16" rx="3" stroke="#2D302B" strokeWidth="1.2" fill="none" />
      <rect x="320" y="278" width="6" height="14" rx="1" stroke="#2D302B" strokeWidth="1.2" fill="none" />
      <line x1="300" y1="330" x2="344" y2="330" stroke="#2D302B" strokeWidth="0.7" strokeDasharray="3 3" />
      {/* Linen texture lines */}
      <line x1="0" y1="420" x2="400" y2="420" stroke="#D9D1C4" strokeWidth="0.6" />
      <line x1="0" y1="426" x2="400" y2="426" stroke="#D9D1C4" strokeWidth="0.4" />
      <line x1="0" y1="432" x2="400" y2="432" stroke="#D9D1C4" strokeWidth="0.3" />
    </svg>
  </div>;

// Marble single bottle illustration
const MarbleBottleIllustration = () => <div className="w-full h-full flex items-center justify-center" style={{
  background: '#F2EDE4',
  width: "250px",
  maxWidth: "250px",
  height: "250px"
}}>
  
    <svg viewBox="0 0 220 260" fill="none" xmlns="http://www.w3.org/2000/svg" style={{
    width: '70%',
    maxWidth: 180,
    height: 'auto'
  }}>
      {/* marble veins */}
      <path d="M0 80 Q60 60 110 90 Q160 120 220 100" stroke="#E0D8CE" strokeWidth="1" fill="none" />
      <path d="M0 140 Q80 120 140 150 Q180 165 220 145" stroke="#E0D8CE" strokeWidth="0.7" fill="none" />
      {/* bottle body */}
      <rect x="70" y="80" width="80" height="160" rx="8" stroke="#2D302B" strokeWidth="1.2" fill="none" />
      <rect x="90" y="62" width="40" height="22" rx="4" stroke="#2D302B" strokeWidth="1.2" fill="none" />
      <rect x="100" y="50" width="20" height="16" rx="2" stroke="#2D302B" strokeWidth="1.2" fill="none" />
      <line x1="70" y1="150" x2="150" y2="150" stroke="#A8BBBF" strokeWidth="0.8" strokeDasharray="4 3" />
      <rect x="83" y="170" width="54" height="26" rx="2" stroke="#A8BBBF" strokeWidth="0.8" fill="none" />
      <text x="110" y="185" textAnchor="middle" fontFamily="Funnel Display, sans-serif" fontSize="7" fill="#A8BBBF" letterSpacing="2">BRANDSAMOR</text>
    </svg>
  </div>;

// Packaging experience illustration
const PackagingIllustration = () => <div className="w-full h-full flex items-center justify-center" style={{
  background: '#F2EDE4'
}}>
  
    <svg viewBox="0 0 320 220" fill="none" xmlns="http://www.w3.org/2000/svg" style={{
    width: '85%',
    maxWidth: 280,
    height: 'auto'
  }}>
      {/* Open box */}
      <rect x="30" y="100" width="120" height="100" rx="4" stroke="#2D302B" strokeWidth="1.2" fill="none" />
      <path d="M30 100 L90 60 L210 60 L150 100Z" stroke="#2D302B" strokeWidth="1.2" fill="none" />
      <path d="M150 100 L210 60" stroke="#2D302B" strokeWidth="1.2" />
      {/* bottle in box */}
      <rect x="70" y="80" width="40" height="100" rx="4" stroke="#A8BBBF" strokeWidth="1" fill="none" />
      <rect x="82" y="70" width="16" height="14" rx="2" stroke="#A8BBBF" strokeWidth="1" fill="none" />
      {/* Gold cap */}
      <rect x="82" y="64" width="16" height="10" rx="2" stroke="#C9A96E" strokeWidth="1.2" fill="none" />
      {/* second bottle standalone */}
      <rect x="200" y="70" width="52" height="130" rx="6" stroke="#2D302B" strokeWidth="1.2" fill="none" />
      <rect x="214" y="54" width="24" height="18" rx="3" stroke="#2D302B" strokeWidth="1.2" fill="none" />
      <rect x="220" y="44" width="12" height="14" rx="2" stroke="#C9A96E" strokeWidth="1.4" fill="none" />
      <line x1="200" y1="130" x2="252" y2="130" stroke="#A8BBBF" strokeWidth="0.8" strokeDasharray="3 3" />
    </svg>
  </div>;

// Product options flat lay
const FlatLayIllustration = () => <div className="w-full h-full flex items-center justify-center" style={{
  background: '#F2EDE4'
}}>
  
    <svg viewBox="0 0 360 340" fill="none" xmlns="http://www.w3.org/2000/svg" style={{
    width: '85%',
    maxWidth: 300,
    height: 'auto'
  }}>
      {/* stone surface veins */}
      <path d="M0 160 Q90 140 180 165 Q260 185 360 155" stroke="#E0D8CE" strokeWidth="1" fill="none" />
      {/* cap */}
      <ellipse cx="80" cy="100" rx="30" ry="14" stroke="#2D302B" strokeWidth="1.2" fill="none" />
      <ellipse cx="80" cy="92" rx="30" ry="14" stroke="#2D302B" strokeWidth="1.2" fill="none" />
      <rect x="50" y="92" width="60" height="8" stroke="none" fill="#F2EDE4" />
      {/* box */}
      <rect x="200" y="60" width="120" height="90" rx="4" stroke="#2D302B" strokeWidth="1.2" fill="none" />
      <line x1="200" y1="80" x2="320" y2="80" stroke="#2D302B" strokeWidth="0.8" />
      <line x1="260" y1="60" x2="260" y2="150" stroke="#2D302B" strokeWidth="0.6" strokeDasharray="3 3" />
      <text x="260" y="115" textAnchor="middle" fontFamily="Funnel Display, sans-serif" fontSize="8" fill="#A8BBBF" letterSpacing="2">BRANDSAMOR</text>
      {/* bottle */}
      <rect x="120" y="140" width="70" height="170" rx="6" stroke="#2D302B" strokeWidth="1.2" fill="none" />
      <rect x="140" y="120" width="30" height="24" rx="4" stroke="#2D302B" strokeWidth="1.2" fill="none" />
      <rect x="148" y="108" width="14" height="16" rx="2" stroke="#C9A96E" strokeWidth="1.4" fill="none" />
      <line x1="120" y1="215" x2="190" y2="215" stroke="#A8BBBF" strokeWidth="0.8" strokeDasharray="3 3" />
      <rect x="133" y="230" width="44" height="22" rx="2" stroke="#A8BBBF" strokeWidth="0.8" fill="none" />
      <text x="155" y="244" textAnchor="middle" fontFamily="Funnel Display, sans-serif" fontSize="6.5" fill="#A8BBBF" letterSpacing="2">BRANDSAMOR</text>
    </svg>
  </div>;
export const BrandsamorLandingPage = () => {
  const {
    refs: stepRefs,
    activeIndex: activeStepIndex
  } = useActiveStep(howItWorksSteps.length);
  return <div className="min-h-screen bg-[#f9f7f2] font-sans text-[#2D302B] overflow-x-hidden">
      {/* Navigation Header */}
      <div className="w-full bg-[#f9f7f2]">
        <div className="w-full py-2 px-4 sm:px-6 flex flex-col sm:flex-row gap-1 sm:gap-0 justify-between items-center text-xs text-center sm:text-left text-[#77736E] border-b border-[#f1ece0]">
          <span>Call us at +1-848-220-1353</span>
          <span>We ship worldwide.</span>
        </div>
        <nav className="w-full py-4 sm:py-6 px-4 sm:px-6 md:px-12 flex flex-wrap justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="font-display text-[#A8BBBF] text-xl sm:text-2xl font-bold tracking-tight">Brandsamor</span>
            <span className="text-[#77736E] text-sm hidden sm:inline">Launch Studio</span>
          </div>
          <div className="hidden md:flex gap-8 text-sm">
            {['Home', 'All Perfume Bottles', 'Bottle Printing', 'Perfume Tops', 'Box for Perfumes', 'Labels', 'Gallery'].map(link => <a key={link} href="#" className="hover:text-[#A8BBBF] transition-colors">{link}</a>)}
          </div>
        </nav>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 pb-16 sm:pb-24">
        {/* SECTION 1 - HERO */}
        <section className="py-10 sm:py-16 md:py-24 grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="space-y-6 sm:space-y-8">
            <span className="inline-block px-3 py-1 bg-[#E7DED2] text-[#2D302B] text-xs font-semibold uppercase tracking-wider rounded-full">PRIVATE LABEL</span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl leading-tight text-[#2D302B]">Start Your Own Perfume Line</h1>
            <p className="text-[#2D302B] text-base sm:text-lg max-w-lg leading-relaxed">
              Launch a ready-to-sell fragrance product quickly and easily, with Brandsamor handling the scent, bottle, packaging, filling, and quality checks for you.
            </p>
            <ComingSoonLabel />
            <div className="flex flex-wrap items-center gap-4 pt-2 sm:pt-4">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map(i => <div key={i} className="w-8 h-8 rounded-full bg-[#E7DED2] border-2 border-[#f9f7f2] flex items-center justify-center text-xs font-medium text-[#77736E]">
                    {String.fromCharCode(64 + i)}
                  </div>)}
              </div>
              <div className="flex items-center gap-2 text-sm text-[#77736E]">
                <div className="flex text-[#A8BBBF]">
                  {[0, 1, 2, 3, 4].map(i => <Star key={i} size={14} fill="currentColor" />)}
                </div>
                <span>4.8</span>
                <span className="hidden sm:inline">Brandsamor customers trust Brandsamor</span>
              </div>
            </div>
          </div>
          <div className="relative rounded-xl overflow-hidden w-full max-w-lg mx-auto md:mx-0 h-64 sm:h-80 md:h-[400px]">
            
            <HeroBottleIllustration />
          </div>
        </section>

        {/* SECTION 2 - AUDIENCE TICKER */}
        <section className="py-8 sm:py-12 border-b border-[#f1ece0] overflow-hidden">
          
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
        </section>

        {/* SECTION 3 - HOW IT WORKS */}
        <section className="py-12 sm:py-24 grid md:grid-cols-2 gap-10 md:gap-16">
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
            {/* Mid-page CTA after How It Works */}
            <div className="pt-4">
              <ComingSoonLabel />
            </div>
          </div>
        </section>

        {/* SECTION 4 - PACKAGING EXPERIENCE */}
        <section className="py-12 sm:py-24 grid md:grid-cols-2 gap-10 md:gap-16 border-t border-[#f1ece0]">
          <div>
            <h4 className="text-[#A8BBBF] text-sm uppercase tracking-widest font-semibold mb-6 flex items-center gap-4">
              <span className="w-8 h-px bg-[#f1ece0]"></span> PACKAGING EXPERIENCE
            </h4>
            <h2 className="text-3xl sm:text-4xl mb-6">
              Built on Brandsamor's <span className="text-[#A8BBBF]">fragrance packaging</span> experience
            </h2>
            <p className="text-lg text-[#2D302B] mb-12">
              Brandsamor already works with brands that source perfume bottles, caps, sprays, and packaging. Brandsamor Private Label builds on that experience to help you launch a finished fragrance product more easily.
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

        {/* SECTION 5 - WHY SELL PERFUME */}
        <section className="py-12 sm:py-24 border-t border-[#f1ece0]">
          <h4 className="text-[#A8BBBF] text-sm uppercase tracking-widest font-semibold mb-6 flex items-center gap-4">
            <span className="w-8 h-px bg-[#f1ece0]"></span> WHY ADD PERFUME
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

          {/* Mid-page CTA after Why Sell */}
          <div className="mt-8 sm:mt-12 flex justify-center">
            <ComingSoonLabel />
          </div>
        </section>

        {/* SECTION 6 - TESTIMONIALS */}
        <section className="py-12 sm:py-24 border-t border-[#f1ece0]">
          <h4 className="text-[#A8BBBF] text-sm uppercase tracking-widest font-semibold mb-6 flex items-center gap-4">
            <span className="w-8 h-px bg-[#f1ece0]"></span> CUSTOMER VOICE
          </h4>
          <div className="flex flex-col md:flex-row justify-between items-start mb-8 sm:mb-12 gap-6 sm:gap-8">
            <h2 className="text-3xl sm:text-4xl max-w-sm">What Brandsamor Customers Say</h2>
            <p className="text-[#77736E] max-w-md">Brands already trust Brandsamor for the packaging pieces that make fragrance products look and feel retail-ready.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map(t => <div key={t.name} className="bg-[#FFFDFC] border border-[#f1ece0] rounded-[10px] p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-10 h-10 rounded-full bg-[#E7DED2] flex items-center justify-center text-[#2D302B] font-bold">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm">{t.name}</h4>
                    <p className="text-xs text-[#77736E]">Brandsamor customer, United States</p>
                  </div>
                </div>
                <p className="italic text-[#2D302B]">"{t.quote}"</p>
              </div>)}
          </div>
        </section>

        {/* SECTION 7 - WHY BRANDSAMOR PRIVATE LABEL */}
        <section className="py-12 sm:py-24 border-t border-[#f1ece0]">
          <h4 className="text-[#A8BBBF] text-sm uppercase tracking-widest font-semibold mb-6 flex items-center gap-4">
            <span className="w-8 h-px bg-[#f1ece0]"></span> WHY BRANDSAMOR PRIVATE LABEL
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

          {/* Mid-page CTA after Why Brandsamor */}
          <div className="mt-8 sm:mt-12 flex justify-center">
            <ComingSoonLabel />
          </div>
        </section>

        {/* SECTION 8 - COMPLIANCE */}
        <section className="py-12 sm:py-24 border-t border-[#f1ece0] grid md:grid-cols-3 gap-8 sm:gap-12">
          <div className="md:col-span-1">
            <h4 className="text-[#A8BBBF] text-sm uppercase tracking-widest font-semibold mb-6 flex items-center gap-4">
              <span className="w-8 h-px bg-[#f1ece0]"></span> COMPLIANCE SUPPORT
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
        </section>

        {/* SECTION 9 - PRODUCT OPTIONS */}
        <section className="py-12 sm:py-24 border-t border-[#f1ece0] grid md:grid-cols-2 gap-10 md:gap-16">
          <div>
            <h4 className="text-[#A8BBBF] text-sm uppercase tracking-widest font-semibold mb-6 flex items-center gap-4">
              <span className="w-8 h-px bg-[#f1ece0]"></span> PRODUCT OPTIONS
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
          </div>
        </section>

        {/* SECTION 10 - START SMALL GROW SMART */}
        <section className="py-12 sm:py-24 border-t border-[#f1ece0] grid md:grid-cols-2 gap-10 md:gap-16">
          <div>
            <h4 className="text-[#A8BBBF] text-sm uppercase tracking-widest font-semibold mb-6 flex items-center gap-4">
              <span className="w-8 h-px bg-[#f1ece0]"></span> START SMALL, GROW SMART
            </h4>
            <h2 className="text-3xl sm:text-4xl mb-8 sm:mb-12">Start Small. Learn Fast. Grow What Works.</h2>
            <div className="aspect-square bg-[#FFFDFC] border border-[#f1ece0] rounded-[10px] flex items-center justify-center p-6 sm:p-12">
              <div className="relative w-full max-w-[280px] aspect-square rounded-full border border-dashed border-[#A8BBBF] flex items-center justify-center">
                <div className="w-32 h-32 rounded-full bg-[#2D302B] text-white flex items-center justify-center text-center text-sm p-4 z-10">Keep improving the line</div>
                <div className="absolute top-0 -translate-y-1/2 w-8 h-8 rounded-full bg-[#A8BBBF] text-white flex items-center justify-center text-xs">1</div>
                <div className="absolute right-0 translate-x-1/2 w-8 h-8 rounded-full bg-[#A8BBBF] text-white flex items-center justify-center text-xs">2</div>
                <div className="absolute bottom-0 translate-y-1/2 w-8 h-8 rounded-full bg-[#A8BBBF] text-white flex items-center justify-center text-xs">3</div>
                <div className="absolute left-0 -translate-x-1/2 w-8 h-8 rounded-full bg-[#A8BBBF] text-white flex items-center justify-center text-xs">4</div>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-center space-y-10">
            <p className="text-[#77736E] mb-4">
              You do not need to launch a large fragrance collection on day one. Start with samples, launch a focused first batch, learn what customers respond to, and keep improving the line.
            </p>
            {growSmartSteps.map(step => <div key={step.num} className="flex gap-4 sm:gap-8 group">
                <div className="text-2xl sm:text-3xl font-display text-[#A8BBBF] font-light shrink-0">{step.num}</div>
                <div>
                  <h3 className="text-lg font-bold mb-2">{step.title}</h3>
                  <p className="text-[#77736E] text-sm">{step.desc}</p>
                </div>
              </div>)}
            <div className="border-l-2 border-[#A8BBBF] pl-6 py-2 mt-6">
              <p className="text-[#77736E] text-sm italic">The goal is to reduce guesswork. Start with a controlled launch, learn from the market, then expand with more confidence.</p>
            </div>
          </div>
        </section>

        {/* SECTION 11 - FIT CHECK */}
        <section className="py-12 sm:py-24 border-t border-[#f1ece0] grid md:grid-cols-2 gap-10 md:gap-16">
          <div>
            <h4 className="text-[#A8BBBF] text-sm uppercase tracking-widest font-semibold mb-6 flex items-center gap-4">
              <span className="w-8 h-px bg-[#f1ece0]"></span> FIT CHECK
            </h4>
            <h2 className="text-3xl sm:text-4xl mb-8 sm:mb-12">Is This Right for Your Brand?</h2>
            <div className="bg-[#FFFDFC] border border-[#f1ece0] rounded-[10px] p-8 sm:p-12 text-center min-h-[320px] sm:min-h-[400px] flex flex-col items-center justify-center">
              <div className="w-36 h-36 sm:w-48 sm:h-48 rounded-full border border-[#f1ece0] mx-auto flex items-center justify-center p-4 sm:p-6">
                <h3 className="text-xl sm:text-2xl font-display leading-tight text-[#A8BBBF]">A Clear<br />Starting<br />Point Helps</h3>
              </div>
              <p className="text-xs text-[#77736E] mt-6">You do not need every detail finalized. A clear audience, product idea, and rough quantity range are enough to begin.</p>
            </div>
          </div>
          <div className="flex flex-col justify-center">
            <p className="text-[#77736E] mb-12">
              Brandsamor Private Label is built for businesses that want to add a branded perfume product without getting stuck in sourcing, filling, packaging, and quality checks.
            </p>

            <div className="space-y-12">
              <div>
                <h3 className="text-xl sm:text-2xl font-display flex flex-wrap items-center gap-3 sm:gap-4 mb-6">
                  <span className="text-[#A8BBBF]">01</span> This Works Well If
                </h3>
                <ul className="space-y-4">
                  {fitCheckWorks.map(item => <li key={item} className="flex gap-3 text-[#2D302B] text-sm">
                      <Check className="text-[#A8BBBF] shrink-0" size={18} />
                      <span>{item}</span>
                    </li>)}
                </ul>
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-display flex flex-wrap items-center gap-3 sm:gap-4 mb-6">
                  <span className="text-[#A8BBBF]">02</span> What Helps Us Get Started
                </h3>
                <ul className="space-y-4">
                  {fitCheckHelps.map(item => <li key={item} className="flex gap-3 text-[#2D302B] text-sm">
                      <Check className="text-[#A8BBBF] shrink-0" size={18} />
                      <span>{item}</span>
                    </li>)}
                </ul>
              </div>
            </div>

            <div className="border-l-2 border-[#A8BBBF] pl-6 mt-12">
              <p className="text-[#77736E] text-sm italic">The more clearly we understand your audience, launch goal, and product direction, the easier it is to recommend the right scent, bottle, packaging, and first-batch setup.</p>
            </div>
          </div>
        </section>
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

      {/* FOOTER */}
      <footer className="bg-[#f9f7f2] py-12 sm:py-16 border-t border-[#f1ece0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 grid sm:grid-cols-2 md:grid-cols-4 gap-8 sm:gap-12 text-[#77736E] text-sm">
          <div className="space-y-6 sm:col-span-2 md:col-span-1">
            <div className="font-display text-[#A8BBBF] text-2xl font-bold tracking-tight">Brandsamor</div>
            <address className="not-italic space-y-2">
              <p>Wholesale Perfume Bottles</p>
              <p>11118 S Governors Ave, Dover Delaware<br />19904, U.S.A</p>
              <p>Contact: +1-848-220-1353</p>
            </address>
          </div>
          <div>
            <h4 className="font-bold text-[#2D302B] mb-6">Quick links</h4>
            <ul className="space-y-3">
              {['Home', 'About us', 'Perfumer Knowledge Hub', 'Send an enquiry', 'Reviews and Ratings', 'Custom Soap Boxes', 'Box for Perfumes', 'AI Fragrance Lab', 'Blog'].map(l => <li key={l}><a href="#" className="hover:text-[#A8BBBF]">{l}</a></li>)}
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-[#2D302B] mb-6">Perfume Bottle Families</h4>
            <ul className="space-y-3">
              {['Victor Perfume Bottles', 'Micron Perfume Bottles', 'Senso Perfume Bottles', 'Wim Perfume Bottles', '10ml Tall Sprays', 'Ombre Perfume Bottles', 'Reva Perfume Bottles'].map(l => <li key={l}><a href="#" className="hover:text-[#A8BBBF]">{l}</a></li>)}
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-[#2D302B] mb-6">Wholesale / Bulk</h4>
            <ul className="space-y-3">
              {['Refillable Perfume Bottles', 'Black Perfume Bottles', 'Gold Top Perfume Bottles', 'Silver Top Perfume Bottles', 'Square Perfume Bottles', 'Mini Fragrance Bottles'].map(l => <li key={l}><a href="#" className="hover:text-[#A8BBBF]">{l}</a></li>)}
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 mt-12 sm:mt-16 pt-8 border-t border-[#f1ece0] text-xs flex flex-col sm:flex-row gap-4 justify-between items-center text-[#77736E] text-center sm:text-left">
          <p>© 2025, Brandsamor Packaging.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-[#A8BBBF]">Privacy Policy</a>
            <a href="#" className="hover:text-[#A8BBBF]">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>;
};