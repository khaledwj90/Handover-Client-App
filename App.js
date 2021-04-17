// @flow
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import messaging from '@react-native-firebase/messaging';
import React from 'react';
import axios from 'axios';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import Reducers from './src/redux/states';
import MainRoutes from './src/routes';
import {ActivityIndicator} from './src/components/ActivityIndicator';
import i18n, {initializeLang} from './src/i18next/i18n';
import OnStart from "./src/onStart";
import CustomToast from "./src/components/CustomToast";


export const RootReducer = createStore(Reducers);

type StatesTypes = {
    isLoggedIn: null | boolean,
    loadedLang: boolean,
}

const App = () => {
    const [loadedLang, setLoadedLang] = React.useState(true);


    React.useEffect(() => {
        axios.interceptors.request.use(request => {
            console.log('Starting Request', JSON.stringify(request));
            return request;
        });

        axios.interceptors.response.use(response => {
            console.log('Response:', response);
            return response;
        });
        initializeLang('en');

    }, []);


    if (loadedLang === false) {
        return <ActivityIndicator/>;
    }
    return (
        <Provider store={RootReducer}>
            <CustomToast>
                <OnStart>
                    <MainRoutes/>
                </OnStart>
            </CustomToast>
        </Provider>
    );

};


export default App;
