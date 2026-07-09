import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import type { FragranceProfile, Recommendation } from '../../types/sampling';

interface FragranceCardProps {
  profile: FragranceProfile;
  recommendation: Recommendation;
  index: number;
}

export const FragranceCard = ({ profile, recommendation, index }: FragranceCardProps) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.25 }}
      className="rounded-2xl border border-[#EADFD3] bg-[#FFFDFC] p-5"
    >
      <p className="type-eyebrow">
        Fragrance No. {profile.fragranceNumber}
      </p>
      <h3 className="mt-1 type-h3">{profile.customerName}</h3>
      <p className="mt-2 type-body-sm text-[#725F52]">{profile.description}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {profile.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-[#FEF7ED] px-3 py-1 text-xs font-semibold text-[#2B1809]"
          >
            {tag}
          </span>
        ))}
      </div>
      <p className="mt-4 text-sm italic text-[#725F52]">{recommendation.reason}</p>
      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-[#FF600A]"
        aria-expanded={expanded}
      >
        {expanded ? 'Show less' : 'Read more'}
        <ChevronDown
          className={['h-4 w-4 transition-transform', expanded ? 'rotate-180' : ''].join(' ')}
          aria-hidden
        />
      </button>
      {expanded && (
        <p className="mt-2 text-sm leading-relaxed text-[#725F52]">{profile.longDescription}</p>
      )}
    </motion.article>
  );
};
