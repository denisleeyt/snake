---
title: input-number
group:
  path: /plugins/render
  title: render
---

## input-number

### `add`/`edit` 模式

```tsx
import React from 'react';
import Snake from '@denisli/snake';

const schema = {
  "type": "input-number",
  "props": {
    "defaultValue": 12312
  }
};

export default () => <Snake {...schema} />;
```

### `view` 模式

```tsx
import React from 'react';
import Snake from '@denisli/snake';

const schema = {
  "type": "input-number",
  "value": 12312,
  "mode": "view"
};

export default () => <Snake {...schema} />;
```

### 小数位数

```tsx
import React from 'react';
import Snake from '@denisli/snake';

const schema = {
  "type": "input-number",
  "props": {
    "precision": 2
  }
};

export default () => <Snake {...schema} />;
```

### 整数

```tsx
/**
 * desc: precision = 0 代表只能输入整数
 */

import React from 'react';
import Snake from '@denisli/snake';

const schema = {
  "type": "input-number",
  "props": {
    "defaultValue": 1,
    "precision": 0
  }
};

export default () => <Snake {...schema} />;
```

## input-number API

| 参数  | 说明                                                          | 类型   | 默认值          |
| ----- | ------------------------------------------------------------- | ------ | --------------- |
| mode  | 模式                                                          | string | RenderModes.ADD |
| value | mode 为 RenderModes.VIEW 时需要                               | string | -               |
| props | 请参考 [antd](https://ant.design/components/input-number-cn/) | object | {}              |
