// @flow

import type {CreateOrderReqType, GetOrderDetailsReqType, GetOrderReqType, UpdateOrderStatusReqType} from './_types';
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


    getOrderReq(req: GetOrderReqType) {
        return ({});
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
                subTitle: order._id,
                status: order.status
            }))
        };
    }

    getOrderDetailsReq(req: GetOrderDetailsReqType) {
        return ({
            orderId: req.orderId
        });
    }

    getOrderDetailsRes(res) {
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
            body: {
                _id: body.data._id,
                driverId: body.data.driverId,
                status: body.data.status,
                deliveryStatus: body.data.deliveryStatus,
                pickupLocation: body.data.pickupLocation,
                deliveryLocation: body.data.deliveryLocation,
                lastPosition: body.data.lastPosition,
                pickupTimestamp: body.data.pickupTimestamp,
                deliveryTimestamp: body.data.deliveryTimestamp,
            }
        };
    }


    updateOrderStatusReq(req: UpdateOrderStatusReqType) {
        return ({
            orderId: req.orderId,
            status: req.status
        });
    }

    updateOrderStatusRes(res) {
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

export default Orders_Mapping;
