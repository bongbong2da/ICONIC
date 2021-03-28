import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import App from "./App";
import {createStore} from "redux";
import {Provider} from "react-redux";
import rootReducer from "./redux/rootReducer";
import SignUp from "./semantic/user/SignUp";
import {composeWithDevTools} from "redux-devtools-extension";
import {BrowserRouter, Route} from "react-router-dom";
import express from "express";

const composeEnhancers = composeWithDevTools({trace: true, traceLimit: 25 });
const store = createStore(rootReducer , composeEnhancers());

const PORT = express.env.PORT || 5000;

ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
            <Route exact path={"/"} component={App}/>
            <Route path={"/signup"} component={SignUp}/>
        </Provider>
    </BrowserRouter>
    ,
    document.getElementById('root')
);

reportWebVitals();
