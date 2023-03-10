---
title: html
group:
  path: /plugins/render
  title: render
---

## html

提供了标准的 html 元素渲染能力

### 基本示例

```tsx
import React from 'react';
import Snake from '@bybit-fe/snake';

const schema = {
  "type": "html",
  "tag": "div",
  "children": {
    "type": "text",
    "value": "inner element"
  },
  "props": {
    "style": {
      "background": "blue",
      "width": 200,
      "height": 200,
      "padding": 32,
      "color": "yellow",
      "fontSize": 32
    }
  }
};

export default () => <Snake {...schema} />;
```

## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| tag | [HTML 元素标签](https://developer.mozilla.org/en-US/docs/Web/HTML/Element) | string | {} |
| props | HTML 属性 | object | {} |
| children | render schema | object | - |
