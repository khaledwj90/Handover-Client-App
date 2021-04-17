// @flow
export const SET_TAB_SHOWING_STATUS_ACTION = 'set-tab-showing-status';

export const SetTabShowingStatus = (isShowing: boolean): { type: string, payload: any } => {
    return ({type: SET_TAB_SHOWING_STATUS_ACTION, payload: isShowing});
};

