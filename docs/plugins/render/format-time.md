---
title: format-time
group:
  path: /plugins/render
  title: render
---

## format-time

### 基本示例

```tsx
import React from 'react';
import Snake from '@bybit-fe/snake';

const schema = {
  "type": "format-time",
  "value": 1646382902
};

export default () => <Snake {...schema} />;
```

### 自定义格式

```tsx
import React from 'react';
import Snake from '@bybit-fe/snake';

const schema = {
  "type": "format-time",
  "value": 1646382902,
  "format": "YYYY-MM-DD"
};

export default () => <Snake {...schema} />;
```

## API

| 参数   | 说明         | 类型                      | 默认值                |
| ------ | ------------ | ------------------------- | --------------------- |
| value  | 时间         | 10 位 timestamp，精确到秒 | -                     |
| format | 设置时间格式 | string                    | `YYYY-MM-DD HH:mm:ss` |
