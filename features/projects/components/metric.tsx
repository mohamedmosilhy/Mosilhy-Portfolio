export interface MetricProps {
  readonly value: string;
  readonly label: string;
  readonly detail?: string;
}

export function Metric({ value, label, detail }: MetricProps) {
  return (
    <dl
      data-slot="metric"
      className="rounded-lg border border-border bg-surface p-space-6"
    >
      <dt className="text-body-sm text-text-muted">{label}</dt>
      <dd className="mt-space-2 font-display text-heading-lg font-medium text-text">
        {value}
      </dd>
      {detail ? (
        <dd className="mt-space-3 text-body-sm text-text-secondary">
          {detail}
        </dd>
      ) : null}
    </dl>
  );
}
