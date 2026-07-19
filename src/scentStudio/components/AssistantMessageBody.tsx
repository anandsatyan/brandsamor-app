import { Fragment, type ReactNode } from 'react';
import {
  SCENT_DESCRIPTOR_TERMS,
  SCENT_NOTE_TERMS,
  SCENT_STRUCTURE_TERMS,
} from '../lib/scentTerms';

type TermKind = 'note' | 'structure' | 'descriptor' | 'emphasis';

type Segment =
  | { type: 'text'; value: string }
  | { type: 'term'; value: string; kind: TermKind };

export type AssistantVisualProps = {
  content: string;
  headline?: string;
  insight?: string;
  question?: string;
  noteChips?: string[];
  changes?: string[];
};

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function splitByBold(text: string): Segment[] {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  const out: Segment[] = [];
  for (const part of parts) {
    if (!part) continue;
    const bold = part.match(/^\*\*([^*]+)\*\*$/);
    if (bold) {
      out.push({ type: 'term', value: bold[1], kind: 'emphasis' });
    } else {
      out.push({ type: 'text', value: part });
    }
  }
  return out;
}

function highlightTerms(text: string, terms: string[], kind: TermKind): Segment[] {
  if (!text) return [];
  if (!terms.length) return [{ type: 'text', value: text }];

  const pattern = new RegExp(`\\b(${terms.map(escapeRegExp).join('|')})\\b`, 'gi');
  const out: Segment[] = [];
  let last = 0;
  let match: RegExpExecArray | null;
  while ((match = pattern.exec(text)) != null) {
    if (match.index > last) {
      out.push({ type: 'text', value: text.slice(last, match.index) });
    }
    out.push({ type: 'term', value: match[0], kind });
    last = match.index + match[0].length;
  }
  if (last < text.length) {
    out.push({ type: 'text', value: text.slice(last) });
  }
  return out.length ? out : [{ type: 'text', value: text }];
}

function enrichPlainSegment(text: string): Segment[] {
  let segments: Segment[] = [{ type: 'text', value: text }];

  const apply = (kind: TermKind, terms: string[]) => {
    const next: Segment[] = [];
    for (const seg of segments) {
      if (seg.type !== 'text') {
        next.push(seg);
        continue;
      }
      next.push(...highlightTerms(seg.value, terms, kind));
    }
    segments = next;
  };

  apply('note', SCENT_NOTE_TERMS);
  apply('structure', SCENT_STRUCTURE_TERMS);
  apply('descriptor', SCENT_DESCRIPTOR_TERMS);
  return segments;
}

function toSegments(text: string): Segment[] {
  const withBold = splitByBold(text);
  const out: Segment[] = [];
  for (const seg of withBold) {
    if (seg.type === 'term') {
      out.push(seg);
    } else {
      out.push(...enrichPlainSegment(seg.value));
    }
  }
  return out;
}

function Term({ value, kind }: { value: string; kind: TermKind }) {
  const className =
    kind === 'note' || kind === 'emphasis'
      ? 'scent-term scent-term-note'
      : kind === 'structure'
        ? 'scent-term scent-term-structure'
        : 'scent-term scent-term-descriptor';
  return <span className={className}>{value}</span>;
}

function renderInline(text: string): ReactNode {
  const segments = toSegments(text);
  return segments.map((seg, i) =>
    seg.type === 'text' ? (
      <Fragment key={i}>{seg.value}</Fragment>
    ) : (
      <Term key={i} value={seg.value} kind={seg.kind} />
    ),
  );
}

function splitParagraphs(content: string): string[] {
  return String(content || '')
    .trim()
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean);
}

function hasSnackStructure(props: AssistantVisualProps) {
  return Boolean(
    props.headline ||
      props.insight ||
      props.question ||
      (props.noteChips && props.noteChips.length) ||
      (props.changes && props.changes.length),
  );
}

function SnackableBody({
  headline,
  insight,
  question,
  noteChips,
  changes,
}: AssistantVisualProps) {
  return (
    <div className="scent-assistant-body scent-assistant-snack space-y-3">
      {headline ? (
        <p className="type-eyebrow tracking-[0.14em] text-[var(--sampling-muted)]">{headline}</p>
      ) : null}

      {insight ? (
        <p className="text-sm leading-snug text-[var(--sampling-heading)] sm:text-[0.95rem]">
          {renderInline(insight)}
        </p>
      ) : null}

      {noteChips && noteChips.length > 0 ? (
        <div className="flex flex-wrap gap-1.5" aria-label="Notes in play">
          {noteChips.map((note) => (
            <span key={note} className="scent-note-chip">
              {note}
            </span>
          ))}
        </div>
      ) : null}

      {changes && changes.length > 0 ? (
        <div className="scent-change-strip" aria-label="What changed">
          {changes.map((change) => (
            <span key={change} className="scent-change-chip">
              {change}
            </span>
          ))}
        </div>
      ) : null}

      {question ? (
        <p className="scent-question-line text-sm font-semibold leading-snug text-[var(--sampling-heading)]">
          {renderInline(question)}
        </p>
      ) : null}
    </div>
  );
}

function ProseBody({ content }: { content: string }) {
  const paragraphs = splitParagraphs(content);
  if (!paragraphs.length) return null;

  return (
    <div className="scent-assistant-body space-y-2.5">
      {paragraphs.map((paragraph, pIndex) => {
        const lines = paragraph.split('\n').map((l) => l.trimEnd());
        const isList = lines.every((l) => !l || /^[-•*]/.test(l.trim()));

        if (isList && lines.some((l) => l.trim())) {
          return (
            <ul key={pIndex} className="space-y-1.5 pl-0">
              {lines
                .filter((l) => l.trim())
                .map((line, i) => (
                  <li key={i} className="flex gap-2 text-sm leading-snug">
                    <span className="mt-[0.55em] h-1 w-1 shrink-0 rounded-full bg-[var(--sampling-orange)]" />
                    <span>{renderInline(line.replace(/^[-•*]\s*/, ''))}</span>
                  </li>
                ))}
            </ul>
          );
        }

        return (
          <p key={pIndex} className="text-sm leading-snug">
            {lines.map((line, i) => (
              <Fragment key={i}>
                {i > 0 && <br />}
                {renderInline(line)}
              </Fragment>
            ))}
          </p>
        );
      })}
    </div>
  );
}

export function AssistantMessageBody(props: AssistantVisualProps) {
  if (hasSnackStructure(props)) {
    return <SnackableBody {...props} />;
  }
  return <ProseBody content={props.content} />;
}
