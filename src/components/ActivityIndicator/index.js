// @flow
import * as React from 'react';
import {View, ActivityIndicator as Loader} from 'react-native';
import Theme from '../../App.style';


type Props = {
    color: string,
    size: 'large' | 'small'
};
export const ActivityIndicator = (props: Props) => {
    return (
        <Loader {...props} size={props.size} color={props.color || Theme.primary_color_1}/>
    );
};
