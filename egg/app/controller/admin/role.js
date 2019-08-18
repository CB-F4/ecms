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

      // this.ctx.helper.success({ ctx, res });
    }
  }
}

module.exports = RoleController;
