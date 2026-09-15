/* ------------------------------------------------------------------
   ビジュアル部品
   すべてインラインSVG / CSSで生成しています。
   外部サイトの画像を読み込む箇所は一つもありません（仕様書 ■5）。
   写真を差し替える場合は public/ に配置し、各コンポーネントの
   SVGを <img src="/..." /> に置き換えてください。
------------------------------------------------------------------- */

const TONES = {
  blue:  { a: "#1668e3", b: "#63a4f4", bg: "#e8f1fd" },
  green: { a: "#14b16b", b: "#6ddca8", bg: "#e4f7ee" },
  amber: { a: "#e9922c", b: "#f6c179", bg: "#fdf1e1" },
  navy:  { a: "#0e2233", b: "#4a6b85", bg: "#e6edf3" },
};
export const tone = (t) => TONES[t] || TONES.blue;

/* ---------------- ブランドロゴ ---------------- */
export function Logo({ size = 30, mono = false }) {
  const c = mono ? "#ffffff" : "#1668e3";
  const c2 = mono ? "rgba(255,255,255,.5)" : "#14b16b";
  return (
    <span className="brand" aria-label="蹴球就活">
      <svg width={size} height={size} viewBox="0 0 40 40" aria-hidden="true">
        <rect width="40" height="40" rx="9" fill={c} />
        {/* ボールの五角形を抽象化しつつ、右上を切り欠いて「上昇」を示す */}
        <circle cx="20" cy="21" r="10.5" fill="none" stroke="#fff" strokeWidth="2" />
        <path d="M20 14.5l4.6 3.4-1.8 5.5h-5.6l-1.8-5.5z" fill="#fff" />
        <path d="M26 8.5h7v7" fill="none" stroke={c2} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span className="brand-text">
        <b>蹴球就活</b>
        <em>SHUKYU SHUKATSU</em>
      </span>
    </span>
  );
}

/* ---------------- ピッチライン背景 ---------------- */
export function PitchLines({ opacity = 0.5 }) {
  return (
    <svg className="pitch-lines" viewBox="0 0 1200 560" preserveAspectRatio="xMidYMid slice" aria-hidden="true" style={{ opacity }}>
      <defs>
        <linearGradient id="pl-fade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1668e3" stopOpacity=".22" />
          <stop offset="100%" stopColor="#1668e3" stopOpacity="0" />
        </linearGradient>
      </defs>
      <g fill="none" stroke="url(#pl-fade)" strokeWidth="1.5">
        <circle cx="600" cy="270" r="132" />
        <path d="M600 60v420" />
        <rect x="-120" y="130" width="260" height="280" rx="2" />
        <rect x="-120" y="205" width="120" height="130" rx="2" />
        <rect x="1060" y="130" width="260" height="280" rx="2" />
        <rect x="1200" y="205" width="120" height="130" rx="2" />
      </g>
    </svg>
  );
}

/* ---------------- アバター（抽象シルエット） ----------------
   実写風のAI生成人物は使いません。差し替え前提のプレースホルダです。 */
export function Avatar({ size = 56, toneName = "blue", initial = "", radius = "50%" }) {
  const t = tone(toneName);
  const id = `av-${toneName}-${size}`;
  return (
    <span className="avatar" style={{ width: size, height: size, borderRadius: radius }}>
      <svg viewBox="0 0 100 100" width={size} height={size} aria-hidden="true">
        <defs>
          <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={t.b} />
            <stop offset="100%" stopColor={t.a} />
          </linearGradient>
        </defs>
        <rect width="100" height="100" fill={t.bg} />
        <circle cx="50" cy="38" r="17" fill={`url(#${id})`} />
        <path d="M12 100c0-21 17-33 38-33s38 12 38 33z" fill={`url(#${id})`} />
      </svg>
      {initial ? <span className="avatar-initial" style={{ fontSize: size * 0.34 }}>{initial}</span> : null}
    </span>
  );
}

/* ---------------- 企業ロゴマーク ---------------- */
export function CompanyLogo({ text, color = "#1668e3", size = 52, radius = 10 }) {
  return (
    <span
      className="co-logo"
      style={{ width: size, height: size, borderRadius: radius, background: color, fontSize: size * 0.36 }}
      aria-hidden="true"
    >
      {text}
    </span>
  );
}

/* ---------------- 記事・イベント・チームのサムネイル ----------------
   幾何学パターンで生成。同じ写真の使い回しに見えないよう、
   seed によってパターンを変化させます。 */
