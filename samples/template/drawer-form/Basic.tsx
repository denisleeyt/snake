import React from 'react';
import Snake from '@denisli/snake';

const schema = {
  "type": "space",
  "children": [
    {
      "type": "button",
      "children": {
        "type": "text",
        "value": "Show drawer-form"
      },
      "props": {
        "type": "primary"
      },
      "action": {
        "type": "drawer-show",
        "form": {
          "mode": "edit"
        }
      }
    },
    {
      "type": "drawer-form",
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
            "name": "enName",
            "label": "English Name:",
            "render": "input"
          },
          {
            "name": "cnName",
            "label": "Chinese Name:",
            "render": "input"
          },
          {
            "name": "countryCode",
            "label": "≈:",
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
              "withLoading": true,
              "props": {
                "type": "primary"
              },
              "action": [
                // 'drawer-disable-toolbar-primary-button',
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
                // 'drawer-enable-toolbar-primary-button',
                "search-table-remote-action"
              ]
            }
          }
        }
      }
    }
  ]
};

const Basic = () => {
  return (
    <>
      <Snake {...schema} />
    </>
  );
};

export default () => <Basic />;
