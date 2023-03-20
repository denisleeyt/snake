---
title: link
group:
  path: /plugins/render
  title: render
---

## link

基于 [button](./button) 完成，针对链接的场景。

### 基本示例

```tsx
import React from 'react';
import Snake from '@denisli/snake';

const schema = {
  "type": "link",
  "children": {
    "type": "text",
    "value": "跳转到 button"
  },
  "href": "/plugins/render/button",
  "props": {
    "type": "link"
  }
};

export default () => <Snake {...schema} />;
```

### 打开新 tab

```tsx
import React from 'react';
import Snake from '@denisli/snake';

const schema ={
  "type": "link",
  "children": {
    "type": "text",
    "value": "新 tab 打开 button 页面"
  },
  "href": "/plugins/render/button",
  "isInner": false,
  "props": {
    "type": "link",
    "target": "_blank"
  }
};

export default () => <Snake {...schema} />;
```

### href 带 template 语法

```tsx
import React from 'react';
import Snake from '@denisli/snake';

// 模拟设置 ctx
Snake.setCtx('router', { page: 'action/remote' });

const schema = {
  "type": "link",
  "children": {
    "type": "text",
    "value": "跳转指定页面"
  },
  "href": "/plugins/${router.page}",
  "props": {
    "type": "link"
  }
};

export default () => <Snake {...schema} />;
```

## API

| 参数    | 说明                                                    | 类型    | 默认值 |
| ------- | ------------------------------------------------------- | ------- | ------ |
| href    | 链接地址，支持 template 替换                            | string  | null   |
| isInner | 是否内部链接，SPA 内部链接不会刷新页面                  | boolean | true   |
| props   | 请参考 [antd](https://ant.design/components/button-cn/) | object  | {}     |
