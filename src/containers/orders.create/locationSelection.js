// @flow
import * as React from 'react';
import {View} from 'react-native';
import style from './locationSelection.style';
import {SliderModal} from "../../components/SliderModal";
import Util from "../../util";
import Theme from "../../App.style";
import ProfileImg from "../../components/profileImg";
import Text from "../../components/Text";
import LocationSelectionField from "../../components/LocationSelectionField";
import Button from "../../components/Button";
import LocationSelectionGetLatLong from "./locationSelection.getLatLong";
import {useContext} from "react";
import {OrdersCreateContext} from "./index";
import type {OrdersCreateContextType} from "./index.flowType";
import {create} from "react-native/jest/renderer";
import {SetToast} from "../../redux/actions/setToast";
import API from "../../api";
import {useNavigation} from "@react-navigation/native";
import {useDispatch} from "react-redux";


type Props = {
    mapRef?: *,
    currentLocation: { lat: number, lng: number },
    setCurrentLocation: ({ lat: number, lng: number })=>void,
};
const LocationSelection = (props: Props) => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const createOrderContextState: OrdersCreateContextType = useContext(OrdersCreateContext);

    //location mode will be submit view, select pickup view or select destination view
    const [locationSelectionMode, setLocationSelectionMode] = React.useState<1 | 2 | 3>(1);
    const modalRef = React.useRef();

    React.useEffect(() => {
    }, []);


    /**
     * Select delivery or pickup location
     */
    const getLatLongSubmit = () => {
        if (locationSelectionMode === 2) {
            //pickup location
            createOrderContextState.setSelectedLocation({
                ...createOrderContextState.selectedLocation,
                pickupLocation: createOrderContextState.currentLocation
            });

        } else {
            //delivery location
            createOrderContextState.setSelectedLocation({
                ...createOrderContextState.selectedLocation,
                deliveryLocation: createOrderContextState.currentLocation
            });
        }
        createOrderContextState.clearCurrentLocation();
        setLocationSelectionMode(1);
    }

    /**
     * Render delivery/pickup field location
     * @param type
     * @returns {string}
     */
    const renderLocationFieldValue = (type: 'pickup' | 'delivery') => {
        if (type === 'pickup') {
            if (createOrderContextState.selectedLocation.pickupLocation === null) {
                return ('Please select pickup location')
            } else {
                return (`${createOrderContextState.selectedLocation.pickupLocation.lat} - ${createOrderContextState.selectedLocation.pickupLocation.lng}`)
            }
        } else {
            if (createOrderContextState.selectedLocation.deliveryLocation === null) {
                return ('Please select delivery location')
            } else {
                return (`${createOrderContextState.selectedLocation.deliveryLocation.lat} - ${createOrderContextState.selectedLocation.deliveryLocation.lng}`)
            }
        }
    }

    const onClose = () => {
    }

    const onSubmit = async () => {
        if (createOrderContextState.selectedLocation.deliveryLocation === null || createOrderContextState.selectedLocation.pickupLocation === null) {
            dispatch(SetToast('Please fill all mandatory fields', 'warning'));
            return;
        }
        try {
            const response = await API.Calls.Orders.createOrder({
                deliveryLocation: createOrderContextState.selectedLocation.deliveryLocation,
                pickupLocation: createOrderContextState.selectedLocation.pickupLocation
            });

            if (response.withError === true) {
                dispatch(SetToast('Something wrong', 'danger'));
                return;
            }
            dispatch(SetToast('Order has been created successfully', 'success'));
            navigation.goBack();
        } catch (e) {
            dispatch(SetToast('Something wrong', 'danger'));
        }
    }


    return (
        <>
            <SliderModal ref={modalRef} heightSizes={[200]} selectedHeightIndex={1}
                         onClose={onClose} bgColor={Theme.primary_color_1} withBlur={false}>
                {
                    locationSelectionMode === 1 &&
                    <View style={{alignItems: 'center', paddingBottom: 50}}>
                        <View style={{width: '100%'}}>
                            <Text size={5} weight={'bold'} color={Theme.base_color_10} style={style.message}>
                                Select pickup & delivery location
                            </Text>
                        </View>
                        <LocationSelectionField value={renderLocationFieldValue('pickup')} isPlaceholder={true}
                                                onClick={setLocationSelectionMode.bind(this, 2)}/>
                        <LocationSelectionField value={renderLocationFieldValue(('delivery'))} isPlaceholder={true}
                                                onClick={setLocationSelectionMode.bind(this, 3)}/>
                        <Button label={'SUBMIT'} action={onSubmit} type={'quaternary'} style={style.submitButton}/>
                    </View>
                }
                {
                    [2, 3].indexOf(locationSelectionMode) > -1 &&
                    <View style={{paddingBottom: 50}}>
                        <LocationSelectionGetLatLong viewId={locationSelectionMode}
                                                     currentLocation={props.currentLocation}
                                                     goBack={setLocationSelectionMode.bind(this, 1)}
                                                     onSelect={getLatLongSubmit}/>
                    </View>
                }
            </SliderModal>
        </>
    );
};

export default LocationSelection
