type Props = {
  size?: number;
  className?: string;
  withHalo?: boolean;
  priority?: boolean;
};

/**
 * Healthy Circle app mark — a stylized leaf-heart on a soft cream tile.
 * Pure SVG so it renders identically in OG images and the live site.
 */
export function HealthyMark({
  size = 40,
  className = '',
  withHalo = false,
  priority: _priority,
}: Props) {
  // priority is accepted for API parity with image-based marks
  void _priority;

  return (
    <span
      className={`relative inline-flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
      aria-hidden
    >
      {withHalo && (
        <span
          className="absolute inset-0 -z-10"
          style={{
            background:
              'radial-gradient(closest-side, rgba(46,93,68,0.28), transparent 70%)',
            transform: 'scale(2.0)',
            filter: 'blur(20px)',
          }}
        />
      )}
      <svg
        viewBox="0 0 64 64"
        width={size}
        height={size}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="hgGradTile" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFFBF2" />
            <stop offset="100%" stopColor="#F1E8D6" />
          </linearGradient>
          <linearGradient id="hgGradLeaf" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#2E5D44" />
            <stop offset="100%" stopColor="#1F4631" />
          </linearGradient>
        </defs>

        {/* rounded cream tile */}
        <rect
          x="2"
          y="2"
          width="60"
          height="60"
          rx="16"
          fill="url(#hgGradTile)"
          stroke="rgba(46,64,51,0.12)"
          strokeWidth="1"
        />

        {/* leaf — forest green */}
        <path
          d="M44 14c-10 0-22 6-26 18-2 6 1 12 7 16 8 5 18 3 24-3 5-5 7-12 7-22 0-6-3-9-12-9z"
          fill="url(#hgGradLeaf)"
        />

        {/* central vein */}
        <path
          d="M22 48c8-10 16-18 28-26"
          fill="none"
          stroke="#F7F1E5"
          strokeWidth="1.6"
          strokeLinecap="round"
          opacity="0.85"
        />

        {/* tiny terracotta heart accent */}
        <path
          d="M34 36c-2.4-1.6-4.4-3.2-4.4-5.6 0-1.6 1.2-2.8 2.8-2.8 1 0 1.8.4 2.4 1.2.6-.8 1.4-1.2 2.4-1.2 1.6 0 2.8 1.2 2.8 2.8 0 2.4-2 4-4.4 5.6-.4.3-.8.4-1.6 0z"
          fill="#C36A4B"
        />
      </svg>
    </span>
  );
}
