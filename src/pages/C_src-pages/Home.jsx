import { Link } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { companies } from "../data/companies";
import { interviews, teams } from "../data/content";
import { PitchLines, CompanyLogo, ArrowIcon, LineIcon, CheckIcon, BellIcon, SearchIcon, Avatar } from "../components/Visual";
import { SectionHead, SampleBadge } from "../components/UI";
import { openLineModal } from "../components/Layout";
import Reveal, { RevealGroup } from "../components/Reveal";
import Marquee from "../components/Marquee";

/* 「蹴球就活でできること」の4項目。長文を避け、2〜3行に収めています。 */
const FEATURES = [
  {
    n: "01",
    icon: <Avatar size={30} toneName="blue" radius="7px" />,
    t: "競技経験も、あなたを伝える強みに",
    d: "希望する働き方、自己PR、競技歴。競技経験だけでなく、あなた自身が伝わるプロフィールを作れます。",
  },
  {
    n: "02",
    icon: <BellIcon size={24} />,
    t: "あなたに興味を持つ企業がわかる",
    d: "プロフィールを見た企業からリアクションが届きます。自分では知らなかった企業を知るきっかけに。",
  },
  {
    n: "03",
    icon: <SearchIcon size={24} />,
    t: "気になる企業を見つける",
    d: "競技経験を評価する企業を探せます。気になる企業があればキャリアアドバイザーに相談できます。",
  },
  {
    n: "04",
    icon: <LineIcon size={24} />,
    t: "キャリアアドバイザーに相談できる",
    d: "企業紹介、自己分析、面接対策まで無料でサポート。まだ何も始めていない段階からで大丈夫です。",
  },
];

/* TOP用の企業カード。直接応募の導線は置かず、相談へ誘導します。 */
function CompanyCardTop({ c }) {
  return (
    <Link to={`/companies/${c.id}`} className="card card-link co-card-top">
      <div className="row" style={{ gap: 12, alignItems: "flex-start" }}>
        <CompanyLogo text={c.logoText} color={c.logoColor} size={44} radius={9} />
        <div style={{ minWidth: 0, flex: 1 }}>
          <div className="row" style={{ gap: 6, marginBottom: 2 }}>
            <span className="co-industry">{c.industry}</span>
            <SampleBadge />
          </div>
          <h3 className="co-name" style={{ fontSize: 15.5 }}>{c.name}</h3>
        </div>
      </div>

      <p className="co-tagline" style={{ marginTop: 12 }}>{c.tagline}</p>

      <dl className="co-meta" style={{ marginTop: 12 }}>
        <div><dt>勤務地</dt><dd>{c.locations.join(" / ")}</dd></div>
      </dl>

      <div className="row-wrap" style={{ marginTop: 10 }}>
        {c.tags.filter((t) => t.includes("歓迎")).map((t) => (
          <span key={t} className={`tag ${t.includes("サッカー") ? "tag-green" : "tag-blue"}`}>{t}</span>
        ))}
      </div>

      <span className="co-more">企業を見る <ArrowIcon size={14} /></span>
    </Link>
  );
}

