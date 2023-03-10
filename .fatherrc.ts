export default {
  esm: 'babel',
  // lessInBabelMode: true,
  extraBabelPlugins: [
    ['babel-plugin-import', {
      libraryName: 'antd',
      libraryDirectory: 'es',
      style: true,
    }],
  ],
  // doc: {
  //   themeConfig: { mode: 'dark' },
  //   base: './'
  // },
}
