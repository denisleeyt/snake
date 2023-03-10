import type { ReactNode, CSSProperties } from 'react';
// import type { RouteChildrenProps } from 'react-router';
import type { RouteComponentProps } from 'react-router';
import type { Schema, SchemaAction, SchemaRender } from './schema';
import type { RequestMethod } from 'umi-request';

type SnakeHookObject = { name: string; argNumber?: number };
export type SnakeHook = SnakeHookObject | string;
export type SnakePlugin = (api: SnakeApi) => void;

export type SnakeI18nTranslator = (key: string) => string;
export type SnakeCoreApi = {
  getCtx: (key?: string) => any;
  setCtx: (key: string, ctxValue: any) => void;
  registerHook: (hook: SnakeHook) => void;
  registerPlugin: (plugin: SnakePlugin) => void;
  renderSchemas: (ctx: SnakeCtx, schema: SchemaRender[] | SchemaRender, value?: any) => ReactNode;
  // i18n translator
  t: (key: any) => ReactNode;
  setDefaultI18n: (translator: SnakeI18nTranslator) => void;
  // request
  request: (...args: any) => Promise<any>;
  setDefaultRequest: (request: RequestMethod) => void;
};

export type RouteChildrenProps = {
  history?: Record<string, any>;
  location?: Record<string, any>;
  match?: Record<string, any>;
};
export type SnakeCtx =
  | (RouteChildrenProps & {
      mode?: string;
      form?: Record<string, any>;
      record?: Record<string, any>;
      chain?: any;
      search?: Record<string, any>;
      // remote response
      options?: any;
      response?: any;
    })
  | undefined;

/* Render plugins */
export type SnakeRenderRegisterCallback = (args: SchemaRender, ctx?: SnakeCtx) => ReactNode;
export type SnakeRender = (type: string, args?: Record<string, any>, ctx?: SnakeCtx) => ReactNode;
export type SnakeRenderRegister = (type: string, callback: SnakeRenderRegisterCallback) => void;
export type SnakeRenderUnregister = (type: string) => void;
export type SnakeRenderPluginApi = {
  onRender: (callback: SnakeRender) => any;
  render: SnakeRender;
  onRegisterRender: (callback: (type: string, callback: SnakeRenderRegisterCallback) => void) => any;
  onUnregisterRender: (callback: (type: string) => void) => any;
  registerRender: SnakeRenderRegister;
  unregisterRender: SnakeRenderUnregister;
};

/* Action plugins */
export type SnakeActionRegisterCallback = (args: SchemaAction, ctx?: SnakeCtx) => any;
export type SnakeAction = (type: string, args?: Record<string, any>, ctx?: SnakeCtx) => any;
export type SnakeActionRegister = (type: string, callback: SnakeActionRegisterCallback) => void;
export type SnakeActionUnregister = (type: string) => void;
export type SnakeActionPluginApi = {
  onAction: (callback: SnakeAction) => any;
  action: SnakeAction;
  onRegisterAction: (callback: (type: string, callback: SnakeActionRegisterCallback) => void) => any;
  onUnregisterAction: (callback: (type: string) => void) => any;
  registerAction: SnakeActionRegister;
  unregisterAction: SnakeActionUnregister;
};

/* Simplify plugins */
export type SnakeSimplify = (
  type: string,
  name: string,
  schema: Schema | ((args?: Record<string, any>) => Schema),
) => any;
export type SnakeSimplifyPluginApi = {
  onSimplify: (callback: SnakeSimplify) => any;
  simplify: SnakeSimplify;
};

export type SnakeApi = SnakeCoreApi &
  SnakeRenderPluginApi &
  SnakeActionPluginApi &
  SnakeSimplifyPluginApi;

export type SnakeCoreProps = SnakeApi & {
  hooks?: SnakeHook[];
  plugins?: SnakePlugin[];

  // for plugins
  [key: string]: any;
};

export type SnakeProps = RouteComponentProps & {
  prefixCls?: string;
  className?: string;
  style?: CSSProperties;
  wrapperClassName?: string;
  /** render type */
  type: string;

  RenderModes: Record<string, any>;

  [key: string]: any;
};
