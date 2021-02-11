import axios from "axios";
import {useDispatch} from "react-redux";
import {deleteToken, deleteUID, loginStatus, saveToken} from "../../redux/reducer/userActions";

const AuthChecker = () => {
    const dispatcher = useDispatch();

    if(!sessionStorage.getItem("token")) return;
    const uid = (sessionStorage.getItem("uid") ? sessionStorage.getItem("uid") : null);
    const token = (sessionStorage.getItem("token") ? sessionStorage.getItem("token") : null);

    axios.post("http://localhost:8080/user/isAuth", {username : uid}, {
        headers : {
            Authorization : "Bearer " + token
        }
    })
        .then(res => {
            console.log("JWT AUTHORIZED SUCCESSFULLY");
            dispatcher(saveToken(res.data));
            dispatcher(loginStatus(true));
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