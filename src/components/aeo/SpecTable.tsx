export type SpecFact = {
  label: string;
  value: string;
};

export const SpecTable = ({
  id = 'key-facts',
  title = 'Key facts',
  description,
  facts,
}: {
  id?: string;
  title?: string;
  description?: string;
  facts: SpecFact[];
}) => (
  <section id={id} className="py-10 sm:py-14 border-t border-border scroll-mt-28">
    <h2 className="type-h2-sm mb-3">{title}</h2>
    {description && <p className="type-body mb-6 max-w-3xl">{description}</p>}
    <dl className="grid sm:grid-cols-2 gap-px bg-border border border-border rounded-[2px] overflow-hidden">
      {facts.map((fact) => (
        <div key={fact.label} className="bg-surface px-5 py-4 sm:px-6 sm:py-5">
          <dt className="type-caption uppercase tracking-wider text-body/70 mb-2">{fact.label}</dt>
          <dd className="type-body font-medium text-heading">{fact.value}</dd>
        </div>
      ))}
    </dl>
  </section>
);
