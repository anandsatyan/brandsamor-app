import { useState, type FormEvent, type KeyboardEvent } from 'react';

export function Composer({
  onSend,
  disabled,
  placeholder = 'Describe what you want…',
}: {
  onSend: (text: string) => void;
  disabled?: boolean;
  placeholder?: string;
}) {
  const [value, setValue] = useState('');

  function submit() {
    const text = value.trim();
    if (!text || disabled) return;
    onSend(text);
    setValue('');
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    submit();
  }

  function onKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      submit();
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="scent-composer w-full px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:px-8"
    >
      <div className="mx-auto flex w-full max-w-2xl items-end gap-2">
        <textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={onKeyDown}
          rows={1}
          disabled={disabled}
          placeholder={placeholder}
          className="max-h-36 min-h-[44px] w-full resize-none rounded-[2px] border border-[var(--sampling-border)] bg-white px-3 py-2.5 text-sm text-[var(--sampling-heading)] placeholder:text-[var(--sampling-muted)]/60 focus:border-[var(--sampling-orange)] focus:outline-none sm:min-h-[48px] sm:py-3"
        />
        <button
          type="submit"
          disabled={disabled || !value.trim()}
          className="btn-primary shrink-0 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Send
        </button>
      </div>
    </form>
  );
}
