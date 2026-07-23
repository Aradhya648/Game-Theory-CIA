import { useMemo } from 'react';
import Section from './Section';

function countWords(text) {
  const trimmed = text.trim();
  if (!trimmed) return 0;
  return trimmed.split(/\s+/).length;
}

export default function Commentary({ text, onChange }) {
  const wordCount = useMemo(() => countWords(text), [text]);
  const inRange = wordCount >= 500 && wordCount <= 600;

  return (
    <Section
      eyebrow="05 — Commentary"
      title="Designer's Commentary"
      subtitle="500–600 words of your own analysis. Replace the guiding prompts below entirely — this section is graded for independent thinking, not AI generation."
    >
      <div className="commentary">
        <textarea
          className="text-editor commentary__editor"
          rows={16}
          value={text}
          onChange={(e) => onChange(e.target.value)}
        />
        <p className={`commentary__count${inRange ? ' commentary__count--ok' : ''}`}>
          {wordCount} words {inRange ? '— in range' : '(target: 500–600)'}
        </p>
      </div>
    </Section>
  );
}
