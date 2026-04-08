import { useEffect, useState } from "react";

const messages = [
  "Fetching live weather data...",
  "Analyzing urban density patterns...",
  "Mapping heat zones...",
  "Calculating environmental impact...",
  "Generating insights...",
];

export default function LoadingOverlay() {
  const [msgIdx, setMsgIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMsgIdx((i) => (i + 1) % messages.length);
    }, 800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40 backdrop-blur-sm">
      <div className="heat-card flex flex-col items-center gap-4 px-10 py-8">
        <div className="relative h-12 w-12">
          <span className="absolute inset-0 animate-ping rounded-full bg-primary/30" />
          <span className="absolute inset-2 animate-pulse rounded-full bg-primary/60" />
          <span className="absolute inset-4 rounded-full bg-primary" />
        </div>
        <p className="text-sm font-medium text-muted-foreground animate-pulse">
          {messages[msgIdx]}
        </p>
      </div>
    </div>
  );
}
