import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import App from "./App";
import {createStore} from "redux";
import {Provider} from "react-redux";
import rootReducer from "./redux/rootReducer";
import SignUp from "./semantic/user/SignUp";

const store = createStore(rootReducer);

ReactDOM.render(
    <Provider store={store}>
        <App/>
        <SignUp/>
    </Provider>
    ,
    document.getElementById('root')
);

reportWebVitals();
