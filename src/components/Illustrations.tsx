import type { ReactNode } from 'react';

type IllustrationFrameProps = {
  children: ReactNode;
  className?: string;
  minHeight?: string;
};

const IllustrationFrame = ({
  children,
  className = '',
  minHeight = 'min-h-[220px] sm:min-h-[280px]',
}: IllustrationFrameProps) => (
  <div
    className={`w-full h-full flex items-center justify-center bg-[#F2EDE4] rounded-xl overflow-hidden ${minHeight} ${className}`}
  >
    {children}
  </div>
);

export const HeroBottleIllustration = () => (
  <IllustrationFrame minHeight="min-h-[250px] sm:min-h-[320px] md:min-h-[400px]">
    <svg
      viewBox="0 0 400 440"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-[80%] max-w-[340px] h-auto mx-auto"
    >
      <text
        x="200"
        y="32"
        textAnchor="middle"
        fontFamily="Funnel Display Variable, sans-serif"
        fontSize="11"
        letterSpacing="4"
        fill="#A8BBBF"
        fontWeight="600"
      >
        YOUR BRAND
      </text>
      <rect x="60" y="60" width="80" height="220" rx="8" stroke="#2D302B" strokeWidth="1.2" fill="none" />
      <rect x="88" y="46" width="24" height="18" rx="3" stroke="#2D302B" strokeWidth="1.2" fill="none" />
      <rect x="94" y="38" width="12" height="12" rx="2" stroke="#2D302B" strokeWidth="1.2" fill="none" />
      <line x1="60" y1="120" x2="140" y2="120" stroke="#2D302B" strokeWidth="0.7" strokeDasharray="3 3" />
      <rect x="75" y="155" width="50" height="30" rx="2" stroke="#A8BBBF" strokeWidth="0.8" fill="none" />
      <text
        x="100"
        y="173"
        textAnchor="middle"
        fontFamily="Funnel Display Variable, sans-serif"
        fontSize="7"
        fill="#A8BBBF"
        letterSpacing="2"
      >
        BRANDSAMOR
      </text>
      <ellipse cx="230" cy="260" rx="50" ry="70" stroke="#2D302B" strokeWidth="1.2" fill="none" />
      <rect x="218" y="182" width="24" height="14" rx="3" stroke="#2D302B" strokeWidth="1.2" fill="none" />
      <rect x="224" y="172" width="12" height="14" rx="2" stroke="#2D302B" strokeWidth="1.2" fill="none" />
      <rect x="202" y="238" width="56" height="28" rx="2" stroke="#A8BBBF" strokeWidth="0.8" fill="none" />
      <text
        x="230"
        y="255"
        textAnchor="middle"
        fontFamily="Funnel Display Variable, sans-serif"
        fontSize="7"
        fill="#A8BBBF"
        letterSpacing="2"
      >
        BRANDSAMOR
      </text>
      <rect x="300" y="300" width="44" height="110" rx="6" stroke="#2D302B" strokeWidth="1.2" fill="none" />
      <rect x="312" y="288" width="20" height="16" rx="3" stroke="#2D302B" strokeWidth="1.2" fill="none" />
      <rect x="320" y="278" width="6" height="14" rx="1" stroke="#2D302B" strokeWidth="1.2" fill="none" />
      <line x1="300" y1="330" x2="344" y2="330" stroke="#2D302B" strokeWidth="0.7" strokeDasharray="3 3" />
      <line x1="0" y1="420" x2="400" y2="420" stroke="#D9D1C4" strokeWidth="0.6" />
      <line x1="0" y1="426" x2="400" y2="426" stroke="#D9D1C4" strokeWidth="0.4" />
      <line x1="0" y1="432" x2="400" y2="432" stroke="#D9D1C4" strokeWidth="0.3" />
    </svg>
  </IllustrationFrame>
);

