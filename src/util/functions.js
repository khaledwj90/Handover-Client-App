import {Dimensions, PixelRatio, LayoutAnimation} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from "@react-native-community/async-storage";
import PushNotification from "react-native-push-notification";

class _Functions {
    FontSize(size: number) {
        const {
            width: SCREEN_WIDTH,
            height: SCREEN_HEIGHT,
        } = Dimensions.get('window');

// based on iphone 5s's scale
        const scale = SCREEN_WIDTH / 400;

        const newSize = (size + 10) * scale;
        if (Platform.OS === 'ios') {
            return Math.round(PixelRatio.roundToNearestPixel(newSize));
        } else {
            return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 0;
        }
    }

    GetDeviceDimensions(): any {
        const width = Dimensions.get('window').width;
        const height = Dimensions.get('window').height;
        return ({width, height});
    }

    HexToRgb(hex: string): string {
        // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
        var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
        hex = hex.replace(shorthandRegex, function (m, r, g, b) {
            return r + r + g + g + b + b;
        });

        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? `${parseInt(result[1], 16)},${parseInt(result[2], 16)},${parseInt(result[3], 16)}` : null;
    }

    MoneyFormat(amount: number, decimalCount: number = 2, decimal: string = '.', thousands: string = ','): string {
        try {
            decimalCount = Math.abs(decimalCount);
            decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

            const negativeSign = amount < 0 ? '-' : '';

            let i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString();
            let j = (i.length > 3) ? i.length % 3 : 0;

            return negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + thousands) + (decimalCount ? decimal + Math.abs(amount - i).toFixed(decimalCount).slice(2) : '');
        } catch (e) {
            return false;
        }
    };

    AnimateView(animationType: 'easeInEaseOut' | 'spring') {
        switch (animationType) {
            case 'easeInEaseOut':
                LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                break;
            case 'spring':
                LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
                break;
        }
    }


    async CheckNotificationPermission(askForPermission: boolean = false): Promise<{ enabled: boolean, isFirstTime: boolean }> {
        return new Promise(async (resolve) => {
            PushNotification.checkPermissions(async (permList) => {
                const isFirstTime = permList.authorizationStatus === 0;
                if (askForPermission === true) {
                    const authStatus = await messaging().requestPermission();
                    const enabled =
                        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
                        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

                    if (enabled) {
                        resolve({enabled: true, isFirstTime: isFirstTime});
                    } else {
                        resolve({enabled: false, isFirstTime: isFirstTime});
                    }
                } else {
                    PushNotification.checkPermissions((permList) => {
                        if (permList && permList.alert === true) {
                            const isFirstTime = permList.authorizationStatus === 0;
                            resolve({enabled: true, isFirstTime: isFirstTime});
                        } else {
                            resolve({enabled: false, isFirstTime: isFirstTime});
                        }
                    });
                }
            });

        });
    };

    LocalNotification(data: { title: string, message: string, payload: Object }) {
        PushNotification.localNotification({
            id: `${new Date().getMilliseconds().toString()}`,
            title: data.title,
            message: data.message,
            userInfo: data.payload,
        });
    }

    async GetFCMToken(): Promise<string> {
        try {
            const fcmToken = await messaging().getToken();
            return Promise.resolve(fcmToken);
        } catch (e) {
            return Promise.reject(e);
        }
    }

    async GetValueFromAsyncStorage(key: string) {
        const value = await AsyncStorage.getItem(key);
        return value;
    }

    async SetValueToAsyncStorage(key: string, value) {
        await AsyncStorage.setItem(key, value);
    }
}

export default _Functions;
