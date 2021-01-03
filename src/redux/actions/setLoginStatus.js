import type {LoginStatusType} from "../types";

export const SET_LOGIN_STATUS_ACTION = 'set-login-status-action';

/**
 * Based on login status we will take decision what we have to show for the customer.
 * null - app still loading - we don't know the status yet - show loader
 */
export function SetLoginStatus(status: LoginStatusType) {
    return ({type: SET_LOGIN_STATUS_ACTION, payload: status});
}

