# Low Code Schema

- **组件**：视图 + 逻辑 => render + action
- **模式**：表单（详情）、表格、图表 => form + table
- **样式**：容器 + 布局 => container + layout
- **数据**：缺省 + 远程 + 上下文 => default/initial + remote + ctx

```TypeScript
type Compound<T> = T | ctx => T | object | ctx => object;

type ctx = RouteChildrenProps & {
  form: object;
  record: object;
  chain: any;
  mode: string;
}

type OptionType = {
  label: string;
  value: any;
}
```

## Action Schema

```TypeScript
/**
 * Action Schema, Compound<object>
 *  - route
 *  - back
 *  - message
 *  - notification
 *  - confirm
 *  - condition
 *  - refresh
 */
```

### route

```TypeScript
{
  type: 'route',          // action type
  url: '/xxx',
}
```

### remote

```TypeScript
{
  type: 'remote',
  url: '',
  method: 'GET',
  params: {},             // '{}' | 'ctx => {}', [];
  response: '',           // expression function with ctx and result
  condition: [{           // conditional schema settings
    express: '',
    params: {},
  }],
}
```

`params` will translate data with `ctx` data, eg. '${record.tokenId}'.

### condition

```TypeScript
{
  type: 'condition',
  express: '',             // JavaScript express with `ctx`
  action: {},
  chained: true,           // whether to update chain data by actions, default: false
}
```

### switch

```TypeScript
{
  type: 'switch',
  express: '',             // JavaScript express with `ctx`
  case: {                  // case actions with default
    ['case']: {},
    default: {},
  },
  chained: true,           // whether to update chain data by actions, default: false
}
```

## Render Schema

```TypeScript
/**
 * Render Schema, Compound<object>
 */
{
  type: 'button',     // render type
  mode: 'add',        // 'add' | 'edit' | 'view';
  tooltip: 'xxx',     // 'xxx' | 'ctx => {}' | '{}';
  visible: true,      // 'boolean' | 'ctx => boolean';
  disabled: true,     // 'boolean' | 'ctx => boolean';
  action: {},         // action Config
  remote: {},         // 获取 dataSource

  props: {},          // 透传给具体的组件
  children: [],       // 嵌套
}
```

尽量复用 antd 组件本身已有的属性，放到 `props` 里，最外层只会有 `value`/`onChange` 等特殊字段。

### express-string

Render template data with `ctx`.

```TypeScript
{
  "key": "showPrecision",
  "title": "showPrecision",
  "render": {
    "type": "express-string",
    value: 'ctx.record.pricePrecision.toString() + ctx.record.assetsPrecision'
  }
}
```

### template-string

Render template data with `ctx`.

```TypeScript
{
  type: 'template-string',
  value: '${chain.msg}',
}
```

### condition

```TypeScript
{
  type: 'condition',
  express: '',             // JavaScript express with `ctx`
  render: {},
}
```

### switch-case

```TypeScript
{
  type: 'switch-case', 
  express: '',             // JavaScript express with `ctx`
  case: {                  // case actions with default
    ['case']: {},
    default: {},
  },
}
```


## Template

### Form Schema

```TypeScript
{
  layout: 'vertical',                // 布局
  mode: 'add',                       // 'add' | 'edit' | 'view'; 表单的三种状态
  initialValues: { name: 'cat' },
  remote: {
    url: '',
    method: 'GET',
  },
  fields: [
    {
      name: 'name',
      label: '姓名',
      render: Compound<string>,       // render schema
      rules: [{ required: true, message: 'Missing first name' }],
      dependency: {                   // 表单间的关联逻辑，待完善
        relates: ['type'],
        // ['visible' | 'disabled']: {
        //   default: false,
        //   relates: ['type'],
        //   ...                         // 条件表达式Config
        // }
      },
    },
    {
      name: 'gender',
      label: '性别',
      render: {
        type: 'checkbox-group',
        options: [
          { label: '男', value: 'male' },
          { label: '女', value: 'female' },
        ],
      },
      visible: 'ctx.form["name"] === "world2"', // ctx with form expression
      dependency: {
        relates: ['name'],
      },
    },
  ],
  submit: {
    content: 'submit',
    actions: [
      {
        type: 'remote',
        url: 'https://www.mocky.io/v2/5185415ba171ea3a00704eed',
        method: 'POST'
      },
    ],
  },
}
```

