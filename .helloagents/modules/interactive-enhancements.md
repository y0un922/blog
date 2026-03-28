# interactive-enhancements

## 职责

负责浏览器端轻量增强，包括搜索模态、Fuse.js 按需加载、主题切换、移动端菜单、返回顶部和文章目录交互。当前版本把搜索和目录容器重新压回 `blog.pen` 的面板语义，让交互层跟逐屏复刻后的首页/归档/文章页保持一致，而不是沿用上一轮更自由的 editorial 弹层样式。

## 接口定义（可选）

### 公共API
| 函数/方法 | 参数 | 返回值 | 说明 |
|----------|------|--------|------|
| SearchModal DOM contract | `data-search-index-url`, `data-posts-base-url` | 浏览器事件绑定 | 打开/关闭搜索、加载索引和渲染结果，使用更贴近 `.pen` 搜索卡的标题区、命令条和结果卡结构 |
| theme toggle | `data-theme-toggle` | 无 | 在 `html.light` 与默认暗色之间切换 |
| menu toggle | `data-menu-toggle` | 无 | 控制 dashboard 顶部导航的移动端面板显隐 |
| back-to-top | `data-back-to-top` | 无 | 滚动超过阈值后显示并平滑回顶 |

### 数据结构
| 字段 | 类型 | 说明 |
|------|------|------|
| SearchDocument | object | 搜索索引中的单篇文章摘要 |
| Fuse instance | Fuse<SearchDocument> | 客户端模糊搜索实例 |
| searchIndexUrl | string | 由服务端注入的 base-aware 搜索索引地址 |
| postsBaseUrl | string | 由服务端注入的 base-aware 文章链接前缀 |

## 行为规范

### 搜索流程
**条件**: 用户点击搜索入口或按下 `Ctrl/Cmd + K`  
**行为**: 服务端先注入 base-aware 的 `search-index.json` 与 `posts/` 地址；客户端按需加载 Fuse.js 与搜索索引，再根据标题/摘要/分类/标签执行模糊匹配，并支持方向键切换当前高亮结果；视觉上使用更接近 `blog.pen` 右栏 search card 的深色输入框、命令条和结果列表，搜索标题、占位提示和空状态文案使用中文  
**结果**: 用户获得真实可用、并且在视觉上直接属于原型体系的站内检索

### 主题切换
**条件**: 用户点击 Theme 按钮  
**行为**: 切换 `html.light` 类并将结果写入 `localStorage`，入口主要放在 dashboard 顶部工具区；相关 `aria-label`、按钮隐藏文案与返回顶部按钮统一使用中文  
**结果**: 首页和其他页面共享同一主题状态，但视觉入口仍尊重原型中“工具只集中在 dashboard 顶栏”的分布

### 移动端菜单与返回顶部
**条件**: 用户在窄屏环境打开导航或向下滚动较长距离  
**行为**: dashboard 顶部菜单按钮切换移动端导航面板，回到顶部按钮在滚动超过阈值后显示  
**结果**: 逐屏复刻主要优先桌面一致性，同时保持移动端基本可达和长文回顶能力

### 全局键盘导航
**条件**: 用户在非输入态下浏览页面  
**行为**: 全局脚本在 `BaseLayout` 中统一分发 lazyvim 风格快捷键，支持 `/` 打开搜索、`?` 打开快捷键帮助、`Esc` 关闭帮助/菜单、`g h/g p/g a/g c` 页面跳转，以及 `j/k/gg/G` 页面滚动；当 `#post-feed` 中存在文章卡片时，`j/k` 会优先切换当前高亮卡片，`Enter` 打开当前卡片，只有在页面没有可选卡片时才退回纯滚动行为；搜索模态打开时优先让位给搜索自身的键盘处理  
**结果**: 桌面端可以用键盘完成站内主流程导航，同时不干扰搜索输入和已有面板交互

## 依赖关系

```yaml
依赖: site-shell, content-pipeline
被依赖: -
```
