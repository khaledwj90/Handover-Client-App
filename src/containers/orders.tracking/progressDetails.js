// @flow
import * as React from 'react';
import {View} from 'react-native';
import style from './locationSelection.style';
import {SliderModal} from "../../components/SliderModal";
import Util from "../../util";
import Theme from "../../App.style";
import ProfileImg from "../../components/profileImg";
import Text from "../../components/Text";
import ProgressSteps from "../../components/ProgressSteps";
import type {GetOrderDetailsResType} from "../../api/orders/_types";
import {ActivityIndicator} from "../../components/ActivityIndicator";


type Props = {
    mapRef?: *,
    orderDetails: GetOrderDetailsResType,
    currentLocation: { lat: number, lng: number }
};
const ProgressDetails = (props: Props) => {

    //location mode will be submit view, select pickup view or select destination view
    const [locationSelectionMode, setLocationSelectionMode] = React.useState<1 | 2 | 3>(1);
    const modalRef = React.useRef();

    React.useEffect(() => {
    }, []);


    const onClose = () => {
    }

    const getActiveStep = () => {
        console.log('pp', props.orderDetails);
        switch (props.orderDetails.deliveryStatus) {
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
            <SliderModal ref={modalRef} heightSizes={[200]} selectedHeightIndex={1}
                         onClose={onClose} bgColor={Theme.primary_color_1} withBlur={false}>
                <View style={{alignItems: 'center', paddingBottom: 50}}>
                    {
                        props.orderDetails === null ?
                            <ActivityIndicator color={Theme.base_color_10} size={'small'}/>
                            :
                            <>
                                <View style={style.profileContainer}>
                                    <ProfileImg size={80}
                                                style={{...Theme.shadow({color: Theme.base_color_10})}}/>
                                    <Text size={2} weight={'bold'} color={Theme.base_color_10} style={style.driverName}>
                                        Driver Name
                                    </Text>
                                </View>
                                <View style={{alignItems: 'flex-start', width: '100%'}}>
                                    <ProgressSteps
                                        activeStep={getActiveStep()}
                                        steps={['On the way', 'Picked up delivery', 'Near delivery destination', 'Package is delivered']}/>
                                </View>
                            </>
                    }
                </View>
            </SliderModal>
        </>
    );
};

export default ProgressDetails
