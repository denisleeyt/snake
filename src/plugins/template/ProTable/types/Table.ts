/*
 * @Author: Denis
 * @Date: 2022-11-19 19:54:20
 * @LastEditTime: 2022-11-20 19:33:27
 */
import type { ProColumns, ProTableProps } from '@ant-design/pro-table';
import type { RowClassName } from 'rc-table/lib/interface';
import { CustomColumnType, DateFormatter } from '../constants';

export type ProTableTypeReq<R extends ParamsType, P, V = 'text'> = Required<
  ProTableType<R, P, V>
>;

export type ParamsType = Record<string, any>;

export type Column<T> = Omit<ProColumns<T>, 'dataIndex'> & {
  dataIndex?: keyof T | 'options';
  /** search form position */
  searchSpan?: number;
} & {
  dateInfo?: {
    dateFormatter: DateFormatter;
    dateType: number;
    labelName: string;
    name: string;
  };
  enableSearch?: boolean;
} & TableRow;

export type ProTableType<R extends ParamsType, P, V = 'text'> = Omit<
  ProTableProps<R, P, V>,
  'columns'
> & {
  columns?: Column<R>[];
  /** use vh when vertical scroll great than specific height */
  yScroll?: ProTableTypeReq<R, P, V>['scroll']['y'];
  /** 在自己封装的rowClassName基础上在传过来的渲染className的函数 */
  rowClassNameExtra?: RowClassName<R>;
  pagination?: any;
  actionRef: any;
};

/**
 * @title the operation name
 * @key
 * @options e.g.  status['0','1']
 * @operationFunc e.g. handle the operation, turn on or turn off
 * @itemData entire row data
 */
export type CustomItemContent = {
  title: string;
  key: string;
  options: string[];
  operationFunc?: Function[];
  itemData?: Object[];
};

/**
 * extra table row
 */
export type TableRow = {
  CustomColumnType?: CustomColumnType;
  CustomItemContent?: CustomItemContent;
};
