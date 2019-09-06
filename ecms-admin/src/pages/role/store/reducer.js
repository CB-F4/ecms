import { fromJS } from "immutable";
import { constants } from "../../role/store";

const defaultState = fromJS({
  list: [],
  edit_dialog: false,
  access_dialog: false,
  role_permission: [],
  all_permission: [],
})

export default (state = defaultState, action) => {  
  switch (action.type) {
    case constants.ROLELIST:
      return state.set('list', action.value);
    case constants.ROLE_EDIT_DIALOG:
      return state.set('edit_dialog', action.value);
    case constants.ACCESS_DIALOG:
      return state.set('access_dialog', action.value);
    case constants.ROLE_PERMISSION_LIST:
      return state.set('role_permission', action.value);
    case constants.PERMISSION_LIST:
      return state.set('all_permission', action.value);
    default:
      return state;
  }
}

