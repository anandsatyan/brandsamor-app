import { Menu, Plus, X } from 'lucide-react';
import type { LocalConversationEntry } from '../lib/conversationLibrary';

function formatWhen(value?: string) {
  if (!value) return '';
  try {
    return new Date(value).toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
    });
  } catch {
    return '';
  }
}

export function ConversationSidebar({
  conversations,
  activeId,
  open,
  onToggle,
  onSelect,
  onNewScent,
  creating,
}: {
  conversations: LocalConversationEntry[];
  activeId?: string | null;
  open: boolean;
  onToggle: () => void;
  onSelect: (consultationId: string) => void;
  onNewScent: () => void;
  creating?: boolean;
}) {
  return (
    <>
      <button
        type="button"
        onClick={onToggle}
        className="fixed left-3 top-3.5 z-50 inline-flex items-center gap-2 rounded-[2px] border border-[var(--sampling-border)] bg-[var(--sampling-surface)] px-2.5 py-1.5 text-xs font-semibold text-[var(--sampling-heading)] lg:hidden"
        aria-expanded={open}
        aria-controls="scent-conversation-nav"
      >
        {open ? <X className="h-3.5 w-3.5" /> : <Menu className="h-3.5 w-3.5" />}
        Scents
      </button>

      {open && (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-black/20 lg:hidden"
          aria-label="Close conversation list"
          onClick={onToggle}
        />
      )}

      <aside
        id="scent-conversation-nav"
        className={[
          'fixed inset-y-0 left-0 z-50 flex w-[min(18.5rem,88vw)] flex-col border-r border-[var(--sampling-border)] bg-[var(--sampling-cream)] transition-transform lg:static lg:z-0 lg:w-72 lg:translate-x-0 lg:shrink-0',
          open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
        ].join(' ')}
      >
        <div className="border-b border-[var(--sampling-border)] px-4 py-4">
          <p className="type-eyebrow">Scent Studio</p>
          <p className="mt-1 text-sm text-[var(--sampling-muted)]">Saved on this device</p>
          <button
            type="button"
            onClick={onNewScent}
            disabled={creating}
            className="btn-primary mt-4 flex w-full items-center justify-center gap-2 disabled:opacity-50"
          >
            <Plus className="h-4 w-4" aria-hidden />
            {creating ? 'Creating…' : 'New scent'}
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-2 py-2" aria-label="Saved scent conversations">
          {conversations.length === 0 ? (
            <p className="px-3 py-6 text-sm text-[var(--sampling-muted)]">
              No saved conversations yet. Start a new scent to begin.
            </p>
          ) : (
            <ul className="space-y-1">
              {conversations.map((item) => {
                const active = item.consultationId === activeId;
                return (
                  <li key={item.consultationId}>
                    <button
                      type="button"
                      onClick={() => onSelect(item.consultationId)}
                      className={[
                        'w-full rounded-[2px] px-3 py-2.5 text-left transition-colors',
                        active
                          ? 'bg-[var(--sampling-heading-tint)] text-[var(--sampling-heading)]'
                          : 'text-[var(--sampling-heading)] hover:bg-white/70',
                      ].join(' ')}
                    >
                      <p className="truncate text-sm font-semibold">{item.title}</p>
                      <p className="mt-0.5 truncate type-caption text-[var(--sampling-muted)]">
                        {item.submittedAt ? 'Submitted · ' : ''}
                        {formatWhen(item.updatedAt)}
                        {item.stage ? ` · ${item.stage.replace(/_/g, ' ')}` : ''}
                      </p>
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </nav>
      </aside>
    </>
  );
}
