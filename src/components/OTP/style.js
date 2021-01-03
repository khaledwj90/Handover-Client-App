import {StyleSheet} from 'react-native';
import Theme from "../../App.style";
import Util from "../../util";


const style = StyleSheet.create({
    textContainer: {
        marginTop: '10%',
        justifyContent: 'center',
        paddingLeft: '10%',
        paddingRight: '10%'
    },
    header: {
        color: Theme.base_color_10,
        textAlign: 'center',
        marginBottom: 20,
        letterSpacing: 0
    },
    message: {
        color: Theme.base_color_10,
        textAlign: 'center',
        letterSpacing: 0,
        marginBottom: 20
    },
    inputFieldsMainContainer: {
        marginTop: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        alignSelf: 'center',
        width: '70%'
    },
    inputField: {
        display: 'none',
    },
    otpFields: {
        backgroundColor: `rgba(${Util.Functions.HexToRgb(Theme.base_color_10)},0.1)`,
        marginRight: 10,
        alignItems: 'center',
        justifyContent: 'center',
        width: 60,
        height: 60,
        borderRadius: 10,
    },
    otpText: {
        color: Theme.base_color_10,
    }
})

export default style
