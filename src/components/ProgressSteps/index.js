// @flow
import * as React from 'react';
import {View} from 'react-native';
import style from './style';
import ProgressStep from "./step";


type Props = {
    steps: string[],
    activeStep: number
};
const ProgressSteps = (props: Props) => {
    return (
        <View style={style.mainContainer}>
            {
                props.steps.map((stepText, index) => {
                    return (
                        <ProgressStep key={index} text={stepText} isActive={props.activeStep >= index} isLast={props.steps.length - 1 === index}/>
                    )
                })
            }
        </View>
    );
};

export default ProgressSteps
