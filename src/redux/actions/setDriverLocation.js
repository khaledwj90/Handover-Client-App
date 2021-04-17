import type {LoginStatusType} from "../types";

export const SET_DRIVER_LOCATION_ACTION = 'SET-DRIVER-LOCATION-ACTION';

export function SetDriverLocation(details: { orderId: string, lat: number, lng: number }) {
    return ({type: SET_DRIVER_LOCATION_ACTION, payload: details});
}

