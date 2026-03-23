import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #f5f0e8, #ede5d0)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'serif',
        }}
      >
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '8px', background: '#c0392b' }} />
        <div style={{ fontSize: 160, fontWeight: 900, color: 'rgba(0,0,0,0.12)', marginBottom: 8, lineHeight: 1 }}>
          書
        </div>
        <div style={{ fontSize: 64, fontWeight: 900, color: '#c0392b', marginBottom: 12 }}>
          ZEN STROKE
        </div>
        <div style={{ fontSize: 32, color: '#555', marginBottom: 32 }}>
          毎日書道チャレンジ
        </div>
        <div style={{ display: 'flex', gap: 32, fontSize: 22, color: '#888' }}>
          <span>今日の漢字を書く</span>
          <span>•</span>
          <span>AIがスコア採点</span>
          <span>•</span>
          <span>Xでシェア</span>
        </div>
        <div style={{ marginTop: 40, fontSize: 20, color: '#aaa' }}>
          zen-stroke.vercel.app
        </div>
      </div>
    ),
    { ...size }
  );
}
