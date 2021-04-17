import {StyleSheet} from 'react-native';
import Theme from "../../App.style";


const style = StyleSheet.create({
    mainContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        height: 50,
        borderRadius: Theme.card_border_radius,
        backgroundColor: Theme.base_color_10,
        marginVertical: 10,
    }
})

export default style
