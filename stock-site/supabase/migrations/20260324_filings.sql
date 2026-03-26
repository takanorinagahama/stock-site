-- ============================================================
-- Filing 関連テーブルの作成
-- 実行場所: Supabase ダッシュボード > SQL Editor
-- 実行順:   このファイルを上から順に実行してください
-- ============================================================

-- ① filings テーブル
CREATE TABLE IF NOT EXISTS public.filings (
  id                 bigserial PRIMARY KEY,
  source             text NOT NULL CHECK (source IN ('edgar', 'edinet')),
  ticker             text NOT NULL,
  company_name       text,
  document_type      text,
  title              text,
  filed_at           date,
  period_end         date,
  document_url       text,
  source_document_id text NOT NULL,
  raw_payload        jsonb,
  fetched_at         timestamptz NOT NULL DEFAULT now(),
  created_at         timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT filings_source_doc_unique UNIQUE (source, source_document_id)
);

CREATE INDEX IF NOT EXISTS filings_ticker_idx   ON public.filings (ticker);
CREATE INDEX IF NOT EXISTS filings_filed_at_idx ON public.filings (filed_at DESC NULLS LAST);
CREATE INDEX IF NOT EXISTS filings_source_idx   ON public.filings (source);

-- ② filing_fetch_jobs テーブル
CREATE TABLE IF NOT EXISTS public.filing_fetch_jobs (
  id               bigserial PRIMARY KEY,
  source           text NOT NULL CHECK (source IN ('edgar', 'edinet')),
  run_started_at   timestamptz NOT NULL DEFAULT now(),
  run_finished_at  timestamptz,
  status           text NOT NULL DEFAULT 'running'
                   CHECK (status IN ('running', 'success', 'failed')),
  target_count     integer NOT NULL DEFAULT 0,
  success_count    integer NOT NULL DEFAULT 0,
  failure_count    integer NOT NULL DEFAULT 0,
  error_message    text,
  created_at       timestamptz NOT NULL DEFAULT now()
);

-- ③ RLS 設定
-- filings: 公開ページから anon で SELECT できるよう許可
ALTER TABLE public.filings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "filings_select_public" ON public.filings;
CREATE POLICY "filings_select_public"
  ON public.filings
  FOR SELECT
  TO anon
  USING (true);

-- filing_fetch_jobs: service role のみアクセス（SELECT も不要ならポリシー追加不要）
ALTER TABLE public.filing_fetch_jobs ENABLE ROW LEVEL SECURITY;

-- ④ 動作確認クエリ（実行後に下記を確認してください）
-- SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' AND table_name IN ('filings','filing_fetch_jobs');