export default function Home() {
  const { isAuthed } = useApp();
  const featured = interviews.slice(0, 3);

  return (
    <>
      {/* ============ ① ファーストビュー ============ */}
      <section className="hero-v2">
        <PitchLines opacity={0.45} />
        <div className="wrap">
          <div className="hero-v2-in">
            <span className="hero-eyebrow">FOOTBALL × CAREER</span>
            <h1 className="hero-v2-title">
              <span className="hv-l1">サッカー・フットサルの</span>
              <span className="hv-l2">経験を、</span>
              <span className="accent">就活の強みに。</span>
            </h1>
            <p className="hero-v2-sub">
              競技歴をプロフィールに。<br />
              サッカー・フットサル経験者のための就活サービス。
            </p>
            <div className="hero-v2-cta">
              <Link to={isAuthed ? "/mypage" : "/register"} className="btn btn-primary btn-lg">
                無料でプロフィール登録
              </Link>
              <Link to="/companies" className="hero-v2-sublink">
                企業を探す <ArrowIcon size={15} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ============ ② 提携サークル・チーム ============ */}
      <section className="section sec-blue">
        <div className="wrap">
          <Reveal>
            <SectionHead
              en="FOOTBALL COMMUNITY"
              title="提携サークル・チーム"
              lead="大学の部活動・サークルと連携し、進路情報を蓄積していきます。"
            />
          </Reveal>

          <Marquee ariaLabel="提携サークル・チーム" speed={28} className="mq-team">
            {teams.map((t) => (
              <div key={t.id} className="team-card-v2">
                <div className="team-photo">
                  <img src={t.img} alt="" loading="lazy" />
                </div>
                <div className="team-body-v2">
                  <span className="team-uni">{t.uni}</span>
                  <h3 className="team-name-v2">{t.team}</h3>
                  <div className="row" style={{ gap: 6 }}>
                    <span className="tag tag-blue">{t.sport}</span>
                    <span className="tag">{t.area}</span>
                  </div>
                </div>
              </div>
            ))}
          </Marquee>

          <p className="tiny" style={{ marginTop: 14 }}>
            掲載イメージです。提携団体は順次掲載予定です。
          </p>
        </div>
      </section>

      {/* ============ ③ 蹴球就活でできること ============ */}
      <section className="section">
        <div className="wrap">
          <Reveal>
            <SectionHead
              en="WHY SHUKYU"
              title={<>競技経験を、<span className="accent">そのまま就活に。</span></>}
              align="center"
            />
          </Reveal>

          <RevealGroup className="feat-grid" step={80}>
            {FEATURES.map((f) => (
              <div key={f.n} className="feat-card">
                <span className="feat-card-ic">{f.icon}</span>
                <span className="feat-card-n">{f.n}</span>
                <h3 className="feat-card-t">{f.t}</h3>
                <p className="feat-card-d">{f.d}</p>
              </div>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* ============ ④ 競技経験を評価する企業 ============ */}
      <section className="section sec-violet">
        <div className="wrap">
          <Reveal>
            <SectionHead
              en="COMPANIES"
              title="競技経験を評価する企業"
              action={<Link to="/companies" className="btn btn-ghost btn-sm">すべて見る <ArrowIcon /></Link>}
            />
          </Reveal>

          <Marquee ariaLabel="競技経験を評価する企業" speed={32}>
            {companies.map((c) => <CompanyCardTop key={c.id} c={c} />)}
          </Marquee>

          <div className="co-note">
            <p className="tiny">掲載企業はすべて初版用のサンプルです。</p>
            <p className="co-note-cta">企業紹介・面接対策まで無料でサポート</p>
          </div>
        </div>
      </section>

      {/* ============ ⑤ 先輩たちの就活 ============ */}
      <section className="section sec-blue">
        <div className="wrap">
          <Reveal>
            <SectionHead
              en="INTERVIEW"
              title="先輩たちの就活"
              action={<Link to="/interviews" className="btn btn-ghost btn-sm">すべて見る <ArrowIcon /></Link>}
            />
          </Reveal>

          <RevealGroup className="itv-grid" step={90}>
            {featured.map((a) => (
              <Link key={a.id} to={`/interviews/${a.id}`} className="itv-card">
                <div className="itv-photo">
                  <img src={a.img} alt="" loading="lazy" />
                </div>
                <div className="itv-body">
                  <span className="itv-cat">{a.category}</span>
                  <h3 className="itv-title">{a.title}</h3>
                  <span className="itv-more">読む <ArrowIcon size={14} /></span>
                </div>
              </Link>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* ============ ⑥ 就活無料相談 ============ */}
      <section className="section sec-mint">
        <div className="wrap">
          <Reveal className="consult-band">
            <div className="consult-band-copy">
              <span className="eyebrow">CAREER SUPPORT</span>
              <h2 className="h-sec">
                気になる企業も、就活の悩みも。<br />
                <span className="accent">まずは無料で相談。</span>
              </h2>
              <p className="lead" style={{ marginTop: 14 }}>
                企業紹介から自己分析、面接対策まで、キャリアアドバイザーが無料でサポートします。
              </p>

              <div className="meta-box" style={{ marginTop: 22, maxWidth: 380, background: "#fff" }}>
                <div><small>所要時間</small><b>約30分</b></div>
                <div><small>料金</small><b>無料</b></div>
                <div><small>形式</small><b>オンラインOK</b></div>
              </div>

              <button className="btn btn-line btn-lg" style={{ marginTop: 22 }} onClick={openLineModal}>
                <LineIcon /> LINEで無料相談
              </button>
            </div>

            <ul className="consult-band-list">
              {["就活の進め方", "自己分析", "業界・企業選び", "企業紹介", "面接対策"].map((t) => (
                <li key={t}><CheckIcon size={16} /> {t}</li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* ============ ⑦ 最終CTA ============ */}
      <section className="final-cta">
        <PitchLines opacity={0.3} />
        <div className="wrap" style={{ position: "relative", textAlign: "center" }}>
          <h2 className="h-sec" style={{ color: "#fff" }}>
            競技歴を、企業に見える場所に。
          </h2>
          <p style={{ color: "rgba(255,255,255,.76)", marginTop: 14, fontSize: 15 }}>
登録は無料です。企業への公開はいつでもオフにできます。
          </p>
          <div className="final-cta-btns">
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
                  <b><BellIcon size={15} /> 学生を発見</b>
                  <small>競技歴や希望条件から学生を探し、興味を伝えられます</small>
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
                  <CompanyLogo text="AW" color="#1677ff" size={26} radius={6} />
                  <div>
                    <b>興味を伝える</b>
                    <small>今月 8 / 10件</small>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
