'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.render);

  // admin
  router.get('/admin/', controller.admin.admin.index);
  router.get('/admin/login', controller.admin.admin.login);
  router.post('/admin/login', controller.admin.admin.login);
  router.get('/admin/logout', controller.admin.admin.logout);
  // role
  router.get('/admin/role', controller.admin.role.index);
  // permission
  router.get('/admin/permission', controller.admin.permission.index);
  router.get('/admin/permission/add', controller.admin.permission.add);
  router.post('/admin/permission/add', controller.admin.permission.doAdd);
  router.get('/admin/permission/edit', controller.admin.permission.edit);
  router.post('/admin/permission/edit', controller.admin.permission.doEdit);
  router.get('/admin/permission/delete/:id', controller.admin.permission.delete);
};
