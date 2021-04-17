// @flow
import * as React from 'react';
import {FlatList, StatusBar, View} from 'react-native';
import {useDispatch} from "react-redux";
import PageContainer from "../../components/PageContainer";
import {AppHeader} from "../../components/AppHeader";
import {ActivityIndicator} from "../../components/ActivityIndicator";
import OrderItem from "./orderItem";
import Theme from "../../App.style";
import Util from "../../util";
import RouteConstants from "../../routes/constants";
import {SetLoginStatus} from "../../redux/actions/setLoginStatus";
import API from "../../api";
import {SetToast} from "../../redux/actions/setToast";


type Props = {};
const OrdersList = (props: Props) => {
    const [data, setData] = React.useState(null);
    const dispatch = useDispatch();

    React.useEffect(() => {
        const unmountOnFocus = props.navigation.addListener('focus', async () => {
            await getOrdersList()
        });
        return (unmountOnFocus)
    }, []);


    const getOrdersList = async () => {
        try {
            const response = await API.Calls.Orders.getOrder({})
            setData(response.body);
        } catch (e) {
            dispatch(SetToast('Not able to get orders list', 'warning'));
        }
    }


    const addNewItem = React.useCallback(async () => {
        props.navigation.push(RouteConstants.PRIVATE_ROUTES.ADD_ORDER);
        // await API.Calls.Tracking.updateDriverLocation({long: 234, lat: 23, orderId: '234'});
    }, []);

    const renderItem = ({item, index}) => {
        return (<OrderItem {...item} index={index}/>)
    }

    const logout = React.useCallback(() => {
        dispatch(SetLoginStatus(Util.Constants.LOGIN_STATUS.NOT_LOGGED_IN));
    }, []);

    return (
        <PageContainer widthPadding={false} statusbarType={'light'}>
            <AppHeader headerText={'ORDERS'}
                       leftIcon={{icon: 'Logout', action: logout, fill: Theme.base_color_10}}
                       rightIcon={[{icon: 'Add', action: addNewItem}]}/>
            <PageContainer widthPadding={true} style={{paddingTop: 20}}>
                {
                    data === null ?
                        <ActivityIndicator/>
                        :
                        <FlatList data={data} renderItem={renderItem} keyExtractor={item => item.id}/>
                }
            </PageContainer>
        </PageContainer>
    );
};

export default OrdersList
