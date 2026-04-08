import { useEffect, useRef } from "react";
import L from "leaflet";

interface HeatMapProps {
  lat: number;
  lng: number;
  cityName: string;
  riskScore: number;
}

export default function HeatMap({ lat, lng, cityName, riskScore }: HeatMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    if (mapInstance.current) {
      mapInstance.current.remove();
    }

    const map = L.map(mapRef.current).setView([lat, lng], 12);
    mapInstance.current = map;

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '© OpenStreetMap',
    }).addTo(map);

    // Heat zone circles
    const getColor = (score: number) => {
      if (score < 40) return "#22c55e";
      if (score <= 75) return "#f59e0b";
      return "#ef4444";
    };

    const color = getColor(riskScore);

    // Outer glow
    L.circle([lat, lng], {
      radius: 5000,
      color: color,
      fillColor: color,
      fillOpacity: 0.08,
      weight: 1,
    }).addTo(map);

    // Mid zone
    L.circle([lat, lng], {
      radius: 3000,
      color: color,
      fillColor: color,
      fillOpacity: 0.15,
      weight: 1,
    }).addTo(map);

    // Core zone
    L.circle([lat, lng], {
      radius: 1500,
      color: color,
      fillColor: color,
      fillOpacity: 0.3,
      weight: 2,
    }).addTo(map).bindTooltip("Urban Heat Zone – Based on density & vegetation", {
      permanent: false,
      direction: "top",
    });

    // City marker
    L.marker([lat, lng]).addTo(map)
      .bindPopup(`<b>${cityName}</b><br/>Heat Risk Score: ${riskScore.toFixed(0)}`)
      .openPopup();

    return () => {
      map.remove();
      mapInstance.current = null;
    };
  }, [lat, lng, cityName, riskScore]);

  return (
    <div className="heat-card space-y-3">
      <h2 className="section-title flex items-center gap-2">
        <span>🗺️</span> Heat Zone Map
      </h2>
      <div ref={mapRef} className="h-[400px] w-full rounded-lg overflow-hidden" />
      <p className="text-xs text-muted-foreground text-center">
        🟢 Low heat &nbsp; 🟠 Medium heat &nbsp; 🔴 High heat
      </p>
    </div>
  );
}
