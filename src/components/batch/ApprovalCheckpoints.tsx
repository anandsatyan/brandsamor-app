import { approvalCheckpoints } from '../../content/batchProcess';

export const ApprovalCheckpoints = () => (
  <section id="approval-checkpoints" className="py-phi-5 sm:py-phi-6 bg-secondary/50 -mx-4 sm:-mx-6 md:-mx-12 px-4 sm:px-6 md:px-12">
    <div className="max-w-5xl mx-auto">
      <h2 className="type-h2 mb-phi-2">Where Customer Approval Matters</h2>
      <p className="type-body-lg mb-phi-4 max-w-3xl">
        Customer approval should be obtained before irreversible or bulk production stages.
      </p>

      <div className="relative">
        <div
          className="absolute left-[1.125rem] top-4 bottom-4 w-px bg-border hidden sm:block"
          aria-hidden="true"
        />
        <ol className="space-y-phi-3">
          {approvalCheckpoints.map((checkpoint) => (
            <li key={checkpoint.step} className="relative sm:pl-12">
              <div className="flex gap-phi-3 sm:absolute sm:left-0 sm:top-0 sm:flex-col sm:items-center sm:w-9">
                <span className="type-num-inline text-accent shrink-0">{checkpoint.step}</span>
                <span
                  className="hidden sm:block h-2 w-2 rounded-full bg-accent mt-1"
                  aria-hidden="true"
                />
              </div>
              <div className="surface-soft p-phi-3 sm:p-phi-4">
                <h3 className="type-h4 mb-1">{checkpoint.title}</h3>
                <p className="type-body-sm">{checkpoint.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>

      <p className="type-body-sm mt-phi-4 border-l-2 border-accent pl-phi-3">
        Changes requested after production release may affect cost, timeline and material availability.
      </p>
    </div>
  </section>
);
