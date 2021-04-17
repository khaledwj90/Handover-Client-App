// @flow
import * as React from 'react';
import {View, StatusBar} from 'react-native';
import style from './style';
import Theme from "../../App.style";


type PageContainerType = {
    bgColor: string,
    widthPadding: boolean,
    statusbarType: 'light' | 'dark',
    style?: *,
    children: *,
}
const PageContainer = (props: PageContainerType): * => {
    return (
        <View style={[style.container, {
            backgroundColor: props.bgColor,
            paddingHorizontal: props.widthPadding === true ? Theme.page_padding : undefined
        }, props.style]}>
            {
                props.statusbarType !== undefined &&
                <StatusBar barStyle={props.statusbarType === 'light' ? 'light-content' : 'dark-content'}/>
            }
            {
                props.children
            }
        </View>
    );
};

PageContainer.defaultProps = {
    bgColor: Theme.body_bg_color_4,
    widthPadding: false,
}

export default PageContainer
