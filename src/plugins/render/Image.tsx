import { Image } from 'antd';
import { SnakeApi } from '../../type';

export default function ImageRenderPlugin(api: SnakeApi) {
    api.registerRender('image', ({value, props}) => {
        return  <Image {...props} src={value} alt={value} />
    })
}
