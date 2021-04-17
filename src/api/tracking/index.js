// @flow

import Authentication_Mapping from './_mapping';
import type {
    LoginReqType,
    LogoutReqType,
    ChangePasswordReqType,
    SetFCMTokenReqType,
    UpdateDriverLocationReqType
} from './_types';
import axios from "axios";
import Tracking_Mapping from "./_mapping";


const msgRqHdr = {}

class Tracking extends Tracking_Mapping {
    callAPI: any;

    constructor(callAPI: any) {
        super();
        this.callAPI = callAPI;
    }

    async setFCMToken(req: SetFCMTokenReqType): * {
        const FUNCTION_URL = 'tracking/set-user-fcm-token';

        const requestData = this.setFCMTokenReqMapping(req);
        try {
            const response = await this.callAPI('post', FUNCTION_URL, requestData, msgRqHdr);

            return Promise.resolve(this.setFCMTokenResMapping(response));
        } catch (e) {
            return Promise.reject(e);
        }
    }

    async updateDriverLocation(req: UpdateDriverLocationReqType): * {
        const FUNCTION_URL = 'tracking/update-driver-location';

        const requestData = this.updateDriverLocationReqType(req);
        try {
            const response = await this.callAPI('post', FUNCTION_URL, requestData, msgRqHdr);

            return Promise.resolve(this.updateDriverLocationResType(response));
        } catch (e) {
            return Promise.reject(e);
        }
    }

}


export default Tracking;
