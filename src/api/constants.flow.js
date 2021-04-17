// @flow

export interface ConstantsInterface {
    API_URL: string
    RESPONSE_STATUS: {
        SUCCESS: string,
        FAILED: string,
        EMAIL_TAKEN: string,
    };
    HTTP_STATUSES: {
        HTTP_UNAUTHORIZED_CODE: string,
        HTTP_SUCCESS_CODE: string,
        HTTP_BADREQUEST_CODE: string,
        HTTP_SERVER_ERROR_CODE: string,
        HTTP_NOT_FOUND: string,
    };
}
