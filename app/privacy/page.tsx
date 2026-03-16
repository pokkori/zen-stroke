export default function PrivacyPage() {
  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "32px 16px", fontFamily: "Noto Serif JP, serif", background: "var(--washi)", minHeight: "100vh" }}>
      <h1 style={{ fontSize: "1.4rem", fontWeight: 700, marginBottom: "24px" }}>プライバシーポリシー</h1>
      <div style={{ fontSize: "0.9rem", lineHeight: 1.8, color: "#444" }}>
        <p style={{ marginBottom: "16px" }}>ポッコリラボ（以下「当社」）は、ZEN STROKEにおける個人情報の取扱いについて、以下の通りプライバシーポリシーを定めます。</p>
        <h2 style={{ fontWeight: 700, marginBottom: "8px" }}>1. 収集する情報</h2>
        <p style={{ marginBottom: "16px" }}>本サービスはサーバーへの個人情報送信を行いません。書道スコアや連続記録はすべてお客様のブラウザ（localStorage）に保存されます。</p>
        <h2 style={{ fontWeight: 700, marginBottom: "8px" }}>2. Cookieの使用</h2>
        <p style={{ marginBottom: "16px" }}>本サービスはCookieを使用しません。</p>
        <h2 style={{ fontWeight: 700, marginBottom: "8px" }}>3. 第三者提供</h2>
        <p style={{ marginBottom: "16px" }}>個人情報を第三者に提供することはありません。</p>
        <h2 style={{ fontWeight: 700, marginBottom: "8px" }}>4. お問い合わせ</h2>
        <p>X(Twitter) @levona_design へのDDMにてご連続ください。</p>
        <p style={{ marginTop: "24px", color: "#888" }}>2026年3月16日 制定</p>
      </div>
    </div>
  );
}