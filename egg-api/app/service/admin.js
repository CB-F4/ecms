'use strict';

const Service = require('egg').Service;

class AdminService extends Service {
  async index() {
    return await this.ctx.model.User.findAll({
      include: [
        {
          model: this.ctx.model.Role,
          as: 'role',
        },
      ],
    })
      .then(admins => {
        return admins.map(i => {
          return {
            id: i.id,
            username: i.username,
            roleId: i.roleId,
            roleName: i.role.name,
            status: i.status,
            created_at: i.created_at,
            updated_at: i.updated_at,
          };
        });
      });
  }

  async create(payload) {
    try {
      console.log(payload);

      return await this.ctx.model.User.create(payload);
    } catch (error) {
      console.log(error);

      this.ctx.throw(500, '创建发生错误');
    }
  }

  async update(payload) {
    try {
      const admin = await this.ctx.model.User.findByPk(payload.id);
      if (admin) {
        delete payload.id;
        return await admin.update(payload);
      }
    } catch (error) {
      console.log(error);

      this.ctx.throw(500, '更新发生错误');
    }
  }

  async destroy(payload) {
    try {
      const admin = await this.ctx.model.User.findByPk(payload.id);
      if (admin) {
        return await admin.destroy(payload.id);
      }
    } catch (error) {
      console.log(error);

      this.ctx.throw(500, '删除发生错误');
    }
  }
}

module.exports = AdminService;
