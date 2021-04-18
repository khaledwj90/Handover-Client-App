import {StyleSheet} from 'react-native';
import Theme from "../../App.style";

const style = StyleSheet.create({
    mainContainer: {
        height: 50,
        borderRadius: 50,
        overflow: 'hidden',
        alignItems: 'flex-start',
        justifyContent: 'center',
        marginTop: 20,
    },
    message: {
        color: Theme.base_color_2
    }
});

export default style
