import { Link } from "react-router-dom";
import { PitchLines } from "../components/Visual";

export default function NotFound() {
  return (
    <div className="page" style={{ position: "relative", overflow: "hidden" }}>
      <PitchLines opacity={0.4} />
      <div className="wrap wrap-narrow" style={{ textAlign: "center", position: "relative", padding: "60px 20px" }}>
        <span style={{ fontFamily: "var(--f-num)", fontSize: 76, fontWeight: 600, color: "var(--blue)", lineHeight: 1 }}>
          404
        </span>
        <h1 className="h-page" style={{ marginTop: 14 }}>ページが見つかりません</h1>
        <p className="lead" style={{ margin: "14px auto 30px" }}>
          URLが変更されたか、削除された可能性があります。
          下のリンクから目的のページを探してみてください。
        </p>

        <div className="row" style={{ gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
          <Link to="/" className="btn btn-primary">トップページへ</Link>
          <Link to="/companies" className="btn btn-ghost">企業を探す</Link>
          <Link to="/interviews" className="btn btn-ghost">インタビュー</Link>
        </div>
      </div>
    </div>
  );
}
