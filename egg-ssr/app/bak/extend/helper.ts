import { Context } from "egg";
import * as dayjs from 'dayjs'

export default {
    /**
   * 响应返回
   *
   * @param { number } total 如果是分页返回的话，应该加上 count 总页数数据
   *
   * @returns { object }
   */
  toResponse(ctx:Context, code: number, data: any, msg: string = 'success') {
    const response = {
      code,
      data,
      msg,
      time: dayjs().unix(),
    };

    // 响应返回
    ctx.response.body = response;
  },
}