import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { majorCities } from "@/lib/cityData";
import { Search } from "lucide-react";

interface CityInputProps {
  onAnalyze: (city: string) => void;
  loading: boolean;
}

export default function CityInput({ onAnalyze, loading }: CityInputProps) {
  const [city, setCity] = useState("");

  const suggestions = Object.values(majorCities).slice(0, 8);

  return (
    <div className="heat-card space-y-4">
      <h2 className="section-title flex items-center gap-2">
        <span>📍</span> Enter Indian City
      </h2>
      <div className="flex gap-2">
        <Input
          placeholder="e.g. Chennai, Delhi, Mumbai..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && city.trim() && onAnalyze(city.trim())}
          className="text-base"
        />
        <Button
          onClick={() => city.trim() && onAnalyze(city.trim())}
          disabled={loading || !city.trim()}
          className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2"
        >
          <Search className="h-4 w-4" /> Analyze
        </Button>
      </div>
      <div className="flex flex-wrap gap-2">
        {suggestions.map((c) => (
          <button
            key={c.name}
            onClick={() => { setCity(c.name); onAnalyze(c.name); }}
            className="rounded-full border border-border px-3 py-1 text-xs font-medium text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary"
          >
            {c.name}
          </button>
        ))}
      </div>
    </div>
  );
}