### Table Schema

```TypeScript
{
  rowKey: 'id',
  remote: {
    url: '',
    method: 'GET',
  },
  columns: [
    {
      key: 'order',
      title: 'Order',
    },
    {
      key: 'iconUrl',
      title: 'Icon',
      render: {
        type: 'icon',
      },
    },
    {
      key: 'tokenName',
      title: 'Token Name',
    },
    {
      key: 'select',
      title: 'Select',
      render: {
        mode: RenderModes.VIEW,
        type: 'select',
        options: [
          { value: 'hello', label: 'Hello' },
          { value: 'world', label: 'World' },
        ],
      },
    },
    {
      key: 'operation',
      title: 'Action',
      render: [
        {
          type: 'icon',
          value: 'read',
          // action: [
          //   'schema-modal-form',
          //   'refresh-table',
          // ],
        },
        {
          type: 'tooltip',
          children: {
            type: 'icon',
            value: 'edit',
          },
          props: {
            title: 'prompt text',
          },
        },
        {
          type: 'button',
          children: [
            {
              type: 'icon',
              value: 'delete',
            },
            {
              type: 'text',
              value: 'Delete',
            },
          ],
          props: {
            type: 'link',
            danger: true,
          },
          action: [
            {
              type: 'remote',
              url: '/api/showcase/table/delete',
              params: {
                id: '${record.tokenId}',
              },
              method: 'post',
            },
            {
              type: 'message',
              level: 'success',
              content: 'Delete success',
            },
            'table-refresh'
          ],
        },
      ],
    },
  ],
  header: {
    title: {
      type: 'text',
      value: 'Table Title',
    },
    toolbar: [
      {
        type: 'button',
        children: [
          {
            type: 'icon',
            value: 'plus',
          },
          {
            type: 'text',
            value: 'Add',
          },
        ],
        props: {
          type: 'primary',
        },
        // action: 'table-refresh',
      },
      {
        type: 'tooltip',
        children: {
          type: 'button',
          children: {
            type: 'icon',
            value: 'reload',
          },
          props: {
            type: 'link',
          },
          action: 'table-refresh',
        },
        props: {
          title: 'Refresh Table',
        },
      },
    ],
  },
}
```

#### Action

- `table-refresh`: Refresh table.

### SearchTable Schema

```TypeScript
{
  type: 'search-table',
  search: {                               // search conditions, same with form schema
    immediate: false,                     // Whether to trigger the table search immediately when the search changes
  },
  table: {},                              // table schame
  form: {},                               // add/edit/view form schema
  pattern: 'drawer',                      // drawer/modal, default drawer
}
```

考虑到 SearchTable 的特殊情况，针对表单需要初始化的场景，table 的 remote 支持 `callable` 表达式，判断是否需要请求。

```TypeScript
{
  'search': {
    'immediate': true,
  },
  'table': {
    'remote': {
      'url': '/api/sys/lc-project/black-admin/lc-module/${search.name}/lc-submodule',
      'method': 'get',
      'callable': '!!ctx.search.name'
    },
  }
}
```


#### Action

Action is varied with `pattern`.

- `drawer-show`: Show drawer with form schema.
- `drawer-hide`: Hide drawer with form schema.
- `drawer-validate-form`: Validate form data inside drawer.
- `modal-show`: Show modal with form schema.
- `modal-hide`: Hide modal with form schema.
- `modal-validate-form`: Validate form data inside modal.

## API 接口

```TypeScript
{
  code: 0,
  msg: 'OK',
  result: {},  // 具体返回结果，{} 或者 []
}
```

### 查询表格带分页

```TypeScript
// Request
{
  page: 1,       // 页码，从 1 开始
  limit: 20,     // 每页条数
}
// Response
{
  code: 0,       // 0 代表成功
  msg: '',       // 错误消息
  result: {
    list: [],
    page: 1,
    total: 25,    // 总条数
  },
}
```

### 字典类

多用于筛选条件，下拉展示

```TypeScript
{
  code: 0,
  msg: 'OK',
  result: [     // label 用于展示， value 是用于前后端传输
    { label: 'BTC', value: 'BTC' },
    { label: 'ETH', value: 'ETH' },
  ]
}
```

### 时间值

统一用 10 位时间戳，前端根据Config展示。
