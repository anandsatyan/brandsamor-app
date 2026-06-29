import { Breadcrumbs, type BreadcrumbItem } from './Breadcrumbs';

export const PageBreadcrumbBar = ({
  items,
  width = 'default',
}: {
  items: BreadcrumbItem[];
  width?: 'default' | 'narrow' | 'medium';
}) => {
  const widthClass =
    width === 'narrow' ? 'max-w-3xl' : width === 'medium' ? 'max-w-5xl' : 'max-w-7xl';

  return (
    <div className="border-b border-border bg-secondary/50">
      <div className={`${widthClass} mx-auto px-4 sm:px-6 md:px-12 py-4`}>
        <Breadcrumbs items={items} className="mb-0" />
      </div>
    </div>
  );
};
