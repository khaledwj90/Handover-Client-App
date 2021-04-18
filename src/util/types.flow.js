// @flow

export interface UtilInterface {
    Constants: ConstantInterface,
    Functions: FunctionsInterface
}

export interface FunctionsInterface {
    FontSize(size: number): number;

    GetDeviceDimensions(): { width: number, height: number };

    HexToRgb(hex: string): string | null;

    MoneyFormat(amount: ?number, decimalCount: number, decimal: string, thousands: string): string;

    AnimateView(animationType: 'easeInEaseOut' | 'spring'): void;

    CheckNotificationPermission(askForPermission: boolean): Promise<{ enabled: boolean, isFirstTime: boolean }>;

    LocalNotification(data: { id: string, title: string, message: string, payload: Object }): void;

    GetFCMToken(): Promise<string>;

    GetValueFromAsyncStorage(key: string): Promise<string>;

    SetValueToAsyncStorage(key: string, value): Promise<void>;

    ClearAsyncStorage(): Promise<void>,

    DateTimeFormat(string, withTime: boolean, isRelative: boolean, lng: 'en' | 'ar'): string,
}

export interface ConstantInterface {
    LOGIN_STATUS: {
        DEVICE_REGISTERED: string,
        LOGGED_IN: string,
        NOT_LOGGED_IN: string
    };

    ORDER_STATUS: {
        DELIVERED: string,
        COMPLETED: string,
        IN_PROGRESS: string,
        CANCELED: string,
    };

    LOCAL_STORAGE: {
        JWT_TOKEN: 'JWT-TOKEN',
    };

    DELIVERY_STATUS: {
        ON_WAY: string,
        PACKAGE_NEAR_PICKUP: string,
        PACKAGE_PICKED_UP: string,
        NEAR_DELIVERY_DESTINATION: string,
        DELIVERED: string,
    };

    PUSH_NOTIFICATION_EVENT: {
        DRIVER_LOCATION_UPDATE: string,
        DRIVER_NEAR_PICKUP_LOCATION: string,
        DRIVER_NEAR_DELIVERY_LOCATION: string,
        DRIVER_ARRIVED_TO_PICKUP_LOCATION: string,
        DRIVER_ARRIVED_TO_DELIVERY_LOCATION: string,
        DRIVER_PICKEDUP_PACKAGE: string,
        DRIVER_DELIVERED_PACKAGE: string
    };
}
