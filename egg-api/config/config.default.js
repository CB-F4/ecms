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
  config.keys = appInfo.name + '_1566383528809_7910';

  // add your middleware config here
  config.middleware = [ 'errorHandler', 'jwtAuth' ];

  config.sequelize = {
    dialect: 'mysql', // support: mysql, mariadb, postgres, mssql
    database: 'ecms',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'root',
    timezone: '+08:00',
  };

  config.redis = {
    client: {
      port: 6379,
      host: '127.0.0.1',
      password: '',
      db: 0,
    },
  };

  // egg-jwt 配置
  config.jwt = {
    secret: 'CB-fe4_', // 密钥
    adminSecret: 'your', // 后台用户的密钥
    enable: true, // 开启
    match: '/jwt', // 白名单
  };

  config.security = {
    csrf: {
      enable: false,
    },
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
