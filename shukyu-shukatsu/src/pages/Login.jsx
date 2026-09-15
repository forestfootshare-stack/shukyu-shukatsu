import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useApp, DEMO_ACCOUNT } from "../context/AppContext";

export default function Login() {
  const { signIn, setToast } = useApp();
  const nav = useNavigate();
  const [params] = useSearchParams();
  const next = params.get("next") || "/mypage";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [keep, setKeep] = useState(true);
  const [error, setError] = useState("");

  const submit = (e) => {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError("メールアドレスまたはパスワードが正しくありません。");
      return;
    }
    const err = signIn(email, password);
    if (err) { setError(err); return; }
    setToast("ログインしました");
    nav(next);
  };

  const fillDemo = () => {
    setEmail(DEMO_ACCOUNT.email);
    setPassword(DEMO_ACCOUNT.password);
    setError("");
  };

  return (
    <div className="auth-page">
      <div className="wrap wrap-form">
        <div className="auth-card">
          <h1 className="h-page" style={{ marginBottom: 8 }}>ログイン</h1>
          <p className="muted" style={{ marginBottom: 26 }}>
            登録済みのメールアドレスとパスワードを入力してください。
          </p>

          <form onSubmit={submit} noValidate style={{ display: "grid", gap: 18 }}>
            {error && <div className="form-alert" role="alert">{error}</div>}

            <label className="field">
              <span className="field-label">メールアドレス</span>
              <input
                className={`input${error ? " input-bad" : ""}`}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@gmail.com"
                autoComplete="email"
              />
            </label>

            <label className="field">
              <span className="field-label">パスワード</span>
              <input
                className={`input${error ? " input-bad" : ""}`}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="8文字以上"
                autoComplete="current-password"
              />
            </label>

            <label className="check">
              <input type="checkbox" checked={keep} onChange={(e) => setKeep(e.target.checked)} />
              <span>ログイン状態を保持する</span>
            </label>

            <button type="submit" className="btn btn-primary btn-lg btn-block">ログイン</button>

            <div style={{ textAlign: "center" }}>
              <Link to="/contact" className="link-blue" style={{ fontSize: 13.5 }}>パスワードを忘れた方</Link>
            </div>
          </form>

          <div className="or-line" style={{ margin: "28px 0" }}>アカウントをお持ちでない方</div>

          <Link to={`/register?next=${encodeURIComponent(next)}`} className="btn btn-outline btn-block">
            無料で新規登録
          </Link>

          {/* 初版はデモ認証のため、確認用アカウントを明示します */}
          <div className="notice" style={{ marginTop: 28 }}>
            <b style={{ display: "block", marginBottom: 6 }}>デモアカウントで動作確認できます</b>
            メール：{DEMO_ACCOUNT.email}<br />
            パスワード：{DEMO_ACCOUNT.password}
            <button type="button" className="btn btn-ghost btn-sm" style={{ marginTop: 10 }} onClick={fillDemo}>
              入力欄に自動入力する
            </button>
          </div>

          <p className="tiny" style={{ marginTop: 16 }}>
            ※ 初版の認証はデモ実装です。アカウント情報はお使いのブラウザ内にのみ保存され、
            サーバーには送信されません。本番運用時は認証基盤への接続が必要です。
          </p>
        </div>
      </div>
    </div>
  );
}
