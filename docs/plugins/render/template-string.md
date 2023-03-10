---
title: template-string
group:
  path: /plugins/render
  title: render
---

## template-string

从 ctx 里取值的模板语法，path 参考 [lodash get](https://lodash.com/docs/4.17.15#get)

### 基本示例

```tsx
import React from 'react';
import Snake from '@bybit-fe/snake';

// 模拟设置 ctx
Snake.setCtx('info', { message: 'data from ctx' });

const schema = {
  "type": "template-string",
  "value": "${info.message}"
};

export default () => <Snake {...schema} />;
```

## API

| 参数  | 说明                | 类型   | 默认值 |
| ----- | ------------------- | ------ | ------ |
| value | 表达式，path of ctx | -      | -      |
| props | 可用于 span 的属性  | object | {}     |
