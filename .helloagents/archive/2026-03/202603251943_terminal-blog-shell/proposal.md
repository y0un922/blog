# 变更提案: terminal-blog-shell

## 元信息
```yaml
类型: 新功能
方案类型: implementation
优先级: P0
状态: 已确认
创建: 2026-03-25
```

---

## 1. 需求

### 背景
当前仓库只有博客设计规格与终端风格原型，没有可运行的 Astro 项目骨架，也没有真实的内容模型、页面路由、搜索、主题切换和 GitHub Pages 发布链路。目标不是复刻一个静态 demo，而是在仓库根目录落成一个可长期维护的个人博客站点。

### 目标
- 在仓库根目录搭建 Astro + Tailwind v4 + vanilla JS 的静态博客工程。
- 以 `prototype/` 为视觉参考，保留 no-line、左偏 editorial、Catppuccin、Space Grotesk + JetBrains Mono 的设计语言。
- 交付真实可用的首页、文章页、分类页、标签页、About、404、RSS、站内搜索、主题切换、TOC、分页和 GitHub Pages 部署流程。
- 采用组件优先的均衡方案，保证首版一次可用，同时为后续写作和维护留出清晰结构。

### 约束条件
```yaml
时间约束: 首版需一次性交付可用站点，优先覆盖核心页面、基础交互和部署链路。
性能约束: 无前端框架运行时；搜索索引按需加载；保持静态构建输出和可接受的首屏负载。
兼容性约束: GitHub Pages 使用 site=https://y0un92.github.io 和 base=/blog；桌面端与移动端都需可用。
业务约束: 内容为中文、UI 为英文；不引入 CMS/SSR/i18n；不沿用 prototype 中的假数据、外链图片、CDN Tailwind 或占位交互。
```

### 验收标准
- [ ] 构建产物包含首页、文章详情、分类、标签、About、404、RSS，并且在 `/blog` base path 下链接与资源路径正确。
- [ ] `src/content/posts/` 使用 Astro Content Collections 管理文章，支持 `draft` 过滤、分类/标签聚合、分页和上一篇/下一篇导航。
- [ ] 搜索、主题切换、移动端导航、返回顶部和文章 TOC 为真实可用的前端交互，而非视觉占位。
- [ ] 视觉实现遵守 no-line、左偏 editorial、双主题、终端元数据排版和原型的主要版式语言。
- [ ] 本地安装与构建流程可运行，并具备 GitHub Actions Pages 发布工作流。

---

## 2. 方案

### 技术方案
采用“组件优先的均衡方案”落地整个站点：

1. 在仓库根目录初始化 Astro 工程，配置 TypeScript、Tailwind v4、Shiki、RSS、Sitemap、静态输出和 `base=/blog`。
2. 用 `src/styles/global.css` 管理 Catppuccin Mocha/Latte token、字体栈、no-line 语义类和全局排版，不复用 prototype 的 CDN 配置与散落十六进制颜色。
3. 用 `src/content/config.ts` 和 `src/utils/posts.ts` 建立内容模型、发布过滤、分页、taxonomy 聚合、搜索索引和上一篇/下一篇计算。
4. 页面结构分成布局层、内容层、taxonomy 层、增强交互层，避免页面模板直接承载数据逻辑。
5. 以少量 vanilla JS 实现搜索模态、主题切换、TOC、移动端菜单和返回顶部，保持零框架运行时。
6. 用真实站点元数据替换 prototype 中的假系统信息，并补齐 GitHub Actions 发布、robots、favicon 和基础 SEO 元信息。

### 影响范围
```yaml
涉及模块:
  - 工程配置: package.json、astro.config.mjs、tsconfig.json、GitHub Actions、静态资源配置
  - 样式系统: src/styles/global.css、主题 token、字体与全局排版
  - 内容系统: src/content/config.ts、src/content/posts/、src/utils/posts.ts
  - 页面布局: BaseLayout、PageLayout、PostLayout、Navbar、Sidebar、Footer
  - 页面路由: 首页、文章页、分类页、标签页、About、404、RSS、搜索索引端点
  - 客户端增强: 搜索、主题切换、TOC、移动端菜单、返回顶部
预计变更文件: 25-35
```

### 风险评估
| 风险 | 等级 | 应对 |
|------|------|------|
| `base=/blog` 处理不一致导致分页、RSS、搜索索引或资源路径失效 | 高 | 从工程初始化开始统一 base-aware 链接与端点生成，构建验证时重点检查 |
| 过度追原型视觉而牺牲真实数据流和组件边界 | 中 | 先固化内容模型和组件职责，再做逐屏视觉校准 |
| 本地缺少依赖或字体资源，导致安装和视觉实现受阻 | 中 | 在实施早期验证依赖安装与资源策略，必要时使用可回退字体栈并记录阻断点 |
| 搜索索引或前端脚本组织失控，削弱无框架实现的可维护性 | 中 | 控制索引字段、采用小型独立脚本模块和 data-attribute 绑定 |

---

