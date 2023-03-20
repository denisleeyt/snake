---
title: confirm
group:
  path: /plugins/action
  title: action
---

## confirm

### 基本示例

```tsx
import React from 'react';
import Snake from '@denisli/snake';

const schema = {
  "type": "button",
  "children": {
    "type": "text",
    "value": "show confirm"
  },
  "props": {
    "type": "primary"
  },
  "action": {
    "type": "confirm",
    "title": "Confirm title",
    "okText": "ok!",
    "cancelText": "Cancel now",
    "okAction": {
      "type": "message",
      "level": "success",
      "content": "Hello world!"
    }
  }
};

export default () => <Snake {...schema} />;
```

## API

| 参数         | 说明                | 类型            | 默认值 |
| ------------ | ------------------- | --------------- | ------ |
| title        | 确认弹窗标题        | string          | -      |
| okText       | 确认文案            | string          | OK     |
| cancelText   | 取消文案            | string          | Cancel |
| content      | 内容，render schema | string / object | -      |
| okAction     | 确认点击回调        | action          | -      |
| cancelAction | 取消点击回调        | action          | -      |
