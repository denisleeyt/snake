---
title: Introduction
order: 1
toc: menu
nav:
  title: Guide
  order: 1
---

## What is snake？

`snake` is a render engine of a low-code platform, support flexible schema and plugin to achieve the high extensibility and flexibility.

- `Snake` is based on antd, out of the box.
- If there is any special requirement, developer can develop his own plugin or action based on `SnakeCore`.

## Characteristic

- 📦 Out of the box, focus on the development of core functions
- 🌴 High abstraction, can support different scenarios
- 🚀 Uplift productivity, provides multiple templates, cover numerous scenarios
- 🔌 High scalability, pluggable approach to achieve high scalability and flexibility of config


## Quick start

### Concept

The expression of Low-code rendering engine:

> f(schema) => UI + UX

convert an application to `schema` needs to be highly abstraction, in order to simplify the cost, `schema` reflect to two types:

> UI + UX => render + action

All the web pages and interactions are the composites for render and action.

For specific scenarios(CRUD),`snake` predefine `template` for reusing

[//]: # (More related to Schema, please refer to [Schema]&#40;./schema&#41; section)


### Schema

先说一下，schema 之所以能生效，是因为每一个 schema 都需要在相应的插件中去注册并支持，schema 如何Config请参考对应的插件说明。

根据上文的说明，Schema 主要分为两类：`render` 和 `action`。

为了进一步放大 schema 的灵活度，render 和 action 均支持以下格式：

```typescript
export type Schema = string & Record<string, any> & string[] & Record<string, any>[];
```

框架内部会把 schema 转成标准的对象格式传到 plugin 中，方便Config的同时，也不会增加插件开发的工作量。


### API

`snake` 默认内置 4 类 api：

- `action` 行为类，用于逻辑处理

  ```typescript
  export type SnakeActionPluginApi = {
    action: (type: string, args?: Record<string, any>, ctx?: SnakeCtx) => any;
    registerAction: (type: string, callback: (args: SchemaAction, ctx?: SnakeCtx) => any) => void;
    unregisterAction: (type: string) => void;
  };
  ```

- `render` 渲染类，用于视图展示
  
  ```typescript
  export type SnakeRenderPluginApi = {
    render: (type: string, args?: Record<string, any>, ctx?: SnakeCtx) => ReactNode;
    registerRender: (type: string, callback: (args: SchemaRender, ctx?: SnakeCtx) => ReactNode) => void;
    unregisterRender: (type: string) => void;
    renderSchemas: (ctx: SnakeCtx, schema: SchemaRender[] | SchemaRender) => ReactNode;
  };
  ```

- `ctx` 上下文，数据相关，包括路由、全局、插件等

  ```typescript
  export type SnakeCoreApi = {
    getCtx: (key?: string) => any;
    setCtx: (key: string, ctxValue: any) => void;
  };
  ```

- `simplify` 提供了强大的Config抽象能力，如果有大段的重复Config，可以直接用这个方法进行注册、简化，进一步提升Config的效率。

  ```typescript
  export type SnakeCoreApi = {
    simplify: (type: string, name: string, schema: Schema | ((args?: Record<string, any>) => Schema)) => void;
  };
  ```


### Ctx Context

框架内部将所有的数据都放到 ctx 中，定义如下：

```typescript
// 路由数据
export type RouteChildrenProps = {
  history?: Record<string, any>;
  location?: Record<string, any>;
  match?: Record<string, any>;
}
export type SnakeCtx = RouteChildrenProps & {
  form?: Record<string, any>;          // 表单数据
  mode?: string;                       // 表单的模式（`add`|`edit`|`view`），仅在带 form 的容器（drawer/modal）中可用
  record?: Record<string, any>;        // 表格的 row
  chain?: any;                         // 多个 action 顺序执行时的 data
  search?: Record<string, any>;        // 搜索条件
  response?: any;                      // remote 请求结果
} | undefined;
```

Config schema 时，可能会用到 ctx 里的数据，根据情况不同，render 和 action 的Config都有以下约定：

- template 模板，比如 `template-string`、remote url/params 等，会直接从 ctx 取值，比如：'${search.name}' 对应的值为 ctx.search.name。
- express 表达式，比 template 更为强大，支持 js 语法，返回执行结果，ctx 会作为参数传入，需要显式使用。
