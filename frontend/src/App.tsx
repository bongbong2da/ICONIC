import React, {useEffect} from "react";
import 'semantic-ui-css/semantic.min.css';
import Main from "./semantic/layout/Main";
import SignIn from "./semantic/user/SignIn";
import AuthChecker from "./semantic/user/AuthChecker";

const App = () => {

    AuthChecker();
    useEffect(() => {
    },[]);

    return (
        <>
             <Main/>
             <SignIn/>
        </>
    )
}

export default App;