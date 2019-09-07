'use strict';

const Service = require('egg').Service;

class AdminAccessService extends Service {
  async login(payload) {
    const { ctx, service } = this;

    const admin = await this.ctx.model.User.findOne({
      where: { username: payload.username || payload.userName },
      include: [
        {
          model: this.ctx.model.Role,
          as: 'role',
        },
      ],
    });

    if (!admin) {
      ctx.throw(422, '用户名或密码错');
    }

    // if (!admin.status) {
    //   ctx.throw(401, '账号非法');
    // }

    const verifyPsw = admin.dataValues.password === payload.password;
    if (!verifyPsw) {
      ctx.throw(422, '用户名或密码错');
    }

    const token = await service.actionToken.apply(admin.id);
    const menu = await service.adminAccess.menu(admin.id);
    await this.app.redis.set(`ecms:admin:userAccess:${admin.id}:token`, token);
    await this.app.redis.set(
      `ecms:admin:userAccess:${admin.id}:roleId`,
      admin.roleId
    );
    let roleList = await this.ctx.model.Role.findAll();
    roleList = roleList.filter(i => i.status === 1);
    return {
      token,
      role: admin.role.name,
      menu,
      allRole: roleList,
      username: payload.username || payload.userName,
    };
  }

  async checkPermission(rid) {
    const { ctx, app } = this;

    let path = ctx.path;

    const roleId = await app.redis.get(`ecms:admin:userAccess:${rid}:roleId`);
    const purls = await ctx.service.adminAccess.changeRedis(roleId);

    path = path.replace('/api', '');


    if (purls.includes(path)) {
      return true;
    }

    if (purls.includes('/admin/role') && path.match(/\/role\/\d{1,3}$/)) {
      return true;
    }


    return false;
  }

  async menu(uid) {
    const { ctx, app } = this;
    const roleId = await app.redis.get(`ecms:admin:userAccess:${uid}:roleId`);
    // check redis
    let role_permission = await app.redis.get(
      `ecms:admin:rolePermission:${roleId}`
    );
    if (!role_permission) {
      await ctx.service.adminAccess.checkPermission(uid);
      // ctx.throw(500, '获取菜单异常');
      role_permission = await app.redis.get(
        `ecms:admin:rolePermission:${roleId}`
      );
    }
    role_permission = JSON.parse(role_permission);
    role_permission = ctx.service.adminAccess.makeMenu(
      Array.from(role_permission)
    );
    return role_permission;
  }

  async makeMenu(menu) {
    let menuArr = [];
    menuArr = menu.filter((i, index, arr) => {
      if (i.permission_id === 0) {
        i.children = [];
        return i;
      }
      const pid = i.permission_id;
      const parent = arr.find(el => pid === el.id);
      parent.children.push(i);
      return i.permission_id === 0;
    });
    return menuArr;
  }

  /**
   * 更新和创建redis
   * @param {int} roleId 角色id
   * @param {boolean} update 是否重新授权
   */
  async changeRedis(roleId, update) {
    const { ctx, app } = this;
    let purls = [];

    const { Op } = this.ctx.app.Sequelize;
    // check redis
    let role_permission = await app.redis.get(
      `ecms:admin:rolePermission:${roleId}`
    );
    // if redis exits role permission
    if (role_permission && !update) {
      role_permission = JSON.parse(role_permission);
      purls = role_permission.map(i => i.url);
    } else {
      // if redis not exits role permission
      const rps = await ctx.model.RolePermission.findAll({
        where: {
          role_id: roleId,
        },
      });
      const pids = rps.map(i => i.permission_id);
      const permissions = await ctx.model.Permission.findAll({
        where: {
          id: {
            [Op.or]: pids,
          },
        },
      });
      await app.redis.set(
        `ecms:admin:rolePermission:${roleId}`,
        JSON.stringify(permissions)
      );
      purls = permissions.map(i => i.url);
    }
    return purls;
  }
}

module.exports = AdminAccessService;