export const MarbleBottleIllustration = () => (
  <IllustrationFrame className="w-[250px] max-w-[250px] h-[250px]">
    <svg viewBox="0 0 220 260" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[70%] max-w-[180px] h-auto">
      <path d="M0 80 Q60 60 110 90 Q160 120 220 100" stroke="#E0D8CE" strokeWidth="1" fill="none" />
      <path d="M0 140 Q80 120 140 150 Q180 165 220 145" stroke="#E0D8CE" strokeWidth="0.7" fill="none" />
      <rect x="70" y="80" width="80" height="160" rx="8" stroke="#2D302B" strokeWidth="1.2" fill="none" />
      <rect x="90" y="62" width="40" height="22" rx="4" stroke="#2D302B" strokeWidth="1.2" fill="none" />
      <rect x="100" y="50" width="20" height="16" rx="2" stroke="#2D302B" strokeWidth="1.2" fill="none" />
      <line x1="70" y1="150" x2="150" y2="150" stroke="#A8BBBF" strokeWidth="0.8" strokeDasharray="4 3" />
      <rect x="83" y="170" width="54" height="26" rx="2" stroke="#A8BBBF" strokeWidth="0.8" fill="none" />
      <text
        x="110"
        y="185"
        textAnchor="middle"
        fontFamily="Funnel Display Variable, sans-serif"
        fontSize="7"
        fill="#A8BBBF"
        letterSpacing="2"
      >
        BRANDSAMOR
      </text>
    </svg>
  </IllustrationFrame>
);

export const PackagingIllustration = () => (
  <IllustrationFrame>
    <svg viewBox="0 0 320 220" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[85%] max-w-[280px] h-auto">
      <rect x="30" y="100" width="120" height="100" rx="4" stroke="#2D302B" strokeWidth="1.2" fill="none" />
      <path d="M30 100 L90 60 L210 60 L150 100Z" stroke="#2D302B" strokeWidth="1.2" fill="none" />
      <path d="M150 100 L210 60" stroke="#2D302B" strokeWidth="1.2" />
      <rect x="70" y="80" width="40" height="100" rx="4" stroke="#A8BBBF" strokeWidth="1" fill="none" />
      <rect x="82" y="70" width="16" height="14" rx="2" stroke="#A8BBBF" strokeWidth="1" fill="none" />
      <rect x="82" y="64" width="16" height="10" rx="2" stroke="#C9A96E" strokeWidth="1.2" fill="none" />
      <rect x="200" y="70" width="52" height="130" rx="6" stroke="#2D302B" strokeWidth="1.2" fill="none" />
      <rect x="214" y="54" width="24" height="18" rx="3" stroke="#2D302B" strokeWidth="1.2" fill="none" />
      <rect x="220" y="44" width="12" height="14" rx="2" stroke="#C9A96E" strokeWidth="1.4" fill="none" />
      <line x1="200" y1="130" x2="252" y2="130" stroke="#A8BBBF" strokeWidth="0.8" strokeDasharray="3 3" />
    </svg>
  </IllustrationFrame>
);

export const FlatLayIllustration = () => (
  <IllustrationFrame>
    <svg viewBox="0 0 360 340" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[85%] max-w-[300px] h-auto">
      <path d="M0 160 Q90 140 180 165 Q260 185 360 155" stroke="#E0D8CE" strokeWidth="1" fill="none" />
      <ellipse cx="80" cy="100" rx="30" ry="14" stroke="#2D302B" strokeWidth="1.2" fill="none" />
      <ellipse cx="80" cy="92" rx="30" ry="14" stroke="#2D302B" strokeWidth="1.2" fill="none" />
      <rect x="50" y="92" width="60" height="8" stroke="none" fill="#F2EDE4" />
      <rect x="200" y="60" width="120" height="90" rx="4" stroke="#2D302B" strokeWidth="1.2" fill="none" />
      <line x1="200" y1="80" x2="320" y2="80" stroke="#2D302B" strokeWidth="0.8" />
      <line x1="260" y1="60" x2="260" y2="150" stroke="#2D302B" strokeWidth="0.6" strokeDasharray="3 3" />
      <text
        x="260"
        y="115"
        textAnchor="middle"
        fontFamily="Funnel Display Variable, sans-serif"
        fontSize="8"
        fill="#A8BBBF"
        letterSpacing="2"
      >
        BRANDSAMOR
      </text>
      <rect x="120" y="140" width="70" height="170" rx="6" stroke="#2D302B" strokeWidth="1.2" fill="none" />
      <rect x="140" y="120" width="30" height="24" rx="4" stroke="#2D302B" strokeWidth="1.2" fill="none" />
      <rect x="148" y="108" width="14" height="16" rx="2" stroke="#C9A96E" strokeWidth="1.4" fill="none" />
      <line x1="120" y1="215" x2="190" y2="215" stroke="#A8BBBF" strokeWidth="0.8" strokeDasharray="3 3" />
      <rect x="133" y="230" width="44" height="22" rx="2" stroke="#A8BBBF" strokeWidth="0.8" fill="none" />
      <text
        x="155"
        y="244"
        textAnchor="middle"
        fontFamily="Funnel Display Variable, sans-serif"
        fontSize="6.5"
        fill="#A8BBBF"
        letterSpacing="2"
      >
        BRANDSAMOR
      </text>
    </svg>
  </IllustrationFrame>
);

