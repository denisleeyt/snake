import React from 'react';
import Snake from '@bybit-fe/snake';

const schema = {
  "type": "select",
  "options": [
    { "value": "hello", "label": "Hello" },
    { "value": "world", "label": "World" },
    { "value": "this", "label": "this" },
    { "value": "is", "label": "is" },
    { "value": "snake", "label": "snake" }
  ],
  "props": {
    "defaultValue": "snake"
  }
};

const Basic = () => <Snake {...schema} />;

export default () => <Basic />;
