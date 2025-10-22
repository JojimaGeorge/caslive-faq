# CasLive FAQ サイト

CasLiveのよくある質問（FAQ）サイトです。11ty（Eleventy）を使用した静的サイトジェネレーターで構築されています。

## 特徴

- ✅ **マークダウンでFAQ管理** - 各FAQを個別のマークダウンファイルで管理
- ✅ **レスポンシブデザイン** - PC・タブレット・スマホに対応
- ✅ **検索機能** - クライアントサイドでのリアルタイム検索
- ✅ **ページネーション** - 1ページあたり18件表示
- ✅ **カテゴリーフィルター** - カテゴリー別の絞り込み表示
- ✅ **将来のCMS対応** - ヘッドレスCMSへの移行が容易

## プロジェクト構成

```
caslive-faq/
├── src/
│   ├── index.njk                  # FAQ一覧ページ
│   ├── faq/                       # FAQ個別ページ（Markdown）
│   │   ├── account-registration.md
│   │   ├── profile-settings.md
│   │   └── ...（20件のサンプル）
│   ├── _includes/
│   │   ├── base.njk               # 共通レイアウト
│   │   └── faq-item.njk           # FAQ個別ページテンプレート
│   ├── css/
│   │   └── style.css              # スタイルシート
│   └── js/
│       ├── search.js              # 検索機能
│       ├── pagination.js          # ページネーション
│       └── filter.js              # カテゴリーフィルター
├── _site/                         # ビルド出力先（gitignore推奨）
├── .eleventy.js                   # 11ty設定ファイル
└── package.json
```

## セットアップ

### 必要な環境
- Node.js（v14以上推奨）

### インストール

```bash
# 依存パッケージのインストール
npm install
```

## 使い方

### 開発サーバーの起動

```bash
npm start
# または
npm run serve
```

ブラウザで `http://localhost:8080` を開いてください。
ファイルを編集すると自動的にリロードされます。

### ビルド

```bash
npm run build
```

`_site/` ディレクトリに静的ファイルが生成されます。

## FAQ の追加方法

### 1. 新しいマークダウンファイルを作成

`src/faq/` ディレクトリに新しい `.md` ファイルを作成します。

例：`src/faq/new-question.md`

```markdown
---
title: "新しい質問のタイトル"
category: "アカウント"
date: 2025-01-20
layout: faq-item.njk
permalink: "/faq/new-question/"
---

## 質問の回答

ここに回答内容を記述します。

### 小見出し

マークダウン形式で自由に記述できます。

- リスト項目1
- リスト項目2
```

### 2. フロントマターの説明

- `title`: 質問のタイトル（必須）
- `category`: カテゴリー名（必須）
  - アカウント、配信、視聴、レベル・ランク、不具合、コイン・ギフト など
- `date`: 投稿日（YYYY-MM-DD形式、必須）
- `layout`: `faq-item.njk` を指定（必須）
- `permalink`: URLパス（必須）

### 3. ビルド・確認

```bash
npm run build
```

一覧ページと個別ページが自動生成されます。

## カテゴリーの追加

新しいカテゴリーを追加する場合：

1. `src/index.njk` のカテゴリーボタンセクションに追加
2. FAQのマークダウンファイルで同じカテゴリー名を使用

## デプロイ

### GitHub Pages

1. リポジトリの Settings > Pages で設定
2. ビルド済みの `_site/` ディレクトリをデプロイ

### Netlify / Vercel

1. リポジトリを接続
2. ビルドコマンド: `npm run build`
3. 公開ディレクトリ: `_site`

## 将来の拡張

### ヘッドレスCMSの導入

現在のマークダウンベースの構成から、以下のヘッドレスCMSに簡単に移行できます：

- **Contentful**
- **Strapi**
- **microCMS**
- **WordPress（REST API）**

11tyのデータファイル機能を使ってCMSからデータを取得するように変更するだけです。

### 外部検索サービスの導入

現在はクライアントサイド検索ですが、以下のサービスで高度な検索が可能になります：

- **Algolia**
- **Elasticsearch**
- **Meilisearch**

## ライセンス

このプロジェクトはCasLive Inc.によって管理されています。
