# 变更日志

## [Unreleased]

### 快速修改
- **[interactive-enhancements]**: 将第一版快捷键系统继续升级为文章卡片选择模式，为列表卡片暴露 `data-shortcut-card` 钩子，并支持 `j/k` 高亮切换与 `Enter` 打开当前文章 — by Codex
  - 类型: 快速修改（无方案包）
  - 文件: src/layouts/BaseLayout.astro, src/components/PostCard.astro, src/styles/editorial.css, tests/keyboard-shortcuts.test.mjs
- **[interactive-enhancements]**: 在 `BaseLayout` 中新增第一版 lazyvim 风格全局快捷键层，接入 `/`、`?`、`Esc`、`g h/g p/g a/g c`、`j/k/gg/G`，并补齐快捷键帮助面板与回归测试 — by Codex
  - 类型: 快速修改（无方案包）
  - 文件: src/layouts/BaseLayout.astro, src/layouts/PageLayout.astro, src/components/Footer.astro, src/styles/global.css, tests/keyboard-shortcuts.test.mjs
- **[site-shell]**: 将导航、侧栏、分页、归档工具栏、文章页辅助信息、About/Contact 与 404 页的可见界面文案统一为中文，同时保留命令、快捷键和专有名词原样 — by Codex
  - 类型: 快速修改（无方案包）
  - 文件: src/components/Navbar.astro, src/components/Sidebar.astro, src/components/Footer.astro, src/components/Pagination.astro, src/components/PostCard.astro, src/layouts/PageLayout.astro, src/layouts/PostLayout.astro, src/pages/about.astro, src/pages/contact.astro, src/pages/categories/index.astro, src/pages/categories/[category].astro, src/pages/tags/[tag].astro, src/pages/404.astro
- **[interactive-enhancements]**: 将搜索模态、主题切换、返回顶部与目录面板的可见文案和无障碍标签改为中文，并同步首页回归断言 — by Codex
  - 类型: 快速修改（无方案包）
  - 文件: src/components/SearchModal.astro, src/components/ThemeToggle.astro, src/layouts/BaseLayout.astro, src/components/TOC.astro, tests/prototype-homepage.test.mjs
- **[deployment]**: 修复 `base=/blog` 下自托管字体的开发态路由错误，改为由布局注入 base-aware 字体资源变量并补齐回归测试 — by yangzhuo
  - 类型: 快速修改（无方案包）
  - 文件: src/layouts/BaseLayout.astro:15-45, src/styles/global.css:3-41, tests/public-asset-base.test.mjs:5-18
- **[site-shell]**: 按 `prototype/` 纠偏首页壳层，重做顶部导航、左侧品牌栏、图像化文章 feed 与页脚节奏 — by yangzhuo
  - 类型: 快速修改（无方案包）
  - 文件: src/components/Navbar.astro, src/components/Sidebar.astro, src/components/PostCard.astro, src/components/Footer.astro, src/layouts/PageLayout.astro, src/pages/index.astro, src/styles/global.css
- **[content-pipeline]**: 为三篇示例文章接入本地 SVG 封面资源，并补充首页结构回归测试 — by yangzhuo
  - 类型: 快速修改（无方案包）
  - 文件: src/content/posts/building-static-search.md, src/content/posts/engineering-terminal-memo.md, src/content/posts/layout-notes.md, public/covers/, tests/prototype-homepage.test.mjs

## [0.1.5] - 2026-03-27

### 优化
- **[site-shell]**: 按 `blog.pen` 的文章页设计图修正单篇详情页，去掉不属于原型的最小导航和 TOC 面板，改回独立 header card、breadcrumb、meta 胶囊、单块正文 panel 与内嵌上下篇导航 — by yangzhuo
  - 方案: [202603272249_article-page-fidelity-tune](archive/2026-03/202603272249_article-page-fidelity-tune/)
  - 决策: article-page-fidelity-tune#D001(文章页优先忠实复刻 `.pen` article view), article-page-fidelity-tune#D002(文章页右栏不再显示 TOC)

## [0.1.4] - 2026-03-27

