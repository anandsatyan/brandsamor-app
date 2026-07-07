import { batchProcessStages } from '../../content/batchProcess';

export const BatchProcessProgress = () => (
  <nav
    aria-label="Production stages"
    className="hidden xl:block sticky top-28 self-start"
  >
    <p className="type-caption font-semibold uppercase tracking-wider text-heading mb-phi-2">
      Stages
    </p>
    <ol className="space-y-2 border-l border-border pl-phi-3">
      {batchProcessStages.map((stage) => (
        <li key={stage.id}>
          <a
            href={`#${stage.id}`}
            className="type-body-sm text-body hover:text-accent block py-0.5"
          >
            <span className="type-num-inline text-accent mr-1">{stage.number}</span>
            {stage.title}
          </a>
        </li>
      ))}
    </ol>
  </nav>
);
