'use strict';

const Service = require('egg').Service;

class ActionTokenService extends Service {
  async apply(_id) {
    const { app, ctx } = this;

    return ctx.app.jwt.sign(
      {
        user_id: _id,
      },
      app.config.jwt.secret,
      { expiresIn: '30 days' }
    );
  }
}

module.exports = ActionTokenService;
