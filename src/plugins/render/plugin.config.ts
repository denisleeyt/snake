const iconConfig = {
  type: 'select',
  options: [
    'check-circle',
    'delete',
    'edit',
    'plus',
    'read',
    'reload',
    'search',
    'stop',
    'upload',
    'vertical-align-bottom',
    'vertical-align-top',
    'form',
    'build',
    'fund-view',
  ].map((name) => ({
    label: {
      type: 'space',
      children: [
        { type: 'icon', value: name },
        { type: 'text', value: name },
      ],
    },
    value: name,
  })),
  props: {
    allowClear: false,
    filterOption: 'option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0',
  },
};

export default {
  icon: iconConfig,
};
