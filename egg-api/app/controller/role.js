'use strict';

const Controller = require('egg').Controller;

class RoleController extends Controller {


  async index() {
    const { ctx } = this;
    const res = await ctx.service.role.index();
    ctx.helper.toResponse(ctx, 200, res, '获取成功');
  }


  async create() {
    const { ctx } = this;
    const payload = ctx.request.body;
    const res = await ctx.service.role.create(payload);
    ctx.helper.toResponse(ctx, 200, res, '创建成功');
  }

  async update() {
    const { ctx } = this;
    const payload = ctx.request.body;
    const res = await ctx.service.role.update(payload);
    ctx.helper.toResponse(ctx, 200, res, '更新成功');
  }

  async destroy() {
    const { ctx } = this;
    const payload = ctx.request.body;
    await ctx.service.role.destroy(payload.id);
    ctx.helper.toResponse(ctx, 200, null, '删除成功');
  }

  async show() {
    const { ctx } = this;
    const id = ctx.params.id;
    const res = await ctx.service.role.show(id);
    ctx.helper.toResponse(ctx, 200, res, '获取成功');
  }

  async removes() {
    const { ctx } = this;
    const payload = ctx.request.body;
    await ctx.service.role.removes(payload);
    ctx.helper.toResponse(ctx, 200, null, '删除成功');
  }

  async showPermission() {
    const { ctx } = this;
    const { id } = ctx.query;
    const res = await ctx.service.rolePermission.show(id);
    ctx.helper.toResponse(ctx, 200, res, '获取成功');
  }
  /**
   *
   * 角色授权
   *
   */
  async access() {
    const { ctx } = this;
    const payload = ctx.request.body; // 角色 id
    const res = await ctx.service.rolePermission.access(payload);
    ctx.helper.toResponse(ctx, 200, res, '授权成功');
  }
}

module.exports = RoleController;
