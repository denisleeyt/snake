import React from 'react';
import { Button, Col, Popconfirm, Row } from 'antd';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import type { SnakeApi } from '../../../type';
import type { Schema } from '../../../schema';
import type { SchemaComponentType } from '../../type';
import { EMPTY_ARRAY, RenderModes } from '../../constants';
import { useCompareMemo, useEvent } from '../../hooks';
import { normalizeSchema, getNativeValue, isEmpty } from '../../utils';

import './index.less';

export type FieldType = {
  name: string;
  label?: string;
  render?: Schema;
  defaultValue?: any;
};

const SchemaMultipleRowEditor: React.FC<SchemaComponentType> = ({
  api,
  ctx,
  mode = RenderModes.ADD,
  fields = EMPTY_ARRAY,
  value = [],
  onChange,
  showTitle = true,
}) => {
  const handleChange = useEvent((idx: number, key: string, val: any) => {
    const finalValue = value?.map((item: any, vIdx: number) => {
      if (idx === vIdx) return { ...item, [key]: getNativeValue(val) };
      return item;
    });
    onChange?.(finalValue);
  });

  const handleDelete = useEvent((idx: number) => {
    const finalValue = [...value];
    finalValue.splice(idx, 1);
    onChange?.(finalValue);
  });
  const handleAdd = useEvent(() => {
    const newDataItem = fields.reduce(
      (a: object, c: FieldType) => ({ ...a, [c.name]: c.defaultValue || '' }),
      {},
    );
    onChange?.(value.concat(newDataItem));
  });

  const span = useCompareMemo(() => {
    return fields.length > 0 ? Math.floor(24 / fields.length) : 24;
  }, [fields]);

  const addElement = useCompareMemo(() => {
    if (
      value.some((item: any) => isEmpty(item) || Object.values(item).every((val) => isEmpty(val)))
    ) {
      return null;
    }

    return (
      <Button type="dashed" block icon={<PlusOutlined />} onClick={handleAdd}>
        Add
      </Button>
    );
  }, [handleAdd, value]);

  return (
    <div className="snake-multiple-row-editor">
      {showTitle && (
        <Row gutter={6} className="snake-multiple-row-editor-head">
          {fields.map((field: FieldType) => (
            <Col key={field.name} span={span}>
              {field.label || field.name}
            </Col>
          ))}
        </Row>
      )}
      {value?.map((item: object, idx: number) => (
        <Row key={idx} gutter={6} className="snake-multiple-row-editor-content">
          {fields.map((field: FieldType) => {
            // @ts-ignore
            const { type: renderType, ...restRender } = normalizeSchema(
              (field.render as Schema) || 'input',
            );
            const renderElement = api.render(
              renderType,
              {
                mode,
                value: item[field.name],
                onChange: (val: any) => handleChange(idx, field.name, val),
                ...restRender,
              },
              { ...ctx },
            );
            return (
              <Col key={field.name} span={span}>
                {renderElement}
              </Col>
            );
          })}

          <Popconfirm title="Confirm delete this?" onConfirm={() => handleDelete(idx)}>
            <DeleteOutlined />
          </Popconfirm>
        </Row>
      ))}

      {addElement}
    </div>
  );
};

export default function MultipleRowEditorRenderPlugin(api: SnakeApi) {
  api.registerRender('multiple-row-editor', (args, ctx) => {
    return <SchemaMultipleRowEditor api={api} ctx={ctx} {...args} />;
  });
}
