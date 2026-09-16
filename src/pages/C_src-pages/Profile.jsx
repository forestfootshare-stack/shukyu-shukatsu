import { Link } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { Avatar, PitchLines, ArrowIcon } from "../components/Visual";
import { useReveal } from "../components/Reveal";
import { Crumbs, Empty } from "../components/UI";

/* 競技歴タイムライン：スクロールで縦線が伸び、各項目が順に表示される（1回のみ） */
function Timeline({ history }) {
  const [ref, shown] = useReveal({ threshold: 0.12 });
  return (
    <div className={`timeline${shown ? " tl-in" : ""}`} ref={ref}>
      {history.filter((h) => h.team.trim()).map((h, i) => (
        <div key={i} className="tl-item">
          <span className="tl-stage">{h.stage}</span>
          <h4 className="tl-team">{h.team}</h4>
          <div className="row-wrap" style={{ marginBottom: 8 }}>
            {h.from && <span className="tag">{h.from} - {h.to || "在籍中"}</span>}
            {h.position && <span className="tag tag-blue">{h.position}</span>}
            {h.role && h.role !== "なし" && <span className="tag tag-green">{h.role}</span>}
          </div>
          {h.result && <p style={{ fontSize: 13.5, color: "var(--ink-2)" }}>{h.result}</p>}
        </div>
      ))}
    </div>
  );
}

function Block({ title, children }) {
  return (
    <div className="block">
      <h3>{title}</h3>
      {children}
    </div>
  );
}

function TagList({ items, cls = "tag-blue" }) {
  if (!items?.length) return <p className="muted">未設定です</p>;
  return (
    <div className="row-wrap">
      {items.map((t) => <span key={t} className={`tag ${cls}`}>{t}</span>)}
    </div>
  );
}

export default function Profile() {
  const { profile: p, user, profileDone } = useApp();

  if (!profileDone) {
    return (
      <div className="page">
        <div className="wrap wrap-narrow">
          <Empty
            title="プロフィールがまだ登録されていません"
            lead="競技歴を登録すると、企業がプロフィールを見られるようになります。3ステップで完了します。"
            actionTo="/profile/setup"
            actionLabel="プロフィールを登録する"
          />
        </div>
      </div>
    );
  }

  const first = (p.name || "").trim().charAt(0);
  const captainCount = p.history.filter((h) => ["キャプテン", "副キャプテン", "主将", "代表"].includes(h.role)).length;

  return (
    <div className="page-tight">
      <div className="wrap" style={{ maxWidth: 900 }}>
        <Crumbs items={[{ label: "マイページ", to: "/mypage" }, { label: "プロフィール" }]} />

        {/* ---------- ヘッダー ---------- */}
        <div className="pf-hero">
          <PitchLines />
          <div className="pf-hero-in">
            <Avatar size={104} toneName={p.photoTone} initial={first} radius="16px" />
            <div style={{ flex: 1, minWidth: 220 }}>
              <div className="row" style={{ gap: 8, marginBottom: 8 }}>
                <span className={`tag ${p.openToCompanies ? "tag-green" : ""}`}>
                  {p.openToCompanies ? "企業に公開中" : "非公開"}
                </span>
                <span className="tag tag-blue">{p.sport}</span>
              </div>
              {p.furigana && <span className="pf-furi">{p.furigana}</span>}
              <h1 className="pf-name">{p.name}</h1>
              <p className="pf-uni">
                {p.university} {p.faculty} / {p.gradYear}年卒業予定
                {p.pref ? ` / ${p.pref}在住` : ""}
              </p>
            </div>
          </div>

          <div className="pf-kv">
            <div><small>POSITION</small><b>{p.position || "-"}</b></div>
            <div><small>競技歴</small><b>{p.years || "-"}<span style={{ fontSize: 13 }}>年</span></b></div>
            <div><small>役職経験</small><b>{captainCount}<span style={{ fontSize: 13 }}>回</span></b></div>
            <div><small>所属チーム</small><b className="txt">{p.currentTeam || "-"}</b></div>
          </div>
        </div>

        <div className="row-between" style={{ margin: "20px 0 10px", gap: 12, flexWrap: "wrap" }}>
          <p className="muted">この内容が企業側に表示されます</p>
          <Link to="/profile/edit" className="btn btn-outline btn-sm">プロフィールを編集</Link>
        </div>

        {/* ---------- 競技歴タイムライン ---------- */}
        <div className="card card-pad" style={{ marginTop: 14 }}>
          <Block title="競技歴">
            <Timeline history={p.history} />
          </Block>

          {p.awards && (
            <Block title="大会実績">
              <p style={{ whiteSpace: "pre-wrap" }}>{p.awards}</p>
            </Block>
          )}

          <Block title="自己PR">
            <p style={{ whiteSpace: "pre-wrap" }}>{p.pr || "未入力です"}</p>
          </Block>

          {p.learned && (
            <Block title="サッカー・フットサルから学んだこと">
              <p style={{ whiteSpace: "pre-wrap" }}>{p.learned}</p>
            </Block>
          )}

          <Block title="希望する働き方">
            <div style={{ display: "grid", gap: 18 }}>
              <div>
                <span className="filter-label">希望業界</span>
                <TagList items={p.industries} />
              </div>
              <div>
                <span className="filter-label">希望職種</span>
                <TagList items={p.jobTypes} />
              </div>
              <div>
                <span className="filter-label">希望勤務地</span>
                <TagList items={p.locations} />
              </div>
              {p.values.length > 0 && (
                <div>
                  <span className="filter-label">企業選びで重視すること</span>
                  <TagList items={p.values} cls="tag-green" />
                </div>
              )}
            </div>
          </Block>
        </div>

        <div className="row" style={{ marginTop: 24, gap: 12, flexWrap: "wrap" }}>
          <Link to="/profile/edit" className="btn btn-primary">プロフィールを編集</Link>
          <Link to="/companies" className="btn btn-ghost">企業を探す <ArrowIcon /></Link>
        </div>

        <p className="tiny" style={{ marginTop: 20 }}>
          登録メールアドレス：{user?.email}
        </p>
      </div>
    </div>
  );
}
