---
title: radio
group:
  path: /plugins/render
  title: render
---

## radio

### `view` 模式

```tsx
import React from 'react';
import Snake from '@bybit-fe/snake';

const RenderModes = Snake.RenderModes;

const schema = {
  type: 'radio',
  props: {},
  value: 'radio 示例',
  onChange: (e) => {
    console.log('radio: ', e);
    alert(e.target.checked);
  },
  mode: RenderModes.VIEW,
};

export default () => <Snake {...schema} />;
```

### `add`/`edit` 模式

```tsx
import React from 'react';
import Snake from '@bybit-fe/snake';
const RenderModes = Snake.RenderModes;

const schema = {
  type: 'radio',
  props: {},
  children: 'radio 元素',
  onChange: (e) => {
    alert(e.target.checked);
  },
};

export default () => <Snake {...schema} />;
```

## radio-group

### `view` 模式

```tsx
import React from 'react';
import Snake from '@bybit-fe/snake';
const RenderModes = Snake.RenderModes;

const schema = {
  type: 'radio-group',
  mode: RenderModes.VIEW,
  options: ['Apple', 'Pear', 'Orange'].map((n) => ({ value: n, label: n })),
  value: 'Apple',
};

export default () => <Snake {...schema} />;
```

### `add`/`edit` 模式

```tsx
import React, { useState } from 'react';
import Snake from '@bybit-fe/snake';

export default () => {
  const [value, setValue] = useState('Apple');
  const schema = {
    type: 'radio-group',
    options: ['Apple', 'Pear', 'Orange'].map((n) => ({ value: n, label: n })),
    value,
    onChange: setValue,
  };

  return (
    <>
      <div style={{ margin: '16px 0' }}>value: {value}</div>
      <Snake {...schema} />
    </>
  );
};
```

## radio API

| 参数  | 说明                                                   | 类型   | 默认值          |
| ----- | ------------------------------------------------------ | ------ | --------------- |
| mode  | 模式                                                   | string | RenderModes.ADD |
| value | mode 为 RenderModes.VIEW 时需要                        | string | -               |
| props | 请参考 [antd](https://ant.design/components/radio-cn/) | object | {}              |

## radio-group API

| 参数    | 说明                                                   | 类型   | 默认值          |
| ------- | ------------------------------------------------------ | ------ | --------------- |
| mode    | 模式                                                   | string | RenderModes.ADD |
| value   | mode 为 RenderModes.VIEW 时需要                        | string | -               |
| options | 复选框选项                                             | array  | []              |
| props   | 请参考 [antd](https://ant.design/components/radio-cn/) | object | {}              |
