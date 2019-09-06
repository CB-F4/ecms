'use strict';

const Controller = require('egg').Controller;

class AdminController extends Controller {

  async login() {
    const { ctx } = this;
    const payload = ctx.request.body;
    const res = await ctx.service.adminAccess.login(payload);

    function checkResName(resItem) {
      return {
        name: resItem.title,
        status: resItem.status,
        type: resItem.type,
        id: resItem.id,
        icon: resItem.icon || 'user',
        meta: true,
        path: resItem.url,
      };
    }

    const menu = res.menu.map(m => {
      if (m.children && m.children.length > 0) {
        return {
          name: m.title,
          children: m.children.map(i => (checkResName(i))),
          icon: m.icon || 'user',
          meta: true,
          path: '',
        };
      }
      return checkResName(m);
    });

    ctx.helper.toResponse(ctx, 200, { ...res, menu }, '登录成功');
  }

  async index() {
    const { ctx } = this;
    const res = await ctx.service.admin.index();
    ctx.helper.toResponse(ctx, 200, res, '获取成功');
  }


  async create() {
    const { ctx } = this;
    const payload = ctx.request.body;
    const res = await ctx.service.admin.create(payload);
    ctx.helper.toResponse(ctx, 200, res, '创建成功');
  }

  async update() {
    const { ctx } = this;
    const payload = ctx.request.body;
    const res = await ctx.service.admin.update(payload);
    ctx.helper.toResponse(ctx, 200, res, '更新成功');
  }

  async destroy() {
    const { ctx } = this;
    const payload = ctx.request.body;
    await ctx.service.admin.destroy(payload);
    ctx.helper.toResponse(ctx, 200, null, '删除成功');
  }

  async show() {
    const { ctx } = this;
    const payload = ctx.params;
    const res = await ctx.service.admin.destroy(payload);
    ctx.helper.toResponse(ctx, 200, res, '拉取信息成功');
  }

  async removes() {
    const { ctx } = this;
    const payload = ctx.request.body;
    await ctx.service.admin.removes(payload);
    ctx.helper.toResponse(ctx, 200, null, '删除成功');
  }

}

module.exports = AdminController;
