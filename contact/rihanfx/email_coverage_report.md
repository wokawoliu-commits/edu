# 邮箱覆盖率批量优化报告

更新时间：2026-06-03

## 最新复跑结论

本轮按新版策略重新扫描所有仍缺邮箱的公司：先做官方同域静态抓取，再用 Playwright 渲染复核 `/contact`、`/company`、`/about`、`/business`、`/publishing` 等重点页面。

- 本轮跑前：26/80，覆盖率 32.5%
- 本轮扫描缺口：54 家
- 本轮可安全新增：1 家（Gravity，单点复核）
- 本轮跑后：27/80，覆盖率 33.8%

| Tier | 总数 | 跑前有邮箱 | 本轮新增 | 跑后有邮箱 |
| --- | ---: | ---: | ---: | ---: |
| A | 20 | 8 | 0 | 8 |
| B | 40 | 10 | 1 | 11 |
| C | 20 | 8 | 0 | 8 |

## 累计效果

从 19/80 的邮箱覆盖基线开始，累计通过公开官网、官方 Contact 页、条款/隐私页、Global Network 页、直接 URL 复核和 Playwright 渲染复核，新增了 8 家可回填公司。加上已在该基线内的 Supercent，本报告共记录 9 个重点回填案例。

- 初始覆盖：19/80，23.8%
- 当前覆盖：27/80，33.8%
- 累计新增：8 家

## 累计回填清单

| 公司 | Tier | 国家 | 回填邮箱 | 类型 | 来源 | 使用建议 |
| --- | --- | --- | --- | --- | --- | --- |
| Supercent | A | Korea | help@supercent.io | C - support/general fallback | https://en.supercent.io/about | 只能作为兜底；主路径仍走 Submit Your Game / Publishing 入口。 |
| 111Percent | A | Korea | business@111percent.net; branding@111percent.net; marketing@111percent.net | A/B - business/brand/marketing | https://www.111percent.net/contact/ | 优先 business@；branding@/marketing@ 可作为合作或营销转接，help@/recruit@ 不回填为商务首选。 |
| COLOPL | A | Japan | help@colopl.jp | C - support/general fallback | https://colopl.co.jp/contact/ | 只能作为兜底；主路径仍走 COLOPL NEXT/官网入口。 |
| Bushiroad | B | Japan | ir@bushiroad.com; support@bushiroad.com | B/C - IR/support | https://bushiroad.co.jp/en/contact | 邮件请求转给游戏业务/投资合作负责人。 |
| LINE Games | B | Korea | linegames_biz@line.games; ir@line.games | A/B - business/IR | https://www.line.games/company | 优先 linegames_biz@，IR 作为备选转接。 |
| Gravity | B | Korea | business@gravity.co.kr; gbg@gravity.co.kr | A/B - headquarters business / overseas business support | https://www.gravity.co.kr/en/about/globalnetwork | 优先 business@；gbg@ 可作为海外业务支持备选。 |
| NPIXEL | C | Korea | business@npixel.co.kr | A - business | https://npixel.co.kr/ | 可直接作为商务入口；项目匹配度仍偏 C/B。 |
| CYBIRD | C | Japan | otoiawase@cybird.co.jp | B - general inquiry | https://www.cybird.co.jp/contact/ | 日本本地 inquiry 入口，适合请求转给内容/游戏合作负责人。 |
| 4:33 Creative Lab | C | Korea | business@433.co.kr; ftt_bd@433.co.kr | A - business/BD | http://www.433.co.kr/contact | 可直接发 BD 邮件，但公司匹配度偏低，放 C 轮。 |

注：累计回填清单包含 9 个公司行，其中 Supercent 是上一次单点验证前已经同步进当前基线的回填项；从 19/80 到 27/80 的覆盖率净增为 8 家。

## 本轮过滤掉的候选

本轮复跑中有少量页面出现邮箱，但不适合自动回填：

| 公司 | 候选邮箱 | 过滤原因 |
| --- | --- | --- |
| Com2uS Holdings | compliance@com2us.com | 合规邮箱，不适合 BD / publishing 外联。 |
| Com2uS Holdings | c2sholdings_privacy@com2us.com | 隐私邮箱，不适合 BD 外联。 |
| Nexon Korea / Nexon | na_privacy@nexon.com | 隐私邮箱，不适合 BD 外联。 |
| AltPlus | alt-hanako@altplus.co.jp | 不明用途邮箱，疑似活动/项目或个人化邮箱，需人工确认后再使用。 |
| HanbitSoft | security@hanbitsoft.co.kr | 安全邮箱，不适合 BD 外联。 |
| Gravity | syssupport@gravity.co.kr | 系统支持邮箱，不适合 BD 外联。 |

## 渲染复核说明

本轮对缺邮箱公司增加了浏览器渲染复核。大多数 A/B 类大厂在渲染后仍没有公开可用邮箱，说明它们更依赖官网表单、IR、LinkedIn、投资/发行入口和暖介绍。

以下站点本轮 Playwright 渲染全部失败或稳定性较差，不能视为“确认无邮箱”，后续可单点人工复查：

- Super Planet
- WonderPlanet
- AlohaFactory
- StickyHands
- PangSky

## 结论

新版策略已经把“静态抓不到但页面渲染后可见”的情况，以及“邮箱藏在 Global Network / 海外分支页”的情况覆盖进来。当前公开邮箱覆盖率提升到 33.8%。如果要继续提高可触达率，下一步应从“找邮箱”转向“找路径”：

- 官方表单 URL
- LinkedIn 公司页和关键岗位候选人
- 投资/发行项目提交入口
- IR/PR 转接路径
- 暖介绍状态
