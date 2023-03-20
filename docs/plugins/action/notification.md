---
title: notification
group:
  path: /plugins/action
  title: action
---

## notification

### 基本示例

```tsx
import React from 'react';
import Snake from '@denisli/snake';

const schema = {
  "type": "button",
  "children": {
    "type": "text",
    "value": "show notification"
  },
  "props": {
    "type": "primary"
  },
  "action": {
    "type": "notification",
    "message": "title message!",
    "description": "content description"
  }
};

export default () => <Snake {...schema} />;
```

## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| level | 提示类型, 参考 [antd notification](https://ant.design/components/notification-cn/#API) | string | 'info' |
| message | 通知提醒标题，render schema | string / object | - |
| description | 通知提醒内容，render schema | string / object | - |
| placement | 弹出位置 | string | 'topRight' |
| duration | 自动关闭的延时，单位秒 | number | 4.5 |
