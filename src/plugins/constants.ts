/**
 * assign default value when referred param used as hook dependency,
 * thus can reduce rerun of hook
 */
export const EMPTY_ARRAY: never[] = [];

export const RenderModes = {
  ADD: 'add',
  EDIT: 'edit',
  VIEW: 'view',
};

export const TableActions = {
  REFRESH: 'table-refresh',
};

export const SearchTablePattern = {
  DRAWER: 'drawer',
  MODAL: 'modal',
};
export const DrawerActions = {
  SHOW: 'drawer-show',
  UPDATE: 'drawer-update',
  HIDE: 'drawer-hide',
  VALIDATE_FORM: 'drawer-validate-form',
  DISABLE_TOOLBAR_PRIMARY_BUTTON: 'drawer-disable-toolbar-primary-button',
  ENABLE_TOOLBAR_PRIMARY_BUTTON: 'drawer-enable-toolbar-primary-button',
};
export const ModalActions = {
  SHOW: 'modal-show',
  HIDE: 'modal-hide',
  VALIDATE_FORM: 'modal-validate-form',
};

export const SearchTableSchemas = {
  ADD: 'search-table-add',
  EDIT: 'search-table-edit',
  VIEW: 'search-table-view',
  DELETE: 'search-table-delete',
  REFRESH: 'search-table-refresh',
  CONFIRM: 'search-table-confirm',
  REMOTE_ACTION: 'search-table-remote-action',
};

export const TEMPLATE_REGEXP = new RegExp(/^\$\{([\s\S]+?)\}$/);
export const TEMPLATE_REGEXP_GLOBAL = new RegExp(/\$\{([\s\S]+?)\}/g);
