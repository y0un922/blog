# blog 知识库

> 本文件是知识库的入口点

## 快速导航

| 需要了解 | 读取文件 |
|---------|---------|
| 项目概况、技术栈、开发约定 | [context.md](context.md) |
| 模块索引 | [modules/_index.md](modules/_index.md) |
| 共享布局与页面壳层 | [modules/site-shell.md](modules/site-shell.md) |
| 内容模型与数据派生 | [modules/content-pipeline.md](modules/content-pipeline.md) |
| 搜索、主题和前端增强 | [modules/interactive-enhancements.md](modules/interactive-enhancements.md) |
| 构建与部署链路 | [modules/deployment.md](modules/deployment.md) |
| 项目变更历史 | [CHANGELOG.md](CHANGELOG.md) |
| 历史方案索引 | [archive/_index.md](archive/_index.md) |

## 模块关键词索引

| 模块 | 关键词 | 摘要 |
|------|--------|------|
| site-shell | layout, navbar, sidebar, page, post | 共享布局、导航、侧栏和页面壳层 |
| content-pipeline | content collections, posts, taxonomy, pagination, rss | Markdown 内容模型与构建期数据派生 |
| interactive-enhancements | search, theme, toc, menu, back-to-top | 浏览器端轻量增强和状态交互 |
| deployment | astro config, tailwind, github pages, fonts | 工程配置、静态资源和发布流程 |

## 知识库状态

```yaml
kb_version: 2.2.3
最后更新: 2026-03-25 20:30
模块数量: 4
待执行方案: 0
```

## 读取指引

```yaml
启动任务:
  1. 读取本文件获取导航
  2. 读取 context.md 获取项目上下文
  3. 检查 archive/_index.md 获取最近方案和决策

任务相关:
  - 调整页面结构: 读取 modules/site-shell.md
  - 调整文章/分类/标签/分页逻辑: 读取 modules/content-pipeline.md
  - 调整搜索、主题和交互: 读取 modules/interactive-enhancements.md
  - 调整构建或部署: 读取 modules/deployment.md
```
