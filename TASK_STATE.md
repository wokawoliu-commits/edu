# TASK_STATE

## 任务目标

基于已更新的 `game-buyer-research` skill，把欧洲游戏发行/投资买方外联页中此前没有邮箱覆盖的公司再跑一轮公开邮箱补查，评估邮箱覆盖率能提高多少，并在确认后更新 HTML。

用户最新指令要求：不要继续开发，只写本交接文件。

## 已完成事项

- 已创建并优化本地 Codex skill：`/Users/huangdong/.codex/skills/game-buyer-research/SKILL.md`。
- skill 已包含“找公司 + 找游戏 + 找邮箱”的流程，尤其是邮箱 second-pass recovery loop：
  - 官网 contact 无邮箱时，继续查 Google Play / Apple App Store、游戏描述、privacy/terms/EULA/legal/imprint、press kit、legacy domains、区域报告/行业名录。
  - app store 找到 generic company email 但官网没写时，需要尽量找第二来源交叉验证后再标 High confidence。
  - 不把私人具名邮箱、privacy、recruiting、legal、support 邮箱当作主商务入口，除非明确标 fallback。
- 已用 `quick_validate.py` 校验 skill：`Skill is valid!`
- 已更新欧洲 HTML 中两个原本“仅官方表单”的公司：
  - `Ace Games`：更新为 `info@ace.games; support@ace.games`
  - `Good Job Games`：更新为 `contact@goodjobgames.com; support@goodjobgames.com`
- 当前 HTML 结构化统计：
  - 总公司数：`107`
  - 公开邮箱覆盖：`76/107`
  - 剩余未覆盖：`31`
- 写本文件前，`/Users/huangdong/Downloads/github/edu` 的 `git status -sb` 显示本地 `main` 与 `origin/main` 对齐，工作树干净。

## 关键决策

- 只收录公开公司级/角色型邮箱，避免私人邮箱和非公开邮箱。
- `support@`、`privacy@`、`legal@`、DPO、data protection、copyright、account service、security 等邮箱只作 fallback，不作为 BD/M&A 主入口。
- 如果 app store 或游戏页公开邮箱，且开发者/提供方名称与目标公司一致，可以收录；若官网未直接写，最好再用官方政策页、另一商店地区页、行业报告或平台开发者页交叉验证。
- 对集团/子公司结构要标明入口归属，例如 Ubisoft Mobile 组合里 Green Panda 的邮箱不能等同于 Ubisoft 总部 BD 邮箱。
- Top 25 卡片若公司已有可用邮箱，应在卡片中显示邮箱；这项之前已完成。
- 当前最新指令是暂停开发，所以本轮候选未继续应用到 HTML。

## 查到的重要信息

### 已应用到 HTML

- `Ace Games`
  - 原状态：未公开公司级邮箱，仅官方表单。
  - 找到邮箱：`info@ace.games; support@ace.games`
  - 证据：
    - `https://play.google.com/store/apps/details?hl=en_US&id=games.ace.blastjourney`
    - `https://play.google.com/store/apps/details?hl=he&id=games.ace.fionasfarm`
    - `https://ace.games/`
  - 处理方式：`info@` 作为更合适的公司级 fallback，`support@` 标记为支持路线 fallback。

- `Good Job Games`
  - 原状态：未公开公司级邮箱，仅官方表单。
  - 找到邮箱：`contact@goodjobgames.com; support@goodjobgames.com`
  - 证据：
    - `https://play.google.com/store/apps/details?hl=en-US&id=com.goodjobgames.matchvillains`
    - `https://investgame.net/wp-content/uploads/2025/03/Turkey-Game-Market-Report-2022.pdf`
    - `https://goodjobgames.com/`
  - 处理方式：`contact@` 作为主转接入口，`support@` 作为 fallback。

### 自动抓取阶段发现但尚未人工应用

以下是暂停前自动抓取/单点搜索得到的候选，需要人工复核后才可写入 HTML：

- `Kwalee`
  - `privacypolicy@kwalee.com`
  - 来源：`https://www.kwalee.com/privacy-policy`
  - 判断：privacy 邮箱，仅 fallback，不适合作 BD 主入口。

