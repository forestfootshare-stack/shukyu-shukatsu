import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { interviews, events, getInterview, getEvent, INTERVIEW_CATEGORIES } from "../data/content";
import { SectionHead, InterviewCard, EventCard, Crumbs, Empty, SampleBadge } from "../components/UI";
import { Thumb, Avatar, ArrowIcon, CheckIcon, LineIcon } from "../components/Visual";
import { openLineModal } from "../components/Layout";
import NotFound from "./NotFound";

/* ================= インタビュー一覧 ================= */
export function Interviews() {
  const [cat, setCat] = useState("すべて");
  const list = cat === "すべて" ? interviews : interviews.filter((i) => i.category === cat);

  return (
    <div className="page">
      <div className="wrap">
        <SectionHead
          en="INTERVIEW"
          title="競技と就活のあいだにあること"
          lead="競技経験者の就活体験、企業の採用担当の話、卒業後の進路。実際に通ってきた人たちの言葉を集めています。"
        />

        <div className="chip-group" style={{ marginBottom: 26 }}>
          {["すべて", ...INTERVIEW_CATEGORIES].map((c) => (
            <button key={c} className="chip" aria-pressed={cat === c} onClick={() => setCat(c)}>{c}</button>
          ))}
        </div>

        {list.length === 0 ? (
          <Empty title="記事がまだありません" lead="このカテゴリの記事は準備中です。" />
        ) : (
          <div className="grid-3">
            {list.map((a, i) => <InterviewCard key={a.id} a={a} i={i} />)}
          </div>
        )}
      </div>
    </div>
  );
}

/* ================= インタビュー詳細 ================= */
export function InterviewDetail() {
  const { id } = useParams();
  const a = getInterview(id);
  if (!a) return <NotFound />;

  const related = interviews.filter((x) => x.id !== a.id).slice(0, 3);

  return (
    <div className="page-tight">
      <div className="wrap" style={{ maxWidth: 780 }}>
        <Crumbs items={[{ label: "インタビュー", to: "/interviews" }, { label: a.category }]} />

        <div className="row" style={{ gap: 9, marginBottom: 14, flexWrap: "wrap" }}>
          <span className="tag tag-blue">{a.category}</span>
          <span className="muted">{a.date}</span>
          <span className="muted">約{a.readMin}分</span>
        </div>

        <h1 className="h-page" style={{ fontSize: "clamp(24px,4.6vw,33px)", lineHeight: 1.45 }}>{a.title}</h1>
        <p className="lead" style={{ marginTop: 16 }}>{a.excerpt}</p>

        <div style={{ margin: "26px 0", borderRadius: "var(--r-lg)", overflow: "hidden" }}>
          <Thumb toneName={a.tone} seed={3} kind="arc" ratio="21 / 9" />
        </div>

        <div className="row" style={{ gap: 12, paddingBottom: 24, borderBottom: "1px solid var(--line)" }}>
          <Avatar size={44} toneName={a.tone} />
          <div>
            <b style={{ fontSize: 13.5 }}>{a.author}</b>
            <div className="tiny">取材・構成：蹴球就活 編集部</div>
          </div>
        </div>

        <article style={{ marginTop: 32 }}>
          {a.body.map((sec, i) => (
            <section key={i} style={{ marginBottom: 34 }}>
              <h2 style={{ fontSize: 19, marginBottom: 14, lineHeight: 1.5 }}>{sec.h}</h2>
              <p style={{ fontSize: 15, lineHeight: 2, color: "var(--ink-2)" }}>{sec.p}</p>
            </section>
          ))}
        </article>

        <p className="tiny" style={{ padding: 16, background: "var(--grey-bg)", borderRadius: "var(--r-sm)" }}>
          ※ この記事は初版用のサンプルコンテンツです。登場する人物・団体・企業はすべて架空のものです。
        </p>

        {/* 相談導線 */}
        <div className="card card-pad" style={{ marginTop: 30, background: "var(--pitch-soft)", borderColor: "#c2ecd8" }}>
          <div className="row-between" style={{ flexWrap: "wrap", gap: 16 }}>
            <div style={{ minWidth: 220, flex: 1 }}>
              <h2 style={{ fontSize: 17, marginBottom: 6 }}>自分の場合はどうすればいい？</h2>
              <p style={{ fontSize: 13.5, color: "var(--ink-2)" }}>
                キャリアアドバイザーに30分の無料相談ができます。就活を始めていない段階からで大丈夫です。
              </p>
            </div>
            <button className="btn btn-line" onClick={openLineModal}><LineIcon /> LINEで相談する</button>
          </div>
        </div>

        <div style={{ marginTop: 48 }}>
          <h2 style={{ fontSize: 18, marginBottom: 18 }}>ほかの記事</h2>
          <div className="grid-3">
            {related.map((x, i) => <InterviewCard key={x.id} a={x} i={i + 1} />)}
          </div>
        </div>

        <div style={{ marginTop: 34 }}>
          <Link to="/interviews" className="btn btn-ghost"><ArrowIcon dir="left" /> インタビュー一覧に戻る</Link>
        </div>
      </div>
    </div>
  );
}

