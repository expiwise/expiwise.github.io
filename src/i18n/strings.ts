export type Lang = 'en' | 'ja';

export interface Strings {
  htmlLang: string;
  meta: { title: string; description: string };
  nav: { features: string; privacy: string; support: string; policy: string };
  hero: { eyebrow: string; title1: string; title2: string; sub: string; ctaNote: string };
  badges: { google: string; apple: string; soon: string; get: string };
  marquee: string[];
  story: { eyebrow: string; title: string; steps: { title: string; body: string }[] };
  features: { eyebrow: string; title: string; items: { title: string; body: string }[] };
  privacy: {
    eyebrow: string; title: string; body: string;
    stats: { value: number; label: string }[];
    points: string[];
  };
  cta: { title: string; body: string };
  support: {
    title: string; intro: string; emailLabel: string; faqTitle: string;
    faq: { q: string; a: string }[];
  };
  policy: { title: string };
  footer: { rights: string; disclaimer: string; lang: string };
  statusDemo: { expired: string; soon: string; ok: string };
  demoItems: { name: string; place: string; days: number }[];
}

export const strings: Record<Lang, Strings> = {
  en: {
    htmlLang: 'en',
    meta: {
      title: 'Expiwise — Know before it expires',
      description:
        'Expiwise tracks expiry dates for food, medicine and cosmetics, and reminds you in time. Private by design: no account, works offline, your data stays on your phone.',
    },
    nav: { features: 'Features', privacy: 'Privacy', support: 'Support', policy: 'Privacy policy' },
    hero: {
      eyebrow: 'Expiry tracker for iOS & Android',
      title1: 'Know before',
      title2: 'it expires.',
      sub: 'Expiwise keeps track of expiry dates for your food, medicine, cosmetics and more — and nudges you before it is too late. No account. Works offline. Your data never leaves your phone.',
      ctaNote: 'Free to use. No ads. No tracking.',
    },
    badges: { google: 'Google Play', apple: 'App Store', soon: 'Coming soon', get: 'Get it on' },
    marquee: ['Milk', 'Yogurt', 'Vitamins', 'Sunscreen', 'Cough syrup', 'Rice', 'Eye drops', 'Tofu', 'Contact lenses', 'Soy sauce', 'Batteries', 'Shampoo'],
    story: {
      eyebrow: 'How it works',
      title: 'From shelf to reminder in five taps.',
      steps: [
        { title: 'Add in seconds', body: 'Scan the barcode or the printed date. Text is read on your phone, it is only ever a suggestion, and you always confirm it.' },
        { title: 'See what needs you', body: 'Expired, expiring soon and still fine — at a glance, sorted by what matters most.' },
        { title: 'Reminded in time', body: 'Pick when you want a nudge. Get gentle tips on keeping things fresh and wasting less money.' },
        { title: 'Organised your way', body: 'Fridge, pantry, bathroom cabinet. Nest places in a tree you can fold and expand.' },
        { title: 'Waste less, see it', body: 'Statistics show what you use, what you throw away, and where the money goes.' },
      ],
    },
    features: {
      eyebrow: 'Features',
      title: 'Everything you need. Nothing you don’t.',
      items: [
        { title: 'Barcode lookup', body: 'Scan a product and its name is filled in from open databases. Only the barcode number is sent.' },
        { title: 'Date scanning', body: 'Point the camera at a printed date. You review and confirm every suggestion.' },
        { title: 'Smart reminders', body: 'Several reminders per item, plus optional advice tips, all created on your device.' },
        { title: 'Places in a tree', body: 'Rooms, shelves and boxes nested as deep as you like, with photos of each place.' },
        { title: 'Backup you control', body: 'Export one file and restore it anywhere. You decide where it is saved.' },
        { title: '13 languages', body: 'English, Japanese and eleven more, with light and dark themes.' },
      ],
    },
    privacy: {
      eyebrow: 'Privacy',
      title: 'Your pantry is nobody’s business.',
      body: 'Expiwise is built so that we could not read your data even if we wanted to. Everything lives on your phone.',
      stats: [
        { value: 0, label: 'accounts to create' },
        { value: 0, label: 'trackers or ads' },
        { value: 0, label: 'photos uploaded' },
      ],
      points: [
        'Items, places and photos are stored only on your device.',
        'Text in images is read on your device, never sent anywhere.',
        'Scanning a barcode sends just the number to Open Food Facts.',
        'Please do not store ID, passport, card or account numbers in the app.',
      ],
    },
    cta: {
      title: 'Coming soon to your phone.',
      body: 'Expiwise is heading to Google Play and the App Store. Store links will appear here the moment it is live.',
    },
    support: {
      title: 'Support',
      intro: 'Questions, bug reports or ideas? We read every message.',
      emailLabel: 'Email us',
      faqTitle: 'Frequently asked questions',
      faq: [
        { q: 'Does Expiwise need an internet connection?', a: 'No. Everything works offline. The internet is used only if you scan a barcode to look up a product name.' },
        { q: 'Where is my data stored?', a: 'Only on your phone. There is no account and no server that receives your items or photos.' },
        { q: 'How do I move to a new phone?', a: 'Open Settings → Your data → Back up, save the file, then use Restore on the new phone.' },
        { q: 'Is Expiwise free?', a: 'Yes. The core features are free, with no ads.' },
        { q: 'Does Expiwise tell me if food is safe to eat?', a: 'No. It reminds you of the dates you enter. It does not judge whether something is safe. Always use your own judgement and follow the product’s instructions.' },
        { q: 'A scanned date or product name is wrong.', a: 'Scanning only makes suggestions. Edit any field before saving, and tell us so we can improve it.' },
      ],
    },
    policy: { title: 'Privacy policy' },
    footer: {
      rights: 'Expiwise. All rights reserved.',
      disclaimer: 'Expiwise reminds you of dates you enter; it does not judge whether a product is safe to use or eat.',
      lang: '日本語',
    },
    statusDemo: { expired: 'Expired', soon: 'Soon', ok: 'Fresh' },
    demoItems: [
      { name: 'Whole milk', place: 'Fridge', days: 2 },
      { name: 'Vitamin C', place: 'Cabinet', days: 94 },
      { name: 'Greek yogurt', place: 'Fridge', days: -1 },
      { name: 'Tofu', place: 'Fridge', days: 5 },
      { name: 'Sunscreen', place: 'Bathroom', days: 210 },
    ],
  },

  ja: {
    htmlLang: 'ja',
    meta: {
      title: 'Expiwise — 期限切れになる前に気づく',
      description:
        'Expiwise は食品・医薬品・化粧品などの期限を管理し、期限前にお知らせします。アカウント不要、オフラインで動作、データは端末内だけに保存されます。',
    },
    nav: { features: '機能', privacy: 'プライバシー', support: 'サポート', policy: 'プライバシーポリシー' },
    hero: {
      eyebrow: 'iOS・Android 対応の期限管理アプリ',
      title1: '期限切れの前に、',
      title2: '気づける。',
      sub: 'Expiwise は食品・医薬品・化粧品などの期限を管理し、手遅れになる前にお知らせします。アカウント不要。オフラインで動作。データは端末の外に出ません。',
      ctaNote: '無料・広告なし・トラッキングなし。',
    },
    badges: { google: 'Google Play', apple: 'App Store', soon: '近日公開', get: 'ダウンロード' },
    marquee: ['牛乳', 'ヨーグルト', 'ビタミン', '日焼け止め', '風邪薬', 'お米', '目薬', '豆腐', 'コンタクト', '醤油', '電池', 'シャンプー'],
    story: {
      eyebrow: '使い方',
      title: '棚からリマインドまで、数タップ。',
      steps: [
        { title: 'すばやく追加', body: 'バーコードや印字された日付をスキャン。文字は端末内で読み取られ、あくまで候補です。最終的にあなたが確認します。' },
        { title: '今すべきことが一目で', body: '期限切れ・もうすぐ期限・まだ大丈夫を、重要な順にひと目で確認できます。' },
        { title: 'ちょうどいい通知', body: '通知のタイミングを選べます。鮮度を保つコツや節約のヒントもお届けします。' },
        { title: '自分好みに整理', body: '冷蔵庫、パントリー、洗面所の棚。場所をツリーで入れ子にして、折りたたみ・展開できます。' },
        { title: 'ムダを減らして見える化', body: '使った量、捨てた量、お金の行き先を統計で確認できます。' },
      ],
    },
    features: {
      eyebrow: '機能',
      title: '必要なものだけ、しっかり。',
      items: [
        { title: 'バーコード検索', body: '商品をスキャンすると、オープンなデータベースから名前を自動入力。送信されるのはバーコード番号だけです。' },
        { title: '日付スキャン', body: '印字された日付にカメラを向けるだけ。候補は必ずあなたが確認して確定します。' },
        { title: 'スマートな通知', body: '1つのアイテムに複数の通知を設定可能。アドバイスのヒントも端末内で作成されます。' },
        { title: 'ツリー状の場所管理', body: '部屋・棚・箱を好きなだけ入れ子にでき、場所ごとに写真も保存できます。' },
        { title: '自分で管理するバックアップ', body: 'ファイル1つで書き出し、どこでも復元。保存先はあなたが決めます。' },
        { title: '13言語に対応', body: '日本語・英語ほか11言語、ライト/ダークテーマにも対応。' },
      ],
    },
    privacy: {
      eyebrow: 'プライバシー',
      title: 'あなたの暮らしは、あなただけのもの。',
      body: 'Expiwise は、私たちがデータを読みたくても読めない作りです。すべてあなたの端末の中にあります。',
      stats: [
        { value: 0, label: '作成するアカウント' },
        { value: 0, label: 'トラッカー・広告' },
        { value: 0, label: 'アップロードされる写真' },
      ],
      points: [
        'アイテム・場所・写真は端末内だけに保存されます。',
        '画像内の文字は端末内で読み取られ、外部に送信されません。',
        'バーコードのスキャン時は、番号のみが Open Food Facts に送られます。',
        'ID・パスポート・カード・口座の番号はアプリに保存しないでください。',
      ],
    },
    cta: {
      title: 'まもなくあなたのスマホに。',
      body: 'Expiwise は Google Play と App Store で公開準備中です。公開と同時に、ここにストアのリンクが表示されます。',
    },
    support: {
      title: 'サポート',
      intro: 'ご質問・不具合・ご要望はお気軽にどうぞ。すべてのメッセージに目を通しています。',
      emailLabel: 'メールで連絡',
      faqTitle: 'よくある質問',
      faq: [
        { q: 'インターネット接続は必要ですか？', a: 'いいえ。すべてオフラインで使えます。バーコードで商品名を検索するときだけ通信します。' },
        { q: 'データはどこに保存されますか？', a: 'あなたの端末の中だけです。アカウントはなく、アイテムや写真を受け取るサーバーもありません。' },
        { q: '機種変更するにはどうすればいいですか？', a: '設定 → データ → バックアップでファイルを保存し、新しい端末で「復元」を選んでください。' },
        { q: '無料ですか？', a: 'はい。基本機能は無料で、広告もありません。' },
        { q: '食べても安全かどうか教えてくれますか？', a: 'いいえ。入力された日付をお知らせするだけで、安全かどうかの判断はしません。ご自身の判断と製品の表示に従ってください。' },
        { q: 'スキャンした日付や商品名が違います。', a: 'スキャン結果はあくまで候補です。保存前にどの項目も編集できます。お知らせいただければ改善に役立てます。' },
      ],
    },
    policy: { title: 'プライバシーポリシー' },
    footer: {
      rights: 'Expiwise. All rights reserved.',
      disclaimer: 'Expiwise は入力された日付をお知らせするアプリです。製品が安全かどうかの判断は行いません。',
      lang: 'English',
    },
    statusDemo: { expired: '期限切れ', soon: 'もうすぐ', ok: '余裕あり' },
    demoItems: [
      { name: '牛乳', place: '冷蔵庫', days: 2 },
      { name: 'ビタミンC', place: '薬箱', days: 94 },
      { name: 'ヨーグルト', place: '冷蔵庫', days: -1 },
      { name: '豆腐', place: '冷蔵庫', days: 5 },
      { name: '日焼け止め', place: '洗面所', days: 210 },
    ],
  },
};
