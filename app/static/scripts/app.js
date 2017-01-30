import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, IndexRoute, hashHistory } from "react-router";
import { Provider } from "react-redux";
import './material.min';
import store from "./store"
import MainLayout from "./pages/MainLayout";
const app = document.getElementById("app");

ReactDOM.render(
    <Provider store={store}>
        <Router history={ hashHistory }>
            <Route path="/" component={MainLayout}>
            </Route>
        </Router>
    </Provider>
    ,app);
