import { combineReducers } from 'redux-immutable';
import { reducer as loginReducer } from "../pages/login/store";
import { reducer as roleReducer } from "../pages/role/store";
import { reducer as userReducer } from '../pages/user/store';
import { reducer as permissionReducer} from '../pages/permission/store';

const reducer = combineReducers({
  login: loginReducer,
  role: roleReducer,
  user: userReducer,
  permission: permissionReducer,
});

export default reducer;