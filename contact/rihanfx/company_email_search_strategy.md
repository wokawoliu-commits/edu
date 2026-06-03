# 公司公开邮箱查找策略

更新时间：2026-06-03

## 单点验证案例 1：Supercent

原始名单状态：Supercent 记录为“未公开商务邮箱”。

本次重新检索后，确认可回填公开邮箱：

- 公司：Supercent / 슈퍼센트 주식회사
- 官网域名：`supercent.io`、`en.supercent.io`、`corp.supercent.io`
- 公开邮箱：`help@supercent.io`
- 邮箱类型：C 级，可用但偏 support/general，不是 BD 或 Publishing 专属邮箱
- 建议用法：邮件可以并行发送，但主路径仍建议使用官网 `Submit Your Game` / `Publishing` 入口，并在邮件标题中明确 `Publishing / Strategic partnership inquiry`

交叉验证来源：

- https://en.supercent.io/about
- https://corp.supercent.io/about
- https://supercent.io/PrivacyPolicy
- https://en.supercent.io/TermsofService

这说明第一轮只抓“Contact / Business Development”页面会漏掉很多邮箱。很多日韩公司会把邮箱放在页脚、公司概要、隐私政策、服务条款、招聘页、活动条款或本地语言页面里。

## 单点验证案例 2：111Percent

原始名单状态：111Percent 记录为“未公开商务邮箱”。

本次重新检索后，确认可回填公开邮箱：

- 公司：111Percent / 111퍼센트
- 官网域名：`111percent.net`、`www.111percent.net`
- 公开邮箱：`business@111percent.net`、`branding@111percent.net`、`marketing@111percent.net`
- 排除邮箱：`help@111percent.net` 偏客服，`recruit@111percent.net` 偏招聘
- 邮箱类型：A/B 级，`business@` 可作为商务入口，`branding@` / `marketing@` 可作为合作或市场转接
- 建议用法：首封邮件优先发 `business@111percent.net`，正文请求转给 publishing / business development / strategic partnership 负责人；`branding@` 和 `marketing@` 可在第二触点或抄送中使用

交叉验证来源：

- https://www.111percent.net/contact/
- https://111percent.net/contact/
- 搜索式：`site:111percent.net "사업 문의" "@111percent.net"`、`site:111percent.net "business@111percent.net"`

关键发现：

- 该页面用普通 `fetch` / `curl` 抓不到邮箱；需要用浏览器渲染后读取 `document.body.innerText` 或页面 DOM。
- 英文路径 `https://111percent.net/en/contact/` 返回 404，但韩文主站 `/contact/` 有完整邮箱。
- 韩文标签非常有价值：`사업 문의` 对应 business inquiry，`브랜드 협업 문의` 对应 brand collaboration，`마케팅 문의` 对应 marketing inquiry，`고객센터` 对应 customer support，`채용` 对应 recruiting。

这说明批量抓取时不能只扫英文站，也不能只看静态 HTML。对于 React/Vue/Next 等前端渲染站点，需要把 Playwright 渲染抓取作为二次验证步骤。

## 单点验证案例 3：Gravity

原始名单状态：Gravity 记录为“未公开商务邮箱”。

本次重新检索后，确认可回填公开邮箱：

- 公司：Gravity / GRAVITY Co.,Ltd.
- 官网域名：`gravity.co.kr`、`www.gravity.co.kr`
- 公开邮箱：`business@gravity.co.kr`、`gbg@gravity.co.kr`
- 邮箱类型：A/B 级，`business@` 是韩国总部公开商务邮箱，`gbg@` 是海外业务和支持入口
- 建议用法：首封邮件优先发 `business@gravity.co.kr`，正文请求转给 global publishing / business development / strategic partnership 负责人；`gbg@gravity.co.kr` 可作为海外业务支持备选

交叉验证来源：

- https://www.gravity.co.kr/en/about/globalnetwork
- 页面导航路径：About -> Global Network
- 搜索式：`site:gravity.co.kr "Global Network" "business@gravity.co.kr"`、`site:gravity.co.kr "Overseas business" "gbg@gravity.co.kr"`

关键发现：

