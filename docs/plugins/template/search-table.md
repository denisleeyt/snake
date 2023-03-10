---
title: search-table
group:
  path: /plugins/template
  title: template
---

## search-table

search-table 代表一个标准的 CRUD 模块。

### 基本示例

<code src="../../../samples/template/search-table/Basic.tsx"></code>

### 多个弹窗表单

<code src="../../../samples/template/search-table/MultipleForm.tsx"></code>

## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| search | 搜索条件，参见 [search](#search) | object | - |
| table | 表格配置，参见 [table](./table) | object | {} |
| form | 表单配置，新增、编辑、详情弹窗的配置, 参见 [drawer-form](./drawer-form) | object | {} |
| pattern | 表单弹框形式，`drawer` / `modal` | string | 'drawer' |
| params | 额外的请求参数 | object | {} |

### search

| 参数      | 说明                                  | 类型 | 默认值 |
| --------- | ------------------------------------- | ---- | ------ |
| immediate | 实时搜索，true 时不会渲染 search 按钮 | bool | -      |

其它配置同 [form](form/#api)

## Schema [render]

search-table 可以直接使用 drawer-form、table 的 schema，除此之外，也支持以下 schema，进一步提升配置效率。

对于一些操作按钮，默认都是 "Link Button"，还有一些额外的属性配置。

| 参数    | 说明                       | 类型   | 默认值 |
| ------- | -------------------------- | ------ | ------ |
| icon    | 图标                       | string | -      |
| text    | 文字内容                   | string | -      |
| tooltip | 文字提示内容               | string | -      |
| props   | button 属性                | object | -      |
| confirm | popconfirm 内容            | string | -      |
| remote  | remote schema 配置         | object | -      |
| success | remote 成功的 message 内容 | string | -      |

schema 对各个属性的支持情况如下：

| schema               | icon | text | tooltip | props | confirm | remote | success |
| -------------------- | ---- | ---- | ------- | ----- | ------- | ------ | ------- |
| search-table-add     | ✔    | ✔    | ✔       | ✔     |         |        |         |
| search-table-refresh | ✔    | ✔    | ✔       | ✔     |         |        |         |
| search-table-view    | ✔    | ✔    | ✔       | ✔     |         |        |         |
| search-table-edit    | ✔    | ✔    | ✔       | ✔     |         |        |         |
| search-table-confirm | ✔    | ✔    | ✔       | ✔     | ✔       | ✔      | ✔       |
| search-table-delete  | ✔    | ✔    | ✔       | ✔     | ✔       | ✔      | ✔       |

### search-table-add

标准的 `add` 按钮，对应的配置如下：

```json
{
  "type": "button",
  "children": [
    {
      "type": "icon",
      "value": "plus"
    },
    {
      "type": "text",
      "value": "Add"
    }
  ],
  "props": {
    "type": "primary"
  },
  "action": {
    "type": "drawer-show",
    "form": {
      "mode": "add"
    }
  }
}
```

### search-table-refresh

标准的 `refresh` 按钮，对应的配置如下：

```json
{
  "type": "tooltip",
  "children": {
    "type": "button",
    "children": {
      "type": "icon",
      "value": "reload"
    },
    "props": {
      "type": "link"
    },
    "action": "table-refresh"
  },
  "props": {
    "title": "Refresh"
  }
}
```

### search-table-view

标准的 `view` 按钮，对应的配置如下：

```json
{
  "type": "tooltip",
  "children": {
    "type": "button",
    "children": {
      "type": "icon",
      "value": "read"
    },
    "props": {
      "type": "link"
    },
    "action": {
      "type": "drawer-show",
      "form": {
        "mode": "view"
      }
    }
  },
  "props": {
    "title": "Detail"
  }
}
```

### search-table-edit

标准的 `view` 按钮，对应的配置如下：

```json
{
  "type": "tooltip",
  "children": {
    "type": "button",
    "children": {
      "type": "icon",
      "value": "edit"
    },
    "props": {
      "type": "link"
    },
    "action": {
      "type": "drawer-show",
      "form": {
        "mode": "edit"
      }
    }
  },
  "props": {
    "title": "Edit"
  }
}
```

### search-table-confirm

标准的 `confirm` 按钮，对应的配置如下：

```json
{
  "type": "tooltip",
  "children": {
    "type": "popconfirm",
    "title": "<confirm>",
    "confirm": [
      "<remote>",
      {
        "type": "search-table-remote-action",
        "success": "<success>"
      }
    ],
    "children": {
      "type": "button",
      "children": {
        "type": "icon",
        "value": "<icon>"
      },
      "props": {
        "type": "link"
      }
    }
  },
  "props": {
    "title": "<tooltip>"
  }
}
```

### search-table-delete

可以看做是 `search-table-confirm` 的特例，定义了一些默认值：

| 参数    | 默认值               |
| ------- | -------------------- |
| icon    | 'delete'             |
| tooltip | 'Delete'             |
| props   | { 'danger': true }   |
| confirm | 'Confirm to Delete?' |

## Schema [action]

### search-table-remote-action

针对 remote 结果的处理逻辑，默认返回 200 时对应请求成功，对应的配置如下：

```json
{
  "type": "switch",
  "express": "ctx.chain.code",
  "case": {
    "200": [
      {
        "type": "message",
        "level": "success",
        "content": "<success ?? 'Successfully!'>"
      },
      "drawer-hide",
      "table-refresh"
    ],
    "default": {
      "type": "message",
      "level": "error",
      "content": [
        {
          "type": "text",
          "value": "Error: "
        },
        {
          "type": "template-string",
          "value": "${chain.msg}"
        }
      ]
    }
  }
}
```
