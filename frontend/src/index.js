import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import App from "./App";
import {createStore} from "redux";
import {Provider} from "react-redux";
import rootReducer from "./redux/rootReducer";
import SignUp from "./semantic/user/SignUp";
import {composeWithDevTools} from "redux-devtools-extension";
import axios from "axios";

const composeEnhancers = composeWithDevTools({trace: true, traceLimit: 25 });
const store = createStore(rootReducer , composeEnhancers());

ReactDOM.render(
    <Provider store={store}>
        <App/>
        <SignUp/>
    </Provider>
    ,
    document.getElementById('root')
);

reportWebVitals();
