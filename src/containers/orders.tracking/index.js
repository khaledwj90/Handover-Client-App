// @flow
import * as React from 'react';
import {TouchableOpacity, View} from 'react-native';
import MapContainer from "../../components/Map";
import {useDispatch} from "react-redux";
import style from './index.style';
import {SetTabShowingStatus} from "../../redux/actions/setTabShowingStatus";
import Icon from "../../components/Icons";
import Theme from "../../App.style";
import PageContainer from "../../components/PageContainer";
import Button_Icon from "../../components/Button.icon";
import LocationSelection from "./locationSelection";


type Props = {};
const OrdersTracking = (props: Props) => {
    const dispatch = useDispatch();
    const mapRef = React.useRef(null);
    const [currentLocation, setCurrentLocation] = React.useState(null);


    React.useEffect(() => {
        dispatch(SetTabShowingStatus(false));

        return (() => {
            dispatch(SetTabShowingStatus(true));
        })
    }, []);

    const close = () => {
        props.navigation.goBack();
    }

    const onSubmit = (values) => {

    }

    return (
        <PageContainer statusbarType={'dark'}>
            <Button_Icon action={close} name={'Back'} fill={Theme.base_color_10} height={10} width={10}
                         style={style.backButton}/>
            <MapContainer ref={mapRef} updateLocation={setCurrentLocation}/>
            <LocationSelection mapRef={mapRef} currentLocation={currentLocation} onSubmit={onSubmit}/>
        </PageContainer>
    );
};

export default OrdersTracking
