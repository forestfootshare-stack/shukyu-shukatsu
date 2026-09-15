import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { Logo, Avatar, BellIcon, CheckIcon, LineIcon, ArrowIcon } from "./Visual";

export const LINE_URL = "https://lin.ee/xK4hg63";

const NAV = [
  { to: "/companies", label: "企業を探す" },
  { to: "/interviews", label: "インタビュー" },
  { to: "/events", label: "イベント" },
  { to: "/about", label: "蹴球就活とは" },
];

/* ================================================================
   Header
   ================================================================ */
function Header({ onOpenLine }) {
  const { isAuthed, user, profile, unreadScouts, signOut } = useApp();
  const [drawer, setDrawer] = useState(false);
  const [menu, setMenu] = useState(false);
  const menuRef = useRef(null);
  const loc = useLocation();
  const nav = useNavigate();

  useEffect(() => { setDrawer(false); setMenu(false); }, [loc.pathname]);

  useEffect(() => {
    document.body.style.overflow = drawer ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [drawer]);

  useEffect(() => {
    if (!menu) return;
    const h = (e) => { if (menuRef.current && !menuRef.current.contains(e.target)) setMenu(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, [menu]);

  const doSignOut = () => { signOut(); nav("/"); };
  const firstChar = (user?.name || "").trim().charAt(0);

  return (
    <>
    <header className="header">
      <div className="header-in">
        <Link to="/" aria-label="蹴球就活 トップページ"><Logo /></Link>

        <nav className="nav" aria-label="メインナビゲーション">
          {NAV.map((n) => (
            <NavLink key={n.to} to={n.to} className={({ isActive }) => (isActive ? "on" : "")}>
              {n.label}
            </NavLink>
          ))}
        </nav>

        <div className="header-actions">
          {isAuthed ? (
            <>
              <Link to="/scouts" className="icon-btn" aria-label={`届いたスカウト${unreadScouts ? `（未読${unreadScouts}件）` : ""}`}>
                <BellIcon />
                {unreadScouts > 0 && <span className="dot">{unreadScouts}</span>}
              </Link>
              <div className="menu-anchor desk" ref={menuRef}>
                <button className="user-btn" onClick={() => setMenu((v) => !v)} aria-expanded={menu} aria-haspopup="true">
                  <Avatar size={32} toneName={profile.photoTone} initial={firstChar} />
                  <b>{user.name}</b>
                </button>
                {menu && (
                  <div className="user-menu" role="menu">
                    <div className="user-menu-head">
                      <b style={{ fontSize: 14 }}>{user.name}</b>
                      <div className="tiny" style={{ wordBreak: "break-all" }}>{user.email}</div>
                    </div>
                    <Link to="/mypage" role="menuitem">マイページ</Link>
                    <Link to="/profile" role="menuitem">プロフィール</Link>
                    <Link to="/scouts" role="menuitem">
                      届いたスカウト {unreadScouts > 0 && <span className="tag tag-amber">{unreadScouts}</span>}
                    </Link>
                    <Link to="/applications" role="menuitem">応募した企業</Link>
                    <Link to="/settings" role="menuitem">アカウント設定</Link>
                    <button className="out" onClick={doSignOut} role="menuitem">ログアウト</button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-outline btn-sm hd-login">ログイン</Link>
              <Link to="/register" className="btn btn-primary btn-sm hd-signup">
                <span className="hd-long">無料で新規登録</span>
                <span className="hd-short">無料登録</span>
              </Link>
            </>
          )}

          <button
            className="burger"
            aria-expanded={drawer}
            aria-label={drawer ? "メニューを閉じる" : "メニューを開く"}
            onClick={() => setDrawer((v) => !v)}
          >
            <span /><span /><span />
          </button>
        </div>
      </div>

      </header>

      {drawer && (
        <div className="drawer" id="mobile-drawer">
          {!isAuthed && (
            <div className="drawer-top">
              <Link to="/register" className="btn btn-primary btn-lg btn-block">無料で新規登録</Link>
              <Link to="/login" className="btn btn-outline btn-block">ログイン</Link>
              <p className="tiny" style={{ textAlign: "center", marginTop: 2 }}>
                登録は無料です。1分で完了します。
              </p>
            </div>
          )}

          {isAuthed && (
            <div className="row" style={{ gap: 12, paddingBottom: 18, borderBottom: "1px solid var(--line)" }}>
              <Avatar size={46} toneName={profile.photoTone} initial={firstChar} />
              <div>
                <b style={{ fontSize: 15 }}>{user.name}</b>
                <div className="tiny">{user.university || "大学名未設定"}</div>
              </div>
            </div>
          )}

          <p className="drawer-sec">SERVICE</p>
          {NAV.map((n) => (
            <Link key={n.to} to={n.to}>{n.label}<ArrowIcon /></Link>
          ))}
          <Link to="/consult">就活相談<ArrowIcon /></Link>

          {isAuthed ? (
            <>
              <p className="drawer-sec">MY PAGE</p>
              <Link to="/mypage">マイページ<ArrowIcon /></Link>
              <Link to="/profile">プロフィール<ArrowIcon /></Link>
              <Link to="/scouts">
                届いたスカウト
                <span className="row" style={{ gap: 8 }}>
                  {unreadScouts > 0 && <span className="tag tag-amber">{unreadScouts}</span>}
                  <ArrowIcon />
                </span>
              </Link>
              <Link to="/applications">応募した企業<ArrowIcon /></Link>
              <Link to="/favorites">お気に入り企業<ArrowIcon /></Link>
              <Link to="/settings">アカウント設定<ArrowIcon /></Link>
              <div className="drawer-cta">
                <button className="btn btn-line" onClick={() => { setDrawer(false); onOpenLine(); }}>
                  <LineIcon /> 30分の無料相談を予約する
                </button>
                <button className="btn btn-ghost" onClick={doSignOut}>ログアウト</button>
              </div>
            </>
          ) : (
            <div className="drawer-cta">
              <button className="btn btn-line" onClick={() => { setDrawer(false); onOpenLine(); }}>
                <LineIcon /> 30分の無料相談を予約する
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
}

/* ================================================================
   Footer
   ================================================================ */
function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-grid">
          <div>
            <Logo mono />
            <p className="footer-note">
              サッカー・フットサルの経験を、就活の強みに。<br />
              競技歴をプロフィールにして、企業からのスカウトと自分からの応募、
              就活相談までをひとつにまとめたサービスです。
            </p>
          </div>
          <div>
            <h4>SERVICE</h4>
            <ul>
              <li><Link to="/about">蹴球就活とは</Link></li>
              <li><Link to="/companies">企業を探す</Link></li>
              <li><Link to="/interviews">インタビュー</Link></li>
              <li><Link to="/events">イベント</Link></li>
              <li><Link to="/consult">就活相談</Link></li>
            </ul>
          </div>
          <div>
            <h4>ABOUT</h4>
            <ul>
              <li><Link to="/terms">利用規約</Link></li>
              <li><Link to="/privacy">プライバシーポリシー</Link></li>
              <li><Link to="/contact">お問い合わせ</Link></li>
            </ul>

            <h4 style={{ marginTop: 26 }}>FOR COMPANIES</h4>
            <ul>
              <li>
                <Link to="/for-companies" className="footer-biz">
                  採用担当者の方はこちら <ArrowIcon size={13} />
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="wrap">
        <div className="footer-bottom">
          <span>運営：FOREST FOOTBALL株式会社</span>
          <span>© 2026 FOREST FOOTBALL Inc. <span className="ver">v5</span></span>
        </div>
      </div>
    </footer>
  );
}

/* ================================================================
   相談モーダル
   サービスの主要コンバージョンUIとして設計しています。
   ページ読み込み時点では LINE への通信は発生しません。
   ユーザーがCTAを押した場合のみ遷移します。
   ================================================================ */

/* アドバイザー写真の枠。
   実写に差し替える場合は public/images/advisor.jpg を置いて、
   この関数の中身を <img src="/images/advisor.jpg" alt="" /> に変えてください。 */
function AdvisorVisual() {
  return (
    <span className="cs-photo-fig" aria-hidden="true">
      <svg viewBox="0 0 244 620" preserveAspectRatio="xMidYMax slice">
        <defs>
          <linearGradient id="cs-g" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#6ddca8" />
            <stop offset="100%" stopColor="#14b16b" />
          </linearGradient>
          <linearGradient id="cs-g2" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1668e3" stopOpacity=".16" />
            <stop offset="100%" stopColor="#1668e3" stopOpacity="0" />
          </linearGradient>
        </defs>
        <circle cx="122" cy="330" r="146" fill="url(#cs-g2)" />
        <circle cx="122" cy="320" r="74" fill="url(#cs-g)" />
        <path d="M-4 620c0-128 57-232 126-232s126 104 126 232z" fill="url(#cs-g)" />
      </svg>
    </span>
  );
}

export function LineModal({ onClose }) {
  const items = ["就活の進め方", "自己分析", "業界・企業選び", "企業紹介", "面接対策"];
  const ref = useRef(null);

  // Escape / 背景クリックで閉じる。開いている間は body のスクロールを止める。
  useEffect(() => {
    const prev = document.activeElement;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e) => {
      if (e.key === "Escape") { onClose(); return; }
      if (e.key !== "Tab" || !ref.current) return;
      const f = ref.current.querySelectorAll('a[href], button:not([disabled])');
      if (!f.length) return;
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    document.addEventListener("keydown", onKey);
    const t = setTimeout(() => ref.current?.focus(), 320);

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      clearTimeout(t);
      if (prev instanceof HTMLElement) prev.focus();
    };
  }, [onClose]);

  return (
    <div className="cs-back" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="cs-modal" role="dialog" aria-modal="true" aria-labelledby="cs-title" ref={ref} tabIndex={-1}>
        <button className="cs-x" onClick={onClose} aria-label="閉じる">×</button>

        <div className="cs-grid">
          <div className="cs-photo">
            <AdvisorVisual />
            <span className="cs-photo-cap">
              <b>キャリアアドバイザー</b>
              <small>FOREST FOOTBALL株式会社</small>
            </span>
          </div>

          <div className="cs-body">
            <span className="cs-eyebrow">CAREER SUPPORT</span>
            <h2 id="cs-title" className="cs-title">
              就活のこと、30分だけ<br />話してみませんか？
            </h2>

            <p className="cs-lead">
              FOREST FOOTBALLのキャリアアドバイザーが、就活の進め方から自己分析、
              企業選び、面接対策まで無料で相談に乗ります。
              「まだ何も始めていない」という段階でも大丈夫です。
            </p>

            <div className="cs-meta">
              <div><b>約30分</b><small>所要時間</small></div>
              <div><b>相談無料</b><small>学生は費用なし</small></div>
              <div><b>オンラインOK</b><small>どこからでも</small></div>
            </div>

            <ul className="cs-list">
              {items.map((t) => (
                <li key={t}><CheckIcon size={16} /> {t}</li>
              ))}
            </ul>

            <div className="cs-cta">
              <a className="btn btn-line btn-lg btn-block" href={LINE_URL} target="_blank" rel="noopener noreferrer">
                <LineIcon /> LINEで無料相談を予約する
              </a>
              <button className="btn btn-ghost btn-block" onClick={onClose}>あとで相談する</button>
            </div>

            <p className="cs-safe">
              選考ではありません。相談だけでもOKです。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ================================================================
   固定 CTA（PC右下 / スマホ下部）
   ================================================================ */
function LineFab({ onOpen, hidden, onHide }) {
  if (hidden) return null;
  return (
    <div className="line-fab">
      <button className="line-fab-x" onClick={onHide} aria-label="相談バナーを閉じる">×</button>
      <span className="line-fab-ic" aria-hidden="true"><LineIcon size={21} /></span>
      <button
        onClick={onOpen}
        style={{ background: "none", border: "none", padding: 0, textAlign: "left", flex: 1 }}
      >
        <b>就活で困ったら</b>
        <small>キャリアアドバイザーに30分無料相談</small>
      </button>
    </div>
  );
}

/* ================================================================
   Layout
   ================================================================ */
export default function Layout({ children }) {
  const [lineOpen, setLineOpen] = useState(false);
  const [fabHidden, setFabHidden] = useState(false);
  const { toast } = useApp();
  const loc = useLocation();

  useEffect(() => { window.scrollTo(0, 0); }, [loc.pathname]);

  // 他のページからモーダルを開けるようにする（ヒーローの「30分無料相談」等）
  useEffect(() => {
    const open = () => setLineOpen(true);
    window.addEventListener("open-line-modal", open);
    return () => window.removeEventListener("open-line-modal", open);
  }, []);

  return (
    <>
      <a className="skip-link" href="#main">本文へスキップ</a>
      <Header onOpenLine={() => setLineOpen(true)} />
      <main id="main" key={loc.pathname} className="page-fade">{children}</main>
      <Footer />
      <LineFab onOpen={() => setLineOpen(true)} hidden={fabHidden} onHide={() => setFabHidden(true)} />
      {lineOpen && <LineModal onClose={() => setLineOpen(false)} />}
      {toast && <div className="toast" role="status"><CheckIcon /> {toast}</div>}
    </>
  );
}

export const openLineModal = () => window.dispatchEvent(new Event("open-line-modal"));
