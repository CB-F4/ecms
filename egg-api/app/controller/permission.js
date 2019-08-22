'use strict';

const Controller = require('egg').Controller;

class PermissionController extends Controller {

  async index() {
    const { ctx } = this;
    const res = await ctx.service.permission.index();
    ctx.helper.toResponse(ctx, 200, res, '获取成功');
  }


  async create() {
    const { ctx } = this;
    const payload = ctx.request.body;
    const res = await ctx.service.permission.create(payload);
    ctx.helper.toResponse(ctx, 200, res, '创建成功');
  }

  async update() {
    const { ctx } = this;
    const payload = ctx.request.body;
    const res = await ctx.service.permission.update(payload);
    ctx.helper.toResponse(ctx, 200, res, '更新成功');
  }

  async destroy() {
    const { ctx } = this;
    const payload = ctx.request.body;
    const res = await ctx.service.permission.destroy(payload);
    ctx.helper.toResponse(ctx, 200, res, '删除成功');
  }

  async show() {
    const { ctx } = this;
    const payload = ctx.params;
    const res = await ctx.service.permission.destroy(payload);
    ctx.helper.toResponse(ctx, 200, res, '拉取信息成功');
  }

  async removes() {
    const { ctx } = this;
    const payload = ctx.request.body;
    await ctx.service.permission.removes(payload);
    ctx.helper.toResponse(ctx, 200, null, '删除成功');
  }

}

module.exports = PermissionController;
