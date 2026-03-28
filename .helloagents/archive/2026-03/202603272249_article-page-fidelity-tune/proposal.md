# 方案: article-page-fidelity-tune

```yaml
@feature: article-page-fidelity-tune
@created: 2026-03-27 22:49:00
@status: completed
@type: implementation
```

## 1. 背景

上一轮整站 `blog.pen` 映射后，首页已经基本回到原型，但单篇文章详情页仍然带有过强的“归档页骨架”痕迹：顶部保留了不属于设计图的最小导航，正文区仍像列表页详情化，而不是你在 `blog.pen` 中定义的独立 article view。

## 2. 目标

- 让 `/posts/*` 更贴近 `blog.pen` 中的文章详情页截图。
- 顶部改回独立 header card，而不是通用导航。
- 正文卡恢复为单块 article panel，底部上一篇/下一篇并入卡片内部。
- 右栏只保留 `search / categories / recent_posts / subscribe` 四块，不再混入 TOC。
- 保持真实 Markdown 内容、站内搜索、主题、相邻文章和 `base=/blog` 路由不变。

## 3. 实施摘要

1. 重写 `PostLayout.astro`，用 `cat ./posts/{slug}.md` 头部卡、breadcrumb 工具条、日期/阅读时长/字数胶囊和单块正文面板替换原来的 archive-detail 混合结构。
2. 从文章详情页移除可见 TOC 容器，改为完全贴合设计图的右栏四卡结构。
3. 调整 `editorial.css` 中 article page 专属类，收正文、标题、段落、分隔线、引用块和底部 pager 的视觉比例。
4. 调整 `panels.css` 中右栏搜索框与订阅按钮的尺寸和对齐方式，使其更接近 `.pen` 画板。

## 4. 决策

- `D001`: 文章详情页优先忠实复刻 `.pen` 中的 article view，不再沿用通用最小导航。
- `D002`: 为了忠实设计图，文章页右栏不再显示 TOC；目录结构仍保留在正文锚点层，不作为当前视觉面板输出。
