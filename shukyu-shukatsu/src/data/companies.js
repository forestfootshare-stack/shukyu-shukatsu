// 掲載企業データ（初版はすべて架空のサンプル企業）
// 実在企業との提携を示すものではありません。isSample: true を全件に付与し、
// UI 上で「SAMPLE」バッジを必ず表示します。

export const INDUSTRIES = [
  "IT・ソフトウェア", "人材・HR", "商社", "メーカー", "広告・マーケティング",
  "金融", "不動産・建設", "コンサルティング", "スポーツ・ヘルスケア", "小売・EC",
];

export const JOB_TYPES = [
  "営業", "企画・マーケティング", "エンジニア", "コンサルタント",
  "人事", "総合職", "販売・店舗運営", "経営企画",
];

export const LOCATIONS = [
  "東京", "神奈川", "埼玉・千葉", "大阪", "京都・兵庫",
  "愛知", "福岡", "北海道", "全国", "リモート可",
];

export const VALUES_OPTIONS = [
  "給与", "人間関係・社風", "休日", "勤務地", "やりがい", "成長環境", "その他",
];

export const companies = [
  {
    id: "aoba-works",
    name: "株式会社アオバワークス",
    isSample: true,
    industry: "IT・ソフトウェア",
    tagline: "中小企業の業務をソフトウェアで軽くする",
    logoText: "AW",
    logoColor: "#1668e3",
    heroTone: "blue",
    locations: ["東京", "リモート可"],
    jobs: ["エンジニア", "営業", "企画・マーケティング"],
    tags: ["サッカー経験者歓迎", "体育会経験者歓迎", "新卒3年目で役職"],
    welcomesFootball: true,
    welcomesAthlete: true,
    employees: "180名",
    founded: "2014年",
    about:
      "中小製造業向けの業務管理SaaSを開発・提供しています。現場に足を運んでヒアリングし、そのまま自社で作って届けるところまでを一気通貫で担っているのが特徴です。",
    business:
      "業務管理SaaS「アオバクラウド」の開発・販売／導入支援コンサルティング／既存システムのリプレース支援",
    culture:
      "職種を問わず「まず現場を見る」ことを大事にしています。若手でも入社初年度から顧客先に同行し、二年目にはひとつの導入プロジェクトを任されることが多い環境です。意思決定が速く、提案した人がそのまま担当になります。",
    wantedProfile:
      "正解が決まっていない状況で、自分で情報を取りに行って前に進められる人。技術そのものよりも、相手の課題を理解しようとする姿勢を重視しています。",
    sportsPoints: [
      "課題を分解して練習に落とし込む習慣は、そのまま顧客課題の分解に転用できると考えています",
      "チーム内で役割が変わっても機能できる適応力を評価しています",
      "長期間ひとつの目標に取り組んだ経験そのものを、選考で具体的に伺います",
    ],
    positions: [
      { title: "セールス（総合職）", type: "営業", place: "東京", note: "初年度は導入支援に同行" },
      { title: "ソフトウェアエンジニア", type: "エンジニア", place: "東京 / リモート可", note: "未経験からの育成枠あり" },
    ],
  },
  {
    id: "meridian-hr",
    name: "メリディアン人材開発株式会社",
    isSample: true,
    industry: "人材・HR",
    tagline: "スポーツ経験者のキャリアに特化した人材会社",
    logoText: "MH",
    logoColor: "#14b16b",
    heroTone: "green",
    locations: ["東京", "大阪", "福岡"],
    jobs: ["営業", "人事", "コンサルタント"],
    tags: ["サッカー経験者歓迎", "体育会経験者歓迎", "全国転勤なし選択可"],
    welcomesFootball: true,
    welcomesAthlete: true,
    employees: "320名",
    founded: "2009年",
    about:
      "競技経験者のキャリア支援を専門にしている人材会社です。現役を引退したあとのセカンドキャリア支援から新卒紹介まで、スポーツ領域に絞って事業を展開しています。",
    business: "新卒・中途の人材紹介／企業向け採用コンサルティング／競技団体との連携事業",
    culture:
      "社員の約7割が学生時代に競技経験を持っています。目標数字は明確ですが、達成のプロセスは個人に委ねられている文化です。月1回、部署横断のフットサル部の活動があります。",
    wantedProfile:
      "人の進路に関わることに責任を持てる人。数字を追う仕事なので、負けた日の翌日に切り替えて動ける人が向いています。",
    sportsPoints: [
      "候補者と同じ競技経験を持つことが、そのまま信頼につながる仕事です",
      "チームの勝敗を自分事として引き受けてきた経験を重視します",
      "キャプテン・副キャプテン経験は選考時に必ず深掘りします",
    ],
    positions: [
      { title: "キャリアアドバイザー", type: "コンサルタント", place: "東京 / 大阪", note: "" },
      { title: "法人営業", type: "営業", place: "東京 / 大阪 / 福岡", note: "" },
    ],
  },
  {
    id: "kizuna-shoji",
    name: "キズナ商事株式会社",
    isSample: true,
    industry: "商社",
    tagline: "スポーツ用品と機能素材を扱う専門商社",
    logoText: "KS",
    logoColor: "#e9922c",
    heroTone: "amber",
    locations: ["東京", "大阪", "愛知"],
    jobs: ["営業", "総合職", "経営企画"],
    tags: ["サッカー経験者歓迎", "海外案件あり"],
    welcomesFootball: true,
    welcomesAthlete: true,
    employees: "540名",
    founded: "1981年",
    about:
      "スポーツアパレル向けの機能素材を中心に扱う専門商社です。国内メーカーと海外工場をつなぐ立場で、素材の調達から量産までを担当しています。",
    business: "機能素材の輸出入／スポーツ用品の国内卸／OEM 生産のコーディネート",
    culture:
      "老舗ですが、若手が海外出張に行く機会は早い段階からあります。ひとつの案件を最初から最後まで同じ担当が持つため、成果が自分の手触りとして残りやすい仕事です。",
    wantedProfile:
      "相手の立場が違っても粘り強く調整を続けられる人。語学は入社後の研修があるため、選考時点での要件にはしていません。",
    sportsPoints: [
      "スポーツ用品の現場を知っている競技経験者は、提案の解像度が違うと感じています",
      "チームメイトや監督との関係構築の経験が、取引先との長期の関係づくりに生きます",
    ],
    positions: [
      { title: "総合職（営業）", type: "営業", place: "東京 / 大阪 / 愛知", note: "" },
      { title: "総合職（管理部門）", type: "総合職", place: "東京", note: "" },
    ],
  },
  {
    id: "northlight",
    name: "ノースライト工業株式会社",
    isSample: true,
    industry: "メーカー",
    tagline: "産業用照明の設計から施工まで",
    logoText: "NL",
    logoColor: "#0f4fae",
    heroTone: "blue",
    locations: ["神奈川", "埼玉・千葉", "北海道"],
    jobs: ["エンジニア", "営業", "総合職"],
    tags: ["体育会経験者歓迎", "土日休み", "研修3ヶ月"],
    welcomesFootball: false,
    welcomesAthlete: true,
    employees: "760名",
    founded: "1968年",
    about:
      "工場・体育施設・スタジアム向けの照明設備を設計、製造しています。競技用照明の分野では国内でも実績のあるメーカーです。",
    business: "産業用・競技用照明の設計製造／施設向け省エネ改修／保守メンテナンス",
    culture:
      "技術と現場の距離が近く、設計担当も施工に立ち会います。数字より品質が優先される文化で、腰を据えて技術を積み上げたい人に向いています。",
    wantedProfile: "ものづくりに関心があり、段取りを考えて動ける人。文理は問いません。",
    sportsPoints: [
      "スタジアム照明の案件が多く、競技場を使う側の視点を持つ人を求めています",
      "長期的にひとつのことに取り組んだ経験を評価しています",
    ],
    positions: [
      { title: "設計エンジニア", type: "エンジニア", place: "神奈川", note: "文系出身者も在籍" },
      { title: "技術営業", type: "営業", place: "神奈川 / 北海道", note: "" },
    ],
  },
  {
    id: "hatsune-adv",
    name: "ハツネ・アドバタイジング株式会社",
    isSample: true,
    industry: "広告・マーケティング",
    tagline: "スポーツチームのファンをつくる",
    logoText: "HA",
    logoColor: "#14b16b",
    heroTone: "green",
    locations: ["東京", "大阪", "リモート可"],
    jobs: ["企画・マーケティング", "営業", "総合職"],
    tags: ["サッカー経験者歓迎", "副業可", "フレックス"],
    welcomesFootball: true,
    welcomesAthlete: true,
    employees: "95名",
    founded: "2018年",
    about:
      "地域スポーツクラブや競技団体のマーケティングを支援しています。集客施策の企画からSNS運用、スポンサー獲得の支援までを担当します。",
    business: "スポーツクラブのマーケティング支援／イベント企画運営／スポンサーセールス支援",
    culture:
      "少人数のため、企画した本人が現場で実行まで担当します。試合日に稼働することもありますが、その分平日の勤務は柔軟です。",
    wantedProfile:
      "競技を「見る側」「支える側」の視点も持てる人。選手経験だけでなく、マネージャーや運営の経験も同じように評価します。",
    sportsPoints: [
      "現場の熱量を知っている人でないと、ファンに届く企画は作れないと考えています",
      "大会運営やチーム広報に関わった経験があれば、選考で必ず伺います",
    ],
    positions: [
      { title: "マーケティングプランナー", type: "企画・マーケティング", place: "東京 / リモート可", note: "" },
      { title: "スポンサーセールス", type: "営業", place: "東京 / 大阪", note: "" },
    ],
  },
  {
    id: "sumire-fin",
    name: "スミレ信用パートナーズ株式会社",
    isSample: true,
    industry: "金融",
    tagline: "地域企業の資金繰りを支える",
    logoText: "SP",
    logoColor: "#0e2233",
    heroTone: "navy",
    locations: ["東京", "京都・兵庫", "愛知"],
    jobs: ["営業", "総合職", "経営企画"],
    tags: ["体育会経験者歓迎", "資格取得支援", "土日休み"],
    welcomesFootball: false,
    welcomesAthlete: true,
    employees: "1,200名",
    founded: "1955年",
    about:
      "中堅・中小企業向けの融資とファイナンス支援を行っています。担当企業に長く伴走するスタイルを取っており、担当変更の頻度が低いのが特徴です。",
    business: "事業性融資／事業承継支援／資金繰りコンサルティング",
    culture:
      "研修制度が整っており、入社後2年間は体系的に学べます。年功は薄れつつあり、若手の抜擢も増えています。",
    wantedProfile: "数字に誠実で、わからないことをそのままにしない人。金融の知識は入社後で構いません。",
    sportsPoints: [
      "継続的に自己管理を続けてきた経験を、担当先との長い関係づくりの素地として見ています",
      "厳しい状況でも逃げずに向き合った経験を選考で伺います",
    ],
    positions: [
      { title: "総合職（法人営業）", type: "営業", place: "東京 / 愛知 / 京都・兵庫", note: "" },
    ],
  },
  {
    id: "gridworks",
    name: "グリッドワークス株式会社",
    isSample: true,
    industry: "コンサルティング",
    tagline: "現場に入って一緒に変える",
    logoText: "GW",
    logoColor: "#1668e3",
    heroTone: "blue",
    locations: ["東京", "大阪"],
    jobs: ["コンサルタント", "経営企画", "総合職"],
    tags: ["サッカー経験者歓迎", "体育会経験者歓迎", "初年度から顧客担当"],
    welcomesFootball: true,
    welcomesAthlete: true,
    employees: "210名",
    founded: "2012年",
    about:
      "戦略を描いて終わりにせず、実行支援まで入り込むタイプのコンサルティングファームです。小売・物流・製造の3領域に絞っています。",
    business: "業務改革コンサルティング／実行支援・常駐支援／データ分析基盤の構築",
    culture:
      "プロジェクト単位でチームが組まれ、役割は固定ではありません。議論では年次に関係なく発言が求められます。",
    wantedProfile:
      "考え抜くことと、動き出すことの両方ができる人。負荷のかかる局面で粘れるかどうかを重視します。",
    sportsPoints: [
      "プロジェクトはチーム戦です。役割を理解して動いた経験が直接生きます",
      "分析よりも、現場の人を巻き込む力を評価しています",
    ],
    positions: [
      { title: "ビジネスコンサルタント", type: "コンサルタント", place: "東京 / 大阪", note: "" },
    ],
  },
  {
    id: "terrace-estate",
    name: "テラスエステート株式会社",
    isSample: true,
    industry: "不動産・建設",
    tagline: "住まいと地域をつなぎ直す",
    logoText: "TE",
    logoColor: "#e9922c",
    heroTone: "amber",
    locations: ["東京", "神奈川", "埼玉・千葉"],
    jobs: ["営業", "企画・マーケティング", "総合職"],
    tags: ["体育会経験者歓迎", "インセンティブ制度"],
    welcomesFootball: false,
    welcomesAthlete: true,
    employees: "420名",
    founded: "1997年",
    about:
      "首都圏の住宅売買仲介と、空き家の再生事業を手がけています。近年は地域の遊休施設をスポーツ施設に転用する事業にも取り組んでいます。",
    business: "住宅売買仲介／賃貸管理／遊休不動産の再生・運営",
    culture:
      "成果が数字で明確に出る環境です。個人商店にならないよう、店舗単位のチーム目標も設定されています。",
    wantedProfile: "人と話すことが苦にならず、断られても次に向かえる人。",
    sportsPoints: [
      "結果が出ない時期にどう過ごしたかを、選考で詳しく伺います",
      "チーム目標と個人目標を両立させた経験を評価します",
    ],
    positions: [
      { title: "不動産コンサルティング営業", type: "営業", place: "東京 / 神奈川", note: "" },
      { title: "事業企画", type: "企画・マーケティング", place: "東京", note: "" },
    ],
  },
  {
    id: "kokua-health",
    name: "コクア・ヘルスケア株式会社",
    isSample: true,
    industry: "スポーツ・ヘルスケア",
    tagline: "競技者のコンディションを科学する",
    logoText: "KH",
    logoColor: "#14b16b",
    heroTone: "green",
    locations: ["東京", "大阪", "リモート可"],
    jobs: ["エンジニア", "企画・マーケティング", "営業"],
    tags: ["サッカー経験者歓迎", "フレックス", "副業可"],
    welcomesFootball: true,
    welcomesAthlete: true,
    employees: "130名",
    founded: "2016年",
    about:
      "アマチュア競技者向けのコンディション管理アプリを開発しています。大学の部活動やクラブチームへの導入が中心です。",
    business: "コンディション管理アプリの開発運営／チーム向け分析レポート提供／スポーツ医科学の共同研究",
    culture:
      "プロダクトの利用者と社員の距離が近く、社員自身がユーザーであることも多い環境です。改善提案はSlackで日常的に飛び交います。",
    wantedProfile:
      "自分の競技経験を、他の競技者のために還元したい人。開発職は未経験からの入社実績もあります。",
    sportsPoints: [
      "ユーザーが競技者なので、競技経験がそのままプロダクト理解につながります",
      "怪我やコンディションで苦労した経験を持つ人の視点を求めています",
    ],
    positions: [
      { title: "プロダクトエンジニア", type: "エンジニア", place: "東京 / リモート可", note: "" },
      { title: "カスタマーサクセス", type: "営業", place: "東京 / 大阪", note: "" },
    ],
  },
  {
    id: "mikuni-retail",
    name: "ミクニリテール株式会社",
    isSample: true,
    industry: "小売・EC",
    tagline: "スポーツ用品の専門店を全国に",
    logoText: "MR",
    logoColor: "#0f4fae",
    heroTone: "navy",
    locations: ["全国", "東京", "福岡"],
    jobs: ["販売・店舗運営", "総合職", "企画・マーケティング"],
    tags: ["サッカー経験者歓迎", "社員割引", "店長候補"],
    welcomesFootball: true,
    welcomesAthlete: true,
    employees: "2,100名",
    founded: "1974年",
    about:
      "全国にスポーツ用品専門店を展開しています。サッカー・フットサル専門のフロアを持つ大型店の出店を進めています。",
    business: "スポーツ用品の小売／自社ECの運営／プライベートブランドの企画",
    culture:
      "店舗からキャリアが始まり、そこから本部の商品企画やEC部門へ進む道が用意されています。競技経験者の社員比率が高い職場です。",
    wantedProfile: "スポーツ用品への関心があり、お客様に合ったものを一緒に選べる人。",
    sportsPoints: [
      "スパイク選びなど、競技経験がそのまま接客の質になります",
      "部活動でのマネジメント経験を、店舗運営で活かせます",
    ],
    positions: [
      { title: "店舗運営（店長候補）", type: "販売・店舗運営", place: "全国", note: "" },
      { title: "商品企画", type: "企画・マーケティング", place: "東京", note: "" },
    ],
  },
];

export const getCompany = (id) => companies.find((c) => c.id === id);
