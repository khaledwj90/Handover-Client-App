// @flow
import React, {useState, useEffect, useRef} from 'react';
import {View, Dimensions, Animated, Easing, TouchableWithoutFeedback} from 'react-native';
import {connect, useDispatch, useSelector} from 'react-redux';
import {bindActionCreators} from "redux";
import style from './style'
import Text from "../Text";
import {ClearToast, SetToast} from "../../redux/actions/setToast";
import type {ToastType} from "../../redux/states/toasts";
import {hasNotch} from "react-native-device-info";
import type {ReducerTypes} from "../../redux/states";
import Theme from "../../App.style";

type Props = {
    Toast: ToastType
};

const CustomToast = (props: Props) => {
    const dispatch = useDispatch();
    const reduxState: ReducerTypes = useSelector(state => state);
    const _animationValue = useRef(new Animated.Value(0)).current;
    const _timeOutVar = useRef(null);
    const viewHeight = hasNotch() ? 100 : 80;

    useEffect(() => {
        if (reduxState.Toast !== null) {
            _animationValue.setValue(0);
            Animated.timing(_animationValue, {
                toValue: 1,
                easing: Easing.in(Easing.elastic(2)),
                duration: 500,
                useNativeDriver: true
            }).start(() => {
                _timeOutVar.current = setTimeout(() => {
                    Animated.timing(_animationValue, {
                        toValue: 0,
                        easing: Easing.out(Easing.elastic(2)),
                        duration: 500,
                        useNativeDriver: true
                    }).start(() => {
                        dispatch(ClearToast());
                    });
                }, 4000);

            });
        }
    }, [reduxState.Toast]);

    const close = () => {
        clearTimeout(_timeOutVar.current);
        Animated.timing(_animationValue, {
            toValue: 0,
            easing: Easing.out(Easing.elastic(2)),
            duration: 500,
            useNativeDriver: true
        }).start()
    };

    const getLayout = React.useCallback(({nativeEvent}) => {
        // console.log('-----',nativeEvent);
    }, []);

    return (
        <View style={{flex: 1}}>
            {props.children}
            <TouchableWithoutFeedback onPress={close}>
                <Animated.View onLayout={getLayout}
                               style={[{backgroundColor: reduxState.Toast && (reduxState.Toast.status === 'danger' ? Theme.indication_color_1 : reduxState.Toast.status === 'success' ? Theme.indication_color_3 : Theme.indication_color_2)}, style.mainContainer, {
                                   height: viewHeight,
                                   top: 0,
                                   opacity: _animationValue,
                                   transform: [{
                                       translateY: _animationValue.interpolate({
                                           inputRange: [0, 1],
                                           outputRange: [-viewHeight, 0]
                                       })
                                   }]
                               }]}>
                    <Text size={5} weight={'light'}
                          style={style.text}>{reduxState.Toast ? reduxState.Toast.message : ''} </Text>
                </Animated.View>
            </TouchableWithoutFeedback>
        </View>
    );
};


export default CustomToast;
