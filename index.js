/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {gestureHandlerRootHOC} from 'react-native-gesture-handler';
import messaging from "@react-native-firebase/messaging";
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import AsyncStorage from '@react-native-community/async-storage';
import PushNotification from 'react-native-push-notification';
import App from './App';
import {name as appName} from './app.json';


// messaging().setBackgroundMessageHandler(async (remoteMessage) => {
//     console.log('------>BACKGROUND: ', remoteMessage)
// })

PushNotification.configure({

    // IOS ONLY (optional): default: all - Permissions to register.
    permissions: {
        alert: true,
        badge: true,
        sound: true,
    },

    // (required) Called when a remote is received or opened, or local notification is opened
    onNotification: function (notification) {
        //check if the applicatin on the frontground, if yes then we are going to show local notification
        console.log('INSIDE: ', notification);

        // (required) Called when a remote is received or opened, or local notification is opened
        notification.finish(PushNotificationIOS.FetchResult.NoData);
    },


    // Should the initial notification be popped automatically
    // default: true
    popInitialNotification: true,
    requestPermissions: true,
});


AppRegistry.registerComponent(appName, () => gestureHandlerRootHOC(App));
