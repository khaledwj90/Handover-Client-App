// @flow

class Constants {
    LOGIN_STATUS = {
        DEVICE_REGISTERED: 'DEVICE_REGISTERED',
        LOGGED_IN: 'LOGGED_IN',
        NOT_LOGGED_IN: 'NOT_LOGGED_IN'
    };

    ORDER_STATUS = {
        DELIVERED: 'DELIVERED',
        IN_PROGRESS: 'IN-PROGRESS',
        CANCELED: 'CANCELED',
    }

    LOCAL_STORAGE = {
        JWT_TOKEN: 'JWT-TOKEN',
    }
}

export default Constants;
