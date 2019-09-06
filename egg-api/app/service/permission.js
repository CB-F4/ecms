'use strict';

const Service = require('egg').Service;

class PermissionService extends Service {
  async index() {
    return await this.ctx.model.Permission.findAll()
      .then(permissions => {
        return permissions.map(i => {
          return {
            id: i.id,
            title: i.title,
            url: i.url,
            type: i.type,
            status: i.status,
            permission_id: i.permission_id,
            created_at: i.created_at,
            updated_at: i.updated_at,
          };
        });
      });
  }

  async create(payload) {
    try {
      if (payload.type && parseInt(payload.type) === 1) {
        payload.permission_id = 0;
      }
      return await this.ctx.model.Permission.create(payload);
    } catch (error) {
      console.log(error);
      this.ctx.throw(500, '创建发生错误');
    }
  }

  async destroy(payload) {
    try {
      const permission = await this.ctx.model.Permission.findByPk(payload.id);
      return await permission.destroy();
    } catch (error) {
      console.log(error);
      this.ctx.throw(500, '删除发生了异常');
    }
  }

  async update(payload) {
    try {
      const permission = await this.ctx.model.Permission.findByPk(payload.id);
      delete payload.id;
      await permission.update(payload);
    } catch (error) {
      this.ctx.throw(500, '更新发生了错误');
    }
  }
}

module.exports = PermissionService;
