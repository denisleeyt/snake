import { defineConfig } from 'dumi';
import MonacoWebpackPlugin from 'monaco-editor-webpack-plugin';

export default defineConfig({
  title: 'snake',
  favicon: '/logo.svg',
  logo: '/logo.svg',
  outputPath: 'docs-dist',
  mode: 'site',
  hash: true,
  // menus: {
  //   '/guide': [
  //     {
  //       title: '菜单项',
  //       path: '菜单路由（可选）',
  //       children: [
  //         // 菜单子项（可选）
  //         'guide/index.md', // 对应的 Markdown 文件，路径是相对于 resolve.includes 目录识别的
  //       ],
  //     },
  //   ],
  // },
  navs: [
    null, // null 值代表保留约定式生成的导航，只做增量配置
    {
      title: 'GitLab',
      path: 'https://code.bydev.io/cht/fiat/lowcode/snake',
    },
  ],
  // more config: https://d.umijs.org/config
  extraBabelPlugins: [
    [
      'babel-plugin-import',
      {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
      },
    ],
  ],
  chainWebpack(memo) {
    memo.plugin('monaco-editor').use(MonacoWebpackPlugin, [{ languages: ['json'] }]);
    return memo;
  },
  // ignoreMomentLocale: true,
  proxy: {
    '/api': {
      // 要代理的地址
      // target: 'http://x-lab.devtest.ww5sawfyut0k.bitsvc.io/mock/fiat-test/low-code/',
      target: 'http://rap2api.taobao.org/app/mock/299414/',
      // 配置了这个可以从 http 代理到 https
      // 依赖 origin 的功能可能需要这个，比如 cookie
      changeOrigin: true,
    },
  },
});
