// @flow
import * as React from 'react';
import {Animated, View, Easing} from 'react-native';
import style from './orderItem.style';
import Text from "../../components/Text";
import Theme from "../../App.style";
import Card from "../../components/Card";
import Util from "../../util";


export type OrderItemProps = {
    title: string,
    subTitle: string,
    status: string,
    index: number
};
const OrderItem = (props: OrderItemProps) => {
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
                return Theme.indication_color_3;
            case Util.Constants.ORDER_STATUS.IN_PROGRESS:
                return Theme.indication_color_2;
            default:
                return Theme.base_color_4;
        }
    }

    return (
        <Card style={[style.mainContainer, {
            opacity: animationRef,
            transform: [{
                translateX: animationRef.interpolate({
                    inputRange: [0, 1],
                    outputRange: [-100, 0]
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
