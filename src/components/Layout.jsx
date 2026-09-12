import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { Logo, Avatar, BellIcon, CheckIcon, LineIcon, ArrowIcon } from "./Visual";
import Modal from "./Modal";

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
              <Link to="/login" className="btn btn-outline btn-sm desk">ログイン</Link>
              <Link to="/register" className="btn btn-primary btn-sm desk">新規登録</Link>
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

      {drawer && (
        <div className="drawer" id="mobile-drawer">
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
              <Link to="/register" className="btn btn-primary btn-lg">無料でプロフィール登録</Link>
              <Link to="/login" className="btn btn-outline">ログイン</Link>
              <button className="btn btn-line" onClick={() => { setDrawer(false); onOpenLine(); }}>
                <LineIcon /> 30分の無料相談を予約する
              </button>
            </div>
          )}
        </div>
      )}
    </header>
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
          </div>
        </div>
      </div>
      <div className="wrap">
        <div className="footer-bottom">
          <span>運営：FOREST FOOTBALL株式会社</span>
          <span>© 2026 FOREST FOOTBALL Inc.</span>
        </div>
      </div>
    </footer>
  );
}

/* ================================================================
   LINE 相談モーダル
   ページ読み込み時点では LINE への通信は発生しません。
   ユーザーがこのボタンを押した場合のみ遷移します。
   ================================================================ */
export function LineModal({ onClose }) {
  const items = ["就活の進め方", "自己分析", "業界分析", "企業紹介", "面接対策"];
  return (
    <Modal onClose={onClose} labelledBy="line-modal-title" wide>
      <div className="stack-20" style={{ display: "grid", gap: 20 }}>
        <div>
          <span className="row" style={{ gap: 10, marginBottom: 12 }}>
            <span className="line-fab-ic"><LineIcon size={22} /></span>
            <span className="tag tag-green">無料・選考ではありません</span>
          </span>
          <h2 id="line-modal-title" className="h-page" style={{ fontSize: 22 }}>
            キャリアアドバイザーに無料で相談できます
          </h2>
        </div>

        <p style={{ fontSize: 14, color: "var(--ink-2)", lineHeight: 1.85 }}>
          就活をまだ始めていない方でも大丈夫です。何から始めればいいかわからない、自分に合う企業を知りたい、
          自己分析を手伝ってほしい、業界について知りたい、面接対策をしたいなど、就活について気軽に相談できます。
          企業の選考ではありません。
        </p>

        <ul className="stack-8" style={{ display: "grid", gap: 8 }}>
          {items.map((t) => (
            <li key={t} className="line-check"><CheckIcon /> {t}</li>
          ))}
        </ul>

        <div className="meta-box">
          <div><small>相談時間</small><b>約30分</b></div>
          <div><small>料金</small><b>無料</b></div>
          <div><small>形式</small><b>オンライン可</b></div>
        </div>

        <div style={{ display: "grid", gap: 10 }}>
          <a className="btn btn-line btn-lg btn-block" href={LINE_URL} target="_blank" rel="noopener noreferrer">
            <LineIcon /> 公式LINEで相談する
          </a>
          <button className="btn btn-ghost btn-block" onClick={onClose}>あとで相談する</button>
        </div>

        <p className="tiny" style={{ textAlign: "center" }}>
          ボタンを押すと LINE アプリまたは LINE の Web ページが開きます。
        </p>
      </div>
    </Modal>
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
      <main id="main">{children}</main>
      <Footer />
      <LineFab onOpen={() => setLineOpen(true)} hidden={fabHidden} onHide={() => setFabHidden(true)} />
      {lineOpen && <LineModal onClose={() => setLineOpen(false)} />}
      {toast && <div className="toast" role="status"><CheckIcon /> {toast}</div>}
    </>
  );
}

export const openLineModal = () => window.dispatchEvent(new Event("open-line-modal"));