- 邮箱不在常规 Contact 页，而在 `Global Network` 页面。
- 普通 `fetch` 静态抓取没有提取出邮箱，但 Playwright 渲染后 `document.body.innerText` 可见 `business@gravity.co.kr`。
- 同页 `mailto:` 链接中还出现 `gbg@gravity.co.kr`，文本标注为 overseas business and support。
- 对有海外子公司、地区发行网络、全球发行体系的公司，必须检查 `Global Network`、`Subsidiaries`、`Branches`、`Overseas offices` 这类页面。

这说明“找邮箱”不能只围绕 Contact / Privacy / Terms。游戏发行商尤其常把总部商务邮箱、海外分支邮箱和地区发行邮箱放在全球网络或子公司页面里。

## 标准查找流程

1. 先确认官方域名

优先从现有名单的官网、IR、新闻稿、App Store / Google Play 开发者页确认公司主域名。不要直接采用第三方数据库里的邮箱，除非能回到官网或官方商店页验证。

2. 搜索多语言页面

同一家公司可能有英文、日文、韩文、公司主体站、招聘站、发行站等多个入口。需要把以下页面都扫一遍：

- 首页页脚
- About / Company / Corporate Profile
- Contact / Inquiry
- Publishing / Submit Your Game / Developer
- Global Network / Overseas Offices / Subsidiaries / Branches
- Privacy Policy
- Terms of Service / Terms and Conditions
- IR / PR / Press / News
- Recruit / Careers
- App support / game support
- 活动页、比赛页、开发者挑战页

3. 使用精确搜索式

把 `domain.com` 替换成公司真实域名：

```text
site:domain.com "@domain.com"
site:domain.com "mailto:"
site:domain.com "email"
site:domain.com "contact"
site:domain.com "business"
site:domain.com "publishing"
site:domain.com "submit your game"
site:domain.com "developer"
site:domain.com "partnership"
site:domain.com "global network"
site:domain.com "overseas business"
site:domain.com "subsidiaries"
site:domain.com "branch office"
```

如果静态抓取没有结果，增加“业务标签 + 邮箱域名”的搜索式：

```text
site:domain.com "business@domain.com"
site:domain.com "사업 문의" "@domain.com"
site:domain.com "브랜드 협업 문의" "@domain.com"
site:domain.com "마케팅 문의" "@domain.com"
site:domain.com "business inquiry" "@domain.com"
site:domain.com "brand collaboration" "@domain.com"
```

日文公司增加：

```text
site:domain.jp "お問い合わせ"
site:domain.jp "会社概要"
site:domain.jp "利用規約"
site:domain.jp "プライバシーポリシー"
site:domain.jp "事業提携"
site:domain.jp "パブリッシング"
```

韩文公司增加：

```text
site:domain.kr "문의"
site:domain.kr "회사소개"
site:domain.kr "이용약관"
site:domain.kr "개인정보처리방침"
site:domain.kr "사업제휴"
site:domain.kr "퍼블리싱"
site:domain.kr "글로벌 네트워크"
site:domain.kr "해외사업"
site:domain.kr "해외 지사"
```

4. 检查隐藏在页面源码里的邮箱

有些页面前端不直接显示邮箱，但源码里会出现 `mailto:`、表单配置、客服邮箱或 JSON 数据。可用命令：

```bash
curl -L "https://domain.com" | rg -o "[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}"
curl -L "https://domain.com/contact" | rg "mailto:|@domain.com"
```

如果站点是 JavaScript 渲染，使用 Playwright 打开页面后再抓取 `document.body.innerText` 和所有 `a[href^='mailto:']`。

对普通 `curl` 没结果但搜索引擎片段显示邮箱的页面，必须跑浏览器渲染复核：

```js
const { chromium } = await import("playwright");
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();
await page.goto("https://domain.com/contact/", { waitUntil: "networkidle" });
await page.waitForTimeout(3000);
const text = await page.locator("body").innerText();
const mailtos = await page.locator("a[href^='mailto:']").evaluateAll((nodes) =>
  nodes.map((a) => a.getAttribute("href"))
);
console.log(text, mailtos);
await browser.close();
```

优先检查这些前端渲染路径：

- `/contact/`
- `/contact`
- `/ko/contact/`
- `/about/`
- `/about/globalnetwork`
- `/globalnetwork`
- `/global-network`
- `/subsidiaries`
- `/branch`
- 主页菜单里点击 Contact 后生成的路由

