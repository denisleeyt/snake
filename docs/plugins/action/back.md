---
title: back
group:
  path: /plugins/action
  title: action
---

## back

### 基本示例

```tsx
import React from 'react';
import Snake from '@bybit-fe/snake';

const schema = {
  "type": "button",
  "children": [
    {
      "type": "icon",
      "value": "arrow-left"
    },
    {
      "type": "text",
      "value": " back"
    }
  ],
  "props": {
    "type": "primary"
  },
  "action": {
    "type": "back"
  }
};

export default () => <Snake {...schema} />;
```