export const ProcessTimelineIllustration = () => (
  <IllustrationFrame minHeight="min-h-[280px] sm:min-h-[360px]">
    <svg viewBox="0 0 360 320" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[85%] max-w-[320px] h-auto">
      <path d="M40 160 H320" stroke="#E7DED2" strokeWidth="2" />
      {[40, 110, 180, 250, 320].map((x, i) => (
        <g key={x}>
          <circle cx={x} cy="160" r="14" stroke="#A8BBBF" strokeWidth="1.2" fill="#FFFDFC" />
          <text
            x={x}
            y="165"
            textAnchor="middle"
            fontFamily="Funnel Display Variable, sans-serif"
            fontSize="9"
            fill="#2D302B"
          >
            {`0${i + 1}`}
          </text>
        </g>
      ))}
      <rect x="28" y="200" width="24" height="70" rx="4" stroke="#2D302B" strokeWidth="1" fill="none" />
      <rect x="98" y="210" width="24" height="60" rx="4" stroke="#2D302B" strokeWidth="1" fill="none" />
      <rect x="168" y="195" width="24" height="75" rx="4" stroke="#A8BBBF" strokeWidth="1" fill="none" />
      <rect x="238" y="205" width="24" height="65" rx="4" stroke="#2D302B" strokeWidth="1" fill="none" />
      <rect x="296" y="88" width="48" height="36" rx="3" stroke="#2D302B" strokeWidth="1" fill="none" />
      <path d="M296 100 H344 M320 88 V124" stroke="#2D302B" strokeWidth="0.8" />
      <text
        x="180"
        y="48"
        textAnchor="middle"
        fontFamily="Funnel Display Variable, sans-serif"
        fontSize="10"
        letterSpacing="3"
        fill="#A8BBBF"
      >
        SAMPLE TO SHIP
      </text>
    </svg>
  </IllustrationFrame>
);

export const BrandBriefIllustration = () => (
  <IllustrationFrame>
    <svg viewBox="0 0 280 240" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[80%] max-w-[240px] h-auto">
      <rect x="40" y="30" width="200" height="180" rx="8" stroke="#2D302B" strokeWidth="1.2" fill="#FFFDFC" />
      <line x1="70" y1="70" x2="210" y2="70" stroke="#E7DED2" strokeWidth="8" strokeLinecap="round" />
      <line x1="70" y1="100" x2="190" y2="100" stroke="#E7DED2" strokeWidth="8" strokeLinecap="round" />
      <line x1="70" y1="130" x2="170" y2="130" stroke="#E7DED2" strokeWidth="8" strokeLinecap="round" />
      <rect x="70" y="155" width="60" height="36" rx="4" stroke="#A8BBBF" strokeWidth="1" fill="none" />
      <circle cx="200" cy="173" r="18" stroke="#C9A96E" strokeWidth="1.2" fill="none" />
      <path d="M192 173 L198 179 L210 165" stroke="#A8BBBF" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  </IllustrationFrame>
);

export const ScentSamplesIllustration = () => (
  <IllustrationFrame>
    <svg viewBox="0 0 300 240" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[85%] max-w-[260px] h-auto">
      {[0, 1, 2, 3, 4].map((i) => (
        <g key={i} transform={`translate(${40 + i * 44}, ${60 + (i % 2) * 12})`}>
          <rect x="0" y="20" width="28" height="100" rx="4" stroke="#2D302B" strokeWidth="1.1" fill="none" />
          <rect x="8" y="8" width="12" height="16" rx="2" stroke="#2D302B" strokeWidth="1" fill="none" />
          <line x1="4" y1="70" x2="24" y2="70" stroke="#A8BBBF" strokeWidth="0.7" strokeDasharray="2 2" />
        </g>
      ))}
      <text
        x="150"
        y="210"
        textAnchor="middle"
        fontFamily="Funnel Display Variable, sans-serif"
        fontSize="9"
        letterSpacing="3"
        fill="#A8BBBF"
      >
        SCENT LIBRARY
      </text>
    </svg>
  </IllustrationFrame>
);