## 3. 技术设计（可选）

> 本方案涉及架构组织、构建期数据管线和静态端点设计，需明确记录。

### 架构设计
```mermaid
flowchart TD
    A[src/content/posts/*.md] --> B[src/content/config.ts]
    B --> C[src/utils/posts.ts]
    C --> D[index/categories/tags/about pages]
    C --> E[posts/[...slug].astro]
    C --> F[search-index.json.ts]
    C --> G[rss.xml.ts]
    H[src/styles/global.css] --> D
    H --> E
    I[vanilla JS enhancements] --> D
    I --> E
    J[BaseLayout/PageLayout/PostLayout] --> D
    J --> E
```

### API设计
#### GET /search-index.json
- **请求**: 无请求体，构建期生成静态 JSON。
- **响应**: 精简文章索引数组，包含 `title`、`description`、`category`、`tags`、`slug`、`date` 等字段。

#### GET /rss.xml
- **请求**: 无请求体，构建期生成 RSS 2.0 feed。
- **响应**: 基于已发布文章集合生成的 XML，URL 需包含正确的 `site + base` 前缀。

### 数据模型
| 字段 | 类型 | 说明 |
|------|------|------|
| title | string | 文章标题，必填 |
| description | string | SEO 与卡片摘要，必填 |
| date | date | 发布时间，必填 |
| category | string | 单一分类，使用 ASCII 安全 slug |
| tags | string[] | 标签列表，支持多个 |
| cover | string? | 可选封面资源路径 |
| draft | boolean | 是否跳过发布 |

---

## 4. 核心场景

> 执行完成后同步到对应模块文档

### 场景: 浏览最近文章与侧栏导航
**模块**: 首页布局、Sidebar、PostCard、Pagination
**条件**: 用户访问首页或分页列表页
**行为**: 系统按发布日期展示文章卡片、分类索引和真实站点元数据，并提供分页导航
**结果**: 用户可以在终端风格的左偏布局中浏览文章列表，而不是看到静态假数据

### 场景: 阅读文章与目录定位
**模块**: PostLayout、TOC、上一篇/下一篇导航、Markdown 渲染
**条件**: 用户打开任意文章详情页
**行为**: 系统渲染 Markdown 正文、代码高亮、标签、目录和上一篇/下一篇关系
**结果**: 用户获得稳定的长文阅读体验，并可通过 TOC 快速跳转

### 场景: 站内搜索与主题切换
**模块**: SearchModal、search-index.json、ThemeToggle、前端增强脚本
**条件**: 用户按下 `Ctrl/Cmd+K` 或点击搜索入口，或切换明暗主题
**行为**: 客户端按需加载搜索索引与 Fuse.js，并持久化主题偏好
**结果**: 搜索和主题切换是真实可用的站点能力，且不引入框架运行时

---

## 5. 技术决策

> 本方案涉及的技术决策，归档后成为决策的唯一完整记录

### terminal-blog-shell#D001: 采用组件优先的均衡方案作为首版实施路径
**日期**: 2026-03-25
**状态**: ✅采纳
**背景**: 当前任务要求从零搭建可运行博客，同时要兼顾原型风格、真实功能和后续可维护性。
**选项分析**:
| 选项 | 优点 | 缺点 |
|------|------|------|
| A: 组件优先的均衡方案 | 首版即可覆盖真实站点能力，结构清晰，返工风险最低 | 首屏视觉成品速度不如原型还原优先 |
| B: 原型还原优先方案 | 视觉成品出来最快，最容易对齐原型氛围 | 后续补数据流、搜索、RSS、分页时返工概率最高 |
| C: 内容系统优先方案 | 长期写作和数据组织最稳 | 前期投入偏重，首版成品感输出较慢 |
**决策**: 选择方案A
**理由**: 当前目标不是做视觉 demo，而是交付一套真实可用且可维护的博客。组件优先的均衡方案最符合“首版完整交付 + 后续易维护”的双重要求。
**影响**: 布局、内容模型、数据工具、前端增强和部署配置都会围绕组件边界和共享数据逻辑组织。

### terminal-blog-shell#D002: 采用构建期静态搜索索引 + Fuse.js 按需加载
**日期**: 2026-03-25
**状态**: ✅采纳
**背景**: 站点部署在 GitHub Pages，不能依赖服务端搜索能力，但仍需要真实可用的站内搜索。
**选项分析**:
| 选项 | 优点 | 缺点 |
|------|------|------|
| A: 构建期生成 `search-index.json` + 客户端按需加载 Fuse.js | 完全适配静态部署，功能真实，首屏不强制加载搜索依赖 | 内容量增长后需关注索引体积 |
| B: 无搜索，仅保留视觉搜索框 | 实现最省力 | 不满足规格要求，且会保留假交互 |
**决策**: 选择方案A
**理由**: 它在当前技术栈和部署模型下最自然，可用性与实现成本平衡最好。
**影响**: 需要统一搜索文档字段、base-aware 资源路径和模态交互脚本组织方式。
