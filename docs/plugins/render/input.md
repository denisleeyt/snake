---
title: input
group:
  path: /plugins/render
  title: render
---

## input

### `add`/`edit` 模式

```tsx
import React from 'react';
import Snake from '@bybit-fe/snake';

const schema = {
  "type": "input",
  "props": {
    "defaultValue": "input示例"
  }
};

export default () => <Snake {...schema} />;
```

### `view` 模式

```tsx
import React from 'react';
import Snake from '@bybit-fe/snake';

const schema = {
  "type": "input",
  "value": "input view 模式示例",
  "mode": "view"
};

export default () => <Snake {...schema} />;
```

## textarea

### `add`/`edit` 模式

```tsx
import React from 'react';
import Snake from '@bybit-fe/snake';

const schema = {
  "type": "textarea",
  "props": {
    "defaultValue": "textarea 示例"
  }
};

export default () => <Snake {...schema} />;
```

### `view` 模式

```tsx
import React from 'react';
import Snake from '@bybit-fe/snake';

const schema = {
  "type": "textarea",
  "value": "textarea view 模式示例",
  "mode": "view"
};

export default () => <Snake {...schema} />;
```

## textdecode

### `add`/`edit` 模式

```tsx
import React from 'react';
import Snake from '@bybit-fe/snake';

const schema = {
  "type": "textdecode",
  "props": {
    "defaultValue": "http://www.oschina.net/search?scope=bbs&q=C%E8%AF%AD%E8%A8%80"
  }
};

export default () => <Snake {...schema} />;
```

### `view` 模式

```tsx
import React from 'react';
import Snake from '@bybit-fe/snake';

const schema = {
  "type": "input",
  "value": "http://www.oschina.net/search?scope=bbs&q=C%E8%AF%AD%E8%A8%80",
  "mode": "view"
};

export default () => <Snake {...schema} />;
```

## input API

| 参数  | 说明                                                   | 类型   | 默认值          |
| ----- | ------------------------------------------------------ | ------ | --------------- |
| mode  | 模式                                                   | string | RenderModes.ADD |
| value | mode 为 RenderModes.VIEW 时需要                        | string | -               |
| props | 请参考 [antd](https://ant.design/components/input-cn/) | object | {}              |

## textarea API

| 参数  | 说明                                                   | 类型   | 默认值          |
| ----- | ------------------------------------------------------ | ------ | --------------- |
| mode  | 模式                                                   | string | RenderModes.ADD |
| value | mode 为 RenderModes.VIEW 时需要                        | string | -               |
| props | 请参考 [antd](https://ant.design/components/input-cn/) | object | {}              |

## textdecode API

| 参数  | 说明                                                   | 类型   | 默认值          |
| ----- | ------------------------------------------------------ | ------ | --------------- |
| mode  | 模式                                                   | string | RenderModes.ADD |
| value | mode 为 RenderModes.VIEW 时需要                        | string | -               |
| props | 请参考 [antd](https://ant.design/components/input-cn/) | object | {}              |
