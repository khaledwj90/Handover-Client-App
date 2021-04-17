import {StyleSheet} from 'react-native';
import Theme from "../../App.style";


const style = StyleSheet.create({
    mainContainer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        zIndex: 999,
        flexDirection: "row",
        backgroundColor: Theme.body_bg_color_5,
        paddingTop: 5
    },
    shadow: {
        shadowColor: Theme.base_color_6,
        shadowOffset: {width: 2, height: 2},
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 9,
    },
})

export default style
