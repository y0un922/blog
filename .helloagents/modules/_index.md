# 模块索引

> 通过此文件快速定位模块文档

## 模块清单

| 模块 | 职责 | 状态 | 文档 |
|------|------|------|------|
| site-shell | 管理共享布局、导航、侧栏、文章页和列表页壳层 | ✅ | [site-shell.md](./site-shell.md) |
| content-pipeline | 管理 Markdown 内容集合、taxonomy 派生和 base-aware 链接工具 | ✅ | [content-pipeline.md](./content-pipeline.md) |
| interactive-enhancements | 管理搜索、主题切换、TOC、返回顶部和移动端菜单 | ✅ | [interactive-enhancements.md](./interactive-enhancements.md) |
| deployment | 管理 Astro/Tailwind 配置、静态资源、自托管字体和 GitHub Pages 工作流 | ✅ | [deployment.md](./deployment.md) |

## 模块依赖关系

```text
content-pipeline → site-shell → interactive-enhancements
deployment ─────┘           ↘ static build / pages
```

## 状态说明
- ✅ 稳定
- 🚧 开发中
- 📝 规划中
