import { Link, NavLink, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { getCompany } from "../data/companies";
import { PitchLines, CompanyLogo, ArrowIcon, LineIcon, BellIcon } from "../components/Visual";
import { Empty, SampleBadge } from "../components/UI";
import { openLineModal } from "../components/Layout";

const MENU = [
  { to: "/profile", label: "プロフィールを見る" },
  { to: "/profile/edit", label: "プロフィールを編集" },
  { to: "/scouts", label: "届いたスカウト", badge: "scouts" },
  { to: "/applications", label: "応募した企業", badge: "apps" },
  { to: "/favorites", label: "お気に入り企業", badge: "favs" },
  { to: "/events", label: "イベント" },
  { to: "/consult", label: "就活相談" },
  { to: "/settings", label: "アカウント設定" },
];

export function MyNav() {
  const { unreadScouts, applications, favorites, signOut } = useApp();
  const nav = useNavigate();
  const counts = { scouts: unreadScouts, apps: applications.length, favs: favorites.length };

  return (
    <nav className="my-nav" aria-label="マイページメニュー">
      {MENU.map((m) => (
        <NavLink key={m.to} to={m.to} end className={({ isActive }) => (isActive ? "on" : "")}>
          {m.label}
          <span className="row" style={{ gap: 7 }}>
            {m.badge && counts[m.badge] > 0 && (
              <span className={`tag ${m.badge === "scouts" ? "tag-amber" : ""}`}>{counts[m.badge]}</span>
            )}
            <ArrowIcon size={14} />
          </span>
        </NavLink>
      ))}
      <button className="out" onClick={() => { signOut(); nav("/"); }}>
        ログアウト <ArrowIcon size={14} />
      </button>
    </nav>
  );
}

export default function MyPage() {
  const { user, profile, profileDone, completion, myScouts, applications, favorites } = useApp();
  const unread = myScouts.filter((s) => !s.read);

  return (
    <div className="page-tight">
      <div className="wrap">
        <div className="my-layout">
          <MyNav />

          <div style={{ display: "grid", gap: 24 }}>
            {/* ---------- ウェルカム + 完成度 ---------- */}
            <div className="welcome-card">
              <PitchLines opacity={0.3} />
              <h1>こんにちは、{user?.name} さん</h1>
              <p style={{ color: "rgba(255,255,255,.82)", marginTop: 8, fontSize: 14 }}>
                {profileDone
                  ? "プロフィールは公開中です。内容が充実しているほど、企業の目に留まりやすくなります。"
                  : "まずはプロフィールを登録しましょう。3ステップで完了します。"}
              </p>

              <div className="prog-box">
                <div className="row-between" style={{ marginBottom: 9 }}>
                  <b style={{ fontSize: 13 }}>プロフィール完成度</b>
                  <b style={{ fontFamily: "var(--f-num)", fontSize: 22 }}>{completion}%</b>
                </div>
                <div className="progress-track">
                  <div className="progress-fill" style={{ width: `${completion}%` }} />
                </div>
                <Link
                  to={profileDone ? "/profile/edit" : "/profile/setup"}
                  className="btn btn-ghost btn-sm"
                  style={{ marginTop: 14 }}
                >
                  {completion === 100 ? "プロフィールを編集する" : "プロフィールを充実させる"} <ArrowIcon size={14} />
                </Link>
              </div>
            </div>

            {/* ---------- 概況 ---------- */}
            <div className="grid-3" style={{ gap: 14 }}>
              {[
                { n: unread.length, label: "未読のスカウト", to: "/scouts" },
                { n: applications.length, label: "応募した企業", to: "/applications" },
                { n: favorites.length, label: "お気に入り企業", to: "/favorites" },
              ].map((s) => (
                <Link key={s.label} to={s.to} className="card card-link" style={{ padding: 20 }}>
                  <span className="stat-num">{s.n}</span>
                  <div className="muted" style={{ marginTop: 6 }}>{s.label}</div>
                </Link>
              ))}
            </div>

            {/* ---------- 届いたスカウト ---------- */}
            <div>
              <div className="row-between" style={{ marginBottom: 14 }}>
                <h2 style={{ fontSize: 18 }}>届いたスカウト</h2>
                <Link to="/scouts" className="link-blue" style={{ fontSize: 13 }}>すべて見る</Link>
              </div>

              {!profile.scoutOn && (
                <div className="notice" style={{ marginBottom: 14 }}>
                  スカウトの受け取りが現在オフになっています。
                  <Link to="/settings" className="link-blue">アカウント設定</Link> から変更できます。
                </div>
              )}

              {myScouts.length === 0 ? (
                <Empty title="まだスカウトは届いていません" lead="プロフィールを充実させると、企業の目に留まりやすくなります。" />
              ) : (
                <div style={{ display: "grid", gap: 10 }}>
                  {myScouts.slice(0, 2).map((s) => {
                    const c = getCompany(s.companyId);
                    return (
                      <Link key={s.id} to={`/scouts/${s.id}`} className={`card card-link scout-card${s.read ? "" : " unread"}`}>
                        <CompanyLogo text={c.logoText} color={c.logoColor} size={44} radius={9} />
                        <div style={{ minWidth: 0, flex: 1 }}>
                          <div className="row" style={{ gap: 7, flexWrap: "wrap" }}>
                            {!s.read && <span className="unread-pill">NEW</span>}
                            <b style={{ fontSize: 12.5 }}>{c.name}</b>
                            <SampleBadge />
                          </div>
                          <h3 className="scout-title">{s.title}</h3>
                          <p className="scout-ex">{s.message[0]}</p>
                          <span className="muted" style={{ marginTop: 6, display: "block" }}>{s.date}</span>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            {/* ---------- 応募した企業 ---------- */}
            <div>
              <div className="row-between" style={{ marginBottom: 14 }}>
                <h2 style={{ fontSize: 18 }}>応募した企業</h2>
                <Link to="/applications" className="link-blue" style={{ fontSize: 13 }}>すべて見る</Link>
              </div>
              {applications.length === 0 ? (
                <Empty
                  title="まだ応募した企業はありません"
                  lead="気になる企業を探して、応募してみましょう。"
                  actionTo="/companies"
                  actionLabel="企業を探す"
                />
              ) : (
                <div style={{ display: "grid", gap: 10 }}>
                  {applications.slice(0, 3).map((a) => {
                    const c = getCompany(a.companyId);
                    return (
                      <Link key={a.companyId} to={`/companies/${a.companyId}`} className="card card-link scout-card">
                        <CompanyLogo text={c.logoText} color={c.logoColor} size={44} radius={9} />
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div className="row" style={{ gap: 7 }}>
                            <b style={{ fontSize: 14 }}>{c.name}</b>
                            <SampleBadge />
                          </div>
                          <div className="muted">{a.positionTitle} / 応募日 {a.date}</div>
                        </div>
                        <span className="tag tag-blue">{a.status}</span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            {/* ---------- 相談導線 ---------- */}
            <div className="card card-pad" style={{ background: "var(--pitch-soft)", borderColor: "#c2ecd8" }}>
              <div className="row-between" style={{ flexWrap: "wrap", gap: 16 }}>
                <div style={{ minWidth: 220, flex: 1 }}>
                  <h2 style={{ fontSize: 17, marginBottom: 6 }}>就活について相談しませんか</h2>
                  <p style={{ fontSize: 13.5, color: "var(--ink-2)" }}>
                    キャリアアドバイザーに30分の無料相談ができます。企業の選考ではありません。
                  </p>
                </div>
                <button className="btn btn-line" onClick={openLineModal}>
                  <LineIcon /> LINEで相談する
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
