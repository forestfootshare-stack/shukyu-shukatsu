import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { getCompany, companies } from "../data/companies";
import { CompanyLogo, ArrowIcon, CheckIcon, LineIcon } from "../components/Visual";
import { Empty, SampleBadge, CompanyCard, Crumbs } from "../components/UI";
import { MyNav } from "./MyPage";
import { openLineModal } from "../components/Layout";
import Modal from "../components/Modal";
import NotFound from "./NotFound";

function Shell({ title, lead, children }) {
  return (
    <div className="page-tight">
      <div className="wrap">
        <div className="my-layout">
          <MyNav />
          <div>
            <h1 className="h-page" style={{ marginBottom: lead ? 8 : 22 }}>{title}</h1>
            {lead && <p className="lead" style={{ marginBottom: 24 }}>{lead}</p>}
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ================= あなたに興味を持っている企業 ================= */
export function Interested() {
  const { myReactions, profile } = useApp();

  return (
    <Shell
      title="あなたに興味を持っている企業"
      lead="プロフィールを見て興味を持った企業です。知らなかった企業と出会うきっかけとしてご覧ください。"
    >
      {!profile.openToCompanies && (
        <div className="notice" style={{ marginBottom: 18 }}>
          企業へのプロフィール公開が現在オフになっています。新しいリアクションは届きません。
          <Link to="/settings" className="link-blue">アカウント設定</Link> から変更できます。
        </div>
      )}

      {myReactions.length === 0 ? (
        <Empty
          title="まだ企業からのリアクションはありません"
          lead="プロフィールを充実させると、企業の目に留まりやすくなります。"
          actionTo="/profile/edit"
          actionLabel="プロフィールを編集する"
        />
      ) : (
        <div style={{ display: "grid", gap: 12 }}>
          {myReactions.map((r) => {
            const c = getCompany(r.companyId);
            return (
              <Link key={r.id} to={`/interested/${r.id}`} className={`card card-link scout-card${r.read ? "" : " unread"}`}>
                <CompanyLogo text={c.logoText} color={c.logoColor} size={46} radius={9} />
                <div style={{ minWidth: 0, flex: 1 }}>
                  <div className="row" style={{ gap: 7, flexWrap: "wrap" }}>
                    {!r.read && <span className="unread-pill">NEW</span>}
                    <b style={{ fontSize: 14 }}>{c.name}</b>
                    <SampleBadge />
                  </div>
                  <div className="muted" style={{ margin: "3px 0 9px" }}>
                    {c.industry} / {c.locations.join(" / ")}
                  </div>
                  <div className="row-wrap">
                    {r.points.map((pt) => <span key={pt} className="tag tag-blue">{pt}</span>)}
                  </div>
                  <span className="muted" style={{ marginTop: 9, display: "block" }}>{r.date}</span>
                </div>
              </Link>
            );
          })}
        </div>
      )}

      <p className="tiny" style={{ marginTop: 24 }}>
        ※ 表示している企業はすべて初版用のサンプルです。企業から直接メッセージが届くことはありません。
      </p>
    </Shell>
  );
}

/* ================= 興味を持った企業の詳細 ================= */
export function InterestedDetail() {
  const { id } = useParams();
  const { myReactions, markReactionRead } = useApp();
  const nav = useNavigate();
  const r = myReactions.find((x) => x.id === id);

  useEffect(() => { if (r) markReactionRead(r.id); }, [r, markReactionRead]);

  if (!r) return <NotFound />;
  const c = getCompany(r.companyId);

  return (
    <div className="page-tight">
      <div className="wrap" style={{ maxWidth: 800 }}>
        <Crumbs items={[
          { label: "マイページ", to: "/mypage" },
          { label: "あなたに興味を持っている企業", to: "/interested" },
          { label: c.name },
        ]} />

        <div className="card card-pad">
          <div className="row" style={{ gap: 14, flexWrap: "wrap" }}>
            <CompanyLogo text={c.logoText} color={c.logoColor} size={54} radius={11} />
            <div style={{ flex: 1, minWidth: 180 }}>
              <div className="row" style={{ gap: 7 }}>
                <b style={{ fontSize: 15 }}>{c.name}</b>
                <SampleBadge />
              </div>
              <div className="muted">{c.industry} / {r.date}</div>
            </div>
          </div>

          <hr className="divider" style={{ margin: "22px 0" }} />

          <h1 className="h-page" style={{ fontSize: 20, marginBottom: 14 }}>
            この企業があなたのプロフィールに注目しました
          </h1>
          <div className="row-wrap" style={{ marginBottom: 20 }}>
            {r.points.map((pt) => <span key={pt} className="tag tag-blue">{pt}</span>)}
          </div>

          <p style={{ fontSize: 14, lineHeight: 1.9, color: "var(--ink-2)" }}>
            {c.about}
          </p>

          <div style={{ display: "grid", gap: 10, marginTop: 26 }}>
            <button className="btn btn-primary btn-lg btn-block" onClick={() => nav(`/companies/${c.id}`)}>
              企業を見る
            </button>
            <button className="btn btn-ghost btn-block" onClick={openLineModal}>
              <LineIcon size={17} /> この企業について詳しく聞く
            </button>
          </div>

          <p className="tiny" style={{ marginTop: 16 }}>
            企業へ直接返信する機能はありません。気になった場合は、キャリアアドバイザーが企業の詳細をお伝えします。
          </p>
        </div>

        <div style={{ marginTop: 26 }}>
          <Link to="/interested" className="btn btn-ghost"><ArrowIcon dir="left" /> 一覧に戻る</Link>
        </div>
      </div>
    </div>
  );
}

/* ================= 相談した企業 ================= */
export function Consults() {
  const { consults } = useApp();

  return (
    <Shell title="相談した企業" lead="キャリアアドバイザーに相談した企業の一覧です。">
      {consults.length === 0 ? (
        <Empty
          title="まだ相談した企業はありません"
          lead="気になる企業が見つかったら、その企業について詳しく聞いてみましょう。仕事内容や選考の流れ、自分に合っているかを無料で相談できます。"
          actionTo="/companies"
          actionLabel="企業を探す"
        />
      ) : (
        <div style={{ display: "grid", gap: 12 }}>
          {consults.map((a) => {
            const c = getCompany(a.companyId);
            return (
              <div key={a.companyId} className="card scout-card">
                <CompanyLogo text={c.logoText} color={c.logoColor} size={46} radius={9} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div className="row" style={{ gap: 7, flexWrap: "wrap" }}>
                    <b style={{ fontSize: 15 }}>{c.name}</b>
                    <SampleBadge />
                  </div>
                  <div className="muted" style={{ marginTop: 3 }}>{c.industry}</div>
                  <div className="row" style={{ gap: 8, marginTop: 9, flexWrap: "wrap" }}>
                    <span className="tag tag-blue">{a.status}</span>
                    <span className="muted">相談日 {a.date}</span>
                  </div>
                </div>
                <Link to={`/companies/${c.id}`} className="btn btn-ghost btn-sm">企業ページ</Link>
              </div>
            );
          })}
        </div>
      )}
    </Shell>
  );
}

/* ================= お気に入り ================= */
export function Favorites() {
  const { favorites } = useApp();
  const list = companies.filter((c) => favorites.includes(c.id));

  return (
    <Shell title="気になる企業" lead="あとで見返したい企業を保存しておけます。">
      {list.length === 0 ? (
        <Empty
          title="気になる企業はまだありません"
          lead="企業一覧のハートマークから保存できます。"
          actionTo="/companies"
          actionLabel="企業を探す"
        />
      ) : (
        <div className="grid-2">
          {list.map((c) => <CompanyCard key={c.id} c={c} />)}
        </div>
      )}
    </Shell>
  );
}

/* ================= アカウント設定 ================= */
export function Settings() {
  const { user, profile, updateProfile, signOut, setToast } = useApp();
  const nav = useNavigate();
  const [confirmOut, setConfirmOut] = useState(false);

  const toggleOpen = () => {
    updateProfile({ openToCompanies: !profile.openToCompanies });
    setToast(profile.openToCompanies ? "プロフィールの公開をオフにしました" : "プロフィールの公開をオンにしました");
  };

  return (
    <Shell title="アカウント設定">
      <div style={{ display: "grid", gap: 20 }}>
        <div className="card card-pad">
          <h2 style={{ fontSize: 16, marginBottom: 16 }}>企業への公開設定</h2>
          <div className="switch-row">
            <div>
              <b style={{ fontSize: 14 }}>企業にプロフィールを公開する</b>
              <p className="tiny" style={{ marginTop: 3 }}>
                オンにすると、掲載企業があなたのプロフィールを閲覧し、興味を伝えられるようになります。
                企業から直接メッセージが届くことはありません。
              </p>
            </div>
            <button className="switch" role="switch" aria-checked={profile.openToCompanies}
              aria-label="企業にプロフィールを公開する" onClick={toggleOpen} />
          </div>
        </div>

        <div className="card card-pad">
          <h2 style={{ fontSize: 16, marginBottom: 16 }}>登録情報</h2>
          <dl className="co-meta" style={{ gap: 12 }}>
            <div><dt style={{ width: 100 }}>氏名</dt><dd>{user?.name}</dd></div>
            <div><dt style={{ width: 100 }}>メール</dt><dd style={{ wordBreak: "break-all" }}>{user?.email}</dd></div>
            <div><dt style={{ width: 100 }}>電話番号</dt><dd>{user?.phone || "未登録"}</dd></div>
            <div><dt style={{ width: 100 }}>大学</dt><dd>{profile.university || user?.university || "未登録"}</dd></div>
            <div><dt style={{ width: 100 }}>卒業年度</dt><dd>{profile.gradYear ? `${profile.gradYear}年卒` : "未登録"}</dd></div>
          </dl>
          <Link to="/profile/edit" className="btn btn-outline btn-sm" style={{ marginTop: 18 }}>
            プロフィールを編集する
          </Link>
        </div>

        <div className="card card-pad">
          <h2 style={{ fontSize: 16, marginBottom: 12 }}>お困りのとき</h2>
          <p className="lead" style={{ fontSize: 13.5, marginBottom: 16 }}>
            使い方や登録内容についてのご質問は、お問い合わせフォームから受け付けています。
            就活そのものの相談は、キャリアアドバイザーへの無料相談をご利用ください。
          </p>
          <div className="row" style={{ gap: 10, flexWrap: "wrap" }}>
            <Link to="/contact" className="btn btn-ghost btn-sm">お問い合わせ</Link>
            <button className="btn btn-line btn-sm" onClick={openLineModal}>
              <LineIcon size={17} /> 就活を相談する
            </button>
          </div>
        </div>

        <div className="card card-pad">
          <h2 style={{ fontSize: 16, marginBottom: 12 }}>ログアウト</h2>
          <button className="btn btn-danger-text btn-sm" onClick={() => setConfirmOut(true)}>
            ログアウトする
          </button>
        </div>

        <div className="notice">
          初版の認証はデモ実装のため、アカウント情報はこのブラウザ内にのみ保存されています。
          他の端末やブラウザではログイン状態が引き継がれません。
        </div>
      </div>

      {confirmOut && (
        <Modal onClose={() => setConfirmOut(false)} labelledBy="out-title">
          <div style={{ display: "grid", gap: 18 }}>
            <h2 id="out-title" className="h-page" style={{ fontSize: 20 }}>ログアウトしますか？</h2>
            <p style={{ fontSize: 14, color: "var(--ink-2)" }}>
              再度ログインすると、応募履歴とお気に入りはそのまま確認できます。
            </p>
            <div style={{ display: "grid", gap: 10 }}>
              <button className="btn btn-primary btn-block" onClick={() => { signOut(); nav("/"); }}>
                ログアウトする
              </button>
              <button className="btn btn-ghost btn-block" onClick={() => setConfirmOut(false)}>キャンセル</button>
            </div>
          </div>
        </Modal>
      )}
    </Shell>
  );
}
