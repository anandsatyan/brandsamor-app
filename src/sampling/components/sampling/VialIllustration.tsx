interface VialIllustrationProps {
  index?: number;
  animate?: boolean;
  filled?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const sizes = { sm: 'h-12 w-5', md: 'h-16 w-6', lg: 'h-20 w-7' };

export const VialIllustration = ({
  index = 0,
  animate = false,
  filled = false,
  size = 'md',
}: VialIllustrationProps) => (
  <div
    className={[
      'relative flex flex-col items-center',
      animate ? 'animate-[vial-float_3s_ease-in-out_infinite]' : '',
    ].join(' ')}
    style={animate ? { animationDelay: `${index * 0.15}s` } : undefined}
  >
    <div
      className={[
        'rounded-t-full border-2 border-[#2B1809]/20 bg-gradient-to-b from-[#FFFDFC] to-[#EADFD3]/50',
        sizes[size],
        filled ? 'from-[#FF600A]/20 to-[#FF600A]/5' : '',
      ].join(' ')}
    >
      <div className="mx-auto mt-1 h-1.5 w-3 rounded-full bg-[#2B1809]/15" />
      {filled && (
        <div className="absolute bottom-2 left-1/2 h-[40%] w-[60%] -translate-x-1/2 rounded-b-sm bg-[#FF600A]/30" />
      )}
    </div>
    <div className="mt-0.5 h-1 w-2 rounded-sm bg-[#2B1809]/20" />
  </div>
);