export function Thumb({ toneName = "blue", seed = 0, label, ratio = "16 / 9", kind = "wave" }) {
  const t = tone(toneName);
  const gid = `th-${toneName}-${seed}-${kind}`;
  const shift = (seed % 5) * 22;

  return (
    <div className="thumb" style={{ aspectRatio: ratio, background: t.bg }}>
      <svg viewBox="0 0 320 180" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <defs>
          <linearGradient id={gid} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={t.a} />
            <stop offset="100%" stopColor={t.b} />
          </linearGradient>
        </defs>
        {kind === "wave" && (
          <>
            <rect width="320" height="180" fill={t.bg} />
            <path d={`M-20 ${120 - shift}C60 ${80 - shift} 120 ${150 - shift} 200 ${110 - shift}S320 ${70 - shift} 360 ${100 - shift}V200H-20Z`} fill={`url(#${gid})`} opacity=".9" />
            <circle cx={250 - shift} cy={48 + shift / 2} r="30" fill="none" stroke={t.a} strokeWidth="1.6" opacity=".45" />
          </>
        )}
        {kind === "grid" && (
          <>
            <rect width="320" height="180" fill={t.bg} />
            <g opacity=".85">
              {[0, 1, 2, 3].map((i) => (
                <rect key={i} x={16 + i * 78} y={30 + ((i + seed) % 3) * 22} width="60" height={110 - ((i + seed) % 3) * 22} rx="5" fill={`url(#${gid})`} opacity={0.35 + i * 0.18} />
              ))}
            </g>
          </>
        )}
        {kind === "pitch" && (
          <>
            <rect width="320" height="180" fill={`url(#${gid})`} />
            <g fill="none" stroke="#fff" strokeWidth="1.4" opacity=".55">
              <circle cx="160" cy="90" r="42" />
              <path d="M160 0v180" />
              <rect x="-40" y="40" width="80" height="100" />
              <rect x="280" y="40" width="80" height="100" />
            </g>
          </>
        )}
        {kind === "arc" && (
          <>
            <rect width="320" height="180" fill={t.bg} />
            <g fill="none" stroke={`url(#${gid})`} strokeWidth="14" strokeLinecap="round" opacity=".8">
              <path d={`M20 ${168 - shift / 2}A140 140 0 0 1 300 ${168 - shift / 2}`} />
              <path d={`M64 ${168 - shift / 2}A96 96 0 0 1 256 ${168 - shift / 2}`} opacity=".55" />
            </g>
          </>
        )}
      </svg>
      {label ? <span className="thumb-label">{label}</span> : null}
    </div>
  );
}

/* ---------------- 通知ベル ---------------- */
export function BellIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 3a6 6 0 0 0-6 6c0 4.2-1.2 5.6-1.8 6.3-.4.4-.1 1.2.5 1.2h14.6c.6 0 .9-.8.5-1.2-.6-.7-1.8-2.1-1.8-6.3a6 6 0 0 0-6-6Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      <path d="M9.5 19.5a2.6 2.6 0 0 0 5 0" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

export function HeartIcon({ filled, size = 19 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} aria-hidden="true">
      <path d="M12 20.3s-7.4-4.6-7.4-9.6A4.2 4.2 0 0 1 12 8.2a4.2 4.2 0 0 1 7.4 2.5c0 5-7.4 9.6-7.4 9.6Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
    </svg>
  );
}

export function CheckIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4.5 12.5l5 5 10-11" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ArrowIcon({ size = 16, dir = "right" }) {
  const rot = { right: 0, left: 180, up: -90, down: 90 }[dir] || 0;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={{ transform: `rotate(${rot}deg)` }} aria-hidden="true">
      <path d="M5 12h13M12.5 5.5L19 12l-6.5 6.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function SearchIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="1.9" />
      <path d="M16 16l4.5 4.5" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
    </svg>
  );
}

export function LineIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 3.2c-5 0-9 3.2-9 7.2 0 3.6 3.2 6.6 7.5 7.1.3.1.7.2.8.5.1.3.1.7 0 1l-.1.8c0 .2-.2.9.8.5s5.4-3.2 7.4-5.5c1.3-1.4 1.9-2.9 1.9-4.4 0-4-4-7.2-9.3-7.2Zm-3.6 9.5H6.6c-.2 0-.4-.2-.4-.4V9c0-.2.2-.4.4-.4s.4.2.4.4v3h1.4c.2 0 .4.2.4.4s-.2.3-.4.3Zm1.6-.4c0 .2-.2.4-.4.4s-.4-.2-.4-.4V9c0-.2.2-.4.4-.4s.4.2.4.4v3.3Zm3.9 0c0 .2-.1.3-.3.4h-.1c-.1 0-.2-.1-.3-.2L11.8 10v2.3c0 .2-.2.4-.4.4s-.4-.2-.4-.4V9c0-.2.1-.3.3-.4.1 0 .3 0 .4.2l1.4 1.9V9c0-.2.2-.4.4-.4s.4.2.4.4v3.3Zm2.6-2c.2 0 .4.2.4.4s-.2.4-.4.4h-1.4v.9h1.4c.2 0 .4.1.4.3s-.2.4-.4.4h-1.8c-.2 0-.4-.2-.4-.4V9c0-.2.2-.4.4-.4h1.8c.2 0 .4.2.4.4s-.2.4-.4.4h-1.4v.9h1.4Z" />
    </svg>
  );
}
