import React from 'react';
import { castArray, isNil } from 'lodash';
import { Tag } from 'antd';
import { SnakeApi } from '../../type';
import type { SchemaOptionType } from '../../schema';
import { isEmpty } from '../utils';

export type OptionViewProps = {
  value: any;
  options: SchemaOptionType[];
  api: SnakeApi;
};

// @ts-ignore
const OptionView: React.FC<OptionViewProps> = ({ value, options, api }) => {
  if (isNil(value)) return null;

  const valueArray = castArray(value);
  const selectedOptions = options.filter((item) => valueArray.includes(item.value));
  const labelArray = isEmpty(selectedOptions)
    ? valueArray
    : selectedOptions.map((item) => (isEmpty(item.label) ? item.value : api.t(item.label)));
  return (
    <>
      {labelArray.map((l) => (
        <Tag key={l}>{l}</Tag>
      ))}
    </>
  );
};

export default OptionView;
