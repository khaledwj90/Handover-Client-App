// @flow

import type {LoginReqType} from './_types';
import API from "../index";

class Authentication_Mapping {
    constructor() {
    }

    loginReqMapping(req: LoginReqType) {
        return ({
            email: req.email,
            password: req.password,
            type: req.type
        });
    }

    loginResMapping(res) {
        const body = res.data;
        const status = res.status;
        if (status !== API.Constants.RESPONSE_STATUS.SUCCESS) {
            return ({
                withError: true,
                errorCode: status,
                httpStatus: API.Constants.HTTP_STATUSES.HTTP_SUCCESS_CODE,
                body: null
            })
        }
        return {
            withError: false,
            body: {
                token: body.token
            }
        };
    }

}

export default Authentication_Mapping;
