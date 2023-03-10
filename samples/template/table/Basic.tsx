import React from 'react';
import Snake from '@bybit-fe/snake';

const schema ={
  "type": "table",
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
      "title": "数字代码"
    },
    {
      "key": "enName",
      "title": "英文名称"
    },
    {
      "key": "cnName",
      "title": "中文名称"
    },
    {
      "key": "countryCode",
      "title": "国家代码"
    }
  ],
  "header": {
    "toolbar": {
      "type": "button",
      "children": {
        "type": "text",
        "value": "Refresh Table"
      },
      "props": {
        "type": "primary"
      },
      "action": "table-refresh"
    }
  },
  "props": {
    "rowKey": "id"
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
