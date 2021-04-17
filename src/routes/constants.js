// @flow

class Constants {
    PUBLIC_ROUTES = {
        LOGIN: 'LOGIN',
        FORGOT_PASS: 'FORGOT_PASS',
        REGISTRATION: 'REGISTRATION',
    };
    PRIVATE_ROUTES = {
        ORDERS: 'ORDERS',
        ADD_ORDER: 'ADD-ORDER',
        TRACK_ORDER: 'TRACK-ORDER',
    };
}


const RouteConstants = new Constants();
export default RouteConstants;
