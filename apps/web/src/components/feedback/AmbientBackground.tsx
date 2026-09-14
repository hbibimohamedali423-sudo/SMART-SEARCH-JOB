/**
 * AmbientBackground renders the fixed dark-cloudy backdrop:
 * drifting mist orbs, subtle cyan/blue glow, and a fine noise grain.
 * It is purely decorative and sits behind the app content (-z-10).
 */
export function AmbientBackground() {
  return (
    <div className="ambient" aria-hidden="true">
      {/* Mist / glow orbs */}
      <div
        className="ambient-orb animate-drift"
        style={{
          top: '-12%',
          right: '-6%',
          width: '44rem',
          height: '44rem',
          background:
            'radial-gradient(circle at center, rgba(34,211,238,0.14), transparent 65%)',
        }}
      />
      <div
        className="ambient-orb animate-drift"
        style={{
          top: '32%',
          left: '-10%',
          width: '38rem',
          height: '38rem',
          background:
            'radial-gradient(circle at center, rgba(59,130,246,0.12), transparent 65%)',
          animationDelay: '-6s',
        }}
      />
      <div
        className="ambient-orb animate-drift"
        style={{
          bottom: '-18%',
          right: '8%',
          width: '42rem',
          height: '42rem',
          background:
            'radial-gradient(circle at center, rgba(45,212,191,0.10), transparent 65%)',
          animationDelay: '-12s',
        }}
      />

      {/* Subtle grid horizon */}
      <div
        className="absolute inset-x-0 bottom-0 h-[40rem] opacity-[0.35]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(148,163,184,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.06) 1px, transparent 1px)',
          backgroundSize: '56px 56px',
          maskImage:
            'radial-gradient(ellipse 80% 70% at 50% 100%, black 30%, transparent 100%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 80% 70% at 50% 100%, black 30%, transparent 100%)',
        }}
      />

      {/* Noise grain */}
      <div className="noise absolute inset-0 opacity-[0.35] mix-blend-overlay" />
    </div>
  )
}