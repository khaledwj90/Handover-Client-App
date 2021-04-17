// @flow


import type {APIResponseType} from "../_types";

export interface AuthenticationInterface {
    login(req: LoginReqType): Promise<{ body: LoginResType } & APIResponseType>;

}

export type LoginReqType = {
    email: string,
    password: string,
    type: string,
}

export type LoginResType = {
    token: string,
}
