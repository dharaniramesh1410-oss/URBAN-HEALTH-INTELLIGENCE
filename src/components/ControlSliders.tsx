import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ControlSlidersProps {
  treeCover: number;
  density: number;
  surfaceLevel: "low" | "medium" | "high";
  onTreeChange: (v: number) => void;
  onDensityChange: (v: number) => void;
  onSurfaceChange: (v: "low" | "medium" | "high") => void;
}

export default function ControlSliders({
  treeCover, density, surfaceLevel,
  onTreeChange, onDensityChange, onSurfaceChange,
}: ControlSlidersProps) {
  return (
    <div className="heat-card space-y-5">
      <h2 className="section-title flex items-center gap-2">
        <span>⚙️</span> Environmental Parameters
      </h2>

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="flex items-center gap-1">🌳 Tree Cover</span>
          <span className="font-semibold text-accent">{treeCover}%</span>
        </div>
        <Slider value={[treeCover]} onValueChange={([v]) => onTreeChange(v)} min={0} max={60} step={1} />
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="flex items-center gap-1">🏢 Urban Density</span>
          <span className="font-semibold text-primary">{density}%</span>
        </div>
        <Slider value={[density]} onValueChange={([v]) => onDensityChange(v)} min={0} max={100} step={1} />
      </div>

      <div className="space-y-2">
        <label className="text-sm flex items-center gap-1">🛤️ Surface Level</label>
        <Select value={surfaceLevel} onValueChange={(v) => onSurfaceChange(v as "low" | "medium" | "high")}>
          <SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="low">Low (Parks, Water)</SelectItem>
            <SelectItem value="medium">Medium (Mixed Use)</SelectItem>
            <SelectItem value="high">High (Concrete, Asphalt)</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
