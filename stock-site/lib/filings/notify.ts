/**
 * Discord webhook 通知（失敗時のみ送信）
 *
 * 環境変数: DISCORD_WEBHOOK_URL（Vercel に設定済みを前提）
 * 未設定の場合は console.warn のみ（アプリはクラッシュしない）
 */

export interface NotifyFailureParams {
  source:        string;
  startedAt:     string;          // ISO 8601
  ticker?:       string;          // 特定 ticker で失敗した場合
  errorMessage:  string;
  jobId?:        number;
  failureCount?: number;
  successCount?: number;
  targetCount?:  number;
}

export async function notifyDiscordFailure(params: NotifyFailureParams): Promise<void> {
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
  if (!webhookUrl) {
    console.warn("[notify] DISCORD_WEBHOOK_URL が未設定です。通知をスキップします。");
    return;
  }

  const {
    source, startedAt, ticker, errorMessage,
    jobId, failureCount, successCount, targetCount,
  } = params;

  const lines: string[] = [
    `🚨 **Filing バッチ失敗**`,
    ``,
    `**ソース:** ${source}`,
    `**実行開始:** ${startedAt}`,
    ticker ? `**失敗 ticker:** \`${ticker}\`` : "",
    `**エラー:** \`\`\`${errorMessage}\`\`\``,
    jobId != null ? `**ジョブ ID:** ${jobId}` : "",
    targetCount != null ? `**対象件数:** ${targetCount}` : "",
    successCount != null ? `**成功:** ${successCount}` : "",
    failureCount != null ? `**失敗:** ${failureCount}` : "",
  ].filter((l) => l !== "");

  const body = {
    content: lines.join("\n"),
    username: "AI Stock Data - Filing Bot",
  };

  try {
    const res = await fetch(webhookUrl, {
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify(body),
    });
    if (!res.ok) {
      console.error("[notify] Discord webhook エラー:", res.status, await res.text());
    }
  } catch (err) {
    console.error("[notify] Discord webhook 送信失敗:", err);
  }
}
