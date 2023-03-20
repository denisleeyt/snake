---
title: date-picker
group:
  path: /plugins/render
  title: render
---

## date-picker

### 基本示例

```tsx
import React from 'react';
import Snake from '@denisli/snake';

const schema = {
  "type": "date-picker",
  "props": {
    "format": "YYYY-MM-DD HH:mm:ss"
  },
  onChange: (date, dateString) => {
    console.log('date-picker changed: ', date, dateString);
  },
};

export default () => <Snake {...schema} />;
```

### 自定义时区

<code src="../../../samples/render/date-picker/CustomTimeZone.tsx"></code>

## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | 时间 | moment | - |
| onChange | 改变时的回调 | function(date: moment, dateString: string) | - |
| props | 请参考 [antd DatePicker](https://ant.design/components/date-picker-cn/#DatePicker) | object | {} |
