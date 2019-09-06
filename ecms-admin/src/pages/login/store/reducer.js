import { fromJS } from "immutable";
import * as constants from './constants';

const defaultState = fromJS({
  login: false,
  menu: [],
  username: sessionStorage.getItem('username') || ''
});

export default (state = defaultState, action ) => {
  switch (action.type) {
    case constants.CHANGE_LOGIN:
      return state.set('login', action.value);
    case constants.LOGOUT:
      return state.set('login', action.value);
    case constants.CHANGE_MENU:
      return state.set('menu', action.value);
    case constants.CHANGE_USERNAME:
      return state.set('username', action.value);
    default:
      return state;
  }
}