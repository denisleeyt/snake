---
title: express-string
group:
  path: /plugins/render
  title: render
---

## express-string

支持 JavaScript 的内嵌表达式运算结果，可用入参为 ctx，类似于:

> new Function('ctx', 'return ...');

### 基本示例

```tsx
import React from 'react';
import Snake from '@denisli/snake';

// 模拟设置 ctx
Snake.setCtx('info', 'data from ctx');

const schema = {
  "type": "express-string",
  "value": "'this is express-string: ' + ctx.info"
};

export default () => <Snake {...schema} />;
```

### 运算示例

```tsx
import React from 'react';
import Snake from '@denisli/snake';

const schema = {
  "type": "express-string",
  "value": "2 + 3"
};

export default () => <Snake {...schema} />;
```

## API

| 参数  | 说明               | 类型   | 默认值 |
| ----- | ------------------ | ------ | ------ |
| value | 表达式             | -      | -      |
| props | 可用于 span 的属性 | object | {}     |
