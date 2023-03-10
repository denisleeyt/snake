import React, { useEffect, useRef, useState } from 'react';
import type { SelectProps } from 'antd';
import { Select, Spin } from 'antd';
import { debounce } from 'lodash';
import request from 'umi-request';
import { EMPTY_ARRAY, RenderModes } from '../constants';
import type { SnakeApi } from '../../type';
import type { SchemaOptionType } from '../../schema';
import OptionView from '../_components/OptionView';
import { isArray } from '../utils';

const { Option } = Select;

export type SelectSearchProps = SelectProps<any> & {
  searchOptions: Record<string, any>;
  selectProps: Record<string, any>;
};

type InnerSelectSearchDataType = {
  fetching: boolean;
  options: SchemaOptionType[];
};

const SelectSearch: React.FC<SelectSearchProps> = ({
  value,
  onChange,
  searchOptions,
  selectProps,
}) => {
  const fetchIdRef = useRef(0);
  const [data, setData] = useState<InnerSelectSearchDataType>({
    options: [],
    fetching: false,
  });

  const fetchData = debounce(() => {
    fetchIdRef.current += 1;
    const fetchId = fetchIdRef.current;
    setData({ options: [], fetching: true });

    const { method, url, params, identifier } = searchOptions;
    request?.[method]?.(url, {
      params: {
        page: 1,
        page_size: 10,
        ...params,
        [identifier]: value,
      },
    })
      .then((res: { list: any }) => {
        if (fetchId !== fetchIdRef.current) {
          // for fetch callback order
          return;
        }
        const finalOptions = (res?.list ?? []).map((item: { name: any; id: any }) => ({
          label: item.name,
          value: item.id,
        }));
        setData({ options: finalOptions, fetching: false });
      })
      .catch((err: any) => {
        console.error('Fetching data failed: ', err);
        setData({ ...data, fetching: false });
      });
  });

  useEffect(() => {
    if (searchOptions?.init) {
      fetchData();
    }
  }, []);

  return (
    <Select
      value={value}
      allowClear
      notFoundContent={data?.fetching ? <Spin size="small" /> : null}
      filterOption={false}
      onSearch={fetchData}
      onChange={(val, opt) => {
        onChange?.(val, opt);
        setData({ ...data, fetching: false });
      }}
      {...selectProps}
    >
      {isArray(data?.options)
        ? data?.options?.map((item) => (
            <Option key={item?.value?.toString()} value={item?.value}>
              {item?.label}
            </Option>
          ))
        : null}
    </Select>
  );
};

export default function SelectSearchRenderPlugin(api: SnakeApi) {
  api.registerRender(
    'select-search',
    ({
      mode = RenderModes.ADD,
      value,
      onChange,
      options = EMPTY_ARRAY,
      searchOptions = {},
      props = {},
    }) => {
      if (mode === RenderModes.VIEW) {
        return <OptionView api={api} value={value} options={options} />;
      }

      return (
        <SelectSearch
          value={value}
          onChange={onChange}
          searchOptions={searchOptions}
          selectProps={props}
        />
      );
    },
  );
}
