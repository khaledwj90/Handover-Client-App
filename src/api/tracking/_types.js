// @flow


import type {APIResponseType} from "../_types";

export interface TrackingInterface {
    setFCMToken(req: SetFCMTokenReqType): Promise<{ body: SetFCMTokenResType } & APIResponseType>;

    updateDriverLocation(req: UpdateDriverLocationReqType): Promise<{ body: UpdateDriverLocationResType } & APIResponseType>;

}

export type SetFCMTokenReqType = {
    token: string
}

export type SetFCMTokenResType = {}

export type UpdateDriverLocationReqType = {
    lat: number,
    long: number,
    orderId: string,
}
export type UpdateDriverLocationResType = {}
