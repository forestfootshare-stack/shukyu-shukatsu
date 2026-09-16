import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Layout from "./components/Layout";
import { useApp } from "./context/AppContext";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProfileSetup from "./pages/ProfileSetup";
import Profile from "./pages/Profile";
import MyPage from "./pages/MyPage";
import Companies from "./pages/Companies";
import CompanyDetail from "./pages/CompanyDetail";
import { Interested, InterestedDetail, Consults, Favorites, Settings } from "./pages/MyPages";
import { Interviews, InterviewDetail, Events, EventDetail } from "./pages/Content";
import { About, Consult, Terms, Privacy, Contact, ForCompanies } from "./pages/Static";
import NotFound from "./pages/NotFound";

/* ログインが必要なページのガード。
   未ログインならログイン画面へ送り、認証後に元のページへ戻します。 */
function Private({ children }) {
  const { isAuthed } = useApp();
  const loc = useLocation();
  if (!isAuthed) {
    return <Navigate to={`/login?next=${encodeURIComponent(loc.pathname)}`} replace />;
  }
  return children;
}

export default function App() {
  return (
    <Layout>
      <Routes>
        {/* 公開ページ */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/companies" element={<Companies />} />
        <Route path="/companies/:id" element={<CompanyDetail />} />
        <Route path="/interviews" element={<Interviews />} />
        <Route path="/interviews/:id" element={<InterviewDetail />} />
        <Route path="/events" element={<Events />} />
        <Route path="/events/:id" element={<EventDetail />} />
        <Route path="/consult" element={<Consult />} />
        <Route path="/for-companies" element={<ForCompanies />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/contact" element={<Contact />} />

        {/* 認証 */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* 要ログイン */}
        <Route path="/mypage" element={<Private><MyPage /></Private>} />
        <Route path="/profile" element={<Private><Profile /></Private>} />
        <Route path="/profile/setup" element={<Private><ProfileSetup mode="setup" /></Private>} />
        <Route path="/profile/edit" element={<Private><ProfileSetup mode="edit" /></Private>} />
        <Route path="/interested" element={<Private><Interested /></Private>} />
        <Route path="/interested/:id" element={<Private><InterestedDetail /></Private>} />
        <Route path="/consults" element={<Private><Consults /></Private>} />

        {/* 旧URLからの互換リダイレクト */}
        <Route path="/scouts" element={<Navigate to="/interested" replace />} />
        <Route path="/applications" element={<Navigate to="/consults" replace />} />
        <Route path="/favorites" element={<Private><Favorites /></Private>} />
        <Route path="/settings" element={<Private><Settings /></Private>} />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}
