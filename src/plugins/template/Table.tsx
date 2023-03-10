import React, { useEffect } from 'react';
import { Table } from 'antd';
import type { SnakeApi } from '../../type';
import type { SchemaColumn } from '../../schema';
import { useCompareMemo, useSearch } from '../hooks';
import { EMPTY_ARRAY, RenderModes, TableActions } from '../constants';
import { isFunction, isEmpty, normalizeColumn, isObject, merge } from '../utils';
import type { SchemaComponentType } from '../type';

export const SchemaTable: React.FC<SchemaComponentType> = ({
  api,
  ctx,
  remote,
  params = {},
  columns = EMPTY_ARRAY,
  header = {},
  props = {},
}) => {
  const [loading, list, pagination, setPagination, reload] = useSearch(api, ctx, remote, params);
  // update ctx data
  const finalCtx = merge(
    ctx ?? {},
    {
      data: list,
      search: { page: pagination.current, limit: pagination.pageSize },
    },
  );

  // register actions
  // useMemo(() => {
  // }, []);
  useEffect(() => {
    api.registerAction(TableActions.REFRESH, () => {
      return reload?.();
    });

    return () => {
      api.unregisterAction(TableActions.REFRESH);
    };
  }, [reload]);

  const finalColumns = useCompareMemo(() => {
    return columns.map(normalizeColumn).map((column: SchemaColumn) => {
      const { title, render, ...restColumn } = column;
      if (isEmpty(render) || isFunction(render))
        return {
          title: api.t(title),
          render,
          ...restColumn,
        };

      return {
        title: api.t(title),
        ...restColumn,
        render: (text: any, record: Record<string, any>) =>
          api.renderSchemas(
            { ...finalCtx, record },
            isObject(render) ? { mode: RenderModes.VIEW, ...render } : render,
            text,
          ),
      };
    });
  }, [finalCtx, columns]);

  // console.debug('[snake][table]:', finalColumns, list, pagination);
  return (
    <div data-schema-type="table" className="w-e">
      <Table
        {...props}
        loading={loading}
        columns={finalColumns}
        dataSource={list}
        pagination={pagination}
        onChange={(p) => setPagination({ ...pagination, ...p })}
        title={() => {
          if (isEmpty(header)) return null;
          return (
            <>
              <div className="table-header-title">{api.renderSchemas(finalCtx, header?.title)}</div>
              <div className="table-header-toolbar">
                {api.renderSchemas(finalCtx, header?.toolbar)}
              </div>
            </>
          );
        }}
      />
    </div>
  );
};

export default function TableRenderPlugin(api: SnakeApi) {
  api.registerRender('table', (args, ctx) => {
    return <SchemaTable api={api} ctx={ctx} {...args} />;
  });
}
