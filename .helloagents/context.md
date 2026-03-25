# 项目上下文

## 1. 基本信息

```yaml
名称: y0un92 Terminal Editorial Blog
描述: 基于 Astro 的终端风格个人博客，使用 Markdown 写作并部署到 GitHub Pages
类型: Web应用
状态: 开发中
```

## 2. 技术上下文

```yaml
语言: TypeScript, Astro, CSS
框架: Astro 5
包管理器: pnpm
构建工具: Vite（通过 Astro）
```

### 主要依赖
| 依赖 | 版本 | 用途 |
|------|------|------|
| astro | 5.18.1 | 静态站点生成、路由、内容渲染 |
| @astrojs/rss | 4.0.17 | RSS 2.0 feed 生成 |
| @astrojs/sitemap | 3.7.1 | sitemap 生成 |
| tailwindcss | 4.2.2 | 原子样式和 CSS-first 主题系统 |
| @tailwindcss/vite | 4.2.2 | Tailwind v4 Vite 接入 |
| fuse.js | 7.1.0 | 客户端模糊搜索 |
| sharp | 0.34.5 | Astro 静态资源优化依赖 |

## 3. 项目概述

### 核心功能
- 以 Markdown 内容集合驱动首页、文章、分类、标签和 RSS 页面。
- 提供真实可用的搜索、主题切换、TOC、移动端菜单和返回顶部交互。
- 使用 Catppuccin Mocha/Latte、Space Grotesk、JetBrains Mono 和左偏 editorial 布局复刻终端感博客气质。

### 项目边界
```yaml
范围内:
  - Astro 静态博客工程
  - Markdown 内容集合和 taxonomy 派生
  - GitHub Pages base=/blog 部署
  - 轻量前端增强（搜索、主题、TOC、菜单）
范围外:
  - CMS、SSR、用户系统、评论系统
  - 全文搜索后端或第三方托管搜索
  - 多语言国际化
```

## 4. 开发约定

### 代码规范
```yaml
命名风格: 组件 PascalCase，工具函数 camelCase，内容分类使用 UPPER_SNAKE_CASE
文件命名: 路由与组件按 Astro 约定组织；模块文档使用 kebab-case
目录组织: src/layouts 管共享壳层，src/components 管 UI 组件，src/utils 管内容派生逻辑
```

### 错误处理
```yaml
错误码格式: 无统一业务错误码，构建失败和路由缺失通过静态构建日志与 404 页面处理
日志级别: 本地以命令输出为准，线上无运行时日志系统
```

### 测试要求
```yaml
测试框架: 当前无单元测试框架，使用 astro check + astro build 作为主要验收
覆盖率要求: 以静态构建和关键路径 smoke test 为主
测试文件位置: 暂无独立测试目录
```

### Git规范
```yaml
分支策略: main 保持稳定，功能实现通过隔离 worktree 分支完成
提交格式: 简洁描述式提交，优先使用 docs/fix/feat 前缀
```

## 5. 当前约束（源自历史决策）

| 约束 | 原因 | 决策来源 |
|------|------|---------|
| 首版采用组件优先的均衡方案，不走“原型先复刻”路线 | 需要一次交付真实可用站点，同时保持后续可维护性 | [202603251943_terminal-blog-shell#D001](archive/2026-03/202603251943_terminal-blog-shell/proposal.md) |
| 搜索采用构建期静态索引 + Fuse.js 按需加载 | 目标部署环境是 GitHub Pages，不能依赖服务端搜索 | [202603251943_terminal-blog-shell#D002](archive/2026-03/202603251943_terminal-blog-shell/proposal.md) |
| 站内链接、RSS、图标和静态资源都必须 base-aware | 部署目标固定在 `/blog` 子路径 | [202603251943_terminal-blog-shell/proposal.md](archive/2026-03/202603251943_terminal-blog-shell/proposal.md) |

## 6. 已知技术债务（可选）

| 债务描述 | 优先级 | 来源 | 建议处理时机 |
|---------|--------|------|-------------|
| 当前验收主要依赖构建和本地 smoke test，缺少更细粒度的自动化回归 | P1 | 2026-03-25 首版实现 | 文章量和交互逻辑进一步增加时引入最小测试基建 |
| 搜索索引仍以标题、摘要、分类和标签为主，未覆盖中文全文检索 | P2 | 2026-03-25 首版实现 | 内容规模明显增长后再评估全文索引策略 |
