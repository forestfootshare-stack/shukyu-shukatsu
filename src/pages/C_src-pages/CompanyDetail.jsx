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
  const { isAuthed, requestConsult, hasConsulted, isFavorite, toggleFavorite, setToast } = useApp();

  const [gate, setGate] = useState(false);
  const [consultOpen, setConsultOpen] = useState(false);

  if (!c) return <NotFound />;

  const consulted = hasConsulted(c.id);
  const fav = isFavorite(c.id);

  /* 「この企業について詳しく聞く」
     企業へ直接応募する導線は持ちません。キャリアアドバイザーへの相談につなぎます。 */
  const onConsult = () => {
    if (!isAuthed) { setGate(true); return; }
    setConsultOpen(true);
  };

  const confirmConsult = () => {
    requestConsult(c.id);
    setConsultOpen(false);
    setToast("相談を受け付けました");
  };

  const onFav = () => {
    if (!isAuthed) { setGate(true); return; }
    toggleFavorite(c.id);
    setToast(fav ? "お気に入りから外しました" : "お気に入りに追加しました");
  };

  const ctaBox = (
    <div className="card card-pad" style={{ display: "grid", gap: 12 }}>
      <button className="btn btn-primary btn-lg btn-block" onClick={onConsult}>
        この企業について詳しく聞く
      </button>
      {consulted && (
        <div className="row" style={{ gap: 9, color: "var(--pitch)", fontWeight: 700, fontSize: 13.5 }}>
          <CheckIcon /> 相談を受け付けています
        </div>
      )}
      <button className={`btn btn-ghost btn-block${fav ? " on" : ""}`} onClick={onFav}
        style={fav ? { color: "var(--danger)", borderColor: "#f0c4c0" } : undefined}>
        <HeartIcon filled={fav} /> {fav ? "保存済み" : "気になるに保存"}
      </button>
      <p className="tiny">
        キャリアアドバイザーが、仕事内容や選考の流れ、あなたに合っているかをお伝えします。
        企業の選考ではありません。
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
                  <button className="btn btn-outline btn-sm" onClick={onConsult}>詳しく聞く</button>
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
          variant="consult"
          companyName={c.name}
        />
      )}

      {/* ---------- 相談確認 ---------- */}
      {consultOpen && (
        <Modal onClose={() => setConsultOpen(false)} labelledBy="consult-title" wide>
          <div style={{ display: "grid", gap: 20 }}>
            <div>
              <span className="cs-eyebrow">CAREER SUPPORT</span>
              <h2 id="consult-title" className="h-page" style={{ fontSize: 21 }}>
                この企業について、<br />キャリアアドバイザーに無料で相談できます。
              </h2>
            </div>

            <div className="card card-pad" style={{ background: "var(--grey-bg)", display: "grid", gap: 12 }}>
              <div className="row" style={{ gap: 12 }}>
                <CompanyLogo text={c.logoText} color={c.logoColor} size={42} radius={9} />
                <div>
                  <b style={{ fontSize: 14.5 }}>{c.name}</b>
                  <div className="tiny">{c.industry}</div>
                </div>
              </div>
            </div>

            <ul style={{ display: "grid", gap: 9 }}>
              {[
                "仕事内容や選考について詳しく聞ける",
                "自分に合っている企業か相談できる",
                "応募前の面接対策も可能",
              ].map((t) => (
                <li key={t} className="line-check"><CheckIcon /> {t}</li>
              ))}
            </ul>

            <div className="meta-box">
              <div><small>所要時間</small><b>約30分</b></div>
              <div><small>料金</small><b>無料</b></div>
              <div><small>形式</small><b>オンラインOK</b></div>
            </div>

            <div style={{ display: "grid", gap: 10 }}>
              <button className="btn btn-primary btn-lg btn-block" onClick={confirmConsult}>
                無料で相談する
              </button>
              <button className="btn btn-ghost btn-block" onClick={() => setConsultOpen(false)}>
                あとにする
              </button>
            </div>

            <p className="tiny" style={{ textAlign: "center" }}>
              企業の選考ではありません。相談だけでもOKです。
            </p>
          </div>
        </Modal>
      )}
    </div>
  );
}
