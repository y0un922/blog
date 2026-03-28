# 变更提案: public-asset-base-audit

## 元信息
```yaml
类型: 修复
方案类型: implementation
优先级: P1
状态: 已确认
创建: 2026-03-25
```

---

## 1. 需求

### 背景
在 `base=/blog` 的 Astro 项目中，`public/` 资源一旦使用根路径假设，就会在开发态或部署到 GitHub Pages 子路径后出现路由错误。当前字体问题已经修复，但用户希望继续全仓排查同类风险，避免 favicon、搜索索引、封面图等静态资源再次出现同类问题。

### 目标
- 审计当前项目内所有 `public/` 资源引用，确认哪些已经 base-aware，哪些仍存在潜在根路径假设。
- 修复仍可能回退到根路径 `"/"` 的实现，避免未来再次出现与字体问题同类的错误。
- 补充回归测试，覆盖字体、favicon、搜索索引与封面图等关键 public 资源路径。

### 约束条件
```yaml
时间约束: 本轮在现有代码基础上完成，不重做站点结构
性能约束: 不引入新的运行时依赖，不增加额外网络请求
兼容性约束: 保持 Astro 5 + GitHub Pages base=/blog 部署方式不变
业务约束: 不改变现有页面结构、文章内容与搜索交互行为
```

### 验收标准
- [ ] `public/` 资源引用审计完成，并形成明确的安全点/风险点结论
- [ ] 搜索模块不再依赖根路径 `"/"` fallback，而是使用显式的 base-aware URL
- [ ] 回归测试覆盖字体、favicon、搜索索引和封面图的 base-aware 行为
- [ ] `pnpm build` 通过，且 `astro check` 结果保持 `0 errors / 0 warnings`

---

## 2. 方案

### 技术方案
保留当前已经正确的 `withBase()`、`assetBase` 和内容封面派生逻辑，不做无意义重构。对扫描中发现的潜在风险点，采用最小改动修复：

1. 对 `public/` 资源引用做源码级审计，确认当前安全点：
   - `BaseLayout.astro` 中 favicon 与字体通过 `assetBase` / `fontBase` 注入。
   - `PostCard.astro` 中封面图通过 `withBase()` 派生。
   - `SearchModal.astro` 中搜索索引请求使用 `BASE_URL` 推导。
   - `public/robots.txt` 与 `rss.xml.ts` 已包含正确的 `/blog` 站点前缀。
2. 将 `SearchModal.astro` 中潜在会退回根路径 `"/"` 的 fallback 改为显式注入的 base-aware URL，避免同类问题在未来回归。
3. 扩展现有测试，增加对 favicon、搜索索引和封面图路径的断言，用回归测试锁定本次审计结果。

### 影响范围
```yaml
涉及模块:
  - deployment: public 资源 base-aware 规则与布局注入逻辑
  - interactive-enhancements: 搜索索引请求与搜索结果链接的路径生成
  - site-shell: 页面壳层中的 favicon 注入与 build 产物校验
预计变更文件: 4
```

### 风险评估
| 风险 | 等级 | 应对 |
|------|------|------|
| 搜索模块路径调整导致结果链接失效 | 中 | 先写失败测试，再做最小修改，并以 build/dev 行为验证 |
| 审计测试过度耦合实现细节 | 低 | 断言对外可观察的路径行为，避免依赖 hash 文件名 |
| 扫描误把已安全的路径当成问题重构 | 低 | 仅修改已确认存在风险的根路径 fallback，其他保持不动 |

---

## 3. 技术设计（可选）

> 本次无架构变更，不新增 API 或数据模型，保持最小实现。

### 架构设计
```mermaid
flowchart TD
    A[Astro Base URL] --> B[BaseLayout assetBase/fontBase]
    A --> C[withBase()]
    B --> D[Favicon / Fonts]
    C --> E[Post covers / Internal links]
    A --> F[SearchModal injected URLs]
    F --> G[search-index.json / result links]
```

### API设计
无新增外部 API。

### 数据模型
无新增数据模型。

---

## 4. 核心场景

> 执行完成后同步到对应模块文档

### 场景: 子路径部署下的静态资源访问
**模块**: deployment / site-shell / interactive-enhancements
**条件**: 站点以 `base=/blog` 运行，页面需要访问 favicon、字体、封面图与搜索索引
**行为**: 页面壳层、内容组件和搜索脚本都通过 base-aware 逻辑派生资源地址，不依赖根路径默认值
**结果**: 在 dev 与 build 产物中，关键 `public/` 资源都能稳定从 `/blog/...` 路径访问

---

## 5. 技术决策

> 本方案涉及的技术决策，归档后成为决策的唯一完整记录

### public-asset-base-audit#D001: 保持现有 base-aware 体系并只修复潜在根路径 fallback
**日期**: 2026-03-25
**状态**: ✅采纳
**背景**: 扫描结果显示，大多数 `public/` 资源已经通过 `withBase()`、`BASE_URL` 或 `assetBase` 正确派生。问题不在于全站缺少 base-aware 设计，而在于个别实现仍保留了退回根路径的隐性 fallback，会让同类 bug 在未来回归。
**选项分析**:
| 选项 | 优点 | 缺点 |
|------|------|------|
| A: 全量抽象为新的统一路径工具 | 一致性更强，后续扩展方便 | 当前改动范围被放大，属于过度抽象 |
| B: 保留现有设计，只修复有风险的 fallback 并补测试 | 改动最小，直接针对已知风险，验证成本低 | 仍保留少量现有分散实现 |
**决策**: 选择方案 B
**理由**: 当前代码已经具备可工作的 base-aware 体系，最有效的做法是修复 `SearchModal` 中仍可能回退到 `"/"` 的实现，并用回归测试把 favicon、字体、封面图与搜索索引一起锁定，而不是为了“统一”引入额外抽象层。
**影响**: 影响 `SearchModal.astro` 的 URL 注入方式、回归测试覆盖面，以及部署模块文档中对静态资源路径策略的说明
