// @flow
import * as React from 'react';
import {Animated, View, Easing, I18nManager} from 'react-native';
import {PanGestureHandler, State} from 'react-native-gesture-handler';
import style from './style';
import Text from '../Text';
import Theme from '../../App.style';
import {useTranslation} from 'react-i18next';
import Icon from "../Icons";
import {ActivityIndicator} from "../ActivityIndicator";


type Props = {
    placeholder: string,
    dragBgColor: string,
    bgColor: string,
    isDisabled: boolean,
    onConfirm: ()=>Promise<>,//reject the promise to return the slider to original position
    style?: any,
};

export const ConfirmSlider = (props: Props) => {
    const {t} = useTranslation();
    const [compWidth, setCompWidth] = React.useState(0);
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const buttonWidth = React.useRef(80).current;
    const _xTranslateAnimation = React.useRef(new Animated.Value(0)).current;

    //used to track the movement
    const onMove = () => {
        return (
            Animated.event([
                {
                    nativeEvent: {
                        translationX: _xTranslateAnimation,
                    },
                },
            ], {useNativeDriver: false})
        );
    };

    //used to change the state
    const onStateChange = ({nativeEvent}) => {
        if (nativeEvent.oldState === State.ACTIVE) {
            const confirmRange = compWidth * 0.6;
            if (nativeEvent.translationX > confirmRange && I18nManager.isRTL === false) {
                Animated.spring(_xTranslateAnimation, {
                    toValue: compWidth - buttonWidth,
                    useNativeDriver: false,
                }).start(() => {
                    onConfirm();
                });
            } else if (-nativeEvent.translationX > confirmRange && I18nManager.isRTL === true) {
                Animated.spring(_xTranslateAnimation, {
                    toValue: compWidth - buttonWidth,
                    useNativeDriver: false,
                }).start(() => {
                    onConfirm();
                });
            } else {
                Animated.spring(_xTranslateAnimation, {
                    toValue: 0,
                    useNativeDriver: false,
                }).start();
            }
        }
    };

    const onLayoutReady = ({nativeEvent}) => {
        setCompWidth(nativeEvent.layout.width);
    };

    const onConfirm = async () => {
        try {
            setIsSubmitting(true);
            await props.onConfirm();
        } catch (e) {
            //reset in case of failed
            setIsSubmitting(false);
            _xTranslateAnimation.setValue(0);
        }
    };


    return (
        <View onLayout={onLayoutReady}
              style={{width: '100%', alignItems: 'flex-end', opacity: props.isDisabled === true ? 0.5 : 1}}>
            <Animated.View style={[style.mainContainer, {
                backgroundColor: props.bgColor,
                width: _xTranslateAnimation.interpolate({
                    inputRange: [-compWidth, 0, compWidth],
                    outputRange: [0, compWidth, 0],
                    extrapolate: 'clamp',
                }),
            }, props.style]}>
                <View style={{position: 'absolute', right: 20, flexDirection: 'row', alignItems: 'center'}}>
                    <Text size={4} weight={'regular'} numberOfLines={1} ellipsizeMode={'head'}
                          style={{color: Theme.base_color_1}}>
                        {props.placeholder || 'SUBMIT'}
                    </Text>
                    <Icon name={'RightArrow'} width={25} height={25} fill={Theme.base_color_1} style={{marginLeft: 5}}/>
                </View>
                <PanGestureHandler onGestureEvent={props.isDisabled === true ? undefined : onMove()}
                                   onHandlerStateChange={props.isDisabled === true ? undefined : onStateChange}>
                    <Animated.View style={{
                        width: buttonWidth,
                        height: '100%',
                        backgroundColor: props.bgColor,
                        borderRadius: 50,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        {isSubmitting === true && <ActivityIndicator color={Theme.primary_color_1} size={'small'}/>}
                    </Animated.View>
                </PanGestureHandler>
            </Animated.View>
        </View>
    );
};

ConfirmSlider.defaultProps = {
    dragBgColor: Theme.primary_color_2,
    bgColor: Theme.base_color_10,
};
