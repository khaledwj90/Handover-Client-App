// @flow

import type {CreateOrderReqType, LoginReqType, SetFCMTokenReqType, UpdateDriverLocationReqType} from './_types';
import Constants from "../constants";
import API from "../index";

class Orders_Mapping {
    constructor() {
    }

    createOrderReq(req: CreateOrderReqType) {
        return ({
            pickupLocation: req.pickupLocation,
            deliveryLocation: req.deliveryLocation
        });
    }

    createOrderRes(res) {
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


    getOrderReq(req: CreateOrderReqType) {
        return ({
            pickupLocation: req.pickupLocation,
            deliveryLocation: req.deliveryLocation
        });
    }

    getOrderRes(res) {
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
            body: body.data.map((order, index) => ({
                id: order._id,
                title: `Order ${index + 1}`,
                subTitle: `${order?.deliveryLocation?.lat || 0} - ${order?.deliveryLocation?.lng || 0}`,
                status: order.status
            }))
        };
    }


}

export default Orders_Mapping;
