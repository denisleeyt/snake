---
title: multiple-row-editor
group:
path: /plugins/render
title: render
---

## multiple-row-editor

### 基本示例

```tsx
import React from 'react';
import Snake from '@bybit-fe/snake';

const schema = {
  "type": "form",
  "initialValues": {
    "multiple-row-editor": []
  },
  "fields": [
    {
      "name": "multiple-row-editor",
      "label": "multiple-row-editor",
      "render": {
        "type": "multiple-row-editor",
        "fields": [
          {
            "name": "value",
            "render": "input"
          },
          {
            "name": "label",
            "render": "input"
          }
        ]
      }
    }
  ],
  "props": {
    "labelCol": {
      "span": 8
    },
    "wrapperCol": {
      "span": 12
    }
  },
  "submit": {
    "type": "text",
    "value": "Submit",
    "action": {
      "type": "notification",
      "message": "Form Sumitted!",
      "description": {
        "type": "express-string",
        "value": "JSON.stringify(ctx.form)"
      }
    }
  }
};

export default () => <Snake {...schema} />;
```

### 不同的 render

```tsx
/**
 * desc: 多种 render 类型，并设定默认值
 */
import React from 'react';
import Snake from '@bybit-fe/snake';

const schema = {
  "type": "form",
  "initialValues": {
    "multiple-row-editor": []
  },
  "fields": [
    {
      "name": "multiple-row-editor",
      "label": "multiple-row-editor",
      "render": {
        "type": "multiple-row-editor",
        "fields": [
          {
            "name": "input",
            "defaultValue": "row"
          },
          {
            "name": "switch",
            "render": "switch",
            "defaultValue": true
          },
          {
            "name": "select",
            "label": "筛选框",
            "render": {
              "type": "select",
              "options": [
                {
                  "value": "hello",
                  "label": "Hello"
                },
                {
                  "value": "world",
                  "label": "World"
                }
              ]
            },
            "defaultValue": "world"
          }
        ]
      }
    }
  ],
  "props": {
    "labelCol": {
      "span": 8
    },
    "wrapperCol": {
      "span": 12
    }
  },
  "submit": {
    "type": "text",
    "value": "Submit",
    "action": {
      "type": "notification",
      "message": "Form Sumitted!",
      "description": {
        "type": "express-string",
        "value": "JSON.stringify(ctx.form)"
      }
    }
  }
};

export default () => <Snake {...schema} />;
```

## API

| 参数      | 说明           | 类型                   | 默认值 |
| --------- | -------------- | ---------------------- | ------ |
| fields    | 编辑项信息配置 | Field[]                | []     |
| value     | 值             | array                  | []     |
| onChange  | 改变时的回调   | function(value: array) | -      |
| showTitle | 是否展示标题行 | boolean                | true   |

### Field

编辑项配置信息

| 参数         | 说明                            | 类型          | 默认值  |
| ------------ | ------------------------------- | ------------- | ------- |
| name         | 字段名                          | string        | -       |
| label        | 标题行的文本，如不填则展示 name | string        | -       |
| render       | 渲染类型，类似于 form           | object/string | 'input' |
| defaultValue | 默认值                          | any           | ''      |
