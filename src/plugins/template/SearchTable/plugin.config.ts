import { pick } from 'lodash';
import actionConfig from '../../action/plugin.config';
import renderConfig from '../../render/plugin.config';

import formConfig from '../Form/plugin.config';

const NORMAL_ACTION_TYPE = 'tooltip';
const SearchTableConfig = {
  type: 'search-table',
  properties: [],
  children: [
    {
      key: 'search',
      type: 'form',
      properties: [
        {
          name: 'immediate',
          label: 'immediate',
          render: 'switch',
          tooltip: 'Hide search button and search immediately when fields change',
        },
      ],
      component: formConfig.component,
      fields: {
        ...pick(formConfig.fields, ['keyName', 'labelName']),
        render: formConfig.fields.render.filter(
          (n) => !['checkbox-group', 'radio-group', 'multiple-row-editor'].includes(n),
        ),
      },
    },
    {
      key: 'table',
      type: 'table',
      remote: actionConfig.remote,
      columns: {
        keyName: 'key',
        labelName: 'title',
        render: ['text', 'format-time', 'image'],
      },
      operation: [
        {
          name: 'type',
          label: 'type',
          render: {
            type: 'select',
            options: [
              'search-table-confirm',
              // 'search-table-add',
              'search-table-view',
              'search-table-edit',
              'search-table-delete',
              // 'search-table-refresh',
              // 'search-table-remote-action',
              NORMAL_ACTION_TYPE,
            ].map((t) => ({ value: t, label: t })),
            props: {
              allowClear: false,
            },
          },
        },
        {
          name: 'icon',
          label: 'icon',
          render: renderConfig.icon,
        },
        {
          name: 'tooltip',
          label: 'tooltip',
          render: 'input',
        },
        {
          name: 'text',
          label: 'text',
          render: 'input',
        },
      ],
      toolbar: [
        {
          name: 'type',
          label: 'type',
          render: {
            type: 'select',
            options: [
              NORMAL_ACTION_TYPE,
              'search-table-add',
              // 'search-table-view',
              // 'search-table-edit',
              // 'search-table-delete',
              'search-table-refresh',
              // 'search-table-confirm',
              // 'search-table-remote-action',
            ].map((t) => ({ value: t, label: t })),
            props: {
              allowClear: false,
            },
          },
        },
        {
          name: 'icon',
          label: 'icon',
          render: renderConfig.icon,
        },
        {
          name: 'tooltip',
          label: 'tooltip',
          render: 'input',
          dependency: {
            relates: ['type'],
          },
          visible: 'ctx.form["type"] !== "search-table-add"',
        },
        {
          name: 'text',
          label: 'text',
          render: 'input',
        },
      ],
    },
    {
      type: 'drawer-form',
      remote: actionConfig.remote,
      fields: formConfig.fields,
      // children: [
      //   {
      //     key: 'form',
      //     type: 'form',
      //     fields: {
      //       keyName: 'name',
      //       labelName: 'label',
      //       render: ['input', 'select', 'switch'],
      //     },
      //   }
      // ],
      properties: [
        {
          name: 'withLoading',
          label: 'withLoading',
          render: 'switch',
          tooltip: 'Show loading when fetch remote data',
        },
        {
          name: 'mode',
          label: 'mode',
          render: {
            type: 'select',
            options: ['add', 'edit', 'view'].map((n) => ({ value: n, label: n })),
            props: {
              defaultValue: 'add',
            },
          },
        },
      ],
      component: formConfig.component,
    },
  ],
};

export default SearchTableConfig;
