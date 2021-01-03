import {StyleSheet} from 'react-native';
import Theme from "../../App.style";

const btHeight = 40;
const style = StyleSheet.create({
    mainContainer: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        height: btHeight,
        borderRadius: btHeight / 2
    },
    primaryContainer: {
        borderColor: Theme.primary_color_2,
        borderWidth: 0,
        backgroundColor: Theme.primary_color_2,
        shadowColor: Theme.base_color_6,
        shadowOffset: {width: 2, height: 2},
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 1
    },
    secondaryContainer: {
        borderColor: Theme.supporting_color_3,
        borderWidth: 0,
        backgroundColor: Theme.supporting_color_3,
        shadowColor: Theme.base_color_6,
        shadowOffset: {width: 2, height: 2},
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 1
    },
    tertiaryContainer: {
        borderColor: Theme.primary_color_2,
        borderWidth: 1,
        backgroundColor: 'transparent',
        shadowColor: Theme.secondary_color_2,
        shadowOffset: {width: 2, height: 2},
        shadowOpacity: 0,
        shadowRadius: 5,
        elevation: 1
    },
    quaternaryContainer: {
        borderColor: '#fff',
        borderWidth: 1,
        backgroundColor: 'transparent',
        shadowColor: Theme.secondary_color_2,
        shadowOffset: {width: 2, height: 2},
        shadowOpacity: 0,
        shadowRadius: 5,
        elevation: 1
    },
    disabled: {
        opacity: Theme.disabled_opacity
    }

});
export default style;
