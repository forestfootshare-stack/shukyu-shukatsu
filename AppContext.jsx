import { createContext, useContext, useEffect, useMemo, useState, useCallback } from "react";
import { reactions as allReactions } from "../data/content";

/* ------------------------------------------------------------------
   初版の認証について
   --------------------------------------------------------------------
   これはデモ認証です。サーバー側の認証基盤はまだ接続していません。
   アカウント情報はブラウザの localStorage にのみ保存され、
   他の端末やブラウザには引き継がれません。
   本番運用の際は Supabase Auth / Firebase Auth 等への差し替えが必要です。
   差し替え箇所は signUp / signIn / signOut の3関数に集約してあります。
------------------------------------------------------------------- */

const KEY = "shukyu.v2";
const AppCtx = createContext(null);

export const DEMO_ACCOUNT = { email: "demo@shukyu-shukatsu.jp", password: "football2026" };

const demoProfile = {
  photoTone: "blue",
  name: "大森 悠生",
  furigana: "おおもり ゆうき",
  university: "SAMPLE 大学",
  faculty: "経済学部 経営学科",
  gradYear: "2028",
  birth: "2005-04-12",
  pref: "東京都",
  sport: "サッカー",
  position: "MF",
  years: "14",
  currentTeam: "SAMPLE大学 体育会サッカー部",
  history: [
    { stage: "小学校", team: "地域サッカースポーツ少年団", from: "2012", to: "2017", position: "FW", role: "なし", result: "市大会 ベスト4" },
    { stage: "中学校", team: "中学校サッカー部", from: "2018", to: "2020", position: "MF", role: "副キャプテン", result: "県大会出場" },
    { stage: "高校", team: "高校サッカー部", from: "2021", to: "2023", position: "MF", role: "キャプテン", result: "選手権 県予選ベスト8" },
    { stage: "大学", team: "SAMPLE大学 体育会サッカー部", from: "2024", to: "在籍中", position: "MF", role: "副キャプテン", result: "関東リーグ2部 所属" },
  ],
  awards: "高校3年 選手権県予選ベスト8（県内約120チーム中）\n大学2年 関東リーグ2部 昇格に貢献\n大学3年 副キャプテンとしてチーム運営を担当",
  industries: ["IT・ソフトウェア", "人材・HR", "スポーツ・ヘルスケア"],
  jobTypes: ["営業", "企画・マーケティング"],
  locations: ["東京", "リモート可"],
  values: ["成長環境", "人間関係・社風", "やりがい"],
  pr:
    "課題を分解して、優先順位をつけて取り組むことを続けてきました。大学2年の時にチームの失点数が課題になった際、練習の時間配分を分析して守備練習を週2回に増やす提案を行い、監督と相談のうえ実行しました。翌シーズンの失点は前年から約3割減りました。\n結果が出ない期間にどう過ごすかが、最終的な差になると考えています。",
  learned:
    "自分の役割は固定ではない、ということです。中学まではFWでしたが、高校でMFに転向し、大学では副キャプテンとしてプレー以外の役割も担いました。求められるものが変わったときに、そこで何ができるかを考え直す習慣がつきました。",
  openToCompanies: true,
};

const emptyProfile = {
  photoTone: "blue",
  name: "", furigana: "", university: "", faculty: "", gradYear: "",
  birth: "", pref: "",
  sport: "", position: "", years: "", currentTeam: "",
  history: [], awards: "",
  industries: [], jobTypes: [], locations: [], values: [],
  pr: "", learned: "", openToCompanies: true,
};

const initial = {
  user: null,
  profile: emptyProfile,
  profileDone: false,
  consults: [],
  favorites: [],
  readReactions: [],
  accounts: [],
};

function load() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return initial;
    return { ...initial, ...JSON.parse(raw) };
  } catch {
    return initial;
  }
}

