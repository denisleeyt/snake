---
title: message
group:
  path: /plugins/action
  title: action
---

## message

### 基本示例

```tsx
import React from 'react';
import Snake from '@denisli/snake';

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

## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| level | 提示类型, 参考 [antd Message](https://ant.design/components/message-cn/#API) | string | 'info' |
| content | 内容，render schema | string / object | - |
| duration | 自动关闭的延时，单位秒 | number | 1.5 |
