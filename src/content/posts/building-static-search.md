---
title: "静态站搜索的体积边界"
description: "Fuse.js 很适合个人博客，但索引策略要从一开始就收紧。"
date: 2026-03-18
category: "SYSTEM_DESIGN"
tags: ["SEARCH", "FUSE", "PERFORMANCE"]
cover: "/covers/stacked-node.svg"
draft: false
---

纯静态博客没有服务端搜索，所以构建期索引几乎是最自然的方案。

## 只索引真正需要搜索的字段

对于中文内容站，标题、摘要、标签和分类往往比正文全文更实用，也更省体积。

## 首次打开再加载

搜索不是首页首屏必须资源。把索引和 Fuse.js 推迟到用户触发搜索时再加载，能明显减轻初始负担。

## URL 必须 base-aware

如果站点部署在 `/blog` 这样的子路径下，搜索结果里的链接不能写成裸路径，否则点击结果会直接失效。
