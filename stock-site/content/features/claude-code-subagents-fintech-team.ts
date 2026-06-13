import type { FeatureArticle } from "../../lib/features/types";

export const article: FeatureArticle = {
  slug: "claude-code-subagents-fintech-team",
  title:
    "6人チームでAI社員を持つ方法――Claude CodeのSubagentで金融系プロジェクトを補強する",
  summary:
    "開発・レビュー・QA・セキュリティ・業務確認を役割別AIに任せ、人間は判断と承認に集中する。Claude CodeのSubagentを会社で使うための準備から運用まで、金融系プロジェクトを例に整理する。",
  category: "テーマ深掘り",
  updatedAt: "2026-05-20",
  featured: false,
  relatedThemes: ["ai-related-stocks"],
  relatedStocks: ["MSFT", "GOOGL"],
  sections: [
    {
      heading: "はじめに｜6人でも、役割別AIが揃えば擬似的に15人分の専門スタッフを持てる",
      paragraphs: [
        "Claude CodeのSubagentとは、開発担当・レビュー担当・QA担当・セキュリティ担当といった役割別の専門AIを、一つのプロジェクト内で使い分けられる仕組みのことだ。ChatGPTやClaudeのチャット画面で質問する使い方とは異なり、それぞれのAIが自分の担当範囲だけに集中する形で動く。",
        "これは「AIが人間の代わりに全部やってくれる」仕組みではない。基本は人間が司令塔になり、工程ごとに適切な専門AIへタスクを振る運用だ。AIは調査、整理、実装補助、レビュー観点、異常系の洗い出し、テスト観点、ドキュメント作成を担い、人間は最終判断・承認・優先順位・リスク許容・社内外調整に集中する。",
        "決済・残高・取引・管理画面・監査ログが絡む金融系プロジェクトは、実装だけでなく仕様整理・権限設計・QA・法務確認まで重い。このような案件こそ、役割別AIを工程に組み込む価値が大きい。6人程度のチームでも、AIをうまく使えば擬似的に10〜15人分の専門スタッフを持つような働き方に近づける。",
      ],
    },
    {
      heading: "Claude TeamプランとSubagentは別の話",
      paragraphs: [
        "まず混同しやすい概念を整理しておく。Claude Teamプランは、会社や組織としてClaudeを契約・管理するための仕組みだ。メンバーの招待、権限設定、利用範囲の管理、請求の一本化などが含まれる。2026年時点では月額約30ドル/ユーザー（年払い）が目安で、5〜150人規模の組織向けに設計されている（料金や仕様は変更される可能性があるため、最新の公式サイトを確認すること）。",
        "一方、Subagentは、Claude Code内で使う役割別の専門AIのことだ。「誰がClaudeを使えるか」を管理するのがTeamプランで、「そのClaudeにどんな役割を持たせるか」がSubagentの話になる。",
        "会社利用では、Teamプランでメンバーを管理しながら、共有ProjectでAIに与える前提知識をそろえ、Claude CodeとGitHubで開発プロセスに組み込む構成が現実的だ。",
      ],
    },
    {
      heading: "会社全体の構成イメージ",
      paragraphs: [
        "会社でClaude CodeとSubagentを使う場合、以下の5つの層を整えると動かしやすい。\n\n【Claude Team】\n会社としてClaudeを契約・管理する。メンバー招待、権限、利用範囲を一元管理する。\n\n【Claude Project（共有）】\nプロジェクト概要、用語集、仕様、業務フロー、決定ログ、AI利用ルールを入れる。メンバー全員が同じ前提でClaudeに相談できるようにする土台になる。\n\n【GitHub】\nIssue・Pull Request・レビュー・履歴管理の中心に置く。Claude Codeによる実装やレビューも、GitHub上のPR単位で人間が確認する。\n\n【Claude Code】\n各メンバーのローカル環境、または開発環境で使う。リポジトリ内のCLAUDE.mdや.claude/agents/を読み込ませ、チーム共通ルールで動かす。\n\n【Subagent】\ndeveloper、code-reviewer、qa-tester、security-reviewer、db-reviewerなど、役割別AIとして.claude/agents/配下のmarkdownファイルで定義する。",
      ],
    },
    {
      heading: "会社側がまず準備すること",
      paragraphs: [
        "チームで使い始める前に、会社側として以下を整える必要がある。\n\n・Claude Teamなど会社で利用可能なClaude環境を用意する\n・管理者を決める（Anthropicとの契約窓口、社内ルール策定責任者）\n・利用対象メンバーを決める\n・会社メールで招待する\n・メンバーごとの権限を決める（Claude Code利用者とチャット中心利用者を分けるとよい）\n・共有Projectを作成し、入れてよい情報・入れてはいけない情報のルールを決める\n・GitHubリポジトリへのアクセス権限を整理する\n・AI利用ルールを社内で合意する",
        "特に「Projectに入れてよい情報・入れてはいけない情報」の線引きは早めに決めておくことが重要だ。後述の「AIに入れてよい情報・入れてはいけない情報」の節も参照してほしい。",
      ],
    },
    {
      heading: "メンバーごとの準備と主な使い方",
      paragraphs: [
        "6人チームを例に、役割ごとの準備と使い方を整理する。\n\n■ PM / PdM\n準備：Claude Teamへの参加、共有Projectへのアクセス、プロジェクト概要・スコープ・未決事項の整理、議事録・決定ログ管理ルール、GitHub Issueの起票ルール\n使い方：要件整理、論点整理、仕様ドラフト作成、ステークホルダー説明資料、Issueの分解、受入条件の作成\n\n■ テックリード\n準備：Claude Codeの利用環境、GitHubリポジトリへのアクセス、CLAUDE.mdと.claude/agents/の整備、ブランチ・PR運用ルールの策定\n使い方：設計レビュー、実装方針の整理、Subagentの作成・管理、PRレビュー、セキュリティ・DB・アーキテクチャ観点の確認\n\n■ 開発者\n準備：Claude Teamへの参加、Claude Codeのセットアップ、GitHubアカウントとリポジトリアクセス、ローカル開発環境、ブランチ作成・テスト実行・PR作成の基本ルール\n使い方：developer-agentで実装補助、code-reviewerでセルフレビュー、qa-testerでテスト観点確認、既存コードの理解、小さなPR作成\n\n■ QA / テスト担当\n準備：共有Projectへのアクセス、GitHub Issue/PRへのアクセス、仕様書・API・業務フローへのアクセス、テスト観点テンプレート\n使い方：qa-testerでテストケース作成、異常系の洗い出し、回帰テスト観点作成、受入条件の確認、不具合報告の整理\n\n■ セキュリティ / リスク確認担当\n準備：共有Projectへのアクセス、必要な範囲でGitHub PRを確認できる権限、セキュリティ観点チェックリスト、AIに入力してはいけない情報のルール\n使い方：security-reviewerで認証・認可・ログ・秘密情報・攻撃面を確認、個人情報や機密情報の扱いをチェック、権限管理・監査ログの不足を洗い出す\n\n■ 業務 / コンプラ確認担当\n準備：共有Projectへのアクセス、業務フロー・社内ルール・確認先一覧、法務・コンプラ確認が必要な論点の整理ルール\n使い方：compliance-reviewerで確認事項を整理、業務フロー上のリスクを洗い出す、規約・FAQ・社内説明資料のドラフト作成。ただし最終的な法務・コンプラ判断は必ず人間が行う。",
      ],
    },
    {
      heading: "GitHubまわりの具体的な準備",
      paragraphs: [
        "GitHub OrganizationまたはOrganization管理のリポジトリを用意する。個人アカウントのリポジトリではなく、会社管理のOrganizationに置くと権限管理がしやすい。\n\nメンバーをGitHubに招待し、以下のように権限を分けると管理しやすい。\n\n・Admin：管理者・テックリードなど最小限に絞る\n・Maintain：リポジトリ運用担当\n・Write：開発者\n・Triage / Read：PM、QA、業務担当など確認が主な役割のメンバー",
        "Branch protectionの設定も重要だ。mainブランチへの直接pushを禁止し、Pull Request必須、レビュー必須、テスト・lintが通らないとmergeできない設定にする。AIが作ったPRも必ず人間がレビューする運用を徹底すること。\n\nIssueテンプレートとPRテンプレートも用意しておくと、AIとの作業がスムーズになる。PRテンプレートに入れると良い項目は以下のとおりだ。\n\n・変更概要\n・背景\n・影響範囲\n・テスト内容\n・リスク\n・ロールバック方法\n・人間が確認すべき点\n・法務・業務・セキュリティ確認の要否",
      ],
    },
    {
      heading: "Claude Codeまわりの具体的な準備（CLAUDE.mdとagents/）",
      paragraphs: [
        "Claude Codeを使うメンバーは、各自の開発環境でセットアップする。リポジトリをcloneし、依存関係をインストールし、テスト・lint・buildが実行できる状態にしてからClaude Codeを起動する。\n\nリポジトリのルートにCLAUDE.mdを用意することで、Claude Codeがプロジェクトのルールを理解した状態で動く。また.claude/agents/配下にSubagentのmarkdownファイルを置き、Gitで管理することで、チーム全員が同じAI運用ルールを使えるようになる。\n\n推奨ディレクトリ構成例：\n\nrepo/\n  CLAUDE.md\n  .claude/\n    agents/\n      developer.md\n      code-reviewer.md\n      qa-tester.md\n      security-reviewer.md\n      db-reviewer.md\n      business-reviewer.md\n    commands/\n      review-risk.md\n      make-test-plan.md\n      draft-spec.md",
        "各Subagentのmarkdownファイルは、YAMLフロントマターで設定（name、description、使用するtools、modelなど）を書き、その下にそのエージェントへの指示（システムプロンプト）を記述する形式だ。toolsにはRead・Grep・Glob・Write・Edit・Bashなど必要なものだけを指定し、各agentに最低限の権限だけを与えるのが安全な設計になる。",
      ],
    },
    {
      heading: "CLAUDE.mdに書くべきルール",
      paragraphs: [
        "CLAUDE.mdはClaude Codeがプロジェクトを理解するための設定ファイルだ。金融系プロジェクトでは、以下のようなルールを書いておくことを推奨する。\n\n・小さな差分で実装する\n・仕様変更は影響範囲を説明してから実装する\n・DB変更はマイグレーション、ロールバック方法、監査ログへの影響を必ず出す\n・本番データ、秘密鍵、APIキー、認証情報は扱わない\n・金融・法務・コンプラに関わる判断は確認事項として残し、人間に委ねる\n・勝手に本番DBを変更しない\n・残高・取引・入出金・権限・監査ログに関わる仕様変更は、必ずテスト観点を出す\n・変更時には、変更概要・影響範囲・リスク・テスト観点・人間が確認すべき点を必ず出す\n・実行できない外部作業を「実行済み」と言わない\n・不確かなことは不確かと書く",
      ],
    },
    {
      heading: "Subagentのおすすめ構成——まず3体から始める",
      paragraphs: [
        "最初から多くのSubagentを用意する必要はない。まずは以下の3体から始めるのがよい。\n\n【developer】\n小さく安全に実装する。既存コードを壊さない。変更後にテスト観点を出す。toolsにはRead・Write・Edit・Bash・Grep・Globを設定する。\n\n【code-reviewer】\n差分レビューを行う。バグ・型エラー・設計崩れ・不要な大改修を指摘する。原則として勝手に修正しない。Read・Grep・Globに絞ることで、誤って変更しない設計にできる。\n\n【qa-tester】\n正常系・異常系・空状態・エラー時・権限違い・モバイル表示などのテスト観点を出す。受入条件を整理する。こちらもRead・Grep・Globに絞るのが安全だ。",
        "3体の運用に慣れてきたら、以下を追加していく。\n\n【security-reviewer】\n認証・認可・ログ・秘密情報・攻撃面を確認する。\n\n【db-reviewer】\nDB設計・トランザクション・整合性・冪等性・監査ログを確認する。\n\n【business-reviewer】\n業務フロー・運用・CS対応・社内確認事項を整理する。\n\n【compliance-reviewer】\n法務・コンプラ確認事項を整理する。ただし最終判断はしない。",
      ],
    },
    {
      heading: "実際の使い方——人間が工程ごとにSubagentを呼ぶ",
      paragraphs: [
        "Subagentは自律的に動くAI社員ではなく、人間が工程ごとに呼び出す専門スタッフだ。取引履歴画面の仕様変更を例に、流れを見てみよう。\n\n人間（PM）：「今回の取引履歴画面の仕様変更について、まず要件を整理して」\n→ requirements-agentが論点・影響範囲・未決事項を出す\n\n人間：「developerで小さく実装して」\n→ developer-agentが変更対象ファイルを示し、実装する\n\n人間：「code-reviewerでレビューして」\n→ code-reviewerが「権限チェックの考慮が不足しています」と指摘する\n\n人間：「db-reviewerでデータ整合性の観点を見て」\n→ db-reviewerが「履歴表示の元データと監査ログの参照方針を明確にした方がよい」と指摘する\n\n人間：「qa-testerでテスト観点を出して」\n→ qa-testerが正常系・権限違い・データなし・ページング・エラー時のテストケースを出す\n\nこのように、人間が工程ごとに適切なSubagentを呼び出し、AIの出力を確認しながら進める。承認・最終判断・リスク許容は常に人間が行う。",
      ],
    },
    {
      heading: "金融系プロジェクトで特に効く使い方",
      paragraphs: [
        "決済・残高・取引・管理画面・監査ログが絡むプロジェクトでは、以下の用途でAIを活用する価値が大きい。\n\n・取引履歴や残高表示の異常系洗い出し（データなし・金額ゼロ・タイムアウトなど）\n・二重処理や二重実行の防止観点の整理\n・権限管理の確認（誰が何を見ていいか）\n・監査ログに残すべき項目の洗い出し\n・管理画面の操作ミス防止設計の確認\n・返金・取消・タイムアウト時の業務フロー整理\n・障害時のRunbook作成\n・法務・コンプラ確認事項の整理（最終判断は人間）\n・QAテストケースの網羅化\n・CS対応FAQのドラフト作成",
        "注意点として、AIはこれらの「論点整理」「観点出し」「ドラフト作成」を担う。法的判断、コンプライアンス上の最終結論、規制への適合判断は必ず人間が確認する。AIの出力はもっともらしく見えても誤ることがある。",
      ],
    },
    {
      heading: "AIに入れてよい情報・入れてはいけない情報",
      paragraphs: [
        "会社でAIを使う際は、入力してよい情報と入れてはいけない情報を社内ルールとして定めることが重要だ。\n\n【入れてよい情報】\n・匿名化された仕様\n・サンプルデータ（実データではないもの）\n・業務フロー\n・テーブル定義（機密でないもの）\n・エラーコード\n・公開情報\n・社内で共有許可された設計資料",
        "【AIに入れてはいけない情報】\n・本番顧客データ\n・個人情報\n・秘密鍵・APIキー・認証情報\n・実口座情報\n・未承認の契約書全文\n・外部に出せない機密資料\n・社内規程上AI入力が禁止されている情報\n\nCLAUDE.mdにも「本番データ・秘密鍵・認証情報は扱わない」と明記し、Subagentの指示にも同じルールを記載しておくとよい。",
      ],
    },
    {
      heading: "導入ステップ——10ステップで始める",
      paragraphs: [
        "Step 1：会社としてClaudeの利用環境を用意する（Claude Teamなど）\nStep 2：管理者とメンバーを決め、招待・権限設定する\nStep 3：共有Projectを作り、プロジェクト概要・用語集・業務フロー・決定ログを入れる\nStep 4：GitHubの権限・ブランチ保護・PRルールを整える\nStep 5：Claude Codeを使うメンバーのローカル環境を整える\nStep 6：リポジトリにCLAUDE.mdと.claude/agents/を追加する\nStep 7：developer / code-reviewer / qa-testerの3体から始める\nStep 8：実際のIssueを1つ選び、要件整理→実装→レビュー→QA観点作成まで通す\nStep 9：うまくいったらsecurity-reviewer / db-reviewer / business-reviewerを追加する\nStep 10：効果を測る",
        "測る指標の例：要件整理にかかった時間、仕様書ドラフト作成時間、PR作成時間、レビュー指摘数、QA観点の漏れ、手戻りの減少、人間が判断に集中できたか。小さく始めて、効果を確認してから広げるのが現実的だ。",
      ],
    },
    {
      heading: "注意点",
      paragraphs: [
        "・AIに最終承認を任せない。金融系プロジェクトでは法務・コンプラ・セキュリティ・監査の最終確認は人間が行う\n・AIの出力はもっともらしく見えても誤ることがある。必ず人間がレビューする\n・Subagentを増やしすぎると運用が複雑になり、コストも増える。最初は3体から始める\n・AIを使うほど人間の役割は不要になるのではなく、判断・承認・責任に集中するようになる\n・会社利用では、個人が勝手にAIを使うのではなく、入力してよい情報・権限・レビュー・記録のルールを会社として決める\n・Claude CodeやTeamプランの仕様・料金は変更される可能性があるため、最新の公式ドキュメントを確認すること",
      ],
    },
    {
      heading: "まとめ｜AIは作業を広げ、人間は判断に集中する",
      paragraphs: [
        "Claude CodeのSubagentは、少人数チームの生産性を上げる強力な仕組みだ。ただし本質は「AIに全部任せること」ではなく、「人間が司令塔になり、専門AIを工程に組み込むこと」にある。",
        "会社で使う場合は、Claude Team・共有Project・GitHub・Claude Code・CLAUDE.md・Subagentをセットで整えることが重要だ。個人がバラバラにAIを使うのではなく、チーム共通のルールと前提知識をそろえて初めて、組織としての効果が出る。",
        "特に金融系プロジェクトでは、実装だけでなく、権限・監査ログ・データ整合性・業務フロー・法務確認事項・QA観点の洗い出しにAIを使う価値が大きい。少人数チームでは、採用で人を増やす前に、開発・レビュー・QA・ドキュメント・異常系洗い出しをAIで補強できる段階に来ている。AIは作業を広げ、人間は判断に集中する。この分担が、これからの少人数開発チームの現実的な形だ。",
      ],
    },
  ],
  sources: [
    {
      label: "Create custom subagents - Claude Code Docs",
      url: "https://code.claude.com/docs/en/sub-agents",
      publisher: "Anthropic",
    },
    {
      label: "How and when to use subagents in Claude Code",
      url: "https://claude.com/blog/subagents-in-claude-code",
      publisher: "Anthropic",
    },
    {
      label: "Claude Team Plan – pricing and features",
      url: "https://www.anthropic.com/pricing",
      publisher: "Anthropic",
    },
    {
      label: "GitHub – About protected branches",
      url: "https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches",
      publisher: "GitHub Docs",
    },
  ],
};
