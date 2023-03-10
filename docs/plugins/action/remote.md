---
title: remote
group:
  path: /plugins/action
  title: action
---

## remote

### 基本示例

```tsx
import React from 'react';
import Snake from '@bybit-fe/snake';

const schema = {
  "type": "button",
  "children": {
    "type": "text",
    "value": "Fetch data with message"
  },
  "props": {
    "type": "primary"
  },
  "action": [
    {
      "type": "remote",
      "url": "/api/action/global-setting/country-setting/findOne",
      "method": "post",
      "params": {
        "id": "eth"
      }
    },
    {
      "type": "message",
      "level": "success",
      "content": "Remote Successfully!"
    }
  ]
};

export default () => <Snake {...schema} />;
```

### 改变请求参数

```tsx
import React from 'react';
import Snake from '@bybit-fe/snake';

const schema = {
  "type": "button",
  "children": {
    "type": "text",
    "value": "Change request options"
  },
  "props": {
    "type": "primary"
  },
  "action": [
    {
      "type": "remote",
      "url": "/api/action/global-setting/country-setting/findOne",
      "method": "post",
      "params": {
        "id": "btc,eth"
      },
      "options": "{ ...ctx.options, data: { id: ctx.options.data.id.split(',')} }"
    },
    {
      "type": "message",
      "level": "success",
      "content": "Remote Successfully!"
    }
  ]
};

export default () => <Snake {...schema} />;
```

## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| url | 请求地址 | string with template | - |
| method | 请求方式 | string | 'get' |
| params | 请求参数 | string/object/[] | - |
| options | 改变请求参数, [参数说明](https://github.com/umijs/umi-request/blob/master/README_zh-CN.md#%E8%AF%B7%E6%B1%82%E9%85%8D%E7%BD%AE) | express-string | - |
| response | 返回结果处理 | express-string | - |
| callable | search-table 中根据搜索条件判断是否调用 | express-string | true |

## 格式约定

因为低代码平台的很多组件都依赖于返回结果，此处约定返回结果格式如下：

```typescript
{
  "code": 0,
  "msg": "OK",
  "result": {},  // 具体返回结果，{} 或者 []
}
```

针对 search-table 那种带分页的请求，格式如下：

```typescript
// Request
{
  "page": 1,       // 页码，从 1 开始
  "limit": 20,     // 每页条数
}
// Response
{
  "code": 0,       // 0 代表成功
  "msg": "",       // 错误消息
  "result": {
    "list": [],
    "page": 1,
    "total": 25,    // 总条数
  }
}
```

字典类的请求，多用于筛选条件，下拉展示，格式如下：

```typescript
{
  "code": 0,
  "msg": "OK",
  "result": [     // label 用于展示， value 是用于前后端传输
    { "label": 'BTC', "value": 'BTC' },
    { "label": 'ETH', "value": 'ETH' },
  ]
}
```
