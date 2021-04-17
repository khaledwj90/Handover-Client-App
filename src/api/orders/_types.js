// @flow


import type {APIResponseType} from "../_types";

export interface OrdersInterface {
    createOrder(req: CreateOrderReqType): Promise<{ body: CreateOrderResType } & APIResponseType>;

    getOrder(req: GetOrderReqType): Promise<{ body: GetOrderResType } & APIResponseType>;

}

export type CreateOrderReqType = {
    pickupLocation: { lat: number, lng: number },
    deliveryLocation: { lat: number, lng: number },
}

export type CreateOrderResType = {}


export type GetOrderReqType = {}

export type GetOrderResType = {}
