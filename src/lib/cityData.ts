export interface CityProfile {
  name: string;
  treeCover: number;
  density: number;
  lat: number;
  lng: number;
}

export const majorCities: Record<string, CityProfile> = {
  chennai: { name: "Chennai", treeCover: 18, density: 85, lat: 13.0827, lng: 80.2707 },
  delhi: { name: "Delhi", treeCover: 22, density: 90, lat: 28.6139, lng: 77.2090 },
  mumbai: { name: "Mumbai", treeCover: 12, density: 92, lat: 19.0760, lng: 72.8777 },
  bangalore: { name: "Bangalore", treeCover: 30, density: 65, lat: 12.9716, lng: 77.5946 },
  bengaluru: { name: "Bengaluru", treeCover: 30, density: 65, lat: 12.9716, lng: 77.5946 },
  hyderabad: { name: "Hyderabad", treeCover: 20, density: 80, lat: 17.3850, lng: 78.4867 },
  kolkata: { name: "Kolkata", treeCover: 18, density: 85, lat: 22.5726, lng: 88.3639 },
  pune: { name: "Pune", treeCover: 28, density: 60, lat: 18.5204, lng: 73.8567 },
  ahmedabad: { name: "Ahmedabad", treeCover: 15, density: 78, lat: 23.0225, lng: 72.5714 },
  jaipur: { name: "Jaipur", treeCover: 20, density: 70, lat: 26.9124, lng: 75.7873 },
  lucknow: { name: "Lucknow", treeCover: 22, density: 72, lat: 26.8467, lng: 80.9462 },
  surat: { name: "Surat", treeCover: 18, density: 75, lat: 21.1702, lng: 72.8311 },
  nagpur: { name: "Nagpur", treeCover: 30, density: 55, lat: 21.1458, lng: 79.0882 },
  indore: { name: "Indore", treeCover: 25, density: 62, lat: 22.7196, lng: 75.8577 },
  bhopal: { name: "Bhopal", treeCover: 32, density: 55, lat: 23.2599, lng: 77.4126 },
  coimbatore: { name: "Coimbatore", treeCover: 28, density: 58, lat: 11.0168, lng: 76.9558 },
  visakhapatnam: { name: "Visakhapatnam", treeCover: 26, density: 60, lat: 17.6868, lng: 83.2185 },
  kochi: { name: "Kochi", treeCover: 35, density: 55, lat: 9.9312, lng: 76.2673 },
  patna: { name: "Patna", treeCover: 16, density: 82, lat: 25.6093, lng: 85.1376 },
  chandigarh: { name: "Chandigarh", treeCover: 35, density: 50, lat: 30.7333, lng: 76.7794 },
};

export function getCityProfile(cityName: string): CityProfile {
  const key = cityName.toLowerCase().trim();
  if (majorCities[key]) return majorCities[key];
  
  // Tier-2 default
  return {
    name: cityName,
    treeCover: 25,
    density: 60,
    lat: 20.5937,
    lng: 78.9629,
  };
}

export function calculateAdjustedTemp(
  liveTemp: number,
  density: number,
  treeCover: number,
  surfaceLevel: "low" | "medium" | "high"
): number {
  const surfaceImpact = surfaceLevel === "low" ? 0 : surfaceLevel === "medium" ? 2 : 4;
  return liveTemp + (density * 0.04) - (treeCover * 0.06) + surfaceImpact;
}

export function calculateRiskScore(adjustedTemp: number): number {
  return Math.max(0, Math.min(100, (adjustedTemp - 25) * 2));
}

export function getRiskLevel(score: number): "Low" | "Medium" | "High" | "Extreme" {
  if (score < 40) return "Low";
  if (score <= 75) return "Medium";
  if (score <= 90) return "High";
  return "Extreme";
}

export function getFeelsLike(temp: number, humidity: number): number {
  // Simple heat index approximation
  if (temp < 27) return temp;
  return temp + 0.33 * (humidity / 100 * 6.105 * Math.exp(17.27 * temp / (237.7 + temp))) - 4;
}
