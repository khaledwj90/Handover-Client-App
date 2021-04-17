// @flow
import * as React from 'react';
import {View} from 'react-native';
import style from './step.style';
import Text from "../Text";
import {bool} from "yup";
import Theme from "../../App.style";


type Props = {
    text: string,
    isLast: boolean,
    isActive: boolean
};
const ProgressStep = (props: Props) => {
    return (
        <View style={[style.mainContainer, props.isActive === false ? style.inActiveView : null]}>

            <View style={[{alignItems: 'center'}]}>
                <View style={style.point}/>
                {props.isLast !== true && <View style={style.line}/>}
            </View>
            <View style={style.textContainer}>
                <Text size={3} weight={props.isActive === true ? 'bold' : 'regular'} color={Theme.base_color_10}>
                    {props.text}
                </Text>
            </View>
        </View>
    );
};
ProgressStep.defaultProps = {
    text: 'STEP',
    isActive: false
}

export default ProgressStep