- `Ubisoft Mobile / Kolibri / Green Panda / Ketchapp`
  - `support@greenpandagames.com`
  - 来源：`https://www.greenpandagames.com/`
  - 判断：Green Panda 支持邮箱，可作为子业务线 fallback；不能等同 Ubisoft 总部商务邮箱。
  - 另抓到 `copyright-infringement@ubisoft.com`，应排除为法务/版权入口。

- `Team17 Group`
  - `help@team17support.com`
  - `dataprotection@team17.com`
  - 来源：Team17 legal/privacy 页面。
  - 判断：support/data protection，仅 fallback 或排除。

- `Supercell`
  - `legal-requests@supercell.com`
  - 来源：Supercell privacy/terms 页面。
  - 判断：legal requests，不适合作商务入口。

- `Gram Games`
  - `privacypolicy@take2games.com`
  - 来源：Gram privacy 页面。
  - 判断：Take-Two privacy route，仅 fallback/排除。

- `SYBO`
  - `partnership@sybogames.com`
  - `press@sybogames.com`
  - `privacy@sybogames.com`
  - `support@sybogames.com`
  - 来源：`https://www.sybo.com/about`、privacy、terms。
  - 判断：`partnership@sybogames.com` 看起来是高价值商务/合作入口，建议下一步优先人工复核并更新。

- `ZeptoLab`
  - `support@zeptolab.com`
  - `legal@zeptolab.com`
  - `privacy@zeptolab.com`
  - 来源：ZeptoLab terms/privacy。
  - 判断：support 可作 fallback；legal/privacy 不适合作商务入口。

- `Loop Games`
  - `support@loopgames.net`
  - 来源：Loop Games privacy/support。
  - 判断：support fallback。

- `GameHouse`
  - `mobilesupport@gamehouse.com`
  - `accountservices@gamehouse.com`
  - `security@gamehouse.com`
  - `security@zylom.com`
  - 来源：GameHouse privacy/terms。
  - 判断：support/account/security，最多 fallback。

- `Oh BiBi`
  - `personaldata@ohbibi.com`
  - 来源：Oh BiBi privacy。
  - 判断：data/privacy，排除为商务入口。

- `Gamebasics`
  - `info.mnl@miniclip.com`
  - `dataprotection@miniclip.com`
  - 来源：Gamebasics 站点多个页面。
  - 判断：`info.mnl@miniclip.com` 可能是 Miniclip Netherlands/office route，值得人工复核；`dataprotection@` 排除。

- `Raw Fury`
  - `support@rawfury.com`
  - 来源：Raw Fury privacy。
  - 判断：support fallback。

- `Bytro Labs`
  - `thi-dpo@stillfront.com`
  - `dpo@stillfront.com`
  - 来源：Bytro privacy。
  - 判断：DPO/data protection，排除为商务入口。

- `Dorado Games / Twin Harbour Interactive`
  - `thi-dpo@stillfront.com`
  - `dpo@stillfront.com`
  - 来源：Dorado privacy。
  - 判断：DPO/data protection，排除为商务入口。

- `Rebellion`
  - `rebellionDPO@rebellion.co.uk`
  - `privacy@rebellion.co.uk`
  - `Reports@Rebellion.co.uk`
  - 来源：Rebellion privacy/terms。
  - 判断：DPO/privacy/reporting，排除为商务主入口。

- `Million Victories`
  - `arnaud@millionvictories.com`
  - `rodrigue@millionvictories.com`
  - `support@millionvictories.zendesk.com`
  - 来源：`https://millionlords.com/presskit/index.php`
  - 判断：两个是具名个人邮箱，按当前规则不应写入公司级外联包；Zendesk support 仅 fallback。

- `Star Stable Entertainment`
  - `gonzalo.fasanella@starstable.com`
  - 来源：Star Stable Entertainment 官网抓取。
  - 判断：具名个人邮箱，按当前规则不写入外联包，除非用户明确允许个人联系人。

## 修改过/需要关注的文件

- `/Users/huangdong/Downloads/github/edu/contact/europefx/index.html`
  - 当前覆盖率显示 `102/107`。
  - 已包含 Ace Games、Good Job Games 以及本轮 `26` 家 second-pass 邮箱更新。
  - 当前相对 HEAD 有本轮 HTML diff，尚未 commit。

- `/Users/huangdong/.codex/skills/game-buyer-research/SKILL.md`
  - 已新增邮箱 second-pass recovery loop。
  - 已新增 app store + 第二来源交叉验证规则。
  - 已通过 skill 校验。
  - 该文件在用户本地 Codex skills 目录，不属于 `/Users/huangdong/Downloads/github/edu` 这个 git repo。

