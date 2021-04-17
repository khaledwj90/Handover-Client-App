// @flow
import * as React from 'react';
import {View} from 'react-native';
import style from './style';
import Icon from "../Icons";


type Props = {
    size: number,
    style?: any,
};
const ProfileImg = (props: Props) => {
    return (
        <View style={[style.mainContainer, {
            width: props.size,
            height: props.size,
            borderRadius: props.size / 2,
            backgroundColor: '#fff'
        }, props.style]}>
            <Icon name={'Animation_Profile'} style={{width: props.size, height: props.size}}/>
        </View>
    );
};

export default ProfileImg
