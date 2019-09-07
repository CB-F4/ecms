'use strict';

const Service = require('egg').Service;

class RoleService extends Service {
  async index() {
    const {ctx} = this;
    try {
      return await ctx.model.Role.findAll()
        .then(data => {
          if (data && data.length > 0) {
            return data.map(i => {
              return {
                id: i.id,
                name: i.name,
                status: i.status,
                created_at: i.created_at,
                updated_at: i.updated_at,
              };
            });
          }
        });
    } catch (error) {
      ctx.throw(500, '获取错误');
    }
  }

  async create(payload) {
    const {ctx} = this;
    try {
      payload = {
        name: payload.name,
        status: 1,
      };

      return await ctx.model.Role.create(payload);
    } catch (error) {
      ctx.throw(500, '创建错误');
    }
  }

  async destroy(id) {
    const {ctx} = this;
    try {
      const role = await ctx.model.Role.findByPk(id);
      if (role) {
        return role.destroy();
      } else {
        ctx.throw(404, '请检查删除ID');
      }
    } catch (error) {
      ctx.throw(500, error);
    }
  }

  async update(payload) {
    const {ctx} = this;
    try {
      const role = await ctx.model.Role.findByPk(payload.id);
      if (role) {
        delete payload.id;
        return await role.update(payload);
      }
    } catch (error) {
      ctx.throw(500, error);
    }
  }

  async show(id) {
    const {ctx} = this;
    try {
      const role = await ctx.model.Role.findByPk(id);
      if (role) {
        return role;
      }
      ctx.throw(404, '没有相应role,请检查role_id');
    } catch (error) {
      ctx.throw(500, error);
    }
  }


}

module.exports = RoleService;
