---
title: table
group:
  path: /plugins/template
  title: template
---

## table

table 是一个标准的表格。


### 基本示例

<code src="../../../samples/template/table/Basic.tsx"></code>

[//]: # (### 列从远程数据渲染)

[//]: # ()
[//]: # (<code src="../../../samples/template/table/RemoteColumn.tsx"></code>)


## API

| 参数      | 说明                                                          | 类型       | 默认值     |
|---------|-------------------------------------------------------------|----------|---------|
| remote  | remote schema, 初始化即触发请求                                     | object   | -        |
| columns | 表格列的配置描述                                                       | Column[] | []       |
| props   | 请参考 [antd Form](https://ant.design/components/form-cn/#API) | object   | {}  |

### Column

| 参数      | 说明                       | 类型          | 默认值   |
|---------|--------------------------|-------------|-------|
| render  | 表格列的 render schema       | object      | -     |

其它配置同 [antd Table.Column](https://ant.design/components/table-cn/#Column)


## Schema [action]

table 支持以下 schema，用于控制相应的交互和逻辑等。

### table-refresh

刷新表格数据，会重新请求接口。
