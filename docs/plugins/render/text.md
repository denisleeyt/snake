---
title: text
group:
  path: /plugins/render
  title: render
---

## text

文本展示

### 基本示例

```tsx
import React from 'react';
import Snake from '@bybit-fe/snake';

// 模拟设置 ctx
Snake.setCtx('info', { message: 'data from ctx' });

const schema = {
  "type": "text",
  "value": "plain text"
};

export default () => <Snake {...schema} />;
```

## API

| 参数  | 说明               | 类型   | 默认值 |
| ----- | ------------------ | ------ | ------ |
| value | 文本内容           | string | -      |
| props | 可用于 span 的属性 | object | {}     |
