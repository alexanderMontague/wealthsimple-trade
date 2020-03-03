import { all } from "redux-saga/effects";
import { auth } from "./auth";
import { tradeSaga } from "./tradeSagas";

export default function* rootSaga() {
  yield all([authSaga(), tradeSaga()]);
}
