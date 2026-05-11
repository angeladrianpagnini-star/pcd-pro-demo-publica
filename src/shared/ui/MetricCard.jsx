import { StatusPill } from "./StatusPill.jsx";

export function MetricCard({ metric }) {
  return (
    <article className="metric-card">
      <div className="metric-head">
        <span>{metric.label}</span>
        <StatusPill tone={metric.tone}>{metric.status}</StatusPill>
      </div>
      <strong>{metric.value}</strong>
      <p>{metric.detail}</p>
    </article>
  );
}
