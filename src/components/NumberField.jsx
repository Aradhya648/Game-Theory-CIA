export default function NumberField({ value, onChange, label, className = '' }) {
  return (
    <label className={`number-field ${className}`}>
      {label && <span className="number-field__label">{label}</span>}
      <input
        type="number"
        className="number-field__input"
        value={value}
        onChange={(e) => {
          const v = e.target.value;
          onChange(v === '' ? 0 : Number(v));
        }}
        onFocus={(e) => e.target.select()}
      />
    </label>
  );
}
