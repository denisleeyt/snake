---
title: form
group:
  path: /plugins/template
  title: template
---

## form

### 基本示例

<code src="../../../samples/template/form/Basic.tsx"></code>

### disabled

<code src="../../../samples/template/form/Disabled.tsx"></code>

### visible

<code src="../../../samples/template/form/Visible.tsx"></code>

### watch

<code src="../../../samples/template/form/Watch.tsx"></code>

### loading 状态

<code src="../../../samples/template/form/Loading.tsx"></code>

## API

| 参数        | 说明                                                           | 类型    | 默认值 |
| ----------- | -------------------------------------------------------------- | ------- | ------ |
| mode        | 表单的模式（`add`/`edit`/`view`），分别对应新增、编辑和详情页  | string  | 'add'  |
| remote      | remote schema, 编辑和详情时触发请求                            | object  | -      |
| fields      | 表单Config                                                       | Field[] | []     |
| withLoading | 展示 remote 和 fields 中请求的 loading 状态                    | boolean | false  |
| props       | 请参考 [antd Form](https://ant.design/components/form-cn/#API) | object  | {}     |

### Field

表单项的 render 组件会根据 mode 的不同有所差异，比如 input 在 `view` 模式下只能看，在 `edit` 和 `add` 时可以编辑。 同时也支持自定义的Config，若想让 `edit` 时对应的字段不能编辑，让 disabled 为 true 即可。

| 参数       | 说明                                                    | 类型        | 默认值 |
| ---------- | ------------------------------------------------------- | ----------- | ------ |
| dependency | 是否依赖其他 field，如有依赖，必须在 relates 中显示Config | object      | -      |
| render     | 表单项的 render schema                                  | object      | -      |
| visible    | 是否可见，expression schema                             | object/bool | true   |
| disabled   | 是否可以编辑，expression schema                         | object/bool | false  |

其它Config同 [antd Form.Item](https://ant.design/components/form-cn/#FieldData)
