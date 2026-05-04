import { ImageResponse } from "next/og";

// Dynamic OG image: 1200×630 is the canonical size LinkedIn / Slack / X / Discord all crop from.
// Edge-rendered so it's fast and cacheable. Avoid external font fetches (would slow / fail at edge).

export const runtime = "edge";
export const alt = "Ethan Urbanky — Data Science & Software Engineering";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background:
            "linear-gradient(135deg, #0a0b10 0%, #16121f 55%, #1d1730 100%)",
          color: "#f8fafc",
          fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
          position: "relative",
        }}
      >
        {/* Soft violet bloom — visual signature of the site */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 70% 55% at 18% 110%, rgba(139,92,246,0.55), transparent 65%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 50% 40% at 95% -10%, rgba(196,181,253,0.28), transparent 70%)",
          }}
        />

        {/* Top — kicker */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            color: "#c4b5fd",
            fontSize: 22,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            fontWeight: 500,
            zIndex: 1,
          }}
        >
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: 999,
              background: "#a78bfa",
              boxShadow: "0 0 16px #a78bfa",
            }}
          />
          ethanurbanky.dev
        </div>

        {/* Center — name + tagline */}
        <div style={{ display: "flex", flexDirection: "column", gap: 28, zIndex: 1 }}>
          <div
            style={{
              fontSize: 128,
              fontWeight: 700,
              letterSpacing: "-0.04em",
              lineHeight: 1.0,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span style={{ color: "#ffffff" }}>Ethan</span>
            <span style={{ color: "#94a3b8" }}>Urbanky.</span>
          </div>
          <div
            style={{
              fontSize: 32,
              color: "#cbd5e1",
              maxWidth: 880,
              lineHeight: 1.35,
            }}
          >
            Data Science at Western · 3× CI Financial · Co-Founder @{" "}
            <span style={{ color: "#ffffff", fontWeight: 600 }}>CONQ</span>
          </div>
        </div>

        {/* Bottom — stat row */}
        <div
          style={{
            display: "flex",
            gap: 64,
            zIndex: 1,
            color: "#64748b",
            fontSize: 20,
            fontWeight: 500,
            letterSpacing: "0.04em",
            textTransform: "uppercase",
          }}
        >
          <span>Class of 2027</span>
          <span>·</span>
          <span>$103B Division AUM</span>
          <span>·</span>
          <span>EN / FR</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
