// @flow
import * as React from 'react';
import {View, Dimensions, Image} from 'react-native';
import Icon from "../Icons";
import Text from "../Text";


type Props = {};
export const Splashscreen = (props: Props) => {
    const {height, width} = Dimensions.get('window');
    return (
        <View style={{justifyContent: 'center', alignItems: 'center', height: height, width: width}}>
            <Text size={15} weight={'bold'}>
                Loading...
            </Text>
            <Icon name={'Animation_Splashscreen'} style={{height: height, width: width}}/>
            <Icon name={'LOGO'} width={140} height={140}
                  style={{width: 200, height: 200, alignSelf: 'center', position: 'absolute'}}/>
            {/*<Image source={require('../../assets/img/1-Splash-logo.png')}*/}
            {/*       style={{width: 200, height: 200, alignSelf: 'center', position: 'absolute'}} resizeMode={'contain'}/>*/}
        </View>
    );
};
