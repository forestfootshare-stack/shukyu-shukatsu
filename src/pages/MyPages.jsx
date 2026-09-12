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

/* ================= スカウト一覧 ================= */
export function Scouts() {
  const { myScouts, profile } = useApp();

  return (
    <Shell title="届いたスカウト" lead="競技歴やプロフィールを見た企業から届いたメッセージです。">
      {!profile.scoutOn && (
        <div className="notice" style={{ marginBottom: 18 }}>
          スカウトの受け取りが現在オフになっています。新しいスカウトは届きません。
          <Link to="/settings" className="link-blue">アカウント設定</Link> から変更できます。
        </div>
      )}

      {myScouts.length === 0 ? (
        <Empty
          title="まだスカウトは届いていません"
          lead="プロフィールを充実させると、企業の目に留まりやすくなります。"
          actionTo="/profile/edit"
          actionLabel="プロフィールを編集する"
        />
      ) : (
        <div style={{ display: "grid", gap: 12 }}>
          {myScouts.map((s) => {
            const c = getCompany(s.companyId);
            return (
              <Link key={s.id} to={`/scouts/${s.id}`} className={`card card-link scout-card${s.read ? "" : " unread"}`}>
                <CompanyLogo text={c.logoText} color={c.logoColor} size={46} radius={9} />
                <div style={{ minWidth: 0, flex: 1 }}>
                  <div className="row" style={{ gap: 7, flexWrap: "wrap" }}>
                    {!s.read && <span className="unread-pill">NEW</span>}
                    <b style={{ fontSize: 13 }}>{c.name}</b>
                    <SampleBadge />
                  </div>
                  <h2 className="scout-title">{s.title}</h2>
                  <p className="scout-ex">{s.message[0]}</p>
                  <span className="muted" style={{ marginTop: 7, display: "block" }}>
                    {s.date} / {s.jobTitle}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      )}

      <p className="tiny" style={{ marginTop: 24 }}>
        ※ 表示しているスカウトはすべて初版用のサンプルです。
      </p>
    </Shell>
  );
}

/* ================= スカウト詳細 ================= */
export function ScoutDetail() {
  const { id } = useParams();
  const { myScouts, markScoutRead, setToast } = useApp();
  const nav = useNavigate();
  const [reply, setReply] = useState(null);
  const s = myScouts.find((x) => x.id === id);

  useEffect(() => { if (s) markScoutRead(s.id); }, [s, markScoutRead]);

  if (!s) return <NotFound />;
  const c = getCompany(s.companyId);

  const send = (kind) => {
    setReply(null);
    setToast(kind === "yes" ? "面談を希望する旨を返信しました" : "検討する旨を返信しました");
    nav("/scouts");
  };

  return (
    <div className="page-tight">
      <div className="wrap" style={{ maxWidth: 800 }}>
        <Crumbs items={[
          { label: "マイページ", to: "/mypage" },
          { label: "届いたスカウト", to: "/scouts" },
          { label: c.name },
        ]} />

        <div className="card card-pad">
          <div className="row" style={{ gap: 14, marginBottom: 20, flexWrap: "wrap" }}>
            <CompanyLogo text={c.logoText} color={c.logoColor} size={54} radius={11} />
            <div style={{ flex: 1, minWidth: 180 }}>
              <div className="row" style={{ gap: 7 }}>
                <b style={{ fontSize: 15 }}>{c.name}</b>
                <SampleBadge />
              </div>
              <div className="muted">{c.industry} / 受信日 {s.date}</div>
            </div>
            <Link to={`/companies/${c.id}`} className="btn btn-ghost btn-sm">企業ページを見る</Link>
          </div>

          <hr className="divider" />

          <h1 className="h-page" style={{ fontSize: 21, margin: "22px 0 6px" }}>{s.title}</h1>
          <span className="tag tag-blue">{s.jobTitle}</span>

          <div style={{ marginTop: 22, display: "grid", gap: 16 }}>
            {s.message.map((para, i) => (
              <p key={i} style={{ fontSize: 14.5, lineHeight: 1.95, color: "var(--ink-2)" }}>{para}</p>
            ))}
          </div>

          <hr className="divider" style={{ margin: "28px 0" }} />

          <div style={{ display: "grid", gap: 10 }}>
            <button className="btn btn-primary btn-lg btn-block" onClick={() => setReply("yes")}>
              面談を希望する
            </button>
            <button className="btn btn-ghost btn-block" onClick={() => setReply("later")}>
              検討する（返信を保留）
            </button>
          </div>

          <p className="tiny" style={{ marginTop: 16 }}>
            返信に迷ったら、キャリアアドバイザーに相談できます。
            <button className="link-blue" style={{ background: "none", border: "none", padding: 0 }} onClick={openLineModal}>
              無料で相談する
            </button>
          </p>
        </div>

        <div style={{ marginTop: 26 }}>
          <Link to="/scouts" className="btn btn-ghost"><ArrowIcon dir="left" /> スカウト一覧に戻る</Link>
        </div>
      </div>

      {reply && (
        <Modal onClose={() => setReply(null)} labelledBy="reply-title">
          <div style={{ display: "grid", gap: 18 }}>
            <h2 id="reply-title" className="h-page" style={{ fontSize: 20 }}>
              {reply === "yes" ? "面談を希望しますか？" : "検討中として返信しますか？"}
            </h2>
            <p style={{ fontSize: 14, color: "var(--ink-2)", lineHeight: 1.85 }}>
              {reply === "yes"
                ? `${c.name} に面談希望の返信を送ります。日程調整の連絡が届きます。`
                : `${c.name} に「検討中」の返信を送ります。あとから面談を希望することもできます。`}
            </p>
            <div style={{ display: "grid", gap: 10 }}>
              <button className="btn btn-primary btn-block" onClick={() => send(reply)}>返信する</button>
              <button className="btn btn-ghost btn-block" onClick={() => setReply(null)}>キャンセル</button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

/* ================= 応募した企業 ================= */
export function Applications() {
  const { applications } = useApp();

  return (
    <Shell title="応募した企業" lead="応募した企業と、現在の選考状況を確認できます。">
      {applications.length === 0 ? (
        <Empty
          title="まだ応募した企業はありません"
          lead="気になる企業を探して、応募してみましょう。応募にはプロフィールの登録が必要です。"
          actionTo="/companies"
          actionLabel="企業を探す"
        />
      ) : (
        <div style={{ display: "grid", gap: 12 }}>
          {applications.map((a) => {
            const c = getCompany(a.companyId);
            return (
              <div key={a.companyId} className="card scout-card">
                <CompanyLogo text={c.logoText} color={c.logoColor} size={46} radius={9} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div className="row" style={{ gap: 7, flexWrap: "wrap" }}>
                    <b style={{ fontSize: 15 }}>{c.name}</b>
                    <SampleBadge />
                  </div>
                  <div className="muted" style={{ marginTop: 3 }}>{a.positionTitle}</div>
                  <div className="row" style={{ gap: 8, marginTop: 9, flexWrap: "wrap" }}>
                    <span className="tag tag-blue">{a.status}</span>
                    <span className="muted">応募日 {a.date}</span>
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
    <Shell title="お気に入り企業" lead="気になる企業を保存しておけます。">
      {list.length === 0 ? (
        <Empty
          title="お気に入りに追加した企業はありません"
          lead="企業一覧のハートマークから、気になる企業を保存できます。"
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

  const toggleScout = () => {
    updateProfile({ scoutOn: !profile.scoutOn });
    setToast(profile.scoutOn ? "スカウトの受け取りをオフにしました" : "スカウトの受け取りをオンにしました");
  };

  return (
    <Shell title="アカウント設定">
      <div style={{ display: "grid", gap: 20 }}>
        <div className="card card-pad">
          <h2 style={{ fontSize: 16, marginBottom: 16 }}>スカウト設定</h2>
          <div className="switch-row">
            <div>
              <b style={{ fontSize: 14 }}>スカウトを受け取る</b>
              <p className="tiny" style={{ marginTop: 3 }}>
                オンにすると、プロフィールを見た企業から直接メッセージが届きます。
              </p>
            </div>
            <button className="switch" role="switch" aria-checked={profile.scoutOn}
              aria-label="スカウトを受け取る" onClick={toggleScout} />
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
