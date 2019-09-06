import axios from "axios";
import * as constants from "./constants";
import { message } from "antd";
const token = sessionStorage.getItem("token");

export const getRoleList = payload => {
  return dispatch => {
    axios
      .all([
        axios.get("/api/admin/role", {
          headers: {
            Authorization: "Bearer " + token
          }
        }),
        axios.get("/api/admin/permission", {
          headers: {
            Authorization: "Bearer " + token
          }
        })
      ])
      .then(res => {
        if (res.length === 2) {
          const roleRes = res[0].data;
          const permissionRes = res[1].data;
          if (roleRes && roleRes.code === 200) {
            let list = roleRes.data;
            list = list.map(i => {
              i.key = i.id;
              return i;
            });
            dispatch({
              type: constants.ROLELIST,
              value: list
            });
          }
          if (permissionRes && permissionRes.code === 200) {
            const rootNodes = [];
            let list = permissionRes.data;
            list = list.map(i => {
              if (i.permission_id === 0) {
                rootNodes.push({
                  id: i.id,
                  key: i.id,
                  title: i.title,
                  children: []
                });
              }
              i.key = i.id;
              return i;
            });

            rootNodes.map(i => {
              list.map(j => {
                if (j.permission_id === i.id) {
                  i.children.push(j);
                }
                return j;
              });
              return i;
            });

            dispatch({
              type: constants.PERMISSION_LIST,
              value: rootNodes
            });
          }
        }
      });
  };
};

export const formSubmit = (payload, type) => {
  if (type === "edit") {
    return dispatch => {
      axios
        .put("/api/admin/role/edit", payload, {
          headers: {
            Authorization: "Bearer " + token
          }
        })
        .then(res => {
          const result = res.data;
          if (result && result.code === 200) {
            message.info("更新成功");
            dispatch({
              type: constants.ROLE_EDIT_DIALOG,
              value: false
            });
            dispatch(getRoleList());
            return;
          }
          message.error("更新失败");
        });
    };
  } else {
    return dispatch => {
      axios
        .post("/api/admin/role/add", payload, {
          headers: {
            Authorization: "Bearer " + token
          }
        })
        .then(res => {
          const result = res.data;
          if (result && result.code === 200) {
            message.info("添加成功");
            dispatch({
              type: constants.ROLE_EDIT_DIALOG,
              value: false
            });
            dispatch(getRoleList());
            return;
          }
          message.error("添加失败");
        });
    };
  }
};

export const editDialog = isOpen => {
  return dispatch => {
    dispatch({
      type: constants.ROLE_EDIT_DIALOG,
      value: isOpen
    });
  };
};

export const changeAccessDialog = isOpen => {
  return dispatch => {
    dispatch({
      type: constants.ACCESS_DIALOG,
      value: isOpen
    });
  };
};

export const roleDelete = id => {
  return dispatch => {
    axios
      .post(
        "/api/admin/role/delete",
        { id },
        {
          headers: {
            Authorization: "Bearer " + token
          }
        }
      )
      .then(res => {
        const result = res.data;
        if (result && result.code === 200) {
          message.info("删除成功");
          dispatch(getRoleList());
          return;
        }
        message.error("删除失败");
      });
  };
};

export const getRolePermission = rid => {
  return dispatch => {
    axios
      .get("/api/admin/role/" + rid, {
        headers: {
          Authorization: "Bearer " + token
        }
      })
      .then(res => {
        const result = res.data;
        if (result && result.code === 200) {
          let list = result.data;
          list = list.map(i => i.id);
          dispatch({
            type: constants.ROLE_PERMISSION_LIST,
            value: list
          });
        }
      });
  };
};

export const accessSubmit = (keys, rid) => {
  return dispatch => {
    axios
      .post(
        "/api/admin/role/access",
        {
          pids: keys,
          id: rid
        },
        {
          headers: {
            Authorization: "Bearer " + token
          }
        }
      )
      .then(res => {
        const result = res.data;
        if (result && result.code === 200) {
          message.info('授权成功');
          dispatch(getRoleList());
          dispatch(changeAccessDialog(false))
        } else {
          message.error('授权失败');
        }
      });
  };
};
