// @flow
import * as React from 'react';
import {Animated, Easing, Modal, TouchableOpacity, View, TouchableWithoutFeedback} from 'react-native';
import style from './style';
import Util from '../../util';
import Text from '../Text';
import Theme from '../../App.style';
import Icon from '../Icons';
import {BlurContainer} from '../BlurContainer';

type Props = {
    onClose: ()=>void,
    withBlur: boolean,
    closeOnClickOutside: boolean,
    bgColor: string,
};
export const SliderModal: any = React.forwardRef((props: Props, ref: any): any => {

    React.useEffect(() => {
        Util.Functions.AnimateView('spring');
    }, [props.children]);


    if (props.withBlur === false) {
        return (
            <View style={style.mainContainer}>
                {
                    <View style={{flex: 1, justifyContent: 'flex-end', backgroundColor: 'transparent'}}>
                        <View style={[style.contentContainer, {backgroundColor: props.bgColor,}]}>
                            {props.children}
                        </View>
                    </View>
                    // renderContent()
                }
            </View>
        );
    } else {
        return (
            <View style={style.mainContainer}>
                <BlurContainer type={'light'} blurAmount={0} style={{height: '100%', width: '100%'}}>
                    {
                        <View style={{flex: 1, justifyContent: 'flex-end'}}>
                            <View
                                style={[style.contentContainer, {backgroundColor: props.bgColor}]}>
                                {props.children}
                            </View>
                        </View>
                        // renderContent()
                    }
                </BlurContainer>
            </View>
        );
    }

});

SliderModal.defaultProps = {
    bgColor: Theme.base_color_9,
    closeOnClickOutside: true,
};
