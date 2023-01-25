/*!

=========================================================
* Material Dashboard React - v1.10.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

// core components
import Admin from "layouts/Admin.js";
import RTL from "layouts/RTL.js";
import Login from "./components/Login/Login"
import "assets/css/material-dashboard-react.css?v=1.10.0";
import appReducer from '../src/store';

require('dotenv').config()

import { Provider as StoreProvider } from 'react-redux';
import createSagaMiddleware from 'redux-saga'
import { createStore, applyMiddleware, compose } from 'redux';
import rootSaga from '../src/store/Saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import ForgetPassword from "components/ForgetPassword/ForgetPassword";
import ResetPassword from "components/ResetPassword/ResetPassword";
import { isLoggedIn } from "utils";
import UserProfile from "views/UserProfile/UserProfile";

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];
const enhancer = process.env.NODE_ENV === 'production'
  ? compose(applyMiddleware(...middlewares))
  : composeWithDevTools(
    applyMiddleware(...middlewares),
  );
const store = createStore(appReducer, enhancer);
store.sagaTask = sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <StoreProvider store={store}>

  <BrowserRouter>
    <Switch>
   
    <Route path="/login"> 
       <Login />
    </Route> 
    <Route path="/forget-password" component={ForgetPassword} />
    <Route exact path="/reset-password/:id/:otp" component={ResetPassword} />
  
      <Route path="/admin">{
       <Admin />
      } 
      </Route> 
      <Route path="/rtl" component={RTL} />
      <Redirect from="/" to="/admin/dashboard" />
    </Switch>
  </BrowserRouter>
  </StoreProvider>,
  document.getElementById("root")
);
