'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.post('/api/admin/login', controller.admin.login);

  router.post('/api/admin/user/add', controller.admin.create);
  router.get('/api/admin/user', controller.admin.index);
  router.post('/api/admin/user/delete', controller.admin.destroy);
  router.put('/api/admin/user/edit', controller.admin.update);

  router.get('/api/admin/permission', controller.permission.index);
  router.post('/api/admin/permission/add', controller.permission.create);
  router.post('/api/admin/permission/delete', controller.permission.destroy);
  router.put('/api/admin/permission/edit', controller.permission.update);

  router.get('/api/admin/role', controller.role.index);
  router.get('/api/admin/role/show', controller.role.show);
  router.get('/api/admin/role/:id', controller.role.showPermission);
  router.post('/api/admin/role/add', controller.role.create);
  router.post('/api/admin/role/delete', controller.role.destroy);
  router.put('/api/admin/role/edit', controller.role.update);
  router.post('/api/admin/role/access', controller.role.access);
};
