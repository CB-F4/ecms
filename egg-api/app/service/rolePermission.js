'use strict';

const Service = require('egg').Service;

class RolePermissionService extends Service {
  async show(id) {
    const { ctx } = this;
    const { Op } = this.ctx.app.Sequelize;
    console.log('=============>>>>>' + id);

    const pids = await ctx.model.RolePermission.findAll({
      where: {
        role_id: id,
      },
    }).then(rps => {
      return rps.map(i => {
        return i.permission_id;
      });
    });
    const permissions = await ctx.model.Permission.findAll({
      where: {
        id: {
          [Op.or]: pids,
        },
      },
    });
    return permissions;
  }

  async access(payload) {
    const { ctx } = this;
    try {
      const { id, pids } = payload;

      // pids = pids.split(',');

      await this.ctx.model.RolePermission.destroy({
        where: {
          role_id: id,
        },
      });

      pids.forEach(async i => {
        await this.ctx.model.RolePermission.create({
          role_id: id,
          permission_id: parseInt(i),
          statuse: 1,
        });
      });

      ctx.service.adminAccess.changeRedis(id, true);

      return null;

    } catch (error) {
      ctx.throw(500, error);
    }
  }
}

module.exports = RolePermissionService;
