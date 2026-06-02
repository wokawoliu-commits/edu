# 公司公开邮箱查找策略

更新时间：2026-06-02

## 本次单点验证：Supercent

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

## 标准查找流程

1. 先确认官方域名

优先从现有名单的官网、IR、新闻稿、App Store / Google Play 开发者页确认公司主域名。不要直接采用第三方数据库里的邮箱，除非能回到官网或官方商店页验证。

2. 搜索多语言页面

同一家公司可能有英文、日文、韩文、公司主体站、招聘站、发行站等多个入口。需要把以下页面都扫一遍：

- 首页页脚
- About / Company / Corporate Profile
- Contact / Inquiry
- Publishing / Submit Your Game / Developer
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
```

4. 检查隐藏在页面源码里的邮箱

有些页面前端不直接显示邮箱，但源码里会出现 `mailto:`、表单配置、客服邮箱或 JSON 数据。可用命令：

```bash
curl -L "https://domain.com" | rg -o "[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}"
curl -L "https://domain.com/contact" | rg "mailto:|@domain.com"
```

如果站点是 JavaScript 渲染，使用 Playwright 打开页面后再抓取 `document.body.innerText` 和所有 `a[href^='mailto:']`。

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
