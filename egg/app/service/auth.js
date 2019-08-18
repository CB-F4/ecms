'use strict';
const url = require('url');
const Service = require('egg').Service;

class AuthService extends Service {
  // 是否有权限
  async checkAdmin() {
    const Op = this.ctx.app.Sequelize.Op;
    const { ctx } = this;
    let pathname = url.parse(ctx.request.url).pathname;
    // 1.获取当前角色
    // 2.根据当前角色查出对应权限
    // 3.将权限里url,拼接成一个url数组
    // 4.当前仿问的url是否在url数组里

    // 1.
    const userInfo = ctx.session.userInfo;
    const roleId = userInfo.roleId;
    // 忽略权限判断的地址
    const ignoreUrl = [ '/', '/admin', '/admin/login', '/admin/register', '/admin/logout' ];
    if (ignoreUrl.indexOf(pathname) !== -1 || userInfo.roleId === '1') {
      return true;
    }
    // 2.
    const permission = await ctx.model.RolePermission.findAll({
      where: {
        role_id: roleId,
      },
    });
    // 得到所有的权限ids
    const permissionIds = [];
    permission.forEach(item => {
      permissionIds.push(item.permission_id);
    });
    const permissions = await ctx.model.Permission.findAll({
      where: {
        id: {
          [Op.or]: permissionIds,
        },
      },
    });
    // 3.
    const permissionUrls = [];
    permissions.forEach(item => {
      permissionUrls.push(item.url);
    });
    // 4.
    if (pathname.indexOf('delete') !== -1) {
      const strIndex = pathname.lastIndexOf('/');
      pathname = pathname.slice(0, strIndex);
    }
    if (permissionUrls.indexOf(pathname) !== -1) {
      return true;
    }
    return false;
  }
  // 左侧导航
  async getAdminList(roleId) {

    const Op = this.ctx.app.Sequelize.Op;
    const { ctx } = this;
    const permission = await ctx.model.RolePermission.findAll({
      where: {
        role_id: roleId,
      },
    });
    const permissionIds = [];
    permission.forEach(item => {
      permissionIds.push(item.permission_id);
    });
    if (roleId === 0) {
      return await ctx.model.Permission.findAll();
    }
    const permissions = await ctx.model.Permission.findAll({
      where: {
        id: {
          [Op.or]: permissionIds,
        },
        permission_id: 0,
      },
      include: [{
        model: this.ctx.model.Permission,
        as: 'permissions',
        where: {
          type: {
            [Op.in]: [ 1, 2 ],
          },
        },
      }],
    });
    return permissions;
  }
}

module.exports = AuthService;
