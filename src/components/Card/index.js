import React from 'react'
import {View, TouchableOpacity} from 'react-native'
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
            <View style={[style.mainContainer, customStyle]}>
                {props.children}
            </View>
        )
    }
}


export default Card
