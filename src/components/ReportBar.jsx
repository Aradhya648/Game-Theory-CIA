export default function ReportBar({ teamName, onTeamNameChange }) {
  return (
    <div className="report-bar">
      <label className="report-bar__team">
        <span>Team / author name</span>
        <input
          type="text"
          value={teamName}
          onChange={(e) => onTeamNameChange(e.target.value)}
        />
      </label>
      <button type="button" className="report-bar__button" onClick={() => window.print()}>
        Generate Report
      </button>
    </div>
  );
}
