// import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from "redux";

// import settings from "../containers/Setting/settingsReducer";
// import counter from "../containers/Home/counterReducer"
import user from "./user/reducer"


// export default configureStore({
//   reducer: {
//     settings: settings,
//     counter: counter,
//   },
// });


const appReducer = combineReducers({
  user
})

const rootReducer = (state, action) => {
  // const newState = action.type==='RESET'?undefined:state;
  // console.log(state, "State in root reducer")
  return appReducer(state, action);
}

export default rootReducer;