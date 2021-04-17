// @flow
import * as React from 'react';
import {View} from 'react-native';
import Text from "../../components/Text";
import messaging from '@react-native-firebase/messaging';
import PageContainer from "../../components/PageContainer";
import Theme from "../../App.style";
import {Form} from "../../components/Form";
import LoginForm from "./loginForm";
import LoginLogo from "./logo";
import Card from "../../components/Card";


type Props = {};
const Auth_Login = (props: Props) => {

    React.useEffect(() => {
    }, []);


    return (
        <PageContainer widthPadding={true} bgColor={Theme.body_bg_color_4} style={{justifyContent: 'center'}}
                       statusbarType={'dark'}>
            <Card style={{paddingHorizontal: Theme.page_padding}}>
                <LoginLogo/>
                <LoginForm/>
            </Card>
        </PageContainer>
    );
};

export default Auth_Login
