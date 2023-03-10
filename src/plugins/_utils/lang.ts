import { get, mergeWith } from 'lodash';
import type { SnakeCtx } from '../../type';
import { TEMPLATE_REGEXP, TEMPLATE_REGEXP_GLOBAL } from '../constants';

function _getType(obj: any): string {
  // @ts-ignore
  const type = Object.prototype.toString
    .call(obj)
    .match(/^\[object (.*)\]$/)[1]
    .toLowerCase();
  if (type === 'string' && typeof obj === 'object') return 'object'; // Let "new String('')" return 'object'
  if (obj === null) return 'null'; // PhantomJS has type "DOMWindow" for null
  if (obj === undefined) return 'undefined'; // PhantomJS has type "DOMWindow" for undefined
  return type;
}

export function isString(value: any): boolean {
  return _getType(value) === 'string';
}

export function isObject(value: any): boolean {
  return _getType(value) === 'object';
}

export function isArray(value: any): boolean {
  return _getType(value) === 'array';
}

export function isFunction(value: any): boolean {
  return _getType(value) === 'function';
}

export function isEmpty(value: any) {
  if (value === null || value === undefined || value === '') return true;
  if (isObject(value)) return Object.keys(value).length === 0;
  if (isArray(value)) return value.length === 0;

  return false;
}

function _mergeCustomizer(objValue: any, srcValue: any) {
  if (isArray(objValue)) return srcValue;
}

/**
 * Recursively merges data
 * @param object
 * @param sources
 */
export function merge(object: any, sources: any) {
  return mergeWith(object, sources, _mergeCustomizer);
}

/**
 * Parse and get native value
 * @param e
 */
export function getNativeValue(e: any) {
  return e && e.target && typeof e.target === 'object' && 'value' in e.target
    ? (e.target as HTMLInputElement)?.value
    : e;
}

/**
 * Transform template string with ctx
 * @param ctx
 * @param tmpl
 */
export function getCompiledTemplate(ctx: SnakeCtx, tmpl: any) {
  let compiled = tmpl;
  if (isString(tmpl) && TEMPLATE_REGEXP.test(tmpl)) {
    // @ts-ignore
    compiled = get(ctx, TEMPLATE_REGEXP.exec(tmpl)?.[1]);
  }
  return compiled;
}

/**
 * Replace template string with ctx
 * @param ctx
 * @param tmpl
 */
export function getReplacedTemplate(ctx: SnakeCtx, tmpl: any) {
  let compiled = tmpl;
  if (isString(tmpl) && TEMPLATE_REGEXP_GLOBAL.test(tmpl)) {
    // @ts-ignore
    compiled = tmpl.replaceAll(TEMPLATE_REGEXP_GLOBAL, (p) => getCompiledTemplate(ctx, p));
  }
  return compiled;
}

/**
 * Execute and get express result.
 */
export function getExpressionResult(ctx: SnakeCtx, express: any, defaultResult?: any) {
  if (!isString(express)) return express ?? defaultResult;

  try {
    return new Function('ctx', `return ${express?.trimStart()}`)(ctx);
  } catch (e) {
    console.error('[snake] express error:', e);
    return defaultResult;
  }
}
