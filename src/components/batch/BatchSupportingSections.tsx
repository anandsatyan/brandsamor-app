import { Link } from 'react-router-dom';
import {
  batchDocumentationItems,
  brandsamorCoordinates,
  specialistPartnerTasks,
} from '../../content/batchProcess';

export const BatchDocumentation = () => (
  <section id="batch-documentation" className="py-phi-5 sm:py-phi-6 border-t border-border">
    <h2 className="type-h2 mb-phi-2">Documents That May Support the Batch</h2>
    <p className="type-body-lg mb-phi-3 max-w-3xl">
      Document availability depends on the specific fragrance, production setup and project
      requirements. Not every document is available for every project.
    </p>
    <ul className="grid sm:grid-cols-2 gap-2 mb-phi-4">
      {batchDocumentationItems.map((item) => (
        <li key={item} className="type-body-sm flex gap-2">
          <span className="text-accent" aria-hidden="true">
            ✦
          </span>
          {item}
        </li>
      ))}
    </ul>
    <p className="type-body-sm">
      <Link to="/quality-compliance" className="text-accent hover:opacity-80">
        Review Brandsamor&apos;s quality and compliance support
      </Link>
    </p>
  </section>
);

export const ProductionModelSection = () => (
  <section id="production-model" className="py-phi-5 sm:py-phi-6 border-t border-border">
    <h2 className="type-h2 mb-phi-3">How Brandsamor Coordinates Production</h2>
    <div className="type-body-lg space-y-phi-3 max-w-3xl mb-phi-4">
      <p>
        Brandsamor operates as the coordinating private-label partner for your fragrance project.
        Depending on the product and project requirements, fragrance preparation, filling, packaging
        production, decoration and finishing may be completed through qualified specialist partners.
      </p>
      <p>
        Brandsamor brings these stages together under one approved product specification and helps
        coordinate samples, components, production approvals, quality checks and delivery
        preparation.
      </p>
    </div>

    <div className="grid md:grid-cols-2 gap-phi-4">
      <div className="surface-soft p-phi-4">
        <h3 className="type-h4 mb-phi-3">Brandsamor coordinates</h3>
        <ul className="space-y-2">
          {brandsamorCoordinates.map((item) => (
            <li key={item} className="type-body-sm flex gap-2">
              <span className="text-accent shrink-0" aria-hidden="true">
                →
              </span>
              {item}
            </li>
          ))}
        </ul>
      </div>
      <div className="surface-soft p-phi-4">
        <h3 className="type-h4 mb-phi-3">Specialist partners may perform</h3>
        <ul className="space-y-2">
          {specialistPartnerTasks.map((item) => (
            <li key={item} className="type-body-sm flex gap-2">
              <span className="text-body/50 shrink-0" aria-hidden="true">
                ·
              </span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  </section>
);
