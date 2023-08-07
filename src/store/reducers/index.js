import { combineReducers } from "redux";
import userReducer from "./user.reducer";
import voucherReducer from "./voucher.reducer";

const rootReducer = combineReducers({
  userReducer: userReducer,
  voucherReducer: voucherReducer
});

export default rootReducer;