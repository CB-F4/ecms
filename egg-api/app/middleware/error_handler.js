'use strict';

module.exports = (option, app) => {
  return async function(ctx, next) {
    try {
      await next();

      if (ctx.status === 404 && !ctx.body) {
        ctx.helper.toResponse(ctx, 404, null, '当前请求不存在');
      }
    } catch (err) {
      // 所有的异常都在 app 上触发一个 error 事件，框架会记录一条错误日志
      app.emit('error', err, this);

      if (ctx.app.config.env === 'local') {
        ctx.logger.info('------------------------ exception ------------------------');
        ctx.logger.info(err);
        ctx.logger.info('------------------------ exception end ------------------------\n');
      }
      // 状态码
      let statusCode = err.status || 500;
      // 错误提示
      let statusMessage = err.message || 'error';
      // egg-sequelize 的异常处理
      if (err.name === 'SequelizeUniqueConstraintError') {
        statusCode = 422;
        statusMessage = `数据库操作失败: ${err.errors[0].message}`;
      }

      // 处理由 jwt 签发的 token 失效异常
      if (err.name === 'TokenExpiredError') {
        statusCode = 403;
        statusMessage = 'token 已过期，请重新登录';
      }

      // 处理由 jwt 验证 token 非法异常
      if (err.name === 'JsonWebTokenError') {
        statusCode = 422;
        statusMessage = '非法的 token';
      }

      if (err.name === 'UnauthorizedError') {
        statusCode = 401;
        statusMessage = '无效的 token';
      }

      // 应用异常通知, 异步调用，不需要等待，避免阻塞
      // ctx.service.exceptions.handler(error);

      // 响应返回
      ctx.helper.toResponse(ctx, statusCode, null, statusMessage);
    }
  };
};
