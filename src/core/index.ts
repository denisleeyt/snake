/* eslint-disable no-underscore-dangle */
import type { ReactNode } from 'react';
import { SyncWaterfallHook } from 'tapable';
import defaultRequest from 'umi-request';
import type { RequestMethod } from 'umi-request';
import type { SnakeCoreProps, SnakeCtx, SnakeHook, SnakePlugin } from '../type';
import { upperFirst } from '../utils';
import { isFunction, isString, renderSchemas } from '../plugins/utils';

import ActionPlugin from './action';
import RenderPlugin from './render';
import SimplifyPlugin from './simplify';
import type { SchemaRender } from '../schema';
import type { SnakeI18nTranslator } from '../type';

export default class SnakeCore {
  private __hooks: Record<string, any> = {};
  private __ctx: SnakeCtx = {};
  private __translator: SnakeI18nTranslator = (key) => key;
  private __request: RequestMethod = defaultRequest;
  // public request =

  constructor(props?: SnakeCoreProps) {
    // super(props);
    const { hooks = [], plugins = [] } = props || {};

    hooks.forEach((hook) => {
      this.registerHook(hook);
    });

    plugins.forEach((plugin) => {
      this.registerPlugin(plugin);
    });

    // init render and action hooks
    this.registerPlugin(ActionPlugin);
    this.registerPlugin(RenderPlugin);
    this.registerPlugin(SimplifyPlugin);
  }

  getCtx(key?: string) {
    if (!key) return this.__ctx;
    return this.__ctx?.[key];
  }

  setCtx(key: string, ctxValue: any) {
    if (!key) return;
    this.__ctx = { ...this.__ctx, [key]: ctxValue };
  }

  /**
   * action， registerAction， unregisterAction, onAction, onRegisterAction，onUnregisterAction
   * @param hook
   * action:
   */

  // render() {
  //   syncHook.call(...args)
  // }
  // onRender() {
  //   syncHook.tap(hookName, callback);
  // }

  // tap the hooks and define the callback
  registerHook(hook: SnakeHook) {
    const hookName = typeof hook === 'string' ? hook : hook.name;
    const argNumber = typeof hook === 'string' ? 1 : hook?.argNumber ?? 1;

    const syncHookArgs = Array(argNumber)
      .fill(0)
      .map((_, i) => `arg${i}`);
    // @ts-ignore
    const syncHook = new SyncWaterfallHook(syncHookArgs);
    this.__hooks[hookName] = syncHook;

    // @ts-ignore
    this[hookName] = (...args: any) => syncHook.call(...args);
    this[`on${upperFirst(hookName)}`] = (callback: (...args: any[]) => any) =>
      syncHook.tap(hookName, callback);
  }

  registerPlugin(plugin: SnakePlugin) {
    // @ts-ignore
    plugin(this);
  }

  renderSchemas(ctx: SnakeCtx, schema: SchemaRender[] | SchemaRender, value?: any) {
    // @ts-ignore
    return renderSchemas(this, ctx, schema, value);
  }

  // default i18n translator
  t(key: any): ReactNode {
    if (key && isString(key)) return this.__translator(key);
    return key;
  }

  setDefaultI18n(translator: SnakeI18nTranslator) {
    if (isFunction(translator)) {
      this.__translator = translator;
    }
  }

  // default request
  request(...args: any): Promise<any> {
    // @ts-ignore
    return this.__request(...args);
  }

  setDefaultRequest(request: RequestMethod) {
    this.__request = request;
  }
}
