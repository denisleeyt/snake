---
title: 介绍
order: 1
toc: menu
nav:
  title: 指南
  order: 1
---

## 什么是 snake？

`snake` 是一个面向低代码平台的前端渲染引擎，支持灵活的 schema 注册及调用，插件化的方式实现配置的高扩展性与高灵活性。

- 默认的 `Snake` 是在 antd 基础上的一个完整的解决方案，开箱即用。
- 如果有特殊需求，可以在 `SnakeCore` 的基础上编写插件，随心所欲的根据业务形态进行定制。

## 特性

- 📦 开箱即用，将注意力集中在核心功能的开发
- 🌴 高度抽象，通过 action 和 render 插件的组合，灵活支撑多种业务场景
- 🚀 开发提效，提供多种 template 模板，覆盖中后台典型场景
- 🔌 高扩展性，插件化的方式，实现配置的高扩展性与高灵活性


## 快速入门

### 概念

低代码渲染引擎的基本模式符合以下表达式：

> f(schema) => UI + UX

将一个应用转换为 `schema` （即配置）需要高度地抽象，为了简化理解成本，`schema` 映射为两大类：

> UI + UX => render（渲染） + action（行为）

然后，所有的页面和交互均可由 render 和 action 组合而成。

针对一些特定的场景（比如 CRUD），`snake` 还内置了一些 `template`，进一步降低配置成本。

[//]: # (更多关于 Schema 的说明请移步 [Schema]&#40;./schema&#41; 章节。)


### Schema

先说一下，schema 之所以能生效，是因为每一个 schema 都需要在相应的插件中去注册并支持，schema 如何配置请参考对应的插件说明。

根据上文的说明，Schema 主要分为两类：`render` 和 `action`。

为了进一步放大 schema 的灵活度，render 和 action 均支持以下格式：

```typescript
export type Schema = string & Record<string, any> & string[] & Record<string, any>[];
```

框架内部会把 schema 转成标准的对象格式传到 plugin 中，方便配置的同时，也不会增加插件开发的工作量。


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

- `simplify` 提供了强大的配置抽象能力，如果有大段的重复配置，可以直接用这个方法进行注册、简化，进一步提升配置的效率。

  ```typescript
  export type SnakeCoreApi = {
    simplify: (type: string, name: string, schema: Schema | ((args?: Record<string, any>) => Schema)) => void;
  };
  ```


### Ctx 上下文

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

配置 schema 时，可能会用到 ctx 里的数据，根据情况不同，render 和 action 的配置都有以下约定：

- template 模板，比如 `template-string`、remote url/params 等，会直接从 ctx 取值，比如：'${search.name}' 对应的值为 ctx.search.name。
- express 表达式，比 template 更为强大，支持 js 语法，返回执行结果，ctx 会作为参数传入，需要显式使用。
