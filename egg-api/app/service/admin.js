'use strict';

const Service = require('egg').Service;

class AdminService extends Service {
  async index() {
    return await this.ctx.model.User.findAll()
      .then(admins => {
        return admins.map(i => {
          return {
            username: i.username,
            roleId: i.roleId,
            created_at: i.created_at,
            updated_at: i.updated_at,
          };
        });
      });

  }

  async create(payload) {
    try {
      return await this.ctx.model.User.create(payload);
    } catch (error) {
      this.ctx.throw(500, '创建发生错误');
    }
  }
}

module.exports = AdminService;
