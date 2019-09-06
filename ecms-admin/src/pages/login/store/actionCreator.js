import axios from 'axios';
import history from '../../../utils/history'
import * as constants from './constants';
import { message } from "antd";

export const changeLogin = () => ({
  type: constants.CHANGE_LOGIN,
  value: true,
});

export const changeMenu = (menu) => ({
  type: constants.CHANGE_MENU,
  value: menu,
});

export const changeUsername = (username) => ({
  type: constants.CHANGE_USERNAME,
  value: username
})

export const logout = () => {
  return (dispatch) => {
    dispatch({
      type: constants.CHANGE_MENU,
      value: []
    });
    dispatch({
      type: constants.LOGOUT,
      value: false,
    });
    sessionStorage.setItem('token', null);
    sessionStorage.setItem('menu', null);
    history.replace('/login');
  }
};

export const login = (payload) => {
	return (dispatch) => {
    axios.post('/api/admin/login', payload).then(res => {
      const result = res.data;

      if (result && result.code === 200) {
        const { token, menu, allRole, username } = result.data;
        
        sessionStorage.setItem('token', token);
        sessionStorage.setItem('menu', JSON.stringify(menu));
        sessionStorage.setItem('allRole', JSON.stringify(allRole));
        sessionStorage.setItem('username', username);
        
        history.replace({pathname: '/'});
        
        dispatch(changeLogin());
        dispatch(changeMenu(menu));
        dispatch(changeUsername(username));
      } else {
        message.error('用户名或者密码错');
        dispatch(logout());
      }
    })
  }
}
