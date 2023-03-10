---
title: checkbox
group:
  path: /plugins/render
  title: render
---

## checkbox

### `view` 模式

```tsx
import React from 'react';
import Snake from '@bybit-fe/snake';

const RenderModes = Snake.RenderModes;

const schema = {
  type: 'checkbox',
  props: {},
  value: 'Checkbox示例',
  onChange: (e) => {
    console.log('checkbox: ', e);
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
  type: 'checkbox',
  props: {},
  children: 'Checkbox示例',
  onChange: (e) => {
    alert(e.target.checked);
  },
};

export default () => <Snake {...schema} />;
```

## checkbox-group

### `view` 模式

```tsx
import React from 'react';
import Snake from '@bybit-fe/snake';
const RenderModes = Snake.RenderModes;

const schema = {
  type: 'checkbox-group',
  mode: RenderModes.VIEW,
  options: ['Apple', 'Pear', 'Orange'],
  value: ['Apple', 'Orange'],
};

export default () => <Snake {...schema} />;
```

### `add`/`edit` 模式

```tsx
import React, { useState } from 'react';
import Snake from '@bybit-fe/snake';

export default () => {
  const [value, setValue] = useState(['Apple', 'Orange']);
  const schema = {
    type: 'checkbox-group',
    options: ['Apple', 'Pear', 'Orange'],
    value,
    onChange: setValue,
  };

  return (
    <>
      <div style={{ margin: '16px 0' }}>value: {value.join(', ')}</div>
      <Snake {...schema} />
    </>
  );
};
```

## checkbox API

| 参数  | 说明                                                      | 类型   | 默认值          |
| ----- | --------------------------------------------------------- | ------ | --------------- |
| mode  | 模式                                                      | string | RenderModes.ADD |
| value | mode 为 RenderModes.VIEW 时需要                           | string | -               |
| props | 请参考 [antd](https://ant.design/components/checkbox-cn/) | object | {}              |

## checkbox-group API

| 参数    | 说明                                                      | 类型   | 默认值          |
| ------- | --------------------------------------------------------- | ------ | --------------- |
| mode    | 模式                                                      | string | RenderModes.ADD |
| value   | mode 为 RenderModes.VIEW 时需要                           | string | -               |
| options | 复选框选项                                                | array  | []              |
| props   | 请参考 [antd](https://ant.design/components/checkbox-cn/) | object | {}              |
