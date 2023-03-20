/**
 * desc: edit, view detail and fetching data will show loading status
 */

import React, { useState } from 'react';
import { Space } from 'antd';
import Snake from '@denisli/snake';

const RenderModes = Snake.RenderModes;
Snake.setCtx('mode', RenderModes.ADD);

const schema = {
  "type": "form",
  "initialValues": {
    "input": "initial input",
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
      "render": "input"
    },
    {
      "name": "select-remote-options",
      "label": "select-remote-options",
      "render": {
        "type": "select",
        "remote": {
          "url": "/api/showcase/select-options"
        }
      }
    }
  ],
  "withLoading": true,
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

const Loading = () => {
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

export default () => <Loading />;