### 优化
- **[site-shell]**: 严格按 `blog.pen` 做逐屏回归，重写 dashboard / archive / post / about / contact 的布局骨架、导航头部、侧栏、feed 卡片、分页和正文壳层，使实现从“风格转译”切回“屏幕映射” — by yangzhuo
  - 方案: [202603272206_blog-pen-screen-faithful](archive/2026-03/202603272206_blog-pen-screen-faithful/)
  - 决策: blog-pen-screen-faithful#D001(逐屏映射四个画板), blog-pen-screen-faithful#D002(单篇文章详情在 `Blog - 文章页` 骨架上做最小必要扩展)
- **[interactive-enhancements]**: 让 SearchModal、TOC、dashboard 顶栏工具和移动端菜单都回到更贴近 `blog.pen` 的容器语义，同时保留 Fuse.js 搜索、主题切换和回到顶部能力 — by yangzhuo
  - 方案: [202603272206_blog-pen-screen-faithful](archive/2026-03/202603272206_blog-pen-screen-faithful/)
  - 决策: blog-pen-screen-faithful#D001(逐屏映射四个画板)

## [0.1.3] - 2026-03-27

### 优化
- **[site-shell]**: 以 `Precision Signal` 方向收口整站视觉 token、壳层、面板和阅读区，降低荧光感与描边噪声，统一首页与文章页的精致度 — by yangzhuo
  - 方案: [202603272135_precision-signal-polish](archive/2026-03/202603272135_precision-signal-polish/)
  - 决策: precision-signal-polish#D001(以共享样式层为主完成整站微调), precision-signal-polish#D002(将文章页调性控制得比首页更克制)
- **[interactive-enhancements]**: 收口搜索模态和目录等轻交互容器的遮罩、输入壳层和高亮反馈，使全站交互细节与新的低噪声控制台风格保持一致 — by yangzhuo
  - 方案: [202603272135_precision-signal-polish](archive/2026-03/202603272135_precision-signal-polish/)
  - 决策: precision-signal-polish#D001(以共享样式层为主完成整站微调)

## [0.1.2] - 2026-03-27

### 优化
- **[site-shell]**: 按 `blog.pen` 重构整站共享壳层，建立三段式控制台布局、系统顶栏、情报侧栏和新的文章阅读外壳 — by yangzhuo
  - 方案: [202603272059_blog-pen-front-redesign](archive/2026-03/202603272059_blog-pen-front-redesign/)
  - 决策: blog-pen-front-redesign#D001(将 blog.pen 转译为“控制台外壳 + 阅读核心”)
- **[interactive-enhancements]**: 重做搜索模态与目录容器，补齐方向键选择、Enter 打开结果和统一控制台交互反馈 — by yangzhuo
  - 方案: [202603272059_blog-pen-front-redesign](archive/2026-03/202603272059_blog-pen-front-redesign/)
  - 决策: blog-pen-front-redesign#D001(将 blog.pen 转译为“控制台外壳 + 阅读核心”)

## [0.1.1] - 2026-03-25

### 修复
- **[interactive-enhancements]**: 审计 `public/` 资源的 base-aware 引用，移除搜索模态对根路径 `"/"` 的 fallback，并补齐静态资源回归测试 — by yangzhuo
  - 方案: [202603252233_public-asset-base-audit](archive/2026-03/202603252233_public-asset-base-audit/)
  - 决策: public-asset-base-audit#D001(保留现有 base-aware 体系并只修复潜在根路径 fallback)

## [0.1.0] - 2026-03-25

### 新增
- **[site-shell]**: 从零搭建终端风格 Astro 博客工程，包含共享布局、侧栏、文章卡片、分页和页面壳层 — by yangzhuo
  - 方案: [202603251943_terminal-blog-shell](archive/2026-03/202603251943_terminal-blog-shell/)
  - 决策: terminal-blog-shell#D001(采用组件优先的均衡方案)
- **[content-pipeline]**: 建立 Markdown 内容集合、分页、分类/标签聚合、上一篇/下一篇和搜索文档派生 — by yangzhuo
  - 方案: [202603251943_terminal-blog-shell](archive/2026-03/202603251943_terminal-blog-shell/)
  - 决策: terminal-blog-shell#D002(构建期静态搜索索引)
- **[deployment]**: 配置 GitHub Pages 发布工作流、RSS、sitemap、base-aware 资源路径和自托管字体资源 — by yangzhuo
  - 方案: [202603251943_terminal-blog-shell](archive/2026-03/202603251943_terminal-blog-shell/)
  - 决策: terminal-blog-shell#D001(围绕静态部署组织工程结构)
