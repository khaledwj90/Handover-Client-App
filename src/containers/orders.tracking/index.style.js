import {StyleSheet} from 'react-native';
import Theme from "../../App.style";


const style = StyleSheet.create({
    backButton: {
        position: 'absolute',
        zIndex: 10,
        top: 50,
        left: 20,
        backgroundColor: Theme.primary_color_1,
        padding: 10,
        borderRadius: 20,
        ...Theme.shadow({color: Theme.base_color_1})
    }
})

export default style
