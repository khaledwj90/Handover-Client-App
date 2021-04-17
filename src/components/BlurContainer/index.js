// @flow
import * as React from 'react';
import {View} from 'react-native';
import {BlurView} from '@react-native-community/blur';
import {Platform} from "react-native"
type Props = {
    style: any,
    type: 'light' | 'dark',
    blurAmount: number,
};
export const BlurContainer = (props: Props) => {
    return (
        <BlurView
            style={props.style}
            blurType={props.type}
            blurAmount={props.blurAmount}
            reducedTransparencyFallbackColor={'white'}
        >

            {props.children}
        </BlurView>
    );
};
BlurContainer.defaultProps = {
    blurAmount: 10,
    type: 'light',
};
