import React from 'react';
import Snake from '@denisli/snake';

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
      "title": "Digital Code"
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
