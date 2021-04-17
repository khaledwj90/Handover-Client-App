// @flow

import type {LoginReqType, SetFCMTokenReqType, UpdateDriverLocationReqType} from './_types';
import Constants from "../constants";
import API from "../index";

class Tracking_Mapping {
    constructor() {
    }

    setFCMTokenReqMapping(req: SetFCMTokenReqType) {
        return ({
            token: req.token
        });
    }

    setFCMTokenResMapping(res) {
        const body = res;
        if (body.status !== API.Constants.RESPONSE_STATUS.SUCCESS) {
            return ({
                withError: true,
                errorCode: body.status,
                httpStatus: API.Constants.HTTP_STATUSES.HTTP_SUCCESS_CODE,
                body: null
            })
        }
        return {
            withError: false,
            body: {}
        };
    }


    updateDriverLocationReqType(req: UpdateDriverLocationReqType) {
        return ({
            lat: req.lat,
            long: req.long,
            orderId: req.orderId
        });
    }

    updateDriverLocationResType(res) {
        const body = res;
        if (body.status !== API.Constants.RESPONSE_STATUS.SUCCESS) {
            return ({
                withError: true,
                errorCode: body.status,
                httpStatus: API.Constants.HTTP_STATUSES.HTTP_SUCCESS_CODE,
                body: null
            })
        }
        return {
            withError: false,
            body: {}
        };
    }

}

export default Tracking_Mapping;
