import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { companies, noEmail } from "./data.mjs";

const outDir = path.dirname(fileURLToPath(import.meta.url));
const generatedDate = "2026-06-03";

function esc(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function csvEscape(value) {
  const text = String(value ?? "");
  return /[",\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
}

function scoreToTier(score) {
  if (score >= 78) return "A";
  if (score >= 60) return "B";
  return "C";
}

companies.forEach((company) => {
  company.score = company.scores.reduce((sum, value) => sum + value, 0);
  company.tier = scoreToTier(company.score);
});

companies.sort((a, b) => b.score - a.score || a.name.localeCompare(b.name));
companies.forEach((company, index) => {
  company.rank = index + 1;
  company.id = `ME-${String(index + 1).padStart(3, "0")}`;
});

const countries = [...new Set(companies.map((company) => company.country))].sort();
const regions = [...new Set(companies.map((company) => company.region))].sort();
const avgScore = Math.round(companies.reduce((sum, company) => sum + company.score, 0) / companies.length);
const emailCount = companies.filter((company) => company.email && company.email !== noEmail).length;
const tierCounts = ["A", "B", "C"].map((tier) => [tier, companies.filter((company) => company.tier === tier).length]);

function writeCsv() {
  const headers = [
    "Rank", "Tier", "Score", "Company", "Country", "Region", "Website", "Type",
    "Representative works", "Scale", "Signal", "Deals", "Entry", "Contact URL",
    "Email", "Email note", "Angle", "Next step", "Confidence", "Score breakdown", "Sources"
  ];
  const lines = [headers.join(",")];
  for (const c of companies) {
    lines.push([
      c.rank, c.tier, c.score, c.name, c.country, c.region, c.website, c.type,
      c.works, c.scale, c.signal, c.dealText, c.entry, c.contactUrl,
      c.email, c.emailNote, c.angle, c.next, c.confidence, c.scores.join(" / "), c.sources.join(" | ")
    ].map(csvEscape).join(","));
  }
  fs.writeFileSync(path.join(outDir, "middle_east_game_publishers.csv"), `${lines.join("\n")}\n`);
}

function writeSources() {
  const lines = [];
  for (const company of companies) {
    company.sources.forEach((url, index) => {
      lines.push(JSON.stringify({ company: company.name, source_index: index + 1, url, retrieved: generatedDate }));
    });
  }
  fs.writeFileSync(path.join(outDir, "sources.jsonl"), `${lines.join("\n")}\n`);
}

function writeTemplates() {
  const md = `# MENA Publisher / Investor Outreach Templates

Use placeholders for sensitive data: [StudioLegalName], [GameName], [US CPI range], [D1/D7/D30 range], [test spend / rounds], [cash runway], and [preferred structure].

## Initial Email

Subject: US-tested casual adventure/simulation game - MENA strategic fit?

Hi [Name],

I'm [Your Name] from [StudioLegalName]. We are building [GameName], a mobile casual adventure/simulation game in the Family Island neighborhood, and we have completed several US market tests with encouraging CPI and retention signals.

At a high level, the latest tests were in the [US CPI range] CPI range with D1/D7/D30 retention around [D1/D7/D30 range], across [test spend / rounds]. We are now speaking with a small number of MENA publishers, investors, and strategic buyers that could help us scale, invest, acquire the project/team, or structure a publishing/MG partnership.

Based on [Company]'s work in [relevant portfolio / MENA publishing / mobile casual / strategic investment], I thought this may be worth a short conversation.

Happy to share a compact deck, gameplay video, and KPI summary first. Would you be open to a 30-minute intro call next week?

Best,
[Signature]

## LinkedIn Short Note

Hi [Name], I'm [Your Name] from [StudioLegalName]. We have a US-tested mobile casual adventure/simulation game similar to Family Island and are exploring selected MENA strategic investment, acquisition, or publishing/MG conversations. Would it be relevant to send a 1-page teaser for [Company]?

## Saudi / Investor Version

Subject: US-tested mobile game with Saudi/MENA scaling potential

Hi [Name],

We are exploring a strategic financing or acquisition path for [GameName], a mobile casual adventure/simulation title with encouraging US CPI and retention test results. The project needs a partner who can support the next UA/content milestone, and we are flexible on structure: strategic investment, project acquisition, team acquisition, or publishing/MG.

Given [Company]'s focus on gaming investment and the Saudi/MENA ecosystem, I would value your view on whether this fits your mandate. We can share a teaser with KPI ranges first, then move to detailed cohort data after mutual interest/NDA.

## Follow-up

Hi [Name], quick follow-up in case this is relevant for [Company]'s publishing, investment, or corporate development team.

Short version: [GameName] has completed several US tests with CPI in the [US CPI range] range and retention around [D1/D7/D30 range]. We are flexible on structure: strategic investment, acquisition/project transfer, or publishing/MG.

Would [alternate contact/team] be the right person to review the teaser?
`;
  fs.writeFileSync(path.join(outDir, "outreach_templates.md"), md);
}

function writeHtml() {
  const html = `<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>中东/MENA 游戏发行与投资买方外联工作包</title>
  <link rel="icon" href="data:," />
  <style>
    :root {
      --ink: #172033;
      --muted: #617084;
      --line: #d9e0e8;
      --paper: #f8fafc;
      --panel: #ffffff;
      --blue: #235789;
      --green: #2f6f4e;
      --amber: #9c6315;
      --soft-blue: #e8f1f9;
      --soft-green: #e8f4ed;
      --soft-amber: #fff4df;
    }
    * { box-sizing: border-box; }
    body {
      margin: 0;
      color: var(--ink);
      background: var(--paper);
      font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      line-height: 1.5;
      letter-spacing: 0;
    }
    a { color: var(--blue); text-decoration: none; }
    a:hover { text-decoration: underline; }
    .page { max-width: 1380px; margin: 0 auto; padding: 32px 24px 56px; }
    header { border-bottom: 1px solid var(--line); padding: 12px 0 24px; margin-bottom: 24px; }
    .eyebrow { color: var(--muted); font-size: 13px; font-weight: 800; text-transform: uppercase; }
    h1 { margin: 6px 0 10px; font-size: 34px; line-height: 1.16; letter-spacing: 0; }
    .intro { max-width: 960px; color: #334155; font-size: 16px; }
    .stats { display: grid; grid-template-columns: repeat(5, minmax(0, 1fr)); gap: 12px; margin-top: 20px; }
    .stat { background: var(--panel); border: 1px solid var(--line); border-radius: 8px; padding: 14px; min-height: 92px; }
    .stat span { display: block; color: var(--muted); font-size: 12px; font-weight: 800; }
    .stat strong { display: block; font-size: 28px; margin-top: 4px; }
    section { margin-top: 34px; }
    .section-title { display: flex; align-items: end; justify-content: space-between; gap: 16px; margin-bottom: 14px; }
    h2 { margin: 0; font-size: 22px; letter-spacing: 0; }
    .section-note { color: var(--muted); font-size: 13px; margin: 0; }
    .split { display: grid; grid-template-columns: 1.12fr .88fr; gap: 18px; align-items: start; }
    .panel { background: var(--panel); border: 1px solid var(--line); border-radius: 8px; padding: 18px; }
    .panel p { margin: 10px 0 0; color: #334155; }
    .tier-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 12px; }
    .tier-box { border-radius: 8px; padding: 14px; border: 1px solid var(--line); background: #fff; }
    .tier-box strong { font-size: 24px; display: block; }
    .tier-box p { margin: 6px 0 0; color: var(--muted); font-size: 13px; }
    .tier-A { color: var(--green); }
    .tier-B { color: var(--blue); }
    .tier-C { color: var(--amber); }
    .target-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 14px; }
    .target-card { background: var(--panel); border: 1px solid var(--line); border-radius: 8px; padding: 16px; }
    .card-topline { display: flex; align-items: center; gap: 8px; }
    .rank, .tier, .score, .pill {
      display: inline-flex;
      align-items: center;
      min-height: 24px;
      padding: 2px 8px;
      border-radius: 999px;
      font-size: 12px;
      font-weight: 800;
      background: var(--soft-blue);
      color: var(--blue);
      white-space: nowrap;
    }
    .score { margin-left: auto; background: var(--soft-green); color: var(--green); }
    .target-card h3 { margin: 12px 0 2px; font-size: 18px; letter-spacing: 0; }
    .meta { color: var(--muted); margin: 0 0 12px; font-size: 13px; }
    dl { margin: 0; }
    dt { margin-top: 10px; color: var(--muted); font-size: 12px; font-weight: 800; }
    dd { margin: 3px 0 0; font-size: 14px; }
    .controls { display: grid; grid-template-columns: 1fr 190px 190px 140px 170px; gap: 10px; margin-bottom: 12px; }
    input, select { width: 100%; border: 1px solid var(--line); border-radius: 8px; padding: 10px 11px; background: #fff; color: var(--ink); font: inherit; font-size: 14px; }
    .table-wrap { overflow: auto; border: 1px solid var(--line); border-radius: 8px; background: #fff; max-height: 760px; }
    table { width: 100%; border-collapse: collapse; font-size: 13px; }
    th { position: sticky; top: 0; z-index: 1; background: #edf3f8; color: #17324d; text-align: left; border-bottom: 1px solid var(--line); padding: 10px; white-space: nowrap; }
    td { border-bottom: 1px solid #edf2f7; padding: 10px; vertical-align: top; min-width: 96px; }
    td.company-cell { min-width: 230px; font-weight: 800; }
    td.reason-cell { min-width: 320px; }
    td.action-cell { min-width: 280px; }
    td.entry-cell { min-width: 260px; }
    .pill.region { background: #f4ebff; color: #6841a3; }
    .pill.country { background: var(--soft-green); color: var(--green); }
    .pill.email-none { background: #eef2f7; color: var(--muted); }
    .scorebar { min-width: 126px; }
    .bar { height: 8px; border-radius: 999px; background: #e2e8f0; overflow: hidden; margin-top: 5px; }
    .bar span { display: block; height: 100%; background: linear-gradient(90deg, var(--green), var(--blue)); }
    .templates { background: var(--panel); border: 1px solid var(--line); border-radius: 8px; padding: 20px; }
    .templates h2 { font-size: 21px; margin-top: 0; }
    .templates h3 { margin-top: 26px; font-size: 18px; }
    .templates p { color: #334155; }
    pre { position: relative; white-space: pre-wrap; overflow: auto; background: #0f172a; color: #e2e8f0; border-radius: 8px; padding: 42px 16px 16px; font-size: 13px; line-height: 1.55; }
    pre .copy-btn { position: absolute; top: 8px; right: 8px; border: 1px solid var(--line); border-radius: 8px; background: #fff; color: #0f172a; padding: 5px 9px; font-size: 12px; font-weight: 800; cursor: pointer; }
    .method-list { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 12px; }
    .method-item { border: 1px solid var(--line); border-radius: 8px; background: #fff; padding: 14px; }
    .method-item strong { display: block; margin-bottom: 6px; }
    .source-table td { min-width: 150px; }
    footer { color: var(--muted); font-size: 12px; margin-top: 36px; border-top: 1px solid var(--line); padding-top: 16px; }
    @media (max-width: 1100px) {
      .stats { grid-template-columns: repeat(2, minmax(0, 1fr)); }
      .controls { grid-template-columns: 1fr 1fr; }
      .target-grid { grid-template-columns: 1fr; }
    }
    @media (max-width: 760px) {
      .page { padding: 22px 14px 40px; }
      h1 { font-size: 28px; }
      .stats, .split, .tier-grid, .controls, .method-list { grid-template-columns: 1fr; }
      .section-title { display: block; }
      .stat { min-height: auto; }
      td.reason-cell, td.action-cell, td.entry-cell { min-width: 260px; }
    }
  </style>
</head>
<body>
  <div class="page">
    <header>
      <div class="eyebrow">BD / Publishing / Corp Dev Outreach · ${esc(generatedDate)}</div>
      <h1>中东/MENA 游戏发行与投资买方外联工作包</h1>
      <p class="intro">面向一款类似 Family Island 的移动端休闲冒险/模拟经营游戏。页面聚焦“谁值得优先找、为什么值得找、该怎么开口”，覆盖广义中东/MENA：Saudi、UAE/GCC、Jordan/Levant、Turkey、Israel，以及少量明确服务 MENA 的跨境发行/投资平台。</p>
      <div class="stats">
        <div class="stat"><span>总公司数</span><strong>${companies.length}</strong></div>
        <div class="stat"><span>覆盖区域</span><strong>${regions.length}</strong></div>
        <div class="stat"><span>A Tier 优先对象</span><strong>${tierCounts.find(([tier]) => tier === "A")[1]}</strong></div>
        <div class="stat"><span>平均评分</span><strong>${avgScore}</strong></div>
        <div class="stat"><span>公开邮箱覆盖</span><strong>${emailCount}/${companies.length}</strong><span>其余仅官方表单/公司页</span></div>
      </div>
    </header>

    <section class="split">
      <div class="panel">
        <h2>执行口径</h2>
        <p>第一轮建议只触达 A-tier 前 10-14 家：Savvy/Scopely、Playtika、Sandsoft、Moon Active、Yalla、Tamatem、CrazyLabs、Merak、Impact46、Jawaker、Playhera、Lobah、Babil、Dream Games。先观察对方最关心 KPI、build、交易结构、MENA 本地化还是现金缺口，再决定第二波是否扩展到 Turkey/Israel 中腰部和 UAE/Jordan 区域发行商。</p>
        <p>首封邮件采用“实名 + 区间”策略：可以写 [StudioLegalName] 与 [GameName]，但 CPI、D1/D7/D30、花费、cohort、财务、cap table 和 build 链接只用区间或在对方明确有兴趣/NDA 后分享。</p>
        <p>评分模型：投资/M&A 信号 30、Family Island-like/mobile casual/F2P 适配 25、发行/UA/LiveOps/全球化能力 20、战略协同与组合缺口 15、可触达性 10。</p>
      </div>
      <div class="panel">
        <h2>分层概览</h2>
        <div class="tier-grid" id="tierGrid"></div>
      </div>
    </section>

    <section>
      <div class="section-title">
        <h2>Top A-tier 优先对象</h2>
        <p class="section-note">按总评分排序；每张卡片包含推荐谈法、入口和下一步。</p>
      </div>
      <div class="target-grid" id="topCards"></div>
    </section>

    <section>
      <div class="section-title">
        <h2>完整长名单</h2>
        <p class="section-note"><span id="visibleCount">${companies.length}</span> / ${companies.length} 家显示中</p>
      </div>
      <div class="controls">
        <input id="search" type="search" placeholder="搜索公司、游戏、交易类型、入口、国家、推荐话术" />
        <select id="countryFilter">
          <option value="">全部国家</option>
          ${countries.map((country) => `<option value="${esc(country)}">${esc(country)}</option>`).join("")}
        </select>
        <select id="regionFilter">
          <option value="">全部区域</option>
          ${regions.map((region) => `<option value="${esc(region)}">${esc(region)}</option>`).join("")}
        </select>
        <select id="tierFilter">
          <option value="">全部 Tier</option>
          <option value="A">A Tier</option>
          <option value="B">B Tier</option>
          <option value="C">C Tier</option>
        </select>
        <select id="dealFilter">
          <option value="">全部交易类型</option>
          <option value="acq_asset">收购/资产</option>
          <option value="investment">投资</option>
          <option value="publishing_mg">发行/MG</option>
          <option value="co-development">联合开发</option>
        </select>
      </div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Rank</th>
              <th>Tier</th>
              <th>公司</th>
              <th>国家/区域</th>
              <th>评分</th>
              <th>公司体量</th>
              <th>代表作品</th>
              <th>联系邮箱/入口</th>
              <th>可能交易</th>
              <th>建议入口</th>
              <th>推荐切入点</th>
              <th>下一步</th>
              <th>来源</th>
            </tr>
          </thead>
          <tbody id="companyRows"></tbody>
        </table>
      </div>
    </section>

    <section>
      <div class="section-title">
        <h2>英文外联模板</h2>
        <p class="section-note">每个代码块右上角可复制。模板仅使用占位符和 KPI 区间，不披露精确 cohort、财务、build 或 cap table。</p>
      </div>
      <div class="templates">
        <h2>MENA Publisher / Investor Outreach Templates</h2>
        <p>Use [StudioLegalName], [GameName], [US CPI range], [D1/D7/D30 range], [test spend / rounds], [cash runway], and [preferred structure] as placeholders.</p>
        <h3>Initial email</h3>
        <p>Subject: US-tested casual adventure/simulation game - MENA strategic fit?</p>
        <pre><button class="copy-btn" type="button">复制</button><code>Hi [Name],

I'm [Your Name] from [StudioLegalName]. We are building [GameName], a mobile casual adventure/simulation game in the Family Island neighborhood, and we have completed several US market tests with encouraging CPI and retention signals.

At a high level, the latest tests were in the [US CPI range] CPI range with D1/D7/D30 retention around [D1/D7/D30 range], across [test spend / rounds]. We are now speaking with a small number of MENA publishers, investors, and strategic buyers that could help us scale, invest, acquire the project/team, or structure a publishing/MG partnership.

Based on [Company]'s work in [relevant portfolio / MENA publishing / mobile casual / strategic investment], I thought this may be worth a short conversation.

Happy to share a compact deck, gameplay video, and KPI summary first. Would you be open to a 30-minute intro call next week?

Best,
[Signature]</code></pre>
        <h3>LinkedIn short note</h3>
        <pre><button class="copy-btn" type="button">复制</button><code>Hi [Name], I'm [Your Name] from [StudioLegalName]. We have a US-tested mobile casual adventure/simulation game similar to Family Island and are exploring selected MENA strategic investment, acquisition, or publishing/MG conversations. Would it be relevant to send a 1-page teaser for [Company]?</code></pre>
        <h3>Saudi / investor version</h3>
        <pre><button class="copy-btn" type="button">复制</button><code>Hi [Name],

We are exploring a strategic financing or acquisition path for [GameName], a mobile casual adventure/simulation title with encouraging US CPI and retention test results. The project needs a partner who can support the next UA/content milestone, and we are flexible on structure: strategic investment, project acquisition, team acquisition, or publishing/MG.

Given [Company]'s focus on gaming investment and the Saudi/MENA ecosystem, I would value your view on whether this fits your mandate. We can share a teaser with KPI ranges first, then move to detailed cohort data after mutual interest/NDA.</code></pre>
        <h3>Follow-up</h3>
        <pre><button class="copy-btn" type="button">复制</button><code>Hi [Name], quick follow-up in case this is relevant for [Company]'s publishing, investment, or corporate development team.

Short version: [GameName] has completed several US tests with CPI in the [US CPI range] range and retention around [D1/D7/D30 range]. We are flexible on structure: strategic investment, acquisition/project transfer, or publishing/MG.

Would [alternate contact/team] be the right person to review the teaser?</code></pre>
      </div>
    </section>

    <section>
      <div class="section-title">
        <h2>研究方法和来源口径</h2>
        <p class="section-note">优先官网、IR、新闻稿、收购公告、publisher submission 页面；行业媒体只用于补充交叉验证。</p>
      </div>
      <div class="method-list">
        <div class="method-item"><strong>纳入标准</strong>具备游戏发行、移动运营、投资/并购、集团控股或高相关休闲用户资产的 Middle East/MENA/Turkey/Israel 公司。</div>
        <div class="method-item"><strong>排除标准</strong>不抓个人邮箱；不把 privacy、recruit、support 作为 BD 首选；明显停摆或只做外包服务的公司不进优先池。</div>
        <div class="method-item"><strong>披露策略</strong>页面和模板只使用占位符与 KPI 区间；真实 cohort、财务、build、cap table 等留到对方明确感兴趣后。</div>
      </div>
      <p class="section-note" style="margin-top: 12px;">种子来源：<a href="https://www.pocketgamer.biz/the-top-30-mena-game-makers-of-2025/" target="_blank" rel="noreferrer">PocketGamer MENA Top 30 2025</a> · <a href="https://sandsoft.com/publishing/" target="_blank" rel="noreferrer">Sandsoft Publishing</a> · <a href="https://www.savvygames.com/news/savvy-games-group-completes-acquisition-of-scopely" target="_blank" rel="noreferrer">Savvy acquisition of Scopely</a> · <a href="https://impact46.sa/i46-gaming-fund/" target="_blank" rel="noreferrer">Impact46 Gaming Fund</a></p>
    </section>

    <section>
      <div class="section-title">
        <h2>来源索引</h2>
        <p class="section-note">每家公司保留至少 2 条公开来源；A/B-tier 尽量保留 3 条，其中优先官方来源。</p>
      </div>
      <div class="table-wrap">
        <table class="source-table">
          <thead>
            <tr><th>Rank</th><th>公司</th><th>来源 1</th><th>来源 2</th><th>来源 3</th></tr>
          </thead>
          <tbody id="sourceRows"></tbody>
        </table>
      </div>
    </section>

    <footer>本 HTML 由本地结构化数据生成；联系邮箱以公开公司级邮箱为准；未公开邮箱的公司明确标注为仅官方表单/公司页。最后生成日期：${esc(generatedDate)}。</footer>
  </div>

  <script>
    const companies = ${JSON.stringify(companies)};
    const noEmail = ${JSON.stringify(noEmail)};
    const tierSummary = ["A", "B", "C"].map((tier) => {
      const group = companies.filter((company) => company.tier === tier);
      const scores = group.map((company) => company.score);
      return { tier, total: group.length, top: Math.max(...scores), low: Math.min(...scores) };
    });

    const rowsEl = document.getElementById("companyRows");
    const topCardsEl = document.getElementById("topCards");
    const tierGridEl = document.getElementById("tierGrid");
    const sourceRowsEl = document.getElementById("sourceRows");
    const visibleCountEl = document.getElementById("visibleCount");
    const searchEl = document.getElementById("search");
    const countryEl = document.getElementById("countryFilter");
    const regionEl = document.getElementById("regionFilter");
    const tierEl = document.getElementById("tierFilter");
    const dealEl = document.getElementById("dealFilter");

    function escapeHtml(value) {
      return String(value ?? "")
        .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
    }

    function linkHtml(url, label) {
      return url ? '<a href="' + escapeHtml(url) + '" target="_blank" rel="noreferrer">' + escapeHtml(label) + '</a>' : "";
    }

    function emailHtml(company) {
      if (!company.email || company.email === noEmail) {
        return '<span class="pill email-none">' + escapeHtml(noEmail) + '</span><br><span class="meta">' + escapeHtml(company.emailNote) + '</span>';
      }
      return String(company.email).split(";").map((part) => part.trim()).filter(Boolean).map((email) => {
        return email.includes("@") ? '<a href="mailto:' + escapeHtml(email) + '">' + escapeHtml(email) + '</a>' : escapeHtml(email);
      }).join("<br>") + '<br><span class="meta">' + escapeHtml(company.emailNote) + '</span>';
    }

    function renderTierGrid() {
      tierGridEl.innerHTML = tierSummary.map((tier) => {
        return '<div class="tier-box"><strong class="tier-' + escapeHtml(tier.tier) + '">' + escapeHtml(tier.tier) + '</strong><p>' + escapeHtml(tier.total + " 家 · 分数 " + tier.top + "-" + tier.low) + '</p></div>';
      }).join("");
    }

    function renderTopCards() {
      topCardsEl.innerHTML = companies.filter((c) => c.tier === "A").map((c) => {
        return '<article class="target-card">'
          + '<div class="card-topline"><span class="rank">#' + escapeHtml(c.rank) + '</span><span class="tier tier-' + escapeHtml(c.tier) + '">' + escapeHtml(c.tier) + ' Tier</span><span class="score">' + escapeHtml(c.score) + '</span></div>'
          + '<h3>' + escapeHtml(c.name) + '</h3>'
          + '<p class="meta">' + escapeHtml(c.country) + ' · ' + escapeHtml(c.region) + ' · ' + escapeHtml(c.type) + '</p>'
          + '<dl>'
          + '<dt>公司体量</dt><dd>' + escapeHtml(c.scale) + '</dd>'
          + '<dt>代表作品</dt><dd>' + escapeHtml(c.works) + '</dd>'
          + '<dt>为什么值得找</dt><dd>' + escapeHtml(c.signal) + '</dd>'
          + '<dt>推荐谈法</dt><dd>' + escapeHtml(c.angle) + '</dd>'
          + '<dt>入口</dt><dd>' + escapeHtml(c.entry) + ' · ' + linkHtml(c.contactUrl, "打开入口") + '</dd>'
          + '<dt>联系邮箱</dt><dd>' + emailHtml(c) + '</dd>'
          + '<dt>下一步</dt><dd>' + escapeHtml(c.next) + '</dd>'
          + '</dl></article>';
      }).join("");
    }

    function dealMatches(company, deal) {
      if (!deal) return true;
      return company.deals.includes(deal);
    }

    function filterCompanies() {
      const q = searchEl.value.trim().toLowerCase();
      const country = countryEl.value;
      const region = regionEl.value;
      const tier = tierEl.value;
      const deal = dealEl.value;
      return companies.filter((c) => {
        const haystack = [c.name, c.country, c.region, c.type, c.works, c.scale, c.signal, c.dealText, c.entry, c.email, c.emailNote, c.angle, c.next, c.confidence, c.sources.join(" ")].join(" ").toLowerCase();
        return (!q || haystack.includes(q))
          && (!country || c.country === country)
          && (!region || c.region === region)
          && (!tier || c.tier === tier)
          && dealMatches(c, deal);
      });
    }

    function renderRows() {
      const filtered = filterCompanies();
      rowsEl.innerHTML = filtered.map((c) => {
        const sourceLinks = c.sources.filter(Boolean).map((url, i) => linkHtml(url, "S" + (i + 1))).join(" · ");
        return '<tr>'
          + '<td>' + escapeHtml(c.rank) + '</td>'
          + '<td><span class="pill tier-' + escapeHtml(c.tier) + '">' + escapeHtml(c.tier) + '</span></td>'
          + '<td class="company-cell">' + escapeHtml(c.name) + '<br>' + linkHtml(c.website, "官网") + '<br><span class="meta">' + escapeHtml(c.id) + '</span></td>'
          + '<td><span class="pill country">' + escapeHtml(c.country) + '</span><br><span class="pill region">' + escapeHtml(c.region) + '</span></td>'
          + '<td class="scorebar"><strong>' + escapeHtml(c.score) + '</strong><div class="bar"><span style="width:' + Math.min(100, Number(c.score || 0)) + '%"></span></div><span class="meta">' + escapeHtml(c.scores.join(" / ")) + '</span></td>'
          + '<td class="reason-cell">' + escapeHtml(c.scale) + '</td>'
          + '<td class="reason-cell">' + escapeHtml(c.works) + '</td>'
          + '<td class="entry-cell">' + emailHtml(c) + '<br>' + linkHtml(c.contactUrl, "联系/提交入口") + '</td>'
          + '<td class="action-cell">' + escapeHtml(c.dealText) + '</td>'
          + '<td class="entry-cell">' + escapeHtml(c.entry) + '</td>'
          + '<td class="reason-cell">' + escapeHtml(c.angle) + '</td>'
          + '<td class="action-cell">' + escapeHtml(c.next) + '</td>'
          + '<td>' + sourceLinks + '<br><span class="meta">' + escapeHtml(c.confidence) + '</span></td>'
          + '</tr>';
      }).join("");
      visibleCountEl.textContent = filtered.length;
    }

    function renderSources() {
      sourceRowsEl.innerHTML = companies.map((c) => {
        const links = c.sources.map((url, i) => '<td>' + linkHtml(url, "S" + (i + 1)) + '</td>');
        while (links.length < 3) links.push("<td></td>");
        return '<tr><td>' + escapeHtml(c.rank) + '</td><td>' + escapeHtml(c.name) + '</td>' + links.slice(0, 3).join("") + '</tr>';
      }).join("");
    }

    [searchEl, countryEl, regionEl, tierEl, dealEl].forEach((el) => el.addEventListener("input", renderRows));
    document.querySelectorAll(".copy-btn").forEach((button) => {
      button.addEventListener("click", async () => {
        const code = button.parentElement.querySelector("code").innerText;
        await navigator.clipboard.writeText(code);
        button.textContent = "已复制";
        setTimeout(() => { button.textContent = "复制"; }, 1200);
      });
    });
    renderTierGrid();
    renderTopCards();
    renderRows();
    renderSources();
  </script>
</body>
</html>`;
  fs.writeFileSync(path.join(outDir, "index.html"), html);
}

writeCsv();
writeSources();
writeTemplates();
writeHtml();

console.log(`Generated ${companies.length} companies in ${outDir}`);
