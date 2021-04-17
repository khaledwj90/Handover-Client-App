import * as React from 'react';
import {StyleSheet, TouchableOpacity, View, Modal, Animated} from 'react-native';
import _ from 'lodash';
import Theme from '../../App.style'
import style from './style';
import Icon from '../Icons'
import {hasNotch} from "react-native-device-info";
import Text from "../Text";
import {Navigation_MoreNav} from "../Navigation.moreNav";
import type {ReducerTypes} from "../../redux/states";
import {useSelector} from "react-redux";

const TabNavigationContent = ({state, descriptors, navigation, ...props}) => {
    const reduxState: ReducerTypes = useSelector(state => state);
    const animationRef = React.useRef(new Animated.Value(1)).current;

    React.useEffect(() => {
        if (reduxState.TabShowingStatus === false) {
            Animated.timing(animationRef, {
                toValue: 0,
                duration: 250,
                useNativeDriver: true
            }).start();
        } else {
            Animated.timing(animationRef, {
                toValue: 1,
                duration: 250,
                useNativeDriver: true
            }).start();
        }
    }, [reduxState.TabShowingStatus]);


    const onPress = React.useCallback((index) => {
        const isFocused = state.index === index
        const route = state.routes[index];

        const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
        });
        if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
        }
    }, [state, navigation, descriptors])


    return (
        <Animated.View style={[style.mainContainer, style.shadow, {height: hasNotch() ? 80 : 60}, {
            transform: [{
                translateY: animationRef.interpolate({
                    inputRange: [0, 1],
                    outputRange: [hasNotch() ? 80 : 60, 0]
                })
            }]
        }]}>
            {
                state.routes.slice(0, 5).map((route, index) => {
                    const {options} = descriptors[route.key];
                    const iconName = options.tabBarIcon
                    const isFocused = state.index === index;
                    return (
                        <TouchableOpacity key={route.name} onPress={onPress.bind(this, index)}
                                          style={{flex: 1, alignItems: 'center'}}>
                            <Icon name={iconName}
                                  fill={isFocused ? Theme.primary_color_2 : Theme.base_color_4}
                                  width={30} height={30}/>
                            <Text size={3} weight={"light"}
                                  style={[{
                                      color: isFocused ? Theme.primary_color_2 : Theme.base_color_4,
                                      textAlign: 'center',
                                  }]}>
                                {options.tabBarLabel}
                            </Text>
                        </TouchableOpacity>
                    );
                })
            }
        </Animated.View>
    );
}

export default TabNavigationContent
