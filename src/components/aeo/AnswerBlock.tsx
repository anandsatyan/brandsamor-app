import { BodyCopy } from '../BodyCopy';

export type AnswerBlockProps = {
  question: string;
  /** 40–60 word standalone answer — must make sense with zero surrounding context. */
  answer: string;
  detail?: string;
  headingLevel?: 2 | 3;
  id?: string;
};

export const AnswerBlock = ({
  question,
  answer,
  detail,
  headingLevel = 2,
  id,
}: AnswerBlockProps) => {
  const HeadingTag = headingLevel === 3 ? 'h3' : 'h2';
  const headingClass = headingLevel === 3 ? 'type-h3 mb-4' : 'type-h2 mb-6';

  return (
    <section id={id} className="py-10 sm:py-14 border-t border-border scroll-mt-28">
      <HeadingTag className={headingClass}>{question}</HeadingTag>
      <p className="type-body-lg mb-4 max-w-3xl">
        <BodyCopy>{answer}</BodyCopy>
      </p>
      {detail && (
        <p className="type-body max-w-3xl text-body/90">
          <BodyCopy>{detail}</BodyCopy>
        </p>
      )}
    </section>
  );
};
