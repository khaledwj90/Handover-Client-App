// @flow
import React from 'react';
import LottieView from 'lottie-react-native';
import Util from '../../util';
import Add from '../../assets/icons/Add.svg';
import Back from '../../assets/icons/Back.svg';
import Orders from '../../assets/icons/Orders.svg';
import Logout from '../../assets/icons/Logout.svg';
import RightArrow from '../../assets/icons/RightArrow.svg';


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
        case 'Add':
            return <Add {...props} width={width} height={height} fill={fill} style={style}/>;
        case 'Back':
            return <Back {...props} width={width} height={height} fill={fill} style={style}/>;
        case 'Orders':
            return <Orders {...props} width={width} height={height} fill={fill} style={style}/>;
        case 'Logout':
            return <Logout {...props} width={width} height={height} fill={fill} style={style}/>;
        case 'RightArrow':
            return <RightArrow {...props} width={width} height={height} fill={fill} style={style}/>;

        //======================= Animations ====================
        case 'Animation_Profile':
            return (
                <LottieView source={require('../../assets/icons/Profile.json')} autoPlay
                            loop style={style}/>);

        case 'Animation_LocationPin':
            return (
                <LottieView source={require('../../assets/icons/LocationPin.json')} autoPlay
                            loop style={style}/>);

        case 'Animation_DeliveryGuy':
            return (
                <LottieView source={require('../../assets/icons/DeliveryGuy.json')} autoPlay
                            loop style={style}/>);
        case 'Animation_DeliveryLocation':
            return (
                <LottieView source={require('../../assets/icons/DeliveryLocation.json')} autoPlay
                            loop style={style}/>);
        case 'Animation_PickupLocation':
            return (
                <LottieView source={require('../../assets/icons/PickupLocation.json')} autoPlay
                            loop style={style}/>);


        default:
            return null;
    }
}


export default Icon;