export const ApprovalIllustration = () => (
  <IllustrationFrame>
    <svg viewBox="0 0 240 260" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[70%] max-w-[180px] h-auto">
      <rect x="70" y="60" width="80" height="160" rx="8" stroke="#2D302B" strokeWidth="1.2" fill="none" />
      <rect x="90" y="42" width="40" height="22" rx="4" stroke="#2D302B" strokeWidth="1.2" fill="none" />
      <rect x="100" y="30" width="20" height="16" rx="2" stroke="#C9A96E" strokeWidth="1.2" fill="none" />
      <rect x="83" y="150" width="54" height="26" rx="2" stroke="#A8BBBF" strokeWidth="0.8" fill="none" />
      <circle cx="180" cy="180" r="28" stroke="#A8BBBF" strokeWidth="1.2" fill="#FFFDFC" />
      <path d="M168 180 L176 188 L194 168" stroke="#2D302B" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  </IllustrationFrame>
);

export const ProductionIllustration = () => (
  <IllustrationFrame>
    <svg viewBox="0 0 320 220" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[85%] max-w-[280px] h-auto">
      <rect x="20" y="40" width="280" height="140" rx="6" stroke="#2D302B" strokeWidth="1.2" fill="none" />
      <rect x="50" y="80" width="36" height="70" rx="4" stroke="#A8BBBF" strokeWidth="1" fill="none" />
      <rect x="110" y="80" width="36" height="70" rx="4" stroke="#A8BBBF" strokeWidth="1" fill="none" />
      <rect x="170" y="80" width="36" height="70" rx="4" stroke="#A8BBBF" strokeWidth="1" fill="none" />
      <path d="M230 90 V150" stroke="#2D302B" strokeWidth="1.2" />
      <path d="M230 90 L260 110 L230 130" stroke="#2D302B" strokeWidth="1" fill="none" />
      <ellipse cx="280" cy="110" rx="16" ry="24" stroke="#C9A96E" strokeWidth="1.2" fill="none" />
      <line x1="50" y1="60" x2="270" y2="60" stroke="#E7DED2" strokeWidth="6" strokeLinecap="round" />
    </svg>
  </IllustrationFrame>
);

export const QualityCheckIllustration = () => (
  <IllustrationFrame>
    <svg viewBox="0 0 280 240" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[80%] max-w-[240px] h-auto">
      <rect x="50" y="40" width="180" height="160" rx="8" stroke="#2D302B" strokeWidth="1.2" fill="#FFFDFC" />
      {['Fill level', 'Spray test', 'Label align', 'Batch record'].map((label, i) => (
        <g key={label}>
          <rect x="70" y={65 + i * 32} width="16" height="16" rx="2" stroke="#A8BBBF" strokeWidth="1" fill="none" />
          <path d={`M73 ${73 + i * 32} L76 ${76 + i * 32} L82 ${70 + i * 32}`} stroke="#2D302B" strokeWidth="1.2" />
          <text x="96" y={77 + i * 32} fontFamily="Funnel Sans Variable, sans-serif" fontSize="11" fill="#77736E">
            {label}
          </text>
        </g>
      ))}
    </svg>
  </IllustrationFrame>
);

export const DeliveryIllustration = () => (
  <IllustrationFrame>
    <svg viewBox="0 0 320 220" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[85%] max-w-[280px] h-auto">
      <rect x="40" y="80" width="100" height="80" rx="4" stroke="#2D302B" strokeWidth="1.2" fill="none" />
      <path d="M40 80 L90 50 L190 50 L140 80Z" stroke="#2D302B" strokeWidth="1.2" fill="none" />
      <rect x="150" y="90" width="130" height="70" rx="4" stroke="#2D302B" strokeWidth="1.2" fill="none" />
      <circle cx="180" cy="170" r="16" stroke="#2D302B" strokeWidth="1.2" fill="none" />
      <circle cx="250" cy="170" r="16" stroke="#2D302B" strokeWidth="1.2" fill="none" />
      <rect x="70" y="110" width="40" height="30" rx="2" stroke="#A8BBBF" strokeWidth="0.8" fill="none" />
      <text
        x="215"
        y="125"
        textAnchor="middle"
        fontFamily="Funnel Display Variable, sans-serif"
        fontSize="8"
        letterSpacing="2"
        fill="#A8BBBF"
      >
        READY
      </text>
    </svg>
  </IllustrationFrame>
);

