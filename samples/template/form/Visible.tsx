/**
 * desc: visible 属性，支持级联配置。
 */

import React, { useState } from 'react';
import { Space } from 'antd';
import Snake from '@bybit-fe/snake';

const RenderModes = Snake.RenderModes;
Snake.setCtx('mode', RenderModes.ADD);

const schema = {
  "type": "form",
  "initialValues": {
    "switch": true,
    "select": "world"
  },
  "fields": [
    {
      "name": "switch",
      "label": "switch",
      "render": "switch"
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
      },
      "dependency": {
        "relates": [
          "switch"
        ]
      },
      "visible": "ctx.form.switch === true"
    }
  ],
  "props": {
    "labelCol": {
      "span": 8
    },
    "wrapperCol": {
      "span": 8
    }
  }
};

const VisibleDemo = () => {
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

export default () => <VisibleDemo />;
