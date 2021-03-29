import axios from "axios";
import {useDispatch} from "react-redux";
import {deleteToken, deleteUID, loginStatus, saveUserinfo, UserInfoType} from "../../redux/reducer/userActions";

const AuthChecker = async () => {
    const dispatcher = useDispatch();

    if(!sessionStorage.getItem("token")) return;
    // dispatcher(setLoadingRedirect(true));
    const uid = (sessionStorage.getItem("uid") ? sessionStorage.getItem("uid") : null);
    const token = (sessionStorage.getItem("token") ? sessionStorage.getItem("token") : null);
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    // console.log(`AUTHORIZING ${uid} and ${token}`);

    await axios.post("/user/isAuth", {username : uid}, {
        headers : {
            Authorization : "Bearer " + token
        }
    })
        .then(res => {
            const data = res.data as UserInfoType;
            console.log(`JWT_AUTHORIZED_SUCCESSFULLY`);
            dispatcher(loginStatus(true));
            dispatcher(saveUserinfo(data));

            window.onstorage = (e : StorageEvent) => {
                if(e.oldValue !== e.newValue) {
                    alert("임의로 수정 할 수 없습니다.");
                    sessionStorage.removeItem("token");
                    sessionStorage.removeItem("uid");
                    window.location.reload();
                }
            }

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