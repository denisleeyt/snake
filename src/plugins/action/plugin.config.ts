const remoteConfig = [
  {
    name: 'url',
    label: 'url',
    render: 'textarea',
  },
  {
    name: 'method',
    label: 'method',
    render: {
      type: 'select',
      options: [
        { label: 'get', value: 'get' },
        { label: 'post', value: 'post' },
      ],
      props: {
        allowClear: false,
      },
    },
  },
  {
    name: 'response',
    label: 'response',
    render: 'textarea',
  },
];

export default {
  remote: remoteConfig,
};
