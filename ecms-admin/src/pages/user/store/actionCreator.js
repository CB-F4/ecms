import axios from "axios";
import * as constants from "./constants";
import { message } from "antd";
const token = sessionStorage.getItem("token");

export const getUserList = () => {
  return dispatch => {
    axios
      .get("/api/admin/user", {
        headers: {
          Authorization: "Bearer " + token
        }
      })
      .then(res => {
        const result = res.data;
        if (result && result.code === 200) {
          let list = result.data;
          list = list.map(i => {
            i.key = i.id;
            return i;
          });
          dispatch({
            type: constants.USERLIST,
            value: list
          });
        }
      });
  };
};

export const changeDialog = isOpen => {
  return dispatch => {
    dispatch({
      type: constants.CHANGE_DIALOG,
      value: isOpen
    });
  };
};

export const submit = (record, type) => {
  return dispatch => {
    if (type === "edit") {
      axios
        .put("/api/admin/user/edit", record, {
          headers: {
            Authorization: "Bearer " + token
          }
        })
        .then(res => {
          const result = res.data;
          if (result && result.code === 200) {
            dispatch(getUserList());
            dispatch(changeDialog(false));
            message.info("更新成功");
            return;
          }
          message.error("更新失败");
        });
    } else if (type === "add") {
      axios
        .post("/api/admin/user/add", record, {
          headers: {
            Authorization: "Bearer " + token
          }
        })
        .then(res => {
          const result = res.data;
          if (result && result.code === 200) {
            message.info("添加成功");
            dispatch(getUserList());
            dispatch(changeDialog(false));
            return;
          }
        });
    }
    message.error("添加失败");
  };
};

export const userDelete = id => {
  return dispatch => {
    axios
      .post(
        "/api/admin/user/delete",
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
          dispatch(getUserList());
          message.info("删除成功");
          return;
        }
        message.error("删除失败");
      });
  };
};
