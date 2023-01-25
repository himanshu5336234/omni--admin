import * as Admin from "../api/Admin";
// import * as Services from "../api/Services"
import { takeLatest, takeEvery, all } from "redux-saga/effects";
function* adminActionWatcher() {
  yield takeLatest("LOGIN", Admin.getAdmin);
  yield takeLatest("FORGET_PASS", Admin.forgetpassword);
  yield takeLatest("Get_USERS", Admin.getALlUsers);
  yield takeLatest("GET_USER", Admin.getUser);
  yield takeLatest("GET_TRANSACTIONS", Admin.gettransactionUsers);
  yield takeLatest("UPDATE_TRANSACTION", Admin.updateTransaction);
  yield takeLatest("RESET_PASSWORD", Admin.resetPassword);
  yield takeLatest("CREATE_TRANSACTION",Admin.createTransaction);
  yield takeLatest("GET_NOTIFICATION",Admin.getNotification);
  yield takeLatest("GET_NEW_TRANSACTION",Admin.getNewTransaction);
 
}

export default function* rootSaga() {
  yield all([adminActionWatcher()]);
}
