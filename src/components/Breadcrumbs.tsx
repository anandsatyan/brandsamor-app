import { Link } from 'react-router-dom';

export type BreadcrumbItem = {
  label: string;
  to?: string;
};

export const Breadcrumbs = ({ items }: { items: BreadcrumbItem[] }) => (
  <nav aria-label="Breadcrumb" className="mb-4 sm:mb-6">
    <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-[#77736E] list-none m-0 p-0">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <li key={`${item.label}-${index}`} className="flex items-center gap-2">
            {index > 0 && (
              <span aria-hidden="true" className="text-[#A8BBBF]">
                /
              </span>
            )}
            {isLast || !item.to ? (
              <span className={isLast ? 'text-[#2D302B] font-medium' : undefined} aria-current={isLast ? 'page' : undefined}>
                {item.label}
              </span>
            ) : (
              <Link to={item.to} className="hover:text-[#2D302B] transition-colors">
                {item.label}
              </Link>
            )}
          </li>
        );
      })}
    </ol>
  </nav>
);
