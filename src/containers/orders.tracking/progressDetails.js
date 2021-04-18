// @flow
import * as React from 'react';
import {View, Animated} from 'react-native';
import style from './locationSelection.style';
import {SliderModal} from "../../components/SliderModal";
import Util from "../../util";
import Theme from "../../App.style";
import ProfileImg from "../../components/profileImg";
import Text from "../../components/Text";
import ProgressSteps from "../../components/ProgressSteps";
import type {GetOrderDetailsResType} from "../../api/orders/_types";
import {ActivityIndicator} from "../../components/ActivityIndicator";
import ProgressDetailsSubmitPayment from "./progressDetails.submitPayment";
import {Tracking_OrderDetailsContext} from "./index";


type Props = {};
const ProgressDetails = (props: Props) => {
    const orderDetailsContextState: GetOrderDetailsResType = React.useContext(Tracking_OrderDetailsContext);
    const animationRef = React.useRef(new Animated.Value(0)).current;


    React.useEffect(() => {
        console.log('STATUS: ', orderDetailsContextState);
        if (orderDetailsContextState?.status === Util.Constants.ORDER_STATUS.DELIVERED) {
            Animated.timing(animationRef, {
                toValue: 1,
                duration: 250,
                useNativeDriver: true,
            }).start();
        }

    }, [orderDetailsContextState?.status]);


    const getActiveStep = () => {
        switch (orderDetailsContextState.deliveryStatus) {
            case Util.Constants.DELIVERY_STATUS.ON_WAY:
            case Util.Constants.DELIVERY_STATUS.PACKAGE_NEAR_PICKUP:
                return 0;
            case Util.Constants.DELIVERY_STATUS.PACKAGE_PICKED_UP:
                return 1;
            case Util.Constants.DELIVERY_STATUS.NEAR_DELIVERY_DESTINATION:
                return 2;
            case Util.Constants.DELIVERY_STATUS.DELIVERED:
                return 3;
            default:
                return 0;
        }
    }

    return (
        <>
            <SliderModal bgColor={Theme.primary_color_1} withBlur={false}>

                <View style={{
                    alignItems: 'center',
                    paddingBottom: 50,
                    width: Util.Functions.GetDeviceDimensions().width
                }}>
                    {
                        orderDetailsContextState === null ?
                            <ActivityIndicator color={Theme.base_color_10} size={'small'}/>
                            :
                            <>
                                <View style={style.profileContainer}>
                                    <ProfileImg size={80}
                                                style={{...Theme.shadow({color: Theme.base_color_10})}}/>
                                    <Text size={2} weight={'bold'} color={Theme.base_color_10}
                                          style={style.driverName}>
                                        Driver Name
                                    </Text>
                                </View>
                                <View style={{alignItems: 'flex-start', width: '100%'}}>
                                    <Animated.View style={{
                                        flexDirection: 'row',
                                        transform: [{
                                            translateX: animationRef.interpolate({
                                                inputRange: [0, 1],
                                                outputRange: [0, -Util.Functions.GetDeviceDimensions().width]
                                            })
                                        }]
                                    }}>
                                        <View style={{width: Util.Functions.GetDeviceDimensions().width}}>
                                            <ProgressSteps
                                                activeStep={getActiveStep()}
                                                steps={['On the way', 'Picked up delivery', 'Near delivery destination', 'Package is delivered']}/>
                                        </View>
                                        <View style={{width: Util.Functions.GetDeviceDimensions().width}}>
                                            <ProgressDetailsSubmitPayment/>
                                        </View>
                                    </Animated.View>
                                </View>
                            </>
                    }
                </View>
            </SliderModal>
        </>
    );
};

export default ProgressDetails