export function AppProvider({ children }) {
  const [state, setState] = useState(load);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    try { localStorage.setItem(KEY, JSON.stringify(state)); } catch { /* 保存不可でも動作は継続 */ }
  }, [state]);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2800);
    return () => clearTimeout(t);
  }, [toast]);

  const patch = useCallback((fn) => setState((s) => ({ ...s, ...fn(s) })), []);

  /* ---------------- 認証（差し替え対象の3関数） ---------------- */

  const signUp = useCallback((form) => {
    const email = form.email.trim().toLowerCase();
    let error = null;
    setState((s) => {
      if (s.accounts.some((a) => a.email === email) || email === DEMO_ACCOUNT.email) {
        error = "このメールアドレスはすでに登録されています。";
        return s;
      }
      const account = { email, password: form.password, name: form.name };
      return {
        ...s,
        accounts: [...s.accounts, account],
        user: { name: form.name, email, phone: form.phone, university: form.university, gradYear: form.gradYear },
        profile: {
          ...emptyProfile,
          name: form.name,
          university: form.university,
          gradYear: form.gradYear,
        },
        profileDone: false,
        consults: [],
        favorites: [],
        readReactions: [],
      };
    });
    return error;
  }, []);

  const signIn = useCallback((email, password) => {
    const e = email.trim().toLowerCase();
    if (e === DEMO_ACCOUNT.email && password === DEMO_ACCOUNT.password) {
      setState((s) => ({
        ...s,
        user: { name: demoProfile.name, email: e, phone: "09012345678", university: demoProfile.university, gradYear: demoProfile.gradYear },
        profile: demoProfile,
        profileDone: true,
        consults: s.consults.length ? s.consults : [],
      }));
      return null;
    }
    const found = state.accounts.find((a) => a.email === e && a.password === password);
    if (!found) return "メールアドレスまたはパスワードが正しくありません。";
    setState((s) => ({ ...s, user: { ...s.user, name: found.name, email: e } }));
    return null;
  }, [state.accounts]);

  const signOut = useCallback(() => {
    setState((s) => ({ ...s, user: null, profile: emptyProfile, profileDone: false }));
  }, []);

  /* ---------------- プロフィール ---------------- */

  const updateProfile = useCallback((partial) => {
    patch((s) => ({ profile: { ...s.profile, ...partial } }));
  }, [patch]);

  const completeProfile = useCallback(() => patch(() => ({ profileDone: true })), [patch]);

  /* ---------------- 相談・気になる企業・企業からのリアクション ---------------- */

  /* 「この企業について詳しく聞く」を押すと、相談した企業として記録します。
     企業へ直接応募する導線はありません。 */
  const requestConsult = useCallback((companyId) => {
    patch((s) => {
      if (s.consults.some((a) => a.companyId === companyId)) return {};
      const d = new Date();
      const date = `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`;
      return { consults: [{ companyId, date, status: "相談受付中" }, ...s.consults] };
    });
  }, [patch]);

  const hasConsulted = useCallback((id) => state.consults.some((a) => a.companyId === id), [state.consults]);

  const toggleFavorite = useCallback((companyId) => {
    patch((s) => ({
      favorites: s.favorites.includes(companyId)
        ? s.favorites.filter((f) => f !== companyId)
        : [companyId, ...s.favorites],
    }));
  }, [patch]);

  const isFavorite = useCallback((id) => state.favorites.includes(id), [state.favorites]);

  const markReactionRead = useCallback((id) => {
    patch((s) => (s.readReactions.includes(id) ? {} : { readReactions: [...s.readReactions, id] }));
  }, [patch]);

  /* ---------------- 派生値 ---------------- */

  const myReactions = useMemo(
    () => allReactions.map((s) => ({ ...s, read: s.read || state.readReactions.includes(s.id) })),
    [state.readReactions]
  );

  const unreadReactions = useMemo(() => myReactions.filter((s) => !s.read).length, [myReactions]);

  // プロフィール完成度 — 10項目の充足率
  const completion = useMemo(() => {
    const p = state.profile;
    const checks = [
      !!p.name, !!p.university, !!p.faculty, !!p.gradYear,
      !!p.sport && !!p.position, !!p.years && !!p.currentTeam,
      p.history.length > 0, !!p.awards,
      p.industries.length > 0 && p.jobTypes.length > 0 && p.locations.length > 0,
      !!p.pr && !!p.learned,
    ];
    return Math.round((checks.filter(Boolean).length / checks.length) * 100);
  }, [state.profile]);

  const value = {
    ...state,
    isAuthed: !!state.user,
    signUp, signIn, signOut,
    updateProfile, completeProfile,
    requestConsult, hasConsulted, toggleFavorite, isFavorite,
    myReactions, unreadReactions, markReactionRead,
    completion,
    toast, setToast,
  };

  return <AppCtx.Provider value={value}>{children}</AppCtx.Provider>;
}

export const useApp = () => {
  const ctx = useContext(AppCtx);
  if (!ctx) throw new Error("useApp must be used inside AppProvider");
  return ctx;
};
