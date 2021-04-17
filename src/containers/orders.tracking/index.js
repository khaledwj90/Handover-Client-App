// @flow
import * as React from 'react';
import {TouchableOpacity, View} from 'react-native';
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
const OrdersTracking = (props: Props) => {
    const dispatch = useDispatch();
    const reduxState: ReducerTypes = useSelector(state => state);
    const mapRef = React.useRef(null);
    const [currentLocation, setCurrentLocation] = React.useState(null);
    const [orderDetails, setOrderDetails] = React.useState<GetOrderDetailsResType>(null);
    const [driverLocation, setDriverLocation] = React.useState<{ lat: number, lng: number }>({lat: 0, lng: 0});

    console.log('props: ', props.route.params);
    React.useEffect(() => {
        dispatch(SetTabShowingStatus(false));
        getOrderDetails();
        return (() => {
            dispatch(SetTabShowingStatus(true));
        })
    }, []);


    React.useEffect(() => {
        console.log('NNN', reduxState.DriverLocation);
        if (reduxState.DriverLocation?.orderId && reduxState.DriverLocation.orderId === props.route.params.orderId) {
            setDriverLocation({lat: reduxState.DriverLocation.lat, lng: reduxState.DriverLocation.lng});
        }
        if (reduxState.DriverLocation && (reduxState.DriverLocation.eventType !== Util.Constants.PUSH_NOTIFICATION_EVENT.DRIVER_LOCATION_UPDATE)) {
            getOrderDetails();
        }
    }, [reduxState.DriverLocation]);

    const getOrderDetails = async () => {
        try {
            const response = await API.Calls.Orders.getOrderDetails({orderId: props.route.params.orderId})
            if (response.withError === true) {
                dispatch(SetToast('Not able to get order details', 'danger'));
                props.navigation.goBack();
                return;
            }
            setOrderDetails(response.body);
        } catch (e) {
            dispatch(SetToast('Not able to get order details', 'danger'));
            props.navigation.goBack();
        }
    }

    const close = () => {
        props.navigation.goBack();
    }

    const onSubmit = (values) => {

    }
    console.log('Driver Location: ', driverLocation);
    return (
        <PageContainer statusbarType={'dark'}>
            <Button_Icon action={close} name={'Back'} fill={Theme.base_color_10} height={10} width={10}
                         style={style.backButton}/>
            <MapContainer ref={mapRef} updateLocation={setCurrentLocation}
                          initialLocation={orderDetails?.pickupLocation}
                          markersList={orderDetails !== null ? [
                              {...orderDetails.pickupLocation, type: 'pickup'},
                              {...orderDetails.deliveryLocation, type: 'delivery'},
                              {...driverLocation, type: 'driver'},
                          ] : []}/>
            <ProgressDetails orderDetails={orderDetails} mapRef={mapRef} currentLocation={currentLocation}
                             onSubmit={onSubmit}/>
        </PageContainer>
    );
};

export default OrdersTracking
