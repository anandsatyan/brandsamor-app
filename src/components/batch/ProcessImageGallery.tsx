import { getConfiguredProcessImages } from '../../content/batchProcess';

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

export const ProcessImageGallery = () => {
  const images = getConfiguredProcessImages();

  if (images.length < 3) {
    return null;
  }

  return (
    <section id="production-gallery" className="py-phi-5 sm:py-phi-6 border-t border-border">
      <h2 className="type-h2 mb-phi-4">Inside the Production Process</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-phi-3">
        {images.map((image) => (
          <figure key={image.src} className="surface-soft overflow-hidden">
            <div className={`relative w-full ${aspectRatioClass(image.aspectRatio)}`}>
              <img
                src={image.src}
                alt={image.alt}
                className="h-full w-full object-cover"
                style={{ objectPosition: image.focalPoint ?? 'center' }}
                loading="lazy"
                decoding="async"
              />
            </div>
            {(image.caption || image.stageTitle) && (
              <figcaption className="p-phi-3">
                {image.stageTitle && (
                  <p className="type-caption font-semibold uppercase tracking-wider text-heading mb-1">
                    {image.stageTitle}
                  </p>
                )}
                {image.caption && <p className="type-body-sm">{image.caption}</p>}
              </figcaption>
            )}
          </figure>
        ))}
      </div>
    </section>
  );
};
