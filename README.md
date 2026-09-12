# 蹴球就活（SHUKYU SHUKATSU）

サッカー・フットサル経験者向け 新卒就活サービス
運営：FOREST FOOTBALL株式会社

---

## 1. いますぐ公開する（所要 5分・ブラウザだけで完結）

GitHub とホスティングを往復させない、最短の手順です。
**この5ステップを終えると `https://蹴球就活.vercel.app` のような公開URLが発行され、以後は永久に同じURLのまま自動更新されます。**

### ステップ 1 — GitHub でリポジトリを作る

1. https://github.com/new を開く
2. **Repository name** に `shukyu-shukatsu` と入力
3. **Public** を選択
4. 緑の **Create repository** を押す

### ステップ 2 — ソースをアップロードする

1. できた画面の **uploading an existing file** というリンクを押す
2. `shukyu-shukatsu-source.zip` を**解凍したフォルダの中身**を、ドラッグ＆ドロップ
   （`src` フォルダ、`index.html`、`package.json` などが全部入っていればOK）
3. 下の緑の **Commit changes** を押す

### ステップ 3 — Vercel に登録する

1. https://vercel.com/signup を開く
2. **Continue with GitHub** を押してログイン

### ステップ 4 — リポジトリを取り込む

1. **Add New... → Project** を押す
2. `shukyu-shukatsu` の横の **Import** を押す
3. 設定は何も変えずに **Deploy** を押す

### ステップ 5 — 完了

1分ほどで公開URLが表示されます。そのURLを誰にでも共有できます。

---

## 2. 2回目以降の更新方法

**GitHub 上のファイルを書き換えるだけです。Vercel 側の操作は不要です。**

1. GitHub のリポジトリで、直したいファイルを開く
2. 鉛筆マーク（Edit）を押して書き換える
3. **Commit changes** を押す

→ 1分後、同じ公開URLに自動で反映されます。

ダウンロードもアップロードも不要です。URLは何度更新しても変わりません。

---

## 3. 独自ドメインを設定する場合

Vercel のプロジェクト画面 → **Settings → Domains** で、取得済みのドメインを追加できます。
設定後も既存のURLは生き続けます。

---

## 4. ローカルで動かす場合（任意）

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # dist/ に本番ファイルを生成
```

---

## 5. ファイル構成

```
src/
├ main.jsx              エントリポイント
├ App.jsx               全ページのルーティング定義
├ context/
│  └ AppContext.jsx     ログイン・プロフィール・応募状態の管理★
├ data/
│  ├ companies.js       掲載企業データ（ここを編集すると企業が増えます）
│  └ content.js         インタビュー・イベント・チーム・スカウト
├ components/
│  ├ Layout.jsx         ヘッダー・フッター・LINE相談モーダル
│  ├ Visual.jsx         ロゴ・アバター・サムネイル（全てSVG生成）
│  ├ UI.jsx             企業カード・記事カード・認証モーダル
│  └ Modal.jsx          モーダル基盤
├ pages/                各画面
└ styles/
   ├ global.css         配色・フォント・ボタン（デザイン変更はここ）
   ├ layout.css         ヘッダー・フッター・LINE導線
   └ components.css     カード・一覧・詳細
```

---

## 6. よく編集する場所

| やりたいこと | 編集するファイル |
|---|---|
| 掲載企業を追加・変更する | `src/data/companies.js` |
| インタビュー記事を追加する | `src/data/content.js` の `interviews` |
| イベントを追加する | `src/data/content.js` の `events` |
| 提携チームを差し替える | `src/data/content.js` の `teams` |
| 配色を変える | `src/styles/global.css` の `:root` |
| LINEのURLを変える | `src/components/Layout.jsx` の `LINE_URL` |
| TOPのコピーを変える | `src/pages/Home.jsx` |

---

## 7. 写真を実写に差し替える手順

現在、人物・チーム・記事の画像はすべてコード生成のSVGです（外部サイトへの画像リンクはゼロ）。
実写に差し替える場合：

1. 画像ファイルを `public/images/` フォルダに置く
2. `src/components/Visual.jsx` の該当コンポーネント（`Avatar` / `Thumb`）の SVG を
   `<img src="/images/ファイル名.jpg" alt="" />` に置き換える

`public/` に置いたファイルは自動的に同じドメインから配信されるため、外部通信は発生しません。

---

## 8. 認証について（重要）

**初版のログイン機能はデモ実装です。**

- アカウント情報はブラウザの localStorage にのみ保存されます
- サーバーには送信されません
- 他の端末・他のブラウザではログイン状態が引き継がれません

本番運用には認証基盤の接続が必要です。
差し替え箇所は `src/context/AppContext.jsx` の **`signUp` / `signIn` / `signOut` の3関数**に
まとめてあるため、Supabase Auth などへの置き換えはこの3箇所の変更で済みます。

### デモアカウント

```
メールアドレス： demo@shukyu-shukatsu.jp
パスワード：     football2026
```

ログイン画面に「入力欄に自動入力する」ボタンがあります。

---

## 9. 公開後にやっておくこと

1. `public/robots.txt` と `public/sitemap.xml` の
   `https://shukyu-shukatsu.example` を実際の公開URLに書き換える
2. Google Search Console にサイトを登録する（■30 の進路データベース構想の下準備）

### 外部通信を完全にゼロにしたい場合

`index.html` の以下の3行を削除すると、日本語ウェブフォントの読み込みがなくなり、
ページ読み込み時の外部通信が完全にゼロになります（見た目は端末標準のフォントになります）。

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP..." rel="stylesheet" />
```

---

## 10. 掲載データについて

掲載している企業・大学・チーム・インタビュー・イベントはすべて架空のサンプルです。
実在の団体との提携を示すものではなく、画面上にも `SAMPLE` / `掲載イメージ` と明示しています。
実データに差し替える際は、この表示も併せて外してください
（`src/components/UI.jsx` の `SampleBadge`）。