export const RepeatOrderIllustration = () => (
  <IllustrationFrame>
    <svg viewBox="0 0 280 240" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[80%] max-w-[240px] h-auto">
      <path
        d="M140 40 A80 80 0 1 1 60 120"
        stroke="#A8BBBF"
        strokeWidth="1.2"
        fill="none"
        strokeDasharray="4 4"
      />
      <path d="M56 120 L48 104 M56 120 L72 112" stroke="#A8BBBF" strokeWidth="1.2" />
      <rect x="118" y="100" width="44" height="100" rx="6" stroke="#2D302B" strokeWidth="1.2" fill="none" />
      <rect x="130" y="82" width="20" height="22" rx="3" stroke="#2D302B" strokeWidth="1.2" fill="none" />
      <rect x="136" y="70" width="10" height="14" rx="2" stroke="#C9A96E" strokeWidth="1.2" fill="none" />
      <text
        x="140"
        y="210"
        textAnchor="middle"
        fontFamily="Funnel Display Variable, sans-serif"
        fontSize="9"
        letterSpacing="2"
        fill="#A8BBBF"
      >
        REORDER
      </text>
    </svg>
  </IllustrationFrame>
);

export const GiftSetIllustration = () => (
  <IllustrationFrame>
    <svg viewBox="0 0 300 240" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[85%] max-w-[260px] h-auto">
      <rect x="60" y="80" width="180" height="120" rx="6" stroke="#2D302B" strokeWidth="1.2" fill="none" />
      <rect x="90" y="50" width="30" height="80" rx="4" stroke="#A8BBBF" strokeWidth="1" fill="none" />
      <rect x="135" y="55" width="30" height="75" rx="4" stroke="#A8BBBF" strokeWidth="1" fill="none" />
      <rect x="180" y="60" width="24" height="70" rx="4" stroke="#A8BBBF" strokeWidth="1" fill="none" />
      <line x1="60" y1="110" x2="240" y2="110" stroke="#E7DED2" strokeWidth="1" />
      <text x="150" y="145" textAnchor="middle" fontFamily="Funnel Display Variable, sans-serif" fontSize="8" letterSpacing="2" fill="#A8BBBF">GIFT SET</text>
    </svg>
  </IllustrationFrame>
);

export const BodyMistIllustration = () => (
  <IllustrationFrame>
    <svg viewBox="0 0 200 260" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[70%] max-w-[160px] h-auto">
      <rect x="60" y="70" width="80" height="160" rx="20" stroke="#2D302B" strokeWidth="1.2" fill="none" />
      <rect x="85" y="50" width="30" height="24" rx="4" stroke="#2D302B" strokeWidth="1.2" fill="none" />
      <rect x="95" y="38" width="10" height="16" rx="2" stroke="#C9A96E" strokeWidth="1.2" fill="none" />
      <line x1="60" y1="140" x2="140" y2="140" stroke="#A8BBBF" strokeWidth="0.8" strokeDasharray="3 3" />
    </svg>
  </IllustrationFrame>
);

export const RoomSprayIllustration = () => (
  <IllustrationFrame>
    <svg viewBox="0 0 240 260" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[75%] max-w-[180px] h-auto">
      <rect x="70" y="90" width="100" height="140" rx="8" stroke="#2D302B" strokeWidth="1.2" fill="none" />
      <rect x="100" y="70" width="40" height="24" rx="4" stroke="#2D302B" strokeWidth="1.2" fill="none" />
      <path d="M120 70 V50 M110 50 H130" stroke="#2D302B" strokeWidth="1.2" />
      <circle cx="120" cy="160" r="20" stroke="#A8BBBF" strokeWidth="0.8" fill="none" />
    </svg>
  </IllustrationFrame>
);

export const LabelIllustration = () => (
  <IllustrationFrame>
    <svg viewBox="0 0 280 240" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[80%] max-w-[240px] h-auto">
      <rect x="80" y="60" width="50" height="140" rx="4" stroke="#2D302B" strokeWidth="1.1" fill="none" />
      <rect x="88" y="120" width="34" height="40" rx="2" stroke="#A8BBBF" strokeWidth="1" fill="none" />
      <text x="105" y="142" textAnchor="middle" fontFamily="Funnel Display Variable, sans-serif" fontSize="6" fill="#A8BBBF" letterSpacing="1">LOGO</text>
      <rect x="160" y="80" width="80" height="100" rx="4" stroke="#2D302B" strokeWidth="1.1" fill="#FFFDFC" />
      <line x1="170" y1="100" x2="230" y2="100" stroke="#E7DED2" strokeWidth="6" strokeLinecap="round" />
      <line x1="170" y1="120" x2="210" y2="120" stroke="#E7DED2" strokeWidth="6" strokeLinecap="round" />
      <line x1="170" y1="140" x2="220" y2="140" stroke="#E7DED2" strokeWidth="6" strokeLinecap="round" />
    </svg>
  </IllustrationFrame>
);

