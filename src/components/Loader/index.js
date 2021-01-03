// @flow
import * as React from 'react';
import {View, Modal} from 'react-native';
import style from './style';
import Text from "../Text";
import Icon from "../Icons";


type Props = {
    visible: boolean,
    onModalHide: ()=>void,
};
export const Loader = (props: Props) => {
    return (
        <Modal visible={props.visible}  statusBarTranslucent={true}
               onModalHide={props.onModalHide ? props.onModalHide : undefined} transparent={true}
               hardwareAccelerated={true}>
            <View style={style.mainContainer}>
                <View style={style.insideContainer}>
                    <Icon name={'Animation_Loading'}/>
                </View>
            </View>
        </Modal>
    );
};
