const { override, fixBabelImports, addLessLoader } = require('customize-cra');

module.exports = override(
     fixBabelImports('import', {
       libraryName: 'antd',
       libraryDirectory: 'es',
       style: true,
     }),
     addLessLoader({
      javascriptEnabled: true,
      modifyVars: {
        'primary-color': '#a0c334',
        'link-color': '#a0c334',
      }
     })
   );