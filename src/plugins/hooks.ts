import type { DependencyList, EffectCallback } from 'react';
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import type { PaginationProps } from 'antd';
import { isEqual } from 'lodash';
import type { SnakeApi, SnakeCtx } from '../type';
import type { Schema, SchemaActionRemote } from '../schema';
import { getExpressionResult, normalizeSchema } from './utils';

export function useEvent(handler: (...args: any[]) => any) {
  const handlerRef = useRef(null);

  // In a real implementation, this would run before layout effects
  useLayoutEffect(() => {
    // @ts-ignore
    handlerRef.current = handler;
  });

  return useCallback((...args) => {
    // In a real implementation, this would throw if called during render
    const fn = handlerRef?.current;
    // @ts-ignore
    return fn?.(...args);
  }, []);
}

export function usePrevious<T>(value: T): T | undefined {
  // The ref object is a generic container whose current property is mutable
  // and can hold any value, similar to an instance property on a class
  const ref = useRef<T>(value);

  // Store current value in ref
  useEffect(() => {
    ref.current = value;
  }, [value]); // Only re-run if value changes

  // Return previous value (happens before update in useEffect above)
  return ref.current;
}

export function useCompareEffect(effect: EffectCallback, deps: DependencyList) {
  const ref = useRef<DependencyList | undefined>(undefined);
  if (!ref.current || !isEqual(deps, ref.current)) {
    ref.current = deps;
  }
  // eslint-disable-next-line
  useEffect(effect, ref.current);
}

export function useCompareMemo<T>(factory: () => T, deps: DependencyList): T {
  const ref = useRef<DependencyList | undefined>(undefined);
  if (!ref.current || !isEqual(deps, ref.current)) {
    ref.current = deps;
  }
  // eslint-disable-next-line
  return useMemo<T>(factory, ref.current);
}

export function useSearch(
  api: SnakeApi,
  ctx: SnakeCtx,
  schema?: SchemaActionRemote,
  params?: object,
): any {
  const [loading, setLoading] = useState<boolean>(false);
  const [list, setList] = useState<object[]>([]);
  const [pagination, setPagination] = useState<PaginationProps>({
    current: 1,
    pageSize: 10,
    total: 0,
    showTotal: (all, range) => `${range[0]}-${range[1]} / ${all}`,
    showSizeChanger: true,
  });
  const previousParams = usePrevious(params);

  const fetchData = useEvent(async (silent = false) => {
    if (loading) return;
    if (!getExpressionResult(ctx, schema?.callable, true)) return;

    try {
      if (!silent) setLoading(true);
      const remoteSchema = normalizeSchema(schema as Schema, 'url') as SchemaActionRemote;
      const res = await api.action(
        'remote',
        {
          ...remoteSchema,
          params: {
            ...(remoteSchema?.params ?? {}),
            page: pagination.current || 1,
            limit: pagination.pageSize,
            ...params,
          },
        },
        ctx,
      );
      setList(res?.result?.list ?? []);
      setPagination({ ...pagination, total: res?.result?.total ?? 0 });
    } finally {
      if (!silent) setLoading(false);
    }
  });

  useEffect(() => {
    fetchData();
  }, [pagination.current, pagination.pageSize]);

  useEffect(() => {
    // stop fetch twice when do initialization
    if (isEqual(previousParams, params)) return;

    // when params changed, we need to reset page to 1
    if (pagination.current !== 1) {
      setPagination({ ...pagination, current: 1 });
    } else {
      fetchData();
    }
  }, [params]);

  return [loading, list, pagination, setPagination, fetchData];
}
