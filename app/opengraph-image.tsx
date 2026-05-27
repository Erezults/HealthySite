import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Healthy — A calmer home for your family’s health.';
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
            'radial-gradient(1200px 600px at 18% 12%, rgba(217,162,59,0.55), transparent 65%), radial-gradient(900px 500px at 92% 88%, rgba(110,153,130,0.55), transparent 65%), #F7F1E5',
          padding: 80,
          fontFamily: 'system-ui, -apple-system, sans-serif',
          color: '#1F2A22',
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
            color: 'rgba(31,42,34,0.65)',
          }}
        >
          <span
            style={{
              width: 10,
              height: 10,
              borderRadius: 9999,
              background: '#C36A4B',
              boxShadow: '0 0 16px #C36A4B',
              display: 'block',
            }}
          />
          <span>HEALTHY · iOS &amp; macOS</span>
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
                'linear-gradient(135deg, #6E9982 0%, #2E5D44 60%, #1F4631 100%)',
              boxShadow:
                '0 30px 70px -20px rgba(46,93,68,0.55), inset 0 0 0 2px rgba(255,255,255,0.18)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 78,
              fontWeight: 700,
              color: '#FBF6EC',
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
            Healthy
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
                'linear-gradient(110deg, #C36A4B, #2E5D44 60%, #6E9982)',
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
            color: 'rgba(31,42,34,0.7)',
            letterSpacing: 0.5,
          }}
        >
          <span>Shared records.</span>
          <span style={{ opacity: 0.4 }}>·</span>
          <span>AI scans.</span>
          <span style={{ opacity: 0.4 }}>·</span>
          <span>Family-private.</span>
          <span style={{ opacity: 0.4 }}>·</span>
          <span style={{ color: '#1F4631' }}>iOS &amp; macOS.</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
