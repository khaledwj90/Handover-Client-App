// @flow


import {getUniqueId, getVersion} from 'react-native-device-info';
import {Platform} from 'react-native';
import type {APIHeaderType, APIResponseHeaderType} from './_types';
import axios from 'axios';
import Constants from './constants';

class API_Setup {

    API_URL: string;
    headerData: APIHeaderType = {};

    constructor() {
        this.API_URL = Constants.API_URL
        this.callAPI = this.callAPI.bind(this);
    }

    /**
     * Used to generate API header
     * @param data
     */
    generateAPIHeader(header?: Object) {
        const newHeader = {
            // 'X-Content-Type': 'application/json;charset=UTF-8',
            // 'X-Device-Token': this.headerData.deviceToken,
            // 'X-Device-Id': getUniqueId(),
        };
        //update previous header if there is any update
        return (newHeader);
    };

    setHeaderData(data: APIHeaderType) {
        this.headerData = {...this.headerData, ...data};
    }

    /**
     * clear header data. using when forgot device
     */
    clearHeaderData() {
        this.headerData = {};
    }


    /**
     * used to extract values from the response header. so we can pass it back to the body
     * @param header
     * @returns {{}|{securityToken: *, otpToken: *, forceUpdate: *, sessionId: *, deviceToken: *}}
     */
    getValuesFromHeader(header: any): APIResponseHeaderType {
        if (header) {
            return ({
                // deviceToken: header['X-Device-Token'.toLowerCase()],
                // refreshDeviceToken: header['X-Refresh-Device-Token'.toLowerCase()],
            });
        } else {
            return ({});
        }
    }

    getErrorCodeFromCatch(e): * {
        if (e && e.response && e.response.data && e.response.data.status) {
            return ({
                withError: true,
                httpStatus: e.response.status,
                errorCode: e.response.data?.status,
            });
        } else {
            return e;
        }

    }


    async callAPI(type: 'post' | 'put' | 'get', apiURL: string, body: any = {}, header: APIHeaderType = {}, params: any = {}, config: any = {}) {
        let request;
        console.log('--->', this.API_URL);
        switch (type) {
            case 'post':
                request = axios.post(`${this.API_URL}/${apiURL}`, body,
                    {
                        params: {...params},
                        ...config,
                    },
                );
                break;
            case 'put':
                request = axios.put(`${this.API_URL}/${apiURL}`, body,
                    {
                        params: {...params},
                        ...config,
                    },
                );
                break;
            case 'get':
                request = axios.get(`${this.API_URL}/${apiURL}`,
                    {
                        params: {...params},
                        ...config,
                    },
                );
                break;
        }
        return new Promise<{}>((resolve, reject) => {
            request.then((response) => {
                if (!response || !response.data) {
                    reject({
                        withError: true,
                        errorCode: 'API Connection Issue',
                    });
                    return;
                }
                resolve(response.data);
            }, (e) => {
                reject(this.getErrorCodeFromCatch(e));
            });
        });
    };

}

export default API_Setup;
