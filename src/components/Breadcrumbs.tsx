import { Link } from 'react-router-dom';

export type BreadcrumbItem = {
  label: string;
  to?: string;
};

export const homeBreadcrumbs = (pageName: string): BreadcrumbItem[] => [
  { label: 'Home', to: '/' },
  { label: pageName },
];

export const Breadcrumbs = ({
  items,
  variant = 'default',
  centered = false,
  className = '',
}: {
  items: BreadcrumbItem[];
  variant?: 'default' | 'hero';
  centered?: boolean;
  className?: string;
}) => {
  const isHero = variant === 'hero';

  return (
    <nav aria-label="Breadcrumb" className={className || 'mb-4 sm:mb-6'}>
      <ol
        className={`flex flex-wrap items-center gap-x-2 gap-y-1 text-sm list-none m-0 p-0 ${
          centered ? 'justify-center' : ''
        } ${isHero ? 'text-white/80' : 'text-body'}`}
      >
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={`${item.label}-${index}`} className="inline-flex items-center gap-2">
              {index > 0 && (
                <span
                  aria-hidden="true"
                  className={`select-none ${isHero ? 'text-white/60' : 'text-body/50'}`}
                >
                  &gt;
                </span>
              )}
              {isLast || !item.to ? (
                <span
                  className={isLast ? (isHero ? 'text-white font-medium' : 'text-heading font-medium') : undefined}
                  aria-current={isLast ? 'page' : undefined}
                >
                  {item.label}
                </span>
              ) : (
                <Link
                  to={item.to}
                  className={isHero ? 'text-white hover:text-white/80' : 'text-accent hover:opacity-80'}
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
