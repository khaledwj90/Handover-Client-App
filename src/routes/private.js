import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import TabNavigationContent from '../components/Navigation.TabNav';
import Auth_Login from '../containers/auth.login';
import RouteConstants from "./constants";
import OrdersList from "../containers/orders.list";
import OrdersTracking from "../containers/orders.tracking";
import OrdersCreate from "../containers/orders.create";

const Tabs = createBottomTabNavigator();
const StackNavigation = createStackNavigator();


const Orders = () => {
    return (
        <StackNavigation.Navigator headerMode={'none'}>
            <StackNavigation.Screen name={RouteConstants.PRIVATE_ROUTES.ORDERS} component={OrdersList}/>
            <StackNavigation.Screen name={RouteConstants.PRIVATE_ROUTES.ADD_ORDER} component={OrdersCreate}/>
            <StackNavigation.Screen name={RouteConstants.PRIVATE_ROUTES.TRACK_ORDER} component={OrdersTracking}/>
        </StackNavigation.Navigator>
    );
};


const PrivateRoutes = [
    {
        name: RouteConstants.PRIVATE_ROUTES.ORDERS,
        component: Orders,
        iconName: 'Orders',
        label: 'Orders',
        visible: true,
    }
];
const PrivateNavigation = (props) => {
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
};


export default PrivateNavigation;
