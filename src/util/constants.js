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
    };

    LOCAL_STORAGE = {
        JWT_TOKEN: 'JWT-TOKEN',
    };

    DELIVERY_STATUS: * = {
        ON_WAY: 'ON-WAY',
        PACKAGE_NEAR_PICKUP: 'PACKAGE-NEAR-PICKUP',
        PACKAGE_PICKED_UP: 'PACKAGE-PICKED-UP',
        NEAR_DELIVERY_DESTINATION: 'NEAR-DELIVERY-DESTINATION',
        DELIVERED: 'DELIVERED',
    };

    PUSH_NOTIFICATION_EVENT: * = {
        DRIVER_LOCATION_UPDATE: 'DRIVER-LOCATION-UPDATE',
        DRIVER_NEAR_PICKUP_LOCATION: 'DRIVER-NEAR-PICKUP-LOCATION',
        DRIVER_NEAR_DELIVERY_LOCATION: 'DRIVER-NEAR-DELIVERY-LOCATION',
        DRIVER_ARRIVED_TO_PICKUP_LOCATION: 'DRIVER-ARRIVED-TO-PICKUP-LOCATION',
        DRIVER_ARRIVED_TO_DELIVERY_LOCATION: 'DRIVER-ARRIVED-TO-DELIVERY-LOCATION',
        DRIVER_PICKEDUP_PACKAGE: 'DRIVER-PICKEDUP-PACKAGE',
        DRIVER_DELIVERED_PACKAGE: 'DRIVER-DELIVERED-PACKAGE',
    }
}

export default Constants;
