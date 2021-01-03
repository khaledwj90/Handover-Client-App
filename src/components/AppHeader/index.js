// @flow
import * as React from 'react';
import {Animated, StatusBar, TouchableOpacity, View} from 'react-native';
import style from './style';
import Icon from '../Icons';
import Text from '../Text';
import Theme from '../../App.style';
import Util from '../../util';


type Props = {
    height?: number,
    statusBarColor?: string | 'transparent',
    headerText?: string,
    leftIcon?: { icon: string, action: ()=>void, fill?: string },
    rightIcon?: Array<{ icon: string, action: ()=>void, fill?: string, type?: 'text' }>,
    animateValue?: any,//used to hide the right icons on scroll,
    style?: any,
    children?: any,
};
export const AppHeader = (props: Props): any => {
    //if we passed a child for the component


    const renderDefaultHeader = (withChild: boolean) => {
        const mainStyles = [style.mainContainerNoChildren];
        if (withChild === true) {
            mainStyles.push({backgroundColor: 'transparent'});
        }
        if (!withChild) {
            mainStyles.push(props.style);
        }
        return (
            <View
                style={mainStyles}>
                {
                    typeof props.leftIcon !== 'undefined' ?
                        <TouchableOpacity style={[{flex: 1}]} onPress={props.leftIcon.action}>
                            <Icon name={props.leftIcon.icon} width={20} height={20} fill={Theme.base_color_10}/>
                        </TouchableOpacity>
                        : <View style={{flex: 1}}/>
                }
                <Text size={6} style={style.headerText}>
                    {props.headerText}
                </Text>
                <Animated.View style={[style.right_section, {
                    opacity: props.animateValue ? props.animateValue.interpolate({
                        inputRange: [50, 100],
                        outputRange: [0.8, 0],
                    }) : 1,
                }]}>
                    <View style={style.sub_icons_container}>
                        {
                            typeof props.rightIcon !== 'undefined' ?
                                props.rightIcon.map((icon, index) => {
                                    if (icon.type === 'text') {
                                        return (
                                            <TouchableOpacity onPress={icon.action} key={index}
                                                              style={style.sub_icons_action}>
                                                <Text size={5} style={style.header_subText}>{icon.icon}</Text>
                                            </TouchableOpacity>
                                        );
                                    } else {
                                        return (
                                            <TouchableOpacity onPress={icon.action} key={index}
                                                              style={style.sub_icons_action}>
                                                <Icon name={icon.icon} width={20} height={20}
                                                      fill={icon.fill ? icon.fill : Theme.base_color_10}/>
                                            </TouchableOpacity>
                                        );
                                    }
                                })
                                : null
                        }
                    </View>
                </Animated.View>
            </View>
        );
    };
    if (props.children) {
        return (
            <View style={[{flexDirection: 'column'}, props.style]}>
                <StatusBar barStyle={'light-content'}
                           backgroundColor={`rgba(${Util.Functions.HexToRgb(Theme.body_bg_color_2)},0.8)`}/>
                {
                    typeof props.headerText !== 'undefined' &&
                    renderDefaultHeader(true)
                }
                {/*check if we have title with the children*/}
                <View
                    style={[style.mainContainerWithChildren, {
                        minHeight: typeof props.headerText === 'undefined' ? Theme.header_height : 0,
                        marginTop: typeof props.headerText === 'undefined' ? 0 : 5,
                    }]}>
                    {props.children}
                </View>
            </View>
        );
    } else {
        return (
            <>
                <StatusBar barStyle={'light-content'}
                           backgroundColor={`rgba(${Util.Functions.HexToRgb(Theme.primary_color_1)},0.8)`}/>
                {
                    renderDefaultHeader()
                }
            </>
        );
    }
};

AppHeader.defaultProps = {
    height: Theme.header_height,
};

