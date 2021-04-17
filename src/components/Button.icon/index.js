// @flow
import * as React from 'react';
import {View, TouchableOpacity} from 'react-native';
import Icon from "../Icons";


type Props = {
    action(): void,
    name: string,
    fill?: string,
    width?: number,
    height?: number,
    style?: any
};
const Button_Icon = (props: Props) => {
    return (
        <TouchableOpacity onPress={props.action} style={props.style}
                          hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
            <Icon name={props.name} width={props.width} height={props.height} fill={props.fill}/>
        </TouchableOpacity>
    );
};
Button_Icon.defaultProps = {
    width: 30,
    height: 30,
    fill: '#000'
}

export default Button_Icon
