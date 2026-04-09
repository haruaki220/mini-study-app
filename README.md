# Mini-Study-App(front-end)

## 概要
学習時間を記録・グラフで可視化するwebアプリです。  
自分がよくだらだら勉強してしまうのを直したくて作成しました。

## 主な機能
- 学習記録追加
- 一覧表示
- グラフ表示

## デモ
https://mini-study-app.vercel.app

## 使用技術

- React
- Typescript
- Vite
- Recharts

## セットアップ

#### インストール
npm install

#### 開発サーバー起動
npm run dev

## バックエンドとの接続
このアプリは以下のバックエンドAPIを使用しています

- Base URL: https://mini-study-backend.onrender.com

## 環境変数
ルートディレクトリに`.env`ファイルを作成し、以下の環境変数を設定して下さい
```
VITE_API_URL=https://mini-study-backend.onrender.com
VITE_SUPABASE_URL=https://imhaozsadvuxbztsjwzk.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImltaGFvenNhZHZ1eGJ6dHNqd3prIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzExNzI0NzksImV4cCI6MjA4Njc0ODQ3OX0.B1nDPOP7ZIpd0pC01XauiyntnW-G_Al5VAivt3DXhdQ
```

※ 本アプリはSupabase Authによる認証を前提としています。  
※ 上記の設定を使用することで、そのまま動作確認が可能です。  
※ Supabaseのanon keyはクライアントで使用することを前提としており、公開されても問題ありません（RLSで保護されています）。  

自身でバックエンド・Supabaseを用意する場合は、環境変数を適宜変更してください。  
バックエンドについては以下のリポジトリを参考にしてください  
https://github.com/haruaki220/mini-study-backend

## 今後の課題
- UI改善
- 統計データの表示方法改善
- 目標機能の追加
