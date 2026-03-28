# 变更提案: blog-pen-screen-faithful

## 元信息
```yaml
类型: 重构/优化
方案类型: implementation
优先级: P1
状态: 已确认
创建: 2026-03-27
```

---

## 1. 需求

### 背景
现有 Astro 博客虽然已经参考 `blog.pen` 做过一轮“控制台外壳 + 阅读核心”转译，但用户明确指出当前实现与原型偏差过大，尤其是首页主框架、导航、左右侧栏和信息模块组织方式与 `blog.pen` 不一致。用户要求本轮停止风格化转译，改为严格以 `blog.pen` 为唯一设计源修改前端界面。

### 目标
- 严格对齐 `blog.pen` 的四个顶层画板：`Geek Blog Dashboard`、`Blog - 文章页`、`Blog - 关于页`、`Blog - 联系页`。
- 首页、分类/标签页、分页页复用 `Geek Blog Dashboard` 的三栏 dashboard 骨架。
- About 与 Contact 页面尽量直接复刻对应画板。
- 单篇文章详情页在 `Blog - 文章页` 骨架上做最小必要的正文详情化变体，保留设计稿的头部、双栏和工具模块气质。
- 保持现有 Astro 内容数据流、搜索、主题切换、TOC、分页和 `base=/blog` 正常工作，并通过 `pnpm build`。

### 约束条件
```yaml
时间约束: 在当前工程内直接改造，不重建项目
性能约束: 保持 Astro 静态输出，不引入新的前端运行时框架
兼容性约束: 保持现有 Markdown 内容模型、搜索索引、主题切换、TOC 与 GitHub Pages `/blog` 子路径兼容
业务约束: 以 blog.pen 为唯一视觉源，优先忠实复刻布局、面板结构、字号、色彩和信息分区，避免二次自由转译
```

### 验收标准
- [ ] 首页、分类页、标签页、分页页、About、Contact 以及公共组件在桌面端尽量贴近 `blog.pen` 的对应画板
- [ ] 单篇文章详情页虽然需容纳真实正文，但整体骨架、侧栏、搜索和工具区仍明显遵循 `Blog - 文章页` 画板
- [ ] 导航、搜索、主题切换、分页、TOC、站内链接和 `base=/blog` 行为保持正常
- [ ] `pnpm build` 通过，且无新增阻断性构建错误

---

## 2. 方案

### 技术方案
采用 `Screen-Faithful Mapping` 方案，将 `blog.pen` 的 4 个顶层画板逐一映射到现有 Astro 页面与共享组件：

1. 以 `Geek Blog Dashboard` 为首页与归档页的唯一设计源，重做 `BaseLayout`、`Navbar`、`Sidebar`、`PageLayout`、`PostCard`、`Pagination`、`Footer` 和相关样式，使桌面端结构回到“左侧固定指标栏 + 中间顶部导航/命令条/文章 feed + 右侧 trend panel”。
2. 以 `Blog - 文章页` 为文章列表/详情混合骨架来源，分类/标签页直接采用其双栏内容区结构；单篇文章详情页保留这一骨架，但将左列列表卡片替换为文章头部 + 正文，并在右列保留搜索、分类、最近文章与订阅模块的画板风格。
3. 以 `Blog - 关于页` 和 `Blog - 联系页` 为 `/about` 与 `/contact` 的直接映射源，优先复刻其头部标题、右侧信息栏和主要文本/表单区，而不是继续套用通用列表页模板。
4. 样式层面回归 `blog.pen` 中更接近原型的数值：深色背景、细描边、JetBrains Mono 主导的层级、圆角胶囊导航、扁平列表卡片和低噪声状态模块。
5. 数据逻辑保持不变，页面实现通过现有 `utils/posts.ts` 派生真实文章、分类、标签与搜索数据，仅在展示结构上对齐画板。

### 影响范围
```yaml
涉及模块:
  - site-shell: BaseLayout、PageLayout、PostLayout、Navbar、Sidebar、Footer、PostCard、Pagination 的结构和样式需按画板重做
  - interactive-enhancements: SearchModal 与 TOC 需要收口到画板中的搜索/右栏交互容器样式
  - pages: index、page/[page]、categories、tags、about、contact、posts/[...slug] 需要重新映射到四个画板
  - styles: global.css、shell.css、panels.css、editorial.css 需要回到更贴近 blog.pen 的 token 和组件层级
预计变更文件: 14-18
```

### 风险评估
| 风险 | 等级 | 应对 |
|------|------|------|
| 单篇文章详情页没有与 `blog.pen` 完全一一对应的画板 | 高 | 使用 `Blog - 文章页` 作为骨架源，只对左侧主列做“详情化”最小扩展，避免脱离设计体系 |
| About/Contact 若继续走通用 PageLayout 会与画板差距过大 | 中 | 放弃统一列表页模板复用，对 About/Contact 做直接页面结构映射 |
| 为了忠实复刻 dashboard 而破坏真实数据流或可用性 | 中 | 保持 utils/posts 与路由逻辑不动，只重做容器结构和组件输出 |
| 当前工作树已有大量改动，误碰无关文件 | 中 | 将修改集中在共享布局、页面和样式文件，避免触碰内容和部署逻辑 |

