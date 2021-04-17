// @flow
import {SET_TAB_SHOWING_STATUS_ACTION} from "../actions/setTabShowingStatus";


const TabShowingStatus = (state = true, action) => {
    if (action.type === SET_TAB_SHOWING_STATUS_ACTION) {
        return action.payload;
    }
    return state
}

export default TabShowingStatus;
