'use strict';

const Controller = require('egg').Controller;

class RoleController extends Controller {
  constructor(ctx) {
    super(ctx);

    this.createRule = {
      name: {type: 'string', required: true, allowEmpty: false},
    };

    this.updateRule = {
      id: {type: 'string', required: true, allowEmpty: false},
      name: {type: 'string', required: true, allowEmpty: false},
      status: {type: 'string', required: true, allowEmpty: false},
    };

    this.deleteRule = {
      id: {type: 'string', required: true, allowEmpty: false},
    };

    this.accessRule = {
      id: {type: 'string', required: true, allowEmpty: false},
      pids: {type: 'array', required: true, allowEmpty: false},
    };

    this.showRule = {
      id: {type: 'string', required: true, allowEmpty: false},
    };
  }


  async index() {
    const {ctx} = this;
    const res = await ctx.service.role.index();
    ctx.helper.toResponse(ctx, 200, res, '获取成功');
  }

  async create() {
    const {ctx} = this;
    ctx.validate(this.createRule);
    const payload = ctx.request.body;
    const res = await ctx.service.role.create(payload);
    ctx.helper.toResponse(ctx, 200, res, '创建成功');
  }

  async update() {
    const {ctx} = this;
    ctx.validate(this.updateRule);
    const payload = ctx.request.body;
    const res = await ctx.service.role.update(payload);
    ctx.helper.toResponse(ctx, 200, res, '更新成功');
  }

  async destroy() {
    const {ctx} = this;
    ctx.validate(this.deleteRule);
    const payload = ctx.request.body;
    await ctx.service.role.destroy(payload.id);
    ctx.helper.toResponse(ctx, 200, null, '删除成功');
  }

  async showPermission() {
    const {ctx} = this;
    const {id} = ctx.params;
    if (!id) {
      ctx.throw(404, '请检查role_id');
    }
    const res = await ctx.service.rolePermission.show(id);
    ctx.helper.toResponse(ctx, 200, res, '获取成功');
  }

  // 角色授权
  async access() {
    const {ctx} = this;
    ctx.validate(this.accessRule);
    const payload = ctx.request.body; // 角色 id
    const res = await ctx.service.rolePermission.access(payload);
    ctx.helper.toResponse(ctx, 200, res, '授权成功');
  }

  // 单个角色详情
  async show() {
    const {ctx} = this;
    const {id} = ctx.query;
    if (!id) {
      ctx.throw(404, '请检查role_id');
    }
    const res = await ctx.service.role.show(id);
    ctx.helper.toResponse(ctx, 200, res, '获取成功');
  }

  // 批量删除 todo
  async removes() {
    const {ctx} = this;
    const payload = ctx.request.body;
    await ctx.service.role.removes(payload);
    ctx.helper.toResponse(ctx, 200, null, '删除成功');
  }


}

module.exports = RoleController;
