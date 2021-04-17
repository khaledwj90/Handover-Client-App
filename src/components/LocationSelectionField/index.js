// @flow
import * as React from 'react';
import {View, TouchableOpacity} from 'react-native';
import style from './style';
import Text from "../Text";
import Theme from "../../App.style";
import Icon from "../Icons";


type Props = {
    value: string,
    isPlaceholder: boolean,
    onClick: ()=>void,
    style?: any,
};
const LocationSelectionField = (props: Props) => {
    return (
        <TouchableOpacity style={[style.mainContainer, props.style]}
                          activeOpacity={typeof props.onClick === 'undefined' ? 1 : 0.5} onPress={props.onClick}>
            <Icon name={'Animation_LocationPin'} style={{width: 30, height: 30, marginBottom: 5}}/>
            <Text size={2} weight={props.isPlaceholder ? 'light' : 'regular'}
                  color={props.isPlaceholder ? Theme.base_color_3 : Theme.base_color_1}>
                {props.value}
            </Text>
        </TouchableOpacity>
    );
};

export default LocationSelectionField
