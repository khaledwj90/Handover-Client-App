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


type Props = {
    mapRef?: *,
    onSubmit: (values: *)=>void,
    currentLocation: { lat: number, lng: number }
};
const LocationSelection = (props: Props) => {
    const [locations, setLocation] = React.useState<{ pickupLocation?: { lat: number, long: number }, deliveryLocation?: { lat: number, long: number } }>({
        pickupLocation: null,
        deliveryLocation: null
    });
    //location mode will be submit view, select pickup view or select destination view
    const [locationSelectionMode, setLocationSelectionMode] = React.useState<1 | 2 | 3>(1);
    const modalRef = React.useRef();

    React.useEffect(() => {
    }, []);


    const onLocationFieldPressed = (viewId: number) => {
        setLocationSelectionMode(viewId);
    }

    const getLatLongGoBack = () => {
        setLocationSelectionMode(1);
    }

    const getLatLongSubmit = () => {

    }

    const onClose = () => {
    }

    return (
        <>
            <SliderModal ref={modalRef} heightSizes={[200]} selectedHeightIndex={1}
                         onClose={onClose} bgColor={Theme.primary_color_1} withBlur={false}>
                {
                    locationSelectionMode === 1 &&
                    <View style={{alignItems: 'center', paddingBottom: 50}}>
                        <View style={style.profileContainer}>
                            <ProfileImg size={80}
                                        style={{...Theme.shadow({color: Theme.base_color_10})}}/>
                            <Text size={2} weight={'bold'} color={Theme.base_color_10} style={style.driverName}>
                                Driver Name
                            </Text>
                        </View>
                        <LocationSelectionField value={'Please select pickup location'}
                                                onClick={onLocationFieldPressed.bind(this, 2)}/>
                        <LocationSelectionField value={'Please select delivery location'}
                                                onClick={onLocationFieldPressed.bind(this, 3)}/>
                        <Button label={'SUBMIT'} action={onClose} type={'quaternary'} style={style.submitButton}/>
                    </View>
                }
                {
                    [2, 3].indexOf(locationSelectionMode) > -1 &&
                    <View style={{paddingBottom: 50}}>
                        <LocationSelectionGetLatLong viewId={locationSelectionMode}
                                                     currentLocation={props.currentLocation} goBack={getLatLongGoBack}
                                                     onSelect={getLatLongSubmit}/>
                    </View>
                }
            </SliderModal>
        </>
    );
};

export default LocationSelection
