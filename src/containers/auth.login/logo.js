// @flow
import * as React from 'react';
import {View} from 'react-native';
import Text from "../../components/Text";
import Theme from "../../App.style";


type Props = {};
const LoginLogo = (props: Props) => {
    return (
        <View
            style={{marginTop: 30, alignItems: 'flex-start', marginBottom: 30}}>
            <Text size={15} weight={'bold'} color={Theme.base_color_1}>
                LOGIN
            </Text>
        </View>
    );
};

export default LoginLogo
