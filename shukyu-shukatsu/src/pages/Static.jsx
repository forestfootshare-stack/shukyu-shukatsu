import { useState } from "react";
import { Link } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { SectionHead, Crumbs } from "../components/UI";
import { PitchLines, Avatar, CheckIcon, ArrowIcon, LineIcon } from "../components/Visual";
import { openLineModal } from "../components/Layout";

/* ================= 蹴球就活とは ================= */
export function About() {
  const { isAuthed } = useApp();

  const flow = [
    { t: "無料登録", d: "氏名・メールアドレス・大学名などを登録します。学生の利用はすべて無料です。" },
    { t: "競技プロフィールを作成", d: "小学校から大学までの所属チーム、ポジション、役職、大会実績を登録します。" },
    { t: "企業を探す / スカウトを受け取る", d: "自分から応募することも、プロフィールを見た企業から連絡を受け取ることもできます。" },
    { t: "キャリアアドバイザーに相談", d: "進め方に迷ったら、無料で相談できます。企業の選考ではありません。" },
    { t: "面談・企業紹介・選考へ", d: "話を聞きたい企業が決まったら、面談や選考に進みます。" },
  ];

  return (
    <div className="page">
      <div className="wrap wrap-narrow">
        <Crumbs items={[{ label: "蹴球就活とは" }]} />

        <h1 className="h-page">
          サッカー・フットサルの経験を、<br />就活の強みに。
        </h1>
        <p className="lead" style={{ marginTop: 18, fontSize: 15.5 }}>
          蹴球就活は、サッカー・フットサル経験者のための新卒就活サービスです。
          履歴書の「部活動：サッカー部」という一行では伝わらない経験を、
          企業に見える形で残しておくための場所として運営しています。
        </p>

        <div className="card card-pad" style={{ margin: "36px 0", background: "var(--blue-soft)", borderColor: "#c9e0fb" }}>
          <h2 style={{ fontSize: 17, marginBottom: 12 }}>なぜ競技経験に特化するのか</h2>
          <p style={{ fontSize: 14.5, lineHeight: 1.95, color: "var(--ink-2)" }}>
            競技を続けている学生は、就活の開始時期がどうしても遅れます。
            リーグ戦や大会が終わるまで動けない、というのは構造的な問題で、本人の意識の問題ではありません。
            一方で、長期間ひとつの目標に取り組んできた経験は、企業が実際に評価している要素でもあります。
            この2つのずれを埋めるために、競技歴をそのまま就活で使える形にまとめられるサービスを作りました。
          </p>
        </div>

        <div className="block">
          <h3>ご利用の流れ</h3>
          <div style={{ marginTop: 8 }}>
            {flow.map((f, i) => (
              <div key={f.t} className="flow-step">
                <span className="flow-num">{i + 1}</span>
                <div>
                  <b style={{ fontSize: 15 }}>{f.t}</b>
                  <p style={{ fontSize: 13.5, color: "var(--ink-2)", marginTop: 4, lineHeight: 1.8 }}>{f.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="block">
          <h3>できること</h3>
          <ul style={{ display: "grid", gap: 12, marginTop: 8 }}>
            {[
              "競技歴・ポジション・役職・大会実績をプロフィールとして登録する",
              "競技経験を評価する企業を、業界・職種・勤務地で絞り込んで探す",
              "気になる企業に直接応募する",
              "プロフィールを見た企業からスカウトを受け取る（受け取りはオフにできます）",
              "キャリアアドバイザーに無料で相談する",
              "就活フットサルなどのイベントに参加する",
            ].map((t) => (
              <li key={t} className="line-check" style={{ fontSize: 14.5 }}><CheckIcon /> <span>{t}</span></li>
            ))}
          </ul>
        </div>

        <div className="block">
          <h3>これから追加していくもの</h3>
          <p>
            大学のサッカー部・フットサル部・サークル単位で、卒業後の進路を蓄積していく進路データベースを準備しています。
            「どの大学のどの部から、どんな業界に進んでいるのか」がわかる状態を目指しています。
            また、FOREST CUP の大会実績をプロフィールに反映する機能、企業側の管理画面も順次追加予定です。
          </p>
        </div>

        <div className="block">
          <h3>運営</h3>
          <p>
            FOREST FOOTBALL株式会社が運営しています。
            大会運営やフットサル事業を通じて競技者と関わってきた経験をもとに、
            競技と就活をつなぐ場としてこのサービスを立ち上げました。
          </p>
        </div>

        <div className="card card-pad" style={{ marginTop: 36, textAlign: "center" }}>
          <h2 style={{ fontSize: 19, marginBottom: 10 }}>まずはプロフィールを作ってみてください</h2>
          <p className="lead" style={{ margin: "0 auto 22px", fontSize: 14 }}>
            登録は無料です。書き出す作業そのものが、自己分析の第一歩になります。
          </p>
          <div className="row" style={{ gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
            <Link to={isAuthed ? "/mypage" : "/register"} className="btn btn-primary btn-lg">
              {isAuthed ? "マイページへ" : "無料でプロフィール登録"}
            </Link>
            <Link to="/companies" className="btn btn-ghost btn-lg">企業を探す</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ================= 就活相談 ================= */
export function Consult() {
  const topics = [
    { t: "就活の進め方", d: "何から始めればいいかわからない段階からで大丈夫です。時期ごとにやることを整理します。" },
    { t: "自己分析", d: "競技経験を、面接で伝わる形に言語化する作業を一緒に行います。" },
    { t: "業界分析", d: "どんな業界があるのか、自分の希望とどう照らし合わせるかを整理します。" },
    { t: "企業紹介", d: "希望条件をもとに、合いそうな企業をご紹介します。" },
    { t: "面接対策", d: "想定質問への準備と、話し方の確認を行います。" },
  ];

  return (
    <div className="page">
      <div className="wrap wrap-narrow">
        <Crumbs items={[{ label: "就活相談" }]} />

        <div className="consult-hero">
          <PitchLines opacity={0.4} />
          <div style={{ position: "relative" }}>
            <span className="tag tag-green" style={{ marginBottom: 14 }}>無料・選考ではありません</span>
            <h1 className="h-page" style={{ fontSize: "clamp(23px,4.6vw,32px)" }}>
              サッカー・フットサル経験者の<br />就活を無料でサポート
            </h1>
            <p className="lead" style={{ marginTop: 16 }}>
              FOREST FOOTBALL のキャリアアドバイザーに、就活について無料で相談できます。
              まだ何も始めていない段階からで構いません。
            </p>
            <div className="meta-box" style={{ marginTop: 24, background: "#fff", maxWidth: 400 }}>
              <div><small>相談時間</small><b>約30分</b></div>
              <div><small>料金</small><b>無料</b></div>
              <div><small>形式</small><b>オンライン可</b></div>
            </div>
            <button className="btn btn-line btn-lg" style={{ marginTop: 22 }} onClick={openLineModal}>
              <LineIcon /> 公式LINEで無料相談
            </button>
          </div>
        </div>

        <div className="notice" style={{ marginTop: 26 }}>
          これは企業の選考ではありません。相談したことが選考に影響することはありませんし、
          相談後に必ず企業を紹介されるわけでもありません。
        </div>

        <div className="block" style={{ marginTop: 38 }}>
          <h3>相談できること</h3>
          <div style={{ marginTop: 8 }}>
            {topics.map((x, i) => (
              <div key={x.t} className="flow-step">
                <span className="flow-num">{i + 1}</span>
                <div>
                  <b style={{ fontSize: 15 }}>{x.t}</b>
                  <p style={{ fontSize: 13.5, color: "var(--ink-2)", marginTop: 4, lineHeight: 1.8 }}>{x.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="block">
          <h3>こんな方に使われています</h3>
          <ul style={{ display: "grid", gap: 12, marginTop: 8 }}>
            {[
              "リーグ戦が終わるまで就活に手をつけられていない",
              "自己分析のやり方がわからない",
              "「サッカーを頑張った」の先が書けない",
              "体育会ではなくサークルなので、話せることがないと思っている",
              "怪我で引退して、時間の使い方に迷っている",
              "内定までの流れを把握しておきたい",
            ].map((t) => (
              <li key={t} className="line-check" style={{ fontSize: 14.5 }}><CheckIcon /> <span>{t}</span></li>
            ))}
          </ul>
        </div>

        <div className="block">
          <h3>担当するアドバイザー</h3>
          <div className="row" style={{ gap: 14, marginTop: 12, flexWrap: "wrap" }}>
            <Avatar size={62} toneName="green" radius="12px" />
            <div style={{ flex: 1, minWidth: 220 }}>
              <b style={{ fontSize: 15 }}>FOREST FOOTBALL キャリアアドバイザー</b>
              <p style={{ fontSize: 13.5, color: "var(--ink-2)", marginTop: 6, lineHeight: 1.85 }}>
                競技経験のある若手アドバイザーが担当します。競技を続けながらの就活がどういうものかを
                前提として理解したうえで、進め方を一緒に考えます。
              </p>
            </div>
          </div>
        </div>

        <div className="card card-pad" style={{ marginTop: 36, textAlign: "center", background: "var(--pitch-soft)", borderColor: "#c2ecd8" }}>
          <h2 style={{ fontSize: 19, marginBottom: 10 }}>まずは話してみませんか</h2>
          <p className="lead" style={{ margin: "0 auto 22px", fontSize: 14 }}>
            公式LINEから、30分の無料相談を申し込めます。
          </p>
          <button className="btn btn-line btn-lg" onClick={openLineModal}>
            <LineIcon /> 公式LINEで無料相談
          </button>
        </div>
      </div>
    </div>
  );
}

/* ================= 利用規約 ================= */
export function Terms() {
  return (
    <div className="page">
      <div className="wrap wrap-narrow doc">
        <Crumbs items={[{ label: "利用規約" }]} />
        <h1 className="h-page" style={{ marginBottom: 10 }}>利用規約</h1>
        <p className="muted" style={{ marginBottom: 28 }}>最終更新日：2026年9月1日</p>

        <div className="notice" style={{ marginBottom: 30 }}>
          本規約は初版のひな形です。実際の運用開始前に、弁護士等の専門家による確認と修正が必要です。
        </div>

        <h2>第1条（適用）</h2>
        <p>
          本規約は、FOREST FOOTBALL株式会社（以下「当社」）が提供する就活支援サービス「蹴球就活」
          （以下「本サービス」）の利用に関する条件を定めるものです。
          利用者は本規約に同意のうえ、本サービスを利用するものとします。
        </p>

        <h2>第2条（利用登録）</h2>
        <p>
          本サービスの利用を希望する方は、本規約に同意のうえ、当社の定める方法により利用登録を申請するものとします。
          当社は、次のいずれかに該当する場合、登録を承認しないことがあります。
        </p>
        <ul>
          <li>登録事項に虚偽の記載があった場合</li>
          <li>過去に本規約違反により利用停止処分を受けたことがある場合</li>
          <li>その他、当社が登録を適当でないと判断した場合</li>
        </ul>

        <h2>第3条（アカウントの管理）</h2>
        <p>
          利用者は、自己の責任においてアカウント情報を管理するものとします。
          アカウント情報の第三者への譲渡・貸与はできません。
        </p>

        <h2>第4条（プロフィール情報の取り扱い）</h2>
        <p>
          利用者が登録したプロフィール情報は、本サービスに掲載する企業が閲覧できる場合があります。
          利用者は、スカウトの受け取り設定により、企業からの連絡を受け取るかどうかを選択できます。
        </p>

        <h2>第5条（禁止事項）</h2>
        <p>利用者は、本サービスの利用にあたり、次の行為をしてはなりません。</p>
        <ul>
          <li>法令または公序良俗に違反する行為</li>
          <li>虚偽の情報を登録する行為</li>
          <li>他の利用者、企業、第三者の権利を侵害する行為</li>
          <li>本サービスの運営を妨害する行為</li>
          <li>他人になりすます行為</li>
        </ul>

        <h2>第6条（本サービスの提供の停止等）</h2>
        <p>
          当社は、システムの保守点検、天災、その他やむを得ない事由が生じた場合、
          事前の通知なく本サービスの全部または一部の提供を停止することがあります。
        </p>

        <h2>第7条（免責事項）</h2>
        <p>
          当社は、本サービスを通じて行われた利用者と企業との間の連絡、面談、選考、その他一切のやり取りについて、
          その結果を保証するものではありません。
        </p>

        <h2>第8条（規約の変更）</h2>
        <p>
          当社は、必要と判断した場合、利用者への事前の通知なく本規約を変更することがあります。
          変更後の規約は、本サービス上に表示した時点から効力を生じます。
        </p>

        <h2>第9条（準拠法・管轄）</h2>
        <p>
          本規約の解釈にあたっては日本法を準拠法とします。
          本サービスに関して紛争が生じた場合には、当社の本店所在地を管轄する裁判所を専属的合意管轄とします。
        </p>
      </div>
    </div>
  );
}

/* ================= プライバシーポリシー ================= */
export function Privacy() {
  return (
    <div className="page">
      <div className="wrap wrap-narrow doc">
        <Crumbs items={[{ label: "プライバシーポリシー" }]} />
        <h1 className="h-page" style={{ marginBottom: 10 }}>プライバシーポリシー</h1>
        <p className="muted" style={{ marginBottom: 28 }}>最終更新日：2026年9月1日</p>

        <div className="notice" style={{ marginBottom: 30 }}>
          本ポリシーは初版のひな形です。実際の運用開始前に、取得項目・委託先・保管期間などを
          実態に合わせて記載し、専門家による確認を行ってください。
        </div>

        <h2>1. 取得する情報</h2>
        <p>当社は、本サービスの提供にあたり、次の情報を取得します。</p>
        <ul>
          <li>氏名、メールアドレス、電話番号</li>
          <li>大学名、学部、卒業予定年度、生年月日、居住都道府県</li>
          <li>競技歴（所属チーム、ポジション、役職、大会実績等）</li>
          <li>希望業界、希望職種、希望勤務地、自己PR</li>
          <li>本サービスの利用履歴（閲覧した企業、応募履歴等）</li>
        </ul>

        <h2>2. 利用目的</h2>
        <ul>
          <li>本サービスの提供、維持、改善のため</li>
          <li>掲載企業へのプロフィール情報の提供（スカウト受け取りを許可している場合）</li>
          <li>利用者からの問い合わせへの対応のため</li>
          <li>キャリア相談およびイベント案内のため</li>
          <li>本サービスに関する情報のお知らせのため</li>
        </ul>

        <h2>3. 第三者提供</h2>
        <p>
          当社は、法令に基づく場合を除き、あらかじめ利用者の同意を得ることなく、
          個人情報を第三者に提供しません。
          ただし、利用者が応募またはスカウトへの返信を行った企業に対しては、
          プロフィール情報を提供します。
        </p>

        <h2>4. 安全管理措置</h2>
        <p>
          当社は、取得した個人情報の漏えい、滅失または毀損の防止その他の安全管理のために
          必要かつ適切な措置を講じます。
        </p>

        <h2>5. 開示・訂正・削除の請求</h2>
        <p>
          利用者は、当社が保有する自己の個人情報について、開示、訂正、追加、削除、利用停止を請求できます。
          請求はお問い合わせフォームから受け付けます。
        </p>

        <h2>6. Cookie等の利用</h2>
        <p>
          本サービスでは、利用状況の把握およびサービス改善のため、
          ブラウザのローカルストレージ等を使用する場合があります。
        </p>

        <h2>7. お問い合わせ窓口</h2>
        <p>
          個人情報の取り扱いに関するお問い合わせは、
          <Link to="/contact" className="link-blue">お問い合わせフォーム</Link>よりご連絡ください。
        </p>
      </div>
    </div>
  );
}

/* ================= お問い合わせ ================= */
export function Contact() {
  const [f, setF] = useState({ name: "", email: "", type: "", body: "" });
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState({});
  const set = (k) => (e) => { setF((s) => ({ ...s, [k]: e.target.value })); setErrors((s) => ({ ...s, [k]: undefined })); };

  const submit = (e) => {
    e.preventDefault();
    const errs = {};
    if (!f.name.trim()) errs.name = "お名前を入力してください。";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email.trim())) errs.email = "メールアドレスの形式が正しくありません。";
    if (!f.type) errs.type = "お問い合わせ種別を選択してください。";
    if (!f.body.trim()) errs.body = "お問い合わせ内容を入力してください。";
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setSent(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (sent) {
    return (
      <div className="page">
        <div className="wrap wrap-form" style={{ textAlign: "center" }}>
          <span style={{
            width: 68, height: 68, borderRadius: "50%", background: "var(--pitch-soft)", color: "var(--pitch)",
            display: "inline-flex", alignItems: "center", justifyContent: "center", marginBottom: 20,
          }}>
            <CheckIcon size={32} />
          </span>
          <h1 className="h-page">お問い合わせを受け付けました</h1>
          <p className="lead" style={{ margin: "14px auto 26px" }}>
            内容を確認のうえ、3営業日以内にご入力のメールアドレス宛にご連絡します。
          </p>
          <div className="notice" style={{ textAlign: "left", marginBottom: 26 }}>
            初版ではメール送信基盤が未接続のため、実際には送信されていません。
            公開後にフォーム送信先（メール配信サービス等）の接続が必要です。
          </div>
          <Link to="/" className="btn btn-primary">トップページへ戻る</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="wrap wrap-form">
        <Crumbs items={[{ label: "お問い合わせ" }]} />
        <h1 className="h-page" style={{ marginBottom: 10 }}>お問い合わせ</h1>
        <p className="lead" style={{ marginBottom: 20 }}>
          サービスの使い方、登録内容、掲載に関するご相談などを受け付けています。
          就活そのもののご相談は、
          <button className="link-blue" style={{ background: "none", border: "none", padding: 0 }} onClick={openLineModal}>
            公式LINEの無料相談
          </button>
          をご利用ください。
        </p>

        <form onSubmit={submit} noValidate style={{ display: "grid", gap: 20 }}>
          <label className="field">
            <span className="field-label">お名前 <span className="req">必須</span></span>
            <input className={`input${errors.name ? " input-bad" : ""}`} value={f.name} onChange={set("name")} placeholder="大森 悠生" />
            {errors.name && <span className="field-error">{errors.name}</span>}
          </label>

          <label className="field">
            <span className="field-label">メールアドレス <span className="req">必須</span></span>
            <input className={`input${errors.email ? " input-bad" : ""}`} type="email" value={f.email} onChange={set("email")} placeholder="example@gmail.com" />
            {errors.email && <span className="field-error">{errors.email}</span>}
          </label>

          <label className="field">
            <span className="field-label">お問い合わせ種別 <span className="req">必須</span></span>
            <select className={`select${errors.type ? " input-bad" : ""}`} value={f.type} onChange={set("type")}>
              <option value="">選択してください</option>
              <option>サービスの使い方について</option>
              <option>登録内容の変更・削除について</option>
              <option>企業掲載について</option>
              <option>イベントについて</option>
              <option>取材・メディア掲載について</option>
              <option>その他</option>
            </select>
            {errors.type && <span className="field-error">{errors.type}</span>}
          </label>

          <label className="field">
            <span className="field-label">お問い合わせ内容 <span className="req">必須</span></span>
            <textarea className={`textarea${errors.body ? " input-bad" : ""}`} value={f.body} onChange={set("body")} placeholder="お問い合わせ内容をご記入ください。" />
            {errors.body && <span className="field-error">{errors.body}</span>}
          </label>

          <button type="submit" className="btn btn-primary btn-lg btn-block">送信する</button>
          <p className="tiny">
            送信いただいた内容は
            <Link to="/privacy" className="link-blue">プライバシーポリシー</Link>
            に従って取り扱います。
          </p>
        </form>
      </div>
    </div>
  );
}

/* ================= 採用担当者の方へ ================= */
export function ForCompanies() {
  const reasons = [
    {
      t: "長期間、同じ目標に取り組んできた",
      d: "多くが小学生から10年以上、同じ競技を続けています。課題を設定して改善を回す習慣が、練習という形で身についています。",
    },
    {
      t: "結果が出ない時期の過ごし方を知っている",
      d: "レギュラーを外れる、怪我で離脱する、勝てない時期が続く。そうした局面をくぐってきた経験は、入社後の踏ん張りに直結します。",
    },
    {
      t: "役割の変化に対応してきた",
      d: "ポジション転向、学年による役割の変化、キャプテンとしての立ち回り。配属後のフィットを見るうえで参考になる材料が揃っています。",
    },
  ];

  const features = [
    {
      t: "競技プロフィールから学生を見られる",
      d: "小学校から大学までの所属チーム、ポジション、役職、大会実績、自己PR、希望条件が一覧で確認できます。履歴書の一行では見えない部分が最初から揃っています。",
    },
    {
      t: "学生から直接応募が届く",
      d: "貴社のページに「スポーツ経験者を評価するポイント」を掲載できます。何を見ているかを先に伝えることで、納得感のある応募が集まります。",
    },
    {
      t: "学生へ直接スカウトを送れる",
      d: "競技歴や希望業界から学生を探して、直接メッセージを送れます。※スカウト送信機能は順次提供予定です。",
    },
    {
      t: "就活フットサルに参加できる",
      d: "学生と一緒にプレーしてから話す場を定期開催しています。説明会より前の段階で、相互理解を作れます。",
    },
  ];

  const flow = [
    { t: "お問い合わせ", d: "下のフォームからご連絡ください。3営業日以内にご返信します。" },
    { t: "オンラインでのご説明", d: "サービス概要と、登録学生の傾向についてご説明します。30分程度です。" },
    { t: "掲載内容のご相談", d: "事業内容、カルチャー、求める人物像、競技経験のどこを評価するかを伺います。" },
    { t: "掲載開始", d: "ページを作成し、公開します。掲載後の内容変更も承ります。" },
  ];

  return (
    <div className="page">
      <div className="wrap wrap-narrow">
        <Crumbs items={[{ label: "採用担当者の方へ" }]} />

        <div className="consult-hero" style={{ background: "linear-gradient(160deg,#e8f1fd 0%,#f5f7f9 100%)" }}>
          <PitchLines opacity={0.45} />
          <div style={{ position: "relative" }}>
            <span className="eyebrow">FOR COMPANIES</span>
            <h1 className="h-page" style={{ fontSize: "clamp(23px,4.6vw,32px)" }}>
              サッカー・フットサル経験者を<br />採用したい企業の方へ
            </h1>
            <p className="lead" style={{ marginTop: 16 }}>
              蹴球就活は、競技経験者に特化した新卒就活サービスです。
              競技歴・役職・大会実績がプロフィールとして登録されているため、
              体育会採用で見たい情報が最初から揃っています。
            </p>
            <div className="row" style={{ gap: 10, marginTop: 24, flexWrap: "wrap" }}>
              <Link to="/contact" className="btn btn-primary btn-lg">掲載について問い合わせる</Link>
              <Link to="/companies" className="btn btn-ghost btn-lg">掲載イメージを見る</Link>
            </div>
          </div>
        </div>

        <div className="block" style={{ marginTop: 40 }}>
          <h3>なぜ競技経験者なのか</h3>
          <div style={{ marginTop: 8 }}>
            {reasons.map((r, i) => (
              <div key={r.t} className="flow-step">
                <span className="flow-num">{i + 1}</span>
                <div>
                  <b style={{ fontSize: 15 }}>{r.t}</b>
                  <p style={{ fontSize: 13.5, color: "var(--ink-2)", marginTop: 4, lineHeight: 1.85 }}>{r.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="block">
          <h3>蹴球就活でできること</h3>
          <div className="grid-2" style={{ marginTop: 10, gap: 14 }}>
            {features.map((f) => (
              <div key={f.t} className="card card-pad">
                <b style={{ fontSize: 14.5, display: "block", marginBottom: 8, lineHeight: 1.5 }}>{f.t}</b>
                <p style={{ fontSize: 13, color: "var(--ink-2)", lineHeight: 1.85 }}>{f.d}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="block">
          <h3>掲載について</h3>
          <p>
            初期掲載企業として約150社を想定しており、立ち上げ期の掲載料は無料を予定しています。
            将来的に学生データベースの検索、スカウト送信、イベント参加などを有料機能として整備していく方針ですが、
            現時点で掲載にあたって費用は発生しません。
          </p>
          <div className="notice" style={{ marginTop: 16 }}>
            現在サイトに掲載している企業はすべて初版用のサンプルです。
            実在する企業との提携を示すものではありません。
          </div>
        </div>

        <div className="block">
          <h3>掲載までの流れ</h3>
          <div style={{ marginTop: 8 }}>
            {flow.map((f, i) => (
              <div key={f.t} className="flow-step">
                <span className="flow-num">{i + 1}</span>
                <div>
                  <b style={{ fontSize: 15 }}>{f.t}</b>
                  <p style={{ fontSize: 13.5, color: "var(--ink-2)", marginTop: 4, lineHeight: 1.85 }}>{f.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card card-pad" style={{ marginTop: 36, textAlign: "center" }}>
          <h2 style={{ fontSize: 19, marginBottom: 10 }}>まずはご相談ください</h2>
          <p className="lead" style={{ margin: "0 auto 22px", fontSize: 14 }}>
            採用課題やご希望の職種を伺ったうえで、掲載内容をご提案します。
            お問い合わせ種別から「企業掲載について」をお選びください。
          </p>
          <Link to="/contact" className="btn btn-primary btn-lg">掲載について問い合わせる</Link>
          <p className="tiny" style={{ marginTop: 18 }}>
            運営：FOREST FOOTBALL株式会社
          </p>
        </div>
      </div>
    </div>
  );
}
