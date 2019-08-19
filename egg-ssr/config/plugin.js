'use strict';

/** @type Egg.EggPlugin */
module.exports = {
  sequelize: {
    enable: true,
    package: 'egg-sequelize',
  },
  ejs: {
    enable: true,
    package: 'egg-view-ejs',
  },
  validate: {
    enable: true,
    package: 'egg-validate',
  },
  // had enabled by egg
  // static: {
  //   enable: true,
  // }
};
