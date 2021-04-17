import {StyleSheet} from 'react-native';
import Theme from "../../App.style";
import Util from "../../util";

const {width, height} = Util.Functions.GetDeviceDimensions();
const style = StyleSheet.create({
    mainContainer: {
        position: 'absolute',
        bottom: 0,
        width: width,
    },
    contentContainer: {
        borderRadius: Theme.card_border_radius,
        padding: 10,
    }
});

export default style
