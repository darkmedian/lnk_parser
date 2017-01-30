import React from "react";
import {createStore, applyMiddleware} from "redux";
import logger from "redux-logger"
import promise from "redux-promise-middleware";
import reducer from "./reducers/"

const middleware = applyMiddleware(promise(), logger());
const store = window.store = createStore(reducer, middleware);
export default store;