import React from 'react'
import {View, TouchableOpacity, Animated} from 'react-native'
import style from './style';

type props = {
    style?: *,
    onPress: ()=>void,
}

const Card = (props) => {
    const {style: customStyle} = props

    if (props.onPress) {
        return (
            <TouchableOpacity style={[style.mainContainer, customStyle]} onPress={props.onPress}>
                {props.children}
            </TouchableOpacity>
        )

    } else {
        return (
            <Animated.View style={[style.mainContainer, ...customStyle?.length ? customStyle : [customStyle]]}>
                {props.children}
            </Animated.View>
        )
    }
}


export default Card
