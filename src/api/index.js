// @flow

import Constants from './constants';
import type {ConstantsInterface} from './constants.flow';
import API_Setup from './_setup';
import Authentication from './authentication';
import type {APIInterface} from './_types';
import Tracking from "./tracking";
import Orders from "./orders";


class API_Class extends API_Setup {
    Constants: ConstantsInterface;

    constructor(i18n: any) {
        super();
        this.Constants = new Constants(i18n);
        this.Calls = {
            Authentication: new Authentication(this.callAPI),
            Tracking: new Tracking(this.callAPI),
            Orders: new Orders(this.callAPI),
        };
    }
}

const API: APIInterface = new API_Class();
export default API
