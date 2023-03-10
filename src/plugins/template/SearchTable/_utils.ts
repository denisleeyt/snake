import { SchemaRender } from '../../../schema';
import { RenderModes, SearchTableSchemas } from '../../constants';

const DefaultActionIcon = {
  [RenderModes.VIEW]: 'read',
  [RenderModes.ADD]: 'plus',
  [RenderModes.EDIT]: 'edit',
  'delete': 'delete',
  'refresh': 'reload',
};
const DefaultActionText = {
  [RenderModes.VIEW]: 'Detail',
  [RenderModes.ADD]: 'Add',
  [RenderModes.EDIT]: 'Edit',
  'delete': 'Delete',
  'refresh': 'Refresh',
  'confirm': 'Confirm?',
};

/**
 * Simplify or normalize schema for operations.
 * @param icon
 * @param text
 * @param tooltip
 * @param props
 * @param confirm
 * @param remote
 * @param success
 * @param pattern
 * @param action
 */
export function normalizeSearchTableSchema(
  {
    icon,
    text,
    tooltip,
    props = {},
    // for delete with confirm
    confirm,
    remote,
    success,
  }: SchemaRender,
  pattern: string,
  action: string,
) {
  let actionSchema = {};
  switch (action) {
    case RenderModes.ADD:
    case RenderModes.VIEW:
    case RenderModes.EDIT: {
      actionSchema = {
        'type': `${pattern}-show`,
        'form': {
          'mode': action,
        }
      };
      break;
    }
    case 'delete':
    case 'confirm': {
      actionSchema = [
        {
          'type': 'remote',
          ...(remote ?? {}),
        },
        {
          'type': SearchTableSchemas.REMOTE_ACTION,
          'success': success,
        },
      ];
      break;
    }
    case 'refresh': {
      actionSchema = 'table-refresh';
      break;
    }
    default: {
    }
  }

  const buttonText = ([RenderModes.ADD].includes(action) || text) ? {
    'type': 'text',
    'value': text ?? DefaultActionText[action],
  } : [];
  const buttonSchema = {
    'type': 'button',
    'children': [
      {
        'type': 'icon',
        'value': icon ?? DefaultActionIcon[action],
      }
    ].concat(buttonText),
    'props': {
      'type': [RenderModes.ADD].includes(action) ? 'primary' : 'link',
      ...(['delete'].includes(action) ? { 'danger': true } : {}),
      ...props,
    },
  };

  if ([RenderModes.ADD].includes(action)) return { ...buttonSchema, action: actionSchema };

  if (['delete', 'confirm'].includes(action)) {
    return {
      'type': 'tooltip',
      'children': {
        'type': 'popconfirm',
        'title': confirm ?? 'Confirm to Delete?',
        'confirm': actionSchema,
        'children': buttonSchema,
        'props': {
          'zIndex': 1080,
        },
      },
      'props': {
        'title': tooltip ?? DefaultActionText[action]
      }
    };
  }

  return {
    'type': 'tooltip',
    'children': { ...buttonSchema, action: actionSchema },
    'props': {
      'title': tooltip ?? DefaultActionText[action]
    }
  };
}

/**
 * Normalize remote action schemas.
 * @param pattern
 * @param success
 */
export type RemoteActionArgs = { success?: string };
export function normalizeSearchTableRemoteSchema(pattern: string, { success }: RemoteActionArgs) {
  return {
    'type': 'switch',
    'express': 'ctx.chain.code',
    'case': {
      '200': [
        {
          'type': 'message',
          'level': 'success',
          'content': success ?? 'Successfully!'
        },
        `${pattern}-hide`,
        'table-refresh'
      ],
      'default': {
        'type': 'message',
        'level': 'error',
        'content': [
          {
            'type': 'text',
            'value': 'Error: '
          },
          {
            'type': 'template-string',
            'value': '${chain.msg}'
          }
        ]
      }
    }
  };
}
