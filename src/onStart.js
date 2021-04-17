// @flow
import * as React from 'react';
import type {ReducerTypes} from "./redux/states";
import {useDispatch, useSelector} from "react-redux";
import {Splashscreen} from "./components/Splashscreen";
import {SetLoginStatus} from "./redux/actions/setLoginStatus";
import Util from "./util";
import messaging from "@react-native-firebase/messaging";
import axios from "axios";
import API from "./api";


type Props = {};
const OnStart = (props: Props) => {
    const reduxState: ReducerTypes = useSelector(state => state);
    const dispatch = useDispatch();

    React.useEffect(() => {
        checkFCMPermission();
        setLoginToken();
    }, []);


    const checkFCMPermission = async () => {
        Util.Functions.CheckNotificationPermission(true)
            .then(({enabled, isFirstTime}) => {
                if (enabled === true) {
                    console.log('NOTIFICATION PERSMISSION ENABLED');
                    messaging().onMessage((message) => {
                        if (message.notification) {
                            const title = message.notification.title;
                            const body = message.notification.body;
                            Util.Functions.LocalNotification({title: title, message: body, payload: message.data});
                        }
                    })
                } else {
                    console.log('NOTIFICATION PERSMISSION DISABLED');
                }
            })
            .catch(e => {
                console.log(e);
            });
    }

    const setLoginToken = async () => {
        const jwtToken = await Util.Functions.GetValueFromAsyncStorage(Util.Constants.LOCAL_STORAGE.JWT_TOKEN);
        if (jwtToken) {
            axios.defaults.headers.common["Authorization"] = `Bearer ${jwtToken}`;
            try {
                const fcmToken = await Util.Functions.GetFCMToken();
                await API.Calls.Tracking.setFCMToken({token: fcmToken});
            } catch (e) {
                //do nothing
            }
            dispatch(SetLoginStatus(Util.Constants.LOGIN_STATUS.LOGGED_IN));
        } else {
            dispatch(SetLoginStatus(Util.Constants.LOGIN_STATUS.NOT_LOGGED_IN));
        }
    }


    const setupAPI = () => {
        // CashierioHelper.Setup.setAPI_URL('http://192.168.100.48:4001');
        // axios.defaults.headers.common["chanelid"] = 'pos-app';
        // axios.defaults.headers.common["deviceid"] = getUniqueId();
        // axios.defaults.headers.common["lang"] = "en";
        // axios.defaults.headers.common["OSinfo"] = `${Platform.OS}|${Platform.Version}`;
    }

    if (reduxState.LoginStatus !== null) {
        return (props.children);
    } else {
        return (<Splashscreen/>)
    }
};

export default OnStart
