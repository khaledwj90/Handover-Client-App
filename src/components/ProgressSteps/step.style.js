import {StyleSheet} from 'react-native';
import Theme from "../../App.style";

const pointSize = 25;
const style = StyleSheet.create({
    mainContainer: {
        flexDirection: 'row'
    },
    point: {
        width: pointSize,
        height: pointSize,
        borderRadius: pointSize / 2,
        backgroundColor: Theme.base_color_10
    },
    line: {
        height: 30,
        width: 2,
        backgroundColor: Theme.base_color_10
    },
    textContainer: {
        marginTop: 5,
        marginLeft: 5
    },
    inActiveView: {
        opacity: 0.4
    }
})

export default style
