import { Link } from 'react-router-dom';

export type RelatedLink = {
  to: string;
  label: string;
};

export const RelatedLinksSection = ({
  title = 'Related topics',
  links,
}: {
  title?: string;
  links: RelatedLink[];
}) => {
  if (links.length === 0) {
    return null;
  }

  return (
    <section className="py-10 sm:py-12 border-t border-[#f1ece0]">
      <h2 className="text-xl sm:text-2xl font-display mb-4">{title}</h2>
      <ul className="space-y-3">
        {links.map((link) => (
          <li key={link.to}>
            <Link
              to={link.to}
              className="text-[#2D302B] font-medium underline decoration-[#A8BBBF] underline-offset-4 hover:text-[#A8BBBF] transition-colors"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};
