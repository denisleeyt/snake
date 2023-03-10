import type { SnakeApi, SnakeCtx } from '../type';
import type { SchemaRender } from '../schema';

export type SchemaComponentType = SchemaRender & {
  api: SnakeApi;
  ctx?: SnakeCtx;

  form?: Record<string, any>;
};
