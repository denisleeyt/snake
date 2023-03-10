/**
 * desc: 远程获取下拉选项数据
 */
import React, { useState } from 'react';
import Snake from '@bybit-fe/snake';

const Remote = () => {
  const [value, setValue] = useState();
  const schema = {
    "type": "select",
    "remote": {
      "url": "/api/showcase/select-options",
      "params": {
        "id": "hello"
      }
    },
    "props": {
      "style": {
        "width": "200px"
      },
      "allowClear": false
    },
    "value": value,
    "onChange": setValue
  };

  return <Snake {...schema} />;
};

export default () => <Remote />;
