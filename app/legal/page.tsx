export default function LegalPage() {
  const rows = [
    ["販売業者", "ポッコリラボ"],
    ["運営責任者", "ポッコリラボ 代表 新美"],
    ["所在地", "〒475-0077 愛知県半田市元山町"],
    ["お問い合わせ", "X(Twitter) @levona_design へのDDM"],
    ["サービス内容", "ZEN STROKE 毎日書道チャレンジ（無料Webアプリ）"],
    ["提供時期", "申込み後即時提供"],
  ];
  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "32px 16px", fontFamily: "Noto Serif JP, serif", background: "var(--washi)", minHeight: "100vh" }}>
      <h1 style={{ fontSize: "1.4rem", fontWeight: 700, marginBottom: "24px" }}>特定商取引法に基づく表記</h1>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.9rem" }}>
        <tbody>
          {rows.map(([key, val]) => (
            <tr key={key} style={{ borderBottom: "1px solid rgba(0,0,0,0.08)" }}>
              <td style={{ padding: "10px 0", fontWeight: 700, width: "40%", verticalAlign: "top" }}>{key}</td>
              <td style={{ padding: "10px 0", color: "#555" }}>{val}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}