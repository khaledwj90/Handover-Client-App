// @flow


import type {APIResponseType} from "../_types";

export interface OrdersInterface {
    createOrder(req: CreateOrderReqType): Promise<{ body: CreateOrderResType } & APIResponseType>;

    getOrder(req: GetOrderReqType): Promise<{ body: GetOrderResType } & APIResponseType>;

    getOrderDetails(req: GetOrderDetailsReqType): Promise<{ body: GetOrderDetailsResType } & APIResponseType>;

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
    deliveryStatus: string,
    pickupLocation: { lat: number, lng: number },
    deliveryLocation: { lat: number, lng: number },
    lastPosition: { lat: number, lng: number }
}
