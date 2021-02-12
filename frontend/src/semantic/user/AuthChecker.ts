import axios from "axios";
import {useDispatch} from "react-redux";
import {
    deleteToken,
    deleteUID,
    loginStatus,
    saveToken,
    saveUserinfo,
    UserInfoType
} from "../../redux/reducer/userActions";

const AuthChecker = () => {
    const dispatcher = useDispatch();

    if(!sessionStorage.getItem("token")) return;
    const uid = (sessionStorage.getItem("uid") ? sessionStorage.getItem("uid") : null);
    const token = (sessionStorage.getItem("token") ? sessionStorage.getItem("token") : null);

    console.log(`AUTHORIZING ${uid} and ${token}`);

    axios.post("http://localhost:8080/user/isAuth", {username : uid}, {
        headers : {
            Authorization : "Bearer " + token
        }
    })
        .then(res => {
            const data = res.data as UserInfoType;
            console.log(`JWT AUTHORIZED SUCCESSFULLY : ${res.data}`);
            dispatcher(loginStatus(true));
            dispatcher(saveUserinfo(data));
        })
        .catch(res => {
            alert(`JWT 인증 실패 ${res}`);
            dispatcher(deleteToken());
            dispatcher(deleteUID());
            dispatcher(loginStatus(false));
            sessionStorage.removeItem("uid");
            sessionStorage.removeItem("token");
            window.location.reload();
        });
}

export default AuthChecker;