/* ================= イベント一覧 ================= */
export function Events() {
  return (
    <div className="page">
      <div className="wrap">
        <SectionHead
          en="EVENT"
          title="就活 × フットサル"
          lead="企業の社員と一緒にプレーしてから話を聞く日を、定期的に開催しています。選考の場ではありません。プレーしたあとのほうが、話は聞きやすくなります。"
        />

        <div className="grid-3">
          {events.map((e, i) => <EventCard key={e.id} e={e} i={i} />)}
        </div>

        <p className="tiny" style={{ marginTop: 26 }}>
          ※ 掲載しているイベントは初版用のサンプルです。実際の開催予定を示すものではありません。
        </p>
      </div>
    </div>
  );
}

/* ================= イベント詳細 ================= */
export function EventDetail() {
  const { id } = useParams();
  const e = getEvent(id);
  if (!e) return <NotFound />;

  const open = e.status === "募集中";

  return (
    <div className="page-tight">
      <div className="wrap" style={{ maxWidth: 860 }}>
        <Crumbs items={[{ label: "イベント", to: "/events" }, { label: e.area }]} />

        <div style={{ borderRadius: "var(--r-lg)", overflow: "hidden", marginBottom: 26 }}>
          <Thumb toneName={e.tone} seed={1} kind="pitch" ratio="21 / 9" label={e.area} />
        </div>

        <div className="row" style={{ gap: 9, marginBottom: 14, flexWrap: "wrap" }}>
          <span className={`tag ${open ? "tag-green" : ""}`}>{e.status}</span>
          <span className="tag">{e.fee}</span>
          <SampleBadge />
        </div>

        <h1 className="h-page">{e.name}</h1>
        <p className="lead" style={{ marginTop: 14 }}>{e.lead}</p>

        <div className="co-detail" style={{ marginTop: 30 }}>
          <div>
            <div className="block">
              <h3>当日の流れ</h3>
              <div>
                {e.schedule.map((s, i) => (
                  <div key={i} className="flow-step">
                    <span className="flow-num" style={{ fontSize: 12, width: 52, borderRadius: 6 }}>{s.t}</span>
                    <p style={{ fontSize: 14.5, paddingTop: 4 }}>{s.d}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="block">
              <h3>持ち物</h3>
              <ul style={{ display: "grid", gap: 10, marginTop: 4 }}>
                {e.bring.map((b) => (
                  <li key={b} className="line-check" style={{ fontSize: 14.5 }}><CheckIcon /> {b}</li>
                ))}
              </ul>
            </div>

            <div className="block">
              <h3>参加にあたって</h3>
              <p>
                このイベントは企業の選考ではありません。参加したこと、しなかったことが選考に影響することはありません。
                プレーのレベルは問いません。ブランクがある方も参加しています。
              </p>
            </div>

            <p className="tiny" style={{ marginTop: 28 }}>
              ※ このイベントは初版用のサンプルです。実際の開催予定を示すものではありません。
            </p>
          </div>

          <aside className="co-sticky">
            <div className="card card-pad" style={{ display: "grid", gap: 16 }}>
              <dl className="co-meta" style={{ gap: 11 }}>
                <div><dt>開催日</dt><dd>{e.date}</dd></div>
                <div><dt>時間</dt><dd>{e.time}</dd></div>
                <div><dt>会場</dt><dd>{e.venue}</dd></div>
                <div><dt>対象</dt><dd>{e.target}</dd></div>
                <div><dt>定員</dt><dd>{e.capacity}</dd></div>
                <div><dt>参加費</dt><dd>{e.fee}</dd></div>
                <div><dt>企業</dt><dd>{e.companies}</dd></div>
              </dl>
              <hr className="divider" />
              {open ? (
                <>
                  <button className="btn btn-primary btn-lg btn-block" onClick={openLineModal}>
                    参加を申し込む
                  </button>
                  <p className="tiny">
                    申し込みは公式LINEから受け付けています。ボタンを押すと案内が表示されます。
                  </p>
                </>
              ) : (
                <>
                  <button className="btn btn-ghost btn-block" disabled>準備中です</button>
                  <p className="tiny">詳細が決まり次第、このページでお知らせします。</p>
                </>
              )}
            </div>
          </aside>
        </div>

        <div style={{ marginTop: 36 }}>
          <Link to="/events" className="btn btn-ghost"><ArrowIcon dir="left" /> イベント一覧に戻る</Link>
        </div>
      </div>
    </div>
  );
}
