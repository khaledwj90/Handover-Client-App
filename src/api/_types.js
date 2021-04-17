// @flow


import type {ConstantsInterface} from './constants.flow';
import type {AuthenticationInterface} from './authentication/_types';
import type {ProfileInterface} from './profile/_types';
import type {TestsCategoriesInterface} from "./Tests/_types";
import type {TrackingInterface} from "./tracking/_types";
import type {OrdersInterface} from "./orders/_types";

export interface APIInterface {
    Constants: ConstantsInterface;
    Calls: {
        Authentication: AuthenticationInterface,
        Tracking: TrackingInterface
        Orders: OrdersInterface
    }
}


export type APIHeaderType = {
    jwt_token: string
}

export type APIResponseHeaderType = {}

export type APIResponseType = {
    withError: boolean,
    errorCode?: string,
    httpStatus?: string,
    body: null | any
}

