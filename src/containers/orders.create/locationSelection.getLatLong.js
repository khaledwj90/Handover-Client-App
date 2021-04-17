// @flow
import * as React from 'react';
import {View} from 'react-native';
import style from './locationSelection.getLatLong.style';
import LocationSelectionField from "../../components/LocationSelectionField";
import Button from "../../components/Button";
import Theme from "../../App.style";
import Button_Icon from "../../components/Button.icon";


type Props = {
    viewId: 2 | 3,
    onSelect: ()=>void,
    goBack: ()=>void,
    currentLocation: { lat: number, lng: number },
};
const LocationSelectionGetLatLong = (props: Props) => {

    const placeholderText = () => {
        if (props.currentLocation !== null) {
            return `${props.currentLocation.lat} - ${props.currentLocation.lng}`
        }
        if (props.viewId === 2) {
            return ('Please select pickup location');
        } else {
            return ('Please select destination location');
        }
    }

    return (
        <View style={style.mainContainer}>
            <Button_Icon action={props.goBack} name={'Back'} width={20} height={20} fill={Theme.base_color_10}/>
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                <LocationSelectionField value={placeholderText()} style={{flex: 2}}/>
                <Button label={'Select'} type={'quaternary'} action={props.onSelect}
                        style={style.selectButton}/>

            </View>
        </View>
    );
};

export default LocationSelectionGetLatLong
