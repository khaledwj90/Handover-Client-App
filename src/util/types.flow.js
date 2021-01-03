// @flow

export interface UtilInterface {
    Constants: ConstantInterface,
    Functions: FunctionsInterface
}

export interface FunctionsInterface {
    FontSize(size: number): number;

    GetDeviceDimensions(): { width: number, height: number };

    HexToRgb(hex: string): string | null;

    MoneyFormat(amount: ?number, decimalCount: number, decimal: string, thousands: string): string
}

export interface ConstantInterface {
    LOGIN_STATUS: {
        LOGGED_IN: string
    }
}