- `/Users/huangdong/.codex/skills/game-buyer-research/agents/openai.yaml`
  - skill UI 元数据文件，之前已生成。

- `/Users/huangdong/Downloads/github/edu/TASK_STATE.md`
  - 本交接文件。

## 当前卡点

- 剩余 `5` 家仍保持“未公开公司级邮箱（仅官方表单）”：`Kwalee`、`Spyke Games`、`Blue Giraffe`、`Coffee Stain Publishing`、`Rebellion`。
- 本轮已排除 privacy/legal/DPO/security/reporting 邮箱和具名个人邮箱；这些不应直接提升有效外联邮箱覆盖率。
- 如果后续继续提升覆盖率，应优先只接受官网明确商务/合作邮箱、官方应用商店开发者邮箱，或可与第二官方来源交叉验证的公司级入口。

## 2026-06-03 续作进展

### 阶段 1：接手与范围确认

- 已阅读本交接文件、`game-buyer-research` skill 和 `/Users/huangdong/Downloads/github/edu/contact/europefx/index.html`。
- 当时继续点确认：从剩余 `31` 家未覆盖邮箱公司中继续人工复核，优先处理 `SYBO`、`Gamebasics`、`Loop Games`、`GameHouse`、`Raw Fury`、`ZeptoLab` 等已出现候选。
- 仓库状态观察：`TASK_STATE.md` 当前为未跟踪文件；后续按用户要求继续更新该文件，不回滚或清理无关状态。

### 阶段 2：公开邮箱二轮复核与 HTML 应用

- 已基于 `game-buyer-research` skill 的 second-pass 规则复核剩余无邮箱公司，优先使用官网、官方 Google Play/App Store 开发者信息、官方 support/contact 页面和母公司/组合公司官方页面。
- 已更新 `/Users/huangdong/Downloads/github/edu/contact/europefx/index.html` 中 `26` 家公司邮箱/入口/note/source 字段：`King`、`Ubisoft Mobile / Kolibri / Green Panda / Ketchapp`、`Moon Active`、`MY.GAMES`、`Team17 Group`、`Supercell`、`Gram Games`、`SYBO`、`Small Giant Games`、`Socialpoint`、`ZeptoLab`、`Loop Games`、`GameDuell`、`Papaya Gaming`、`Trophy Games`、`Nanobit`、`Star Stable Entertainment`、`GameHouse`、`Oh BiBi`、`Million Victories`、`Ankama`、`Gamebasics`、`Raw Fury`、`Tivola Games`、`Bytro Labs`、`Dorado Games / Twin Harbour Interactive`。
- 页面顶部公开邮箱覆盖率已从 `76/107` 更新为 `102/107`。
- 已明确排除 privacy/legal/DPO/security/reporting 邮箱和具名个人邮箱；support 邮箱仅在官方应用商店或官方支持页可确认时作为 fallback 收录，并在 `emailNote` 中标注用途限制。

### 阶段 3：结构化校验

- 已执行 Node 结构化校验：`companies` 总数为 `107`，真实邮箱覆盖为 `102/107`，顶部统计为 `102/107`，三者一致。
- 校验确认：所有含真实邮箱的记录均有 `emailNote` 和 `sources`；`git diff --check -- contact/europefx/index.html` 无 whitespace/error 输出。
- 最终剩余未覆盖公司：`Kwalee`、`Spyke Games`、`Blue Giraffe`、`Coffee Stain Publishing`、`Rebellion`。

## 下一步 TODO

1. 如要继续追求更高覆盖率，复核最终剩余未覆盖公司是否仍应保持“仅官方表单”：
   - `Kwalee`：仅找到 privacy/support 类邮箱，保留 publish 表单。
   - `Spyke Games`：未确认官方公司级商务邮箱，保留官网/LinkedIn。
   - `Blue Giraffe`：未确认官方公司级商务邮箱，保留 contact 表单。
   - `Coffee Stain Publishing`：未确认 publishing 商务邮箱，GDPR/privacy 类不收录。
   - `Rebellion`：仅确认 DPO/privacy/reporting 类邮箱，保留 contact 表单。
2. 如需要发布到 GitHub Pages，确认 commit/push 状态，并注意 Pages/CDN 可能有数分钟缓存。
