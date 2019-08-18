'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hi, egg';
  }
  async render() {
    await this.ctx.render('index');
  }
}

module.exports = HomeController;
