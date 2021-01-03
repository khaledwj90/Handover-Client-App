// @flow
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React from 'react';
import axios from 'axios';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import Reducers from './src/redux/states';
import MainRoutes from './src/routes';
import {ActivityIndicator} from './src/components/ActivityIndicator';
import Text from './src/components/Text';


export const RootReducer = createStore(Reducers);

type StatesTypes = {
    isLoggedIn: null | boolean,
    loadedLang: boolean,
}

class App extends React.Component<{}, StatesTypes> {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: null,
            loadedLang: false,
        };

        axios.interceptors.request.use(request => {
            console.log('Starting Request', JSON.stringify(request));
            return request;
        });

        axios.interceptors.response.use(response => {
            console.log('Response:', response);
            return response;
        });

    }


    async componentDidMount(): * {

    }


    render() {
        const {isLoggedIn} = this.state;
        if (this.state.loadedLang === false) {
            return <ActivityIndicator/>;
        }
        return (
            <Provider store={RootReducer}>
                    <MainRoutes/>
            </Provider>
        );
    }
};


export default App;
