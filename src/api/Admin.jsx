import { put } from "redux-saga/effects";
import { toast } from "react-toastify";
const NEW_HOST = "http://localhost:8080";
export function* getAdmin({ values }) {
  const token = localStorage.getItem("token");
  const data = yield fetch(`${NEW_HOST}/admin/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(values),
  })
    .then((res) => {
      return res.json();
    })
    .catch((error) => {
      throw error;
    });
  if (data.status) {
    localStorage.token = data.token;
    localStorage.user = data.id;
    localStorage.user_type = data.user_type;
    toast.success(data.message);
    values.callback();
  } else {
    toast.error(data.message);
  }

  yield put({ type: "GOT_ADMIN", data });
}

export function* resetPassword({ cred }) {
  let data = yield fetch(`${NEW_HOST}/resetPassword`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(cred),
  }).then((res) => res.json());
  if (data.status) {
    toast.success(data.message);
    cred.callback();
  } else {
    toast.error(data.message);
  }
}

export function* forgetpassword({ values }) {
  const token = localStorage.getItem("token");
  let data = yield fetch(`${NEW_HOST}/forgotPassword`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer" + " " + token,
    },
    body: JSON.stringify({ email: values.email }),
  }).then((res) => res.json());
  if (data.status) {
    toast.success(data.message);
  }

  yield put({ type: "FORGOT_PASS", data });
}

export function* getALlUsers() {
  const token = localStorage.getItem("token");
  let data = yield fetch(`${NEW_HOST}/admin/auth/getuser`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer" + " " + token,
    },
  }).then((res) => res.json());
  yield put({ type: "SAVE_ALL_USERS", data });
}

export function* getUser({ value }) {
  const token = localStorage.getItem("token");
  let data = yield fetch(`${NEW_HOST}/auth/transaction`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer" + " " + token,
    },
  }).then((res) => res.json());
  yield put({ type: "SAVE_USER", data });
}

export function* gettransactionUsers({ value }) {
  const token = localStorage.getItem("token");
  let data = yield fetch(`${NEW_HOST}/admin/auth/transaction?id=${value}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer" + " " + token,
    },
  }).then((res) => res.json());
  yield put({ type: "SAVE_ALL_TRANSACTIONS", data });
}

export function* updateTransaction({ values }) {
  const token = localStorage.getItem("token");

  let data = yield fetch(`${NEW_HOST}/admin/auth/transaction`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer" + " " + token,
    },
    body: JSON.stringify(values),
  }).then((res) => res.json());

  if (data.status === true) {
    toast.success(data.message);
  } else if (data.status === false) {
    toast.success(data.message);
  }
  yield put({ type: "UPDATE_TRANSACTION", data });
}

export function* createTransaction({ values }) {
  const token = localStorage.getItem("token");

  let data = yield fetch(`${NEW_HOST}/admin/auth/createtransaction`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer" + " " + token,
    },
    body: JSON.stringify(values),
  }).then((res) => res.json());

  if (data.status === true) {
    toast.success(data.message);
  } else if (data.status === false) {
    toast.success(data.message);
  }
  // yield put({ type: "SAVE_ALL_TRANSACTIONS", data });
}

export function* getNotification() {
  const token = localStorage.getItem("token");
  let data = yield fetch(`${NEW_HOST}/admin/auth/getnotification`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer" + " " + token,
    },
  }).then((res) => res.json());

  yield put({ type: "GOT_NOTIFICATION", data });
}

export function* getNewTransaction() {
  const token = localStorage.getItem("token");
  let data = yield fetch(`${NEW_HOST}/admin/auth/getnewtransaction`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer" + " " + token,
    },
  }).then((res) => res.json());
  yield put({ type: "GET_NEW_TRANSACTIONS", data });
}
