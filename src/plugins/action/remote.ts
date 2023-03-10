import type { SnakeApi } from '../../type';
import { getExpressionResult, getReplacedTemplate, isEmpty, resolveTemplate } from '../utils';
import type { SchemaActionRemoteResponse } from '../../schema';

export default function remoteActionPlugin(api: SnakeApi) {
  api.registerAction('remote', ({ url, method = 'get', params, options, response }, ctx) => {
    const finalUrl = getReplacedTemplate(ctx, url);
    const defaultOptions = {
      method,
      [method?.toLowerCase() === 'get' ? 'params' : 'data']: resolveTemplate(ctx, params),
    };
    const finalOptions = isEmpty(options)
      ? defaultOptions
      : getExpressionResult({ ...ctx, options: defaultOptions }, options, defaultOptions);
    // console.debug('[snake][remote]:', finalUrl, finalOptions, ctx);
    return api.request(finalUrl, finalOptions).then((res: SchemaActionRemoteResponse) => {
      if (isEmpty(response)) return res;
      return getExpressionResult({ ...ctx, response: res }, response, res);
    });
  });
}
