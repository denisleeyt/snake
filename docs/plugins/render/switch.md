---
title: switch
group:
  path: /plugins/render
  title: render
---

## switch

### 基本示例

```tsx
import React from 'react';
import Snake from '@bybit-fe/snake';

const schema = {
  type: 'switch',
  checked: false,
  onChange: (checked, event) => {
    console.log('switch changed', checked, event);
  },
};

export default () => <Snake {...schema} />;
```

## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| checked | 指定当前是否选中 | boolean | false |
| onChange | 改变时的回调 | function(checked: boolean, event: Event) | - |
| props | 请参考 [antd switch](https://ant.design/components/switch-cn/) | object | {} |
