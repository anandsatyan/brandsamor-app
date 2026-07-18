import { useEffect, useRef } from 'react';
import type { ScentMessage } from '../types';
import { AssistantMessageBody } from './AssistantMessageBody';

export function ChatTranscript({
  messages,
  pending,
  onQuickReply,
  disabled,
}: {
  messages: ScentMessage[];
  pending?: boolean;
  onQuickReply: (text: string) => void;
  disabled?: boolean;
}) {
  const endRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [messages, pending]);

  return (
    <div className="space-y-4">
      {messages.map((message, index) => {
        const isUser = message.role === 'user';
        const isLastAssistant =
          !isUser && index === messages.length - 1 && !pending;
        return (
          <div key={message.id || `${message.role}-${index}`} className="space-y-2">
            <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-[92%] px-4 py-3.5 text-sm leading-relaxed sm:max-w-[85%] ${
                  isUser ? 'scent-bubble-user' : 'scent-bubble-assistant'
                }`}
              >
                {isUser ? (
                  <p className="whitespace-pre-wrap">{message.content}</p>
                ) : (
                  <AssistantMessageBody content={message.content} />
                )}
              </div>
            </div>
            {isLastAssistant && message.quickReplies && message.quickReplies.length > 0 && (
              <div className="flex flex-wrap gap-2 pl-1">
                {message.quickReplies.map((reply) => (
                  <button
                    key={reply}
                    type="button"
                    disabled={disabled}
                    onClick={() => onQuickReply(reply)}
                    className="rounded-[2px] border border-[var(--sampling-border)] bg-[var(--sampling-surface)] px-3 py-1.5 text-xs font-semibold text-[var(--sampling-heading)] transition-colors hover:border-[var(--sampling-heading)] disabled:opacity-50"
                  >
                    {reply}
                  </button>
                ))}
              </div>
            )}
          </div>
        );
      })}

      {pending && (
        <div className="flex justify-start">
          <div className="scent-bubble-assistant px-4 py-3 text-sm text-[var(--sampling-muted)]">
            Thinking…
          </div>
        </div>
      )}
      <div ref={endRef} />
    </div>
  );
}
