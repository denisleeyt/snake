---
title: select
group:
  path: /plugins/render
  title: render
---

## select

### 基本示例

<code src="../../../samples/render/select/Basic.tsx"></code>

### disabled

<code src="../../../samples/render/select/Disabled.tsx"></code>

### 下拉选项来自接口

<code src="../../../samples/render/select/Remote.tsx"></code>

## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| mode | 模式 | RenderModes | ‘add’ |
| value | 当前选中的条目 | string / number | - |
| remote | 获取远程获取的 remote 配置 | object | - |
| options | 下拉框内容 | [{ label, value }] | - |
| disabled | 是否禁用状态，默认为 false | boolean | false |
| autoClear | 当 value 没有匹配的 option 时自动清空 | boolean | false |
| autoSwap | 当 value 没有匹配的 option 时切换成第一个 | boolean | false |
| props | 请参考 [antd](https://ant.design/components/select-cn/) | object | {} |
| props.allowClear | 支持清除，如果为 false 且未赋值，会自动选中第一条数据 | boolean | - |
