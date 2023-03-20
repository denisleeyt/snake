import React, { useState } from 'react';
import { Space } from 'antd';
import Snake from '@denisli/snake';

const RenderModes = Snake.RenderModes;
Snake.setCtx('mode', RenderModes.ADD);

const schema = {
  "type": "form",
  "initialValues": {
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
      "disabled": "ctx.form.switch"
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

const DisabledDemo = () => {
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

export default () => <DisabledDemo />;
