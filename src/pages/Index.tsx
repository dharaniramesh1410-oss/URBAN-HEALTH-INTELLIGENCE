import { useState, useCallback } from "react";
import CityInput from "@/components/CityInput";
import ControlSliders from "@/components/ControlSliders";
import HeatMap from "@/components/HeatMap";
import Dashboard from "@/components/Dashboard";
import Simulation from "@/components/Simulation";
import Insights from "@/components/Insights";
import LoadingOverlay from "@/components/LoadingOverlay";
import ReportDownload from "@/components/ReportDownload";
import { getCityProfile, calculateAdjustedTemp, calculateRiskScore, getFeelsLike, majorCities } from "@/lib/cityData";

const OPENWEATHER_KEY = "demo"; // Replace with real key or use fallback

interface WeatherResult {
  temp: number;
  humidity: number;
  lat: number;
  lng: number;
}

async function fetchWeather(city: string): Promise<WeatherResult> {
  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)},IN&appid=${OPENWEATHER_KEY}&units=metric`
    );
    if (!res.ok) throw new Error("API error");
    const data = await res.json();
    return {
      temp: data.main.temp,
      humidity: data.main.humidity,
      lat: data.coord.lat,
      lng: data.coord.lon,
    };
  } catch {
    // Fallback
    const profile = getCityProfile(city);
    return { temp: 35, humidity: 55, lat: profile.lat, lng: profile.lng };
  }
}

export default function Index() {
  const [loading, setLoading] = useState(false);
  const [analyzed, setAnalyzed] = useState(false);

  const [cityName, setCityName] = useState("");
  const [liveTemp, setLiveTemp] = useState(35);
  const [humidity, setHumidity] = useState(55);
  const [lat, setLat] = useState(20.5937);
  const [lng, setLng] = useState(78.9629);

  const [treeCover, setTreeCover] = useState(25);
  const [density, setDensity] = useState(60);
  const [surfaceLevel, setSurfaceLevel] = useState<"low" | "medium" | "high">("medium");

  const adjustedTemp = calculateAdjustedTemp(liveTemp, density, treeCover, surfaceLevel);
  const riskScore = calculateRiskScore(adjustedTemp);
  const feelsLike = getFeelsLike(liveTemp, humidity);

  const handleAnalyze = useCallback(async (city: string) => {
    setLoading(true);
    setAnalyzed(false);

    const profile = getCityProfile(city);
    const weather = await fetchWeather(city);

    setCityName(profile.name === city ? city : profile.name);
    setLiveTemp(weather.temp);
    setHumidity(weather.humidity);
    setLat(weather.lat);
    setLng(weather.lng);
    setTreeCover(profile.treeCover);
    setDensity(profile.density);

    // Determine surface level by density
    if (profile.density > 80) setSurfaceLevel("high");
    else if (profile.density > 55) setSurfaceLevel("medium");
    else setSurfaceLevel("low");

    // Simulate processing delay
    await new Promise((r) => setTimeout(r, 2000));
    setLoading(false);
    setAnalyzed(true);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {loading && <LoadingOverlay />}

      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight text-foreground flex items-center gap-2">
              🌍 Urban Heat Intelligence System Pro
            </h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              AI-powered Urban Heat Island analysis for Indian cities
            </p>
          </div>
          {analyzed && (
            <ReportDownload
              cityName={cityName}
              liveTemp={liveTemp}
              adjustedTemp={adjustedTemp}
              riskScore={riskScore}
              treeCover={treeCover}
              density={density}
              feelsLike={feelsLike}
            />
          )}
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Input Row */}
        <div className="grid gap-6 lg:grid-cols-2">
          <CityInput onAnalyze={handleAnalyze} loading={loading} />
          {analyzed && (
            <ControlSliders
              treeCover={treeCover}
              density={density}
              surfaceLevel={surfaceLevel}
              onTreeChange={setTreeCover}
              onDensityChange={setDensity}
              onSurfaceChange={setSurfaceLevel}
            />
          )}
        </div>

        {analyzed && (
          <>
            {/* Map */}
            <HeatMap lat={lat} lng={lng} cityName={cityName} riskScore={riskScore} />

            {/* Dashboard */}
            <Dashboard
              liveTemp={liveTemp}
              adjustedTemp={adjustedTemp}
              riskScore={riskScore}
              feelsLike={feelsLike}
              humidity={humidity}
              cityName={cityName}
            />

            {/* Simulation */}
            <Simulation
              liveTemp={liveTemp}
              treeCover={treeCover}
              density={density}
              surfaceLevel={surfaceLevel}
              adjustedTemp={adjustedTemp}
              riskScore={riskScore}
            />

            {/* Insights */}
            <Insights
              treeCover={treeCover}
              density={density}
              adjustedTemp={adjustedTemp}
              surfaceLevel={surfaceLevel}
              cityName={cityName}
            />

            {/* Real-world note */}
            <div className="heat-card text-center">
              <p className="text-sm text-muted-foreground">
                📌 This system uses real-time weather data and urban environmental patterns observed across Indian cities.
              </p>
            </div>
          </>
        )}

        {!analyzed && !loading && (
          <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
            <span className="text-6xl">🌡️</span>
            <h2 className="text-xl font-semibold text-foreground">Enter a city to begin analysis</h2>
            <p className="text-sm text-muted-foreground max-w-md">
              Select any Indian city to analyze its Urban Heat Island effect using live weather data and smart environmental modeling.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
