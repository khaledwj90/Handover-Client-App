import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {DrawerItem} from '@react-navigation/drawer';
import Icon from '../Icons';
import {botttomDrawerFunction, drawerFunction} from './DrawerNavConfig';
import Theme from '../../App.style';
import Util from '../../util';
import {hasNotch} from 'react-native-device-info';
import {useDispatch} from 'react-redux';

export const DrawerContent = (props) => {
    const dispatch = useDispatch();
    const {navigation} = props;
    const getActiveRouteState = function (routes, index, name) {
        return routes[index].name.toLowerCase().indexOf(name.toLowerCase()) >= 0;
    };

    return (
        <View style={{flex: 1}}>
            <View style={style.userInfoSection}>
                {/*<Image*/}
                {/*    style={style.profileImg}*/}
                {/*    source={require('../../assets/img/logo.png')}*/}
                {/*/>*/}
            </View>
            <View style={{paddingBottom: 1}}>
                {
                    drawerFunction(navigation).map((item, index) => {
                        return (
                            <DrawerItem
                                focused={getActiveRouteState(
                                    props.state.routes,
                                    props.state.index,
                                    item.name,
                                )}
                                activeBackgroundColor={Theme.header_bg_color_1}
                                activeTintColor={Theme.font_white}
                                inactiveTintColor={Theme.font_dark}
                                key={index}
                                icon={({focused}) => (
                                    <Icon
                                        fill={focused ? Theme.icon_color_1 : Theme.icon_color_2}
                                        width={25}
                                        height={20}
                                        name={item.iconName}

                                    />
                                )}
                                label={item.label}
                                onPress={item.setFunction}
                                labelStyle={{fontSize: Util.Functions.FontSize(10), fontWeight: '300', marginLeft: -20}}
                                {...props}
                            />
                        );
                    })}


            </View>
            <View style={style.bottomDrawerSection}>
                {botttomDrawerFunction(navigation).map((item, index) => {
                    return (
                        <TouchableOpacity
                            onPress={item.setFunction.bind(this, dispatch)}
                            style={style.mainTitleWrapper}>
                            <View style={style.iconAndLabel}>
                                <Icon
                                    name={item.iconName}
                                    width={25}
                                    height={20}
                                    fill={Theme.icon_color_2}
                                />
                                <Text style={{color: '#000', marginLeft: 15, fontSize: Util.Functions.FontSize(10)}}>
                                    {item.label}
                                </Text>
                            </View>
                            <Text
                                style={{
                                    color: Theme.font_colored,
                                    marginRight: 30,
                                    fontSize: Util.Functions.FontSize(10),
                                }}>
                                {item.leftText ? 'English' : ''}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </View>
        </View>
    );
};

const style = StyleSheet.create({
    drawerContent: {
        flex: 1,
    },
    userInfoSection: {
        backgroundColor: Theme.header_bg_color_2,
        marginTop: hasNotch() ? 30 : 0,
        height: 80,
        justifyContent: 'center',
    },
    profileImg: {
        width: 150,
        height: 60,
        backgroundColor: '#fff',
        alignSelf: 'center',
    },

    DrawerSection: {
        backgroundColor: '#fff',
        justifyContent: 'center',
    },
    bottomDrawerSection: {
        paddingTop: 5,
        backgroundColor: '#f4f4f4',
        flex: 1,
    },
    //   mainTitleWrapper1: {
    //     flexDirection: 'row',
    //     alignItems: 'center',
    //     justifyContent: 'space-between',
    //   },
    mainTitleWrapper: {
        height: 40,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: 20,
        // borderColor:'red',borderWidth:3
    },
    iconAndLabel: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        justifyContent: 'flex-start',
    },
});
