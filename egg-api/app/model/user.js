'use strict';

module.exports = app => {
  const { INTEGER, STRING, DATE } = app.Sequelize;
  const User = app.model.define('User', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: STRING,
    },
    password: {
      type: STRING,
    },
    created_at: DATE,
    updated_at: DATE,
    roleId: {
      type: INTEGER,
      field: 'role_id',
    },
  }, {
    freezeTableName: true,
  });
  User.associate = function() {
    app.model.User.belongsTo(app.model.Role, { as: 'role' });
  };
  return User;
};
