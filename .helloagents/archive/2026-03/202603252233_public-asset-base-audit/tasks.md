# 任务清单: public-asset-base-audit

> **@status:** completed | 2026-03-25 22:40

```yaml
@feature: public-asset-base-audit
@created: 2026-03-25
@status: completed
@mode: R2
```

<!-- LIVE_STATUS_BEGIN -->
状态: completed | 进度: 5/5 (100%) | 更新: 2026-03-25 22:40:00
当前: 开发实施、验证与知识库同步已完成，待归档
<!-- LIVE_STATUS_END -->

## 进度概览

| 完成 | 失败 | 跳过 | 总数 |
|------|------|------|------|
| 5 | 0 | 0 | 5 |

---

## 任务列表

### 1. 审计与测试

- [√] 1.1 汇总 `public/` 资源与源码引用，确认安全点与潜在风险点，并记录到执行备注中 | depends_on: []
- [√] 1.2 先补回归测试，覆盖 favicon、字体、封面图与搜索索引的 base-aware 约束 | depends_on: [1.1]

### 2. 开发实施

- [√] 2.1 调整 `src/components/SearchModal.astro` 的 URL 注入方式，移除根路径 `"/"` fallback，改为使用显式的 base-aware 地址 | depends_on: [1.2]
- [√] 2.2 视测试结果同步最小必要的布局/测试代码，保持实现与断言一致，不做额外重构 | depends_on: [2.1]

### 3. 验证与同步

- [√] 3.1 运行 `node --test` 与 `pnpm build`，确认回归测试通过且构建保持 `0 errors / 0 warnings` | depends_on: [2.2]

---

## 执行日志

| 时间 | 任务 | 状态 | 备注 |
|------|------|------|------|
| 2026-03-25 22:33:12 | 创建方案包 | completed | 初次路径传参错误，已手动校正到 `.helloagents/plan/202603252233_public-asset-base-audit` |
| 2026-03-25 22:36:55 | 资源审计与测试设计 | completed | 确认字体、favicon、封面图和 robots 已 base-aware，定位到 SearchModal 根路径 fallback 风险 |
| 2026-03-25 22:37:31 | 搜索模块修复 | completed | SearchModal 改为注入 `data-search-index-url` 和 `data-posts-base-url`，移除 `?? "/"` |
| 2026-03-25 22:38:12 | 自动化验证 | completed | `node --test` 6 项通过，`pnpm build` 结果 `0 errors / 0 warnings` |
| 2026-03-25 22:39:22 | 功能验收 | completed | dev server 下 `/blog` 与 `/blog/search-index.json` 返回 `200`，首页输出正确的 base-aware data attributes |

---

## 执行备注

> 方案包由主代理填充，按规则记录为降级执行；当前未使用子代理。
>
> 已确认安全点：`BaseLayout.astro` 中 favicon 与字体 URL、`PostCard.astro` 中封面图 URL、`public/robots.txt` 中 sitemap 地址、`rss.xml.ts` 中站点 URL。
>
> 已确认潜在风险点：`SearchModal.astro` 在客户端脚本中仍存在 `?? "/"` 根路径 fallback，未来若注入属性缺失，会重新引入与字体问题同类的 base 路径错误。
>
> 实际修复：搜索模态现在由服务端显式注入 `search-index.json` 和 `posts/` 的 base-aware URL，客户端仅消费已注入地址，不再自行回退到根路径。
