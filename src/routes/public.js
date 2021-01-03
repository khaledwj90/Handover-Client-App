import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Auth_Login from '../containers/auth.login';



const StackNavigation = createStackNavigator();


const PublicRoutes = [
    {
        name: 'Login',
        component: Auth_Login,
    },
]


const PublicNavigation = (props) => {
    return (
        <StackNavigation.Navigator headerMode={'none'} initialRouteName={props.initialRouteName}>
            {
                PublicRoutes.map((route, index) => {
                    return (
                        <StackNavigation.Screen key={route.name} name={route.name} component={route.component}/>
                    )
                })
            }
        </StackNavigation.Navigator>
    )
}


export default PublicNavigation
