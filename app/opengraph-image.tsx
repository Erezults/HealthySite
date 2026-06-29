import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Healthy Circle — A calmer home for your family’s health.';
export const contentType = 'image/png';
export const size = { width: 1200, height: 630 };

export default async function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          background:
            'radial-gradient(1200px 600px at 18% 12%, rgba(124,92,255,0.22), transparent 65%), radial-gradient(900px 500px at 92% 88%, rgba(225,91,214,0.20), transparent 65%), #FBFAFF',
          padding: 80,
          fontFamily: 'system-ui, -apple-system, sans-serif',
          color: '#15131F',
          position: 'relative',
        }}
      >
        {/* faint top label */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            fontSize: 18,
            letterSpacing: 4,
            textTransform: 'uppercase',
            color: 'rgba(21,19,31,0.6)',
          }}
        >
          <span
            style={{
              width: 10,
              height: 10,
              borderRadius: 9999,
              background: '#7C5CFF',
              boxShadow: '0 0 16px #7C5CFF',
              display: 'block',
            }}
          />
          <span>HEALTHY CIRCLE · iOS &amp; macOS</span>
        </div>

        {/* logo + name */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 28,
            marginTop: 36,
          }}
        >
          <div
            style={{
              width: 120,
              height: 120,
              borderRadius: 28,
              background:
                'linear-gradient(135deg, #9B6BFF 0%, #7C5CFF 55%, #E15BD6 100%)',
              boxShadow:
                '0 30px 70px -20px rgba(124,92,255,0.55), inset 0 0 0 2px rgba(255,255,255,0.22)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 78,
              fontWeight: 700,
              color: '#fff',
              letterSpacing: -4,
            }}
          >
            H
          </div>
          <div
            style={{
              fontSize: 88,
              fontWeight: 600,
              letterSpacing: -3,
            }}
          >
            Healthy Circle
          </div>
        </div>

        {/* headline */}
        <div
          style={{
            marginTop: 'auto',
            fontSize: 78,
            lineHeight: 1.05,
            letterSpacing: -2.5,
            maxWidth: 950,
            fontWeight: 500,
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0 0.35em',
          }}
        >
          <span>A calmer home</span>
          <span
            style={{
              backgroundImage:
                'linear-gradient(110deg, #7C5CFF, #E15BD6 60%, #B5A4FF)',
              backgroundClip: 'text',
              color: 'transparent',
              fontStyle: 'italic',
            }}
          >
            for your family’s health.
          </span>
        </div>

        {/* tagline strip */}
        <div
          style={{
            marginTop: 32,
            display: 'flex',
            gap: 28,
            alignItems: 'center',
            fontSize: 20,
            color: 'rgba(21,19,31,0.66)',
            letterSpacing: 0.5,
          }}
        >
          <span>Shared records.</span>
          <span style={{ opacity: 0.4 }}>·</span>
          <span>AI scans.</span>
          <span style={{ opacity: 0.4 }}>·</span>
          <span>Family-private.</span>
          <span style={{ opacity: 0.4 }}>·</span>
          <span style={{ color: '#5E3FE0' }}>iOS &amp; macOS.</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
