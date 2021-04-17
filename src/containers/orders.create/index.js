// @flow
import * as React from 'react';
import {TouchableOpacity, View} from 'react-native';
import MapContainer from "../../components/Map";
import {useDispatch} from "react-redux";
import style from './index.style';
import {SetTabShowingStatus} from "../../redux/actions/setTabShowingStatus";
import Icon from "../../components/Icons";
import Theme from "../../App.style";
import PageContainer from "../../components/PageContainer";
import Button_Icon from "../../components/Button.icon";
import LocationSelection from "./locationSelection";
import type {OrdersCreateContextType, SelectedLocationType} from "./index.flowType";
import {SetToast} from "../../redux/actions/setToast";
import API from "../../api";


type Props = {};
export const OrdersCreateContext = React.createContext<OrdersCreateContextType>(null);
const OrdersCreate = (props: Props) => {
    const dispatch = useDispatch();
    const mapRef = React.useRef(null);
    const [currentLocation, setCurrentLocation] = React.useState(null);
    const [selectedLocation, setSelectedLocation] = React.useState<SelectedLocationType>({
        deliveryLocation: null,
        pickupLocation: null
    });


    React.useEffect(() => {
        dispatch(SetTabShowingStatus(false));

        return (() => {
            dispatch(SetTabShowingStatus(true));
        })
    }, []);

    const clearCurrentLocation = () => {
        setCurrentLocation(null);
    }

    const close = () => {
        props.navigation.goBack();
    }


    return (
        <PageContainer statusbarType={'dark'}>
            <Button_Icon action={close} name={'Back'} fill={Theme.base_color_10} height={10} width={10}
                         style={style.backButton}/>
            <OrdersCreateContext.Provider
                value={{
                    mapRef: mapRef,
                    currentLocation,
                    clearCurrentLocation: clearCurrentLocation,
                    selectedLocation,
                    setSelectedLocation
                }}>
                <MapContainer ref={mapRef} updateLocation={setCurrentLocation}/>
                <LocationSelection mapRef={mapRef} currentLocation={currentLocation}/>
            </OrdersCreateContext.Provider>
        </PageContainer>
    );
};

export default OrdersCreate
