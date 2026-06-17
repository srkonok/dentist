export default function PageHeroBanner({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <div
      className="relative overflow-hidden py-20 px-4"
      style={{ background: "linear-gradient(135deg, #0b3d35 0%, #0d766e 55%, #0e5a7a 100%)" }}
    >
      {/* Subtle dot grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.04]" aria-hidden="true">
        <svg className="w-full h-full">
          <defs>
            <pattern id="banner-dots" width="28" height="28" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1.5" fill="white" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#banner-dots)" />
        </svg>
      </div>
      {/* Glow orbs */}
      <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full opacity-20 blur-3xl pointer-events-none" style={{ background: "radial-gradient(circle, #2dd4bf 0%, transparent 70%)" }} aria-hidden="true" />
      <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full opacity-10 blur-3xl pointer-events-none" style={{ background: "radial-gradient(circle, #38bdf8 0%, transparent 70%)" }} aria-hidden="true" />

      <div className="relative max-w-4xl mx-auto text-center">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3 tracking-tight leading-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="text-teal-200 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}
