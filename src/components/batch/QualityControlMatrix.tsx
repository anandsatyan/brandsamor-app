import { qualityControlMatrix } from '../../content/batchProcess';

export const QualityControlMatrix = () => (
  <section id="quality-matrix" className="py-phi-5 sm:py-phi-6 border-t border-border">
    <h2 className="type-h2 mb-phi-4">Quality-Control Matrix</h2>

    <div className="hidden md:block overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-border">
            <th scope="col" className="type-caption font-semibold uppercase tracking-wider text-heading py-phi-2 pr-phi-3">
              Stage
            </th>
            <th scope="col" className="type-caption font-semibold uppercase tracking-wider text-heading py-phi-2 pr-phi-3">
              What is checked
            </th>
            <th scope="col" className="type-caption font-semibold uppercase tracking-wider text-heading py-phi-2">
              Why it matters
            </th>
          </tr>
        </thead>
        <tbody>
          {qualityControlMatrix.map((row) => (
            <tr key={row.stage} className="border-b border-border/60">
              <th scope="row" className="type-body-sm font-medium text-heading py-phi-3 pr-phi-3 align-top">
                {row.stage}
              </th>
              <td className="type-body-sm py-phi-3 pr-phi-3 align-top">{row.checked}</td>
              <td className="type-body-sm py-phi-3 align-top">{row.why}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    <dl className="md:hidden space-y-phi-3">
      {qualityControlMatrix.map((row) => (
        <div key={row.stage} className="surface-soft p-phi-3">
          <dt className="type-h5 mb-1">{row.stage}</dt>
          <dd className="type-body-sm mb-2">
            <span className="font-medium text-heading">Checked: </span>
            {row.checked}
          </dd>
          <dd className="type-body-sm">
            <span className="font-medium text-heading">Why: </span>
            {row.why}
          </dd>
        </div>
      ))}
    </dl>
  </section>
);
