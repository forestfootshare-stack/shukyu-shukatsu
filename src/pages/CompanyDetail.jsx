import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { getCompany } from "../data/companies";
import { useApp } from "../context/AppContext";
import { CompanyLogo, PitchLines, HeartIcon, CheckIcon, ArrowIcon, LineIcon } from "../components/Visual";
import { Crumbs, SampleBadge, AuthGateModal } from "../components/UI";
import Modal from "../components/Modal";
import { openLineModal } from "../components/Layout";
import NotFound from "./NotFound";

const BAND = {
  blue: "linear-gradient(125deg,#1668e3 0%,#5aa2f5 100%)",
  green: "linear-gradient(125deg,#14b16b 0%,#67d9a5 100%)",
  amber: "linear-gradient(125deg,#e9922c 0%,#f5c47e 100%)",
  navy: "linear-gradient(125deg,#0e2233 0%,#3c6180 100%)",
};

export default function CompanyDetail() {
  const { id } = useParams();
  const c = getCompany(id);
  const nav = useNavigate();
  const { isAuthed, profileDone, apply, hasApplied, isFavorite, toggleFavorite, setToast } = useApp();

  const [gate, setGate] = useState(false);
  const [confirm, setConfirm] = useState(null); // 応募確認モーダル：選択した職種
  const [done, setDone] = useState(false);

  if (!c) return <NotFound />;

  const applied = hasApplied(c.id);
  const fav = isFavorite(c.id);

  /* 応募ボタン：未ログイン → 認証ゲート、ログイン済 → 確認モーダル */
  const onApply = (position) => {
    if (!isAuthed) { setGate(true); return; }
    if (!profileDone) {
      setToast("応募にはプロフィール登録が必要です");
      nav(`/profile/setup?next=${encodeURIComponent(`/companies/${c.id}`)}`);
      return;
    }
    setConfirm(position || c.positions[0]);
  };

  const confirmApply = () => {
    apply(c.id, confirm.title);
    setConfirm(null);
    setDone(true);
  };

  const onFav = () => {
    if (!isAuthed) { setGate(true); return; }
    toggleFavorite(c.id);
    setToast(fav ? "お気に入りから外しました" : "お気に入りに追加しました");
  };

  const ctaBox = (
    <div className="card card-pad" style={{ display: "grid", gap: 12 }}>
      {applied ? (
        <>
          <div className="row" style={{ gap: 9, color: "var(--pitch)", fontWeight: 700, fontSize: 14 }}>
            <CheckIcon /> 応募済みです
          </div>
          <Link to="/applications" className="btn btn-ghost btn-block">応募した企業を見る</Link>
        </>
      ) : (
        <button className="btn btn-primary btn-lg btn-block" onClick={() => onApply(null)}>
          この企業に応募する
        </button>
      )}
      <button className="btn btn-outline btn-block" onClick={openLineModal}>
        <LineIcon size={17} /> 話を聞いてみる
      </button>
      <button className={`btn btn-ghost btn-block${fav ? " on" : ""}`} onClick={onFav}
        style={fav ? { color: "var(--danger)", borderColor: "#f0c4c0" } : undefined}>
        <HeartIcon filled={fav} /> {fav ? "お気に入り済み" : "お気に入りに追加"}
      </button>
      <p className="tiny">
        「話を聞いてみる」は、キャリアアドバイザーへの相談窓口につながります。企業の選考ではありません。
      </p>
    </div>
  );

  return (
    <div className="page-tight">
      <div className="wrap">
        <Crumbs items={[{ label: "企業を探す", to: "/companies" }, { label: c.name }]} />

        {/* ---------- 企業ヘッダー ---------- */}
        <div className="co-hero">
          <div className="co-hero-band" style={{ background: BAND[c.heroTone] }}>
            <PitchLines opacity={0.55} />
          </div>
          <div className="co-hero-body">
            <div className="co-hero-logo" style={{ display: "inline-block" }}>
              <CompanyLogo text={c.logoText} color={c.logoColor} size={72} radius={12} />
            </div>
            <div className="row" style={{ gap: 8, marginTop: 12, flexWrap: "wrap" }}>
              <span className="tag tag-blue">{c.industry}</span>
              {c.isSample && <SampleBadge />}
            </div>
            <h1 className="h-page" style={{ marginTop: 10 }}>{c.name}</h1>
            <p className="lead" style={{ marginTop: 8 }}>{c.tagline}</p>
            <div className="row-wrap" style={{ marginTop: 16 }}>
              {c.tags.map((t) => (
                <span key={t} className={`tag ${t.includes("サッカー") ? "tag-green" : t.includes("体育会") ? "tag-blue" : ""}`}>{t}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="co-detail">
          <div>
            <div className="block">
              <h3>会社概要</h3>
              <p>{c.about}</p>
              <dl className="co-meta" style={{ marginTop: 18 }}>
                <div><dt>設立</dt><dd>{c.founded}</dd></div>
                <div><dt>従業員数</dt><dd>{c.employees}</dd></div>
                <div><dt>勤務地</dt><dd>{c.locations.join(" / ")}</dd></div>
              </dl>
            </div>

            <div className="block">
              <h3>事業内容</h3>
              <p>{c.business}</p>
            </div>

            <div className="block">
              <h3>カルチャー</h3>
              <p>{c.culture}</p>
            </div>

            <div className="block">
              <h3>求める人物像</h3>
              <p>{c.wantedProfile}</p>
            </div>

            <div className="block">
              <h3>スポーツ経験者を評価するポイント</h3>
              <ul style={{ display: "grid", gap: 12, marginTop: 4 }}>
                {c.sportsPoints.map((s, i) => (
                  <li key={i} className="line-check" style={{ fontSize: 14.5, lineHeight: 1.9 }}>
                    <CheckIcon /> <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="block">
              <h3>募集職種</h3>
              {c.positions.map((pos) => (
                <div key={pos.title} className="pos-item">
                  <div style={{ minWidth: 0 }}>
                    <b style={{ fontSize: 15 }}>{pos.title}</b>
                    <div className="muted" style={{ marginTop: 3 }}>
                      {pos.place}{pos.note ? ` / ${pos.note}` : ""}
                    </div>
                  </div>
                  {applied ? (
                    <span className="tag tag-green">応募済み</span>
                  ) : (
                    <button className="btn btn-outline btn-sm" onClick={() => onApply(pos)}>応募する</button>
                  )}
                </div>
              ))}
            </div>

            <p className="tiny" style={{ marginTop: 28 }}>
              ※ この企業は初版用のサンプルです。実在する企業を示すものではなく、記載されている情報も架空のものです。
            </p>
          </div>

          <aside className="co-sticky">{ctaBox}</aside>
        </div>

        <div style={{ marginTop: 36 }}>
          <Link to="/companies" className="btn btn-ghost"><ArrowIcon dir="left" /> 企業一覧に戻る</Link>
        </div>
      </div>

      {/* ---------- 未ログイン時のゲート ---------- */}
      {gate && (
        <AuthGateModal
          onClose={() => setGate(false)}
          next={`/companies/${c.id}`}
          variant="apply"
          companyName={c.name}
        />
      )}

      {/* ---------- 応募確認 ---------- */}
      {confirm && (
        <Modal onClose={() => setConfirm(null)} labelledBy="apply-title">
          <div style={{ display: "grid", gap: 20 }}>
            <h2 id="apply-title" className="h-page" style={{ fontSize: 21 }}>この企業に応募しますか？</h2>

            <div className="card card-pad" style={{ background: "var(--grey-bg)", display: "grid", gap: 14 }}>
              <div className="row" style={{ gap: 12 }}>
                <CompanyLogo text={c.logoText} color={c.logoColor} size={44} radius={9} />
                <div>
                  <b style={{ fontSize: 14.5 }}>{c.name}</b>
                  <div className="tiny">{c.industry}</div>
                </div>
              </div>
              <hr className="divider" />
              <div>
                <span className="filter-label">応募する職種</span>
                <b style={{ fontSize: 14.5 }}>{confirm.title}</b>
                <div className="muted">{confirm.place}</div>
              </div>
            </div>

            <p className="tiny">
              登録済みのプロフィール（競技歴・自己PR・希望条件）が企業に送信されます。
            </p>

            <div style={{ display: "grid", gap: 10 }}>
              <button className="btn btn-primary btn-lg btn-block" onClick={confirmApply}>応募する</button>
              <button className="btn btn-ghost btn-block" onClick={() => setConfirm(null)}>キャンセル</button>
            </div>
          </div>
        </Modal>
      )}

      {/* ---------- 応募完了 ---------- */}
      {done && (
        <Modal onClose={() => setDone(false)} labelledBy="done-title">
          <div style={{ display: "grid", gap: 20, textAlign: "center" }}>
            <span style={{
              width: 62, height: 62, borderRadius: "50%", background: "var(--pitch-soft)", color: "var(--pitch)",
              display: "inline-flex", alignItems: "center", justifyContent: "center", margin: "0 auto",
            }}>
              <CheckIcon size={30} />
            </span>
            <div>
              <h2 id="done-title" className="h-page" style={{ fontSize: 21 }}>応募が完了しました</h2>
              <p className="lead" style={{ marginTop: 10, fontSize: 14 }}>
                {c.name} へ応募しました。企業からの連絡を待ちましょう。
                応募状況はマイページの「応募した企業」で確認できます。
              </p>
            </div>
            <div style={{ display: "grid", gap: 10 }}>
              <button className="btn btn-primary btn-block" onClick={() => nav("/applications")}>
                応募した企業を見る
              </button>
              <button className="btn btn-ghost btn-block" onClick={() => { setDone(false); nav("/companies"); }}>
                他の企業も見る
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
