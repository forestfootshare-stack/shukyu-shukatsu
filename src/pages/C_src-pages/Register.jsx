import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useApp } from "../context/AppContext";

const GRAD_YEARS = ["2027", "2028", "2029", "2030", "既卒・その他"];

export default function Register() {
  const { signUp, setToast } = useApp();
  const nav = useNavigate();
  const [params] = useSearchParams();
  const next = params.get("next") || "";

  const [f, setF] = useState({
    name: "", email: "", phone: "", university: "", gradYear: "", password: "", agree: false,
  });
  const [errors, setErrors] = useState({});
  const set = (k) => (e) => {
    const v = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setF((s) => ({ ...s, [k]: v }));
    setErrors((s) => ({ ...s, [k]: undefined }));
  };

  const validate = () => {
    const e = {};
    if (!f.name.trim()) e.name = "氏名を入力してください。";
    if (!f.email.trim()) e.email = "メールアドレスを入力してください。";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email.trim())) e.email = "メールアドレスの形式が正しくありません。";
    if (!f.phone.trim()) e.phone = "電話番号を入力してください。";
    else if (!/^0\d{9,10}$/.test(f.phone.replace(/[-\s]/g, ""))) e.phone = "ハイフンなしの半角数字で入力してください。";
    if (!f.university.trim()) e.university = "大学名を入力してください。";
    if (!f.gradYear) e.gradYear = "卒業予定年度を選択してください。";
    if (f.password.length < 8) e.password = "パスワードは8文字以上で設定してください。";
    if (!f.agree) e.agree = "利用規約・プライバシーポリシーへの同意が必要です。";
    return e;
  };

  const submit = (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length) {
      const first = document.querySelector(".input-bad, .field-error");
      first?.scrollIntoView({ block: "center", behavior: "smooth" });
      return;
    }
    const err = signUp(f);
    if (err) { setErrors({ email: err }); return; }
    setToast("アカウントを作成しました");
    nav(`/profile/setup${next ? `?next=${encodeURIComponent(next)}` : ""}`);
  };

  return (
    <div className="auth-page">
      <div className="wrap wrap-form">
        <div className="auth-card">
          <h1 className="h-page" style={{ marginBottom: 10 }}>蹴球就活をはじめる</h1>
          <p className="lead" style={{ fontSize: 14, marginBottom: 28 }}>
            サッカー・フットサルの経験をプロフィールにして、あなたに合う企業と出会いましょう。
          </p>

          <form onSubmit={submit} noValidate style={{ display: "grid", gap: 20 }}>
            <label className="field">
              <span className="field-label">氏名 <span className="req">必須</span></span>
              <input className={`input${errors.name ? " input-bad" : ""}`} value={f.name} onChange={set("name")}
                placeholder="大森 悠生" autoComplete="name" />
              {errors.name && <span className="field-error">{errors.name}</span>}
            </label>

            <label className="field">
              <span className="field-label">メールアドレス <span className="req">必須</span></span>
              <input className={`input${errors.email ? " input-bad" : ""}`} type="email" value={f.email} onChange={set("email")}
                placeholder="example@gmail.com" autoComplete="email" inputMode="email" />
              {errors.email && <span className="field-error">{errors.email}</span>}
            </label>

            <label className="field">
              <span className="field-label">電話番号 <span className="req">必須</span></span>
              <input className={`input${errors.phone ? " input-bad" : ""}`} type="tel" value={f.phone} onChange={set("phone")}
                placeholder="09012345678" autoComplete="tel" inputMode="numeric" />
              <span className="field-hint">ハイフンなしで入力してください</span>
              {errors.phone && <span className="field-error">{errors.phone}</span>}
            </label>

            <label className="field">
              <span className="field-label">大学名 <span className="req">必須</span></span>
              <input className={`input${errors.university ? " input-bad" : ""}`} value={f.university} onChange={set("university")}
                placeholder="○○大学" />
              {errors.university && <span className="field-error">{errors.university}</span>}
            </label>

            <label className="field">
              <span className="field-label">卒業予定年度 <span className="req">必須</span></span>
              <select className={`select${errors.gradYear ? " input-bad" : ""}`} value={f.gradYear} onChange={set("gradYear")}>
                <option value="">選択してください</option>
                {GRAD_YEARS.map((y) => (
                  <option key={y} value={y}>{y === "既卒・その他" ? y : `${y}年卒`}</option>
                ))}
              </select>
              {errors.gradYear && <span className="field-error">{errors.gradYear}</span>}
            </label>

            <label className="field">
              <span className="field-label">パスワード <span className="req">必須</span></span>
              <input className={`input${errors.password ? " input-bad" : ""}`} type="password" value={f.password} onChange={set("password")}
                placeholder="8文字以上" autoComplete="new-password" />
              <span className="field-hint">半角英数字8文字以上で設定してください</span>
              {errors.password && <span className="field-error">{errors.password}</span>}
            </label>

            <div>
              <label className="check">
                <input type="checkbox" checked={f.agree} onChange={set("agree")} />
                <span>
                  <Link to="/terms" className="link-blue" target="_blank">利用規約</Link>・
                  <Link to="/privacy" className="link-blue" target="_blank">プライバシーポリシー</Link>
                  に同意する
                </span>
              </label>
              {errors.agree && <span className="field-error">{errors.agree}</span>}
            </div>

            <button type="submit" className="btn btn-primary btn-lg btn-block">無料で登録する</button>
          </form>

          <div className="or-line" style={{ margin: "28px 0" }}>すでに登録済みの方</div>
          <Link to={`/login${next ? `?next=${encodeURIComponent(next)}` : ""}`} className="btn btn-outline btn-block">
            ログイン
          </Link>

          <p className="tiny" style={{ marginTop: 20 }}>
            ※ 初版の認証はデモ実装です。入力内容はお使いのブラウザ内にのみ保存され、サーバーには送信されません。
            実在の個人情報は入力しないでください。
          </p>
        </div>
      </div>
    </div>
  );
}
