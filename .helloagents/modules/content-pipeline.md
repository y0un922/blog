# content-pipeline

## 职责

负责 Markdown 内容集合的 schema、文章查询、排序、分页、分类/标签聚合、上一篇/下一篇计算，以及所有 base-aware 路径、列表封面资源字段与搜索文档生成逻辑。

## 接口定义（可选）

### 公共API
| 函数/方法 | 参数 | 返回值 | 说明 |
|----------|------|--------|------|
| getPublishedPosts | 无 | `Promise<PostEntry[]>` | 返回按日期倒序的已发布文章 |
| paginatePosts | `posts`, `page`, `pageSize` | `{ items, currentPage, totalPages }` | 生成分页切片 |
| groupByCategory | `posts` | `CategorySummary[]` | 统计分类数量 |
| groupByTag | `posts` | `TagSummary[]` | 统计标签数量并生成 slug |
| buildSearchDocuments | `posts` | `SearchDocument[]` | 生成搜索索引文档 |
| withBase | `pathname` | `string` | 生成带 `/blog/` 前缀的站内路径 |

### 数据结构
| 字段 | 类型 | 说明 |
|------|------|------|
| PostEntry | Astro content entry | 单篇文章对象 |
| CategorySummary | `{ slug, count }` | 分类汇总 |
| TagSummary | `{ slug, label, count }` | 标签汇总 |
| post.data.cover | `string?` | 指向 `public/` 下的本地封面资源，供首页与列表页 feed 渲染 |

## 行为规范

### 内容过滤
**条件**: 查询文章集合  
**行为**: 仅返回 `draft !== true` 的文章，并按日期倒序排序  
**结果**: 所有公开页面共享同一套已发布数据视图

### 路径派生
**条件**: 生成分类、标签、文章、分页和 RSS 链接  
**行为**: 所有路径都通过 `withBase()` 或相同规则派生  
**结果**: GitHub Pages `/blog` 子路径下链接和静态资源保持一致

### 列表封面资源
**条件**: 首页、分类页或标签页渲染文章 feed  
**行为**: 从 frontmatter 的 `cover` 字段读取本地 SVG 资源路径，并通过 `withBase()` 派生可部署 URL  
**结果**: prototype 风格的缩略图文章流可以在静态输出中稳定加载，不依赖外链图片

## 依赖关系

```yaml
依赖: -
被依赖: site-shell, interactive-enhancements, deployment
```
