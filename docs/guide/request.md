---
title: 网络请求
order: 4
toc: menu
nav:
  title: 指南
  order: 1
---

## 如何使用？

`snake` 默认使用 [umi-request](https://github.com/umijs/umi-request) 发起网络请求，也可以设置其他的网络请求方法：

```typescript
export type SnakeCoreApi = {
  setDefaultRequest: (request: RequestMethod) => void;
};
```

之后就可以在 plugin 内直接调用 `api.request()` 进行网络请求。
