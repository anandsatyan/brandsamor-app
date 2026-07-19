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
                className={`max-w-[92%] px-4 py-3.5 text-sm leading-snug sm:max-w-[85%] ${
                  isUser ? 'scent-bubble-user' : 'scent-bubble-assistant'
                }`}
              >
                {isUser ? (
                  <p className="whitespace-pre-wrap">{message.content}</p>
                ) : (
                  <AssistantMessageBody
                    content={message.content}
                    headline={message.headline}
                    insight={message.insight}
                    question={message.question}
                    noteChips={message.noteChips}
                    changes={message.changes}
                  />
                )}
              </div>
            </div>
            {isLastAssistant && message.quickReplies && message.quickReplies.length > 0 && (
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2" role="group" aria-label="Quick replies">
                {message.quickReplies.map((reply) => (
                  <button
                    key={reply}
                    type="button"
                    disabled={disabled}
                    onClick={() => onQuickReply(reply)}
                    className="scent-quick-reply"
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
            <span className="scent-thinking-dots" aria-hidden>
              <span />
              <span />
              <span />
            </span>
            <span className="sr-only">Thinking</span>
          </div>
        </div>
      )}
      {/* Spacer so the last quick-reply row clears the composer after auto-scroll */}
      <div ref={endRef} className="h-phi-3 shrink-0" aria-hidden />
    </div>
  );
}
