import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { INDUSTRIES, JOB_TYPES, LOCATIONS, VALUES_OPTIONS } from "../data/companies";
import { Avatar, CheckIcon, ArrowIcon } from "../components/Visual";

const STAGES = ["小学校", "中学校", "高校", "大学"];
const POSITIONS = ["GK", "DF", "MF", "FW", "FP"];
const ROLES = ["なし", "キャプテン", "副キャプテン", "主将", "代表", "その他"];
const SPORTS = ["サッカー", "フットサル", "両方"];
const TONES = ["blue", "green", "amber", "navy"];
const PREFS = [
  "北海道", "宮城県", "東京都", "神奈川県", "埼玉県", "千葉県", "愛知県",
  "京都府", "大阪府", "兵庫県", "広島県", "福岡県", "その他",
];

const STEP_LABELS = ["基本情報", "競技歴", "就活情報", "完了"];

/* 複数選択チップ */
function ChipSelect({ options, value, onChange, max }) {
  const toggle = (o) => {
    if (value.includes(o)) onChange(value.filter((v) => v !== o));
    else if (!max || value.length < max) onChange([...value, o]);
  };
  return (
    <div className="chip-group">
      {options.map((o) => (
        <button key={o} type="button" className="chip" aria-pressed={value.includes(o)} onClick={() => toggle(o)}>
          {o}
        </button>
      ))}
    </div>
  );
}

