---
title: 使用
order: 2
toc: menu
nav:
  title: 指南
  order: 1
---

## 安装

```bash
$ yarn add snake
```

## 示例

```tsx
import React from 'react';
import Snake from '@bybit-fe/snake';

const schema = {
  "type": "button",
  "children": {
    "type": "text",
    "value": "show message"
  },
  "props": {
    "type": "primary"
  },
  "action": {
    "type": "message",
    "level": "success",
    "content": "Hello world!"
  }
};

export default () => <Snake {...schema} />;
```

按需传入不同的 schema 即可，更多示例参加 [配置](/plugins) 部分。
