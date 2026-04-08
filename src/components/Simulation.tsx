import { calculateAdjustedTemp, calculateRiskScore, getRiskLevel } from "@/lib/cityData";
import { ArrowDown } from "lucide-react";

interface SimulationProps {
  liveTemp: number;
  treeCover: number;
  density: number;
  surfaceLevel: "low" | "medium" | "high";
  adjustedTemp: number;
  riskScore: number;
}

export default function Simulation({ liveTemp, treeCover, density, surfaceLevel, adjustedTemp, riskScore }: SimulationProps) {
  const newTree = Math.min(60, treeCover + 20);
  const newDensity = Math.max(0, density - 15);
  const newSurface = surfaceLevel === "high" ? "medium" : "low";

  const newAdj = calculateAdjustedTemp(liveTemp, newDensity, newTree, newSurface as "low" | "medium" | "high");
  const newRisk = calculateRiskScore(newAdj);

  const tempDrop = adjustedTemp - newAdj;
  const riskDrop = riskScore - newRisk;

  return (
    <div className="heat-card space-y-4 animate-fade-up">
      <h2 className="section-title flex items-center gap-2">
        <span>🔁</span> Before vs After Simulation
      </h2>
      <p className="text-sm text-muted-foreground">
        Simulated: +20% tree cover, -15% density, reduced surface level
      </p>

      <div className="grid grid-cols-2 gap-4">
        <CompareCard label="Before" temp={adjustedTemp} risk={riskScore} variant="before" />
        <CompareCard label="After" temp={newAdj} risk={newRisk} variant="after" />
      </div>

      <div className="flex items-center gap-6 rounded-lg bg-accent/10 p-4">
        <div className="flex items-center gap-1 text-accent">
          <ArrowDown className="h-4 w-4" />
          <span className="text-sm font-bold">{tempDrop.toFixed(1)}°C drop</span>
        </div>
        <div className="flex items-center gap-1 text-accent">
          <ArrowDown className="h-4 w-4" />
          <span className="text-sm font-bold">{riskDrop.toFixed(0)} risk reduction</span>
        </div>
      </div>
    </div>
  );
}

function CompareCard({ label, temp, risk, variant }: { label: string; temp: number; risk: number; variant: "before" | "after" }) {
  const level = getRiskLevel(risk);
  return (
    <div className={`rounded-lg border p-4 text-center ${variant === "after" ? "border-accent/40 bg-accent/5" : "border-border"}`}>
      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</p>
      <p className="stat-value text-2xl mt-1">{temp.toFixed(1)}°C</p>
      <p className="text-xs text-muted-foreground mt-1">Risk: {risk.toFixed(0)} ({level})</p>
    </div>
  );
}
