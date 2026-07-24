import CompanyBadge from './CompanyBadge';

export default function IntroScreen({ onStart }) {
  return (
    <div className="scene scene--intro">
      <div className="intro-badges">
        <CompanyBadge company="zoomeats" size="lg" />
        <span className="intro-badges__vs">vs</span>
        <CompanyBadge company="campuscart" size="lg" />
      </div>

      <p className="scene__eyebrow">CIA 1A.2 — Two-Stage Game</p>
      <h1 className="scene__title">Campus Delivery Pricing War</h1>
      <p className="scene__lede">
        You're running <strong>ZoomEats</strong>. <strong>CampusCart</strong> is your rival across
        the quad. Two rounds, real stakes — the choices you make decide who wins the semester.
      </p>

      <button className="btn btn--primary btn--lg" onClick={onStart}>
        Start Game
      </button>
    </div>
  );
}
