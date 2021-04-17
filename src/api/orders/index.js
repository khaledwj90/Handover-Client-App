// @flow

import Authentication_Mapping from './_mapping';
import type {
    LoginReqType,
    LogoutReqType,
    ChangePasswordReqType,
    SetFCMTokenReqType,
    UpdateDriverLocationReqType, CreateOrderReqType, GetOrderResType, GetOrderReqType, GetOrderDetailsReqType
} from './_types';
import axios from "axios";
import Tracking_Mapping from "./_mapping";


const msgRqHdr = {}

class Orders extends Tracking_Mapping {
    callAPI: any;

    constructor(callAPI: any) {
        super();
        this.callAPI = callAPI;
    }

    async createOrder(req: CreateOrderReqType): * {
        const FUNCTION_URL = 'orders/create-order';
        const requestData = this.createOrderReq(req);
        try {
            const response = await this.callAPI('post', FUNCTION_URL, requestData, msgRqHdr);

            return Promise.resolve(this.createOrderRes(response));
        } catch (e) {
            return Promise.reject(e);
        }
    }

    async getOrder(req: GetOrderReqType): * {
        const FUNCTION_URL = 'orders/get-orders-list';
        const requestData = this.getOrderReq(req);
        try {
            const response = await this.callAPI('get', FUNCTION_URL, requestData, msgRqHdr);

            return Promise.resolve(this.getOrderRes(response));
        } catch (e) {
            return Promise.reject(e);
        }
    }

    async getOrderDetails(req: GetOrderDetailsReqType): * {
        const FUNCTION_URL = 'orders/get-order-details';
        const requestData = this.getOrderDetailsReq(req);
        try {
            const response = await this.callAPI('get', FUNCTION_URL, {}, msgRqHdr,requestData);

            return Promise.resolve(this.getOrderDetailsRes(response));
        } catch (e) {
            return Promise.reject(e);
        }
    }

}


export default Orders;
