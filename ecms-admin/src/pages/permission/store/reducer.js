import { fromJS } from "immutable";
import * as constants from './constants'

const defaultState = fromJS({
  list: [],
  module_list: [],
  dialog: false,
})

export default (state = defaultState, action) => {
  switch (action.type) {
    case constants.PERMISSIONLIST:
      return state.set('list', action.value);
    case constants.CHANGE_DIALOG:
      return state.set('dialog', action.value);
    case constants.CHANGE_MODULELIST:
      return state.set('module_list', action.value);
    default:
      return state;
  }
}