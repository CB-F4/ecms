import axios from "axios";
import * as constants from "./constants";
import { message } from "antd";
const token = sessionStorage.getItem("token");

export const getAllPermission = () => {
  return dispatch => {
    axios
      .get("/api/admin/permission", {
        headers: {
          Authorization: "Bearer " + token
        }
      })
      .then(res => {
        const result = res.data;
        const moduleList = []; // 模块
        if (result && result.code === 200) {
          let list = result.data;
          list = list.map(i => {
            i.key = i.id;
            if (i.permission_id === 0) {
              moduleList.push(i);
            }
            return i;
          });
          moduleList.push({
            id: 0,
            title: "根模块",
            key: 0
          });
          // list
          dispatch({
            type: constants.PERMISSIONLIST,
            value: list
          });
          dispatch({
            type: constants.CHANGE_MODULELIST,
            value: moduleList
          });
        }
      });
  };
};

export const changeDialog = value => {
  return dispatch =>
    dispatch({
      type: constants.CHANGE_DIALOG,
      value
    });
};

export const submit = (record, type) => {
  return dispatch => {
    if (type === "edit") {
      axios
        .put("/api/admin/permission/edit", record, {
          headers: {
            Authorization: "Bearer " + token
          }
        })
        .then(res => {
          const result = res.data;
          if (result && result.code === 200) {
            message.info("更新成功");
            dispatch({
              type: constants.CHANGE_DIALOG,
              value: false
            });
            dispatch(getAllPermission());
            return;
          }
          message.info("更新失败");
        });
    } else if (type === "add") {
      axios
        .post("/api/admin/permission/add", record, {
          headers: {
            Authorization: "Bearer " + token
          }
        })
        .then(res => {
          const result = res.data;
          if (result && result.code === 200) {
            message.info("添加成功");
            dispatch({
              type: constants.CHANGE_DIALOG,
              value: false
            });
            dispatch(getAllPermission());
            return;
          }
          message.info("添加失败");
        });
    }
  };
};

export const permissionDelete = (id) => {
  return dispatch => {
    axios.post('/api/admin/permission/delete', {id}, {
      headers: {
        Authorization: "Bearer " + token
      }
    }).then(res => {
      const result = res.data;
      if (result && result.code === 200) {
        message.info('删除成功');
        dispatch(getAllPermission());
        return;
      } else {
        message.info('删除失败');
      }
    })
  }
}
