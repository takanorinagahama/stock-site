# ブランチ運用ルール

## 基本原則

- **mainへの直接pushは禁止**
- すべての変更はfeatureブランチ → PRの流れで行う

## ブランチ命名

| 種別 | 命名例 |
|---|---|
| 機能追加 | `feat/score-overhaul` |
| バグ修正 | `fix/filing-env` |
| データ更新 | `data/stocks-2026-04` |
| リファクタリング | `refactor/remove-score-ts` |

## 作業フロー

```bash
# 1. 作業前に必ずmainを最新化
git checkout main
git pull origin main

# 2. featureブランチを切る
git checkout -b feat/xxx

# 3. 作業 → commit

# 4. PR作成 → レビュー → squash merge

# 5. マージ後ブランチ削除
git branch -D feat/xxx
git push origin --delete feat/xxx
```

## スコアデータ更新フロー（月次）

```bash
# ChatGPTが生成したJSONからSQLを生成
pnpm exec tsx scripts/generate_import_sql.ts /path/to/stock_metrics.json

# → scripts/out/import-YYYY-MM.sql が生成される
# → Supabase SQL Editorに貼り付けて実行
# → active_stocks=50 を確認
```

## Claude Codeとの作業

ClaudeがworktreeやPRを作成する場合も同じルールに従う。
worktreeはPRマージ後すみやかに削除する。
