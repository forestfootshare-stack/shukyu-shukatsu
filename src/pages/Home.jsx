import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { companies } from "../data/companies";
import { interviews, events, teams } from "../data/content";
import { PitchLines, Avatar, Thumb, CompanyLogo, BellIcon, ArrowIcon, LineIcon, CheckIcon } from "../components/Visual";
import { SectionHead, CompanyCard, InterviewCard, EventCard, SampleBadge, AuthGateModal } from "../components/UI";
import { openLineModal } from "../components/Layout";
import Reveal, { RevealGroup } from "../components/Reveal";

export default function Home() {
  const { isAuthed } = useApp();
  const [gate, setGate] = useState(false);
  const nav = useNavigate();

  return (
    <>
      {/* ============ ファーストビュー ============ */}
      <section className="hero">
        <PitchLines />
        <div className="wrap">
          <div className="hero-in">
            <div className="hero-copy">
              <h1>
                サッカー・フットサルの<br />経験を、就活の強みに。
              </h1>
              <p className="hero-sub">
                競技歴やチームでの経験をプロフィールに。
                企業からのスカウト、自分からの応募、就活相談までひとつに。
              </p>

              <div className="hero-cta">
                <Link to={isAuthed ? "/profile/edit" : "/register"} className="btn btn-primary btn-lg">
                  無料でプロフィール登録
                </Link>
                <Link to="/companies" className="btn btn-ghost btn-lg">企業を探す</Link>
              </div>

              <div className="hero-stats">
                <div>
                  <span className="stat-num">150<span style={{ fontSize: 21 }}>社+</span></span>
                  <small>掲載企業（予定）</small>
                </div>
                <div>
                  <span className="stat-num">スカウト</span>
                  <small>企業から直接届く</small>
                </div>
                <div>
                  <span className="stat-num">無料</span>
                  <small>学生の登録・利用</small>
                </div>
              </div>
            </div>

            {/* 右：FOOTBALL × CAREER を表すビジュアル（写真1枚ではなく合成UI） */}
            <div className="hero-visual">
              <div className="hv-card">
                <div className="hv-head">
                  <Avatar size={62} toneName="blue" radius="12px" />
                  <div>
                    <span className="tag tag-green" style={{ marginBottom: 5 }}>スカウト受付中</span>
                    <h3 className="hv-name">大森 悠生</h3>
                    <span className="hv-uni">SAMPLE大学 経済学部 / 2028年卒</span>
                  </div>
                </div>

                <div className="hv-stats">
                  <div><b>MF</b><small>POSITION</small></div>
                  <div><b>14</b><small>競技歴（年）</small></div>
                  <div><b>C</b><small>副キャプテン</small></div>
                </div>

                <div className="hv-chips">
                  <span className="tag tag-blue">大学サッカー部</span>
                  <span className="tag tag-green">関東リーグ2部</span>
                  <span className="tag">IT・ソフトウェア志望</span>
                  <span className="tag">東京</span>
                </div>
              </div>

              <div className="hv-scout">
                <span className="hv-scout-ic"><BellIcon size={18} /></span>
                <div>
                  <b>メリディアン人材開発 <SampleBadge /></b>
                  <small>キャプテン経験を拝見しました。一度お話しできませんか</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ 提携サークル・チーム ============ */}
      <section className="section section-grey">
        <div className="wrap">
          <Reveal><SectionHead
            en="FOOTBALL COMMUNITY"
            title="提携サークル・チーム"
            lead="大学の部活動・サークルと連携し、進路情報を蓄積していきます。以下は掲載イメージです。実際の提携団体は順次掲載予定です。"
          /></Reveal>
          <div className="rail">
            {teams.map((t, i) => (
              <Reveal key={t.id} delay={i * 60} className="card team-card">
                <div>
                <Thumb toneName={t.tone} seed={i} kind={i % 2 ? "pitch" : "arc"} ratio="16 / 10" label={t.area} />
                <div className="team-body">
                  <div className="team-uni">{t.uni}</div>
                  <h3 className="team-name">{t.team}</h3>
                  <div className="row" style={{ gap: 7 }}>
                    <span className="tag">{t.members}</span>
                    <SampleBadge text="掲載イメージ" />
                  </div>
                </div>
                </div>
              </Reveal>
            ))}
          </div>
          <p className="tiny" style={{ marginTop: 14 }}>
            ※ 掲載されている大学・チーム名はすべてサンプルです。実在の団体との提携を示すものではありません。
          </p>
        </div>
      </section>

      {/* ============ サービス特徴（4項目） ============ */}
      <section className="section">
        <div className="wrap">
          <SectionHead
            en="WHY SHUKYU"
            title="競技経験を、そのまま就活に持ち込む"
            lead="履歴書の「部活動：サッカー部」の一行では伝わらないものを、企業に見える形で残しておくためのサービスです。"
            align="center"
          />

          {/* ① 競技歴がプロフィールになる */}
          <Reveal className="feat">
            <div>
              <span className="feat-n">01</span>
              <h3>競技歴が、そのままプロフィールになる</h3>
              <p>
                小学校から大学までの所属チーム、ポジション、役職、大会実績を順番に登録します。
                企業が見るのは肩書きだけではなく、その期間に何をしていたかです。
                自分で書き出す作業そのものが、自己分析の第一歩になります。
              </p>
              <Link to="/register" className="btn btn-outline btn-sm" style={{ marginTop: 20 }}>
                登録してみる <ArrowIcon />
              </Link>
            </div>
            <div className="feat-media">
              {/* 人物写真ではなく、実際のプロフィール画面をイメージしたUIを表示 */}
              <div className="mini-profile">
                <div className="mini-row">
                  <span className="pos-badge"><span>MF</span><small>POS</small></span>
                  <div>
                    <b style={{ fontSize: 15 }}>大森 悠生</b>
                    <div className="tiny">競技歴 14年 / SAMPLE大学 体育会サッカー部</div>
                    <div className="row-wrap" style={{ marginTop: 6 }}>
                      <span className="tag tag-green">副キャプテン</span>
                      <span className="tag tag-blue">関東リーグ2部</span>
                    </div>
                  </div>
                </div>
                <div className="mini-tl">
                  {[
                    { s: "小学校", t: "地域スポーツ少年団", r: "市大会ベスト4" },
                    { s: "中学校", t: "中学校サッカー部", r: "副キャプテン / 県大会出場" },
                    { s: "高校", t: "高校サッカー部", r: "キャプテン / 選手権県予選ベスト8" },
                    { s: "大学", t: "SAMPLE大学 体育会サッカー部", r: "副キャプテン / 在籍中" },
                  ].map((x) => (
                    <div key={x.s} className="mini-tl-item">
                      <span className="mini-tl-dot" />
                      <div>
                        <small>{x.s}</small>
                        <b>{x.t}</b>
                        <small style={{ marginTop: 2 }}>{x.r}</small>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          {/* ② スカウト */}
          <Reveal className="feat feat-rev">
            <div>
              <span className="feat-n">02</span>
              <h3>競技歴を見た企業から、スカウトが届く</h3>
              <p>
                プロフィールを公開しておくと、競技歴やポジション、希望業界を見た企業から直接メッセージが届きます。
                受け取りはいつでもオフにできます。まずは話を聞くだけ、という段階からで構いません。
              </p>
              <button
                className="btn btn-outline btn-sm"
                style={{ marginTop: 20 }}
                onClick={() => (isAuthed ? nav("/settings") : setGate(true))}
              >
                スカウトを受ける <ArrowIcon />
              </button>
            </div>
            <div className="feat-media">
              <div className="scout-demo">
                <CompanyLogo text="MH" color="#14b16b" size={42} radius={8} />
                <div style={{ minWidth: 0 }}>
                  <div className="row" style={{ gap: 6, marginBottom: 3 }}>
                    <b style={{ fontSize: 12.5 }}>メリディアン人材開発</b>
                    <SampleBadge />
                  </div>
                  <div style={{ fontSize: 13, fontWeight: 700, lineHeight: 1.5 }}>
                    キャプテン経験を拝見しました
                  </div>
                  <div className="tiny">まずは選考ではなく、30分ほどのカジュアル面談から…</div>
                </div>
              </div>
              <div className="scout-demo">
                <CompanyLogo text="KH" color="#1668e3" size={42} radius={8} />
                <div style={{ minWidth: 0 }}>
                  <div className="row" style={{ gap: 6, marginBottom: 3 }}>
                    <b style={{ fontSize: 12.5 }}>コクア・ヘルスケア</b>
                    <SampleBadge />
                  </div>
                  <div style={{ fontSize: 13, fontWeight: 700, lineHeight: 1.5 }}>
                    コンディション管理に関心があれば
                  </div>
                  <div className="tiny">競技経験がそのままユーザー理解につながる仕事です…</div>
                </div>
              </div>
              <p className="tiny" style={{ marginTop: 12 }}>
                ※ 表示しているのはサンプル企業からのスカウト例です。
              </p>
            </div>
          </Reveal>

          {/* ③ 自分から探す */}
          <Reveal className="feat">
            <div>
              <span className="feat-n">03</span>
              <h3>自分から企業を探して、直接応募できる</h3>
              <p>
                業界や職種、勤務地に加えて「サッカー経験者歓迎」「体育会経験者歓迎」で絞り込めます。
                各企業のページには、競技経験のどこを評価しているかが書かれています。
              </p>
              <Link to="/companies" className="btn btn-outline btn-sm" style={{ marginTop: 20 }}>
                企業一覧を見る <ArrowIcon />
              </Link>
            </div>
            <div className="feat-media">
              <div className="grid-2" style={{ gap: 14 }}>
                {companies.slice(0, 2).map((c) => <CompanyCard key={c.id} c={c} showFav={false} />)}
              </div>
            </div>
          </Reveal>

          {/* ④ 就活相談 */}
          <Reveal className="feat feat-rev">
            <div>
              <span className="feat-n">04</span>
              <h3>就活を、無料で相談できる</h3>
              <p>
                FOREST FOOTBALL のキャリアアドバイザーに、就活について無料で相談できます。
                何から始めればいいかわからない段階からで大丈夫です。企業の選考ではありません。
              </p>
              <button className="btn btn-line btn-sm" style={{ marginTop: 20 }} onClick={openLineModal}>
                <LineIcon size={17} /> 30分無料相談
              </button>
            </div>
            <div className="feat-media">
              <div className="consult-hero" style={{ padding: 28 }}>
                <div className="row" style={{ gap: 14, marginBottom: 18 }}>
                  <Avatar size={54} toneName="green" />
                  <div>
                    <b style={{ fontSize: 14.5 }}>キャリアアドバイザー</b>
                    <div className="tiny">FOREST FOOTBALL株式会社</div>
                  </div>
                </div>
                <ul style={{ display: "grid", gap: 9 }}>
                  {["就活の進め方", "自己分析", "業界分析", "企業紹介", "面接対策"].map((t) => (
                    <li key={t} className="line-check"><ArrowIcon size={15} /> {t}</li>
                  ))}
                </ul>
                <div className="meta-box" style={{ marginTop: 18, background: "#fff" }}>
                  <div><small>相談時間</small><b>約30分</b></div>
                  <div><small>料金</small><b>無料</b></div>
                  <div><small>形式</small><b>オンライン可</b></div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ 企業ピックアップ ============ */}
      <section className="section section-grey">
        <div className="wrap">
          <SectionHead
            en="COMPANIES"
            title="競技経験を評価する企業"
            action={<Link to="/companies" className="btn btn-ghost btn-sm">すべて見る <ArrowIcon /></Link>}
          />
          <RevealGroup className="grid-3" step={70}>
            {companies.slice(0, 6).map((c) => <CompanyCard key={c.id} c={c} />)}
          </RevealGroup>
        </div>
      </section>

      {/* ============ インタビュー ============ */}
      <section className="section">
        <div className="wrap">
          <SectionHead
            en="INTERVIEW"
            title="先輩たちの就活"
            action={<Link to="/interviews" className="btn btn-ghost btn-sm">すべて見る <ArrowIcon /></Link>}
          />
          <RevealGroup className="grid-3" step={80}>
            {interviews.slice(0, 3).map((a, i) => <InterviewCard key={a.id} a={a} i={i} />)}
          </RevealGroup>
        </div>
      </section>

      {/* ============ イベント ============ */}
      <section className="section section-blue">
        <div className="wrap">
          <SectionHead
            en="EVENT"
            title="就活フットサル・イベント"
            lead="企業の社員と一緒にプレーしてから話を聞く日を、定期的に開催しています。"
            action={<Link to="/events" className="btn btn-ghost btn-sm">すべて見る <ArrowIcon /></Link>}
          />
          <RevealGroup className="grid-3" step={80}>
            {events.slice(0, 3).map((e, i) => <EventCard key={e.id} e={e} i={i} />)}
          </RevealGroup>
        </div>
      </section>

      {/* ============ 最終CTA ============ */}
      <section className="section" style={{ background: "var(--ink)", color: "#fff", position: "relative", overflow: "hidden" }}>
        <PitchLines opacity={0.35} />
        <div className="wrap" style={{ position: "relative", textAlign: "center" }}>
          <h2 className="h-sec" style={{ color: "#fff" }}>
            競技歴を、企業に見える場所に置いておく。
          </h2>
          <p style={{ color: "rgba(255,255,255,.75)", marginTop: 16, maxWidth: "46ch", marginInline: "auto", fontSize: 15 }}>
            登録は無料です。スカウトの受け取りはいつでもオフにできます。
          </p>
          <div className="hero-cta" style={{ justifyContent: "center", marginTop: 30 }}>
            <Link to={isAuthed ? "/mypage" : "/register"} className="btn btn-primary btn-lg">
              {isAuthed ? "マイページへ" : "無料でプロフィール登録"}
            </Link>
            <button className="btn btn-line btn-lg" onClick={openLineModal}>
              <LineIcon /> 就活について相談する
            </button>
          </div>
        </div>
      </section>


      {/* ============ 採用担当者向け ============ */}
      <section className="section">
        <div className="wrap">
          <Reveal className="biz-band">
            <div className="biz-copy">
              <span className="biz-eyebrow">採用担当者さまへ</span>
              <h2 className="biz-title">
                競技歴から、自社に合う学生を<br />見つけられます。
              </h2>

              <div className="biz-feats">
                <div>
                  <b><CheckIcon size={15} /> 掲載無料</b>
                  <small>立ち上げ期につき、掲載にあたって費用はかかりません</small>
                </div>
                <div>
                  <b><BellIcon size={15} /> スカウト</b>
                  <small>競技歴や希望条件から学生を探して直接連絡できます</small>
                </div>
                <div>
                  <b><ArrowIcon size={15} /> 就活フットサル</b>
                  <small>一緒にプレーしてから話す場を定期開催しています</small>
                </div>
              </div>

              <div className="biz-cta">
                <Link to="/for-companies" className="btn btn-primary">掲載について知る</Link>
                <Link to="/contact" className="btn btn-ghost">お問い合わせ</Link>
              </div>
            </div>

            <div className="biz-visual">
              <PitchLines opacity={0.5} />
              <div className="biz-mock">
                <div className="biz-mock-head">
                  <Avatar size={40} toneName="blue" radius="9px" />
                  <div>
                    <b>大森 悠生</b>
                    <small>SAMPLE大学 / 2028年卒</small>
                  </div>
                </div>
                <div className="biz-mock-kv">
                  <div><b>MF</b><small>POSITION</small></div>
                  <div><b>14</b><small>競技歴</small></div>
                  <div><b>C</b><small>副キャプテン</small></div>
                </div>
                <div className="biz-mock-tags">
                  <span>大学サッカー部</span>
                  <span>IT志望</span>
                  <span>東京</span>
                </div>
                <div className="biz-mock-note">
                  <CompanyLogo text="AW" color="#1668e3" size={26} radius={6} />
                  <div>
                    <b>スカウトを送信</b>
                    <small>貴社から直接</small>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {gate && <AuthGateModal onClose={() => setGate(false)} next="/settings" variant="scout" />}
    </>
  );
}
