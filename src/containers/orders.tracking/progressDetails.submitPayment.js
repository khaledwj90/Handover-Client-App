// @flow
import * as React from 'react';
import {View} from 'react-native';
import style from './progressDetails.submitPayment.style';
import Text from "../../components/Text";
import type {GetOrderDetailsResType} from "../../api/orders/_types";
import {Tracking_OrderDetailsContext} from "./index";
import Theme from "../../App.style";
import {ConfirmSlider} from "../../components/ConfirmSlider";
import {useDispatch} from "react-redux";
import {SetToast} from "../../redux/actions/setToast";
import API from "../../api";
import Util from "../../util";
import {useNavigation} from "@react-navigation/native";


type Props = {};
const ProgressDetailsSubmitPayment = (props: Props) => {
    const orderDetailsContextState: GetOrderDetailsResType = React.useContext(Tracking_OrderDetailsContext);
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const onSubmit = () => {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await API.Calls.Orders.updateOrderStatus({
                    orderId: orderDetailsContextState._id,
                    status: Util.Constants.ORDER_STATUS.COMPLETED
                });
                if (response.withError === true) {
                    dispatch(SetToast('Not able to complete the transaction. Please try again', 'danger'));
                    return;
                }
                dispatch(SetToast('Your transaction has been completed successfully', 'success'));
                navigation.goBack();
            } catch (e) {
                dispatch(SetToast('Not able to complete the transaction. Please try again', 'danger'));
                reject();
            }
        })
    }
    return (
        <View style={style.mainContainer}>
            <View style={style.row}>
                <Text size={5} weight={'bold'} color={Theme.base_color_10}>
                    Pickup Time
                </Text>
                <Text size={5} weight={'light'} color={Theme.base_color_10}>
                    {orderDetailsContextState.pickupTimestamp ? Util.Functions.DateTimeFormat(orderDetailsContextState.pickupTimestamp, true, true) : '---'}
                </Text>
            </View>
            <View style={style.row}>
                <Text size={5} weight={'bold'} color={Theme.base_color_10}>
                    Delivery Time
                </Text>
                <Text size={5} weight={'light'} color={Theme.base_color_10}>
                    {orderDetailsContextState.deliveryTimestamp ? Util.Functions.DateTimeFormat(orderDetailsContextState.deliveryTimestamp, true, true) : '---'}
                </Text>
            </View>
            <View style={[style.row, style.totalLabelContainer]}>
                <Text size={5} weight={'bold'} color={Theme.base_color_10}>
                    Total
                </Text>
            </View>
            <View style={style.row}>
                <View style={style.amountContainer}>
                    <Text size={15} weight={'bold'} color={Theme.base_color_10}>
                        15.00
                        <Text size={5} weight={'light'} color={Theme.base_color_10}> SAR</Text>
                    </Text>
                </View>
                <View style={{flex: 1, marginRight: -20}}>
                    <ConfirmSlider onConfirm={onSubmit} isDisabled={false} placeholder={'SUBMIT'}
                                   style={{borderTopRightRadius: 0, borderBottomRightRadius: 0}}/>
                </View>
            </View>
        </View>
    );
};

export default ProgressDetailsSubmitPayment
