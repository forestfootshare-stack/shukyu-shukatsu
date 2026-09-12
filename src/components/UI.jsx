import { Link, useNavigate } from "react-router-dom";
import { CompanyLogo, Thumb, HeartIcon, ArrowIcon, CheckIcon } from "./Visual";
import { useApp } from "../context/AppContext";
import Modal from "./Modal";

/* ---------------- セクション見出し ---------------- */
export function SectionHead({ en, title, lead, align = "left", action }) {
  return (
    <div className={`sec-head${align === "center" ? " sec-head-c" : ""}`}>
      <div>
        {en && <span className="eyebrow">{en}</span>}
        <h2 className="h-sec">{title}</h2>
        {lead && <p className="lead" style={{ marginTop: 12 }}>{lead}</p>}
      </div>
      {action}
    </div>
  );
}

/* ---------------- SAMPLE バッジ ----------------
   実在企業・団体との提携と誤解されないための明示 */
export function SampleBadge({ text = "SAMPLE" }) {
  return <span className="sample-badge">{text}</span>;
}

/* ---------------- 企業カード ---------------- */
export function CompanyCard({ c, showFav = true }) {
  const { isFavorite, toggleFavorite, isAuthed, setToast } = useApp();
  const nav = useNavigate();
  const fav = isFavorite(c.id);

  const onFav = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isAuthed) { nav("/login?next=/companies"); return; }
    toggleFavorite(c.id);
    setToast(fav ? "お気に入りから外しました" : "お気に入りに追加しました");
  };

  return (
    <Link to={`/companies/${c.id}`} className="card card-link co-card">
      <div className="co-card-top">
        <CompanyLogo text={c.logoText} color={c.logoColor} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div className="row" style={{ gap: 7, marginBottom: 3 }}>
            <span className="co-industry">{c.industry}</span>
            {c.isSample && <SampleBadge />}
          </div>
          <h3 className="co-name">{c.name}</h3>
        </div>
        {showFav && (
          <button
            className={`fav-btn${fav ? " on" : ""}`}
            onClick={onFav}
            aria-label={fav ? "お気に入りから外す" : "お気に入りに追加"}
            aria-pressed={fav}
          >
            <HeartIcon filled={fav} />
          </button>
        )}
      </div>

      <p className="co-tagline">{c.tagline}</p>

      <dl className="co-meta">
        <div><dt>勤務地</dt><dd>{c.locations.join(" / ")}</dd></div>
        <div><dt>募集職種</dt><dd>{c.jobs.join(" / ")}</dd></div>
      </dl>

      <div className="row-wrap">
        {c.tags.slice(0, 3).map((t) => (
          <span key={t} className={`tag ${t.includes("サッカー") ? "tag-green" : t.includes("体育会") ? "tag-blue" : ""}`}>{t}</span>
        ))}
      </div>
    </Link>
  );
}

/* ---------------- 記事カード ---------------- */
export function InterviewCard({ a, i = 0 }) {
  return (
    <Link to={`/interviews/${a.id}`} className="card card-link art-card">
      <Thumb toneName={a.tone} seed={i} kind={["wave", "grid", "arc", "pitch"][i % 4]} />
      <div className="art-body">
        <div className="row" style={{ gap: 8, marginBottom: 9 }}>
          <span className="tag tag-blue">{a.category}</span>
          <span className="muted">{a.date}</span>
        </div>
        <h3 className="art-title">{a.title}</h3>
        <p className="art-ex">{a.excerpt}</p>
        <span className="muted" style={{ marginTop: 12, display: "block" }}>約{a.readMin}分で読めます</span>
      </div>
    </Link>
  );
}

/* ---------------- イベントカード ---------------- */
export function EventCard({ e, i = 0 }) {
  const open = e.status === "募集中";
  return (
    <Link to={`/events/${e.id}`} className="card card-link art-card">
      <Thumb toneName={e.tone} seed={i + 2} kind={i % 2 ? "pitch" : "arc"} label={e.area} />
      <div className="art-body">
        <div className="row" style={{ gap: 8, marginBottom: 9 }}>
          <span className={`tag ${open ? "tag-green" : ""}`}>{e.status}</span>
          <span className="tag">{e.fee}</span>
        </div>
        <h3 className="art-title">{e.name}</h3>
        <dl className="co-meta" style={{ marginTop: 12 }}>
          <div><dt>開催日</dt><dd>{e.date}</dd></div>
          <div><dt>会場</dt><dd>{e.venue}</dd></div>
          <div><dt>対象</dt><dd>{e.target}</dd></div>
        </dl>
      </div>
    </Link>
  );
}

/* ---------------- 未ログイン時の認証ゲートモーダル ----------------
   企業応募（仕様 ■22）とスカウト受付（仕様 ■23）で使い分けます。 */
export function AuthGateModal({ onClose, next, variant = "apply", companyName }) {
  const nav = useNavigate();
  const go = (path) => nav(`${path}?next=${encodeURIComponent(next)}`);

  const copy = variant === "scout"
    ? {
        title: "競技経験を登録して企業からスカウトを受け取ろう",
        lead: "プロフィール登録は無料です。競技歴や役割を登録しておくと、それを見た企業から直接スカウトが届きます。",
        cta: "無料でプロフィール登録",
      }
    : {
        title: "応募にはアカウントが必要です",
        lead: companyName
          ? `${companyName}への応募には、プロフィールの登録が必要です。登録は無料で、完了後はこのページに戻ります。`
          : "応募にはプロフィールの登録が必要です。登録は無料で、完了後は元のページに戻ります。",
        cta: "無料で新規登録",
      };

  return (
    <Modal onClose={onClose} labelledBy="gate-title">
      <div style={{ display: "grid", gap: 18 }}>
        <h2 id="gate-title" className="h-page" style={{ fontSize: 20 }}>{copy.title}</h2>
        <p style={{ fontSize: 14, color: "var(--ink-2)", lineHeight: 1.85 }}>{copy.lead}</p>

        {variant === "scout" && (
          <ul style={{ display: "grid", gap: 8 }}>
            {["競技歴・ポジション・役職を登録", "企業から直接スカウトが届く", "受け取りはいつでもオフにできる"].map((t) => (
              <li key={t} className="line-check"><CheckIcon /> {t}</li>
            ))}
          </ul>
        )}

        <button className="btn btn-primary btn-lg btn-block" onClick={() => go("/register")}>
          {copy.cta}
        </button>

        <div className="or-line">すでに登録済みの方</div>

        <button className="btn btn-outline btn-block" onClick={() => go("/login")}>ログイン</button>
      </div>
    </Modal>
  );
}

/* ---------------- 空状態 ---------------- */
export function Empty({ title, lead, actionTo, actionLabel }) {
  return (
    <div className="empty">
      <h3 style={{ fontSize: 17, marginBottom: 8 }}>{title}</h3>
      <p className="lead" style={{ margin: "0 auto 20px", fontSize: 14 }}>{lead}</p>
      {actionTo && <Link to={actionTo} className="btn btn-primary">{actionLabel}</Link>}
    </div>
  );
}

/* ---------------- パンくず ---------------- */
export function Crumbs({ items }) {
  return (
    <nav className="crumbs" aria-label="パンくずリスト">
      {items.map((it, i) => (
        <span key={i}>
          {it.to ? <Link to={it.to}>{it.label}</Link> : <span aria-current="page">{it.label}</span>}
          {i < items.length - 1 && <ArrowIcon size={13} />}
        </span>
      ))}
    </nav>
  );
}
