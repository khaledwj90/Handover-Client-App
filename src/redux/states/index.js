// @flow

import {combineReducers} from 'redux';
import {CLEAR_REDUCER} from '../actions/clearRedcuers';
import Toast from './toasts';
import UserDetails from "./userDetails";
import LoginStatus from "./loginStatus";
import type {
    DriverLocationType,
    LoginStatusType,
    TabShowingStatusType,
    UserDetailsType
} from "../types";
import TabShowingStatus from "./tabShowingStatus";
import type {ToastType} from "./toasts";
import DriverLocation from "./driverLocation";


export type ReducerTypes = {
    Toast: ToastType,
    UserDetails: UserDetailsType,
    LoginStatus: LoginStatusType,
    TabShowingStatus: TabShowingStatusType,
    DriverLocation: DriverLocationType
}

const appReducer: ReducerTypes = combineReducers({
    Toast: Toast,
    UserDetails: UserDetails,
    LoginStatus: LoginStatus,
    TabShowingStatus: TabShowingStatus,
    DriverLocation: DriverLocation
});

const RootReducer = (state, action) => {
    if (action.type === CLEAR_REDUCER) {
        state = undefined;
    }
    return appReducer(state, action);
};


export default RootReducer;
