// @flow
import React from 'react';
import Util from '../../util';

type Props = {
    name: string,
    width: number,
    height: number,
    fill?: string,
    style?: Object
}


function Icon(props: Props) {
    const {width, height, fill, style, isYouth} = props;
    switch (props.name) {

        // case 'Pattern':
        //     return <Pattern {...props} width={width} height={height} fill={fill} style={style}/>;
        //
        // case 'Animation_Profile':
        //     return (
        //         <LottieView source={require('../../assets/icons/9993-name-proile-icon-animation-stroke.json')} autoPlay
        //                     loop style={style}/>);


        default:
            return null;
    }
}


export default Icon;
