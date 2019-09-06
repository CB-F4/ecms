'use strict';

module.exports = (options, app) => {
  return async function jwtAuth(ctx, next) {
    const jwtAuthKey = ctx.get('Authorization').substring(7);
    const excepts = [
      '/',
      '/api/admin/login',
      '/api/admin/menu',
    ];

    if (excepts.includes(ctx.path)) {
      return await next();
    }

    try {
      const decoded = app.jwt.verify(jwtAuthKey, app.config.jwt.secret);
      ctx.request.body.user_id = decoded.user_id;
      const admin = await ctx.model.User.findByPk(decoded.user_id);
      const isPermission = await ctx.service.adminAccess.checkPermission(admin.roleId);
      if (isPermission) {
        await next();
      } else {
        // 发送错误
        ctx.helper.toResponse(ctx, 403, null, '没有权限访问');
      }


    } catch (err) {

      if (err.name === 'JsonWebTokenError') { // access_token解析错误JsonWebTokenError
        ctx.body = {
          status: 'error',
          error_code: 403,
          msg: 'LoginRequireException: Auth Error.',
        };
      }

      if (err.name === 'TokenExpiredError') {
        ctx.body = {
          status: 'error',
          error_code: 1001,
          msg: '用户未登录！',
        };
      }

      throw err;
    }
  };
};
