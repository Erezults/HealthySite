export function BrandMark({ size = 26 }: { size?: number }) {
  const mask = 'radial-gradient(circle at center, transparent 38%, #000 40%)';
  return (
    <span
      aria-hidden
      className="inline-block shrink-0 rounded-full"
      style={{
        width: size,
        height: size,
        background: 'var(--accent-grad)',
        WebkitMask: mask,
        mask,
      }}
    />
  );
}