export const RigidBoxIllustration = () => (
  <IllustrationFrame>
    <svg viewBox="0 0 280 220" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[85%] max-w-[240px] h-auto">
      <rect x="60" y="60" width="160" height="120" rx="4" stroke="#2D302B" strokeWidth="1.2" fill="none" />
      <line x1="60" y1="60" x2="140" y2="20" stroke="#2D302B" strokeWidth="1.2" />
      <line x1="220" y1="60" x2="140" y2="20" stroke="#2D302B" strokeWidth="1.2" />
      <line x1="140" y1="20" x2="140" y2="60" stroke="#2D302B" strokeWidth="1.2" />
      <rect x="110" y="100" width="60" height="50" rx="2" stroke="#A8BBBF" strokeWidth="0.8" fill="none" />
    </svg>
  </IllustrationFrame>
);

export const ComplianceDocIllustration = () => (
  <IllustrationFrame>
    <svg viewBox="0 0 280 240" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[80%] max-w-[240px] h-auto">
      <rect x="50" y="30" width="180" height="180" rx="8" stroke="#2D302B" strokeWidth="1.2" fill="#FFFDFC" />
      <text x="140" y="60" textAnchor="middle" fontFamily="Funnel Display Variable, sans-serif" fontSize="10" letterSpacing="2" fill="#A8BBBF">COA / IFRA</text>
      {['Batch', 'Formula', 'Allergens', 'GMP'].map((label, i) => (
        <g key={label}>
          <rect x="70" y={80 + i * 28} width="140" height="18" rx="2" stroke="#E7DED2" strokeWidth="1" fill="none" />
          <text x="80" y={93 + i * 28} fontFamily="Funnel Sans Variable, sans-serif" fontSize="9" fill="#77736E">{label}</text>
        </g>
      ))}
    </svg>
  </IllustrationFrame>
);

export const FragranceFamilyIllustration = () => (
  <IllustrationFrame>
    <svg viewBox="0 0 320 220" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[85%] max-w-[280px] h-auto">
      {['Floral', 'Woody', 'Fresh', 'Oriental'].map((family, i) => (
        <g key={family}>
          <circle cx={70 + i * 70} cy="110" r="36" stroke="#A8BBBF" strokeWidth="1" fill="none" />
          <text x={70 + i * 70} y="115" textAnchor="middle" fontFamily="Funnel Sans Variable, sans-serif" fontSize="8" fill="#77736E">{family}</text>
        </g>
      ))}
    </svg>
  </IllustrationFrame>
);

export const LaunchPlanningIllustration = () => (
  <IllustrationFrame minHeight="min-h-[280px] sm:min-h-[320px]">
    <svg viewBox="0 0 360 280" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[85%] max-w-[300px] h-auto">
      <circle cx="180" cy="140" r="80" stroke="#E7DED2" strokeWidth="1.5" fill="none" />
      <circle cx="180" cy="140" r="40" stroke="#A8BBBF" strokeWidth="1.2" fill="none" />
      <text x="180" y="145" textAnchor="middle" fontFamily="Funnel Display Variable, sans-serif" fontSize="10" fill="#2D302B">LAUNCH</text>
      {['Scent', 'Format', 'Price', 'Pack'].map((label, i) => {
        const angle = (i * 90 - 90) * (Math.PI / 180);
        const x = 180 + Math.cos(angle) * 110;
        const y = 140 + Math.sin(angle) * 110;
        return (
          <g key={label}>
            <circle cx={x} cy={y} r="22" stroke="#2D302B" strokeWidth="1" fill="#FFFDFC" />
            <text x={x} y={y + 4} textAnchor="middle" fontFamily="Funnel Sans Variable, sans-serif" fontSize="8" fill="#77736E">{label}</text>
          </g>
        );
      })}
    </svg>
  </IllustrationFrame>
);
