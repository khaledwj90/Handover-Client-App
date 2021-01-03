import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {DrawerContent} from '../components/Navigation.DrawerNav/drawerContent';
import TabNavigationContent from '../components/Navigation.TabNav';
import Auth_Login from '../containers/auth.login';

const Tabs = createBottomTabNavigator();
const StackNavigation = createStackNavigator();
const Drawer = createDrawerNavigator();



const Dashboard = () => {
    return (
        <StackNavigation.Navigator headerMode={'none'}>
            <StackNavigation.Screen name={'Dashboard'} component={Auth_Login}/>
        </StackNavigation.Navigator>
    );
};


const PrivateRoutes = [
    {
        name: 'Dashboard',
        component: Auth_Login,
        iconName: 'Home',
        label: 'Home',
        visible: true,
    }
];
const PrivateNavigation = (props: { type: 'tab' | 'drawer' | 'stack' }) => {
    const {type} = props;
    if (type === 'tab') {
        return (
            <Tabs.Navigator tabBar={props => <TabNavigationContent {...props}/>}>

                {
                    PrivateRoutes.map((route, index) => {
                        return (
                            <Tabs.Screen key={route.name} name={route.name}
                                         options={{tabBarIcon: route.iconName, tabBarLabel: route.label}}
                                         component={route.component}/>
                        );
                    })
                }
            </Tabs.Navigator>
        );
    } else {
        return (
            <Drawer.Navigator drawerContent={props => (<DrawerContent {...props}/>)}>
                {
                    PrivateRoutes.map((route, index) => {
                        return (
                            <Drawer.Screen key={route.name} name={route.name} component={route.component}/>
                        );
                    })
                }
            </Drawer.Navigator>
        );
    }
};


export default PrivateNavigation;
