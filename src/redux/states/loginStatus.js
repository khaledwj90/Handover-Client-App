import {SET_LOGIN_STATUS_ACTION} from "../actions/setLoginStatus";

function LoginStatus(state = null, action) {
    if (action.type === SET_LOGIN_STATUS_ACTION) {
        return (action.payload);
    }
    return state;

}

export default LoginStatus
