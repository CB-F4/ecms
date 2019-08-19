'use strict';

const Service = require('egg').Service;

class PermissionService extends Service {


  async index() {
    try {
      const permissionList = await this.ctx.model.Permission.findAll({
        where: {
          permission_id: 0,
        },
        include: [{
          model: this.ctx.model.Permission,
          as: 'permissions',
        }],
      });
      return permissionList;
    } catch (error) {
      console.log(error);
    }
  }


  async show(id) {
    try {
      const permission = await this.ctx.model.Permission.findByPk(id);
      return permission;
    } catch (error) {
      console.log(error);
    }
  }


  async create(newPermission) {
    try {
      await this.ctx.model.Permission.create(newPermission);
    } catch (error) {
      console.log(error);
    }
  }

  async update(newPermission) {
    try {
      const permission = await this.ctx.model.Permission.findByPk(newPermission.id);
      await permission.update(newPermission);
    } catch (error) {
      console.log(error);
    }
  }

  async destroy(id) {
    try {
      const permission = await this.ctx.model.Permission.findByPk(id);
      await permission.destroy();
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = PermissionService;
