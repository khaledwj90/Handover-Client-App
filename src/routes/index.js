// @flow

import * as React from 'react';
import {Platform} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import PublicNavigation from './public';
import {NavigationContainer} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import PrivateNavigation from './private';
import {Splashscreen} from '../components/Splashscreen';
import Util from '../util';
import RouteConstants from './constants';


const MainRoutes = (props) => {
    const {LoginStatus} = useSelector((state) => state);
    const dispatch = useDispatch();

    const initialRoute = (loginStat) => {
        if (loginStat === Util.Constants.LOGIN_STATUS.LOGGED_IN) {
            return RouteConstants.PRIVATE_ROUTES.DASHBOARD;
        } else {
            return RouteConstants.PUBLIC_ROUTES.LOGIN;
        }
    };

    if (LoginStatus === null) {
        return <Splashscreen/>;
    } else {
        return (
            <NavigationContainer>
                {
                    LoginStatus === Util.Constants.LOGIN_STATUS.LOGGED_IN ? <PrivateNavigation tab={'drawer'}/>
                        : <PublicNavigation initialRouteName={initialRoute(LoginStatus)}/>
                }
            </NavigationContainer>
        );
    }
};

export default MainRoutes;
