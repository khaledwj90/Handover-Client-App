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

    SetValueToAsyncStorage(key: string, value): Promise<string>;
}

export interface ConstantInterface {
    LOGIN_STATUS: {
        DEVICE_REGISTERED: string,
        LOGGED_IN: string,
        NOT_LOGGED_IN: string
    };

    ORDER_STATUS: {
        DELIVERED: string,
        IN_PROGRESS: string,
        CANCELED: string,
    };

    LOCAL_STORAGE: {
        JWT_TOKEN: 'JWT-TOKEN',
    };
}
