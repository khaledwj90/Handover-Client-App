// @flow
import Env from '../../env';

class Constants {
    constructor(i18n): * {
    }

    static API_URL = Env.API_URL;

    HTTP_STATUSES: * = {
        HTTP_UNAUTHORIZED_CODE: '401',
        HTTP_SUCCESS_CODE: '200',
        HTTP_BADREQUEST_CODE: '400',
        HTTP_SERVER_ERROR_CODE: '500',
        HTTP_NOT_FOUND: '404',
        HTTP_CONNECTION_FAILED: 'connection-failed',
    };

    RESPONSE_STATUS: * = {
        SUCCESS: '000',
        FAILED: '111',
        EMAIL_TAKEN: '001',
    }


}

export default Constants;
