---
title: tooltip
group:
  path: /plugins/render
  title: render
---

## tooltip

### 基本示例

```tsx
import React from 'react';
import Snake from '@bybit-fe/snake';

const schema = {
  "type": "tooltip",
  "title": "tooltip title",
  "children": {
    "type": "button",
    "children": {
      "type": "text",
      "value": "Example"
    },
    "props": {
      "type": "link"
    }
  }
};

export default () => <Snake {...schema} />;
```

## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | 标题, render schema | string / object | - |
| children | render schema | object | - |
| props | 请参考 [antd](https://ant.design/components/tooltip-cn/#API) | object | {} |
