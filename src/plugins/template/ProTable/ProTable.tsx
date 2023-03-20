/* eslint-disable react-hooks/rules-of-hooks */
/*
 * @Author: Denis
 * @Date: 2023-03-17 19:54:20
 * @LastEditTime: 2023-03-17 20:20:42
 */
import type { ProColumns } from '@ant-design/pro-table';
import Table from '@ant-design/pro-table';
import { message, Space } from 'antd';
import { useMemoizedFn } from 'ahooks';
import { uniqueId } from 'lodash';
import React, { useMemo, useRef, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { InfoCircleTwoTone } from '@ant-design/icons';
import type { SnakeApi } from '../../../type';
import type { ParamsType, ProTableTypeReq } from './types';

const dateFormatter = (val: any) => {
  return val.format('YYYY-MM-DD GG:mm:ss');
};

const defaultColConfig = {
  xs: 24,
  sm: 24,
  md: 12,
  lg: 8,
  xl: 8,
  xxl: 6,
};

/**
 * Package ProTable
 * @param props same as ProTableProps，add rowKey automatically，default is id，can be cooperated with renderColumns
 * @returns
 */
export default function CustomProTable<
  R extends ParamsType,
  P extends ParamsType,
>(api: SnakeApi) {
  /* eslint-disable  no-unused-vars */
  api.registerRender(
    'custom-pro-table',
    ({ children, onClick, props = {} }, ctx) => {
      // console.log(children);
      // console.log(onClick);
      // console.log(ctx);
      const {
        pagination,
        request,
        search,
        columns,
        tableAlertRender,
        ...restProps
      } = props;
      /** generate id */
      const fcid = useMemo(() => `pro-table-${uniqueId()}`, []);
      const [t] = useTranslation();
      const ref = useRef<any>();

      const requestFn = useMemoizedFn<ProTableTypeReq<R, P>['request']>(
        (params, ...restArgs) => {
          const { current = 1, pageSize = 30 } = params;
          return request!?.({ ...params, pageSize, current }, ...restArgs);
        },
      );

      const showTotalConfig = (total: number, pageInfo: any) => {
        if (pageInfo) {
          return (
            <div>
              {t('tablePageTotal', {
                total,
                current: pageInfo.current,
                totalPage: Math.ceil(total / pageInfo.pageSize),
              })}
            </div>
          );
        }
        return null;
      };

      const pageConfig = React.useCallback(
        // eslint-disable-next-line @typescript-eslint/no-shadow
        (ref) => {
          if (pagination === false) {
            return false;
          }
          const { current } = ref || {};
          const { current: currentChild } = current || {};
          const { pageInfo } = currentChild || {};
          return {
            showQuickJumper: true,
            showSizeChanger: true,
            defaultCurrent: 1,
            pageSize: 10,
            size: 'default',
            locale: t('perPage'),
            pageSizeOptions: [50, 100, 500],
            showTotal: (total: number) => showTotalConfig(total, pageInfo),
            ...pagination,
          };
        },
        [pagination],
      );

      const searchConfig = useMemo<ProTableTypeReq<R, P>['search'] | undefined>(
        () =>
          search === false
            ? false
            : {
                className: 'ant-pro-table-search-config',
                collapseRender: () => null,
                showHiddenNum: true,
                labelWidth: 'auto',
                collapsed: false,
                span: defaultColConfig,
                ...search,
              },
        [search],
      );

      const tableAlertRenderConfig = useCallback(
        ({ selectedRowKeys }) => {
          if (tableAlertRender && typeof tableAlertRender === 'object') {
            return tableAlertRender;
          }
          return (
            <Space size={12}>
              <InfoCircleTwoTone />
              <span>selected {selectedRowKeys.length} item</span>
            </Space>
          );
        },
        [tableAlertRender],
      );

      useEffect(() => {
        if (restProps) {
          ref.current = restProps.actionRef;
        }
      }, []);

      return (
        <>
          <Table
            className={`pro-table-self ${fcid}`}
            tableClassName="ant-pro-table-config"
            rowKey="id"
            revalidateOnFocus={false}
            pagination={pageConfig(ref)}
            request={request && requestFn}
            search={searchConfig}
            columns={columns as ProColumns[]}
            options={false}
            dateFormatter={dateFormatter}
            onRequestError={(error) => {
              message.error(error.message || 'error');
              return { data: [], success: false, total: 0 };
            }}
            tableAlertRender={tableAlertRenderConfig}
            {...restProps}
          />
        </>
      );
    },
  );
}

// export default ProTable;
