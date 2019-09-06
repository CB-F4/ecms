'use strict';
const dayjs = require('dayjs');

exports.toResponse = (ctx, code = 200, data, msg = 'success') => {
  const response = {
    code,
    data,
    msg,
    time: dayjs().unix(),
  };

  // 响应返回
  ctx.response.body = response;
};
