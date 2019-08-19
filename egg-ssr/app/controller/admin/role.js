'use strict';

const Controller = require('egg').Controller;

class RoleController extends Controller {

  async index() {
    const { ctx, service } = this;
    const res = await service.role.index();

    if (res && res.length > 0) {
      await this.ctx.render('role/index', {
        res,
      });
    }
  }

  async create() {
    const method = this.ctx.request.method;

    if (method === 'GET') {
      await this.ctx.render('role/add');
    }
  }


  async auth() {
    const method = this.ctx.request.method;

    let roleId = null;

    if (method === 'GET') {
      roleId = this.ctx.query.id;
    } else {
      roleId = this.ctx.request.body.roleId;
    }

    let permissionList = await this.ctx.service.permission.index();
    const rolePermissionList = await this.ctx.service.rolePermission.findPermissionByRoleId(roleId);

    permissionList = JSON.parse(JSON.stringify(permissionList));
    // permissionList如果有rolePermissionList，就增加一个字段check==true
    rolePermissionList.forEach(item => {
      permissionList.forEach(permissionItem => {
        if (item.id === permissionItem.id) {
          permissionItem.check = true;
        }
        permissionItem.permissions.forEach(item2 => {
          if (item.id === item2.id) {
            item2.check = true;
          }
        });
      });
    });


    if (method === 'GET') {
      await this.ctx.render('role/auth', {
        permissionList,
        roleId,
      });
    } else if (method === 'POST') {
      const payload = this.ctx.request.body;
      await this.ctx.service.rolePermission.create(payload);
      this.ctx.redirect('/admin/role');
    }
  }

  async edit() {
    return '';
  }

}

module.exports = RoleController;
