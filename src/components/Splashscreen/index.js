// @flow
import * as React from 'react';
import {View, Dimensions, Image} from 'react-native';
import Icon from "../Icons";


type Props = {};
export const Splashscreen = (props: Props) => {
    const {height, width} = Dimensions.get('window');
    return (
        <View style={{justifyContent: 'center', height: height, width: width}}>
            <Icon name={'Animation_Splashscreen'} style={{height: height, width: width}}/>
            <Icon name={'LOGO'} width={140} height={140} style={{width: 200, height: 200, alignSelf: 'center', position: 'absolute'}}/>
            {/*<Image source={require('../../assets/img/1-Splash-logo.png')}*/}
            {/*       style={{width: 200, height: 200, alignSelf: 'center', position: 'absolute'}} resizeMode={'contain'}/>*/}
        </View>
    );
};
