---
title: image
group:
  path: /plugins/render
  title: render
---

## image

### 基本示例

```tsx
import React from 'react';
import Snake from '@bybit-fe/snake';

const schema = {
  "type": "image",
  "props": {
    "width": 200
  },
  "value": "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
};

export default () => <Snake {...schema} />;
```

## API

| 参数  | 说明                                                   | 类型   | 默认值 |
| ----- | ------------------------------------------------------ | ------ | ------ |
| value | image src                                              | string | -      |
| props | 请参考 [antd](https://ant.design/components/image-cn/) | object | {}     |
