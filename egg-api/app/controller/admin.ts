import { Controller } from 'egg';

export default class HomeController extends Controller {
  public async index() {
    const { ctx } = this;
    ctx.body = 'admin';
  }

  /**
   * async login
   */
  public async login() {
    const { ctx } = this;
    ctx.body =''
  }
}