---

## 3. 技术设计（可选）

> 本次不涉及后端或数据模型变更，但需要记录设计源与页面的映射关系。

### 架构设计
```mermaid
flowchart TD
    A[blog.pen / Geek Blog Dashboard] --> B[index.astro]
    A --> C[page/[page].astro]
    A --> D[categories/* + tags/*]
    A --> E[Navbar / Sidebar / PostCard / Footer]
    F[blog.pen / Blog - 文章页] --> G[PostLayout.astro]
    F --> H[posts/[...slug].astro]
    I[blog.pen / Blog - 关于页] --> J[about.astro]
    K[blog.pen / Blog - 联系页] --> L[contact.astro]
```

### 页面映射
| 设计画板 | 代码落点 | 映射策略 |
|------|------|------|
| Geek Blog Dashboard | `BaseLayout` + `Navbar` + `Sidebar` + `PageLayout` + 首页/分页/分类/标签页 | 直接复刻三栏 dashboard 结构 |
| Blog - 文章页 | `PostLayout` + `posts/[...slug].astro` | 采用相同头部与双栏骨架，左列改为文章详情 |
| Blog - 关于页 | `about.astro` | 直接复刻单页布局 |
| Blog - 联系页 | `contact.astro` | 直接复刻表单 + 侧栏布局 |

---

## 4. 核心场景

> 执行完成后同步到对应模块文档

### 场景: 首页与归档浏览
**模块**: site-shell
**条件**: 用户访问首页、分页页、分类页或标签页
**行为**: 页面以 `Geek Blog Dashboard` 的三栏仪表盘结构展示导航、命令条、文章列表和右侧趋势面板
**结果**: 用户看到的首页和归档页与 `blog.pen` 画板在布局和信息组织上高度一致

### 场景: 单篇文章阅读
**模块**: site-shell / interactive-enhancements
**条件**: 用户访问具体文章详情页
**行为**: 页面采用 `Blog - 文章页` 的头部与双栏骨架，左列展示真实文章头部与正文，右列保留搜索、分类、最近文章与订阅区
**结果**: 文章详情页仍像 `blog.pen` 的体系内页面，而不是另一个完全不同的博客模板

### 场景: 关于与联系
**模块**: site-shell
**条件**: 用户访问 `/about` 或 `/contact`
**行为**: 页面结构直接遵循对应画板，复刻头部、右侧信息卡与主要内容区
**结果**: About/Contact 不再只是“套列表页皮肤”，而是独立对齐到设计稿

### 场景: 搜索与辅助交互
**模块**: interactive-enhancements
**条件**: 用户使用搜索、TOC 或移动端导航
**行为**: 交互能力保持现有实现，但视觉容器与操作入口回到 `blog.pen` 的工具条和右栏模块语境
**结果**: 功能正常，同时交互外观不跳出画板体系

---

## 5. 技术决策

> 本方案涉及的技术决策，归档后成为决策的唯一完整记录

### blog-pen-screen-faithful#D001: 以画板逐屏映射替代“控制台外壳 + 阅读核心”转译
**日期**: 2026-03-27
**状态**: ✅采纳
**背景**: 用户明确指出当前实现与原型差距过大，不再接受“风格参考式”改造，而要求严格按 `blog.pen` 修改前端。
**选项分析**:
| 选项 | 优点 | 缺点 |
|------|------|------|
| A: 继续做设计转译 | 实施更稳，对博客阅读更友好 | 无法满足“严格按照 blog.pen”的目标 |
| B: 以画板逐屏映射复刻 | 最符合用户要求，设计对齐度最高 | 改动面更大，需要处理文章详情页的适配问题 |
**决策**: 选择方案 B
**理由**: 本轮目标已经从“设计参考”变为“设计源驱动实现”。只有按画板逐屏映射，才能正面解决用户指出的偏差问题。
**影响**: 影响所有共享布局、主要页面和样式文件

### blog-pen-screen-faithful#D002: 单篇文章详情页采用“同骨架最小扩展”策略
**日期**: 2026-03-27
**状态**: ✅采纳
**背景**: `blog.pen` 没有单独的长文详情画板，但现有博客必须支持真实正文渲染。
**选项分析**:
| 选项 | 优点 | 缺点 |
|------|------|------|
| A: 为详情页单独新设计一套阅读模板 | 阅读体验可控 | 偏离 blog.pen，违背本轮目标 |
| B: 直接把 `Blog - 文章页` 当作详情页骨架，只在左列最小扩展正文 | 与设计稿保持连续性 | 需要小心处理正文和右栏信息密度 |
**决策**: 选择方案 B
**理由**: 这是在忠实设计稿和真实博客可用性之间最小偏移的做法，既保住画板体系，也能容纳真实正文。
**影响**: 主要影响 `PostLayout.astro`、`TOC.astro` 和文章详情页样式
