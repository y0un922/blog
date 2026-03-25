# site-shell

## 职责

负责站点的共享结构与页面壳层，包括 `BaseLayout.astro`、`PageLayout.astro`、`PostLayout.astro`、顶部导航、侧栏、页脚、文章卡片和分页组件。

## 接口定义（可选）

### 公共API
| 函数/方法 | 参数 | 返回值 | 说明 |
|----------|------|--------|------|
| BaseLayout props | `title`, `description`, `currentPath`, `structuredData` | 页面 HTML 壳层 | 注入全局 meta、主题预加载脚本、搜索模态和全局交互 |
| PageLayout props | `eyebrow`, `pageTitle`, `lead`, `categories`, `siteStats` | 列表页布局 | 为首页、分类、标签和 About 等页面提供统一双栏布局 |
| PostLayout props | `post`, `headings`, `previous`, `next` | 文章页布局 | 为正文页提供头部、TOC 和上一篇/下一篇导航 |

### 数据结构
| 字段 | 类型 | 说明 |
|------|------|------|
| currentPath | string | 当前页面的 base-aware 路径 |
| categories | CategorySummary[] | 侧栏分类摘要 |
| siteStats | object | 文章数、分类数、标签数、最近更新时间 |

## 行为规范

### 列表页壳层
**条件**: 渲染首页、分类、标签或 About 页面  
**行为**: 使用共享 PageLayout 输出左侧信息栏和右侧主内容区域  
**结果**: 页面保持统一的 no-line、左偏 editorial 布局和导航结构

### 文章页壳层
**条件**: 渲染具体文章详情页  
**行为**: 输出文章头部、正文容器、TOC 和上一篇/下一篇导航  
**结果**: 长文阅读体验与目录导航保持一致

## 依赖关系

```yaml
依赖: content-pipeline
被依赖: interactive-enhancements
```
