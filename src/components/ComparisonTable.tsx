export type ComparisonColumn = {
  key: string;
  label: string;
};

export type ComparisonRow = {
  label: string;
  values: Record<string, string>;
};

export const ComparisonTable = ({
  id,
  title,
  description,
  columns,
  rows,
  caption,
}: {
  id?: string;
  title: string;
  description?: string;
  columns: ComparisonColumn[];
  rows: ComparisonRow[];
  caption?: string;
}) => (
  <section id={id} className="py-10 sm:py-14 border-t border-border scroll-mt-28">
    <h2 className="type-h2-sm mb-3">{title}</h2>
    {description && <p className="type-body mb-6 max-w-3xl">{description}</p>}

    <div className="overflow-x-auto -mx-4 sm:mx-0">
      <table className="w-full min-w-[640px] border-collapse type-body-sm">
        <caption className="sr-only">{caption ?? title}</caption>
        <thead>
          <tr className="border-b border-border">
            <th
              scope="col"
              className="text-left py-3 px-4 font-semibold text-heading bg-secondary/60 rounded-tl-lg"
            >
              Compare
            </th>
            {columns.map((column, index) => (
              <th
                key={column.key}
                scope="col"
                className={`text-left py-3 px-4 font-semibold text-heading bg-secondary/60 ${
                  index === columns.length - 1 ? 'rounded-tr-lg' : ''
                }`}
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr
              key={row.label}
              className={`border-b border-border ${rowIndex % 2 === 0 ? 'bg-surface' : 'bg-secondary/30'}`}
            >
              <th scope="row" className="text-left py-3 px-4 font-medium text-heading align-top w-[28%]">
                {row.label}
              </th>
              {columns.map((column) => (
                <td key={column.key} className="py-3 px-4 text-body align-top leading-relaxed">
                  {row.values[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </section>
);
