---
title: switch
group:
  path: /plugins/action
  title: action
---

## switch

### 基本示例

```tsx
import React, { useState } from 'react';
import { Space } from 'antd';
import Snake from '@bybit-fe/snake';

const RenderModes = Snake.RenderModes;
Snake.setCtx('mode', RenderModes.ADD);

const schema = {
  "type": "button",
  "children": {
    "type": "text",
    "value": "show action"
  },
  "props": {
    "type": "primary"
  },
  "action": {
    "type": "switch",
    "express": "ctx.mode",
    "case": {
      "add": {
        "type": "message",
        "level": "success",
        "content": "add type"
      },
      "edit": {
        "type": "notification",
        "message": "edit type",
        "description": "content description"
      },
      "default": {
        "type": "message",
        "level": "info",
        "content": {
          "type": "express-string",
          "value": "ctx.mode.concat(' type')"
        }
      }
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
