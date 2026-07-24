export default function ChoiceCard({ title, hint, onClick, state = 'idle' }) {
  return (
    <button
      type="button"
      className={`choice-card choice-card--${state}`}
      onClick={onClick}
      disabled={state !== 'idle'}
    >
      <span className="choice-card__title">{title}</span>
      <span className="choice-card__hint">{hint}</span>
    </button>
  );
}
