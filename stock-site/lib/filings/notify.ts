/**
 * Discord webhook 通知（成功・失敗）
 *
 * 環境変数: DISCORD_WEBHOOK_URL（Vercel に設定済みを前提）
 * 未設定の場合は console.warn のみ（アプリはクラッシュしない）
 */

// ── 共通ヘルパー ──────────────────────────────────────────────────────────

/** JST の HH:MM 文字列を生成する */
function jstTime(isoString: string): string {
  try {
    return new Date(isoString).toLocaleTimeString("ja-JP", {
      timeZone: "Asia/Tokyo",
      hour:   "2-digit",
      minute: "2-digit",
    });
  } catch {
    return isoString;
  }
}

async function postToDiscord(content: string): Promise<void> {
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
  if (!webhookUrl) {
    console.warn("[notify] DISCORD_WEBHOOK_URL が未設定です。通知をスキップします。");
    return;
  }
  try {
    const res = await fetch(webhookUrl, {
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify({ content, username: "AI Stock Data - Filing Bot" }),
    });
    if (!res.ok) {
      console.error("[notify] Discord webhook エラー:", res.status, await res.text());
    }
  } catch (err) {
    console.error("[notify] Discord webhook 送信失敗:", err);
  }
}

// ── 成功通知 ──────────────────────────────────────────────────────────────

export interface NotifySuccessParams {
  source:       string;
  startedAt:    string;   // ISO 8601
  targetCount:  number;
  successCount: number;
  totalSaved:   number;
  totalSkipped: number;
  jobId?:       number;
}

/**
 * バッチ全銘柄成功時の簡潔な 1行通知
 * 例: ✅ EDGAR バッチ完了 | 10銘柄 | 新規 3件 / スキップ 197件 | JST 19:00
 */
export async function notifyDiscordSuccess(params: NotifySuccessParams): Promise<void> {
  const { source, startedAt, targetCount, totalSaved, totalSkipped } = params;
  const time = jstTime(startedAt);
  const content = [
    `✅ **${source.toUpperCase()} バッチ完了**`,
    `| ${targetCount}銘柄`,
    `| 新規 ${totalSaved}件 / スキップ ${totalSkipped}件`,
    `| JST ${time}`,
  ].join(" ");
  await postToDiscord(content);
}

// ── 失敗通知 ──────────────────────────────────────────────────────────────

export interface NotifyFailureParams {
  source:        string;
  startedAt:     string;          // ISO 8601
  ticker?:       string;          // 失敗した ticker（複数の場合はカンマ区切り）
  errorMessage:  string;
  jobId?:        number;
  failureCount?: number;
  successCount?: number;
  targetCount?:  number;
}

/**
 * バッチ失敗時の詳細通知
 */
export async function notifyDiscordFailure(params: NotifyFailureParams): Promise<void> {
  const {
    source, startedAt, ticker, errorMessage,
    jobId, failureCount, successCount, targetCount,
  } = params;

  const time = jstTime(startedAt);

  const lines: string[] = [
    `🚨 **${source.toUpperCase()} バッチ失敗** | JST ${time}`,
    ``,
  ];

  // 集計サマリー（対象 / 成功 / 失敗）
  if (targetCount != null || successCount != null || failureCount != null) {
    const parts = [
      targetCount  != null ? `対象 ${targetCount}銘柄`  : null,
      successCount != null ? `✅ 成功 ${successCount}` : null,
      failureCount != null ? `❌ 失敗 ${failureCount}` : null,
    ].filter(Boolean);
    lines.push(parts.join(" / "));
  }

  if (ticker) {
    lines.push(`**失敗 ticker:** \`${ticker}\``);
  }

  lines.push(`**エラー:**\`\`\`${errorMessage}\`\`\``);

  if (jobId != null) {
    lines.push(`Job ID: ${jobId}`);
  }

  await postToDiscord(lines.filter((l) => l !== "").join("\n"));
}
