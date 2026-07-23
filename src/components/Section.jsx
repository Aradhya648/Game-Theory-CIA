export default function Section({ eyebrow, title, subtitle, children, id }) {
  return (
    <section className="section" id={id}>
      <div className="section__head">
        {eyebrow && <p className="section__eyebrow">{eyebrow}</p>}
        <h2 className="section__title">{title}</h2>
        {subtitle && <p className="section__subtitle">{subtitle}</p>}
      </div>
      <div className="section__body">{children}</div>
    </section>
  );
}
