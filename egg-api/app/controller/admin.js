'use strict';

const Controller = require('egg').Controller;

class AdminController extends Controller {

  async login() {
    const { ctx } = this;
    const payload = ctx.request.body;
    const res = await ctx.service.adminAccess.login(payload);
    ctx.helper.toResponse(ctx, 200, { ...res }, '登录成功');
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
