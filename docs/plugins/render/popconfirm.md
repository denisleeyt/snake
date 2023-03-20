---
title: popconfirm
group:
  path: /plugins/render
  title: render
---

## popconfirm

### 基本示例

```tsx
import React from 'react';
import Snake from '@denisli/snake';

const schema = {
  "type": "popconfirm",
  "title": "Confirm Title",
  "confirm": {
    "type": "message",
    "level": "success",
    "content": "Hello world!"
  },
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

| 参数    | 说明                                                               | 类型   | 默认值 |
| ------- | ------------------------------------------------------------------ | ------ | ------ |
| title   | 标题                                                               | string | -      |
| confirm | 确认点击回调                                                       | action | -      |
| props   | 请参考 [antd](https://ant.design/components/popconfirm-cn/#header) | object | {}     |
