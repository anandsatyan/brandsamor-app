import { Link } from 'react-router-dom';
import { trackPackamorTrustLink } from '../../analytics/siteAnalytics';

export type RelatedLink = {
  to: string;
  label: string;
  external?: boolean;
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
    <section className="py-10 sm:py-12 border-t border-border">
      <h2 className="text-xl sm:text-2xl font-display mb-4">{title}</h2>
      <ul className="space-y-3">
        {links.map((link) => (
          <li key={link.to}>
            {link.external || link.to.startsWith('http') ? (
              <a
                href={link.to}
                className="text-accent font-medium underline decoration-accent underline-offset-4 hover:opacity-80"
                rel="noopener noreferrer"
                onClick={() => trackPackamorTrustLink(link.label, link.to)}
              >
                {link.label}
              </a>
            ) : (
              <Link
                to={link.to}
                className="text-accent font-medium underline decoration-accent underline-offset-4 hover:opacity-80"
              >
                {link.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
};
