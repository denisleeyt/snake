import type { FormItemProps, TableColumnProps } from 'antd';

type BaseSchema = {
  type?: string;
  [key: string]: any;
};

export type SchemaRenderModes = 'add' | 'edit' | 'view';
export type SchemaRender = BaseSchema & {
  mode?: SchemaRenderModes;
  value?: any;
  onChange?: (value: any) => void;
  props?: Record<string, any>;
  remote?: SchemaActionRemote;
};

export type SchemaFieldDependency = {
  relates: string[];
};
export type SchemaField = FormItemProps & {
  name: string;
  render: SchemaRender;
  dependency?: SchemaFieldDependency;
  visible?: boolean;
  disabled?: boolean;
};
export type SchemaColumn = TableColumnProps & {
  render: SchemaRender;
};

type SchemaActionRemoteResponse = BaseSchema & {
  code: number;
  msg: string;
  result: any;
};
type SchemaActionRemote = {
  url: string;
  method?: string;
  params?: any;
  response?: string;
  callable?: string;
  // next?: Record<string, any>;
};
type SchemaActionCondition = {
  express: string;
  action?: SchemaAction;
  chained?: boolean;
};
type SchemaActionSwitch = {
  express: string;
  case: Record<string, SchemaAction>;
  chained?: boolean;
};
export type SchemaAction = BaseSchema & SchemaActionRemote & SchemaActionCondition & SchemaActionSwitch;

export type Schema = string | SchemaRender | SchemaAction;
export type SchemaOptionType = {
  label: string;
  value: string;
};
