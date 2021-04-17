import {SET_DRIVER_LOCATION_ACTION} from "../actions/setDriverLocation";


function DriverLocation(state = null, action) {
    if (action.type === SET_DRIVER_LOCATION_ACTION) {
        return (action.payload);
    }
    return state;

}

export default DriverLocation
