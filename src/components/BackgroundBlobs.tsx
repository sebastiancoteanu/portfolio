'use client';

export default function BackgroundBlobs() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {/* Blob 1 – top-left, blue */}
      <div
        className="absolute rounded-full blur-3xl"
        style={{
          width: '520px',
          height: '520px',
          top: '-120px',
          left: '-140px',
          background: 'radial-gradient(circle, rgba(59,130,246,0.35) 0%, transparent 70%)',
          animation: 'blobFloat1 18s ease-in-out infinite',
        }}
      />
      {/* Blob 2 – bottom-right, purple */}
      <div
        className="absolute rounded-full blur-3xl"
        style={{
          width: '460px',
          height: '460px',
          bottom: '-100px',
          right: '-120px',
          background: 'radial-gradient(circle, rgba(139,92,246,0.28) 0%, transparent 70%)',
          animation: 'blobFloat2 22s ease-in-out infinite',
        }}
      />
      {/* Blob 3 – mid-center, amber accent (subtle) */}
      <div
        className="absolute rounded-full blur-3xl"
        style={{
          width: '300px',
          height: '300px',
          top: '45%',
          left: '55%',
          background: 'radial-gradient(circle, rgba(245,158,11,0.15) 0%, transparent 65%)',
          animation: 'blobFloat3 26s ease-in-out infinite',
        }}
      />
    </div>
  );
}
