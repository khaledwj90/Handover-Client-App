// @flow
import * as React from 'react';
import {TouchableOpacity, View, AppState} from 'react-native';
import MapContainer from "../../components/Map";
import {useDispatch, useSelector} from "react-redux";
import style from './index.style';
import {SetTabShowingStatus} from "../../redux/actions/setTabShowingStatus";
import Icon from "../../components/Icons";
import Theme from "../../App.style";
import PageContainer from "../../components/PageContainer";
import Button_Icon from "../../components/Button.icon";
import ProgressDetails from "./progressDetails";
import API from "../../api";
import {SetToast} from "../../redux/actions/setToast";
import type {GetOrderDetailsResType} from "../../api/orders/_types";
import type {ReducerTypes} from "../../redux/states";
import Util from "../../util";


type Props = {
    route: {
        params: {
            orderId: string,
        }
    }
};

export const Tracking_OrderDetailsContext = React.createContext(null);
const OrdersTracking = (props: Props) => {
    const dispatch = useDispatch();
    const reduxState: ReducerTypes = useSelector(state => state);
    const mapRef = React.useRef(null);
    const [currentLocation, setCurrentLocation] = React.useState(null);
    const [orderDetails, setOrderDetails] = React.useState<GetOrderDetailsResType>(null);
    const [driverLocation, setDriverLocation] = React.useState<{ lat: number, lng: number }>(null);

    React.useEffect(() => {
        dispatch(SetTabShowingStatus(false));
        getOrderDetails();

        //add event to check when the user go from background to foreground
        AppState.addEventListener('change', checkAppNewState);


        return (() => {
            dispatch(SetTabShowingStatus(true));
            AppState.removeEventListener('change', checkAppNewState);
        })
    }, []);


    React.useEffect(() => {
        //this will be called each time we got a push notification for driver location change
        if (reduxState.DriverLocation?.orderId && reduxState.DriverLocation.orderId === props.route.params.orderId) {
            setDriverLocation({lat: reduxState.DriverLocation.lat, lng: reduxState.DriverLocation.lng});
        }

        //check if the event is not "Location Change" then we have to get order details to get latest status
        if (reduxState.DriverLocation && (reduxState.DriverLocation.eventType !== Util.Constants.PUSH_NOTIFICATION_EVENT.DRIVER_LOCATION_UPDATE)) {
            getOrderDetails();
        }
    }, [reduxState.DriverLocation]);


    /**
     * Get mobile app new state. check when the mobile go from background to foreground
     * @param nextAppState
     */
    const checkAppNewState = (nextAppState) => {
        if (nextAppState === 'active') {
            getOrderDetails();
        }
    }

    const getOrderDetails = async () => {
        try {
            const response = await API.Calls.Orders.getOrderDetails({orderId: props.route.params.orderId})
            if (response.withError === true) {
                dispatch(SetToast('Not able to get order details', 'danger'));
                props.navigation.goBack();
                return;
            }
            setOrderDetails(response.body);
            console.log('BODY', response.body);
            if (response.body.lastPosition?.lat) {
                console.log('last: ', response.body.lastPosition);
                setDriverLocation(response.body.lastPosition);
            }
        } catch (e) {
            dispatch(SetToast('Not able to get order details', 'danger'));
            props.navigation.goBack();
        }
    }

    const getMapInitialPosition = () => {
        if (orderDetails?.lastPosition) {
            return orderDetails.lastPosition
        } else if (orderDetails?.pickupLocation) {
            return orderDetails.pickupLocation
        } else {
            return undefined
        }
    }

    const close = () => {
        props.navigation.goBack();
    }


    return (
        <PageContainer statusbarType={'light'}>
            <Button_Icon action={close} name={'Back'} fill={Theme.base_color_10} height={10} width={10}
                         style={style.backButton}/>
            <MapContainer ref={mapRef} updateLocation={setCurrentLocation}
                          initialLocation={getMapInitialPosition()}
                          markersList={orderDetails !== null ? [
                              {...orderDetails.pickupLocation, type: 'pickup'},
                              {...orderDetails.deliveryLocation, type: 'delivery'},
                              ...driverLocation !== null ? [{...driverLocation, type: 'driver'}] : [],
                          ] : []}/>
            <Tracking_OrderDetailsContext.Provider value={orderDetails}>
                <ProgressDetails/>
            </Tracking_OrderDetailsContext.Provider>
        </PageContainer>
    );
};

export default OrdersTracking
