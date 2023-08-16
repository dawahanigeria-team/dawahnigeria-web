import { combineReducers } from "redux";
import User from "./user";
import Search from "./search"
const appReducer = combineReducers({
  user: User,
  search: Search
});

const rootReducer = (state, action) => {
  if (action.type === "LOGOUT") {
    // storage.removeItem('persist:otherKey')
    localStorage.removeItem("persist:root");

    return appReducer(undefined, action);
  }
  return appReducer(state, action);
};

export default rootReducer;
