interface HeatMeterProps {
  score: number;
  label: string;
}

export default function HeatMeter({ score, label }: HeatMeterProps) {
  const clamped = Math.max(0, Math.min(100, score));
  const getColor = () => {
    if (clamped < 40) return "bg-accent";
    if (clamped <= 75) return "bg-secondary";
    return "bg-destructive";
  };

  return (
    <div className="space-y-1">
      <div className="flex justify-between text-sm">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-bold">{clamped.toFixed(0)}/100</span>
      </div>
      <div className="h-4 w-full rounded-full bg-muted overflow-hidden">
        <div
          className={`h-full rounded-full ${getColor()} animate-heat-fill`}
          style={{ "--fill-width": `${clamped}%`, width: `${clamped}%` } as React.CSSProperties}
        />
      </div>
    </div>
  );
}
