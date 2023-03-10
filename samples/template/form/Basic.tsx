/**
 * desc: 表单有三种模式：`add` | `edit` | `view`，分别对应 CRUD 中的新增、编辑和详情的场景。
 */

import React, { useState } from 'react';
import { Space } from 'antd';
import Snake from '@bybit-fe/snake';

const RenderModes = Snake.RenderModes;
Snake.setCtx('mode', RenderModes.ADD);

const schema = {
  "type": "form",
  "initialValues": {
    "select": "world",
    "radio-group": "hello"
  },
  "remote": {
    "url": "/api/showcase/form",
    "method": "get"
  },
  "fields": [
    {
      "name": "input",
      "label": "input",
      "render": "input",
      "rules": [
        {
          "required": true,
          "message": "请输入名称Code"
        },
        {
          "pattern": "/^(?!\\s)(?!.*\\s$)[\\w_\\.\\s]{1,}$/g",
          "message": "前后有空格"
        }
      ]
    },
    {
      "name": "input-number",
      "label": "input-number",
      "render": "input-number"
    },
    {
      "name": "select",
      "label": "select",
      "render": {
        "type": "select",
        "options": [
          {
            "value": "hello",
            "label": "Hello"
          },
          {
            "value": "world",
            "label": "World"
          }
        ]
      }
    },
    {
      "name": "select-remote-options",
      "label": "select-remote-options",
      "render": {
        "type": "select",
        "remote": {
          "url": "/api/showcase/select-options",
          "params": {
            "id": "${form.select}"
          }
        }
      },
      "dependency": {
        "relates": [
          "select"
        ]
      }
    },
    {
      "name": "radio-group",
      "label": "radio-group",
      "render": {
        "type": "radio-group",
        "options": [
          {
            "value": "hello",
            "label": "Hello"
          },
          {
            "value": "world",
            "label": "World"
          }
        ]
      },
      "visible": "ctx.form[\"select-remote-options\"] === \"option2\"",
      "dependency": {
        "relates": [
          "select-remote-options"
        ]
      }
    },
    {
      "name": "switch",
      "label": "switch",
      "render": "switch"
    },
    {
      "name": "checkbox-group",
      "label": "checkbox-group",
      "render": {
        "type": "checkbox-group",
        "options": [
          {
            "label": "男",
            "value": "male"
          },
          {
            "label": "女",
            "value": "female"
          }
        ]
      }
    },
    {
      "name": "radio-group",
      "label": "radio-group",
      "render": {
        "type": "radio-group",
        "options": [
          {
            "label": "男",
            "value": "male"
          },
          {
            "label": "女",
            "value": "female"
          }
        ]
      }
    },
    {
      "name": "upload",
      "label": "upload",
      "render": {
        "type": "upload",
        "props": {
          "name": "file",
          "action": "/api/showcase/upload"
        },
        "children": [
          {
            "type": "button",
            "children": [
              {
                "type": "icon",
                "value": "upload"
              },
              {
                "type": "text",
                "value": "upload"
              }
            ]
          }
        ]
      }
    },
    {
      "name": "date",
      "label": "date",
      "render": {
        "type": "date-picker",
        "props": {
          "picker": "year",
          "format": "YYYY"
        }
      }
    },
    {
      "name": "date-range",
      "label": "date-range",
      "render": {
        "type": "range-picker"
      }
    },
    {
      "name": "multiple-row-editor",
      "label": "multiple-row-editor",
      "render": {
        "type": "multiple-row-editor",
        "fields": [
          {
            "name": "value",
            "render": "input"
          },
          {
            "name": "label",
            "render": "input"
          }
        ]
      }
    }
  ],
  "props": {
    "labelCol": {
      "span": 8
    },
    "wrapperCol": {
      "span": 8
    }
  },
  "submit": {
    "type": "text",
    "value": "Submit",
    "action": [
      {
        "type": "remote",
        "url": "/api/showcase/form/submit",
        "method": "post",
        "params": "${form}"
      },
      {
        "type": "message",
        "level": "success",
        "content": "Submit Success"
      },
      "back"
    ]
  }
};

const Basic = () => {
  const [mode, setMode] = useState(Snake.getCtx('mode'));
  return (
    <>
      <Space>
        Mode:
        <Snake
          type="radio-group"
          options={Object.values(RenderModes).map((m) => ({ label: m, value: m }))}
          props={{
            optionType: 'button',
            buttonStyle: 'solid',
          }}
          value={mode}
          onChange={setMode}
        />
      </Space>
      <Snake {...schema} mode={mode} />
    </>
  );
};

export default () => <Basic />;
