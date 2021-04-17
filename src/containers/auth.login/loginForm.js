// @flow
import * as React from 'react';
import {View} from 'react-native';
import {Field} from 'formik';
import style from './loginForm.style';
import {Form} from "../../components/Form";
import FormBody from "../../components/FormBody";
import Theme from "../../App.style";
import InputField from "../../components/InputFields/TextInputField";
import Button from "../../components/Button";
import {useDispatch} from "react-redux";
import {SetLoginStatus} from "../../redux/actions/setLoginStatus";
import Util from "../../util";
import {SetToast} from "../../redux/actions/setToast";
import API from "../../api";
import type {APIResponseType} from "../../api/_types";
import axios from "axios";


type Props = {};
const LoginForm = (props: Props) => {
    const dispatch = useDispatch();

    const onSubmit = async (values) => {
        try {
            const response = await API.Calls.Authentication.login({
                email: values.email,
                password: values.password,
                type: 'driver'
            });
            if (response.withError === true) {
                dispatch(SetToast('User is not authorized', 'warning'));
                return Promise.resolve();
            }

            //set token in the header and store it in localstorage for quick login
            axios.defaults.headers.common["Authorization"] = `Bearer ${response.body.token}`;
            await Util.Functions.SetValueToAsyncStorage(Util.Constants.LOCAL_STORAGE.JWT_TOKEN, response.body.token);

            //get fcm token and update BE
            const fcmToken = await Util.Functions.GetFCMToken();
            await API.Calls.Tracking.setFCMToken({token: fcmToken});
            dispatch(SetLoginStatus(Util.Constants.LOGIN_STATUS.LOGGED_IN));
        } catch (e) {
            console.log('e: ', e)
            if (e.httpStatus === API.Constants.HTTP_STATUSES.HTTP_NOT_FOUND) {
                dispatch(SetToast('User is not found', 'warning'));
            } else {
                dispatch(SetToast('User is not authorized', 'warning'));
            }

        }

    }

    return (
        <Form initialValues={{}} onSubmit={onSubmit}>
            {
                ({handleSubmit, isSubmitting}) => (
                    <FormBody handleKeyboard={true} backgroundColor={'transparent'} style={{padding: 0}}>
                        <Field name={'email'} keyboardType={'email-address'} label={'Email'}
                               placeholder={'abc@domain.com'} style={style.field}
                               component={InputField}/>
                        <Field name={'password'} label={'Password'} placeholder={'*******'} style={style.field}
                               component={InputField}
                               type={'password'}/>
                        <Button label={'SUBMIT'} style={{marginTop: 20}} action={handleSubmit}/>
                    </FormBody>
                )
            }
        </Form>
    );
};

export default LoginForm
