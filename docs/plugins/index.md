---
title: 自定义 Schema
order: 1
toc: menu
nav:
  title: 配置
  order: 2
---

如果现有的 schema 无法满足需求，或者你希望进行定制，则可以开发一个自己的插件来实现。

首先定义一个 plugin，然后用 `Snake.registerPlugin` 注册即可。

plugin 中可用的 api 参见 [API](/guide#api).

> !!! Attention: 如果 plugin 中引入了比较大的组件，请使用 [React.lazy](https://reactjs.org/docs/code-splitting.html#reactlazy) 进行分割，保证页面加载效率。

## 基本示例

```tsx
/**
 * desc: 默认 color 是 red 的 span
 */
import React from 'react';
import Snake from '@bybit-fe/snake';

export default function RedSpanPlugin(api: SnakeApi) {
  api.registerRender('red-span', ({ children, props }, ctx) => {
    return (
      <span {...props} style={{ color: 'red' }}>
        {children}
      </span>
    );
  });
}

Snake.registerPlugin(RedSpanPlugin);

const schema = {
  "type": "red-span",
  "children": "children of red"
};

export default () => <Snake {...schema} />;
```

## 复用已有 Schema

```tsx
/**
 * desc: 在 'red-span' 的基础上，支持已有 Schema 配置
 */
import React from 'react';
import Snake from '@bybit-fe/snake';

export default function RedSpanPlugin(api: SnakeApi) {
  api.registerRender('red-span-schema', ({ children, props }, ctx) => {
    return (
      <span {...props} style={{ color: 'red' }}>
        <div>red-span</div>
        {api.renderSchemas(ctx, children)}
      </span>
    );
  });
}

Snake.registerPlugin(RedSpanPlugin);

const schema = {
  "type": "red-span-schema",
  "children": [
    {
      "type": "button",
      "children": {
        "type": "text",
        "value": "children button"
      },
      "props": {
        "type": "primary"
      },
      "action": {
        "type": "message",
        "level": "success",
        "content": "Hello world!"
      }
    }
  ]
};

export default () => <Snake {...schema} />;
```

## simplify 简化 Schema

```tsx
/**
 * desc: 通过 `simplify` 抽象配置
 */
import React from 'react';
import Snake from '@bybit-fe/snake';

Snake.simplify('render', 'hello-world-message', {
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
});

const schema = {
  "type": "hello-world-message"
};

export default () => <Snake {...schema} />;
```
