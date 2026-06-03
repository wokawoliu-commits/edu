# 东南亚游戏发行/投资/收购外联工作包

Generated: 2026-06-03

## 文件

- `index.html`：主工作包，包含统计、Top Targets、可筛选 longlist、来源索引和复制外联模板。
- `sea_game_publishers.csv`：可导入表格软件的候选公司清单。
- `sources.jsonl`：每条公司来源索引，便于复核。
- `outreach_templates.md`：英文邮件、LinkedIn 和 follow-up 模板。
- `output/sea_game_publishers_top.png`、`output/sea_game_publishers_mobile.png`：浏览器 QA 截图。

## 第一波建议

Century Games、iCandy Interactive、Amanotes、NCSOFT/Indygo/Lihuhu、VNGGames、Potato Play、Falcon/OneSoft、Asphere/PlayPark、Funtap、ABI Game Studio。

## QA

- HTML 数据行：46
- Tier A：10
- 每行均有 score、tier、next step、contact route 和至少 2 个来源。
- Playwright 检查通过：搜索 Century = 1 行；Tier A = 10 行；Acquisition filter = 7 行；source cards = 46；console errors = 0。
