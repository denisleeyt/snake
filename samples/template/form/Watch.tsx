/**
 * desc: watch support inheritance
 */

import React from 'react';
import Snake from '@denisli/snake';

const schema = {
  "type": "form",
  "initialValues": {
    "price": 4,
    "number": 6
  },
  "fields": [
    {
      "name": "price",
      "label": "输入单价:",
      "render": "input-number"
    },
    {
      "name": "number",
      "label": "输入数量:",
      "render": "input-number"
    },
    {
      "name": "totalPrice",
      "label": "总金额:",
      "render": {
        "type": "express-string",
        "value": "ctx.form.price * ctx.form.number"
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
  }
};

const WatchDemo = () => {
  return <Snake {...schema} />;
};

export default () => <WatchDemo />;
