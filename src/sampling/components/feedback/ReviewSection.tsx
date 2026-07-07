interface ReviewSectionProps {
  title: string;
  items: { label: string; value: string }[];
  onEdit?: () => void;
}

export const ReviewSection = ({ title, items, onEdit }: ReviewSectionProps) => (
  <section className="rounded-2xl border border-[#EADFD3] bg-[#FFFDFC] p-5">
    <div className="mb-3 flex items-center justify-between">
      <h3 className="type-h4">{title}</h3>
      {onEdit && (
        <button
          type="button"
          onClick={onEdit}
          className="text-sm font-semibold text-[#FF600A] hover:underline"
        >
          Edit
        </button>
      )}
    </div>
    <dl className="space-y-2">
      {items.map((item) => (
        <div key={item.label} className="flex flex-col gap-0.5 sm:flex-row sm:gap-4">
          <dt className="shrink-0 text-sm text-[#725F52] sm:w-36">{item.label}</dt>
          <dd className="text-sm font-medium text-[#2B1809]">{item.value}</dd>
        </div>
      ))}
    </dl>
  </section>
);
