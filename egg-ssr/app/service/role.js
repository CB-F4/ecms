'use strict';

const Service = require('egg').Service;

class RoleService extends Service {
  async index() {
    const roleList = this.app.model.Role.findAll();
    return roleList;
  }
}

module.exports = RoleService;