export default function ProfileSetup({ mode = "setup" }) {
  const { profile, updateProfile, completeProfile, user, setToast } = useApp();
  const nav = useNavigate();
  const [params] = useSearchParams();
  const next = params.get("next");
  const isEdit = mode === "edit";

  const [step, setStep] = useState(0);
  const [p, setP] = useState(() => ({
    ...profile,
    name: profile.name || user?.name || "",
    university: profile.university || user?.university || "",
    gradYear: profile.gradYear || user?.gradYear || "",
    history: profile.history.length ? profile.history : [
      { stage: "高校", team: "", from: "", to: "", position: "", role: "なし", result: "" },
    ],
  }));
  const [errors, setErrors] = useState({});

  const set = (k, v) => { setP((s) => ({ ...s, [k]: v })); setErrors((e) => ({ ...e, [k]: undefined })); };
  const onInput = (k) => (e) => set(k, e.target.value);

  /* -------- 競技歴の行操作 -------- */
  const addHistory = () => {
    const used = p.history.map((h) => h.stage);
    const nextStage = STAGES.find((s) => !used.includes(s)) || "大学";
    setP((s) => ({ ...s, history: [...s.history, { stage: nextStage, team: "", from: "", to: "", position: "", role: "なし", result: "" }] }));
  };
  const setHistory = (i, k, v) =>
    setP((s) => ({ ...s, history: s.history.map((h, idx) => (idx === i ? { ...h, [k]: v } : h)) }));
  const removeHistory = (i) =>
    setP((s) => ({ ...s, history: s.history.filter((_, idx) => idx !== i) }));

  /* -------- バリデーション -------- */
  const validateStep = () => {
    const e = {};
    if (step === 0) {
      if (!p.name.trim()) e.name = "氏名を入力してください。";
      if (!p.university.trim()) e.university = "大学名を入力してください。";
      if (!p.faculty.trim()) e.faculty = "学部を入力してください。";
      if (!p.gradYear) e.gradYear = "卒業予定年度を選択してください。";
    }
    if (step === 1) {
      if (!p.sport) e.sport = "競技を選択してください。";
      if (!p.position) e.position = "メインポジションを選択してください。";
      if (!p.years) e.years = "競技年数を入力してください。";
      if (!p.currentTeam.trim()) e.currentTeam = "現在の所属チームを入力してください。";
      if (!p.history.some((h) => h.team.trim())) e.history = "競技歴を1件以上入力してください。";
    }
    if (step === 2) {
      if (!p.industries.length) e.industries = "希望業界を1つ以上選択してください。";
      if (!p.jobTypes.length) e.jobTypes = "希望職種を1つ以上選択してください。";
      if (!p.locations.length) e.locations = "希望勤務地を1つ以上選択してください。";
      if (!p.pr.trim()) e.pr = "自己PRを入力してください。";
    }
    return e;
  };

  const goNext = () => {
    const errs = validateStep();
    setErrors(errs);
    if (Object.keys(errs).length) {
      document.querySelector(".field-error")?.scrollIntoView({ block: "center", behavior: "smooth" });
      return;
    }
    updateProfile(p);
    if (step === 2) {
      completeProfile();
      if (isEdit) { setToast("プロフィールを保存しました"); nav("/profile"); return; }
      setStep(3);
      return;
    }
    setStep((s) => s + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goBack = () => {
    if (step === 0) { nav(isEdit ? "/profile" : "/mypage"); return; }
    setStep((s) => s - 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  /* ================= 完了画面 ================= */
  if (step === 3) {
    return (
      <div className="page">
        <div className="wrap wrap-form" style={{ textAlign: "center" }}>
          <span
            style={{
              width: 72, height: 72, borderRadius: "50%", background: "var(--pitch-soft)", color: "var(--pitch)",
              display: "inline-flex", alignItems: "center", justifyContent: "center", marginBottom: 22,
            }}
          >
            <CheckIcon size={34} />
          </span>
          <h1 className="h-page">プロフィール登録が完了しました</h1>
          <p className="lead" style={{ margin: "14px auto 0" }}>
            登録した競技歴は、企業が学生を探すときに参照されます。
            内容はあとからいつでも編集できます。
          </p>

          <div className="card card-pad" style={{ textAlign: "left", margin: "30px 0", background: "var(--grey-bg)" }}>
            <b style={{ fontSize: 14, display: "block", marginBottom: 12 }}>次にできること</b>
            <ul style={{ display: "grid", gap: 10 }}>
              {[
                "プロフィールがどう見えるかを確認する",
                "企業を探して、気になる企業に応募する",
                "キャリアアドバイザーに無料で相談する",
              ].map((t) => (
                <li key={t} className="line-check"><CheckIcon /> {t}</li>
              ))}
            </ul>
          </div>

          <div style={{ display: "grid", gap: 10 }}>
            <button className="btn btn-primary btn-lg btn-block" onClick={() => nav(next || "/mypage")}>
              {next ? "元のページに戻る" : "マイページへ進む"}
            </button>
            <button className="btn btn-ghost btn-block" onClick={() => nav("/profile")}>
              プロフィールを確認する
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* ================= 入力画面 ================= */
  return (
    <div className="page">
      <div className="wrap" style={{ maxWidth: 720 }}>
        <h1 className="h-page" style={{ marginBottom: 8 }}>
          {isEdit ? "プロフィールを編集" : "プロフィールを作成しましょう"}
        </h1>
        <p className="muted" style={{ marginBottom: 28 }}>
          {isEdit
            ? "変更した内容は保存すると企業側の表示にも反映されます。"
            : "あと3ステップで完了します。入力した内容はあとから編集できます。"}
        </p>

        {/* ステップ表示 */}
        <div className="steps">
          {STEP_LABELS.slice(0, 3).map((label, i) => (
            <div key={label} style={{ display: "contents" }}>
              <div className={`step${i === step ? " on" : ""}${i < step ? " done" : ""}`}>
                <span className="step-n">{i < step ? <CheckIcon size={15} /> : i + 1}</span>
                <span className="step-label">{label}</span>
              </div>
              {i < 2 && <span className={`step-bar${i < step ? " done" : ""}`} />}
            </div>
          ))}
        </div>

        <div className="card card-pad" style={{ display: "grid", gap: 22 }}>
          {/* ---------- STEP 1 基本情報 ---------- */}
          {step === 0 && (
            <>
              <div>
                <span className="field-label">プロフィール写真</span>
                <div className="row" style={{ gap: 16, flexWrap: "wrap" }}>
                  <Avatar size={76} toneName={p.photoTone} radius="14px" />
                  <div style={{ flex: 1, minWidth: 200 }}>
                    <div className="chip-group">
                      {TONES.map((t) => (
                        <button key={t} type="button" className="chip" aria-pressed={p.photoTone === t}
                          onClick={() => set("photoTone", t)}>
                          {{ blue: "ブルー", green: "グリーン", amber: "オレンジ", navy: "ネイビー" }[t]}
                        </button>
                      ))}
                    </div>
                    <p className="field-hint">
                      初版では画像アップロードの保存先がないため、色の選択のみに対応しています。
                    </p>
                  </div>
                </div>
              </div>

              <label className="field">
                <span className="field-label">氏名 <span className="req">必須</span></span>
                <input className={`input${errors.name ? " input-bad" : ""}`} value={p.name} onChange={onInput("name")} placeholder="大森 悠生" />
                {errors.name && <span className="field-error">{errors.name}</span>}
              </label>

              <label className="field">
                <span className="field-label">ふりがな <span className="opt">任意</span></span>
                <input className="input" value={p.furigana} onChange={onInput("furigana")} placeholder="おおもり ゆうき" />
              </label>

              <label className="field">
                <span className="field-label">大学名 <span className="req">必須</span></span>
                <input className={`input${errors.university ? " input-bad" : ""}`} value={p.university} onChange={onInput("university")} placeholder="○○大学" />
                {errors.university && <span className="field-error">{errors.university}</span>}
              </label>

              <label className="field">
                <span className="field-label">学部・学科 <span className="req">必須</span></span>
                <input className={`input${errors.faculty ? " input-bad" : ""}`} value={p.faculty} onChange={onInput("faculty")} placeholder="経済学部 経営学科" />
                {errors.faculty && <span className="field-error">{errors.faculty}</span>}
              </label>

              <label className="field">
                <span className="field-label">卒業予定年度 <span className="req">必須</span></span>
                <select className={`select${errors.gradYear ? " input-bad" : ""}`} value={p.gradYear} onChange={onInput("gradYear")}>
                  <option value="">選択してください</option>
                  {["2027", "2028", "2029", "2030", "既卒・その他"].map((y) => (
                    <option key={y} value={y}>{y === "既卒・その他" ? y : `${y}年卒`}</option>
                  ))}
                </select>
                {errors.gradYear && <span className="field-error">{errors.gradYear}</span>}
              </label>

              <div className="hist-grid">
                <label className="field">
                  <span className="field-label">生年月日 <span className="opt">任意</span></span>
                  <input className="input" type="date" value={p.birth} onChange={onInput("birth")} />
                </label>
                <label className="field">
                  <span className="field-label">居住都道府県 <span className="opt">任意</span></span>
                  <select className="select" value={p.pref} onChange={onInput("pref")}>
                    <option value="">選択してください</option>
                    {PREFS.map((x) => <option key={x} value={x}>{x}</option>)}
                  </select>
                </label>
              </div>
            </>
          )}

          {/* ---------- STEP 2 競技歴 ---------- */}
          {step === 1 && (
            <>
              <div className="field">
                <span className="field-label">競技 <span className="req">必須</span></span>
                <ChipSelect options={SPORTS} value={p.sport ? [p.sport] : []} onChange={(v) => set("sport", v[v.length - 1] || "")} max={1} />
                {errors.sport && <span className="field-error">{errors.sport}</span>}
              </div>

              <div className="field">
                <span className="field-label">メインポジション <span className="req">必須</span></span>
                <ChipSelect options={POSITIONS} value={p.position ? [p.position] : []} onChange={(v) => set("position", v[v.length - 1] || "")} max={1} />
                <span className="field-hint">FP はフットサルのフィールドプレーヤーを指します</span>
                {errors.position && <span className="field-error">{errors.position}</span>}
              </div>

              <div className="hist-grid">
                <label className="field">
                  <span className="field-label">競技年数 <span className="req">必須</span></span>
                  <input className={`input${errors.years ? " input-bad" : ""}`} type="number" min="0" max="30" inputMode="numeric"
                    value={p.years} onChange={onInput("years")} placeholder="14" />
                  {errors.years && <span className="field-error">{errors.years}</span>}
                </label>
                <label className="field">
                  <span className="field-label">現在の所属チーム <span className="req">必須</span></span>
                  <input className={`input${errors.currentTeam ? " input-bad" : ""}`} value={p.currentTeam}
                    onChange={onInput("currentTeam")} placeholder="○○大学 体育会サッカー部" />
                  {errors.currentTeam && <span className="field-error">{errors.currentTeam}</span>}
                </label>
              </div>

              <hr className="divider" />

              <div>
                <div className="row-between" style={{ marginBottom: 6 }}>
                  <span className="field-label" style={{ marginBottom: 0 }}>競技歴 <span className="req">必須</span></span>
                  <button type="button" className="btn btn-ghost btn-sm" onClick={addHistory}>+ 経歴を追加</button>
                </div>
                <p className="field-hint" style={{ marginBottom: 14 }}>
                  小学校から大学まで、所属していたチームを順番に登録してください。
                </p>
                {errors.history && <span className="field-error" style={{ display: "block", marginBottom: 10 }}>{errors.history}</span>}

                {p.history.map((h, i) => (
                  <div key={i} className="hist-card">
                    <div className="row-between" style={{ marginBottom: 14 }}>
                      <select className="select" style={{ width: 130, height: 40, background: "#fff" }}
                        value={h.stage} onChange={(e) => setHistory(i, "stage", e.target.value)}>
                        {STAGES.map((s) => <option key={s} value={s}>{s}</option>)}
                      </select>
                      {p.history.length > 1 && (
                        <button type="button" className="btn btn-sm btn-danger-text" onClick={() => removeHistory(i)}>削除</button>
                      )}
                    </div>

                    <div style={{ display: "grid", gap: 12 }}>
                      <label className="field">
                        <span className="field-label">チーム名</span>
                        <input className="input" style={{ background: "#fff" }} value={h.team}
                          onChange={(e) => setHistory(i, "team", e.target.value)} placeholder="○○高校サッカー部" />
                      </label>

                      <div className="hist-grid">
                        <label className="field">
                          <span className="field-label">開始年</span>
                          <input className="input" style={{ background: "#fff" }} inputMode="numeric" value={h.from}
                            onChange={(e) => setHistory(i, "from", e.target.value)} placeholder="2021" />
                        </label>
                        <label className="field">
                          <span className="field-label">終了年</span>
                          <input className="input" style={{ background: "#fff" }} value={h.to}
                            onChange={(e) => setHistory(i, "to", e.target.value)} placeholder="2023 / 在籍中" />
                        </label>
                      </div>

                      <div className="hist-grid">
                        <label className="field">
                          <span className="field-label">ポジション</span>
                          <select className="select" style={{ background: "#fff" }} value={h.position}
                            onChange={(e) => setHistory(i, "position", e.target.value)}>
                            <option value="">選択してください</option>
                            {POSITIONS.map((x) => <option key={x} value={x}>{x}</option>)}
                          </select>
                        </label>
                        <label className="field">
                          <span className="field-label">役職</span>
                          <select className="select" style={{ background: "#fff" }} value={h.role}
                            onChange={(e) => setHistory(i, "role", e.target.value)}>
                            {ROLES.map((x) => <option key={x} value={x}>{x}</option>)}
                          </select>
                        </label>
                      </div>

                      <label className="field">
                        <span className="field-label">主な実績 <span className="opt">任意</span></span>
                        <input className="input" style={{ background: "#fff" }} value={h.result}
                          onChange={(e) => setHistory(i, "result", e.target.value)} placeholder="選手権 県予選ベスト8" />
                      </label>
                    </div>
                  </div>
                ))}
              </div>

              <label className="field">
                <span className="field-label">大会実績 <span className="opt">任意</span></span>
                <textarea className="textarea" value={p.awards} onChange={onInput("awards")}
                  placeholder={"高校3年 選手権県予選ベスト8（県内約120チーム中）\n大学2年 関東リーグ2部 昇格に貢献"} />
                <span className="field-hint">
                  競技を知らない人にも規模が伝わるよう、「県内約120チーム中」のように補足すると伝わりやすくなります。
                </span>
              </label>
            </>
          )}

          {/* ---------- STEP 3 就活情報 ---------- */}
          {step === 2 && (
            <>
              <h2 style={{ fontSize: 19 }}>希望する働き方を教えてください</h2>

              <div className="field">
                <span className="field-label">希望業界 <span className="req">必須</span></span>
                <ChipSelect options={INDUSTRIES} value={p.industries} onChange={(v) => set("industries", v)} />
                {errors.industries && <span className="field-error">{errors.industries}</span>}
              </div>

              <div className="field">
                <span className="field-label">希望職種 <span className="req">必須</span></span>
                <ChipSelect options={JOB_TYPES} value={p.jobTypes} onChange={(v) => set("jobTypes", v)} />
                {errors.jobTypes && <span className="field-error">{errors.jobTypes}</span>}
              </div>

              <div className="field">
                <span className="field-label">希望勤務地 <span className="req">必須</span></span>
                <ChipSelect options={LOCATIONS} value={p.locations} onChange={(v) => set("locations", v)} />
                {errors.locations && <span className="field-error">{errors.locations}</span>}
              </div>

              <div className="field">
                <span className="field-label">企業選びで重視すること <span className="opt">任意</span></span>
                <div style={{ display: "grid", gap: 11, marginTop: 4 }}>
                  {VALUES_OPTIONS.map((v) => (
                    <label key={v} className="check">
                      <input type="checkbox" checked={p.values.includes(v)}
                        onChange={() => set("values", p.values.includes(v) ? p.values.filter((x) => x !== v) : [...p.values, v])} />
                      <span>{v}</span>
                    </label>
                  ))}
                </div>
              </div>

              <hr className="divider" />

              <label className="field">
                <span className="field-label">自己PR <span className="req">必須</span></span>
                <textarea className={`textarea${errors.pr ? " input-bad" : ""}`} value={p.pr} onChange={onInput("pr")}
                  placeholder="どんな状況で、何を判断し、結果どうなったか。この3点が入ると伝わりやすくなります。" />
                <span className="field-hint">
                  企業は一覧画面で冒頭の2行だけを見ることがあります。結論を先に書いてください。
                </span>
                {errors.pr && <span className="field-error">{errors.pr}</span>}
              </label>

              <label className="field">
                <span className="field-label">サッカー・フットサルから学んだこと <span className="opt">任意</span></span>
                <textarea className="textarea" value={p.learned} onChange={onInput("learned")}
                  placeholder="「チームワーク」「継続力」だけで終わらせず、具体的な場面を添えてください。" />
              </label>

              <div className="switch-row">
                <div>
                  <b style={{ fontSize: 14 }}>企業にプロフィールを公開する</b>
                  <p className="tiny" style={{ marginTop: 3 }}>
                    オンにすると、掲載企業があなたのプロフィールを閲覧し、興味を伝えられるようになります。
                    企業から直接メッセージが届くことはありません。いつでも変更できます。
                  </p>
                </div>
                <button type="button" className="switch" role="switch" aria-checked={p.openToCompanies}
                  aria-label="企業にプロフィールを公開する" onClick={() => set("openToCompanies", !p.openToCompanies)} />
              </div>
            </>
          )}
        </div>

        {/* ---------- ナビゲーション ---------- */}
        <div className="row-between" style={{ marginTop: 26, gap: 12 }}>
          <button className="btn btn-ghost" onClick={goBack}>
            <ArrowIcon dir="left" /> {step === 0 ? "戻る" : STEP_LABELS[step - 1] + "へ戻る"}
          </button>
          <button className="btn btn-primary btn-lg" onClick={goNext} style={{ flex: 1, maxWidth: 320 }}>
            {step === 2 ? (isEdit ? "変更を保存する" : "プロフィール登録を完了する") : "次へ進む"}
          </button>
        </div>
      </div>
    </div>
  );
}
