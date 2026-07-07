import { Check } from 'lucide-react';
import type { ProcessStage } from '../../content/batchProcess';

const aspectRatioClass = (ratio?: 'portrait' | 'landscape' | 'square') => {
  switch (ratio) {
    case 'portrait':
      return 'aspect-[3/4]';
    case 'square':
      return 'aspect-square';
    case 'landscape':
    default:
      return 'aspect-[4/3]';
  }
};

const ProcessStageImage = ({ image }: { image: NonNullable<ProcessStage['image']> }) => (
  <figure className="w-full">
    <div className={`relative w-full overflow-hidden rounded-[2px] ${aspectRatioClass(image.aspectRatio)}`}>
      <img
        src={image.src}
        alt={image.alt}
        className="h-full w-full object-cover"
        style={{ objectPosition: image.focalPoint ?? 'center' }}
        loading="lazy"
        decoding="async"
      />
    </div>
    {image.caption && (
      <figcaption className="type-caption mt-phi-2 text-body/80">{image.caption}</figcaption>
    )}
  </figure>
);

const StageCallout = ({
  label,
  children,
  variant = 'quality',
}: {
  label: string;
  children: string;
  variant?: 'quality' | 'note';
}) => (
  <aside
    className={`border-l-2 pl-phi-3 py-phi-1 ${
      variant === 'quality' ? 'border-accent' : 'border-border'
    }`}
  >
    <p className="type-caption font-semibold uppercase tracking-wider text-heading mb-1">{label}</p>
    <p className="type-body-sm">{children}</p>
  </aside>
);

export const AdaptiveProcessStage = ({
  stage,
  reverse = false,
}: {
  stage: ProcessStage;
  reverse?: boolean;
}) => {
  const hasImage = Boolean(stage.image);

  return (
    <article
      id={stage.id}
      className={`batch-stage relative scroll-mt-24 py-phi-5 sm:py-phi-6 ${
        reverse ? 'batch-stage--reverse' : ''
      }`}
      aria-labelledby={`${stage.id}-title`}
    >
      <div
        className={`grid gap-phi-4 lg:gap-phi-5 items-start ${
          hasImage ? 'lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)]' : 'max-w-3xl'
        } ${hasImage && reverse ? 'lg:[&>*:first-child]:order-2' : ''}`}
      >
        <div className="relative">
          <div className="flex items-start gap-phi-3 mb-phi-3">
            <span
              className="type-display text-accent/25 leading-none select-none shrink-0"
              aria-hidden="true"
            >
              {stage.number}
            </span>
            <div className="min-w-0 pt-1">
              {stage.eyebrow && <p className="type-eyebrow mb-phi-1">{stage.eyebrow}</p>}
              <h2 id={`${stage.id}-title`} className="type-h2-sm">
                {stage.title}
              </h2>
            </div>
          </div>

          <p className="type-body-lg mb-phi-3">{stage.summary}</p>

          {stage.details && stage.details.length > 0 && (
            <ul className="space-y-2 mb-phi-3">
              {stage.details.map((detail) => (
                <li key={detail} className="flex gap-3 type-body-sm">
                  <Check className="text-accent shrink-0 mt-0.5" size={16} aria-hidden="true" />
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
          )}

          <div className="space-y-phi-3">
            {stage.customerApproval && (
              <StageCallout label="Customer approval" variant="note">
                {stage.customerApproval}
              </StageCallout>
            )}
            {stage.qualityChecks && stage.qualityChecks.length > 0 && (
              <StageCallout label="Quality checks">
                {stage.qualityChecks.join(' · ')}
              </StageCallout>
            )}
            {stage.cautiousNote && (
              <StageCallout label="Note" variant="note">
                {stage.cautiousNote}
              </StageCallout>
            )}
            {stage.transparentNote && (
              <StageCallout label="Transparent note" variant="note">
                {stage.transparentNote}
              </StageCallout>
            )}
            {stage.output && (
              <p className="type-caption font-semibold uppercase tracking-wider text-heading">
                Output: <span className="font-normal normal-case tracking-normal text-body">{stage.output}</span>
              </p>
            )}
          </div>
        </div>

        {hasImage && stage.image && <ProcessStageImage image={stage.image} />}
      </div>
    </article>
  );
};
