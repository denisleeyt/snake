import React from 'react';
import Snake from '@bybit-fe/snake';

const schema = {
  "type": "table",
  "remote": {
    "url": "/api/showcase/table"
  },
  "columns": [
    {
      "key": "order",
      "title": "Order"
    },
    {
      "key": "tokenName",
      "title": "Token Name"
    },
    {
      "key": "iconUrl",
      "title": "Icon",
      "render": "icon"
    },
    {
      "key": "select",
      "title": "Select",
      "render": {
        "mode": "view",
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
      "key": "select-remote",
      "title": "Select Remote",
      "render": {
        "mode": "view",
        "type": "select",
        "remote": {
          "url": "/api/showcase/select-options"
        }
      }
    }
  ],
  "props": {
    "rowKey": "tokenId"
  }
};

const RemoteColumn = () => {
  return (
    <>
      <Snake {...schema} />
    </>
  );
};

export default () => <RemoteColumn />;
