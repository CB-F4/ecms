'use strict';

const url = require('url');
module.exports = () => {
  return async function adminauth(ctx, next) {
    // 1. 如果没有登录,跳转登录
    // 2.如果登录,判断当前用户对应的角色,是否有权限

    const pathname = url.parse(ctx.request.url).pathname;
    ctx.state.prevUrl = ctx.request.headers.referer; // 获取上一页的url

    if (ctx.session.userInfo) {

      ctx.state.userInfo = ctx.session.userInfo;
      const roleId = ctx.session.userInfo.roleId;
      const isPermission = await ctx.service.auth.checkAdmin();

      if (isPermission) {
        // 左侧导航
        const getAdminList = await ctx.service.auth.getAdminList(roleId);
        ctx.state.pageNav = getAdminList;
        await next();

      } else {
        await ctx.render('login/noPermission');
      }

    } else {

      if (pathname === '/' || pathname === '/admin' || pathname === '/admin/login' || pathname === '/admin/register' || pathname === '/admin/logout') {
        await next();
      } else {
        ctx.redirect('/admin/login');
      }

    }
  };
};
