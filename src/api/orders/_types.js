// @flow


import type {APIResponseType} from "../_types";

export interface OrdersInterface {
    createOrder(req: CreateOrderReqType): Promise<{ body: CreateOrderResType } & APIResponseType>;

    getOrder(req: GetOrderReqType): Promise<{ body: GetOrderResType } & APIResponseType>;

    getOrderDetails(req: GetOrderDetailsReqType): Promise<{ body: GetOrderDetailsResType } & APIResponseType>;

    updateOrderStatus(req: UpdateOrderStatusReqType): Promise<{ body: UpdateOrderStatusResType } & APIResponseType>;

}

export type CreateOrderReqType = {
    pickupLocation: { lat: number, lng: number },
    deliveryLocation: { lat: number, lng: number },
}

export type CreateOrderResType = {}


export type GetOrderReqType = {}

export type GetOrderResType = {
    id: string,
    title: string,
    subTitle: string,
    status: string
}

export type GetOrderDetailsReqType = {
    orderId: string
}

export type GetOrderDetailsResType = {
    _id: string,
    driverId: string,
    status: string,
    deliveryStatus: string,
    pickupLocation: { lat: number, lng: number },
    deliveryLocation: { lat: number, lng: number },
    lastPosition: { lat: number, lng: number },
    pickupTimestamp: string,
    deliveryTimestamp: string,
}

export type UpdateOrderStatusReqType = {
    orderId: string,
    status: string
}

export type UpdateOrderStatusResType = {}
