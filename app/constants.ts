const BOOTH_BASE_URL = "https://tsuki-lab.booth.pm";

export const PROFILE = {
  name: "hanetsuki",
  role: "配信演出クリエイター/WEBエンジニア",
  bio: "1995年生まれ、東京都在住。学生時代に一次創作のイラスト制作から創作活動を始め、2018年よりWEBエンジニアとして従事。フロントエンドを中心に、専門領域にとらわれないUX設計を得意とする。VTuber文化に魅了され、配信演出ツールの開発にも取り組むなど、エンタメ×技術の領域で活動中。",
  image: { src: "/profile.png", alt: "hanetsuki" },
} as const;

export const CONTACT = {
  title: "contact",
  description: "お問い合わせはこちらから",
  linkText: "連絡先を見る",
  href: "/contact",
} as const;

export const LINKS = [
  { label: "GitHub", href: "https://github.com/tsuki-lab", hoverClass: "hover:from-gray-100 hover:to-gray-200 dark:hover:from-gray-800/80 dark:hover:to-gray-700/80" },
  { label: "Zenn", href: "https://zenn.dev/rabbit", hoverClass: "hover:from-emerald-50 hover:to-teal-50 dark:hover:from-emerald-950/30 dark:hover:to-teal-950/30" },
  { label: "Illust", href: "https://art.tsuki-lab.net", hoverClass: "hover:from-pink-50 hover:to-rose-50 dark:hover:from-pink-950/30 dark:hover:to-rose-950/30" },
  { label: "Booth", href: `${BOOTH_BASE_URL}/`, hoverClass: "hover:from-orange-50 hover:to-pink-50 dark:hover:from-orange-950/30 dark:hover:to-pink-950/30" },
] as const;

export const PRODUCTS = [
  {
    name: "Totelo（トテロ）",
    href: `${BOOTH_BASE_URL}/items/7888902`,
    description: "高評価・同接・スパチャ額などを自動計算。見出しやレイアウトを自由に編集できる配信支援ツール（わんコメテンプレート）",
    price: "¥2,800",
  },
  {
    name: "Roupit（ルーピット）",
    href: `${BOOTH_BASE_URL}/items/7958002`,
    description: "配信特化のルーレットツール。OBSで表示用画面と操作画面を分けて、企画や盛り上げに利用可能（無料版あり）",
    price: "¥1,000",
  },
  {
    name: "Liscoresia",
    href: `${BOOTH_BASE_URL}/items/6747525`,
    description: "VTuber用エンドロール作成ツール",
    price: "¥860",
  },
  {
    name: "サンクスカードふり返りツール",
    href: `${BOOTH_BASE_URL}/items/7831150`,
    description: "メンギフ・スパチャが後から確認できる！サンクスカード作成に便利なふり返りツール（わんコメプラグイン）",
    price: "¥1,900",
  },
  {
    name: "グラデーションカウンター",
    href: `${BOOTH_BASE_URL}/items/7684868`,
    description: "カウントをグラデーションで可愛く表示するカウンターツール",
    price: "¥380",
  },
  {
    name: "しんぷるカウンター",
    href: `${BOOTH_BASE_URL}/items/7660157`,
    description: "手動カウント＆初見コメント自動集計対応。自分好みのデザインにできるカウンターツール",
    price: "¥280〜",
  },
  {
    name: "スーパーチャットビューア",
    href: `${BOOTH_BASE_URL}/items/6698509`,
    description: "スーパーチャットを画面に残せるツール",
    price: "¥500",
  },
] as const;
