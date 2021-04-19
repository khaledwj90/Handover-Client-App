// @flow
import * as React from 'react';
import {Animated, View, Easing} from 'react-native';
import style from './orderItem.style';
import Text from "../../components/Text";
import Theme from "../../App.style";
import Card from "../../components/Card";
import Util from "../../util";
import Button from "../../components/Button";
import {useNavigation} from "@react-navigation/native";
import PrivateNavigation from "../../routes/private";
import RouteConstants from "../../routes/constants";


export type OrderItemProps = {
    id: string,
    title: string,
    subTitle: string,
    status: string,
    index: number
};
const OrderItem = (props: OrderItemProps) => {
    const navigation = useNavigation();
    const animationRef = React.useRef(new Animated.Value(0)).current;

    React.useEffect(() => {
        animationRef.setValue(0);
        Animated.timing(animationRef, {
            toValue: 1,
            easing: Easing.elastic(1),
            delay: props.index * 100,
            useNativeDriver: true
        }).start();
    }, []);


    const statusColor = () => {
        switch (props.status) {
            case Util.Constants.ORDER_STATUS.CANCELED:
                return Theme.indication_color_1;
            case Util.Constants.ORDER_STATUS.DELIVERED:
            case Util.Constants.ORDER_STATUS.COMPLETED:
                return Theme.indication_color_3;
            case Util.Constants.ORDER_STATUS.IN_PROGRESS:
                return Theme.indication_color_2;
            default:
                return Theme.base_color_4;
        }
    }

    const tackingPressed = () => {
        navigation.push(RouteConstants.PRIVATE_ROUTES.TRACK_ORDER, {orderId: props.id})
    }

    return (
        <Card onPress={tackingPressed} style={[style.mainContainer, {
            opacity: animationRef,
            transform: [{
                translateX: animationRef.interpolate({
                    inputRange: [0, 1],
                    outputRange: [-Util.Functions.GetDeviceDimensions().width - 30, 0]
                })
            }]
        }]}>
            <View>
                <Text size={3} weight={'bold'} numberOfLines={1} color={Theme.primary_color_1} style={style.title}>
                    {props.title}
                </Text>
                <Text size={2} weight={'light'} numberOfLines={1} color={Theme.base_color_4}>
                    {props.subTitle}
                </Text>
            </View>
            <Text weight={'regular'} color={statusColor()}>
                {props.status}
            </Text>
        </Card>
    );
};

export default OrderItem
