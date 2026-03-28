# site-shell

## 职责

负责站点的共享结构与页面壳层，包括 `BaseLayout.astro`、`PageLayout.astro`、`PostLayout.astro`、顶部头部、左侧情报栏、右侧辅助栏、页脚、文章卡片和分页组件。当前版本以 `blog.pen` 为唯一设计源，放弃之前“控制台外壳 + 阅读核心”的自由转译，改为逐屏映射 `Geek Blog Dashboard`、`Blog - 文章页`、`Blog - 关于页` 和 `Blog - 联系页` 的布局与视觉语义。

## 接口定义（可选）

### 公共API
| 函数/方法 | 参数 | 返回值 | 说明 |
|----------|------|--------|------|
| BaseLayout props | `title`, `description`, `currentPath`, `structuredData` | 页面 HTML 壳层 | 注入全局 meta、主题预加载脚本、搜索模态和全局交互 |
| PageLayout props | `variant`, `categories`, `posts`, `tags`, `toolbarLabel`, `chips`, `activeCategory` | 列表页布局 | `dashboard` 变体复刻首页三栏仪表盘；`archive` 变体复刻文章页双栏列表骨架 |
| PostLayout props | `post`, `headings`, `previous`, `next`, `recentPosts` | 文章页布局 | 以 `Blog - 文章页` 为骨架，为单篇正文提供最小必要的详情化扩展 |
| PostCard props | `post`, `index`, `variant` | 文章摘要卡片 | 输出 dashboard feed 卡片或 archive list 卡片，两种视觉都直接贴近 `blog.pen` |

### 数据结构
| 字段 | 类型 | 说明 |
|------|------|------|
| currentPath | string | 当前页面的 base-aware 路径 |
| categories | CategorySummary[] | 侧栏分类摘要 |
| posts | PostEntry[] | 最近文章、草稿队列和右侧 recent posts 所需数据 |
| tags | TagSummary[] | 首页 trend panel 中的 trending tags 数据源 |
| siteStats | object | 文章数、分类数、标签数、最近更新时间 |

## 行为规范

### 首页与分页壳层
**条件**: 渲染首页或分页列表页  
**行为**: 使用 `PageLayout` 的 `dashboard` 变体输出左侧 metrics/status/quick jump/draft queue、中央顶部导航与命令条、文章 feed 以及右侧 trend panel；界面文案默认使用中文，命令、快捷键和专有名词保留原始写法。首页与归档列表容器统一暴露 `#post-feed` 锚点，内部文章卡片输出可供键盘导航复用的 `data-shortcut-card` / `data-shortcut-link` 钩子  
**结果**: 首页结构与 `Geek Blog Dashboard` 在布局和信息密度上保持高度一致

### 归档与 taxonomy 壳层
**条件**: 渲染分类页、标签页或分类索引  
**行为**: 使用 `PageLayout` 的 `archive` 变体输出 `~/posts --all` 头部、筛选工具条、chip row、左侧列表卡片和右侧搜索/分类/最近文章/订阅栏，并将分页与 taxonomy 辅助文案统一到中文界面  
**结果**: 所有归档页面都回到 `Blog - 文章页` 的双栏列表骨架，而不是复用首页壳层

### 顶部导航与页脚
**条件**: 渲染任意页面  
**行为**: 首页使用 dashboard 头部输出品牌、胶囊导航、搜索/RSS/主题工具；About/Contact 使用简化头部；文章相关页面仅保留最小标题头。页脚继续提供统一的快捷动作入口，并将按钮与状态说明收口为中文；全局壳层额外挂载快捷键帮助面板与文章列表锚点，供键盘导航系统复用  
**结果**: 导航行为既遵守 `blog.pen` 的逐屏差异，又不丢失站点级基础交互

### 文章页壳层
**条件**: 渲染具体文章详情页  
**行为**: `PostLayout` 使用独立的 `cat ./posts/{slug}.md` 头部卡、breadcrumb 工具条、日期/阅读时长/字数胶囊和单块正文 panel；右列仅保留搜索/分类/最近文章/订阅四个面板，并同步目录与文章辅助信息的中文界面文案  
**结果**: 单篇文章详情直接贴合 `.pen` 中的 article view，不再带有归档页详情化的残留结构

### About 与 Contact 逐屏映射
**条件**: 渲染 `/about` 或 `/contact`  
**行为**: 页面直接复刻 `Blog - 关于页` 和 `Blog - 联系页` 的头部、主内容与右侧信息栏，不再走通用 `PageLayout`  
**结果**: 静态内容页与原型结构保持一致，减少模板转译误差

## 依赖关系

```yaml
依赖: content-pipeline
被依赖: interactive-enhancements
```
