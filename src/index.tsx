import React from 'react';
import { withRouter } from 'react-router';
import type { RequestMethod } from 'umi-request';
import SnakeCore from './core';
import { ActionPlugins, RenderPlugins, RenderModes, TemplatePlugins } from './plugins';
import type { SnakeCtx, SnakeProps } from './type';
import { setTimeZone, getTimeZone } from './utils';
import './index.less';
import type { Schema } from './schema';
import type { SnakeI18nTranslator, SnakePlugin } from './type';

const inst = new SnakeCore();
inst.registerPlugin(ActionPlugins);
inst.registerPlugin(RenderPlugins);
inst.registerPlugin(TemplatePlugins);

function renderItem(type: string, args: any, ctx?: SnakeCtx): React.ReactNode {
  // @ts-ignore
  // return React.cloneElement(inst.render(type, args, ctx));
  return React.cloneElement(inst.renderSchemas(ctx, { type, ...args }));
}

class Snake extends React.Component<SnakeProps, any> {
  static RenderModes = RenderModes;

  static setTimeZone = setTimeZone;

  static getTimeZone = getTimeZone;

  static SnakeCore = SnakeCore;

  static registerPlugin(plugin: SnakePlugin) {
    // @ts-ignore
    inst.registerPlugin(plugin);
  }

  static getCtx(key?: string): any {
    return inst.getCtx(key);
  }

  static setCtx(key: string, ctxValue: any) {
    inst.setCtx(key, ctxValue);
  }

  static simplify(type: string, name: string, schema: Schema) {
    // @ts-ignore
    inst.simplify(type, name, schema);
  }

  static setDefaultI18n(translator: SnakeI18nTranslator) {
    inst.setDefaultI18n(translator);
  }

  static setDefaultRequest(request: RequestMethod) {
    inst.setDefaultRequest(request);
  }

  // static render = renderItem;

  render() {
    const { type, history, location, match, ...restProps } = this.props;
    return (
      <div className="snake-container">
        {renderItem(type, restProps, { history, location, match })}
      </div>
    );
  }
}

export { SnakeCore, setTimeZone, getTimeZone };
export default withRouter<SnakeProps, any>(Snake);
