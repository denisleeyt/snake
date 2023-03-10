import * as AntdIcons from '@ant-design/icons';
import { kebabCase } from 'lodash';
import ErrorTip from '../../_components/ErrorTip';
import type { SnakeApi } from '../../type';
import { isEmpty } from '../utils';

/**
 * Three type of icons: https://ant.design/components/icon-cn/
 *  - AccountBookOutlined
 *  - AccountBookFilled
 *  - AccountBookTwoTone
 */
const Icons = Object.entries(AntdIcons)
  .filter(([name]) => name.endsWith('Outlined') || name.endsWith('Filled') || name.endsWith('TwoTone'))
  .reduce((a, c) => {
    return ({
      ...a,
      [kebabCase(c[0].replace(/Outlined/g, ''))]: c[1],
    })
  }, {});

export default function IconRenderPlugin(api: SnakeApi) {
  api.registerRender('icon', ({ value, props }) => {
    if (isEmpty(value) || value === '') return null;

    const isUrl = value?.startsWith('http');
    if (isUrl) {
      return <img src={value} alt={value} style={{ width: 24, height: 24 }} {...props} />;
    }

    const IconComponent = Icons[value];
    if (IconComponent) {
      return <IconComponent {...props} />;
    }

    return <ErrorTip type={`Icon ${value}`} />;
  });
}
