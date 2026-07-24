import CompanyBadge from './CompanyBadge';

export default function ScoreHeader({ zoomEatsScore, campusCartScore, round, roundsComplete }) {
  return (
    <div className="score-header">
      <div className="score-header__player score-header__player--zoomeats">
        <CompanyBadge company="zoomeats" size="sm" />
        <div>
          <p className="score-header__label">You (ZoomEats)</p>
          <p className="score-header__value">{zoomEatsScore}</p>
        </div>
      </div>

      <div className="score-header__center">
        <div className="round-dots">
          {[1, 2].map((n) => (
            <span
              key={n}
              className={`round-dot${roundsComplete >= n ? ' round-dot--done' : ''}${round === n ? ' round-dot--active' : ''}`}
            />
          ))}
        </div>
        <p className="score-header__round-label">Round {Math.min(round, 2)} of 2</p>
      </div>

      <div className="score-header__player score-header__player--campuscart">
        <div className="score-header__text-right">
          <p className="score-header__label">CampusCart</p>
          <p className="score-header__value">{campusCartScore}</p>
        </div>
        <CompanyBadge company="campuscart" size="sm" />
      </div>
    </div>
  );
}
