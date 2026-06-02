# 邮箱覆盖率批量优化报告

生成时间：2026-06-02

## 覆盖率变化

- 跑前：19/80，覆盖率 23.8%
- 严格自动扫描可新增：4 家
- 直接 URL 复核补充：2 家
- 保守合并后新增：7 家
- 跑后：26/80，覆盖率 32.5%

| Tier | 总数 | 跑前有邮箱 | 本轮新增 | 跑后有邮箱 |
| --- | ---: | ---: | ---: | ---: |
| A | 20 | 6 | 2 | 8 |
| B | 40 | 8 | 2 | 10 |
| C | 20 | 5 | 3 | 8 |

## 本轮回填清单

| 公司 | Tier | 国家 | 回填邮箱 | 类型 | 来源 | 使用建议 |
| --- | --- | --- | --- | --- | --- | --- |
| COLOPL | A | Japan | help@colopl.jp | C - support/general fallback | https://colopl.co.jp/contact/ | 只能作为兜底；主路径仍走 COLOPL NEXT/官网入口。 |
| 111Percent | A | Korea | business@111percent.net; branding@111percent.net; marketing@111percent.net | A/B - business/brand/marketing | https://www.111percent.net/contact/ | 优先 business@；branding@/marketing@ 可作为合作或营销转接，help@/recruit@ 不回填为商务首选。 |
| Bushiroad | B | Japan | ir@bushiroad.com; support@bushiroad.com | B/C - IR/support | https://bushiroad.co.jp/en/contact | 邮件请求转给游戏业务/投资合作负责人。 |
| LINE Games | B | Korea | linegames_biz@line.games; ir@line.games | A/B - business/IR | https://www.line.games/company | 优先 linegames_biz@，IR 作为备选转接。 |
| NPIXEL | C | Korea | business@npixel.co.kr | A - business | https://npixel.co.kr/ | 可直接作为商务入口；项目匹配度仍偏 C/B。 |
| CYBIRD | C | Japan | otoiawase@cybird.co.jp | B - general inquiry | https://www.cybird.co.jp/contact/ | 日本本地 inquiry 入口，适合请求转给内容/游戏合作负责人。 |
| 4:33 Creative Lab | C | Korea | business@433.co.kr; ftt_bd@433.co.kr | A - business/BD | http://www.433.co.kr/contact | 可直接发 BD 邮件，但公司匹配度偏低，放 C 轮。 |

## 被排除的典型误报

- COLOPL 多款单游戏 support 邮箱，如 `alice@colopl.jp`、`casino@colopl.jp`，不作为公司级 BD 联系邮箱。
- LINE Games 的 `game_service@linegames.support`，偏客服/游戏服务，不作为首选。
- NPIXEL 的 `privacy@`、`recruit@`，不适合 BD 外联。
- 111Percent 的 `help@`、`recruit@`，分别偏客服/招聘，不作为商务首选。
- 示例邮箱、招聘邮箱、隐私/安全邮箱、第三方新闻/社交平台邮箱均未回填。

## 结论

基于公开官网的邮箱抓取和单点浏览器渲染复核，覆盖率从 23.8% 提升到 32.5%。日韩游戏公司尤其是大厂更常见的是表单、IR、LinkedIn 或投资/发行入口，而不是公开 BD 邮箱。下一步如果要继续提高“可触达率”，建议把字段从单纯邮箱扩展为：

- 官方表单 URL
- LinkedIn 公司页和关键岗位候选人
- 投资/发行项目提交入口
- IR/PR 转接路径
- 暖介绍状态

这比继续盲目找邮箱更可能带来有效回复。
