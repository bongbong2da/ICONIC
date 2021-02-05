import React, {useEffect} from "react";
import 'antd/dist/antd.css';
import {Main} from "./layout/Main";
import {createStore} from "redux";
import rootReducer from "./redux/rootReducer";
import {composeWithDevTools} from "redux-devtools-extension";
import {Provider} from "react-redux";
import AuthChecker from "./user/AuthChecker";


const App = () => {

    const store = createStore(rootReducer, composeWithDevTools());
    useEffect(() => {
    });

    return (
        <Provider store={store}>
            <Main/>
        </Provider>
    )
}

export default App;