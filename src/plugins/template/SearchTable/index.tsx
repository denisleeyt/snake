import React, { useEffect, useState } from 'react';
import type { SnakeApi } from '../../../type';
import { SchemaForm } from '../Form';
import { SchemaTable } from '../Table';
import { SchemaDrawerForm } from '../DrawerForm';
import { SchemaModalForm } from '../ModalForm';
import { SearchTablePattern, RenderModes, SearchTableSchemas } from '../../constants';
import type { SchemaComponentType } from '../../type';
import { isEmpty, merge, resolveTemplate } from '../../utils';
import type { RemoteActionArgs } from './_utils';
import { normalizeSearchTableRemoteSchema, normalizeSearchTableSchema } from './_utils';

export const SchemaSearchTable: React.FC<SchemaComponentType> = ({
  api,
  ctx,
  params = {},
  search = {},
  table = {},
  form = {},
  pattern = SearchTablePattern.DRAWER,
  ...restProps
}) => {
  const [searchData, setSearchData] = useState(resolveTemplate(ctx, search?.initialValues || {}));

  // useMemo(() => {
  //
  // }, []);
  useEffect(() => {
    api.simplify('action', SearchTableSchemas.REMOTE_ACTION, (args: RemoteActionArgs) =>
      normalizeSearchTableRemoteSchema(pattern, args),
    );

    api.registerRender(SearchTableSchemas.ADD, (args, sCtx) => {
      return api.renderSchemas(sCtx, normalizeSearchTableSchema(args, pattern, RenderModes.ADD));
    });
    api.registerRender(SearchTableSchemas.VIEW, (args, sCtx) => {
      return api.renderSchemas(sCtx, normalizeSearchTableSchema(args, pattern, RenderModes.VIEW));
    });
    api.registerRender(SearchTableSchemas.EDIT, (args, sCtx) => {
      return api.renderSchemas(sCtx, normalizeSearchTableSchema(args, pattern, RenderModes.EDIT));
    });
    api.registerRender(SearchTableSchemas.DELETE, (args, sCtx) => {
      return api.renderSchemas(sCtx, normalizeSearchTableSchema(args, pattern, 'delete'));
    });
    api.registerRender(SearchTableSchemas.REFRESH, (args, sCtx) => {
      return api.renderSchemas(sCtx, normalizeSearchTableSchema(args, pattern, 'refresh'));
    });
    api.registerRender(SearchTableSchemas.CONFIRM, (args, sCtx) => {
      return api.renderSchemas(sCtx, normalizeSearchTableSchema(args, pattern, 'confirm'));
    });

    return () => {
      api.unregisterAction(SearchTableSchemas.REMOTE_ACTION);
      api.unregisterRender(SearchTableSchemas.ADD);
      api.unregisterRender(SearchTableSchemas.VIEW);
      api.unregisterRender(SearchTableSchemas.EDIT);
      api.unregisterRender(SearchTableSchemas.DELETE);
      api.unregisterRender(SearchTableSchemas.REFRESH);
      api.unregisterRender(SearchTableSchemas.CONFIRM);
    };
  }, []);

  return (
    <div data-schema-type="search-table" className="w-e">
      {!isEmpty(search) && (
        <SchemaForm
          api={api}
          ctx={ctx}
          mode={RenderModes.ADD}
          submit={
            search?.immediate
              ? null
              : {
                  type: 'text',
                  value: api.t('Search'),
                }
          }
          {...search}
          props={{
            layout: 'inline',
            ...(search?.props || {}),
          }}
          onSubmit={setSearchData}
        />
      )}
      <SchemaTable
        api={api}
        ctx={merge(ctx, { search: searchData })}
        params={{ ...params, ...searchData }}
        {...table}
      />
      {pattern === SearchTablePattern.MODAL ? (
        <SchemaModalForm
          api={api}
          ctx={merge(ctx, { search: searchData })}
          form={form}
          props={restProps?.modal || {}}
          {...(restProps ?? {})}
        />
      ) : (
        <SchemaDrawerForm
          api={api}
          ctx={merge(ctx, { search: searchData })}
          form={form}
          props={restProps?.drawer || {}}
          {...(restProps ?? {})}
        />
      )}
    </div>
  );
};

export default function SearchTableRenderPlugin(api: SnakeApi) {
  api.registerRender('search-table', (args, ctx) => {
    return <SchemaSearchTable api={api} ctx={ctx} {...args} />;
  });
}
