'use strict';

const Controller = require('egg').Controller;

class AdminController extends Controller {
  async index() {
    await this.ctx.render('admin');
  }

  async login() {
    const method = this.ctx.request.method;

    if (method === 'GET') {
      await this.ctx.render('login/login');
    } else if (method === 'POST') {
      const userInfo = this.ctx.request.body;
      const users = await this.ctx.model.User.findAll({
        where: {
          username: userInfo.username,
        },
      });

      if (users && users.length > 0) {
        this.ctx.session.userInfo = users[0];
        this.ctx.redirect('/admin');
      } else {
        this.ctx.session.userInfo = null;
        this.ctx.redirect('/admin/login');
      }
    }

  }

  async logout() {
    this.ctx.session.userInfo = null;
    this.ctx.redirect('/admin/login');
  }
}

module.exports = AdminController;
