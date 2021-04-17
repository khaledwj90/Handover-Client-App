// @flow

import Authentication_Mapping from './_mapping';
import type {LoginReqType, LogoutReqType, ChangePasswordReqType} from './_types';
import axios from "axios";


const msgRqHdr = {}

class Authentication extends Authentication_Mapping {
    callAPI: any;

    constructor(callAPI: any) {
        super();
        this.callAPI = callAPI;
    }

    async login(req: LoginReqType): * {
        const FUNCTION_URL = 'authentication/login';

        const requestData = this.loginReqMapping(req);
        try {
            const response = await this.callAPI('post', FUNCTION_URL, requestData, msgRqHdr);

            return Promise.resolve(this.loginResMapping(response));
        } catch (e) {
            return Promise.reject(e);
        }
    }

}


export default Authentication;
