interface InsightsProps {
  treeCover: number;
  density: number;
  adjustedTemp: number;
  surfaceLevel: "low" | "medium" | "high";
  cityName: string;
}

export default function Insights({ treeCover, density, adjustedTemp, surfaceLevel, cityName }: InsightsProps) {
  const profile = generateProfile(treeCover, density, surfaceLevel);
  const suggestions = generateSuggestions(treeCover, density, adjustedTemp, surfaceLevel);
  const actionPlan = generateActionPlan(treeCover, density, adjustedTemp);

  return (
    <div className="space-y-4">
      {/* AI Profile */}
      <div className="heat-card space-y-3 animate-fade-up">
        <h2 className="section-title flex items-center gap-2">
          <span>🤖</span> AI Predicted City Profile
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">{profile}</p>
      </div>

      {/* Smart Suggestions */}
      <div className="heat-card space-y-3 animate-fade-up">
        <h2 className="section-title flex items-center gap-2">
          <span>💡</span> Smart Suggestions
        </h2>
        <ul className="space-y-2">
          {suggestions.map((s, i) => (
            <li key={i} className="flex items-start gap-2 text-sm">
              <span className="mt-0.5">{s.icon}</span>
              <span className="text-muted-foreground">{s.text}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Area Action Plan */}
      <div className="heat-card space-y-3 animate-fade-up">
        <h2 className="section-title flex items-center gap-2">
          <span>📍</span> Area Action Plan — {cityName}
        </h2>
        <ul className="space-y-2">
          {actionPlan.map((a, i) => (
            <li key={i} className="flex items-start gap-2 text-sm">
              <span className="mt-0.5">✅</span>
              <span className="text-muted-foreground">{a}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function generateProfile(tree: number, density: number, surface: string): string {
  const parts: string[] = [];
  if (density > 80) parts.push("dense construction with high building concentration");
  else if (density > 60) parts.push("moderate urban development");
  else parts.push("relatively low-density urban layout");

  if (tree < 20) parts.push("limited vegetation cover increasing heat retention");
  else if (tree < 30) parts.push("moderate green cover providing some relief");
  else parts.push("good vegetation coverage aiding natural cooling");

  if (surface === "high") parts.push("predominantly concrete and asphalt surfaces amplifying heat absorption");
  else if (surface === "medium") parts.push("mixed land use with moderate heat absorption");

  return `This area likely has ${parts.join(", ")}. Urban heat island effects are ${density > 70 ? "significant" : "moderate"}, requiring ${tree < 25 ? "urgent" : "strategic"} green infrastructure interventions.`;
}

function generateSuggestions(tree: number, density: number, temp: number, surface: string) {
  const s: { icon: string; text: string }[] = [];
  if (tree < 20) s.push({ icon: "🌳", text: "Add roadside trees & develop micro forests in vacant plots" });
  if (density > 70) s.push({ icon: "🏢", text: "Implement green roofs & vertical gardens on commercial buildings" });
  if (surface === "high") s.push({ icon: "🛤️", text: "Install cool pavements & reflective road surfaces" });
  if (temp > 38) s.push({ icon: "❄️", text: "Establish cooling shelters at bus stops & public areas" });
  s.push({ icon: "🎯", text: "Focus on bus stops, schools, and crowded zones for maximum impact" });
  return s;
}

function generateActionPlan(tree: number, density: number, temp: number): string[] {
  const treesToPlant = tree < 15 ? 50 : tree < 25 ? 35 : 20;
  const parks = density > 80 ? 3 : density > 60 ? 2 : 1;
  const buildings = density > 80 ? 20 : density > 60 ? 12 : 5;

  return [
    `Plant ${treesToPlant} trees along major roads and in residential areas`,
    `Develop ${parks} new pocket parks with native vegetation`,
    `Install cool roofs on ${buildings} key public buildings`,
    `Create shaded walkways connecting transit stops to schools`,
    `Deploy water misting systems at ${Math.ceil(buildings / 3)} high-footfall zones`,
  ];
}
