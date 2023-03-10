import { Input, Typography, Row } from 'antd';
import { RenderModes } from '../constants';
import type { SnakeApi } from '../../type';

/**
 * available themes
 * 'a11yDark', 'a11yLight', 'agate', 'anOldHope', 'androidstudio',
 * 'arduinoLight', 'arta', 'ascetic', 'atelierCaveDark', 'atelierCaveLight',
 * 'atelierDuneDark', 'atelierDuneLight', 'atelierEstuaryDark', 'atelierEstuaryLight',
 * 'atelierForestDark', 'atelierForestLight', 'atelierHeathDark', 'atelierHeathLight',
 * 'atelierLakesideDark', 'atelierLakesideLight', 'atelierPlateauDark', 'atelierPlateauLight',
 * 'atelierSavannaDark', 'atelierSavannaLight', 'atelierSeasideDark', 'atelierSeasideLight',
 * 'atelierSulphurpoolDark', 'atelierSulphurpoolLight', 'atomOneDarkReasonable',
 * 'atomOneDark', 'atomOneLight', 'brownPaper', 'codepenEmbed', 'colorBrewer',
 * 'darcula', 'dark', 'defaultStyle', 'docco', 'dracula', 'far', 'foundation',
 * 'githubGist', 'github', 'gml', 'googlecode', 'gradientDark', 'gradientLight',
 * 'grayscale', 'gruvboxDark', 'gruvboxLight', 'hopscotch', 'hybrid', 'idea', 'irBlack',
 * 'isblEditorDark', 'isblEditorLight', 'kimbieDark', 'kimbieLight', 'lightfair', 'lioshi',
 * 'magula', 'monoBlue', 'monokaiSublime', 'monokai', 'nightOwl', 'nnfxDark', 'nnfx', 'nord',
 * 'obsidian', 'ocean', 'paraisoDark', 'paraisoLight', 'pojoaque', 'purebasic', 'qtcreatorDark',
 * 'qtcreatorLight', 'railscasts', 'rainbow', 'routeros', 'schoolBook', 'shadesOfPurple', 'solarizedDark',
 * 'solarizedLight', 'srcery', 'stackoverflowDark', 'stackoverflowLight', 'sunburst', 'tomorrowNightBlue',
 * 'tomorrowNightBright', 'tomorrowNightEighties', 'tomorrowNight', 'tomorrow', 'vs', 'vs2015', 'xcode',
 * 'xt256', 'zenburn'
 */

const { TextArea } = Input;
const { Paragraph } = Typography;

export default function InputRenderPlugin(api: SnakeApi) {
  api.registerRender('input', ({ mode = RenderModes.ADD, value, onChange, props }) => {
    if (mode === RenderModes.VIEW) {
      return <span>{value}</span>;
    }

    return (
      <Input
        // defaultValue={value}
        value={value}
        onChange={onChange}
        allowClear
        {...props}
        placeholder={props?.placeholder ? (api.t(props.placeholder) as string) : undefined}
      />
    );
  });

  api.registerRender('textarea', ({ mode = RenderModes.ADD, value, onChange, props }) => {
    if (mode === RenderModes.VIEW) {
      return <span>{value}</span>;
    }
    return (
      <TextArea
        // defaultValue={value}
        value={value}
        onChange={onChange}
        allowClear
        {...props}
        placeholder={props?.placeholder ? (api.t(props.placeholder) as string) : undefined}
      />
    );
  });

  api.registerRender('textcode', ({ mode = RenderModes.ADD, value, onChange, props = {} }) => {
    if (mode === RenderModes.VIEW) {
      return (
        <Paragraph><pre>{value ?? ''}</pre></Paragraph>
      );
    }
    return (
      <TextArea
        // defaultValue={value}
        value={value}
        onChange={onChange}
        allowClear
        {...props}
        placeholder={props?.placeholder ? (api.t(props.placeholder) as string) : undefined}
      />
    );
  });

  api.registerRender('textdecode', ({ mode = RenderModes.ADD, value, onChange, props = {} }) => {
    if (mode === RenderModes.VIEW) {
      const code = JSON.stringify(JSON.parse(decodeURIComponent(value ?? '{}')), null, 2);
      return (
        <div>
          <Row justify="end">
            <Paragraph copyable={{ text: code }} />
          </Row>
          <Row>
            <Paragraph><pre>{code}</pre></Paragraph>
          </Row>
        </div>
      );
    }
    return (
      <TextArea
        // defaultValue={value}
        value={value}
        onChange={onChange}
        allowClear
        {...props}
        placeholder={props?.placeholder ? (api.t(props.placeholder) as string) : undefined}
      />
    );
  });
}
