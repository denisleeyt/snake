const FormConfig = {
  type: 'form',
  properties: [],
  component: [
    {
      name: 'layout',
      label: 'layout',
      render: {
        type: 'select',
        options: ['horizontal', 'vertical', 'inline'].map((n) => ({ value: n, label: n })),
        props: {
          defaultValue: 'horizontal',
        },
      },
    },
    {
      name: 'colon',
      label: 'colon',
      render: 'switch',
    },
    {
      name: 'labelAlign',
      label: 'labelAlign',
      render: {
        type: 'select',
        options: ['left', 'right'].map((n) => ({ value: n, label: n })),
        props: {
          defaultValue: 'right',
        },
      },
    },
  ],
  fields: {
    keyName: 'name',
    labelName: 'label',
    render: [
      'input',
      'select',
      'switch',
      'textarea',
      'input-number',
      'date-picker',
      'range-picker',
      'checkbox-group',
      'radio-group',
      'multiple-row-editor',
    ],
    rules: true,
  },
};

export default FormConfig;
