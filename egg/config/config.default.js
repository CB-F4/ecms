/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1566041821137_1753';

  // add your middleware config here
  config.middleware = [ 'errorHandler', 'auth' ];

  config.sequelize = {
    dialect: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'ecms',
  };

  config.view = {
    mapping: {
      '.html': 'ejs',
    },
  };

  config.security = {
    csrf: {
      enable: false,
    },
    domainWhiteList: [ 'http://localhost:8000' ],
  };

  config.session = {
    key: 'SESSION_ID', // key名字
    maxAge: 1000 * 60 * 24,
    httpOnly: true,
    encrypt: true, // 加密
    renew: true, // 最大时间范围内，刷新，自动增加最大时间
  };

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
