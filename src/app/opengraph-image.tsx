import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

export const alt = 'NeuroTechX — The global neurotechnology community';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

// Branded social share image, applied site-wide.
export default async function Image() {
  // Noto Sans (SIL Open Font License), the default font of next/og before Next.js 16.
  // The Next.js 16 default (Geist) leaves a gap inside the wordmark.
  const notoSans = await readFile(join(process.cwd(), 'src/assets/fonts/noto-sans-v27-latin-regular.ttf'));
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          background: '#08090d',
          backgroundImage: 'radial-gradient(circle at 82% 18%, rgba(34,211,238,0.28), transparent 55%)',
          padding: '90px',
        }}
      >
        <div style={{ display: 'flex', fontSize: 104, fontWeight: 800, color: '#f3f4f7', letterSpacing: '-0.04em' }}>
          NeuroTech<span style={{ color: '#22d3ee' }}>X</span>
        </div>
        <div style={{ display: 'flex', marginTop: 28, fontSize: 42, color: '#9aa1ad', maxWidth: 920 }}>
          The global neurotechnology community
        </div>
        <div
          style={{
            display: 'flex',
            marginTop: 52,
            height: 8,
            width: 200,
            background: 'linear-gradient(90deg,#22d3ee,#818cf8)',
            borderRadius: 4,
          }}
        />
      </div>
    ),
    { ...size, fonts: [{ name: 'Noto Sans', data: notoSans, weight: 400, style: 'normal' }] }
  );
}
