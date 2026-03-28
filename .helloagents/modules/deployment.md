# deployment

## 职责

负责工程配置、Tailwind v4 接入、静态资源策略、自托管字体、RSS/sitemap 输出以及 GitHub Pages 工作流。

## 接口定义（可选）

### 公共API
| 函数/方法 | 参数 | 返回值 | 说明 |
|----------|------|--------|------|
| astro.config.mjs | `site`, `base`, `markdown`, `vite` | Astro 配置对象 | 固定 GitHub Pages 子路径和 Tailwind v4 接入 |
| deploy workflow | `push` / `workflow_dispatch` | GitHub Pages artifact | 安装依赖、构建静态站点并部署 |
| rss.xml.ts | 无 | RSS XML | 生成带 `/blog/` 前缀的 feed 链接 |

### 数据结构
| 字段 | 类型 | 说明 |
|------|------|------|
| site | string | 站点主域名 `https://y0un92.github.io` |
| base | string | 子路径 `/blog` |
| public/fonts | static assets | 自托管 Space Grotesk / JetBrains Mono 字体文件 |

## 行为规范

### 构建与发布
**条件**: 本地执行 `pnpm build` 或 GitHub Actions 触发部署  
**行为**: 先运行 `astro check`，再生成静态页面、RSS、sitemap 与搜索索引  
**结果**: 输出适合 GitHub Pages 的纯静态产物

### 静态资源路径
**条件**: 引用图标、字体、脚本和样式资源  
**行为**: 使用 public 资源路径和 base-aware 生成逻辑，覆盖 favicon、字体、封面图和搜索索引请求地址  
**结果**: 产物在 `/blog` 子路径下仍然能正确加载字体、图标、封面图并请求搜索索引

## 依赖关系

```yaml
依赖: content-pipeline
被依赖: site-shell
```
