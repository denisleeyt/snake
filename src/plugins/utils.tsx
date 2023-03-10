import type { ReactNode } from 'react';
import { Fragment } from 'react';
import { castArray } from 'lodash';
import type { Schema, SchemaAction, SchemaRender } from '../schema';
import type { SnakeApi, SnakeCtx } from '../type';

import {
  getCompiledTemplate,
  getExpressionResult,
  getNativeValue,
  getReplacedTemplate,
  isArray,
  isEmpty,
  isFunction,
  isObject,
  isString,
  merge,
} from './_utils/lang';

import {
  formatFieldsValues,
  normalizeColumn,
  normalizeField,
  normalizeFields,
  normalizeFieldsValues,
  normalizeFieldsWithRemote,
  normalizeSchema,
} from './_utils/normalize';
import { TEMPLATE_REGEXP } from './constants';

export {
  // lang
  isString,
  isObject,
  isArray,
  isFunction,
  isEmpty,
  merge,
  getNativeValue,
  getCompiledTemplate,
  getReplacedTemplate,
  getExpressionResult,
  // normalize
  normalizeSchema,
  normalizeColumn,
  normalizeField,
  normalizeFields,
  normalizeFieldsWithRemote,
  normalizeFieldsValues,
  formatFieldsValues,
};

/**
 * Resolve data with template
 * @param ctx
 * @param params
 */
export function resolveTemplate(ctx: SnakeCtx, params: any = {}): Record<string, any> {
  if (isString(params)) {
    return TEMPLATE_REGEXP.test(params) ? getCompiledTemplate(ctx, params) : {};
  } else if (isArray(params)) {
    return params.reduce((a: object, c: any) => {
      return {
        ...a,
        ...resolveTemplate(ctx, c),
      };
    }, {});
  }

  return Object.entries(params).reduce((a, [key, value]) => {
    return {
      ...a,
      [key]: getCompiledTemplate(ctx, value),
    };
  }, {});
}

/**
 * Render with schemas
 * @param api
 * @param ctx
 * @param schema
 * @param value
 */
export function renderSchemas(
  api: SnakeApi,
  ctx: SnakeCtx,
  schema: SchemaRender[] | SchemaRender,
  value?: any,
): ReactNode {
  if (isEmpty(schema)) return null;

  const renderArray = castArray(schema);
  return (
    <>
      {renderArray.map((r: Schema, idx: number) => {
        // @ts-ignore
        const { type: renderType, onClick, action, ...restRender } = normalizeSchema(r);
        // resolve action
        let handleClick = onClick;
        if (action) {
          handleClick = async (...args: any) => {
            onClick?.(args);
            return await runActions(api, ctx, action);
          };
        }
        return (
          <Fragment key={idx.toString()}>
            {api.render(
              renderType,
              {
                // mode: RenderModes.ADD,
                value,
                ...restRender,
                onClick: handleClick,
              },
              ctx,
            )}
          </Fragment>
        );
      })}
    </>
  );
}

/**
 * Run schema actions
 * @param api
 * @param ctx
 * @param actions
 */
export async function runActions(
  api: SnakeApi,
  ctx: SnakeCtx,
  actions?: SchemaAction[] | SchemaAction,
) {
  const finalActions = castArray(actions ?? []);
  let chain: any = ctx?.chain ?? null;
  for (const action of finalActions) {
    // @ts-ignore
    const { type: actionType, ...actionProps } = normalizeSchema(action as Schema);
    // console.debug('[snake][runActions] start:', action, chain, ctx);
    chain = await api.action(actionType, actionProps, { ...ctx, chain });
    // console.debug('[snake][runActions] end:', chain);
  }
  return chain;
}
