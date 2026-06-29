import { Link } from 'react-router-dom';

export type BreadcrumbItem = {
  label: string;
  to?: string;
};

export const Breadcrumbs = ({
  items,
  variant = 'default',
  centered = false,
}: {
  items: BreadcrumbItem[];
  variant?: 'default' | 'hero';
  centered?: boolean;
}) => {
  const isHero = variant === 'hero';

  return (
    <nav aria-label="Breadcrumb" className="mb-4 sm:mb-6">
      <ol
        className={`flex flex-wrap items-center gap-x-2 gap-y-1 text-sm list-none m-0 p-0 ${
          centered ? 'justify-center' : ''
        } ${isHero ? 'text-white/80' : 'text-body'}`}
      >
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={`${item.label}-${index}`} className="flex items-center gap-2">
              {index > 0 && (
                <span aria-hidden="true" className={isHero ? 'text-white/60' : 'text-accent'}>
                  /
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
