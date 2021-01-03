import {StyleSheet} from 'react-native';
import Theme from "../../App.style";


const style = StyleSheet.create({
    mainContainer: {
        backgroundColor: Theme.base_color_10,
        borderRadius: 10,
        padding: 10,
        width: "100%",
        shadowColor: Theme.base_color_6,
        shadowOffset: {
            width: 2,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 1
    }
})

export default style
