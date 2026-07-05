import { Link } from 'react-router-dom';

type Segment =
  | { type: 'text'; value: string }
  | { type: 'link'; label: string; href: string; external?: boolean };

const parseSegments = (text: string): Segment[] => {
  const segments: Segment[] = [];
  const pattern = /\[([^\]]+)\]\(([^)]+)\)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      segments.push({ type: 'text', value: text.slice(lastIndex, match.index) });
    }
    const href = match[2];
    segments.push({
      type: 'link',
      label: match[1],
      href,
      external: href.startsWith('http'),
    });
    lastIndex = pattern.lastIndex;
  }

  if (lastIndex < text.length) {
    segments.push({ type: 'text', value: text.slice(lastIndex) });
  }

  return segments.length > 0 ? segments : [{ type: 'text', value: text }];
};

export const BodyCopy = ({ children, className = '' }: { children: string; className?: string }) => {
  const segments = parseSegments(children);

  return (
    <span className={className}>
      {segments.map((segment, index) => {
        if (segment.type === 'text') {
          return <span key={index}>{segment.value}</span>;
        }

        if (segment.external) {
          return (
            <a
              key={index}
              href={segment.href}
              className="font-medium text-accent underline decoration-accent underline-offset-4 hover:opacity-80"
              rel="noopener noreferrer"
            >
              {segment.label}
            </a>
          );
        }

        return (
          <Link
            key={index}
            to={segment.href}
            className="font-medium text-accent underline decoration-accent underline-offset-4 hover:opacity-80"
          >
            {segment.label}
          </Link>
        );
      })}
    </span>
  );
};
