---
title: button
group:
  path: /plugins/render
  title: render
---

## button

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

### Link

```tsx
import React from 'react';
import Snake from '@denisli/snake';

const schema = {
  "type": "space",
  "children": [
    {
      "type": "link",
      "children": {
        "type": "text",
        "value": "link message"
      },
      "href": "/plugins/action/message",
      "props": {
        "type": "primary"
      }
    },
    {
      "type": "link",
      "children": {
        "type": "text",
        "value": "link notification"
      },
      "href": "/plugins/action/notification",
      "props": {
        "type": "link"
      }
    }
  ]
};

export default () => <Snake {...schema} />;
```

### withDisabled

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
  "withDisabled": true,
  "action": {
    "type": "message",
    "level": "info",
    "content": "button is disabled"
  }
};

export default () => <Snake {...schema} />;
```

### withLoading

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
  "withLoading": true,
  "action": {
    "type": "message",
    "level": "info",
    "content": "button is loading"
  }
};

export default () => <Snake {...schema} />;
```

## API

| 参数         | 说明                                                    | 类型    | 默认值 |
| ------------ | ------------------------------------------------------- | ------- | ------ |
| props        | 请参考 [antd](https://ant.design/components/button-cn/) | object  | {}     |
| withDisabled | action 执行阶段 disabled                                | boolean | false  |
| withLoading  | action 执行阶段 loading                                 | boolean | false  |
