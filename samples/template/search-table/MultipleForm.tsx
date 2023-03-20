/**
 * desc: ref [drawer-form](drawer-form#drawer-show)
 */

import React from 'react';
import Snake from '@denisli/snake';

const schema = {
  "type": "search-table",
  "table": {
    "remote": {
      "url": "/api/action/global-setting/country-setting/findAllPaged",
      "method": "post"
    },
    "columns": [
      {
        "key": "id",
        "title": "ID"
      },
      {
        "key": "countryId",
        "title": "Digital code"
      },
      {
        "key": "enName",
        "title": "English Name"
      },
      {
        "key": "cnName",
        "title": "Chinese Name"
      },
      {
        "key": "countryCode",
        "title": "Country code"
      },
      {
        "key": "operation",
        "title": "Action",
        "render": [
          "search-table-view",
          "search-table-edit",
          {
            "type": "search-table-delete",
            "remote": {
              "url": "/api/action/global-setting/country-setting/remove",
              "params": {
                "id": "${record.id}"
              },
              "method": "post"
            },
            "success": "Delete Successfully!"
          }
        ]
      }
    ],
    "header": {
      "toolbar": [
        {
          "type": "button",
          "children": {
            "type": "text",
            "value": "Open form2"
          },
          "props": {
            "type": "primary"
          },
          "action": {
            "type": "drawer-show",
            "schema": "form2",
            "form": {
              "mode": "add"
            }
          }
        },
        {
          "type": "search-table-add",
          "text": "Open default form"
        },
        "search-table-refresh"
      ]
    },
    "props": {
      "rowKey": "id"
    }
  },
  "form": {
    "remote": {
      "url": "/api/action/global-setting/country-setting/findOne",
      "method": "post",
      "params": {
        "id": "${record.id}"
      }
    },
    "fields": [
      {
        "name": "countryId",
        "label": "Digital Code:",
        "render": "input",
        "rules": [
          {
            "required": true,
            "message": "Please input"
          }
        ]
      },
      {
        "name": "cnName",
        "label": "Chinese Name:",
        "render": "input"
      }
    ],
    "props": {
      "layout": "vertical"
    },
    "header": {
      "title": {
        "type": "space",
        "children": [
          {
            "type": "condition",
            "express": "['add'].includes(ctx.mode)",
            "render": {
              "type": "text",
              "value": "Add"
            }
          },
          {
            "type": "condition",
            "express": "['edit'].includes(ctx.mode)",
            "render": {
              "type": "text",
              "value": "Edit"
            }
          }
        ]
      },
      "toolbar": {
        "type": "condition",
        "express": "['add', 'edit'].includes(ctx.mode)",
        "render": {
          "type": "button",
          "children": [
            {
              "type": "text",
              "value": "Confirm"
            }
          ],
          "props": {
            "type": "primary"
          },
          "action": [
            "drawer-validate-form",
            {
              "type": "switch",
              "express": "ctx.mode",
              "case": {
                "add": {
                  "type": "remote",
                  "url": "/api/action/global-setting/country-setting/add",
                  "method": "post",
                  "params": "${chain}"
                },
                "edit": {
                  "type": "remote",
                  "url": "/api/action/global-setting/country-setting/update",
                  "method": "post",
                  "params": [
                    "${chain}",
                    {
                      "id": "${record.id}"
                    }
                  ]
                }
              },
              "chained": true
            },
            "search-table-remote-action"
          ]
        }
      }
    }
  },
  "form2": {
    "remote": {
      "url": "/api/action/global-setting/country-setting/findOne",
      "method": "post",
      "params": {
        "id": "${record.id}"
      }
    },
    "fields": [
      {
        "name": "enName",
        "label": "English Name:",
        "render": "input"
      },
      {
        "name": "countryCode",
        "label": "Country code:",
        "render": "input"
      }
    ],
    "header": {
      "title": {
        "type": "text",
        "value": "form2 title"
      },
      "toolbar": {
        "type": "condition",
        "express": "['add', 'edit'].includes(ctx.mode)",
        "render": {
          "type": "button",
          "children": {
            "type": "text",
            "value": "form2 confirm"
          },
          "props": {
            "type": "primary"
          },
          "action": {
            "type": "message",
            "level": "info",
            "content": "form2 confirm click"
          }
        }
      }
    }
  }
};

const Basic = () => {
  return (
    <>
      <Snake {...schema} />
    </>
  );
};

export default () => <Basic />;
