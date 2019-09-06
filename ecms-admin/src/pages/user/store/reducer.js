import { fromJS } from "immutable";
import { constants } from "../../user/store";

const defaultState = fromJS({
  list: [],
  dialog: false,
});

export default (state = defaultState, action) => {
  switch (action.type) {
    case constants.USERLIST:
      return state.set('list', action.value);
    case constants.CHANGE_DIALOG:
      return state.set('dialog', action.value);
    default:
      return state;
  }
}