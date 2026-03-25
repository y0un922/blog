# interactive-enhancements

## 职责

负责浏览器端轻量增强，包括搜索模态、Fuse.js 按需加载、主题切换、移动端菜单、返回顶部和文章目录交互。

## 接口定义（可选）

### 公共API
| 函数/方法 | 参数 | 返回值 | 说明 |
|----------|------|--------|------|
| SearchModal DOM contract | `data-search-*` attributes | 浏览器事件绑定 | 打开/关闭搜索、加载索引和渲染结果 |
| theme toggle | `data-theme-toggle` | 无 | 在 `html.light` 与默认暗色之间切换 |
| menu toggle | `data-menu-toggle` | 无 | 控制移动端导航面板显隐 |
| back-to-top | `data-back-to-top` | 无 | 滚动超过阈值后显示并平滑回顶 |

### 数据结构
| 字段 | 类型 | 说明 |
|------|------|------|
| SearchDocument | object | 搜索索引中的单篇文章摘要 |
| Fuse instance | Fuse<SearchDocument> | 客户端模糊搜索实例 |

## 行为规范

### 搜索流程
**条件**: 用户点击搜索入口或按下 `Ctrl/Cmd + K`  
**行为**: 按需加载 Fuse.js 与 `search-index.json`，根据标题/摘要/分类/标签执行模糊匹配  
**结果**: 用户获得真实可用的站内检索，不增加首页首屏负担

### 主题切换
**条件**: 用户点击 Theme 按钮  
**行为**: 切换 `html.light` 类并将结果写入 `localStorage`  
**结果**: 明暗主题持久化，刷新后仍保持一致

## 依赖关系

```yaml
依赖: site-shell, content-pipeline
被依赖: -
```
