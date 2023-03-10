---
title: switch-case
group:
  path: /plugins/render
  title: render
---

## switch-case

### 基本示例

```tsx
import React, { useState } from 'react';
import { Space } from 'antd';
import Snake from '@bybit-fe/snake';

const RenderModes = Snake.RenderModes;
Snake.setCtx('mode', RenderModes.ADD);

const schema = {
  "type": "switch-case",
  "express": "ctx.mode",
  "case": {
    "add": {
      "type": "text",
      "value": "新增"
    },
    "edit": {
      "type": "text",
      "value": "编辑"
    },
    "view": {
      "type": "text",
      "value": "查看"
    },
    "default": {
      "type": "text",
      "value": "default"
    }
  }
};

export default () => {
  const [mode, setMode] = useState(Snake.getCtx('mode'));
  return (
    <>
      <Space>
        Mode:
        <Snake
          type="radio-group"
          options={Object.values(RenderModes).map((m) => ({ label: m, value: m }))}
          props={{
            optionType: 'button',
            buttonStyle: 'solid',
          }}
          value={mode}
          onChange={(val) => {
            setMode(val);
            Snake.setCtx('mode', val);
          }}
        />
      </Space>
      <div style={{ margin: '16px 0' }}>Ctx.mode: {Snake.getCtx('mode')}</div>
      <Snake key={mode} {...schema} />
    </>
  );
};
```

## API

| 参数    | 说明               | 类型           | 默认值 |
| ------- | ------------------ | -------------- | ------ |
| express | 表达式             | express-string | -      |
| [value] | 类似于 case 的用法 | object         | {}     |