5. 给邮箱做质量分级

- A 级：BD、Publishing、Business、Partnership、Investment、Corp Dev 邮箱，例如 `bd@`、`biz@`、`publishing@`、`partnership@`、`investment@`
- B 级：Corporate、Contact、Info、IR、PR 邮箱，例如 `contact@`、`info@`、`ir@`、`pr@`
- C 级：Support、Help、Privacy、Recruit 邮箱，例如 `help@`、`support@`、`privacy@`、`recruit@`

外联优先级：

- A 级邮箱：可直接发首封 BD 邮件
- B 级邮箱：可直接发，但正文第一句请请求转给 publishing / investment / corp dev 负责人
- C 级邮箱：只作为兜底，不应单独依赖。必须并行官网表单、LinkedIn、公司页或暖介绍

6. 排除低价值或误导性邮箱

以下邮箱不应作为 BD 主联系人：

- `privacy@`、`dpo@`、`security@`
- `recruit@`、`jobs@`、`career@`
- `syssupport@`、纯系统支持邮箱
- 新闻媒体、代理商、论坛、社交平台邮箱
- 示例邮箱，如 `example@example.com`
- 个人邮箱，除非来自官方高管介绍页、新闻稿或本人 LinkedIn 明确公开

7. 记录证据字段

建议在表格里增加或保留这些字段，方便后续 CRM 跟进：

- `Public Contact Email`
- `Email Type`
- `Email Source URL`
- `Email Note`
- `Confidence`
- `Recommended Outreach Route`
- `Needs Manual Review`

## 对现有 80 家名单的批量优化建议

第一轮可以按优先级做邮箱补全，而不是平均用力：

1. 先做 A 类 15-20 家：每家公司至少查主站、英文站、本地语言站、IR/Contact、Terms/Privacy。
2. 再做 B 类 30-40 家：至少查主站、Contact、Privacy/Terms、发行/开发者入口。
3. C 类只补可快速找到的邮箱，找不到就保留官网入口和 LinkedIn 路径。

每家公司建议保留一条“推荐触达路径”，例如：

- `publishing@company.com + Submit Game form`
- `biz@company.com + LinkedIn Head of Publishing`
- `contact@company.com, request forwarding to Corp Dev`
- `no email, use inquiry form + warm intro`

## Supercent 可直接落表写法

```text
Public Contact Email: help@supercent.io
Email Type: C - support/general
Email Source URL: https://en.supercent.io/about; https://corp.supercent.io/about; https://supercent.io/PrivacyPolicy
Email Note: 官方多页面公开 help@supercent.io；偏通用/客服邮箱，BD仍建议并行 Submit Your Game / Publishing 入口。
Recommended Outreach Route: Submit Your Game / Publishing form first, then email help@supercent.io asking to forward to publishing or strategic partnership team.
Confidence: High for email existence; Medium-Low for BD relevance.
```

## 111Percent 可直接落表写法

```text
Public Contact Email: business@111percent.net; branding@111percent.net; marketing@111percent.net
Email Type: A/B - business / brand collaboration / marketing
Email Source URL: https://www.111percent.net/contact/; https://111percent.net/contact/
Email Note: 官网 Contact 页需浏览器渲染后可见邮箱；BD优先 business@，branding@/marketing@ 作为合作或营销转接，help@/recruit@ 不作为商务首选。
Recommended Outreach Route: Email business@111percent.net first; ask to forward to publishing, BD, or strategic partnership owner. Use branding@/marketing@ only as a secondary route.
Confidence: High for email existence and official source; Medium for direct M&A/investment relevance.
```

## Gravity 可直接落表写法

```text
Public Contact Email: business@gravity.co.kr; gbg@gravity.co.kr
Email Type: A/B - headquarters business / overseas business support
Email Source URL: https://www.gravity.co.kr/en/about/globalnetwork
Email Note: 官网 Global Network 页需浏览器渲染后可见韩国总部 business@；同页 mailto 公开海外业务支持 gbg@，BD优先 business@。
Recommended Outreach Route: Email business@gravity.co.kr first; ask to forward to global publishing, BD, or strategic partnership owner. Use gbg@gravity.co.kr as a secondary overseas-business route.
Confidence: High for email existence and official source; Medium for direct M&A/investment relevance.
```
