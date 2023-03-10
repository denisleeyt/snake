---
title: range-picker
group:
  path: /plugins/render
  title: render
---

## range-picker

### 基本示例

```tsx
import React from 'react';
import Snake from '@bybit-fe/snake';

const schema = {
  type: 'range-picker',
  props: {
    format: 'YYYY-MM-DD HH:mm:ss',
  },
  submitFormat: 'YYYY-MM-DD HH:mm:ss',
  rangeNames: ['startTime', 'endTime'],
  onChange: (dates, dateStrings) => {
    console.log('range-picker changed: ', dates, dateStrings);
  },
};

export default () => <Snake {...schema} />;
```

## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | 时间 | moment | - |
| submitFormat | search 或者 submit 的时候 传给接口的格式 | moment | 不传此项就是时间戳 |
| rangeNames | search 或者 submit 的时候 传给接口的字段名称 | moment | -- |
| onChange | 改变时的回调 | function(dates: [moment, moment], dateStrings: [string, string]) | - |
| props | 请参考 [antd RangePicker](https://ant.design/components/date-picker-cn/#DatePicker) | object | {} |
