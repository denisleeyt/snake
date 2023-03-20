/**
 * desc: when `disabled` equal `true` means cannot edit
 */

import React, { useState } from 'react';
import { Space } from 'antd';
import Snake from '@denisli/snake';

const schema = {
  "type": "select",
  "options": [
    {
      "value": "hello",
      "label": "Hello"
    },
    {
      "value": "world",
      "label": "World"
    },
    {
      "value": "this",
      "label": "this"
    },
    {
      "value": "is",
      "label": "is"
    },
    {
      "value": "snake",
      "label": "snake"
    }
  ],
  "value": "snake"
};

const Basic = () => {
  const [disabled, setDisabled] = useState(false);
  return (
    <>
      <Space style={{ marginBottom: 16 }}>
        disabled:
        <Snake type="switch" value={disabled} onChange={setDisabled} />
      </Space>
      <Snake {...schema} disabled={disabled} />
    </>
  );
};

export default () => <Basic />;
