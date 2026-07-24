import CompanyBadge from './CompanyBadge';

export default function ThinkingIndicator({ text }) {
  return (
    <div className="thinking">
      <CompanyBadge company="campuscart" size="md" />
      <p className="thinking__text">
        {text}
        <span className="thinking__dots">
          <span>.</span>
          <span>.</span>
          <span>.</span>
        </span>
      </p>
    </div>
  );
}
