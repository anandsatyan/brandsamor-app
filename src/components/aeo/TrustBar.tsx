import { BUSINESS_FACTS } from '../../seo/businessFacts';

export type TrustBadge = {
  label: string;
  detail?: string;
};

const DEFAULT_BADGES: TrustBadge[] = BUSINESS_FACTS.certifications.map((label) => ({ label }));

export const TrustBar = ({
  id = 'trust-bar',
  title = 'Documentation and standards support',
  description = 'Brandsamor can supply the certificates and production documentation your market and channel require.',
  badges = DEFAULT_BADGES,
}: {
  id?: string;
  title?: string;
  description?: string;
  badges?: TrustBadge[];
}) => {
  if (badges.length === 0) return null;

  return (
    <section id={id} className="py-10 sm:py-14 border-t border-border scroll-mt-28">
      <h2 className="type-h2-sm mb-3">{title}</h2>
      {description && <p className="type-body mb-6 max-w-3xl">{description}</p>}
      <ul className="flex flex-wrap gap-2">
        {badges.map((badge) => (
          <li
            key={badge.label}
            className="px-3 py-2 border border-border bg-secondary/40 type-caption font-semibold uppercase tracking-wider text-heading rounded-[2px]"
            title={badge.detail}
          >
            {badge.label}
          </li>
        ))}
      </ul>
    </section>
  );
};
