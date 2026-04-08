import { getRiskLevel } from "@/lib/cityData";
import HeatMeter from "./HeatMeter";

interface DashboardProps {
  liveTemp: number;
  adjustedTemp: number;
  riskScore: number;
  feelsLike: number;
  humidity: number;
  cityName: string;
}

export default function Dashboard({ liveTemp, adjustedTemp, riskScore, feelsLike, humidity, cityName }: DashboardProps) {
  const risk = getRiskLevel(riskScore);
  const badgeClass =
    risk === "Low" ? "heat-badge-low" :
    risk === "Medium" ? "heat-badge-medium" :
    risk === "High" ? "heat-badge-high" : "heat-badge-extreme";

  return (
    <div className="heat-card space-y-5 animate-fade-up">
      <h2 className="section-title flex items-center gap-2">
        <span>📊</span> Heat Analysis — {cityName}
      </h2>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <StatCard icon="🌡️" label="Live Temp" value={`${liveTemp.toFixed(1)}°C`} />
        <StatCard icon="🔥" label="Adjusted Temp" value={`${adjustedTemp.toFixed(1)}°C`} highlight />
        <StatCard icon="💧" label="Humidity" value={`${humidity}%`} />
        <StatCard icon="🌡️" label="Feels Like" value={`${feelsLike.toFixed(1)}°C`} />
      </div>

      <div className="flex items-center gap-3">
        <span className="text-sm font-medium">📍 Risk Level:</span>
        <span className={badgeClass}>{risk}</span>
      </div>

      <HeatMeter score={riskScore} label="🔥 Heat Risk Score" />

      {riskScore > 75 && (
        <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-4 pulse-alert">
          <p className="text-sm font-semibold text-destructive">
            🚨 Extreme Heat Risk Zone – Immediate action required
          </p>
        </div>
      )}
    </div>
  );
}

function StatCard({ icon, label, value, highlight }: { icon: string; label: string; value: string; highlight?: boolean }) {
  return (
    <div className="rounded-lg border border-border p-3 text-center">
      <p className="text-lg">{icon}</p>
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className={`stat-value text-xl ${highlight ? "text-primary" : "text-foreground"}`}>{value}</p>
    </div>
  );
}
